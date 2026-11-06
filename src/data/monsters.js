// Monster generation & Boss definitions for 100 Floors
// Floor tiers:
// 1-9: E-Rank Goblins, Slimes, Giant Rats
// 10: BOSS - Король Гоблинов (Goblin King)
// 11-19: D-Rank Skeleton Warriors, Stone Imps, Shadow Bats
// 20: BOSS - Костяной Лорд (Bone Lord)
// 21-29: C-Rank Dark Mages, Hellhounds, Cave Golems
// 30: BOSS - Огненный Голем (Infernal Golem)
// 31-39: B-Rank Shadow Ninjas, Blood Vampires, Frost Wraiths
// 40: BOSS - Кровавая Графиня (Blood Countess)
// 41-49: A-Rank Abyssal Knights, Void Stalkers, Chaos Drakes
// 50: BOSS - Бездна-Дракон (Abyssal Drake)
// 51-99: S-Rank Corrupted Celestials, Void Titans, Arch-demons
// 100: FINAL BOSS - Владыка Башни (Tower Sovereign)

export const BOSSES = {
  10: {
    name: 'Король Гоблинов',
    title: 'Владыка Заброшенных Залов',
    avatar: '👑👺',
    hpMultiplier: 3.5,
    atkMultiplier: 1.4,
    specialSkill: 'Яростный размах (двойной урон)',
    goldReward: 250,
    crystalReward: 15,
    dialog: 'Ты посмел войти в мои владения, жалкий охотник?!'
  },
  20: {
    name: 'Костяной Лорд',
    title: 'Хранитель Катакомб',
    avatar: '💀⚔️',
    hpMultiplier: 4.0,
    atkMultiplier: 1.6,
    specialSkill: 'Костяной щит (блокирует 50% урона)',
    goldReward: 600,
    crystalReward: 35,
    dialog: 'Твои кости станут частью моего трона!'
  },
  30: {
    name: 'Огненный Голем',
    title: 'Сердце Лавовых Пещер',
    avatar: '🔥🗿',
    hpMultiplier: 4.8,
    atkMultiplier: 1.8,
    specialSkill: 'Огненная буря (поджигает на 3 хода)',
    goldReward: 1200,
    crystalReward: 70,
    dialog: 'Сгори дотла в моем пламени!'
  },
  40: {
    name: 'Кровавая Графиня',
    title: 'Повелительница Ночи',
    avatar: '🧛‍♀️🩸',
    hpMultiplier: 5.5,
    atkMultiplier: 2.0,
    specialSkill: 'Кровавый вампиризм (лечит себя при атаке)',
    goldReward: 2500,
    crystalReward: 120,
    dialog: 'Твоя кровь пахнет силой... Поделись ею!'
  },
  50: {
    name: 'Бездна-Дракон',
    title: 'Пожиратель Миров',
    avatar: '🐉🌌',
    hpMultiplier: 6.5,
    atkMultiplier: 2.3,
    specialSkill: 'Дыхание Пустоты (игнорирует броню)',
    goldReward: 5000,
    crystalReward: 250,
    dialog: 'Ни один охотник не прошел мимо меня за тысячу лет!'
  },
  60: {
    name: 'Кибер-Титан V-9',
    title: 'Железный Страж 6-го Сектора',
    avatar: '🤖⚡',
    hpMultiplier: 7.5,
    atkMultiplier: 2.5,
    specialSkill: 'Ионный залп (оглушает на ход)',
    goldReward: 9000,
    crystalReward: 400,
    dialog: 'Цель обнаружена. Протокол уничтожения активирован.'
  },
  70: {
    name: 'Архидемон Маммон',
    title: 'Владыка Алчности',
    avatar: '😈💰',
    hpMultiplier: 9.0,
    atkMultiplier: 2.8,
    specialSkill: 'Проклятие Золота (крадет урон)',
    goldReward: 16000,
    crystalReward: 700,
    dialog: 'Твое золото теперь моё... как и твоя душа!'
  },
  80: {
    name: 'Падший Архангел',
    title: 'Судья Башни',
    avatar: '🪽⚡',
    hpMultiplier: 11.0,
    atkMultiplier: 3.2,
    specialSkill: 'Кара Небес (наносит урон 50% текущего HP)',
    goldReward: 28000,
    crystalReward: 1200,
    dialog: 'Твое восхождение заканчивается здесь.'
  },
  90: {
    name: 'Теневой Монарх',
    title: 'Властитель Теней',
    avatar: '👤🗡️',
    hpMultiplier: 14.0,
    atkMultiplier: 3.8,
    specialSkill: 'Теневые клоны (двойная атака)',
    goldReward: 50000,
    crystalReward: 2000,
    dialog: 'Ты думал, ты единственный охотник здесь? Восстань!'
  },
  100: {
    name: 'Владыка Башни (Творец)',
    title: 'Создатель Испытаний',
    avatar: '👑👁️🌌',
    hpMultiplier: 20.0,
    atkMultiplier: 4.5,
    specialSkill: 'Судный День (абсолютный урон)',
    goldReward: 150000,
    crystalReward: 10000,
    dialog: 'Ты преодолел 99 этажей... Покажи мне силу смертного!'
  }
};

const REGULAR_MONSTERS = [
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

export function generateMonster(floor) {
  const isBoss = floor % 10 === 0;

  if (isBoss) {
    const bossData = BOSSES[floor] || BOSSES[100];
    const baseHp = Math.floor(120 * Math.pow(1.08, floor) * bossData.hpMultiplier);
    const baseAtk = Math.floor(18 * Math.pow(1.06, floor) * bossData.atkMultiplier);

    return {
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
      goldReward: bossData.goldReward,
      crystalReward: bossData.crystalReward,
    };
  }

  // Regular monster based on floor tier
  const tier = Math.min(5, Math.ceil(floor / 10));
  const pool = REGULAR_MONSTERS.filter(m => m.tier <= tier);
  const template = pool[Math.floor(Math.random() * pool.length)] || pool[0];

  const baseHp = Math.floor(45 * Math.pow(1.075, floor));
  const baseAtk = Math.floor(8 * Math.pow(1.055, floor));
  const gold = Math.floor(15 * Math.pow(1.06, floor) + Math.random() * 10);
  const crystals = Math.random() < 0.35 ? Math.max(1, Math.floor(floor / 10)) : 0;

  return {
    name: `${template.name} [Этаж ${floor}]`,
    title: 'Монстр Башни',
    avatar: template.avatar,
    isBoss: false,
    floor,
    maxHp: baseHp,
    hp: baseHp,
    atk: baseAtk,
    def: Math.floor(baseAtk * 0.15),
    intro: template.intro,
    goldReward: gold,
    crystalReward: crystals,
  };
}
