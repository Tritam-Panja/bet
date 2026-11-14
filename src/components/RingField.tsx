import React, { useEffect, useRef } from 'react';

export interface RingFieldProps {
  /**
   * Color of inner dust / core glow
   * @default '#d4ff3a'
   */
  innerColor?: string;
  /**
   * Color of outer ambient dust
   * @default '#cfc6ff'
   */
  outerColor?: string;
  /**
   * Deep background void color
   * @default '#08080a'
   */
  backgroundColor?: string;
  /**
   * Number of wave frequency tracks
   * @default 9
   */
  ringCount?: number;
  /**
   * Outward drift speed
   * @default 0.8
   */
  speed?: number;
  /**
   * Organic wave turbulence
   * @default 1.2
   */
  waveIntensity?: number;
  /**
   * Dust particle density
   * @default 320
   */
  particleCount?: number;
  /**
   * Film grain overlay
   * @default 0.35
   */
  grain?: number;
  /**
   * Cursor interactivity
   * @default true
   */
  interactive?: boolean;
  className?: string;
}

interface DustParticle {
  angle: number;
  trackProgress: number; // 0 to 1 outward
  speedMult: number;
  angularSpeed: number;
  baseRadiusOffset: number;
  depthZ: number; // 0.2 (distant/micro) to 1.0 (foreground bokeh)
  size: number;
  baseAlpha: number;
  twinkleFreq: number;
  twinklePhase: number;
  colorType: 'lime' | 'lavender' | 'amber' | 'white';
}

