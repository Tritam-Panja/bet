import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  originalY: number;
}

export const SmokeBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & velocity
    const mouse = { x: width * 0.5, y: height * 0.5 };
    const prevMouse = { x: width * 0.5, y: height * 0.5 };
    const mouseVel = { x: 0, y: 0 };
    let hasInteracted = false;

    // Palette: Lime accents, lavender stars, muted soft glow
    const colors = ['#B173F0', '#cfc6ff', '#ffffff', '#e2ffa3', '#b3a5ff'];

    // Create 75 floating particles
    const particleCount = 75;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.25 - Math.random() * 0.45, // gentle upward drift like smoke embers
      size: Math.random() * 2.2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      twinkleOffset: Math.random() * Math.PI * 2,
      originalY: 0,
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hasInteracted = true;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.02;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse physics
      mouseVel.x = (mouse.x - prevMouse.x) * 0.25;
      mouseVel.y = (mouse.y - prevMouse.y) * 0.25;
      prevMouse.x += (mouse.x - prevMouse.x) * 0.15;
      prevMouse.y += (mouse.y - prevMouse.y) * 0.15;

      // Draw cursor radial glow beacon that reflects through the smoke
      if (hasInteracted) {
        const glowRadius = 320;
        const radialGlow = ctx.createRadialGradient(
          prevMouse.x,
          prevMouse.y,
          0,
          prevMouse.x,
          prevMouse.y,
          glowRadius
        );
        radialGlow.addColorStop(0, 'rgba(207, 198, 255, 0.22)');
        radialGlow.addColorStop(0.3, 'rgba(177, 115, 240, 0.08)');
        radialGlow.addColorStop(0.7, 'rgba(207, 198, 255, 0.02)');
        radialGlow.addColorStop(1, 'rgba(10, 10, 12, 0)');
        
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw flowing ambient particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with mouse wave
        const dx = p.x - prevMouse.x;
        const dy = p.y - prevMouse.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 200;

        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * 1.8;
          p.x += (dx / dist) * force + mouseVel.x * 0.1;
          p.y += (dy / dist) * force + mouseVel.y * 0.1;
        }

        // Natural swirling drift
        p.x += p.vx + Math.sin(time + p.twinkleOffset) * 0.35;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Twinkle pulsating brightness
        const currentAlpha = Math.max(
          0.1,
          p.alpha * (0.6 + 0.4 * Math.sin(time * 3 + p.twinkleOffset))
        );

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        // Extra soft outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha * 0.25;
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#0a0a0c] overflow-hidden">
      {/* Seamless looping ambient video background directly from your asset */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        style={{ filter: 'contrast(1.1) brightness(1.05)' }}
      >
        <source src="/background-smoke.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric depth overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/20 to-[#0a0a0c]/60 pointer-events-none" />

      {/* Interactive floating particle & light glow canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </div>
  );
};
