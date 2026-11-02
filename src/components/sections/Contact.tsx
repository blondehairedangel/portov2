import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mailto, profile, sectionNumber } from "@/data/profile";

export function Contact() {
  const { headline, supporting, cta } = profile.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-y border-t border-border"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="contact-heading"
            number={sectionNumber("contact")}
            label="Contact"
            headline={headline}
          >
            <p className="mt-6 max-w-[34rem] text-lead">{supporting}</p>
            <div className="mt-9">
              <Button href={mailto}>{cta}</Button>
            </div>
          </SectionHeading>
        </Reveal>

        <Reveal>
          <dl className="border-t border-border">
            <div className="grid-layout gap-y-2 border-b border-border py-6">
              <dt className="label col-span-4 pt-1.5 text-fg-muted md:col-span-3">Email</dt>
              <dd className="col-span-4 flex flex-wrap items-center gap-x-4 md:col-span-5 lg:col-span-9">
                <a
                  href={mailto}
                  className="link-draw text-heading font-medium [overflow-wrap:anywhere]"
                >
                  {profile.email}
                </a>
                <CopyEmail email={profile.email} />
              </dd>
            </div>
            <div className="grid-layout gap-y-2 border-b border-border py-6">
              <dt className="label col-span-4 pt-0.5 text-fg-muted md:col-span-3">Location</dt>
              <dd className="col-span-4 md:col-span-5 lg:col-span-9">{profile.location.label}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
