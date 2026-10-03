"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.2, 0.8, 0.2, 1] as const;

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  highlight?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  highlight = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion() === true;
  const play = inView && !reduce;
  const shown = inView || reduce;

  return (
    <motion.div
      ref={ref}
      className={cn(className, highlight && shown && "border-primary")}
      initial={false}
      animate={play ? "show" : "rest"}
      variants={{
        rest: { opacity: 1, y: 0 },
        show: { opacity: [0, 1], y: [16, 0] },
      }}
      transition={{ duration: play ? 0.6 : 0, delay: play ? delay : 0, ease }}
    >
      {children}
    </motion.div>
  );
}
