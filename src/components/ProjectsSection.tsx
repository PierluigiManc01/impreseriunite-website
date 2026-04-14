import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";

// Pick 4 featured projects across all companies, tagged with company name
const featuredProjects = (() => {
  const all: { project: (typeof companies)[0]["projects"][0]; company: (typeof companies)[0] }[] = [];
  for (const c of companies) {
    for (const p of c.projects) {
      all.push({ project: p, company: c });
    }
  }
  // Pick projects with images first, spread across companies
  const picked: typeof all = [];
  const companyIds = companies.map((c) => c.id);
  for (const cid of companyIds) {
    const fromCompany = all.filter((a) => a.company.id === cid && a.project.images.length > 0);
    if (fromCompany.length > 0 && picked.length < 4) {
      picked.push(fromCompany[0]);
    }
  }
  // Fill remaining slots
  for (const a of all) {
    if (picked.length >= 4) break;
    if (!picked.includes(a) && a.project.images.length > 0) picked.push(a);
  }
  // If still not enough, add without images
  for (const a of all) {
    if (picked.length >= 4) break;
    if (!picked.includes(a)) picked.push(a);
  }
  return picked.slice(0, 4);
})();

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
          Una selezione dei progetti più rappresentativi del gruppo.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {featuredProjects.map(({ project, company }, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all overflow-hidden group"
          >
            {project.images.length > 0 && (
              <div className="relative h-48">
                <ProjectImageCarousel
                  images={project.images}
                  alt={project.title}
                  className="h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 flex gap-2 pointer-events-none">
                  <span className="text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {project.location}
                  </span>
                  {project.amount && (
                    <span className="text-xs font-semibold bg-white/90 text-foreground px-2.5 py-0.5 rounded-full">
                      {project.amount}
                    </span>
                  )}
                </div>
                {/* Company tag */}
                <div className="absolute top-3 right-3 pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-card/90 backdrop-blur text-foreground px-2.5 py-1 rounded-full border border-border">
                    {company.name}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              {project.images.length === 0 && (
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                    {project.location}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-0.5 rounded-full">
                    {company.name}
                  </span>
                  {project.amount && (
                    <span className="text-xs font-semibold bg-accent text-accent-foreground px-2.5 py-0.5 rounded-full">
                      {project.amount}
                    </span>
                  )}
                </div>
              )}

              <h3 className="font-heading font-bold text-lg text-foreground mt-2 mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-body">
                  <span className="font-medium text-foreground/70">Committente:</span>{" "}
                  {project.client}
                </p>
                {project.date && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.date}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-sm text-muted-foreground font-body">
          Scopri tutti i progetti visitando la pagina di ciascuna azienda.
        </p>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
