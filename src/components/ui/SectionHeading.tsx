import type { Headline } from "@/data/profile";

/** Headline text with an optional serif-italic closing word. */
export function HeadlineText({ headline }: { headline: Headline }) {
  return (
    <>
      {headline.text}
      {headline.emphasis && (
        <>
          {" "}
          <span className="serif-accent">{headline.emphasis}</span>
        </>
      )}
    </>
  );
}

type SectionHeadingProps = {
  /** Two-digit section number, e.g. "01". */
  number: string;
  label: string;
  headline: Headline;
  /** Id for the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  /** Optional content under the headline (supporting copy). */
  children?: React.ReactNode;
};

/**
 * Section opener. The mono label sits in the left "index column" and the
 * headline starts at column 4, so every section shares the same vertical line.
 */
export function SectionHeading({ number, label, headline, id, children }: SectionHeadingProps) {
  return (
    <div className="grid-layout mb-[var(--block-gap)]">
      <p className="label col-span-4 mb-6 text-fg-muted md:col-span-8 lg:col-span-3 lg:mb-0 lg:pt-[0.9em]">
        <span aria-hidden>{number} — </span>
        {label}
      </p>
      <div className="col-span-4 md:col-span-8 lg:col-span-9">
        <h2 id={id} className="text-display-l font-medium">
          <HeadlineText headline={headline} />
        </h2>
        {children}
      </div>
    </div>
  );
}
