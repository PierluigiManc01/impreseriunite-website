import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Landmark, Zap, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
type FeatureImage = { src: string; alt: string };

import cantiere from "@/assets/cantiere.png";
import iso from "@/assets/logo-iso-01.png";
import soa from "@/assets/logo-soa.jpg";
import sa from "@/assets/SA-logo.png";

const features = [
  {
    icon: Globe,
    title: "Esperienza Internazionale",
    desc: "Dal 1976 nel settore delle grandi opere civili, marittime e idrauliche. Progetti di rilevanza internazionale in Arabia Saudita — tra cui il Viadotto Muzdalifah, il Raccordo Anulare di Riyad e la Facoltà di Ingegneria di Jedda — e importanti infrastrutture in Italia come il Porto Turistico Riva di Traiano.",
    images: [] as FeatureImage[],
    mainImage: cantiere,         
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Landmark,
    title: "Opere Pubbliche",
    desc: "Collaborazione consolidata con Roma Capitale, Ministero della Giustizia, Ministero della Difesa, ENAV e i principali enti pubblici italiani. Decenni di esperienza nella realizzazione di strutture detentive, ristrutturazioni istituzionali e opere infrastrutturali strategiche.",
    images: [] as FeatureImage[],
    mainImage: cantiere,
    accent: "from-accent/60 to-accent/20",
  },
  {
    icon: Zap,
    title: "Impiantistica Avanzata",
    desc: "Impianti fotovoltaici, gruppi elettrogeni, gruppi di continuità e cabine di trasformazione MT/BT. Installazione e manutenzione di impianti elettrici, di sicurezza, illuminazione e autonomia industriale.",
    images: [] as FeatureImage[],
    mainImage: cantiere,   
    accent: "from-primary/10 to-transparent",
  },
  {
    icon: Award,
    title: "Qualità Certificata",
    desc: "I nostri standard di eccellenza sono garantiti dalle più importanti certificazioni di settore, a testimonianza del nostro impegno verso qualità, sicurezza e sostenibilità.",
    images: [
      { src: iso, alt: "ISO 9001" },
      { src: sa, alt: "SA 8000" },
      { src: soa, alt: "SOA" },
    ],
    accent: "from-primary/15 to-accent/30",
  },
];

/* ── Alternating Feature Block ── */
const FeatureBlock = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  // Dampened values on mobile
  const mScale = isMobile ? [0.96, 1.04, 1.04, 0.96] : [0.8, 1.2, 1.2, 0.8];
  const mY = isMobile ? [40, 0, 0, -20] : [80, 0, 0, -40];

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], mScale);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], mY);
  const color = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["hsl(215, 16%, 47%)", "hsl(217, 91%, 50%)", "hsl(217, 91%, 50%)", "hsl(215, 16%, 47%)"]
  );
  const mediaOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const iconRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-15, 0, 0, 15]);

  const Icon = feature.icon;
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="min-h-[30vh] md:min-h-[45vh] flex items-stretch justify-center py-4 ">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-xl md:max-w-7xl mx-auto px-4 md:px-6 origin-center h-full min-h-full flex flex-col"
      >
        {/* Stack on mobile, alternate two-col on desktop */}
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-10`}>
          {/* Text side */}
          <div className="flex-1 text-center md:text-left px-6 md:px-4">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5 justify-center md:justify-start">
              <motion.div
                style={{ rotate: iconRotate, opacity: mediaOpacity }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </motion.div>
              <motion.h3
                style={{ color }}
                className="text-xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight"
              >
                {feature.title}
              </motion.h3>
            </div>
            <motion.p
              style={{ opacity: mediaOpacity }}
              className="text-muted-foreground font-body text-md md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              {feature.desc}
            </motion.p>
          </div>

          {/* Visual side */}
          <motion.div
            style={{ opacity: mediaOpacity }}
            className="flex-1 flex items-center justify-center w-auto max-w-full md:w-full h-full px-4 md:px-0"
          >
            {feature.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-xs md:max-w-none ">
                {feature.images.map((img) => (
                  <div
                    key={img.alt}
                    className="bg-card rounded-lg md:rounded-xl p-3 md:p-5 shadow-[var(--card-shadow)] border border-border flex items-center justify-center hover:shadow-[var(--card-shadow-hover)] transition-shadow"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-10 md:h-20 w-auto object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = "none";
                        const parent = el.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-xs font-semibold text-primary/70">${img.alt}</span>`;
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full rounded-md md:rounded-3xl bg-muted/20 border border-border/50 flex items-center justify-center relative overflow-hidden">
                <img src={feature.mainImage || ""} alt={feature.title} className="w-auto max-w-full md:w-full h-full object-cover" />
              </div>
            )}
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="chi-siamo" className="relative bg-background overflow-hidden py-10 md:py-6">
      <div className="container py-12 md:py-30">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8 px-4">
            <p className="text-xs md:text-sm tracking-widest md:tracking-[0.2em] uppercase text-primary font-semibold mb-3">
              Chi Siamo
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4 md:mb-6">
              Un gruppo solido al servizio del territorio
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Progress line */}
      <div className="relative">
        <div className="absolute left-4 md:left-12 top-0 bottom-0 md:bottom-40 w-px bg-border">
          <motion.div className="w-full bg-primary origin-top" style={{ height: lineHeight }} />
        </div>

        <div ref={sectionRef} className="space-y-10 md:space-y-20">
          {features.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
