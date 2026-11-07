import React, { useState } from 'react';
import {
  Shield,
  Swords,
  Sparkles,
  Heart,
  Gem,
  Star,
  Check,
  X,
  ArrowUpCircle,
  Feather,
  Info
} from 'lucide-react';
import {
  EQUIPMENT_CATALOG,
  SLOTS,
  RARITIES,
  MAX_ENHANCE_LEVEL,
  getItemStats,
  getItemNextLevelGain,
  getEquipmentUpgradeCost,
  formatStatText
} from '../data/equipment';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';

export default function InventoryView({
  state,
  runArtifacts = [],
  onEquipItem,
  onUpgradeItem,
  onShowToast
}) {
  const [filterSlot, setFilterSlot] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const equipped = state.equipped || {};
  const equipmentLevels = state.equipmentLevels || {};
  const inventory = state.inventory || [];

  // Helper to get catalog template by id
  const getTemplate = (id) => EQUIPMENT_CATALOG.find(it => it.id === id) || null;

  // Active equipped items with their stats
  const equippedSlots = Object.keys(SLOTS).map(slotKey => {
    const slotInfo = SLOTS[slotKey];
    const itemId = equipped[slotKey];
    const template = getTemplate(itemId);
    const level = template ? (equipmentLevels[template.id] || 1) : 1;
    const stats = template ? getItemStats(template, level) : {};
    const rarity = template ? (RARITIES[template.rarity] || RARITIES.common) : null;

    return {
      slotKey,
      slotInfo,
      template,
      level,
      stats,
      rarity
    };
  });

  // Calculate sum of stats from all equipped gear
  const totalGearStats = equippedSlots.reduce((acc, curr) => {
    if (!curr.template) return acc;
    const s = curr.stats;
    if (s.atk) acc.atk = (acc.atk || 0) + s.atk;
    if (s.maxHp) acc.maxHp = (acc.maxHp || 0) + s.maxHp;
    if (s.critChance) acc.critChance = (acc.critChance || 0) + s.critChance;
    if (s.dodgeChance) acc.dodgeChance = (acc.dodgeChance || 0) + s.dodgeChance;
    if (s.vampirism) acc.vampirism = (acc.vampirism || 0) + s.vampirism;
    if (s.goldBonus) acc.goldBonus = (acc.goldBonus || 0) + s.goldBonus;
    return acc;
  }, {});

  // Filter bag items
  const bagItems = inventory
    .map(itemId => {
      const template = getTemplate(itemId);
      if (!template) return null;
      const level = equipmentLevels[template.id] || 1;
      const stats = getItemStats(template, level);
      const isEquipped = equipped[template.slot] === template.id;
      const rarity = RARITIES[template.rarity] || RARITIES.common;
      return { template, level, stats, isEquipped, rarity };
    })
    .filter(Boolean)
    .filter(item => filterSlot === 'all' || item.template.slot === filterSlot);

  // Handle upgrade
  const handleUpgrade = (template, currentLevel) => {
    if (currentLevel >= MAX_ENHANCE_LEVEL) {
      onShowToast('ПРЕДМЕТ ДОСТИГ МАКСИМАЛЬНОГО УРОВНЯ! 👑', 'info');
      return;
    }

    const { gold, crystals } = getEquipmentUpgradeCost(template, currentLevel);
    if (state.gold < gold || state.crystals < crystals) {
      hapticNotification('error');
      onShowToast('НЕ ХВАТАЕТ ЗОЛОТА ИЛИ КРИСТАЛЛОВ ДЛЯ ЗАТОЧКИ! ⚠️', 'warning');
      return;
    }

    sounds.playLevelUp();
    hapticNotification('success');
    onUpgradeItem(template, gold, crystals);
    onShowToast(`${template.name.toUpperCase()} ЗАТОЧЕН ДО +${currentLevel + 1}! ⚡`, 'success');
  };

  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">

      {/* Header Bar */}
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2 className="font-arcade text-base text-black flex items-center gap-2 uppercase">
            <span>🎒</span>
            <span>ИНВЕНТАРЬ И ЭКИПИРОВКА</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-700 mt-0.5 uppercase">
            УЛУЧШАЙТЕ СНАРЯЖЕНИЕ ДЛЯ ШТУРМА ВЫСОКИХ ЭТАЖЕЙ
          </p>
        </div>

        {/* Currency Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="bg-neo-yellow border-2 border-black px-2 py-0.5 font-arcade text-xs text-black shadow-brutal-sm">
            🪙 {state.gold}
          </div>
          <div className="bg-neo-cyan border-2 border-black px-2 py-0.5 font-arcade text-xs text-black shadow-brutal-sm">
            💎 {state.crystals}
          </div>
        </div>
      </div>

      {/* 4 Equipped Slots Grid (Paper-Doll) */}
      <div className="bg-white border-4 border-black p-3 shadow-brutal">
        <div className="flex items-center justify-between mb-2">
          <span className="font-arcade text-xs text-black uppercase flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 stroke-[3]" />
            НАДЕТАЯ ЭКИПИРОВКА
          </span>
          <span className="text-[10px] font-bold text-slate-600 uppercase">
            НАЖМИТЕ ДЛЯ ЗАТОЧКИ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {equippedSlots.map(({ slotKey, slotInfo, template, level, stats, rarity }) => {
            return (
              <button
                key={slotKey}
                onClick={() => {
                  hapticImpact('light');
                  if (template) setSelectedItem({ template, level, stats, isEquipped: true, rarity });
                }}
                className={`relative p-2.5 border-3 border-black text-left flex flex-col justify-between shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] transition-transform ${
                  template ? (rarity?.bg || 'bg-white') : 'bg-slate-100 border-dashed'
                }`}
              >
                {/* Slot Tag */}
                <div className="flex items-center justify-between gap-1 w-full mb-1.5">
                  <span className="font-arcade text-[10px] text-slate-700 uppercase">
                    {slotInfo.icon} {slotInfo.name}
                  </span>
                  {template && (
                    <span className="bg-neo-pink text-white font-arcade text-[9px] px-1 py-0.2 border border-black shadow-brutal-press">
                      +{level}
                    </span>
                  )}
                </div>

                {template ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl shrink-0">{template.icon}</span>
                      <div className="min-w-0">
                        <div className="font-arcade text-xs text-black truncate uppercase">
                          {template.name}
                        </div>
                        <div className="text-[9px] font-black uppercase text-slate-600 truncate">
                          {rarity?.name}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-black/20 text-[10px] font-black space-y-0.5">
                      {Object.keys(stats).slice(0, 2).map(k => (
                        <div key={k} className="text-black truncate">
                          {formatStatText(k, stats[k])}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center">
                    <span className="text-2xl text-slate-400 block mb-1">{slotInfo.icon}</span>
                    <span className="font-arcade text-[10px] text-slate-500 uppercase">ПУСТО</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Aggregate Gear Stats Bar */}
        <div className="mt-2.5 pt-2 border-t-2 border-black flex items-center justify-around gap-1 flex-wrap font-arcade text-[10px] text-black">
          {totalGearStats.atk > 0 && <span className="bg-neo-pink text-white px-1.5 py-0.5 border border-black">⚔️ +{totalGearStats.atk}</span>}
          {totalGearStats.maxHp > 0 && <span className="bg-neo-lime text-black px-1.5 py-0.5 border border-black">❤️ +{totalGearStats.maxHp}</span>}
          {totalGearStats.critChance > 0 && <span className="bg-neo-yellow text-black px-1.5 py-0.5 border border-black">🎯 +{totalGearStats.critChance}%</span>}
          {totalGearStats.dodgeChance > 0 && <span className="bg-neo-cyan text-black px-1.5 py-0.5 border border-black">💨 +{totalGearStats.dodgeChance}%</span>}
          {totalGearStats.vampirism > 0 && <span className="bg-red-400 text-white px-1.5 py-0.5 border border-black">🩸 +{Math.round(totalGearStats.vampirism * 100)}%</span>}
          {totalGearStats.goldBonus > 0 && <span className="bg-amber-300 text-black px-1.5 py-0.5 border border-black">🪙 +{Math.round(totalGearStats.goldBonus * 100)}%</span>}
        </div>
      </div>

      {/* Consumables & Run Relics Shelf */}
      <div className="bg-white border-4 border-black p-3 shadow-brutal space-y-2">
        <span className="font-arcade text-xs text-black uppercase block">
          ПРИПАСЫ И БОСС-РЕЛИКВИИ
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* Potions Card */}
          <div className="bg-neo-lime border-3 border-black p-2.5 shadow-brutal-sm flex items-center gap-2.5">
            <span className="text-3xl shrink-0">🧪</span>
            <div className="min-w-0">
              <div className="font-arcade text-xs text-black uppercase">
                ЗЕЛЬЯ ЖИЗНИ ({state.potions || 0})
              </div>
              <div className="text-[10px] font-bold text-slate-800 leading-tight">
                Восстанавливают 50% HP посреди боя
              </div>
            </div>
          </div>

          {/* Revive Feathers Card */}
          <div className="bg-neo-yellow border-3 border-black p-2.5 shadow-brutal-sm flex items-center gap-2.5">
            <span className="text-3xl shrink-0">🪶</span>
            <div className="min-w-0">
              <div className="font-arcade text-xs text-black uppercase">
                ПЕРЬЯ ВОСКРЕШЕНИЯ ({state.reviveTokens || 0})
              </div>
              <div className="text-[10px] font-bold text-slate-800 leading-tight">
                Бесплатное воскрешение на месте гибели
              </div>
            </div>
          </div>
        </div>

        {/* Active Run Relics (collected in current run) */}
        {runArtifacts && runArtifacts.length > 0 && (
          <div className="mt-2 pt-2 border-t-2 border-black">
            <span className="font-arcade text-[10px] text-neo-purple uppercase block mb-1.5">
              👑 АКТИВНЫЕ РЕЛИКВИИ ЭТОГО ЗАБЕГА:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {runArtifacts.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black px-2 py-1 shadow-brutal-sm flex items-center gap-1.5"
                >
                  <span className="text-base">{art.icon}</span>
                  <div className="min-w-0">
                    <span className="font-arcade text-[10px] text-black uppercase block truncate">
                      {art.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-600 block">
                      {art.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bag / Backpack Section */}
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal">
        <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
          <span className="font-arcade text-xs text-black uppercase">
            РЮКЗАК ({inventory.length} ПРЕДМЕТОВ)
          </span>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 flex-wrap">
            {[
              { id: 'all', label: 'ВСЕ' },
              { id: 'weapon', label: '⚔️ ОРУЖИЕ' },
              { id: 'armor', label: '🛡️ БРОНЯ' },
              { id: 'helmet', label: '🪖 ШЛЕМ' },
              { id: 'accessory', label: '💍 АМУЛЕТ' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {
                  hapticImpact('light');
                  setFilterSlot(f.id);
                }}
                className={`px-2 py-0.5 border-2 border-black font-arcade text-[9px] uppercase shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] ${
                  filterSlot === f.id
                    ? 'bg-neo-pink text-white'
                    : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bag Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {bagItems.map(({ template, level, stats, isEquipped, rarity }) => {
            return (
              <div
                key={template.id}
                onClick={() => {
                  hapticImpact('light');
                  setSelectedItem({ template, level, stats, isEquipped, rarity });
                }}
                className={`p-2.5 border-3 border-black flex items-center justify-between gap-2 shadow-brutal-sm cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all ${
                  isEquipped ? 'bg-amber-100/90 ring-2 ring-black' : rarity.bg
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-xl shrink-0 shadow-brutal-sm">
                    {template.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-arcade text-xs text-black uppercase truncate">
                        {template.name}
                      </span>
                      <span className="bg-neo-pink text-white font-arcade text-[9px] px-1 py-0.2 border border-black">
                        +{level}
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-slate-600 uppercase flex items-center gap-1">
                      <span>{rarity.name}</span>
                      <span>•</span>
                      <span>{SLOTS[template.slot]?.name}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  {isEquipped ? (
                    <span className="bg-neo-lime text-black border border-black px-1.5 py-0.5 font-arcade text-[9px] uppercase">
                      НАДЕТО
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        hapticNotification('success');
                        onEquipItem(template);
                        onShowToast(`ЭКИПИРОВАНО: ${template.name.toUpperCase()}! ⚔️`, 'success');
                      }}
                      className="bg-white hover:bg-neo-yellow border-2 border-black px-2 py-1 font-arcade text-[10px] uppercase shadow-brutal-sm"
                    >
                      НАДЕТЬ
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Inspect / Enhance Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn font-sans select-none">
          <div className="bg-white border-4 border-black p-4 shadow-brutal-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b-3 border-black">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-3xl shrink-0">{selectedItem.template.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-arcade text-sm text-black uppercase truncate">
                      {selectedItem.template.name}
                    </h3>
                    <span className="bg-neo-pink text-white font-arcade text-[10px] px-1.5 py-0.2 border border-black">
                      +{selectedItem.level}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-neo-purple">
                    {selectedItem.rarity.name} • {SLOTS[selectedItem.template.slot]?.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-7 h-7 bg-black text-white flex items-center justify-center font-arcade text-xs shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Item Description */}
            <p className="text-[11px] font-bold text-slate-700 my-2.5 bg-slate-100 p-2 border border-black">
              {selectedItem.template.description}
            </p>

            {/* Current Stats */}
            <div className="space-y-1.5 mb-3">
              <span className="font-arcade text-[10px] text-black uppercase block">ТЕКУЩИЕ СВОЙСТВА:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.keys(selectedItem.stats).map(k => (
                  <div key={k} className="bg-neo-yellow border-2 border-black p-1.5 text-[11px] font-black text-black">
                    {formatStatText(k, selectedItem.stats[k])}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Level Upgrade Preview */}
            {selectedItem.level < MAX_ENHANCE_LEVEL ? (
              <div className="bg-slate-50 border-2 border-black p-2.5 mb-3">
                <div className="flex items-center justify-between font-arcade text-[10px] text-black uppercase mb-1">
                  <span>ЗАТОЧКА ДО +{selectedItem.level + 1} ДАСТ:</span>
                  <span className="text-neo-pink">
                    {selectedItem.level + 1} / {MAX_ENHANCE_LEVEL}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-[10px] font-black text-emerald-700">
                  {Object.keys(selectedItem.template.growth || {}).map(k => (
                    <span key={k} className="bg-emerald-100 border border-emerald-600 px-1.5 py-0.2">
                      +{formatStatText(k, selectedItem.template.growth[k])}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-200 border-2 border-black p-2 text-center font-arcade text-xs text-slate-600 mb-3 uppercase">
                ПРЕДМЕТ ЗАТОЧЕН НА МАКСИМУМ (+{MAX_ENHANCE_LEVEL})
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Upgrade Button */}
              {selectedItem.level < MAX_ENHANCE_LEVEL && (() => {
                const { gold, crystals } = getEquipmentUpgradeCost(selectedItem.template, selectedItem.level);
                const canAfford = state.gold >= gold && state.crystals >= crystals;

                return (
                  <button
                    onClick={() => {
                      handleUpgrade(selectedItem.template, selectedItem.level);
                      const nextLvl = selectedItem.level + 1;
                      const nextStats = getItemStats(selectedItem.template, nextLvl);
                      setSelectedItem(prev => ({ ...prev, level: nextLvl, stats: nextStats }));
                    }}
                    disabled={!canAfford}
                    className={`w-full py-2.5 px-3 border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-between uppercase transition-all ${
                      canAfford
                        ? 'bg-neo-lime text-black hover:bg-lime-400'
                        : 'bg-slate-200 text-slate-500 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <span>ЗАТОЧИТЬ (+1)</span>
                    <div className="flex items-center gap-2">
                      <span>🪙 {gold}</span>
                      {crystals > 0 && <span>💎 {crystals}</span>}
                    </div>
                  </button>
                );
              })()}

              {/* Equip / Unequip Button */}
              {!selectedItem.isEquipped ? (
                <button
                  onClick={() => {
                    hapticNotification('success');
                    onEquipItem(selectedItem.template);
                    onShowToast(`ЭКИПИРОВАНО: ${selectedItem.template.name.toUpperCase()}! ⚔️`, 'success');
                    setSelectedItem(prev => ({ ...prev, isEquipped: true }));
                  }}
                  className="w-full py-2.5 bg-neo-pink text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[1px] active:translate-y-[1px] uppercase transition-all"
                >
                  ЭКИПИРОВАТЬ ЭТОТ ПРЕДМЕТ
                </button>
              ) : (
                <div className="w-full py-2 bg-neo-yellow text-black border-2 border-black font-arcade text-xs text-center uppercase">
                  УЖЕ НАДЕТО В СЛОТ {SLOTS[selectedItem.template.slot]?.name.toUpperCase()}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
