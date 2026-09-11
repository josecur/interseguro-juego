import React from 'react';
import SMSBubble from './SMSBubble';
import WhatsAppBubble from './WhatsAppBubble';

export default function DeviceFrame({ currentCase, isAnswered }) {
  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="w-full rounded-3xl bg-white p-2 sm:p-3 shadow-xl border border-slate-200">
        {currentCase.channel === 'whatsapp' ? (
          <WhatsAppBubble currentCase={currentCase} isAnswered={isAnswered} />
        ) : (
          <SMSBubble currentCase={currentCase} isAnswered={isAnswered} />
        )}
      </div>
    </div>
  );
}
