"use client";

import { useState } from "react";

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "Why are the prices for marble and granite different even though they are the same material?",
    a: [
      "Due to the patterns, shades, and types of natural stones, each material has unique patterns. The beauty and diversity of the stones lead to different prices. We serve you with the best quality of material to ensure that we can fulfill your satisfaction and preference, and complement your taste.",
    ],
  },
  {
    q: "How to calculate the area in square meter?",
    a: [
      "You are required to measure the length and width in meters. Then, multiply these two measurements together. The result will give you the total area in square meter (sq.m.)",
      "Formula: Width (m) x Length (m) = square meter",
      "For example, a kitchen table top of 2×4 m = 8 sq.m.",
    ],
  },
  {
    q: "Do you offer transportation?",
    a: [
      "We can provide convenient transportation services to ensure your products reach you wherever you are. For inquiries about our transportation services and detailed conditions, please feel free to contact our dedicated Customer Service team at our LINE official account. We will provide you with the necessary information.",
    ],
  },
  {
    q: "What are the opening dates?",
    a: [
      "We are open and ready to assist you six days a week.",
      "Monday – Saturday : 08:30 – 17:30",
      "Although we close on Sunday, if you have any inquiry or question we highly recommend you contact us via the LINE application and our staff will reply to you as soon as possible.",
      "Thank you for your understanding — we look forward to helping you find the best material for your needs.",
    ],
  },
];

const display = {
  fontFamily: '"Archivo", sans-serif',
  fontStretch: "82%",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#000",
} as React.CSSProperties;

export default function FaqPage() {
  const [open, setOpen] = useState(-1);

  return (
    <main className="w-full overflow-hidden text-black">
      <section className="mx-auto w-[min(880px,92vw)] pt-[128px] pb-24 sm:pt-[150px] sm:pb-32">
        <header className="mb-12 text-center sm:mb-16">
          <h1 className="whitespace-nowrap text-[clamp(1.5rem,5.4vw,3.4rem)]" style={display}>
            Frequently Asked Questions
          </h1>
        </header>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-[14px] bg-white/60 transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                >
                  <span
                    className="text-[clamp(1rem,1.8vw,1.22rem)] font-semibold tracking-[-0.01em] text-black"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {f.q}
                  </span>
                  <span className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[1.6px] w-4 -translate-y-1/2 bg-black" />
                    <span
                      className={`absolute left-1/2 top-0 h-4 w-[1.6px] -translate-x-1/2 bg-black transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                    />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="space-y-3 px-6 pb-6 sm:px-8 sm:pb-7">
                    {f.a.map((p, j) => (
                      <p
                        key={j}
                        className="max-w-[62ch] text-[0.98rem] leading-[1.7] text-black"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
