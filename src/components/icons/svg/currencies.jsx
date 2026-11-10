import React from 'react';

// Common stroke styling for neo-brutal aesthetics
const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

/**
 * Neo-Brutalist Gold Coin
 */
export function GoldCoinSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Outer Drop Facet / Shadow */}
      <circle cx="25" cy="25" r="19" fill="#000000" />
      {/* Main Rim */}
      <circle cx="23" cy="23" r="19" fill="#FFB800" {...STROKE} />
      {/* Inner Bevel */}
      <circle cx="23" cy="23" r="14.5" fill="#FFE600" {...STROKE} />
      {/* Embossed Crown / "H" Insignia */}
      <path
        d="M17 19L19 28H27L29 19L24.5 22.5L23 18L21.5 22.5L17 19Z"
        fill="#FF8800"
        {...STROKE}
      />
      {/* Diamond Glint Accent */}
      <circle cx="23" cy="25" r="1.5" fill="#FFFFFF" />
      {/* Specular White Highlight Slash */}
      <path
        d="M12 16C14 12 18 9 23 9"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Neo-Brutalist Abyss Crystal Shard
 */
export function CrystalShardSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hard Drop Shadow */}
      <polygon points="26,5 39,21 33,45 17,45 11,21" fill="#000000" />
      {/* Base Crystal Shape */}
      <polygon points="24,3 37,19 31,43 15,43 9,19" fill="#005577" {...STROKE} />
      {/* Facet: Deep Teal Shadow Left */}
      <polygon points="24,3 9,19 15,43" fill="#007799" {...STROKE} />
      {/* Facet: High-Vibrant Cyan Front */}
      <polygon points="24,3 15,43 27,43 28,19" fill="#00F5FF" {...STROKE} />
      {/* Facet: Electric Light Right */}
      <polygon points="24,3 28,19 37,19" fill="#80FAFF" {...STROKE} />
      <polygon points="28,19 27,43 31,43 37,19" fill="#00B8D4" {...STROKE} />
      {/* Specular Sharp Light Cut */}
      <line x1="22" y1="8" x2="16" y2="24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      {/* Sparkle Glint */}
      <polygon points="36,12 37,14 39,15 37,16 36,18 35,16 33,15 35,14" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Neo-Brutalist Void Soul Orb
 */
export function SoulOrbSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hard Shadow */}
      <circle cx="26" cy="26" r="18" fill="#000000" />
      {/* Outer Occult Rim */}
      <circle cx="24" cy="24" r="18" fill="#3B0066" {...STROKE} />
      {/* Swirling Void Plasma */}
      <circle cx="24" cy="24" r="14" fill="#7A00CC" {...STROKE} />
      {/* High-Energy Electric Violet Core */}
      <path
        d="M17 26C15 20 20 15 25 15C31 15 33 21 30 26C27 31 20 33 17 26Z"
        fill="#B026FF"
        {...STROKE}
      />
      {/* Cyan Spirit Eye / Core Pulse */}
      <circle cx="24" cy="22" r="4.5" fill="#00F5FF" {...STROKE} />
      <circle cx="23" cy="21" r="1.5" fill="#FFFFFF" />
      {/* Floating Soul Sparks */}
      <circle cx="12" cy="14" r="2" fill="#E080FF" {...STROKE} />
      <circle cx="37" cy="18" r="2.5" fill="#00F5FF" {...STROKE} />
      <circle cx="34" cy="35" r="1.8" fill="#FFE600" />
    </svg>
  );
}

/**
 * Neo-Brutalist High-Voltage Energy Cell / Lightning
 */
export function EnergyCellSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow Battery Silhouette */}
      <rect x="13" y="10" width="26" height="34" rx="4" fill="#000000" />
      {/* Battery Top Terminal */}
      <rect x="20" y="4" width="8" height="5" rx="1.5" fill="#FFE600" {...STROKE} />
      {/* Main Battery Chamber */}
      <rect x="11" y="8" width="26" height="34" rx="4" fill="#1A1A1A" {...STROKE} />
      {/* Energy Level Window */}
      <rect x="14" y="11" width="20" height="28" rx="2" fill="#003B26" stroke="#000000" strokeWidth="2" />
      {/* Liquid Cyber Lime Fill */}
      <rect x="14" y="16" width="20" height="23" rx="1" fill="#00FF66" />
      {/* Jagged Electric Lightning Bolt */}
      <polygon
        points="27,13 18,25 24,25 21,35 31,23 25,23"
        fill="#FFE600"
        {...STROKE}
      />
      {/* Specular White Energy Stripe */}
      <line x1="16" y1="13" x2="16" y2="35" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/**
 * Neo-Brutalist Health Alchemy Flask / Potion
 */
