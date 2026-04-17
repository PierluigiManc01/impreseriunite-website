import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={heroBg} alt="Skyline italiano" className="w-full h-full object-cover" width={1920} height={1080} />
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" style={{ opacity: overlayOpacity }} />

      <motion.div className="relative container text-center" style={{ y: textY, scale: textScale, opacity: textOpacity }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground/70 font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4"
        >
          Gruppo Immobiliare Properzi
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-tight mb-4 sm:mb-6"
        >
          Imprese Riunite
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/80 font-body text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 px-2"
        >
          Dal 1976 nel settore delle grandi opere civili. Costruzioni, infrastrutture e impiantistica con oltre 50 anni di esperienza al servizio del territorio.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-primary-foreground/60 font-body text-xs sm:text-sm max-w-xl mx-auto mb-8 sm:mb-10 px-2"
        >
          Tre imprese, un unico obiettivo: eccellenza nella realizzazione di opere pubbliche e private in Italia e nel mondo.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#aziende"
            className="inline-block rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg"
          >
            Scopri le nostre aziende
          </a>
          <a
            href="#storia"
            className="inline-block rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
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
          <ChevronDown className="w-6 h-6 text-primary-foreground/50 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
