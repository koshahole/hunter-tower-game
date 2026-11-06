// Persistent Storage with 5-minute Energy Refill & Customization

const STORAGE_KEY = 'aether_tower_save_v3';

// 5 minutes in milliseconds
export const ENERGY_REFILL_MS = 5 * 60 * 1000;

export const DEFAULT_STATE = {
  // Currencies
  gold: 250,
  crystals: 30,
  souls: 0,
  totalRebirths: 0,

  // Tower Progress
  maxFloor: 1,
  currentFloor: 1,

  // Energy System (5 min refill)
  energy: 5,
  maxEnergy: 5,
  lastEnergyRefill: Date.now(),

  // Hunter Customization
  hunterName: 'Охотник',
  hunterAvatar: '🧙‍♂️',
  hunterTitle: 'Искатель Башни',

  // Base Camp Upgrades
  upgrades: {
    base_atk: 0,
    base_hp: 0,
    crit_chance: 0,
    dodge_chance: 0,
    gold_mult: 0,
  },

  // Rebirth Perks
  rebirthPerks: {
    soul_power: 0,
    soul_vitality: 0,
    soul_fortune: 0,
    soul_instinct: 0,
  },

  // Pet Collection
  ownedPets: ['green_slime'],
  petLevels: {
    green_slime: 1,
  },
  activePetId: 'green_slime',

  // Battle consumable
  potions: 2,
  reviveTokens: 0,
  vip: false,
  sound: true,

  // Lifetime Stats
  stats: {
    totalRuns: 0,
    monstersKilled: 0,
    bossesKilled: 0,
    highestFloorCleared: 1,
  }
};

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('hunter_academy_save_v2');
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      upgrades: { ...DEFAULT_STATE.upgrades, ...(parsed.upgrades || {}) },
      rebirthPerks: { ...DEFAULT_STATE.rebirthPerks, ...(parsed.rebirthPerks || {}) },
      petLevels: { ...DEFAULT_STATE.petLevels, ...(parsed.petLevels || {}) },
      stats: { ...DEFAULT_STATE.stats, ...(parsed.stats || {}) },
    };
  } catch (e) {
    console.error('Error loading state:', e);
    return DEFAULT_STATE;
  }
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

// Calculate Energy and exact remaining seconds until next energy point
export function calculateEnergy(state) {
  const now = Date.now();
  let energy = state.energy;
  let lastRefill = state.lastEnergyRefill || now;

  if (energy < state.maxEnergy) {
    const passed = now - lastRefill;
    const gained = Math.floor(passed / ENERGY_REFILL_MS);
    if (gained > 0) {
      energy = Math.min(state.maxEnergy, energy + gained);
      lastRefill = now - (passed % ENERGY_REFILL_MS);
    }
  } else {
    lastRefill = now;
  }

  // Seconds until next energy point (0 if already max)
  let secondsToNext = 0;
  if (energy < state.maxEnergy) {
    const passedInCurrentCycle = now - lastRefill;
    const remainingMs = Math.max(0, ENERGY_REFILL_MS - passedInCurrentCycle);
    secondsToNext = Math.ceil(remainingMs / 1000);
  }

  return { energy, lastEnergyRefill: lastRefill, secondsToNext };
}
