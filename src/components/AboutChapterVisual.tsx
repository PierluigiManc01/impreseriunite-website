import iso from "@/assets/logo-iso-01.webp";
import soa from "@/assets/logo-soa.jpg";
import sa from "@/assets/SA-logo.webp";
import type { StoryChapter } from "@/data/about-story";

const AboutChapterVisual = ({ chapter }: { chapter: StoryChapter }) => {
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
              className="flex min-h-24 items-center justify-center rounded-xl border border-white/50 bg-white p-3 transition-transform duration-300 hover:-translate-y-1 md:min-h-40 md:p-6"
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
    <figure className="group relative aspect-[5/4] min-h-0 overflow-hidden rounded-xl border border-white/25 bg-card shadow-[var(--card-shadow)] md:aspect-[4/3] md:min-h-96 md:rounded-2xl">
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

export default AboutChapterVisual;
