import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { operatingCompanies, type Company, type Project } from "@/data/companies";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { calculateDesktopCarouselLayout } from "@/lib/project-carousel-layout";
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
  const [desktopEndRunway, setDesktopEndRunway] = useState(0);
  const desktopListRef = useRef<HTMLDivElement>(null);
  const desktopRowRefs = useRef<Array<HTMLElement | null>>([]);
  const lastDesktopRowRef = useRef<HTMLElement | null>(null);
  const desktopPreviewRef = useRef<HTMLDivElement>(null);
  const desktopCarouselFrameRef = useRef<HTMLDivElement>(null);
  const desktopCarouselRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    let animationFrame = 0;
    let transitionTimer = 0;

    const applyLayout = (animate: boolean) => {
      const list =
        desktopListRef.current ??
        document.querySelector<HTMLElement>("[data-testid='desktop-project-list']");
      const lastRow =
        lastDesktopRowRef.current ??
        document.querySelector<HTMLElement>("[data-testid='desktop-last-project-row']");
      const activeRow =
        desktopRowRefs.current[activeIndex] ??
        list?.querySelector<HTMLElement>(`[data-project-index='${activeIndex}']`);
      const previewTrack =
        desktopPreviewRef.current ??
        document.querySelector<HTMLElement>("[data-testid='desktop-project-preview']");
      const carouselFrame =
        desktopCarouselFrameRef.current ??
        document.querySelector<HTMLElement>(
          "[data-testid='desktop-project-carousel-frame']"
        );
      const carousel = desktopCarouselRef.current ?? carouselFrame;

      if (
        !list ||
        !lastRow ||
        !activeRow ||
        !previewTrack ||
        !carouselFrame ||
        !carousel
      ) {
        return;
      }

      const rowRect = activeRow.getBoundingClientRect();
      const trackRect = previewTrack.getBoundingClientRect();
      const carouselHeight = carousel.getBoundingClientRect().height;
      const lastRowHeight = lastRow.getBoundingClientRect().height;
      const boundaryBottom =
        previewTrack.closest("section")?.getBoundingClientRect().bottom ??
        window.innerHeight;
      const navbarBottom =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const viewportMargin = 16;
      const { offset: nextOffset, runway: nextRunway } =
        calculateDesktopCarouselLayout({
          rowTop: rowRect.top,
          rowHeight: rowRect.height,
          trackTop: trackRect.top,
          trackHeight: trackRect.height,
          carouselHeight,
          navbarBottom,
          viewportHeight: window.innerHeight,
          lastRowHeight,
          isLastRowActive: activeIndex === filtered.length - 1,
          boundaryBottom,
          margin: viewportMargin,
        });

      window.clearTimeout(transitionTimer);
      carouselFrame.style.transition =
        animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "transform 180ms ease-out"
          : "none";
      carouselFrame.style.transform = `translate3d(0, ${nextOffset}px, 0)`;

      if (animate) {
        transitionTimer = window.setTimeout(() => {
          carouselFrame.style.transition = "none";
        }, 180);
      }

      setDesktopEndRunway((current) =>
        current === nextRunway ? current : nextRunway
      );
    };

    const scheduleLayout = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        applyLayout(false);
      });
    };

    const updateDuringScroll = () => scheduleLayout();

    applyLayout(true);
    window.addEventListener("scroll", updateDuringScroll, { passive: true });
    window.addEventListener("resize", updateDuringScroll);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateDuringScroll);

    const observedElements = [
      desktopRowRefs.current[activeIndex],
      lastDesktopRowRef.current,
      desktopPreviewRef.current,
      desktopCarouselRef.current ?? desktopCarouselFrameRef.current,
    ];

    observedElements.forEach((element) => {
      if (element) resizeObserver?.observe(element);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(transitionTimer);
      window.removeEventListener("scroll", updateDuringScroll);
      window.removeEventListener("resize", updateDuringScroll);
      resizeObserver?.disconnect();
    };
  }, [activeCompanyId, activeIndex, filtered.length]);

  return (
    <section
      id="progetti"
      className="section-shell bg-background lg:pb-8"
    >
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
                    imageLabels={project.imageLabels}
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
          {/* Desktop project selector and expandable facts. */}
          <div
            ref={desktopListRef}
            data-testid="desktop-project-list"
            className="min-w-0 border-t border-border"
            style={{ paddingBottom: desktopEndRunway }}
          >
            {filtered.map(({ project, company }, i) => {
              const isActive = i === activeIndex;
              const detailsId = `desktop-project-details-${i}`;

              return (
                <article
                  key={`${company.id}-${project.title}`}
                  ref={(element) => {
                    desktopRowRefs.current[i] = element;
                    if (i === filtered.length - 1) {
                      lastDesktopRowRef.current = element;
                    }
                  }}
                  data-project-index={i}
                  data-testid={
                    i === filtered.length - 1
                      ? "desktop-last-project-row"
                      : undefined
                  }
                  className={cn(
                    "border-b border-border transition-colors",
                    isActive &&
                      "rounded-md border-primary/30 bg-accent/30 shadow-sm"
                  )}
                >
                  <button
                    type="button"
                    data-testid={`desktop-project-select-${i}`}
                    onClick={() => setFocusedIndex(i)}
                    aria-expanded={isActive}
                    aria-controls={isActive ? detailsId : undefined}
                    className="flex w-full items-center justify-between gap-5 rounded-md px-4 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:py-7"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="micro-label mb-2 flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="truncate">
                          {project.location} — {company.name}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "block font-heading text-2xl font-bold leading-tight transition-colors md:text-3xl xl:text-4xl",
                          isActive
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {project.title}
                      </span>
                    </span>
                  </button>

                  {isActive && (
                    <div id={detailsId} className="px-4 pb-7">
                      <p className="font-body leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <dl
                        data-testid="desktop-project-facts"
                        className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 font-body"
                      >
                        <div className="min-w-0">
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                            Committente
                          </dt>
                          <dd className="mt-1.5 font-semibold leading-snug text-foreground">
                            {project.client}
                          </dd>
                        </div>

                        {project.amount && (
                          <div>
                            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                              {project.amountLabel ?? "Importo"}
                            </dt>
                            <dd className="mt-1.5 font-heading text-lg font-bold tabular-nums text-foreground">
                              {project.amount}
                              {project.amountNote && " *"}
                            </dd>
                            {project.amountNote && (
                              <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                * {project.amountNote}
                              </dd>
                            )}
                          </div>
                        )}

                        {project.details?.map(({ label, value }) => (
                          <div key={label} className="col-span-2">
                            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                              {label}
                            </dt>
                            <dd className="mt-1.5 leading-relaxed text-foreground">
                              {value}
                            </dd>
                          </div>
                        ))}

                        {project.date && (
                          <div className="col-span-2">
                            <dt className="sr-only">Data</dt>
                            <dd className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <Calendar className="h-4 w-4 text-primary" />
                              {project.date}
                            </dd>
                          </div>
                        )}
                      </dl>

                      <Link
                        to={`/azienda/${company.id}`}
                        className="mt-5 inline-flex min-h-11 items-center rounded-md font-body text-sm font-bold uppercase tracking-[0.12em] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        Vai alla scheda di {company.name}
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Sticky viewport track; frame follows the active row's vertical center. */}
          <div
            ref={desktopPreviewRef}
            data-testid="desktop-project-preview"
            className="relative hidden lg:sticky lg:top-[var(--site-navbar-height)] lg:block lg:h-[calc(100svh-var(--site-navbar-height))] lg:self-start lg:overflow-hidden"
          >
            <div
              ref={desktopCarouselFrameRef}
              data-testid="desktop-project-carousel-frame"
              className="tech-frame aspect-[4/3] overflow-hidden rounded-md bg-accent/60"
              style={{ willChange: "transform" }}
            >
              {currentEntry && currentEntry.project.images.length > 0 ? (
                <ProjectImageCarousel
                  ref={desktopCarouselRef}
                  key={`${currentEntry.company.id}-${currentEntry.project.title}`}
                  images={currentEntry.project.images}
                  imageLabels={currentEntry.project.imageLabels}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
