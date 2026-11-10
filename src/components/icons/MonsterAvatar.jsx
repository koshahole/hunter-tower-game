import React from 'react';
import {
  MONSTER_SVG_MAP,
  BossGoblinKingSvg,
  BossBoneLordSvg,
  BossMagmaGolemSvg,
  BossSpiderQueenSvg,
  BossAbyssDragonSvg,
  BossCyberTitanSvg,
  BossCursedMidasSvg,
  BossFallenArchangelSvg,
  BossShadowMonarchSvg,
  BossTowerSovereignSvg,
  MonsterSlimeSvg
} from './svg/monsters';
import { SIZE_PRESETS } from './CurrencyIcon';

const BOSS_BY_FLOOR = {
  10: BossGoblinKingSvg,
  20: BossBoneLordSvg,
  30: BossMagmaGolemSvg,
  40: BossSpiderQueenSvg,
  50: BossAbyssDragonSvg,
  60: BossCyberTitanSvg,
  70: BossCursedMidasSvg,
  80: BossFallenArchangelSvg,
  90: BossShadowMonarchSvg,
  100: BossTowerSovereignSvg
};

export default function MonsterAvatar({
  monster,
  isBoss = false,
  floor,
  size = '3xl',
  animated = false,
  isHurt = false,
  isAttacking = false,
  isStunned = false,
  className = '',
  ...props
}) {
  const resolvedIsBoss = isBoss || monster?.isBoss || (monster?.id && String(monster.id).startsWith('boss_'));
  const currentFloor = floor || monster?.floor || (monster?.id ? parseInt(String(monster.id).replace('boss_', ''), 10) : 1);

  let SvgComponent = null;

  if (resolvedIsBoss) {
    const bossKey = Math.floor(currentFloor / 10) * 10 || 10;
    SvgComponent = BOSS_BY_FLOOR[bossKey] || BossTowerSovereignSvg;
  } else {
    const name = monster?.name || '';
    SvgComponent = MONSTER_SVG_MAP[name];

    if (!SvgComponent && monster?.avatar) {
      // Look up by matching avatar fragment
      for (const [k, comp] of Object.entries(MONSTER_SVG_MAP)) {
        if (name.includes(k) || k.includes(name)) {
          SvgComponent = comp;
          break;
        }
      }
    }
  }

  if (!SvgComponent) {
    SvgComponent = MonsterSlimeSvg;
  }

  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-20 h-20');

  // Combat dynamic interaction classes
  let animClass = '';
  if (isHurt) {
    animClass = 'animate-shake-hurt filter drop-shadow-[0_0_12px_#FF0055] brightness-125';
  } else if (isAttacking) {
    animClass = 'translate-y-2 scale-110 duration-150';
  } else if (animated) {
    animClass = 'animate-pulse-slow';
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClass} ${animClass} ${className}`}
      {...props}
    >
      <SvgComponent className="w-full h-full object-contain filter drop-shadow-md" />

      {isStunned && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-0.5 pointer-events-none">
          <span className="animate-spin text-xs">💫</span>
          <span className="animate-spin text-xs" style={{ animationDelay: '200ms' }}>⚡</span>
          <span className="animate-spin text-xs" style={{ animationDelay: '400ms' }}>💫</span>
        </div>
      )}
    </div>
  );
}
