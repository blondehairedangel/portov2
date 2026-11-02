"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies an email address to the clipboard and confirms politely for screen readers. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context): the mailto link still works.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="label inline-flex h-11 items-center gap-2 px-1 text-fg-muted transition-colors duration-200 hover:text-fg"
      >
        {copied ? (
          <Check aria-hidden className="size-3.5" strokeWidth={1.75} />
        ) : (
          <Copy aria-hidden className="size-3.5" strokeWidth={1.5} />
        )}
        {copied ? "Copied" : "Copy"}
        <span className="sr-only"> email address</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
