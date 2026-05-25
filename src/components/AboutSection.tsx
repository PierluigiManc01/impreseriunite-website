import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Landmark, Zap, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
type FeatureImage = { src: string; alt: string };

import cantiere from "@/assets/cantiere.webp";
import iso from "@/assets/logo-iso-01.png";
import soa from "@/assets/logo-soa.jpg";
import sa from "@/assets/SA-logo.png";
import international from "@/assets/internazionali.jpg";
import data_center from "@/assets/data_center.jpg";

const features = [
  {
    icon: Globe,
    title: "Esperienza Internazionale",
    desc: "Dal 1976 nel settore delle grandi opere civili, marittime e idrauliche. Progetti di rilevanza internazionale in <strong>Arabia Saudita</strong>, tra cui il Viadotto Muzdalifah, il Raccordo Anulare di Riyadh e la Facoltà di Ingegneria di Jeddah; e importanti infrastrutture in Italia come il <strong>Porto Turistico Riva di Traiano</strong>.",
    images: [{ src: international, alt: "Progetti Internazionali" }] as FeatureImage[],
    mainImage: cantiere,         
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Landmark,
    title: "Opere Pubbliche",
    desc: "Collaborazione consolidata con Roma Capitale, Ministeri della Giustizia e della Difesa e soprattutto con ENAV. Decenni di esperienza nella realizzazione di strutture detentive, ristrutturazioni istituzionali e opere infrastrutturali strategiche come la pista di atterraggio dell'aeroporto <strong>Ronchi Dei Legionari (Trieste)</strong>.",
    images: [] as FeatureImage[],
    mainImage: cantiere,
    accent: "from-accent/60 to-accent/20",
  },
  {
    icon: Zap,
    title: "Impiantistica Avanzata",
    desc: "Impianti fotovoltaici, gruppi elettrogeni, gruppi di continuità e cabine di trasformazione MT/BT. Installazione e manutenzione di impianti elettrici, di sicurezza, illuminazione e autonomia industriale.",
    images: [{ src: data_center, alt: "Data Center" }] as FeatureImage[],
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
  const mScale = isMobile ? [0.96, 1.04, 1.04, 0.96] : [0.92, 1, 1, 0.92];
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
  const singleFeatureImage = feature.images.length === 1 ? feature.images[0] : null;

  return (
    <div ref={ref} className="min-h-[30vh] md:min-h-[40vh] flex items-stretch justify-center py-3 md:py-3">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-xl md:max-w-7xl xl:max-w-[1480px] mx-auto px-4 md:px-8 xl:px-10 origin-center h-full min-h-full flex flex-col"
      >
        {/* Stack on mobile, alternate two-col on desktop */}
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-5 md:gap-8 xl:gap-10`}>
          {/* Text side */}
          <div className="flex-1 text-center md:text-left px-6 md:px-2 xl:px-4">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5 justify-center md:justify-start">
              <motion.div
                style={{ rotate: iconRotate, opacity: mediaOpacity }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </motion.div>
              <motion.h3
                style={{ color }}
                className="text-2xl md:text-3xl font-heading font-bold leading-tight"
              >
                {feature.title}
              </motion.h3>
            </div>
            <motion.p
              style={{ opacity: mediaOpacity }}
              className="section-copy max-w-2xl mx-auto md:mx-0"
            >
              {renderRichText(feature.desc)}
            </motion.p>
          </div>

          {/* Visual side */}
          <motion.div
            style={{ opacity: mediaOpacity }}
            className="flex-1 md:flex-[1.15] flex items-center justify-center w-auto max-w-full md:w-full h-full px-4 md:px-0"
          >
            {singleFeatureImage ? (
              <div className="w-full h-full rounded-md md:rounded-3xl bg-muted/20 border border-border/50 flex items-center justify-center relative overflow-hidden">
                <img
                  src={singleFeatureImage.src}
                  alt={singleFeatureImage.alt}
                  className="w-auto max-w-full md:w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : feature.images.length > 0 ? (
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
  return (
    <section id="chi-siamo" className="relative bg-background overflow-hidden pt-14 pb-1 md:pt-20 md:pb-2">
      <div className="container pb-1">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-6 px-4">
            <p className="section-eyebrow mb-3">
              Chi Siamo
            </p>
            <h2 className="section-title mb-4 md:mb-6">
              Un gruppo solido al servizio del territorio
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative">
        <div className="space-y-8 md:space-y-12">
          {features.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
