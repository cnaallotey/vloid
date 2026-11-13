"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { ACTIVE, USE_CASE_OPTIONS, VOLUME_OPTIONS } from "./copy";
import { useEmail } from "./email-context";
import { EASE } from "./motion";
import { Accent, Eyebrow } from "./primitives";

function PillGroup<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly T[];
  value: T | "";
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const on = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(opt)}
            className={`rounded-xl border px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
              on
                ? "border-ink bg-ink text-white"
                : "border-line bg-paper/50 text-ink hover:border-ink/25 hover:bg-white"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

const PERKS = [
  "First look at pricing and locked-in launch rates",
  "Shape which campaign type we build first",
  "No commitment — leave the list any time",
];

export function Waitlist() {
  const { email, setEmail, formRef } = useEmail();
  const [useCase, setUseCase] = useState<(typeof USE_CASE_OPTIONS)[number] | "">("");
  const [useCaseOther, setUseCaseOther] = useState("");
  const [volume, setVolume] = useState<(typeof VOLUME_OPTIONS)[number] | "">("");
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          use_case: useCase,
          use_case_other: useCaseOther,
          monthly_calls: volume,
          variant: ACTIVE.id,
          _gotcha: gotcha,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again in a moment.");
    }
  }

  const input =
    "h-12 w-full rounded-xl border border-line bg-paper/50 px-4 text-[16px] text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-ember focus:bg-white sm:text-[15px]";

  return (
    <section id="waitlist" className="px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Eyebrow>Early access</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.3rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Get early access to <Accent className="text-ember">Vloid.</Accent>
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16.5px] leading-relaxed text-muted">
            We’re onboarding early teams in batches. Tell us what you’d use it for and roughly how many calls you
            make — it helps us build the right thing first.
          </p>
          <ol className="mt-10 max-w-[480px] border-t border-line">
            {PERKS.map((p, i) => (
              <li key={p} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="font-mono text-[11px] text-ember-deep">0{i + 1}</span>
                <span className="text-[15.5px]">{p}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div ref={formRef} className="rounded-[26px] border border-line bg-card p-2 shadow-[0_40px_80px_-50px_rgba(14,13,11,0.35)]">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Waitlist · batch 01</span>
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-ink/12" />
                <span className="h-2 w-2 rounded-full bg-ink/12" />
                <span className="h-2 w-2 rounded-full bg-ember" />
              </span>
            </div>
            <div className="min-h-[500px] rounded-[20px] border border-line bg-white p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <m.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex min-h-[440px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="relative grid h-16 w-16 place-items-center">
                      <span className="success-ring absolute inset-0 rounded-full bg-ember/30" />
                      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-ember text-ink">
                        <Check className="h-7 w-7" strokeWidth={2.5} />
                      </span>
                    </span>
                    <h3 className="mt-7 text-[28px] font-medium tracking-[-0.03em]">You’re on the list.</h3>
                    <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-muted">
                      Check your inbox for a confirmation. We’ll be in touch as early-access batches open up.
                    </p>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={submit}
                    className="space-y-7"
                  >
                    <div>
                      <label htmlFor="wl-email" className="mb-2 block text-[14px] font-medium">
                        Work email <span className="text-ember-deep">*</span>
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={input}
                      />
                    </div>

                    <div>
                      <span className="mb-2.5 block text-[14px] font-medium">What would you use this for?</span>
                      <PillGroup name="Use case" options={USE_CASE_OPTIONS} value={useCase} onChange={setUseCase} />
                      {useCase === "Other" && (
                        <>
                          <label htmlFor="wl-other" className="sr-only">Describe your use case</label>
                          <input
                            id="wl-other"
                            type="text"
                            value={useCaseOther}
                            onChange={(e) => setUseCaseOther(e.target.value)}
                            placeholder="Tell us what you’d call for…"
                            className={`${input} mt-3`}
                          />
                        </>
                      )}
                    </div>

                    <div>
                      <span className="mb-2.5 block text-[14px] font-medium">Roughly how many calls per month?</span>
                      <PillGroup name="Calls per month" options={VOLUME_OPTIONS} value={volume} onChange={setVolume} />
                    </div>

                    {/* honeypot */}
                    <input
                      type="text"
                      name="_gotcha"
                      value={gotcha}
                      onChange={(e) => setGotcha(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    {status === "error" && (
                      <p role="alert" className="rounded-xl border border-red-600/20 bg-red-600/[0.06] px-4 py-2.5 text-[14px] text-red-700">
                        {errorMsg}
                      </p>
                    )}

                    <div>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ember text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-ember-deep disabled:opacity-70"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving your spot…
                          </>
                        ) : (
                          <>
                            {ACTIVE.cta}
                            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                      <p className="mt-3 text-center text-[12.5px] text-muted">We’ll only use your email for Vloid updates.</p>
                    </div>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
