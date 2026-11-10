import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

/**
 * 10 DECADE EPIC BOSSES
 */

// Floor 10 Boss: Goblin King
export function BossGoblinKingSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow */}
      <circle cx="34" cy="36" r="22" fill="#000000" />
      {/* Goblin Head Shape */}
      <circle cx="32" cy="34" r="22" fill="#22C55E" {...STROKE} />
      {/* Pointy Left Ear */}
      <polygon points="12,32 2,22 14,26" fill="#16A34A" {...STROKE} />
      {/* Pointy Right Ear */}
      <polygon points="52,32 62,22 50,26" fill="#16A34A" {...STROKE} />
      {/* Golden Crown with Rubies */}
      <polygon points="18,22 24,10 32,18 40,10 46,22" fill="#FFE600" {...STROKE} />
      <circle cx="32" cy="18" r="2" fill="#FF0055" />
      {/* Slanted Angry Eyes */}
      <polygon points="20,30 29,34 22,36" fill="#FFE600" stroke="#000000" strokeWidth="2" />
      <polygon points="44,30 35,34 42,36" fill="#FFE600" stroke="#000000" strokeWidth="2" />
      <circle cx="25" cy="33" r="1.5" fill="#000000" />
      <circle cx="39" cy="33" r="1.5" fill="#000000" />
      {/* Crooked Nose */}
      <polygon points="32,34 29,42 35,42" fill="#15803D" {...STROKE} />
      {/* Snarl Mouth with Sharp Fangs */}
      <path d="M22 46C26 50 38 50 42 46" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <polygon points="26,45 28,40 30,45" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
      <polygon points="34,45 36,40 38,45" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
      {/* Warthog Tusks Upwards */}
      <polygon points="21,48 23,43 25,48" fill="#FFFDF0" stroke="#000000" strokeWidth="1.5" />
      <polygon points="39,48 41,43 43,48" fill="#FFFDF0" stroke="#000000" strokeWidth="1.5" />
    </svg>
  );
}

// Floor 20 Boss: Bone Lord
export function BossBoneLordSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shadow */}
      <circle cx="34" cy="34" r="22" fill="#000000" />
      {/* Horned Skeletal Crown Helm */}
      <polygon points="12,14 20,24 16,30" fill="#9CA3AF" {...STROKE} />
      <polygon points="52,14 44,24 48,30" fill="#9CA3AF" {...STROKE} />
      {/* Cranium */}
      <path d="M16 28C16 16 48 16 48 28C48 38 42 44 42 48H22C22 44 16 38 16 28Z" fill="#F3F4F6" {...STROKE} />
      {/* Glowing Crimson Void Eyes */}
      <polygon points="22,28 30,30 24,35" fill="#FF0055" {...STROKE} />
      <polygon points="42,28 34,30 40,35" fill="#FF0055" {...STROKE} />
      <circle cx="26" cy="31" r="1.5" fill="#FFFFFF" />
      <circle cx="37" cy="31" r="1.5" fill="#FFFFFF" />
      {/* Inverted Heart Nasal Cavity */}
      <polygon points="32,38 29,42 35,42" fill="#111827" />
      {/* Gritted Teeth */}
      <rect x="24" y="44" width="16" height="6" rx="1" fill="#FFFFFF" {...STROKE} />
      <line x1="28" y1="44" x2="28" y2="50" stroke="#000000" strokeWidth="2" />
      <line x1="32" y1="44" x2="32" y2="50" stroke="#000000" strokeWidth="2" />
      <line x1="36" y1="44" x2="36" y2="50" stroke="#000000" strokeWidth="2" />
      {/* Royal Crown Crest */}
      <polygon points="24,18 32,8 40,18" fill="#FFE600" {...STROKE} />
    </svg>
  );
}

// Floor 30 Boss: Magma Golem
export function BossMagmaGolemSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="34" cy="34" r="22" fill="#000000" />
      {/* Basalt Monolith Body */}
      <polygon points="18,16 46,16 52,48 12,48" fill="#1F2937" {...STROKE} />
      {/* Molten Lava Veins */}
      <path d="M22 18L28 30L22 46" stroke="#FF0055" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 18L28 30L22 46" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 20L36 32L40 46" stroke="#FF5500" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 20L36 32L40 46" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
      {/* Magma Visor Eyes */}
      <rect x="22" y="24" width="20" height="6" rx="2" fill="#FFE600" {...STROKE} />
      <circle cx="28" cy="27" r="2" fill="#FF0055" />
      <circle cx="36" cy="27" r="2" fill="#FF0055" />
      {/* Fiery Crown Spikes */}
      <polygon points="20,16 24,6 28,16" fill="#FF5500" {...STROKE} />
      <polygon points="29,16 32,4 35,16" fill="#FFE600" {...STROKE} />
      <polygon points="36,16 40,6 44,16" fill="#FF5500" {...STROKE} />
    </svg>
  );
}

