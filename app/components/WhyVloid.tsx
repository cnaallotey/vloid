"use client";

import { useEffect, useState } from "react";
import { m, useSpring, useTransform } from "framer-motion";
import { Bot, FileCheck2, Lock, PhoneOff } from "lucide-react";
import { WordReveal } from "./motion";
import { Eyebrow } from "./primitives";

const MIN_PER_CALL = 6;

function AnimatedNumber({ value, className = "" }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 140, damping: 24 });
  const text = useTransform(spring, (v) => Math.round(v).toLocaleString("en-US"));
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <m.span className={className}>{text}</m.span>;
}

const TRUST = [
  { icon: Bot, t: "Says it’s an AI, every call" },
  { icon: PhoneOff, t: "Honours do-not-call flags" },
  { icon: FileCheck2, t: "Records consent" },
  { icon: Lock, t: "Your list stays yours" },
];

export function WhyVloid() {
  const [calls, setCalls] = useState(1000);
  const hours = (calls * MIN_PER_CALL) / 60;
  const days = hours / 8;
  const pct = ((calls - 100) / (5000 - 100)) * 100;

  return (
    <section id="why" className="p-2 sm:p-3">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-ink px-5 py-24 text-white sm:rounded-[30px] sm:px-10 sm:py-32">
        <div className="dots-dark pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-ember/20 blur-[120px]" aria-hidden />

        <div className="mx-auto max-w-[1180px]">
          <Eyebrow tone="dark">Why Vloid</Eyebrow>
          <WordReveal
            from={0.2}
            accentClass="text-ember-soft"
            className="mt-8 max-w-[24ch] text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.04em]"
            text="Built for the calls that never make the to-do list. Vloid is *polite,* *persistent* and on time — it works the whole list so your people can take the conversations that need a person."
          />

          <div className="mt-20 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <h3 className="text-[22px] font-medium tracking-[-0.02em]">What is the list costing you?</h3>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-white/60">
                Drag to your monthly call volume. We assume about {MIN_PER_CALL} minutes per manual call — dialing,
                waiting, retries and logging the answer.
              </p>
              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="calls" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                    Calls per month
                  </label>
                  <span className="text-[20px] font-medium tracking-[-0.02em]">{calls.toLocaleString("en-US")}</span>
                </div>
                <input
                  id="calls"
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={calls}
                  onChange={(e) => setCalls(Number(e.target.value))}
                  className="range mt-3"
                  style={{ "--pct": `${pct}%` } as React.CSSProperties}
                />
                <div className="mt-1 flex justify-between font-mono text-[10.5px] text-white/35">
                  <span>100</span>
                  <span>5,000</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6" aria-live="polite">
              <div>
                <p className="text-[clamp(3.25rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.06em]">
                  <AnimatedNumber value={hours} className="text-ember-gradient" />
                  <span className="text-[0.45em] tracking-[-0.02em] text-white/50">h</span>
                </p>
                <p className="mt-3 text-[15px] font-medium">Hours back, every month</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/50">Time your team spends dialing today.</p>
              </div>
              <div>
                <p className="text-[clamp(3.25rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.06em]">
                  <AnimatedNumber value={days} />
                </p>
                <p className="mt-3 text-[15px] font-medium">Working days returned</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/50">Eight-hour days, back on real work.</p>
              </div>
              <div>
                <p className="text-[clamp(3.25rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.06em]">0</p>
                <p className="mt-3 text-[15px] font-medium">People dialing</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/50">Vloid works the list. You read the answers.</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">Responsible by default</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST.map((t) => (
                <li
                  key={t.t}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-[14.5px]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-ember-soft">
                    <t.icon className="h-[18px] w-[18px]" />
                  </span>
                  {t.t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
