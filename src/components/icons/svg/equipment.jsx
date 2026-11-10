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
    glow: '#E5E7EB',
    core: '#D1D5DB',
    dark: '#4B5563'
  },
  rare: {
    accent: '#00F5FF',
    glow: '#80FAFF',
    core: '#00B8D4',
    dark: '#005577'
  },
  epic: {
    accent: '#B026FF',
    glow: '#E080FF',
    core: '#7A00CC',
    dark: '#3B0066'
  },
  legendary: {
    accent: '#FFE600',
    glow: '#FFFDF0',
    core: '#FFB800',
    dark: '#FF8800'
  }
};

/**
 * WEAPONS
 */
export function CrossedSwordsSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow Blades */}
      <line x1="8" y1="42" x2="42" y2="8" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
      <line x1="42" y1="42" x2="8" y2="8" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
      {/* Blade 1 (Diagonal Left to Right) */}
      <line x1="8" y1="40" x2="40" y2="8" stroke={theme.glow} strokeWidth="4" strokeLinecap="round" />
      <line x1="8" y1="40" x2="40" y2="8" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
      {/* Guard 1 */}
      <line x1="10" y1="32" x2="18" y2="40" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <line x1="10" y1="32" x2="18" y2="40" stroke={theme.core} strokeWidth="3" strokeLinecap="round" />
      {/* Blade 2 (Diagonal Right to Left) */}
      <line x1="40" y1="40" x2="8" y2="8" stroke={theme.glow} strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="40" x2="8" y2="8" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
      {/* Guard 2 */}
      <line x1="38" y1="32" x2="30" y2="40" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <line x1="38" y1="32" x2="30" y2="40" stroke={theme.core} strokeWidth="3" strokeLinecap="round" />
      {/* Crossing Diamond Core */}
      <polygon points="24,20 28,24 24,28 20,24" fill={theme.glow} {...STROKE} />
    </svg>
  );
}

export function DaggerSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path d="M12 42L16 46L24 38L22 34Z" fill="#000000" />
      <path d="M19 29L38 8L42 12L25 33Z" fill="#000000" />
      {/* Handle & Pommel */}
      <circle cx="10" cy="38" r="4" fill={theme.dark} {...STROKE} />
      <line x1="10" y1="38" x2="20" y2="28" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
      <line x1="10" y1="38" x2="20" y2="28" stroke={theme.core} strokeWidth="2.5" strokeLinecap="round" />
      {/* Crossguard */}
      <line x1="15" y1="23" x2="25" y2="33" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="15" y1="23" x2="25" y2="33" stroke={theme.accent} strokeWidth="3.5" strokeLinecap="round" />
      {/* Serrated Hunting Blade */}
      <polygon points="20,28 39,7 41,9 31,23 33,25 24,32" fill={theme.glow} {...STROKE} />
      <polygon points="20,28 39,7 35,21 24,32" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Blood Fuller Groove */}
      <line x1="24" y1="26" x2="35" y2="15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AxeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shaft */}
      <line x1="12" y1="42" x2="34" y2="10" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="12" y1="42" x2="34" y2="10" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Axe Head Drop Shadow */}
      <path d="M26 12C26 6 36 4 43 7C45 16 39 26 29 24Z" fill="#000000" />
      {/* Crescent Battle Blade */}
      <path d="M25 10C25 4 35 3 41 6C43 14 38 24 28 22Z" fill={theme.glow} {...STROKE} />
      {/* Inner Bevel */}
      <path d="M25 10C27 7 34 6 38 8C39 14 36 21 28 22Z" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Iron Eye Ring Mount */}
      <rect x="25" y="11" width="7" height="9" rx="1.5" fill={theme.dark} {...STROKE} />
      {/* Back Spike */}
      <polygon points="24,14 18,17 24,20" fill={theme.core} {...STROKE} />
    </svg>
  );
}

