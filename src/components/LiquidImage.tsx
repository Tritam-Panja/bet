import React, { useEffect, useRef, useState } from 'react';

interface LiquidImageProps {
  src: string;
  alt?: string;
  className?: string;
  radius?: number;
  ripple?: number;
  hoverZoom?: number;
  rgbShift?: number;
  scrollBend?: number;
  parallax?: number;
  reveal?: boolean;
  revealDuration?: number;
  cursorFollow?: number;
}

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
uniform float uVel;
uniform float uZoom;
uniform float uPar;
uniform float uRipple;
uniform float uRgb;

vec2 cover(vec2 uv){
  float rs = uRes.x / uRes.y;
  float ri = uImg.x / uImg.y;
  vec2 s = rs < ri ? vec2(rs / ri, 1.0) : vec2(1.0, ri / rs);
  return (uv - 0.5) * s + 0.5;
}

void main(){
  vec2 uv = vUv;
  uv.y += sin(uv.x * 3.14159) * uVel * 0.12;
  vec2 p = uv - uMouse;
  p.x *= uRes.x / uRes.y;
  float d = length(p);
  float wave = sin(d * 26.0 - uTime * 4.0) * exp(-d * 4.5) * uHover * uRipple * 0.022;
  uv += normalize(p + 0.00001) * wave;
  uv = (uv - 0.5) / uZoom + 0.5;
  uv.y += uPar;
  vec2 t = cover(uv);
  float sh = uRgb * uHover * 0.005 + abs(uVel) * 0.015;
  vec4 c;
  c.r = texture2D(uTex, t + vec2(sh, 0.0)).r;
  c.g = texture2D(uTex, t).g;
  c.b = texture2D(uTex, t - vec2(sh, 0.0)).b;
  c.a = 1.0;
  gl_FragColor = c;
}
`;

export const LiquidImage: React.FC<LiquidImageProps> = ({
  src,
  alt = '',
  className = '',
  radius = 6,
  ripple = 1,
  hoverZoom = 0.06,
  rgbShift = 1,
  scrollBend = 1,
  parallax = 1,
  reveal = true,
  revealDuration = 1.6,
  cursorFollow = 0.4,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    const canvas = canvasRef.current;
    if (!container || !inner || !canvas || !src) return;

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false, alpha: false });
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    // Quad buffer
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    ['uTex', 'uRes', 'uImg', 'uMouse', 'uHover', 'uTime', 'uVel', 'uZoom', 'uPar', 'uRipple', 'uRgb'].forEach(name => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });

    let imgW = 1;
    let imgH = 1;
    let isTextureReady = false;

    const texture = gl.createTexture();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!gl || !texture) return;
      imgW = img.naturalWidth || 1;
      imgH = img.naturalHeight || 1;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      } catch {
        return;
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      isTextureReady = true;
      setLoaded(true);
    };
    img.src = src;

    let mouseX = 0.5, mouseY = 0.5;
    let targetMouseX = 0.5, targetMouseY = 0.5;
    let hoverValue = 0;
    let targetHover = 0;
    let scrollVel = 0;
    let lastScrollY = window.scrollY;
    let isIntersecting = true;
    let startTime = performance.now();
    let revealStartTime = -1;
    const durationMs = Math.max(0.2, revealDuration) * 1000;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = 1 - (e.clientY - rect.top) / rect.height;
    };

    const onPointerEnter = (e: PointerEvent) => {
      onPointerMove(e);
      if (hoverValue < 0.02) {
        mouseX = targetMouseX;
        mouseY = targetMouseY;
      }
      targetHover = 1;
    };

    const onPointerLeave = () => {
      targetHover = 0;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(container.clientWidth * dpr));
      const h = Math.max(1, Math.round(container.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && reveal && revealStartTime < 0 && entry.intersectionRatio > 0) {
          revealStartTime = performance.now();
        }
      });
    }, { threshold: [0, 0.15] });
    io.observe(container);

    let animId = 0;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      // Reveal progress
      let u = 1;
      if (reveal && revealStartTime !== 0) {
        u = revealStartTime < 0 ? 0 : Math.min(1, (now - revealStartTime) / durationMs);
        // ease-out quartic
        const eased = 1 - Math.pow(1 - u, 4);
        const inv = 1 - eased;
        inner.style.clipPath = u >= 1 ? '' : `inset(${14 * inv}% ${10 * inv}% ${14 * inv}% ${10 * inv}%)`;
        inner.style.transform = u >= 1 ? '' : `scale(${1 + 0.12 * inv})`;
        if (u >= 1) revealStartTime = 0;
      }

      if (!isIntersecting) return;

      const currentScrollY = window.scrollY;
      const scrollDiff = (currentScrollY - lastScrollY) / Math.max(1, window.innerHeight);
      lastScrollY = currentScrollY;
      scrollVel += (Math.max(-0.4, Math.min(0.4, scrollDiff * 6)) * scrollBend - scrollVel) * 0.12;

      // Smooth hover interpolation
      hoverValue += (targetHover - hoverValue) * 0.1;
      const follow = 0.02 + Math.max(0.02, Math.min(1, cursorFollow)) * 0.3;
      mouseX += (targetMouseX - mouseX) * follow;
      mouseY += (targetMouseY - mouseY) * follow;

      if (!isTextureReady) return;

      const rect = container.getBoundingClientRect();
      const centerFactor = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
      const parOffset = Math.max(-0.6, Math.min(0.6, centerFactor)) * 0.1 * parallax;
      const zoom = (1 + 0.12 * parallax + 0.18 * (1 - u)) * (1 + hoverZoom * hoverValue);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1i(uniforms.uTex, 0);
      gl.uniform2f(uniforms.uRes, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uImg, imgW, imgH);
      gl.uniform2f(uniforms.uMouse, mouseX, mouseY);
      gl.uniform1f(uniforms.uHover, hoverValue);
      gl.uniform1f(uniforms.uTime, (now - startTime) / 1000);
      gl.uniform1f(uniforms.uVel, scrollVel);
      gl.uniform1f(uniforms.uZoom, zoom);
      gl.uniform1f(uniforms.uPar, -parOffset);
      gl.uniform1f(uniforms.uRipple, ripple);
      gl.uniform1f(uniforms.uRgb, rgbShift);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      ro.disconnect();
      io.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      setLoaded(false);
    };
  }, [src, radius, ripple, hoverZoom, rgbShift, scrollBend, parallax, reveal, revealDuration, cursorFollow]);

  return (
    <div
      ref={containerRef}
      style={{ borderRadius: `${radius}px` }}
      className={`relative w-full h-full overflow-hidden bg-[#111114] isolate ${className}`}
    >
      <div ref={innerRef} className="absolute inset-0 w-full h-full will-change-transform">
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-300 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full block transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

