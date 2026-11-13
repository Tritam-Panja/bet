import React, { useEffect, useRef } from 'react';

interface SmokeBackgroundProps {
  quality?: number;
  flow?: number;
  intensity?: number;
  radius?: number;
  scale?: number;
  parallax?: number;
  ripple?: number;
  particles?: boolean;
  grain?: number;
  base?: string;
  light?: string;
  accent?: string;
}

const VERTEX_SHADER = `
attribute vec2 p;
void main(){
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 uMouse;
uniform float uRef;
uniform float uPxScale;
uniform float uTime, uScroll, uVel, uIntensity, uRadius, uScale, uParallax, uRipple, uParticles, uGrain;
uniform vec3 uBase, uLight, uAccent;

float h2(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vn(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h2(i), h2(i + vec2(1.0, 0.0)), u.x), mix(h2(i + vec2(0.0, 1.0)), h2(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fb4(vec2 p){
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 4; i++){
    s += a * vn(p);
    p = m * p;
    a *= 0.5;
  }
  return s;
}

float fb5(vec2 p){
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 5; i++){
    s += a * vn(p);
    p = m * p;
    a *= 0.5;
  }
  return s;
}

vec2 warp(vec2 p, float t){
  vec2 q = vec2(fb4(p + vec2(0.0, t * 0.02)), fb4(p + vec2(5.2, 1.3) - t * 0.015));
  return vec2(fb4(p + 3.0 * q + vec2(1.7, 9.2)), fb4(p + 3.0 * q + vec2(8.3, 2.8)));
}

float surf(vec2 p, vec2 r){
  float f = fb5(p + 2.0 * r);
  float tt = f * 9.0;
  float terr = (floor(tt) + smoothstep(0.82, 0.98, fract(tt))) / 9.0;
  return mix(f, terr, 0.7) + 0.012 * vn(p * 28.0);
}

vec3 aces(vec3 x){
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main(){
  vec2 s = gl_FragCoord.xy * uPxScale / uRef;
  float t = uTime;
  vec2 p = s * 1.25 * uScale;
  p.y -= uScroll * 0.00045 * uParallax;
  p.x += uVel * uRipple * 0.035 * sin(p.y * 5.0 + t * 1.6);
  vec2 r = warp(p, t);
  float e = 0.0025;
  float h = surf(p, r), hx = surf(p + vec2(e, 0.0), r), hy = surf(p + vec2(0.0, e), r);
  vec3 n = normalize(vec3((h - hx) / e * 0.045, (h - hy) / e * 0.045, 1.0));
  vec3 P = vec3(s, h * 0.12);
  vec3 L = vec3(uMouse / uRef, 0.32);
  vec3 ld = L - P;
  float d = length(ld);
  ld /= d;
  float att = 1.0 / (1.0 + d * d * 22.0 / (uRadius * uRadius));
  att *= 1.0 - smoothstep(0.2, 0.95, d / uRadius);
  float dif = max(dot(n, ld), 0.0);
  float spec = pow(max(dot(reflect(-ld, n), vec3(0.0, 0.0, 1.0)), 0.0), 48.0);
  spec *= 0.12 + 0.88 * smoothstep(0.01, 0.2, 1.0 - n.z);
  float cav = 0.55 + 0.45 * smoothstep(0.2, 0.8, h);
  vec3 col = uLight * (dif * 0.28 + spec * 2.4) * att * cav;
  col += uLight * 0.025 * exp(-d * d * 40.0 / (uRadius * uRadius));
  vec3 K = normalize(vec3(-0.4, 0.7, 0.6));
  col += uLight * 0.16 * max(dot(n, K) - K.z, 0.0) * cav;
  col += uLight * 0.05 * pow(max(dot(reflect(-K, n), vec3(0.0, 0.0, 1.0)), 0.0), 24.0) * cav;
  float rim = pow(max(dot(n, normalize(vec3(-0.8, -0.6, 0.25))), 0.0), 3.0);
  col += uAccent * rim * 0.035 * (0.3 + att);
  if(uParticles > 0.5){
    vec2 gp = s * 38.0;
    gp.y -= uScroll * 0.02 * uParallax + t * 0.12;
    vec2 id = floor(gp);
    vec2 f = fract(gp) - 0.5;
    float rnd = h2(id);
    if(rnd < 0.06){
      vec2 o = vec2(h2(id + 3.1) - 0.5, h2(id + 7.7) - 0.5) * 0.6;
      vec2 q = f - o;
      q.y /= 1.0 + abs(uVel) * 7.0;
      float sp = exp(-dot(q, q) * 420.0);
      float tw = 0.5 + 0.5 * sin(t * 2.0 + rnd * 60.0);
      col += mix(uLight, uAccent, step(0.04, rnd)) * sp * tw * (0.12 + att * 2.2);
    }
  }
  col *= uIntensity;
  vec3 mapped = pow(aces(col * 1.6), vec3(1.0 / 2.2));
  vec3 base = pow(uBase, vec3(1.0 / 2.2));
  vec3 outc = base + (1.0 - base) * mapped;
  outc += (h2(gl_FragCoord.xy + fract(t) * 91.0) - 0.5) * uGrain * 0.04;
  gl_FragColor = vec4(outc, 1.0);
}
`;