export function HammerSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shaft */}
      <line x1="12" y1="42" x2="32" y2="14" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="12" y1="42" x2="32" y2="14" stroke="#4B5563" strokeWidth="3.5" strokeLinecap="round" />
      {/* Warhammer Head Shadow */}
      <rect x="23" y="6" width="20" height="15" rx="3" transform="rotate(35 23 6)" fill="#000000" />
      {/* Main Beveled Block */}
      <rect x="21" y="4" width="20" height="15" rx="3" transform="rotate(35 21 4)" fill={theme.core} {...STROKE} />
      {/* Impact Face Plate */}
      <rect x="33" y="1" width="6" height="15" rx="1" transform="rotate(35 33 1)" fill={theme.glow} {...STROKE} />
      {/* Power Rune Emblem */}
      <polygon points="26,16 29,14 31,18 28,20" fill={theme.accent} stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

export function WandSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Twisted Magic Staff */}
      <line x1="10" y1="42" x2="32" y2="14" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="10" y1="42" x2="32" y2="14" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
      {/* Golden Wand Fitting */}
      <circle cx="32" cy="14" r="5" fill={theme.dark} {...STROKE} />
      {/* Floating Focus Core Gem */}
      <polygon points="36,2 44,10 36,18 28,10" fill={theme.glow} {...STROKE} />
      <polygon points="36,4 42,10 36,16 30,10" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Astral Magic Ring Sparks */}
      <circle cx="43" cy="4" r="1.8" fill={theme.glow} />
      <circle cx="28" cy="4" r="1.5" fill={theme.accent} />
    </svg>
  );
}

export function TridentSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Long Shaft */}
      <line x1="10" y1="42" x2="30" y2="16" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <line x1="10" y1="42" x2="30" y2="16" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      {/* Trident Crossbase */}
      <path d="M22 22C25 15 35 15 38 22" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M22 22C25 15 35 15 38 22" stroke={theme.dark} strokeWidth="2.5" strokeLinecap="round" />
      {/* Center Spear Tip */}
      <polygon points="30,16 35,4 40,16 35,18" fill={theme.glow} {...STROKE} />
      {/* Left Prongs */}
      <polygon points="21,21 24,10 27,19" fill={theme.accent} {...STROKE} />
      {/* Right Prongs */}
      <polygon points="33,19 36,10 39,21" fill={theme.accent} {...STROKE} />
    </svg>
  );
}

export function SawSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Ergonomic Grip */}
      <path d="M8 38L16 30L20 34L12 42C10 44 6 42 8 38Z" fill="#1F2937" {...STROKE} />
      <circle cx="14" cy="36" r="2" fill={theme.accent} />
      {/* Jagged Saw Blade */}
      <polygon
        points="16,30 38,8 42,12 39,15 42,17 38,20 41,22 37,25 40,27 20,34"
        fill={theme.glow}
        {...STROKE}
      />
      {/* Teeth Ridge */}
      <polygon points="18,29 36,11 34,16 20,32" fill={theme.core} stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

export function PickaxeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Wood Handle */}
      <line x1="12" y1="42" x2="34" y2="12" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="12" y1="42" x2="34" y2="12" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
      {/* Pick Head Curved Arc */}
      <path
        d="M17 10C24 6 36 7 43 17L39 20C34 13 25 12 20 15L17 10Z"
        fill={theme.glow}
        {...STROKE}
      />
      {/* Reinforced Center Eye */}
      <rect x="26" y="10" width="8" height="8" rx="2" fill={theme.dark} {...STROKE} />
    </svg>
  );
}

/**
 * ARMORS
 */
