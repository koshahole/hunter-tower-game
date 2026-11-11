import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export const RARITY_THEMES = {
  common: {
    accent: '#9CA3AF',
    glow: '#F3F4F6',
    core: '#D1D5DB',
    dark: '#4B5563',
    rim: '#6B7280'
  },
  rare: {
    accent: '#00F5FF',
    glow: '#E0FFFF',
    core: '#00D0FF',
    dark: '#005577',
    rim: '#0088AA'
  },
  epic: {
    accent: '#B026FF',
    glow: '#F5D0FF',
    core: '#8B00FF',
    dark: '#3B0066',
    rim: '#5A0099'
  },
  legendary: {
    accent: '#FFE600',
    glow: '#FFFFE0',
    core: '#FFAA00',
    dark: '#CC6600',
    rim: '#DD8800'
  }
};

/**
 * =========================================================================
 * 1. WEAPONS (Оружие)
 * =========================================================================
 */

/** Длинный рыцарский меч / Экскалибур / Меч Мученика / Двуручник */
export function SwordSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Heavy drop shadow */}
      <path d="M12 40L16 44L23 37L20 34Z" fill="#000000" />
      <polygon points="18,30 38,6 42,10 22,34" fill="#000000" />
      {/* Pommel with Gem */}
      <circle cx="10" cy="40" r="4.5" fill={t.dark} {...STROKE} />
      <circle cx="10" cy="40" r="2" fill={t.accent} />
      {/* Grip with leather wrap wire */}
      <line x1="10" y1="40" x2="19" y2="31" stroke="#1F2937" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="12" y1="38" x2="14" y2="36" stroke={t.accent} strokeWidth="1.5" />
      <line x1="15" y1="35" x2="17" y2="33" stroke={t.accent} strokeWidth="1.5" />
      {/* Cruciform Crossguard with flared quillons */}
      <path d="M13 25L25 37" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
      <path d="M13 25L25 37" stroke={t.dark} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="13" cy="25" r="2.5" fill={t.glow} {...STROKE} />
      <circle cx="25" cy="37" r="2.5" fill={t.glow} {...STROKE} />
      {/* Straight Double-Edged Blade (Faceted Left/Right) */}
      <polygon points="19,31 39,5 41,7 23,35" fill={t.glow} {...STROKE} />
      <polygon points="19,31 39,5 37,9 23,35" fill={t.core} />
      {/* Fuller Groove & Specular Glint */}
      <line x1="21" y1="29" x2="35" y2="13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <polygon points="37,7 39,5 41,7 39,9" fill="#FFFFFF" />
    </svg>
  );
}

/** Изогнутый боевой клинок / Катана / Палаш / Сабля */
export function BladeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shadow */}
      <path d="M10 42C18 36 26 24 38 6L42 10C29 28 20 40 10 44Z" fill="#000000" />
      {/* Tsuka / Handle */}
      <line x1="8" y1="42" x2="16" y2="34" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
      <line x1="8" y1="42" x2="16" y2="34" stroke={t.dark} strokeWidth="3.5" strokeLinecap="round" />
      {/* Tsuba / Round Guard */}
      <ellipse cx="16" cy="34" rx="4.5" ry="3" transform="rotate(-45 16 34)" fill={t.accent} {...STROKE} />
      {/* Curved Katana Blade (High bevel) */}
      <path
        d="M17 33C24 24 31 16 41 7C41 7 42 10 39 15C32 24 23 31 19 35Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Hamon Temper Line */}
      <path
        d="M18 34C24 26 31 19 40 10C37 14 31 22 20 33"
        stroke={t.core}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Razor Edge Highlight */}
      <path
        d="M21 29C27 21 33 15 39 9"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Тесак / Мачете / Рубящий фальшион */
export function ScimitarSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Grip & Heavy Brass Guard */}
      <line x1="10" y1="40" x2="18" y2="32" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
      <path d="M12 36C14 30 20 30 22 34" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 36C14 30 20 30 22 34" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
      {/* Heavy Cleaver Blade with Weighted Belly */}
      <path
        d="M18 32L32 16L42 12C44 22 38 28 28 34L20 36Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Facet / Bevel */}
      <path
        d="M19 32L31 18L39 15C39 21 34 26 26 31Z"
        fill={t.core}
      />
      {/* Sawtooth Notches on Spine */}
      <polygon points="26,18 29,18 27,21" fill="#000000" />
      <polygon points="22,22 25,22 23,25" fill="#000000" />
      {/* Specular Glint */}
      <line x1="24" y1="30" x2="36" y2="18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Охотничий кинжал / Стилет / Боевой нож */
export function DaggerSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path d="M12 42L16 46L24 38L22 34Z" fill="#000000" />
      <path d="M19 29L38 8L42 12L25 33Z" fill="#000000" />
      {/* Handle & Ring Pommel */}
      <circle cx="10" cy="38" r="4.5" fill={t.dark} {...STROKE} />
      <line x1="10" y1="38" x2="20" y2="28" stroke="#1F2937" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="10" y1="38" x2="20" y2="28" stroke={t.core} strokeWidth="2.5" strokeLinecap="round" />
      {/* Winged Crossguard */}
      <line x1="14" y1="22" x2="26" y2="34" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="14" y1="22" x2="26" y2="34" stroke={t.accent} strokeWidth="3.5" strokeLinecap="round" />
      {/* Serrated Leaf Blade */}
      <polygon points="20,28 39,7 41,9 31,23 33,25 24,32" fill={t.glow} {...STROKE} />
      <polygon points="20,28 39,7 35,21 24,32" fill={t.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Blood Groove & Specular Slash */}
      <line x1="24" y1="26" x2="35" y2="15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Изящная шпага / Серебряная рапира */
