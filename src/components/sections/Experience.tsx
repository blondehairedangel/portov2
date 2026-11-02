import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { sectionNumber } from "@/data/profile";
import { formatPeriod } from "@/lib/utils";

/** Homepage preview: one ledger row per role. Full details live on /experience/. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-y border-t border-border"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="experience-heading"
            number={sectionNumber("experience")}
            label="Experience"
            headline={{ text: "Where I've", emphasis: "worked." }}
          />
        </Reveal>

        <Reveal>
          <ol className="border-t border-border">
            {experience.map((item) => (
              <li key={item.slug} className="group relative border-b border-border">
                <div className="grid-layout gap-y-2 py-[var(--row-y)]">
                  <p className="label col-span-4 pt-1.5 text-fg-muted transition-colors duration-200 group-hover:text-fg md:col-span-3">
                    {formatPeriod(item.start, item.end)}
                  </p>
                  <div className="col-span-4 md:col-span-3 lg:col-span-6">
                    <h3 className="text-lead font-medium">{item.organization}</h3>
                    <p className="mt-1 text-fg-muted transition-colors duration-200 group-hover:text-fg">
                      {item.role}
                    </p>
                  </div>
                  <p className="col-span-4 text-small text-fg-muted transition-colors duration-200 group-hover:text-fg md:col-span-2 lg:col-span-3 lg:pt-1.5">
                    {item.location}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-[width] duration-300 ease-soft group-hover:w-16"
                />
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
