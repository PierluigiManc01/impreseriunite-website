import { motion } from "framer-motion";
import { Building2, Shield, Award } from "lucide-react";

const features = [
  { icon: Building2, title: "Esperienza", desc: "Decenni di attività nel settore immobiliare e delle costruzioni." },
  { icon: Shield, title: "Affidabilità", desc: "Lavori eseguiti con i più alti standard di qualità e sicurezza." },
  { icon: Award, title: "Eccellenza", desc: "Progetti pluripremiati che valorizzano il territorio italiano." },
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
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">Chi Siamo</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
          Un gruppo solido al servizio del territorio
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          Imprese Riunite è un consorzio di aziende italiane specializzate in costruzioni, ristrutturazioni e sviluppo immobiliare. La nostra missione è trasformare spazi con competenza e visione.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-xl p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5">
              <f.icon className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
