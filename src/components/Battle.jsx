import React, { useState, useEffect } from 'react';
import {
  Shield,
  Sparkles,
  Heart,
  Zap,
  Swords,
  Skull,
  ArrowRight,
  RotateCcw,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  Package
} from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';
import { generateFloorMonsters } from '../data/monsters';
import { SKILLS } from '../data/skills';
import { PETS } from '../data/pets';
import { rollEquipmentDrop } from '../data/equipment';
import confetti from 'canvas-confetti';

export default function Battle({
  playerStats,
  floor,
  activePetId,
  initialHp,
  potions = 1,
  runArtifacts = [],
  onUsePotion,
  onRunEnd,
  onFloorCleared,
  onOpenReviveModal
}) {
  // Pack of monsters for this floor (3-5 for regular, 1 for Boss)
  const [monsterPack, setMonsterPack] = useState(() => generateFloorMonsters(floor));
  const [monsterIdx, setMonsterIdx] = useState(0);

  const currentMonster = monsterPack[monsterIdx] || monsterPack[0];
  const [monsterHp, setMonsterHp] = useState(currentMonster?.hp || 100);
  const [monsterGhostHp, setMonsterGhostHp] = useState(currentMonster?.maxHp || 100);

  const [playerHp, setPlayerHp] = useState(initialHp || playerStats.maxHp);
  const [playerGhostHp, setPlayerGhostHp] = useState(initialHp || playerStats.maxHp);

  // Accumulated floor bounty across all monsters in the pack
  const [accumulatedGold, setAccumulatedGold] = useState(0);
  const [accumulatedCrystals, setAccumulatedCrystals] = useState(0);
  const [droppedItems, setDroppedItems] = useState([]);

  const [monsterStunned, setMonsterStunned] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [skills, setSkills] = useState(SKILLS);
  const [combatLog, setCombatLog] = useState([`ШТУРМ: ЭТАЖ ${floor}! ВРАГ: ${currentMonster?.name}`]);
  const [floatingText, setFloatingText] = useState([]);
  const [combo, setCombo] = useState(0);

  const [isAttacking, setIsAttacking] = useState(false);
  const [isMonsterHurt, setIsMonsterHurt] = useState(false);
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [battleState, setBattleState] = useState('fighting');

  const activePet = PETS.find(p => p.id === activePetId);

  // Initialize floor pack and relic triggers
  useEffect(() => {
    const pack = generateFloorMonsters(floor);
    setMonsterPack(pack);
    setMonsterIdx(0);
    setAccumulatedGold(0);
    setAccumulatedCrystals(0);
    setDroppedItems([]);

    const first = pack[0];
    const hasBomb = runArtifacts?.some(a => a.id === 'infernal_bomb');
    let startHp = first.maxHp;
    if (hasBomb) {
      const burn = Math.floor(first.maxHp * 0.2);
      startHp = Math.max(1, first.maxHp - burn);
    }

    setMonsterHp(startHp);
    setMonsterGhostHp(startHp);
    setBattleState('fighting');
    setIsAttacking(false);
    setIsDefending(false);
    setMonsterStunned(false);
    setIsMonsterHurt(false);
    setIsMonsterAttacking(false);
    setIsPlayerHurt(false);
    setCombo(0);
    setCombatLog([`ШТУРМ: ЭТАЖ ${floor}! ВРАГ: ${first.name}`]);
    setSkills(SKILLS.map(s => ({ ...s, currentCd: 0 })));

    if (hasBomb) {
      setTimeout(() => {
        addFloatingText(`💣 -${Math.floor(first.maxHp * 0.2)}`, 'crit', false);
        addLog(`💣 ОГНЕННАЯ БОМБА СЖИГАЕТ 20% HP ВРАГА!`);
      }, 300);
    }
  }, [floor]);

  // Sync ghost HP bars
  useEffect(() => {
    const t = setTimeout(() => {
      setMonsterGhostHp(monsterHp);
    }, 300);
    return () => clearTimeout(t);
  }, [monsterHp]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPlayerGhostHp(playerHp);
    }, 300);
    return () => clearTimeout(t);
  }, [playerHp]);

  const addFloatingText = (text, type = 'damage', isPlayer = false) => {
    const id = Date.now() + Math.random();
    setFloatingText(prev => [...prev, { id, text, type, isPlayer }]);
    setTimeout(() => {
      setFloatingText(prev => prev.filter(item => item.id !== id));
    }, 850);
  };

  const addLog = (msg) => {
    setCombatLog(prev => [msg, ...prev.slice(0, 2)]);
  };

  const tickCooldowns = () => {
    setSkills(prev => prev.map(s => ({
      ...s,
      currentCd: Math.max(0, s.currentCd - 1)
    })));
  };

  // Switch to next monster in pack or trigger floor victory
  const handleMonsterDefeated = () => {
    // 1. Tally bounty from this monster
    const monsterGold = Math.floor(currentMonster.goldReward * (playerStats.goldMultiplier || 1.0));
    const monsterCrystals = currentMonster.crystalReward || 0;

    let newDropped = [...droppedItems];
    if (currentMonster.dropEquipment) {
      const item = rollEquipmentDrop(floor);
      newDropped.push(item);
      addFloatingText(`🎁 ${item.name}!`, 'crit', false);
      addLog(`🎁 ВЫБИТ ПРЕДМЕТ: ${item.name.toUpperCase()}!`);
    }

    const nextGold = accumulatedGold + monsterGold;
    const nextCrystals = accumulatedCrystals + monsterCrystals;

    setAccumulatedGold(nextGold);
    setAccumulatedCrystals(nextCrystals);
    setDroppedItems(newDropped);

    const nextIndex = monsterIdx + 1;

    // Check if there are more monsters remaining on this floor
    if (nextIndex < monsterPack.length) {
      // Transition to next monster
      addFloatingText('ВРАГ ПОВЕРЖЕН!', 'crit', false);
      addLog(`💀 ${currentMonster.name} ПОВЕРЖЕН! СЛЕДУЮЩИЙ НАСТУПАЕТ!`);
      sounds.playCrit();
      hapticImpact('medium');

      setTimeout(() => {
        const nextMon = monsterPack[nextIndex];
        setMonsterIdx(nextIndex);
        setMonsterHp(nextMon.maxHp);
        setMonsterGhostHp(nextMon.maxHp);
        setMonsterStunned(false);
        setIsDefending(false);
        setIsAttacking(false);
        tickCooldowns();
        addLog(`⚔️ В БОЙ ВСТУПАЕТ: ${nextMon.name}!`);
      }, 400);

    } else {
      // All monsters on floor defeated -> Floor Victory!
      handleVictory(nextGold, nextCrystals, newDropped);
    }
  };

  const handleAttack = () => {
    if (battleState !== 'fighting' || isAttacking) return;
    setIsAttacking(true);
    hapticImpact('medium');

    const nextCombo = combo + 1;
    setCombo(nextCombo);

    const comboBonus = 1 + (nextCombo - 1) * 0.05;
    const isCrit = Math.random() * 100 < playerStats.critChance;
    let damage = Math.floor(playerStats.atk * (0.9 + Math.random() * 0.25) * comboBonus);

    if (isCrit) {
      damage = Math.floor(damage * 1.9);
      sounds.playCrit();
      addFloatingText(`💥 КРИТ! -${damage}`, 'crit', false);
    } else {
      sounds.playAttack();
      addFloatingText(`-${damage}`, 'damage', false);
    }

    setIsMonsterHurt(true);
    setTimeout(() => setIsMonsterHurt(false), 250);

    // Vampirism from equipment & Relic Chalice
    const hasChalice = runArtifacts?.some(a => a.id === 'vampiric_chalice');
    const totalVamp = (playerStats.vampirism || 0) + (hasChalice ? 0.15 : 0);
    if (totalVamp > 0) {
      const vHeal = Math.max(1, Math.floor(damage * totalVamp));
      const healedHp = Math.min(playerStats.maxHp, playerHp + vHeal);
      setPlayerHp(healedHp);
      addFloatingText(`+${vHeal} HP`, 'heal', true);
    }

    const newMonsterHp = Math.max(0, monsterHp - damage);
    setMonsterHp(newMonsterHp);
    addLog(`ВЫ НАНЕСЛИ ${damage} УРОНА! ${isCrit ? '💥 КРИТИЧЕСКИЙ УДАР!' : ''}`);

    tickCooldowns();

    if (newMonsterHp <= 0) {
      handleMonsterDefeated();
    } else {
      setTimeout(() => {
        monsterTurn();
        setIsAttacking(false);
      }, 400);
    }
  };

  const handleSkill = (skill) => {
    if (battleState !== 'fighting' || isAttacking || skill.currentCd > 0) return;
    setIsAttacking(true);
    hapticImpact('heavy');
    sounds.playSkill();

    const nextCombo = combo + 1;
    setCombo(nextCombo);

    const isThunderCore = skill.id === 'thunder_strike' && runArtifacts?.some(a => a.id === 'thunder_core');
    const skillMultiplier = isThunderCore ? skill.multiplier * 1.5 : skill.multiplier;

    let damage = Math.floor(playerStats.atk * skillMultiplier * (1 + (nextCombo - 1) * 0.05));
    const isCrit = Math.random() * 100 < (playerStats.critChance + (skill.critBonus || 0));

    if (isCrit) {
      damage = Math.floor(damage * 1.9);
      addFloatingText(`💥 КРИТ! -${damage}`, 'crit', false);
    } else {
      addFloatingText(`⚡ -${damage}`, 'skill', false);
    }

    setIsMonsterHurt(true);
    setTimeout(() => setIsMonsterHurt(false), 250);

    if (skill.healRatio > 0) {
      const healAmt = Math.floor(damage * skill.healRatio);
      const newHp = Math.min(playerStats.maxHp, playerHp + healAmt);
      setPlayerHp(newHp);
      sounds.playHeal();
      addFloatingText(`+${healAmt} HP`, 'heal', true);
      addLog(`ВАМПИРИЗМ: +${healAmt} HP!`);
    }

    if (skill.shieldRatio > 0) {
      setIsDefending(true);
      addLog(`🛡️ БАРЬЕР ТИТАНА АКТИВИРОВАН (-70% УРОНА)!`);
    }

    if (skill.id === 'thunder_strike') {
      setMonsterStunned(true);
      addFloatingText('ОГЛУШЕНИЕ! ⚡', 'dodge', false);
      addLog(`⚡ КАРА МОЛНИИ: ${currentMonster.name} ОГЛУШЕН!`);
    }

    const newMonsterHp = Math.max(0, monsterHp - damage);
    setMonsterHp(newMonsterHp);
    addLog(`[${skill.name.toUpperCase()}] НАНЕС ${damage} УРОНА!`);

    setSkills(prev => prev.map(s => s.id === skill.id ? { ...s, currentCd: s.cooldown } : { ...s, currentCd: Math.max(0, s.currentCd - 1) }));

    if (newMonsterHp <= 0) {
      handleMonsterDefeated();
    } else {
      setTimeout(() => {
        monsterTurn();
        setIsAttacking(false);
      }, 400);
    }
  };

  const handlePotion = () => {
    if (battleState !== 'fighting' || potions <= 0 || playerHp >= playerStats.maxHp) return;
    sounds.playHeal();
    hapticImpact('light');
    const healAmt = Math.floor(playerStats.maxHp * 0.5);
    const newHp = Math.min(playerStats.maxHp, playerHp + healAmt);
    setPlayerHp(newHp);
    if (onUsePotion) onUsePotion();
    addFloatingText(`+${healAmt} HP`, 'heal', true);
    addLog(`ЗЕЛЬЕ: +${healAmt} HP!`);
    tickCooldowns();
  };

  const monsterTurn = () => {
    setIsMonsterAttacking(true);
    setTimeout(() => setIsMonsterAttacking(false), 300);

    if (monsterStunned) {
      setMonsterStunned(false);
      sounds.playSkill();
      addFloatingText('ОГЛУШЕН! ⚡', 'dodge', false);
      addLog(`⚡ ${currentMonster.name.toUpperCase()} ОГЛУШЕН И ПРОПУСКАЕТ ХОД!`);
      setIsAttacking(false);
      return;
    }

    const isDodged = Math.random() * 100 < playerStats.dodgeChance;
    if (isDodged) {
      addFloatingText('УКЛОНЕНИЕ!', 'dodge', true);
      addLog(`УВОРОТ ОТ АТАКИ ВРАГА!`);
      setIsDefending(false);
      setIsAttacking(false);
      return;
    }

    setCombo(0);

    let monsterDmg = Math.floor(currentMonster.atk * (0.85 + Math.random() * 0.3));
    if (isDefending) {
      monsterDmg = Math.floor(monsterDmg * 0.3);
      setIsDefending(false);
      addLog(`🛡️ ЩИТ ТИТАНА ПОГЛОТИЛ 70% УРОНА!`);
    }

    sounds.playHit();
    hapticImpact('heavy');
    setIsPlayerHurt(true);
    setTimeout(() => setIsPlayerHurt(false), 250);

    const newPlayerHp = Math.max(0, playerHp - monsterDmg);
    setPlayerHp(newPlayerHp);
    addFloatingText(`-${monsterDmg}`, 'damage', true);
    addLog(`${currentMonster.name} НАНЕС ${monsterDmg} УРОНА!`);

    if (newPlayerHp <= 0) {
      handleDefeat();
    }
  };

  const handleVictory = (finalGold, finalCrystals, allDropped) => {
    setBattleState('won');
    sounds.playVictory();
    hapticNotification('success');
    setIsAttacking(false);

    if (currentMonster.isBoss) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    addLog(`🏆 ЭТАЖ ${floor} ПОЛНОСТЬЮ ЗАЧИЩЕН!`);
  };

  const handleDefeat = () => {
    setBattleState('lost');
    sounds.playDefeat();
    hapticNotification('error');
    setIsAttacking(false);
    addLog(`💀 ВЫ ПАЛИ НА ЭТАЖЕ ${floor}!`);
  };

  const handleReviveAction = () => {
    setPlayerHp(playerStats.maxHp);
    setPlayerGhostHp(playerStats.maxHp);
    setBattleState('fighting');
    sounds.playHeal();
    hapticNotification('success');
    addFloatingText('ВОСКРЕШЕН!', 'heal', true);
    addLog('ВОЗРОЖДЕНИЕ ЗВЕЗДАМИ! В БОЙ!');
  };

  return (
    <div className="w-full min-h-[calc(100dvh-20px)] flex flex-col justify-between py-1 select-none font-sans">

      {/* Top Bar - Clean display with Floor number, bounty, and exit */}
      <div className="bg-white border-4 border-black p-2.5 shadow-brutal flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 bg-neo-pink text-white border-3 border-black shadow-brutal-sm flex items-center justify-center font-arcade text-lg shrink-0">
            {floor}
          </div>
          <div className="min-w-0">
            <div className="font-arcade text-[10px] text-neo-purple uppercase truncate">
              {currentMonster.isBoss ? '⚠️ БОСС ЭТАЖА' : 'БАШНЯ ИСПЫТАНИЙ'}
            </div>
            <div className="font-arcade text-xs text-black truncate uppercase">
              {currentMonster.isBoss ? currentMonster.title : `ЭТАЖ ${floor}`}
            </div>
          </div>
        </div>

        {/* Current accumulated bounty and retreat button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 bg-neo-yellow border-2 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            <span>🪙</span>
            <span>+{accumulatedGold + Math.floor(currentMonster.goldReward * (playerStats.goldMultiplier || 1.0))}</span>
          </div>

          <button
            onClick={() => {
              hapticImpact('light');
              onRunEnd({ gold: accumulatedGold, crystals: accumulatedCrystals, floor });
            }}
            title="Отступить в лагерь"
            className="w-7 h-7 bg-white hover:bg-neo-pink hover:text-white border-2 border-black flex items-center justify-center font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Arcade Arena Display */}
      <div className="relative my-auto flex flex-col items-center justify-center py-2">

        {/* Floating Combat Numbers */}
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
          {floatingText.map(item => (
            <div
              key={item.id}
              className={`absolute font-arcade text-2xl sm:text-3xl animate-damage-pop ${
                item.type === 'crit'
                  ? 'text-neo-yellow drop-shadow-[2px_2px_0px_#000]'
                  : item.type === 'heal'
                  ? 'text-neo-lime drop-shadow-[2px_2px_0px_#000]'
                  : item.type === 'dodge'
                  ? 'text-neo-cyan drop-shadow-[2px_2px_0px_#000]'
                  : 'text-neo-pink drop-shadow-[2px_2px_0px_#000]'
              } ${item.isPlayer ? '-bottom-10' : '-top-10'}`}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Combo Multiplier Badge */}
        {combo > 1 && (
          <div className="absolute top-0 right-2 z-20 flex items-center gap-1 bg-black text-neo-yellow border-2 border-white px-3 py-1 font-arcade text-xs shadow-brutal animate-combo-pop">
            <Flame className="w-4 h-4 fill-neo-yellow" />
            <span>COMBO x{combo}!</span>
          </div>
        )}

        {/* Monster Entity Card */}
        <div className={`relative flex flex-col items-center transition-all duration-200 ${
          isMonsterHurt ? 'animate-shake scale-95 brightness-125' : ''
        } ${isMonsterAttacking ? 'animate-monster-lunge' : ''}`}>

          {currentMonster.isBoss && (
            <div className="absolute -top-3.5 bg-neo-pink text-white border-2 border-black px-3 py-0.5 font-arcade text-[10px] shadow-brutal-sm uppercase z-10">
              ГЛАВНЫЙ БОСС
            </div>
          )}

          {/* Monster Avatar Frame */}
          <div className={`w-28 h-28 sm:w-32 sm:h-32 border-4 border-black shadow-brutal-lg flex items-center justify-center text-5xl sm:text-6xl ${
            currentMonster.isBoss ? 'bg-neo-pink' : (currentMonster.isLeader ? 'bg-neo-yellow' : 'bg-white')
          }`}>
            <span className="select-none filter drop-shadow-md">{currentMonster.avatar}</span>
          </div>

          <div className="text-center mt-2 px-2 w-full flex flex-col items-center">
            <h3 className="font-arcade text-sm sm:text-base text-black uppercase break-words">
              {currentMonster.name}
            </h3>

            {/* Boss Dialogue */}
            {currentMonster.isBoss && currentMonster.dialog && (
              <div className="mt-1.5 bg-neo-yellow text-black border-2 border-black px-3 py-1 shadow-brutal-sm font-sans font-black text-xs max-w-[280px] break-words">
                "{currentMonster.dialog}"
              </div>
            )}

            {currentMonster.isBoss && currentMonster.specialSkill && (
              <div className="mt-1 bg-black text-neo-pink border border-white px-2 py-0.5 font-arcade text-[10px] uppercase">
                ⚡ НАВЫК: {currentMonster.specialSkill}
              </div>
            )}

            {!currentMonster.isBoss && currentMonster.intro && (
              <p className="text-xs font-bold text-slate-700 italic mt-0.5 line-clamp-1">
                "{currentMonster.intro}"
              </p>
            )}
          </div>

          {/* Monster HP Bar */}
          <div className="w-56 sm:w-64 mt-2">
            <div className="flex justify-between text-xs font-black mb-1 uppercase">
              <span className="text-neo-pink">HP ВРАГА</span>
              <span>{monsterHp} / {currentMonster.maxHp}</span>
            </div>

            <div className="relative h-4 bg-white border-3 border-black p-[1px] shadow-brutal-sm overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-neo-yellow transition-all duration-300"
                style={{ width: `${(monsterGhostHp / currentMonster.maxHp) * 100}%` }}
              />
              <div
                className="relative h-full bg-neo-pink transition-all duration-100"
                style={{ width: `${(monsterHp / currentMonster.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Combat Ticker */}
        <div className="w-full bg-black text-neo-yellow border-3 border-white px-3 py-1.5 mt-3 text-center shadow-brutal font-arcade text-xs truncate">
          {combatLog[0] || 'БОЙ ИДЕТ...'}
        </div>
      </div>

      {/* Hero Controls: Arcade Actions */}
      <div className="space-y-2 pb-safe">

        {/* Player HP Bar */}
        <div className={`bg-white border-4 border-black p-2.5 shadow-brutal transition-all ${
          isPlayerHurt ? 'bg-red-200 animate-shake' : ''
        }`}>
          <div className="flex justify-between items-center mb-1 gap-2">
            <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto scrollbar-none">
              <span className="font-arcade text-xs text-black uppercase shrink-0">ОХОТНИК</span>
              {activePet && (
                <span className="bg-neo-yellow text-black border-2 border-black px-1.5 py-0.2 font-arcade text-[10px] shrink-0">
                  {activePet.avatar} {activePet.name}
                </span>
              )}
              {runArtifacts && runArtifacts.length > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  {runArtifacts.map((art, idx) => (
                    <span key={idx} title={art.name} className="text-xs bg-slate-100 border border-black px-1 shadow-brutal-sm">
                      {art.icon}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="font-arcade text-xs text-neo-pink shrink-0">
              {playerHp} / {playerStats.maxHp} HP
            </div>
          </div>

          <div className="relative h-4 bg-white border-3 border-black p-[1px] shadow-brutal-sm overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-slate-300 transition-all duration-300"
              style={{ width: `${(playerGhostHp / playerStats.maxHp) * 100}%` }}
            />
            <div
              className="relative h-full bg-neo-lime transition-all duration-100"
              style={{ width: `${(playerHp / playerStats.maxHp) * 100}%` }}
            />
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleAttack}
            disabled={battleState !== 'fighting' || isAttacking}
            className="flex items-center justify-center gap-2 bg-neo-pink hover:bg-pink-600 active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-white py-3 px-3 border-3 border-black shadow-brutal font-arcade text-sm disabled:opacity-50 transition-all uppercase"
          >
            <Swords className="w-5 h-5 stroke-[3]" />
            <span>УДАР!</span>
          </button>

          <button
            onClick={handlePotion}
            disabled={battleState !== 'fighting' || potions <= 0 || playerHp >= playerStats.maxHp}
            className="flex items-center justify-center gap-2 bg-neo-lime hover:bg-lime-400 active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-press text-black py-3 px-3 border-3 border-black shadow-brutal font-arcade text-sm disabled:opacity-50 transition-all uppercase"
          >
            <Heart className="w-5 h-5 fill-black stroke-[3]" />
            <span>ЗЕЛЬЕ ({potions})</span>
          </button>
        </div>

        {/* 4 Roguelite Combat Skills */}
        <div className="grid grid-cols-2 gap-2">
          {skills.map(skill => {
            const onCd = skill.currentCd > 0;
            return (
              <button
                key={skill.id}
                onClick={() => handleSkill(skill)}
                disabled={battleState !== 'fighting' || onCd || isAttacking}
                className={`relative overflow-hidden flex items-center justify-between p-2 border-3 border-black font-sans text-left transition-all ${
                  onCd
                    ? 'bg-slate-200 text-slate-500 shadow-none'
                    : 'bg-white hover:bg-neo-yellow active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-black shadow-brutal-sm'
                }`}
              >
                {onCd && (
                  <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-10 font-arcade text-neo-yellow text-xs">
                    КД: {skill.currentCd}х
                  </div>
                )}

                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{skill.icon}</span>
                  <div className="min-w-0">
                    <div className="font-arcade text-[11px] text-black uppercase truncate">
                      {skill.name}
                    </div>
                    <div className="text-[9px] font-bold text-slate-700 truncate">
                      {skill.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Victory Modal */}
      {battleState === 'won' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 flex items-center justify-center p-4 text-center animate-fadeIn">
          <div className="bg-neo-yellow border-4 border-black p-5 shadow-brutal-lg max-w-xs w-full flex flex-col items-center">
            <div className="w-16 h-16 bg-white border-3 border-black flex items-center justify-center text-4xl mb-3 shadow-brutal">
              🏆
            </div>
            <h2 className="font-arcade text-xl text-black uppercase mb-1">
              ЭТАЖ {floor} ЗАЧИЩЕН!
            </h2>
            <p className="text-xs font-bold text-black mb-3">
              ВСЕ ВРАГИ ПОВЕРЖЕНЫ!
            </p>

            {/* Bounty Card */}
            <div className="flex flex-col items-center justify-center gap-1.5 bg-white border-3 border-black p-2.5 w-full mb-3 shadow-brutal-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 font-arcade text-base text-black">
                  <span>🪙</span>
                  <span>+{accumulatedGold}</span>
                </div>
                {accumulatedCrystals > 0 && (
                  <div className="flex items-center gap-1.5 font-arcade text-base text-neo-purple">
                    <span>💎</span>
                    <span>+{accumulatedCrystals}</span>
                  </div>
                )}
              </div>

              {/* Dropped Equipment Badge if any */}
              {droppedItems.length > 0 && (
                <div className="w-full mt-1.5 pt-1.5 border-t border-black text-left">
                  <span className="font-arcade text-[10px] text-black uppercase block mb-1">
                    🎁 НАЙДЕНО СНАРЯЖЕНИЕ:
                  </span>
                  <div className="space-y-1">
                    {droppedItems.map((item, idx) => (
                      <div key={idx} className="bg-neo-pink text-white border border-black px-2 py-0.5 font-arcade text-[10px] flex items-center gap-1">
                        <span>{item.icon}</span>
                        <span className="truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => onFloorCleared({
                  gold: accumulatedGold,
                  crystals: accumulatedCrystals,
                  floor,
                  remainingHp: playerHp,
                  isBoss: currentMonster.isBoss,
                  droppedItems
                })}
                className="w-full py-3 bg-neo-pink text-white border-3 border-black font-arcade text-sm shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 uppercase transition-all"
              >
                <span>СЛЕД. ЭТАЖ ({floor + 1})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onRunEnd({
                  gold: accumulatedGold,
                  crystals: accumulatedCrystals,
                  floor,
                  droppedItems
                })}
                className="w-full py-2 bg-white text-black border-2 border-black font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] uppercase"
              >
                В ХАБ С ДОБЫЧЕЙ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Defeat Screen */}
      {battleState === 'lost' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 flex items-center justify-center p-4 text-center animate-fadeIn">
          <div className="bg-white border-4 border-black p-5 shadow-brutal-lg max-w-xs w-full flex flex-col items-center">
            <div className="w-16 h-16 bg-neo-pink text-white border-3 border-black flex items-center justify-center text-4xl mb-3 shadow-brutal">
              💀
            </div>
            <h2 className="font-arcade text-xl text-black uppercase mb-1">
              ТЫ ПАЛ В БОЮ!
            </h2>
            <p className="text-xs font-bold text-slate-700 mb-4">
              ЭТАЖ {floor} ОКАЗАЛСЯ СЛИШКОМ ЖЕСТКИМ!
            </p>

            <div className="w-full space-y-2">
              <button
                onClick={() => onOpenReviveModal(handleReviveAction)}
                className="w-full py-3 bg-neo-yellow text-black border-3 border-black font-arcade text-sm shadow-brutal active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 uppercase"
              >
                <Sparkles className="w-4 h-4 stroke-[3]" />
                <span>ВОСКРЕСНУТЬ (15 ⭐️)</span>
              </button>

              <button
                onClick={() => onRunEnd({ gold: accumulatedGold, crystals: accumulatedCrystals, floor })}
                className="w-full py-2 bg-slate-100 text-black border-2 border-black font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] uppercase"
              >
                СДАТЬСЯ И УЙТИ В ХАБ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
