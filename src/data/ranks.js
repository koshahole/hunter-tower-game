// Hunter Ranks inspired by Solo Leveling
export const RANKS = [
  {
    rank: 'E',
    name: 'E-Ранг (Новичок)',
    badge: '🥉',
    color: '#9ca3af',
    minFloor: 0,
    bonusText: 'Базовый статус охотника',
    multiplier: 1.0
  },
  {
    rank: 'D',
    name: 'D-Ранг (Авангардист)',
    badge: '🥈',
    color: '#10b981',
    minFloor: 10,
    bonusText: '+5% ко всем характеристикам',
    multiplier: 1.05
  },
  {
    rank: 'C',
    name: 'C-Ранг (Мастер Подземелий)',
    badge: '🥇',
    color: '#3b82f6',
    minFloor: 20,
    bonusText: '+12% ко всем характеристикам',
    multiplier: 1.12
  },
  {
    rank: 'B',
    name: 'B-Ранг (Элитный Истребитель)',
    badge: '💎',
    color: '#a855f7',
    minFloor: 40,
    bonusText: '+22% ко всем характеристикам',
    multiplier: 1.22
  },
  {
    rank: 'A',
    name: 'A-Ранг (Повелитель Бездны)',
    badge: '👑',
    color: '#f59e0b',
    minFloor: 60,
    bonusText: '+35% ко всем характеристикам',
    multiplier: 1.35
  },
  {
    rank: 'S',
    name: 'S-Ранг (Национальный Герой)',
    badge: '🌟⚡',
    color: '#ef4444',
    minFloor: 80,
    bonusText: '+60% ко всем характеристикам и золотая аура',
    multiplier: 1.60
  }
];

export function getRankByMaxFloor(maxFloor) {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (maxFloor >= r.minFloor) {
      current = r;
    }
  }
  return current;
}
