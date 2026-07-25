import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Starting scale for the reveal. Only the first value is used as the "from". */
  scaleRange?: [number, number, number];
  /** Mobile scale override — if not set, auto-dampened from scaleRange. */
  mobileScaleRange?: [number, number, number];
  /** Kept for API compatibility. Content is never hidden anymore. */
  fadeOut?: boolean;
}

// One-shot reveal: content fades + rises + settles the first time it enters the
// viewport, then stays put. No scroll-scrubbed opacity — so anchor jumps never
// land on invisible content, and nothing disappears when scrolling past.
const ScrollReveal = ({
  children,
  className = "",
  scaleRange = [0.94, 1.04, 1],
  mobileScaleRange,
}: ScrollRevealProps) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const fromScale = isMobile
    ? Math.max(0.98, mobileScaleRange?.[0] ?? scaleRange[0])
    : Math.min(scaleRange[0], 0.98);
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
