import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => (
  <section id="contatti" className="py-24 bg-accent/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">Contatti</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Parliamo del tuo prossimo progetto
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        {[
          { icon: Phone, label: "Telefono", value: "+39 06 123 4567" },
          { icon: Mail, label: "Email", value: "info@impreseriunite.it" },
          { icon: MapPin, label: "Sede", value: "Roma, Italia" },
        ].map((c) => (
          <div key={c.label} className="flex flex-col items-center text-center bg-card rounded-xl p-8 border border-border shadow-[var(--card-shadow)]">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="font-heading font-semibold text-foreground mb-1">{c.label}</p>
            <p className="text-muted-foreground font-body text-sm">{c.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
