// Leaderboard Dataset and Dynamic Live Sync with Upstash Redis
export const MOCK_LEADERS_ALL_TIME = [
  { rank: 1, id: 1001, name: 'SungJinWoo', title: 'Теневой Монарх', maxFloor: 98, avatar: '👑', vip: true, souls: 142 },
  { rank: 2, id: 1002, name: 'ArisenOne', title: 'Паладин Света', maxFloor: 84, avatar: '⚔️', vip: true, souls: 95 },
  { rank: 3, id: 1003, name: 'Valkyrie', title: 'Хранитель Рун', maxFloor: 76, avatar: '🪽', vip: false, souls: 68 },
  { rank: 4, id: 1004, name: 'Nightstalker', title: 'Жнец Ночи', maxFloor: 65, avatar: '🥷', vip: true, souls: 42 },
  { rank: 5, id: 1005, name: 'FrostMage', title: 'Архимаг Льда', maxFloor: 59, avatar: '❄️', vip: false, souls: 31 },
  { rank: 6, id: 1006, name: 'IronGolem', title: 'Скала', maxFloor: 52, avatar: '🗿', vip: false, souls: 24 },
  { rank: 7, id: 1007, name: 'DragonBane', title: 'Драконоборец', maxFloor: 47, avatar: '🐲', vip: false, souls: 18 },
  { rank: 8, id: 1008, name: 'ShadowBlade', title: 'Охотник Тени', maxFloor: 41, avatar: '🗡️', vip: false, souls: 14 },
];

export const MOCK_LEADERS_WEEKLY = [
  { rank: 1, id: 1002, name: 'ArisenOne', title: 'Паладин Света', maxFloor: 84, avatar: '⚔️', vip: true, points: 2840 },
  { rank: 2, id: 1001, name: 'SungJinWoo', title: 'Теневой Монарх', maxFloor: 79, avatar: '👑', vip: true, points: 2650 },
  { rank: 3, id: 1004, name: 'Nightstalker', title: 'Жнец Ночи', maxFloor: 65, avatar: '🥷', vip: true, points: 2190 },
  { rank: 4, id: 1009, name: 'Solaris', title: 'Сын Солнца', maxFloor: 54, avatar: '☀️', vip: false, points: 1780 },
  { rank: 5, id: 1005, name: 'FrostMage', title: 'Архимаг Льда', maxFloor: 48, avatar: '❄️', vip: false, points: 1450 },
];

// Fetch or submit real player score to live leaderboard
export async function syncLeaderboard(playerData) {
  try {
    const isPost = Boolean(playerData && (playerData.id || playerData.name));
    const res = await fetch('/api/leaderboard', {
      method: isPost ? 'POST' : 'GET',
      headers: isPost ? { 'Content-Type': 'application/json' } : {},
      body: isPost ? JSON.stringify(playerData) : undefined
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.ok && Array.isArray(data.leaders)) {
        return {
          leaders: data.leaders,
          weekly: Array.isArray(data.weekly) ? data.weekly : MOCK_LEADERS_WEEKLY
        };
      }
    }
  } catch (err) {
    console.warn('Leaderboard API sync offline, using local merged list:', err);
  }

  // Fallback: merge locally if offline or local dev without server
  const list = [...MOCK_LEADERS_ALL_TIME];
  if (playerData) {
    const idx = list.findIndex(p => p.id === playerData.id || p.name === playerData.name);
    const record = {
      id: playerData.id || 777,
      name: playerData.name || 'Охотник',
      title: playerData.title || 'Искатель Башни',
      avatar: playerData.avatar || '🧙‍♂️',
      maxFloor: Math.max(1, playerData.maxFloor || 1),
      souls: Math.max(0, playerData.souls || 0),
      vip: Boolean(playerData.vip),
      points: (playerData.maxFloor || 1) * 100 + (playerData.souls || 0) * 10 + (playerData.vip ? 500 : 0)
    };

    if (idx >= 0) {
      list[idx] = { ...list[idx], ...record };
    } else {
      list.push(record);
    }
  }

  list.sort((a, b) => b.maxFloor - a.maxFloor);
  const leaders = list.map((p, i) => ({ ...p, rank: i + 1 }));

  const weeklyList = [...list]
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .slice(0, 50)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  return { leaders, weekly: weeklyList };
}
