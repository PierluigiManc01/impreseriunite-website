import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { companies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";

const operatingCompanies = companies.filter(
  (company) => company.id === "costruzioni-angelico" || company.id === "nuova-ccs"
);

const projectArchive = operatingCompanies.flatMap((company) =>
  company.projects
    .filter((project) => project.images.length > 0)
    .map((project) => ({ project, company }))
);

const [featuredProject, ...secondaryProjects] = projectArchive.slice(0, 3);

const ProjectsTeaser = () => (
  <section id="progetti" className="section-shell bg-background">
    <div className="container">
      <ScrollReveal>
        <header className="mb-10 grid gap-5 px-4 sm:px-0 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="section-eyebrow mb-3">Progetti · Archivio</p>
            <h2 className="section-title max-w-4xl">
              Cantieri, committenti e risultati verificabili
            </h2>
          </div>
          <p className="section-copy max-w-xl lg:justify-self-end">
            Una selezione trasversale delle opere realizzate dalle aziende del gruppo.
          </p>
        </header>
      </ScrollReveal>

      <div className="grid gap-4 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-12 lg:grid-rows-2">
        {featuredProject && (
          <ScrollReveal
            className="sm:col-span-2 lg:col-span-7 lg:row-span-2"
            fadeOut={false}
          >
            <Link
              to="/progetti"
              aria-label={`Apri archivio progetti: ${featuredProject.project.title}`}
              className="group relative flex h-full min-h-[29rem] overflow-hidden rounded-2xl border border-border/60 bg-foreground shadow-[var(--card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 lg:min-h-[38rem]"
            >
              <img
                src={featuredProject.project.images[0]}
                alt={featuredProject.project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />

              <div className="relative mt-auto w-full p-6 text-primary-foreground sm:p-8 lg:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/75">
                  <span>{featuredProject.company.name}</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {featuredProject.project.location}
                  </span>
                </div>
                <h3 className="max-w-2xl font-heading text-3xl font-bold leading-[1.03] tracking-tight sm:text-4xl lg:text-5xl">
                  {featuredProject.project.title}
                </h3>
                <div className="mt-6 flex items-end justify-between gap-6 border-t border-primary-foreground/20 pt-5">
                  <p className="max-w-xl font-body text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
                    {featuredProject.project.client}
                  </p>
                  <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {secondaryProjects.map(({ project, company }) => (
          <ScrollReveal
            key={`${company.id}-${project.title}`}
            className="lg:col-span-5"
            fadeOut={false}
          >
            <Link
              to="/progetti"
              aria-label={`Apri archivio progetti: ${project.title}`}
              className="group relative flex h-full min-h-72 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 lg:min-h-0"
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="absolute inset-y-0 right-0 h-full w-[58%] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card from-[45%] via-card via-[58%] to-transparent" />

              <div className="relative z-10 flex w-[68%] flex-col justify-between p-6 sm:p-7">
                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    {company.name}
                  </p>
                  <h3 className="mt-4 font-heading text-2xl font-bold leading-[1.08] tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-8 flex items-center gap-2 font-body text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>{project.location}</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal fadeOut={false}>
        <div className="mt-8 flex justify-center px-4 sm:px-0">
          <Link
            to="/progetti"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Vedi tutti i progetti
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProjectsTeaser;
