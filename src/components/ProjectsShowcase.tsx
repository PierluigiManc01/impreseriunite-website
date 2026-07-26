import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { operatingCompanies, type Company, type Project } from "@/data/companies";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type ProjectEntry = { project: Project; company: Company };

// The showcase only covers the two operating companies.
// Flatten the showcased companies' projects once, preserving authored order
// (company order as in data, then project order within each company).
const allProjectEntries: ProjectEntry[] = operatingCompanies.flatMap((company) =>
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
          <div className="mb-8 px-4 sm:px-0">
            <p className="section-eyebrow mb-3">Progetti</p>
            <h1 className="section-title max-w-6xl">
              Cantieri e risultati verificabili
            </h1>
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
              "min-h-11 rounded-xl px-5 py-2 font-body text-sm font-medium uppercase tracking-[0.12em] transition-colors md:text-base",
              activeCompanyId === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            Tutte
          </button>
          {operatingCompanies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => selectCompany(company.id)}
              aria-pressed={activeCompanyId === company.id}
              className={cn(
                "min-h-11 rounded-xl px-5 py-2 font-body text-sm font-medium uppercase tracking-[0.12em] transition-colors md:text-base",
                activeCompanyId === company.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {company.name}
            </button>
          ))}
        </div>

        {/* Mobile/tablet cards: each project carries its own gallery and facts. */}
        <div className="grid gap-5 px-4 sm:grid-cols-2 sm:px-0 lg:hidden">
          {filtered.map(({ project, company }, i) => (
            <article
              key={`${company.id}-${project.title}`}
              data-testid="mobile-project-card"
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="aspect-video overflow-hidden bg-accent/60">
                {project.images.length > 0 ? (
                  <ProjectImageCarousel
                    images={project.images}
                    alt={project.title}
                    className="h-full"
                    indicatorVariant="counter"
                    autoplay={false}
                    eagerFirstImage={i === 0}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6">
                    <p className="micro-label text-center text-accent-foreground">
                      Archivio storico
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <p className="micro-label mb-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{project.location} — {company.name}</span>
                </p>

                <h3 className="font-heading text-xl font-bold leading-tight text-foreground sm:text-2xl">
                  <Link
                    to={`/azienda/${company.id}`}
                    className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <dl className="mt-4 grid gap-3 border-t border-border pt-4 font-body text-sm">
                  <div>
                    <dt className="micro-label text-muted-foreground">Committente</dt>
                    <dd className="mt-1 leading-snug text-foreground">{project.client}</dd>
                  </div>
                  {project.details?.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="micro-label text-muted-foreground">{label}</dt>
                      <dd className="mt-1 leading-snug text-foreground">{value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="micro-label text-muted-foreground">
                      {project.amountLabel ?? "Importo"}
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums text-foreground">
                      {project.amount || "Non disponibile"}
                      {project.amountNote && " *"}
                    </dd>
                    {project.amountNote && (
                      <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        * {project.amountNote}
                      </dd>
                    )}
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden gap-x-10 px-4 sm:px-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16">
          {/* Row list */}
          <div className="divide-y divide-border min-w-0">
            {filtered.map(({ project, company }, i) => (
              <Link
                key={`${company.id}-${project.title}`}
                to={`/azienda/${company.id}`}
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
                  <h3 className="font-heading text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-3xl xl:text-4xl">
                    {project.title}
                  </h3>
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
              <dl
                data-testid="desktop-project-facts"
                className="mt-5 grid grid-cols-[minmax(0,1fr)_max-content] gap-x-8 gap-y-4 border-t border-border pt-5 font-body"
              >
                <div className="col-span-2">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    Oggetto
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-muted-foreground">
                    {currentEntry.project.description}
                  </dd>
                </div>

                <div className="min-w-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    Committente
                  </dt>
                  <dd className="mt-1.5 text-lg font-semibold leading-snug text-foreground xl:text-xl">
                    {currentEntry.project.client}
                  </dd>
                </div>

                {currentEntry.project.amount && (
                  <div className="text-right">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {currentEntry.project.amountLabel ?? "Importo"}
                    </dt>
                    <dd className="mt-1.5 whitespace-nowrap font-heading text-xl font-bold tabular-nums text-foreground xl:text-2xl">
                      {currentEntry.project.amount}
                      {currentEntry.project.amountNote && " *"}
                    </dd>
                    {currentEntry.project.amountNote && (
                      <dd className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
                        * {currentEntry.project.amountNote}
                      </dd>
                    )}
                  </div>
                )}

                {currentEntry.project.details?.map(({ label, value }) => (
                  <div key={label} className="col-span-2">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {label}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}

                {currentEntry.project.date && (
                  <div className="col-span-2">
                    <dt className="sr-only">Data</dt>
                    <dd className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      {currentEntry.project.date}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>

        <ScrollReveal mobileInitialScale={1}>
          <p className="section-copy mx-auto mt-10 max-w-xs px-4 text-center sm:max-w-none sm:px-0">
            Ogni progetto rimanda alla scheda completa dell'azienda che lo ha realizzato.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
