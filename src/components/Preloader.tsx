import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CipherTextReveal } from './ui/cipher-text-reveal';

interface PreloaderProps {
  onEnter: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onEnter }) => {
  const [line1Done, setLine1Done] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterClick = () => {
    setIsExiting(true);
    // Allow the flash shockwave & aperture expansion to play out before unmounting
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.25,
            filter: 'blur(16px)',
          }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 text-center select-none overflow-hidden"
        >
          {/* Warp light rays / ambient tunnel */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,255,58,0.08)_0%,rgba(207,198,255,0.03)_40%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
            {/* Cipher Text Reveal in 2 clean lines with refined size */}
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
              {/* Line 1: WE ARE THE CREATORS */}
              <h1 className="font-archivo text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#edebd6] leading-tight">
                <CipherTextReveal
                  text="We Are the creators"
                  speed={32}
                  cipherCount={3}
                  characters="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
                  className="text-[#edebd6]"
                  cipherClassName="text-[#d4ff3a]"
                  onComplete={() => setLine1Done(true)}
                />
              </h1>

              {/* Line 2: EVOLVING THE WORLD */}
              <h1 className="font-archivo text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#edebd6] leading-tight min-h-[1.2em]">
                {line1Done ? (
                  <CipherTextReveal
                    text="evolving the world"
                    speed={32}
                    cipherCount={3}
                    characters="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
                    className="text-[#edebd6]"
                    cipherClassName="text-[#d4ff3a]"
                    onComplete={() => setIsRevealed(true)}
                  />
                ) : (
                  <span className="opacity-0">evolving the world</span>
                )}
              </h1>
            </div>

            {/* Enter Button */}
            <div className="mt-12 sm:mt-14 h-16 flex items-center justify-center">
              {isRevealed && (
                <motion.button
                  initial={{ opacity: 0, y: 25, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleEnterClick}
                  className="group relative px-9 py-3.5 rounded-full bg-[#d4ff3a] text-[#0a0a0c] font-mono-code text-xs sm:text-sm uppercase tracking-widest font-black overflow-hidden shadow-[0_0_35px_rgba(212,255,58,0.4)] hover:shadow-[0_0_65px_rgba(212,255,58,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Enter Experience</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">
                      →
                    </span>
                  </span>
                  {/* Sheen beam animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Cinematic Flash & Warp Tunnel Shockwave on Click */}
      {isExiting && (
        <motion.div
          key="warp-flash"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.5, 2.2, 3.5] }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
        >
          <div className="w-[60vw] h-[60vw] rounded-full bg-radial from-[#d4ff3a]/30 via-[#cfc6ff]/15 to-transparent blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
