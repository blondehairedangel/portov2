/**
 * Selected work.
 *
 * To add real assets later:
 *   1. Export screenshots as AVIF + WebP into /public/projects/<slug>/
 *   2. Set `image` below (src without extension, plus intrinsic width/height).
 *   3. Set `url` to the live site or prototype link.
 * While `image` is null an SVG placeholder is drawn; while `url` is null no
 * link is rendered.
 */

export type ProjectTint = "stone" | "sage" | "concrete" | "slate";

export type Project = {
  slug: string;
  name: string;
  description: string;
  categories: string[];
  tools: string[];
  url: string | null;
  image: {
    /** Path without extension, e.g. "/projects/artevo/cover". Needs .avif and .webp. */
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  tint: ProjectTint;
};

export const projects: Project[] = [
  {
    slug: "artevo",
    name: "Artevo App",
    description: "An application that makes searching for and purchasing paintings easier.",
    categories: ["UI Design", "UX Design"],
    tools: ["Figma"],
    url: null, // TODO(content): project URL not yet supplied
    image: null, // TODO(content): screenshots not yet supplied
    tint: "stone",
  },
  {
    slug: "fojo",
    name: "FoJo App",
    description: "An application that allows users to discover and find job opportunities.",
    categories: ["UI Design", "UX Design"],
    tools: ["Figma"],
    url: null, // TODO(content): project URL not yet supplied
    image: null, // TODO(content): screenshots not yet supplied
    tint: "sage",
  },
  {
    slug: "toolhub",
    name: "ToolHub App",
    description: "An application that allows users to rent heavy industrial machinery.",
    categories: ["UI Design", "UX Design"],
    tools: ["Figma"],
    url: null, // TODO(content): project URL not yet supplied
    image: null, // TODO(content): screenshots not yet supplied
    tint: "concrete",
  },
  {
    slug: "lockspot",
    name: "LockSpot App",
    description: "An application that allows users to rent storage boxes for their belongings.",
    categories: ["UI Design", "UX Design"],
    tools: ["Figma"],
    url: null, // TODO(content): project URL not yet supplied
    image: null, // TODO(content): screenshots not yet supplied
    tint: "slate",
  },
];

export const projectsCopy = {
  headline: { text: "Selected", emphasis: "Work." },
  supporting:
    "A collection of projects I've built that showcase my technical skills and creative thinking.",
} as const;
