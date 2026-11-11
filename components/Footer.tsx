const WA = "https://wa.me/66929976355";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("1225 Soi Phetkasem 94, Bangkaenua, Bangkae, Bangkok 10160, Thailand");

const social = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shiva.granites/",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.3" />
        <circle cx="16.6" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: WA,
    icon: (
      <>
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />,
  },
  {
    label: "Email",
    href: "mailto:shivagranitemarble@gmail.com",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 7.5l9 6l9 -6" />
      </>
    ),
  },
];

const links = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const inter = { fontFamily: '"Inter", sans-serif' } as React.CSSProperties;

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-transparent text-black">
      <div className="mx-auto w-[min(1280px,92vw)] py-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2">
              <svg className="h-[16px] w-[19px]" viewBox="0 0 18 15" fill="none" aria-hidden="true">
                <path d="M1 14 L6 3 L9 8.5 L11.5 4.5 L17 14 Z" stroke="black" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
              </svg>
              <span
                className="text-lg font-semibold tracking-[0.3em] text-black"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                SHIVA <span className="font-light">GRANITE</span>
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-[1.6] text-black" style={inter}>
              Leading importer, exporter and distributor of natural and artificial stones — sourced,
              processed and supplied from India.
            </p>
            <div className="mt-6 flex items-center gap-7">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-black transition-opacity duration-300 hover:opacity-60"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <h4 className="text-[1.05rem] font-bold uppercase tracking-[0.08em] text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>Contact</h4>
            <ul className="mt-4 space-y-3.5 text-[0.98rem] leading-[1.5] text-black" style={inter}>
              <li>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
                  #1225 Soi Phetkasem 94,<br />
                  Bangkaenua, Bangkae,<br />
                  Bangkok 10160, Thailand
                </a>
              </li>
              <li>
                <a href="tel:+66906530435" className="transition-opacity hover:opacity-60">
                  +66 90 653 0435
                </a>
              </li>
              <li>
                <a href="mailto:shivagranitemarble@gmail.com" className="transition-opacity hover:opacity-60">
                  shivagranitemarble@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* explore */}
          <div>
            <h4 className="text-[1.05rem] font-bold uppercase tracking-[0.08em] text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>Explore</h4>
            <ul className="mt-4 space-y-3 text-[1rem] text-black" style={inter}>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-opacity hover:opacity-60">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-black/10">
        <div className="mx-auto w-[min(1280px,92vw)] py-4">
          <p className="text-center text-[0.82rem] tracking-wide text-black" style={inter}>
            © 2026 All rights reserved. Shiva Granites | Powered by Shiva Granites.
          </p>
        </div>
      </div>
    </footer>
  );
}
