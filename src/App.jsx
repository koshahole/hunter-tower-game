import React, { useState, useEffect, useMemo } from 'react';
import Hub from './components/Hub';
import Battle from './components/Battle';
import UpgradeShop from './components/UpgradeShop';
import PetSanctuary from './components/PetSanctuary';
import StarsShop from './components/StarsShop';
import ReviveModal from './components/ReviveModal';
import RebirthModal from './components/RebirthModal';
import LeaderboardModal from './components/LeaderboardModal';
import ProfileModal from './components/ProfileModal';
import Toast from './components/Toast';

import { loadGameState, saveGameState, calculateEnergy } from './utils/storage';
import { initTelegram, getUserInfo, hapticImpact } from './utils/telegram';
import { UPGRADES } from './data/upgrades';
import { PETS, getPetStats, rollPetGacha } from './data/pets';
import { getRankByMaxFloor } from './data/ranks';
import { REBIRTH_PERKS } from './data/rebirth';
import { Swords, Shield, Sparkles, Star, Trophy, Home } from 'lucide-react';

export default function App() {
  const [state, setState] = useState(() => {
    const loaded = loadGameState();
    const withEnergy = calculateEnergy(loaded);
    return { ...loaded, ...withEnergy };
  });

  const [view, setView] = useState('hub');
  const [activeTab, setActiveTab] = useState('tower');
  const [runHp, setRunHp] = useState(null);
  const [reviveModal, setReviveModal] = useState({ isOpen: false, onConfirm: null });
  const [isRebirthOpen, setIsRebirthOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const user = useMemo(() => getUserInfo(), []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    initTelegram();
  }, []);

  // Update timer cycle every second to keep 5-min countdown accurate
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const { energy, lastEnergyRefill, secondsToNext } = calculateEnergy(prev);
        if (energy !== prev.energy || secondsToNext !== prev.secondsToNext) {
          return { ...prev, energy, lastEnergyRefill, secondsToNext };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Persist state changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  // Compute total effective player stats
  const playerStats = useMemo(() => {
    let baseHp = 100;
    let baseAtk = 16;
    let critChance = 5;
    let dodgeChance = 5;
    let goldMultiplier = 1.0;

    UPGRADES.forEach(u => {
      const level = state.upgrades[u.id] || 0;
      if (u.statKey === 'atk') baseAtk += level * u.statBonus;
      if (u.statKey === 'maxHp') baseHp += level * u.statBonus;
      if (u.statKey === 'critChance') critChance += level * u.statBonus;
      if (u.statKey === 'dodgeChance') dodgeChance += level * u.statBonus;
      if (u.statKey === 'goldBonus') goldMultiplier += level * u.statBonus;
    });

    const activePet = PETS.find(p => p.id === state.activePetId);
    if (activePet) {
      const petLvl = state.petLevels?.[activePet.id] || 1;
      const petBuffs = getPetStats(activePet, petLvl);
      baseHp = Math.floor(baseHp * (1 + petBuffs.hpBonus));
      baseAtk = Math.floor(baseAtk * (1 + petBuffs.atkBonus));
      critChance += petBuffs.critBonus;
      dodgeChance += petBuffs.dodgeBonus;
      goldMultiplier += petBuffs.goldBonus;
    }

    const rank = getRankByMaxFloor(state.maxFloor);
    baseHp = Math.floor(baseHp * rank.multiplier);
    baseAtk = Math.floor(baseAtk * rank.multiplier);

    const soulPower = state.rebirthPerks?.soul_power || 0;
    const soulVitality = state.rebirthPerks?.soul_vitality || 0;
    const soulFortune = state.rebirthPerks?.soul_fortune || 0;
    const soulInstinct = state.rebirthPerks?.soul_instinct || 0;

    baseAtk = Math.floor(baseAtk * (1 + soulPower * 0.15));
    baseHp = Math.floor(baseHp * (1 + soulVitality * 0.20));
    goldMultiplier += soulFortune * 0.25;
    critChance += soulInstinct * 3;
    dodgeChance += soulInstinct * 2;

    if (state.vip) {
      goldMultiplier += 0.25;
    }

    return {
      maxHp: baseHp,
      atk: baseAtk,
      critChance: Math.min(80, Math.round(critChance)),
      dodgeChance: Math.min(55, Math.round(dodgeChance)),
      goldMultiplier
    };
  }, [state.upgrades, state.activePetId, state.petLevels, state.maxFloor, state.rebirthPerks, state.vip]);

  const handleStartRun = (startFloor = 1) => {
    setState(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 1),
      currentFloor: startFloor
    }));
    setRunHp(playerStats.maxHp);
    setView('battle');
  };

  const handleFloorCleared = ({ gold, crystals, floor, remainingHp }) => {
    const totalGold = Math.floor(gold * playerStats.goldMultiplier);
    const healBonus = Math.floor(playerStats.maxHp * 0.25);
    const nextHp = Math.min(playerStats.maxHp, (remainingHp || playerStats.maxHp) + healBonus);
    setRunHp(nextHp);

    setState(prev => ({
      ...prev,
      gold: prev.gold + totalGold,
      crystals: prev.crystals + crystals,
      currentFloor: floor + 1,
      maxFloor: Math.max(prev.maxFloor, floor + 1),
      stats: {
        ...prev.stats,
        highestFloorCleared: Math.max(prev.stats?.highestFloorCleared || 1, floor + 1),
        monstersKilled: (prev.stats?.monstersKilled || 0) + 1,
        bossesKilled: floor % 10 === 0 ? (prev.stats?.bossesKilled || 0) + 1 : (prev.stats?.bossesKilled || 0)
      }
    }));
  };

  const handleRunEnd = ({ gold, crystals, floor }) => {
    const totalGold = Math.floor(gold * playerStats.goldMultiplier);
    setRunHp(null);
    setState(prev => ({
      ...prev,
      gold: prev.gold + totalGold,
      crystals: prev.crystals + crystals,
      maxFloor: Math.max(prev.maxFloor, floor),
      currentFloor: 1,
      stats: {
        ...prev.stats,
        totalRuns: (prev.stats?.totalRuns || 0) + 1
      }
    }));
    setView('hub');
  };

  const handleBuyUpgrade = (upgradeId, goldCost, crystalCost) => {
    setState(prev => ({
      ...prev,
      gold: prev.gold - goldCost,
      crystals: prev.crystals - crystalCost,
      upgrades: {
        ...prev.upgrades,
        [upgradeId]: (prev.upgrades[upgradeId] || 0) + 1
      }
    }));
  };

  const handleEquipPet = (petId) => {
    setState(prev => ({ ...prev, activePetId: petId }));
  };

  const handleUnlockPet = (petId) => {
    setState(prev => ({
      ...prev,
      ownedPets: Array.from(new Set([...prev.ownedPets, petId])),
      petLevels: {
        ...prev.petLevels,
        [petId]: prev.petLevels?.[petId] || 1
      }
    }));
  };

  const handleUpgradePet = (petId, goldCost, crystalCost) => {
    setState(prev => ({
      ...prev,
      gold: prev.gold - goldCost,
      crystals: prev.crystals - crystalCost,
      petLevels: {
        ...prev.petLevels,
        [petId]: (prev.petLevels?.[petId] || 1) + 1
      }
    }));
  };

  const handleSpendCrystals = (amount) => {
    setState(prev => ({ ...prev, crystals: Math.max(0, prev.crystals - amount) }));
  };

  const handlePerformRebirth = (earnedSouls) => {
    setState(prev => ({
      ...prev,
      souls: prev.souls + earnedSouls,
      totalRebirths: (prev.totalRebirths || 0) + 1,
      vip: prev.vip,
      maxFloor: 1,
      currentFloor: 1,
      gold: 0,
      crystals: 0,
      potions: 2,
      energy: prev.maxEnergy,
      upgrades: {
        base_atk: 0,
        base_hp: 0,
        crit_chance: 0,
        dodge_chance: 0,
        gold_mult: 0,
      },
      ownedPets: ['green_slime'],
      activePetId: 'green_slime',
      petLevels: {
        green_slime: 1,
      }
    }));
    setIsRebirthOpen(false);
  };

  const handleBuySoulPerk = (perkId, soulCost) => {
    setState(prev => ({
      ...prev,
      souls: prev.souls - soulCost,
      rebirthPerks: {
        ...prev.rebirthPerks,
        [perkId]: (prev.rebirthPerks?.[perkId] || 0) + 1
      }
    }));
  };

  const handleSaveProfile = (customData) => {
    setState(prev => ({
      ...prev,
      ...customData
    }));
  };

  const handleStarsPurchaseSuccess = (action) => {
    if (action === 'egg') {
      const pet = rollPetGacha();
      handleUnlockPet(pet.id);
      handleEquipPet(pet.id);
      showToast(`ВЫЛУПИЛСЯ: ${pet.name.toUpperCase()}! ЭКИПИРОВАН!`, 'stars');
    } else if (action === 'energy') {
      setState(prev => ({ ...prev, energy: prev.maxEnergy }));
      showToast('ЭНЕРГИЯ ВОССТАНОВЛЕНА НА МАКСИМУМ!', 'success');
    } else if (action === 'potions') {
      setState(prev => ({ ...prev, potions: prev.potions + 5 }));
      showToast('ПОЛУЧЕНО 5 ЗЕЛИЙ ЖИЗНИ! 🧪', 'success');
    } else if (action === 'revive') {
      setState(prev => ({ ...prev, reviveTokens: (prev.reviveTokens || 0) + 1 }));
      showToast('ПОЛУЧЕН ЖЕТОН ВОСКРЕШЕНИЯ! 💫', 'stars');
    } else if (action === 'crystals') {
      setState(prev => ({ ...prev, crystals: prev.crystals + 150 }));
      showToast('+150 КРИСТАЛЛОВ БЕЗДНЫ! 💎', 'success');
    } else if (action === 'vip') {
      setState(prev => ({ ...prev, vip: true }));
      showToast('VIP СТАТУС АКТИВИРОВАН НАВСЕГДА! 👑', 'stars');
    }
  };

  const handleOpenReviveModal = (confirmCallback) => {
    setReviveModal({
      isOpen: true,
      onConfirm: () => {
        confirmCallback();
        setReviveModal({ isOpen: false, onConfirm: null });
      }
    });
  };

  return (
    <div className="w-full min-h-dvh bg-neo-yellow text-black flex flex-col font-sans antialiased bg-comic-dots">
      
      {/* Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md mx-auto p-3 sm:p-4">
        {view === 'battle' ? (
          <Battle
            key={state.currentFloor}
            floor={state.currentFloor}
            initialHp={runHp || playerStats.maxHp}
            playerStats={playerStats}
            activePetId={state.activePetId}
            potions={state.potions}
            onUsePotion={() => setState(prev => ({ ...prev, potions: Math.max(0, prev.potions - 1) }))}
            onFloorCleared={handleFloorCleared}
            onRunEnd={handleRunEnd}
            onOpenReviveModal={handleOpenReviveModal}
          />
        ) : (
          <div className="w-full">
            {activeTab === 'tower' && (
              <Hub
                state={state}
                playerStats={playerStats}
                user={user}
                onStartRun={handleStartRun}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenStarsShop={() => setActiveTab('shop')}
                onOpenRebirthModal={() => setIsRebirthOpen(true)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'upgrades' && (
              <UpgradeShop
                state={state}
                onBuyUpgrade={handleBuyUpgrade}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'pets' && (
              <PetSanctuary
                state={state}
                onEquipPet={handleEquipPet}
                onUnlockPet={handleUnlockPet}
                onUpgradePet={handleUpgradePet}
                onSpendCrystals={handleSpendCrystals}
                onOpenStarsShop={() => setActiveTab('shop')}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'shop' && (
              <StarsShop
                state={state}
                onPurchaseSuccess={handleStarsPurchaseSuccess}
                onShowToast={showToast}
              />
            )}
          </div>
        )}
      </main>

      {/* Profile & Settings Modal */}
      {isProfileOpen && (
        <ProfileModal
          state={state}
          user={user}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsProfileOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal
          state={state}
          user={user}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {/* Rebirth Modal */}
      {isRebirthOpen && (
        <RebirthModal
          state={state}
          onPerformRebirth={handlePerformRebirth}
          onBuyPerk={handleBuySoulPerk}
          onClose={() => setIsRebirthOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Revive Modal */}
      {reviveModal.isOpen && (
        <ReviveModal
          floor={state.currentFloor}
          reviveTokens={state.reviveTokens || 0}
          onUseToken={() => {
            setState(prev => ({ ...prev, reviveTokens: Math.max(0, (prev.reviveTokens || 1) - 1) }));
            reviveModal.onConfirm();
          }}
          onConfirmRevive={reviveModal.onConfirm}
          onCancel={() => {
            setReviveModal({ isOpen: false, onConfirm: null });
            handleRunEnd({ gold: 0, crystals: 0, floor: state.currentFloor });
          }}
          onShowToast={showToast}
        />
      )}

      {/* Neo-Brutal Bottom Navigation Bar */}
      {view === 'hub' && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t-4 border-black pb-safe shadow-brutal-lg">
          <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5 gap-1.5">
            
            <button
              onClick={() => {
                hapticImpact('light');
                setActiveTab('tower');
              }}
              className={`flex flex-col items-center justify-center py-2 border-2 border-black transition-all ${
                activeTab === 'tower' 
                  ? 'bg-neo-pink text-white shadow-brutal-sm' 
                  : 'bg-white text-black hover:bg-slate-100'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5 stroke-[3]" />
              <span className="font-arcade text-[10px] uppercase">БАШНЯ</span>
            </button>

            <button
              onClick={() => {
                hapticImpact('light');
                setActiveTab('upgrades');
              }}
              className={`flex flex-col items-center justify-center py-2 border-2 border-black transition-all ${
                activeTab === 'upgrades' 
                  ? 'bg-neo-cyan text-black shadow-brutal-sm' 
                  : 'bg-white text-black hover:bg-slate-100'
              }`}
            >
              <Swords className="w-5 h-5 mb-0.5 stroke-[3]" />
              <span className="font-arcade text-[10px] uppercase">АРСЕНАЛ</span>
            </button>

            <button
              onClick={() => {
                hapticImpact('light');
                setActiveTab('pets');
              }}
              className={`flex flex-col items-center justify-center py-2 border-2 border-black transition-all ${
                activeTab === 'pets' 
                  ? 'bg-neo-lime text-black shadow-brutal-sm' 
                  : 'bg-white text-black hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-5 h-5 mb-0.5 stroke-[3]" />
              <span className="font-arcade text-[10px] uppercase">ПИТОМЦЫ</span>
            </button>

            <button
              onClick={() => {
                hapticImpact('light');
                setActiveTab('shop');
              }}
              className={`flex flex-col items-center justify-center py-2 border-2 border-black transition-all ${
                activeTab === 'shop' 
                  ? 'bg-neo-yellow text-black shadow-brutal-sm' 
                  : 'bg-white text-black hover:bg-slate-100'
              }`}
            >
              <Star className="w-5 h-5 mb-0.5 fill-black stroke-[3]" />
              <span className="font-arcade text-[10px] uppercase">ЗВЕЗДЫ</span>
            </button>

          </div>
        </nav>
      )}

    </div>
  );
}
