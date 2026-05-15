import {Building, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";
import logoCcs from "@/assets/NUOVA-CCS.png";
import logoAngelico from "@/assets/CostruzioniAngelico-logo.png";
import logoimpreseRiunite from "@/assets/logo-imprese-riunite.png";

const logoMap: Record<string, string> = {
  "costruzioni-angelico": logoAngelico,
  "nuova-ccs": logoCcs,
  "gruppo-immobiliare-properzi": logoimpreseRiunite,
};

const capogruppo = companies.find((c) => c.id === "gruppo-immobiliare-properzi")!;
const subsidiaries = companies.filter((c) => c.id !== "gruppo-immobiliare-properzi");

const CompaniesSection = () => (
  <section id="aziende" className="py-16 md:py-24 bg-accent/50">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <p className="text-xs md:text-sm tracking-widest md:tracking-[0.2em] uppercase text-primary font-semibold mb-3 px-6 md:px-0">
            Le Nostre Aziende
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4 px-8 md:px-0">
            Competenze unite per grandi risultati
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-lg leading-relaxed px-10 md:px-0">
            Due realtà imprenditoriali con competenze complementari, che operano sotto un'unica visione strategica per offrire soluzioni integrate e di eccellenza nel settore.
          </p>
        </div>
      </ScrollReveal>

      {/* Capogruppo card */}
      <ScrollReveal scaleRange={[0.95, 1.05, 0.95]}>
        <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all max-w-3xl mx-auto mb-4">
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8 mb-6">
              <Link 
                to={`/azienda/${capogruppo.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 p-4 hover:bg-primary/10 transition-colors"
              >
                {logoMap[capogruppo.id] ? (
                  <img src={logoMap[capogruppo.id]} alt={`${capogruppo.name} logo`} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <Building className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold tracking-wider uppercase text-primary/70 mb-1">
                  {capogruppo.role}
                </p>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-4">
                  {capogruppo.name}
                </h3>
                {capogruppo.highlights && capogruppo.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4 text-left">
                    {capogruppo.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                {capogruppo.certifications.length > 0 && capogruppo.certifications.slice(0, 4).map((cert) => (
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
              <Link
                to={`/azienda/${capogruppo.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link shrink-0"
              >
                Scopri di più
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Tree connector */}
      <div className="flex justify-center mb-4">
        <div className="w-[3px] h-10 bg-primary" />
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute top-0 left-1/4 right-1/4 h-[3px] bg-primary" />
          <div className="absolute top-0 left-1/4 w-[3px] h-6 bg-primary" />
          <div className="absolute top-[3px] right-1/4 w-[3px] h-6 bg-primary" />
          <div className="h-6" />
        </div>
      </div>

      {/* Subsidiary cards — always side-by-side */}
      <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-3xl mx-auto">
        {subsidiaries.map((c) => {
          const Logo = logoMap[c.id];
          return (
            <ScrollReveal key={c.id} className="h-full" scaleRange={[0.95, 1.05, 0.95]} mobileScaleRange={[0.97, 1.02, 0.97]} fadeOut={false}>
              <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all group flex flex-col h-full items-center text-center sm:items-start sm:text-left">
                <div className="p-6 md:p-8 flex-1 flex flex-col w-full">
                  <Link 
                    to={`/azienda/${c.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-xl mx-auto md:mx-0 bg-primary/5 flex items-center justify-center border border-border/50 mb-6 group-hover:bg-primary/10 transition-colors shrink-0 overflow-hidden p-3 md:p-4"
                  >
                    {Logo ? (
                      <img src={Logo} alt={`${c.name} logo`} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <Building className="w-10 h-10 md:w-14 md:h-14 text-primary" />
                    )}
                  </Link>
                  <p className="text-[10px] md:text-xs font-semibold tracking-wider uppercase text-primary/70 mb-2 line-clamp-1">
                    {c.role}
                  </p>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-4 leading-tight">{c.name}</h3>
                  
                  {c.highlights && c.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4 text-left w-full flex-1">
                      {c.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground font-body">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 md:gap-1.5 mt-auto pt-4">
                    {c.certifications.slice(0, 3).map((cert) => (
                      <span key={cert.name} className="text-[10px] md:text-xs font-semibold bg-accent text-accent-foreground px-1.5 md:px-2 py-0.5 rounded">
                        {cert.name}
                      </span>
                    ))}
                    {c.certifications.length > 3 && (
                      <span className="text-[10px] md:text-xs font-semibold bg-accent text-accent-foreground px-1.5 md:px-2 py-0.5 rounded">
                        +{c.certifications.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 w-full flex justify-center sm:justify-start">
                  <Link
                    to={`/azienda/${c.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Scopri di più
                    <ArrowRight className="w-4 h-4 md:w-4 md:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Key figures */}
      <ScrollReveal className="mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 max-w-4xl mx-auto">
          {[
            { value: "1976", label: "Anno di fondazione" },
            { value: "50", label: "Anni di esperienza" },
            { value: "2", label: "Aziende del gruppo" },
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
