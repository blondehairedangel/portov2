/**
 * Single source for personal information and page copy.
 * Copy is taken from the brief and CONTENT.md. Do not add claims here that
 * Neil has not supplied.
 */

export type Headline = {
  /** Set in Geist Sans. */
  text: string;
  /** Optional word set in the serif italic. Rendered after `text`. */
  emphasis?: string;
};

export const profile = {
  name: "Neil Stanley",
  url: "https://neil-stanley.com",
  email: "hello@neils.cc",
  location: {
    label: "North Jakarta, Indonesia",
    short: "North Jakarta, ID",
    locality: "North Jakarta",
    country: "ID",
  },
  positioning: ["Information Systems Student", "IT Support", "Technology Enthusiast"],
  currentRole: { title: "L1 IT Support", organization: "PT DEWAWEB" },
  study: { programme: "Information Systems", institution: "BINUS University" },

  hero: {
    headline: { text: "Learning. Building.", emphasis: "Troubleshooting." } satisfies Headline,
    supporting:
      "Exploring technology, solving problems, and building meaningful digital experiences.",
    intro:
      "Information Systems Student at BINUS University. Currently working as L1 IT Support at PT DEWAWEB.",
  },

  about: {
    headline: { text: "A little about", emphasis: "me." } satisfies Headline,
    paragraphs: [
      "I'm Neil Stanley, an Information Systems student at BINUS University with a strong interest in technology, IT infrastructure, software, and digital experiences.",
      "Currently working as an L1 IT Support professional at PT DEWAWEB, I work in technical support and troubleshooting while continuously expanding my understanding of systems, infrastructure, and web technologies.",
      "Beyond technical work, I also explore UI/UX design, digital content creation, and software development.",
      "I enjoy learning how technology works, solving practical problems, and turning ideas into useful solutions.",
    ],
    now: [
      { label: "Studying", value: "Information Systems, BINUS University", meta: "2023 – 2027" },
      { label: "Working", value: "L1 IT Support, PT DEWAWEB", meta: "Since Feb 2026" },
      {
        label: "Exploring",
        value: "UI/UX design, digital content creation, software development",
        meta: null,
      },
    ],
  },

  contact: {
    headline: { text: "Let's", emphasis: "Connect." } satisfies Headline,
    supporting:
      "I'm always interested in new opportunities, collaborations, and creative projects. Feel free to reach out!",
    cta: "Get in Touch",
  },

  seo: {
    title: "Neil Stanley — Information Systems Student & IT Support",
    description:
      "The personal portfolio of Neil Stanley, an Information Systems student at BINUS University and L1 IT Support professional at PT DEWAWEB. Explore his experience, skills, and projects.",
  },
} as const;

export const mailto = `mailto:${profile.email}`;

export type NavItem = {
  label: string;
  href: string;
  /** External links open in a new tab. */
  external?: boolean;
};

/**
 * Header, mobile menu, and footer navigation. The homepage sections (About,
 * Experience, Skills, Work, Education, Contact) stay on the page and are
 * reached by scrolling or the hero's section index.
 */
export const navigation: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "neils.cc", href: "https://neils.cc", external: true },
  { label: "Blog", href: "https://pintutidakterkunci.com", external: true },
];

/** Homepage sections, in order. Used for the hero index and section numbering. */
export const homeSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export function sectionNumber(id: HomeSectionId): string {
  const index = homeSections.findIndex((s) => s.id === id);
  return String(index + 1).padStart(2, "0");
}
