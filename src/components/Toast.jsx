import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!toast) return;

    // Guaranteed 3.0 seconds auto-dismissal
    const timer = setTimeout(() => {
      if (onCloseRef.current) {
        onCloseRef.current();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast?.id]);

  if (!toast) return null;

  const bgColors = {
    success: 'bg-neo-lime text-black',
    error: 'bg-neo-pink text-white',
    warning: 'bg-neo-yellow text-black',
    stars: 'bg-neo-yellow text-black',
    info: 'bg-neo-cyan text-black',
  };

  return (
    <div className="fixed top-[calc(12px+var(--app-safe-top,0px))] left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm pointer-events-auto animate-fadeIn font-sans select-none">
      <div
        onClick={onClose}
        className={`relative flex items-center justify-between gap-3 p-3 border-3 border-black shadow-brutal transition-all cursor-pointer ${
          bgColors[toast.type] || bgColors.info
        }`}
      >
        <p className="font-arcade text-xs uppercase leading-snug break-words pr-2">
          {toast.message}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="Закрыть"
          className="p-1 bg-black text-white [@media(hover:hover)]:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] shrink-0 border border-black"
        >
          <X className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
