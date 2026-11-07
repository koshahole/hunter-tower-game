// Vercel Serverless Function to create Telegram Stars Invoice Link
// API: POST /api/create-invoice
// Body: { itemId: string, userId?: number|string }

const ITEMS = {
  stars_gear_chest: {
    title: 'Сундук Снаряжения Бездны',
    description: 'Гарантированное эпическое или легендарное снаряжение для охотника',
    price: 25,
  },
  stars_smith_pack: {
    title: 'Набор Ресурсов Кузнеца',
    description: '5,000 Золота и 100 Кристаллов Бездны для заточки снаряжения',
    price: 30,
  },
  stars_revive: {
    title: 'Воскрешение в Башне',
    description: 'Мгновенное воскрешение охотника со 100% здоровьем на месте гибели',
    price: 15,
  },
  stars_egg: {
    title: 'Золотое Яйцо Гачи',
    description: 'Редкий, легендарный или мифический спутник в коллекцию',
    price: 25,
  },
  stars_energy: {
    title: 'Полный бак энергии (5 ⚡)',
    description: 'Мгновенное восстановление 5 единиц энергии для штурма Башни',
    price: 10,
  },
  stars_potions: {
    title: 'Пакет зелий жизни (x5)',
    description: '5 целебных зелий в запас для битв с боссами Башни',
    price: 15,
  },
  stars_crystals: {
    title: 'Сундук Кристаллов (150 шт)',
    description: '150 Кристаллов Бездны для прокачки спутников и снаряжения',
    price: 35,
  },
  stars_vip: {
    title: 'VIP-статус Охотника',
    description: 'Вечная золотая корона в профиле, статус в Зале Славы и +25% золота навсегда',
    price: 50,
  },
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = (process.env.BOT_TOKEN || '').trim();
  if (!token || token === 'YOUR_BOT_TOKEN_HERE') {
    return res.status(500).json({
      ok: false,
      error: 'BOT_TOKEN не настроен в переменных окружения на сервере.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const itemId = body?.itemId || req.query?.itemId;
  const userId = body?.userId || req.query?.userId || 'hunter';

  const item = ITEMS[itemId];
  if (!item) {
    return res.status(400).json({
      ok: false,
      error: `Товар с id "${itemId}" не найден.`
    });
  }

  try {
    // Official Telegram Bot API createInvoiceLink method
    // For Telegram Stars:
    // currency: strictly 'XTR'
    // provider_token: strictly empty string ''
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: item.title,
        description: item.description,
        payload: `${itemId}_${userId}_${Date.now()}`,
        provider_token: '', // Mandatory empty string for Telegram Stars
        currency: 'XTR',    // Mandatory currency code for Telegram Stars
        prices: [
          {
            label: item.title,
            amount: item.price // 1 Star = 1 unit
          }
        ]
      })
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      console.error('Telegram createInvoiceLink error:', data);
      return res.status(400).json({
        ok: false,
        error: data.description || 'Не удалось создать счет в Telegram Stars. Проверьте включение Stars в @BotFather.'
      });
    }

    return res.status(200).json({
      ok: true,
      invoiceLink: data.result,
      price: item.price,
      title: item.title
    });
  } catch (err) {
    console.error('Server error creating invoice:', err);
    return res.status(500).json({
      ok: false,
      error: 'Внутренняя ошибка сервера при генерации инвойса.'
    });
  }
}
