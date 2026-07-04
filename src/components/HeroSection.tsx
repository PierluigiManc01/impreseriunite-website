import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/blueprint.webp";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.9]);

  return (
    <section ref={ref} id="home" className="tech-frame relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img
          src={heroBg}
          alt="Trama architettonica e blueprint"
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" style={{ opacity: overlayOpacity }} />

      <motion.div
        className="relative container text-center"
        style={{ y: textY, scale: textScale, opacity: textOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-primary"
        >
          Roma · dal 1976
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold text-foreground leading-[0.95] tracking-tight mb-4 sm:mb-8"
        >
          Imprese Riunite
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-foreground/80 font-body text-sm sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-6 px-2 sm:px-4"
        >
          Costruzioni, infrastrutture e impiantistica: oltre 50 anni di grandi opere civili al servizio del territorio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <a
            href="#aziende"
            className="inline-block rounded-md px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg"
          >
            Scopri le nostre aziende
          </a>
          <a
            href="#storia"
            className="inline-block rounded-md px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-foreground border border-foreground/30 hover:bg-foreground/10 transition-colors"
          >
            La nostra storia
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: textOpacity }}
      >
        <a href="#chi-siamo">
          <ChevronDown className="w-6 h-6 text-foreground/50 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
