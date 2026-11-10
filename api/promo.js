// Vercel Serverless Function to validate & redeem single-use promo codes
// API: POST /api/promo
// Body: { code: string, userId?: number|string }
import dotenv from 'dotenv';
dotenv.config();

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// In-memory fallback if Redis is unavailable
const memoryPromos = new Map();

// Built-in starter promo codes available for all players (1 activation per userId)
const BUILTIN_PROMOS = {
  'VIP-EGG': {
    code: 'VIP-EGG',
    reward: 'vip_egg',
    maxUses: 1000000,
    usedCount: 0,
    usedBy: []
  },
  'VIP': {
    code: 'VIP',
    reward: 'vip',
    maxUses: 1000000,
    usedCount: 0,
    usedBy: []
  },
  'EGG': {
    code: 'EGG',
    reward: 'egg',
    maxUses: 1000000,
    usedCount: 0,
    usedBy: []
  },
  'HUNTER2026': {
    code: 'HUNTER2026',
    reward: 'smith',
    maxUses: 1000000,
    usedCount: 0,
    usedBy: []
  }
};

export async function getPromoFromRedis(code) {
  const normCode = (code || '').trim().toUpperCase();
  if (!normCode) return null;

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/promo:${normCode}`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        }
      }
    } catch (err) {
      console.warn('Upstash GET promo error:', err.message);
    }
  }

  if (BUILTIN_PROMOS[normCode]) {
    return { ...BUILTIN_PROMOS[normCode] };
  }

  return memoryPromos.get(normCode) || null;
}

export async function savePromoToRedis(code, promoData) {
  const normCode = (code || '').trim().toUpperCase();
  if (!normCode) return false;

  memoryPromos.set(normCode, promoData);

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      // 1. Save promo payload
      await fetch(`${UPSTASH_URL}/set/promo:${normCode}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(promoData)
      });

      // 2. Add to active promos index
      const indexRes = await fetch(`${UPSTASH_URL}/get/hunter_promos_index`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      let index = [];
      if (indexRes.ok) {
        const d = await indexRes.json();
        if (d && d.result) {
          index = typeof d.result === 'string' ? JSON.parse(d.result) : d.result;
          if (!Array.isArray(index)) index = [];
        }
      }
      if (!index.includes(normCode)) {
        index.unshift(normCode);
        if (index.length > 200) index = index.slice(0, 200);
        await fetch(`${UPSTASH_URL}/set/hunter_promos_index`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${UPSTASH_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(index)
        });
      }
      return true;
    } catch (err) {
      console.warn('Upstash SET promo error:', err.message);
    }
  }

  return true;
}

export async function listAllPromosFromRedis() {
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/hunter_promos_index`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          const list = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(list)) {
            const promoDetails = [];
            for (const c of list.slice(0, 50)) {
              const p = await getPromoFromRedis(c);
              if (p) promoDetails.push(p);
            }
            return promoDetails;
          }
        }
      }
    } catch (err) {
      console.warn('Upstash list promos error:', err.message);
    }
  }

  return Array.from(memoryPromos.values());
}

// Payment Logging in Redis
const memoryPayments = [];

export async function recordPaymentInRedis(payment) {
  memoryPayments.unshift(payment);
  if (memoryPayments.length > 100) memoryPayments.pop();

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/hunter_payments_log`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      let list = [];
      if (res.ok) {
        const d = await res.json();
        if (d && d.result) {
          list = typeof d.result === 'string' ? JSON.parse(d.result) : d.result;
          if (!Array.isArray(list)) list = [];
        }
      }
      list.unshift(payment);
      if (list.length > 200) list = list.slice(0, 200);
      await fetch(`${UPSTASH_URL}/set/hunter_payments_log`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      });
    } catch (err) {
      console.warn('Upstash record payment error:', err.message);
    }
  }
}

