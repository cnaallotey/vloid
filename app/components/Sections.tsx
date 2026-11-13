/* Server-rendered sections: no client JS beyond the islands they import. */
import {
  ArrowRight,
  Coins,
  Landmark,
  LayoutGrid,
  ListX,
  NotebookPen,
  PhoneForwarded,
  RadioTower,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { ACTIVE } from "./copy";
import { Pausable, WordReveal } from "./motion";
import { Accent, Eyebrow, Logo } from "./primitives";
import Image from "next/image";
import { Waveform3D } from "./Waveform3D";

/* ── Sectors band ───────────────────────────────────────── */

const SECTORS = [
  { icon: Landmark, label: "Fintech support" },
  { icon: RadioTower, label: "Telco resellers" },
  { icon: ShieldCheck, label: "Insurance renewals" },
  { icon: LayoutGrid, label: "SaaS customer success" },
  { icon: Coins, label: "Microfinance" },
  { icon: Zap, label: "Utilities" },
  { icon: Truck, label: "Logistics" },
];

export function Sectors() {
  const row = [...SECTORS, ...SECTORS];
  return (
    <section aria-label="Who Vloid is for" className="py-12 sm:py-16">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Built for teams that live on the phone
      </p>
      <Pausable className="mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]">
        <ul className="marquee-track flex w-max gap-14 pr-14">
          {row.map((s, i) => (
            <li
              key={i}
              aria-hidden={i >= SECTORS.length || undefined}
              className="flex shrink-0 items-center gap-2.5 text-[19px] font-medium tracking-[-0.02em] text-ink/40"
            >
              <s.icon className="h-5 w-5" strokeWidth={1.75} />
              {s.label}
            </li>
          ))}
        </ul>
      </Pausable>
    </section>
  );
}

/* ── Problem ────────────────────────────────────────────── */

const PAINS = [
  {
    icon: PhoneForwarded,
    title: "One call at a time",
    desc: "Dial, wait, voicemail, retry. Hours of a skilled person’s day go into reaching people instead of helping them.",
  },
  {
    icon: NotebookPen,
    title: "Answers lost in notes",
    desc: "What customers said lives in a notebook or someone’s memory — not somewhere the team can filter or act on.",
  },
  {
    icon: ListX,
    title: "The list never ends",
    desc: "By the time this week’s renewals are done, next week’s disputes are already waiting in the queue.",
  },
];

export function Problem() {
  return (
    <section className="px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-[1100px] text-center">
        <Eyebrow>The problem</Eyebrow>
        <WordReveal
          className="mx-auto mt-8 max-w-[22ch] text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.04em] text-ink sm:max-w-[28ch]"
          text="Feedback checks. Renewal reminders. Dispute follow-ups. Somebody on your team is working down a list, *one* *call* *at* *a* *time* — and it never gets finished before the next one arrives."
        />
      </div>

      <div className="mx-auto mt-20 max-w-[940px] divide-y divide-line border-y border-line">
        {PAINS.map((p) => (
          <div key={p.title} className="grid gap-3 py-7 sm:grid-cols-[1fr_1.35fr] sm:gap-10">
            <div className="flex items-center gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(180deg,#ff9b73,#ff5420)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                <p.icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <h3 className="text-[18px] font-medium tracking-[-0.02em]">{p.title}</h3>
            </div>
            <p className="text-[15.5px] leading-relaxed text-muted sm:pt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Closing CTA ────────────────────────────────────────── */

export function FinalCTA({ image }: { image: string | null }) {
  return (
    <section className="p-2 sm:p-3">
      <div className="sky grain relative isolate overflow-hidden rounded-[22px] text-white sm:rounded-[30px]">
        {!image && <Waveform3D shape="arch" peak={0.5} className="-z-10 h-[320px] sm:h-[400px]" />}
        {image && (
          <>
            <Image src={image} alt="" fill sizes="100vw" quality={80} className="-z-20 object-cover object-bottom" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,6,26,0.8)_0%,rgba(5,6,26,0.45)_40%,rgba(5,6,26,0)_70%)]"
            />
          </>
        )}
        <div className={`mx-auto max-w-[900px] px-5 pt-24 text-center sm:pt-32 pb-[280px] sm:pb-[360px]`}>
          <Eyebrow tone="dark">Take the next step</Eyebrow>
          <h2 className="mx-auto mt-7 max-w-[16ch] text-balance text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Your list is waiting. Let Vloid make the <Accent className="text-ember-gradient pr-[0.05em]">calls.</Accent>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <a
              href="#waitlist"
              className="group inline-flex h-12 items-center gap-2 rounded-[15px] bg-ember px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-ember-soft"
            >
              {ACTIVE.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="inline-flex h-12 items-center rounded-[15px] border border-white/15 bg-white/[0.04] px-6 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/[0.1]"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────── */

export function Footer() {
  const col = "text-[14px] text-muted transition-colors duration-300 hover:text-ink";
  return (
    <footer className="overflow-hidden px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
              AI voice agents that make your follow-up calls and hand you the answers. Part of the Clientra suite.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">vloid.clientra.tech</p>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 sm:gap-20">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Product</p>
              <ul className="mt-4 space-y-2.5">
                <li><a href="#how" className={col}>How it works</a></li>
                <li><a href="#use-cases" className={col}>Use cases</a></li>
                <li><a href="#why" className={col}>Why Vloid</a></li>
                <li><a href="#faq" className={col}>FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Clientra suite</p>
              <ul className="mt-4 space-y-2.5">
                <li><a href="https://clientra.tech" target="_blank" rel="noreferrer" className={col}>Clientra.tech</a></li>
                <li><a href="https://formdrop.clientra.tech" target="_blank" rel="noreferrer" className={col}>FormDrop</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Legal</p>
              <ul className="mt-4 space-y-2.5">
                <li><a href="#" className={col}>Privacy</a></li>
                <li><a href="#" className={col}>Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Vloid · Clientra.tech</p>
          <a href="#top" className="transition-colors hover:text-ink">Back to top ↑</a>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mx-auto mt-6 max-w-[1400px] select-none bg-[linear-gradient(180deg,rgba(14,13,11,0.92)_10%,rgba(14,13,11,0)_92%)] bg-clip-text text-center text-[29vw] font-semibold leading-[0.74] tracking-[-0.075em] text-transparent [-webkit-background-clip:text] min-[1400px]:text-[400px]"
      >
        vloid
      </div>
    </footer>
  );
}
