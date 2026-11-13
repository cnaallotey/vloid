"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ACTIVE, NAV_LINKS } from "./copy";
import { Logo } from "./primitives";

/**
 * Starts as a wide transparent bar over the hero, then condenses into a
 * compact floating pill once the page scrolls.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`relative w-full rounded-2xl transition-[max-width,background-color,box-shadow] duration-700 ease-[var(--ease-expo)] ${
          compact
            ? "max-w-[720px] bg-[#0e0d0b]/88 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-md"
            : "max-w-[1280px] bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 pl-4 pr-2">
          <a href="#top" aria-label="Vloid home" className="shrink-0 rounded-lg">
            <Logo tone="light" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-[13.5px] text-white/70 transition-colors duration-300 hover:bg-white/[0.07] hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href="#waitlist"
              className="group hidden h-10 items-center gap-1.5 rounded-xl bg-ember pl-4 pr-3 text-[13.5px] font-medium text-ink transition-colors duration-300 hover:bg-ember-soft sm:inline-flex"
            >
              {ACTIVE.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl text-white md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 rounded bg-current transition-transform duration-500 ease-[var(--ease-expo)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-5 rounded bg-current transition-transform duration-500 ease-[var(--ease-expo)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`accordion-panel md:hidden`}
          data-open={open}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-0.5 border-t border-white/10 p-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="rounded-lg px-3 py-3 text-[15px] text-white/80 hover:bg-white/[0.06]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="mt-1 rounded-xl bg-ember py-3 text-center text-[15px] font-medium text-ink"
              >
                {ACTIVE.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