export const RingField: React.FC<RingFieldProps> = ({
  innerColor = '#d4ff3a',
  outerColor = '#cfc6ff',
  backgroundColor = '#08080a',
  ringCount = 9,
  speed = 0.8,
  waveIntensity = 1.2,
  particleCount = 340,
  grain = 0.35,
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Smooth cursor interpolation & velocity
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const mouseVel = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };
    let hasPointerMoved = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!hasPointerMoved) {
        targetMouse.x = mouse.x = lastMouse.x = width * 0.5;
        targetMouse.y = mouse.y = lastMouse.y = height * 0.48;
      }
    };

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      hasPointerMoved = true;
    };

    resize();
    window.addEventListener('resize', resize);
    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('mousemove', onPointerMove, { passive: true });
    }

    // Initialize multi-depth realistic dust particles
    const particles: DustParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      // 3D depth slice: most particles are fine micro dust (0.2 - 0.6), few are close soft bokeh (0.7 - 1.0)
      const depthZ = Math.pow(Math.random(), 1.6) * 0.8 + 0.2;
      const colorRand = Math.random();
      const colorType: DustParticle['colorType'] =
        colorRand > 0.65 ? 'lime' : colorRand > 0.3 ? 'lavender' : colorRand > 0.15 ? 'white' : 'amber';

      particles.push({
        angle: Math.random() * Math.PI * 2,
        trackProgress: Math.random(), // initial outward cycle
        speedMult: 0.6 + Math.random() * 0.8,
        angularSpeed: (Math.random() - 0.48) * 0.006 * depthZ,
        baseRadiusOffset: (Math.random() - 0.5) * 60 * depthZ,
        depthZ,
        size: (0.8 + Math.random() * 2.2) * depthZ,
        baseAlpha: (0.35 + Math.random() * 0.55) * depthZ,
        twinkleFreq: 1.5 + Math.random() * 3.0,
        twinklePhase: Math.random() * Math.PI * 2,
        colorType,
      });
    }

    // Sort by depth for correct realistic z-layering (back to front)
    particles.sort((a, b) => a.depthZ - b.depthZ);

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.016 * speed;

      // Mouse velocity dampening & position easing
      mouseVel.x = (mouse.x - lastMouse.x) * 0.12;
      mouseVel.y = (mouse.y - lastMouse.y) * 0.12;
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      // Fill base background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const maxDim = Math.max(width, height);
      const minDim = Math.min(width, height);
      // Subtle origin shift based on cursor
      const centerX = width * 0.5 + (mouse.x - width * 0.5) * 0.22;
      const centerY = height * 0.5 + (mouse.y - height * 0.5) * 0.22;

      const innerVoidRadius = minDim * 0.08;
      const maxRadius = maxDim * 0.95;

      // Cursor gentle interaction aura / soft light field
      if (hasPointerMoved) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        aura.addColorStop(0, 'rgba(212, 255, 58, 0.05)');
        aura.addColorStop(0.5, 'rgba(207, 198, 255, 0.02)');
        aura.addColorStop(1, 'rgba(8, 8, 10, 0)');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw dust particles with natural depth of field and soft gaussian-style falloff
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Progress outward continuously
        p.trackProgress += 0.00045 * speed * p.speedMult;
        if (p.trackProgress > 1.0) {
          p.trackProgress -= 1.0;
          p.angle = Math.random() * Math.PI * 2;
        }

        p.angle += p.angularSpeed;

        // Wave trajectory calculation (fractal harmonic fluid disturbance)
        const cycleProgress = p.trackProgress;
        const currentRadius =
          innerVoidRadius + (maxRadius - innerVoidRadius) * Math.pow(cycleProgress, 1.2) + p.baseRadiusOffset;

        // Organic waves
        const wave1 = Math.sin(p.angle * 3 + time * 1.6) * 20 * waveIntensity * p.depthZ;
        const wave2 = Math.cos(p.angle * 5 - time * 1.1 + cycleProgress * 4.0) * 12 * waveIntensity;
        const wave3 = Math.sin(p.angle * 2 + time * 0.5) * 16;

        let px = centerX + Math.cos(p.angle) * (currentRadius + wave1 + wave2 + wave3);
        let py = centerY + Math.sin(p.angle) * (currentRadius + wave1 + wave2 + wave3);

        // Interactive cursor repulsion wave
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);
        const repelRadius = 140 * p.depthZ;
        if (dist < repelRadius && dist > 1) {
          const force = (1 - dist / repelRadius) * 18 * p.depthZ;
          px += (dx / dist) * force + mouseVel.x * 0.4;
          py += (dy / dist) * force + mouseVel.y * 0.4;
        }

        // Fade in smoothly as it emerges from the center, fade out at outer horizon
        const edgeFade = Math.sin(cycleProgress * Math.PI);
        // Organic twinkling shimmer
        const shimmer = 0.65 + 0.35 * Math.sin(time * p.twinkleFreq + p.twinklePhase);
        const finalAlpha = Math.max(0, p.baseAlpha * edgeFade * shimmer);

        if (finalAlpha <= 0.01) continue;

        // Color selection based on type
        const rgb =
          p.colorType === 'lime'
            ? '212, 255, 58'
            : p.colorType === 'lavender'
            ? '207, 198, 255'
            : p.colorType === 'amber'
            ? '255, 235, 170'
            : '255, 255, 255';

        // Draw soft realistic bokeh dust with radial gradient falloff
        const renderRadius = Math.max(1, p.size * (1.2 + 0.4 * p.depthZ));
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, renderRadius * 2.8);
        
        // Solid core
        gradient.addColorStop(0, `rgba(${rgb}, ${Math.min(1.0, finalAlpha * 1.3)})`);
        // Soft aura falloff
        gradient.addColorStop(0.35, `rgba(${rgb}, ${finalAlpha * 0.55})`);
        // Outer haze
        gradient.addColorStop(0.75, `rgba(${rgb}, ${finalAlpha * 0.12})`);
        gradient.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, renderRadius * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Atmospheric vignette around screen borders
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        minDim * 0.35,
        width * 0.5,
        height * 0.5,
        maxDim * 0.85
      );
      vignette.addColorStop(0, 'rgba(8, 8, 10, 0)');
      vignette.addColorStop(0.8, 'rgba(8, 8, 10, 0.4)');
      vignette.addColorStop(1, 'rgba(8, 8, 10, 0.85)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('mousemove', onPointerMove);
      }
    };
  }, [innerColor, outerColor, backgroundColor, ringCount, speed, waveIntensity, particleCount, interactive]);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#08080a] overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block"
      />
      {grain > 0 && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  );
};