export function RapierSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Pommel */}
      <circle cx="9" cy="41" r="3.5" fill={t.dark} {...STROKE} />
      {/* Handle */}
      <line x1="9" y1="41" x2="16" y2="34" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" />
      {/* Swept Basket Guard (Cup) */}
      <path d="M12 38C10 32 18 26 22 30C26 34 20 42 14 38" fill={t.accent} {...STROKE} />
      <circle cx="18" cy="33" r="2" fill={t.glow} />
      {/* Needle-Thin Blade */}
      <line x1="18" y1="32" x2="42" y2="8" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="18" y1="32" x2="42" y2="8" stroke={t.glow} strokeWidth="2.5" strokeLinecap="round" />
      {/* Piercing Diamond Point */}
      <polygon points="41,7 44,6 43,9 40,10" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

/** Боевой топор / Секира берсерка */
export function AxeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shaft with leather wrap */}
      <line x1="12" y1="42" x2="35" y2="10" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="12" y1="42" x2="35" y2="10" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <line x1="15" y1="38" x2="18" y2="34" stroke={t.accent} strokeWidth="1.5" />
      <line x1="20" y1="31" x2="23" y2="27" stroke={t.accent} strokeWidth="1.5" />
      {/* Crescent Battle Blade */}
      <path d="M26 12C26 5 36 3 43 6C46 15 40 26 29 23Z" fill="#000000" />
      <path d="M25 10C25 4 35 2 42 5C44 14 39 24 28 21Z" fill={t.glow} {...STROKE} />
      {/* Faceted Bevel Edge */}
      <path d="M25 10C28 7 35 6 39 8C40 14 37 21 28 21Z" fill={t.core} stroke="#000000" strokeWidth="1.5" />
      {/* Reinforced Eye Collar & Back Armor Spike */}
      <rect x="25" y="11" width="7" height="9" rx="1.5" fill={t.dark} {...STROKE} />
      <polygon points="25,13 18,16 25,19" fill={t.accent} {...STROKE} />
      {/* Edge White Glint */}
      <path d="M37 7C39 11 38 17 33 21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Боевой молот / Молот Богов */
export function HammerSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shaft */}
      <line x1="11" y1="42" x2="32" y2="14" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="11" y1="42" x2="32" y2="14" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
      {/* Heavy Anvil Hammer Head */}
      <rect x="22" y="5" width="22" height="16" rx="3" transform="rotate(35 22 5)" fill="#000000" />
      <rect x="20" y="3" width="22" height="16" rx="3" transform="rotate(35 20 3)" fill={t.core} {...STROKE} />
      {/* Striking Face Plate */}
      <rect x="33" y="1" width="7" height="16" rx="1.5" transform="rotate(35 33 1)" fill={t.glow} {...STROKE} />
      {/* Back Breaker Spike */}
      <polygon points="21,18 14,24 23,26" fill={t.dark} {...STROKE} />
      {/* Power Rune Emblem */}
      <polygon points="26,15 29,13 32,17 29,19" fill={t.accent} stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

/** Шипастая булава / Моргенштерн / Дубина */
export function MaceSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shaft */}
      <line x1="10" y1="42" x2="28" y2="20" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="10" y1="42" x2="28" y2="20" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Spiked Ball Head */}
      <circle cx="34" cy="14" r="9" fill={t.core} {...STROKE} />
      {/* Perimeter Spikes */}
      <polygon points="34,2 32,7 36,7" fill={t.glow} {...STROKE} />
      <polygon points="46,14 41,12 41,16" fill={t.glow} {...STROKE} />
      <polygon points="34,26 36,21 32,21" fill={t.glow} {...STROKE} />
      <polygon points="22,14 27,16 27,12" fill={t.glow} {...STROKE} />
      <polygon points="42,6 38,9 40,11" fill={t.accent} {...STROKE} />
      <polygon points="26,22 28,19 30,21" fill={t.accent} {...STROKE} />
      {/* Center Stud */}
      <circle cx="34" cy="14" r="3.5" fill={t.accent} stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

/** Коса Смерти / Серп Жнеца */
export function ScytheSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Long Curved Snath Staff */}
      <path d="M10 42C16 32 24 20 28 8" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <path d="M10 42C16 32 24 20 28 8" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
      {/* Massive Reaper Crescent Blade */}
      <path
        d="M26 8C34 5 42 10 45 18C37 17 31 16 26 12C20 18 16 25 14 30C16 24 21 16 26 8Z"
        fill="#000000"
      />
      <path
        d="M27 6C36 4 43 9 46 17C38 16 32 15 27 11C21 17 17 24 15 29C17 23 22 15 27 6Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Arcane Glowing Scythe Inset */}
      <path
        d="M28 8C34 7 40 10 43 15C37 14 32 13 28 10Z"
        fill={t.accent}
        stroke="#000000"
        strokeWidth="1.5"
      />
      {/* Skull / Rune Socket Mount */}
      <circle cx="27" cy="8" r="3.5" fill={t.dark} {...STROKE} />
      <circle cx="27" cy="8" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** Копьё / Пика / Трезубец */
