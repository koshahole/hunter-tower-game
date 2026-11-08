import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Hub from './components/Hub';
import Battle from './components/Battle';
import InventoryView from './components/InventoryView';
import PetSanctuary from './components/PetSanctuary';
import StarsShop from './components/StarsShop';
import ReviveModal from './components/ReviveModal';
import RebirthModal from './components/RebirthModal';
import LeaderboardModal from './components/LeaderboardModal';
import ProfileModal from './components/ProfileModal';
import BossRelicModal from './components/BossRelicModal';
import RunSummaryModal from './components/RunSummaryModal';
import Toast from './components/Toast';

import { loadGameState, saveGameState, calculateEnergy, loadFromCloudStorage } from './utils/storage';
import { initTelegram, getUserInfo, hapticImpact } from './utils/telegram';
import { EQUIPMENT_CATALOG, EQUIPMENT_BY_ID, getItemStats, rollEquipmentDrop, getSalvageValue } from './data/equipment';
import { PETS, getPetStats, rollPetGacha } from './data/pets';
import { getRankByMaxFloor } from './data/ranks';
import { REBIRTH_PERKS } from './data/rebirth';
import { rollBossRelics } from './data/artifacts';
import { syncLeaderboard } from './data/leaderboard';
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
  const [runArtifacts, setRunArtifacts] = useState([]);
  const [relicChoice, setRelicChoice] = useState(null);
  const [runSummary, setRunSummary] = useState(null);
  const [reviveModal, setReviveModal] = useState({ isOpen: false, onConfirm: null });
  const [isRebirthOpen, setIsRebirthOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Active run live trackers for the summary screen
  const runTrackerRef = useRef({
    startFloor: 1,
    reachedFloor: 1,
    floorsCleared: 0,
    goldEarned: 0,
    crystalsEarned: 0,
    itemsFound: [],
    monstersDefeated: 0,
    cleared: false
  });

  const user = useMemo(() => getUserInfo(), []);

  const handleCloseToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ id: Date.now() + Math.random(), message, type });
  }, []);

  useEffect(() => {
    initTelegram();

    // Auto-sync player initial standing to online leaderboard
    syncLeaderboard({
      id: user?.id || 777,
      name: state.hunterName || user?.name || 'Охотник',
      title: state.hunterTitle || 'Искатель Башни',
      avatar: state.hunterAvatar || '🧙‍♂️',
      maxFloor: Math.max(1, state.maxFloor || 1),
      souls: Math.max(0, state.souls || 0),
      vip: Boolean(state.vip)
    }).catch(() => {});

    // Cross-Device Sync: fetch from Telegram CloudStorage
    loadFromCloudStorage((cloudState) => {
      setState(prev => {
        const isCloudNewer = (cloudState.lastSavedAt || 0) > (prev.lastSavedAt || 0) ||
                             (cloudState.maxFloor || 1) > (prev.maxFloor || 1) ||
                             (cloudState.stats?.totalRuns || 0) > (prev.stats?.totalRuns || 0);
        if (isCloudNewer) {
          showToast('ПРОГРЕСС СИНХРОНИЗИРОВАН С ДРУГОГО УСТРОЙСТВА! ☁️', 'success');
          const merged = { ...prev, ...cloudState };
          const withEnergy = calculateEnergy(merged);
          return { ...merged, ...withEnergy };
        }
        return prev;
      });
    });
  }, []);

  // Update timer cycle every second to keep 3-min countdown accurate
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

  // Compute total effective player stats dynamically from equipment & progression
  // Hardcore tuning: without a weapon, hunter's unarmed baseAtk is 8 (very weak).
  const playerStats = useMemo(() => {
    let baseHp = 90;
    let baseAtk = 8; // Naked hunter starts with low attack
    let critChance = 3;
    let dodgeChance = 3;
    let vampirism = 0;
    let goldMultiplier = 1.0;
    let crystalMultiplier = 1.0;

    // 1. Equipment Stats (from 4 equipped slots)
    const equipped = state.equipped || {};
    const levels = state.equipmentLevels || {};
    Object.values(equipped).forEach(itemId => {
      if (!itemId) return;
      const itemTemplate = EQUIPMENT_CATALOG.find(it => it.id === itemId) || EQUIPMENT_CATALOG[itemId];
      if (!itemTemplate) return;
      const lvl = levels[itemId] || 1;
      const stats = getItemStats(itemTemplate, lvl);

      if (stats.atk) baseAtk += stats.atk;
      if (stats.maxHp) baseHp += stats.maxHp;
      if (stats.critChance) critChance += stats.critChance;
      if (stats.dodgeChance) dodgeChance += stats.dodgeChance;
      if (stats.vampirism) vampirism += (stats.vampirism > 1 ? stats.vampirism : Math.round(stats.vampirism * 100));
      if (stats.goldBonus) goldMultiplier += stats.goldBonus;
      if (stats.goldMultiplier) goldMultiplier += stats.goldMultiplier;
      if (stats.crystalBonus) crystalMultiplier += stats.crystalBonus;
    });

    // 2. Apply active run artifacts bonuses
    runArtifacts.forEach(art => {
      if (art.effectType === 'atk') baseAtk += art.value;
      if (art.effectType === 'maxHp') baseHp += art.value;
      if (art.effectType === 'critChance') critChance += art.value;
      if (art.effectType === 'dodgeChance') dodgeChance += art.value;
      if (art.effectType === 'goldBonus') goldMultiplier += art.value;
      if (art.effectType === 'doubleCrystals' || art.id === 'fortune_clover') crystalMultiplier *= (art.value || 2);
      if (art.effectType === 'vampirism') {
        const val = art.value > 1 ? art.value : Math.round(art.value * 100);
        vampirism += val;
      }
      if (art.effectType === 'allStats') {
        baseAtk = Math.floor(baseAtk * 1.2);
        baseHp = Math.floor(baseHp * 1.2);
        critChance += 8;
        dodgeChance += 8;
        goldMultiplier += 0.20;
        crystalMultiplier += 0.20;
      }
    });

    // 3. Active Pet Buffs
    if (state.activePetId) {
      const activePet = PETS.find(p => p.id === state.activePetId);
      if (activePet) {
        const petLvl = state.petLevels?.[activePet.id] || 1;
        const petBuffs = getPetStats(activePet, petLvl);
        if (petBuffs.hpBonus) baseHp = Math.floor(baseHp * (1 + petBuffs.hpBonus));
        if (petBuffs.atkBonus) baseAtk = Math.floor(baseAtk * (1 + petBuffs.atkBonus));
        if (petBuffs.critBonus) critChance += petBuffs.critBonus;
        if (petBuffs.dodgeBonus) dodgeChance += petBuffs.dodgeBonus;
        if (petBuffs.goldBonus) goldMultiplier += petBuffs.goldBonus;
        if (petBuffs.crystalBonus) crystalMultiplier += petBuffs.crystalBonus;
      }
    }

    // 4. Hunter Rank Multiplier (calculated strictly from maxFloor)
    const rank = getRankByMaxFloor(state.maxFloor || 1);
    baseHp = Math.floor(baseHp * rank.multiplier);
    baseAtk = Math.floor(baseAtk * rank.multiplier);

    // 5. Rebirth Perks
    const soulPower = state.rebirthPerks?.soul_power || 0;
    const soulVitality = state.rebirthPerks?.soul_vitality || 0;
    const soulFortune = state.rebirthPerks?.soul_fortune || 0;
    const soulInstinct = state.rebirthPerks?.soul_instinct || 0;

    baseAtk = Math.floor(baseAtk * (1 + soulPower * 0.15));
    baseHp = Math.floor(baseHp * (1 + soulVitality * 0.20));
    goldMultiplier += soulFortune * 0.25;
    critChance += soulInstinct * 3;
    dodgeChance += soulInstinct * 2;

    // 6. VIP Permanent Buff
    if (state.vip) {
      goldMultiplier += 0.25;
      crystalMultiplier += 0.25;
    }

    return {
      maxHp: Math.max(50, baseHp),
      atk: Math.max(5, baseAtk),
      critChance: Math.min(80, Math.round(critChance)),
      dodgeChance: Math.min(55, Math.round(dodgeChance)),
      vampirism: Math.min(60, Math.round(vampirism)),
      goldMultiplier: Math.round(goldMultiplier * 100) / 100,
      crystalMultiplier: Math.round(crystalMultiplier * 100) / 100
    };
  }, [state.equipped, state.equipmentLevels, state.activePetId, state.petLevels, state.maxFloor, state.rebirthPerks, state.vip, runArtifacts]);

  const handleStartRun = (startFloor = 1, bonusRelics = 0, bonusPotions = 0) => {
    setState(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 1),
      currentFloor: startFloor,
      potions: prev.potions + (bonusPotions || 0)
    }));

    setRunHp(playerStats.maxHp);

    // Initialize clean run tracker
    runTrackerRef.current = {
      startFloor,
      reachedFloor: startFloor,
      floorsCleared: 0,
      goldEarned: 0,
      crystalsEarned: 0,
      itemsFound: [],
      monstersDefeated: 0,
      cleared: false
    };

    // Grant starting Vanguard Relics for skipped tiers
    if (bonusRelics > 0) {
      const startingRelics = rollBossRelics([], bonusRelics);
      setRunArtifacts(startingRelics);
      showToast(`ПРИПАСЫ АВАНГАРДА: +${startingRelics.length} РЕЛИКВИЙ! 🎁`, 'stars');
    } else {
      setRunArtifacts([]);
    }

    setView('battle');
  };

  const handleFloorCleared = ({ gold, crystals, floor, remainingHp, isBoss, droppedEquipment = [] }) => {
    const healBonus = Math.floor(playerStats.maxHp * 0.20);
    const nextHp = Math.min(playerStats.maxHp, (remainingHp || playerStats.maxHp) + healBonus);
    setRunHp(nextHp);

    // Update live run tracker
    const tracker = runTrackerRef.current;
    tracker.floorsCleared += 1;
    tracker.reachedFloor = floor + 1;
    tracker.goldEarned += gold;
    tracker.crystalsEarned += crystals;
    tracker.monstersDefeated += isBoss ? 1 : 4;
    droppedEquipment.forEach(item => {
      tracker.itemsFound.push(item);
    });

    setState(prev => {
      const inv = [...(prev.inventory || [])];
      const levels = { ...(prev.equipmentLevels || {}) };

      droppedEquipment.forEach(item => {
        if (inv.includes(item.id)) {
          // Duplicate rule: increment level (+1)
          const curLvl = levels[item.id] || 1;
          levels[item.id] = Math.min(20, curLvl + 1);
        } else {
          inv.push(item.id);
          levels[item.id] = 1;
        }
      });

      // Crucial: Only increment maxFloor when a floor is FULLY CLEARED!
      const newMaxFloor = Math.max(prev.maxFloor, floor + 1);

      return {
        ...prev,
        gold: prev.gold + gold,
        crystals: prev.crystals + crystals,
        currentFloor: floor + 1,
        maxFloor: newMaxFloor,
        inventory: inv,
        equipmentLevels: levels,
        stats: {
          ...prev.stats,
          highestFloorCleared: Math.max(prev.stats?.highestFloorCleared || 1, floor),
          monstersKilled: (prev.stats?.monstersKilled || 0) + (isBoss ? 1 : 4),
          bossesKilled: isBoss || floor % 10 === 0 ? (prev.stats?.bossesKilled || 0) + 1 : (prev.stats?.bossesKilled || 0)
        }
      };
    });

    if (droppedEquipment.length > 0) {
      const itemName = droppedEquipment[0]?.name || 'Снаряжение';
      showToast(`ДОБЫЧА: ${itemName.toUpperCase()}! 🛡️`, 'stars');
    }

    // Trigger Boss Relic choice after defeating a boss (10, 20, 30...)
    if (isBoss || floor % 10 === 0) {
      const offered = rollBossRelics(runArtifacts.map(a => a.id));
      setRelicChoice({
        isOpen: true,
        relics: offered
      });
    }
  };

  const handleSelectRelic = (relic) => {
    setRunArtifacts(prev => [...prev, relic]);
    setRelicChoice(null);

    if (relic.effectType === 'potions') {
      setState(prev => ({ ...prev, potions: prev.potions + (relic.value || 2) }));
      showToast(`+${relic.value || 2} ЗЕЛЬЯ ЖИЗНИ В ИНВЕНТАРЬ! 🧪`, 'success');
    } else if (relic.effectType === 'revive') {
      setState(prev => ({ ...prev, reviveTokens: (prev.reviveTokens || 0) + 1 }));
      showToast('ПОЛУЧЕНО ПЕРО ВОЗРОЖДЕНИЯ! 🪶', 'stars');
    } else if (relic.effectType === 'maxHp') {
      setRunHp(prev => (prev || playerStats.maxHp) + (relic.value || 120));
      showToast(`РЕЛИКВИЯ: +${relic.value} HP И ПОЛНЫЙ ОТХИЛ! 🛡️`, 'success');
    } else {
      showToast(`РЕЛИКВИЯ АКТИВИРОВАНА: ${relic.name.toUpperCase()}! 👑`, 'stars');
    }
  };

  const handleRunEnd = ({ gold = 0, crystals = 0, floor, droppedEquipment = [] }) => {
    setRunHp(null);
    setRunArtifacts([]);

    const tracker = runTrackerRef.current;
    tracker.reachedFloor = floor;
    tracker.goldEarned += gold;
    tracker.crystalsEarned += crystals;
    droppedEquipment.forEach(item => {
      if (!tracker.itemsFound.some(it => it.id === item.id)) {
        tracker.itemsFound.push(item);
      }
    });

    // Save final stats, inventory from end-of-run items, and credit floor bounty to player balance
    setState(prev => {
      const inv = [...(prev.inventory || [])];
      const levels = { ...(prev.equipmentLevels || {}) };

      droppedEquipment.forEach(item => {
        if (inv.includes(item.id)) {
          // Duplicate rule: increment level (+1)
          const curLvl = levels[item.id] || 1;
          levels[item.id] = Math.min(20, curLvl + 1);
        } else {
          inv.push(item.id);
          levels[item.id] = 1;
        }
      });

      return {
        ...prev,
        gold: prev.gold + gold,
        crystals: prev.crystals + crystals,
        inventory: inv,
        equipmentLevels: levels,
        currentFloor: 1,
        stats: {
          ...prev.stats,
          totalRuns: (prev.stats?.totalRuns || 0) + 1
        }
      };
    });

    // Auto-sync high score to global Upstash leaderboard
    syncLeaderboard({
      id: user?.id || 777,
      name: state.hunterName || user?.name || 'Охотник',
      title: state.hunterTitle || 'Искатель Башни',
      avatar: state.hunterAvatar || '🧙‍♂️',
      maxFloor: Math.max(state.maxFloor || 1, floor),
      souls: state.souls || 0,
      vip: Boolean(state.vip)
    }).catch(() => {});

    // Show Run Summary screen in Hub
    setRunSummary({ ...tracker });
    setView('hub');
  };

  const handleEquipItem = (itemOrId) => {
    const template = typeof itemOrId === 'object' && itemOrId
      ? itemOrId
      : EQUIPMENT_CATALOG[itemOrId];
    if (!template) return;

    setState(prev => ({
      ...prev,
      equipped: {
        ...(prev.equipped || {}),
        [template.slot]: template.id
      }
    }));
    showToast(`НАДЕТО: ${template.name.toUpperCase()}! 🛡️`, 'success');
  };

  const handleUpgradeItem = (itemOrId, goldCost, crystalCost) => {
    const template = typeof itemOrId === 'object' && itemOrId
      ? itemOrId
      : EQUIPMENT_CATALOG[itemOrId];
    if (!template) return;

    const itemId = template.id;

    setState(prev => {
      const currentLvl = prev.equipmentLevels?.[itemId] || 1;
      return {
        ...prev,
        gold: Math.max(0, prev.gold - goldCost),
        crystals: Math.max(0, prev.crystals - crystalCost),
        equipmentLevels: {
          ...(prev.equipmentLevels || {}),
          [itemId]: currentLvl + 1
        }
      };
    });
  };

  const handleSalvageItem = (itemOrId) => {
    const template = typeof itemOrId === 'object' && itemOrId
      ? itemOrId
      : (EQUIPMENT_BY_ID?.[itemOrId] || EQUIPMENT_CATALOG.find(it => it.id === itemOrId));
    if (!template) return;

    if (template.id === 'rusty_dagger') {
      showToast('СТАРТОВЫЙ МЕЧ НЕЛЬЗЯ РАЗОБРАТЬ! ⚔️', 'error');
      return;
    }

    const crystalsYield = getSalvageValue(template.rarity);

    setState(prev => {
      const inv = (prev.inventory || []).filter(id => id !== template.id);
      const equipped = { ...(prev.equipped || {}) };
      if (equipped[template.slot] === template.id) {
        equipped[template.slot] = null;
      }
      const levels = { ...(prev.equipmentLevels || {}) };
      delete levels[template.id];

      return {
        ...prev,
        inventory: inv,
        equipped,
        equipmentLevels: levels,
        crystals: (prev.crystals || 0) + crystalsYield
      };
    });

    sounds.playCoin();
    showToast(`ПРЕДМЕТ РАЗОБРАН: +${crystalsYield} 💎!`, 'stars');
  };

  const handleEquipPet = (petId) => {
    setState(prev => ({ ...prev, activePetId: petId }));
  };

  const handleUnlockPet = (petId) => {
    setState(prev => {
      const owned = Array.isArray(prev.ownedPets) ? prev.ownedPets : [];
      const isAlreadyOwned = owned.includes(petId);
      const currentLvl = prev.petLevels?.[petId] || 1;

      if (isAlreadyOwned) {
        if (currentLvl >= 20) {
          return {
            ...prev,
            crystals: prev.crystals + 50,
            gold: prev.gold + 500
          };
        } else {
          return {
            ...prev,
            petLevels: {
              ...(prev.petLevels || {}),
              [petId]: currentLvl + 1
            }
          };
        }
      }

      return {
        ...prev,
        ownedPets: [...owned, petId],
        petLevels: {
          ...(prev.petLevels || {}),
          [petId]: 1
        }
      };
    });
  };

  const handleUpgradePet = (petId, goldCost, crystalCost) => {
    setState(prev => ({
      ...prev,
      gold: prev.gold - goldCost,
      crystals: prev.crystals - crystalCost,
      petLevels: {
        ...(prev.petLevels || {}),
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
      potions: 1,
      energy: prev.maxEnergy,
      equipped: prev.equipped,
      equipmentLevels: prev.equipmentLevels,
      inventory: prev.inventory,
      ownedPets: prev.ownedPets,
      activePetId: prev.activePetId,
      petLevels: prev.petLevels
    }));
    setIsRebirthOpen(false);
    showToast(`ПЕРЕРОЖДЕНИЕ СОВЕРШЕНО! ПОЛУЧЕНО +${earnedSouls} ДУШ 🔮`, 'stars');
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
    setState(prev => {
      const updated = {
        ...prev,
        ...customData
      };
      // Sync customized profile to live leaderboard
      syncLeaderboard({
        id: user?.id || 777,
        name: updated.hunterName || user?.name || 'Охотник',
        title: updated.hunterTitle || 'Искатель Башни',
        avatar: updated.hunterAvatar || '🧙‍♂️',
        maxFloor: Math.max(1, updated.maxFloor || 1),
        souls: Math.max(0, updated.souls || 0),
        vip: Boolean(updated.vip)
      }).catch(() => {});
      return updated;
    });
  };

  const handleStarsPurchaseSuccess = (action) => {
    if (action === 'gear_chest') {
      const forceRarity = Math.random() < 0.6 ? 'epic' : 'legendary';
      const dropped = rollEquipmentDrop(Math.max(30, state.maxFloor || 1), forceRarity);
      if (dropped) {
        let isDup = false;
        let newLvl = 1;
        setState(prev => {
          const inv = prev.inventory || [];
          isDup = inv.includes(dropped.id);
          const newInv = isDup ? inv : [...inv, dropped.id];
          const levels = { ...(prev.equipmentLevels || {}) };
          if (isDup) {
            newLvl = Math.min(20, (levels[dropped.id] || 1) + 1);
            levels[dropped.id] = newLvl;
          } else {
            levels[dropped.id] = 1;
          }
          return {
            ...prev,
            inventory: newInv,
            equipmentLevels: levels
          };
        });
        if (isDup) {
          showToast(`ДУБЛИКАТ: ${dropped.name.toUpperCase()} УЛУЧШЕН ДО +${newLvl}! 👑`, 'stars');
        } else {
          showToast(`ИЗ СУНДУКА БЕЗДНЫ ВЫПАЛО: ${dropped.name.toUpperCase()}! 👑`, 'stars');
        }
      }
    } else if (action === 'smith_pack') {
      setState(prev => ({
        ...prev,
        gold: prev.gold + 5000,
        crystals: prev.crystals + 100
      }));
      showToast('НАБОР КУЗНЕЦА: +5,000 🪙 И +100 💎!', 'stars');
    } else if (action === 'egg') {
      const pet = rollPetGacha();
      const isDuplicate = (state.ownedPets || []).includes(pet.id);
      handleUnlockPet(pet.id);
      handleEquipPet(pet.id);
      if (isDuplicate) {
        showToast(`ДУБЛИКАТ: ${pet.name.toUpperCase()} ПОВЫСИЛ УРОВЕНЬ! 🐾`, 'stars');
      } else {
        showToast(`ВЫЛУПИЛСЯ: ${pet.name.toUpperCase()}! ЭКИПИРОВАН! 🐾`, 'stars');
      }
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
      <Toast toast={toast} onClose={handleCloseToast} />

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
            runArtifacts={runArtifacts}
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

            {(activeTab === 'inventory' || activeTab === 'upgrades') && (
              <InventoryView
                state={state}
                runArtifacts={runArtifacts}
                onEquipItem={handleEquipItem}
                onUpgradeItem={handleUpgradeItem}
                onSalvageItem={handleSalvageItem}
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

      {/* Run Summary Modal (Displayed upon return to Hub) */}
      {runSummary && (
        <RunSummaryModal
          summary={runSummary}
          onClose={() => setRunSummary(null)}
        />
      )}

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

      {/* Boss Relic Selection Modal */}
      {relicChoice?.isOpen && (
        <BossRelicModal
          relics={relicChoice.relics}
          onSelectRelic={handleSelectRelic}
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
                setActiveTab('inventory');
              }}
              className={`flex flex-col items-center justify-center py-2 border-2 border-black transition-all ${
                activeTab === 'inventory' || activeTab === 'upgrades'
                  ? 'bg-neo-cyan text-black shadow-brutal-sm'
                  : 'bg-white text-black hover:bg-slate-100'
              }`}
            >
              <Shield className="w-5 h-5 mb-0.5 stroke-[3]" />
              <span className="font-arcade text-[10px] uppercase">СНАРЯЖЕНИЕ</span>
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
