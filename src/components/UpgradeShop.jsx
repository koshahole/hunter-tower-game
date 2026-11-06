import React from 'react';
import { UPGRADES, getUpgradeCost, getTotalStatBonus, getNextLevelBonus } from '../data/upgrades';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';

export default function UpgradeShop({ state, onBuyUpgrade, onShowToast }) {
  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">
      
      {/* Arcade Header Box */}
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal">
        <h2 className="font-arcade text-base text-black flex items-center gap-2 uppercase">
          <span>⚔️</span>
          <span>АРСЕНАЛ ОХОТНИКА</span>
        </h2>
        <p className="text-[11px] font-bold text-slate-700 mt-0.5 uppercase">
          ПРОГРЕССИВНАЯ ПРОКАЧКА — КАЖДЫЙ УРОВЕНЬ ДАЕТ ЕЩЁ БОЛЬШЕ!
        </p>

        {/* Currency Pill */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t-3 border-black flex-wrap">
          <div className="bg-neo-yellow border-2 border-black px-2.5 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            🪙 {state.gold} ЗОЛОТА
          </div>
          <div className="bg-neo-cyan border-2 border-black px-2.5 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            💎 {state.crystals} КРИСТАЛЛОВ
          </div>
        </div>
      </div>

      {/* Upgrades List */}
      <div className="space-y-2.5">
        {UPGRADES.map(upgrade => {
          const currentLevel = state.upgrades[upgrade.id] || 0;
          const isMax = currentLevel >= upgrade.maxLevel;
          const { gold, crystals } = getUpgradeCost(upgrade, currentLevel);
          const canAfford = state.gold >= gold && state.crystals >= crystals;

          const currentTotal = getTotalStatBonus(upgrade.id, currentLevel);
          const nextBonus = getNextLevelBonus(upgrade.id, currentLevel);

          const formatBonus = (val) => {
            if (upgrade.statKey === 'goldBonus') return `+${Math.round(val * 100)}%`;
            return `+${val} ${upgrade.unit}`;
          };

          const formatNextStep = (val) => {
            if (upgrade.statKey === 'goldBonus') return `+${Math.round(val * 100)}%`;
            return `+${val}`;
          };

          const handleBuy = () => {
            if (isMax) {
              onShowToast('УЖЕ НА МАКСИМУМЕ!', 'info');
              return;
            }
            if (!canAfford) {
              hapticNotification('error');
              onShowToast('НЕ ХВАТАЕТ РЕСУРСОВ!', 'warning');
              return;
            }
            sounds.playLevelUp();
            hapticNotification('success');
            onBuyUpgrade(upgrade.id, gold, crystals);
            onShowToast(`${upgrade.name.toUpperCase()} -> УР. ${currentLevel + 1}! (${formatNextStep(nextBonus)})`, 'success');
          };

          return (
            <div
              key={upgrade.id}
              className="bg-white border-3 border-black p-3 flex items-center justify-between gap-2.5 shadow-brutal"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 bg-neo-yellow border-3 border-black shadow-brutal-sm flex items-center justify-center text-2xl shrink-0">
                  {upgrade.icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-arcade text-xs sm:text-sm text-black uppercase truncate">
                      {upgrade.name}
                    </span>
                    <span className="bg-neo-pink text-white border-2 border-black px-1.5 py-0.2 font-arcade text-[9px] shrink-0">
                      УР. {currentLevel}
                    </span>
                  </div>

                  {/* Current Bonus and Next Accelerating Step */}
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-black">
                    <span className="text-black bg-slate-100 border border-black px-1.5 py-0.2">
                      Всего: {formatBonus(currentTotal)}
                    </span>
                    {!isMax && (
                      <span className="text-neo-pink bg-pink-50 border border-neo-pink px-1.5 py-0.2">
                        След: {formatNextStep(nextBonus)}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] font-bold text-slate-600 mt-1 break-words line-clamp-1">
                    {upgrade.description}
                  </div>
                </div>
              </div>

              {/* Purchase button */}
              <div className="shrink-0">
                {isMax ? (
                  <span className="bg-slate-200 border-2 border-black px-2.5 py-1 font-arcade text-[10px] text-slate-600 block">
                    МАКС
                  </span>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={!canAfford}
                    className={`flex flex-col items-center justify-center min-w-[85px] py-2 px-2.5 border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[1px] active:translate-y-[1px] ${
                      canAfford
                        ? 'bg-neo-lime text-black'
                        : 'bg-slate-200 text-slate-500 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <div className="text-[11px]">🪙 {gold}</div>
                    {crystals > 0 && (
                      <div className="text-[10px] text-neo-purple">💎 {crystals}</div>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
