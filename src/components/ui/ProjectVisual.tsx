import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectPlaceholder } from "./ProjectPlaceholder";

type ProjectVisualProps = {
  project: Project;
  /** Aspect-ratio / sizing classes, e.g. "aspect-[4/3]". */
  className?: string;
  /** Eager-load (only for images above the fold). */
  priority?: boolean;
};

/**
 * Renders the project's real image when `project.image` is set (AVIF with a
 * WebP fallback, explicit dimensions), otherwise the SVG placeholder. The
 * parent needs the Tailwind `group` class for the hover scale.
 */
export function ProjectVisual({ project, className, priority = false }: ProjectVisualProps) {
  const { image } = project;

  return (
    <div className={cn("overflow-hidden bg-bg-subtle", className)}>
      <div className="size-full transition-transform duration-[600ms] ease-soft group-hover:scale-[1.03] motion-reduce:transform-none">
        {image ? (
          <picture>
            <source srcSet={`${image.src}.avif`} type="image/avif" />
            <source srcSet={`${image.src}.webp`} type="image/webp" />
            {/* Static export without an image server: pre-sized AVIF/WebP via <picture>. */}
            <img
              src={`${image.src}.webp`}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover"
            />
          </picture>
        ) : (
          <ProjectPlaceholder tint={project.tint} label={`${project.name} interface placeholder`} />
        )}
      </div>
    </div>
  );
}
