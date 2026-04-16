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
  <section id="aziende" className="py-24 bg-accent/50">
    <div className="container">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
            Le Nostre Aziende
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Competenze unite per grandi risultati
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Tre realtà imprenditoriali con competenze complementari, unite sotto un'unica visione strategica.
          </p>
        </div>
      </ScrollReveal>

      {/* Capogruppo card */}
      <ScrollReveal scaleRange={[0.88, 1, 0.95]}>
        <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all max-w-3xl mx-auto mb-4">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-primary/70">
                  {capogruppo.role}
                </p>
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {capogruppo.name}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
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

      {/* Subsidiary cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {subsidiaries.map((c) => {
          const Icon = iconMap[c.id] || Building;
          return (
            <ScrollReveal key={c.id} scaleRange={[0.9, 1, 0.95]} fadeOut={false}>
              <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all group flex flex-col h-[420px]">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-primary/70 mb-2">
                    {c.role}
                  </p>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{c.name}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-4 flex-1">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {c.certifications.slice(0, 4).map((cert) => (
                      <span key={cert.name} className="text-[10px] font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded">
                        {cert.name}
                      </span>
                    ))}
                    {c.certifications.length > 4 && (
                      <span className="text-[10px] font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded">
                        +{c.certifications.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-8 pb-8 pt-2">
                  <Link
                    to={`/azienda/${c.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Scopri di più
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
