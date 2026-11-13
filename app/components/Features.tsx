"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { CircleCheck, Ear, MessageCircleQuestion, Target } from "lucide-react";
import { EASE, Pausable, Reveal } from "./motion";
import { Accent, Eyebrow, Tag, Waveform } from "./primitives";

function inView(delay: number, reduce: boolean | null) {
  return {
    initial: reduce ? false : ({ opacity: 0, y: 14 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

/* ── Visual A: the brief, as a flow ─────────────────────── */
function BriefFlow() {
  const reduce = useReducedMotion();
  const nodes = [
    { icon: Target, k: "Reason", v: "Subscription ends in 5 days" },
    { icon: MessageCircleQuestion, k: "Ask", v: "Would you like us to renew it today?" },
    { icon: Ear, k: "Listen for", v: "Yes · No · Call me later" },
    { icon: CircleCheck, k: "Outcome", v: "Tag the result and log a note" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      {nodes.map((n, i) => (
        <div key={n.k} className="flex w-full max-w-[380px] flex-col items-center">
          {i > 0 && (
            <m.span
              {...inView(i * 0.14 - 0.06, reduce)}
              className="h-3.5 w-px border-l border-dashed border-ember/70"
            />
          )}
          <m.div
            {...inView(i * 0.14, reduce)}
            className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[0_1px_0_rgba(0,0,0,0.03),0_10px_24px_-14px_rgba(0,0,0,0.2)]"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ember/10 text-ember-deep">
              <n.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{n.k}</span>
              <span className="block truncate text-[13.5px] text-ink">{n.v}</span>
            </span>
          </m.div>
        </div>
      ))}
    </div>
  );
}

/* ── Visual B: a polite transcript ──────────────────────── */
function Transcript() {
  const reduce = useReducedMotion();
  const lines = [
    { who: "agent", t: "Hi Kojo — this is an automated assistant calling for Zola Telecom." },
    { who: "you", t: "Oh, okay. Yes?" },
    { who: "agent", t: "Your plan ends Friday. Shall we renew it for you?" },
    { who: "you", t: "Yes please, same plan." },
  ];
  return (
    <Pausable className="flex h-full flex-col justify-center gap-2 px-5">
      <div className="mb-1 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          <span className="live-dot" /> Live · 00:42
        </span>
        <Waveform bars={[8, 14, 20, 12, 18, 10, 16]} />
      </div>
      {lines.map((l, i) => (
        <m.div
          key={i}
          {...inView(0.15 + i * 0.35, reduce)}
          className={`max-w-[84%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
            l.who === "agent"
              ? "self-start rounded-bl-md border border-line bg-white text-ink"
              : "self-end rounded-br-md bg-ink text-white"
          }`}
        >
          {l.t}
        </m.div>
      ))}
      <m.div {...inView(1.7, reduce)} className="mt-1 self-start">
        <Tag tone="good">Renewal confirmed</Tag>
      </m.div>
    </Pausable>
  );
}

/* ── Visual C: campaign pulse ───────────────────────────── */
function Pulse() {
  const reduce = useReducedMotion();
  const r = 54;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-5">
      <div className="relative grid place-items-center">
        <svg width="148" height="148" viewBox="0 0 148 148" className="-rotate-90" aria-hidden>
          <circle cx="74" cy="74" r={r} fill="none" stroke="rgba(14,13,11,0.08)" strokeWidth="10" />
          <m.circle
            cx="74"
            cy="74"
            r={r}
            fill="none"
            stroke="var(--color-ember)"
            strokeWidth="10"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 0.68 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
            style={reduce ? { pathLength: 0.68 } : undefined}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-[34px] font-medium leading-none tracking-[-0.04em]">68%</p>
          <p className="mt-1 font-mono text-[10.5px] text-muted">340 / 500</p>
        </div>
      </div>
      <div className="grid w-full max-w-[300px] grid-cols-3 divide-x divide-line rounded-xl border border-line bg-white py-2.5 text-center">
        {[
          ["Reached", "412"],
          ["Resolved", "286"],
          ["Follow-up", "54"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[17px] font-medium tracking-[-0.02em]">{v}</p>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Visual D: filterable results (interactive) ─────────── */
type Tone = "good" | "warn";
const RESULTS: { name: string; tag: string; score: string; tone: Tone }[] = [
  { name: "Ama Owusu", tag: "Resolved", score: "9/10", tone: "good" },
  { name: "Bright Kojo", tag: "Needs follow-up", score: "—", tone: "warn" },
  { name: "Zola Ventures", tag: "Renewal confirmed", score: "8/10", tone: "good" },
  { name: "Nana Adjei", tag: "Callback booked", score: "—", tone: "warn" },
  { name: "Farida Musah", tag: "Resolved", score: "10/10", tone: "good" },
];
const FILTERS = [
  { id: "all", label: "All" },
  { id: "good", label: "Resolved" },
  { id: "warn", label: "Follow-up" },
] as const;

function Results() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const rows = RESULTS.filter((r) => filter === "all" || r.tone === filter);
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-[520px] rounded-2xl border border-line bg-white p-2 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">Results</span>
          <div role="group" aria-label="Filter results" className="flex gap-1 rounded-lg bg-paper p-0.5">
            {FILTERS.map((f) => {
              const count = f.id === "all" ? RESULTS.length : RESULTS.filter((r) => r.tone === f.id).length;
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors duration-300 ${
                    on ? "bg-ink text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  {f.label} <span className={on ? "text-white/60" : "text-faint"}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-[208px] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {rows.map((r) => (
              <m.div
                key={r.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-center justify-between gap-3 border-t border-line px-2 py-2"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper font-mono text-[10px] text-muted">
                    {r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="truncate text-[13.5px] font-medium">{r.name}</span>
                </span>
                <span className="flex items-center gap-3">
                  <Tag tone={r.tone}>{r.tag}</Tag>
                  <span className="hidden w-10 text-right font-mono text-[12px] text-muted sm:block">{r.score}</span>
                </span>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Card({
  className = "",
  visual,
  title,
  desc,
  delay = 0,
}: {
  className?: string;
  visual: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={`rounded-[24px] border border-line bg-card p-2 ${className}`}>
      <div className="checker relative h-[300px] overflow-hidden rounded-[18px] border border-line">{visual}</div>
      <div className="px-4 pb-4 pt-5">
        <h3 className="text-[19px] font-medium tracking-[-0.02em]">{title}</h3>
        <p className="mt-1.5 max-w-[48ch] text-[14.5px] leading-relaxed text-muted">{desc}</p>
      </div>
    </Reveal>
  );
}

export function Features() {
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow>What Vloid does</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.3rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              You define the call.
              <br />
              Vloid <Accent className="text-ember">makes it.</Accent>
            </h2>
          </div>
          <p className="max-w-[46ch] text-[16.5px] leading-relaxed text-muted lg:justify-self-end">
            Vloid dispatches AI voice agents to make the calls for you. You set the reason for calling and what to
            listen for — it works the list, has the conversation, and hands back structured, filterable results.
          </p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-5">
          <Card
            className="md:col-span-3"
            visual={<BriefFlow />}
            title="Write the brief, not the script"
            desc="Tell Vloid why you’re calling and what a good outcome sounds like. It handles the back-and-forth."
          />
          <Card
            className="md:col-span-2"
            delay={0.08}
            visual={<Transcript />}
            title="Upfront and polite, every call"
            desc="Each call opens by saying it’s an automated assistant calling for you — then gets to the point."
          />
          <Card
            className="md:col-span-2"
            visual={<Pulse />}
            title="Watch the list move"
            desc="See who’s been reached, who picked up and what’s left — live, while the campaign runs."
          />
          <Card
            className="md:col-span-3"
            delay={0.08}
            visual={<Results />}
            title="Answers you can filter"
            desc="Resolved, needs follow-up, satisfaction score, notes — structured the moment each call ends. Try the filters."
          />
        </div>
      </div>
    </section>
  );
}