export function ShieldPlateSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow Cuirass */}
      <path d="M14 8L36 8L39 22C39 34 25 44 25 44C25 44 11 34 11 22L14 8Z" fill="#000000" />
      {/* Main Knight Breastplate */}
      <path d="M13 6L35 6L38 20C38 32 24 42 24 42C24 42 10 32 10 20L13 6Z" fill={theme.dark} {...STROKE} />
      {/* Upper Chest Ridges */}
      <polygon points="14,8 34,8 32,20 16,20" fill={theme.core} stroke="#000000" strokeWidth="2" />
      {/* Abdominal Segment Plates */}
      <path d="M16 22H32L24 38L16 22Z" fill={theme.glow} {...STROKE} />
      {/* Center Crest Emblem */}
      <circle cx="24" cy="14" r="3" fill={theme.accent} {...STROKE} />
    </svg>
  );
}

export function GiSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <path d="M11 12L25 6L39 12L37 40L13 40L11 12Z" fill="#000000" />
      {/* Main Kimono Robe */}
      <path d="M10 10L24 4L38 10L36 38L12 38L10 10Z" fill="#F3F4F6" {...STROKE} />
      {/* Left Lapel (Crossover) */}
      <polygon points="10,10 24,4 32,30 20,30" fill={theme.glow} stroke="#000000" strokeWidth="2" />
      {/* Right Lapel */}
      <polygon points="38,10 24,4 16,30 28,30" fill={theme.core} stroke="#000000" strokeWidth="2" />
      {/* Master Black Obi Belt */}
      <rect x="12" y="28" width="24" height="6" fill="#111827" stroke="#000000" strokeWidth="2" />
      {/* Belt Knot Ribbons */}
      <path d="M22 34V42L25 38L28 42V34" fill="#111827" {...STROKE} />
    </svg>
  );
}

export function VestSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Vest Silhouette */}
      <path d="M12 10L20 6L28 6L36 10L34 40H14L12 10Z" fill={theme.dark} {...STROKE} />
      {/* Neck Cutout */}
      <polygon points="20,6 28,6 24,18" fill="#111827" stroke="#000000" strokeWidth="2" />
      {/* Cargo Pocket Left */}
      <rect x="15" y="24" width="7" height="9" rx="1.5" fill={theme.core} {...STROKE} />
      {/* Cargo Pocket Right */}
      <rect x="26" y="24" width="7" height="9" rx="1.5" fill={theme.core} {...STROKE} />
      {/* Tactical Center Zipper / Buckle */}
      <line x1="24" y1="18" x2="24" y2="40" stroke="#000000" strokeWidth="2.5" />
      <line x1="21" y1="20" x2="27" y2="20" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CoatLabSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Long Coat Silhouette */}
      <polygon points="12,12 24,6 36,12 38,42 10,42" fill="#E5E7EB" {...STROKE} />
      {/* High Alchemist Lapels */}
      <polygon points="12,12 24,6 24,24 16,18" fill={theme.glow} stroke="#000000" strokeWidth="2" />
      <polygon points="36,12 24,6 24,24 32,18" fill={theme.glow} stroke="#000000" strokeWidth="2" />
      {/* Pocket with Flask */}
      <rect x="13" y="26" width="6" height="8" rx="1" fill={theme.accent} {...STROKE} />
      {/* Brass Buttons */}
      <circle cx="27" cy="24" r="1.5" fill="#FFE600" {...STROKE} />
      <circle cx="27" cy="30" r="1.5" fill="#FFE600" {...STROKE} />
      <circle cx="27" cy="36" r="1.5" fill="#FFE600" {...STROKE} />
    </svg>
  );
}

export function CoatSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Leather Duster Coat */}
      <path d="M12 10L24 6L36 10L40 42L8 42L12 10Z" fill="#3E2723" {...STROKE} />
      {/* Broad Fur / Leather Collar */}
      <path d="M10 10C16 16 32 16 38 10L34 20L14 20L10 10Z" fill={theme.dark} {...STROKE} />
      {/* Belt with Metal Buckle */}
      <rect x="10" y="28" width="28" height="5" fill="#1F2937" stroke="#000000" strokeWidth="2" />
      <rect x="22" y="27" width="5" height="7" rx="1" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

