// Equipment & Inventory System for Hunter Tower
// 4 Slots: Weapon, Armor, Helmet, Accessory
// Rarities: common, rare, epic, legendary

export const RARITIES = {
  common: {
    id: 'common',
    name: 'Обычный',
    color: '#9CA3AF',
    bg: 'bg-slate-100',
    border: 'border-slate-400',
    text: 'text-slate-800',
    costMult: 1.0,
  },
  rare: {
    id: 'rare',
    name: 'Редкий',
    color: '#00F0FF',
    bg: 'bg-cyan-50',
    border: 'border-neo-cyan',
    text: 'text-cyan-900',
    costMult: 1.45,
  },
  epic: {
    id: 'epic',
    name: 'Эпический',
    color: '#B026FF',
    bg: 'bg-purple-50',
    border: 'border-neo-purple',
    text: 'text-purple-900',
    costMult: 2.1,
  },
  legendary: {
    id: 'legendary',
    name: 'Легендарный',
    color: '#FFE600',
    bg: 'bg-amber-50',
    border: 'border-neo-yellow',
    text: 'text-amber-900',
    costMult: 3.2,
  },
};

export const SLOTS = {
  weapon: { id: 'weapon', name: 'Оружие', icon: '⚔️' },
  armor: { id: 'armor', name: 'Броня', icon: '🛡️' },
  helmet: { id: 'helmet', name: 'Шлем', icon: '🪖' },
  accessory: { id: 'accessory', name: 'Амулет', icon: '💍' },
};

