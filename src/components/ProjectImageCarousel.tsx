import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImageCarouselProps {
  images: string[];
  imageLabels?: string[];
  alt: string;
  className?: string;
  autoplayInterval?: number;
  indicatorVariant?: "dots" | "counter";
  autoplay?: boolean;
  eagerFirstImage?: boolean;
}

const ProjectImageCarousel = ({
  images,
  imageLabels,
  alt,
  className,
  autoplayInterval = 4000,
  indicatorVariant = "dots",
  autoplay = true,
  eagerFirstImage = true,
}: ProjectImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (
      !autoplay ||
      interactionPaused ||
      reducedMotion ||
      images.length <= 1
    ) {
      return;
    }
    const id = setInterval(next, autoplayInterval);
    return () => clearInterval(id);
  }, [
    autoplay,
    interactionPaused,
    reducedMotion,
    next,
    autoplayInterval,
    images.length,
  ]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn("relative overflow-hidden group/carousel", className)}
      role="region"
      aria-label={`Galleria immagini: ${alt}`}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocus={() => setInteractionPaused(true)}
      onBlur={() => setInteractionPaused(false)}
      onTouchStart={() => setInteractionPaused(true)}
      onTouchEnd={() => setInteractionPaused(false)}
      onTouchCancel={() => setInteractionPaused(false)}
    >
      {/* Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt}${imageLabels?.[i] ? ` — ${imageLabels[i]}` : ""} - ${i + 1}`}
            aria-hidden={i !== current}
            className="w-full h-full object-cover shrink-0"
            loading={i === 0 && eagerFirstImage ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const parent = el.parentElement;
              if (parent && !parent.querySelector(".img-fallback")) {
                const ph = document.createElement("div");
                ph.className =
                  "img-fallback flex h-full w-full shrink-0 items-center justify-center bg-accent px-4 text-center font-body text-xs uppercase tracking-wide text-accent-foreground";
                ph.textContent = "Foto non disponibile";
                parent.appendChild(ph);
              }
            }}
          />
        ))}
      </div>

      {imageLabels?.[current] && (
        <span
          data-testid="project-image-label"
          className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          {imageLabels[current]}
        </span>
      )}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className={cn(
              "absolute left-2 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/55 p-2 text-white transition-opacity hover:bg-black/75",
              indicatorVariant === "counter"
                ? "opacity-100"
                : "opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:focus-visible:opacity-100"
            )}
            aria-label="Foto precedente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className={cn(
              "absolute right-2 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/55 p-2 text-white transition-opacity hover:bg-black/75",
              indicatorVariant === "counter"
                ? "opacity-100"
                : "opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:focus-visible:opacity-100"
            )}
            aria-label="Foto successiva"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {indicatorVariant === "dots" ? (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  className={cn(
                    "flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all before:block before:h-2 before:w-2 before:rounded-full before:content-['']",
                    i === current ? "bg-white/20 before:bg-white" : "bg-transparent before:bg-white/60"
                  )}
                  aria-current={i === current ? "true" : undefined}
                  aria-label={`Vai alla foto ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <span
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2.5 py-1 font-body text-xs font-medium tabular-nums text-white"
              aria-live="polite"
              aria-atomic="true"
            >
              {current + 1} / {images.length}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