// Floor 40 Boss: Spider Queen
export function BossSpiderQueenSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="34" cy="36" r="20" fill="#000000" />
      {/* 8 Creepy Jointed Spider Legs */}
      <path d="M18 28L6 18L2 30" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M18 36L4 36L2 46" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M46 28L58 18L62 30" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M46 36L60 36L62 46" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
      {/* Main Arachnid Abdomen */}
      <circle cx="32" cy="34" r="18" fill="#18181B" {...STROKE} />
      {/* Neon Poison Hourglass / Skull Pattern */}
      <polygon points="32,24 24,34 40,34" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
      <polygon points="32,42 26,34 38,34" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
      {/* Multi-Eyed Cluster */}
      <circle cx="28" cy="24" r="2.5" fill="#FF0055" {...STROKE} />
      <circle cx="36" cy="24" r="2.5" fill="#FF0055" {...STROKE} />
      <circle cx="24" cy="28" r="1.8" fill="#FF0055" />
      <circle cx="40" cy="28" r="1.8" fill="#FF0055" />
      {/* Venomous Chelicerae Fangs */}
      <path d="M26 44C26 52 30 54 28 56" stroke="#00FF66" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 44C38 52 34 54 36 56" stroke="#00FF66" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Floor 50 Boss: Abyss Dragon
export function BossAbyssDragonSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="34" cy="34" r="22" fill="#000000" />
      {/* Massive Curled Dragon Horns */}
      <path d="M20 22C12 14 8 4 6 2C16 6 22 14 24 20" fill="#3B0066" {...STROKE} />
      <path d="M44 22C52 14 56 4 58 2C48 6 42 14 40 20" fill="#3B0066" {...STROKE} />
      {/* Draconic Scaled Head */}
      <polygon points="32,14 48,26 44,48 32,54 20,48 16,26" fill="#1E1B4B" {...STROKE} />
      {/* Violet Scales Pattern */}
      <polygon points="32,20 40,28 32,36 24,28" fill="#7A00CC" stroke="#000000" strokeWidth="1.5" />
      {/* Piercing Amber Slitted Eyes */}
      <polygon points="23,30 29,32 24,35" fill="#00F5FF" {...STROKE} />
      <polygon points="41,30 35,32 40,35" fill="#00F5FF" {...STROKE} />
      <line x1="26" y1="30" x2="26" y2="35" stroke="#000000" strokeWidth="2" />
      <line x1="38" y1="30" x2="38" y2="35" stroke="#000000" strokeWidth="2" />
      {/* Void Breath Nostrils */}
      <circle cx="28" cy="46" r="2" fill="#000000" />
      <circle cx="36" cy="46" r="2" fill="#000000" />
      {/* Purple Plasma Plume */}
      <polygon points="32,48 28,58 32,54 36,58" fill="#B026FF" />
    </svg>
  );
}

// Floor 60 Boss: Cyber-Titan
export function BossCyberTitanSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect x="14" y="16" width="40" height="36" rx="6" fill="#000000" />
      {/* Main Mecha Armored Chassis */}
      <rect x="12" y="14" width="40" height="36" rx="6" fill="#374151" {...STROKE} />
      {/* High-Voltage Hazard Antennas */}
      <line x1="18" y1="14" x2="14" y2="4" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <circle cx="14" cy="4" r="3" fill="#00F5FF" {...STROKE} />
      <line x1="46" y1="14" x2="50" y2="4" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="4" r="3" fill="#00F5FF" {...STROKE} />
      {/* Hazard Warning Stripes (Yellow/Black) */}
      <rect x="16" y="18" width="32" height="6" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
      <line x1="22" y1="18" x2="26" y2="24" stroke="#000000" strokeWidth="2" />
      <line x1="30" y1="18" x2="34" y2="24" stroke="#000000" strokeWidth="2" />
      <line x1="38" y1="18" x2="42" y2="24" stroke="#000000" strokeWidth="2" />
      {/* Mono-Visor Scanning Beam */}
      <rect x="16" y="28" width="32" height="7" rx="2" fill="#111827" {...STROKE} />
      <rect x="26" y="30" width="12" height="3" rx="1" fill="#00F5FF" />
      {/* Speaker / Grill Mouth */}
      <line x1="22" y1="42" x2="42" y2="42" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="46" x2="40" y2="46" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Floor 70 Boss: Cursed Midas