export const EQUIPMENT_ITEMS = [
  // --- WEAPONS ---
  {
    id: 'rusty_dagger',
    name: 'Простой Меч',
    slot: 'weapon',
    rarity: 'common',
    icon: '🗡️',
    description: 'Базовый меч начинающего охотника. Прост в обращении, но надежен в бою.',
    baseStats: { atk: 12, critChance: 2 },
    growth: { atk: 3, critChance: 0.3 },
  },
  {
    id: 'hunter_blade',
    name: 'Клинок Охотника',
    slot: 'weapon',
    rarity: 'common',
    icon: '⚔️',
    description: 'Стандартный клинок выпускника Академии Охотников.',
    baseStats: { atk: 18, critChance: 4 },
    growth: { atk: 4.5, critChance: 0.4 },
  },
  {
    id: 'abyss_scythe',
    name: 'Коса Бездны',
    slot: 'weapon',
    rarity: 'rare',
    icon: '⛏️',
    description: 'Жнет врагов темной энергией и восстанавливает здоровье.',
    baseStats: { atk: 32, critChance: 6, vampirism: 0.04 },
    growth: { atk: 7.5, critChance: 0.5, vampirism: 0.005 },
  },
  {
    id: 'dragon_slayer',
    name: 'Меч Драконоборца',
    slot: 'weapon',
    rarity: 'epic',
    icon: '🗡️🔥',
    description: 'Закален в сердце вулкана, обладает сокрушительной силой.',
    baseStats: { atk: 58, critChance: 10, maxHp: 160 },
    growth: { atk: 13, critChance: 0.8, maxHp: 32 },
  },
  {
    id: 'shadow_monarch_blade',
    name: 'Клинок Теневого Монарха',
    slot: 'weapon',
    rarity: 'legendary',
    icon: '👑🗡️',
    description: 'Легендарное оружие повелителя теней с безумной силой атаки.',
    baseStats: { atk: 95, critChance: 15, vampirism: 0.08 },
    growth: { atk: 22, critChance: 1.1, vampirism: 0.008 },
  },

  // --- ARMOR ---
  {
    id: 'cloth_tunic',
    name: 'Тканевая Туника',
    slot: 'armor',
    rarity: 'common',
    icon: '🥋',
    description: 'Легкая походная одежда начинающего искателя приключений.',
    baseStats: { maxHp: 65, dodgeChance: 2 },
    growth: { maxHp: 22, dodgeChance: 0.3 },
  },
  {
    id: 'leather_vest',
    name: 'Кожаный Жилет',
    slot: 'armor',
    rarity: 'common',
    icon: '🦺',
    description: 'Плотный жилет из шкур пещерных монстров.',
    baseStats: { maxHp: 110, dodgeChance: 4 },
    growth: { maxHp: 30, dodgeChance: 0.4 },
  },
  {
    id: 'vanguard_chainmail',
    name: 'Кольчуга Авангарда',
    slot: 'armor',
    rarity: 'rare',
    icon: '🛡️',
    description: 'Надежная стальная защита штурмовых отрядов.',
    baseStats: { maxHp: 200, dodgeChance: 6 },
    growth: { maxHp: 52, dodgeChance: 0.6 },
  },
  {
    id: 'titan_cuirass',
    name: 'Титановая Кираса',
    slot: 'armor',
    rarity: 'epic',
    icon: '🦾',
    description: 'Тяжелая непробиваемая броня из чистейшего титана.',
    baseStats: { maxHp: 380, dodgeChance: 8 },
    growth: { maxHp: 90, dodgeChance: 0.7 },
  },
  {
    id: 'abyss_lord_armor',
    name: 'Доспех Владыки Бездны',
    slot: 'armor',
    rarity: 'legendary',
    icon: '👑🖤',
    description: 'Поглощает удары монстров и дарует несокрушимую стойкость.',
    baseStats: { maxHp: 700, dodgeChance: 12, vampirism: 0.05 },
    growth: { maxHp: 160, dodgeChance: 1.0, vampirism: 0.005 },
  },

  // --- HELMETS ---
  {
    id: 'scout_band',
    name: 'Повязка Следопыта',
    slot: 'helmet',
    rarity: 'common',
    icon: '🥷',
    description: 'Обостряет зрение и внимание в темных коридорах Башни.',
    baseStats: { maxHp: 35, atk: 4 },
    growth: { maxHp: 12, atk: 1.5 },
  },
  {
    id: 'iron_sallet',
    name: 'Железный Салад',
    slot: 'helmet',
    rarity: 'common',
    icon: '⛑️',
    description: 'Базовый металлический шлем для защиты от падающих камней.',
    baseStats: { maxHp: 60, atk: 6 },
    growth: { maxHp: 18, atk: 2.2 },
  },
  {
    id: 'assassin_cowl',
    name: 'Капюшон Ассасина',
    slot: 'helmet',
    rarity: 'rare',
    icon: '🥷🌑',
    description: 'Скрывает лицо и повышает критическую точность ударов.',
    baseStats: { maxHp: 120, atk: 14, critChance: 5 },
    growth: { maxHp: 30, atk: 4.0, critChance: 0.5 },
  },
  {
    id: 'paladin_helm',
    name: 'Шлем Паладина',
    slot: 'helmet',
    rarity: 'epic',
    icon: '✨🪖',
    description: 'Освящен рунами защиты, повышает здоровье и боевой дух.',
    baseStats: { maxHp: 260, atk: 25, dodgeChance: 5 },
    growth: { maxHp: 60, atk: 7.0, dodgeChance: 0.6 },
  },
  {
    id: 'monarch_crown',
    name: 'Корона Монарха',
    slot: 'helmet',
    rarity: 'legendary',
    icon: '👑⚡',
    description: 'Венец истинного властителя Башни: дает колоссальные бонусы.',
    baseStats: { maxHp: 460, atk: 50, critChance: 10, dodgeChance: 7 },
    growth: { maxHp: 105, atk: 12.0, critChance: 0.8, dodgeChance: 0.6 },
  },

  // --- ACCESSORIES ---
  {
    id: 'copper_pendant',
    name: 'Медный Кулон',
    slot: 'accessory',
    rarity: 'common',
    icon: '🥉',
    description: 'Простой талисман, приносящий немного удачи и золота.',
    baseStats: { goldBonus: 0.08, critChance: 2 },
    growth: { goldBonus: 0.02, critChance: 0.3 },
  },
  {
    id: 'silver_ring',
    name: 'Серебряный Перстень',
    slot: 'accessory',
    rarity: 'common',
    icon: '💍',
    description: 'Перстень с гравировкой гильдии искателей сокровищ.',
    baseStats: { goldBonus: 0.12, atk: 7 },
    growth: { goldBonus: 0.025, atk: 2.2 },
  },
  {
    id: 'greed_talisman',
    name: 'Амулет Алчности',
    slot: 'accessory',
    rarity: 'rare',
    icon: '🪙📿',
    description: 'Притягивает звонкие монеты со всех поверженных врагов.',
    baseStats: { goldBonus: 0.30, critChance: 5 },
    growth: { goldBonus: 0.045, critChance: 0.5 },
  },
  {
    id: 'vampire_signet',
    name: 'Печать Вампира',
    slot: 'accessory',
    rarity: 'epic',
    icon: '🩸💍',
    description: 'Впитывает жизненную силу врагов с каждым нанесенным ударом.',
    baseStats: { vampirism: 0.08, atk: 22, maxHp: 130 },
    growth: { vampirism: 0.008, atk: 5.5, maxHp: 32 },
  },
  {
    id: 'ring_of_eternity',
    name: 'Перстень Вечности',
    slot: 'accessory',
    rarity: 'legendary',
    icon: '🌟💍',
    description: 'Древнейший реликт богов: дарует богатство, силу и вампиризм.',
    baseStats: { goldBonus: 0.50, atk: 45, maxHp: 270, vampirism: 0.10, critChance: 8 },
    growth: { goldBonus: 0.06, atk: 10, maxHp: 60, vampirism: 0.01, critChance: 0.8 },
  },
];

