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
    layout: "left" as const,
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Landmark,
    title: "Opere Pubbliche",
    desc: "Collaborazione consolidata con Roma Capitale, Ministero della Giustizia, Ministero della Difesa, ENAV e i principali enti pubblici italiani. Decenni di esperienza nella realizzazione di strutture detentive, ristrutturazioni istituzionali e opere infrastrutturali strategiche.",
    images: [] as FeatureImage[],
    layout: "right" as const,
    accent: "from-accent/60 to-accent/20",
  },
  {
    icon: Zap,
    title: "Impiantistica Avanzata",
    desc: "Impianti fotovoltaici, gruppi elettrogeni, gruppi di continuità e cabine di trasformazione MT/BT. Installazione e manutenzione di impianti elettrici, di sicurezza, illuminazione e autonomia industriale.",
    images: [] as FeatureImage[],
    layout: "center" as const,
    accent: "from-primary/10 to-transparent",
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
    layout: "left" as const,
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1.08, 1.08, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
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
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center py-20">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-6xl mx-auto px-6 origin-center"
      >
        {/* Alternating two-column layout */}
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}>
          {/* Text side */}
          <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
            <div className={`flex items-center gap-4 mb-5 ${isEven ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
              <motion.div
                style={{ rotate: iconRotate, opacity: mediaOpacity }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Icon className="w-7 h-7 text-primary" />
              </motion.div>
              <motion.h3
                style={{ color }}
                className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight"
              >
                {feature.title}
              </motion.h3>
            </div>
            <motion.p
              style={{ opacity: mediaOpacity }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-xl"
            >
              {feature.desc}
            </motion.p>
          </div>

          {/* Visual side */}
          <motion.div
            style={{ opacity: mediaOpacity }}
            className="flex-1 flex items-center justify-center"
          >
            {feature.images.length > 0 ? (
              /* Certification logos grid */
              <div className="grid grid-cols-3 gap-4">
                {feature.images.map((img) => (
                  <div
                    key={img.alt}
                    className="bg-card rounded-xl p-5 shadow-[var(--card-shadow)] border border-border flex items-center justify-center hover:shadow-[var(--card-shadow-hover)] transition-shadow"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-14 md:h-20 w-auto object-contain"
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
              /* Decorative visual element for features without images */
              <div className={`w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br ${feature.accent} border border-border/50 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }} />
                <Icon className="w-20 h-20 text-primary/20" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Decorative divider between items */}
        {index < features.length - 1 && (
          <motion.div
            style={{ opacity: mediaOpacity }}
            className="flex justify-center mt-16"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
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
            <FeatureBlock key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