function parseColor(str: string): [number, number, number] {
  if (str.startsWith('rgb')) {
    const nums = str.match(/[\d.]+/g);
    if (nums && nums.length >= 3) {
      return [+nums[0] / 255, +nums[1] / 255, +nums[2] / 255];
    }
  }
  if (str.startsWith('#')) {
    const hex = str.replace('#', '');
    const bigint = parseInt(hex, 16);
    return [((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255];
  }
  return [0.04, 0.04, 0.05];
}

export const SmokeBackground: React.FC<SmokeBackgroundProps> = ({
  quality = 0.75,
  flow = 1.0,
  intensity = 0.8,
  radius = 1.0,
  scale = 1.0,
  parallax = 1.0,
  ripple = 1.0,
  particles = true,
  grain = 0.5,
  base = 'rgb(10, 10, 12)',
  light = 'rgb(207, 198, 255)',
  accent = 'rgb(212, 255, 58)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    [
      'uMouse', 'uRef', 'uPxScale', 'uTime', 'uScroll', 'uVel',
      'uIntensity', 'uRadius', 'uScale', 'uParallax', 'uRipple',
      'uParticles', 'uGrain', 'uBase', 'uLight', 'uAccent'
    ].forEach((name) => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });

    let animId = 0;
    let lastTime = performance.now();
    let simTime = 8.0;
    let hasMoved = false;
    const targetMouse = { x: 0, y: 0 };
    const currMouse = { x: 0, y: 0 };
    let clientW = 1;
    let clientH = 1;
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let vel = 0;

    const resize = () => {
      clientW = Math.max(1, window.innerWidth);
      clientH = Math.max(1, window.innerHeight);
      const q = Math.min(1, Math.max(0.3, quality));
      let rw = clientW * q;
      let rh = clientH * q;
      const maxPixels = 1600000;
      if (rw * rh > maxPixels) {
        const factor = Math.sqrt(maxPixels / (rw * rh));
        rw *= factor;
        rh *= factor;
      }
      canvas.width = Math.round(rw);
      canvas.height = Math.round(rh);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = clientW / Math.max(1, rect.width);
      targetMouse.x = (e.clientX - rect.left) * scaleX;
      targetMouse.y = clientH - (e.clientY - rect.top) * scaleX;
      hasMoved = true;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    targetMouse.x = currMouse.x = clientW * 0.62;
    targetMouse.y = currMouse.y = clientH * 0.58;

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const [bR, bG, bB] = parseColor(base);
    const [lR, lG, lB] = parseColor(light);
    const [aR, aG, aB] = parseColor(accent);

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (document.hidden) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      simTime += dt * flow;

      if (!hasMoved) {
        targetMouse.x = clientW * (0.55 + 0.25 * Math.sin(simTime * 0.35));
        targetMouse.y = clientH * (0.55 + 0.18 * Math.sin(simTime * 0.27 + 1.3));
      }

      const lerpFactor = 1 - Math.pow(0.002, dt);
      currMouse.x += (targetMouse.x - currMouse.x) * lerpFactor;
      currMouse.y += (targetMouse.y - currMouse.y) * lerpFactor;

      const targetVel = Math.max(-1, Math.min(1, (scrollY - lastScrollY) / 40));
      lastScrollY = scrollY;
      vel += (targetVel - vel) * Math.min(1, dt * 6);

      gl.uniform2f(uniforms.uMouse, currMouse.x, currMouse.y);
      gl.uniform1f(uniforms.uRef, Math.min(clientH, 1100));
      gl.uniform1f(uniforms.uPxScale, clientW / canvas.width);
      gl.uniform1f(uniforms.uTime, simTime);
      gl.uniform1f(uniforms.uScroll, scrollY);
      gl.uniform1f(uniforms.uVel, vel);
      gl.uniform1f(uniforms.uIntensity, intensity);
      gl.uniform1f(uniforms.uRadius, radius);
      gl.uniform1f(uniforms.uScale, scale);
      gl.uniform1f(uniforms.uParallax, parallax);
      gl.uniform1f(uniforms.uRipple, ripple);
      gl.uniform1f(uniforms.uParticles, particles ? 1.0 : 0.0);
      gl.uniform1f(uniforms.uGrain, grain);
      gl.uniform3f(uniforms.uBase, bR, bG, bB);
      gl.uniform3f(uniforms.uLight, lR, lG, lB);
      gl.uniform3f(uniforms.uAccent, aR, aG, aB);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [quality, flow, intensity, radius, scale, parallax, ripple, particles, grain, base, light, accent]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#0a0a0c] overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};

