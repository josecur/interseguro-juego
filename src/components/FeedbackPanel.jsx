import React from 'react';
import { Lightbulb, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function FeedbackPanel({ currentCase, userChoice, onNext, isLastCase }) {
  const { isScam, clueTitle, clueText, category } = currentCase;
  const isCorrect = (userChoice === 'scam' && isScam) || (userChoice === 'safe' && !isScam);

  return (
    <div className="w-full flex flex-col gap-3 mt-4 transition-all duration-300 animate-fadeIn">
      {/* Banner de Resultado */}
      <div className={`w-full rounded-2xl p-4 flex items-center justify-center text-white shadow-lg border-2 border-white ${
        isCorrect 
          ? 'bg-[#F32682] shadow-[#F32682]/25' 
          : 'bg-amber-600 shadow-amber-600/25'
      }`}>
        <span className="font-headline text-lg sm:text-xl font-extrabold text-center flex items-center gap-2">
          <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
            {isCorrect ? 'celebration' : 'error'}
          </span>
          {isCorrect ? (
            `¡CORRECTO! ${isScam ? `ES UNA ESTAFA (${category})` : 'ES UN MENSAJE SEGURO'}`
          ) : (
            `¡TE EQUIVOCASTE! ${isScam ? `ERA UNA ESTAFA (${category})` : 'ERA UN MENSAJE SEGURO'}`
          )}
        </span>
      </div>

      {/* Caja de Pista del Delito (Amber/Yellow Educational Box) */}
      <div className="w-full rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] p-4 sm:p-5 text-[#78350F] shadow-md flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[#92400E] font-headline text-base sm:text-lg font-black">
          <span className="material-symbols-outlined text-[26px] sm:text-[28px] text-[#D97706]">
            lightbulb
          </span>
          <span>{clueTitle || 'PISTA DEL DELITO'}</span>
        </div>
        <p className="font-body text-sm sm:text-base leading-relaxed text-[#78350F] font-medium">
          {clueText}
        </p>
      </div>

      {/* Botón Siguiente Caso / Ver Premio */}
      <button 
        onClick={onNext}
        className="w-full h-14 sm:h-16 rounded-2xl bg-[#042C6C] hover:bg-[#063c91] text-white transition-all flex items-center justify-center gap-3 font-headline text-lg sm:text-xl font-bold shadow-lg shadow-[#042C6C]/20 active:scale-98 cursor-pointer border-2 border-[#3BA2F7]"
      >
        <span>{isLastCase ? 'VER RESULTADO FINAL Y PREMIO' : 'SIGUIENTE CASO'}</span>
        <ArrowRight size={24} />
      </button>
    </div>
  );
}
