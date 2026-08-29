import AboutChapterVisual from "@/components/AboutChapterVisual";
import type { StoryChapter } from "@/data/about-story";
import { cn } from "@/lib/utils";
import { renderRichText } from "@/lib/render-rich-text";

interface AboutStoryCardProps {
  chapter: StoryChapter;
  index: number;
  className?: string;
}

const AboutStoryCard = ({
  chapter,
  index,
  className,
}: AboutStoryCardProps) => {
  const isEven = index % 2 === 0;
  const isBlue = index % 2 === 1;

  return (
    <article
      className={cn(
        "grid h-full items-center gap-5 overflow-hidden rounded-2xl border p-5 transition-colors duration-500 sm:p-7 lg:gap-10 lg:p-10 xl:gap-14 xl:p-14",
        isBlue
          ? "border-primary bg-primary shadow-[0_24px_70px_-32px_hsl(var(--primary)/0.65)]"
          : "border-border/70 bg-card shadow-[var(--card-shadow)]",
        isEven
          ? "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
          : "lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-0 flex-col",
          isEven ? "lg:col-start-1" : "lg:col-start-2",
        )}
      >
        <p
          className={cn(
            "about-story-year mb-3 font-story text-3xl font-bold tabular-nums tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]",
            isBlue ? "text-white" : "text-primary",
          )}
        >
          {chapter.year}
        </p>
        <h3
          className={cn(
            "about-story-milestone max-w-2xl font-story text-2xl font-bold leading-[1.08] tracking-[-0.025em] sm:text-3xl lg:text-[2.35rem] xl:text-[2.75rem]",
            isBlue ? "text-white/80" : "text-[#17324d]",
          )}
        >
          {chapter.milestone}
        </h3>

        <div
          className={cn(
            "about-story-copy mt-5 space-y-3 font-body text-[0.95rem] leading-relaxed sm:mt-6 sm:space-y-4 sm:text-lg xl:mt-7 xl:text-xl [&_strong]:text-inherit",
            isBlue ? "text-white" : "text-muted-foreground",
          )}
        >
          <p>
            <span className="md:hidden">
              {renderRichText(chapter.historyShort)}
            </span>
            <span className="hidden md:inline">
              {renderRichText(chapter.historyText)}
            </span>
          </p>
          <p>
            <span className="md:hidden">
              {renderRichText(chapter.capabilityShort)}
            </span>
            <span className="hidden md:inline">
              {renderRichText(chapter.capabilityText)}
            </span>
          </p>
        </div>
      </div>

      <div
        className={cn(
          "min-w-0",
          isEven ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1 lg:row-start-1",
        )}
      >
        <AboutChapterVisual chapter={chapter} />
      </div>
    </article>
  );
};

export default AboutStoryCard;
