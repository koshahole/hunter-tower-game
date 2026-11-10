import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

// 1. Archmage
export function AvatarMageSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#3B0764" {...STROKE} />
      {/* Wizard Cowl */}
      <polygon points="24,6 12,38 36,38" fill="#7C3AED" {...STROKE} />
      {/* Face Void */}
      <polygon points="24,18 16,34 32,34" fill="#111827" />
      {/* Glowing Cyan Eyes */}
      <circle cx="20" cy="26" r="2" fill="#00F5FF" />
      <circle cx="28" cy="26" r="2" fill="#00F5FF" />
      {/* Runic Circlet */}
      <path d="M18 18H30" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 2. Ninja
export function AvatarNinjaSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#111827" {...STROKE} />
      {/* Ninja Mask Cowl */}
      <circle cx="24" cy="24" r="16" fill="#1F2937" {...STROKE} />
      {/* Eye Slit */}
      <rect x="14" y="20" width="20" height="8" rx="2" fill="#F3F4F6" {...STROKE} />
      {/* Keen Dark Pupils */}
      <circle cx="19" cy="24" r="2" fill="#000000" />
      <circle cx="29" cy="24" r="2" fill="#000000" />
      {/* Metal Forehead Protector */}
      <rect x="15" y="14" width="18" height="5" rx="1.5" fill="#9CA3AF" {...STROKE} />
      <line x1="20" y1="16.5" x2="28" y2="16.5" stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

// 3. Swordsman / Blade
export function AvatarSwordsmanSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#1E293B" {...STROKE} />
      {/* Iron Helmet Bascinet */}
      <path d="M14 24C14 14 34 14 34 24V36H14V24Z" fill="#94A3B8" {...STROKE} />
      {/* T-Visor Slit */}
      <line x1="18" y1="24" x2="30" y2="24" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="24" x2="24" y2="34" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round" />
      {/* Red Plume Feather */}
      <path d="M24 14C24 6 30 6 34 4C32 10 28 12 24 14Z" fill="#EF4444" {...STROKE} />
    </svg>
  );
}

// 4. King / Sovereign
export function AvatarKingSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#78350F" {...STROKE} />
      {/* Crown */}
      <polygon points="12,22 16,10 24,18 32,10 36,22" fill="#FFE600" {...STROKE} />
      <circle cx="24" cy="18" r="2" fill="#EF4444" />
      {/* Royal Beard Face */}
      <circle cx="24" cy="28" r="10" fill="#FDE68A" {...STROKE} />
      <circle cx="20" cy="27" r="1.5" fill="#000000" />
      <circle cx="28" cy="27" r="1.5" fill="#000000" />
      <polygon points="18,34 24,42 30,34" fill="#B45309" {...STROKE} />
    </svg>
  );
}

// 5. Archer / Marksman
export function AvatarArcherSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#065F46" {...STROKE} />
      {/* Green Archer Cap */}
      <polygon points="12,26 24,12 36,26" fill="#10B981" {...STROKE} />
      <circle cx="24" cy="28" r="9" fill="#FEE2E2" {...STROKE} />
      <circle cx="21" cy="28" r="1.5" fill="#000000" />
      <circle cx="27" cy="28" r="1.5" fill="#000000" />
      {/* Red Feather on Cap */}
      <polygon points="26,16 34,8 30,18" fill="#EF4444" {...STROKE} />
    </svg>
  );
}

// 6. Wolf Beast Hunter
export function AvatarWolfSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#374151" {...STROKE} />
      {/* Wolf Pelt Hood with Ears */}
      <polygon points="14,16 10,8 18,12" fill="#4B5563" {...STROKE} />
      <polygon points="34,16 38,8 30,12" fill="#4B5563" {...STROKE} />
      <circle cx="24" cy="24" r="14" fill="#6B7280" {...STROKE} />
      <circle cx="20" cy="23" r="2.5" fill="#FFE600" {...STROKE} />
      <circle cx="28" cy="23" r="2.5" fill="#FFE600" {...STROKE} />
      <polygon points="21,30 27,30 24,34" fill="#111827" />
    </svg>
  );
}

// 7. Storm Elementalist
export function AvatarStormSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#0369A1" {...STROKE} />
      <circle cx="24" cy="24" r="14" fill="#0284C7" {...STROKE} />
      {/* Electric Lightning Eyes */}
      <polygon points="16,22 22,23 18,26" fill="#FFE600" {...STROKE} />
      <polygon points="32,22 26,23 30,26" fill="#FFE600" {...STROKE} />
      {/* Lightning Scar over Left Eye */}
      <polygon points="28,14 31,21 28,21 30,28" fill="#FFE600" stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

// 8. Dragon Slayer
export function AvatarDragonSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#831843" {...STROKE} />
      {/* Dragon Slayer Horns */}
      <polygon points="16,14 10,4 20,10" fill="#BE123C" {...STROKE} />
      <polygon points="32,14 38,4 28,10" fill="#BE123C" {...STROKE} />
      <polygon points="16,20 24,14 32,20 28,36 20,36" fill="#E11D48" {...STROKE} />
      <circle cx="20" cy="24" r="2" fill="#FFE600" />
      <circle cx="28" cy="24" r="2" fill="#FFE600" />
    </svg>
  );
}

// 9. Cyborg / Mecha
export function AvatarCyborgSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#18181B" {...STROKE} />
      {/* Half Human / Half Mecha Face */}
      <rect x="14" y="14" width="20" height="22" rx="4" fill="#71717A" {...STROKE} />
      {/* Cybernetic Mono-Lens Visor */}
      <rect x="14" y="20" width="20" height="6" fill="#EF4444" {...STROKE} />
      <line x1="22" y1="23" x2="26" y2="23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      {/* Ear Headset Antenna */}
      <rect x="34" y="20" width="4" height="8" rx="1" fill="#FFE600" {...STROKE} />
    </svg>
  );
}

// 10. Glitch Arcade Hunter
export function AvatarGlitchSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="21" fill="#4C1D95" {...STROKE} />
      {/* 8-bit Pixelated Alien Invader / Glitch Face */}
      <rect x="14" y="14" width="20" height="20" fill="#00FF66" {...STROKE} />
      <rect x="16" y="18" width="4" height="4" fill="#000000" />
      <rect x="28" y="18" width="4" height="4" fill="#000000" />
      <rect x="18" y="26" width="12" height="3" fill="#000000" />
      {/* Cyan & Pink Pixel Shift Glitch Lines */}
      <rect x="10" y="22" width="6" height="3" fill="#00F5FF" />
      <rect x="32" y="18" width="6" height="3" fill="#FF0055" />
    </svg>
  );
}

export const AVATAR_SVG_MAP = {
  '🧙‍♂️': AvatarMageSvg,
  '🥷': AvatarNinjaSvg,
  '🗡️': AvatarSwordsmanSvg,
  '👑': AvatarKingSvg,
  '🏹': AvatarArcherSvg,
  '🐺': AvatarWolfSvg,
  '⚡': AvatarStormSvg,
  '🐉': AvatarDragonSvg,
  '🤖': AvatarCyborgSvg,
  '👾': AvatarGlitchSvg,

  mage: AvatarMageSvg,
  ninja: AvatarNinjaSvg,
  swordsman: AvatarSwordsmanSvg,
  king: AvatarKingSvg,
  archer: AvatarArcherSvg,
  wolf: AvatarWolfSvg,
  storm: AvatarStormSvg,
  dragon: AvatarDragonSvg,
  cyborg: AvatarCyborgSvg,
  glitch: AvatarGlitchSvg
};