export function BossCursedMidasSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="34" cy="34" r="22" fill="#000000" />
      {/* Solid Gold Demonic Idol Face */}
      <circle cx="32" cy="32" r="22" fill="#FFB800" {...STROKE} />
      {/* Crown Inlaid with Greed Gems */}
      <polygon points="16,20 22,8 32,16 42,8 48,20" fill="#FFE600" {...STROKE} />
      <circle cx="32" cy="18" r="2.5" fill="#00F5FF" />
      {/* Golden Slitted Eyes */}
      <polygon points="20,28 30,30 22,34" fill="#FFFFFF" {...STROKE} />
      <polygon points="44,28 34,30 42,34" fill="#FFFFFF" {...STROKE} />
      <circle cx="25" cy="30" r="1.5" fill="#B45309" />
      <circle cx="39" cy="30" r="1.5" fill="#B45309" />
      {/* Dripping Molten Gold Droplets */}
      <circle cx="22" cy="46" r="3" fill="#FFE600" {...STROKE} />
      <circle cx="32" cy="50" r="4" fill="#FFE600" {...STROKE} />
      <circle cx="42" cy="46" r="3" fill="#FFE600" {...STROKE} />
      {/* Greedy Gold-Coin Grin */}
      <path d="M22 40C26 46 38 46 42 40" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Floor 80 Boss: Fallen Archangel
export function BossFallenArchangelSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Dark Razor Feathered Wings */}
      <path d="M18 34C8 26 4 10 2 6C14 16 18 24 22 30" fill="#18181B" {...STROKE} />
      <path d="M46 34C56 26 60 10 62 6C50 16 46 24 42 30" fill="#18181B" {...STROKE} />
      {/* Seraph Halo with Lightning Arcs */}
      <ellipse cx="32" cy="12" rx="16" ry="5" fill="none" stroke="#FFE600" strokeWidth="3" />
      <polygon points="32,4 34,10 32,8 30,10" fill="#00F5FF" />
      {/* Pale Seraph Face */}
      <path d="M20 22C20 14 44 14 44 22C44 36 38 44 32 46C26 44 20 36 20 22Z" fill="#F43F5E" {...STROKE} />
      {/* Judgment Blindfold Ribbon */}
      <rect x="18" y="24" width="28" height="8" rx="2" fill="#111827" {...STROKE} />
      {/* Runic Golden Cross on Blindfold */}
      <line x1="32" y1="25" x2="32" y2="31" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="28" x2="35" y2="28" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
      {/* Single Crimson Tear */}
      <circle cx="28" cy="38" r="1.5" fill="#FF0055" />
    </svg>
  );
}

// Floor 90 Boss: Shadow Monarch
export function BossShadowMonarchSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="34" cy="34" r="24" fill="#000000" />
      {/* Midnight Void Cowl Silhouette */}
      <path d="M12 54C12 28 20 8 32 8C44 8 52 28 52 54Z" fill="#09090B" {...STROKE} />
      {/* Wisps of Shadow Smoke */}
      <path d="M16 46C14 36 18 24 22 18" stroke="#7A00CC" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 46C50 36 46 24 42 18" stroke="#7A00CC" strokeWidth="3" strokeLinecap="round" />
      {/* Glowing Midnight Sapphire Eyes */}
      <polygon points="22,30 30,32 23,36" fill="#00F5FF" {...STROKE} />
      <polygon points="42,30 34,32 41,36" fill="#00F5FF" {...STROKE} />
      <circle cx="25" cy="32" r="1.5" fill="#FFFFFF" />
      <circle cx="39" cy="32" r="1.5" fill="#FFFFFF" />
      {/* Floating Occult Rune Collar */}
      <polygon points="32,44 26,50 32,56 38,50" fill="#9D00FF" {...STROKE} />
    </svg>
  );
}

