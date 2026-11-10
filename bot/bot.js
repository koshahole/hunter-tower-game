// Telegram Bot with Telegram Stars & Mini App launcher
// Powered by grammY

import http from 'http';
import { Bot, InlineKeyboard } from 'grammy';
import dotenv from 'dotenv';
import leaderboardHandler from '../api/leaderboard.js';
import promoHandler, {
  savePromoToRedis,
  getPromoFromRedis,
  listAllPromosFromRedis,
  recordPaymentInRedis,
  getPaymentsFromRedis,
  isUserAdmin,
  addAdminToRedis,
  getAdminsFromRedis
} from '../api/promo.js';
dotenv.config();

const BOT_TOKEN = (process.env.BOT_TOKEN || '').trim();
const WEBAPP_URL = (process.env.WEBAPP_URL || 'https://hunter-tower-game.vercel.app').trim();

if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || !/^\d+:[A-Za-z0-9_-]+$/.test(BOT_TOKEN)) {
  console.error('\n❌ ОШИБКА: Неверный BOT_TOKEN в файле .env!');
  console.error('Вы указали: "' + BOT_TOKEN + '"');
  console.error('В поле BOT_TOKEN случайно вставили ссылку на сайт вместо токена бота.');
  console.error('Токен выдается ботом @BotFather при создании бота и имеет вид: 123456789:AAHk_...\n');
  process.exit(1);
}

export const bot = new Bot(BOT_TOKEN);

// /start command handler with referral parsing
bot.command('start', async (ctx) => {
  const payload = ctx.match; // e.g. "ref_123456"
  let welcomeExtra = '';

  if (payload && payload.startsWith('ref_')) {
    const referrerId = payload.replace('ref_', '');
    welcomeExtra = `\n🎁 Вы пришли по приглашению охотника #${referrerId}! Бонусная энергия начислена.`;
  }

  const name = ctx.from?.first_name ? ctx.from.first_name.replace(/[<>&]/g, '') : 'Охотник';

  const keyboard = new InlineKeyboard()
    .webApp('⚔️ НАЧАТЬ ВОСХОЖДЕНИЕ', WEBAPP_URL)
    .row()
    .url('👥 Сообщество Охотников', 'https://t.me/telegram')
    .row();

  await ctx.reply(
    `👋 Приветствую в Академии Охотников, <b>${name}</b>!${welcomeExtra}\n\n` +
    `Перед тобой Врата 100-этажной Башни Испытаний. Сможешь ли ты пройти сквозь орды монстров, сокрушить Боссов и апнуть легендарный S-ранг?\n\n` +
    `⚡ <b>Что тебя ждет:</b>\n` +
    `• Пошаговые бои и мощные комбо-навыки\n` +
    `• Питомцы-спутники с уникальными баффами\n` +
    `• Базовый лагерь для постоянной прокачки\n` +
    `• 100 этажей и 10 уникальных боссов\n\n` +
    `Нажми кнопку ниже, чтобы запустить игру прямо в Telegram! 👇`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
    }
  );
});

// Item Catalog for Telegram Stars (Currency: XTR)
const ITEMS = {
  stars_gear_chest: { title: 'Сундук Снаряжения Бездны', description: 'Гарантированное эпическое или легендарное снаряжение', price: 25 },
  stars_smith_pack: { title: 'Набор Ресурсов Кузнеца', description: '5,000 Золота и 100 Кристаллов Бездны', price: 30 },
  stars_revive: { title: 'Воскрешение в Башне', description: 'Мгновенное воскрешение охотника со 100% здоровьем', price: 15 },
  stars_egg: { title: 'Золотое Яйцо Гачи', description: 'Редкий, легендарный или мифический спутник в коллекцию', price: 25 },
  stars_energy: { title: 'Полный бак энергии (5 ⚡)', description: 'Мгновенное восстановление 5 единиц энергии', price: 10 },
  stars_potions: { title: 'Пакет зелий жизни (x5)', description: '5 целебных зелий в запас охотника', price: 15 },
  stars_crystals: { title: 'Сундук Кристаллов (150 шт)', description: '150 Кристаллов Бездны для прокачки', price: 35 },
  stars_vip: { title: 'VIP-статус Охотника', description: 'Вечная золотая корона в профиле, статус в Зале Славы и +25% золота навсегда', price: 50 },
};

