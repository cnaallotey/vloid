/* ────────────────────────────────────────────────────────────
   Copy — two variants from the plan (control vs. provoke).
   Flip ACTIVE to run the other. The id is also sent to
   FormDrop so signups can be segmented by variant later.
   `accent` is the headline word picked out in the ember gradient.
 ──────────────────────────────────────────────────────────── */
export const COPY = {
  A: {
    id: "A-control",
    lines: ["Let AI make your", "follow-up calls."],
    accent: "follow-up",
    subhead:
      "Upload a list, tell it what to ask, and get structured results back — no agents dialing one by one.",
    cta: "Join the waitlist",
  },
  B: {
    id: "B-provoke",
    lines: ["Stop paying people to", "dial down a spreadsheet."],
    accent: "dial",
    subhead:
      "Vloid calls your customer list, asks what you need to know, and hands you the answers — while your team does everything else.",
    cta: "Get early access",
  },
} as const;

export const ACTIVE = COPY.B;

export const USE_CASE_OPTIONS = [
  "Feedback collection",
  "Renewal reminders",
  "Dispute follow-ups",
  "Other",
] as const;

export const VOLUME_OPTIONS = ["<100", "100-500", "500-2000", "2000+"] as const;

export const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Why Vloid", href: "#why" },
  { label: "FAQ", href: "#faq" },
];
