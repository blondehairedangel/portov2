import type { Metadata } from "next";
import { profile } from "@/data/profile";

type PageMeta = {
  /** Omit on the homepage to use the full default title. */
  title?: string;
  description?: string;
  /** Route path with leading and trailing slash, e.g. "/about/". */
  path: string;
};

/** Per-page metadata: title, description, canonical URL, Open Graph, Twitter. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const resolvedTitle = title ?? profile.seo.title;
  const resolvedDescription = description ?? profile.seo.description;
  const canonical = new URL(path, profile.url).toString();
  const socialTitle = title ? `${title} — ${profile.name}` : profile.seo.title;

  return {
    title: title ? title : { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: profile.name,
      title: socialTitle,
      description: resolvedDescription,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: resolvedDescription,
    },
  };
}
