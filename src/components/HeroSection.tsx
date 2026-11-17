import React from 'react';
import { motion } from 'framer-motion';
import { LiquidImage } from './LiquidImage';

interface HeroSectionProps {
  isEntered?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isEntered = true }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto overflow-hidden">
      {/* Center 3D Iridescent Sculpture (Grand Cinematic Entry from bottom of viewport) */}
      <motion.div
        data-framer-name="Hero Sculpture"
        data-cursor-zone="explore"
        initial={{ opacity: 0, y: 350, scale: 0.65, filter: 'blur(12px)' }}
        animate={
          isEntered
            ? { opacity: 0.95, y: '-50%', scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, y: 350, scale: 0.65, filter: 'blur(12px)' }
        }
        transition={{
          duration: 1.6,
          delay: 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] md:w-[580px] lg:w-[680px] aspect-square pointer-events-auto z-0 hover:opacity-100 transition-opacity duration-700"
      >
        <LiquidImage
          src="/hero-sculpture.jpg"
          alt="Brahma 3D Sculpture"
          radius={999}
          ripple={1.6}
          hoverZoom={0.08}
          rgbShift={1.4}
          scrollBend={1.0}
          parallax={0.8}
          transparentBackground={true}
        />
      </motion.div>

      {/* Main Massive Headline (Cinematic Letter-Rise choreography with adjusted typography) */}
      <div className="relative z-10 select-none pointer-events-none mt-10 sm:mt-14 max-w-6xl">
        {/* Subtle Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6"
        >
          <span className="font-mono-code text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B173F0] font-semibold">
            Welcome to
          </span>
        </motion.div>

        {/* Primary Headline in balanced stacked typography */}
        <div className="flex flex-col tracking-[-0.035em] leading-[0.92] overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 90, rotateX: 20 }}
            animate={isEntered ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 90, rotateX: 20 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-archivo text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-black uppercase text-[#edebd6] drop-shadow-2xl"
          >
            Brahma Evolving
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 90, rotateX: 20 }}
            animate={isEntered ? { opacity: 0.92, y: 0, rotateX: 0 } : { opacity: 0, y: 90, rotateX: 20 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-archivo text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-black uppercase text-[#edebd6]/90"
          >
            Techinfra
          </motion.h1>
        </div>

        {/* Supporting Proposition: The next big possibility will start with you */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.0, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-2xl"
        >
          <p className="font-archivo text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-[#edebd6]/80 tracking-tight leading-snug">
            The next big possibility{' '}
            <span className="text-[#B173F0] underline decoration-[#B173F0]/40 decoration-2 underline-offset-4">
              will start with you
            </span>
          </p>
        </motion.div>
      </div>

      {/* Hero Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
        animate={isEntered ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(6px)' }}
        transition={{ duration: 1.0, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-12 border-t border-white/10 mt-12 sm:mt-16"
      >
        {/* Scroll down indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#B173F0] animate-bounce">
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
      </motion.div>
    </section>
  );
};
