// Telegram WebApp SDK Bridge & Haptics

export const tg = (typeof window !== 'undefined' && window.Telegram?.WebApp) || null;

export function initTelegram() {
  if (tg) {
    try {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      if (tg.setHeaderColor) {
        tg.setHeaderColor('#FFE600');
      }
      if (tg.setBackgroundColor) {
        tg.setBackgroundColor('#FFE600');
      }
    } catch (e) {
      console.warn('Telegram WebApp init warning:', e);
    }
  }
}

export function hapticImpact(type = 'medium') {
  if (tg?.HapticFeedback) {
    try {
      tg.HapticFeedback.impactOccurred(type);
    } catch {
      // ignore
    }
  }
}

export function hapticNotification(type = 'success') {
  if (tg?.HapticFeedback) {
    try {
      tg.HapticFeedback.notificationOccurred(type);
    } catch {
      // ignore
    }
  }
}

export function getUserInfo() {
  if (tg?.initDataUnsafe?.user) {
    return {
      id: tg.initDataUnsafe.user.id,
      name: tg.initDataUnsafe.user.first_name || 'Охотник',
      username: tg.initDataUnsafe.user.username || '',
      isTelegram: true,
    };
  }
  return {
    id: 777777,
    name: 'Охотник',
    username: 'hunter_pro',
    isTelegram: false,
  };
}

// Native Telegram Confirm / Popup helper
export function showTelegramConfirm(message, callback) {
  if (tg?.showConfirm) {
    try {
      tg.showConfirm(message, (confirmed) => {
        callback(Boolean(confirmed));
      });
      return;
    } catch {
      // fallback
    }
  }

  if (tg?.showPopup) {
    try {
      tg.showPopup({
        title: 'Оплата Telegram Stars ⭐️',
        message,
        buttons: [
          { id: 'pay', type: 'default', text: 'Оплатить ⭐️' },
          { id: 'cancel', type: 'cancel', text: 'Отмена' }
        ]
      }, (buttonId) => {
        callback(buttonId === 'pay');
      });
      return;
    } catch {
      // fallback
    }
  }

  // Browser fallback outside Telegram
  try {
    const res = window.confirm(message);
    callback(res);
  } catch {
    callback(true);
  }
}

// Open Telegram Stars Invoice
export async function openStarsInvoice(itemOrId, onPaid, onFailed) {
  const item = typeof itemOrId === 'object' ? itemOrId : { id: itemOrId, name: itemOrId, price: 15 };
  const itemId = item.id;
  const price = item.price || 15;
  const title = item.name || itemId;
  const botToken = import.meta.env.VITE_BOT_TOKEN;

  // 1. If running inside Telegram with WebApp SDK
  if (tg) {
    try {
      const userInfo = getUserInfo();
      let invoiceLink = null;

      // Strategy A: Direct call to Telegram Bot API (createInvoiceLink with CORS)
      if (botToken) {
        try {
          const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/createInvoiceLink`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: title,
              description: item.description || `Покупка ${title} в Академии Охотников`,
              payload: `${itemId}_${userInfo.id}_${Date.now()}`,
              provider_token: '', // Strictly empty string for Telegram Stars
              currency: 'XTR',    // Strictly 'XTR' for Telegram Stars
              prices: [{ label: title, amount: price }]
            })
          });
          const tgData = await telegramRes.json();
          if (tgData.ok && tgData.result) {
            invoiceLink = tgData.result;
          } else {
            console.warn('Telegram createInvoiceLink API error:', tgData);
          }
        } catch (err) {
          console.warn('Direct Telegram API call failed:', err);
        }
      }

      // Strategy B: If Strategy A didn't yield a link, try backend route /api/create-invoice
      if (!invoiceLink) {
        try {
          const res = await fetch('/api/create-invoice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId, userId: userInfo.id })
          });
          const data = await res.json();
          if (data.ok && data.invoiceLink) {
            invoiceLink = data.invoiceLink;
          }
        } catch {
          // ignore
        }
      }

      // If we got a real invoice link, open the official native Telegram Stars payment sheet!
      if (invoiceLink && tg.openInvoice) {
        tg.openInvoice(invoiceLink, (status) => {
          if (status === 'paid') {
            hapticNotification('success');
            onPaid && onPaid();
          } else {
            hapticNotification('warning');
            onFailed && onFailed(status);
          }
        });
        return;
      }
    } catch (e) {
      console.warn('Error in openStarsInvoice:', e);
    }

    // 2. Fallback only if no real invoice link could be generated (e.g. offline):
    showTelegramConfirm(
      `Товар: ${title}\nСтоимость: ${price} ⭐️\n\n(Тестовый режим: подтвердить покупку без списания?)`,
      (confirmed) => {
        if (confirmed) {
          hapticNotification('success');
          onPaid && onPaid();
        } else {
          onFailed && onFailed('cancelled');
        }
      }
    );
    return;
  }

  // 3. In local dev browser outside Telegram
  const confirmDev = window.confirm(
    `[Режим браузера / Dev]\nОплатить товар "${title}" за ${price} Telegram Stars?\n(В Telegram откроется нативное окно оплаты звездами Telegram Stars)`
  );
  if (confirmDev) {
    onPaid && onPaid();
  } else {
    onFailed && onFailed('cancelled');
  }
}

// Share invite link to Telegram
export function shareInviteLink(botUsername, userId) {
  const link = `https://t.me/${botUsername || 'my_hunter_tower_bot'}?start=ref_${userId}`;
  const text = `🔥 Попробуй пройти 100 этажей в Академии Охотников! Я уже прокачиваю ранг, залетай:`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
  
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(shareUrl);
  } else {
    window.open(shareUrl, '_blank');
  }
}