export function SpearSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Long Shaft */}
      <line x1="8" y1="42" x2="32" y2="16" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="8" y1="42" x2="32" y2="16" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Winged Spear Crosslugs */}
      <line x1="28" y1="20" x2="36" y2="22" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="28" y1="20" x2="36" y2="22" stroke={t.dark} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="18" x2="28" y2="26" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="26" y1="18" x2="28" y2="26" stroke={t.dark} strokeWidth="2.5" strokeLinecap="round" />
      {/* Broadhead Spear Tip */}
      <polygon points="32,16 44,4 38,18 36,20" fill={t.glow} {...STROKE} />
      <polygon points="32,16 44,4 40,12 36,20" fill={t.core} stroke="#000000" strokeWidth="1.5" />
      {/* Center Spine Ridge */}
      <line x1="33" y1="18" x2="43" y2="5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Трезубец глубин */
export function TridentSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <line x1="10" y1="42" x2="30" y2="18" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="10" y1="42" x2="30" y2="18" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
      {/* Trident Crossbase */}
      <path d="M22 22C25 15 35 15 38 22" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 22C25 15 35 15 38 22" stroke={t.dark} strokeWidth="3" strokeLinecap="round" />
      {/* Center Spear Tip */}
      <polygon points="30,17 37,3 41,15 36,17" fill={t.glow} {...STROKE} />
      {/* Left & Right Barbed Prongs */}
      <polygon points="22,22 23,8 26,14" fill={t.core} {...STROKE} />
      <polygon points="38,22 41,12 37,17" fill={t.core} {...STROKE} />
      <circle cx="30" cy="18" r="2" fill={t.accent} />
    </svg>
  );
}

/** Магический жезл / Посох */
export function WandSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Twisted Magic Staff */}
      <line x1="10" y1="42" x2="32" y2="14" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="10" y1="42" x2="32" y2="14" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Golden Wand Fitting Collar */}
      <circle cx="32" cy="14" r="5" fill={t.dark} {...STROKE} />
      {/* Floating Focus Core Gem */}
      <polygon points="36,2 44,10 36,18 28,10" fill={t.glow} {...STROKE} />
      <polygon points="36,4 42,10 36,16 30,10" fill={t.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Astral Magic Sparks */}
      <circle cx="43" cy="4" r="2" fill={t.glow} />
      <circle cx="28" cy="4" r="1.5" fill={t.accent} />
    </svg>
  );
}

/** Боевой лук со стрелой */
export function BowSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Recurve Stave */}
      <path
        d="M10 38C12 28 20 18 38 10C30 18 26 28 38 38"
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 38C12 28 20 18 38 10C30 18 26 28 38 38"
        stroke={t.core}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bowstring */}
      <line x1="10" y1="38" x2="38" y2="38" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />
      {/* Arrow Shaft & Tip */}
      <line x1="16" y1="40" x2="36" y2="20" stroke="#000000" strokeWidth="3" />
      <polygon points="36,20 42,14 40,24" fill={t.accent} {...STROKE} />
      {/* Fletching Feathers */}
      <polygon points="16,40 14,44 18,42" fill="#E5E7EB" stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

/** Кирка шахтера / Лопата */
export function PickaxeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Wooden Shaft */}
      <line x1="12" y1="42" x2="34" y2="12" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="12" y1="42" x2="34" y2="12" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Dual Curved Pick Head */}
      <path d="M22 6C30 10 38 20 42 30C36 24 30 18 22 16L18 24C20 16 22 10 22 6Z" fill="#000000" />
      <path d="M22 6C30 10 38 20 42 30C36 24 30 18 22 16L18 24C20 16 22 10 22 6Z" fill={t.core} {...STROKE} />
      {/* Pick Points with High Reflectance */}
      <polygon points="42,30 38,26 40,24" fill={t.glow} />
      <polygon points="18,24 19,20 22,21" fill={t.glow} />
    </svg>
  );
}

/** Скрещенные мечи (универсальный дефолт оружия) */
export function CrossedSwordsSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <line x1="8" y1="42" x2="42" y2="8" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
      <line x1="42" y1="42" x2="8" y2="8" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
      <line x1="8" y1="40" x2="40" y2="8" stroke={t.glow} strokeWidth="4" strokeLinecap="round" />
      <line x1="8" y1="40" x2="40" y2="8" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="32" x2="18" y2="40" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="10" y1="32" x2="18" y2="40" stroke={t.core} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="40" x2="8" y2="8" stroke={t.glow} strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="40" x2="8" y2="8" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="32" x2="30" y2="40" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="38" y1="32" x2="30" y2="40" stroke={t.core} strokeWidth="3" strokeLinecap="round" />
      <polygon points="24,20 28,24 24,28 20,24" fill={t.glow} {...STROKE} />
    </svg>
  );
}

export function SawSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <ScimitarSvg rarity={rarity} className={className} {...props} />;
}

/**
 * =========================================================================
 * 2. ARMOR (Броня)
 * =========================================================================
 */

