// Persistent Storage with 3-minute Energy Refill & Cross-Device CloudStorage
// Season 2 Hard Wipe: Clean start for all players
const STORAGE_KEY = 'aether_tower_season_2';
const CLOUD_STORAGE_KEY = 'hunter_cloud_save_s2';

// 3 minutes in milliseconds (180 seconds)
export const ENERGY_REFILL_MS = 3 * 60 * 1000;

export const DEFAULT_STATE = {
  // Currencies
  gold: 0,
  crystals: 0,
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

  // Clean Start: One simple sword at the start, zero initial armor/pets
  equipped: {
    weapon: 'rusty_dagger',
    armor: null,
    helmet: null,
    accessory: null,
  },
  equipmentLevels: {
    rusty_dagger: 1,
  },
  inventory: ['rusty_dagger'],

  // Rebirth Perks
  rebirthPerks: {
    soul_power: 0,
    soul_vitality: 0,
    soul_fortune: 0,
    soul_instinct: 0,
  },

  // Clean Start: No initial pets - player must hatch or unlock companions
  ownedPets: [],
  petLevels: {},
  activePetId: null,

  // Battle consumable & inventory
  potions: 1,
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

// Purge legacy storage keys to guarantee a clean wipe for all players
function purgeOldSaves() {
  try {
    const oldKeys = [
      'aether_tower_season_1',
      'aether_tower_save_v6',
      'aether_tower_save_v5',
      'aether_tower_save_v4',
      'aether_tower_save_v3',
      'aether_tower_save_v2',
      'aether_tower_save_v1',
      'hunter_tower_save'
    ];
    oldKeys.forEach(k => {
      if (localStorage.getItem(k)) {
        localStorage.removeItem(k);
      }
    });

    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.CloudStorage) {
      window.Telegram.WebApp.CloudStorage.removeItem('hunter_cloud_save_s1', () => {});
      window.Telegram.WebApp.CloudStorage.removeItem('hunter_cloud_save', () => {});
    }
  } catch (e) {
    // Ignore in restricted environments
  }
}

export function loadGameState() {
  try {
    purgeOldSaves();

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);

    const inventory = Array.isArray(parsed.inventory) && parsed.inventory.length > 0
      ? parsed.inventory
      : ['rusty_dagger'];

    const equipped = {
      weapon: 'rusty_dagger',
      armor: null,
      helmet: null,
      accessory: null,
      ...(parsed.equipped || {})
    };
    if (!equipped.weapon && inventory.includes('rusty_dagger')) {
      equipped.weapon = 'rusty_dagger';
    }

    const equipmentLevels = {
      rusty_dagger: 1,
      ...(parsed.equipmentLevels || {})
    };

    return {
      ...DEFAULT_STATE,
      ...parsed,
      equipped,
      equipmentLevels,
      inventory,
      rebirthPerks: { ...DEFAULT_STATE.rebirthPerks, ...(parsed.rebirthPerks || {}) },
      ownedPets: Array.isArray(parsed.ownedPets) ? parsed.ownedPets : [],
      petLevels: { ...(parsed.petLevels || {}) },
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

    // Cross-Device Sync: save to Telegram CloudStorage under Season 1 key
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.CloudStorage) {
      if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
      cloudSaveTimer = setTimeout(() => {
        try {
          window.Telegram.WebApp.CloudStorage.setItem(CLOUD_STORAGE_KEY, jsonStr, (err) => {
            if (err) console.warn('Telegram CloudStorage save failed:', err);
          });
          // Also overwrite legacy cloud save so older builds cannot resurrect it
          window.Telegram.WebApp.CloudStorage.setItem('hunter_cloud_save', jsonStr, () => {});
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
      window.Telegram.WebApp.CloudStorage.getItem(CLOUD_STORAGE_KEY, (err, value) => {
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
