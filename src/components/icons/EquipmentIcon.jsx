import React from 'react';
import {
  // Weapons
  SwordSvg,
  BladeSvg,
  ScimitarSvg,
  CrossedSwordsSvg,
  DaggerSvg,
  RapierSvg,
  AxeSvg,
  HammerSvg,
  MaceSvg,
  ScytheSvg,
  SpearSvg,
  TridentSvg,
  WandSvg,
  BowSvg,
  PickaxeSvg,
  SawSvg,

  // Armors
  FullArmorSvg,
  ShieldPlateSvg,
  CuirassSvg,
  ChainmailSvg,
  CarapaceSvg,
  MageRobeSvg,
  CloakSvg,
  VestSvg,
  TunicSvg,
  GiSvg,
  CoatLabSvg,
  CoatSvg,

  // Helmets
  KnightHelmSvg,
  HelmSoldierSvg,
  CrownSvg,
  DiademSvg,
  HoodSvg,
  WizardHatSvg,
  TophatSvg,
  MaskSvg,
  HeadbandSvg,
  CapSvg,
  MinerCapSvg,
  GogglesSvg,
  FurCapSvg,
  HatWideSvg,

  // Accessories
  RingSvg,
  AmuletSvg,
  GemAmuletSvg,
  NecklaceSvg,
  SealCoinSvg,
  CoinAmuletSvg,
  EvilEyeSvg,
  HeartGemSvg,
  CrystalOrbSvg,
  CrystalBallSvg,
  CloverSvg,
  SparkleCharmSvg,
  HourglassSvg,
  BracerSvg
} from './svg/equipment';
import { SIZE_PRESETS } from './CurrencyIcon';

/**
 * Intelligent semantic analyzer for Russian item names to assign 100% accurate visual fantasy archetypes
 */
export function resolveItemArchetype(item, slot) {
  if (typeof item === 'string') return item;
  const s = slot || item?.slot || 'weapon';
  const name = String(item?.name || '').toLowerCase();

  if (s === 'weapon') {
    if (name.includes('коса') || name.includes('серп') || name.includes('жнец') || name.includes('смерт')) return 'scythe';
    if (name.includes('рапир') || name.includes('шпаг')) return 'rapier';
    if (name.includes('кинжал') || name.includes('нож') || name.includes('стилет')) return 'dagger';
    if (name.includes('топор') || name.includes('секир') || name.includes('палач') || name.includes('берсерк')) return 'axe';
    if (name.includes('молот') || name.includes('ковал')) return 'hammer';
    if (name.includes('булав') || name.includes('дубин') || name.includes('моргенштерн') || name.includes('прут') || name.includes('лом')) return 'mace';
    if (name.includes('копь') || name.includes('пик') || name.includes('трезубец')) return 'spear';
    if (name.includes('кирк') || name.includes('лопат')) return 'pickaxe';
    if (name.includes('тесак') || name.includes('сабл') || name.includes('палаш') || name.includes('мачет')) return 'scimitar';
    if (name.includes('лук') || name.includes('арбалет') || name.includes('стрел')) return 'bow';
    if (name.includes('посох') || name.includes('жезл') || name.includes('сфер')) return 'wand';
    if (name.includes('клинок')) return 'blade';
    if (name.includes('меч') || name.includes('двуруч') || name.includes('экскалибур') || name.includes('эсток')) return 'sword';
    return 'sword';
  }

  if (s === 'armor') {
    if (name.includes('манти') || name.includes('роб') || name.includes('хитон')) return 'mage_robe';
    if (name.includes('кольчуг') || name.includes('кольц')) return 'chainmail';
    if (name.includes('кирас') || name.includes('нагрудник')) return 'cuirass';
    if (name.includes('панцир') || name.includes('чешу')) return 'carapace';
    if (name.includes('плащ') || name.includes('накидк')) return 'cloak';
    if (name.includes('жилет') || name.includes('дублет') || name.includes('дублёт') || name.includes('куртк') || name.includes('кафтан') || name.includes('штаны')) return 'vest';
    if (name.includes('туник') || name.includes('рубах') || name.includes('фартук') || name.includes('тканев') || name.includes('полотно') || name.includes('стёган') || name.includes('ремень')) return 'tunic';
    if (name.includes('доспех') || name.includes('эгид') || name.includes('брон')) return 'full_armor';
    return 'full_armor';
  }

  if (s === 'helmet') {
    if (name.includes('корон')) return 'crown';
    if (name.includes('диадем') || name.includes('венец') || name.includes('тиар')) return 'diadem';
    if (name.includes('капюшон') || name.includes('вуал')) return 'hood';
    if (name.includes('колпак') || name.includes('шляп') || name.includes('цилиндр')) return 'wizard_hat';
    if (name.includes('маск') || name.includes('личина')) return 'mask';
    if (name.includes('повязк') || name.includes('обруч') || name.includes('лент')) return 'headband';
    if (name.includes('каск') || name.includes('очки')) return 'miner_cap';
    if (name.includes('шапк') || name.includes('ушанк') || name.includes('колпач')) return 'fur_cap';
    if (name.includes('шлем') || name.includes('салад') || name.includes('бацинет') || name.includes('латн')) return 'knight_helm';
    return 'knight_helm';
  }

  if (s === 'accessory') {
    if (name.includes('кольц') || name.includes('перстень')) return 'ring';
    if (name.includes('амулет') || name.includes('оберег') || name.includes('талисман') || name.includes('кулон') || name.includes('медальон') || name.includes('подвеск') || name.includes('пыль') || name.includes('идол') || name.includes('тотем') || name.includes('шнурок')) return 'amulet';
    if (name.includes('ожерель') || name.includes('колье') || name.includes('бус') || name.includes('цеп')) return 'necklace';
    if (name.includes('печат') || name.includes('монет') || name.includes('знак')) return 'seal_coin';
    if (name.includes('око') || name.includes('глаз') || name.includes('взор')) return 'evil_eye';
    if (name.includes('сердц')) return 'heart_gem';
    if (name.includes('клевер')) return 'clover';
    if (name.includes('час')) return 'hourglass';
    if (name.includes('браслет') || name.includes('наруч') || name.includes('пояс') || name.includes('ремень')) return 'bracer';
    if (name.includes('шар') || name.includes('сфер') || name.includes('кристалл')) return 'crystal_orb';
    return 'ring';
  }

  return 'sword';
}

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

