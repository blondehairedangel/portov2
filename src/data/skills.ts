/**
 * Skills regrouped from the brief into four disciplines plus a toolkit.
 * No proficiency levels, years, or certifications by design.
 */

export type Discipline = {
  name: string;
  skills: string[];
};

export const disciplines: Discipline[] = [
  {
    name: "Design & Content",
    skills: [
      "UI/UX Design",
      "Visual Design",
      "Infographic Design",
      "Photo Editing",
      "Video Editing",
      "Content Creation",
      "Copywriting",
      "Social Media Management",
      "Content Strategy",
    ],
  },
  {
    name: "IT & Infrastructure",
    skills: [
      "POS Systems Implementation, Usage & Maintenance",
      "Windows / Linux / macOS System Configuration",
      "Software Installation & Maintenance",
      "Technical Maintenance",
      "Network Configuration",
      "Private Network",
      "Firewall",
      "VPN",
    ],
  },
  {
    name: "Development",
    skills: ["Java", "SQL", "HTML", "CSS", "MySQL"],
  },
  {
    name: "Professional",
    skills: [
      "Information Systems",
      "Problem Solving",
      "Technical Documentation",
      "Project Management",
      "Public Speaking",
      "Critical Thinking",
      "Creative Thinking",
    ],
  },
];

export const toolkit: { group: string; tools: string[] }[] = [
  {
    group: "Design & Prototyping",
    tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Canva"],
  },
  { group: "Development", tools: ["Visual Studio Code", "Eclipse IDE"] },
  {
    group: "Productivity",
    tools: ["Microsoft Office Suite", "Google Workspace", "Slack", "Trello", "Notion"],
  },
];
