import React, { useState } from 'react';
import { REBIRTH_PERKS, calculateRebirthSouls, getPerkCost } from '../data/rebirth';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';
import { RotateCcw, X, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RebirthModal({
  state,
  onPerformRebirth,
  onBuyPerk,
  onClose,
  onShowToast
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const earnedSouls = calculateRebirthSouls(state.maxFloor);
  const canRebirth = state.maxFloor >= 20;

  const handleRebirthClick = () => {
    if (!canRebirth) {
      onShowToast('НУЖЕН 20 ЭТАЖ ДЛЯ ПЕРЕРОЖДЕНИЯ!', 'warning');
      return;
    }
    hapticImpact('medium');
    setConfirmOpen(true);
  };

  const executeRebirth = () => {
    sounds.playLevelUp();
    hapticNotification('success');
    setConfirmOpen(false);
    onPerformRebirth(earnedSouls);

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const handleUpgradePerk = (perk) => {
    const currentLvl = state.rebirthPerks?.[perk.id] || 0;
    if (currentLvl >= perk.maxLevel) {
      onShowToast('ПЕРК УЖЕ НА МАКСИМУМЕ!', 'info');
      return;
    }
    const cost = getPerkCost(perk, currentLvl);
    if (state.souls < cost) {
      hapticNotification('error');
      onShowToast('НЕ ХВАТАЕТ ДУШ!', 'warning');
      return;
    }

    sounds.playLevelUp();
    hapticNotification('success');
    onBuyPerk(perk.id, cost);
    onShowToast(`${perk.name.toUpperCase()} УЛУЧШЕН ДО УР. ${currentLvl + 1}! ✨`, 'success');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn font-sans select-none">
      <div className="bg-white border-4 border-black p-4 shadow-brutal-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neo-purple text-white border-2 border-black flex items-center justify-center text-xl shadow-brutal-sm">
              🔮
            </div>
            <div>
              <h2 className="font-arcade text-base text-black uppercase leading-tight">
                ХРАМ ДУШ
              </h2>
              <p className="text-[11px] font-bold text-slate-700 uppercase">
                СБРОС ВСЕГО РАДИ ВЕЧНОЙ СИЛЫ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-black text-white flex items-center justify-center font-arcade text-xs active:translate-x-[1px] active:translate-y-[1px]"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Souls Balance */}
        <div className="my-3 bg-neo-purple text-white border-3 border-black p-3 flex items-center justify-between shadow-brutal-sm">
          <div>
            <span className="font-arcade text-[11px] text-neo-yellow uppercase block">
              БАЛАНС ДУШ:
            </span>
            <span className="font-arcade text-xl">
              {state.souls} 🔮
            </span>
          </div>

          <div className="text-right">
            <span className="font-arcade text-[11px] text-neo-cyan uppercase block">
              РЕБИРТЫ:
            </span>
            <span className="font-arcade text-sm">
              #{state.totalRebirths || 0}
            </span>
          </div>
        </div>

        {/* Rebirth Button Card */}
        <div className="mb-4 bg-neo-yellow border-3 border-black p-3 text-center shadow-brutal-sm">
          <div className="text-xs font-bold text-black mb-1 uppercase">
            {canRebirth ? (
              <span>НАГРАДА ЗА РЕБИРТ: <strong className="font-arcade text-sm text-neo-pink">+{earnedSouls} ДУШ</strong></span>
            ) : (
              <span>НУЖЕН 20 ЭТАЖ ДЛЯ РАЗБЛОКИРОВКИ</span>
            )}
          </div>
          <div className="text-[11px] font-bold text-slate-800 mb-2 leading-tight">
            Сброс этажей, золота, кристаллов, экипировки (останется Простой Меч), жетонов и питомцев.<br />Сохраняются: Души, Перки Душ и VIP.
          </div>

          <button
            onClick={handleRebirthClick}
            disabled={!canRebirth}
            className={`w-full py-3 border-3 border-black font-arcade text-xs flex items-center justify-center gap-2 uppercase transition-all ${
              canRebirth
                ? 'bg-neo-pink text-white shadow-brutal active:translate-x-[2px] active:translate-y-[2px]'
                : 'bg-slate-300 text-slate-600 cursor-not-allowed shadow-none'
            }`}
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>СОВЕРШИТЬ ПЕРЕРОЖДЕНИЕ</span>
          </button>
        </div>

        {/* Perks List */}
        <div className="space-y-2">
          <h4 className="font-arcade text-xs text-black uppercase">
            ДРЕВНИЕ ПЕРКИ ДУШ:
          </h4>

          {REBIRTH_PERKS.map(perk => {
            const lvl = state.rebirthPerks?.[perk.id] || 0;
            const isMax = lvl >= perk.maxLevel;
            const cost = getPerkCost(perk, lvl);
            const canAfford = state.souls >= cost;

            return (
              <div
                key={perk.id}
                className="bg-white border-3 border-black p-2.5 flex items-center justify-between gap-2 shadow-brutal-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-10 h-10 bg-neo-cyan border-2 border-black flex items-center justify-center text-xl shrink-0">
                    {perk.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-arcade text-xs text-black uppercase truncate">
                        {perk.name}
                      </span>
                      <span className="bg-black text-white text-[11px] font-black px-1.5 py-0.2 shrink-0">
                        УР. {lvl}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 mt-0.5 leading-snug">
                      {perk.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isMax ? (
                    <span className="font-arcade text-[11px] bg-slate-200 border-2 border-black px-2 py-1">
                      МАКС
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUpgradePerk(perk)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 border-2 border-black font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] ${
                        canAfford
                          ? 'bg-neo-lime text-black'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                      }`}
                    >
                      {cost} 🔮
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Neo-Brutalist Confirmation Overlay */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-neo-yellow border-4 border-black p-5 shadow-brutal-lg max-w-xs w-full text-center space-y-3">
            <div className="w-14 h-14 mx-auto bg-neo-pink text-white border-3 border-black flex items-center justify-center shadow-brutal-sm">
              <AlertTriangle className="w-7 h-7 stroke-[3]" />
            </div>

            <h3 className="font-arcade text-base text-black uppercase">
              ПОДТВЕРДИТЬ РЕБИРТ?
            </h3>

            <div className="bg-white border-2 border-black p-2.5 text-left text-xs font-bold space-y-1.5">
              <div className="text-emerald-700">
                🔮 Награда: <strong>+{earnedSouls} Осколков Душ</strong>
              </div>
              <div className="text-red-700">
                ❌ Сбросятся: этажи (до 1), золото, кристаллы, весь лут (останется Простой Меч Ур.1), питомцы и жетоны.
              </div>
              <div className="text-slate-800">
                ✅ Останутся: Души, Перки Душ и VIP-статус.
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={executeRebirth}
                className="w-full py-3 bg-neo-pink text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] uppercase"
              >
                ДА, ПЕРЕРОДИТЬСЯ (+{earnedSouls} 🔮)
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className="w-full py-2.5 bg-white text-black border-3 border-black font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] uppercase"
              >
                ОТМЕНА
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
