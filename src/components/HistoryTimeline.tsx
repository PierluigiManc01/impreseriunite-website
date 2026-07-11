import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { history } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";

const HistoryTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="storia" className="section-shell bg-background overflow-hidden relative">
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16 px-4 md:px-0">
            <p className="section-eyebrow mb-3">
              La Nostra Storia
            </p>
            <h2 className="section-title mb-4 sm:mb-6 px-3 md:px-0">
              Oltre 50 anni di eccellenza nelle costruzioni
            </h2>
            <p className="section-copy mb-6 px-4">{history.intro}</p>
          </div>
        </ScrollReveal>

        {/* Single-column list: a plain vertical line with square markers,
            no left/right zigzag — simpler to scan than the prior layout. */}
        <div className="relative max-w-3xl mx-auto mt-8 md:mt-16 pl-8 md:pl-10">
          <div className="absolute left-2 md:left-2.5 top-1 bottom-1 w-px bg-border" />
          <motion.div
            className="absolute left-2 md:left-2.5 top-1 w-px bg-primary origin-top"
            style={{ height: lineHeight }}
          />

          {history.timeline.map((item) => (
            <ScrollReveal key={item.year} scaleRange={[0.98, 1, 1]} fadeOut={false}>
              <div className="relative pb-14 md:pb-16 last:pb-0">
                <div className="absolute -left-8 md:-left-10 top-1.5 w-3 h-3 bg-primary" />
                <span className="font-heading text-3xl md:text-4xl font-bold text-primary tracking-wide">
                  {item.year}
                </span>
                <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="section-copy max-w-2xl">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
