// Monster generation & Boss definitions for 100 Floors
// Regular floors have packs of 3-5 monsters.
// Boss floors (10, 20, 30... 100) have strictly 1 epic Boss encounter.

export const BOSSES = {
  10: {
    name: 'Король Гоблинов',
    title: 'Владыка Заброшенных Залов',
    avatar: '👑👺',
    hpMultiplier: 3.5,
    atkMultiplier: 1.4,
    specialSkill: 'Яростный размах (двойной урон)',
    goldReward: 350,
    crystalReward: 20,
    dialog: 'Ты посмел войти в мои владения, жалкий охотник?!'
  },
  20: {
    name: 'Костяной Лорд',
    title: 'Хранитель Катакомб',
    avatar: '💀⚔️',
    hpMultiplier: 4.2,
    atkMultiplier: 1.6,
    specialSkill: 'Костяной щит (блокирует 50% урона)',
    goldReward: 800,
    crystalReward: 45,
    dialog: 'Твои кости станут частью моего трона!'
  },
  30: {
    name: 'Огненный Голем',
    title: 'Сердце Лавовых Пещер',
    avatar: '🔥🗿',
    hpMultiplier: 5.0,
    atkMultiplier: 1.8,
    specialSkill: 'Огненная буря (поджигает на 3 хода)',
    goldReward: 1600,
    crystalReward: 85,
    dialog: 'Сгори дотла в моем пламени!'
  },
  40: {
    name: 'Кровавая Графиня',
    title: 'Повелительница Ночи',
    avatar: '🧛‍♀️🩸',
    hpMultiplier: 6.0,
    atkMultiplier: 2.1,
    specialSkill: 'Кровавый вампиризм (лечит себя при атаке)',
    goldReward: 3200,
    crystalReward: 140,
    dialog: 'Твоя кровь пахнет силой... Поделись ею!'
  },
  50: {
    name: 'Бездна-Дракон',
    title: 'Пожиратель Миров',
    avatar: '🐉🌌',
    hpMultiplier: 7.2,
    atkMultiplier: 2.4,
    specialSkill: 'Дыхание Пустоты (игнорирует броню)',
    goldReward: 6500,
    crystalReward: 300,
    dialog: 'Ни один охотник не прошел мимо меня за тысячу лет!'
  },
  60: {
    name: 'Кибер-Титан V-9',
    title: 'Железный Страж 6-го Сектора',
    avatar: '🤖⚡',
    hpMultiplier: 8.5,
    atkMultiplier: 2.7,
    specialSkill: 'Ионный залп (оглушает на ход)',
    goldReward: 11000,
    crystalReward: 480,
    dialog: 'Цель обнаружена. Протокол уничтожения активирован.'
  },
  70: {
    name: 'Архидемон Маммон',
    title: 'Владыка Алчности',
    avatar: '😈💰',
    hpMultiplier: 10.0,
    atkMultiplier: 3.0,
    specialSkill: 'Проклятие Золота (крадет урон)',
    goldReward: 20000,
    crystalReward: 850,
    dialog: 'Твое золото теперь моё... как и твоя душа!'
  },
  80: {
    name: 'Падший Архангел',
    title: 'Судья Башни',
    avatar: '🪽⚡',
    hpMultiplier: 12.0,
    atkMultiplier: 3.4,
    specialSkill: 'Кара Небес (наносит урон 50% текущего HP)',
    goldReward: 35000,
    crystalReward: 1400,
    dialog: 'Твое восхождение заканчивается здесь.'
  },
  90: {
    name: 'Теневой Монарх',
    title: 'Властитель Теней',
    avatar: '👤🗡️',
    hpMultiplier: 15.0,
    atkMultiplier: 4.0,
    specialSkill: 'Теневые клоны (двойная атака)',
    goldReward: 65000,
    crystalReward: 2400,
    dialog: 'Ты думал, ты единственный охотник здесь? Восстань!'
  },
  100: {
    name: 'Владыка Башни (Творец)',
    title: 'Создатель Испытаний',
    avatar: '👑👁️🌌',
    hpMultiplier: 22.0,
    atkMultiplier: 4.8,
    specialSkill: 'Судный День (абсолютный урон)',
    goldReward: 200000,
    crystalReward: 12000,
    dialog: 'Ты преодолел 99 этажей... Покажи мне силу смертного!'
  }
};

