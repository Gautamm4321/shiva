"use client";

import { useEffect, useRef, useState } from "react";

type Stone = {
  name: string;
  short: string;
  img: string;
  headline: string;
  line: string;
};

const STONES: Stone[] = [
  { name: "Artificial Stones", short: "Artificial", img: "/cover/c01.jpg", headline: "Engineered to perfection.", line: "Consistent colour and strength, crafted for busy, high-traffic surfaces." },
  { name: "Marble", short: "Marble", img: "/cover/c03.jpg", headline: "Timeless veined luxury.", line: "Soft, flowing veins that bring quiet grandeur to any interior." },
  { name: "Granite", short: "Granite", img: "/cover/c02.jpg", headline: "Built to last generations.", line: "Dense, hard-wearing stone with deep grain and lasting strength." },
  { name: "Limestone", short: "Limestone", img: "/cover/c04.jpg", headline: "Warm, earthen calm.", line: "Soft matte tones that lend a grounded, natural warmth to spaces." },
  { name: "Quartzite", short: "Quartzite", img: "/cover/c05.jpg", headline: "Strength meets beauty.", line: "The durability of granite with the flowing elegance of marble." },
  { name: "Sandstone", short: "Sandstone", img: "/cover/c06.jpg", headline: "Rugged natural character.", line: "Earthy, layered texture ideal for facades and landscape features." },
  { name: "Onyx Marble", short: "Onyx", img: "/cover/c07.jpg", headline: "Translucent & rare.", line: "A luminous, light-catching stone for true statement surfaces." },
  { name: "Landscape", short: "Landscape", img: "/cover/c08.jpg", headline: "Nature's own artwork.", line: "Cobbles and paving that bring organic texture to the outdoors." },
  { name: "Travertine", short: "Travertine", img: "/cover/c09.jpg", headline: "Ancient roman elegance.", line: "Porous, honeyed stone with a soft, timeless worn surface." },
  { name: "Slate", short: "Slate", img: "/cover/c10.jpg", headline: "Bold, rugged depth.", line: "Rich, riven texture with striking tonal depth and contrast." },
];
const N = STONES.length;
const STEP = 86; // svh of scroll per stone (more scroll = longer freeze)
const HOLD = 0.62; // fraction of each step the stone stays frozen before it moves
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export default function StoneReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let cur = 0;
    const read = () => {
      const el = wrapRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-el.getBoundingClientRect().top, 0, Math.max(total, 1));
      const rawP = (scrolled / Math.max(total, 1)) * (N - 1); // 0..N-1
      // freeze each stone, then transition one by one
      const base = Math.floor(rawP);
      const frac = rawP - base;
      let ef = 0;
      if (frac > HOLD) {
        const t = (frac - HOLD) / (1 - HOLD);
        ef = t * t * (3 - 2 * t); // smoothstep
      }
      target = Math.min(base + ef, N - 1);
    };
    const tick = () => {
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.0006) cur = target;
      setShown(cur);
      raf = requestAnimationFrame(tick);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const active = Math.round(shown);

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `calc(100svh + ${(N - 1) * STEP}svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        {/* top heading */}
        <div className="z-20 shrink-0 px-4 pt-[92px] text-center sm:pt-[104px]">
          <p
            className="text-[clamp(1.05rem,2.9vw,1.55rem)] font-extrabold uppercase tracking-[0.14em] text-black"
            style={{ fontFamily: '"Archivo", sans-serif' }}
          >
            From the Quarry <span className="font-light">to</span> Your Space
          </p>
        </div>

        {/* image zone — grows to fill the middle, image a defined size */}
        <div className="relative z-10 min-h-0 flex-1" style={{ perspective: "1700px" }}>
          {/* ghost name watermark */}
          {STONES.map((s, i) => {
            const d = i - shown;
            const a = Math.max(0, 1 - Math.abs(d));
            if (a <= 0.01) return null;
            return (
              <span
                key={"w" + i}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                style={{
                  opacity: a * 0.22,
                  fontFamily: '"Archivo", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(3.6rem,20vw,16rem)",
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: "2px #000",
                  transform: `translate(-50%, -50%) scale(${1 - d * 0.04})`,
                }}
              >
                {s.short}
              </span>
            );
          })}

          {/* floating stone images (defined h/w, scales down to fit) */}
          {STONES.map((s, i) => {
            const d = i - shown;
            const ad = Math.abs(d);
            if (ad > 1.25) return null;
            return (
              <div
                key={"img" + i}
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: Math.max(0, 1 - ad), zIndex: 10 - Math.round(ad * 5) }}
              >
                <div
                  className="aspect-[3/4] h-[clamp(280px,48vh,440px)] max-h-full"
                  style={{
                    transform: `translate3d(${d * 160}px, ${d * 100 + 10}px, 0) rotateY(${d * -22}deg) rotate(${d * 6}deg) scale(${1 - ad * 0.12})`,
                  }}
                >
                  <div className="h-full w-full overflow-hidden rounded-[24px] shadow-[0_55px_120px_-40px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
                    <img src={s.img} alt={s.name} className="h-full w-full object-cover" draggable={false} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom block (shifted down) */}
        <div className="z-20 shrink-0 px-5 pb-[22px] text-center sm:pb-[30px]">
          <div className="relative mx-auto h-[150px] max-w-[840px] sm:h-[138px]">
            {STONES.map((s, i) => {
              const d = i - shown;
              const ad = Math.abs(d);
              if (ad > 0.9) return null;
              return (
                <div
                  key={"t" + i}
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: Math.max(0, 1 - ad * 1.6), transform: `translateY(${d * 22}px)` }}
                >
                  <h3
                    className="text-[clamp(1.7rem,4.3vw,3rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.015em] text-black"
                    style={{ fontFamily: '"Archivo", sans-serif' }}
                  >
                    {s.headline}
                  </h3>
                  <p
                    className="mx-auto mt-3 max-w-[50ch] text-[clamp(0.9rem,1.5vw,1.08rem)] leading-[1.6] text-black"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {s.line}
                  </p>
                </div>
              );
            })}
          </div>

          {/* progress dots */}
          <div className="mt-4 flex items-center justify-center gap-[7px]">
            {STONES.map((_, i) => (
              <span
                key={"d" + i}
                className="h-[3px] rounded-full bg-black transition-all duration-300"
                style={{ width: i === active ? 24 : 7, opacity: i === active ? 1 : 0.25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
