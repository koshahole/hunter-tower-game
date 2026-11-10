import React from 'react';
import { Sparkles, Star, AlertTriangle, ArrowLeft } from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification, openStarsInvoice } from '../utils/telegram';
import { CurrencyIcon, GameIcon } from './icons';

export default function ReviveModal({ floor, reviveTokens = 0, onUseToken, onConfirmRevive, onCancel, onShowToast }) {
  
  const handleBuyRevive = () => {
    hapticImpact('heavy');
    openStarsInvoice(
      { id: 'stars_revive', name: 'Воскрешение в Башне', price: 15 },
      () => {
        sounds.playStarsPurchase();
        hapticNotification('success');
        onShowToast('ВОСКРЕШЕН! 100% ЗДОРОВЬЯ! ⭐️', 'stars');
        onConfirmRevive();
      },
      (status) => {
        if (status !== 'cancelled') {
          onShowToast('ОПЛАТА НЕ ПРОШЛА.', 'warning');
        }
      }
    );
  };

  const handleUseToken = () => {
    hapticImpact('heavy');
    sounds.playLevelUp();
    hapticNotification('success');
    onShowToast('ИСПОЛЬЗОВАН ЖЕТОН ВОСКРЕШЕНИЯ! 💫', 'stars');
    if (onUseToken) onUseToken();
    else onConfirmRevive();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-center animate-fadeIn font-sans select-none">
      <div className="bg-white border-4 border-black p-5 shadow-brutal-lg max-w-xs w-full flex flex-col items-center">
        
        <div className="w-16 h-16 bg-neo-yellow border-3 border-black flex items-center justify-center mb-3 shadow-brutal p-3">
          <GameIcon icon="sparkles" size="full" />
        </div>

        <div className="bg-neo-pink text-white border-2 border-black font-arcade text-[11px] px-3 py-1 uppercase shadow-brutal-sm mb-2">
          ОХОТНИК ПАЛ НА ЭТАЖЕ {floor}
        </div>

        <h2 className="font-arcade text-lg text-black uppercase mb-1">
          ЗВЕЗДНЫЙ ШАНС!
        </h2>

        <p className="text-xs font-bold text-slate-800 mb-4">
          НЕ ТЕРЯЙ ЭТАЖ! ВОСКРЕСНИ СО <span className="text-neo-pink font-arcade">100% HP</span> ПРЯМО СЕЙЧАС И ДОБЕЙ ВРАГА!
        </p>

        <div className="w-full space-y-2">
          {reviveTokens > 0 ? (
            <button
              onClick={handleUseToken}
              className="w-full py-3 bg-neo-lime text-black border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 uppercase"
            >
              <Sparkles className="w-4 h-4 stroke-[3]" />
              <span className="inline-flex items-center gap-1">
                <span>ИСПОЛЬЗОВАТЬ ПЕРО (</span>
                <CurrencyIcon type="feather" size="xs" inline />
                <span>{reviveTokens} шт)</span>
              </span>
            </button>
          ) : (
            <button
              onClick={handleBuyRevive}
              className="w-full py-3 bg-neo-yellow text-black border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 uppercase"
            >
              <Sparkles className="w-4 h-4 stroke-[3] shrink-0" />
              <span className="inline-flex items-center gap-1">
                <span>ВОСКРЕСНУТЬ (15</span>
                <CurrencyIcon type="star" size="xs" inline />
                <span>)</span>
              </span>
            </button>
          )}

          <button
            onClick={onCancel}
            className="w-full py-2.5 bg-slate-100 text-black border-2 border-black font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5 uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
            <span>СДАТЬСЯ В ХАБ</span>
          </button>
        </div>

      </div>
    </div>
  );
}
