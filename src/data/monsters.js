// Monster and Boss Definitions with Hardcore Combat Scaling
// Regular floors feature sequential encounters with 3-5 monsters and 1 designated Leader
// Boss floors (10, 20, 30... 100) are 1-on-1 epic encounters

export const BOSSES = {
  10: {
    name: 'Король Гоблинов',
    title: 'Хозяин Заброшенных Залов',
    avatar: '👑👺',
    hpMultiplier: 4.5,
    atkMultiplier: 1.8,
    specialSkill: 'Яростный Замах (двойной урон)',
    goldReward: 350,
    crystalReward: 15,
    dialog: 'Мелкий человечишка! Ты думал пройдешь мои залы?! Мой топор расколет твой череп!'
  },
  20: {
    name: 'Костяной Лорд',
    title: 'Хранитель Катакомб',
    avatar: '💀⚔️',
    hpMultiplier: 6.0,
    atkMultiplier: 2.2,
    specialSkill: 'Костяная Тюрьма (оглушение на 1 ход)',
    goldReward: 850,
    crystalReward: 35,
    dialog: 'Твоя плоть сгниет здесь, а кости пополнят мою непобедимую армию!'
  },
  30: {
    name: 'Огненный Голем',
    title: 'Страж Лавового Ядра',
    avatar: '🗿🔥',
    hpMultiplier: 7.5,
    atkMultiplier: 2.5,
    specialSkill: 'Инферно (ожог на 3 хода)',
    goldReward: 1800,
    crystalReward: 70,
    dialog: 'ЖАААР... ПЕПЕЛ... ТЫ СГОРИШЬ ДОТЛА!'
  },
  40: {
    name: 'Королева Пауков',
    title: 'Мать Теней',
    avatar: '🕷️🕸️',
    hpMultiplier: 8.5,
    atkMultiplier: 2.8,
    specialSkill: 'Смертельный Яд (крадет здоровье)',
    goldReward: 3500,
    crystalReward: 120,
    dialog: 'Еще одна беспомощная мушка попала в мою липкую паутину...'
  },
  50: {
    name: 'Бездна-Дракон',
    title: 'Пожиратель Эфира',
    avatar: '🐲🖤',
    hpMultiplier: 10.5,
    atkMultiplier: 3.2,
    specialSkill: 'Дыхание Пустоты (игнорирует блок щита)',
    goldReward: 6500,
    crystalReward: 250,
    dialog: 'Половина Башни пройдена? Наивный червь. Настоящий ад только начинается!'
  },
  60: {
    name: 'Кибер-Титан',
    title: 'Протокол Уничтожения',
    avatar: '🤖⚡',
    hpMultiplier: 12.0,
    atkMultiplier: 3.6,
    specialSkill: 'Лазерный Залп (высокий урон)',
    goldReward: 12000,
    crystalReward: 450,
    dialog: 'ЦЕЛЬ ОБНАРУЖЕНА. УРОВЕНЬ УГРОЗЫ: КРИТИЧЕСКИЙ. АКТИВАЦИЯ РЕЖИМА АННИГИЛЯЦИИ.'
  },
  70: {
    name: 'Мидас Проклятый',
    title: 'Золотой Идол',
    avatar: '👑🪙',
    hpMultiplier: 14.0,
    atkMultiplier: 4.0,
    specialSkill: 'Золотое Проклятие (снижает защиту)',
    goldReward: 22000,
    crystalReward: 850,
    dialog: 'Твое золото теперь моё... как и твоя плоть!'
  },
  80: {
    name: 'Падший Архангел',
    title: 'Судья Башни',
    avatar: '🪽⚡',
    hpMultiplier: 17.0,
    atkMultiplier: 4.5,
    specialSkill: 'Кара Небес (наносит 50% текущего HP)',
    goldReward: 40000,
    crystalReward: 1500,
    dialog: 'Твое греховное восхождение заканчивается здесь.'
  },
  90: {
    name: 'Теневой Монарх',
    title: 'Властитель Теней',
    avatar: '👤🗡️',
    hpMultiplier: 20.0,
    atkMultiplier: 5.0,
    specialSkill: 'Теневые клоны (двойная атака)',
    goldReward: 75000,
    crystalReward: 2800,
    dialog: 'Ты думал, ты единственный охотник здесь? Восстань!'
  },
  100: {
    name: 'Владыка Башни (Творец)',
    title: 'Создатель Испытаний',
    avatar: '👑👁️🌌',
    hpMultiplier: 28.0,
    atkMultiplier: 6.0,
    specialSkill: 'Судный День (абсолютный урон)',
    goldReward: 250000,
    crystalReward: 15000,
    dialog: 'Ты преодолел 99 этажей... Покажи мне всю силу смертного!'
  }
};

