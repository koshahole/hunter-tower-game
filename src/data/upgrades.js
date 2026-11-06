// Permanent Base Camp Upgrades (Meta-progression)
export const UPGRADES = [
  {
    id: 'base_atk',
    name: 'Заточка Клинка',
    icon: '⚔️',
    description: '+6 к базовой атаке за каждый уровень',
    baseCostGold: 80,
    costMultiplier: 1.5,
    maxLevel: 50,
    currency: 'gold',
    statBonus: 6,
    statKey: 'atk'
  },
  {
    id: 'base_hp',
    name: 'Закалка Тела',
    icon: '❤️',
    description: '+30 к максимальному здоровью',
    baseCostGold: 100,
    costMultiplier: 1.45,
    maxLevel: 50,
    currency: 'gold',
    statBonus: 30,
    statKey: 'maxHp'
  },
  {
    id: 'crit_chance',
    name: 'Око Сокола',
    icon: '🎯',
    description: '+1.5% к шансу нанесения критического удара',
    baseCostGold: 200,
    costMultiplier: 1.7,
    baseCostCrystals: 5,
    maxLevel: 25,
    currency: 'hybrid',
    statBonus: 1.5,
    statKey: 'critChance'
  },
  {
    id: 'dodge_chance',
    name: 'Теневой Шаг',
    icon: '💨',
    description: '+1% к шансу полностью уклониться от удара',
    baseCostGold: 300,
    costMultiplier: 1.8,
    baseCostCrystals: 10,
    maxLevel: 20,
    currency: 'hybrid',
    statBonus: 1.0,
    statKey: 'dodgeChance'
  },
  {
    id: 'gold_mult',
    name: 'Охотничье Чутье',
    icon: '🪙',
    description: '+12% к золоту, получаемому за победы над монстрами',
    baseCostGold: 150,
    costMultiplier: 1.6,
    maxLevel: 30,
    currency: 'gold',
    statBonus: 0.12,
    statKey: 'goldBonus'
  }
];

export function getUpgradeCost(upgrade, currentLevel) {
  const gold = Math.floor(upgrade.baseCostGold * Math.pow(upgrade.costMultiplier, currentLevel));
  const crystals = upgrade.baseCostCrystals 
    ? Math.floor(upgrade.baseCostCrystals * Math.pow(1.3, currentLevel)) 
    : 0;
  return { gold, crystals };
}
