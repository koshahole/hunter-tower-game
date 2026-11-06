import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Zap, 
  Crown, 
  Share2, 
  Sparkles, 
  Flame, 
  Star, 
  Trophy,
  RotateCcw,
  Clock,
  Settings,
  Skull,
  Shield,
  Play
} from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification, shareInviteLink } from '../utils/telegram';
import { getRankByMaxFloor } from '../data/ranks';
import { PETS } from '../data/pets';
import { BOSSES } from '../data/monsters';
import { calculateRebirthSouls } from '../data/rebirth';

export default function Hub({ 
  state, 
  playerStats, 
  user, 
  onStartRun, 
  activeTab, 
  setActiveTab, 
  onOpenStarsShop,
  onOpenRebirthModal,
  onOpenLeaderboard,
  onOpenProfile,
  onShowToast
}) {
  const secondsLeft = state.secondsToNext || 0;

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentRank = getRankByMaxFloor(state.maxFloor);
  const activePet = PETS.find(p => p.id === state.activePetId);
  const activePetLevel = state.petLevels?.[state.activePetId] || 1;

  const maxMilestone = Math.floor((state.maxFloor - 1) / 10) * 10;
  const [selectedFloor, setSelectedFloor] = useState(Math.max(1, maxMilestone === 0 ? 1 : maxMilestone));

  const handleStart = () => {
    if (state.energy <= 0) {
      hapticNotification('warning');
      onShowToast('НЕТ ЭНЕРГИИ! КУПИ В ЗВЕЗДАХ ИЛИ ЖДИ 5 МИН! ⚡', 'warning');
      onOpenStarsShop();
      return;
    }
    sounds.playAttack();
    hapticImpact('heavy');
    onStartRun(selectedFloor);
  };

  const handleInvite = () => {
    hapticImpact('medium');
    shareInviteLink('HunterAcademyBot', user.id);
    onShowToast('ССЫЛКА ПРИГЛАШЕНИЯ СКОПИРОВАНА! 🔥', 'success');
  };

  const nextBossFloor = Math.ceil(Math.max(1, state.maxFloor) / 10) * 10;
  const nextBoss = BOSSES[nextBossFloor] || BOSSES[10];
  const availableSouls = calculateRebirthSouls(state.maxFloor);

  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">
      
      {/* Neo-Brutalist Arcade Header Strip */}
      <div className="bg-white border-4 border-black p-3 shadow-brutal flex items-center justify-between gap-2">
        
        {/* Hunter Profile Button */}
        <button
          onClick={() => {
            hapticImpact('light');
            onOpenProfile();
          }}
          className="flex items-center gap-2.5 min-w-0 text-left active:translate-x-[2px] active:translate-y-[2px] transition-transform"
        >
          <div className="w-12 h-12 bg-neo-cyan border-3 border-black shadow-brutal-sm flex items-center justify-center text-2xl shrink-0">
            {state.hunterAvatar || '🧙‍♂️'}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-arcade text-sm text-black truncate uppercase">
                {state.hunterName || user.name}
              </span>
              {state.vip && (
                <span className="bg-neo-pink text-white border-2 border-black text-[9px] font-black px-1.5 py-0.2 shadow-brutal-sm">
                  VIP
                </span>
              )}
            </div>
            <div className="text-[11px] font-black text-neo-purple flex items-center gap-1 uppercase tracking-tight">
              <span>{state.hunterTitle || currentRank.name}</span>
              <Settings className="w-3.5 h-3.5 text-black" />
            </div>
          </div>
        </button>

        {/* Currency Badges & Trophy */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 bg-neo-yellow border-3 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            <span>🪙</span>
            <span>{state.gold}</span>
          </div>

          <div className="flex items-center gap-1 bg-neo-cyan border-3 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            <span>💎</span>
            <span>{state.crystals}</span>
          </div>

          {state.souls > 0 && (
            <div className="flex items-center gap-1 bg-neo-purple text-white border-3 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs">
              <span>🔮</span>
              <span>{state.souls}</span>
            </div>
          )}

          <button
            onClick={() => {
              hapticImpact('light');
              onOpenLeaderboard();
            }}
            className="w-9 h-9 bg-neo-pink text-white border-3 border-black shadow-brutal-sm flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Trophy className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>

      {/* Energy Ticker & Floor Record Pills */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* 5-Min Energy Card */}
        <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-arcade text-[10px] text-black uppercase">ЭНЕРГИЯ</span>
              {state.energy < state.maxEnergy && (
                <span className="bg-black text-neo-yellow text-[9px] font-black px-1 py-0.2 flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{formatTimer(secondsLeft)}</span>
                </span>
              )}
            </div>
            <div className="font-arcade text-lg text-black mt-0.5">
              {state.energy} / {state.maxEnergy} ⚡
            </div>
          </div>

          <button
            onClick={onOpenStarsShop}
            className="bg-neo-lime text-black border-2 border-black font-arcade text-[10px] px-2 py-1 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] shrink-0"
          >
            +10⭐️
          </button>
        </div>

        {/* Floor Record Card */}
        <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <span className="font-arcade text-[10px] text-black uppercase block">РЕКОРД БАШНИ</span>
            <div className="font-arcade text-lg text-neo-pink mt-0.5 truncate">
              ЭТАЖ {state.maxFloor}
            </div>
          </div>

          <button
            onClick={onOpenLeaderboard}
            className="bg-neo-cyan text-black border-2 border-black font-arcade text-[10px] px-2 py-1 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] shrink-0"
          >
            ТОП
          </button>
        </div>

      </div>

      {/* Big Comic Fighter Hero Stage */}
      <div 
        onClick={onOpenProfile}
        className="bg-white border-4 border-black p-4 shadow-brutal-lg cursor-pointer active:translate-x-[2px] active:translate-y-[2px] transition-transform text-center relative overflow-hidden"
      >
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 font-arcade text-[9px] uppercase shadow-brutal-sm">
          НАСТРОИТЬ ✎
        </div>

        {/* Avatar Display */}
        <div className="relative inline-block my-2">
          <div className="w-24 h-24 bg-neo-yellow border-4 border-black shadow-brutal flex items-center justify-center text-5xl">
            {state.hunterAvatar || '🧙‍♂️'}
          </div>

          {activePet && (
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-neo-pink border-3 border-black shadow-brutal-sm flex items-center justify-center text-xl animate-float-wiggle">
              {activePet.avatar}
            </div>
          )}
        </div>

        <h3 className="font-arcade text-lg text-black mt-1 uppercase">
          {state.hunterName || user.name}
        </h3>
        <p className="text-xs font-bold text-slate-700 uppercase">
          {state.hunterTitle || currentRank.name}
        </p>

        {/* Arcade Combat Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t-3 border-black">
          <div className="bg-neo-pink text-white border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">УРОН</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.atk}</div>
          </div>

          <div className="bg-neo-lime text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">HP</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.maxHp}</div>
          </div>

          <div className="bg-neo-yellow text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">КРИТ</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.critChance}%</div>
          </div>

          <div className="bg-neo-cyan text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[9px] font-black uppercase">УВОРОТ</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.dodgeChance}%</div>
          </div>
        </div>
      </div>

      {/* Starting Checkpoint Picker */}
      {state.maxFloor > 10 && (
        <div className="bg-white border-3 border-black p-3 shadow-brutal">
          <div className="flex items-center justify-between mb-2">
            <span className="font-arcade text-xs text-black uppercase">
              ВЫБОР РУБЕЖА:
            </span>
            <span className="bg-neo-yellow border-2 border-black px-2 py-0.5 font-arcade text-xs">
              ЭТАЖ {selectedFloor}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[1, 10, 20, 30, 40, 50, 60, 70, 80, 90]
              .filter(f => f <= state.maxFloor)
              .map(floorNum => (
                <button
                  key={floorNum}
                  onClick={() => {
                    hapticImpact('light');
                    setSelectedFloor(floorNum);
                  }}
                  className={`px-3 py-1.5 border-3 border-black font-arcade text-xs shrink-0 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] ${
                    selectedFloor === floorNum
                      ? 'bg-neo-pink text-white'
                      : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  {floorNum === 1 ? '1 СТАРТ' : `${floorNum} ЭТ`}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Giant Action Button: ENTER TOWER */}
      <div className="space-y-2.5">
        <button
          onClick={handleStart}
          className="w-full py-4 bg-neo-pink hover:bg-pink-600 active:translate-x-[3px] active:translate-y-[3px] active:shadow-brutal-press text-white border-4 border-black shadow-brutal-lg font-arcade text-lg flex items-center justify-center gap-3 transition-all"
        >
          <Swords className="w-6 h-6 stroke-[3]" />
          <span>ШТУРМОВАТЬ ЭТАЖ {selectedFloor}!</span>
          <span className="bg-black text-neo-yellow border border-white px-2 py-0.5 text-xs font-black">
            -1 ⚡
          </span>
        </button>

        {/* Boss Banner Card */}
        <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-3xl shrink-0">{nextBoss.avatar}</span>
            <div className="min-w-0">
              <div className="font-arcade text-xs text-black truncate uppercase">
                БОСС: {nextBoss.name}
              </div>
              <div className="text-[11px] font-bold text-slate-600 truncate">
                ЖДЕТ НА {nextBossFloor} ЭТАЖЕ
              </div>
            </div>
          </div>

          <span className="bg-neo-lime border-2 border-black px-2.5 py-1 font-arcade text-xs shadow-brutal-sm shrink-0">
            +{nextBoss.goldReward} 🪙
          </span>
        </div>
      </div>

      {/* Rebirth Temple Card */}
      <div className="bg-neo-purple text-white border-4 border-black p-3.5 shadow-brutal flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 bg-black text-white border-2 border-white flex items-center justify-center text-xl shrink-0 shadow-brutal-sm">
            🔮
          </div>
          <div className="min-w-0">
            <div className="font-arcade text-xs uppercase truncate">ХРАМ ПЕРЕРОЖДЕНИЯ</div>
            <div className="text-[11px] font-bold text-neo-yellow truncate">
              {state.maxFloor >= 20 ? `ДОСТУПНО: +${availableSouls} ДУШ` : 'ОТКРОЕТСЯ НА 20 ЭТАЖЕ'}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenRebirthModal}
          className="bg-neo-yellow text-black border-3 border-black px-3 py-1.5 font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] shrink-0"
        >
          ВОЙТИ
        </button>
      </div>

      {/* Invite Squad Card */}
      <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="font-arcade text-xs text-black uppercase truncate">ПОЗОВИ ДРУЗЕЙ</div>
          <div className="text-[11px] font-bold text-slate-600 truncate">+3 ЭНЕРГИИ И 50 🪙 ЗА ДРУГА!</div>
        </div>

        <button
          onClick={handleInvite}
          className="bg-neo-cyan text-black border-2 border-black px-3 py-1.5 font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] flex items-center gap-1 shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 stroke-[3]" />
          <span>ПОЗВАТЬ</span>
        </button>
      </div>

    </div>
  );
}