// Floor 100 Boss: Tower Sovereign (The Creator)
export function BossTowerSovereignSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Cosmic Astral Vortex Disk */}
      <circle cx="32" cy="32" r="26" fill="#3B0066" {...STROKE} />
      <circle cx="32" cy="32" r="20" fill="#00F5FF" {...STROKE} />
      <circle cx="32" cy="32" r="14" fill="#FFE600" {...STROKE} />
      {/* All-Seeing Radiant Golden Eye */}
      <path d="M14 32C18 20 46 20 50 32C46 44 18 44 14 32Z" fill="#FFFFFF" {...STROKE} />
      <circle cx="32" cy="32" r="8" fill="#111827" {...STROKE} />
      <circle cx="32" cy="32" r="4" fill="#9D00FF" />
      <circle cx="30" cy="30" r="2" fill="#FFFFFF" />
      {/* Crown of the Omniverse */}
      <polygon points="18,16 26,4 32,12 38,4 46,16" fill="#FFE600" {...STROKE} />
      <circle cx="32" cy="8" r="2" fill="#FF0055" />
      {/* Cosmic Floating Stars */}
      <polygon points="12,18 14,22 10,22" fill="#FFFFFF" />
      <polygon points="52,18 54,22 50,22" fill="#FFFFFF" />
      <polygon points="32,54 34,58 30,58" fill="#FFE600" />
    </svg>
  );
}

/**
 * 15 REGULAR MONSTERS
 */

export function MonsterSlimeSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Acid Green Blob */}
      <path d="M10 38C8 28 14 16 24 16C34 16 40 28 38 38C38 44 10 44 10 38Z" fill="#00FF66" {...STROKE} />
      {/* Cute/Evil Derp Eyes */}
      <circle cx="19" cy="28" r="3.5" fill="#111827" />
      <circle cx="29" cy="28" r="3.5" fill="#111827" />
      <circle cx="18" cy="26" r="1.5" fill="#FFFFFF" />
      <circle cx="28" cy="26" r="1.5" fill="#FFFFFF" />
      {/* Specular Slime Glint */}
      <ellipse cx="20" cy="20" rx="4" ry="2" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

export function MonsterGoblinSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="26" r="14" fill="#22C55E" {...STROKE} />
      {/* Pointy Ears */}
      <polygon points="12,24 4,18 13,20" fill="#16A34A" {...STROKE} />
      <polygon points="36,24 44,18 35,20" fill="#16A34A" {...STROKE} />
      {/* Red Scout Bandana */}
      <path d="M12 18H36L34 22H14L12 18Z" fill="#DC2626" {...STROKE} />
      {/* Feral Eyes */}
      <polygon points="18,24 23,26 19,28" fill="#FFE600" {...STROKE} />
      <polygon points="30,24 25,26 29,28" fill="#FFE600" {...STROKE} />
      {/* Sharp Tooth */}
      <polygon points="23,34 25,31 27,34" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

export function MonsterRatSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Sewer Rat Head */}
      <polygon points="12,32 38,32 44,24 24,14" fill="#6B7280" {...STROKE} />
      {/* Round Ears */}
      <circle cx="16" cy="14" r="5" fill="#F472B6" {...STROKE} />
      {/* Mutant Red Glow Eye */}
      <circle cx="32" cy="22" r="2.5" fill="#FF0055" {...STROKE} />
      {/* Sharp Whisker Needles */}
      <line x1="38" y1="28" x2="46" y2="26" stroke="#000000" strokeWidth="2" />
      <line x1="38" y1="30" x2="45" y2="33" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

export function MonsterSkeletonSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Skull */}
      <path d="M14 22C14 12 34 12 34 22C34 30 30 34 30 38H18C18 34 14 30 14 22Z" fill="#E5E7EB" {...STROKE} />
      {/* Dark Eye Sockets */}
      <circle cx="20" cy="22" r="3.5" fill="#111827" />
      <circle cx="28" cy="22" r="3.5" fill="#111827" />
      {/* Teeth */}
      <line x1="21" y1="35" x2="21" y2="38" stroke="#000000" strokeWidth="2" />
      <line x1="24" y1="35" x2="24" y2="38" stroke="#000000" strokeWidth="2" />
      <line x1="27" y1="35" x2="27" y2="38" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

