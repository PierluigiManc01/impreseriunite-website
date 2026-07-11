import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-construction.mp4";
import heroPoster from "@/assets/hero-construction-poster.jpg";
import heroStaticBg from "@/assets/hero-static-bg.webp";

const NAME = "Imprese Riunite";
// Letters start appearing 5s after the video starts playing, per spec.
const REVEAL_START_DELAY_MS = 5000;
const LETTER_STAGGER = 0.045;
const LETTER_DURATION = 0.4;
const REVEAL_ANIMATION_MS =
  ((NAME.length - 1) * LETTER_STAGGER + LETTER_DURATION) * 1000;
// Small hold so the fully-formed name is legible for a beat before the cut.
const REVEAL_HOLD_MS = 600;

type Phase = "video" | "reveal" | "done";

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

// One-shot cinematic gate: full-quality video plays alone first, then the
// company name types itself on letter by letter, then the whole intro is
// swapped for the permanent static hero. Once "done" is reached it never
// reverts within this page life — only a full reload restarts the sequence,
// since none of it is persisted to storage.
const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("video");

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.9]);

  const letters = useMemo(() => NAME.split(""), []);

  // Reduced-motion visitors land straight on the final static hero.
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }
    const revealTimer = setTimeout(() => setPhase("reveal"), REVEAL_START_DELAY_MS);
    return () => clearTimeout(revealTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const doneTimer = setTimeout(
      () => setPhase("done"),
      REVEAL_ANIMATION_MS + REVEAL_HOLD_MS
    );
    return () => clearTimeout(doneTimer);
  }, [phase]);

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
      className="tech-frame relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <AnimatePresence mode="wait">
        {phase !== "done" ? (
          <motion.div
            key="intro"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* Full quality footage, undimmed and unobstructed while it plays alone. */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroPoster}
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
          </motion.div>
        ) : (
          <motion.div
            key="done"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
              <img
                src={heroStaticBg}
                alt="Cantiere edile, gru al tramonto in toni blu"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80"
              style={{ opacity: overlayOpacity }}
            />

            <motion.div
              className="relative container text-center pt-32 md:pt-36"
              style={{ y: textY, scale: textScale, opacity: textOpacity }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-primary"
              >
                Roma · dal 1976
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold text-foreground leading-[0.95] tracking-tight mb-4 sm:mb-8"
              >
                Imprese Riunite
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-foreground/80 font-body text-sm sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-6 px-2 sm:px-4"
              >
                Costruzioni, infrastrutture e impiantistica: oltre 50 anni di grandi opere civili al servizio del territorio.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-5 justify-center"
              >
                <a
                  href="#aziende"
                  className="inline-block rounded-md px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Scopri le nostre aziende
                </a>
                <a
                  href="#storia"
                  className="inline-block rounded-md px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-foreground border border-foreground/30 hover:bg-foreground/10 transition-colors"
                >
                  La nostra storia
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{ opacity: textOpacity }}
            >
              <a href="#chi-siamo">
                <ChevronDown className="w-6 h-6 text-foreground/50 animate-bounce" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
