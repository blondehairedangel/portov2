import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionNumber } from "@/data/profile";
import { projects, projectsCopy } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Asymmetric 12-column arrangement: visual sizes alternate (7/5, then 5/7) and
 * the second project is offset downwards, so the section never reads as a grid
 * of identical cards. On mobile every project uses the same 4:3 frame.
 */
const layouts = [
  { item: "lg:col-span-7", visual: "aspect-[4/3]" },
  { item: "lg:col-span-5 lg:col-start-8 lg:mt-28", visual: "aspect-[4/3] lg:aspect-[4/5]" },
  { item: "lg:col-span-5", visual: "aspect-[4/3] lg:aspect-[4/5]" },
  { item: "lg:col-span-7 lg:col-start-6 lg:mt-28", visual: "aspect-[4/3]" },
] as const;

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-y border-t border-border">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="work-heading"
            number={sectionNumber("work")}
            label="Work"
            headline={projectsCopy.headline}
          >
            <p className="mt-6 max-w-[34rem] text-lead text-fg-muted">{projectsCopy.supporting}</p>
          </SectionHeading>
        </Reveal>

        <ul className="grid-layout gap-y-16 lg:gap-y-20">
          {projects.map((project, index) => {
            const layout = layouts[index] ?? layouts[0];
            return (
              <Reveal
                as="li"
                key={project.slug}
                className={cn("col-span-4 md:col-span-8", layout.item)}
              >
                <article className="group">
                  <ProjectVisual project={project} className={layout.visual} />
                  <div className="mt-5 grid grid-cols-[2.5rem_1fr] border-t border-border pt-4">
                    <span className="label pt-2 text-fg-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-heading font-medium">{project.name}</h3>
                      <p className="mt-2 max-w-[44ch] text-small text-fg-muted">
                        {project.description}
                      </p>
                      <p className="label mt-4 text-fg-muted">
                        {project.categories.join(" · ")} — {project.tools.join(", ")}
                      </p>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 py-2 text-small font-medium"
                        >
                          <span className="link-draw">View Project</span>
                          <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
                          <span className="sr-only">
                            : {project.name} (opens in a new tab)
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
