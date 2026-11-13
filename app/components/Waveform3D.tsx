"use client";

import { useEffect, useRef } from "react";

/**
 * 3D waveform — a field of glowing points receding to a horizon, rippling
 * like a voice. Raw WebGL (no 3D library): one static vertex buffer, all
 * motion computed in the vertex shader, one draw call per frame.
 *
 * Performance: DPR capped at 1.5, loop runs only while on screen and the
 * tab is visible, reduced-motion users get a single still frame, and if
 * WebGL is unavailable the gradient behind it simply shows.
 */

const VERT = `
attribute vec2 a_grid;
uniform float u_time;
uniform float u_aspect;
uniform float u_peak;
uniform float u_shape;
uniform float u_size;
uniform vec2 u_tilt;
uniform float u_mode;
varying float v_h;
varying float v_fade;
varying float v_line;

void main() {
  float u = a_grid.x;
  float v = a_grid.y;
  float d = abs(u - 0.5);

  // Amplitude envelope across the width: valley (peaks at the edges) or arch.
  float env = u_shape > 0.5
    ? 0.16 + 0.84 * exp(-pow((d - 0.39) / 0.16, 2.0))
    : 0.16 + 0.84 * exp(-pow(d / 0.23, 2.0));

  float t = u_time;
  // Layered octaves: broad swells, mid ridges, and fine "voice" texture.
  float w = 0.50
    + 0.20 * sin(u * 15.0 - t * 1.25 + v * 3.0)
    + 0.13 * sin(u * 37.0 + t * 1.9 - v * 6.0)
    + 0.09 * sin(v * 11.0 - t * 0.85 + u * 5.0)
    + 0.06 * sin(u * 83.0 - t * 3.1 + v * 14.0)
    + 0.04 * sin(u * 151.0 + t * 4.3 - v * 23.0) * sin(v * 31.0 + t * 1.7);

  // Two staggered "spoken" ripples travelling outward from front-centre.
  float r = length(vec2((u - 0.5) * 2.4, v * 1.3));
  float p1 = fract(t / 3.6);
  float p2 = fract(t / 3.6 + 0.5);
  float ripple = (1.0 - p1) * 0.5 * exp(-pow((r - p1 * 1.9) / 0.07, 2.0))
               + (1.0 - p2) * 0.3 * exp(-pow((r - p2 * 1.9) / 0.05, 2.0));

  float h = u_peak * env * (w + ripple);
  v_h = h / u_peak;

  float halfW = max(1.1, u_aspect * 0.82);
  vec3 p = vec3((u - 0.5) * 2.0 * halfW, h, 0.3 + v * 4.4);

  // Camera: above the field, pitched down, nudged by the pointer.
  vec3 cam = vec3(u_tilt.x * 0.35, 1.05 + u_tilt.y * 0.12, -0.45);
  vec3 q = p - cam;
  float a = 0.33;
  float ca = cos(a);
  float sa = sin(a);
  vec3 c = vec3(q.x, q.y * ca + q.z * sa, -q.y * sa + q.z * ca);

  float f = 1.6;
  gl_Position = vec4(c.x * f / u_aspect, c.y * f, 0.0, c.z);
  gl_PointSize = max(1.0, u_size / c.z);
  v_line = u_mode;

  float depthFade = 1.0 - smoothstep(0.5, 1.0, v);
  float edgeFade = smoothstep(0.0, 0.07, u) * smoothstep(1.0, 0.93, u);
  v_fade = depthFade * edgeFade * (0.55 + 0.45 * env);
}
`;

