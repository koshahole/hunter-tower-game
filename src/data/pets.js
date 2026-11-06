// Pets system with 12 distinct pets, leveling scaling and stats
export const PETS = [
  {
    id: 'green_slime',
    name: 'Зеленый Слизень',
    avatar: '🟢',
    rarity: 'common',
    rarityName: 'Обычный',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    description: 'Милый комочек слизи. Регенерирует здоровье и привлекает мелкие монеты.',
    baseHpBonus: 0.08,
    baseAtkBonus: 0.02,
    baseCritBonus: 0,
    baseDodgeBonus: 0,
    baseGoldBonus: 0.05,
  },
  {
    id: 'forest_fox',
    name: 'Лисица Ветра',
    avatar: '🦊🍃',
    rarity: 'common',
    rarityName: 'Обычный',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    description: 'Ловкая спутница, обостряющая реакцию охотника на резкие выпады монстров.',
    baseHpBonus: 0.05,
    baseAtkBonus: 0.05,
    baseCritBonus: 2,
    baseDodgeBonus: 4,
    baseGoldBonus: 0.03,
  },
  {
    id: 'baby_golem',
    name: 'Кроха Голем',
    avatar: '🗿🧱',
    rarity: 'common',
    rarityName: 'Обычный',
    color: '#4b5563',
    bgColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    description: 'Каменный защитник. Принимает удары на свой монолитный панцирь.',
    baseHpBonus: 0.12,
    baseAtkBonus: 0,
    baseCritBonus: 0,
    baseDodgeBonus: 0,
    baseGoldBonus: 0.02,
  },
  {
    id: 'cyber_pug',
    name: 'Кибер-Мопс',
    avatar: '🐶⚡',
    rarity: 'rare',
    rarityName: 'Редкий',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    description: 'Оснащен лазерным целеуказателем. Находит слабые точки в броне врагов.',
    baseHpBonus: 0.05,
    baseAtkBonus: 0.12,
    baseCritBonus: 4,
    baseDodgeBonus: 2,
    baseGoldBonus: 0.08,
  },
  {
    id: 'crystal_owl',
    name: 'Хрустальная Сова',
    avatar: '🦉💎',
    rarity: 'rare',
    rarityName: 'Редкий',
    color: '#0891b2',
    bgColor: '#ecfeff',
    borderColor: '#a5f3fc',
    description: 'Мудрая сова, приносящая дополнительные кристаллы Бездны после побед.',
    baseHpBonus: 0.06,
    baseAtkBonus: 0.08,
    baseCritBonus: 3,
    baseDodgeBonus: 3,
    baseGoldBonus: 0.12,
  },
  {
    id: 'electric_chinchilla',
    name: 'Грозовая Шиншилла',
    avatar: '🐭⚡',
    rarity: 'rare',
    rarityName: 'Редкий',
    color: '#eab308',
    bgColor: '#fefce8',
    borderColor: '#fef08a',
    description: 'Искрится статическим зарядом, увеличивая частоту критических ударов.',
    baseHpBonus: 0.04,
    baseAtkBonus: 0.10,
    baseCritBonus: 6,
    baseDodgeBonus: 3,
    baseGoldBonus: 0.06,
  },
  {
    id: 'fire_drake',
    name: 'Огненный Дракончик',
    avatar: '🐲🔥',
    rarity: 'epic',
    rarityName: 'Эпический',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    description: 'Дышит яростным пламенем, многократно усиливая атакующий потенциал.',
    baseHpBonus: 0.08,
    baseAtkBonus: 0.18,
    baseCritBonus: 8,
    baseDodgeBonus: 2,
    baseGoldBonus: 0.12,
  },
  {
    id: 'shadow_wolf',
    name: 'Теневой Волк',
    avatar: '🐺🌑',
    rarity: 'epic',
    rarityName: 'Эпический',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    description: 'Сливается с тенью хозяина, даруя высокое мастерство уклонения.',
    baseHpBonus: 0.14,
    baseAtkBonus: 0.12,
    baseCritBonus: 5,
    baseDodgeBonus: 8,
    baseGoldBonus: 0.10,
  },
  {
    id: 'frost_bear',
    name: 'Ледяной Медвежонок',
    avatar: '🐻‍❄️❄️',
    rarity: 'epic',
    rarityName: 'Эпический',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
    description: 'Замораживает воздух вокруг себя, даруя несокрушимый запас здоровья.',
    baseHpBonus: 0.22,
    baseAtkBonus: 0.08,
    baseCritBonus: 2,
    baseDodgeBonus: 2,
    baseGoldBonus: 0.14,
  },
  {
    id: 'astral_phoenix',
    name: 'Звездный Феникс',
    avatar: '🦅✨',
    rarity: 'legendary',
    rarityName: 'Легендарный',
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
    description: 'Древнее создание чистого звездного огня. Усиливает все показатели охотника.',
    baseHpBonus: 0.25,
    baseAtkBonus: 0.22,
    baseCritBonus: 8,
    baseDodgeBonus: 5,
    baseGoldBonus: 0.20,
  },
  {
    id: 'void_reaper',
    name: 'Жнец Пустоты',
    avatar: '👤⚔️',
    rarity: 'legendary',
    rarityName: 'Легендарный',
    color: '#6366f1',
    bgColor: '#eef2ff',
    borderColor: '#c7d2fe',
    description: 'Теневой дух из глубин Бездны. Превращает критические удары в сокрушительный вихрь.',
    baseHpBonus: 0.18,
    baseAtkBonus: 0.28,
    baseCritBonus: 12,
    baseDodgeBonus: 6,
    baseGoldBonus: 0.25,
  },
  {
    id: 'celestial_kitsune',
    name: 'Небесная Кицунэ',
    avatar: '🦊👑',
    rarity: 'mythic',
    rarityName: 'Мифический',
    color: '#db2777',
    bgColor: '#fdf2f8',
    borderColor: '#fbcfe8',
    description: 'Девятихвостая хранительница тайн. Максимальное изобилие золота и абсолютная мощь.',
    baseHpBonus: 0.35,
    baseAtkBonus: 0.35,
    baseCritBonus: 15,
    baseDodgeBonus: 10,
    baseGoldBonus: 0.40,
  }
];

