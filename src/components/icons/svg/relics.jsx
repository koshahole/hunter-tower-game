import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export function PotionBundleRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* 3 Alchemy Phials Wrapped with Studded Belt */}
      <rect x="12" y="16" width="7" height="18" rx="3.5" fill="#10B981" {...STROKE} />
      <rect x="21" y="12" width="8" height="24" rx="4" fill="#06B6D4" {...STROKE} />
      <rect x="31" y="16" width="7" height="18" rx="3.5" fill="#FF0055" {...STROKE} />
      {/* Corks */}
      <rect x="13" y="12" width="5" height="4" fill="#D97706" {...STROKE} />
      <rect x="23" y="8" width="4" height="4" fill="#D97706" {...STROKE} />
      <rect x="32" y="12" width="5" height="4" fill="#D97706" {...STROKE} />
      {/* Leather Harness Belt */}
      <rect x="10" y="24" width="30" height="5" fill="#78350F" {...STROKE} />
      <rect x="23" y="23" width="4" height="7" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

export function HoningStoneRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Obsidian Whetstone Block */}
      <polygon points="10,28 26,10 40,20 24,38" fill="#374151" {...STROKE} />
      <polygon points="10,28 24,38 24,42 10,32" fill="#1F2937" {...STROKE} />
      <polygon points="24,38 40,20 40,24 24,42" fill="#111827" {...STROKE} />
      {/* Flashing Grind Sparks */}
      <polygon points="28,12 32,16 28,20 24,16" fill="#00F5FF" />
      <polygon points="34,8 36,12 34,14 32,12" fill="#FFE600" />
      <polygon points="16,22 18,25 16,28 14,25" fill="#FFE600" />
    </svg>
  );
}

export function TitanCuirassRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Heavy Titanium Plate */}
      <polygon points="12,8 36,8 40,24 24,42 8,24" fill="#00F5FF" {...STROKE} />
      <polygon points="16,12 32,12 34,22 24,36 14,22" fill="#005577" {...STROKE} />
      {/* Power Core Gem in Chest */}
      <circle cx="24" cy="20" r="4" fill="#FFE600" {...STROKE} />
    </svg>
  );
}

export function BasiliskEyeRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Radiating Sunburst Setting */}
      <polygon points="24,4 28,12 38,8 34,18 44,22 36,28 42,38 32,36 28,44 24,36 20,44 16,36 6,38 12,28 4,22 14,18 10,8 20,12" fill="#FFE600" {...STROKE} />
      {/* Golden Talisman Rim */}
      <circle cx="24" cy="24" r="12" fill="#B45309" {...STROKE} />
      {/* Slitted Reptilian Eyeball */}
      <circle cx="24" cy="24" r="9" fill="#10B981" {...STROKE} />
      <polygon points="24,17 26,24 24,31 22,24" fill="#111827" />
    </svg>
  );
}

export function SwiftBootsRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Winged Hermes Boots */}
      <path d="M18 12V26L28 26C36 26 38 32 38 34H12V12H18Z" fill="#3B82F6" {...STROKE} />
      {/* Gold Trim Sole */}
      <rect x="10" y="34" width="30" height="5" rx="1.5" fill="#FFE600" {...STROKE} />
      {/* Wing Feathers on Heel */}
      <polygon points="12,16 4,12 10,20 2,20 12,24" fill="#FFFFFF" {...STROKE} />
    </svg>
  );
}

export function GreedAmuletRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Solid Gold Dragon Medallion Biting a Coin */}
      <circle cx="24" cy="24" r="18" fill="#FFB800" {...STROKE} />
      <circle cx="24" cy="24" r="13" fill="#FFE600" {...STROKE} />
      {/* Dragon Silhouette Inlay */}
      <path d="M18 20C18 14 30 14 30 20C30 24 26 26 24 28V32" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="35" r="1.5" fill="#B45309" />
    </svg>
  );
}

export function ThunderCoreRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Floating Plasma Spherical Core */}
      <circle cx="24" cy="24" r="16" fill="#00F5FF" {...STROKE} />
      <circle cx="24" cy="24" r="11" fill="#FFFFFF" {...STROKE} />
      {/* Crackling Lightning Arcs */}
      <polygon points="26,10 18,24 24,24 21,38 32,22 26,22" fill="#FFE600" {...STROKE} />
    </svg>
  );
}

