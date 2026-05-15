import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoplayInterval?: number;
}

const ProjectImageCarousel = ({
  images,
  alt,
  className,
  autoplayInterval = 4000,
}: ProjectImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(next, autoplayInterval);
    return () => clearInterval(id);
  }, [paused, next, autoplayInterval, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn("relative overflow-hidden group/carousel", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
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
            alt={`${alt} - ${i + 1}`}
            className="w-full h-full object-cover shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 min-h-10 min-w-10 -translate-y-1/2 touch-manipulation rounded-full bg-black/55 p-2 text-white opacity-100 transition-opacity hover:bg-black/75 sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:focus-visible:opacity-100"
            aria-label="Foto precedente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 min-h-10 min-w-10 -translate-y-1/2 touch-manipulation rounded-full bg-black/55 p-2 text-white opacity-100 transition-opacity hover:bg-black/75 sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:focus-visible:opacity-100"
            aria-label="Foto successiva"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  i === current ? "bg-white w-5" : "bg-white/60"
                )}
                aria-label={`Vai alla foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
