import { useEffect } from 'react';
import Lenis from 'lenis';
import { SmokeBackground } from './components/SmokeBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudioSection } from './components/StudioSection';
import { WorkSection } from './components/WorkSection';
import { ServicesSection } from './components/ServicesSection';
import { ClientTicker } from './components/ClientTicker';
import { ContactFooter } from './components/ContactFooter';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0c] text-[#edebd6] overflow-x-hidden selection:bg-[#d4ff3a] selection:text-[#0a0a0c]">
      {/* Interactive WebGL Smoke/Flow Background */}
      <SmokeBackground
        quality={0.8}
        flow={1.0}
        intensity={0.85}
        radius={1.0}
        scale={1.0}
        parallax={1.0}
        ripple={1.0}
        particles={true}
        grain={0.5}
        base="rgb(10, 10, 12)"
        light="rgb(207, 198, 255)"
        accent="rgb(212, 255, 58)"
      />

      {/* Adaptive Custom Cursor */}
      <CustomCursor
        color="rgb(212, 255, 58)"
        dotSize={8}
        ringSize={36}
        linkSize={64}
        bubbleSize={110}
        ringColor="rgba(237, 235, 230, 0.45)"
        labelColor="rgb(10, 10, 12)"
        viewLabel="View"
        exploreLabel="Explore"
        trail={0.2}
      />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <StudioSection />
        <WorkSection />
        <ServicesSection />
        <ClientTicker />
        <ContactFooter />
      </main>
    </div>
  );
}

export default App;
