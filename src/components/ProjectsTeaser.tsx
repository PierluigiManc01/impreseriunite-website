import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { operatingCompanies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";

const projectArchive = operatingCompanies.flatMap((company) =>
  company.projects
    .filter((project) => project.images.length > 0)
    .map((project) => ({ project, company }))
);

const curatedProjects = projectArchive.filter(
  ({ project }) => project.featuredOnHomepage
);
const teaserProjects =
  curatedProjects.length >= 3 ? curatedProjects.slice(0, 3) : projectArchive.slice(0, 3);
const [featuredProject, ...secondaryProjects] = teaserProjects;

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
          >
            <Link
              to="/progetti"
              aria-label={`Apri il progetto ${featuredProject.project.title}`}
              className="group relative flex h-full min-h-[29rem] overflow-hidden rounded-2xl border border-border/60 bg-foreground shadow-[var(--card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 lg:min-h-[38rem]"
            >
              <img
                src={featuredProject.project.images[0]}
                alt={featuredProject.project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-foreground/90 via-foreground/35 to-transparent" />

              <div className="relative mt-auto w-full p-5 text-primary-foreground sm:p-7 lg:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary-foreground/75 sm:text-xs">
                  <span>{featuredProject.company.name}</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {featuredProject.project.location}
                  </span>
                </div>
                <h3 className="max-w-xl font-heading text-2xl font-semibold leading-[1.08] tracking-tight sm:text-3xl lg:text-4xl">
                  {featuredProject.project.title}
                </h3>
                <div className="mt-4 flex items-end justify-between gap-6 border-t border-primary-foreground/15 pt-4">
                  <p className="max-w-lg font-body text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
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
          >
            <Link
              to="/progetti"
              aria-label={`${project.title}`}
              className="group relative flex h-full min-h-72 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 lg:min-h-0"
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="absolute inset-y-0 right-0 h-full w-[55%] lg:w-[50%] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card from-[10%] lg:from-[20%] via-card via-[48%] lg:via-[51%] to-transparent" />

              <div className="relative z-10 flex w-[48%] lg:w-[68%] flex-col justify-between p-6 sm:p-7">
                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    {company.name}
                  </p>
                  <h3 className="mt-4 font-heading text-2xl font-bold leading-[1.08] tracking-tight text-foreground transition-colors group-hover:text-primary xl:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-8 flex items-center gap-2 font-body text-sm font-medium text-muted-foreground xl:text-base">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>{project.location}</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
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
