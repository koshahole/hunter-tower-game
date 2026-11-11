import React from 'react';
import {
  GoldCoinSvg,
  CrystalShardSvg,
  SoulOrbSvg,
  EnergyCellSvg,
  HealthPotionSvg,
  ReviveFeatherSvg,
  StarBadgeSvg
} from './svg/currencies';

export const SIZE_PRESETS = {
  xs: 'w-4 h-4 min-w-[16px]',
  sm: 'w-5 h-5 min-w-[20px]',
  md: 'w-6 h-6 min-w-[24px]',
  lg: 'w-8 h-8 min-w-[32px]',
  xl: 'w-10 h-10 min-w-[40px]',
  '2xl': 'w-12 h-12 min-w-[48px]',
  '3xl': 'w-16 h-16 min-w-[64px]',
  full: 'w-full h-full'
};

export default function CurrencyIcon({
  type = 'gold',
  size = 'md',
  className = '',
  inline = false,
  ...props
}) {
  const normType = String(type || '').trim().toLowerCase();
  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-5 h-5');
  const inlineClass = inline ? 'inline-block align-middle -mt-0.5' : 'inline-flex items-center justify-center';

  let SvgComponent = GoldCoinSvg;

  if (normType.includes('gold') || normType.includes('coin') || normType.includes('🪙')) {
    SvgComponent = GoldCoinSvg;
  } else if (normType.includes('cryst') || normType.includes('gem') || normType.includes('💎')) {
    SvgComponent = CrystalShardSvg;
  } else if (normType.includes('soul') || normType.includes('души') || normType.includes('🔮')) {
    SvgComponent = SoulOrbSvg;
  } else if (normType.includes('energy') || normType.includes('энерг') || normType.includes('⚡')) {
    SvgComponent = EnergyCellSvg;
  } else if (normType.includes('potion') || normType.includes('зель') || normType.includes('🧪')) {
    SvgComponent = HealthPotionSvg;
  } else if (normType.includes('revive') || normType.includes('feather') || normType.includes('перо') || normType.includes('🪶')) {
    SvgComponent = ReviveFeatherSvg;
  } else if (normType.includes('star') || normType.includes('звезд') || normType.includes('⭐️') || normType.includes('⭐')) {
    SvgComponent = StarBadgeSvg;
  }

  return (
    <span className={`${inlineClass} ${sizeClass} ${className}`} {...props}>
      <SvgComponent className="w-full h-full object-contain" />
    </span>
  );
}
