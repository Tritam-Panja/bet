import React from 'react';
import { motion } from 'framer-motion';
import { LiquidImage } from './LiquidImage';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto overflow-hidden">
      {/* Center 3D Sculpture Image in the background of Hero */}
      <div
        data-framer-name="Hero Sculpture"
        data-cursor-zone="explore"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] md:w-[620px] lg:w-[720px] aspect-square pointer-events-auto z-0 opacity-85 hover:opacity-100 transition-opacity duration-700"
      >
        <LiquidImage
          src="https://framerusercontent.com/images/f0jfBBgdCsXBoYYvVAahTXmrCkY.jpg?width=1600&height=1600"
          alt="Nocturno 3D Sculpture"
          radius={999}
          ripple={1.4}
          hoverZoom={0.08}
          rgbShift={1.2}
          scrollBend={1.0}
          parallax={0.8}
        />
      </div>

      {/* Main Massive Headline */}
      <div className="relative z-10 select-none pointer-events-none mt-12 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0 }}
          className="flex flex-col tracking-[-0.04em] leading-[0.88]"
        >
          <span className="font-archivo text-6xl sm:text-8xl md:text-9xl lg:text-[148px] xl:text-[180px] font-extrabold uppercase text-[#edebd6] drop-shadow-2xl">
            Immersive
          </span>
          <span className="font-archivo text-6xl sm:text-8xl md:text-9xl lg:text-[148px] xl:text-[180px] font-extrabold uppercase text-[#edebd6]/90">
            digital
          </span>
          <span className="font-archivo text-6xl sm:text-8xl md:text-9xl lg:text-[148px] xl:text-[180px] font-extrabold uppercase text-[#edebd6]/75">
            experiences
          </span>
        </motion.div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-16 border-t border-white/10 mt-16 sm:mt-24">
        {/* Scroll down indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#d4ff3a] animate-bounce">
            ↓
          </div>
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#edebd6]/60">
            Scroll down
          </span>
        </div>

        {/* Narrative bio paragraph */}
        <div className="max-w-md">
          <p className="font-inter text-base sm:text-lg text-[#edebd6]/80 font-normal leading-relaxed">
            We craft real-time 3D worlds, cinematic websites and interactive installations for brands that refuse to be ordinary.
          </p>
        </div>
      </div>
    </section>
  );
};

