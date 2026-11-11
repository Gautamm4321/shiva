"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/" },
  { label: "Projects", href: "/" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ===== full-screen overlay menu ===== */}
      <div
        className={`fixed inset-0 z-40 bg-[#f3f1ec] transition-opacity duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 pt-[72px] sm:px-10 lg:px-16">
          <ul className="space-y-0 sm:space-y-1">
            {navLinks.map((l, i) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 py-1 sm:gap-9"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    opacity: open ? 1 : 0,
                    transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${
                      0.12 + i * 0.07
                    }s, opacity 0.55s ease ${0.12 + i * 0.07}s`,
                  }}
                >
                  <span
                    className="w-6 shrink-0 text-[11px] tracking-[0.12em] text-black sm:w-10 sm:text-[13px]"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-[clamp(2.6rem,8.4vw,5.6rem)] leading-[1.04] tracking-[-0.02em] text-black transition-transform duration-300 ease-out group-hover:translate-x-2 sm:group-hover:translate-x-3"
                    style={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800 }}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ===== top bar (stays above the overlay) ===== */}
      <header className="absolute left-0 right-0 top-0 z-50 w-full">
        <div className="relative mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* left — hamburger / close */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="z-10 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
          >
            <span className={`h-[1.5px] w-6 bg-black transition-all duration-300 ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] w-6 bg-black transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[1.5px] w-6 bg-black transition-all duration-300 ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
          </button>

          {/* center — logo */}
          <a
            href="/"
            aria-label="Shiva Granite — home"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2"
          >
            <svg className="h-[13px] w-[15px] sm:h-[15px] sm:w-[18px]" viewBox="0 0 18 15" fill="none" aria-hidden="true">
              <path d="M1 14 L6 3 L9 8.5 L11.5 4.5 L17 14 Z" stroke="black" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
            </svg>
            <span
              className="whitespace-nowrap text-[12px] font-semibold tracking-[0.12em] text-black sm:text-lg sm:tracking-[0.3em]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              SHIVA <span className="font-light">GRANITE</span>
            </span>
          </a>

          {/* right — contact (WhatsApp) */}
          <a
            href="https://wa.me/66929976355"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 whitespace-nowrap rounded-md bg-white/30 px-3 py-1.5 text-[11px] tracking-wide text-black backdrop-blur-sm transition-colors duration-300 hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-sm"
          >
            Contact&nbsp;Us
          </a>
        </div>
      </header>
    </>
  );
}
