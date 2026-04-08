import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const projects = [
  {
    img: project1,
    title: "Residenze Moderne Tiburtina",
    category: "Residenziale",
    desc: "Complesso residenziale di nuova costruzione con 48 unità abitative, aree verdi e parcheggio sotterraneo.",
  },
  {
    img: project2,
    title: "Restauro Palazzo Storico",
    category: "Restauro",
    desc: "Recupero conservativo di un palazzo d'epoca nel centro storico, con adeguamento sismico e efficientamento energetico.",
  },
  {
    img: project3,
    title: "Centro Direzionale EUR",
    category: "Commerciale",
    desc: "Edificio direzionale all'avanguardia con certificazione LEED e tecnologie smart building integrate.",
  },
];

const ProjectsSection = () => (
  <section id="progetti" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">Progetti</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          I nostri progetti più interessanti
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group rounded-xl overflow-hidden bg-card border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                {p.category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-heading font-bold text-lg text-foreground">{p.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-muted-foreground font-body text-sm">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
