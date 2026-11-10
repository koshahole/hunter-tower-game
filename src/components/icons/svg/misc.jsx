import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export function TrophySvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Heavy Base */}
      <rect x="14" y="38" width="20" height="6" rx="2" fill="#1F2937" {...STROKE} />
      <polygon points="20,38 28,38 26,30 22,30" fill="#B45309" {...STROKE} />
      {/* Cup Handles */}
      <path d="M14 16C8 16 8 26 16 26" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M14 16C8 16 8 26 16 26" stroke="#FFAA00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M34 16C40 16 40 26 32 26" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M34 16C40 16 40 26 32 26" stroke="#FFAA00" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Golden Goblet Body */}
      <path d="M14 10H34V20C34 28 24 30 24 30C24 30 14 28 14 20V10Z" fill="#FFE600" {...STROKE} />
      {/* Star Emblem on Cup */}
      <polygon points="24,14 26,19 31,19 27,22 28,27 24,24 20,27 21,22 17,19 22,19" fill="#FF8800" />
      {/* Specular Slash */}
      <line x1="18" y1="13" x2="18" y2="21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SkullSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Cranium Dome */}
      <path d="M12 22C12 10 36 10 36 22C36 32 30 34 30 38H18C18 34 12 32 12 22Z" fill="#F3F4F6" {...STROKE} />
      {/* Eye Sockets */}
      <circle cx="19" cy="22" r="4" fill="#111827" />
      <circle cx="29" cy="22" r="4" fill="#111827" />
      <polygon points="24,28 22,32 26,32" fill="#111827" />
      {/* Teeth */}
      <line x1="21" y1="34" x2="21" y2="38" stroke="#000000" strokeWidth="2" />
      <line x1="24" y1="34" x2="24" y2="38" stroke="#000000" strokeWidth="2" />
      <line x1="27" y1="34" x2="27" y2="38" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

export function HeartSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M24 40C24 40 8 30 8 18C8 11 14 7 19 9C22 10 24 13 24 13C24 13 26 10 29 9C34 7 40 11 40 18C40 30 24 40 24 40Z"
        fill="#FF0055"
        {...STROKE}
      />
      {/* Specular White Curve */}
      <path d="M12 17C12 13 15 11 18 11" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChestSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Chest Box Lower Body */}
      <rect x="8" y="20" width="32" height="20" rx="3" fill="#78350F" {...STROKE} />
      {/* Chest Lid */}
      <path d="M6 18C6 12 42 12 42 18H6Z" fill="#92400E" {...STROKE} />
      {/* Iron Brackets */}
      <rect x="14" y="20" width="4" height="20" fill="#374151" stroke="#000000" strokeWidth="1.5" />
      <rect x="30" y="20" width="4" height="20" fill="#374151" stroke="#000000" strokeWidth="1.5" />
      {/* Gold Center Keyhole Latch */}
      <rect x="21" y="17" width="6" height="8" rx="1.5" fill="#FFE600" {...STROKE} />
      <circle cx="24" cy="20" r="1.5" fill="#000000" />
    </svg>
  );
}

export function ScrollSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Rolled Ancient Parchment */}
      <path d="M12 10C8 10 8 16 12 16H36C40 16 40 10 36 10H12Z" fill="#FDE68A" {...STROKE} />
      <rect x="10" y="14" width="28" height="24" fill="#FEF3C7" stroke="#000000" strokeWidth="2" />
      <path d="M12 38C8 38 8 44 12 44H36C40 44 40 38 36 38H12Z" fill="#FDE68A" {...STROKE} />
      {/* Scribble Text Lines */}
      <line x1="16" y1="20" x2="32" y2="20" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="26" x2="28" y2="26" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="32" x2="30" y2="32" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TentSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Camp Checkpoint Tent */}
      <polygon points="24,6 42,38 6,38" fill="#059669" {...STROKE} />
      {/* Tent Flap Door Opening */}
      <polygon points="24,18 34,38 14,38" fill="#064E3B" {...STROKE} />
      {/* Lantern Hanging in Tent */}
      <circle cx="24" cy="26" r="2.5" fill="#FFE600" />
    </svg>
  );
}

export function SparkleSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <polygon points="24,4 28,18 42,24 28,30 24,44 20,30 6,24 20,18" fill="#FFE600" {...STROKE} />
      <circle cx="34" cy="10" r="2" fill="#00F5FF" />
      <circle cx="12" cy="36" r="2" fill="#FF0055" />
    </svg>
  );
}

export function TargetSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="24" r="18" fill="#EF4444" {...STROKE} />
      <circle cx="24" cy="24" r="12" fill="#FFFFFF" {...STROKE} />
      <circle cx="24" cy="24" r="6" fill="#EF4444" {...STROKE} />
      <circle cx="24" cy="24" r="2" fill="#FFFFFF" />
    </svg>
  );
}

export function WindSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M6 18H28C32 18 34 14 31 12C28 10 26 13 28 15" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M10 26H36C40 26 42 22 39 20C36 18 34 21 36 23" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M8 34H22C26 34 28 30 25 28C22 26 20 29 22 31" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function BloodSvg({ className = 'w-full h-full', ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M24 6C24 6 12 20 12 28C12 35 17 40 24 40C31 40 36 35 36 28C36 20 24 6 24 6Z" fill="#DC2626" {...STROKE} />
      <circle cx="20" cy="24" r="2" fill="#FFAACC" />
    </svg>
  );
}

export const MISC_SVG_MAP = {
  trophy: TrophySvg,
  skull: SkullSvg,
  heart: HeartSvg,
  chest: ChestSvg,
  scroll: ScrollSvg,
  tent: TentSvg,
  sparkle: SparkleSvg,
  target: TargetSvg,
  wind: WindSvg,
  blood: BloodSvg,

  '🏆': TrophySvg,
  '💀': SkullSvg,
  '❤️': HeartSvg,
  '📜': ScrollSvg,
  '⛺': TentSvg,
  '✨': SparkleSvg,
  '🎯': TargetSvg,
  '💨': WindSvg,
  '🩸': BloodSvg
};
