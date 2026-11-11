import React from 'react';
import CurrencyIcon, { SIZE_PRESETS } from './CurrencyIcon';
import EquipmentIcon, { EMOJI_TO_ARCHETYPE } from './EquipmentIcon';
import PetAvatar from './PetAvatar';
import MonsterAvatar from './MonsterAvatar';
import RelicIcon from './RelicIcon';
import RankBadge from './RankBadge';
import { AVATAR_SVG_MAP } from './svg/avatars';
import { MISC_SVG_MAP } from './svg/misc';
import { RELIC_SVG_MAP } from './svg/relics';
import { MONSTER_SVG_MAP } from './svg/monsters';

export default function GameIcon({
  icon,
  name,
  item,
  pet,
  monster,
  relic,
  rank,
  size = 'md',
  className = '',
  inline = false,
  ...props
}) {
  // 1. Direct Object Dispatches
  if (item) {
    return <EquipmentIcon item={item} size={size} className={className} {...props} />;
  }
  if (pet) {
    return <PetAvatar pet={pet} size={size} className={className} inline={inline} {...props} />;
  }
  if (monster) {
    return <MonsterAvatar monster={monster} size={size} className={className} {...props} />;
  }
  if (relic) {
    return <RelicIcon relic={relic} size={size} className={className} inline={inline} {...props} />;
  }
  if (rank) {
    return <RankBadge rank={rank} size={size} className={className} inline={inline} {...props} />;
  }

  // 2. String Query Resolution
  const rawKey = String(icon || name || '').trim();
  const cleanKey = rawKey.replace(/[︎️]/g, ''); // strip emoji variant selectors
  const lowerKey = cleanKey.toLowerCase();
  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-5 h-5');
  const inlineClass = inline ? 'inline-block align-middle -mt-0.5' : 'inline-flex items-center justify-center';

  // Currencies
  if (['🪙', '💎', '🔮', '⚡', '🧪', '🪶', '⭐️', '⭐'].includes(cleanKey) ||
      ['gold', 'coin', 'crystal', 'cryst', 'soul', 'energy', 'potion', 'revive', 'feather', 'star'].some(k => lowerKey.includes(k))) {
    return <CurrencyIcon type={cleanKey || lowerKey} size={size} className={className} inline={inline} {...props} />;
  }

  // Misc UI, Combat & Store Badges (trophy, skull, crossed_swords, egg, crown, etc.)
  if (MISC_SVG_MAP[cleanKey] || MISC_SVG_MAP[rawKey] || MISC_SVG_MAP[lowerKey]) {
    const MiscSvg = MISC_SVG_MAP[cleanKey] || MISC_SVG_MAP[rawKey] || MISC_SVG_MAP[lowerKey];
    return (
      <span className={`${inlineClass} ${sizeClass} ${className}`} {...props}>
        <MiscSvg className="w-full h-full object-contain filter drop-shadow" />
      </span>
    );
  }

  // Equipment Archetypes & Slot Emojis
  if (EMOJI_TO_ARCHETYPE[cleanKey] || EMOJI_TO_ARCHETYPE[rawKey] || lowerKey in EMOJI_TO_ARCHETYPE) {
    const arch = EMOJI_TO_ARCHETYPE[cleanKey] || EMOJI_TO_ARCHETYPE[rawKey] || lowerKey;
    return <EquipmentIcon archetype={arch} size={size} className={className} inline={inline} {...props} />;
  }

  // Player Avatars
  if (AVATAR_SVG_MAP[rawKey] || AVATAR_SVG_MAP[cleanKey] || AVATAR_SVG_MAP[lowerKey]) {
    const AvatarSvg = AVATAR_SVG_MAP[rawKey] || AVATAR_SVG_MAP[cleanKey] || AVATAR_SVG_MAP[lowerKey];
    return (
      <span className={`${inlineClass} ${sizeClass} ${className}`} {...props}>
        <AvatarSvg className="w-full h-full object-contain filter drop-shadow" />
      </span>
    );
  }

  // Relic by Key
  if (RELIC_SVG_MAP[lowerKey]) {
    return <RelicIcon relicId={lowerKey} size={size} className={className} inline={inline} {...props} />;
  }

  // Monster by Key or Boss ID
  if (lowerKey.startsWith('boss_') || MONSTER_SVG_MAP[rawKey]) {
    return <MonsterAvatar monster={{ id: lowerKey, name: rawKey }} size={size} className={className} {...props} />;
  }

  // Misc UI & Badges
  if (MISC_SVG_MAP[cleanKey] || MISC_SVG_MAP[rawKey] || MISC_SVG_MAP[lowerKey]) {
    const MiscSvg = MISC_SVG_MAP[cleanKey] || MISC_SVG_MAP[rawKey] || MISC_SVG_MAP[lowerKey];
    return (
      <span className={`${inlineClass} ${sizeClass} ${className}`} {...props}>
        <MiscSvg className="w-full h-full object-contain filter drop-shadow" />
      </span>
    );
  }

  // Fallback: Elegant neo-brutalist badge container for raw text or unrecognized symbol
  return (
    <span
      className={`${inlineClass} ${sizeClass} font-black text-xs leading-none select-none ${className}`}
      {...props}
    >
      {rawKey}
    </span>
  );
}