/** Полный рыцарский доспех / Броня / Эгида */
export function FullArmorSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Heavy Steel Pauldrons (Left & Right) */}
      <path d="M6 14C6 8 16 6 18 12L16 22C10 22 6 18 6 14Z" fill={t.core} {...STROKE} />
      <path d="M42 14C42 8 32 6 30 12L32 22C38 22 42 18 42 14Z" fill={t.core} {...STROKE} />
      {/* Main Breastplate Body */}
      <path
        d="M16 10H32L34 26C34 36 24 42 24 42C24 42 14 36 14 26L16 10Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Anatomical Pectoral Crest & Bevel */}
      <path d="M16 10L24 22L32 10" stroke="#000000" strokeWidth="2.5" />
      <path d="M24 22V38" stroke="#000000" strokeWidth="2.5" />
      <polygon points="24,14 28,20 24,26 20,20" fill={t.accent} {...STROKE} />
      {/* Gold Rivets */}
      <circle cx="18" cy="14" r="1.5" fill="#FFE600" />
      <circle cx="30" cy="14" r="1.5" fill="#FFE600" />
      {/* Fauld / Tassets Plating at Waist */}
      <rect x="18" y="34" width="12" height="4" fill={t.dark} {...STROKE} />
    </svg>
  );
}

/** Стальная кираса */
export function CuirassSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shadow */}
      <path d="M12 8H36L38 28C38 38 24 44 24 44C24 44 10 38 10 28L12 8Z" fill="#000000" />
      {/* Cuirass Shell */}
      <path
        d="M14 6H34L36 26C36 36 24 42 24 42C24 42 12 36 12 26L14 6Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Center Ridge / Tapul */}
      <line x1="24" y1="8" x2="24" y2="38" stroke="#000000" strokeWidth="3" />
      {/* Flank Shading */}
      <path d="M14 6L24 16L34 6" stroke={t.dark} strokeWidth="3" fill="none" />
      <path d="M14 20C18 24 22 25 24 25C26 25 30 24 34 20" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
      {/* Rivet Studs */}
      <circle cx="16" cy="10" r="1.5" fill={t.accent} />
      <circle cx="32" cy="10" r="1.5" fill={t.accent} />
      <circle cx="15" cy="24" r="1.5" fill={t.accent} />
      <circle cx="33" cy="24" r="1.5" fill={t.accent} />
    </svg>
  );
}

/** Плетеная кольчуга */
export function ChainmailSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hauberk Silhouette */}
      <path d="M10 12L24 6L38 12L42 22L36 24L36 42H12L12 24L6 22L10 12Z" fill="#1F2937" {...STROKE} />
      {/* Inner Chain Mesh Fill */}
      <path d="M12 14L24 9L36 14L38 21L34 22L34 40H14L14 22L10 21L12 14Z" fill={t.core} />
      {/* Woven Ring Rings Texture */}
      <line x1="16" y1="18" x2="32" y2="18" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="16" y1="30" x2="32" y2="30" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="16" y1="36" x2="32" y2="36" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
      {/* Collar Trim */}
      <polygon points="20,8 28,8 24,16" fill={t.accent} stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

/** Чешуйчатый панцирь дракона / карапакс */
export function CarapaceSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Armored Backplate */}
      <path d="M14 8H34L38 24C38 34 24 42 24 42C24 42 10 34 10 24L14 8Z" fill="#111827" {...STROKE} />
      {/* Segmented Dragon Scales */}
      <polygon points="24,10 30,16 24,22 18,16" fill={t.glow} {...STROKE} />
      <polygon points="16,18 22,24 16,30 10,24" fill={t.core} {...STROKE} />
      <polygon points="32,18 38,24 32,30 26,24" fill={t.core} {...STROKE} />
      <polygon points="24,22 30,28 24,34 18,28" fill={t.accent} {...STROKE} />
      <polygon points="24,32 28,37 24,41 20,37" fill={t.glow} {...STROKE} />
    </svg>
  );
}

/** Мистическая мантия мага / Роба */
export function MageRobeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Flared Wizard Robe */}
      <polygon points="12,12 24,6 36,12 42 42 6 42" fill="#1E1B4B" {...STROKE} />
      {/* Arcane Mystic Trim Panels */}
      <polygon points="12,12 24,6 24,42 16,42" fill={t.core} />
      <polygon points="36,12 24,6 24,42 32,42" fill={t.dark} />
      {/* Glowing Rune Trim Collar */}
      <path d="M18 10L24 22L30 10" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
      {/* Central Gem Brooch */}
      <polygon points="24,18 27,22 24,26 21,22" fill={t.glow} stroke="#000000" strokeWidth="2" />
      {/* Hem Trim Embroidery */}
      <line x1="8" y1="38" x2="40" y2="38" stroke={t.accent} strokeWidth="3" />
    </svg>
  );
}

/** Плащ путника / Накидка */
export function CloakSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Flowing Cloak Drapes */}
      <path
        d="M16 8C20 6 28 6 32 8L40 40C34 42 30 38 24 40C18 38 14 42 8 40L16 8Z"
        fill={t.dark}
        {...STROKE}
      />
      {/* Fold Layers */}
      <path d="M16 8L20 40" stroke="#000000" strokeWidth="2.5" />
      <path d="M32 8L28 40" stroke="#000000" strokeWidth="2.5" />
      <path d="M18 10C22 14 26 14 30 10" fill={t.core} stroke="#000000" strokeWidth="2" />
      {/* Golden Clasp Brooch */}
      <circle cx="24" cy="11" r="3.5" fill={t.accent} {...STROKE} />
      <circle cx="24" cy="11" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** Кожаный жилет / Дублет */