export function HealthPotionSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path
        d="M21 7H29V14L38 29C40 33 38 43 28 43H22C12 43 10 33 12 29L21 14V7Z"
        fill="#000000"
        transform="translate(2, 2)"
      />
      {/* Cork Stopper */}
      <path d="M19 4H29L28 8H20L19 4Z" fill="#D97706" {...STROKE} />
      {/* Glass Flask Body */}
      <path
        d="M20 8H28V15L37 30C39 34 37 42 27 42H21C11 42 9 34 11 30L20 15V8Z"
        fill="#111827"
        {...STROKE}
      />
      {/* Glowing Crimson / Red Elixir */}
      <path
        d="M13 32L19 22H29L35 32C37 35 35 41 27 41H21C13 41 11 35 13 32Z"
        fill="#FF0055"
      />
      {/* Elixir Wave Surface */}
      <path
        d="M18 23C21 21 27 24 30 22"
        stroke="#FFAACC"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Bubbling Magic Orbs */}
      <circle cx="21" cy="33" r="2.5" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
      <circle cx="27" cy="28" r="1.5" fill="#FFFFFF" />
      <circle cx="24" cy="37" r="1.8" fill="#FFAACC" />
      {/* Glass Glint Curve */}
      <path
        d="M14 30C13 34 15 38 18 40"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Neo-Brutalist Phoenix Revive Feather
 */
export function ReviveFeatherSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path
        d="M38 6C38 6 22 13 14 26C9 34 11 41 11 41C11 41 18 41 26 34C36 24 40 8 40 8"
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Feather Back Shaft */}
      <path
        d="M10 42C16 36 29 23 39 7"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Solar Fire Plumage - Left Vane */}
      <path
        d="M38 7C38 7 24 13 16 23L22 25L14 31L21 32L12 39C12 39 19 39 26 33L26 28L32 26L31 20L36 17L38 7Z"
        fill="#FF5500"
        {...STROKE}
      />
      {/* Golden Inner Vane Highlight */}
      <path
        d="M36 9C34 14 27 20 22 24L26 25L20 29C25 27 31 22 36 15L36 9Z"
        fill="#FFE600"
        stroke="#000000"
        strokeWidth="1.5"
      />
      {/* Floating Blazing Embers */}
      <circle cx="39" cy="18" r="2.2" fill="#FFE600" {...STROKE} />
      <circle cx="30" cy="8" r="1.8" fill="#FF0055" {...STROKE} />
      <circle cx="8" cy="33" r="1.5" fill="#FFE600" />
      {/* Golden Spine Quill */}
      <path
        d="M10 42C15 37 26 24 37 8"
        stroke="#FFE600"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Neo-Brutalist Telegram Star Badge
 */
export function StarBadgeSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hard Drop Shadow Star */}
      <polygon
        points="26,4 32,17 46,18 35,28 39,42 26,34 13,42 17,28 6,18 20,17"
        fill="#000000"
      />
      {/* Outer Star Body */}
      <polygon
        points="24,2 30,15 44,16 33,26 37,40 24,32 11,40 15,26 4,16 18,15"
        fill="#FFAA00"
        {...STROKE}
      />
      {/* Facet: Shaded Bottom Half */}
      <polygon
        points="24,32 11,40 15,26 24,24 33,26 37,40"
        fill="#FF8800"
        stroke="#000000"
        strokeWidth="2"
      />
      {/* Facet: Bright Upper Half */}
      <polygon
        points="24,2 30,15 44,16 24,24 4,16 18,15"
        fill="#FFE600"
        stroke="#000000"
        strokeWidth="2"
      />
      {/* Central Diamond Core */}
      <polygon points="24,14 28,21 24,26 20,21" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
      {/* Specular Glint */}
      <circle cx="21" cy="18" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}
