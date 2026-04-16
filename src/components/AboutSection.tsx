import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Landmark, Zap, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type FeatureImage = { src: string; alt: string };

const features = [
  {
    icon: Globe,
    title: "Esperienza Internazionale",
    desc: "Dal 1976 nel settore delle grandi opere civili, marittime e idrauliche. Progetti di rilevanza internazionale in Arabia Saudita — tra cui il Viadotto Muzdalifah, il Raccordo Anulare di Riyad e la Facoltà di Ingegneria di Jedda — e importanti infrastrutture in Italia come il Porto Turistico Riva di Traiano.",
    images: [] as FeatureImage[],
  },
  {
    icon: Landmark,
    title: "Opere Pubbliche",
    desc: "Collaborazione consolidata con Roma Capitale, Ministero della Giustizia, Ministero della Difesa, ENAV e i principali enti pubblici italiani. Decenni di esperienza nella realizzazione di strutture detentive, ristrutturazioni istituzionali e opere infrastrutturali strategiche.",
    images: [] as FeatureImage[],
  },
  {
    icon: Zap,
    title: "Impiantistica Avanzata",
    desc: "Impianti fotovoltaici, gruppi elettrogeni, gruppi di continuità e cabine di trasformazione MT/BT. Installazione e manutenzione di impianti elettrici, di sicurezza, illuminazione e autonomia industriale.",
    images: [] as FeatureImage[],
  },
  {
    icon: Award,
    title: "Qualità Certificata",
    desc: "I nostri standard di eccellenza sono garantiti dalle più importanti certificazioni di settore, a testimonianza del nostro impegno verso qualità, sicurezza e sostenibilità.",
    images: [
      { src: "/loghi-certificazioni/iso-9001.png", alt: "ISO 9001" },
      { src: "/loghi-certificazioni/iso-14001.png", alt: "ISO 14001" },
      { src: "/loghi-certificazioni/iso-45001.png", alt: "ISO 45001" },
      { src: "/loghi-certificazioni/sa-8000.png", alt: "SA 8000" },
      { src: "/loghi-certificazioni/soa.png", alt: "SOA" },
    ],
  },
];

const FeatureRow = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.15, 1, 1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1.5, 1.5, 0.9]);
  const color = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "hsl(215, 16%, 47%)",
      "hsl(217, 91%, 50%)",
      "hsl(217, 91%, 50%)",
      "hsl(215, 16%, 47%)",
    ]
  );
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const mediaOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const iconScale = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0.5, 1, 1, 0.5]);

  const Icon = feature.icon;

  return (
    <div ref={ref} className="min-h-[60vh] flex items-center justify-center py-16 overflow-hidden">
      <motion.div
        style={{ opacity, scale }}
        className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 origin-center px-6 md:px-16 lg:px-24"
      >
        {/* Text side */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-4">
            <motion.div
              style={{ scale: iconScale, opacity: mediaOpacity }}
              className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0"
            >
              <Icon className="w-6 h-6 text-accent-foreground" />
            </motion.div>
            <motion.h3
              style={{ color }}
              className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight"
            >
              {feature.title}
            </motion.h3>
          </div>
          <motion.p
            style={{ opacity: descOpacity }}
            className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-xl"
          >
            {feature.desc}
          </motion.p>
        </div>

        {/* Media side */}
        {feature.images.length > 0 && (
          <motion.div
            style={{ opacity: mediaOpacity }}
            className="flex-1 flex flex-wrap items-center justify-center gap-6"
          >
            {feature.images.map((img) => (
              <div
                key={img.alt}
                className="bg-card rounded-xl p-4 shadow-[var(--card-shadow)] border border-border flex items-center justify-center"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-14 md:h-20 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Hide broken images gracefully
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </motion.div>
        )}
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
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="chi-siamo" className="relative bg-background">
      <div className="container py-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
              Chi Siamo
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Un gruppo solido al servizio del territorio
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Imprese Riunite – Properzi Costruzioni Generali è una realtà imprenditoriale italiana che
              lavora nel settore delle grandi opere civili dal 1976.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Progress line */}
      <div ref={sectionRef} className="relative">
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-border">
          <motion.div
            className="w-full bg-primary origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-0">
          {features.map((f, i) => (
            <FeatureRow key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
