import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const featuredProjects = (() => {
  const all: { project: (typeof companies)[0]["projects"][0]; company: (typeof companies)[0] }[] = [];
  for (const c of companies) {
    for (const p of c.projects) {
      all.push({ project: p, company: c });
    }
  }
  const picked: typeof all = [];
  const companyIds = companies.map((c) => c.id);
  for (const cid of companyIds) {
    const fromCompany = all.filter((a) => a.company.id === cid && a.project.images.length > 0);
    if (fromCompany.length > 0 && picked.length < 5) picked.push(fromCompany[0]);
  }
  for (const a of all) {
    if (picked.length >= 5) break;
    if (!picked.includes(a) && a.project.images.length > 0) picked.push(a);
  }
  for (const a of all) {
    if (picked.length >= 5) break;
    if (!picked.includes(a)) picked.push(a);
  }
  return picked.slice(0, 5);
})();

const ProjectsSection = () => (
  <section id="progetti" className="section-shell bg-background">
    <div className="container">
      <ScrollReveal>
        <div className="mb-8 grid gap-4 px-4 sm:px-0 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="section-eyebrow mb-3">Progetti</p>
            <h2 className="section-title">
              Cantieri, committenti e risultati verificabili
            </h2>
          </div>
          <p className="section-copy max-w-2xl md:ml-auto">
            Una selezione dei progetti più rappresentativi del gruppo, con evidenza di luogo, committente e importi ove disponibili.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 lg:grid-cols-4">
        {featuredProjects.map(({ project, company }, i) => {
          const featured = i === 0;
          return (
            <ScrollReveal
              key={project.title}
              className={cn(featured && "lg:col-span-2 lg:row-span-2")}
              scaleRange={[0.98, 1, 1]}
              fadeOut={false}
            >
              <article className="architectural-panel group h-full overflow-hidden">
                {project.images.length > 0 ? (
                  <div className={cn("relative", featured ? "aspect-[16/11]" : "aspect-[4/3]")}>
                    <ProjectImageCarousel
                      images={project.images}
                      alt={project.title}
                      className="h-full"
                      autoplayInterval={featured ? 5000 : 6500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    <div className="absolute left-3 top-3 pointer-events-none">
                      <span className="rounded-full border border-border bg-card/90 px-2.5 py-1 micro-label text-foreground backdrop-blur">
                        {company.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={cn("flex items-center justify-center bg-accent/60 p-6", featured ? "aspect-[16/11]" : "aspect-[4/3]")}>
                    <p className="max-w-xs text-center panel-title text-accent-foreground">
                      Archivio storico Imprese Riunite
                    </p>
                  </div>
                )}

                <div className={cn("p-5", featured && "md:p-7")}>
                  <div className="mb-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <span className="inline-flex min-w-0 items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="truncate">{project.location}</span>
                    </span>
                    {project.date && (
                      <span className="inline-flex items-center gap-1.5 sm:justify-end">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {project.date}
                      </span>
                    )}
                    <span className="min-w-0 sm:col-span-2">
                      <span className="font-medium text-foreground/70">Committente:</span>{" "}
                      {project.client}
                    </span>
                    {project.amount && (
                      <span className="sm:col-span-2">
                        <span className="font-medium text-foreground/70">Importo:</span>{" "}
                        {project.amount}
                      </span>
                    )}
                  </div>

                  <h3 className={cn("font-heading font-bold text-foreground leading-tight", featured ? "text-2xl" : "text-lg md:text-xl")}>
                    {project.title}
                  </h3>
                  <p className="mt-3 section-copy">
                    {project.description}
                  </p>
                  <Link
                    to={`/azienda/${company.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Scheda azienda
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal fadeOut={false} mobileScaleRange={[1, 1, 1]}>
        <div className="text-center mt-10 px-4 sm:px-0">
          <p className="section-copy mx-auto max-w-xs sm:max-w-none">
            Scopri tutti i progetti visitando la pagina di <a href="#aziende" className="text-primary hover:underline font-medium">ciascuna azienda</a>.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProjectsSection;