// Calculate pet stats based on pet level (Level 1 to 20)
export function getPetStats(pet, level = 1) {
  const levelMult = 1 + (level - 1) * 0.15; // +15% per level
  return {
    hpBonus: pet.baseHpBonus * levelMult,
    atkBonus: pet.baseAtkBonus * levelMult,
    critBonus: Math.round(pet.baseCritBonus * levelMult),
    dodgeBonus: Math.round(pet.baseDodgeBonus * levelMult),
    goldBonus: pet.baseGoldBonus * levelMult,
  };
}

// Cost to level up pet: gold and crystals
export function getPetUpgradeCost(level) {
  const gold = Math.floor(120 * Math.pow(1.35, level - 1));
  const crystals = Math.floor(6 * Math.pow(1.25, level - 1));
  return { gold, crystals };
}

// Gacha roll logic
export function rollPetGacha() {
  const roll = Math.random() * 100;
  if (roll <= 1.5) {
    // Mythic 1.5%
    return PETS.find(p => p.rarity === 'mythic') || PETS[0];
  } else if (roll <= 8) {
    // Legendary 6.5%
    const legendaries = PETS.filter(p => p.rarity === 'legendary');
    return legendaries[Math.floor(Math.random() * legendaries.length)];
  } else if (roll <= 28) {
    // Epic 20%
    const epics = PETS.filter(p => p.rarity === 'epic');
    return epics[Math.floor(Math.random() * epics.length)];
  } else if (roll <= 60) {
    // Rare 32%
    const rares = PETS.filter(p => p.rarity === 'rare');
    return rares[Math.floor(Math.random() * rares.length)];
  } else {
    // Common 40%
    const commons = PETS.filter(p => p.rarity === 'common');
    return commons[Math.floor(Math.random() * commons.length)];
  }
}
