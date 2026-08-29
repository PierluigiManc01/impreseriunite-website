import { useReducedMotion } from "framer-motion";
import AboutStoryCard from "@/components/AboutStoryCard";
import AboutStoryHeader from "@/components/AboutStoryHeader";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { storyChapters } from "@/data/about-story";
import { useIsMobile } from "@/hooks/use-mobile";


const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="chi-siamo" className="relative bg-background">
      <span
        id="storia"
        className="absolute top-0 scroll-mt-28"
        aria-hidden="true"
      />

      <div className="container pt-14 md:pt-20 xl:pt-0">
        <AboutStoryHeader />
      </div>

      <ScrollStack
        className="about-scroll-stack"
        itemDistance={isMobile ? 70 : 80}
        itemScale={isMobile ? 0.01 : 0.035}
        itemStackDistance={isMobile ? 20 : 24}
        stackPosition={isMobile ? "17%" : "12%"}
        scaleEndPosition={isMobile ? "40%" : "0%"}
        baseScale={isMobile ? 0.85 : 0.95}
        blurAmount={0.25}
        useWindowScroll
        disabled={Boolean(prefersReducedMotion)}
      >
        {storyChapters.map((chapter, index) => (
          <ScrollStackItem
            key={chapter.year}
            itemClassName="about-scroll-stack-card"
          >
            <AboutStoryCard chapter={chapter} index={index} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default AboutSection;
