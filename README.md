# ShivaStone

A premium marble, granite & quartzite website — Next.js (App Router) with a
real-time 3D rotating slab and procedurally generated stone textures.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — dark-luxe design system
- **Framer Motion** — restrained scroll reveals
- **React Three Fiber + drei + three** — the hero's rotating polished slab

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx          Fonts, nav, footer, metadata
  page.tsx            Home (3D hero + featured stone & project)
  materials/page.tsx  Editorial collection
  projects/page.tsx   Selected work
  about/page.tsx      Story + process
  contact/page.tsx    Enquiry form
components/
  HeroSlab.tsx        Lazy, in-view loader for the 3D scene
  SlabScene.tsx       R3F canvas, lighting, environment
  MarbleSlab.tsx      The rotating slab mesh + material
  marbleCanvas.ts     Procedural marble texture (canvas)
  StoneTexture.tsx    Procedural SVG veining for 2D stone panels
  Navbar / Footer / Reveal / MaterialPlate / ContactForm
lib/
  materials.ts        Stone collection data
  projects.ts         Project data
```

## Notes

- **3D performance** — the 3D scene is code-split and only mounts when the hero
  is on screen. It respects `prefers-reduced-motion` (no auto-rotate / float).
- **Textures are generated, not photographed.** Swap in real slab photography by
  replacing `StoneTexture` usages with `next/image`, and the hero material map in
  `marbleCanvas.ts` with a real texture, when you have it.
- **Contact form** currently simulates a send. Wire `handleSubmit` in
  `components/ContactForm.tsx` to your email service or an API route.
- Replace placeholder contact details (address, phone, email) with the real ones.
