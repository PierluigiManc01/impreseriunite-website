import { Fragment } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { history } from "@/data/companies";
import { cn } from "@/lib/utils";

import cantiere from "@/assets/cantiere.webp";
import iso from "@/assets/logo-iso-01.webp";
import soa from "@/assets/logo-soa.jpg";
import sa from "@/assets/SA-logo.webp";
import international from "@/assets/internazionali.jpg";
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
  capability: string;
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
    capability: "Esperienza internazionale",
    historyText: history.timeline[0].desc,
    historyShort: history.timeline[0].short ?? history.timeline[0].desc,
    capabilityText:
      "Dal 1976 il gruppo opera nelle grandi opere civili, marittime e idrauliche. Ha realizzato progetti di rilevanza internazionale in <strong>Arabia Saudita</strong>, tra cui il Viadotto Muzdalifah, il Raccordo Anulare di Riyadh e la Facoltà di Ingegneria di Jeddah; e in Italia il <strong>Porto Turistico Riva di Traiano</strong>.",
    capabilityShort:
      "Dalle origini, grandi opere civili, marittime e idrauliche in <strong>Arabia Saudita</strong> e in Italia.",
    visual: {
      kind: "image",
      src: international,
      alt: "Progetti internazionali del gruppo Imprese Riunite",
      caption: "Arabia Saudita · Italia",
    },
  },
  {
    year: history.timeline[1].year,
    milestone: history.timeline[1].title,
    capability: "Opere pubbliche",
    historyText: history.timeline[1].desc,
    historyShort: history.timeline[1].short ?? history.timeline[1].desc,
    capabilityText:
      "La nuova fase consolida collaborazioni con Roma Capitale, Ministeri della Giustizia e della Difesa ed <strong>ENAV</strong>. Il gruppo realizza strutture detentive, sedi istituzionali e infrastrutture strategiche come la pista di <strong>Ronchi dei Legionari</strong>.",
    capabilityShort:
      "Costruzioni Angelico diventa riferimento per istituzioni, strutture detentive e infrastrutture nazionali.",
    visual: {
      kind: "image",
      src: cantiere,
      alt: "Cantiere di una grande opera pubblica",
      caption: "Costruzioni Angelico",
    },
  },
  {
    year: history.timeline[2].year,
    milestone: history.timeline[2].title,
    capability: "Impiantistica avanzata",
    historyText: history.timeline[2].desc,
    historyShort: history.timeline[2].short ?? history.timeline[2].desc,
    capabilityText:
      "Nuova C.C.S. sviluppa competenze in impianti fotovoltaici, gruppi elettrogeni e di continuità, cabine di trasformazione MT/BT, sicurezza, illuminazione e autonomia industriale.",
    capabilityShort:
      "Energia, continuità e tecnologia: fotovoltaico, cabine MT/BT, sicurezza e illuminazione.",
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
    capability: "Qualità certificata",
    historyText: history.timeline[3].desc,
    historyShort: history.timeline[3].short ?? history.timeline[3].desc,
    capabilityText:
      "Competenze integrate e leadership familiare sono sostenute dalle principali certificazioni di settore, a garanzia di qualità, sicurezza, responsabilità sociale e solidità operativa.",
    capabilityShort:
      "Team specializzato e standard certificati per qualità, sicurezza e responsabilità sociale.",
    visual: {
      kind: "certifications",
      caption: "Standard di gruppo",
    },
  },
];

const renderRichText = (text: string) =>
  text.split(/(<strong>.*?<\/strong>)/g).map((part, index) => {
    const strongMatch = part.match(/^<strong>(.*?)<\/strong>$/);

    if (strongMatch) {
      return (
        <strong key={`${strongMatch[1]}-${index}`} className="font-semibold text-foreground">
          {strongMatch[1]}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part.replace(/<[^>]*>/g, "")}</Fragment>;
  });

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
            <p className="section-eyebrow mb-4">Chi siamo · La nostra storia</p>
            <h2 className="section-title max-w-6xl">
              La storia che costruisce chi siamo
            </h2>
          </div>
          <p className="section-copy max-w-xl lg:pb-1">
            Quattro capitoli intrecciano origini, competenze e risultati: oltre cinquant'anni di
            esperienza al servizio del territorio.
          </p>
        </header>
      </ScrollReveal>

      <div className="relative mt-10 grid gap-5 px-4 before:absolute before:bottom-20 before:left-[7.5rem] before:top-12 before:hidden before:w-px before:bg-gradient-to-b before:from-primary before:via-primary/35 before:to-border before:content-[''] sm:px-0 lg:mt-16 lg:block lg:before:block">
        {storyChapters.map((chapter, index) => {
          const isEven = index % 2 === 0;

          return (
            <ScrollReveal
              key={chapter.year}
              scaleRange={[0.98, 1, 1]}
              mobileScaleRange={[0.99, 1, 1]}
              fadeOut={false}
            >
              <article
                className={cn(
                  "relative grid gap-5 overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--card-shadow)] sm:p-7 lg:min-h-[36rem] lg:overflow-visible lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:bg-transparent lg:p-0 lg:py-20 lg:shadow-none lg:first:border-t-0 lg:items-center lg:gap-10 xl:gap-16",
                  isEven
                    ? "lg:grid-cols-[7.5rem_minmax(0,0.82fr)_minmax(0,1.18fr)]"
                    : "lg:grid-cols-[7.5rem_minmax(0,1.18fr)_minmax(0,0.82fr)]"
                )}
              >
                <div className="relative order-1 whitespace-nowrap font-heading text-4xl font-extrabold tabular-nums tracking-tight text-primary lg:w-full lg:self-start lg:pr-6 lg:pt-2 lg:text-right lg:text-5xl">
                  {chapter.year}
                </div>

                <div
                  className={cn(
                    "contents lg:row-start-1 lg:block lg:max-w-2xl",
                    isEven ? "lg:col-start-2" : "lg:col-start-3"
                  )}
                >
                  <div className="order-2">
                    <p className="mb-2 font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.16em]">
                      {chapter.milestone}
                    </p>
                    <h3 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl xl:text-5xl">
                      {chapter.capability}
                    </h3>
                  </div>

                  <div className="order-4 space-y-3 font-body text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:space-y-4 sm:text-lg">
                    <p>
                      <span className="md:hidden">{chapter.historyShort}</span>
                      <span className="hidden md:inline">{chapter.historyText}</span>
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