export function VestSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M12 10L20 6L28 6L36 10L34 40H14L12 10Z" fill={t.dark} {...STROKE} />
      <polygon points="20,6 28,6 24,18" fill="#111827" stroke="#000000" strokeWidth="2" />
      <rect x="15" y="24" width="7" height="9" rx="1.5" fill={t.core} {...STROKE} />
      <rect x="26" y="24" width="7" height="9" rx="1.5" fill={t.core} {...STROKE} />
      <line x1="24" y1="18" x2="24" y2="40" stroke="#000000" strokeWidth="2.5" />
      <line x1="21" y1="20" x2="27" y2="20" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Тканевая туника / Рубаха */
export function TunicSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <polygon points="13,8 24,5 35,8 37,38 11,38" fill={t.dark} {...STROKE} />
      <polygon points="19,7 29,7 24,18" fill="#111827" stroke="#000000" strokeWidth="2" />
      <path d="M14 22L24 28L34 22" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M14 28L24 34L34 28" stroke={t.glow} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Латный щит (дефолт брони) */
export function ShieldPlateSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M8 8H40V24C40 35 24 42 24 42C24 42 8 35 8 24V8Z" fill="#000000" />
      <path d="M10 10H38V24C38 34 24 40 24 40C24 40 10 34 10 24V10Z" fill={t.core} {...STROKE} />
      <path d="M10 10H24V40C24 40 10 34 10 24V10Z" fill={t.glow} />
      <polygon points="24,16 30,24 24,32 18,24" fill={t.accent} {...STROKE} />
      <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function GiSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <TunicSvg rarity={rarity} className={className} {...props} />;
}
export function CoatLabSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <MageRobeSvg rarity={rarity} className={className} {...props} />;
}
export function CoatSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <CloakSvg rarity={rarity} className={className} {...props} />;
}

/**
 * =========================================================================
 * 3. HELMETS (Шлемы и головные уборы)
 * =========================================================================
 */

/** Рыцарский шлем / Салад / Латный шлем */
export function KnightHelmSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Crest Plume Feather */}
      <path d="M24 2C27 2 32 6 34 10H24Z" fill={t.accent} {...STROKE} />
      {/* Helm Dome Dome Base */}
      <path
        d="M12 20C12 11 17 8 24 8C31 8 36 11 36 20V32C36 38 30 42 24 42C18 42 12 38 12 32V20Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Lower Cheek & Chin Plates */}
      <path d="M12 28L24 38L36 28V34C36 39 30 42 24 42C18 42 12 39 12 34V28Z" fill={t.dark} {...STROKE} />
      {/* Eye Visor Slit */}
      <rect x="14" y="20" width="20" height="5" rx="1.5" fill="#000000" />
      <line x1="16" y1="22.5" x2="22" y2="22.5" stroke={t.accent} strokeWidth="1.5" />
      <line x1="26" y1="22.5" x2="32" y2="22.5" stroke={t.accent} strokeWidth="1.5" />
      {/* Breathing Holes Grid */}
      <circle cx="20" cy="30" r="1.2" fill="#000000" />
      <circle cx="24" cy="30" r="1.2" fill="#000000" />
      <circle cx="28" cy="30" r="1.2" fill="#000000" />
      <circle cx="22" cy="33" r="1.2" fill="#000000" />
      <circle cx="26" cy="33" r="1.2" fill="#000000" />
    </svg>
  );
}

/** Царственная корона / Венец */
export function CrownSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Velvet Cap Inner Dome */}
      <path d="M12 34C12 24 16 18 24 18C32 18 36 24 36 34Z" fill="#991B1B" />
      {/* Crown Golden Peaks */}
      <polygon points="6,34 10,14 18,24 24,10 30,24 38,14 42,34" fill={t.glow} {...STROKE} />
      {/* Front Coronet Band */}
      <rect x="6" y="32" width="36" height="8" rx="2" fill={t.core} {...STROKE} />
      {/* Embedded Precious Rubies / Gems */}
      <circle cx="10" cy="14" r="2.5" fill="#EF4444" stroke="#000000" strokeWidth="1.5" />
      <polygon points="24,6 27,10 24,14 21,10" fill={t.accent} stroke="#000000" strokeWidth="1.5" />
      <circle cx="38" cy="14" r="2.5" fill="#EF4444" stroke="#000000" strokeWidth="1.5" />
      <circle cx="14" cy="36" r="2" fill={t.accent} />
      <circle cx="24" cy="36" r="2.5" fill="#EF4444" />
      <circle cx="34" cy="36" r="2" fill={t.accent} />
    </svg>
  );
}

