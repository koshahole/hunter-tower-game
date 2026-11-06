// Permanent Base Camp Upgrades with Progressive Compounding Bonuses
export const UPGRADES = [
  {
    id: 'base_atk',
    name: 'Заточка Клинка',
    icon: '⚔️',
    description: 'Увеличивает базовую атаку (с каждым уровнем дает всё больше силы)',
    baseCostGold: 45,
    costMultiplier: 1.45,
    maxLevel: 50,
    currency: 'gold',
    statKey: 'atk',
    unit: 'ед.'
  },
  {
    id: 'base_hp',
    name: 'Закалка Тела',
    icon: '❤️',
    description: 'Увеличивает максимальное здоровье с прогрессивным приростом',
    baseCostGold: 50,
    costMultiplier: 1.42,
    maxLevel: 50,
    currency: 'gold',
    statKey: 'maxHp',
    unit: 'HP'
  },
  {
    id: 'crit_chance',
    name: 'Око Сокола',
    icon: '🎯',
    description: 'Повышает шанс критического удара (каждый уровень сильнее предыдущего)',
    baseCostGold: 120,
    costMultiplier: 1.55,
    baseCostCrystals: 3,
    maxLevel: 25,
    currency: 'hybrid',
    statKey: 'critChance',
    unit: '%'
  },
  {
    id: 'dodge_chance',
    name: 'Теневой Шаг',
    icon: '💨',
    description: 'Повышает мастерство уклонения от ударов монстров',
    baseCostGold: 160,
    costMultiplier: 1.6,
    baseCostCrystals: 5,
    maxLevel: 20,
    currency: 'hybrid',
    statKey: 'dodgeChance',
    unit: '%'
  },
  {
    id: 'gold_mult',
    name: 'Охотничье Чутье',
    icon: '🪙',
    description: 'Растущий процент к золоту за победы над монстрами и боссами',
    baseCostGold: 90,
    costMultiplier: 1.5,
    maxLevel: 30,
    currency: 'gold',
    statKey: 'goldBonus',
    unit: '%'
  }
];

// Returns the bonus given specifically for reaching level L (L >= 1)
export function getUpgradeStepBonus(upgradeId, level) {
  if (level <= 0) return 0;
  const i = level - 1;

  switch (upgradeId) {
    case 'base_atk':
      // Lvl 1: 6, Lvl 2: 8, Lvl 3: 11, Lvl 4: 15, Lvl 5: 19...
      return Math.floor(6 + i * 2.2 + Math.pow(i, 1.25));

    case 'base_hp':
      // Lvl 1: 30, Lvl 2: 42, Lvl 3: 57, Lvl 4: 75, Lvl 5: 96...
      return Math.floor(30 + i * 11 + Math.pow(i, 1.3) * 2);

    case 'crit_chance':
      // Lvl 1: +1.5%, Lvl 2: +1.8%, Lvl 3: +2.2%, Lvl 4: +2.6%...
      return parseFloat((1.5 + i * 0.35).toFixed(1));

    case 'dodge_chance':
      // Lvl 1: +1.0%, Lvl 2: +1.3%, Lvl 3: +1.6%, Lvl 4: +2.0%...
      return parseFloat((1.0 + i * 0.25).toFixed(1));

    case 'gold_mult':
      // Lvl 1: +10% (0.10), Lvl 2: +12% (0.12), Lvl 3: +15% (0.15)...
      return parseFloat((0.10 + i * 0.025).toFixed(3));

    default:
      return 1;
  }
}

// Total accumulated bonus from level 1 up to current level
export function getTotalStatBonus(upgradeId, currentLevel) {
  if (!currentLevel || currentLevel <= 0) return 0;
  let total = 0;
  for (let l = 1; l <= currentLevel; l++) {
    total += getUpgradeStepBonus(upgradeId, l);
  }
  if (upgradeId === 'crit_chance' || upgradeId === 'dodge_chance') {
    return parseFloat(total.toFixed(1));
  }
  if (upgradeId === 'gold_mult') {
    return parseFloat(total.toFixed(3));
  }
  return Math.round(total);
}

// Next level step bonus
export function getNextLevelBonus(upgradeId, currentLevel) {
  return getUpgradeStepBonus(upgradeId, currentLevel + 1);
}

export function getUpgradeCost(upgrade, currentLevel) {
  const gold = Math.floor(upgrade.baseCostGold * Math.pow(upgrade.costMultiplier, currentLevel));
  const crystals = upgrade.baseCostCrystals 
    ? Math.floor(upgrade.baseCostCrystals * Math.pow(1.28, currentLevel)) 
    : 0;
  return { gold, crystals };
}