export function TunicSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Agile Rogue Tunic */}
      <polygon points="13,8 24,5 35,8 37,38 11,38" fill={theme.dark} {...STROKE} />
      {/* V-Neck Cut */}
      <polygon points="19,7 29,7 24,18" fill="#111827" stroke="#000000" strokeWidth="2" />
      {/* Chevron Trim Stripes */}
      <path d="M14 22L24 28L34 22" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M14 28L24 34L34 28" stroke={theme.glow} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * HELMETS
 */
export function HelmSoldierSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Helm Drop Shadow */}
      <path d="M12 24C12 12 36 12 36 24V38H12V24Z" fill="#000000" />
      {/* Helmet Dome */}
      <path d="M10 22C10 10 38 10 38 22V36H10V22Z" fill={theme.core} {...STROKE} />
      {/* Reinforced Crest Ridge */}
      <path d="M22 6C22 6 24 4 26 6V20H22V6Z" fill={theme.glow} {...STROKE} />
      {/* Visor Slit */}
      <rect x="14" y="20" width="20" height="5" rx="1.5" fill="#111827" {...STROKE} />
      {/* Glowing Eye Slits Inside */}
      <line x1="17" y1="22.5" x2="22" y2="22.5" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="22.5" x2="31" y2="22.5" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" />
      {/* Breathing Vent Holes */}
      <circle cx="18" cy="30" r="1.5" fill="#000000" />
      <circle cx="24" cy="30" r="1.5" fill="#000000" />
      <circle cx="30" cy="30" r="1.5" fill="#000000" />
    </svg>
  );
}

export function CrownSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <polygon points="8,38 10,18 19,26 24,12 29,26 38,18 40,38" fill="#000000" />
      {/* Sovereign Spiked Crown */}
      <polygon
        points="7,36 9,16 18,24 23,10 28,24 37,16 39,36"
        fill={theme.accent}
        {...STROKE}
      />
      {/* Crown Rim Band */}
      <rect x="7" y="32" width="32" height="7" rx="1" fill={theme.dark} {...STROKE} />
      {/* Inset Gems */}
      <circle cx="13" cy="35.5" r="2" fill="#00F5FF" stroke="#000000" strokeWidth="1.5" />
      <circle cx="23" cy="35.5" r="2.5" fill="#FF0055" stroke="#000000" strokeWidth="1.5" />
      <circle cx="33" cy="35.5" r="2" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
      {/* Top Spikes Jewels */}
      <circle cx="9" cy="15" r="1.8" fill="#FFFFFF" />
      <circle cx="23" cy="9" r="2.2" fill="#FFFFFF" />
      <circle cx="37" cy="15" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}

export function TophatSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Top Hat Crown */}
      <polygon points="15,10 33,10 35,32 13,32" fill="#111827" {...STROKE} />
      {/* Silk Ribbon Band */}
      <rect x="13" y="27" width="22" height="5" fill={theme.accent} {...STROKE} />
      {/* Brim Plate */}
      <ellipse cx="24" cy="36" rx="18" ry="4" fill="#111827" {...STROKE} />
      {/* Magician Playing Card / Feather Tucked */}
      <polygon points="28,20 34,16 32,27" fill={theme.glow} stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

export function CapSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Cap Dome */}
      <path d="M12 28C12 16 34 16 34 28H12Z" fill={theme.dark} {...STROKE} />
      {/* Cap Button on Top */}
      <circle cx="23" cy="16" r="2" fill={theme.glow} {...STROKE} />
      {/* Front Panel */}
      <path d="M15 28C15 19 25 19 25 28H15Z" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Flat Visor Brim */}
      <polygon points="22,28 42,28 40,33 22,33" fill="#111827" {...STROKE} />
    </svg>
  );
}

