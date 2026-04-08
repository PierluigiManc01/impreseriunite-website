import { motion } from "framer-motion";
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
        Gruppo Immobiliare
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
        className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10"
      >
        Costruiamo il futuro con passione, qualità e innovazione dal cuore dell'Italia.
      </motion.p>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        href="#aziende"
        className="inline-block rounded-lg px-8 py-3 font-heading font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg"
      >
        Scopri le nostre aziende
      </motion.a>
    </div>
  </section>
);

export default HeroSection;
