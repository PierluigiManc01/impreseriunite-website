import { motion } from "framer-motion";
import { Building, Hammer, HardHat } from "lucide-react";

const companies = [
  {
    icon: Building,
    name: "Gruppo Immobiliare Properzi",
    desc: "Sviluppo e gestione di progetti immobiliari residenziali e commerciali di alto livello.",
  },
  {
    icon: Hammer,
    name: "Costruzioni Angelico",
    desc: "Costruzioni civili e industriali con attenzione alla qualità e alla sostenibilità ambientale.",
  },
  {
    icon: HardHat,
    name: "Nuova C.S.S.",
    desc: "Servizi specializzati in costruzioni stradali, infrastrutture e opere pubbliche.",
  },
];

const CompaniesSection = () => (
  <section id="aziende" className="py-24 bg-accent/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">Le Nostre Aziende</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Competenze unite per grandi risultati
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-xl p-8 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <c.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-3">{c.name}</h3>
            <p className="text-muted-foreground font-body">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CompaniesSection;
