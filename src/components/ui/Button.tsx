import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** "primary": inverted pill. "text": underlined link with an arrow. */
  variant?: "primary" | "text";
  className?: string;
};

const styles = {
  primary:
    "inline-flex h-12 items-center justify-center rounded-full bg-fg px-7 text-small font-medium text-bg transition-opacity duration-200 hover:opacity-80",
  text: "group/btn inline-flex h-12 items-center gap-2 text-small font-medium text-fg",
} as const;

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const classes = cn(styles[variant], className);
  const content =
    variant === "text" ? (
      <>
        <span className="link-draw py-1">{children}</span>
        <ArrowRight
          aria-hidden
          strokeWidth={1.5}
          className="size-4 transition-transform duration-300 ease-soft group-hover/btn:translate-x-1"
        />
      </>
    ) : (
      children
    );

  // Internal routes use next/link; mailto: and #anchors are plain anchors.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
