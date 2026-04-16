import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Scale range: how much to grow/shrink. Default [0.9, 1.5, 0.9] desktop, [0.95, 1.15, 0.95] mobile */
  scaleRange?: [number, number, number];
  /** Mobile scale override — if not set, auto-dampened from scaleRange */
  mobileScaleRange?: [number, number, number];
  /** Whether to fade out when scrolling past */
  fadeOut?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  scaleRange = [0.9, 1.5, 0.9],
  mobileScaleRange,
  fadeOut = true,
}: ScrollRevealProps) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  // Dampen scale on mobile: reduce the delta by ~40%
  const effectiveScale = isMobile
    ? mobileScaleRange ?? [
        1 - (1 - scaleRange[0]) * 0.5,
        1 + (scaleRange[1] - 1) * 0.4,
        1 - (1 - scaleRange[2]) * 0.5,
      ]
    : scaleRange;

  const yRange = isMobile ? [30, 0, 0, -15] : [60, 0, 0, -30];

  const opacity = useTransform(
    scrollYProgress,
    fadeOut ? [0, 0.3, 0.7, 1] : [0, 0.3, 1, 1],
    fadeOut ? [0, 1, 1, 0] : [0, 1, 1, 1]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [effectiveScale[0], effectiveScale[1], effectiveScale[1], effectiveScale[2]]
  );
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], yRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, scale, y }} className="origin-center">
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