export const REGULAR_MONSTERS = [
  { name: 'Пещерный Слизень', avatar: '🟢', tier: 1, intro: 'Чавкает и брызжет кислотой' },
  { name: 'Гоблин-Разведчик', avatar: '👺', tier: 1, intro: 'Хихикает и держит ржавый кинжал' },
  { name: 'Крыса-Мутант', avatar: '🐀', tier: 1, intro: 'Сверкает красными глазами' },
  { name: 'Скелет-Мечник', avatar: '💀', tier: 2, intro: 'Гремит костями в боевой стойке' },
  { name: 'Каменный Бес', avatar: '🗿', tier: 2, intro: 'Плюется осколками гранита' },
  { name: 'Призрачная Летучая Мышь', avatar: '🦇', tier: 2, intro: 'Бесшумно пикирует из тьмы' },
  { name: 'Адская Гончая', avatar: '🐕‍🦺🔥', tier: 3, intro: 'Пасть пылает ядовитым огнем' },
  { name: 'Темный Маг', avatar: '🧙‍♂️🔮', tier: 3, intro: 'Шепчет заклинание порчи' },
  { name: 'Железный Страж', avatar: '🛡️🤖', tier: 3, intro: 'Сервоприводы гудят от ярости' },
  { name: 'Вампир-Дуэлянт', avatar: '🧛‍♂️', tier: 4, intro: 'Раскланивается перед смертельным ударом' },
  { name: 'Ледяной Призрак', avatar: '👻❄️', tier: 4, intro: 'Температура падает до нуля' },
  { name: 'Теневой Ассасин', avatar: '🥷🌑', tier: 4, intro: 'Появляется прямо за твоей спиной' },
  { name: 'Рыцарь Бездны', avatar: '🖤⚔️', tier: 5, intro: 'Черные доспехи поглощают свет' },
  { name: 'Драконид Хаоса', avatar: '🐲', tier: 5, intro: 'Чешуя вибрирует энергией взрыва' },
  { name: 'Астральный Палач', avatar: '👁️🪓', tier: 5, intro: 'Его топор рассекает саму реальность' },
];

// Returns the number of monsters on a given floor (3 to 5 for regular floors, 1 for Boss)
export function getMonsterCountForFloor(floor) {
  if (floor % 10 === 0) return 1; // Boss
  if (floor <= 3) return 3;       // 3 monsters at start
  if (floor <= 10) return 3 + (floor % 2); // 3 or 4
  if (floor <= 30) return 4;
  return 4 + (floor % 2);         // 4 or 5
}

// Generate an entire pack of monsters for a floor
export function generateFloorMonsters(floor) {
  const isBoss = floor % 10 === 0;

  if (isBoss) {
    const bossData = BOSSES[floor] || BOSSES[100];
    const baseHp = Math.floor(180 * Math.pow(1.085, floor) * (bossData.hpMultiplier || 3.0));
    const baseAtk = Math.floor(20 * Math.pow(1.062, floor) * (bossData.atkMultiplier || 1.4));

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
      def: Math.floor(baseAtk * 0.2),
      specialSkill: bossData.specialSkill,
      dialog: bossData.dialog,
      goldReward: Math.floor(bossData.goldReward * (1 + (floor / 100))),
      crystalReward: bossData.crystalReward,
      dropEquipment: true, // Bosses always guarantee gear/relic roll
    }];
  }

  const count = getMonsterCountForFloor(floor);
  const tier = Math.min(5, Math.ceil(floor / 10));
  const pool = REGULAR_MONSTERS.filter(m => m.tier <= tier);

  const monsters = [];
  for (let idx = 0; idx < count; idx++) {
    const template = pool[Math.floor(Math.random() * pool.length)] || pool[0];
    const isLeader = idx === count - 1; // Final monster in the pack is the leader

    // Role multiplier:
    // Scout (0): slightly lower HP, normal atk
    // Bruisers: standard
    // Leader (last): +30% HP, +15% Atk, higher gold, chance for equipment drop
    const roleHpMult = isLeader ? 1.35 : (idx === 0 ? 0.85 : 1.0);
    const roleAtkMult = isLeader ? 1.15 : 1.0;

    const baseHp = Math.max(38, Math.floor((48 * Math.pow(1.074, floor - 1) + floor * 4) * roleHpMult));
    const baseAtk = Math.max(8, Math.floor((9 * Math.pow(1.056, floor - 1) + Math.floor(floor * 0.75)) * roleAtkMult));
    const gold = Math.max(6, Math.floor((10 * Math.pow(1.05, floor) + 4 + Math.random() * 4) * (isLeader ? 1.5 : 1.0)));
    const crystals = isLeader && Math.random() < 0.45 ? Math.max(1, Math.floor(floor / 9)) : 0;

    monsters.push({
      id: `monster_${floor}_${idx}`,
      name: isLeader ? `Вожак: ${template.name}` : template.name,
      title: isLeader ? 'Элитный Монстр' : 'Монстр Башни',
      avatar: template.avatar,
      isBoss: false,
      isLeader,
      floor,
      maxHp: baseHp,
      hp: baseHp,
      atk: baseAtk,
      def: Math.floor(baseAtk * 0.12),
      intro: template.intro,
      goldReward: gold,
      crystalReward: crystals,
      dropEquipment: isLeader && Math.random() < (0.15 + floor * 0.003), // Leader chance for equipment drop
    });
  }

  return monsters;
}

// Single monster helper for backwards compatibility
export function generateMonster(floor) {
  const pack = generateFloorMonsters(floor);
  return pack[0];
}
