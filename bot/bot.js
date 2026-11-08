// Telegram Bot with Telegram Stars & Mini App launcher
// Powered by grammY

import http from 'http';
import { Bot, InlineKeyboard } from 'grammy';
import dotenv from 'dotenv';
import leaderboardHandler from '../api/leaderboard.js';
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

  const name = ctx.from?.first_name || 'Охотник';

  const keyboard = new InlineKeyboard()
    .webApp('⚔️ НАЧАТЬ ВОСХОЖДЕНИЕ', WEBAPP_URL)
    .row()
    .url('👥 Сообщество Охотников', 'https://t.me/telegram')
    .row();

  await ctx.reply(
    `👋 Приветствую в Академии Охотников, **${name}**!${welcomeExtra}\n\n` +
    `Перед тобой Врата 100-этажной Башни Испытаний. Сможешь ли ты пройти сквозь орды монстров, сокрушить Боссов и апнуть легендарный S-ранг?\n\n` +
    `⚡ **Что тебя ждет:**\n` +
    `• Пошаговые бои и мощные комбо-навыки\n` +
    `• Питомцы-спутники с уникальными баффами\n` +
    `• Базовый лагерь для постоянной прокачки\n` +
    `• 100 этажей и 10 уникальных боссов\n\n` +
    `Нажми кнопку ниже, чтобы запустить игру прямо в Telegram! 👇`,
    {
      parse_mode: 'Markdown',
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
  const payload = payment.invoice_payload;

  console.log(`[STARS PURCHASE] User ${ctx.from.id} paid ${starsPaid} Stars for ${payload}`);

  await ctx.reply(
    `🎉 **Оплата успешно принята!**\n\n` +
    `⭐️ Получено: **${starsPaid} Stars**\n` +
    `📦 Товар: **${payload}**\n\n` +
    `Награда уже зачислена в ваш инвентарь в игре! Возвращайтесь в Башню.`,
    {
      parse_mode: 'Markdown',
      reply_markup: new InlineKeyboard().webApp('⚔️ Вернуться в игру', WEBAPP_URL)
    }
  );
});

// Help command
bot.command('help', async (ctx) => {
  await ctx.reply(
    `📖 **Помощь по игре "Академия Охотников"**\n\n` +
    `• **/start** — главное меню и запуск игры\n` +
    `• **Энергия:** восстанавливается каждые 3 минуты (макс 5)\n` +
    `• **Прокачка:** всё золото и кристаллы сохраняются в Оружейной\n` +
    `• **Telegram Stars:** официальная валюта для покупок питомцев и воскрешений\n`,
    { parse_mode: 'Markdown' }
  );
});

// Start bot polling if executed directly
if (process.env.BOT_TOKEN && process.env.BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
  bot.start({
    onStart: (botInfo) => {
      console.log(`🤖 Бот @${botInfo.username} успешно запущен и слушает команды!`);
    }
  });
}
