// Persistent Storage with 3-minute Energy Refill & Cross-Device CloudStorage
const STORAGE_KEY = 'aether_tower_save_v5';

// 3 minutes in milliseconds (180 seconds)
export const ENERGY_REFILL_MS = 3 * 60 * 1000;

export const DEFAULT_STATE = {
  // Currencies
  gold: 80,
  crystals: 10,
  souls: 0,
  totalRebirths: 0,

  // Tower Progress
  maxFloor: 1,
  currentFloor: 1,

  // Energy System (3 min refill)
  energy: 5,
  maxEnergy: 5,
  lastEnergyRefill: Date.now(),

  // Hunter Customization
  hunterName: 'Охотник',
  hunterAvatar: '🧙‍♂️',
  hunterTitle: 'Искатель Башни',

  // Equipment System (Replaces legacy abstract upgrades)
  equipped: {
    weapon: 'rusty_dagger',
    armor: 'cloth_tunic',
    helmet: 'scout_band',
    accessory: 'copper_pendant',
  },
  equipmentLevels: {
    rusty_dagger: 1,
    cloth_tunic: 1,
    scout_band: 1,
    copper_pendant: 1,
  },
  inventory: [
    'rusty_dagger',
    'cloth_tunic',
    'scout_band',
    'copper_pendant',
  ],

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

  // Battle consumable & inventory
  potions: 2,
  reviveTokens: 0,
  artifacts: [], // Permanent or run relics
  vip: false,
  sound: true,

  // Lifetime Stats
  stats: {
    totalRuns: 0,
    monstersKilled: 0,
    bossesKilled: 0,
    highestFloorCleared: 1,
  },
  lastSavedAt: Date.now()
};

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ||
                localStorage.getItem('aether_tower_save_v4') ||
                localStorage.getItem('aether_tower_save_v3');
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);

    // Migration from old upgrades system to equipment
    let equipped = parsed.equipped || DEFAULT_STATE.equipped;
    let equipmentLevels = parsed.equipmentLevels || DEFAULT_STATE.equipmentLevels;
    let inventory = parsed.inventory || DEFAULT_STATE.inventory;

    // If legacy save had upgrades but no equipmentLevels, convert legacy stats
    if (parsed.upgrades && !parsed.equipmentLevels) {
      equipmentLevels = {
        rusty_dagger: Math.max(1, (parsed.upgrades.base_atk || 0) + 1),
        cloth_tunic: Math.max(1, (parsed.upgrades.base_hp || 0) + 1),
        scout_band: Math.max(1, (parsed.upgrades.crit_chance || 0) + 1),
        copper_pendant: Math.max(1, (parsed.upgrades.gold_mult || 0) + 1),
      };
    }

    return {
      ...DEFAULT_STATE,
      ...parsed,
      equipped: { ...DEFAULT_STATE.equipped, ...equipped },
      equipmentLevels: { ...DEFAULT_STATE.equipmentLevels, ...equipmentLevels },
      inventory: Array.isArray(inventory) && inventory.length > 0 ? inventory : DEFAULT_STATE.inventory,
      rebirthPerks: { ...DEFAULT_STATE.rebirthPerks, ...(parsed.rebirthPerks || {}) },
      petLevels: { ...DEFAULT_STATE.petLevels, ...(parsed.petLevels || {}) },
      stats: { ...DEFAULT_STATE.stats, ...(parsed.stats || {}) },
    };
  } catch (e) {
    console.error('Error loading state:', e);
    return DEFAULT_STATE;
  }
}

let cloudSaveTimer = null;

export function saveGameState(state) {
  try {
    const enriched = {
      ...state,
      lastSavedAt: Date.now()
    };
    const jsonStr = JSON.stringify(enriched);
    localStorage.setItem(STORAGE_KEY, jsonStr);

    // Cross-Device Sync: save to Telegram CloudStorage
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.CloudStorage) {
      if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
      cloudSaveTimer = setTimeout(() => {
        try {
          window.Telegram.WebApp.CloudStorage.setItem('hunter_cloud_save', jsonStr, (err) => {
            if (err) console.warn('Telegram CloudStorage save failed:', err);
          });
        } catch (e) {
          console.warn('CloudStorage setItem error:', e);
        }
      }, 600);
    }
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

// Check Telegram CloudStorage on startup to sync across phone and desktop
export function loadFromCloudStorage(onStateLoaded) {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.CloudStorage) {
    try {
      window.Telegram.WebApp.CloudStorage.getItem('hunter_cloud_save', (err, value) => {
        if (!err && value) {
          try {
            const parsed = JSON.parse(value);
            if (parsed && typeof parsed === 'object') {
              onStateLoaded(parsed);
            }
          } catch {}
        }
      });
    } catch (e) {
      console.warn('CloudStorage getItem failed:', e);
    }
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
