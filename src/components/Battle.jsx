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
  TrendingUp
} from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { hapticImpact, hapticNotification } from '../utils/telegram';
import { generateMonster } from '../data/monsters';
import { SKILLS } from '../data/skills';
import { PETS } from '../data/pets';
import confetti from 'canvas-confetti';

export default function Battle({ 
  playerStats, 
  floor, 
  activePetId, 
  initialHp,
  potions = 2,
  onUsePotion,
  onRunEnd, 
  onFloorCleared, 
  onOpenReviveModal 
}) {
  const [monster, setMonster] = useState(() => generateMonster(floor));
  const [playerHp, setPlayerHp] = useState(initialHp || playerStats.maxHp);
  const [playerGhostHp, setPlayerGhostHp] = useState(initialHp || playerStats.maxHp);
  const [monsterGhostHp, setMonsterGhostHp] = useState(() => generateMonster(floor).maxHp);

  const [monsterStunned, setMonsterStunned] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [skills, setSkills] = useState(SKILLS);
  const [combatLog, setCombatLog] = useState([`РАУНД НАЧАТ! ЭТАЖ ${floor}: ${generateMonster(floor).name}`]);
  const [floatingText, setFloatingText] = useState([]);
  const [combo, setCombo] = useState(0);

  const [isAttacking, setIsAttacking] = useState(false);
  const [isMonsterHurt, setIsMonsterHurt] = useState(false);
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [battleState, setBattleState] = useState('fighting');

  const activePet = PETS.find(p => p.id === activePetId);

  useEffect(() => {
    const newMonster = generateMonster(floor);
    setMonster(newMonster);
    setMonsterGhostHp(newMonster.maxHp);
    setBattleState('fighting');
    setIsAttacking(false);
    setIsDefending(false);
    setMonsterStunned(false);
    setIsMonsterHurt(false);
    setIsMonsterAttacking(false);
    setIsPlayerHurt(false);
    setCombo(0);
    setCombatLog([`РАУНД НАЧАТ! ЭТАЖ ${floor}: ${newMonster.name}`]);
    setSkills(SKILLS.map(s => ({ ...s, currentCd: 0 })));
  }, [floor]);

  useEffect(() => {
    const t = setTimeout(() => {
      setMonsterGhostHp(monster.hp);
    }, 350);
    return () => clearTimeout(t);
  }, [monster.hp]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPlayerGhostHp(playerHp);
    }, 350);
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

    const newMonsterHp = Math.max(0, monster.hp - damage);
    setMonster(prev => ({ ...prev, hp: newMonsterHp }));
    addLog(`ВЫ НАНЕСЛИ ${damage} УРОНА! ${isCrit ? '💥 КРИТИЧЕСКИЙ УДАР!' : ''}`);

    tickCooldowns();

    if (newMonsterHp <= 0) {
      handleVictory();
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

    let damage = Math.floor(playerStats.atk * skill.multiplier * (1 + (nextCombo - 1) * 0.05));
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
      addLog(`⚡ КАРА МОЛНИИ: ${monster.name} ОГЛУШЕН!`);
    }

    const newMonsterHp = Math.max(0, monster.hp - damage);
    setMonster(prev => ({ ...prev, hp: newMonsterHp }));
    addLog(`[${skill.name.toUpperCase()}] НАНЕС ${damage} УРОНА!`);

    setSkills(prev => prev.map(s => s.id === skill.id ? { ...s, currentCd: s.cooldown } : { ...s, currentCd: Math.max(0, s.currentCd - 1) }));

    if (newMonsterHp <= 0) {
      handleVictory();
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
      addLog(`⚡ ${monster.name.toUpperCase()} ОГЛУШЕН И ПРОПУСКАЕТ ХОД!`);
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

    let monsterDmg = Math.floor(monster.atk * (0.85 + Math.random() * 0.3));
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
    addLog(`${monster.name} НАНЕС ${monsterDmg} УРОНА!`);

    if (newPlayerHp <= 0) {
      handleDefeat();
    }
  };

  const handleVictory = () => {
    setBattleState('won');
    sounds.playVictory();
    hapticNotification('success');
    setIsAttacking(false);

    if (monster.isBoss) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    addLog(`🏆 ПОБЕДА! ${monster.name.toUpperCase()} ПОВЕРЖЕН!`);
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
      
      {/* Neo-Brutal Arcade Arena Top Bar */}
      <div className="bg-white border-4 border-black p-2.5 shadow-brutal flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 bg-neo-pink text-white border-3 border-black shadow-brutal-sm flex items-center justify-center font-arcade text-lg shrink-0">
            {floor}
          </div>
          <div className="min-w-0">
            <div className="font-arcade text-[10px] text-neo-purple uppercase truncate">
              {monster.isBoss ? '⚠️ БОСС ЭТАЖА' : 'АРЕНА БИТВЫ'}
            </div>
            <div className="font-arcade text-xs text-black truncate uppercase">
              {monster.isBoss ? monster.title : `ЭТАЖ ${floor}`}
            </div>
          </div>
        </div>

        {/* Bounty & Retreat */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 bg-neo-yellow border-2 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
            <span>🪙</span>
            <span>+{monster.goldReward}</span>
          </div>
          {monster.crystalReward > 0 && (
            <div className="flex items-center gap-1 bg-neo-cyan border-2 border-black px-2 py-0.5 shadow-brutal-sm font-arcade text-xs text-black">
              <span>💎</span>
              <span>+{monster.crystalReward}</span>
            </div>
          )}
          <button
            onClick={() => {
              hapticImpact('light');
              onRunEnd({ gold: 0, crystals: 0, floor });
            }}
            title="Отступить в лагерь"
            className="w-7 h-7 bg-white hover:bg-neo-pink hover:text-white border-2 border-black flex items-center justify-center font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Arcade Arena Display */}
      <div className="relative my-auto flex flex-col items-center justify-center py-3">
        
        {/* Floating Comic Numbers */}
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

        {/* Comic Combo Badge */}
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
          
          {monster.isBoss && (
            <div className="absolute -top-3.5 bg-neo-pink text-white border-2 border-black px-3 py-0.5 font-arcade text-[10px] shadow-brutal-sm uppercase z-10">
              ГЛАВНЫЙ БОСС
            </div>
          )}

          {/* Monster Frame */}
          <div className={`w-28 h-28 sm:w-32 sm:h-32 border-4 border-black shadow-brutal-lg flex items-center justify-center text-5xl sm:text-6xl ${
            monster.isBoss ? 'bg-neo-pink' : 'bg-white'
          }`}>
            <span className="select-none filter drop-shadow-md">{monster.avatar}</span>
          </div>

          <div className="text-center mt-3 px-2 w-full flex flex-col items-center">
            <h3 className="font-arcade text-sm sm:text-base text-black uppercase break-words">
              {monster.name}
            </h3>

            {/* Boss Special Dialogue Bubble */}
            {monster.isBoss && monster.dialog && (
              <div className="mt-1.5 bg-neo-yellow text-black border-2 border-black px-3 py-1 shadow-brutal-sm font-sans font-black text-xs max-w-[280px] break-words">
                "{monster.dialog}"
              </div>
            )}

            {monster.isBoss && monster.specialSkill && (
              <div className="mt-1 bg-black text-neo-pink border border-white px-2 py-0.5 font-arcade text-[10px] uppercase">
                ⚡ НАВЫК: {monster.specialSkill}
              </div>
            )}

            {!monster.isBoss && monster.intro && (
              <p className="text-xs font-bold text-slate-700 italic mt-0.5 line-clamp-2">
                "{monster.intro}"
              </p>
            )}
          </div>

          {/* Monster Brutal HP Bar */}
          <div className="w-56 sm:w-64 mt-2">
            <div className="flex justify-between text-xs font-black mb-1 uppercase">
              <span className="text-neo-pink">HP ВРАГА</span>
              <span>{monster.hp} / {monster.maxHp}</span>
            </div>

            <div className="relative h-4 bg-white border-3 border-black p-[1px] shadow-brutal-sm overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-neo-yellow transition-all duration-300"
                style={{ width: `${(monsterGhostHp / monster.maxHp) * 100}%` }}
              />
              <div 
                className="relative h-full bg-neo-pink transition-all duration-100"
                style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Combat Ticker */}
        <div className="w-full bg-black text-neo-yellow border-3 border-white px-3 py-2 mt-4 text-center shadow-brutal font-arcade text-xs truncate">
          {combatLog[0] || 'БОЙ ИДЕТ...'}
        </div>
      </div>

      {/* Hero Controls: Arcade Buttons */}
      <div className="space-y-2 pb-safe">
        
        {/* Player Brutal HP Bar */}
        <div className={`bg-white border-4 border-black p-2.5 shadow-brutal transition-all ${
          isPlayerHurt ? 'bg-red-200 animate-shake' : ''
        }`}>
          <div className="flex justify-between items-center mb-1 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-arcade text-xs text-black uppercase shrink-0">ОХОТНИК</span>
              {activePet && (
                <span className="bg-neo-yellow text-black border-2 border-black px-1.5 py-0.2 font-arcade text-[10px] shrink-0">
                  {activePet.avatar} {activePet.name}
                </span>
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

        {/* Action Controls */}
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

        {/* Skills - 4 Roguelite Active Skills Grid */}
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
            <p className="text-xs font-bold text-black mb-4">
              НАГРАДЫ ДОБАВЛЕНЫ:
            </p>

            <div className="flex items-center justify-center gap-4 bg-white border-3 border-black p-2.5 w-full mb-4 shadow-brutal-sm">
              <div className="flex items-center gap-1.5 font-arcade text-base text-black">
                <span>🪙</span>
                <span>+{monster.goldReward}</span>
              </div>
              {monster.crystalReward > 0 && (
                <div className="flex items-center gap-1.5 font-arcade text-base text-neo-purple">
                  <span>💎</span>
                  <span>+{monster.crystalReward}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => onFloorCleared({ gold: monster.goldReward, crystals: monster.crystalReward, floor, remainingHp: playerHp })}
                className="w-full py-3 bg-neo-pink text-white border-3 border-black font-arcade text-sm shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 uppercase transition-all"
              >
                <span>СЛЕД. ЭТАЖ ({floor + 1})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onRunEnd({ gold: monster.goldReward, crystals: monster.crystalReward, floor })}
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
                onClick={() => onRunEnd({ gold: 0, crystals: 0, floor })}
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
