import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidImage } from './LiquidImage';

export interface Project {
  id: string;
  client: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  aspect?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'solaris-atelier',
    client: 'Aurelle',
    year: '2026',
    title: 'Solaris Atelier',
    description: 'A WebGL journey through a sunlit atelier, revealing a luxury collection piece by piece.',
    tags: ['WebGL', 'Real-time 3D'],
    image: 'https://framerusercontent.com/images/uEiLPmcP80MZIr2OU85yoFTDP2c.jpg?width=2000&height=1250',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'tidal-archive',
    client: 'Halden & Co',
    year: '2025',
    title: 'Tidal Archive',
    description: "An interactive ocean of stories where each wave unfolds a chapter of the brand's history.",
    tags: ['Real-time 3D', 'WebGL'],
    image: 'https://framerusercontent.com/images/d9uoZEJmxU59JlNtIrPAFJgfA.jpg?width=1440&height=1800',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'verdant-pavilion',
    client: 'Orbis',
    year: '2025',
    title: 'Verdant Pavilion',
    description: 'A living digital garden for a physical installation, growing with every visitor.',
    tags: ['Real-time 3D', 'Art Direction'],
    image: 'https://framerusercontent.com/images/X92zu4qBY5P6NapQZE2qhrqDI.jpg?width=2000&height=1125',
    aspect: 'aspect-[16/9]',
  },
];

const CATEGORIES = ['All', 'WebGL & 3D', 'Installations', 'Art Direction'];

export const WorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 4))));

  return (
    <section id="work" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24">
        <div>
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#d4ff3a] block mb-3">
            Selected work
          </span>
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#edebd6]">
            Case studies 2025 — 2026
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#d4ff3a] text-[#0a0a0c] font-bold'
                  : 'bg-white/5 text-[#edebd6]/60 hover:text-[#edebd6] hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-24 sm:gap-36">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
          >
            {/* Visual with liquid ripple */}
            <div
              data-framer-name="Project Image"
              data-cursor-zone="view"
              className={`lg:col-span-8 w-full ${project.aspect || 'aspect-[16/10]'} rounded-2xl overflow-hidden cursor-pointer`}
            >
              <LiquidImage
                src={project.image}
                alt={project.title}
                radius={16}
                ripple={1.3}
                hoverZoom={0.06}
                rgbShift={1.0}
                scrollBend={1.0}
                parallax={0.7}
              />
            </div>

            {/* Project Details */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Meta info: Client — Year */}
              <div className="flex items-center gap-3 font-mono-code text-xs uppercase tracking-wider text-[#d4ff3a]">
                <span>{project.client}</span>
                <span className="text-white/30">—</span>
                <span className="text-white/60">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[#edebd6] group-hover:text-[#d4ff3a] transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-base sm:text-lg text-[#edebd6]/70 font-light leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono-code uppercase tracking-wider bg-white/5 text-[#edebd6]/60 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Case Study CTA link */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#edebd6] group-hover:text-[#d4ff3a] group-hover:translate-x-2 transition-all duration-300">
                  Explore Project <span>→</span>
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Archive Callout */}
      <div className="mt-28 p-8 sm:p-14 rounded-3xl bg-[#141418]/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-archivo text-2xl sm:text-3xl font-bold uppercase text-[#edebd6]">
            More worlds in the archive.
          </h3>
          <p className="font-inter text-sm text-[#edebd6]/60 mt-1">
            Over 40+ completed WebGL, 3D and installation projects crafted since 2020.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d4ff3a] hover:bg-[#edebd6] text-[#0a0a0c] font-mono-code text-xs font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap"
        >
          See all projects <span>→</span>
        </a>
      </div>
    </section>
  );
};

