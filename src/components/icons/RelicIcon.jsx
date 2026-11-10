import React from 'react';
import { RELIC_SVG_MAP, PotionBundleRelicSvg } from './svg/relics';
import { SIZE_PRESETS } from './CurrencyIcon';

export default function RelicIcon({
  relic,
  relicId,
  size = 'lg',
  className = '',
  inline = false,
  ...props
}) {
  const key = relicId || relic?.id || (typeof relic === 'string' ? relic : '');
  const SvgComponent = RELIC_SVG_MAP[key] || PotionBundleRelicSvg;

  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-7 h-7');
  const inlineClass = inline ? 'inline-block align-middle -mt-0.5' : 'inline-flex';

  return (
    <span className={`${inlineClass} items-center justify-center ${sizeClass} ${className}`} {...props}>
      <SvgComponent className="w-full h-full object-contain filter drop-shadow" />
    </span>
  );
}