export function MonsterImpSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="26" r="14" fill="#78716C" {...STROKE} />
      {/* Obsidian Horns */}
      <polygon points="16,18 12,8 20,14" fill="#1C1917" {...STROKE} />
      <polygon points="32,18 36,8 28,14" fill="#1C1917" {...STROKE} />
      {/* Yellow Glowing Eyes */}
      <polygon points="18,24 23,26 18,28" fill="#FFE600" {...STROKE} />
      <polygon points="30,24 25,26 30,28" fill="#FFE600" {...STROKE} />
      {/* Sneering Fangs */}
      <path d="M19 32C22 36 26 36 29 32" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MonsterBatSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Scalloped Wings */}
      <path d="M18 26C10 20 6 12 4 12C8 22 10 32 18 34" fill="#581C87" {...STROKE} />
      <path d="M30 26C38 20 42 12 44 12C40 22 38 32 30 34" fill="#581C87" {...STROKE} />
      {/* Bat Body */}
      <ellipse cx="24" cy="28" rx="7" ry="10" fill="#3B0764" {...STROKE} />
      {/* Vampire Fangs */}
      <circle cx="21" cy="26" r="1.5" fill="#FF0055" />
      <circle cx="27" cy="26" r="1.5" fill="#FF0055" />
      <polygon points="22,32 23,35 24,32" fill="#FFFFFF" />
      <polygon points="25,32 26,35 27,32" fill="#FFFFFF" />
    </svg>
  );
}

export function MonsterHellhoundSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="26" r="15" fill="#18181B" {...STROKE} />
      {/* Flaming Mane */}
      <polygon points="14,14 18,6 22,14" fill="#FF5500" {...STROKE} />
      <polygon points="22,14 26,4 30,14" fill="#FFE600" {...STROKE} />
      <polygon points="30,14 34,6 36,14" fill="#FF5500" {...STROKE} />
      {/* Glowing Hellfire Eyes */}
      <polygon points="18,24 23,26 19,28" fill="#FF0055" {...STROKE} />
      <polygon points="30,24 25,26 29,28" fill="#FF0055" {...STROKE} />
      {/* Spiked Iron Collar */}
      <rect x="13" y="36" width="22" height="5" rx="1" fill="#DC2626" {...STROKE} />
      <polygon points="18,36 19,33 20,36" fill="#FFFFFF" />
      <polygon points="28,36 29,33 30,36" fill="#FFFFFF" />
    </svg>
  );
}

export function MonsterDarkMageSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Occult Hood */}
      <polygon points="24,6 10,40 38,40" fill="#3B0764" {...STROKE} />
      {/* Void Face Shadow */}
      <polygon points="24,18 16,36 32,36" fill="#000000" />
      {/* Glowing Occult Eyes */}
      <circle cx="20" cy="28" r="2" fill="#9D00FF" />
      <circle cx="28" cy="28" r="2" fill="#9D00FF" />
      {/* Forehead Runic Glyph */}
      <circle cx="24" cy="22" r="1.5" fill="#00F5FF" />
    </svg>
  );
}

export function MonsterIronGuardianSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect x="12" y="12" width="24" height="26" rx="4" fill="#4B5563" {...STROKE} />
      {/* Rivet Screws */}
      <circle cx="15" cy="15" r="1.5" fill="#000000" />
      <circle cx="33" cy="15" r="1.5" fill="#000000" />
      {/* Red Automaton Visor */}
      <rect x="16" y="20" width="16" height="5" rx="1" fill="#FF0055" {...STROKE} />
      {/* Vent Grill */}
      <line x1="18" y1="30" x2="30" y2="30" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="34" x2="28" y2="34" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MonsterVampireSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* High Crimson Aristocrat Collar */}
      <polygon points="8,14 16,36 32,36 40,14 24,24" fill="#DC2626" {...STROKE} />
      {/* Pale Vampire Face */}
      <circle cx="24" cy="22" r="10" fill="#FEE2E2" {...STROKE} />
      {/* Slicked Black Hair */}
      <path d="M15 18C17 12 31 12 33 18L24 16L15 18Z" fill="#111827" />
      {/* Red Eyes & Fangs */}
      <circle cx="20" cy="22" r="1.5" fill="#FF0055" />
      <circle cx="28" cy="22" r="1.5" fill="#FF0055" />
      <polygon points="22,27 23,30 24,27" fill="#FFFFFF" />
      <polygon points="24,27 25,30 26,27" fill="#FFFFFF" />
    </svg>
  );
}