const FRAG = `
precision mediump float;
varying float v_h;
varying float v_fade;
varying float v_line;

void main() {
  float d = 0.0;
  if (v_line < 0.5) {
    vec2 c = gl_PointCoord - 0.5;
    d = dot(c, c);
    if (d > 0.25) discard;
  }

  vec3 low  = vec3(0.55, 0.50, 1.00);
  vec3 mid  = vec3(1.00, 0.33, 0.13);
  vec3 high = vec3(1.00, 0.87, 0.80);
  float h = clamp(v_h, 0.0, 1.5);
  vec3 col = h < 0.55
    ? mix(low, mid, h / 0.55)
    : mix(mid, high, clamp((h - 0.55) / 0.65, 0.0, 1.0));

  float alpha = v_fade * (1.0 - d * 3.0) * (0.6 + 0.6 * smoothstep(0.0, 0.7, h));
  // Crest highlight: the tallest points glint.
  col += vec3(0.25, 0.18, 0.12) * smoothstep(0.85, 1.25, h);
  if (v_line > 0.5) alpha *= 0.28;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function Waveform3D({
  className = "",
  shape = "valley",
  peak = 0.62,
}: {
  className?: string;
  shape?: "valley" | "arch";
  peak?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const loc = {
      time: gl.getUniformLocation(prog, "u_time"),
      aspect: gl.getUniformLocation(prog, "u_aspect"),
      peak: gl.getUniformLocation(prog, "u_peak"),
      shape: gl.getUniformLocation(prog, "u_shape"),
      size: gl.getUniformLocation(prog, "u_size"),
      tilt: gl.getUniformLocation(prog, "u_tilt"),
      mode: gl.getUniformLocation(prog, "u_mode"),
    };

    const buffer = gl.createBuffer();
    const aGrid = gl.getAttribLocation(prog, "a_grid");
    let count = 0;
    let gridCols = 0;
    let gridRows = 0;

    const buildGrid = (narrow: boolean) => {
      const cols = narrow ? 150 : 280;
      const rows = narrow ? 56 : 88;
      const data = new Float32Array(cols * rows * 2);
      let k = 0;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          data[k++] = i / (cols - 1);
          data[k++] = j / (rows - 1);
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aGrid);
      gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, 0, 0);
      count = cols * rows;
      gridCols = cols;
      gridRows = rows;
    };

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);
    gl.uniform1f(loc.peak, peak);
    gl.uniform1f(loc.shape, shape === "valley" ? 1 : 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = 1;
    let narrow: boolean | null = null;
    let raf = 0;
    let onScreen = false;
    const t0 = performance.now();
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(loc.aspect, rect.width / Math.max(1, rect.height));
      gl.uniform1f(loc.size, 3.3 * dpr);
      const isNarrow = rect.width < 700;
      if (isNarrow !== narrow) {
        narrow = isNarrow;
        buildGrid(isNarrow);
      }
    };

    const draw = (t: number) => {
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;
      gl.uniform1f(loc.time, t);
      gl.uniform2f(loc.tilt, tilt.x, tilt.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // Faint contour lines along every other row give the surface definition…
      gl.uniform1f(loc.mode, 1);
      for (let j = 0; j < gridRows; j += 2) gl.drawArrays(gl.LINE_STRIP, j * gridCols, gridCols);
      // …then the glowing points on top.
      gl.uniform1f(loc.mode, 0);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    const frame = (now: number) => {
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || reduce || !onScreen || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(1.4);

    const ro = new ResizeObserver(() => {
      resize();
      draw((performance.now() - t0) / 1000);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Pointer parallax, listened for on the whole section.
    const host = canvas.closest("section") ?? canvas;
    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      if (pe.pointerType !== "mouse") return;
      const r = (host as HTMLElement).getBoundingClientRect();
      tilt.tx = ((pe.clientX - r.left) / r.width - 0.5) * 2;
      tilt.ty = ((pe.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      tilt.tx = 0;
      tilt.ty = 0;
    };
    if (!reduce) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [shape, peak]);

  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`} aria-hidden>
      <div
        className={`absolute bottom-0 left-1/2 h-[75%] -translate-x-1/2 rounded-[50%] ${
          shape === "arch"
            ? "w-[min(1000px,90%)] bg-[radial-gradient(closest-side,rgba(255,84,32,0.32),rgba(110,86,230,0.16)_55%,transparent)]"
            : "w-full bg-[radial-gradient(60%_100%_at_50%_100%,rgba(110,86,230,0.28),transparent_70%)]"
        }`}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
