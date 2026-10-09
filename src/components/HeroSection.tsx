import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroStaticBg from "@/assets/hero-static-bg.webp";

const NAME = "Imprese Riunite";
const LETTER_STAGGER = 0.045;
const LETTER_DURATION = 0.4;
const TITLE_TRANSITION = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

const isReducedMotionPreferred = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: LETTER_DURATION, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const nameContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: LETTER_STAGGER } },
};

const AnimatedName = () => (
  <span aria-hidden="true">
    {NAME.split("").map((letter, index) => (
      <motion.span
        key={`${letter}-${index}`}
        variants={letterVariants}
        className="inline-block whitespace-pre"
      >
        {letter}
      </motion.span>
    ))}
  </span>
);

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(isReducedMotionPreferred);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 1]);
  const titleTransition = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : TITLE_TRANSITION),
    [prefersReducedMotion]
  );

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        id="home"
        className="tech-frame relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
      >
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { scale: bgScale }}
        >
          <img
            src={heroStaticBg}
            alt="Cantiere edile, gru al tramonto in toni blu"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90"
          style={prefersReducedMotion ? undefined : { opacity: overlayOpacity }}
        />

        <LayoutGroup id="hero-title-transition">
          <AnimatePresence mode="sync">
            {!introComplete && !prefersReducedMotion ? (
              <motion.div
                key="intro"
                className="absolute inset-0 z-10 flex items-center justify-center px-6"
                exit={{ opacity: 1 }}
              >
                <motion.h1
                  layoutId="hero-title"
                  aria-label={NAME}
                  className="whitespace-nowrap text-center font-heading text-[clamp(1.9rem,9.4vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] sm:text-6xl md:text-8xl lg:text-9xl"
                  initial="hidden"
                  animate="visible"
                  variants={nameContainerVariants}
                  transition={titleTransition}
                  onAnimationComplete={() => setIntroComplete(true)}
                >
                  <AnimatedName />
                </motion.h1>
              </motion.div>
            ) : (
              <motion.div
                key="hero"
                className="relative z-10 flex min-h-screen w-full items-center justify-center"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0 }}
              >
                <motion.div
                  className="relative container text-center"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { y: textY, scale: textScale, opacity: textOpacity }
                  }
                >
                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }}
                    className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-sky-300 sm:text-base"
                  >
                    Roma · dal 1976
                  </motion.p>

                  <motion.h1
                    layoutId="hero-title"
                    aria-label={NAME}
                    initial={prefersReducedMotion ? false : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={titleTransition}
                    className="mb-4 whitespace-nowrap text-[clamp(1.9rem,9.4vw,2.25rem)] font-heading font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:mb-8 sm:text-6xl md:text-8xl lg:text-9xl"
                  >
                    {NAME}
                  </motion.h1>

                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6 }}
                    className="mx-auto mb-8 max-w-5xl px-2 font-body text-base leading-relaxed text-white/90 sm:px-4 sm:text-xl md:text-2xl xl:text-3xl"
                  >
                    Costruzioni, infrastrutture e impiantistica: oltre 50 anni di grandi opere civili al servizio del territorio.
                  </motion.p>

                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.9 }}
                    className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5"
                  >
                    <a
                      href="#aziende"
                      className="inline-block rounded-xl bg-primary px-6 py-3 font-heading text-base font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:px-8 sm:py-3.5 sm:text-lg"
                    >
                      Scopri le aziende
                    </a>
                    <a
                      href="#storia"
                      className="inline-block rounded-xl border border-white/40 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-lg"
                    >
                      La nostra storia
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                  style={prefersReducedMotion ? undefined : { opacity: textOpacity }}
                >
                  <a
                    href="#chi-siamo"
                    aria-label="Vai alla sezione Chi siamo"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full"
                  >
                    <ChevronDown
                      className={`h-6 w-6 text-white/60 ${
                        prefersReducedMotion ? "" : "animate-bounce"
                      }`}
                    />
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>
    </>
  );
};

export default HeroSection;