export function HatWideSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Wide Conical Ronin Straw Hat */}
      <polygon points="24,10 44,30 4,30" fill="#D97706" {...STROKE} />
      {/* Straw Woven Texture */}
      <line x1="24" y1="10" x2="14" y2="30" stroke="#92400E" strokeWidth="2" />
      <line x1="24" y1="10" x2="34" y2="30" stroke="#92400E" strokeWidth="2" />
      {/* Ornament Band */}
      <polygon points="20,18 28,18 31,23 17,23" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Hanging Chin Cords */}
      <line x1="16" y1="30" x2="20" y2="42" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="30" x2="28" y2="42" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function MaskSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Porcelain Mask Silhouette */}
      <path d="M12 12C16 6 32 6 36 12C38 24 34 38 24 42C14 38 10 24 12 12Z" fill="#F3F4F6" {...STROKE} />
      {/* Slanted Shadow Eye Holes */}
      <ellipse cx="18" cy="22" rx="4" ry="2" transform="rotate(-15 18 22)" fill="#111827" {...STROKE} />
      <ellipse cx="30" cy="22" rx="4" ry="2" transform="rotate(15 30 22)" fill="#111827" {...STROKE} />
      {/* Runic Face Tattoo */}
      <path d="M24 14V24M20 20H28" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
      {/* Glowing Pupils */}
      <circle cx="18" cy="22" r="1.5" fill={theme.glow} />
      <circle cx="30" cy="22" r="1.5" fill={theme.glow} />
    </svg>
  );
}

export function GogglesSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Leather Head Strap */}
      <line x1="4" y1="24" x2="44" y2="24" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left Lens Cylinder */}
      <circle cx="17" cy="24" r="9" fill={theme.dark} {...STROKE} />
      <circle cx="17" cy="24" r="6" fill={theme.accent} {...STROKE} />
      <circle cx="15" cy="22" r="2" fill="#FFFFFF" />
      {/* Center Brass Bridge */}
      <rect x="23" y="22" width="2" height="4" fill="#D97706" {...STROKE} />
      {/* Right Lens Cylinder */}
      <circle cx="31" cy="24" r="9" fill={theme.dark} {...STROKE} />
      <circle cx="31" cy="24" r="6" fill={theme.accent} {...STROKE} />
      <circle cx="29" cy="22" r="2" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * ACCESSORIES
 */
export function RingSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Ring Hoop */}
      <ellipse cx="24" cy="28" rx="14" ry="12" fill={theme.dark} {...STROKE} />
      <ellipse cx="24" cy="28" rx="8" ry="7" fill="#111827" {...STROKE} />
      {/* Prongs Setting */}
      <polygon points="18,16 30,16 28,12 20,12" fill={theme.glow} {...STROKE} />
      {/* Solitaire Cut Gem */}
      <polygon points="24,6 31,13 24,20 17,13" fill={theme.accent} {...STROKE} />
      <polygon points="24,9 28,13 24,17 20,13" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}

export function NecklaceSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Chain Curve */}
      <path d="M12 8C12 26 36 26 36 8" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 8C12 26 36 26 36 8" stroke={theme.dark} strokeWidth="3" strokeLinecap="round" />
      {/* Talisman Loop */}
      <circle cx="24" cy="26" r="3" fill="#FFE600" {...STROKE} />
      {/* Carved Rune Pendant */}
      <polygon points="24,28 32,38 24,44 16,38" fill={theme.glow} {...STROKE} />
      <polygon points="24,31 29,38 24,41 19,38" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

export function GemAmuletSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Twisted Chord */}
      <path d="M14 6L24 20L34 6" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 6L24 20L34 6" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
      {/* Faceted Crystal Cluster Pendant */}
      <polygon points="24,16 35,26 29,42 19,42 13,26" fill={theme.glow} {...STROKE} />
      <polygon points="24,16 13,26 19,42" fill={theme.dark} stroke="#000000" strokeWidth="1.5" />
      <polygon points="24,16 35,26 29,42" fill={theme.accent} stroke="#000000" strokeWidth="1.5" />
      {/* Inner Radiant Facet */}
      <polygon points="24,22 28,28 24,34 20,28" fill="#FFFFFF" />
    </svg>
  );
}

