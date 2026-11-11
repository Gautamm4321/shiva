export interface Poster {
  img: string;
  title: string;
  meta: { label: string; value: string }[];
}

export const posters: Poster[] = [
  {
    img: "/flip-1.jpeg",
    title: "Quarry Bath",
    meta: [
      { label: "Stone", value: "Travertine" },
      { label: "Finish", value: "Tumbled" },
      { label: "Origin", value: "Denizli, Turkey" },
      { label: "Use", value: "Wet rooms & spa" },
    ],
  },
  {
    img: "/flip-2.jpeg",
    title: "Rosso Kitchen",
    meta: [
      { label: "Stone", value: "Rosso Levanto" },
      { label: "Finish", value: "Polished" },
      { label: "Origin", value: "Liguria, Italy" },
      { label: "Use", value: "Island & worktops" },
    ],
  },
  {
    img: "/flip-3.webp",
    title: "Desert House",
    meta: [
      { label: "Stone", value: "Local fieldstone" },
      { label: "Finish", value: "Natural cleft" },
      { label: "Origin", value: "Quarried on site" },
      { label: "Use", value: "Façade & courtyard" },
    ],
  },
  {
    img: "/flip-4.jpeg",
    title: "Honed Bath",
    meta: [
      { label: "Stone", value: "Jaisalmer Limestone" },
      { label: "Finish", value: "Honed" },
      { label: "Origin", value: "Rajasthan, India" },
      { label: "Use", value: "Vanity & walls" },
    ],
  },
  {
    img: "/flip-5.jpeg",
    title: "Sculpture Hall",
    meta: [
      { label: "Stone", value: "Statuario Marble" },
      { label: "Finish", value: "Hand-carved" },
      { label: "Origin", value: "Carrara, Italy" },
      { label: "Use", value: "Sculpture & lobby" },
    ],
  },
  {
    img: "/flip-7.jpeg",
    title: "Terrace Villa",
    meta: [
      { label: "Stone", value: "Dry-stone granite" },
      { label: "Finish", value: "Split-face" },
      { label: "Origin", value: "Rajasthan, India" },
      { label: "Use", value: "Walls & landscape" },
    ],
  },
];
