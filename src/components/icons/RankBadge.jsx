import React from 'react';
import { RankBadgeSvg } from './svg/ranks';
import { SIZE_PRESETS } from './CurrencyIcon';

export default function RankBadge({
  rank = 'E',
  size = 'md',
  showLabel = false,
  className = '',
  inline = false,
  ...props
}) {
  const normRank = String(rank || 'E').toUpperCase().replace(/[^EDCBAS]/g, '') || 'E';
  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-5 h-5');
  const inlineClass = inline ? 'inline-block align-middle -mt-0.5' : 'inline-flex';

  return (
    <span className={`${inlineClass} items-center gap-1.5 ${className}`} {...props}>
      <span className={`inline-flex items-center justify-center ${sizeClass}`}>
        <RankBadgeSvg rank={normRank} className="w-full h-full object-contain filter drop-shadow" />
      </span>
      {showLabel && (
        <span className="font-black text-xs tracking-wider uppercase">
          {normRank}-РАНГ
        </span>
      )}
    </span>
  );
}
