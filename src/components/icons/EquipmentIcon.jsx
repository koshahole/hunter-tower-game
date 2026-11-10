import React from 'react';
import {
  CrossedSwordsSvg,
  DaggerSvg,
  AxeSvg,
  HammerSvg,
  WandSvg,
  TridentSvg,
  SawSvg,
  PickaxeSvg,
  ShieldPlateSvg,
  GiSvg,
  VestSvg,
  CoatLabSvg,
  CoatSvg,
  TunicSvg,
  HelmSoldierSvg,
  CrownSvg,
  TophatSvg,
  CapSvg,
  HatWideSvg,
  MaskSvg,
  GogglesSvg,
  RingSvg,
  NecklaceSvg,
  GemAmuletSvg,
  CoinAmuletSvg,
  EvilEyeSvg,
  SparkleCharmSvg,
  CrystalBallSvg
} from './svg/equipment';
import { SIZE_PRESETS } from './CurrencyIcon';

export const EMOJI_TO_ARCHETYPE = {
  // Weapon
  '⚔️': 'crossed_swords',
  '🗡️': 'dagger',
  '🪓': 'axe',
  '🔨': 'hammer',
  '🪄': 'wand',
  '🔱': 'trident',
  '🪚': 'saw',
  '⛏️': 'pickaxe',

  // Armor
  '🛡️': 'shield_plate',
  '🥋': 'gi',
  '🦺': 'vest',
  '🥼': 'coat_lab',
  '🧥': 'coat',
  '🎽': 'tunic',

  // Helmet
  '🪖': 'helm_soldier',
  '👑': 'crown',
  '🎩': 'tophat',
  '🧢': 'cap',
  '👒': 'hat_wide',
  '🎭': 'mask',
  '🥽': 'goggles',

  // Accessory
  '💍': 'ring',
  '📿': 'necklace',
  '💎': 'gem_amulet',
  '🪙': 'coin_amulet',
  '🧿': 'evil_eye',
  '✨': 'sparkle_charm',
  '🔮': 'crystal_ball'
};

const ARCHETYPE_COMPONENTS = {
  crossed_swords: CrossedSwordsSvg,
  dagger: DaggerSvg,
  axe: AxeSvg,
  hammer: HammerSvg,
  wand: WandSvg,
  trident: TridentSvg,
  saw: SawSvg,
  pickaxe: PickaxeSvg,

  shield_plate: ShieldPlateSvg,
  gi: GiSvg,
  vest: VestSvg,
  coat_lab: CoatLabSvg,
  coat: CoatSvg,
  tunic: TunicSvg,

  helm_soldier: HelmSoldierSvg,
  crown: CrownSvg,
  tophat: TophatSvg,
  cap: CapSvg,
  hat_wide: HatWideSvg,
  mask: MaskSvg,
  goggles: GogglesSvg,

  ring: RingSvg,
  necklace: NecklaceSvg,
  gem_amulet: GemAmuletSvg,
  coin_amulet: CoinAmuletSvg,
  evil_eye: EvilEyeSvg,
  sparkle_charm: SparkleCharmSvg,
  crystal_ball: CrystalBallSvg
};

const SLOT_DEFAULT_ARCHETYPE = {
  weapon: 'crossed_swords',
  armor: 'shield_plate',
  helmet: 'helm_soldier',
  accessory: 'ring'
};

const RARITY_BG = {
  common: 'bg-zinc-800 border-zinc-600 text-zinc-300',
  rare: 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(0,245,255,0.3)]',
  epic: 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-[0_0_10px_rgba(176,38,255,0.35)]',
  legendary: 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-[0_0_14px_rgba(255,230,0,0.45)]'
};

export default function EquipmentIcon({
  item,
  slot,
  archetype,
  rarity,
  size = 'md',
  showBackdrop = false,
  empty = false,
  level = 0,
  className = '',
  ...props
}) {
  const resolvedSlot = slot || item?.slot || 'weapon';
  const resolvedRarity = rarity || item?.rarity || 'common';

  // Resolve archetype
  let key = archetype;
  if (!key && item?.icon) {
    key = EMOJI_TO_ARCHETYPE[item.icon];
  }
  if (!key) {
    key = SLOT_DEFAULT_ARCHETYPE[resolvedSlot] || 'crossed_swords';
  }

  const SvgComponent = ARCHETYPE_COMPONENTS[key] || CrossedSwordsSvg;
  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-6 h-6');

  if (empty) {
    return (
      <div
        className={`relative inline-flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md bg-zinc-900/60 opacity-60 ${sizeClass} ${className}`}
        {...props}
      >
        <SvgComponent rarity="common" className="w-2/3 h-2/3 opacity-30 grayscale" />
      </div>
    );
  }

  if (showBackdrop) {
    const rarityStyle = RARITY_BG[resolvedRarity] || RARITY_BG.common;
    return (
      <div
        className={`relative inline-flex items-center justify-center p-1 rounded-lg border-2 ${rarityStyle} ${sizeClass} ${className}`}
        {...props}
      >
        <SvgComponent rarity={resolvedRarity} className="w-full h-full object-contain" />
        {level > 1 && (
          <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 text-[9px] font-black bg-black border border-white text-yellow-300 rounded leading-tight shadow">
            +{level}
          </span>
        )}
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center ${sizeClass} ${className}`} {...props}>
      <SvgComponent rarity={resolvedRarity} className="w-full h-full object-contain" />
    </span>
  );
}
