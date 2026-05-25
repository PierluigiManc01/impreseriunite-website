import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Scale range: how much to grow/shrink. Default is intentionally subtle. */
  scaleRange?: [number, number, number];
  /** Mobile scale override — if not set, auto-dampened from scaleRange */
  mobileScaleRange?: [number, number, number];
  /** Whether to fade out when scrolling past */
  fadeOut?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  scaleRange = [0.94, 1.04, 1],
  mobileScaleRange,
  fadeOut = false,
}: ScrollRevealProps) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  const effectiveScale = isMobile
    ? mobileScaleRange ?? [
        Math.max(0.96, scaleRange[0]),
        Math.min(1.025, scaleRange[1]),
        scaleRange[2],
      ]
    : scaleRange;

  const yRange = isMobile ? [24, 0, 0, 0] : [36, 0, 0, 0];

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
      <motion.div style={{ opacity, scale, y }} className="origin-center h-full">
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
