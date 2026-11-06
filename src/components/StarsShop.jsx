import React from 'react';
import { Star, Zap, Heart, Crown, Gem, Egg, Sparkles } from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification, openStarsInvoice } from '../utils/telegram';

export default function StarsShop({ state, onPurchaseSuccess, onShowToast }) {

  const SHOP_ITEMS = [
    {
      id: 'stars_revive',
      name: 'ВОСКРЕШЕНИЕ НА МЕСТЕ (x1)',
      description: 'Мгновенное возрождение на месте гибели со 100% здоровьем прямо посреди боя.',
      price: 15,
      iconComponent: Sparkles,
      iconBg: 'bg-neo-lime text-black',
      badge: 'СПАСЕНИЕ',
      action: 'revive'
    },
    {
      id: 'stars_egg',
      name: 'ЗОЛОТОЕ ЯЙЦО ГАЧИ',
      description: 'Гарантированный редкий, легендарный или мифический спутник в коллекцию.',
      price: 25,
      iconComponent: Egg,
      iconBg: 'bg-neo-yellow text-black',
      badge: 'ТОП ВЫБОР',
      action: 'egg'
    },
    {
      id: 'stars_energy',
      name: 'ПОЛНЫЙ БАК ЭНЕРГИИ (5 ⚡)',
      description: 'Мгновенно восстанавливает шкалу до максимума для немедленного штурма Башни.',
      price: 10,
      iconComponent: Zap,
      iconBg: 'bg-neo-cyan text-black',
      badge: null,
      action: 'energy'
    },
    {
      id: 'stars_potions',
      name: 'ПАКЕТ ЗЕЛИЙ ЖИЗНИ (x5)',
      description: '5 целебных зелий в запас. Спасает жизнь в тяжелых схватках с боссами Башни.',
      price: 15,
      iconComponent: Heart,
      iconBg: 'bg-neo-pink text-white',
      badge: null,
      action: 'potions'
    },
    {
      id: 'stars_crystals',
      name: 'СУНДУК КРИСТАЛЛОВ (150 шт)',
      description: 'Кристаллы Бездны для быстрой прокачки уровня питомцев и улучшений.',
      price: 35,
      iconComponent: Gem,
      iconBg: 'bg-neo-purple text-white',
      badge: 'ВЫГОДА',
      action: 'crystals'
    },
    {
      id: 'stars_vip',
      name: 'VIP-СТАТУС ОХОТНИКА',
      description: 'Вечная золотая корона в профиле, статус в Зале Славы и +25% к золоту НАВСЕГДА.',
      price: 50,
      iconComponent: Crown,
      iconBg: 'bg-neo-yellow text-black',
      badge: 'НАВСЕГДА',
      action: 'vip',
      disabled: state.vip
    }
  ];

  const handleBuy = (item) => {
    hapticImpact('medium');

    openStarsInvoice(
      item,
      () => {
        sounds.playStarsPurchase();
        hapticNotification('success');
        onPurchaseSuccess(item.action);
        onShowToast(`КУПЛЕНО: ${item.name}! ⭐️`, 'stars');
      },
      (error) => {
        if (error !== 'cancelled') {
          onShowToast('Платеж отменен или не удался.', 'warning');
        }
      }
    );
  };

  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">
      
      {/* Neo-Brutal Arcade Banner */}
      <div className="bg-white border-4 border-black p-4 shadow-brutal">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-neo-yellow border-3 border-black shadow-brutal-sm flex items-center justify-center shrink-0">
            <Star className="w-7 h-7 fill-black stroke-[3]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-arcade text-base text-black uppercase truncate">
              МАГАЗИН TELEGRAM STARS
            </h2>
            <p className="text-xs font-bold text-slate-700 mt-0.5 uppercase">
              ОФИЦИАЛЬНАЯ ОПЛАТА В 1 КЛИК ЧЕРЕЗ ЗВЕЗДЫ ⭐️
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {SHOP_ITEMS.map(item => {
          const Icon = item.iconComponent;

          return (
            <div
              key={item.id}
              className={`relative bg-white border-4 border-black p-3.5 shadow-brutal transition-all ${
                item.disabled ? 'opacity-60 bg-slate-100 shadow-none' : ''
              }`}
            >
              {item.badge && (
                <span className="absolute -top-3 right-3 bg-neo-pink text-white border-2 border-black font-arcade text-[9px] px-2 py-0.5 shadow-brutal-sm uppercase">
                  {item.badge}
                </span>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className={`w-12 h-12 border-3 border-black shadow-brutal-sm flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    <Icon className="w-6 h-6 stroke-[3]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-arcade text-sm text-black uppercase leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-700 mt-1 leading-normal break-words">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="sm:shrink-0 flex items-center justify-end">
                  {item.disabled ? (
                    <span className="w-full sm:w-auto text-center font-arcade text-xs bg-slate-200 border-2 border-black px-3.5 py-2 uppercase">
                      КУПЛЕНО
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2.5 px-4 bg-neo-yellow hover:bg-yellow-400 active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-black border-3 border-black font-arcade text-xs shadow-brutal transition-all uppercase whitespace-nowrap"
                    >
                      <Star className="w-4 h-4 fill-black stroke-[3] shrink-0" />
                      <span>{item.price} ⭐️</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
