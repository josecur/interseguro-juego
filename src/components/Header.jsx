import React from 'react';
import { Volume2, VolumeX, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Header({ score, currentStep, totalSteps, soundEnabled, setSoundEnabled, onReset }) {
  return (
    <header className="w-full bg-[#0A6AF5] text-white shadow-md">
      {/* Top Brand Bar */}
      <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Interseguro Brand Square Icon */}
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center font-bold text-[#0A6AF5] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <span className="font-headline font-extrabold text-lg tracking-tight">
            Interseguro
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute/Unmute Audio Button */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            title={soundEnabled ? "Silenciar audio" : "Activar audio"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sonido ON' : 'Sonido OFF'}</span>
          </button>

          {/* Reset/Restart round button */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-medium"
            title="Reiniciar juego"
          >
            <RefreshCw size={15} />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Dynamic Game HUD Header */}
      <div className="bg-[#042C6C] border-t border-white/10 py-3 px-4 shadow-inner">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#3BA2F7]" size={22} />
            <h1 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
              ¿Es Seguro o Estafa?
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold">
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-[#80DFFF] border border-[#3BA2F7]/30">
              Caso {Math.min(currentStep + 1, totalSteps)} de {totalSteps}
            </span>
            <span className="bg-[#F32682] text-white px-2.5 py-1 rounded-full shadow-xs">
              Aciertos: {score}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
