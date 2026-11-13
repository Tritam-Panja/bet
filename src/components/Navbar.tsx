import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 py-6 pointer-events-none">
      <div className="w-full max-w-[1600px] flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-1 group transition-opacity duration-300 hover:opacity-80"
        >
          <span className="font-archivo text-xl font-bold tracking-tight text-[#edebd6]">
            NOCTURNO
          </span>
          <span className="text-[10px] text-[#d4ff3a] font-mono-code font-bold self-start mt-0.5">
            ®
          </span>
        </a>

        {/* Center Nav Pills (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#16161a]/80 backdrop-blur-md border border-white/10 shadow-2xl">
          <a
            href="#work"
            className="px-5 py-2 rounded-full text-xs font-mono-code tracking-wider uppercase text-[#edebd6]/70 hover:text-[#0a0a0c] hover:bg-[#d4ff3a] transition-all duration-300"
          >
            Work
          </a>
          <a
            href="#studio"
            className="px-5 py-2 rounded-full text-xs font-mono-code tracking-wider uppercase text-[#edebd6]/70 hover:text-[#0a0a0c] hover:bg-[#d4ff3a] transition-all duration-300"
          >
            Studio
          </a>
          <a
            href="#services"
            className="px-5 py-2 rounded-full text-xs font-mono-code tracking-wider uppercase text-[#edebd6]/70 hover:text-[#0a0a0c] hover:bg-[#d4ff3a] transition-all duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-xs font-mono-code tracking-wider uppercase text-[#edebd6]/70 hover:text-[#0a0a0c] hover:bg-[#d4ff3a] transition-all duration-300"
          >
            Contact
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#d4ff3a] hover:bg-[#edebd6] text-[#0a0a0c] font-mono-code text-xs font-bold tracking-wider uppercase transition-colors duration-300"
          >
            Let's talk
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-10 px-5 rounded-full bg-[#16161a]/90 backdrop-blur-md border border-white/10 text-xs font-mono-code uppercase text-[#edebd6]"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 p-6 rounded-3xl bg-[#16161a] border border-white/10 flex flex-col gap-4 shadow-2xl pointer-events-auto md:hidden"
          >
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="font-inter text-2xl font-bold py-2 border-b border-white/5 text-[#edebd6] hover:text-[#d4ff3a]"
            >
              Work
            </a>
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="font-inter text-2xl font-bold py-2 border-b border-white/5 text-[#edebd6] hover:text-[#d4ff3a]"
            >
              Studio
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-inter text-2xl font-bold py-2 border-b border-white/5 text-[#edebd6] hover:text-[#d4ff3a]"
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-inter text-2xl font-bold py-2 text-[#edebd6] hover:text-[#d4ff3a]"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-4 rounded-full bg-[#d4ff3a] text-[#0a0a0c] font-mono-code text-xs font-bold uppercase tracking-wider"
            >
              Let's talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