export const REGULAR_MONSTERS = [
  { name: 'Пещерный Слизень', avatar: '🟢', tier: 1, intro: 'Чавкает и брызжет едкой кислотой' },
  { name: 'Гоблин-Разведчик', avatar: '👺', tier: 1, intro: 'Хихикает и держит ржавый кинжал' },
  { name: 'Крыса-Мутант', avatar: '🐀', tier: 1, intro: 'Сверкает голодными красными глазами' },
  { name: 'Скелет-Мечник', avatar: '💀', tier: 2, intro: 'Гремит костями в боевой стойке' },
  { name: 'Каменный Бес', avatar: '🗿', tier: 2, intro: 'Плюется осколками гранита' },
  { name: 'Призрачная Летучая Мышь', avatar: '🦇', tier: 2, intro: 'Бесшумно пикирует из тьмы' },
  { name: 'Адская Гончая', avatar: '🐕‍🦺🔥', tier: 3, intro: 'Пасть пылает ядовитым огнем' },
  { name: 'Темный Маг', avatar: '🧙‍♂️🔮', tier: 3, intro: 'Шепчет заклинание порчи' },
  { name: 'Железный Страж', avatar: '🛡️🤖', tier: 3, intro: 'Сервоприводы гудят от ярости' },
  { name: 'Вампир-Дуэлянт', avatar: '🧛‍♂️', tier: 4, intro: 'Раскланивается перед смертельным ударом' },
  { name: 'Ледяной Призрак', avatar: '👻❄️', tier: 4, intro: 'Температура вокруг резко падает' },
  { name: 'Теневой Ассасин', avatar: '🥷🌑', tier: 4, intro: 'Появляется прямо за твоей спиной' },
  { name: 'Рыцарь Бездны', avatar: '🖤⚔️', tier: 5, intro: 'Черные доспехи поглощают свет' },
  { name: 'Драконид Хаоса', avatar: '🐲', tier: 5, intro: 'Чешуя вибрирует энергией взрыва' },
  { name: 'Астральный Палач', avatar: '👁️🪓', tier: 5, intro: 'Его топор рассекает саму реальность' },
];

// Returns the number of monsters on a given floor (3 to 5 for regular floors, 1 for Boss)
export function getMonsterCountForFloor(floor) {
  if (floor % 10 === 0) return 1; // Boss encounter
  if (floor <= 3) return 3;       // 3 monsters at the very start
  if (floor <= 10) return 3 + (floor % 2); // 3 or 4 monsters
  if (floor <= 30) return 4;
  return 4 + (floor % 2);         // 4 or 5 monsters
}

// Generate an entire pack of monsters for a floor (Hardcore stats & low drop rate)
export function generateFloorMonsters(floor) {
  const isBoss = floor % 10 === 0;

  if (isBoss) {
    const bossData = BOSSES[floor] || BOSSES[100];
    // Bosses have significant HP and dangerous attack
    const baseHp = Math.floor(450 * Math.pow(1.095, floor) * (bossData.hpMultiplier || 4.0));
    const baseAtk = Math.floor(25 * Math.pow(1.065, floor) * (bossData.atkMultiplier || 1.8));

    return [{
      id: `boss_${floor}`,
      name: bossData.name,
      title: bossData.title,
      avatar: bossData.avatar,
      isBoss: true,
      floor,
      maxHp: baseHp,
      hp: baseHp,
      atk: baseAtk,
      def: Math.floor(baseAtk * 0.25),
      specialSkill: bossData.specialSkill,
      dialog: bossData.dialog,
      goldReward: Math.floor(bossData.goldReward * (1 + (floor / 100))),
      crystalReward: bossData.crystalReward,
      dropEquipment: true, // Bosses guarantee a rare relic/gear opportunity
    }];
  }

  const count = getMonsterCountForFloor(floor);
  const tier = Math.min(5, Math.ceil(floor / 10));
  const pool = REGULAR_MONSTERS.filter(m => m.tier <= tier);

  const monsters = [];
  for (let idx = 0; idx < count; idx++) {
    const template = pool[Math.floor(Math.random() * pool.length)] || pool[0];
    const isLeader = idx === count - 1; // Final monster in the pack is the designated Leader

    // Hardcore Role Multipliers:
    // Scout (0): standard tough mob
    // Bruisers: heavy HP
    // Leader: +60% HP, +25% Atk, higher rewards, small chance for gear drop
    const roleHpMult = isLeader ? 1.6 : (idx === 0 ? 0.9 : 1.15);
    const roleAtkMult = isLeader ? 1.25 : 1.0;

    // Hardcore Scaling: Mob HP on floor 1 is ~95-170 HP (requires 8-15 hits without weapon)
    const baseHp = Math.max(85, Math.floor((90 * Math.pow(1.082, floor - 1) + floor * 12) * roleHpMult));
    const baseAtk = Math.max(12, Math.floor((12 * Math.pow(1.06, floor - 1) + Math.floor(floor * 0.8)) * roleAtkMult));
    const gold = Math.max(5, Math.floor((8 * Math.pow(1.05, floor) + 3 + Math.random() * 4) * (isLeader ? 1.6 : 1.0)));
    const crystals = isLeader && Math.random() < 0.25 ? Math.max(1, Math.floor(floor / 10)) : 0;

    // Rare drop: Only leaders have a small 7% chance to drop an equipment item
    const dropEquipment = isLeader && Math.random() < (0.07 + floor * 0.001);

    monsters.push({
      id: `monster_${floor}_${idx}`,
      name: isLeader ? `Вожак: ${template.name}` : template.name,
      title: isLeader ? 'Элитный Вожак' : 'Монстр Башни',
      avatar: template.avatar,
      isBoss: false,
      isLeader,
      floor,
      maxHp: baseHp,
      hp: baseHp,
      atk: baseAtk,
      def: Math.floor(baseAtk * 0.15),
      intro: template.intro,
      goldReward: gold,
      crystalReward: crystals,
      dropEquipment,
    });
  }

  return monsters;
}
