import { useEffect } from 'react';
import Lenis from 'lenis';
import { RingField } from './components/RingField';
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
    <div className="relative min-h-screen w-full bg-transparent text-[#edebd6] overflow-x-hidden selection:bg-[#d4ff3a] selection:text-[#0a0a0c]">
      {/* React Bits Pro - Ring Field: Realistic organic dust particles drifting outward */}
      <RingField
        innerColor="#d4ff3a"
        outerColor="#cfc6ff"
        backgroundColor="#08080a"
        ringCount={9}
        speed={0.8}
        waveIntensity={1.2}
        particleCount={340}
        grain={0.3}
        interactive={true}
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
