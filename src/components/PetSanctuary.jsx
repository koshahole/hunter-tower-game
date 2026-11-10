import React, { useState, useEffect, useMemo } from 'react';
import { PETS, getPetStats, getPetUpgradeCost, rollPetGacha } from '../data/pets';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification, openStarsInvoice } from '../utils/telegram';
import { Check, Star, ArrowUpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PetAvatar, CurrencyIcon, GameIcon } from './icons';

const formatPetPct = (val) => {
  const pct = Math.round((val || 0) * 1000) / 10;
  return Number.isInteger(pct) ? String(pct) : pct.toFixed(1);
};

const RARITY_ORDER = { legendary: 4, epic: 3, rare: 2, common: 1 };

export default function PetSanctuary({
  state,
  onEquipPet,
  onUnlockPet,
  onUpgradePet,
  onSpendCrystals,
  onBuyStarsEgg,
  onOpenStarsShop,
  onShowToast
}) {
  const [summoning, setSummoning] = useState(false);
  const [summonedPet, setSummonedPet] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // all | owned | common | rare | epic | legendary
  const [selectedPetId, setSelectedPetId] = useState(
    () => state.activePetId || state.ownedPets?.[0] || PETS[0]?.id || 'volchonok'
  );

  useEffect(() => {
    if (state.activePetId) {
      setSelectedPetId(state.activePetId);
    }
  }, [state.activePetId]);

  const handleSummon = (currency) => {
    if (summoning) return;
    if (currency === 'crystals') {
      if (state.crystals < 40) {
        hapticNotification('error');
        onShowToast('НУЖНО 40 💎 ДЛЯ ПРИЗЫВА!', 'warning');
        return;
      }
      onSpendCrystals(40);
    }

    setSummoning(true);
    hapticImpact('heavy');
    sounds.playSkill();

    setTimeout(() => {
      const pet = rollPetGacha();
      const isOwnedBefore = state.ownedPets.includes(pet.id);
      const currentLevelBefore = state.petLevels?.[pet.id] || 1;

      onUnlockPet(pet.id);
      setSummonedPet({
        ...pet,
        isDuplicate: isOwnedBefore,
        newLevel: isOwnedBefore ? Math.min(20, currentLevelBefore + 1) : 1,
        isMaxCompensation: currentLevelBefore >= 20
      });
      setSummoning(false);
      sounds.playLevelUp();
      hapticNotification('success');

      if (isOwnedBefore) {
        if (currentLevelBefore >= 20) {
          onShowToast(`ДУБЛИКАТ ${pet.name}! ПОЛУЧЕНО 50 💎 И 500 🪙!`, 'stars');
        } else {
          onShowToast(`ДУБЛИКАТ! ${pet.name.toUpperCase()} УЛУЧШЕН ДО УР. ${currentLevelBefore + 1}! ✨`, 'stars');
        }
      } else {
        onShowToast(`НОВЫЙ ПИТОМЕЦ: ${pet.name}! 🎉`, 'success');
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }, 900);
  };

  const handleBuyEggDirect = () => {
    hapticImpact('medium');
    if (!onBuyStarsEgg) {
      onOpenStarsShop?.();
      return;
    }
    openStarsInvoice(
      {
        id: 'stars_egg',
        name: 'ЗОЛОТОЕ ЯЙЦО ГАЧИ',
        description: 'Случайный питомец в коллекцию или усиление дубликата',
        price: 25,
      },
      () => {
        sounds.playStarsPurchase();
        hapticNotification('success');
        onBuyStarsEgg();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 }
        });
      },
      (error) => {
        if (error !== 'cancelled') {
          onShowToast('Платеж отменен или не удался.', 'warning');
        }
      }
    );
  };

  const selectedPet = PETS.find(p => p.id === selectedPetId) || PETS[0];
  const petLevel = state.petLevels?.[selectedPet.id] || 1;
  const petStats = getPetStats(selectedPet, petLevel);
  const { gold: upGold, crystals: upCrystals } = getPetUpgradeCost(petLevel);
  const isOwned = state.ownedPets.includes(selectedPet.id);
  const isActive = state.activePetId === selectedPet.id;
  const canUpgrade = state.gold >= upGold && state.crystals >= upCrystals && petLevel < 20;

  const filteredAndSortedPets = useMemo(() => {
    const ownedSet = new Set(state.ownedPets || []);
    const list = PETS.filter(pet => {
      if (filterMode === 'owned') return ownedSet.has(pet.id);
      if (filterMode === 'all') return true;
      return pet.rarity === filterMode;
    });

    return list.sort((a, b) => {
      const aActive = state.activePetId === a.id ? 1 : 0;
      const bActive = state.activePetId === b.id ? 1 : 0;
      if (aActive !== bActive) return bActive - aActive;

      const aOwned = ownedSet.has(a.id) ? 1 : 0;
      const bOwned = ownedSet.has(b.id) ? 1 : 0;
      if (aOwned !== bOwned) return bOwned - aOwned;

      const rarDiff = (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0);
      if (rarDiff !== 0) return rarDiff;

      return (state.petLevels?.[b.id] || 1) - (state.petLevels?.[a.id] || 1);
    });
  }, [filterMode, state.ownedPets, state.activePetId, state.petLevels]);

  const handleLevelUp = () => {
    if (!canUpgrade || !isOwned) return;
    sounds.playLevelUp();
    hapticNotification('success');
    onUpgradePet(selectedPet.id, upGold, upCrystals);
    onShowToast(`УРОВЕНЬ ${selectedPet.name} ПОВЫШЕН ДО ${petLevel + 1}! ✨`, 'success');
  };

  const FILTERS = [
    { key: 'all', label: `ВСЕ (${PETS.length})` },
    { key: 'owned', label: `МОИ (${state.ownedPets.length})` },
    { key: 'legendary', label: 'ЛЕГ' },
    { key: 'epic', label: 'ЭПИК' },
    { key: 'rare', label: 'РЕДК' },
    { key: 'common', label: 'ОБЫЧ' },
  ];

  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">

      {/* Arcade Header Box */}
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-arcade text-base text-black flex items-center gap-1.5 uppercase truncate">
            <PetAvatar pet={selectedPet} size="xs" inline />
            <span>ПИТОМНИК ОХОТНИКОВ</span>
          </h2>
          <p className="text-[11px] font-bold text-slate-700 mt-0.5 uppercase">
            АКТИВНЫЙ СПУТНИК ДАЁТ ПАССИВНЫЕ БАФФЫ. ПИТОМЦЕВ НЕЛЬЗЯ РАЗБИРАТЬ.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="font-arcade text-xs text-neo-pink block">
            {state.ownedPets.length} / {PETS.length}
          </span>
        </div>
      </div>

      {/* Gacha Action Buttons + Honest Drop Rates */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleSummon('crystals')}
            disabled={summoning}
            className="flex items-center justify-center gap-1.5 py-3 px-2 bg-neo-cyan active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-black border-3 border-black font-arcade text-xs shadow-brutal transition-all uppercase"
          >
            <span className="inline-flex items-center gap-1">
              <span>ПРИЗЫВ (40</span>
              <CurrencyIcon type="crystal" size="xs" inline />
              <span>)</span>
            </span>
          </button>

          <button
            onClick={handleBuyEggDirect}
            disabled={summoning}
            className="flex items-center justify-center gap-1.5 py-3 px-2 bg-neo-yellow active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-black border-3 border-black font-arcade text-xs shadow-brutal transition-all uppercase"
          >
            <CurrencyIcon type="star" size="xs" inline />
            <span>ЯЙЦО (25 ЗВЁЗД)</span>
          </button>
        </div>

        <div className="bg-white border-2 border-black px-2.5 py-1.5 text-[11px] font-bold text-slate-800 text-center shadow-brutal-sm">
          🎲 Шансы гачи: <strong>50%</strong> Обыч • <strong>32%</strong> Редк • <strong>15%</strong> Эпик • <strong>3%</strong> Лег (дубль = +1 ур.)
        </div>
      </div>

      {/* Selected Pet Detail Card */}
      <div className="bg-white border-4 border-black p-4 shadow-brutal-lg">
        <div className="flex items-start gap-3.5">
          <div className="w-16 h-16 bg-neo-yellow border-3 border-black shadow-brutal-sm flex items-center justify-center p-1 shrink-0">
            <PetAvatar pet={selectedPet} size="full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-arcade text-base text-black uppercase truncate">
                {selectedPet.name}
              </h3>
              <span className="bg-black text-white px-2 py-0.5 font-arcade text-[11px] uppercase shrink-0">
                {selectedPet.rarityName}
              </span>
            </div>

            <div className="text-xs font-black text-neo-purple mt-0.5 uppercase">
              УРОВЕНЬ: {petLevel} / 20
            </div>

            <p className="text-xs font-bold text-slate-700 mt-1 break-words">
              {selectedPet.description}
            </p>
          </div>
        </div>

        {/* All 6 Real Engine Buffs Strip */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t-3 border-black text-center">
          <div className="bg-neo-lime text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">HP</div>
            <div className="font-arcade text-xs mt-0.5">+{formatPetPct(petStats.hpBonus)}%</div>
          </div>

          <div className="bg-neo-pink text-white border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">АТАКА</div>
            <div className="font-arcade text-xs mt-0.5">+{formatPetPct(petStats.atkBonus)}%</div>
          </div>

          <div className="bg-neo-yellow text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">ЗОЛОТО</div>
            <div className="font-arcade text-xs mt-0.5">+{formatPetPct(petStats.goldBonus)}%</div>
          </div>

          <div className="bg-amber-200 text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">КРИТ</div>
            <div className="font-arcade text-xs mt-0.5">+{petStats.critBonus || 0}%</div>
          </div>

          <div className="bg-emerald-200 text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">УВОРОТ</div>
            <div className="font-arcade text-xs mt-0.5">+{petStats.dodgeBonus || 0}%</div>
          </div>

          <div className="bg-neo-cyan text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">КРИСТ</div>
            <div className="font-arcade text-xs mt-0.5">+{formatPetPct(petStats.crystalBonus)}%</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-3.5 flex flex-wrap gap-2">
          {isOwned ? (
            <>
              {isActive ? (
                <div className="flex-1 py-2.5 bg-neo-lime border-3 border-black text-black font-arcade text-xs flex items-center justify-center gap-1.5 shadow-brutal-sm uppercase">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>В БОЮ</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    sounds.playSkill();
                    hapticImpact('light');
                    onEquipPet(selectedPet.id);
                    onShowToast(`${selectedPet.name} ВЗЯТ В БОЙ!`, 'success');
                  }}
                  className="flex-1 py-2.5 bg-black text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] uppercase"
                >
                  ВЫБРАТЬ
                </button>
              )}

              {petLevel < 20 && (
                <button
                  onClick={handleLevelUp}
                  disabled={!canUpgrade}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-2.5 px-3 border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[1px] active:translate-y-[1px] ${
                    canUpgrade
                      ? 'bg-neo-pink text-white'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <ArrowUpCircle className="w-4 h-4 stroke-[3]" />
                  <span className="inline-flex items-center gap-1">
                    <span>ПРОКАЧАТЬ (</span>
                    <CurrencyIcon type="gold" size="xs" inline />
                    <span>{upGold}</span>
                    <CurrencyIcon type="crystal" size="xs" inline />
                    <span>{upCrystals})</span>
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full py-2.5 bg-slate-200 border-2 border-black font-arcade text-slate-700 text-xs text-center uppercase px-2">
              🔒 ЗАКРЫТ. ИСПЫТАЙ УДАЧУ В ПРИЗЫВЕ!
            </div>
          )}
        </div>
      </div>

      {/* Filter Chips & Roster Grid (Owned-First) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-arcade text-xs text-black uppercase">
            КОЛЛЕКЦИЯ ({filteredAndSortedPets.length}):
          </h4>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => {
                hapticImpact('light');
                setFilterMode(f.key);
              }}
              className={`px-2.5 py-1.5 border-2 border-black font-arcade text-[11px] uppercase whitespace-nowrap shrink-0 transition-all ${
                filterMode === f.key
                  ? 'bg-black text-neo-yellow shadow-brutal-sm'
                  : 'bg-white text-black [@media(hover:hover)]:hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filteredAndSortedPets.length === 0 ? (
          <div className="bg-white border-3 border-black p-5 text-center text-xs font-bold text-slate-600 shadow-brutal-sm">
            Пока нет открытых спутников. Нажмите «ПРИЗЫВ (40 💎)» выше!
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {filteredAndSortedPets.map(pet => {
              const owned = state.ownedPets.includes(pet.id);
              const active = state.activePetId === pet.id;
              const selected = selectedPetId === pet.id;
              const level = state.petLevels?.[pet.id] || 1;

              return (
                <button
                  key={pet.id}
                  onClick={() => {
                    hapticImpact('light');
                    setSelectedPetId(pet.id);
                  }}
                  className={`relative p-2 border-3 border-black text-center transition-all flex flex-col items-center justify-between ${
                    selected
                      ? 'bg-neo-yellow shadow-brutal translate-x-[-2px] translate-y-[-2px]'
                      : owned
                      ? 'bg-white shadow-brutal-sm [@media(hover:hover)]:hover:bg-slate-50'
                      : 'bg-slate-200 opacity-50 shadow-none'
                  }`}
                >
                  {active && (
                    <span className="absolute top-1 right-1 w-3 h-3 bg-neo-lime border-2 border-black" />
                  )}

                  <div className="w-12 h-12 my-1 shrink-0 flex items-center justify-center">
                    <PetAvatar pet={pet} size="full" />
                  </div>

                  <div className="w-full min-w-0">
                    <div className="font-arcade text-[11px] text-black truncate uppercase">
                      {pet.name}
                    </div>
                    <div className="text-[11px] font-black text-slate-700 truncate">
                      {owned ? `УР. ${level}` : 'ЗАКРЫТ'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Summoning Modal */}
      {summoning && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
          <div className="w-24 h-24 bg-neo-yellow border-4 border-black flex items-center justify-center animate-bounce shadow-brutal-lg mb-3 p-4">
            <GameIcon icon="sparkles" size="full" />
          </div>
          <h3 className="font-arcade text-lg text-white uppercase">
            ПРИЗЫВ СПУТНИКА...
          </h3>
        </div>
      )}

      {/* Result Modal */}
      {summonedPet && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-center animate-fadeIn">
          <div className="bg-neo-yellow border-4 border-black p-5 shadow-brutal-lg max-w-xs w-full flex flex-col items-center">
            <div className="w-20 h-20 bg-white border-3 border-black flex items-center justify-center mb-2.5 shadow-brutal p-2">
              <PetAvatar pet={summonedPet} size="full" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center mb-1.5">
              <span className="bg-black text-white px-2.5 py-0.5 font-arcade text-[11px] uppercase">
                {summonedPet.rarityName} СПУТНИК
              </span>
              {summonedPet.isDuplicate ? (
                <span className="bg-neo-pink text-white border border-black px-2 py-0.5 font-arcade text-[11px] uppercase">
                  ДУБЛИКАТ: УР. {summonedPet.newLevel}!
                </span>
              ) : (
                <span className="bg-neo-lime text-black border border-black px-2 py-0.5 font-arcade text-[11px] uppercase">
                  НОВЫЙ!
                </span>
              )}
            </div>

            <h2 className="font-arcade text-lg text-black uppercase mb-1">
              {summonedPet.name}
            </h2>

            <p className="text-xs font-bold text-slate-800 mb-4 break-words">
              {summonedPet.isDuplicate
                ? (summonedPet.isMaxCompensation
                    ? 'Питомец уже 20 уровня! Начислена компенсация 50 Кристаллов Бездны и 500 Золота.'
                    : `Уровень питомца повышен до ${summonedPet.newLevel}! Все бонусы усилены на +15%.`)
                : summonedPet.description}
            </p>

            <button
              onClick={() => {
                onEquipPet(summonedPet.id);
                setSelectedPetId(summonedPet.id);
                setSummonedPet(null);
              }}
              className="w-full py-3 bg-neo-pink text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] uppercase"
            >
              {summonedPet.isDuplicate ? 'ПРОДОЛЖИТЬ' : 'ВЗЯТЬ В СПУТНИКИ!'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
