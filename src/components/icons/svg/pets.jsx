import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const RARITY_AURAS = {
  common: { rim: '#6B7280', fill: '#374151', glow: '#9CA3AF' },
  rare: { rim: '#00F5FF', fill: '#005577', glow: '#80FAFF' },
  epic: { rim: '#B026FF', fill: '#3B0066', glow: '#E080FF' },
  legendary: { rim: '#FFE600', fill: '#FF8800', glow: '#FFFDF0' }
};

/**
 * Pet Auras & Backdrops
 */
export function PetAuraRing({ rarity = 'common' }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <>
      <circle cx="24" cy="24" r="22" fill={aura.fill} opacity="0.3" />
      <circle cx="24" cy="24" r="21" fill="none" stroke={aura.rim} strokeWidth="2" strokeDasharray={rarity === 'legendary' ? '4 2' : 'none'} />
      {rarity === 'legendary' && (
        <>
          <polygon points="24,2 26,6 22,6" fill="#FFE600" />
          <polygon points="24,46 26,42 22,42" fill="#FFE600" />
          <polygon points="2,24 6,26 6,22" fill="#FFE600" />
          <polygon points="46,24 42,26 42,22" fill="#FFE600" />
        </>
      )}
    </>
  );
}

/**
 * 1. Canine / Wolf / Hound Pet Family
 */
export function PetCanineSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Wolf Snout and Head */}
      <polygon points="12,20 8,10 18,16" fill="#4B5563" {...STROKE} />
      <polygon points="36,20 40,10 30,16" fill="#4B5563" {...STROKE} />
      <polygon points="14,18 24,12 34,18 36,32 24,42 12,32" fill="#6B7280" {...STROKE} />
      {/* Cheek Tufts */}
      <polygon points="12,32 6,34 14,36" fill="#9CA3AF" {...STROKE} />
      <polygon points="36,32 42,34 34,36" fill="#9CA3AF" {...STROKE} />
      {/* Snout */}
      <polygon points="20,30 28,30 24,38" fill="#1F2937" {...STROKE} />
      {/* Glowing Feral Eyes */}
      <polygon points="17,24 22,25 18,27" fill={aura.glow} {...STROKE} />
      <polygon points="31,24 26,25 30,27" fill={aura.glow} {...STROKE} />
    </svg>
  );
}

/**
 * 2. Feline / Cat / Tiger / Lion Pet Family
 */
export function PetFelineSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Cat Triangular Ears */}
      <polygon points="12,18 10,8 20,14" fill="#F59E0B" {...STROKE} />
      <polygon points="36,18 38,8 28,14" fill="#F59E0B" {...STROKE} />
      <polygon points="12,16 11,10 18,14" fill="#FDE68A" />
      <polygon points="36,16 37,10 30,14" fill="#FDE68A" />
      {/* Rounded Face */}
      <circle cx="24" cy="26" r="14" fill="#FBBF24" {...STROKE} />
      {/* Big Expressive Anime Cat Eyes */}
      <ellipse cx="19" cy="24" rx="3.5" ry="4" fill="#111827" />
      <ellipse cx="29" cy="24" rx="3.5" ry="4" fill="#111827" />
      <circle cx="18" cy="22" r="1.5" fill="#FFFFFF" />
      <circle cx="28" cy="22" r="1.5" fill="#FFFFFF" />
      {/* Pink Triangular Nose & Whiskers */}
      <polygon points="23,29 25,29 24,31" fill="#F43F5E" />
      <line x1="12" y1="28" x2="6" y2="26" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="31" x2="6" y2="33" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="28" x2="42" y2="26" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="31" x2="42" y2="33" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 3. Avian / Bird / Owl / Hawk Pet Family
 */
export function PetAvianSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Feathered Crest */}
      <polygon points="22,12 24,4 26,12" fill={aura.glow} {...STROKE} />
      {/* Bird Head & Feathers */}
      <circle cx="24" cy="24" r="14" fill="#0284C7" {...STROKE} />
      {/* Sharp Raptor Eyes */}
      <circle cx="18" cy="22" r="4.5" fill="#FFE600" {...STROKE} />
      <circle cx="30" cy="22" r="4.5" fill="#FFE600" {...STROKE} />
      <circle cx="18" cy="22" r="2" fill="#000000" />
      <circle cx="30" cy="22" r="2" fill="#000000" />
      {/* Curved Hook Beak */}
      <polygon points="21,25 27,25 24,35" fill="#F59E0B" {...STROKE} />
    </svg>
  );
}

