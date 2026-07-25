import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { hasIntroPlayed, markIntroPlayed } from "@/lib/intro-state";
import heroVideo from "@/assets/hero-construction.mp4";
import heroPoster from "@/assets/hero-construction-poster.jpg";
import heroStaticBg from "@/assets/hero-static-bg.webp";

const NAME = "Imprese Riunite";
// Letters start appearing 7s after the video starts playing, per spec.
const REVEAL_START_DELAY_MS = 7000;
const LETTER_STAGGER = 0.045;
const LETTER_DURATION = 0.4;
// The cut to the static hero happens 2s after the video finishes playing.
const POST_VIDEO_HOLD_MS = 2000;
// Safety net if the video never fires `ended` (e.g. autoplay blocked):
// video runs ~10s, so force the cut shortly after 10s + hold.
const INTRO_FALLBACK_MS = 13000;
// Mobile never loads the heavy hero video. Shared-layout animation handles
// the move from the centered intro title to its measured final hero position.
const MOBILE_TITLE_TRANSITION = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

const isMobileViewport = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

type Phase = "video" | "reveal" | "mobileIntro" | "done";

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

// One-shot cinematic gate: the company name reveals first, then mobile uses a
// measured shared-layout handoff into the permanent hero. Once "done" is
// reached it never reverts within this page life.
const HeroSection = ({ onIntroComplete }: { onIntroComplete?: () => void }) => {
  const prefersReducedMotion = useReducedMotion();
  const mobileViewport = useMemo(isMobileViewport, []);
  const [phase, setPhase] = useState<Phase>(() =>
    hasIntroPlayed() ? "done" : mobileViewport ? "mobileIntro" : "video"
  );

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

  const letters = useMemo(() => NAME.split(""), []);

  // Reduced-motion visitors land straight on the final static hero; everyone
  // else gets the intro once per page load, with a fallback cut in case the
  // video's `ended` event never arrives.
  useEffect(() => {
    if (hasIntroPlayed()) return;
    markIntroPlayed();

    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }
    // Mobile handoff starts from the title's animation-complete callback.
    if (mobileViewport) {
      return;
    }
    const revealTimer = setTimeout(() => setPhase("reveal"), REVEAL_START_DELAY_MS);
    const fallbackTimer = setTimeout(() => setPhase("done"), INTRO_FALLBACK_MS);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fallbackTimer);
    };
  }, [mobileViewport, prefersReducedMotion]);

  // Primary cut trigger: 2s after the intro video finishes.
  const handleVideoEnded = () => {
    setTimeout(() => setPhase("done"), POST_VIDEO_HOLD_MS);
  };

  // Let the page (Index) know the intro is over, e.g. to mount the navbar.
  useEffect(() => {
    if (phase === "done") onIntroComplete?.();
  }, [phase, onIntroComplete]);

  // Lock scroll during the gated intro so it plays out like a splash screen.
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-intro-phase={phase}
      className="tech-frame relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <LayoutGroup id="hero-title-transition">
        <AnimatePresence mode="sync">
      {phase === "mobileIntro" ? (
        <motion.div
          key="mobile-intro"
          className="absolute inset-0"
          exit={{ opacity: 0 }}
          transition={{ duration: MOBILE_TITLE_TRANSITION.duration }}
        >
          {/* No video on mobile: the name types over the (cached) static hero. */}
          <img
            src={heroStaticBg}
            alt="Cantiere edile, gru al tramonto in toni blu"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/60 to-foreground/85" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              layoutId="mobile-hero-title"
              aria-label={NAME}
              className="whitespace-nowrap text-center font-heading text-[clamp(1.9rem,9.4vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
              initial="hidden"
              animate="visible"
              variants={nameContainerVariants}
              transition={{ layout: MOBILE_TITLE_TRANSITION }}
              onAnimationComplete={() =>
                setPhase((current) =>
                  current === "mobileIntro" ? "done" : current
                )
              }
            >
              <span aria-hidden="true">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className="inline-block whitespace-pre"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </motion.div>
        </motion.div>
      ) : phase !== "done" ? (
        <div key="intro" className="absolute inset-0">
          {/* Full quality footage, undimmed and unobstructed while it plays alone. */}
            <video
              autoPlay
              muted
              playsInline
              poster={heroPoster}
              onEnded={handleVideoEnded}
              aria-hidden="true"
              className="h-full w-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/10 via-background/30 to-background/60 px-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h1
                    aria-label={NAME}
                    className="font-heading font-extrabold text-foreground text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]"
                    initial="hidden"
                    animate="visible"
                    variants={nameContainerVariants}
                  >
                    <span aria-hidden="true">
                      {letters.map((letter, i) => (
                        <motion.span
                          key={i}
                          variants={letterVariants}
                          className="inline-block whitespace-pre"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </span>
                  </motion.h1>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      ) : (
        <motion.div
          key="done"
          className="absolute inset-0 flex items-center justify-center"
          initial={mobileViewport ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: mobileViewport ? 0.35 : 0 }}
        >
            <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
              <img
                src={heroStaticBg}
                alt="Cantiere edile, gru al tramonto in toni blu"
                className="h-full w-full object-cover"
              />
            </motion.div>
            {/* Dark navy scrim so the light titles pop against the blue photo. */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90"
              style={{ opacity: overlayOpacity }}
            />

            <motion.div
              className="relative container text-center"
              style={{ y: textY, scale: textScale, opacity: textOpacity }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mobileViewport ? 0 : 0.2 }}
                className="mb-4 font-body text-sm sm:text-base font-medium uppercase tracking-[0.3em] text-sky-300"
              >
                Roma · dal 1976
              </motion.p>
              <motion.h1
                layoutId={mobileViewport ? "mobile-hero-title" : undefined}
                aria-label={NAME}
                initial={mobileViewport ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  mobileViewport
                    ? { layout: MOBILE_TITLE_TRANSITION }
                    : { delay: 0.4 }
                }
                className="whitespace-nowrap text-[clamp(1.9rem,9.4vw,2.25rem)] sm:text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold text-white leading-[0.95] tracking-tight mb-4 sm:mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
              >
                Imprese Riunite
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mobileViewport ? 0.18 : 0.6 }}
                className="text-white/90 font-body text-base sm:text-xl md:text-2xl xl:text-3xl leading-relaxed max-w-5xl mx-auto mb-8 px-2 sm:px-4"
              >
                Costruzioni, infrastrutture e impiantistica: oltre 50 anni di grandi opere civili al servizio del territorio.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mobileViewport ? 0.36 : 0.9 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
              >
                <a
                  href="#aziende"
                  className="inline-block rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-heading font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Scopri le nostre aziende
                </a>
                <Link
                  to="/certificazioni"
                  className="inline-block rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-heading font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors"
                >
                  Le certificazioni
                </Link>
                <a
                  href="#storia"
                  className="inline-block rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-heading font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors"
                >
                  La nostra storia
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: mobileViewport ? 0.55 : 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{ opacity: textOpacity }}
            >
              <a href="#chi-siamo">
                <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
              </a>
            </motion.div>
        </motion.div>
      )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
};

export default HeroSection;
