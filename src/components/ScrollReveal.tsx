import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  initialScale?: number;
  /** Mobile override; defaults to a dampened desktop scale. */
  mobileInitialScale?: number;
}

// One-shot reveal: content fades + rises + settles the first time it enters the
// viewport, then stays put. No scroll-scrubbed opacity — so anchor jumps never
// land on invisible content, and nothing disappears when scrolling past.
const ScrollReveal = ({
  children,
  className = "",
  initialScale = 0.94,
  mobileInitialScale,
}: ScrollRevealProps) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const fromScale = isMobile
    ? Math.max(0.98, mobileInitialScale ?? initialScale)
    : Math.min(initialScale, 0.98);
  const fromY = isMobile ? 18 : 28;

  return (
    <div className={className}>
      <motion.div
        className="origin-center h-full"
        initial={{ opacity: 0, y: fromY, scale: fromScale }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