/** Сияющая диадема / Венец / Тиара */
export function DiademSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Curved Circlet Band */}
      <path
        d="M6 30C12 24 36 24 42 30L40 34C34 29 14 29 8 34Z"
        fill={t.core}
        {...STROKE}
      />
      {/* Central Star Diadem Peak */}
      <polygon points="24,10 28,22 24,28 20,22" fill={t.glow} {...STROKE} />
      <polygon points="16,18 20,24 16,28 12,24" fill={t.core} {...STROKE} />
      <polygon points="32,18 36,24 32,28 28,24" fill={t.core} {...STROKE} />
      {/* Central Brilliant Gem */}
      <polygon points="24,14 26,18 24,22 22,18" fill={t.accent} stroke="#000000" strokeWidth="1.5" />
      <circle cx="24" cy="18" r="1.2" fill="#FFFFFF" />
      {/* Floating Sparkle Glints */}
      <polygon points="24,4 25,7 28,8 25,9 24,12 23,9 20,8 23,7" fill="#FFFFFF" />
    </svg>
  );
}

/** Капюшон ассасина / Тени */
export function HoodSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hood Outer Fabric Shell */}
      <path
        d="M24 6C14 6 10 16 10 28C10 36 14 42 24 42C34 42 38 36 38 28C38 16 34 6 24 6Z"
        fill={t.dark}
        {...STROKE}
      />
      {/* Deep Shadow Inner Cavity */}
      <path
        d="M24 14C18 14 16 20 16 28C16 35 19 38 24 38C29 38 32 35 32 28C32 20 30 14 24 14Z"
        fill="#000000"
      />
      {/* Pointed Hood Peak Fold */}
      <path d="M24 6L26 12L24 14" stroke="#000000" strokeWidth="2.5" />
      {/* Mystic Glowing Eyes in Deep Shadow */}
      <polygon points="19,25 22,27 19,29" fill={t.accent} />
      <polygon points="29,25 26,27 29,29" fill={t.accent} />
      {/* Edge Seam Highlights */}
      <path d="M14 20C12 26 13 34 16 38" stroke={t.glow} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Колпак волшебника */
export function WizardHatSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Arched Pointed Cone */}
      <path d="M24 4C28 10 32 20 34 32H14C16 20 20 10 24 4Z" fill={t.core} {...STROKE} />
      {/* Broad Curved Hat Brim */}
      <ellipse cx="24" cy="34" rx="18" ry="6" fill={t.dark} {...STROKE} />
      {/* Gold Hatband & Buckle */}
      <rect x="14" y="28" width="20" height="4" fill="#000000" />
      <rect x="21" y="26" width="6" height="8" rx="1.5" fill={t.accent} {...STROKE} />
      {/* Star Emblem on Cone */}
      <polygon points="24,14 25,18 29,18 26,20 27,24 24,22 21,24 22,20 19,18 23,18" fill="#FFE600" />
    </svg>
  );
}

/** Маска они / Маска тени */
export function MaskSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Mask Shell */}
      <path
        d="M12 12C12 8 36 8 36 12C36 28 32 38 24 42C16 38 12 28 12 12Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Menacing Horns */}
      <polygon points="12,12 8,4 16,8" fill={t.dark} {...STROKE} />
      <polygon points="36,12 40,4 32,8" fill={t.dark} {...STROKE} />
      {/* Slanted Eye Sockets */}
      <polygon points="16,20 22,24 18,25" fill="#000000" />
      <polygon points="32,20 26,24 30,25" fill="#000000" />
      {/* Red Cheek Warpaint Stripes */}
      <line x1="14" y1="28" x2="20" y2="30" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="34" y1="28" x2="28" y2="30" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      {/* Grinning Mouth with Fangs */}
      <path d="M18 34H30" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="21,34 22,37 23,34" fill="#FFFFFF" />
      <polygon points="25,34 26,37 27,34" fill="#FFFFFF" />
    </svg>
  );
}

/** Повязка следопыта / ниндзя */
export function HeadbandSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Cloth Band */}
      <path d="M6 18C16 16 32 16 42 18V26C32 24 16 24 6 26V18Z" fill="#1F2937" {...STROKE} />
      {/* Tied Ribbon Tails */}
      <path d="M40 22L46 34L42 36L38 24" fill="#111827" {...STROKE} />
      {/* Stamped Metal Forehead Protector Plate */}
      <rect x="15" y="17" width="18" height="10" rx="2" fill={t.glow} {...STROKE} />
      {/* Four Plate Rivets */}
      <circle cx="17" cy="19" r="1" fill="#000000" />
      <circle cx="31" cy="19" r="1" fill="#000000" />
      <circle cx="17" cy="25" r="1" fill="#000000" />
      <circle cx="31" cy="25" r="1" fill="#000000" />
      {/* Engraved Shinobi Clan Symbol */}
      <polygon points="24,19 27,22 24,25 21,22" fill={t.accent} />
    </svg>
  );
}

/** Каска шахтера / Голема */
export function MinerCapSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hardhat Dome */}
      <path d="M12 26C12 14 36 14 36 26V32H12V26Z" fill={t.core} {...STROKE} />
      {/* Sturdy Brim */}
      <rect x="8" y="30" width="32" height="6" rx="2" fill={t.dark} {...STROKE} />
      {/* Forehead Brass Lantern Mount */}
      <rect x="20" y="18" width="8" height="8" rx="2" fill="#FFE600" {...STROKE} />
      <circle cx="24" cy="22" r="2.5" fill="#FFFFFF" />
      {/* Side Reinforcing Ribs */}
      <line x1="16" y1="20" x2="16" y2="30" stroke="#000000" strokeWidth="2" />
      <line x1="32" y1="20" x2="32" y2="30" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