/**
 * 4. Rodent / Rabbit / Hedgehog / Mouse Pet Family
 */
export function PetRodentSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Tall Bunny / Critter Ears */}
      <ellipse cx="18" cy="12" rx="4" ry="10" fill="#E5E7EB" {...STROKE} />
      <ellipse cx="30" cy="12" rx="4" ry="10" fill="#E5E7EB" {...STROKE} />
      <ellipse cx="18" cy="12" rx="2" ry="7" fill="#F472B6" />
      <ellipse cx="30" cy="12" rx="2" ry="7" fill="#F472B6" />
      {/* Cute Head */}
      <circle cx="24" cy="28" r="13" fill="#F3F4F6" {...STROKE} />
      {/* Big Eyes */}
      <circle cx="19" cy="27" r="3" fill="#111827" />
      <circle cx="29" cy="27" r="3" fill="#111827" />
      <circle cx="18" cy="25" r="1" fill="#FFFFFF" />
      <circle cx="28" cy="25" r="1" fill="#FFFFFF" />
      {/* Buck Teeth */}
      <rect x="22" y="33" width="4" height="4" rx="0.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

/**
 * 5. Reptile / Snake / Frog / Turtle Pet Family
 */
export function PetReptileSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Scaled Viper / Frog Head */}
      <polygon points="14,24 24,14 34,24 28,38 20,38" fill="#10B981" {...STROKE} />
      {/* Slitted Reptilian Eyes */}
      <ellipse cx="18" cy="22" rx="3.5" ry="2.5" fill="#FFE600" {...STROKE} />
      <ellipse cx="30" cy="22" rx="3.5" ry="2.5" fill="#FFE600" {...STROKE} />
      <line x1="18" y1="20" x2="18" y2="24" stroke="#000000" strokeWidth="2" />
      <line x1="30" y1="20" x2="30" y2="24" stroke="#000000" strokeWidth="2" />
      {/* Forked Snake Tongue */}
      <path d="M24 38V44L21 46M24 44L27 46" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 6. Insect / Beetle / Spider / Bee Pet Family
 */
export function PetInsectSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Curved Antennae */}
      <path d="M20 16C16 10 10 10 8 12" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 16C32 10 38 10 40 12" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      {/* Shiny Chitin Carapace Shell */}
      <ellipse cx="24" cy="28" rx="13" ry="15" fill="#7C3AED" {...STROKE} />
      <line x1="24" y1="13" x2="24" y2="43" stroke="#000000" strokeWidth="2" />
      {/* Glowing Spots */}
      <circle cx="18" cy="24" r="2.5" fill={aura.glow} {...STROKE} />
      <circle cx="30" cy="24" r="2.5" fill={aura.glow} {...STROKE} />
      <circle cx="18" cy="34" r="2" fill={aura.glow} {...STROKE} />
      <circle cx="30" cy="34" r="2" fill={aura.glow} {...STROKE} />
    </svg>
  );
}

/**
 * 7. Aquatic / Fish / Shark / Octopus Pet Family
 */
export function PetAquaticSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Streamlined Fish Body */}
      <path d="M10 24C10 16 26 12 36 24C26 36 10 32 10 24Z" fill="#06B6D4" {...STROKE} />
      {/* Tail Fin */}
      <polygon points="10,24 2,16 6,24 2,32" fill="#0891B2" {...STROKE} />
      {/* Dorsal Fin */}
      <polygon points="22,14 26,6 30,14" fill="#0891B2" {...STROKE} />
      {/* Big Aquatic Eye */}
      <circle cx="30" cy="22" r="3.5" fill="#FFFFFF" {...STROKE} />
      <circle cx="31" cy="22" r="2" fill="#000000" />
      {/* Air Bubbles */}
      <circle cx="38" cy="18" r="1.5" fill="#E0F2FE" />
      <circle cx="42" cy="14" r="2" fill="#E0F2FE" />
    </svg>
  );
}

