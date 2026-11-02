/**
 * Professional experience, in the order supplied (current role first).
 * Dates use "YYYY-MM". Descriptions are verbatim from the brief except the
 * softened lines recorded in CONTENT.md (Cardrive, Mandiri Motor).
 */

export type Experience = {
  slug: string;
  organization: string;
  role: string;
  location: string;
  start: string;
  end: string | "present";
  summary: string[];
  expertise: string[];
};

export const experience: Experience[] = [
  {
    slug: "dewaweb",
    organization: "PT DEWAWEB",
    role: "L1 IT Support",
    location: "Indonesia",
    start: "2026-02",
    end: "present",
    summary: [
      "Currently working as an L1 IT Support professional, assisting customers with technical issues involving web hosting, domains, DNS, email services, websites, and hosting environments.",
      "Handling troubleshooting, initial diagnosis, customer communication, and technical escalation while developing practical experience in hosting infrastructure and web technologies.",
    ],
    expertise: [
      "Technical Support",
      "Web Hosting",
      "cPanel",
      "DNS Management",
      "Email Troubleshooting",
      "Website Troubleshooting",
      "Customer Support",
      "Technical Documentation",
    ],
  },
  {
    slug: "bncc",
    organization: "Bina Nusantara Computer Club (BNCC)",
    role: "Student",
    location: "Jakarta, Indonesia",
    start: "2024-09",
    end: "2025-06",
    summary: [
      "Retired member of the BNCC community, participating in UI/UX class design activities and developing foundational design knowledge.",
    ],
    expertise: [],
  },
  {
    slug: "cardrive",
    organization: "Cardrive Indonesia",
    role: "Social Media Manager",
    location: "Jakarta, Indonesia",
    start: "2022-05",
    end: "present",
    summary: [
      "Managed social media content and supported audience engagement.",
      "Managed public relations through social media to support brand awareness and recognition.",
    ],
    expertise: ["Content Strategy", "Community Engagement", "Brand Development"],
  },
  {
    slug: "mandiri-motor",
    organization: "MANDIRI MOTOR",
    role: "Technical Specialist",
    location: "Jakarta, Indonesia",
    start: "2022-04",
    end: "present",
    summary: [
      "Contributed to the implementation and maintenance of POS systems. Maintained IT-related processes within the company.",
      "Ensuring smooth business operations through technical support, system implementation, and system optimization.",
    ],
    expertise: ["POS Implementation", "IT Management", "Technical Support"],
  },
  {
    slug: "nailnotpros",
    organization: "nailnotpros",
    role: "Self-Employed",
    location: "DKI Jakarta",
    start: "2021-08",
    end: "present",
    summary: [
      "Providing remote creative services including video editing, photo editing, infographic creation, copywriting, and UI/UX design for various clients.",
    ],
    expertise: ["Video Editing", "Photo Editing", "UI/UX Design", "Copywriting"],
  },
];
