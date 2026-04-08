import { motion } from "framer-motion";
import { Building2, Shield, Award, Globe, Landmark, Zap } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Grandi Opere Civili",
    desc: "Dal 1976 nel settore delle costruzioni civili, opere marittime ed idrauliche, opere stradali e ristrutturazioni globali.",
  },
  {
    icon: Globe,
    title: "Esperienza Internazionale",
    desc: "Progetti di rilevanza internazionale in Arabia Saudita, Italia e oltre, inclusi viadotti, raccordi anulari e porti turistici.",
  },
  {
    icon: Landmark,
    title: "Opere Pubbliche",
    desc: "Collaborazione consolidata con Roma Capitale, Ministero della Giustizia, Ministero della Difesa, ENAV e i principali enti pubblici.",
  },
  {
    icon: Zap,
    title: "Impiantistica Avanzata",
    desc: "Impianti fotovoltaici, gruppi elettrogeni, cabine di trasformazione MT/BT e sistemi di sicurezza e illuminazione.",
  },
  {
    icon: Shield,
    title: "Certificazioni di Qualità",
    desc: "Standard ISO 45001, ISO 9001, ISO 14001, SA 8000, SOA e numerose altre certificazioni di settore.",
  },
  {
    icon: Award,
    title: "Sostenibilità e Innovazione",
    desc: "Attenzione costante alla riqualificazione urbana e all'innovazione tecnologica mirata alla sostenibilità ambientale.",
  },
];

const AboutSection = () => (
  <section id="chi-siamo" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
          Chi Siamo
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
          Un gruppo solido al servizio del territorio
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          Imprese Riunite – Properzi Costruzioni Generali è una realtà imprenditoriale italiana che
          lavora nel settore delle grandi opere civili dal 1976. In più di 40 anni di attività ci siamo
          affermati nel panorama nazionale come uno dei player più solidi del settore, portando avanti
          i nostri principi di sostenibilità ed innovazione.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5">
              <f.icon className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
