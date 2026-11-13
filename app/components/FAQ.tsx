"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ACTIVE } from "./copy";
import { Accent, Eyebrow } from "./primitives";

const FAQS = [
  {
    q: "Do the people we call know they’re talking to an AI?",
    a: "Yes. Vloid opens every call by identifying itself as an automated assistant calling on your behalf. It’s built to honour do-not-call flags and record consent, and you stay the data controller for your own contact list — we’re the tool that places the calls.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing isn’t final yet — settling it is part of what this waitlist is for. That’s why we ask about your call volume. Early-access members get first look at pricing and locked-in launch rates before we open it up more widely.",
  },
  {
    q: "When does it launch?",
    a: "Phase 1 is in active build. We’re inviting waitlist members in batches as capacity opens, starting with the use cases people tell us they need most — which is exactly why the two questions on the form matter.",
  },
  {
    q: "Can I use my own numbers and contact list?",
    a: "That’s the whole idea. You upload your contact list and define the campaign; Vloid handles the dialing and the conversation, then hands you structured results back — resolved, needs follow-up, satisfaction score, notes.",
  },
  {
    q: "Which languages and regions are supported?",
    a: "We’re starting with the call flows most common to support teams in West Africa and expanding from there. Tell us your market when you join and it helps us prioritise what comes next.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-5 pb-24 sm:px-8 sm:pb-36">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.3rem,4.6vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Questions, <Accent className="text-ember">answered.</Accent>
          </h2>
          <p className="mt-5 max-w-[34ch] text-[15.5px] leading-relaxed text-muted">
            Still have a question? Ask it when you join — a real person reads every reply.
          </p>
          <a
            href="#waitlist"
            className="mt-7 inline-flex h-11 items-center rounded-xl bg-ink px-5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-ink/85"
          >
            {ACTIVE.cta}
          </a>
        </div>

        <div className="space-y-2">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-[20px] border transition-colors duration-500 ${
                  isOpen ? "border-ink/15 bg-white" : "border-line bg-card hover:bg-white"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className="flex w-full items-center justify-between gap-6 rounded-[20px] px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-[16.5px] font-medium tracking-[-0.015em]">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-500 ease-[var(--ease-expo)] ${
                        isOpen ? "rotate-45 bg-ink text-white" : "bg-paper text-ink"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="accordion-panel"
                  data-open={isOpen}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-6">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
