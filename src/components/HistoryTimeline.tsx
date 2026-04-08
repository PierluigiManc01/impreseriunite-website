import { motion } from "framer-motion";
import { history } from "@/data/companies";

const HistoryTimeline = () => (
  <section id="storia" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
          La Nostra Storia
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
          Oltre 40 anni di eccellenza nelle costruzioni
        </h2>
        <p className="text-muted-foreground font-body text-lg">{history.intro}</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        {history.timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex items-start gap-8 mb-12 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-2 ring-4 ring-background z-10" />

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
              <span className="inline-block text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {item.year}
              </span>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HistoryTimeline;
