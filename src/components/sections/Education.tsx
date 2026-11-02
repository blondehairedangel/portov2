import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { sectionNumber } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-y border-t border-border"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="education-heading"
            number={sectionNumber("education")}
            label="Education"
            headline={{ text: "Where I", emphasis: "study." }}
          />
        </Reveal>

        <Reveal>
          <ol className="border-t border-border">
            {education.map((item) => (
              <li key={item.institution} className="border-b border-border">
                <div className="grid-layout gap-y-2 py-[var(--row-y)]">
                  <p className="label col-span-4 pt-1.5 text-fg-muted md:col-span-3">{item.period}</p>
                  <div className="col-span-4 md:col-span-5 lg:col-span-9">
                    <h3
                      className={cn(
                        item.primary
                          ? "text-display-l font-medium"
                          : "text-body font-medium text-fg-muted",
                      )}
                    >
                      {item.institution}
                    </h3>
                    <p className={cn(item.primary ? "mt-3 text-lead" : "text-fg-muted")}>
                      {item.programme}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
