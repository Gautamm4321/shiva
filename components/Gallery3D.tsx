"use client";

import { useEffect, useRef } from "react";

const IMAGES = Array.from({ length: 20 }, (_, i) => `/gallery/g${String(i + 1).padStart(2, "0")}.jpg`);

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(98765);
const CARDS = IMAGES.map((src) => ({
  src,
  bx: (rnd() * 2 - 1) * 34,
  by: (rnd() * 2 - 1) * 26,
  bz: (rnd() * 2 - 1) * 480,
  rotY: (rnd() * 2 - 1) * 34,
  rotX: (rnd() * 2 - 1) * 12,
  scale: 0.7 + rnd() * 0.5,
  phase: rnd(),
}));

export default function Gallery3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let shown = 0;
    let raf = 0;
    const loop = () => {
      const el = wrap.current;
      const st = stage.current;
      if (el && st) {
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
        const target = total > 0 ? scrolled / total : 0;
        shown += (target - shown) * 0.08;
        if (Math.abs(target - shown) < 0.0002) shown = target;
        const p = shown;

        const gy = (p - 0.5) * 46;
        const gx = -4 + Math.sin(p * Math.PI * 2) * 3;
        st.style.transform = `rotateX(${gx}deg) rotateY(${gy}deg)`;

        const spread = 0.12 + 0.88 * (0.5 - 0.5 * Math.cos(p * Math.PI * 2 * 2.2));

        for (let i = 0; i < CARDS.length; i++) {
          const c = cardRefs.current[i];
          if (!c) continue;
          const C = CARDS[i];
          const s = Math.min(1.1, Math.max(0, spread + (C.phase - 0.5) * 0.18));
          const x = C.bx * s;
          const y = C.by * s;
          const z = C.bz * s;
          const sc = 0.72 + (C.scale - 0.72) * s;
          c.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px) rotateY(${C.rotY}deg) rotateX(${C.rotX}deg) scale(${sc})`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={wrap} className="relative w-full bg-black" style={{ height: "340vh" }}>
      <div
        className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
        style={{ perspective: "1300px" }}
      >
        <div ref={stage} className="relative" style={{ transformStyle: "preserve-3d" }}>
          {CARDS.map((C, i) => (
            <div
              key={C.src}
              ref={(e) => {
                cardRefs.current[i] = e;
              }}
              className="absolute left-1/2 top-1/2 h-[clamp(170px,26vh,266px)] w-[clamp(128px,20vh,200px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[6px] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/10 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img src={C.src} alt="" className="h-full w-full object-cover" draggable={false} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
