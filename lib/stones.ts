export interface Stone {
  slug: string;
  name: string;
  family: string;
  pitch: string;
  detail: string;
  properties: string[];
  result: string;
}

export const stones: Stone[] = [
  {
    slug: "artificial-stones",
    name: "Artificial Stones",
    family: "Engineered",
    pitch: "All the drama of stone, engineered to behave.",
    detail:
      "Quartz-and-resin composites deliver consistent colour, near-zero porosity and a surface that shrugs off stains and scratches — made for spaces where nature's variation isn't wanted.",
    properties: ["Non-porous", "Stain & scratch resistant", "Uniform colour", "Low maintenance"],
    result: "Predictable, hard-wearing surfaces for kitchens and high-traffic spaces.",
  },
  {
    slug: "granite",
    name: "Granite",
    family: "Igneous",
    pitch: "The workhorse that outlives the room around it.",
    detail:
      "An igneous stone of quartz and feldspar — dense, heat-proof and almost impossible to scratch. Granite is the surface you install once and forget about.",
    properties: ["Heat & scratch resistant", "Extremely durable", "Wide colour range", "Sealable finish"],
    result: "Worktops, flooring and façades built to take decades of use.",
  },
  {
    slug: "marble",
    name: "Marble",
    family: "Metamorphic",
    pitch: "Light doesn't bounce off marble. It sinks in.",
    detail:
      "Metamorphosed limestone, prized for its translucency and flowing veins. Softer and more characterful than granite — the material of galleries, lobbies and quiet luxury.",
    properties: ["Luminous veining", "Takes a mirror polish", "Cool to the touch", "Ages gracefully"],
    result: "Floors, walls and statement surfaces with unmistakable presence.",
  },
  {
    slug: "limestone",
    name: "Limestone",
    family: "Sedimentary",
    pitch: "Quiet, warm, and quietly everywhere.",
    detail:
      "A sedimentary stone with a soft, even grain and gentle earth tones. Limestone brings calm, tactile warmth to floors, cladding and bathrooms.",
    properties: ["Soft, even texture", "Warm neutral tones", "Honed or tumbled", "Interior & façade"],
    result: "Understated flooring and cladding with a natural, grounded feel.",
  },
  {
    slug: "quartzite",
    name: "Quartzite",
    family: "Metamorphic",
    pitch: "Marble's looks. Granite's nerve.",
    detail:
      "A natural metamorphic quartzite — as luminous as marble but harder than granite. The rare stone that gives you drama without the upkeep.",
    properties: ["Harder than granite", "Marble-like veining", "Heat resistant", "Low porosity"],
    result: "Showpiece worktops and walls that stand up to real use.",
  },
  {
    slug: "sandstone",
    name: "Sandstone",
    family: "Sedimentary",
    pitch: "The stone that reads like the earth it came from.",
    detail:
      "Compressed quartz grains in warm bands of ochre, rose and grey. Naturally slip-resistant, sandstone is made for courtyards, façades and paving.",
    properties: ["Naturally textured", "Slip resistant", "Warm earth tones", "Outdoor-ready"],
    result: "Paving, cladding and landscaping with natural grip and character.",
  },
  {
    slug: "onyx-marble",
    name: "Onyx Marble",
    family: "Translucent",
    pitch: "Stone you light from behind.",
    detail:
      "A translucent banded calcite — dramatic and rare. Backlit, onyx glows, turning a reception desk or feature wall into the centrepiece of a room.",
    properties: ["Translucent — backlightable", "Bold banding", "Bookmatchable", "Statement use"],
    result: "Backlit walls, bars and features that stop people mid-step.",
  },
  {
    slug: "landscape",
    name: "Landscape",
    family: "Picture Stone",
    pitch: "A painting that took a million years to dry.",
    detail:
      "Natural 'picture' stone whose veining reads like dunes, mountains and horizons. Bookmatched, its panels become abstract landscapes across a wall.",
    properties: ["Scenic natural veining", "Bookmatched panels", "One-of-a-kind", "Feature walls"],
    result: "Framed, bookmatched wall art cut straight from the block.",
  },
  {
    slug: "travertine",
    name: "Travertine",
    family: "Sedimentary",
    pitch: "Rome built with it. It's still standing.",
    detail:
      "A sedimentary stone formed at hot springs, full of soft pits and warm ivory tones. Filled and honed or left natural, travertine is timeless indoors and out.",
    properties: ["Warm ivory tones", "Filled or natural", "Indoor & outdoor", "Classic character"],
    result: "Flooring, cladding and pool surrounds with old-world warmth.",
  },
  {
    slug: "slate",
    name: "Slate",
    family: "Metamorphic",
    pitch: "Matte, grippy and quietly architectural.",
    detail:
      "A fine-grained metamorphic stone that splits into flat, textured sheets. Slate's natural cleft surface and deep tones suit floors, roofing and feature walls.",
    properties: ["Natural cleft texture", "Slip resistant", "Deep matte tones", "Interior & exterior"],
    result: "Floors, walls and roofing with a rugged, tactile finish.",
  },
];
