import React, { useState } from 'react';
import { PETS, getPetStats, getPetUpgradeCost, rollPetGacha } from '../data/pets';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';
import { Sparkles, Check, Star, ArrowUpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PetSanctuary({ 
  state, 
  onEquipPet, 
  onUnlockPet, 
  onUpgradePet,
  onSpendCrystals,
  onOpenStarsShop,
  onShowToast
}) {
  const [summoning, setSummoning] = useState(false);
  const [summonedPet, setSummonedPet] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(state.activePetId || 'green_slime');

  const handleSummon = (currency) => {
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
      setSummonedPet(pet);
      setSummoning(false);
      onUnlockPet(pet.id);
      sounds.playLevelUp();
      hapticNotification('success');
      onShowToast(`ВЫБИТ ПИТОМЕЦ: ${pet.name}! 🎉`, 'success');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }, 1000);
  };

  const selectedPet = PETS.find(p => p.id === selectedPetId) || PETS[0];
  const petLevel = state.petLevels?.[selectedPet.id] || 1;
  const petStats = getPetStats(selectedPet, petLevel);
  const { gold: upGold, crystals: upCrystals } = getPetUpgradeCost(petLevel);
  const isOwned = state.ownedPets.includes(selectedPet.id);
  const isActive = state.activePetId === selectedPet.id;
  const canUpgrade = state.gold >= upGold && state.crystals >= upCrystals && petLevel < 20;

  const handleLevelUp = () => {
    if (!canUpgrade || !isOwned) return;
    sounds.playLevelUp();
    hapticNotification('success');
    onUpgradePet(selectedPet.id, upGold, upCrystals);
    onShowToast(`УРОВЕНЬ ${selectedPet.name} ПОВЫШЕН ДО ${petLevel + 1}! ✨`, 'success');
  };

  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">
      
      {/* Arcade Header Box */}
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-arcade text-base text-black flex items-center gap-1.5 uppercase truncate">
            <span>🐾</span>
            <span>ПИТОМНИК ОХОТНИКОВ</span>
          </h2>
          <p className="text-[11px] font-bold text-slate-700 mt-0.5 truncate uppercase">
            СПУТНИКИ РАСТУТ В БОЮ И ДАЮТ БАФФЫ!
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="font-arcade text-xs text-neo-pink block">
            {state.ownedPets.length} / {PETS.length}
          </span>
        </div>
      </div>

      {/* Gacha Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => handleSummon('crystals')}
          className="flex items-center justify-center gap-1.5 py-3 px-2 bg-neo-cyan active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-black border-3 border-black font-arcade text-xs shadow-brutal transition-all uppercase"
        >
          <span>ПРИЗЫВ (40 💎)</span>
        </button>

        <button
          onClick={onOpenStarsShop}
          className="flex items-center justify-center gap-1.5 py-3 px-2 bg-neo-yellow active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-black border-3 border-black font-arcade text-xs shadow-brutal transition-all uppercase"
        >
          <Star className="w-4 h-4 fill-black stroke-[3]" />
          <span>ЯЙЦО (25 ⭐️)</span>
        </button>
      </div>

      {/* Selected Pet Detail Card */}
      <div className="bg-white border-4 border-black p-4 shadow-brutal-lg">
        <div className="flex items-start gap-3.5">
          <div className="w-16 h-16 bg-neo-yellow border-3 border-black shadow-brutal-sm flex items-center justify-center text-4xl shrink-0">
            {selectedPet.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-arcade text-base text-black uppercase truncate">
                {selectedPet.name}
              </h3>
              <span className="bg-black text-white px-2 py-0.5 font-arcade text-[9px] uppercase shrink-0">
                {selectedPet.rarityName}
              </span>
            </div>

            <div className="text-xs font-black text-neo-purple mt-0.5 uppercase">
              УРОВЕНЬ: {petLevel} / 20
            </div>

            <p className="text-xs font-bold text-slate-700 mt-1 line-clamp-2">
              {selectedPet.description}
            </p>
          </div>
        </div>

        {/* Buffs Strip */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t-3 border-black text-center">
          <div className="bg-neo-lime text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">HP БОНУС</div>
            <div className="font-arcade text-xs mt-0.5">+{Math.round(petStats.hpBonus * 100)}%</div>
          </div>

          <div className="bg-neo-pink text-white border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">АТАКА</div>
            <div className="font-arcade text-xs mt-0.5">+{Math.round(petStats.atkBonus * 100)}%</div>
          </div>

          <div className="bg-neo-yellow text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">ЗОЛОТО</div>
            <div className="font-arcade text-xs mt-0.5">+{Math.round(petStats.goldBonus * 100)}%</div>
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
                  <span>ПРОКАЧАТЬ ({upGold}🪙 {upCrystals}💎)</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full py-2.5 bg-slate-200 border-2 border-black font-arcade text-slate-600 text-xs text-center uppercase">
              🔒 ЗАКРЫТ. ИСПЫТАЙ УДАЧУ В ПРИЗЫВЕ!
            </div>
          )}
        </div>
      </div>

      {/* Roster Grid */}
      <div className="space-y-1.5">
        <h4 className="font-arcade text-xs text-black uppercase px-1">
          КОЛЛЕКЦИЯ СПУТНИКОВ:
        </h4>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {PETS.map(pet => {
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
                    ? 'bg-white shadow-brutal-sm hover:bg-slate-50' 
                    : 'bg-slate-200 opacity-40 shadow-none'
                }`}
              >
                {active && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-neo-lime border-2 border-black" />
                )}

                <div className="text-3xl my-1 shrink-0">
                  {pet.avatar}
                </div>

                <div className="w-full min-w-0">
                  <div className="font-arcade text-[10px] text-black truncate uppercase">
                    {pet.name}
                  </div>
                  <div className="text-[9px] font-black text-slate-700 truncate">
                    {owned ? `УР. ${level}` : 'ЗАКРЫТ'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summoning Modal */}
      {summoning && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
          <div className="w-24 h-24 bg-neo-yellow border-4 border-black flex items-center justify-center text-5xl animate-bounce shadow-brutal-lg mb-3">
            🥚
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
            <div className="w-20 h-20 bg-white border-3 border-black flex items-center justify-center text-4xl mb-2.5 shadow-brutal">
              {summonedPet.avatar}
            </div>

            <span className="bg-black text-white px-2.5 py-0.5 font-arcade text-[9px] uppercase mb-1">
              {summonedPet.rarityName} СПУТНИК!
            </span>

            <h2 className="font-arcade text-lg text-black uppercase mb-1">
              {summonedPet.name}
            </h2>

            <p className="text-xs font-bold text-slate-800 mb-4 break-words">
              {summonedPet.description}
            </p>

            <button
              onClick={() => {
                onEquipPet(summonedPet.id);
                setSelectedPetId(summonedPet.id);
                setSummonedPet(null);
              }}
              className="w-full py-3 bg-neo-pink text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] uppercase"
            >
              ВЗЯТЬ В СПУТНИКИ!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