export const ARCHETYPE_COMPONENTS = {
  // Weapons
  sword: SwordSvg,
  blade: BladeSvg,
  scimitar: ScimitarSvg,
  crossed_swords: CrossedSwordsSvg,
  dagger: DaggerSvg,
  rapier: RapierSvg,
  axe: AxeSvg,
  hammer: HammerSvg,
  mace: MaceSvg,
  scythe: ScytheSvg,
  spear: SpearSvg,
  trident: TridentSvg,
  wand: WandSvg,
  bow: BowSvg,
  pickaxe: PickaxeSvg,
  saw: SawSvg,

  // Armors
  full_armor: FullArmorSvg,
  shield_plate: ShieldPlateSvg,
  cuirass: CuirassSvg,
  chainmail: ChainmailSvg,
  carapace: CarapaceSvg,
  mage_robe: MageRobeSvg,
  cloak: CloakSvg,
  vest: VestSvg,
  tunic: TunicSvg,
  gi: GiSvg,
  coat_lab: CoatLabSvg,
  coat: CoatSvg,

  // Helmets
  knight_helm: KnightHelmSvg,
  helm_soldier: HelmSoldierSvg,
  crown: CrownSvg,
  diadem: DiademSvg,
  hood: HoodSvg,
  wizard_hat: WizardHatSvg,
  tophat: TophatSvg,
  mask: MaskSvg,
  headband: HeadbandSvg,
  cap: CapSvg,
  miner_cap: MinerCapSvg,
  goggles: GogglesSvg,
  fur_cap: FurCapSvg,
  hat_wide: HatWideSvg,

  // Accessories
  ring: RingSvg,
  amulet: AmuletSvg,
  gem_amulet: GemAmuletSvg,
  necklace: NecklaceSvg,
  seal_coin: SealCoinSvg,
  coin_amulet: CoinAmuletSvg,
  evil_eye: EvilEyeSvg,
  heart_gem: HeartGemSvg,
  crystal_orb: CrystalOrbSvg,
  crystal_ball: CrystalBallSvg,
  clover: CloverSvg,
  sparkle_charm: SparkleCharmSvg,
  hourglass: HourglassSvg,
  bracer: BracerSvg
};

const SLOT_DEFAULT_ARCHETYPE = {
  weapon: 'sword',
  armor: 'full_armor',
  helmet: 'knight_helm',
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
  inline = false,
  ...props
}) {
  const resolvedSlot = slot || item?.slot || 'weapon';
  const resolvedRarity = rarity || item?.rarity || 'common';

  // 1. Explicit archetype prop (e.g. from shop or manual caller)
  // 2. Semantic name resolution from item.name
  // 3. Legacy emoji lookup
  // 4. Default slot archetype
  let key = archetype;
  if (!key && item?.name) {
    key = resolveItemArchetype(item, resolvedSlot);
  }
  if (!key && item?.icon) {
    key = EMOJI_TO_ARCHETYPE[item.icon];
  }
  if (!key) {
    key = SLOT_DEFAULT_ARCHETYPE[resolvedSlot] || 'sword';
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

  const inlineClass = inline ? 'inline-block align-middle -mt-0.5' : 'inline-flex items-center justify-center';

  return (
    <span className={`${inlineClass} ${sizeClass} ${className}`} {...props}>
      <SvgComponent rarity={resolvedRarity} className="w-full h-full object-contain" />
    </span>
  );
}