export async function getPaymentsFromRedis() {
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/hunter_payments_log`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      if (res.ok) {
        const d = await res.json();
        if (d && d.result) {
          const list = typeof d.result === 'string' ? JSON.parse(d.result) : d.result;
          if (Array.isArray(list)) return list;
        }
      }
    } catch (err) {
      console.warn('Upstash get payments error:', err.message);
    }
  }
  return memoryPayments;
}

// Dynamic Admin Storage in Redis
const memoryAdmins = new Set();
const DEFAULT_ADMINS = ['1316058958']; // Owner ID guaranteed fallback

export async function getAdminsFromRedis() {
  const envAdmins = (process.env.ADMIN_IDS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  let redisAdmins = [];
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/hunter_admin_ids`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      if (res.ok) {
        const d = await res.json();
        if (d && d.result) {
          const parsed = typeof d.result === 'string' ? JSON.parse(d.result) : d.result;
          if (Array.isArray(parsed)) redisAdmins = parsed;
        }
      }
    } catch (err) {
      console.warn('Upstash get admins error:', err.message);
    }
  }

  const combined = new Set([...DEFAULT_ADMINS, ...envAdmins, ...redisAdmins, ...memoryAdmins]);
  return Array.from(combined);
}

export async function addAdminToRedis(userId) {
  const sId = String(userId).trim();
  if (!sId) return false;
  memoryAdmins.add(sId);

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const admins = await getAdminsFromRedis();
      if (!admins.includes(sId)) {
        admins.push(sId);
        await fetch(`${UPSTASH_URL}/set/hunter_admin_ids`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${UPSTASH_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(admins)
        });
      }
      return true;
    } catch (err) {
      console.warn('Upstash add admin error:', err.message);
    }
  }
  return true;
}

export async function isUserAdmin(userId) {
  const sId = String(userId).trim();
  const admins = await getAdminsFromRedis();
  return admins.includes(sId);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    let code = req.query?.code;
    if (!code && req.url) {
      try {
        const u = new URL(req.url, 'http://localhost');
        code = u.searchParams.get('code');
      } catch {}
    }
    if (!code) {
      return res.status(400).json({ ok: false, error: 'Код не указан' });
    }
    const promo = await getPromoFromRedis(code);
    if (!promo) {
      return res.status(404).json({ ok: false, error: 'Промокод не найден' });
    }
    return res.status(200).json({
      ok: true,
      code: promo.code,
      reward: promo.reward,
      available: (promo.usedCount || 0) < (promo.maxUses || 1)
    });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }

    const rawCode = body?.code;
    const userId = String(body?.userId || 'anonymous');

    if (!rawCode || typeof rawCode !== 'string') {
      return res.status(400).json({ ok: false, error: 'Промокод не указан' });
    }

    const normCode = rawCode.trim().toUpperCase();
    const promo = await getPromoFromRedis(normCode);

    if (!promo) {
      return res.status(404).json({ ok: false, error: 'Такого промокода не существует.' });
    }

    const maxUses = promo.maxUses || 1;
    const usedCount = promo.usedCount || 0;
    const usedBy = promo.usedBy || [];

    if (usedCount >= maxUses) {
      return res.status(400).json({ ok: false, error: 'Этот промокод уже был активирован и исчерпан.' });
    }

    if (userId !== 'anonymous' && usedBy.includes(userId)) {
      return res.status(400).json({ ok: false, error: 'Вы уже активировали этот промокод ранее!' });
    }

    // Atomically burn one usage
    promo.usedCount = usedCount + 1;
    if (userId !== 'anonymous') {
      promo.usedBy = [...usedBy, userId];
    }
    promo.lastUsedAt = Date.now();

    await savePromoToRedis(normCode, promo);

    return res.status(200).json({
      ok: true,
      reward: promo.reward,
      rewardDetails: promo.rewardDetails || null,
      message: 'Промокод успешно активирован!'
    });
  }

  res.status(405).json({ ok: false, error: 'Method not allowed' });
}
