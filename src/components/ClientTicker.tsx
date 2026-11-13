import React from 'react';

const CLIENTS = [
  'Aurelle',
  'Halden&Co',
  'Orbis',
  'Vanta',
  'Maison Lune',
  'Northfield',
  'Solstice',
  'Aetherial',
];

export const ClientTicker: React.FC = () => {
  return (
    <div className="w-full py-16 border-y border-white/10 bg-[#0a0a0c]/80 overflow-hidden select-none">
      <div className="animate-marquee items-center gap-16 sm:gap-24">
        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
          <div
            key={i}
            className="flex items-center gap-8 whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-archivo text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-widest text-[#edebd6]">
              {client}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#d4ff3a]/60"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

