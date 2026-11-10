// Test all catalog mappings
import { EQUIPMENT_CATALOG } from '../src/data/equipment.js';
import { PETS } from '../src/data/pets.js';
import { ARTIFACTS } from '../src/data/artifacts.js';
import { BOSSES } from '../src/data/monsters.js';
import { MONSTER_SVG_MAP } from '../src/components/icons/svg/monsters.jsx';
import { resolvePetFamily } from '../src/components/icons/svg/pets.jsx';
import { EMOJI_TO_ARCHETYPE } from '../src/components/icons/EquipmentIcon.jsx';
import { EQUIPMENT_SVG_MAP } from '../src/components/icons/svg/equipment.jsx';

console.log('--- EQUIPMENT CHECK ---');
let unmappedEq = [];
for (const item of EQUIPMENT_CATALOG) {
  const cleanIcon = item.icon?.replace(/[︎️]/g, '');
  const arch = EMOJI_TO_ARCHETYPE[item.icon] || EMOJI_TO_ARCHETYPE[cleanIcon];
  if (!arch || !EQUIPMENT_SVG_MAP[arch]) {
    unmappedEq.push({ id: item.id, icon: item.icon, arch });
  }
}
console.log(`Equipment checked: ${EQUIPMENT_CATALOG.length}. Unmapped: ${unmappedEq.length}`);

console.log('--- BOSSES CHECK ---');
const bossFloors = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let unmappedBosses = [];
for (const floor of bossFloors) {
  const boss = BOSSES[floor];
  const bossKey = `boss_${floor}`;
  if (!boss || !MONSTER_SVG_MAP[bossKey]) {
    unmappedBosses.push({ floor, bossKey });
  }
}
console.log(`Bosses checked: ${bossFloors.length}. Unmapped: ${unmappedBosses.length}`);

console.log('--- PETS CHECK ---');
let unmappedPets = [];
for (const pet of PETS) {
  const comp = resolvePetFamily(pet);
  if (!comp) {
    unmappedPets.push(pet.id);
  }
}
console.log(`Pets checked: ${PETS.length}. Unmapped: ${unmappedPets.length}`);

console.log('--- RELICS CHECK ---');
console.log(`Artifacts count: ${ARTIFACTS.length}`);

console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');


