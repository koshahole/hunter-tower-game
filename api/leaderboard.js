// Dynamic Live Leaderboard API for Hunter Tower
// GET: return top leaderboard
// POST: submit player record and return updated rankings

let LEADERBOARD_STORE = [
  { rank: 1, id: 1001, name: 'SungJinWoo', title: 'Теневой Монарх', maxFloor: 98, avatar: '👑', vip: true, souls: 142 },
  { rank: 2, id: 1002, name: 'ArisenOne', title: 'Паладин Света', maxFloor: 84, avatar: '⚔️', vip: true, souls: 95 },
  { rank: 3, id: 1003, name: 'Valkyrie', title: 'Хранитель Рун', maxFloor: 76, avatar: '🪽', vip: false, souls: 68 },
  { rank: 4, id: 1004, name: 'Nightstalker', title: 'Жнец Ночи', maxFloor: 65, avatar: '🥷', vip: true, souls: 42 },
  { rank: 5, id: 1005, name: 'FrostMage', title: 'Архимаг Льда', maxFloor: 59, avatar: '❄️', vip: false, souls: 31 },
  { rank: 6, id: 1006, name: 'IronGolem', title: 'Скала', maxFloor: 52, avatar: '🗿', vip: false, souls: 24 },
  { rank: 7, id: 1007, name: 'DragonBane', title: 'Драконоборец', maxFloor: 47, avatar: '🐲', vip: false, souls: 18 },
  { rank: 8, id: 1008, name: 'ShadowBlade', title: 'Охотник Тени', maxFloor: 41, avatar: '🗡️', vip: false, souls: 14 },
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }

    if (body && body.id && body.name) {
      const existingIdx = LEADERBOARD_STORE.findIndex(p => p.id === body.id || p.name === body.name);
      const playerRecord = {
        id: body.id,
        name: body.name.slice(0, 16),
        title: body.title || 'Искатель Башни',
        avatar: body.avatar || '🧙‍♂️',
        maxFloor: Math.max(1, body.maxFloor || 1),
        souls: Math.max(0, body.souls || 0),
        vip: Boolean(body.vip),
        updatedAt: Date.now()
      };

      if (existingIdx >= 0) {
        LEADERBOARD_STORE[existingIdx] = {
          ...LEADERBOARD_STORE[existingIdx],
          ...playerRecord,
          maxFloor: Math.max(LEADERBOARD_STORE[existingIdx].maxFloor, playerRecord.maxFloor),
          souls: Math.max(LEADERBOARD_STORE[existingIdx].souls || 0, playerRecord.souls)
        };
      } else {
        LEADERBOARD_STORE.push(playerRecord);
      }

      // Sort by maxFloor descending, then souls descending
      LEADERBOARD_STORE.sort((a, b) => {
        if (b.maxFloor !== a.maxFloor) return b.maxFloor - a.maxFloor;
        return (b.souls || 0) - (a.souls || 0);
      });

      // Recalculate rank numbers
      LEADERBOARD_STORE = LEADERBOARD_STORE.slice(0, 50).map((p, idx) => ({
        ...p,
        rank: idx + 1
      }));
    }
  }

  return res.status(200).json({
    ok: true,
    leaders: LEADERBOARD_STORE
  });
}
