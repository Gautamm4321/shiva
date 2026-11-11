"use client";

import { useState, type CSSProperties } from "react";
import { stones } from "@/lib/stones";

/**
 * Stone categories laid out as a staircase (reference: SALT "what we do").
 * Each step sits one grid-column further right than the one before.
 * Pressing "+" opens that stone's details directly beneath it.
 */

const SPAN = 3; // each bar is 3 columns wide
const COLS = stones.length + SPAN - 1; // last bar still fits
const pad = (n: number) => String(n).padStart(2, "0");
const gridCols: CSSProperties = {
  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
};

export default function StoneStairs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        {/* heading */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="label">Our Stones</p>
            <h2
              className="mt-2 text-[clamp(1.65rem,2.8vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-black"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              What we work in
            </h2>
          </div>
          <p className="label hidden sm:block">01 — {pad(stones.length)}</p>
        </div>

        <div className="relative">
          {/* faint column grid (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden md:grid"
            style={gridCols}
          >
            {Array.from({ length: COLS }).map((_, c) => (
              <div key={c} className="border-l border-black/[0.06]" />
            ))}
          </div>

          <ol className="relative space-y-1.5 py-2">
            {stones.map((s, i) => {
              const isOpen = open === i;
              const indent = { "--i": i } as CSSProperties;
              return (
                <li key={s.slug} style={indent}>
                  {/* the step bar */}
                  <div className="md:grid" style={gridCols}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`stone-${i}`}
                      style={{ gridColumn: `${i + 1} / span ${SPAN}` }}
                      className={`group ml-[calc(var(--i)*3%)] flex min-h-[44px] w-[calc(100%-var(--i)*3%)] items-center justify-between gap-3 border-l-2 px-4 text-left transition-colors duration-200 md:ml-0 md:h-[44px] md:w-auto ${
                        isOpen
                          ? "border-black bg-black/[0.07]"
                          : "border-transparent bg-black/[0.04] hover:bg-black/[0.07]"
                      }`}
                    >
                      <span className="flex min-w-0 items-baseline gap-3">
                        <span className="label" style={{ fontSize: "11px" }}>
                          {pad(i + 1)}
                        </span>
                        <span
                          className="truncate text-sm font-semibold tracking-[-0.01em] text-black"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {s.name}
                        </span>
                      </span>
                      <span aria-hidden className="font-mono text-base leading-none text-black">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </div>

                  {/* details */}
                  <div className="md:grid" style={gridCols}>
                    <div
                      id={`stone-${i}`}
                      role="region"
                      aria-label={s.name}
                      style={{
                        gridColumn: `${i + 1} / -1`,
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                      className={`ml-[calc(var(--i)*3%)] grid transition-[grid-template-rows,opacity] duration-500 ease-out md:ml-0 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pb-8 pt-5 md:pl-4 md:pr-10">
                          <h3
                            className="max-w-[22ch] text-[clamp(1.25rem,1.9vw,1.7rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-black"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {s.pitch}
                          </h3>
                          <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-black">
                            {s.detail}
                          </p>

                          <div className="mt-5 max-w-[620px]">
                            <p className="label">Characteristics</p>
                            <ul className="mt-2 grid sm:grid-cols-2 sm:gap-x-10">
                              {s.properties.map((p, k) => (
                                <li
                                  key={p}
                                  className="flex items-baseline gap-3 py-1.5 text-[15px] text-black"
                                >
                                  <span className="label" style={{ fontSize: "10.5px" }}>
                                    {pad(k + 1)}
                                  </span>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <p className="mt-5 max-w-[58ch] font-mono text-[13.5px] leading-[1.6] text-black">
                            Result — {s.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
