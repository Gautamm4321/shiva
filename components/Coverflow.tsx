"use client";

import { useState } from "react";

const SLIDES = [
  { name: "Artificial Stones", img: "/cover/c01.jpg" },
  { name: "Granite", img: "/cover/c02.jpg" },
  { name: "Marble", img: "/cover/c03.jpg" },
  { name: "Limestone", img: "/cover/c04.jpg" },
  { name: "Quartzite", img: "/cover/c05.jpg" },
  { name: "Sandstone", img: "/cover/c06.jpg" },
  { name: "Onyx Marble", img: "/cover/c07.jpg" },
  { name: "Landscape", img: "/cover/c08.jpg" },
  { name: "Travertine", img: "/cover/c09.jpg" },
  { name: "Slate", img: "/cover/c10.jpg" },
];
const N = SLIDES.length;

export default function Coverflow() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + N) % N);
  const next = () => setActive((a) => (a + 1) % N);

  const offOf = (i: number) => {
    let o = i - active;
    if (o > N / 2) o -= N;
    if (o < -N / 2) o += N;
    return o;
  };

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-4">
        {/* coverflow stage — bigger cards */}
        <div
          className="relative mx-auto flex h-[clamp(400px,64vh,640px)] items-center justify-center"
          style={{ perspective: "1800px" }}
        >
          {SLIDES.map((s, i) => {
            const off = offOf(i);
            const abs = Math.abs(off);
            const hidden = abs > 2;
            const tx = off * 60;
            const tz = -abs * 150;
            const ry = off * -40;
            const sc = 1 - abs * 0.11;
            return (
              <button
                key={s.img}
                type="button"
                aria-label={s.name}
                onClick={() => !hidden && off !== 0 && setActive(i)}
                className="absolute left-1/2 top-1/2 aspect-[3/4] h-full overflow-hidden rounded-[28px] shadow-[0_50px_100px_-35px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`,
                  zIndex: 30 - abs,
                  opacity: hidden ? 0 : abs === 2 ? 0.74 : 1,
                  pointerEvents: hidden ? "none" : "auto",
                  cursor: off === 0 ? "default" : "pointer",
                }}
              >
                <img src={s.img} alt="" className="h-full w-full object-cover" draggable={false} loading="lazy" />
              </button>
            );
          })}
        </div>

        {/* name with arrows on each side */}
        <div className="mt-10 flex items-center justify-center gap-6 sm:gap-10">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <span
            key={active}
            className="namefade min-w-[180px] text-center text-[clamp(1.35rem,2.4vw,2rem)] font-semibold tracking-[-0.02em] text-black sm:min-w-[260px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {SLIDES[active].name}
          </span>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
