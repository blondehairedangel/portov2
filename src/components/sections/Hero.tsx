import { homeSections, mailto, profile, sectionNumber } from "@/data/profile";
import { Button } from "@/components/ui/Button";

/** Sets the CSS animation stagger step (see .enter-rise in globals.css). */
const step = (n: number) => ({ "--enter-step": n }) as React.CSSProperties;

export function Hero() {
  const { headline, supporting, intro } = profile.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-var(--header-h))] flex-col"
    >
      <div className="container-page flex flex-1 flex-col">
        {/* Metadata strip */}
        <div
          className="enter-fade label flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-border py-4 text-fg-muted"
          style={step(0)}
        >
          <span>{profile.name} — Portfolio</span>
          <span>{profile.location.short}</span>
          <span className="hidden md:inline">Information Systems · IT Support</span>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-14 py-10 md:gap-20 md:py-16">
          <h1 id="hero-heading" className="text-display-xl font-medium">
            <span className="enter-rise block" style={step(1)}>
              {headline.text}
            </span>
            <span className="enter-rise block" style={step(2)}>
              <span className="serif-accent">{headline.emphasis}</span>
            </span>
          </h1>

          <div className="grid-layout">
            <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-7">
              <p className="enter-rise text-lead" style={step(4)}>
                {intro}
              </p>
              <p className="enter-rise mt-5 max-w-[34rem] text-fg-muted" style={step(5)}>
                {supporting}
              </p>
              <div
                className="enter-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
                style={step(6)}
              >
                <Button href={mailto}>Get in Touch</Button>
                <Button href="#work" variant="text">
                  Explore My Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section index: functional anchors that double as a table of contents */}
      <nav
        aria-label="Sections"
        className="enter-fade border-t border-border"
        style={step(8)}
      >
        <ul className="container-page grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {homeSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group/index flex items-baseline gap-3 py-4 text-small text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                <span className="label">{sectionNumber(section.id)}</span>
                <span className="link-draw">{section.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