export const EQUIPMENT_CATALOG = [...EQUIPMENT_ITEMS];
EQUIPMENT_ITEMS.forEach(item => {
  EQUIPMENT_CATALOG[item.id] = item;
});

export const EQUIPMENT_BY_ID = EQUIPMENT_ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

export const MAX_ENHANCE_LEVEL = 20;

// Calculate stats for a given item at level (level >= 1)
export function getItemStats(itemTemplate, level = 1) {
  if (!itemTemplate) return {};
  const lvl = Math.max(1, level);
  const extraLevels = lvl - 1;

  const result = {};
  const base = itemTemplate.baseStats || {};
  const growth = itemTemplate.growth || {};

  Object.keys(base).forEach(key => {
    const bVal = base[key] || 0;
    const gVal = growth[key] || 0;
    const total = bVal + gVal * extraLevels;

    if (key === 'critChance' || key === 'dodgeChance') {
      result[key] = Math.round(total * 10) / 10;
    } else if (key === 'goldBonus' || key === 'vampirism') {
      result[key] = Math.round(total * 1000) / 1000;
    } else {
      result[key] = Math.round(total);
    }
  });

  return result;
}

// Calculate delta stats between level L and L+1
export function getItemNextLevelGain(itemTemplate) {
  if (!itemTemplate || !itemTemplate.growth) return {};
  return { ...itemTemplate.growth };
}

// Upgrade cost in Gold and Crystals for level L -> L+1
export function getEquipmentUpgradeCost(itemTemplate, currentLevel = 1) {
  if (!itemTemplate) return { gold: 9999, crystals: 999 };
  const rarity = RARITIES[itemTemplate.rarity] || RARITIES.common;
  const mult = rarity.costMult || 1.0;

  // Gold: 40 at lvl 1, scaling by 1.34
  const gold = Math.floor(40 * Math.pow(1.34, currentLevel - 1) * mult);

  // Crystals: starts at level 2+, scales slowly
  const crystals = currentLevel >= 2
    ? Math.max(1, Math.floor(Math.pow(1.24, currentLevel - 2) * mult))
    : 0;

  return { gold, crystals };
}

// Format single stat string for UI
export function formatStatText(key, value) {
  switch (key) {
    case 'atk':
      return `+${value} Урона`;
    case 'maxHp':
      return `+${value} HP`;
    case 'critChance':
      return `+${value}% Крита`;
    case 'dodgeChance':
      return `+${value}% Уворота`;
    case 'vampirism':
      return `+${Math.round(value * 100)}% Вампиризма`;
    case 'goldBonus':
      return `+${Math.round(value * 100)}% Золота`;
    default:
      return `+${value}`;
  }
}

// Drop generator for defeating monsters or opening chests
export function rollEquipmentDrop(floor = 1, forceRarity = null) {
  let rarity = forceRarity;

  if (!rarity) {
    const roll = Math.random() * 100;
    // Higher floors increase chance for rare/epic/legendary
    const legendaryChance = Math.min(12, 1 + floor * 0.1);
    const epicChance = Math.min(28, 5 + floor * 0.25);
    const rareChance = Math.min(45, 18 + floor * 0.35);

    if (roll < legendaryChance) {
      rarity = 'legendary';
    } else if (roll < legendaryChance + epicChance) {
      rarity = 'epic';
    } else if (roll < legendaryChance + epicChance + rareChance) {
      rarity = 'rare';
    } else {
      rarity = 'common';
    }
  }

  const pool = EQUIPMENT_CATALOG.filter(it => it.rarity === rarity);
  if (pool.length === 0) return EQUIPMENT_CATALOG[0];

  const picked = pool[Math.floor(Math.random() * pool.length)];
  return {
    ...picked,
    instanceId: `${picked.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  };
}
