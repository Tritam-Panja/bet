import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Studio', href: '#studio' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 py-6 pointer-events-none">
      <div className="w-full max-w-[1600px] flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-1 group transition-opacity duration-300 hover:opacity-80"
        >
          <span className="font-archivo text-xl font-bold tracking-tight text-[#edebd6]">
            BET
          </span>
          <span className="text-[10px] text-[#B173F0] font-mono-code font-bold self-start mt-0.5">
            ®
          </span>
        </a>

        {/* Right side Menu Pill with expandable Links & Hamburger Toggle */}
        <div className="relative flex items-center">
          <div className="flex items-center p-1.5 rounded-full bg-[#16161a]/85 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300">
            {/* Desktop Slide-out Nav Links */}
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:flex items-center overflow-hidden pr-2"
                >
                  <div className="flex items-center gap-1.5 whitespace-nowrap pl-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-full text-xs font-mono-code tracking-wider uppercase text-[#edebd6]/70 hover:text-[#0a0a0c] hover:bg-[#B173F0] transition-all duration-300"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>

            {/* Hamburger Button (Replaces "Let's Talk") */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="group flex items-center gap-2.5 h-10 px-5 rounded-full bg-[#B173F0] hover:bg-[#edebd6] text-[#0a0a0c] font-mono-code text-xs font-bold tracking-wider uppercase transition-colors duration-300"
            >
              <span className="tracking-widest">
                {isOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="flex flex-col justify-center items-center w-4 h-3 gap-1">
                <span
                  className={`block h-0.5 w-4 bg-[#0a0a0c] transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-[#0a0a0c] transition-all duration-300 ${
                    isOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-[#0a0a0c] transition-all duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Drawer (When screen width < md) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="md:hidden absolute right-0 top-14 w-64 p-5 rounded-2xl bg-[#16161a]/95 backdrop-blur-xl border border-white/10 flex flex-col gap-2 shadow-2xl pointer-events-auto"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-inter text-lg font-semibold py-2.5 px-3 rounded-lg text-[#edebd6] hover:text-[#0a0a0c] hover:bg-[#B173F0] transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
