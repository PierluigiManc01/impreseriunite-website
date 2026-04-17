import { Building, Hammer, HardHat, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  "costruzioni-angelico": Hammer,
  "nuova-ccs": HardHat,
  "gruppo-immobiliare-properzi": Building,
};

const capogruppo = companies.find((c) => c.id === "gruppo-immobiliare-properzi")!;
const subsidiaries = companies.filter((c) => c.id !== "gruppo-immobiliare-properzi");

const CompaniesSection = () => (
  <section id="aziende" className="py-16 md:py-24 bg-accent/50">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
            Le Nostre Aziende
          </p>
          <h2 className="text-2xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Competenze unite per grandi risultati
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-lg">
            Tre realtà imprenditoriali con competenze complementari, unite sotto un'unica visione strategica.
          </p>
        </div>
      </ScrollReveal>

      {/* Capogruppo card */}
      <ScrollReveal scaleRange={[0.95, 1.05, 0.95]}>
        <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all max-w-3xl mx-auto mb-4">
          <div className="p-5 md:p-10">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-semibold tracking-wider uppercase text-primary/70">
                  {capogruppo.role}
                </p>
                <h3 className="font-heading font-bold text-base md:text-xl text-foreground">
                  {capogruppo.name}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground font-body text-xs md:text-sm leading-relaxed mb-4">
              {capogruppo.description}
            </p>
            {capogruppo.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {capogruppo.certifications.slice(0, 4).map((cert) => (
                  <span key={cert.name} className="text-[10px] font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded">
                    {cert.name}
                  </span>
                ))}
                {capogruppo.certifications.length > 4 && (
                  <span className="text-[10px] font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded">
                    +{capogruppo.certifications.length - 4}
                  </span>
                )}
              </div>
            )}
            <Link
              to={`/azienda/${capogruppo.id}`}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
            >
              Scopri di più
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Tree connector */}
      <div className="flex justify-center mb-4">
        <div className="w-px h-10 bg-border" />
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-border" />
          <div className="absolute top-0 left-1/4 w-px h-6 bg-border" />
          <div className="absolute top-0 right-1/4 w-px h-6 bg-border" />
          <div className="h-6" />
        </div>
      </div>

      {/* Subsidiary cards — always side-by-side */}
      <div className="grid grid-cols-2 gap-3 md:gap-12 max-w-3xl mx-auto">
        {subsidiaries.map((c) => {
          const Icon = iconMap[c.id] || Building;
          return (
            <ScrollReveal key={c.id} scaleRange={[0.95, 1.05, 0.95]} mobileScaleRange={[0.97, 1.02, 0.97]} fadeOut={false}>
              <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all group flex flex-col h-full md:h-[420px]">
                <div className="p-4 md:p-8 flex-1 flex flex-col">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>
                  <p className="text-[9px] md:text-xs font-semibold tracking-wider uppercase text-primary/70 mb-1.5 md:mb-2">
                    {c.role}
                  </p>
                  <h3 className="font-heading font-bold text-sm md:text-xl text-foreground mb-2 md:mb-3 leading-tight">{c.name}</h3>
                  <p className="text-muted-foreground font-body text-[11px] md:text-sm leading-relaxed line-clamp-4 md:line-clamp-4 flex-1">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-1 md:gap-1.5 mt-3 md:mt-4">
                    {c.certifications.slice(0, 3).map((cert) => (
                      <span key={cert.name} className="text-[9px] md:text-[10px] font-semibold bg-accent text-accent-foreground px-1.5 md:px-2 py-0.5 rounded">
                        {cert.name}
                      </span>
                    ))}
                    {c.certifications.length > 3 && (
                      <span className="text-[9px] md:text-[10px] font-semibold bg-accent text-accent-foreground px-1.5 md:px-2 py-0.5 rounded">
                        +{c.certifications.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-4 pb-4 md:px-8 md:pb-8 pt-2">
                  <Link
                    to={`/azienda/${c.id}`}
                    className="inline-flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Scopri di più
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Key figures */}
      <ScrollReveal className="mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "1976", label: "Anno di fondazione" },
            { value: "50+", label: "Anni di esperienza" },
            { value: "3", label: "Aziende del gruppo" },
            { value: "15+", label: "Certificazioni" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-extrabold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CompaniesSection;
