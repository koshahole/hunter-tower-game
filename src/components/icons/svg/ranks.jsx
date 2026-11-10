import React from 'react';

const STROKE = {
  stroke: '#000000',
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export function RankBadgeSvg({ rank = 'E', className = 'w-full h-full', ...props }) {
  const normRank = String(rank).toUpperCase().replace(/[^EDCBAS]/g, '') || 'E';

  const CONFIG = {
    E: {
      color: '#9CA3AF',
      accent: '#6B7280',
      text: '#111827',
      shield: 'polygon(24 2, 42 10, 38 36, 24 46, 10 36, 6 10)',
      decor: null
    },
    D: {
      color: '#10B981',
      accent: '#059669',
      text: '#064E3B',
      decor: 'wings'
    },
    C: {
      color: '#00F5FF',
      accent: '#0284C7',
      text: '#0C4A6E',
      decor: 'laurel'
    },
    B: {
      color: '#B026FF',
      accent: '#7A00CC',
      text: '#3B0764',
      decor: 'diamond'
    },
    A: {
      color: '#FF8800',
      accent: '#D97706',
      text: '#451A03',
      decor: 'crown'
    },
    S: {
      color: '#FFE600',
      accent: '#FF0055',
      text: '#000000',
      decor: 'starburst'
    }
  }[normRank] || { color: '#9CA3AF', accent: '#6B7280', text: '#111827' };

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Drop Shadow Shield */}
      <polygon points="26,6 44,14 40,38 26,48 12,38 8,14" fill="#000000" />
      {/* Main Heraldic Shield Plate */}
      <polygon points="24,4 42,12 38,36 24,46 10,36 6,12" fill={CONFIG.color} {...STROKE} />
      {/* Beveled Bottom Section */}
      <polygon points="24,46 10,36 24,24 38,36" fill={CONFIG.accent} stroke="#000000" strokeWidth="1.5" />

      {/* Rank Specific Insignia Accents */}
      {normRank === 'S' && (
        <>
          <polygon points="24,2 26,8 22,8" fill="#FF0055" />
          <circle cx="24" cy="14" r="2" fill="#FFFFFF" />
        </>
      )}

      {/* Bold Stylized Letter */}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        dominantBaseline="central"
        fill={CONFIG.text}
        stroke="#000000"
        strokeWidth="1.5"
        paintOrder="stroke fill"
        fontWeight="900"
        fontSize="22"
        fontFamily="Impact, sans-serif"
      >
        {normRank}
      </text>

      {/* Specular Shield Glint */}
      <line x1="12" y1="16" x2="16" y2="30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export const RANK_SVG_MAP = {
  E: (props) => <RankBadgeSvg rank="E" {...props} />,
  D: (props) => <RankBadgeSvg rank="D" {...props} />,
  C: (props) => <RankBadgeSvg rank="C" {...props} />,
  B: (props) => <RankBadgeSvg rank="B" {...props} />,
  A: (props) => <RankBadgeSvg rank="A" {...props} />,
  S: (props) => <RankBadgeSvg rank="S" {...props} />
};
