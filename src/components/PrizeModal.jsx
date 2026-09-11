import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Trophy, RotateCcw, ShieldAlert, Sparkles, Copy, Check, Calendar, Gift, BookOpen } from 'lucide-react';
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
    navigator.clipboard.writeText('INTERSEGURO-FERIA-2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#3BA2F7] flex flex-col items-center text-center animate-fadeIn my-4">
      {isWinner ? (
        <>
          {/* Winner Trophy Badge */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0A6AF5] to-[#3BA2F7] flex items-center justify-center text-white shadow-lg mb-3 ring-4 ring-[#E6F1F9]">
            <Trophy size={42} />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-[#F32682] uppercase bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-2">
            ¡Meta Alcanzada!
          </span>

          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#042C6C] mb-2 leading-tight">
            ¡Felicidades! Ganaste tu Premio 🎉
          </h2>

          <p className="font-body text-slate-600 text-sm sm:text-base mb-5">
            Lograste <strong className="text-[#0A6AF5] font-bold">{score} de {totalCases} aciertos</strong>. Demostraste que sabes identificar estafas digitales.
          </p>

          {/* Prize Voucher Card */}
          <div className="w-full bg-gradient-to-b from-[#F4F7FB] to-[#E6F1F9] rounded-2xl p-4 sm:p-5 border-2 border-[#3BA2F7]/40 shadow-md flex flex-col items-center gap-3 mb-4 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-10 text-[#042C6C]">
              <Award size={120} />
            </div>

            <div className="flex items-center gap-2 text-[#042C6C] font-headline font-bold text-lg">
              <Gift className="text-[#F32682]" size={22} />
              <span>Premio Interseguro</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Presenta este código en la feria para reclamar tu premio físico
            </p>

            <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-[#042C6C] text-sm sm:text-base flex items-center justify-between gap-3 w-full max-w-xs shadow-xs">
              <span>INTERSEGURO-2026</span>
              <button
                onClick={handleCopyCode}
                className="text-xs bg-[#0A6AF5] hover:bg-[#074EAB] text-white px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-sans"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Special Invitation Card: Feria Financiera Interseguro */}
          <div className="w-full bg-[#EAF3FF] rounded-2xl p-4 sm:p-5 border-2 border-[#0A6AF5]/30 shadow-sm flex flex-col gap-2.5 mb-6 text-left">
            <div className="flex items-center gap-2 text-[#042C6C] font-headline font-bold text-base sm:text-lg">
              <Calendar className="text-[#0A6AF5]" size={22} />
              <span>¿Quieres aprender más?</span>
            </div>
            <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>¡Reclama tu premio en la feria!</strong> Te esperamos en la <strong>Feria Financiera de Interseguro</strong> este <span className="bg-[#0A6AF5] text-white px-2 py-0.5 rounded font-bold inline-block">29 de Octubre</span>.
            </p>
            <div className="flex items-start gap-1.5 text-xs text-[#042C6C] font-medium bg-white/80 p-2.5 rounded-xl border border-[#3BA2F7]/20">
              <BookOpen size={16} className="text-[#3BA2F7] shrink-0 mt-0.5" />
              <span>Ven para aprender más sobre este y más temas.</span>
            </div>
          </div>

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
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-[#D97706] shadow-md mb-3 ring-4 ring-amber-50">
            <ShieldAlert size={42} />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-[#D97706] uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
            Puntaje Insuficiente
          </span>

          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#042C6C] mb-2 leading-tight">
            ¡Casi lo logras!
          </h2>

          <p className="font-body text-slate-600 text-sm sm:text-base mb-4">
            Obtuviste <strong className="text-[#F32682] font-bold">{score} de {totalCases} aciertos</strong>. Necesitas al menos <strong>2 aciertos</strong> para desbloquear tu premio.
          </p>

          <div className="w-full bg-[#FEF3C7] rounded-2xl p-4 border border-[#F59E0B] text-[#78350F] text-xs sm:text-sm font-medium mb-4 text-left">
            💡 <strong>Consejo de seguridad:</strong> Revisa siempre el dominio web de los enlaces (.cc, .site no son oficiales), desconfía de la urgencia y no compartas claves SMS.
          </div>

          {/* Invitation Card on Retry */}
          <div className="w-full bg-[#EAF3FF] rounded-2xl p-4 border border-[#0A6AF5]/30 text-left mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#042C6C] font-headline font-bold text-sm sm:text-base">
              <Calendar className="text-[#0A6AF5]" size={20} />
              <span>¿Quieres aprender más sobre ciberseguridad?</span>
            </div>
            <p className="font-body text-xs text-slate-700 leading-relaxed">
              Visítanos en la <strong>Feria Financiera de Interseguro</strong> este <strong className="text-[#0A6AF5]">29 de Octubre</strong> para participar por premios en vivo y aprender a proteger tus finanzas.
            </p>
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
