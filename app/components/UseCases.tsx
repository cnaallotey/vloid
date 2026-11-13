"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ACTIVE } from "./copy";
import { EASE, Pausable, useInViewport } from "./motion";
import { Eyebrow, LogoMark, Waveform } from "./primitives";

const CASES = [
  {
    title: "Feedback collection",
    brand: "Kora Pay support",
    quote: "Was the solution we gave you last week actually good for you?",
    reply: "It was — the app works fine now, thank you.",
    outcome: "Resolved · 9/10",
    desc: "Close the loop on every support ticket and find out what actually worked — without your team dialing each customer.",
    bg: "bg-[radial-gradient(120%_90%_at_20%_0%,#ffb08f_0%,#ff5420_45%,#7a1d05_100%)]",
  },
  {
    title: "Renewal reminders",
    brand: "Zola Telecom",
    quote: "Your subscription expires in 5 days — want us to renew it?",
    reply: "Yes please, same plan as before.",
    outcome: "Renewal confirmed",
    desc: "Reach every customer before their plan lapses, and capture renewals, callbacks and objections as they happen.",
    bg: "bg-[radial-gradient(120%_90%_at_80%_0%,#8f97ff_0%,#2a2f8f_45%,#0a0c27_100%)]",
  },
  {
    title: "Dispute follow-ups",
    brand: "Meridian Insurance",
    quote: "Confirming your refund went through — any remaining concerns?",
    reply: "It came in yesterday. All good.",
    outcome: "Refund verified",
    desc: "Confirm resolutions landed, catch the ones that didn’t, and give every dispute a clean, recorded ending.",
    bg: "bg-[radial-gradient(120%_90%_at_20%_100%,#7ee2a8_0%,#16794a_45%,#05261a_100%)]",
  },
  {
    title: "Your own campaign",
    brand: "Your company",
    quote: "Anything you’d ask on a call — you write the reason, Vloid makes it.",
    reply: "Sure, happy to help with that.",
    outcome: "Custom outcome",
    desc: "Payment reminders, appointment confirmations, onboarding check-ins — if it’s a list and a question, Vloid can call it.",
    bg: "bg-[radial-gradient(120%_90%_at_50%_0%,#5f5b54_0%,#262420_50%,#0e0d0b_100%)]",
  },
];

const ROTATE_S = 6;

export function UseCases() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewport(ref);
  const c = CASES[active];

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const paused = hover || !visible;

  return (
    <section id="use-cases" className="px-5 pb-24 sm:px-8 sm:pb-36">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Visual: the call itself */}
        <div
          id="use-case-panel"
          role="tabpanel"
          aria-label={c.title}
          className="relative isolate min-h-[480px] overflow-hidden rounded-[28px] lg:min-h-[600px]"
        >
          <AnimatePresence initial={false}>
            <m.div
              key={active}
              className={`absolute inset-0 -z-10 ${c.bg}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </AnimatePresence>
          <div className="grain absolute inset-0 -z-10" />

          <div className="flex h-full min-h-[inherit] items-center justify-center p-5 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 24, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="w-full max-w-[430px] rounded-[24px] bg-card p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] sm:p-6"
              >
                <Pausable className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <LogoMark className="h-9 w-9" />
                    <span>
                      <span className="block text-[13.5px] font-medium">Vloid</span>
                      <span className="block font-mono text-[10.5px] text-muted">for {c.brand}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
                    <Waveform bars={[7, 13, 18, 10, 15, 8]} /> 00:18
                  </span>
                </Pausable>
                <p className="mt-7 text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-[1.15] tracking-[-0.035em] text-ink">
                  “{c.quote}”
                </p>
                <div className="mt-6 flex justify-end">
                  <span className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[14px] text-white">
                    {c.reply}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-signal/12 px-2 py-1 font-mono text-[11px] text-signal-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {c.outcome}
                  </span>
                  <span className="font-mono text-[10.5px] text-muted">Logged to results</span>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white">
            <span className="text-ember-soft">+</span> {c.title}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex flex-col">
          <Eyebrow className="self-start">Use cases</Eyebrow>
          <div role="tablist" aria-label="Use cases" className="mt-8 flex flex-col items-start gap-1">
            {CASES.map((u, i) => {
              const on = i === active;
              return (
                <button
                  key={u.title}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="use-case-panel"
                  onClick={() => setActive(i)}
                  className={`group relative pb-2 text-left text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.04em] transition-colors duration-500 ${
                    on ? "text-ink" : "text-faint hover:text-muted"
                  }`}
                >
                  {u.title}
                  {on && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-full bg-ink/[0.07]">
                      <span
                        key={active}
                        className="progress-bar block h-full bg-ember"
                        style={
                          {
                            "--t": `${ROTATE_S}s`,
                            animationPlayState: paused ? "paused" : "running",
                          } as React.CSSProperties
                        }
                        onAnimationEnd={() => {
                          if (!reduce) setActive((a) => (a + 1) % CASES.length);
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-12">
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="max-w-[44ch] text-[16px] leading-relaxed text-muted"
              >
                {c.desc}
              </m.p>
            </AnimatePresence>
            <a
              href="#waitlist"
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-ink/85"
            >
              {ACTIVE.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
