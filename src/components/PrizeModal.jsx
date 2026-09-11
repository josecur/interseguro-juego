import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Trophy, RotateCcw, CheckCircle, ShieldAlert, Sparkles, Copy, Check } from 'lucide-react';
import { playPrizeWinSound } from '../utils/audio';

export default function PrizeModal({ score, totalCases, soundEnabled, onPlayAgain }) {
  const isWinner = score >= 2;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isWinner) {
      if (soundEnabled) {
        playPrizeWinSound();
      }
      // Trigger festive confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback if confetti fails
      }
    }
  }, [isWinner, soundEnabled]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('INTERSEGURO-PREMIO-2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#3BA2F7] flex flex-col items-center text-center animate-fadeIn my-4">
      {isWinner ? (
        <>
          {/* Winner Trophy Badge */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0A6AF5] to-[#3BA2F7] flex items-center justify-center text-white shadow-lg mb-4 ring-4 ring-[#E6F1F9]">
            <Trophy size={42} />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-[#F32682] uppercase bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-2">
            ¡Meta Alcanzada!
          </span>

          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#042C6C] mb-2 leading-tight">
            ¡Felicidades! Reclama tu Premio 🎉
          </h2>

          <p className="font-body text-slate-600 text-sm sm:text-base mb-6">
            Lograste <strong className="text-[#0A6AF5] font-bold">{score} de {totalCases} aciertos</strong>. Has demostrado que sabes protegerte contra fraudes digitales.
          </p>


          {/* Prize Voucher Card */}



          <button
            onClick={onPlayAgain}
            className="w-full h-14 rounded-2xl bg-[#042C6C] hover:bg-[#063c91] text-white font-headline text-lg font-bold shadow-lg shadow-[#042C6C]/20 transition-all active:scale-98 flex items-center justify-center gap-2 border-2 border-[#3BA2F7]"
          >
            <RotateCcw size={20} />
            <span>JUGAR OTRA RONDA (3 CASOS NUEVOS)</span>
          </button>
        </>
      ) : (
        <>
          {/* Retry Icon Badge */}
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-[#D97706] shadow-md mb-4 ring-4 ring-amber-50">
            <ShieldAlert size={42} />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-[#D97706] uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
            Puntaje Insuficiente
          </span>

          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#042C6C] mb-2 leading-tight">
            ¡Casi lo logras!
          </h2>

          <p className="font-body text-slate-600 text-sm sm:text-base mb-6">
            Obtuviste <strong className="text-[#F32682] font-bold">{score} de {totalCases} aciertos</strong>. Necesitas al menos <strong>2 aciertos</strong> para desbloquear tu premio.
          </p>

          <div className="w-full bg-[#FEF3C7] rounded-2xl p-4 border border-[#F59E0B] text-[#78350F] text-xs sm:text-sm font-medium mb-6 text-left">
            💡 <strong>Consejo de seguridad:</strong> Revisa siempre el dominio web de los enlaces (.cc, .site, .card no son oficiales), desconfía de los ultimátums de urgencia y nunca compartas claves SMS.
          </div>

          <button
            onClick={onPlayAgain}
            className="w-full h-14 rounded-2xl bg-[#F32682] hover:bg-[#e01570] text-white font-headline text-lg font-bold shadow-lg shadow-[#F32682]/30 transition-all active:scale-98 flex items-center justify-center gap-2 border-2 border-white"
          >
            <RotateCcw size={20} />
            <span>INTENTAR DE NUEVO</span>
          </button>
        </>
      )}
    </div>
  );
}