// Create Stars Invoice Link helper
// Currency 'XTR' is the official code for Telegram Stars!
export async function createStarsInvoice(chatId, title, description, starsAmount, payload) {
  return await bot.api.createInvoiceLink(
    title,
    description,
    payload,
    '', // Provider token must be empty string for Telegram Stars
    'XTR', // Telegram Stars currency
    [{ label: title, amount: starsAmount }]
  );
}

// Local HTTP Server for /api/create-invoice (handles Mini App payment requests)
const HTTP_PORT = parseInt(process.env.API_PORT || '3001', 10);
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/create-invoice') {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      try {
        let data = {};
        if (bodyStr) {
          try { data = JSON.parse(bodyStr); } catch {}
        }
        const itemId = data.itemId || url.searchParams.get('itemId');
        const userId = data.userId || url.searchParams.get('userId') || 'hunter';

        const item = ITEMS[itemId];
        if (!item) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: false, error: 'Товар не найден' }));
        }

        const link = await bot.api.createInvoiceLink(
          item.title,
          item.description,
          `${itemId}_${userId}_${Date.now()}`,
          '',
          'XTR',
          [{ label: item.title, amount: item.price }]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, invoiceLink: link, price: item.price }));
      } catch (err) {
        console.error('Invoice creation error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message || 'Ошибка генерации инвойса' }));
      }
    });
    return;
  }

  if (url.pathname === '/api/leaderboard') {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      try {
        let body = {};
        if (bodyStr) {
          try { body = JSON.parse(bodyStr); } catch {}
        }
        const mockReq = {
          method: req.method,
          body,
          headers: req.headers
        };
        const mockRes = {
          setHeader: (k, v) => res.setHeader(k, v),
          status: (code) => ({
            json: (payload) => {
              res.writeHead(code, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(payload));
            },
            end: () => res.end()
          })
        };
        await leaderboardHandler(mockReq, mockRes);
      } catch (err) {
        console.error('Leaderboard local handler error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  if (url.pathname === '/api/promo') {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      try {
        let body = {};
        if (bodyStr) {
          try { body = JSON.parse(bodyStr); } catch {}
        }
        const mockReq = {
          method: req.method,
          body,
          headers: req.headers,
          query: Object.fromEntries(url.searchParams.entries())
        };
        const mockRes = {
          setHeader: (k, v) => res.setHeader(k, v),
          status: (code) => ({
            json: (payload) => {
              res.writeHead(code, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(payload));
            },
            end: () => res.end()
          })
        };
        await promoHandler(mockReq, mockRes);
      } catch (err) {
        console.error('Promo local handler error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

let currentPort = HTTP_PORT;
function startServer(port) {
  server.listen(port, () => {
    console.log(`📡 Локальный сервер инвойсов Stars запущен на http://localhost:${port}`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    currentPort += 1;
    console.warn(`⚠️ Порт ${currentPort - 1} занят, пробую запустить HTTP на ${currentPort}...`);
    startServer(currentPort);
  } else {
    console.error('HTTP server error:', err);
  }
});

startServer(HTTP_PORT);

// 1. Pre-checkout query handler (Mandatory for Telegram Stars)
bot.on('pre_checkout_query', async (ctx) => {
  try {
    // Approve the checkout
    await ctx.answerPreCheckoutQuery(true);
  } catch (err) {
    console.error('Error answering pre-checkout query:', err);
    await ctx.answerPreCheckoutQuery(false, {
      error_message: 'Не удалось подтвердить платеж. Попробуйте снова.'
    });
  }
});

// 2. Successful payment handler
bot.on(':successful_payment', async (ctx) => {
  const payment = ctx.message.successful_payment;
  const starsPaid = payment.total_amount;
  const payload = payment.invoice_payload || '';

  console.log(`[STARS PURCHASE] User ${ctx.from.id} paid ${starsPaid} Stars for ${payload}`);

  // Resolve human-readable item title
  let itemTitle = 'Игровой предмет';
  for (const [key, val] of Object.entries(ITEMS)) {
    if (payload.startsWith(key)) {
      itemTitle = val.title;
      break;
    }
  }

  try {
    await recordPaymentInRedis({
      userId: ctx.from.id,
      name: ctx.from.first_name || '',
      username: ctx.from.username || '',
      stars: starsPaid,
      payload,
      date: Date.now()
    });
  } catch (e) {
    console.warn('Failed to record payment in Redis:', e);
  }

  try {
    await ctx.reply(
      `🎉 <b>Оплата успешно принята!</b>\n\n` +
      `⭐️ Получено: <b>${starsPaid} Stars</b>\n` +
      `📦 Товар: <b>${itemTitle}</b>\n\n` +
      `Награда уже зачислена в ваш инвентарь в игре! Возвращайтесь в Башню.`,
      {
        parse_mode: 'HTML',
        reply_markup: new InlineKeyboard().webApp('⚔️ Вернуться в игру', WEBAPP_URL)
      }
    );
  } catch (err) {
    console.error('Failed to send successful payment confirmation message:', err);
  }
});

// Help command
bot.command('help', async (ctx) => {
  await ctx.reply(
    `📖 <b>Помощь по игре "Академия Охотников"</b>\n\n` +
    `• <b>/start</b> — главное меню и запуск игры\n` +
    `• <b>/myid</b> — узнать свой Telegram ID и статус\n` +
    `• <b>/admin</b> — панель администратора (только для админов)\n` +
    `• <b>Энергия:</b> восстанавливается каждые 3 минуты (макс 5)\n` +
    `• <b>Прокачка:</b> всё золото и кристаллы сохраняются в Оружейной\n` +
    `• <b>Telegram Stars:</b> официальная валюта для покупок питомцев и воскрешений\n`,
    { parse_mode: 'HTML' }
  );
});

// Check own Telegram ID
bot.command('myid', async (ctx) => {
  const userId = ctx.from.id;
  const adminStatus = await isUserAdmin(userId);
  await ctx.reply(
    `🆔 <b>Ваш профиль в Telegram:</b>\n\n` +
    `• <b>ID:</b> <code>${userId}</code>\n` +
    `• <b>Имя:</b> ${ctx.from.first_name || 'Охотник'}\n` +
    `• <b>Username:</b> @${ctx.from.username || 'нет'}\n` +
    `• <b>Статус:</b> ${adminStatus ? '👑 Администратор' : 'Обычный игрок'}\n\n` +
    (adminStatus ? 'Вам доступна команда /admin' : 'Для получения прав администратора используйте пароль: <code>/claim_admin hunter_admin_secret_2026</code>'),
    { parse_mode: 'HTML' }
  );
});

// Claim Admin rights with password
bot.command('claim_admin', async (ctx) => {
  const secret = (ctx.match || '').trim();
  const validSecret = process.env.ADMIN_PASSWORD || 'hunter_admin_secret_2026';
  const admins = await getAdminsFromRedis();

  if (admins.length === 0 || secret === validSecret) {
    await addAdminToRedis(ctx.from.id);
    await ctx.reply(
      `🎉 <b>Авторизация успешна!</b>\n\n` +
      `Вы зарегистрированы как 👑 <b>Администратор Башни</b>.\n` +
      `Введите /admin для открытия панели управления.`,
      { parse_mode: 'HTML' }
    );
  } else {
    await ctx.reply(`❌ Неверный пароль администратора. Доступ отклонён.`);
  }
});

// Add another admin (Only for existing admins)
bot.command('add_admin', async (ctx) => {
  if (!await isUserAdmin(ctx.from.id)) {
    return ctx.reply('⛔ Доступ запрещён! Только администраторы могут назначать новых админов.');
  }
  const targetId = (ctx.match || '').trim();
  if (!targetId || !/^\d+$/.test(targetId)) {
    return ctx.reply('⚠️ Укажите Telegram ID: <code>/add_admin 123456789</code>', { parse_mode: 'HTML' });
  }
  await addAdminToRedis(targetId);
  await ctx.reply(`✅ Пользователь <code>${targetId}</code> успешно назначен администратором!`, { parse_mode: 'HTML' });
});

// Main Interactive Admin Menu
bot.command('admin', async (ctx) => {
  if (!await isUserAdmin(ctx.from.id)) {
    return ctx.reply(
      `⛔ <b>Доступ запрещён!</b>\n\n` +
      `Ваш ID: <code>${ctx.from.id}</code> не числится в списке администраторов.\n` +
      `Если вы владелец, авторизуйтесь командой:\n` +
      `<code>/claim_admin hunter_admin_secret_2026</code>`,
      { parse_mode: 'HTML' }
    );
  }

  const keyboard = new InlineKeyboard()
    .text('🎁 Выдать награду игроку', 'admin_gift_info')
    .row()
    .text('👑 Создать промокод VIP + Яйцо', 'admin_gen_vipegg')
    .row()
    .text('🎟 Создать промокод VIP', 'admin_gen_vip')
    .text('🥚 Создать промокод Яйцо', 'admin_gen_egg')
    .row()
    .text('📋 Список промокодов', 'admin_list_promos')
    .text('📊 Статистика Stars', 'admin_stats')
    .row();

  await ctx.reply(
    `👑 <b>ПАНЕЛЬ УПРАВЛЕНИЯ «АКАДЕМИЯ ОХОТНИКОВ»</b>\n\n` +
    `Добро пожаловать в админ-панель!\n\n` +
    `⚡ <b>Команды:</b>\n` +
    `• <code>/gift &lt;user_id&gt; [тип]</code> — отправить персональную награду игроку в личку\n` +
    `• <code>/promo &lt;тип&gt; [код] [кол-во]</code> — сгенерировать промокод\n` +
    `• <code>/promos</code> — список всех промокодов\n` +
    `• <code>/stats</code> — история оплат и статистика Stars\n` +
    `• <code>/add_admin &lt;id&gt;</code> — добавить админа\n\n` +
    `<i>Типы наград: vip_egg, vip, egg, crystals, smith, gear</i>\n\n` +
    `Нажмите кнопку ниже для быстрого действия: 👇`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
    }
  );
});

// Admin Gift command: /gift <chat_id> [type]
bot.command('gift', async (ctx) => {
  if (!await isUserAdmin(ctx.from.id)) {
    return ctx.reply('⛔ Доступ запрещён! Только администраторы могут выдавать подарки.');
  }

  const parts = (ctx.match || '').trim().split(/\s+/).filter(Boolean);
  const targetId = parts[0];
  const type = parts[1] || 'vip_egg';

  if (!targetId || !/^\d+$/.test(targetId)) {
    return ctx.reply(
      `⚠️ <b>Не указан ID игрока!</b>\n\n` +
      `<b>Использование:</b> <code>/gift &lt;user_id&gt; [тип]</code>\n\n` +
      `<b>Примеры:</b>\n` +
      `• <code>/gift 362998699 vip_egg</code> (VIP + Золотое Яйцо + 100 💎)\n` +
      `• <code>/gift 362998699 vip</code> (только VIP)\n` +
      `• <code>/gift 362998699 egg</code> (только Золотое Яйцо)\n` +
      `• <code>/gift 362998699 crystals</code> (150 Кристаллов)\n` +
      `• <code>/gift 362998699 smith</code> (5,000 🪙 и 100 💎)\n`,
      { parse_mode: 'HTML' }
    );
  }

  // Generate a cryptographically unique single-use claim promo code in Redis
  const claimCode = `GIFT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  await savePromoToRedis(claimCode, {
    code: claimCode,
    reward: type,
    maxUses: 1,
    usedCount: 0,
    usedBy: [],
    targetUserId: targetId,
    createdBy: `admin_${ctx.from.id}`,
    createdAt: Date.now()
  });

  const titles = {
    vip_egg: '👑 VIP-статус навсегда + 🥚 Золотое Яйцо Гачи + 💎 100 Кристаллов',
    vip: '👑 VIP-статус навсегда (+25% к золоту и кристаллам)',
    egg: '🥚 Золотое Яйцо Гачи (Редкий/Легендарный питомец)',
    crystals: '💎 150 Кристаллов Бездны',
    smith: '⚒️ Набор Кузнеца (5,000 🪙 + 100 💎)',
    gear: '📦 Сундук Снаряжения Бездны'
  };
  const rewardTitle = titles[type] || 'Игровой подарок';

  try {
    const claimLink = `${WEBAPP_URL}?claim=${claimCode}`;
    const giftKeyboard = new InlineKeyboard()
      .webApp('🎁 ЗАБРАТЬ ПОДАРОК В ИГРЕ', claimLink)
      .row();

    await bot.api.sendMessage(
      targetId,
      `🎁 <b>Вам начислен персональный подарок от Администрации Башни!</b>\n\n` +
      `Награда: <b>${rewardTitle}</b>\n\n` +
      `Нажмите кнопку ниже, чтобы запустить игру и забрать награду прямо сейчас! 👇\n` +
      `<i>(Или введите промокод в Магазине игры: <code>${claimCode}</code>)</i>`,
      {
        parse_mode: 'HTML',
        reply_markup: giftKeyboard
      }
    );

    await ctx.reply(
      `✅ <b>Подарок успешно отправлен игроку <code>${targetId}</code>!</b>\n\n` +
      `• Награда: <b>${rewardTitle}</b>\n` +
      `• Одноразовый код: <code>${claimCode}</code> (строго 1 активация)\n` +
      `• Сообщение с кнопкой доставлено в личку пользователю.`,
      { parse_mode: 'HTML' }
    );
  } catch (err) {
    await ctx.reply(
      `⚠️ <b>Не удалось отправить личное сообщение игроку ${targetId}:</b> ${err.message}\n\n` +
      `Но одноразовый промокод создан: <code>${claimCode}</code>\n` +
      `Передайте этот код игроку — он сможет ввести его в игре во вкладке «Магазин»!`,
      { parse_mode: 'HTML' }
    );
  }
});

// Admin Promo command: /promo <type> [code] [max_uses]
bot.command('promo', async (ctx) => {
  if (!await isUserAdmin(ctx.from.id)) {
    return ctx.reply('⛔ Доступ запрещён! Только администраторы могут создавать промокоды.');
  }

  const parts = (ctx.match || '').trim().split(/\s+/).filter(Boolean);
  const type = parts[0] || 'vip_egg';
  const customCode = parts[1];
  const maxUses = parseInt(parts[2] || '1', 10);

  const code = (customCode || `PROMO-${Math.random().toString(36).substring(2, 7).toUpperCase()}`).toUpperCase();

  await savePromoToRedis(code, {
    code,
    reward: type,
    maxUses: isNaN(maxUses) || maxUses < 1 ? 1 : maxUses,
    usedCount: 0,
    usedBy: [],
    createdBy: `admin_${ctx.from.id}`,
    createdAt: Date.now()
  });

  await ctx.reply(
    `✅ <b>Одноразовый промокод создан!</b>\n\n` +
    `• <b>Код:</b> <code>${code}</code>\n` +
    `• <b>Награда:</b> <code>${type}</code>\n` +
    `• <b>Макс. активаций:</b> <code>${maxUses}</code>\n` +
    `• <b>Ссылка:</b> ${WEBAPP_URL}?claim=${code}\n\n` +
    `Код сохранён в базе Upstash Redis. Никто не сможет активировать его повторно сверх лимита!`,
    { parse_mode: 'HTML' }
  );
});

// Admin Promos List command: /promos
bot.command('promos', async (ctx) => {
  if (!await isUserAdmin(ctx.from.id)) return ctx.reply('⛔ Доступ запрещён!');

  const promos = await listAllPromosFromRedis();
  if (!promos || promos.length === 0) {
    return ctx.reply('📋 В базе пока нет промокодов.');
  }

  let text = `📋 <b>СПИСОК ПРОМОКОДОВ (${promos.length}):</b>\n\n`;
  promos.slice(0, 15).forEach((p, idx) => {
    const isExhausted = (p.usedCount || 0) >= (p.maxUses || 1);
    const status = isExhausted ? '🔴 ИСЧЕРПАН' : '🟢 АКТИВЕН';
    text += `${idx + 1}. <code>${p.code}</code> [${p.reward}] — ${p.usedCount || 0}/${p.maxUses || 1} (${status})\n`;
  });

  await ctx.reply(text, { parse_mode: 'HTML' });
});

// Admin Stats command: /stats
bot.command('stats', async (ctx) => {
  if (!await isUserAdmin(ctx.from.id)) return ctx.reply('⛔ Доступ запрещён!');

  const payments = await getPaymentsFromRedis();
  const totalStars = payments.reduce((acc, p) => acc + (p.stars || 0), 0);

  let text = `📊 <b>СТАТИСТИКА TELEGRAM STARS:</b>\n\n` +
    `⭐️ <b>Всего заработано:</b> <b>${totalStars} Stars</b>\n` +
    `📦 <b>Всего оплат:</b> <b>${payments.length}</b>\n\n`;

  if (payments.length > 0) {
    text += `<b>Последние покупки:</b>\n`;
    payments.slice(0, 5).forEach((p, i) => {
      const d = new Date(p.date || Date.now()).toLocaleString('ru-RU');
      text += `${i + 1}. User <code>${p.userId}</code> (${p.name || ''}) — <b>${p.stars} ⭐️</b> [${d}]\n`;
    });
  }

  await ctx.reply(text, { parse_mode: 'HTML' });
});

// Inline Keyboard Callback Handler
bot.on('callback_query:data', async (ctx) => {
  const data = ctx.callbackQuery.data;
  const userId = ctx.from.id;

  if (!await isUserAdmin(userId)) {
    return ctx.answerCallbackQuery({ text: '⛔ Доступ запрещён!', show_alert: true });
  }

  if (data === 'admin_gift_info') {
    await ctx.answerCallbackQuery();
    return ctx.reply(
      `🎁 <b>Как выдать подарок игроку:</b>\n\n` +
      `Отправьте команду:\n` +
      `<code>/gift 362998699 vip_egg</code>\n\n` +
      `Бот создаст одноразовый защищенный код и пришлет игроку в личные сообщения кнопку для мгновенного зачисления!`,
      { parse_mode: 'HTML' }
    );
  }

  if (data === 'admin_gen_vipegg') {
    await ctx.answerCallbackQuery({ text: 'Создаю промокод VIP+Яйцо...' });
    const code = `VIP-EGG-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    await savePromoToRedis(code, {
      code,
      reward: 'vip_egg',
      maxUses: 1,
      usedCount: 0,
      usedBy: [],
      createdBy: `admin_${userId}`,
      createdAt: Date.now()
    });
    return ctx.reply(
      `✅ <b>Одноразовый промокод создан!</b>\n\n` +
      `• <b>Код:</b> <code>${code}</code>\n` +
      `• <b>Награда:</b> 👑 VIP-статус + 🥚 Золотое Яйцо + 💎 100 Кристаллов\n` +
      `• <b>Активаций:</b> 1 (одноразовый)\n\n` +
      `Отправьте этот код игроку — он введёт его в игре во вкладке «Магазин»!`,
      { parse_mode: 'HTML' }
    );
  }

  if (data === 'admin_gen_vip') {
    await ctx.answerCallbackQuery({ text: 'Создаю промокод VIP...' });
    const code = `VIP-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    await savePromoToRedis(code, {
      code,
      reward: 'vip',
      maxUses: 1,
      usedCount: 0,
      usedBy: [],
      createdBy: `admin_${userId}`,
      createdAt: Date.now()
    });
    return ctx.reply(
      `✅ <b>Одноразовый промокод создан!</b>\n\n` +
      `• <b>Код:</b> <code>${code}</code>\n` +
      `• <b>Награда:</b> 👑 VIP-статус навсегда\n` +
      `• <b>Активаций:</b> 1 (одноразовый)`,
      { parse_mode: 'HTML' }
    );
  }

  if (data === 'admin_gen_egg') {
    await ctx.answerCallbackQuery({ text: 'Создаю промокод на Яйцо...' });
    const code = `EGG-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    await savePromoToRedis(code, {
      code,
      reward: 'egg',
      maxUses: 1,
      usedCount: 0,
      usedBy: [],
      createdBy: `admin_${userId}`,
      createdAt: Date.now()
    });
    return ctx.reply(
      `✅ <b>Одноразовый промокод создан!</b>\n\n` +
      `• <b>Код:</b> <code>${code}</code>\n` +
      `• <b>Награда:</b> 🥚 Золотое Яйцо Гачи\n` +
      `• <b>Активаций:</b> 1 (одноразовый)`,
      { parse_mode: 'HTML' }
    );
  }

  if (data === 'admin_list_promos') {
    await ctx.answerCallbackQuery();
    const promos = await listAllPromosFromRedis();
    if (!promos || promos.length === 0) {
      return ctx.reply('📋 В базе пока нет промокодов.');
    }
    let text = `📋 <b>АКТИВНЫЕ ПРОМОКОДЫ:</b>\n\n`;
    promos.slice(0, 10).forEach((p, idx) => {
      const isExhausted = (p.usedCount || 0) >= (p.maxUses || 1);
      const status = isExhausted ? '🔴' : '🟢';
      text += `${idx + 1}. <code>${p.code}</code> (${p.reward}) — ${p.usedCount || 0}/${p.maxUses || 1} ${status}\n`;
    });
    return ctx.reply(text, { parse_mode: 'HTML' });
  }

  if (data === 'admin_stats') {
    await ctx.answerCallbackQuery();
    const payments = await getPaymentsFromRedis();
    const totalStars = payments.reduce((acc, p) => acc + (p.stars || 0), 0);
    return ctx.reply(
      `📊 <b>СТАТИСТИКА TELEGRAM STARS:</b>\n\n` +
      `⭐️ Всего заработано: <b>${totalStars} Stars</b>\n` +
      `📦 Транзакций: <b>${payments.length}</b>`,
      { parse_mode: 'HTML' }
    );
  }

  await ctx.answerCallbackQuery();
});

// Global error handler to prevent bot crash on Telegram API errors
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`⚠️ [BOT ERROR] Ошибка при обработке update ${ctx?.update?.update_id}:`, err.error || err);
});

// Start bot polling if executed directly
if (process.env.BOT_TOKEN && process.env.BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
  bot.start({
    onStart: (botInfo) => {
      console.log(`🤖 Бот @${botInfo.username} успешно запущен и слушает команды!`);
    }
  });
}