/** Меховая шапка */
export function FurCapSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Leather Crown Cap */}
      <path d="M14 24C14 14 34 14 34 24V28H14V24Z" fill="#78350F" {...STROKE} />
      {/* Fluffy Fur Brim */}
      <rect x="10" y="24" width="28" height="10" rx="5" fill={t.glow} {...STROKE} />
      {/* Ear Flaps */}
      <polygon points="12,30 10,40 16,36" fill={t.core} {...STROKE} />
      <polygon points="36,30 38,40 32,36" fill={t.core} {...STROKE} />
      {/* Front Star Badge */}
      <polygon points="24,26 25,29 28,29 26,31 27,34 24,32 21,34 22,31 20,29 23,29" fill={t.accent} />
    </svg>
  );
}

export function HelmSoldierSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <KnightHelmSvg rarity={rarity} className={className} {...props} />;
}
export function TophatSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <WizardHatSvg rarity={rarity} className={className} {...props} />;
}
export function CapSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <HeadbandSvg rarity={rarity} className={className} {...props} />;
}
export function HatWideSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <FurCapSvg rarity={rarity} className={className} {...props} />;
}
export function GogglesSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <MinerCapSvg rarity={rarity} className={className} {...props} />;
}

/**
 * =========================================================================
 * 4. ACCESSORIES (Аксессуары)
 * =========================================================================
 */

/** Перстень с самоцветом / Кольцо */
export function RingSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shadow */}
      <ellipse cx="24" cy="30" rx="14" ry="14" fill="#000000" />
      {/* Heavy Gold Band Ring */}
      <circle cx="24" cy="28" r="13" stroke="#000000" strokeWidth="6" fill="none" />
      <circle cx="24" cy="28" r="13" stroke={t.core} strokeWidth="4" fill="none" />
      {/* Inner Hole */}
      <circle cx="24" cy="28" r="9" fill="#111827" stroke="#000000" strokeWidth="2" />
      {/* Massive Bezel Setting */}
      <polygon points="18,12 30,12 34,18 14,18" fill="#1F2937" {...STROKE} />
      {/* Faceted Brilliant Solitaire Gem */}
      <polygon points="20,6 28,6 33,14 15,14" fill={t.glow} {...STROKE} />
      <polygon points="24,6 28,14 20,14" fill={t.accent} />
      {/* Specular Glint */}
      <polygon points="22,8 24,7 23,10" fill="#FFFFFF" />
    </svg>
  );
}

/** Амулет / Оберег / Кулон на цепи */
export function AmuletSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Heavy Link Chain */}
      <path d="M12 6C16 16 20 22 24 22C28 22 32 16 36 6" stroke="#000000" strokeWidth="4.5" fill="none" />
      <path d="M12 6C16 16 20 22 24 22C28 22 32 16 36 6" stroke={t.dark} strokeWidth="2.5" fill="none" />
      {/* Amulet Frame */}
      <polygon points="24,20 36,28 32,42 16,42 12,28" fill="#1F2937" {...STROKE} />
      {/* Inner Glowing Core Stone */}
      <polygon points="24,23 33,29 30,39 18,39 15,29" fill={t.glow} {...STROKE} />
      <polygon points="24,25 31,30 24,37 17,30" fill={t.accent} {...STROKE} />
      {/* Power Rune / Sparkle */}
      <circle cx="24" cy="31" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

/** Ожерелье / Колье с самоцветами */
export function NecklaceSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Golden Torc Arc */}
      <path d="M10 12C12 28 36 28 38 12" stroke="#000000" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M10 12C12 28 36 28 38 12" stroke={t.core} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Hanging Teardrop Gemstones */}
      <polygon points="24,28 27,36 24,42 21,36" fill={t.glow} {...STROKE} />
      <polygon points="17,25 19,31 17,36 15,31" fill={t.accent} {...STROKE} />
      <polygon points="31,25 33,31 31,36 29,31" fill={t.accent} {...STROKE} />
      {/* Center Specular Glint */}
      <circle cx="24" cy="35" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** Древняя печать / Монета / Медальон */
export function SealCoinSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <circle cx="24" cy="25" r="16" fill="#000000" />
      {/* Thick Outer Medallion Rim */}
      <circle cx="24" cy="24" r="16" fill={t.core} {...STROKE} />
      {/* Inner Recessed Coin Field */}
      <circle cx="24" cy="24" r="12" fill={t.dark} {...STROKE} />
      {/* Stamped Heraldic Symbol (Eagle / Dragon / Star) */}
      <polygon points="24,15 27,21 33,21 28,25 30,31 24,27 18,31 20,25 15,21 21,21" fill={t.glow} />
      {/* Runes along border */}
      <circle cx="24" cy="11" r="1.2" fill={t.accent} />
      <circle cx="37" cy="24" r="1.2" fill={t.accent} />
      <circle cx="24" cy="37" r="1.2" fill={t.accent} />
      <circle cx="11" cy="24" r="1.2" fill={t.accent} />
    </svg>
  );
}

