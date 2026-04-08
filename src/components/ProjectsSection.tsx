import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building, Hammer, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const iconMap: Record<string, React.ElementType> = {
  "costruzioni-angelico": Hammer,
  "nuova-ccs": HardHat,
  "gruppo-immobiliare-properzi": Building,
};

const ProjectsSection = () => (
  <section id="progetti" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
          Progetti
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          I nostri lavori più significativi
        </h2>
        <p className="text-muted-foreground font-body">
          Sfoglia i progetti principali suddivisi per impresa del gruppo.
        </p>
      </motion.div>

      <Tabs defaultValue={companies[0].id} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-8 justify-center">
          {companies.map((c) => {
            const Icon = iconMap[c.id] || Building;
            return (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary bg-card text-muted-foreground transition-all"
              >
                <Icon className="w-4 h-4" />
                {c.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {companies.map((c) => (
          <TabsContent key={c.id} value={c.id}>
            <div className="grid md:grid-cols-2 gap-6">
              {c.projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all p-6 group"
                >
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {project.location}
                    </span>
                    {project.amount && (
                      <span className="text-xs font-semibold bg-accent text-accent-foreground px-2.5 py-0.5 rounded-full">
                        {project.amount}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mt-3 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    <span className="font-medium text-foreground/70">Committente:</span>{" "}
                    {project.client}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to={`/azienda/${c.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Vedi tutti i dettagli di {c.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </section>
);

export default ProjectsSection;
