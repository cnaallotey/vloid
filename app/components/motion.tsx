"use client";

import { useEffect, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** LazyMotion + `m` keeps the framer-motion payload to the animation core. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/** Fade-and-rise on first view. Only used below the fold. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/**
 * Scroll-scrubbed paragraph: each word brightens as the reader moves
 * through it. Words wrapped in *asterisks* render in the accent colour.
 */
export function WordReveal({
  text,
  className = "",
  from = 0.16,
  accentClass = "text-ember-deep",
}: {
  text: string;
  className?: string;
  from?: number;
  accentClass?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.5"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((raw, i) => {
        const accent = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            from={reduce ? 1 : from}
            accent={accent}
            accentClass={accentClass}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  from,
  accent,
  accentClass,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  from: number;
  accent: boolean;
  accentClass: string;
}) {
  const opacity = useTransform(progress, range, [from, 1]);
  return (
    <>
      <m.span
        style={{ opacity }}
        className={accent ? accentClass : ""}
      >
        {children}
      </m.span>{" "}
    </>
  );
}

/** True while the element intersects the viewport (plus margin). */
export function useInViewport<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "0px"
) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return visible;
}

/**
 * Wraps decorative, CSS-animated content and pauses every loop inside it
 * while it is offscreen. Children can be server components.
 */
export function Pausable({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewport(ref, "120px");
  return (
    <div ref={ref} className={className} data-paused={visible ? undefined : ""}>
      {children}
    </div>
  );
}
