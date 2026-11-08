// Equipment & Inventory System for Hunter Tower
// 4 Slots: Weapon, Armor, Helmet, Accessory
// Total 400 Equipment Items (100 per slot: 25 Common, 25 Rare, 25 Epic, 25 Legendary)
import { WEAPONS } from './equipment/weapons.js';
import { ARMORS } from './equipment/armors.js';
import { HELMETS } from './equipment/helmets.js';
import { ACCESSORIES } from './equipment/accessories.js';

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
  weapon: {
    id: 'weapon',
    name: 'Оружие',
    icon: '⚔️',
    description: 'Увеличивает урон и шанс критического удара',
  },
  armor: {
    id: 'armor',
    name: 'Броня',
    icon: '🛡️',
    description: 'Увеличивает здоровье и шанс уклонения',
  },
  helmet: {
    id: 'helmet',
    name: 'Шлем',
    icon: '🪖',
    description: 'Баланс здоровья, защиты и боевой мощи',
  },
  accessory: {
    id: 'accessory',
    name: 'Амулет',
    icon: '💍',
    description: 'Особые эффекты: бонус золота, вампиризм и кристаллы',
  },
};

// All 400 equipment items combined
export const EQUIPMENT_ITEMS = [
  ...WEAPONS,
  ...ARMORS,
  ...HELMETS,
  ...ACCESSORIES
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

// Salvage values strictly per spec: 1 / 3 / 10 / 30 Crystals
export const SALVAGE_VALUES = {
  common: 1,
  rare: 3,
  epic: 10,
  legendary: 30
};

export function getSalvageValue(rarity) {
  return SALVAGE_VALUES[rarity] || 1;
}

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
    } else if (key === 'goldBonus' || key === 'crystalBonus' || key === 'vampirism') {
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

  // Gold: 60 at lvl 1 (increased 1.5x from 40), scaling by 1.34 across all rarities
  const gold = Math.floor(60 * Math.pow(1.34, currentLevel - 1) * mult);

  // Crystals: common items NEVER cost crystals to upgrade (0 crystals at all levels)
  // Rare, Epic and Legendary require crystals starting from level 2+
  const isCommon = itemTemplate.rarity === 'common';
  const crystals = (!isCommon && currentLevel >= 2)
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
    case 'crystalBonus':
      return `+${Math.round(value * 100)}% Кристаллов`;
    default:
      return `+${value}`;
  }
}

// Floor odds table strictly from ЗАДАЧА.txt
export function getLootOddsForFloor(floor) {
  if (floor < 10) return { common: 100, rare: 0, epic: 0, legendary: 0 };
  if (floor < 20) return { common: 85, rare: 15, epic: 0, legendary: 0 };
  if (floor < 30) return { common: 70, rare: 25, epic: 5, legendary: 0 };
  if (floor < 40) return { common: 55, rare: 33, epic: 10, legendary: 2 };
  if (floor < 50) return { common: 45, rare: 35, epic: 17, legendary: 3 };
  if (floor < 60) return { common: 35, rare: 35, epic: 25, legendary: 5 };
  if (floor < 70) return { common: 25, rare: 33, epic: 33, legendary: 9 };
  if (floor < 80) return { common: 15, rare: 30, epic: 40, legendary: 15 };
  if (floor < 90) return { common: 10, rare: 25, epic: 45, legendary: 20 };
  return { common: 5, rare: 20, epic: 50, legendary: 25 };
}

export function upgradeRarityTier(rarity) {
  if (rarity === 'common') return 'rare';
  if (rarity === 'rare') return 'epic';
  if (rarity === 'epic') return 'legendary';
  return 'legendary';
}

// Drop generator with floor tiered tables and boss rarity guarantees
export function rollEquipmentDrop(floor = 1, options = {}) {
  // Support both rollEquipmentDrop(floor, forceRarity) and rollEquipmentDrop(floor, { isBoss, isLeader, forceRarity })
  const opts = typeof options === 'string' ? { forceRarity: options } : (options || {});
  const { isBoss = false, isLeader = false, forceRarity = null } = opts;

  let chosenRarity = forceRarity;

  if (!chosenRarity) {
    const odds = getLootOddsForFloor(floor);
    const roll = Math.random() * 100;

    if (roll < odds.legendary) {
      chosenRarity = 'legendary';
    } else if (roll < odds.legendary + odds.epic) {
      chosenRarity = 'epic';
    } else if (roll < odds.legendary + odds.epic + odds.rare) {
      chosenRarity = 'rare';
    } else {
      chosenRarity = 'common';
    }

    // Boss bonus: guarantees +1 rarity above base floor tier
    if (isBoss) {
      if (floor >= 80) {
        chosenRarity = 'legendary';
      } else if (floor >= 30) {
        // Boss 30+ guarantees at least Epic
        if (chosenRarity === 'common' || chosenRarity === 'rare') chosenRarity = 'epic';
      } else if (floor >= 10) {
        // Boss 10+ guarantees at least Rare
        if (chosenRarity === 'common') chosenRarity = 'rare';
      } else {
        chosenRarity = upgradeRarityTier(chosenRarity);
      }
    } else if (isLeader && Math.random() < 0.35) {
      chosenRarity = upgradeRarityTier(chosenRarity);
    }
  }

  // Strict Safety Check:
  // Legendary NEVER drops before floor 30!
  if (floor < 30 && chosenRarity === 'legendary') {
    chosenRarity = floor >= 20 ? 'epic' : (floor >= 10 ? 'rare' : 'common');
  }
  // Epic NEVER drops before floor 15!
  if (floor < 15 && chosenRarity === 'epic') {
    chosenRarity = floor >= 10 ? 'rare' : 'common';
  }
  // First run 1-9 only gives Common
  if (floor < 10) {
    chosenRarity = 'common';
  }

  let pool = EQUIPMENT_ITEMS.filter(it => it.rarity === chosenRarity);
  if (pool.length === 0) {
    pool = EQUIPMENT_ITEMS.filter(it => it.rarity === 'common');
  }

  const picked = pool[Math.floor(Math.random() * pool.length)];
  return { ...picked };
}
