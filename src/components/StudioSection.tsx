import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';

export const StudioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative w-full py-32 sm:py-44 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/10"
    >
      {/* Section Tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between mb-16 sm:mb-24"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B173F0] animate-ping" />
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#B173F0]">
            (01) — The studio
          </span>
        </div>
        <span className="font-mono-code text-xs uppercase tracking-widest text-white/40">
          Bramha Evolving Techinfra
        </span>
      </motion.div>

      {/* Main Manifesto */}
      <div className="flex flex-col gap-14 sm:gap-20">
        {/* Headline with DecryptedText Animation */}
        <div className="max-w-5xl">
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-tight text-[#edebd6] leading-[1.05] select-none">
            <DecryptedText
              text="IT OFTEN STARTS WITH A SIMPLE QUESTION: COULD THIS WORK BETTER?"
              animateOn="inViewHover"
              effect="scramble"
              sequential
              revealDirection="start"
              speed={45}
              maxIterations={12}
              hoverRadius={100}
              scrambleColor="#B173F0"
              loop={false}
              useOriginalCharsOnly={false}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              className="text-[#edebd6]"
              encryptedClassName="text-[#B173F0]/70 font-mono-code"
              clickMode="once"
            />
          </h2>
        </div>

        {/* Paragraph 1: Cinema Stagger Rise with DecryptedText on Bramha Evolving Techinfra */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="font-inter text-xl sm:text-2xl md:text-3xl text-[#edebd6]/85 font-light leading-relaxed">
            <span className="text-[#B173F0] font-normal underline decoration-[#B173F0]/40 decoration-1 underline-offset-4">
              <DecryptedText
                text="Bramha Evolving Techinfra"
                animateOn="inViewHover"
                effect="scramble"
                sequential
                revealDirection="start"
                speed={40}
                maxIterations={10}
                hoverRadius={80}
                scrambleColor="#B173F0"
                loop={false}
                useOriginalCharsOnly={false}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                className="text-[#edebd6] font-normal"
                encryptedClassName="text-[#B173F0]"
                clickMode="once"
              />
            </span>{' '}
            turns that curiosity into websites, software and AI tools for businesses, and explores renewable energy, robotics and other future technologies.
          </p>
        </motion.div>

        {/* Paragraph 2: Horizon Reveal with Accent Divider */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 border-t border-white/10 max-w-4xl"
        >
          <p className="font-inter text-lg sm:text-xl text-[#edebd6]/70 font-light leading-relaxed">
            We aim to make useful ideas real and help people and businesses move forward. If that vision speaks to you, we welcome like-minded people and collaborators to connect with us.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-mono-code text-xs uppercase tracking-widest text-[#B173F0] hover:text-[#edebd6] transition-colors duration-200"
            >
              <span>Connect with us</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
