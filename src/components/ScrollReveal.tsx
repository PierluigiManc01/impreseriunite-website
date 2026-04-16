import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Scale range: how much to grow/shrink. Default [0.92, 1, 0.92] */
  scaleRange?: [number, number, number];
  /** Whether to fade out when scrolling past */
  fadeOut?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  scaleRange = [0.9, 1.5, 0.9],
  fadeOut = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    fadeOut ? [0, 0.3, 0.7, 1] : [0, 0.3, 1, 1],
    fadeOut ? [0, 1, 1, 0] : [0, 1, 1, 1]
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[2]]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -30]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, scale, y }} className="origin-center">
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