/**
 * 8. Mythical / Dragon / Phoenix / Unicorn Pet Family
 */
export function PetMythicSvg({ rarity = 'common', className = 'w-full h-full', ...props }) {
  const aura = RARITY_AURAS[rarity] || RARITY_AURAS.common;
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <PetAuraRing rarity={rarity} />
      {/* Spiral Golden Unicorn / Dragon Horn */}
      <polygon points="24,2 21,14 27,14" fill="#FFE600" {...STROKE} />
      {/* Dragon / Celestial Head */}
      <polygon points="14,20 24,14 34,20 30,36 18,36" fill="#4F46E5" {...STROKE} />
      {/* Mystic Glowing Eyes */}
      <polygon points="18,24 23,25 19,27" fill="#00F5FF" {...STROKE} />
      <polygon points="30,24 25,25 29,27" fill="#00F5FF" {...STROKE} />
      {/* Astral Forehead Rune */}
      <polygon points="24,17 26,20 24,23 22,20" fill={aura.glow} />
    </svg>
  );
}

/**
 * Family Classifier for 100 Pets
 */
export function resolvePetFamily(petOrEmoji) {
  const avatar = typeof petOrEmoji === 'object' && petOrEmoji ? (petOrEmoji.avatar || '') : String(petOrEmoji || '');
  const id = typeof petOrEmoji === 'object' && petOrEmoji ? (petOrEmoji.id || '') : '';

  // 1. Mythical / Dragon
  if (['🐲', '🐉', '🦄', '🐎', '🪵', '🗿', '⚡', '🌌'].some(k => avatar.includes(k)) || ['dragon', 'drake', 'unicorn', 'pegasus', 'treant', 'colossus'].some(k => id.includes(k))) {
    return PetMythicSvg;
  }
  // 2. Feline
  if (['🐱', '🐈', '🐯', '🦁', '🐆'].some(k => avatar.includes(k)) || ['kot', 'cat', 'tiger', 'lion', 'leopard'].some(k => id.includes(k))) {
    return PetFelineSvg;
  }
  // 3. Canine
  if (['🐺', '🐶', '🐕'].some(k => avatar.includes(k)) || ['volk', 'dog', 'hound', 'wolf', 'fenrir'].some(k => id.includes(k))) {
    return PetCanineSvg;
  }
  // 4. Avian
  if (['🐥', '🦉', '🦅', '🪿', '🐦', '🪶'].some(k => avatar.includes(k)) || ['owl', 'hawk', 'eagle', 'chick', 'bird', 'raven'].some(k => id.includes(k))) {
    return PetAvianSvg;
  }
  // 5. Rodent
  if (['🐰', '🦔', '🐭', '🐹', '🐿️', '🦫', '🦡', '🦦', '🐀'].some(k => avatar.includes(k)) || ['krolik', 'mouse', 'rat', 'beaver', 'badger', 'otter'].some(k => id.includes(k))) {
    return PetRodentSvg;
  }
  // 6. Reptile
  if (['🐸', '🐍', '🐢', '🐊', '🦎'].some(k => avatar.includes(k)) || ['snake', 'frog', 'turtle', 'lizard', 'reptile'].some(k => id.includes(k))) {
    return PetReptileSvg;
  }
  // 7. Insect
  if (['🪲', '🦗', '🐌', '🕷️', '🐜', '🐝', '🐞', '🐛', '🦂'].some(k => avatar.includes(k)) || ['beetle', 'spider', 'ant', 'bee', 'scorpion'].some(k => id.includes(k))) {
    return PetInsectSvg;
  }
  // 8. Aquatic
  if (['🐟', '🦈', '🐙', '🦑', '🦀', '🫧', '🐋'].some(k => avatar.includes(k)) || ['fish', 'shark', 'octopus', 'squid', 'crab', 'whale'].some(k => id.includes(k))) {
    return PetAquaticSvg;
  }

  // Default to Canine
  return PetCanineSvg;
}
