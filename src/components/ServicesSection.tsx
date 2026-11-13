import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    title: 'WebGL & 3D',
    description: 'Real-time worlds that run smoothly in the browser. We model, light and optimise every scene so it loads fast and stays fluid on everyday devices.',
    deliverables: ['Real-time 3D scenes', 'Product configurators', 'Shaders & particles', 'Performance tuning'],
  },
  {
    num: '02',
    title: 'Creative direction',
    description: 'Concepts, art direction and visual systems. We shape the idea first and the look second, so every screen feels like part of one story.',
    deliverables: ['Concept & narrative', 'Art direction', 'Visual identity', 'Design systems'],
  },
  {
    num: '03',
    title: 'Motion & sound',
    description: 'Cinematic transitions and spatial audio. Movement and sound are designed together, so each interaction feels physical instead of decorative.',
    deliverables: ['Motion design', 'Scroll choreography', 'Sound design', 'Spatial audio'],
  },
  {
    num: '04',
    title: 'Installations',
    description: 'Physical spaces powered by digital craft. From showrooms to exhibitions, we build interactive pieces that respond to the people in the room.',
    deliverables: ['Interactive exhibits', 'Projection mapping', 'Sensors & hardware', 'On-site support'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 sm:mb-28">
        <div>
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a] block mb-3">
            (02) — What we do
          </span>
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#edebd6]">
            What we do
          </h2>
        </div>
        <p className="font-inter text-base sm:text-lg text-[#edebd6]/70 max-w-md">
          One team takes a project from first concept to final frame. Hire us for a single craft or hand us the whole thing.
        </p>
      </div>

      {/* Services Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {SERVICES.map((srv, idx) => (
          <motion.div
            key={srv.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group p-8 sm:p-12 rounded-3xl bg-[#141418]/50 hover:bg-[#18181e]/80 border border-white/10 hover:border-[#d4ff3a]/40 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10">
                <span className="font-mono-code text-sm text-[#d4ff3a] font-bold">
                  {srv.num}
                </span>
                <span className="font-mono-code text-xs text-white/40 uppercase tracking-widest">
                  Craft
                </span>
              </div>

              <h3 className="font-archivo text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#edebd6] group-hover:text-[#d4ff3a] transition-colors duration-300">
                {srv.title}
              </h3>

              <p className="font-inter text-base text-[#edebd6]/70 mt-4 leading-relaxed font-light">
                {srv.description}
              </p>
            </div>

            {/* Deliverables tags */}
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-2">
              {srv.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-[#edebd6]/70 text-xs font-mono-code tracking-wide"
                >
                  <span className="text-[#d4ff3a]">+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Service Request Banner */}
      <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl border border-dashed border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <h4 className="font-archivo text-xl sm:text-2xl font-bold uppercase text-[#edebd6]">
          Need something that isn't on the list?
        </h4>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-[#d4ff3a] hover:text-[#edebd6] transition-colors duration-300"
        >
          Tell us about it <span>→</span>
        </a>
      </div>
    </section>
  );
};