export function VampiricChaliceRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Gothic Ruby-Encrusted Chalice */}
      <path d="M14 10H34V20C34 26 26 30 26 34V38H32V42H16V38H22V34C22 30 14 26 14 20V10Z" fill="#374151" {...STROKE} />
      {/* Overflowing Crimson Blood */}
      <ellipse cx="24" cy="11" rx="9" ry="3" fill="#FF0055" />
      {/* Ruby Cabochon */}
      <circle cx="24" cy="22" r="3" fill="#FF0055" {...STROKE} />
    </svg>
  );
}

export function ReviveFeatherRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Radiant Solar Phoenix Feather */}
      <path d="M38 6C38 6 22 13 14 26C9 34 11 41 11 41C11 41 18 41 26 34C36 24 40 8 40 8" fill="#FF8800" {...STROKE} />
      <path d="M36 8C32 14 24 22 18 28" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="42" x2="38" y2="6" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SovereignRingRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Heavy Spiked Sovereign Band */}
      <circle cx="24" cy="26" r="14" fill="#FFE600" {...STROKE} />
      <circle cx="24" cy="26" r="8" fill="#111827" {...STROKE} />
      {/* Spikes on Top */}
      <polygon points="14,14 17,6 20,14" fill="#FF8800" {...STROKE} />
      <polygon points="21,12 24,4 27,12" fill="#FF8800" {...STROKE} />
      <polygon points="28,14 31,6 34,14" fill="#FF8800" {...STROKE} />
      {/* Faceted Amber Core */}
      <circle cx="24" cy="16" r="3" fill="#FF0055" {...STROKE} />
    </svg>
  );
}

export function InfernalBombRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Round Black Bomb */}
      <circle cx="24" cy="27" r="15" fill="#18181B" {...STROKE} />
      {/* Bomb Cap */}
      <rect x="20" y="9" width="8" height="4" fill="#4B5563" {...STROKE} />
      {/* S-Shaped Burning Fuse */}
      <path d="M24 9C24 4 32 6 34 2" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Fuse Spark */}
      <polygon points="34,2 38,0 36,4 40,3 36,6" fill="#FFE600" />
      {/* Skull Stamped on Bomb */}
      <circle cx="24" cy="27" r="5" fill="#F3F4F6" />
      <circle cx="22" cy="26" r="1" fill="#000000" />
      <circle cx="26" cy="26" r="1" fill="#000000" />
    </svg>
  );
}

export function FortuneCloverRelicSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Stem */}
      <path d="M24 24C24 38 18 42 16 44" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      {/* 4 Emerald Heart Leaves with Gold Contour */}
      {/* Top */}
      <circle cx="24" cy="15" r="7" fill="#10B981" {...STROKE} />
      {/* Bottom */}
      <circle cx="24" cy="31" r="7" fill="#10B981" {...STROKE} />
      {/* Left */}
      <circle cx="16" cy="23" r="7" fill="#059669" {...STROKE} />
      {/* Right */}
      <circle cx="32" cy="23" r="7" fill="#059669" {...STROKE} />
      {/* Golden Central Sparkle */}
      <polygon points="24,20 26,24 24,28 22,24" fill="#FFE600" />
    </svg>
  );
}

export const RELIC_SVG_MAP = {
  potion_bundle: PotionBundleRelicSvg,
  honing_stone: HoningStoneRelicSvg,
  titan_cuirass: TitanCuirassRelicSvg,
  basilisk_eye: BasiliskEyeRelicSvg,
  swift_boots: SwiftBootsRelicSvg,
  greed_amulet: GreedAmuletRelicSvg,
  thunder_core: ThunderCoreRelicSvg,
  vampiric_chalice: VampiricChaliceRelicSvg,
  revive_feather: ReviveFeatherRelicSvg,
  sovereign_ring: SovereignRingRelicSvg,
  infernal_bomb: InfernalBombRelicSvg,
  fortune_clover: FortuneCloverRelicSvg
};
