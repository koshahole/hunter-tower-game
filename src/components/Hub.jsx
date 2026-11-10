import React, { useState } from 'react';
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
  Award,
  ChevronRight,
  Package,
  Volume2,
  VolumeX
} from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification, shareInviteLink } from '../utils/telegram';
import { getRankByMaxFloor, getRankProgress } from '../data/ranks';
import { PETS } from '../data/pets';
import { BOSSES } from '../data/monsters';
import { calculateRebirthSouls } from '../data/rebirth';
import { GameIcon, CurrencyIcon, PetAvatar, MonsterAvatar, RankBadge } from './icons';

export default function Hub({
  state,
  playerStats,
  user,
  soundEnabled = true,
  onToggleSound,
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

  const rankInfo = getRankProgress(state.maxFloor);
  const currentRank = rankInfo.currentRank;
  const activePet = PETS.find(p => p.id === state.activePetId);

  // Logical checkpoints unlocked by defeating respective bosses (1, 11, 21, 31, 41...)
  const CHECKPOINTS = [
    { floor: 1, name: 'Вход в Башню', bonusRelics: 0, bonusPotions: 0 },
    { floor: 11, name: 'Катакомбы', bonusRelics: 1, bonusPotions: 0 },
    { floor: 21, name: 'Лавовые Пещеры', bonusRelics: 2, bonusPotions: 1 },
    { floor: 31, name: 'Залы Ночи', bonusRelics: 3, bonusPotions: 1 },
    { floor: 41, name: 'Цитадель Бездны', bonusRelics: 4, bonusPotions: 2 },
    { floor: 51, name: 'Небесный Разлом', bonusRelics: 5, bonusPotions: 2 },
    { floor: 61, name: 'Кибер-Сектор', bonusRelics: 6, bonusPotions: 3 },
    { floor: 71, name: 'Золотой Дворец', bonusRelics: 7, bonusPotions: 3 },
    { floor: 81, name: 'Судилище Небес', bonusRelics: 8, bonusPotions: 4 },
    { floor: 91, name: 'Трон Творца', bonusRelics: 9, bonusPotions: 4 },
  ];

  const availableCheckpoints = CHECKPOINTS.filter(cp => cp.floor <= Math.max(1, state.maxFloor));
  const highestCheckpoint = availableCheckpoints[availableCheckpoints.length - 1] || CHECKPOINTS[0];

  const [selectedCheckpoint, setSelectedCheckpoint] = useState(highestCheckpoint.floor);

  const activeCheckpointObj = CHECKPOINTS.find(cp => cp.floor === selectedCheckpoint) || CHECKPOINTS[0];

  const handleStart = () => {
    if (state.energy <= 0) {
      hapticNotification('warning');
      onShowToast('НЕТ ЭНЕРГИИ! КУПИ В ЗВЕЗДАХ ИЛИ ЖДИ 3 МИН! ⚡', 'warning');
      onOpenStarsShop();
      return;
    }
    sounds.playAttack();
    hapticImpact('heavy');
    onStartRun(selectedCheckpoint, activeCheckpointObj.bonusRelics, activeCheckpointObj.bonusPotions);
  };

  const handleInvite = () => {
    hapticImpact('medium');
    shareInviteLink('my_hunter_tower_bot', user.id);
    onShowToast('ОКНО ПРИГЛАШЕНИЯ ОТКРЫТО! 🔥', 'info');
  };

  const nextBossFloor = Math.ceil(Math.max(1, state.maxFloor) / 10) * 10;
  const nextBoss = BOSSES[nextBossFloor] || BOSSES[10];
  const availableSouls = calculateRebirthSouls(state.maxFloor);
  const isFirstRun = (state.stats?.totalRuns || 0) === 0;

  return (
    <div className="w-full space-y-3 pb-24 font-sans select-none">

      {/* Neo-Brutalist 2-Row Mobile Header */}
      <div className="bg-white border-4 border-black p-3 shadow-brutal">
        {/* Row 1: Hunter Identity + Quick Actions */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => {
              hapticImpact('light');
              onOpenProfile();
            }}
            className="flex items-center gap-2.5 min-w-0 text-left active:translate-x-[2px] active:translate-y-[2px] transition-transform"
          >
            <div className="w-11 h-11 bg-neo-cyan border-3 border-black shadow-brutal-sm flex items-center justify-center shrink-0 p-1">
              <GameIcon icon={state.hunterAvatar || 'mage'} size="md" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-arcade text-sm text-black truncate uppercase">
                  {state.hunterName || user.name}
                </span>
                {state.vip && (
                  <span className="bg-neo-pink text-white border-2 border-black text-[11px] font-black px-1.5 py-0.2 shadow-brutal-sm shrink-0 leading-tight">
                    VIP
                  </span>
                )}
              </div>
              <div className="text-[11px] font-black text-neo-purple flex items-center gap-1 uppercase tracking-tight truncate">
                <span className="truncate">{state.hunterTitle || currentRank.name}</span>
                <Settings className="w-3.5 h-3.5 text-black shrink-0" />
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleSound && (
              <button
                onClick={() => {
                  hapticImpact('light');
                  onToggleSound();
                }}
                title={soundEnabled ? 'Выключить звук' : 'Включить звук'}
                className="w-9 h-9 bg-white [@media(hover:hover)]:hover:bg-neo-yellow border-3 border-black shadow-brutal-sm flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px]"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 stroke-[3]" /> : <VolumeX className="w-4 h-4 stroke-[3] text-slate-500" />}
              </button>
            )}

            <button
              onClick={() => {
                hapticImpact('light');
                onOpenLeaderboard();
              }}
              title="Зал Славы"
              className="w-9 h-9 bg-neo-pink text-white border-3 border-black shadow-brutal-sm flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Trophy className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Row 2: Dedicated Currency Strip */}
        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t-2 border-black flex-wrap">
          <div className="flex items-center gap-1.5 bg-neo-yellow border-2 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            <CurrencyIcon type="gold" size="xs" inline />
            <span>{state.gold}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-neo-cyan border-2 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            <CurrencyIcon type="crystal" size="xs" inline />
            <span>{state.crystals}</span>
          </div>

          {state.souls > 0 && (
            <div className="flex items-center gap-1.5 bg-neo-purple text-white border-2 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs">
              <CurrencyIcon type="soul" size="xs" inline />
              <span>{state.souls}</span>
            </div>
          )}

          <div className="ml-auto font-arcade text-[11px] text-slate-700 uppercase flex items-center gap-2">
            <span className="flex items-center gap-1">
              <CurrencyIcon type="potion" size="xs" inline />
              <span>{state.potions || 0}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CurrencyIcon type="revive" size="xs" inline />
              <span>{state.reviveTokens || 0}</span>
            </span>
          </div>
        </div>
      </div>

      {/* FTUE First-Run Guide Banner */}
      {isFirstRun && (
        <div className="bg-neo-yellow border-4 border-black p-3.5 shadow-brutal space-y-1.5">
          <div className="font-arcade text-xs text-black uppercase flex items-center gap-1.5">
            <span>📜</span>
            <span>ПАМЯТКА НОВОГО ОХОТНИКА</span>
          </div>
          <ul className="text-xs font-bold text-black space-y-1 leading-snug">
            <li>1️⃣ Нажми <strong>«ШТУРМОВАТЬ»</strong> — 1 забег стоит 1 ⚡ (восстановление 3 мин).</li>
            <li>2️⃣ <strong>Вожаки и Боссы</strong> роняют экипировку, а Боссы каждые 10 эт. — 💎 и реликвии.</li>
            <li>3️⃣ Надевай и затачивай вещи во вкладке <strong>«ЭКИП»</strong>, лишнее разбирай на 💎!</li>
          </ul>
        </div>
      )}

      {/* Energy Ticker & Floor Record Pills */}
      <div className="grid grid-cols-2 gap-2.5">

        {/* 3-Min Energy Card */}
        <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-arcade text-[11px] text-black uppercase">ЭНЕРГИЯ</span>
              {state.energy < state.maxEnergy && (
                <span className="bg-black text-neo-yellow text-[11px] font-black px-1.5 py-0.2 flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimer(secondsLeft)}</span>
                </span>
              )}
            </div>
            <div className="font-arcade text-lg text-black mt-0.5 flex items-center gap-1">
              <span>{state.energy} / {state.maxEnergy}</span>
              <CurrencyIcon type="energy" size="xs" inline />
            </div>
          </div>

          <button
            onClick={onOpenStarsShop}
            className="bg-neo-lime text-black border-2 border-black font-arcade text-[11px] px-2 py-1 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] shrink-0 whitespace-nowrap flex items-center gap-1"
          >
            <CurrencyIcon type="energy" size="xs" inline />
            <span>ЗА 10</span>
            <CurrencyIcon type="star" size="xs" inline />
          </button>
        </div>

        {/* Floor Record Card */}
        <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <span className="font-arcade text-[11px] text-black uppercase block">РЕКОРД БАШНИ</span>
            <div className="font-arcade text-lg text-neo-pink mt-0.5 truncate">
              ЭТАЖ {state.maxFloor}
            </div>
          </div>

          <button
            onClick={onOpenLeaderboard}
            className="bg-neo-cyan text-black border-2 border-black font-arcade text-[11px] px-2.5 py-1 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] shrink-0"
          >
            ТОП
          </button>
        </div>

      </div>

      {/* PROMINENT HUNTER RANK PROGRESS CARD */}
      <div className="bg-white border-4 border-black p-3.5 shadow-brutal">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0">
              <RankBadge rank={currentRank.rank} size="md" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-arcade text-xs text-black uppercase truncate">
                  {currentRank.name}
                </span>
                <span className="bg-neo-lime text-black border border-black font-arcade text-[11px] px-1.5 py-0.2">
                  {rankInfo.currentMultiplierText}
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-600 uppercase truncate flex items-center gap-1">
                {rankInfo.isMax
                  ? 'ДОСТИГНУТ ВЫСШИЙ РАНГ ОХОТНИКОВ!'
                  : (
                    <>
                      <span>СЛЕДУЮЩИЙ:</span>
                      <RankBadge rank={rankInfo.nextRank.rank} size="xs" inline />
                      <span>{rankInfo.nextRank.name}</span>
                    </>
                  )}
              </div>
            </div>
          </div>

          {!rankInfo.isMax && (
            <span className="bg-neo-pink text-white font-arcade text-[11px] px-2 py-0.5 border border-black shrink-0">
              +{rankInfo.nextRank.bonusPercent}%
            </span>
          )}
        </div>

        {/* Progress Bar with Percent & Floor counter */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px] font-black uppercase text-slate-700">
            <span>ПРОГРЕСС РАНГА (ДАЁТ СТАТЫ)</span>
            <span>{rankInfo.isMax ? '100%' : `${rankInfo.progressPercent}% (${state.maxFloor}/${rankInfo.nextRank?.minFloor || 100})`}</span>
          </div>

          <div className="relative h-4 bg-white border-3 border-black p-[1px] shadow-brutal-sm overflow-hidden">
            <div
              className="h-full bg-neo-yellow transition-all duration-300"
              style={{ width: `${rankInfo.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Big Comic Fighter Hero Stage */}
      <div
        onClick={onOpenProfile}
        className="bg-white border-4 border-black p-4 shadow-brutal-lg cursor-pointer active:translate-x-[2px] active:translate-y-[2px] transition-transform text-center relative overflow-hidden"
      >
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 font-arcade text-[11px] uppercase shadow-brutal-sm">
          НАСТРОИТЬ ✎
        </div>

        {/* Avatar Display */}
        <div className="relative inline-block my-2">
          <div className="w-24 h-24 bg-neo-yellow border-4 border-black shadow-brutal flex items-center justify-center p-2">
            <GameIcon icon={state.hunterAvatar || 'mage'} size="2xl" />
          </div>

          {activePet && (
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-neo-pink border-3 border-black shadow-brutal-sm flex items-center justify-center animate-float-wiggle p-1">
              <PetAvatar pet={activePet} size="sm" />
            </div>
          )}
        </div>

        <h3 className="font-arcade text-lg text-black mt-1 uppercase">
          {state.hunterName || user.name}
        </h3>
        <p className="text-xs font-bold text-slate-700 uppercase">
          Титул: {state.hunterTitle || currentRank.name} • {currentRank.name}
        </p>

        {/* Arcade Combat Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t-3 border-black">
          <div className="bg-neo-pink text-white border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">УРОН</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.atk}</div>
          </div>

          <div className="bg-neo-lime text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">HP</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.maxHp}</div>
          </div>

          <div className="bg-neo-yellow text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">КРИТ</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.critChance}%</div>
          </div>

          <div className="bg-neo-cyan text-black border-2 border-black p-1.5 shadow-brutal-sm">
            <div className="text-[11px] font-black uppercase">УВОР</div>
            <div className="font-arcade text-sm mt-0.5">{playerStats.dodgeChance}%</div>
          </div>
        </div>

        {/* Secondary Combat & Economy Buffs Strip */}
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-[11px] font-black uppercase">
          <div className="bg-red-100 border-2 border-black py-1 px-1.5 shadow-brutal-sm flex flex-col items-center">
            <span className="text-slate-700 flex items-center gap-1">
              <GameIcon icon="blood" size="xs" inline />
              <span>ВАМП</span>
            </span>
            <span className="font-arcade text-xs text-neo-pink">{playerStats.vampirism || 0}%</span>
          </div>
          <div className="bg-neo-yellow border-2 border-black py-1 px-1.5 shadow-brutal-sm flex flex-col items-center">
            <span className="text-slate-700 flex items-center gap-1">
              <CurrencyIcon type="gold" size="xs" inline />
              <span>ЗОЛОТО</span>
            </span>
            <span className="font-arcade text-xs text-black">
              +{Math.round(((playerStats.goldMultiplier || 1.0) - 1) * 100)}%
            </span>
          </div>
          <div className="bg-neo-cyan border-2 border-black py-1 px-1.5 shadow-brutal-sm flex flex-col items-center">
            <span className="text-slate-700 flex items-center gap-1">
              <CurrencyIcon type="crystal" size="xs" inline />
              <span>КРИСТ</span>
            </span>
            <span className="font-arcade text-xs text-black">
              +{Math.round(((playerStats.crystalMultiplier || 1.0) - 1) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Logical Checkpoint & Vanguard Cache Picker */}
      {availableCheckpoints.length > 1 && (
        <div className="bg-white border-4 border-black p-3.5 shadow-brutal space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-arcade text-xs text-black uppercase flex items-center gap-1">
              <span>🚩</span>
              <span>РУБЕЖ АВАНГАРДА:</span>
            </span>
            <span className="bg-neo-yellow border-2 border-black px-2 py-0.5 font-arcade text-xs">
              ЭТАЖ {selectedCheckpoint}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {availableCheckpoints.map(cp => {
              const isSelected = selectedCheckpoint === cp.floor;
              return (
                <button
                  key={cp.floor}
                  onClick={() => {
                    hapticImpact('light');
                    setSelectedCheckpoint(cp.floor);
                  }}
                  className={`px-3 py-1.5 border-3 border-black font-arcade text-xs shrink-0 shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] flex flex-col items-center min-w-[92px] transition-all ${
                    isSelected
                      ? 'bg-neo-pink text-white ring-2 ring-black'
                      : 'bg-white text-black [@media(hover:hover)]:hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[11px] uppercase">{cp.floor === 1 ? '1 СТАРТ' : `${cp.floor} ЭТ`}</span>
                  {cp.bonusRelics > 0 && (
                    <span className={`text-[11px] font-black px-1.5 mt-0.5 ${isSelected ? 'bg-black text-neo-yellow' : 'bg-slate-200 text-slate-700'}`}>
                      +{cp.bonusRelics} РЕЛ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {activeCheckpointObj.bonusRelics > 0 && (
            <div className="bg-neo-lime/30 border border-black p-2 text-[11px] font-black text-slate-800 flex items-center gap-1.5">
              <span>🎁</span>
              <span>
                ДАР АВАНГАРДА: Старт с этажа {selectedCheckpoint} дает +{activeCheckpointObj.bonusRelics} случайных босс-реликвий
                {activeCheckpointObj.bonusPotions > 0 ? ` и +${activeCheckpointObj.bonusPotions} зелья!` : '!'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Giant Action Button: ENTER TOWER */}
      <div className="space-y-2.5">
        <button
          onClick={handleStart}
          className="w-full py-4 bg-neo-pink [@media(hover:hover)]:hover:bg-pink-600 active:translate-x-[3px] active:translate-y-[3px] active:shadow-brutal-press text-white border-4 border-black shadow-brutal-lg font-arcade text-lg flex items-center justify-center gap-3 transition-all"
        >
          <Swords className="w-6 h-6 stroke-[3]" />
          <span>ШТУРМОВАТЬ ЭТАЖ {selectedCheckpoint}!</span>
          <span className="bg-black text-neo-yellow border border-white px-2 py-0.5 text-xs font-black">
            -1 ⚡
          </span>
        </button>

        {/* Boss Banner Card */}
        <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-10 h-10 shrink-0">
              <MonsterAvatar isBoss floor={nextBossFloor} size="lg" />
            </span>
            <div className="min-w-0">
              <div className="font-arcade text-xs text-black truncate uppercase">
                БОСС: {nextBoss.name}
              </div>
              <div className="text-[11px] font-bold text-slate-600 truncate">
                ЖДЕТ НА {nextBossFloor} ЭТАЖЕ
              </div>
            </div>
          </div>

          <span className="bg-neo-lime border-2 border-black px-2.5 py-1 font-arcade text-xs shadow-brutal-sm shrink-0 flex items-center gap-1">
            <span>+{nextBoss.goldReward}</span>
            <CurrencyIcon type="gold" size="xs" inline />
          </span>
        </div>
      </div>

      {/* Rebirth Temple Card (calm before floor 20 unlock, vibrant once unlocked) */}
      <div className={`border-4 border-black p-3.5 shadow-brutal flex items-center justify-between gap-2 ${
        state.maxFloor >= 20 ? 'bg-neo-purple text-white' : 'bg-slate-100 text-black'
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-10 h-10 border-2 flex items-center justify-center p-1 shrink-0 shadow-brutal-sm ${
            state.maxFloor >= 20 ? 'bg-black text-white border-white' : 'bg-white text-black border-black'
          }`}>
            <CurrencyIcon type="soul" size="md" />
          </div>
          <div className="min-w-0">
            <div className="font-arcade text-xs uppercase truncate">ХРАМ ПЕРЕРОЖДЕНИЯ</div>
            <div className={`text-[11px] font-bold truncate ${
              state.maxFloor >= 20 ? 'text-neo-yellow' : 'text-slate-600'
            }`}>
              {state.maxFloor >= 20 ? `ДОСТУПНО: +${availableSouls} ДУШ` : '🔒 Откроется на 20 этаже'}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenRebirthModal}
          className={`border-3 border-black px-3 py-1.5 font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] shrink-0 ${
            state.maxFloor >= 20 ? 'bg-neo-yellow text-black' : 'bg-white text-black'
          }`}
        >
          {state.maxFloor >= 20 ? 'ВОЙТИ' : 'ОБЗОР'}
        </button>
      </div>

      {/* Invite Squad Card */}
      <div className="bg-white border-3 border-black p-3 shadow-brutal flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="font-arcade text-xs text-black uppercase truncate">ПОЗОВИ ДРУЗЕЙ</div>
          <div className="text-[11px] font-bold text-slate-600 leading-tight">
            Сравните рекорды этажей в Зале Славы!
          </div>
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
