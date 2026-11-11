import React from 'react';
import { Trophy, Skull, Swords, ArrowRight, Shield, Gem, Star } from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact } from '../utils/telegram';
import { RARITIES } from '../data/equipment';
import { GameIcon, CurrencyIcon, EquipmentIcon } from './icons';

export default function RunSummaryModal({ summary, onClose }) {
  if (!summary) return null;

  const {
    cleared = false,
    startFloor = 1,
    reachedFloor = 1,
    floorsCleared = 0,
    goldEarned = 0,
    crystalsEarned = 0,
    itemsFound = [],
    monstersDefeated = 0,
  } = summary;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-center animate-fadeIn font-sans select-none">
      <div className="bg-white border-4 border-black p-5 shadow-brutal-lg max-w-sm w-full flex flex-col items-center">

        {/* Banner Avatar */}
        <div className={`w-16 h-16 border-3 border-black flex items-center justify-center mb-2 shadow-brutal p-2.5 ${
          cleared ? 'bg-neo-yellow' : 'bg-neo-pink text-white'
        }`}>
          <GameIcon icon={cleared ? 'trophy' : 'skull'} size="full" />
        </div>

        {/* Title */}
        <h2 className="font-arcade text-lg sm:text-xl text-black uppercase leading-tight">
          {cleared ? 'ШТУРМ ЗАВЕРШЕН!' : 'ИТОГИ ЗАБЕГА'}
        </h2>
        <p className="text-xs font-bold text-slate-700 mt-0.5 uppercase">
          {cleared
            ? `ПОБЕДНЫЙ ВЫХОД ИЗ БАШНИ!`
            : `ЗАВЕРШЕНО НА ЭТАЖЕ ${reachedFloor}`}
        </p>

        {/* Stats Grid */}
        <div className="w-full my-3 space-y-2 text-left">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-neo-yellow border-2 border-black p-2 shadow-brutal-sm">
              <span className="text-[11px] font-black uppercase text-slate-700 block">ДОБЫТО ЗОЛОТА</span>
              <div className="font-arcade text-sm text-black flex items-center gap-1 mt-0.5">
                <CurrencyIcon type="gold" size="xs" inline />
                <span>+{goldEarned}</span>
              </div>
            </div>

            <div className="bg-neo-cyan border-2 border-black p-2 shadow-brutal-sm">
              <span className="text-[11px] font-black uppercase text-slate-700 block">КРИСТАЛЛЫ БЕЗДНЫ</span>
              <div className="font-arcade text-sm text-black flex items-center gap-1 mt-0.5">
                <CurrencyIcon type="crystal" size="xs" inline />
                <span>+{crystalsEarned}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-100 border-2 border-black p-2 shadow-brutal-sm">
              <span className="text-[11px] font-black uppercase text-slate-700 block">ЗАЧИЩЕНО ЭТАЖЕЙ</span>
              <div className="font-arcade text-sm text-black mt-0.5">
                {floorsCleared} ЭТ.
              </div>
            </div>

            <div className="bg-slate-100 border-2 border-black p-2 shadow-brutal-sm">
              <span className="text-[11px] font-black uppercase text-slate-700 block">ВРАГОВ ПОВЕРЖЕНО</span>
              <div className="font-arcade text-sm text-black mt-0.5 flex items-center gap-1.5">
                <GameIcon icon="skull" size="xs" inline />
                <span>{monstersDefeated} ВРАГОВ</span>
              </div>
            </div>
          </div>

          {/* Loot Found */}
          <div className="bg-slate-50 border-2 border-black p-2.5 shadow-brutal-sm">
            <div className="flex items-center justify-between font-arcade text-[11px] text-black uppercase mb-1.5">
              <span className="inline-flex items-center gap-1">
                <GameIcon icon="chest" size="xs" inline />
                <span>НАЙДЕНО СНАРЯЖЕНИЯ:</span>
              </span>
              <span className="text-neo-pink">
                {itemsFound.length > 0 ? `${itemsFound.length} ШТ.` : 'НЕТ'}
              </span>
            </div>

            {itemsFound.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {itemsFound.map((item, idx) => {
                  const rarity = RARITIES[item.rarity] || RARITIES.common;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-1.5 bg-white border border-black text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                          <EquipmentIcon item={item} size="xs" />
                        </div>
                        <span className="font-arcade text-[11px] text-black truncate uppercase">
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-[11px] font-black uppercase px-1.5 border border-black shrink-0 ${rarity.bg} ${rarity.text}`}>
                        {rarity.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[11px] font-bold text-slate-600 italic">
                В этой вылазке экипировка не выпала. В Башне ценный лут падает с Вожаков и Боссов!
              </p>
            )}
          </div>
        </div>

        {/* Close / Return Button */}
        <button
          onClick={() => {
            hapticImpact('light');
            onClose();
          }}
          className="w-full py-3 bg-neo-pink text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase transition-all flex items-center justify-center gap-2"
        >
          <span>ПРИНЯТЬ И ВЕРНУТЬСЯ В ХАБ</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>

      </div>
    </div>
  );
}
