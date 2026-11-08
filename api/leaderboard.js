// Dynamic Live Leaderboard API for Hunter Tower
// Backed by Upstash Serverless Redis REST API for 100% persistent cross-player rankings
import dotenv from 'dotenv';
dotenv.config();

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const REDIS_KEY_ALL_TIME = 'hunter_leaderboard_all';
const REDIS_KEY_WEEKLY = 'hunter_leaderboard_weekly';

export const BENCHMARK_LEADERS = [
  { rank: 1, id: 1001, name: 'SungJinWoo', title: 'Теневой Монарх', maxFloor: 98, avatar: '👑', vip: true, souls: 142, points: 10500 },
  { rank: 2, id: 1002, name: 'ArisenOne', title: 'Паладин Света', maxFloor: 84, avatar: '⚔️', vip: true, souls: 95, points: 8900 },
  { rank: 3, id: 1003, name: 'Valkyrie', title: 'Хранитель Рун', maxFloor: 76, avatar: '🪽', vip: false, souls: 68, points: 7900 },
  { rank: 4, id: 1004, name: 'Nightstalker', title: 'Жнец Ночи', maxFloor: 65, avatar: '🥷', vip: true, souls: 42, points: 6800 },
  { rank: 5, id: 1005, name: 'FrostMage', title: 'Архимаг Льда', maxFloor: 59, avatar: '❄️', vip: false, souls: 31, points: 6100 },
  { rank: 6, id: 1006, name: 'IronGolem', title: 'Скала', maxFloor: 52, avatar: '🗿', vip: false, souls: 24, points: 5350 },
  { rank: 7, id: 1007, name: 'DragonBane', title: 'Драконоборец', maxFloor: 47, avatar: '🐲', vip: false, souls: 18, points: 4800 },
  { rank: 8, id: 1008, name: 'ShadowBlade', title: 'Охотник Тени', maxFloor: 41, avatar: '🗡️', vip: false, souls: 14, points: 4200 },
];

let inMemoryStore = [...BENCHMARK_LEADERS];

async function getFromRedis(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const res = await fetch(`${UPSTASH_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.result) {
      const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Upstash GET error:', err.message);
  }
  return null;
}

async function saveToRedis(key, list) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return false;
  try {
    const res = await fetch(`${UPSTASH_URL}/set/${key}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    });
    return res.ok;
  } catch (err) {
    console.warn('Upstash SET error:', err.message);
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Fetch current live list from Upstash Redis or initialize
  let currentList = await getFromRedis(REDIS_KEY_ALL_TIME);
  if (!currentList || !Array.isArray(currentList) || currentList.length === 0) {
    currentList = [...BENCHMARK_LEADERS];
    await saveToRedis(REDIS_KEY_ALL_TIME, currentList);
  }

  // 2. Handle POST (Submit player record)
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }

    if (body && (body.id || body.name)) {
      const playerId = body.id || `hunter_${Date.now()}`;
      const playerName = (body.name || 'Охотник').toString().slice(0, 18).trim();
      const floor = Math.max(1, parseInt(body.maxFloor || 1, 10));
      const souls = Math.max(0, parseInt(body.souls || 0, 10));
      const vip = Boolean(body.vip);
      const points = floor * 100 + souls * 10 + (vip ? 500 : 0);

      const record = {
        id: playerId,
        name: playerName,
        title: (body.title || 'Искатель Башни').toString().slice(0, 24),
        avatar: (body.avatar || '🧙‍♂️').toString().slice(0, 8),
        maxFloor: floor,
        souls,
        vip,
        points,
        updatedAt: Date.now()
      };

      // Match player by ID or by exact name
      const idx = currentList.findIndex(p =>
        (String(p.id) === String(playerId)) ||
        (p.name && p.name.toLowerCase() === playerName.toLowerCase())
      );

      if (idx >= 0) {
        currentList[idx] = {
          ...currentList[idx],
          ...record,
          maxFloor: Math.max(currentList[idx].maxFloor || 1, floor),
          souls: Math.max(currentList[idx].souls || 0, souls),
          points: Math.max(currentList[idx].points || 0, points),
          vip: vip || Boolean(currentList[idx].vip)
        };
      } else {
        currentList.push(record);
      }

      // Sort by maxFloor desc, then souls desc, then points desc
      currentList.sort((a, b) => {
        if ((b.maxFloor || 0) !== (a.maxFloor || 0)) {
          return (b.maxFloor || 0) - (a.maxFloor || 0);
        }
        if ((b.souls || 0) !== (a.souls || 0)) {
          return (b.souls || 0) - (a.souls || 0);
        }
        return (b.points || 0) - (a.points || 0);
      });

      // Recalculate ranks and cap top 100
      currentList = currentList.slice(0, 100).map((item, i) => ({
        ...item,
        rank: i + 1
      }));

      inMemoryStore = currentList;
      await saveToRedis(REDIS_KEY_ALL_TIME, currentList);
    }
  }

  // Build weekly tournament list sorted by points
  const weeklyList = [...currentList]
    .map(p => ({
      ...p,
      points: p.points || ((p.maxFloor || 1) * 100 + (p.souls || 0) * 10 + (p.vip ? 500 : 0))
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 50)
    .map((item, i) => ({
      ...item,
      rank: i + 1
    }));

  return res.status(200).json({
    ok: true,
    leaders: currentList,
    weekly: weeklyList,
    updatedAt: Date.now()
  });
}
