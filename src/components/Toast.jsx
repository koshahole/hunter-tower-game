import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Star, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const bgColors = {
    success: 'bg-neo-lime text-black',
    error: 'bg-neo-pink text-white',
    warning: 'bg-neo-yellow text-black',
    stars: 'bg-neo-yellow text-black',
    info: 'bg-neo-cyan text-black',
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm pointer-events-auto animate-fadeIn font-sans select-none">
      <div 
        onClick={onClose}
        className={`flex items-center justify-between gap-3 p-3 border-3 border-black shadow-brutal transition-all cursor-pointer ${
          bgColors[toast.type] || bgColors.info
        }`}
      >
        <p className="font-arcade text-xs uppercase leading-snug truncate">
          {toast.message}
        </p>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-0.5 bg-black text-white hover:opacity-80 shrink-0"
        >
          <X className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