export function CoinAmuletSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Ribbon Neckloop */}
      <path d="M16 6L24 20L32 6" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      {/* Ancient Medallion Coin */}
      <circle cx="24" cy="30" r="12" fill={theme.core} {...STROKE} />
      <circle cx="24" cy="30" r="9" fill={theme.accent} {...STROKE} />
      {/* Square Hole in Ancient Coin */}
      <rect x="21" y="27" width="6" height="6" fill="#111827" {...STROKE} />
    </svg>
  );
}

export function EvilEyeSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Concentric Protective Eye Amulet */}
      <circle cx="24" cy="24" r="18" fill="#1E3A8A" {...STROKE} />
      <circle cx="24" cy="24" r="13" fill="#60A5FA" {...STROKE} />
      <circle cx="24" cy="24" r="8" fill="#FFFFFF" {...STROKE} />
      <circle cx="24" cy="24" r="4.5" fill="#111827" />
      <circle cx="22" cy="22" r="1.5" fill="#FFFFFF" />
      {/* Talisman Aura Trim */}
      <polygon points="24,2 27,6 21,6" fill={theme.accent} />
      <polygon points="24,46 27,42 21,42" fill={theme.accent} />
    </svg>
  );
}

export function SparkleCharmSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hanging Ring */}
      <circle cx="24" cy="8" r="4" fill="none" stroke="#000000" strokeWidth="3" />
      {/* 4-Point Starburst Talisman */}
      <polygon
        points="24,12 28,21 37,24 28,27 24,36 20,27 11,24 20,21"
        fill={theme.accent}
        {...STROKE}
      />
      {/* Center Diamond Spark */}
      <polygon points="24,20 26,24 24,28 22,24" fill="#FFFFFF" />
      {/* Auxiliary Sparkles */}
      <circle cx="34" cy="14" r="2" fill={theme.glow} {...STROKE} />
      <circle cx="14" cy="34" r="1.8" fill={theme.glow} />
    </svg>
  );
}

export function CrystalBallSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const theme = RARITY_THEMES[rarity] || RARITY_THEMES.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Dragon Talons Pedestal Base */}
      <path d="M16 42C16 38 32 38 32 42H16Z" fill="#1F2937" {...STROKE} />
      <polygon points="18,38 24,34 30,38" fill={theme.dark} {...STROKE} />
      {/* Scrying Orb Sphere */}
      <circle cx="24" cy="20" r="15" fill={theme.dark} {...STROKE} />
      {/* Internal Cosmic Swirl */}
      <circle cx="24" cy="20" r="11" fill={theme.accent} {...STROKE} />
      <ellipse cx="22" cy="18" rx="6" ry="4" fill={theme.glow} />
      {/* White Specular Glint Crescent */}
      <path d="M14 16C16 11 21 8 26 8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Universal Equipment Archetype Router
 */
export const EQUIPMENT_SVG_MAP = {
  crossed_swords: CrossedSwordsSvg,
  dagger: DaggerSvg,
  axe: AxeSvg,
  hammer: HammerSvg,
  wand: WandSvg,
  trident: TridentSvg,
  saw: SawSvg,
  pickaxe: PickaxeSvg,

  shield_plate: ShieldPlateSvg,
  gi: GiSvg,
  vest: VestSvg,
  coat_lab: CoatLabSvg,
  coat: CoatSvg,
  tunic: TunicSvg,

  helm_soldier: HelmSoldierSvg,
  crown: CrownSvg,
  tophat: TophatSvg,
  cap: CapSvg,
  hat_wide: HatWideSvg,
  mask: MaskSvg,
  goggles: GogglesSvg,

  ring: RingSvg,
  necklace: NecklaceSvg,
  gem_amulet: GemAmuletSvg,
  coin_amulet: CoinAmuletSvg,
  evil_eye: EvilEyeSvg,
  sparkle_charm: SparkleCharmSvg,
  crystal_ball: CrystalBallSvg
};
