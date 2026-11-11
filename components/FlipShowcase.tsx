"use client";

import { useEffect, useRef } from "react";
import { posters } from "@/lib/showcase";

/* four faceted-stone icons (sized by CSS: .lps-icons svg) */
function StoneIcons() {
  return (
    <>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3 L16 4 L21 10 L17 18 L8 20 L3 12 L5 6 Z" fill="#cbc8bf" />
        <path d="M3 12 L8 20 L17 18 L12 12 Z" fill="#3a3a35" />
        <path d="M5 6 L12 12 L21 10 M8 3 L12 12 L3 12" fill="none" stroke="#2a2a26" strokeWidth="0.7" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8 L15 3 L21 12 L13 20 L4 15 Z" fill="#cbc8bf" />
        <path d="M4 15 L13 20 L21 12 L11 13 Z" fill="#3a3a35" />
        <path d="M15 3 L11 13 L5 8 M11 13 L21 12" fill="none" stroke="#2a2a26" strokeWidth="0.7" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4 L17 4 L22 12 L17 20 L7 20 L2 12 Z" fill="#cbc8bf" />
        <path d="M2 12 L7 20 L17 20 L22 12 L12 13 Z" fill="#3a3a35" />
        <path d="M7 4 L12 13 L17 4 M2 12 L12 13 L22 12" fill="none" stroke="#2a2a26" strokeWidth="0.7" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 L20 9 L18 18 L6 18 L4 9 Z" fill="#cbc8bf" />
        <path d="M6 18 L18 18 L12 11 Z" fill="#3a3a35" />
        <path d="M4 9 L12 11 L20 9 M12 3 L12 11" fill="none" stroke="#2a2a26" strokeWidth="0.7" strokeLinejoin="round" />
      </svg>
    </>
  );
}

export default function FlipShowcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;
    const slides = Array.from(rootEl.querySelectorAll<HTMLElement>(".lps-slide"));
    const n = slides.length;
    if (n < 2) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const HOLD = 0.3; // part of each slide's scroll where it sits still
    let shown = 0;
    let goal = 0;
    let raf: number | null = null;
    let current = -1;
    let target: HTMLElement | null = null;

    const el = (sl: HTMLElement, sel: string) => sl.querySelector<HTMLElement>(sel)!;
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const resetSlide = (sl: HTMLElement) => {
      [".lps-card", ".lps-bg"].forEach((s) => {
        const x = el(sl, s);
        x.style.transform = "";
        x.style.opacity = "";
        x.style.clipPath = "";
      });
      sl.style.opacity = "";
    };

    const readScroll = () => {
      const rect = rootEl.getBoundingClientRect();
      const total = rootEl.offsetHeight - window.innerHeight;
      const prog = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const raw = prog * (n - 1);
      const i = Math.min(n - 2, Math.floor(raw));
      const f = raw - i;
      goal = prog >= 1 ? n - 1 : i + clamp((f - HOLD / 2) / (1 - HOLD));
    };

    const draw = (pos: number) => {
      let i = Math.min(n - 1, Math.floor(pos + 1e-6));
      let p = pos - i;
      if (i >= n - 1) { i = n - 1; p = 0; }

      if (i !== current) {
        slides.forEach((sl, k) => {
          sl.classList.toggle("is-active", k === i);
          sl.classList.remove("is-entering");
          sl.setAttribute("aria-hidden", k === i ? "false" : "true");
          resetSlide(sl);
        });
        current = i;
        target = null;
      }

      const from = slides[i];
      const next = p > 0.001 ? slides[i + 1] || null : null;
      if (next !== target) {
        if (target) {
          target.classList.remove("is-entering");
          target.setAttribute("aria-hidden", "true");
          resetSlide(target);
        }
        target = next;
        if (target) {
          target.classList.add("is-entering");
          target.removeAttribute("aria-hidden");
        }
      }

      if (reduce) {
        if (target) {
          el(target, ".lps-card").style.opacity = String(p);
          el(target, ".lps-bg").style.opacity = String(p);
        }
        return;
      }

      // 1. current card turns away to the left
      const o = easeOut(clamp(p / 0.55));
      el(from, ".lps-card").style.transform = `translateX(${-30 * o}%) rotateY(${70 * o}deg)`;
      el(from, ".lps-card").style.opacity = String(1 - o);
      el(from, ".lps-bg").style.transform = `translateX(${-12 * easeInOut(clamp((p - 0.15) / 0.75))}%)`;
      if (!target) return;
      // 2. next photo wipes in from the right
      const w = (1 - easeInOut(clamp((p - 0.12) / 0.78))) * 100;
      el(target, ".lps-bg").style.clipPath = `inset(0 0 0 ${w}%)`;
      // 3. next card turns in from the right
      const c = easeOut(clamp((p - 0.42) / 0.58));
      const r = 1 - c;
      el(target, ".lps-card").style.transform = `translateX(${40 * r}%) rotateY(${-75 * r}deg)`;
      el(target, ".lps-card").style.opacity = String(c);
    };

    const tick = () => {
      const d = goal - shown;
      shown = Math.abs(d) < 0.0005 ? goal : shown + d * 0.18;
      draw(shown);
      raf = shown === goal ? null : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      readScroll();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    readScroll();
    shown = goal;
    draw(shown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const N = posters.length;
  const trackH = `calc(100svh + ${(N - 1) * 100}svh)`;
  const sectionStyle = {
    "--lps-bg": "#211d19",
    "--lps-card": "#faf9f5",
    "--lps-ink": "#000000",
    "--lps-card-h": "74%",
    "--lps-dim": 0.22,
    "--lps-track": trackH,
    height: trackH,
  } as React.CSSProperties;

  return (
    <section ref={root} className="lps" style={sectionStyle} aria-roledescription="carousel">
      <div className="lps-stage">
        {posters.map((p, idx) => (
          <div
            key={p.img}
            className={`lps-slide${idx === 0 ? " is-active" : ""}`}
            data-index={idx}
            role="group"
            aria-roledescription="slide"
            aria-hidden={idx !== 0}
          >
            <div className="lps-bg">
              <img src={p.img} alt="" className="lps-bg-img" loading={idx === 0 ? "eager" : "lazy"} />
              <span className="lps-bg-dim" aria-hidden="true" />
            </div>
            <div className="lps-card-wrap">
              <article className="lps-card">
                <div className="lps-card-media">
                  <img src={p.img} alt={p.title} className="lps-card-img" loading="lazy" />
                </div>
                <h2 className="lps-heading">
                  {p.title.split(" ").map((line, li) => (
                    <span key={li}>{line}</span>
                  ))}
                </h2>
                <div className="lps-foot">
                  <dl className="lps-details">
                    {p.meta.map((m) => (
                      <div key={m.label} className="lps-row">
                        <dt>{m.label}</dt>
                        <dd>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="lps-icons" aria-hidden="true">
                    <StoneIcons />
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
