import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { companies, type Company, type Project } from "@/data/companies";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type ProjectEntry = { project: Project; company: Company };

// Flatten every company's projects once, preserving authored order
// (company order as in data, then project order within each company).
const allProjectEntries: ProjectEntry[] = companies.flatMap((company) =>
  company.projects.map((project) => ({ project, company }))
);

const ProjectsShowcase = () => {
  const [activeCompanyId, setActiveCompanyId] = useState<string>("all");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

  const filtered = useMemo(
    () =>
      activeCompanyId === "all"
        ? allProjectEntries
        : allProjectEntries.filter((entry) => entry.company.id === activeCompanyId),
    [activeCompanyId]
  );

  const selectCompany = (id: string) => {
    setActiveCompanyId(id);
    setFocusedIndex(0);
  };

  const activeIndex = focusedIndex ?? 0;
  const currentEntry = filtered[activeIndex] ?? filtered[0];

  return (
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
              Filtra per azienda per esplorare i cantieri del gruppo, con evidenza di luogo, committente e importi ove disponibili.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <div
          role="group"
          aria-label="Filtra progetti per azienda"
          className="mb-10 flex flex-wrap gap-2 px-4 sm:px-0"
        >
          <button
            type="button"
            onClick={() => selectCompany("all")}
            aria-pressed={activeCompanyId === "all"}
            className={cn(
              "min-h-11 rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors md:text-sm",
              activeCompanyId === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            Tutte
          </button>
          {companies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => selectCompany(company.id)}
              aria-pressed={activeCompanyId === company.id}
              className={cn(
                "min-h-11 rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors md:text-sm",
                activeCompanyId === company.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {company.name}
            </button>
          ))}
        </div>

        <div className="grid gap-x-10 px-4 sm:px-0 lg:grid-cols-2 lg:items-start lg:gap-x-16">
          {/* Row list */}
          <div className="divide-y divide-border min-w-0">
            {filtered.map(({ project, company }, i) => (
              <Link
                key={`${company.id}-${project.title}`}
                to={`/azienda/${company.id}`}
                onClick={() => window.scrollTo(0, 0)}
                onMouseEnter={() => setFocusedIndex(i)}
                onFocus={() => setFocusedIndex(i)}
                className="group flex items-center justify-between gap-5 rounded-sm py-6 outline-none transition-colors focus-visible:bg-accent/40 sm:py-7"
              >
                <div className="min-w-0 flex-1">
                  <span className="micro-label mb-2 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="truncate">
                      {project.location} — {company.name}
                    </span>
                  </span>
                  <h3 className="font-heading text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {project.title}
                  </h3>
                </div>

                {/* Mobile/touch fallback: hover has no equivalent on touch, so show
                    a thumbnail inline per row instead of relying on the preview panel. */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-accent/60 sm:h-24 sm:w-24 lg:hidden">
                  {project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-1.5">
                      <span className="text-center font-mono text-[9px] uppercase leading-tight text-accent-foreground">
                        Archivio storico
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop-only large preview panel, driven by the hovered/focused row */}
          <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <div className="tech-frame aspect-[4/3] overflow-hidden rounded-md bg-accent/60">
              {currentEntry && currentEntry.project.images.length > 0 ? (
                <ProjectImageCarousel
                  key={`${currentEntry.company.id}-${currentEntry.project.title}`}
                  images={currentEntry.project.images}
                  alt={currentEntry.project.title}
                  className="h-full"
                  autoplayInterval={6000}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <p className="panel-title max-w-xs text-center text-accent-foreground">
                    Archivio storico Imprese Riunite
                  </p>
                </div>
              )}
            </div>

            {currentEntry && (
              <div className="mt-4 space-y-1.5 font-mono text-xs text-muted-foreground">
                <p className="truncate">
                  <span className="text-foreground/70">committente&gt;</span> {currentEntry.project.client}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {currentEntry.project.amount && (
                    <span>
                      <span className="text-foreground/70">importo&gt;</span> {currentEntry.project.amount}
                    </span>
                  )}
                  {currentEntry.project.date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {currentEntry.project.date}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <ScrollReveal fadeOut={false} mobileScaleRange={[1, 1, 1]}>
          <p className="section-copy mx-auto mt-10 max-w-xs px-4 text-center sm:max-w-none sm:px-0">
            Ogni progetto rimanda alla scheda completa dell'azienda che lo ha realizzato.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
