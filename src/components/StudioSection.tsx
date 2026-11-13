import React from 'react';
import { motion } from 'framer-motion';

export const StudioSection: React.FC = () => {
  const lineWords1 = ['Transcend', 'anything', 'seen', 'or', 'felt', 'before.'];
  const lineWords2 = ['We', 'blend', 'art', 'direction,', 'motion', 'and', 'code', 'into', 'experiences', 'people', 'remember,', 'share', 'and', 'return', 'to.'];

  return (
    <section id="studio" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/10">
      {/* Section Tag */}
      <div className="flex items-center justify-between mb-16 sm:mb-24">
        <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a]">
          (01) — The studio
        </span>
        <span className="font-mono-code text-xs uppercase tracking-widest text-white/40">
          Barcelona, ES
        </span>
      </div>

      {/* Big typography manifesto */}
      <div className="flex flex-col gap-12 sm:gap-16">
        <h2 className="font-archivo text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#edebd6] leading-[1.05] max-w-5xl">
          {lineWords1.map((w, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="inline-block mr-3 sm:mr-5"
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <p className="font-inter text-xl sm:text-2xl md:text-3xl text-[#edebd6]/70 font-light leading-relaxed max-w-4xl">
          {lineWords2.map((w, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.03 }}
              className={`inline-block mr-2 ${
                ['art', 'motion', 'code', 'remember,'].includes(w.replace(',', ''))
                  ? 'text-[#edebd6] font-normal underline decoration-[#d4ff3a]/40 decoration-1 underline-offset-4'
                  : ''
              }`}
            >
              {w}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Metrics / Key highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 mt-20 border-t border-white/5">
        <div>
          <div className="font-archivo text-3xl sm:text-4xl font-bold text-[#d4ff3a]">100%</div>
          <div className="font-mono-code text-xs uppercase tracking-wider text-white/50 mt-2">Custom Real-time 3D</div>
        </div>
        <div>
          <div className="font-archivo text-3xl sm:text-4xl font-bold text-[#edebd6]">60fps</div>
          <div className="font-mono-code text-xs uppercase tracking-wider text-white/50 mt-2">Fluid Browser Performance</div>
        </div>
        <div>
          <div className="font-archivo text-3xl sm:text-4xl font-bold text-[#edebd6]">15+</div>
          <div className="font-mono-code text-xs uppercase tracking-wider text-white/50 mt-2">Industry Awards</div>
        </div>
        <div>
          <div className="font-archivo text-3xl sm:text-4xl font-bold text-[#edebd6]">Global</div>
          <div className="font-mono-code text-xs uppercase tracking-wider text-white/50 mt-2">Client Reach</div>
        </div>
      </div>
    </section>
  );
};

