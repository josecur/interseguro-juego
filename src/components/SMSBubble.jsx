import React from 'react';

export default function SMSBubble({ currentCase, isAnswered }) {
  const { sender, verified, time, networkText, messagePrefix, body, link, isScam } = currentCase;

  // Determine target link highlight styles when answered
  const getLinkStyle = () => {
    if (!isAnswered) {
      return 'bg-[#EAF3FF] text-[#042C6C] border-[#3BA2F7]/40';
    }
    return isScam
      ? 'bg-rose-100 text-[#900B3B] border-rose-300 ring-2 ring-rose-400 font-bold'
      : 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-2 ring-emerald-400 font-bold';
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex flex-col shadow-inner">
      {/* Phone App Bar / Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAF3FF] text-[#042C6C] flex items-center justify-center font-bold border border-[#3BA2F7]/30 shadow-xs">
            <span className="material-symbols-outlined text-[24px] text-[#3BA2F7]">
              {sender.toLowerCase().includes('banco') || sender.toLowerCase().includes('sunat') ? 'account_balance' : 'chat_bubble'}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-base font-bold text-[#042C6C]">{sender}</span>
              {verified && (
                <span className="material-symbols-outlined text-[#3BA2F7] text-[18px]" title="Identificador SMS Verificado">
                  verified
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500 flex items-center gap-1">
              SMS entrante
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#042C6C] border border-slate-300">
            SMS
          </span>
          <span className="material-symbols-outlined text-slate-400 text-[20px]">more_vert</span>
        </div>
      </div>

      {/* Messages Stream Area */}
      <div className="p-4 sm:p-5 flex flex-col bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] min-h-[220px]">
        {/* Incoming SMS Bubble */}
        <div className="self-start w-full max-w-lg rounded-2xl rounded-tl-sm bg-white border border-slate-200 p-4 sm:p-5 shadow-md flex flex-col gap-3 text-[#042C6C]">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono font-medium border-b border-slate-100 pb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#3BA2F7]">chat</span> {networkText}
            </span>
            <span>{time}</span>
          </div>

          <p className="text-base sm:text-[17px] font-medium text-[#042C6C] leading-relaxed">
            {messagePrefix && (
              <span className="text-[#F32682] font-bold mr-1.5">{messagePrefix}</span>
            )}
            {body}
          </p>

          {link && (
            <div className={`p-3 rounded-xl font-mono text-sm sm:text-base font-semibold flex items-center gap-2.5 break-all border shadow-xs transition-all ${getLinkStyle()}`}>
              <span className="underline font-bold transition-colors">
                {link}
              </span>
            </div>
          )}

          <div className="self-end text-slate-400 text-[11px] font-mono flex items-center gap-1 pt-1">
            <span className="material-symbols-outlined text-[14px]">done_all</span> Recibido
          </div>
        </div>
      </div>
    </div>
  );
}
