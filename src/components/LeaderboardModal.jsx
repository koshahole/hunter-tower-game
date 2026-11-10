import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, X, Crown, RotateCw } from 'lucide-react';
import { MOCK_LEADERS_ALL_TIME, MOCK_LEADERS_WEEKLY, syncLeaderboard } from '../data/leaderboard';
import { hapticImpact } from '../utils/telegram';
import { GameIcon, CurrencyIcon } from './icons';

export default function LeaderboardModal({ state, user, onClose }) {
  const [tab, setTab] = useState('all');
  const [allLeaders, setAllLeaders] = useState(MOCK_LEADERS_ALL_TIME);
  const [weeklyLeaders, setWeeklyLeaders] = useState(MOCK_LEADERS_WEEKLY);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLiveLeaderboard = useCallback(async (manual = false) => {
    if (manual) {
      hapticImpact('medium');
    }
    setIsLoading(true);

    const playerData = {
      id: user?.id || 777,
      name: state.hunterName || user?.name || 'Охотник',
      title: state.hunterTitle || 'Искатель Башни',
      avatar: state.hunterAvatar || '🧙‍♂️',
      maxFloor: Math.max(1, state.maxFloor || 1),
      souls: Math.max(0, state.souls || 0),
      vip: Boolean(state.vip)
    };

    try {
      const data = await syncLeaderboard(playerData);
      if (data) {
        if (Array.isArray(data.leaders) && data.leaders.length > 0) {
          setAllLeaders(data.leaders);
        }
        if (Array.isArray(data.weekly) && data.weekly.length > 0) {
          setWeeklyLeaders(data.weekly);
        }
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.warn('Leaderboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, user?.name, state.hunterName, state.hunterTitle, state.hunterAvatar, state.maxFloor, state.souls, state.vip]);

  useEffect(() => {
    fetchLiveLeaderboard(false);
  }, [fetchLiveLeaderboard]);

  const displayedList = tab === 'weekly' ? weeklyLeaders : allLeaders;
  const currentLeaderName = state.hunterName || user?.name;
  const playerRankItem = displayedList.find(
    l => (l.id && user?.id && String(l.id) === String(user.id)) ||
         (l.name && currentLeaderName && l.name.toLowerCase() === currentLeaderName.toLowerCase())
  );
  const playerRank = playerRankItem ? playerRankItem.rank : (displayedList.length + 1);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn font-sans select-none">
      <div className="bg-white border-4 border-black p-4 shadow-brutal-lg max-w-sm w-full max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neo-yellow border-2 border-black flex items-center justify-center shadow-brutal-sm">
              <Trophy className="w-5 h-5 text-black stroke-[3]" />
            </div>
            <div>
              <h2 className="font-arcade text-base text-black uppercase leading-tight">
                ЗАЛ СЛАВЫ
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[11px] font-bold text-slate-700 uppercase">
                  {lastUpdated ? 'ОНЛАЙН РЕЙТИНГ' : 'ТОП ПОКОРИТЕЛЕЙ'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fetchLiveLeaderboard(true)}
              disabled={isLoading}
              title="Обновить список"
              className="w-8 h-8 bg-neo-yellow [@media(hover:hover)]:hover:bg-yellow-300 text-black border-2 border-black flex items-center justify-center shadow-brutal-xs active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 stroke-[2.5] ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 bg-black [@media(hover:hover)]:hover:bg-slate-800 text-white flex items-center justify-center font-arcade text-xs active:translate-x-[1px] active:translate-y-[1px]"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-black border-2 border-black my-2.5">
          <button
            onClick={() => {
              hapticImpact('light');
              setTab('all');
            }}
            className={`py-1.5 font-arcade text-xs uppercase transition-all flex items-center justify-center gap-1.5 ${
              tab === 'all'
                ? 'bg-neo-yellow text-black'
                : 'text-white [@media(hover:hover)]:hover:text-neo-yellow'
            }`}
          >
            <span>ВСЕ ВРЕМЯ</span>
          </button>

          <button
            onClick={() => {
              hapticImpact('light');
              setTab('weekly');
            }}
            className={`py-1.5 font-arcade text-xs uppercase transition-all flex items-center justify-center gap-1.5 ${
              tab === 'weekly'
                ? 'bg-neo-pink text-white'
                : 'text-white [@media(hover:hover)]:hover:text-neo-pink'
            }`}
          >
            <span>ТУРНИР</span>
            <span className="text-[11px] bg-black/40 px-1 rounded">PTS</span>
          </button>
        </div>

        {tab === 'weekly' && (
          <div className="bg-slate-100 border-2 border-black px-2.5 py-1 mb-2 text-[11px] font-bold text-slate-800 text-center">
            📊 Формула: <strong>PTS = 100×Этаж + 10×Души + 500×VIP</strong>
          </div>
        )}

        {/* Player Standing Card */}
        <div className={`p-3 flex items-center justify-between gap-2 shadow-brutal-sm mb-3 border-3 ${
          state.vip
            ? 'bg-neo-yellow border-neo-pink ring-2 ring-black'
            : 'bg-neo-yellow border-black'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 bg-black text-white font-arcade text-xs flex items-center justify-center shrink-0">
              #{playerRank}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-arcade text-xs text-black truncate uppercase">
                  {state.hunterName || user?.name || 'Охотник'} (ВЫ)
                </span>
                {state.vip && (
                  <span className="bg-neo-pink text-white border border-black text-[11px] font-black px-1 flex items-center gap-0.5 shrink-0">
                    <Crown className="w-3 h-3 fill-neo-yellow stroke-black" />
                    <span>VIP</span>
                  </span>
                )}
              </div>
              <div className="text-[11px] font-bold text-slate-800 uppercase truncate">
                {state.hunterTitle || 'ИСКАТЕЛЬ БАШНИ'}
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-arcade text-xs text-black block">
              {state.maxFloor || 1} ЭТАЖ
            </span>
            {tab === 'weekly' && (
              <span className="font-arcade text-[11px] text-neo-pink block">
                {((state.maxFloor || 1) * 100 + (state.souls || 0) * 10 + (state.vip ? 500 : 0))} PTS
              </span>
            )}
            {tab === 'all' && (state.souls || 0) > 0 && (
              <span className="font-arcade text-[11px] text-neo-purple block">
                <span className="inline-flex items-center gap-1">
                  <span>{state.souls}</span>
                  <CurrencyIcon type="soul" size="xs" inline />
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Leaders List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
          {displayedList.map((leader, idx) => (
            <div
              key={`${leader.id || leader.name}_${idx}`}
              className={`border-3 border-black p-2.5 flex items-center justify-between gap-2 shadow-brutal-sm ${
                leader.vip ? 'bg-amber-50 ring-1 ring-amber-400' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-7 h-7 border-2 border-black font-arcade text-xs flex items-center justify-center shrink-0 ${
                  leader.rank === 1 ? 'bg-neo-yellow' : leader.rank === 2 ? 'bg-neo-cyan' : leader.rank === 3 ? 'bg-neo-pink text-white' : 'bg-slate-100'
                }`}>
                  #{leader.rank}
                </div>

                <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                  <GameIcon icon={leader.avatar || '🧙‍♂️'} size="sm" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-arcade text-xs text-black truncate uppercase">
                      {leader.name}
                    </span>
                    {leader.vip && (
                      <Crown className="w-3.5 h-3.5 fill-neo-yellow stroke-black shrink-0" />
                    )}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 truncate uppercase">
                    {leader.title || 'Искатель'}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-arcade text-xs text-black block">
                  {leader.maxFloor} ЭТ.
                </span>
                {tab === 'weekly' && leader.points !== undefined && (
                  <span className="font-arcade text-[11px] text-neo-pink block">
                    {leader.points} PTS
                  </span>
                )}
                {tab === 'all' && leader.souls !== undefined && leader.souls > 0 && (
                  <span className="font-arcade text-[11px] text-neo-purple block">
                    <span className="inline-flex items-center gap-1">
                      <span>{leader.souls}</span>
                      <CurrencyIcon type="soul" size="xs" inline />
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
