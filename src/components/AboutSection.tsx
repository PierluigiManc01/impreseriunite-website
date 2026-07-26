import ScrollReveal from "@/components/ScrollReveal";
import { history } from "@/data/companies";
import { cn } from "@/lib/utils";
import { renderRichText } from "@/lib/render-rich-text";

import cantiere from "@/assets/cantiere.webp";
import iso from "@/assets/logo-iso-01.webp";
import soa from "@/assets/logo-soa.jpg";
import sa from "@/assets/SA-logo.webp";
import rivaDiTraiano from "@/assets/riva-di-traiano.webp";
import dataCenter from "@/assets/data_center.jpg";

type ChapterVisual =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      kind: "certifications";
      caption: string;
    };

type StoryChapter = {
  year: string;
  milestone: string;
  historyText: string;
  historyShort: string;
  capabilityText: string;
  capabilityShort: string;
  visual: ChapterVisual;
};

const storyChapters: StoryChapter[] = [
  {
    year: history.timeline[0].year,
    milestone: history.timeline[0].title,
    historyText: history.timeline[0].desc,
    historyShort: history.timeline[0].short ?? history.timeline[0].desc,
    capabilityText:
      "Il gruppo opera nelle grandi opere civili, stradali e idrauliche, realizzando progetti di rilevanza nazionale e soprattutto internazionale. Ne sono esempi le opere realizzate in <strong>Arabia Saudita</strong>, tra cui il Viadotto Muzdalifah, il Raccordo Anulare di Riyadh e la Facoltà di Ingegneria di Jeddah.",
    capabilityShort:
      "Dalle origini, grandi opere civili, stradali e idrauliche in <strong>Arabia Saudita</strong> e in Italia.",
    visual: {
      kind: "image",
      src: cantiere,
      alt: "Cantiere di una grande opera pubblica",
      caption: "Costruzioni Angelico",
    },
  },
  {
    year: history.timeline[1].year,
    milestone: history.timeline[1].title,
    historyText: history.timeline[1].desc,
    historyShort: history.timeline[1].short ?? history.timeline[1].desc,
    capabilityText:
      "Tra le realizzazioni più notevoli, spiccano la ristrutturazione della <strong>Mole Antonelliana</strong> a Torino, il <strong>Porto Turistico Riva di Traiano</strong> a Civitavecchia e la realizzazione di infrastrutture per il settore della difesa e della sicurezza.",
    capabilityShort:
      "Costruzioni Angelico diventa riferimento per istituzioni, strutture detentive e infrastrutture nazionali.",
    visual: {
      kind: "image",
      src: rivaDiTraiano,
      alt: "Veduta aerea del Porto Turistico Riva di Traiano a Civitavecchia",
      caption: "Porto Turistico, Civitavecchia",
    },
  },
  {
    year: history.timeline[2].year,
    milestone: history.timeline[2].title,
    historyText: history.timeline[2].desc,
    historyShort: history.timeline[2].short ?? history.timeline[2].desc,
    capabilityText:
      "La società si impone come leader del settore per la realizzazione di <strong>impianti fotovoltaici</strong>, gruppi elettrogeni e di continuità, cabine di trasformazione MT/BT, sicurezza, illuminazione e autonomia industriale.",
    capabilityShort:
      "La società si impone come leader nell'installazione di impianti <strong>fotovoltaici</strong>, sicurezza e illuminazione e di cabine MT/BT.",
    visual: {
      kind: "image",
      src: dataCenter,
      alt: "Impiantistica avanzata in un data center",
      caption: "Nuova C.C.S.",
    },
  },
  {
    year: history.timeline[3].year,
    milestone: history.timeline[3].title,
    historyText: history.timeline[3].desc,
    historyShort: history.timeline[3].short ?? history.timeline[3].desc,
    capabilityText:
      "Negli ultimi anni il gruppo ha dato vita ad un nuova fase di collaborazioni con <strong>Roma Capitale, Ministeri della Giustizia e della Difesa ed ENAV</strong> per la realizzazione di strutture detentive, sedi istituzionali e infrastrutture strategiche per il paese.",
    capabilityShort:
      "Team specializzato e standard <strong>certificati per qualità, sicurezza e responsabilità sociale</strong>.",
    visual: {
      kind: "certifications",
      caption: "Standard di gruppo",
    },
  },
];

