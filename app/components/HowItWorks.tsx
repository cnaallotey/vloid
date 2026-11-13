import { Check, FileSpreadsheet, PhoneCall } from "lucide-react";
import { Reveal } from "./motion";
import { Accent, Eyebrow, Tag } from "./primitives";

/* Server component: four static cards, no client JS beyond the reveal. */

const shell =
  "w-full max-w-[268px] rounded-2xl border border-line bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.03),0_18px_36px_-22px_rgba(0,0,0,0.28)]";
const label = "font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted";

function MockBrief() {
  return (
    <div className={shell}>
      <p className={label}>New campaign</p>
      <div className="mt-2.5 space-y-1.5">
        <div className="rounded-lg border border-line bg-paper/60 px-2.5 py-1.5">
          <p className={label}>Reason</p>
          <p className="text-[12px]">Subscription ends in 5 days</p>
        </div>
        <div className="rounded-lg border border-line bg-paper/60 px-2.5 py-1.5">
          <p className={label}>Ask</p>
          <p className="text-[12px]">Shall we renew it today?</p>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        <Tag tone="good">Renewed</Tag>
        <Tag tone="warn">Call back</Tag>
      </div>
    </div>
  );
}

function MockUpload() {
  return (
    <div className={shell}>
      <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-ember/50 bg-ember/[0.05] px-2.5 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-ember-deep shadow-sm">
          <FileSpreadsheet className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-[12px] font-medium">customers.csv</span>
          <span className="block font-mono text-[10px] text-muted">500 contacts</span>
        </span>
        <Check className="ml-auto h-4 w-4 text-signal-ink" strokeWidth={2.5} />
      </div>
      <div className="mt-2 divide-y divide-line">
        {[
          ["Ama Owusu", "+233 24 ••• 1182"],
          ["Kojo Boateng", "+233 20 ••• 4410"],
          ["Efua Mensah", "+233 55 ••• 9031"],
        ].map(([n, p]) => (
          <div key={n} className="flex items-center justify-between py-1.5 text-[11.5px]">
            <span>{n}</span>
            <span className="font-mono text-[10px] text-muted">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockCalling() {
  const bars = [6, 11, 16, 10, 14, 8, 12, 7];
  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <p className={label}>Live campaign</p>
        <span className="font-mono text-[10px] text-muted">340 / 500</span>
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-xl border border-ember/30 bg-ember/[0.06] px-2.5 py-2">
        <span className="flex items-center gap-2 text-[12px] font-medium">
          <PhoneCall className="h-3.5 w-3.5 text-ember-deep" /> Ama Owusu
        </span>
        <span className="flex items-center gap-[2px]" aria-hidden>
          {bars.map((h, i) => (
            <span key={i} className="w-[2px] rounded-full bg-ember" style={{ height: h }} />
          ))}
        </span>
      </div>
      <div className="mt-1.5 space-y-1.5">
        <div className="flex items-center justify-between rounded-xl border border-line px-2.5 py-1.5 text-[11.5px]">
          <span>Kojo Boateng</span>
          <span className="font-mono text-[10px] text-muted">Retry 2pm</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-line px-2.5 py-1.5 text-[11.5px]">
          <span className="text-muted">Efua Mensah</span>
          <span className="font-mono text-[10px] text-faint">Queued</span>
        </div>
      </div>
    </div>
  );
}

function MockResults() {
  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <p className={label}>Results</p>
        <span className="rounded-md bg-ink px-1.5 py-0.5 font-mono text-[9.5px] text-white">Export</span>
      </div>
      <div className="mt-2 divide-y divide-line">
        {(
          [
            ["Ama Owusu", "Renewal confirmed", "good"],
            ["Kojo Boateng", "Needs follow-up", "warn"],
            ["Efua Mensah", "Resolved · 9/10", "good"],
          ] as const
        ).map(([n, t, tone]) => (
          <div key={n} className="flex items-center justify-between gap-2 py-2">
            <span className="truncate text-[11.5px]">{n}</span>
            <Tag tone={tone}>{t}</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    mock: MockBrief,
    title: "Define the campaign",
    desc: "Write the reason for calling and what a good outcome looks like — in plain language.",
  },
  {
    mock: MockUpload,
    title: "Upload your list",
    desc: "Bring the spreadsheet you already have. Do-not-call flags are respected.",
  },
  {
    mock: MockCalling,
    title: "Vloid makes the calls",
    desc: "Voice agents work the whole list in the hours you choose, and retry anyone they miss.",
  },
  {
    mock: MockResults,
    title: "Review the answers",
    desc: "Every call lands as a structured result you can filter, read and export.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-5 pb-24 sm:px-8 sm:pb-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[860px] text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.3rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Up and running in <Accent className="text-ember">four steps.</Accent>
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-muted">
            From the spreadsheet you already have to structured answers — without anyone picking up a phone.
          </p>
        </div>

        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="h-full rounded-[24px] border border-line bg-card p-2">
                <div className="checker grid h-[250px] place-items-center rounded-[18px] border border-line px-4">
                  <s.mock />
                </div>
                <div className="px-3 pb-4 pt-5">
                  <span className="inline-grid h-7 min-w-7 place-items-center rounded-full bg-ink px-2 font-mono text-[11px] text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-[19px] font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
