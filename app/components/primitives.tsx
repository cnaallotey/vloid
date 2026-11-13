/* Server-safe presentational primitives (no hooks, no client JS). */

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  // A "V" drawn as a voice waveform.
  const bars = [13, 8.5, 4, 8.5, 13];
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect width="28" height="28" rx="8" fill="var(--color-ember)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={4.8 + i * 4}
          y={14 - h / 2}
          width="2.4"
          height={h}
          rx="1.2"
          fill="var(--color-ink)"
        />
      ))}
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span
        className={`text-[17px] font-semibold tracking-[-0.03em] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        Vloid
      </span>
    </span>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] ${
        tone === "dark"
          ? "border-white/12 bg-white/[0.04] text-white/70"
          : "border-line bg-card text-muted"
      } ${className}`}
    >
      <span className="text-ember" aria-hidden>
        +
      </span>
      {children}
    </span>
  );
}

/** Colour accent for a word or two inside a headline. */
export function Accent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
    >
      {children}
    </span>
  );
}

export function Waveform({
  bars = [10, 18, 26, 14, 22, 30, 18, 12, 24, 16],
  className = "",
  barClass = "bg-ember",
}: {
  bars?: number[];
  className?: string;
  barClass?: string;
}) {
  return (
    <span className={`flex items-center gap-[3px] ${className}`} aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`wave-bar w-[2.5px] rounded-full ${barClass}`}
          style={
            {
              height: h,
              "--dl": `${(i % 5) * -0.18}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

export function Tag({
  tone,
  children,
}: {
  tone: "good" | "warn" | "flat";
  children: React.ReactNode;
}) {
  const styles = {
    good: "bg-signal/12 text-signal-ink",
    warn: "bg-amber/15 text-amber-ink",
    flat: "bg-ink/[0.06] text-muted",
  }[tone];
  const dot = {
    good: "bg-signal",
    warn: "bg-amber",
    flat: "bg-faint",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10.5px] font-medium ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