export function MonsterFrostWraithSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Swirling Ice Specter */}
      <path d="M14 42C12 24 16 10 24 10C32 10 36 24 34 42C30 40 28 44 24 40C20 44 18 40 14 42Z" fill="#E0F2FE" {...STROKE} />
      {/* Cyan Cold Eyes */}
      <circle cx="20" cy="24" r="2.5" fill="#00F5FF" {...STROKE} />
      <circle cx="28" cy="24" r="2.5" fill="#00F5FF" {...STROKE} />
      {/* Floating Ice Crystals */}
      <polygon points="10,18 12,22 8,22" fill="#38BDF8" />
      <polygon points="38,18 40,22 36,22" fill="#38BDF8" />
    </svg>
  );
}

export function MonsterAssassinSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Ninja Hood */}
      <circle cx="24" cy="24" r="15" fill="#111827" {...STROKE} />
      {/* Scarf Slit */}
      <rect x="14" y="20" width="20" height="8" rx="2" fill="#1F2937" {...STROKE} />
      {/* Glaring Cold Eyes */}
      <polygon points="17,23 22,24 18,26" fill="#FACC15" {...STROKE} />
      <polygon points="31,23 26,24 30,26" fill="#FACC15" {...STROKE} />
    </svg>
  );
}

export function MonsterAbyssKnightSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Black Iron Helm */}
      <polygon points="12,18 24,10 36,18 34,40 14,40" fill="#18181B" {...STROKE} />
      {/* Visor Cross Slit with Violet Glow */}
      <line x1="18" y1="26" x2="30" y2="26" stroke="#9D00FF" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="20" x2="24" y2="34" stroke="#9D00FF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function MonsterChaosDraconidSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Dragonkin Head */}
      <polygon points="14,24 24,12 34,24 30,40 18,40" fill="#B91C1C" {...STROKE} />
      {/* Horns */}
      <polygon points="18,16 12,6 20,12" fill="#7F1D1D" {...STROKE} />
      <polygon points="30,16 36,6 28,12" fill="#7F1D1D" {...STROKE} />
      {/* Fiery Slit Eyes */}
      <polygon points="19,26 23,27 20,29" fill="#FFE600" />
      <polygon points="29,26 25,27 28,29" fill="#FFE600" />
      {/* Smoke from Snout */}
      <circle cx="21" cy="35" r="1.5" fill="#000000" />
      <circle cx="27" cy="35" r="1.5" fill="#000000" />
    </svg>
  );
}

export function MonsterExecutionerSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Hooded Executioner */}
      <polygon points="24,8 10,42 38,42" fill="#27272A" {...STROKE} />
      {/* Single Cosmic Eye */}
      <circle cx="24" cy="26" r="6" fill="#111827" {...STROKE} />
      <circle cx="24" cy="26" r="3.5" fill="#00F5FF" />
      <circle cx="24" cy="26" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export const MONSTER_SVG_MAP = {
  // Bosses
  boss_10: BossGoblinKingSvg,
  boss_20: BossBoneLordSvg,
  boss_30: BossMagmaGolemSvg,
  boss_40: BossSpiderQueenSvg,
  boss_50: BossAbyssDragonSvg,
  boss_60: BossCyberTitanSvg,
  boss_70: BossCursedMidasSvg,
  boss_80: BossFallenArchangelSvg,
  boss_90: BossShadowMonarchSvg,
  boss_100: BossTowerSovereignSvg,

  // Regular Monsters
  'Пещерный Слизень': MonsterSlimeSvg,
  'Гоблин-Разведчик': MonsterGoblinSvg,
  'Крыса-Мутант': MonsterRatSvg,
  'Скелет-Мечник': MonsterSkeletonSvg,
  'Каменный Бес': MonsterImpSvg,
  'Призрачная Летучая Мышь': MonsterBatSvg,
  'Адская Гончая': MonsterHellhoundSvg,
  'Темный Маг': MonsterDarkMageSvg,
  'Железный Страж': MonsterIronGuardianSvg,
  'Вампир-Дуэлянт': MonsterVampireSvg,
  'Ледяной Призрак': MonsterFrostWraithSvg,
  'Теневой Ассасин': MonsterAssassinSvg,
  'Рыцарь Бездны': MonsterAbyssKnightSvg,
  'Драконид Хаоса': MonsterChaosDraconidSvg,
  'Астральный Палач': MonsterExecutionerSvg
};
