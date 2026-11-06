import React, { useState } from 'react';
import { Settings, Volume2, VolumeX, X, Check } from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { getRankByMaxFloor } from '../data/ranks';

export const AVATAR_OPTIONS = ['🧙‍♂️', '🥷', '🗡️', '👑', '🏹', '🐺', '⚡', '🐉', '🤖', '👾'];

export const TITLE_OPTIONS = [
  'Искатель Башни',
  'Покоритель Бездны',
  'Убийца Гоблинов',
  'Теневой Адепт',
  'Хранитель Звезд',
  'Легендарный S-Ранг'
];

export default function ProfileModal({ 
  state, 
  user, 
  onSaveProfile, 
  onClose, 
  onShowToast 
}) {
  const [name, setName] = useState(state.hunterName || user.name || 'Охотник');
  const [avatar, setAvatar] = useState(state.hunterAvatar || '🧙‍♂️');
  const [title, setTitle] = useState(state.hunterTitle || 'Искатель Башни');
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);

  const currentRank = getRankByMaxFloor(state.maxFloor);

  const handleToggleSound = () => {
    const val = sounds.toggleSound();
    setSoundEnabled(val);
    onShowToast(val ? 'ЗВУКИ ВКЛЮЧЕНЫ! 🔊' : 'ЗВУКИ ВЫКЛЮЧЕНЫ! 🔇', 'info');
  };

  const handleSave = () => {
    if (!name.trim()) {
      onShowToast('ИМЯ НЕ МОЖЕТ БЫТЬ ПУСТЫМ!', 'warning');
      return;
    }
    onSaveProfile({
      hunterName: name.trim().slice(0, 16),
      hunterAvatar: avatar,
      hunterTitle: title,
    });
    onShowToast('ПРОФИЛЬ СОХРАНЕН! 🔥', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn font-sans select-none">
      <div className="bg-white border-4 border-black p-4 shadow-brutal-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neo-cyan border-2 border-black flex items-center justify-center shadow-brutal-sm">
              <Settings className="w-5 h-5 text-black stroke-[3]" />
            </div>
            <div>
              <h2 className="font-arcade text-base text-black uppercase leading-tight">
                НАСТРОЙКИ
              </h2>
              <p className="text-[10px] font-bold text-slate-700 uppercase">
                КАСТОМИЗАЦИЯ ОХОТНИКА
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 bg-black text-white flex items-center justify-center font-arcade text-xs active:translate-x-[1px] active:translate-y-[1px]"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Hero Avatar Selection */}
        <div className="my-3 flex flex-col items-center">
          <div className="w-20 h-20 bg-neo-yellow border-4 border-black shadow-brutal flex items-center justify-center text-4xl mb-2">
            <span>{avatar}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {AVATAR_OPTIONS.map(av => (
              <button
                key={av}
                onClick={() => setAvatar(av)}
                className={`w-9 h-9 border-2 border-black flex items-center justify-center text-xl transition-all ${
                  avatar === av 
                    ? 'bg-neo-pink text-white shadow-brutal-sm scale-105' 
                    : 'bg-white hover:bg-slate-100'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3">
          <div>
            <label className="font-arcade text-[10px] text-black uppercase block mb-1">
              ПОЗЫВНОЙ ОХОТНИКА:
            </label>
            <input
              type="text"
              value={name}
              maxLength={16}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-neo-light border-3 border-black font-arcade text-xs text-black focus:outline-none focus:bg-neo-yellow shadow-brutal-sm"
            />
          </div>

          <div>
            <label className="font-arcade text-[10px] text-black uppercase block mb-1">
              ТИТУЛ:
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-neo-light border-3 border-black font-sans font-bold text-xs text-black focus:outline-none focus:bg-neo-yellow shadow-brutal-sm"
            >
              {TITLE_OPTIONS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <div className="bg-neo-lime border-3 border-black p-2.5 flex items-center justify-between shadow-brutal-sm">
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-5 h-5 text-black stroke-[3]" /> : <VolumeX className="w-5 h-5 text-black stroke-[3]" />}
              <span className="font-arcade text-xs text-black uppercase">ЗВУКИ БОЯ</span>
            </div>

            <button
              onClick={handleToggleSound}
              className="px-3 py-1 bg-black text-white font-arcade text-xs shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px]"
            >
              {soundEnabled ? 'ВКЛ' : 'ВЫКЛ'}
            </button>
          </div>

          {/* Career Stats */}
          <div className="bg-white border-3 border-black p-3 space-y-1 text-xs font-bold shadow-brutal-sm">
            <div className="font-arcade text-xs text-black uppercase mb-1">
              ДОСЬЕ ОХОТНИКА:
            </div>
            <div className="flex justify-between">
              <span>РАНГ:</span>
              <span className="font-arcade text-neo-pink">{currentRank.name}</span>
            </div>
            <div className="flex justify-between">
              <span>РЕКОРД ЭТАЖА:</span>
              <span className="font-arcade">{state.maxFloor}</span>
            </div>
            <div className="flex justify-between">
              <span>МОНСТРОВ УБИТО:</span>
              <span className="font-arcade">{state.stats?.monstersKilled || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>БОССОВ СРАЖЕНО:</span>
              <span className="font-arcade">{state.stats?.bossesKilled || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>ПЕРЕРОЖДЕНИЙ:</span>
              <span className="font-arcade text-neo-purple">{state.totalRebirths || 0}</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-neo-yellow text-black border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[2px] active:translate-y-[2px] uppercase flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>СОХРАНИТЬ ПРОФИЛЬ</span>
          </button>
        </div>

      </div>
    </div>
  );
}