/** Всевидящее око / Око Василиска */
export function EvilEyeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path d="M6 24C12 12 36 12 42 24C36 36 12 36 6 24Z" fill="#000000" />
      {/* Sclera Eyeball Hull */}
      <path
        d="M6 23C12 11 36 11 42 23C36 35 12 35 6 23Z"
        fill="#FFFFFF"
        {...STROKE}
      />
      {/* Outer Cyan Iris */}
      <circle cx="24" cy="23" r="8" fill={t.accent} {...STROKE} />
      {/* Dark Pupil */}
      <circle cx="24" cy="23" r="4.5" fill="#111827" />
      {/* Specular White Catchlight */}
      <circle cx="26" cy="21" r="2" fill="#FFFFFF" />
    </svg>
  );
}

/** Кристаллическое сердце стихии / Сердце Башни / Феникса */
export function HeartGemSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path d="M24 42C24 42 8 32 8 18C8 10 14 6 20 8C23 9 24 12 24 12C24 12 25 9 28 8C34 6 40 10 40 18C40 32 24 42 24 42Z" fill="#000000" />
      {/* Faceted Heart Jewel Body */}
      <path
        d="M24 40C24 40 8 30 8 18C8 10 14 6 20 8C23 9 24 12 24 12C24 12 25 9 28 8C34 6 40 10 40 18C40 30 24 40 24 40Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Faceted Triangular Cuts */}
      <polygon points="24,12 20,22 24,36 28,22" fill={t.accent} stroke="#000000" strokeWidth="1.5" />
      <polygon points="8,18 20,22 14,28" fill={t.core} />
      <polygon points="40,18 28,22 34,28" fill={t.core} />
      {/* Specular Flash */}
      <polygon points="18,10 20,13 16,14" fill="#FFFFFF" />
    </svg>
  );
}

/** Магическая сфера / Астральный шар */
export function CrystalOrbSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Pedestal Stand Base */}
      <polygon points="16,42 32,42 28,34 20,34" fill="#1F2937" {...STROKE} />
      <rect x="14" y="40" width="20" height="4" rx="1.5" fill={t.dark} {...STROKE} />
      {/* Crystal Sphere */}
      <circle cx="24" cy="20" r="14" fill={t.glow} {...STROKE} />
      {/* Swirling Nebula Galaxy Core */}
      <circle cx="24" cy="20" r="9" fill={t.core} />
      <circle cx="24" cy="20" r="5" fill={t.accent} />
      {/* Specular Highlight Arc */}
      <path d="M16 12C20 9 28 9 32 12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Четырехлистный клевер удачи */
export function CloverSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* 4 Emerald Heart Leaves */}
      <g stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 24C24 16 16 12 16 18C16 22 24 24 24 24Z" fill="#10B981" />
        <path d="M24 24C24 16 32 12 32 18C32 22 24 24 24 24Z" fill="#10B981" />
        <path d="M24 24C16 24 12 32 18 32C22 32 24 24 24 24Z" fill="#059669" />
        <path d="M24 24C32 24 36 32 30 32C26 32 24 24 24 24Z" fill="#059669" />
      </g>
      {/* Stem */}
      <path d="M24 24C26 32 28 40 34 42" stroke="#047857" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Golden Center & Sparkle */}
      <circle cx="24" cy="24" r="3" fill={t.accent} {...STROKE} />
      <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** Часы застоя / Хронометр */
export function HourglassSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Top and Bottom Caps */}
      <rect x="12" y="6" width="24" height="5" rx="1.5" fill={t.dark} {...STROKE} />
      <rect x="12" y="37" width="24" height="5" rx="1.5" fill={t.dark} {...STROKE} />
      {/* Glass Bulb Body */}
      <path
        d="M14 11C14 20 22 24 22 24C22 24 14 28 14 37H34C34 28 26 24 26 24C26 24 34 20 34 11H14Z"
        fill={t.glow}
        {...STROKE}
      />
      {/* Golden Sand Pyramid in Top and Bottom */}
      <polygon points="17,13 31,13 24,22" fill={t.accent} />
      <polygon points="18,36 30,36 24,28" fill={t.accent} />
      {/* Falling Sand Trickle */}
      <line x1="24" y1="22" x2="24" y2="28" stroke="#FFE600" strokeWidth="2" strokeDasharray="1 2" />
    </svg>
  );
}

/** Боевой наруч / Браслет */
export function BracerSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const t = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Curved Plate */}
      <path d="M12 12C20 8 28 8 36 12L38 36C30 40 18 40 10 36L12 12Z" fill={t.core} {...STROKE} />
      {/* Center Ridge Plate */}
      <path d="M18 10L30 10L32 38L16 38L18 10Z" fill={t.glow} {...STROKE} />
      {/* Straps */}
      <line x1="12" y1="18" x2="36" y2="18" stroke="#000000" strokeWidth="2.5" />
      <line x1="10" y1="30" x2="38" y2="30" stroke="#000000" strokeWidth="2.5" />
      {/* Gem Emblem */}
      <polygon points="24,20 28,24 24,28 20,24" fill={t.accent} {...STROKE} />
    </svg>
  );
}

export function GemAmuletSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <AmuletSvg rarity={rarity} className={className} {...props} />;
}
export function CoinAmuletSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <SealCoinSvg rarity={rarity} className={className} {...props} />;
}
export function SparkleCharmSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <CloverSvg rarity={rarity} className={className} {...props} />;
}
export function CrystalBallSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  return <CrystalOrbSvg rarity={rarity} className={className} {...props} />;
}
