"use client";

import { useEffect, useRef } from "react";

type Slab = { name: string; type: string; img: string; depth: number };

const SLABS: Slab[] = [
  { name: "Calacatta Gold", type: "Marble", img: "/sig/sig1.jpg", depth: 60 },
  { name: "Azul Bahia", type: "Granite", img: "/sig/sig4.jpg", depth: -40 },
  { name: "Rainforest Green", type: "Marble", img: "/sig/sig3.jpg", depth: 30 },
  { name: "Black Galaxy", type: "Granite", img: "/sig/sig5.jpg", depth: -30 },
  { name: "Portoro Gold", type: "Marble", img: "/sig/sig2.jpg", depth: 50 },
  { name: "Paradiso Classico", type: "Granite", img: "/sig/sig6.jpg", depth: -50 },
];

export default function SignatureCollection() {
  const deckRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const deck = deckRef.current;
    if (!stage || !deck) return;

    let raf = 0;
    let tx = 0, ty = 0; // target
    let cx = 0, cy = 0; // current (eased)

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;  // -0.5..0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx;
      ty = ny;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      deck.style.transform =
        `rotateX(${(-cy * 9).toFixed(2)}deg) rotateY(${(cx * 11).toFixed(2)}deg)`;
      // parallax drift for glare direction
      deck.style.setProperty("--px", (cx * 100).toFixed(1));
      deck.style.setProperty("--py", (cy * 100).toFixed(1));
      raf = requestAnimationFrame(tick);
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="sig">
      <div className="sig-inner">
        <header className="sig-head">
          <span className="label sig-eyebrow">Signature Selection</span>
          <h2 className="sig-title">
            <span>Marble</span>
            <span className="sig-amp">&amp;</span>
            <span>Granite</span>
          </h2>
          <p className="sig-sub">
            A curated edit of our rarest slabs — hand-picked blocks, book-matched and
            finished to order.
          </p>
        </header>

        <div className="sig-stage" ref={stageRef}>
          <div className="sig-deck" ref={deckRef}>
            {SLABS.map((s, i) => (
              <article
                key={s.img}
                className={`sig-card sig-card-${i + 1}`}
                style={{ ["--d" as string]: `${s.depth}px` }}
                tabIndex={0}
              >
                <div className="sig-media">
                  <img src={s.img} alt={`${s.name} ${s.type}`} loading="lazy" draggable={false} />
                  <span className="sig-sheen" aria-hidden />
                  <span className="sig-edge" aria-hidden />
                </div>
                <div className="sig-meta">
                  <span className="sig-type">{s.type}</span>
                  <span className="sig-name">{s.name}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
