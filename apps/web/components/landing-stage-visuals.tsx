"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Quote, Star } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

function usePlay<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion() === true;
  return { ref, play: inView && !reduce };
}

export function CollectVisual() {
  const { ref, play } = usePlay<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="rounded-lg border border-border bg-background p-3"
      aria-hidden="true"
    >
      <p className="font-geist_mono text-[11px] text-muted-foreground">
        testiflow.app/your-brand
      </p>
      <p className="mt-3 text-sm text-foreground">How was working with us?</p>
      <span className="mt-2 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="inline-flex"
            initial={false}
            animate={play ? "show" : "rest"}
            variants={{
              rest: { opacity: 1, scale: 1 },
              show: { opacity: [0.2, 1], scale: [0.7, 1] },
            }}
            transition={{
              duration: play ? 0.35 : 0,
              delay: play ? i * 0.08 : 0,
              ease,
            }}
          >
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          </motion.span>
        ))}
      </span>
      <div className="mt-3 flex h-8 items-center rounded-md border border-dashed border-border px-2 text-xs text-muted-foreground">
        Write, or record a video
      </div>
    </div>
  );
}

const manageRows = [
  {
    label: "5 stars",
    tag: "Positive",
    tone: "bg-secondary text-secondary-foreground",
  },
  { label: "Video", tag: "Neutral", tone: "border border-border text-foreground" },
  {
    label: "Archived",
    tag: "Spam",
    tone: "bg-destructive text-destructive-foreground",
  },
];

export function ManageVisual() {
  const { ref, play } = usePlay<HTMLUListElement>();

  return (
    <ul ref={ref} className="space-y-2" aria-hidden="true">
      {manageRows.map((row, i) => (
        <motion.li
          key={row.tag}
          className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs"
          initial={false}
          animate={play ? "show" : "rest"}
          variants={{
            rest: { opacity: 1, x: 0 },
            show: { opacity: [0, 1], x: [14, 0] },
          }}
          transition={{
            duration: play ? 0.45 : 0,
            delay: play ? i * 0.1 : 0,
            ease,
          }}
        >
          <span className="text-muted-foreground">{row.label}</span>
          <span className={`rounded-md px-1.5 py-0.5 font-medium ${row.tone}`}>
            {row.tag}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

const quotes = [
  "Same-day replies.",
  "Two minutes.",
  "Kept this one.",
  "In their words.",
];

export function ShowcaseVisual() {
  const { ref, play } = usePlay<HTMLDivElement>();

  return (
    <div ref={ref} className="grid grid-cols-2 gap-2" aria-hidden="true">
      {quotes.map((line, i) => (
        <motion.div
          key={line}
          className="rounded-lg border border-border bg-background p-2"
          initial={false}
          animate={play ? "show" : "rest"}
          variants={{
            rest: { opacity: 1, y: 0 },
            show: { opacity: [0, 1], y: [8, 0] },
          }}
          transition={{
            duration: play ? 0.4 : 0,
            delay: play ? i * 0.08 : 0,
            ease,
          }}
        >
          <Quote className="h-3 w-3 text-primary" />
          <p className="mt-1.5 text-[11px] leading-snug text-foreground/80">
            {line}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
