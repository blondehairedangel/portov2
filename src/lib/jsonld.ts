import { profile } from "@/data/profile";

/** schema.org Person. Only facts from profile.ts; no social profiles. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.url,
  email: profile.email,
  jobTitle: profile.currentRole.title,
  worksFor: { "@type": "Organization", name: profile.currentRole.organization },
  affiliation: { "@type": "CollegeOrUniversity", name: profile.study.institution },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.locality,
    addressCountry: profile.location.country,
  },
};

/** Serialise for an inline <script>; "<" is escaped so content can't close the tag. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
