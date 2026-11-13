import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  color?: string;
  dotSize?: number;
  ringSize?: number;
  linkSize?: number;
  bubbleSize?: number;
  ringColor?: string;
  labelColor?: string;
  viewLabel?: string;
  exploreLabel?: string;
  trail?: number;
  hideSystemCursor?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  color = 'rgb(212, 255, 58)',
  dotSize = 8,
  ringSize = 36,
  linkSize = 64,
  bubbleSize = 108,
  ringColor = 'rgba(237, 235, 230, 0.55)',
  labelColor = 'rgb(10, 10, 12)',
  viewLabel = 'View',
  exploreLabel = 'Explore',
  trail = 0.18,
  hideSystemCursor = false,
}) => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let animId = 0;
    let lastTime = performance.now();
    let currentMode = '';
    let isVisible = false;

    let styleEl: HTMLStyleElement | null = null;
    if (hideSystemCursor) {
      styleEl = document.createElement('style');
      styleEl.textContent = `@media (hover: hover) and (pointer: fine){ html, body, a, button, * { cursor: none !important; } }`;
      document.head.appendChild(styleEl);
    }

    const setMode = (mode: string) => {
      if (mode === currentMode) return;
      currentMode = mode;
      const isBubble = mode === 'view' || mode === 'explore';
      const targetSize = isBubble ? bubbleSize : mode === 'link' ? linkSize : ringSize;

      ring.style.width = `${targetSize}px`;
      ring.style.height = `${targetSize}px`;
      ring.style.backgroundColor = isBubble ? color : 'transparent';
      ring.style.borderColor = isBubble || mode === 'link' ? color : ringColor;
      label.textContent = mode === 'view' ? viewLabel : mode === 'explore' ? exploreLabel : '';
      dot.style.opacity = isBubble ? '0' : '1';
    };

    const setVisibility = (visible: boolean) => {
      if (visible !== isVisible) {
        isVisible = visible;
        dot.style.opacity = visible && currentMode !== 'view' && currentMode !== 'explore' ? '1' : '0';
        ring.style.opacity = visible ? '1' : '0';
      }
    };

    const getTargetMode = (el: HTMLElement | null): string => {
      let cur: HTMLElement | null = el;
      while (cur && cur !== document.body) {
        const framerName = (cur.getAttribute('data-framer-name') || '').toLowerCase();
        const cursorZone = (cur.getAttribute('data-cursor-zone') || '').toLowerCase();
        if (cursorZone === 'explore' || framerName.includes('hero sculpture')) return 'explore';
        if (cursorZone === 'view' || framerName.includes('project image') || framerName.includes('work')) return 'view';
        cur = cur.parentElement;
      }
      if (el && el.closest('a, button, [role="button"], input, textarea, select, label')) {
        return 'link';
      }
      return '';
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
      }
      setVisibility(true);
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
    };

    const onPointerOver = (e: MouseEvent) => {
      setMode(getTargetMode(e.target as HTMLElement));
    };

    const onPointerLeave = () => {
      setVisibility(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const factor = 1 - Math.pow(1 - Math.min(0.95, Math.max(0.02, trail)), dt * 60);
      ringPos.x += (mouse.x - ringPos.x) * factor;
      ringPos.y += (mouse.y - ringPos.y) * factor;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      if (styleEl) styleEl.remove();
    };
  }, [enabled, color, dotSize, ringSize, linkSize, bubbleSize, ringColor, labelColor, viewLabel, exploreLabel, trail, hideSystemCursor]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[99999] overflow-hidden" aria-hidden="true">
      <div
        ref={ringRef}
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderColor: ringColor,
          transition: 'width 0.45s cubic-bezier(0.77,0,0.175,1), height 0.45s cubic-bezier(0.77,0,0.175,1), background-color 0.3s, border-color 0.3s, opacity 0.3s',
        }}
        className="fixed top-0 left-0 rounded-full border box-border flex items-center justify-center opacity-0 pointer-events-none will-change-transform"
      >
        <span
          ref={labelRef}
          style={{ color: labelColor }}
          className="font-mono-code text-[11px] font-normal tracking-[0.08em] uppercase whitespace-nowrap"
        />
      </div>
      <div
        ref={dotRef}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
        }}
        className="fixed top-0 left-0 rounded-full opacity-0 pointer-events-none will-change-transform"
      />
    </div>
  );
};

