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
  Info,
  Trash2
} from 'lucide-react';
import {
  EQUIPMENT_CATALOG,
  EQUIPMENT_BY_ID,
  SLOTS,
  RARITIES,
  MAX_ENHANCE_LEVEL,
  getItemStats,
  getEquipmentUpgradeCost,
  formatStatText,
  getSalvageValue
} from '../data/equipment';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';
import { GameIcon, CurrencyIcon, EquipmentIcon, RelicIcon } from './icons';

export default function InventoryView({
  state,
  runArtifacts = [],
  onEquipItem,
  onUpgradeItem,
  onSalvageItem,
  onShowToast
}) {
  const [filterSlot, setFilterSlot] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [salvageConfirmItem, setSalvageConfirmItem] = useState(null);

  const equipped = state.equipped || {};
  const equipmentLevels = state.equipmentLevels || {};
  const inventory = state.inventory || [];

  // Helper to get catalog template by id
  const getTemplate = (id) => EQUIPMENT_BY_ID?.[id] || EQUIPMENT_CATALOG.find(it => it.id === id) || null;

  const pctRound = (v) => Math.round((v || 0) * 1000) / 10;

  const STAT_SHORT_NAMES = {
    atk: ' АТК',
    maxHp: ' HP',
    critChance: '% КРИТ',
    dodgeChance: '% УВОР',
    vampirism: '% ВАМП',
    goldBonus: '% ЗОЛ',
    crystalBonus: '% КРИСТ'
  };

  const getComparisonDeltas = (candidateStats = {}, equippedStats = {}) => {
    const keys = Array.from(new Set([...Object.keys(candidateStats), ...Object.keys(equippedStats)]));
    return keys.map(key => {
      const isRatio = key === 'vampirism' || key === 'goldBonus' || key === 'crystalBonus';
      const candVal = isRatio ? pctRound(candidateStats[key] || 0) : Math.round((candidateStats[key] || 0) * 10) / 10;
      const eqVal = isRatio ? pctRound(equippedStats[key] || 0) : Math.round((equippedStats[key] || 0) * 10) / 10;
      const diff = Math.round((candVal - eqVal) * 10) / 10;
      if (diff === 0) return null;
      return {
        key,
        diff,
        label: `${diff > 0 ? '▲ +' : '▼ '}${diff}${STAT_SHORT_NAMES[key] || ''}`
      };
    }).filter(Boolean);
  };

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
    if (s.crystalBonus) acc.crystalBonus = (acc.crystalBonus || 0) + s.crystalBonus;
    return acc;
  }, {});

  const equippedSlotMap = equippedSlots.reduce((acc, curr) => {
    acc[curr.slotKey] = curr;
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
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h2 className="font-arcade text-base text-black flex items-center gap-2 uppercase">
              <GameIcon icon="backpack" size="sm" inline />
              <span>ИНВЕНТАРЬ И ЭКИПИРОВКА</span>
            </h2>
            <p className="text-[11px] font-bold text-slate-700 mt-0.5 uppercase">
              СРАВНИВАЙТЕ И ЗАТАЧИВАЙТЕ ВЕЩИ ДЛЯ ШТУРМА
            </p>
          </div>

          {/* Currency Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="bg-neo-yellow border-2 border-black px-2 py-0.5 font-arcade text-xs text-black shadow-brutal-sm inline-flex items-center gap-1">
              <CurrencyIcon type="gold" size="xs" inline />
              <span>{state.gold}</span>
            </div>
            <div className="bg-neo-cyan border-2 border-black px-2 py-0.5 font-arcade text-xs text-black shadow-brutal-sm inline-flex items-center gap-1">
              <CurrencyIcon type="crystal" size="xs" inline />
              <span>{state.crystals}</span>
            </div>
          </div>
        </div>

        <div className="bg-neo-cream border-2 border-black px-2.5 py-1.5 text-[11px] font-bold text-slate-800 leading-snug">
          💡 Кристаллы <CurrencyIcon type="crystal" size="xs" inline /> падают с Боссов каждые 10 этажей и даются за разбор лишних вещей (+1/+3/+10/+30 <CurrencyIcon type="crystal" size="xs" inline />).
        </div>
      </div>

      {/* 4 Equipped Slots Grid (Paper-Doll) */}
      <div className="bg-white border-4 border-black p-3 shadow-brutal">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="font-arcade text-xs text-black uppercase flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 stroke-[3]" />
            НАДЕТАЯ ЭКИПИРОВКА
          </span>
          <span className="text-[11px] font-bold text-slate-600 uppercase text-right">
            ТАПНИТЕ ПО СЛОТУ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {equippedSlots.map(({ slotKey, slotInfo, template, level, stats, rarity }) => {
            return (
              <button
                key={slotKey}
                onClick={() => {
                  hapticImpact('light');
                  if (template) {
                    setSelectedItem({ template, level, stats, isEquipped: true, rarity });
                  } else {
                    setFilterSlot(slotKey);
                  }
                }}
                className={`relative p-2.5 border-3 border-black text-left flex flex-col justify-between shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] transition-transform ${
                  template ? (rarity?.bg || 'bg-white') : 'bg-slate-100 border-dashed [@media(hover:hover)]:hover:bg-slate-200'
                }`}
              >
                {/* Slot Tag */}
                <div className="flex items-center justify-between gap-1 w-full mb-1.5">
                  <span className="font-arcade text-[11px] text-slate-700 uppercase inline-flex items-center gap-1">
                    <EquipmentIcon slot={slotKey} size="xs" inline />
                    <span>{slotInfo.name}</span>
                  </span>
                  {template && (
                    <span className="bg-neo-pink text-white font-arcade text-[11px] px-1.5 py-0.2 border border-black shadow-brutal-press">
                      +{level}
                    </span>
                  )}
                </div>

                {template ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 shrink-0 flex items-center justify-center">
                        <EquipmentIcon item={template} size="md" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-arcade text-xs text-black truncate uppercase">
                          {template.name}
                        </div>
                        <div className="text-[11px] font-black uppercase text-slate-600 truncate">
                          {rarity?.name}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-black/20 text-[11px] font-black space-y-0.5">
                      {Object.keys(stats).slice(0, 2).map(k => (
                        <div key={k} className="text-black truncate">
                          {formatStatText(k, stats[k])}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-3 text-center">
                    <span className="w-8 h-8 mx-auto flex items-center justify-center opacity-40 mb-1">
                      <EquipmentIcon slot={slotKey} size="md" />
                    </span>
                    <span className="font-arcade text-[11px] text-slate-500 uppercase block">ПУСТО</span>
                    <span className="text-[11px] font-bold text-slate-500 block">показать в сумке</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Aggregate Gear Stats Bar */}
        <div className="mt-2.5 pt-2 border-t-2 border-black flex items-center justify-around gap-1.5 flex-wrap font-arcade text-[11px] text-black">
          {totalGearStats.atk > 0 && (
            <span className="bg-neo-pink text-white px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
              <GameIcon icon="crossed_swords" size="xs" inline /> +{Math.round(totalGearStats.atk)}
            </span>
          )}
          {totalGearStats.maxHp > 0 && (
            <span className="bg-neo-lime text-black px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
              <GameIcon icon="heart" size="xs" inline /> +{Math.round(totalGearStats.maxHp)}
            </span>
          )}
          {totalGearStats.critChance > 0 && (
            <span className="bg-neo-yellow text-black px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
              <GameIcon icon="target" size="xs" inline /> +{Math.round(totalGearStats.critChance * 10) / 10}%
            </span>
          )}
          {totalGearStats.dodgeChance > 0 && (
            <span className="bg-neo-cyan text-black px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
              <GameIcon icon="wind" size="xs" inline /> +{Math.round(totalGearStats.dodgeChance * 10) / 10}%
            </span>
          )}
          {totalGearStats.vampirism > 0 && (() => {
            const vampPct = pctRound(totalGearStats.vampirism);
            return (
              <span className="bg-red-400 text-white px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
                <GameIcon icon="blood" size="xs" inline /> +{vampPct > 60 ? `60% (кап от ${vampPct}%)` : `${vampPct}%${vampPct === 60 ? ' (кап)' : ''}`}
              </span>
            );
          })()}
          {totalGearStats.goldBonus > 0 && (
            <span className="bg-amber-300 text-black px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
              <CurrencyIcon type="gold" size="xs" inline /> +{pctRound(totalGearStats.goldBonus)}%
            </span>
          )}
          {totalGearStats.crystalBonus > 0 && (
            <span className="bg-purple-200 text-black px-1.5 py-0.5 border border-black inline-flex items-center gap-1">
              <CurrencyIcon type="crystal" size="xs" inline /> +{pctRound(totalGearStats.crystalBonus)}%
            </span>
          )}
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
            <span className="w-8 h-8 shrink-0 flex items-center justify-center">
              <CurrencyIcon type="potion" size="md" />
            </span>
            <div className="min-w-0">
              <div className="font-arcade text-xs text-black uppercase leading-tight">
                ЗЕЛЬЯ ЖИЗНИ ({state.potions || 0})
              </div>
              <div className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5">
                +50% HP посреди боя
              </div>
            </div>
          </div>

          {/* Revive Feathers Card */}
          <div className="bg-neo-yellow border-3 border-black p-2.5 shadow-brutal-sm flex items-center gap-2.5">
            <span className="w-8 h-8 shrink-0 flex items-center justify-center">
              <CurrencyIcon type="feather" size="md" />
            </span>
            <div className="min-w-0">
              <div className="font-arcade text-xs text-black uppercase leading-tight">
                ПЕРЬЯ ({state.reviveTokens || 0})
              </div>
              <div className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5">
                Бесплатное воскрешение
              </div>
            </div>
          </div>
        </div>

        {/* Active Run Relics (collected in current run) */}
        {runArtifacts && runArtifacts.length > 0 && (
          <div className="mt-2 pt-2 border-t-2 border-black">
            <span className="font-arcade text-[11px] text-neo-purple uppercase mb-1.5 inline-flex items-center gap-1">
              <GameIcon icon="crown" size="xs" inline />
              <span>АКТИВНЫЕ РЕЛИКВИИ ЭТОГО ЗАБЕГА:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {runArtifacts.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black px-2 py-1 shadow-brutal-sm flex items-center gap-1.5"
                >
                  <RelicIcon relic={art} size="sm" />
                  <div className="min-w-0">
                    <span className="font-arcade text-[11px] text-black uppercase block truncate">
                      {art.name}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 block">
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
              { id: 'all', label: 'ВСЕ', slot: null },
              { id: 'weapon', label: 'ОРУЖИЕ', slot: 'weapon' },
              { id: 'armor', label: 'БРОНЯ', slot: 'armor' },
              { id: 'helmet', label: 'ШЛЕМ', slot: 'helmet' },
              { id: 'accessory', label: 'АМУЛЕТ', slot: 'accessory' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {
                  hapticImpact('light');
                  setFilterSlot(f.id);
                }}
                className={`px-2 py-1 border-2 border-black font-arcade text-[11px] uppercase shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] inline-flex items-center gap-1 ${
                  filterSlot === f.id
                    ? 'bg-neo-pink text-white'
                    : 'bg-white text-black [@media(hover:hover)]:hover:bg-slate-100'
                }`}
              >
                {f.slot && <EquipmentIcon slot={f.slot} size="xs" inline />}
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bag Grid */}
        {bagItems.length === 0 ? (
          <div className="bg-slate-100 border-2 border-dashed border-slate-400 p-4 text-center text-xs font-bold text-slate-600">
            В этой категории пока нет предметов. Победите Вожаков и Боссов в Башне, чтобы выбить добычу!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {bagItems.map(({ template, level, stats, isEquipped, rarity }) => {
              const currentEquipped = equippedSlotMap[template.slot];
              const deltas = isEquipped ? [] : getComparisonDeltas(stats, currentEquipped?.stats || {});

              return (
                <div
                  key={template.id}
                  onClick={() => {
                    hapticImpact('light');
                    setSelectedItem({ template, level, stats, isEquipped, rarity });
                  }}
                  className={`p-2.5 border-3 border-black flex flex-col gap-2 shadow-brutal-sm cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all ${
                    isEquipped ? 'bg-amber-100/90 ring-2 ring-black' : rarity.bg
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-brutal-sm p-1">
                        <EquipmentIcon item={template} size="full" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-arcade text-xs text-black uppercase truncate">
                            {template.name}
                          </span>
                          <span className="bg-neo-pink text-white font-arcade text-[11px] px-1.5 py-0.2 border border-black">
                            +{level}
                          </span>
                        </div>
                        <div className="text-[11px] font-black text-slate-600 uppercase flex items-center gap-1">
                          <span>{rarity.name}</span>
                          <span>•</span>
                          <span>{SLOTS[template.slot]?.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {isEquipped ? (
                        <span className="bg-neo-lime text-black border border-black px-2 py-0.5 font-arcade text-[11px] uppercase">
                          НАДЕТО
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            hapticNotification('success');
                            onEquipItem(template);
                          }}
                          className="bg-white [@media(hover:hover)]:hover:bg-neo-yellow border-2 border-black px-2.5 py-1 font-arcade text-[11px] uppercase shadow-brutal-sm"
                        >
                          НАДЕТЬ
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stats preview & Comparison deltas */}
                  <div className="pt-1.5 border-t border-black/20 flex items-center justify-between gap-1.5 flex-wrap text-[11px] font-black">
                    <div className="flex items-center gap-1 flex-wrap">
                      {Object.keys(stats).map(k => (
                        <span key={k} className="bg-white/90 border border-black px-1.5 py-0.2 text-black">
                          {formatStatText(k, stats[k])}
                        </span>
                      ))}
                    </div>

                    {!isEquipped && deltas.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {deltas.slice(0, 2).map(d => (
                          <span
                            key={d.key}
                            className={`px-1.5 py-0.2 border border-black font-arcade text-[11px] ${
                              d.diff > 0 ? 'bg-neo-lime text-black' : 'bg-neo-pink text-white'
                            }`}
                          >
                            {d.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Inspect / Enhance Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn font-sans select-none">
          <div className="bg-white border-4 border-black p-4 shadow-brutal-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b-3 border-black">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-10 h-10 bg-white border-2 border-black p-1 shrink-0 flex items-center justify-center shadow-brutal-sm">
                  <EquipmentIcon item={selectedItem.template} size="full" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-arcade text-sm text-black uppercase truncate">
                      {selectedItem.template.name}
                    </h3>
                    <span className="bg-neo-pink text-white font-arcade text-[11px] px-1.5 py-0.2 border border-black">
                      +{selectedItem.level}
                    </span>
                  </div>
                  <span className="text-[11px] font-black uppercase text-neo-purple">
                    {selectedItem.rarity.name} • {SLOTS[selectedItem.template.slot]?.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 bg-black text-white flex items-center justify-center font-arcade text-xs shrink-0"
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
              <span className="font-arcade text-[11px] text-black uppercase block">ТЕКУЩИЕ СВОЙСТВА:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.keys(selectedItem.stats).map(k => (
                  <div key={k} className="bg-neo-yellow border-2 border-black p-1.5 text-[11px] font-black text-black">
                    {formatStatText(k, selectedItem.stats[k])}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison against currently equipped item in same slot */}
            {!selectedItem.isEquipped && (() => {
              const curSlot = equippedSlotMap[selectedItem.template.slot];
              const deltas = getComparisonDeltas(selectedItem.stats, curSlot?.stats || {});
              return (
                <div className="bg-slate-50 border-2 border-black p-2.5 mb-3">
                  <span className="font-arcade text-[11px] text-black uppercase block mb-1">
                    {curSlot?.template
                      ? `ЕСЛИ НАДЕТЬ ВМЕСТО «${curSlot.template.name}»:`
                      : `СЛОТ «${SLOTS[selectedItem.template.slot]?.name.toUpperCase()}» СВОБОДЕН:`}
                  </span>
                  {deltas.length > 0 ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {deltas.map(d => (
                        <span
                          key={d.key}
                          className={`px-2 py-0.5 border border-black font-arcade text-[11px] ${
                            d.diff > 0 ? 'bg-neo-lime text-black' : 'bg-neo-pink text-white'
                          }`}
                        >
                          {d.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-600">
                      Характеристики равны текущему предмету.
                    </span>
                  )}
                </div>
              );
            })()}

            {/* Next Level Upgrade Preview */}
            {selectedItem.level < MAX_ENHANCE_LEVEL ? (
              <div className="bg-slate-50 border-2 border-black p-2.5 mb-3">
                <div className="flex items-center justify-between font-arcade text-[11px] text-black uppercase mb-1">
                  <span>ЗАТОЧКА ДО +{selectedItem.level + 1} ДАСТ:</span>
                  <span className="text-neo-pink">
                    {selectedItem.level + 1} / {MAX_ENHANCE_LEVEL}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-[11px] font-black text-emerald-700">
                  {Object.keys(selectedItem.template.growth || {}).map(k => (
                    <span key={k} className="bg-emerald-100 border border-emerald-600 px-1.5 py-0.5">
                      {formatStatText(k, selectedItem.template.growth[k])}
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
                        ? 'bg-neo-lime text-black [@media(hover:hover)]:hover:bg-lime-400'
                        : 'bg-slate-200 text-slate-500 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <span>ЗАТОЧИТЬ (+1)</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1"><CurrencyIcon type="gold" size="xs" inline /> {gold}</span>
                      {crystals > 0 && <span className="inline-flex items-center gap-1"><CurrencyIcon type="crystal" size="xs" inline /> {crystals}</span>}
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

              {/* Salvage / Dismantle Button (1/3/10/30 Crystals) */}
              {selectedItem.template.id === 'rusty_dagger' ? (
                <div className="w-full py-2 bg-slate-100 text-slate-500 border-2 border-dashed border-slate-400 font-arcade text-[11px] text-center uppercase">
                  🔒 СТАРТОВЫЙ МЕЧ НЕЛЬЗЯ РАЗОБРАТЬ
                </div>
              ) : (
                <button
                  onClick={() => {
                    hapticImpact('medium');
                    setSalvageConfirmItem(selectedItem.template);
                  }}
                  className="w-full py-2.5 px-3 bg-neo-cyan [@media(hover:hover)]:hover:bg-cyan-300 text-black border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-between uppercase transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>РАЗОБРАТЬ</span>
                  </span>
                  <span className="font-arcade text-xs font-black inline-flex items-center gap-1">
                    +{getSalvageValue(selectedItem.template.rarity)} <CurrencyIcon type="crystal" size="xs" inline />
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Modal for Salvaging / Dismantling Item */}
      {salvageConfirmItem && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-4 shadow-brutal-lg max-w-xs w-full animate-in zoom-in-95">
            <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b-2 border-black">
              <div className="w-10 h-10 bg-white border-2 border-black p-1 shrink-0 flex items-center justify-center shadow-brutal-sm">
                <EquipmentIcon item={salvageConfirmItem} size="full" />
              </div>
              <div className="min-w-0">
                <h4 className="font-arcade text-xs text-black uppercase truncate">
                  {salvageConfirmItem.name}
                </h4>
                <span className="text-[11px] font-bold text-neo-purple uppercase">
                  {RARITIES[salvageConfirmItem.rarity]?.name} • {SLOTS[salvageConfirmItem.slot]?.name}
                </span>
              </div>
            </div>

            <p className="font-arcade text-xs text-black mb-1.5 uppercase text-center text-neo-pink">
              ⚠️ ТОЧНО РАЗОБРАТЬ ПРЕДМЕТ?
            </p>

            <p className="text-[11px] font-bold text-slate-700 mb-3.5 leading-snug bg-slate-100 p-2 border border-black">
              Предмет будет уничтожен безвозвратно. Вы получите{' '}
              <span className="text-black font-black underline inline-flex items-center gap-1">
                +{getSalvageValue(salvageConfirmItem.rarity)} <CurrencyIcon type="crystal" size="xs" inline /> Кристаллов
              </span>.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  hapticImpact('heavy');
                  if (onSalvageItem) {
                    onSalvageItem(salvageConfirmItem);
                  }
                  setSalvageConfirmItem(null);
                  setSelectedItem(null); // Closes item detail modal automatically!
                }}
                className="w-full py-2.5 bg-neo-cyan [@media(hover:hover)]:hover:bg-cyan-300 text-black border-2 border-black font-arcade text-xs uppercase shadow-brutal active:translate-x-[1px] active:translate-y-[1px] font-black inline-flex items-center justify-center gap-1"
              >
                <span>РАЗОБРАТЬ (+{getSalvageValue(salvageConfirmItem.rarity)}</span>
                <CurrencyIcon type="crystal" size="xs" inline />
                <span>)</span>
              </button>
              <button
                onClick={() => {
                  hapticImpact('light');
                  setSalvageConfirmItem(null);
                }}
                className="w-full py-2.5 bg-slate-200 [@media(hover:hover)]:hover:bg-slate-300 text-black border-2 border-black font-arcade text-xs uppercase shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px]"
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
