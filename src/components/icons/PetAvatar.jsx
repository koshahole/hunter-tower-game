import React from 'react';
import { resolvePetFamily } from './svg/pets';
import { SIZE_PRESETS } from './CurrencyIcon';
import { Lock } from 'lucide-react';

export default function PetAvatar({
  pet,
  petId,
  rarity,
  size = 'lg',
  animated = false,
  locked = false,
  active = false,
  inline = false,
  className = '',
  ...props
}) {
  const resolvedRarity = rarity || pet?.rarity || 'common';
  const SvgComponent = resolvePetFamily(pet || petId);

  const sizeClass = SIZE_PRESETS[size] || (typeof size === 'string' && size.includes('w-') ? size : 'w-8 h-8');
  const animClass = animated ? 'animate-bounce-subtle' : '';
  const inlineClass = inline ? 'inline-block align-middle -mt-0.5' : 'inline-flex';

  return (
    <div
      className={`relative ${inlineClass} items-center justify-center ${sizeClass} ${animClass} ${className}`}
      {...props}
    >
      <div className={`w-full h-full ${locked ? 'opacity-35 grayscale brightness-50' : ''}`}>
        <SvgComponent rarity={resolvedRarity} className="w-full h-full object-contain" />
      </div>

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-1 rounded-full bg-black/80 border border-zinc-500 shadow">
            <Lock className="w-3.5 h-3.5 text-zinc-300" />
          </div>
        </div>
      )}

      {active && !locked && (
        <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black shadow-[0_0_8px_#10B981]" />
      )}
    </div>
  );
}
