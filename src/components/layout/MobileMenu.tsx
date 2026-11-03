"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { navigation, mailto, profile } from "@/data/profile";
import { NavLink } from "./NavLink";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen navigation sheet for viewports below 768px. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the sheet.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Trap focus inside the sheet and its toggle button.
      const focusable = [
        trigger,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  // The header's backdrop-filter would make it the containing block for a
  // `position: fixed` child, so the sheet is portalled to <body>.
  const sheet = (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-40 flex flex-col bg-bg pt-[var(--header-h)] md:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto pt-8">
            <ol className="border-t border-border">
              {navigation.map((item, index) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.05 + index * 0.04 }}
                  className="border-b border-border"
                >
                  <NavLink
                    href={item.href}
                    external={item.external}
                    onNavigate={close}
                    className="flex items-baseline gap-4 py-4 text-[2.25rem] leading-none font-medium tracking-[-0.03em] transition-colors"
                  >
                    <span className="label w-6 text-fg-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </NavLink>
                </m.li>
              ))}
            </ol>
          </nav>
          <div className="container-page flex flex-col gap-1 pb-10 pt-8">
            <span className="label text-fg-muted">{profile.location.label}</span>
            <a href={mailto} className="w-fit py-2 text-lead text-fg">
              {profile.email}
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 inline-flex h-11 items-center px-1 text-small text-fg md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>
      {mounted && createPortal(sheet, document.body)}
    </>
  );
}

const noopSubscribe = () => () => {};
