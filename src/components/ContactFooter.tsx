import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FittedText } from './FittedText';

export const ContactFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer id="contact" className="relative w-full pt-28 sm:pt-36 pb-12 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/10">
      {/* Contact Section Header */}
      <div className="flex items-center justify-between mb-16">
        <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a]">
          (03) — Start a project
        </span>
        <span className="font-mono-code text-xs uppercase tracking-widest text-white/40">
          Available Q2 2026
        </span>
      </div>

      {/* Got a bold idea? Main Call to Action */}
      <div className="mb-24 sm:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <span className="font-archivo text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase text-[#edebd6] leading-[0.9]">
            Got a bold
          </span>
          <span className="font-archivo text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase text-[#edebd6]/80 leading-[0.9]">
            idea?
          </span>
        </motion.div>

        <div className="mt-12 sm:mt-16">
          <a
            href="mailto:hello@nocturno.studio"
            className="group inline-flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-mono-code uppercase text-[#d4ff3a] hover:text-[#edebd6] transition-colors duration-300"
          >
            <span className="underline decoration-[#d4ff3a]/40 underline-offset-8">
              hello@nocturno.studio
            </span>
            <span className="inline-block transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Grid: Studio details, Socials, Newsletter */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 border-t border-white/10">
        {/* Studio Info */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a]">
            Studio
          </span>
          <p className="font-inter text-base text-[#edebd6]/80 leading-relaxed font-light">
            Calle de Pallars 84, 3rd floor<br />
            08018 Barcelona, Spain<br />
            <a href="tel:+34931234567" className="hover:text-[#d4ff3a] transition-colors duration-200">
              +34 931 234 567
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a]">
            Follow
          </span>
          <div className="flex flex-col gap-2 font-mono-code text-sm text-[#edebd6]/80">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d4ff3a] transition-colors duration-200"
            >
              Instagram ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d4ff3a] transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d4ff3a] transition-colors duration-200"
            >
              X (Twitter) ↗
            </a>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a]">
            Newsletter
          </span>
          <p className="font-inter text-sm text-[#edebd6]/70 font-light">
            Studio notes, once a month. No spam.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-[#d4ff3a]/10 border border-[#d4ff3a]/30 text-[#d4ff3a] font-mono-code text-xs">
              Thank you for subscribing to our studio notes.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 h-11 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-[#edebd6] placeholder:text-white/30 focus:outline-none focus:border-[#d4ff3a] transition-colors duration-200"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-[#d4ff3a] hover:bg-[#edebd6] text-[#0a0a0c] font-mono-code text-xs font-bold uppercase tracking-wider transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Massive NOCTURNO Fitted Text Display */}
      <div className="pt-24 sm:pt-36 pb-12 select-none overflow-hidden">
        <FittedText
          text="NOCTURNO"
          color="rgba(237, 235, 214, 0.08)"
          letterSpacing={-0.05}
          lineHeight={0.78}
        />
      </div>

      {/* Copyright & Meta Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 font-mono-code text-xs text-white/40">
        <div>© 2026 Nocturno Studio. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span>WebGL • Three • Framer Motion</span>
          <span>Crafted with Precision</span>
        </div>
      </div>
    </footer>
  );
};

