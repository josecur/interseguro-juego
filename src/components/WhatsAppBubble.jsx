import React from 'react';

export default function WhatsAppBubble({ currentCase, isAnswered }) {
  const { sender, verified, avatarColor, time, networkText, messagePrefix, body, link, isScam } = currentCase;

  const getLinkStyle = () => {
    if (!isAnswered) {
      return 'bg-emerald-50 text-emerald-950 border-emerald-300/60';
    }
    return isScam
      ? 'bg-rose-100 text-[#900B3B] border-rose-300 ring-2 ring-rose-400 font-bold'
      : 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-2 ring-emerald-400 font-bold';
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 flex flex-col shadow-inner">
      {/* WhatsApp App Bar / Header */}
      <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${avatarColor || 'bg-teal-700'} text-white flex items-center justify-center font-bold text-lg border border-white/20 shadow-xs`}>
            {sender.charAt(0)}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-base font-bold text-white">{sender}</span>
              {verified && (
                <span className="material-symbols-outlined text-[#25D366] text-[18px] bg-white rounded-full p-0.5" title="Cuenta Oficial Verificada">
                  check_circle
                </span>
              )}
            </div>
            <span className="text-[11px] font-sans font-medium text-emerald-100 flex items-center gap-1">
              {networkText}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/90">
          <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">videocam</span>
          <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">call</span>
          <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">more_vert</span>
        </div>
      </div>

      {/* Messages Stream Area (WhatsApp Background Pattern) */}
      <div className="p-4 sm:p-5 flex flex-col bg-[#E5DDD5] min-h-[220px] relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#008069_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Incoming WhatsApp Bubble */}
        <div className="relative z-10 self-start w-full max-w-lg rounded-2xl rounded-tl-none bg-white p-4 sm:p-5 shadow-sm flex flex-col gap-3 text-slate-800 border border-slate-200">
          {/* Top WhatsApp Sender Tag */}
          <div className="text-xs font-semibold text-[#008069] flex items-center justify-between border-b border-slate-100 pb-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">chat</span> {sender}
            </span>
            <span className="text-[11px] text-slate-400 font-mono font-normal">{time}</span>
          </div>

          <p className="text-base sm:text-[17px] font-medium text-slate-800 leading-relaxed">
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

          <div className="self-end text-slate-400 text-[11px] font-sans flex items-center gap-1 pt-1">
            <span>{time}</span>
            <span className="material-symbols-outlined text-[15px] text-sky-500">done_all</span>
          </div>
        </div>
      </div>
    </div>
  );
}
