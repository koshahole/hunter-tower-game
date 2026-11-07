// Hunter Ranks inspired by Solo Leveling
// Ranks are unlocked STRICTLY after defeating the respective decade boss:
// E: Floors 1-10 (Novice)
// D: Floors 11-20 (After defeating Boss 10)
// C: Floors 21-40 (After defeating Boss 20)
// B: Floors 41-60 (After defeating Boss 40)
// A: Floors 61-80 (After defeating Boss 60)
// S: Floors 81-100 (After defeating Boss 80)
export const RANKS = [
  {
    rank: 'E',
    name: 'E-Ранг (Новичок)',
    badge: '🥉',
    color: '#9ca3af',
    minFloor: 0,
    nextFloor: 11,
    bonusPercent: 0,
    bonusText: 'Базовый статус охотника (+0%)',
    multiplier: 1.0
  },
  {
    rank: 'D',
    name: 'D-Ранг (Авангардист)',
    badge: '🥈',
    color: '#10b981',
    minFloor: 11,
    nextFloor: 21,
    bonusPercent: 5,
    bonusText: '+5% ко всем характеристикам',
    multiplier: 1.05
  },
  {
    rank: 'C',
    name: 'C-Ранг (Мастер Подземелий)',
    badge: '🥇',
    color: '#3b82f6',
    minFloor: 21,
    nextFloor: 41,
    bonusPercent: 12,
    bonusText: '+12% ко всем характеристикам',
    multiplier: 1.12
  },
  {
    rank: 'B',
    name: 'B-Ранг (Элитный Истребитель)',
    badge: '💎',
    color: '#a855f7',
    minFloor: 41,
    nextFloor: 61,
    bonusPercent: 22,
    bonusText: '+22% ко всем характеристикам',
    multiplier: 1.22
  },
  {
    rank: 'A',
    name: 'A-Ранг (Повелитель Бездны)',
    badge: '👑',
    color: '#f59e0b',
    minFloor: 61,
    nextFloor: 81,
    bonusPercent: 35,
    bonusText: '+35% ко всем характеристикам',
    multiplier: 1.35
  },
  {
    rank: 'S',
    name: 'S-Ранг (Национальный Герой)',
    badge: '🌟⚡',
    color: '#ef4444',
    minFloor: 81,
    nextFloor: 100,
    bonusPercent: 60,
    bonusText: '+60% ко всем характеристикам и золотая аура',
    multiplier: 1.60
  }
];

export function getRankByMaxFloor(maxFloor = 1) {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (maxFloor >= r.minFloor) {
      current = r;
    }
  }
  return current;
}

export function getRankProgress(maxFloor = 1) {
  const currentRank = getRankByMaxFloor(maxFloor);
  const currentIdx = RANKS.findIndex(r => r.rank === currentRank.rank);
  const nextRank = currentIdx < RANKS.length - 1 ? RANKS[currentIdx + 1] : null;

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progressPercent: 100,
      floorsCompletedInTier: maxFloor - currentRank.minFloor,
      totalTierFloors: 100 - currentRank.minFloor,
      floorsRemaining: 0,
      isMax: true,
      currentMultiplierText: `+${currentRank.bonusPercent}% КО ВСЕМ СТАТАМ`,
      nextMultiplierText: 'МАКС. РАНГ',
    };
  }

  const tierStart = currentRank.minFloor;
  const tierEnd = nextRank.minFloor;
  const totalTierFloors = Math.max(1, tierEnd - tierStart);
  const floorsCompletedInTier = Math.min(totalTierFloors, Math.max(0, maxFloor - tierStart));
  const progressPercent = Math.min(100, Math.floor((floorsCompletedInTier / totalTierFloors) * 100));
  const floorsRemaining = Math.max(0, tierEnd - maxFloor);

  return {
    currentRank,
    nextRank,
    progressPercent,
    floorsCompletedInTier,
    totalTierFloors,
    floorsRemaining,
    isMax: false,
    currentMultiplierText: currentRank.bonusPercent > 0
      ? `+${currentRank.bonusPercent}% КО ВСЕМ СТАТАМ`
      : 'БАЗОВЫЙ РАНГ (1.0x)',
    nextMultiplierText: `+${nextRank.bonusPercent}% НА ${tierEnd} ЭТАЖЕ`,
  };
}
