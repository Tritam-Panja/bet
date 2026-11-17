import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';

const SERVICES = [
  {
    num: '01',
    title: 'WEBSITE',
    description: 'We design and develop responsive websites and 3D experiences that help businesses present their ideas with clarity and impact. From intuitive layouts to interactive visuals, we create polished digital experiences that work smoothly across devices.',
    deliverables: ['Responsive Web Design', '3D Experiences', 'Interactive Visuals', 'UI/UX Layouts'],
  },
  {
    num: '02',
    title: 'SOFTWARE',
    description: 'We develop ERP and CRM software tailored to your business workflows. By bringing operations, customer information and team processes together in one platform, our solutions help reduce manual work, improve coordination and support better decisions as your business grows.',
    deliverables: ['Custom ERP Systems', 'Tailored CRM Solutions', 'Workflow Automation', 'Operations Management'],
  },
  {
    num: '03',
    title: 'AI AUTOMATION',
    description: 'We create AI-powered automations that handle repetitive tasks, connect business tools and speed up everyday workflows. Tailored to your needs, they help teams save time and focus on work that requires human attention.',
    deliverables: ['AI Workflow Agents', 'Tool Integrations', 'Task Automation', 'Intelligent Pipelines'],
  },
  {
    num: '04',
    title: 'APP DEVELOPMENT',
    description: 'We design and develop mobile apps that make your services easy to access and use. From planning and interface design to development and launch, we create apps shaped around your business goals and your users’ needs.',
    deliverables: ['iOS & Android Apps', 'Mobile UI/UX Design', 'Full-cycle Development', 'App Store Launch'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 sm:mb-28">
        <div>
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#B173F0] block mb-3">
            (02) — What we do
          </span>
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#edebd6]">
            <DecryptedText
              text="What we do"
              animateOn="inViewHover"
              effect="scramble"
              sequential
              revealDirection="start"
              speed={45}
              maxIterations={12}
              hoverRadius={80}
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
            className="group p-8 sm:p-12 rounded-3xl bg-[#141418]/50 hover:bg-[#18181e]/80 border border-white/10 hover:border-[#B173F0]/40 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10">
                <span className="font-mono-code text-sm text-[#B173F0] font-bold">
                  {srv.num}
                </span>
                <span className="font-mono-code text-xs text-white/40 uppercase tracking-widest">
                  Craft
                </span>
              </div>

              <h3 className="font-archivo text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#edebd6] group-hover:text-[#B173F0] transition-colors duration-300">
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
                  <span className="text-[#B173F0]">+</span>
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
          className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-[#B173F0] hover:text-[#edebd6] transition-colors duration-300"
        >
          Tell us about it <span>→</span>
        </a>
      </div>
    </section>
  );
};

