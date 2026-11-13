import React, { useEffect, useRef, useState } from 'react';

interface FittedTextProps {
  text: string;
  className?: string;
  color?: string;
  letterSpacing?: number;
  uppercase?: boolean;
  lineHeight?: number;
}

export const FittedText: React.FC<FittedTextProps> = ({
  text,
  className = '',
  color = 'rgb(28, 28, 33)',
  letterSpacing = -0.05,
  uppercase = true,
  lineHeight = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const probeRef = useRef<HTMLSpanElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(160);

  useEffect(() => {
    const container = containerRef.current;
    const probe = probeRef.current;
    if (!container || !probe) return;

    const compute = () => {
      const cw = container.offsetWidth;
      const pw = probe.offsetWidth;
      if (cw > 0 && pw > 0) {
        setFontSize(Math.max(8, (cw / pw) * 100 * 0.995));
      }
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);

    if (document.fonts) {
      document.fonts.ready.then(compute);
    }
    const t1 = setTimeout(compute, 300);
    const t2 = setTimeout(compute, 1200);

    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [text, letterSpacing, uppercase]);

  const styleObj: React.CSSProperties = {
    letterSpacing: `${letterSpacing}em`,
    textTransform: uppercase ? 'uppercase' : 'none',
    whiteSpace: 'nowrap',
    fontWeight: 700,
  };

  return (
    <div ref={containerRef} className={`w-full relative overflow-hidden select-none ${className}`}>
      <span
        ref={probeRef}
        aria-hidden="true"
        style={{ ...styleObj, fontSize: 100, lineHeight: 1 }}
        className="absolute left-0 top-0 invisible pointer-events-none"
      >
        {text}
      </span>
      <p
        style={{
          ...styleObj,
          fontSize: `${fontSize}px`,
          lineHeight,
          color,
          margin: 0,
        }}
        className="font-inter tracking-tight"
      >
        {text}
      </p>
    </div>
  );
};

