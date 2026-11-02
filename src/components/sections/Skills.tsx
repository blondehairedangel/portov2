import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionNumber } from "@/data/profile";
import { disciplines, toolkit } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-y border-t border-border">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="skills-heading"
            number={sectionNumber("skills")}
            label="Skills"
            headline={{ text: "Skills &", emphasis: "expertise." }}
          />
        </Reveal>

        <Reveal>
          <div className="discipline-grid grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline, index) => (
              <div key={discipline.name} className="discipline transition-opacity duration-300">
                <p className="label text-fg-muted">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-heading font-medium">{discipline.name}</h3>
                <ul className="mt-6 border-t border-border">
                  {discipline.skills.map((skill) => (
                    <li key={skill} className="border-b border-border py-2.5 text-small">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-[var(--block-gap)]">
          <h3 className="label mb-4 text-fg-muted">Toolkit</h3>
          <dl className="border-t border-border">
            {toolkit.map((group) => (
              <div
                key={group.group}
                className="grid-layout gap-y-2 border-b border-border py-5"
              >
                <dt className="label col-span-4 pt-1 text-fg-muted md:col-span-3">{group.group}</dt>
                <dd className="col-span-4 md:col-span-5 lg:col-span-9">
                  <ul className="flex flex-wrap text-small">
                    {group.tools.map((tool) => (
                      <li
                        key={tool}
                        className="after:mx-2.5 after:text-fg-muted after:content-['·'] last:after:content-none"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
