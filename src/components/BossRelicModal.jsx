import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';

export default function BossRelicModal({ relics, onSelectRelic }) {
  if (!relics || relics.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn font-sans select-none">
      <div className="bg-neo-yellow border-4 border-black p-4 sm:p-5 shadow-brutal-lg max-w-sm w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="w-14 h-14 bg-white border-3 border-black flex items-center justify-center text-3xl mb-2 shadow-brutal">
          👑
        </div>

        <div className="bg-neo-pink text-white border-2 border-black font-arcade text-[10px] px-3 py-0.5 uppercase shadow-brutal-sm mb-1">
          СОКРОВИЩНИЦА БОССА
        </div>

        <h2 className="font-arcade text-lg text-black uppercase mb-1 text-center">
          ВЫБЕРИ ДАР БАШНИ!
        </h2>
        
        <p className="text-xs font-bold text-slate-800 mb-3 text-center">
          Выберите 1 из 3 древних реликвий для усиления этого забега:
        </p>

        {/* 3 Relic Cards */}
        <div className="space-y-2.5 w-full">
          {relics.map(relic => (
            <button
              key={relic.id}
              onClick={() => {
                sounds.playLevelUp();
                hapticImpact('heavy');
                hapticNotification('success');
                onSelectRelic(relic);
              }}
              className="w-full bg-white hover:bg-slate-50 border-3 border-black p-3 flex items-center justify-between gap-3 text-left shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
            >
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-3xl shrink-0 shadow-brutal-sm bg-neo-light group-hover:scale-105 transition-transform">
                {relic.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-arcade text-xs text-black uppercase truncate">
                    {relic.name}
                  </span>
                  <span 
                    className="border border-black font-arcade text-[8px] px-1 py-0.2 uppercase"
                    style={{ backgroundColor: relic.color, color: relic.rarity === 'legendary' ? '#000' : '#000' }}
                  >
                    {relic.rarityName}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-slate-700 mt-0.5 leading-snug">
                  {relic.description}
                </p>
              </div>

              <div className="shrink-0 bg-neo-pink group-hover:bg-pink-600 text-white font-arcade text-[10px] px-2 py-1.5 border-2 border-black shadow-brutal-sm uppercase">
                ВЗЯТЬ
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
