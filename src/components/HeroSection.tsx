import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Skyline italiano" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
    </div>
    <div className="relative container text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-primary-foreground/70 font-body text-sm tracking-[0.3em] uppercase mb-4"
      >
        Gruppo Immobiliare Properzi
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-tight mb-6"
      >
        Imprese Riunite
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-4"
      >
        Dal 1976 nel settore delle grandi opere civili. Costruzioni, infrastrutture e impiantistica con oltre 40 anni di esperienza al servizio del territorio.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-primary-foreground/60 font-body text-sm max-w-xl mx-auto mb-10"
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
          className="inline-block rounded-lg px-8 py-3 font-heading font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg"
        >
          Scopri le nostre aziende
        </a>
        <a
          href="#storia"
          className="inline-block rounded-lg px-8 py-3 font-heading font-semibold text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
        >
          La nostra storia
        </a>
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <a href="#chi-siamo">
        <ChevronDown className="w-6 h-6 text-primary-foreground/50 animate-bounce" />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
