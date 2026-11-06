// Rebirth / Prestige system
// When player reaches floor 20+, they can perform Rebirth to reset floors and basic upgrades
// In exchange, they gain "Soul Shards" (Осколки Душ) which provide permanent global multipliers

export const REBIRTH_PERKS = [
  {
    id: 'soul_power',
    name: 'Власть Душ',
    icon: '⚡',
    description: '+15% к финальному урону персонажа за каждый уровень',
    baseCostSouls: 1,
    costMultiplier: 1.5,
    maxLevel: 25,
    bonusPerLevel: 0.15,
  },
  {
    id: 'soul_vitality',
    name: 'Бессмертный Дух',
    icon: '❤️',
    description: '+20% к общему запасу здоровья за каждый уровень',
    baseCostSouls: 1,
    costMultiplier: 1.5,
    maxLevel: 25,
    bonusPerLevel: 0.20,
  },
  {
    id: 'soul_fortune',
    name: 'Богатство Бездны',
    icon: '🪙',
    description: '+25% к получаемому золоту навсегда за каждый уровень',
    baseCostSouls: 2,
    costMultiplier: 1.6,
    maxLevel: 20,
    bonusPerLevel: 0.25,
  },
  {
    id: 'soul_instinct',
    name: 'Древний Инстинкт',
    icon: '🎯',
    description: '+3% шанс крита и +2% уклонение за каждый уровень',
    baseCostSouls: 3,
    costMultiplier: 1.8,
    maxLevel: 15,
    bonusPerLevel: 3,
  }
];

// Calculate how many souls player will gain on rebirth
export function calculateRebirthSouls(maxFloor) {
  if (maxFloor < 20) return 0;
  // Floor 20 gives 2 souls, Floor 30 gives 5 souls, Floor 50 gives 15, Floor 100 gives 60+
  const excess = maxFloor - 19;
  return Math.max(1, Math.floor(Math.pow(excess, 1.25) / 4));
}

export function getPerkCost(perk, currentLevel) {
  return Math.floor(perk.baseCostSouls * Math.pow(perk.costMultiplier, currentLevel));
}