const ChapterVisualPanel = ({ chapter }: { chapter: StoryChapter }) => {
  if (chapter.visual.kind === "certifications") {
    return (
      <figure className="grid min-h-0 place-items-center py-2 md:aspect-[4/3] md:min-h-96 md:py-0">
        <div className="grid w-full grid-cols-3 gap-2 md:gap-4">
          {[
            { src: iso, alt: "ISO 9001" },
            { src: sa, alt: "SA 8000" },
            { src: soa, alt: "SOA" },
          ].map((certification) => (
            <div
              key={certification.alt}
              className="flex min-h-24 items-center justify-center rounded-xl border border-border/70 bg-background p-3 transition-colors hover:border-primary/30 md:min-h-40 md:bg-card md:p-6"
            >
              <img
                src={certification.src}
                alt={certification.alt}
                className="h-10 w-full object-contain md:h-20"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </figure>
    );
  }

  return (
    <figure className="group relative aspect-[5/4] min-h-0 overflow-hidden rounded-xl border border-border/70 bg-card shadow-[var(--card-shadow)] md:aspect-[4/3] md:min-h-96 md:rounded-2xl">
      <img
        src={chapter.visual.src}
        alt={chapter.visual.alt}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        loading="lazy"
        decoding="async"
      />

      <figcaption className="absolute bottom-3 right-3 rounded-xl bg-foreground/85 px-3 py-2 font-body text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary-foreground backdrop-blur-md md:bottom-4 md:right-4 md:px-4 md:text-xs md:tracking-[0.14em]">
        {chapter.visual.caption}
      </figcaption>
    </figure>
  );
};

const AboutSection = () => (
  <section
    id="chi-siamo"
    className="relative overflow-hidden bg-background pb-16 pt-14 md:pb-24 md:pt-20"
  >
    <span id="storia" className="absolute top-0 scroll-mt-28" aria-hidden="true" />

    <div className="container">
      <ScrollReveal>
        <header className="grid items-end gap-7 px-4 sm:px-0 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div>
            <p className="section-eyebrow mb-4">Chi siamo</p>
            <h2 className="section-title max-w-6xl">
              La storia che costruisce chi siamo
            </h2>
          </div>
          <p className="section-copy max-w-xl lg:pb-1">
            Quattro capitoli intrecciano origini, competenze e risultati: cinquant'anni di
            esperienza al servizio del territorio.
          </p>
        </header>
      </ScrollReveal>

      <div className="relative mt-10 grid gap-5 px-4 before:absolute before:bottom-20 before:left-[7.5rem] before:top-12 before:hidden before:w-px before:bg-gradient-to-b before:from-primary before:via-primary/35 before:to-border before:content-[''] sm:px-0 lg:mt-16 lg:block lg:before:block xl:before:left-[10rem] 2xl:before:left-[12rem]">
        {storyChapters.map((chapter, index) => {
          const isEven = index % 2 === 0;

          return (
            <ScrollReveal
              key={chapter.year}
              initialScale={0.98}
              mobileInitialScale={0.99}
            >
              <article
                className={cn(
                  "relative grid gap-5 overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--card-shadow)] sm:p-7 lg:min-h-[36rem] lg:overflow-visible lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:bg-transparent lg:p-0 lg:py-20 lg:shadow-none lg:first:border-t-0 lg:items-center lg:gap-10 xl:min-h-[42rem] xl:gap-16 xl:py-24 2xl:min-h-[46rem]",
                  isEven
                    ? "lg:grid-cols-[7.5rem_minmax(0,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[10rem_minmax(0,0.82fr)_minmax(0,1.18fr)] 2xl:grid-cols-[12rem_minmax(0,0.82fr)_minmax(0,1.18fr)]"
                    : "lg:grid-cols-[7.5rem_minmax(0,1.18fr)_minmax(0,0.82fr)] xl:grid-cols-[10rem_minmax(0,1.18fr)_minmax(0,0.82fr)] 2xl:grid-cols-[12rem_minmax(0,1.18fr)_minmax(0,0.82fr)]"
                )}
              >
                <div className="relative order-1 whitespace-nowrap font-heading text-4xl font-extrabold tabular-nums tracking-tight text-primary lg:w-full lg:self-start lg:pr-6 lg:pt-2 lg:text-right lg:text-5xl xl:pr-10 xl:text-6xl 2xl:pr-12 2xl:text-7xl">
                  {chapter.year}
                </div>

                <div
                  className={cn(
                    "contents lg:row-start-1 lg:block lg:max-w-2xl",
                    isEven ? "lg:col-start-2" : "lg:col-start-3"
                  )}
                >
                  <div className="order-2">
                    <h3 className="font-body text-[1.75rem] font-bold uppercase leading-[1.05] tracking-[0.08em] text-primary sm:text-4xl sm:tracking-[0.1em] xl:text-6xl 2xl:text-7xl">
                      {chapter.milestone}
                    </h3>
                  </div>

                  <div className="order-4 space-y-3 font-body text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:space-y-4 sm:text-lg xl:mt-8 xl:text-xl 2xl:text-2xl">
                    <p>
                      <span className="md:hidden">{renderRichText(chapter.historyShort)}</span>
                      <span className="hidden md:inline">{renderRichText(chapter.historyText)}</span>
                    </p>
                    <p>
                      <span className="md:hidden">{renderRichText(chapter.capabilityShort)}</span>
                      <span className="hidden md:inline">{renderRichText(chapter.capabilityText)}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "order-3 lg:row-start-1",
                    isEven ? "lg:col-start-3" : "lg:col-start-2"
                  )}
                >
                  <ChapterVisualPanel chapter={chapter} />
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default AboutSection;
