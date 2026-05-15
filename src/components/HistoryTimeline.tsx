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
    <section ref={sectionRef} id="storia" className="py-12 mb-0 mt-0 bg-background overflow-hidden relative">
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4 md:px-0">
            <p className="text-xs sm:text-sm tracking-widest sm:tracking-[0.2em] uppercase text-primary font-semibold mb-3">
              La Nostra Storia
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4 sm:mb-6 px-3 md:px-0">
              Oltre 50 anni di eccellenza nelle costruzioni
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-lg mb-8 leading-relaxed px-4">{history.intro}</p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-8xl mx-auto px-0 md:px-0 mt-5 md:mt-10">
          {/* Static line bg */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
          {/* Animated fill */}
          <motion.div
            className="absolute left-3 md:left-1/2 top-0 w-px bg-primary md:-translate-x-px origin-top"
            style={{ height: lineHeight }}
          />

          {history.timeline.map((item, i) => (
            <ScrollReveal
              key={item.year}
              scaleRange={[0.9, 1.05, 0.9]}
              fadeOut={false}
            >
              <div className={`relative flex items-start mb-16 md:mb-24 lg:mb-32 md:w-full`}>
                <div className="absolute left-3 md:left-1/2 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-primary rounded-full -translate-x-1/2 md:-translate-x-2 lg:-translate-x-2.5 mt-2 md:mt-3 ml-2 md:ml-0 ring-4 ring-background z-10" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 lg:pr-24 md:text-right" : "md:pl-16 lg:pl-24 md:ml-auto"}`}>
                  <span className="inline-block text-sm md:text-lg lg:text-xl font-bold text-primary bg-primary/10 px-3 md:px-5 lg:px-6 py-1 md:py-1.5 lg:py-2 rounded-full mb-3 md:mb-4">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-bold text-xl md:text-3xl lg:text-4xl text-foreground mb-2 md:mb-4">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-base md:text-xl lg:text-2xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
