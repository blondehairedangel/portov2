import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, sectionNumber } from "@/data/profile";

export function About() {
  const { headline, paragraphs, now } = profile.about;
  const [lead, ...rest] = paragraphs;

  return (
    <section id="about" aria-labelledby="about-heading" className="section-y border-t border-border">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="about-heading"
            number={sectionNumber("about")}
            label="About"
            headline={headline}
          />
        </Reveal>

        <div className="grid-layout gap-y-10">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
            <p className="max-w-[40ch] text-lead">{lead}</p>
            <div className="mt-8 space-y-5 text-fg-muted md:columns-2 md:gap-x-[var(--gutter)] md:space-y-0 md:[&>p]:mb-5 [&>p]:break-inside-avoid">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
            <dl className="border-t border-border">
              {now.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-1 border-b border-border py-4 md:grid-cols-[8rem_1fr_auto]"
                >
                  <dt className="label pt-1 text-fg-muted">{row.label}</dt>
                  <dd className="text-fg">{row.value}</dd>
                  {row.meta && <dd className="label pt-1 text-fg-muted">{row.meta}</dd>}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
