"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, AudioLines, Clock3, FileSpreadsheet } from "lucide-react";
import { ACTIVE } from "./copy";
import { useEmail } from "./email-context";
import Image from "next/image";
import { Waveform3D } from "./Waveform3D";
import { useInViewport } from "./motion";

const BRIEFS = [
  "Call everyone whose subscription ends this week and ask if they’d like to renew.",
  "Check in with last month’s support tickets — was the fix actually good for them?",
  "Confirm each refund landed, and note anyone who still has concerns.",
  "Remind customers with overdue balances and agree a payment date.",
];

/* Types out each campaign brief, holds, deletes, moves on. */
function Typewriter({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || !active) return;
    const full = BRIEFS[idx];
    let t: number;
    if (!deleting && len < full.length) {
      t = window.setTimeout(() => setLen(len + 1), 26 + Math.random() * 30);
    } else if (!deleting) {
      t = window.setTimeout(() => setDeleting(true), 2600);
    } else if (len > 0) {
      t = window.setTimeout(() => setLen(len - 1), 11);
    } else {
      t = window.setTimeout(() => {
        setDeleting(false);
        setIdx((idx + 1) % BRIEFS.length);
      }, 350);
    }
    return () => window.clearTimeout(t);
  }, [len, deleting, idx, active, reduce]);

  const text = reduce ? BRIEFS[0] : BRIEFS[idx].slice(0, len);
  return (
    <p className="mt-3 min-h-[3.1em] text-[16px] leading-[1.5] text-white/90 sm:text-[17.5px]">
      <span className="sr-only">Example campaign brief: {BRIEFS[0]}</span>
      <span aria-hidden>
        {text}
        <span className="caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-ember" />
      </span>
    </p>
  );
}

export function Hero({ image }: { image: string | null }) {
  const { email, setEmail, goToForm } = useEmail();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewport(ref);

  let wordIndex = 0;

  return (
    <section id="top" className="p-2 sm:p-3">
      <div
        ref={ref}
        data-paused={visible ? undefined : ""}
        className={`sky grain relative isolate flex flex-col overflow-hidden rounded-[22px] text-white sm:rounded-[30px] min-h-[max(100svh,820px)] lg:min-h-[max(100svh,900px)]`}
      >
        {/* 3D waveform by default; a dropped-in hero image replaces it. */}
        {!image && <Waveform3D shape="valley" peak={0.5} className="-z-10 h-[80%]" />}
        {image && (
          <>
            {/* Illustration slot — see image-prompts.md. Top third stays dark for the headline. */}
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={80}
              className="-z-20 object-cover object-bottom"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,6,26,0.82)_0%,rgba(5,6,26,0.5)_38%,rgba(5,6,26,0)_68%)]"
            />
          </>
        )}

        <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 pb-16 pt-32 text-center sm:pt-40">
          <a
            href="https://clientra.tech"
            target="_blank"
            rel="noreferrer"
            className="hero-in inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <span className="live-dot" />
            Early access · part of the Clientra suite
          </a>

          <h1 className="mt-7 max-w-[15ch] text-[clamp(2.75rem,7.4vw,6.4rem)] font-medium leading-[0.96] tracking-[-0.045em] sm:max-w-none">
            {ACTIVE.lines.map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((word, wi) => {
                  const i = wordIndex++;
                  const accent = word.replace(/[^\w-]/g, "") === ACTIVE.accent;
                  return (
                    <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                      <span
                        className={`word-rise inline-block ${
                          accent ? "text-ember-gradient" : ""
                        }`}
                        style={{ "--d": `${80 + i * 55}ms` } as React.CSSProperties}
                      >
                        {word}
                      </span>
                      {wi < line.split(" ").length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="hero-in mt-6 max-w-[54ch] text-pretty text-[16px] leading-relaxed text-white/68 sm:text-[18px]"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            {ACTIVE.subhead}
          </p>

          {/* Campaign composer — the product, as the hero's call to action */}
          <div className="hero-in mt-10 w-full max-w-[660px]" style={{ "--d": "560ms" } as React.CSSProperties}>
            <div className="rounded-[22px] border border-white/12 bg-[#0c0f30] p-1.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)]">
              <div className="rounded-[17px] border border-white/[0.06] bg-white/[0.03] p-4 text-left sm:p-5">
                <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
                  <span>New campaign · brief</span>
                  <span className="hidden items-center gap-1.5 sm:inline-flex">
                    <AudioLines className="h-3.5 w-3.5 text-ember" /> Voice agent ready
                  </span>
                </div>
                <Typewriter active={visible} />
                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px] text-white/60">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1">
                    <FileSpreadsheet className="h-3.5 w-3.5 text-white/50" /> customers.csv · 500
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1">
                    <AudioLines className="h-3.5 w-3.5 text-white/50" /> Warm · en-GH
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1">
                    <Clock3 className="h-3.5 w-3.5 text-white/50" /> Weekdays 9–5
                  </span>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  goToForm();
                }}
                className="mt-1.5 flex flex-col gap-1.5 sm:flex-row"
              >
                <label htmlFor="hero-email" className="sr-only">Work email</label>
                <input
                  id="hero-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-12 min-w-0 flex-1 rounded-[15px] border border-transparent bg-white/[0.06] px-4 text-[16px] text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-ember/60 focus:bg-white/[0.09] sm:text-[15px]"
                />
                <button
                  type="submit"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-[15px] bg-ember px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-ember-soft"
                >
                  {ACTIVE.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                </button>
              </form>
            </div>
            <p className="mt-3 text-[12.5px] text-white/50">
              No spam. Two quick questions and you’re on the list.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
