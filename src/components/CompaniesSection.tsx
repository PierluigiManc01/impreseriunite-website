import { ArrowRight, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";
import logoCcs from "@/assets/NUOVA-CCS.webp";
import logoAngelico from "@/assets/CostruzioniAngelico-logo.webp";
import logoimpreseRiunite from "@/assets/logo-imprese-riunite.webp";
import logoSignify from "@/assets/partnerships/signify-logo.webp";
import logoKnx from "@/assets/partnerships/KNX_logo.svg";

const logoMap: Record<string, string> = {
  "costruzioni-angelico": logoAngelico,
  "nuova-ccs": logoCcs,
  "gruppo-immobiliare-properzi": logoimpreseRiunite,
};

const capogruppo = companies.find((c) => c.id === "gruppo-immobiliare-properzi")!;
const subsidiaries = companies.filter((c) => c.id !== "gruppo-immobiliare-properzi");
const partnerships = [
  { name: "Signify N.V.", logo: logoSignify },
  { name: "KNX", logo: logoKnx },
];

const CompaniesSection = () => (
  <section id="aziende" className="section-shell bg-accent/50">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
          <p className="section-eyebrow mb-3 px-6 md:px-0">
            Le Nostre Aziende
          </p>
          <h2 className="section-title mb-4 px-8 md:px-0">
            Competenze unite per grandi risultati
          </h2>
          <p className="section-copy px-4 md:px-0">
            Due realtà imprenditoriali con competenze complementari, che operano sotto un'unica visione strategica per offrire soluzioni integrate e di eccellenza nel settore.
          </p>
        </div>
      </ScrollReveal>

      {/* Capogruppo card */}
      <ScrollReveal scaleRange={[0.95, 1.05, 0.95]}>
        <div className="architectural-panel max-w-3xl mx-auto mb-4">
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
                <p className="micro-label text-primary/70 mb-1">
                  {capogruppo.role}
                </p>
                <h3 className="panel-title mb-4">
                  {capogruppo.name}
                </h3>
                {capogruppo.highlights && capogruppo.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4 text-left">
                    {capogruppo.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-base text-muted-foreground font-body">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-6">
              <Link
                to={`/azienda/${capogruppo.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-primary hover:text-primary/80 transition-colors group/link shrink-0"
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-12 max-w-3xl mx-auto">
        {subsidiaries.map((c) => {
          const Logo = logoMap[c.id];
          return (
            <ScrollReveal key={c.id} className="h-full" scaleRange={[0.95, 1.05, 0.95]} mobileScaleRange={[0.97, 1.02, 0.97]} fadeOut={false}>
              <div className="architectural-panel group flex h-full min-w-0 flex-col items-center text-center hover:-translate-y-1 sm:items-start sm:text-left">
                <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col w-full">
                  <Link 
                    to={`/azienda/${c.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl mx-auto md:mx-0 bg-primary/5 flex items-center justify-center border border-border/50 mb-4 sm:mb-6 group-hover:bg-primary/10 transition-colors shrink-0 overflow-hidden p-3 md:p-4"
                  >
                    {Logo ? (
                      <img src={Logo} alt={`${c.name} logo`} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <Building className="w-10 h-10 md:w-14 md:h-14 text-primary" />
                    )}
                  </Link>
                  <p className="micro-label text-primary/70 mb-2 line-clamp-1 text-[0.68rem] sm:text-sm">
                    {c.role}
                  </p>
                  <h3 className="panel-title mb-4 text-lg sm:text-xl md:text-2xl">{c.name}</h3>
                  
                  {c.highlights && c.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4 text-left w-full flex-1">
                      {c.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground font-body">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8 pt-0 w-full flex justify-center sm:justify-start">
                  <Link
                    to={`/azienda/${c.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base font-semibold text-primary hover:text-primary/80 transition-colors group/link"
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

      {/* Partnerships */}
      <ScrollReveal className="mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="section-eyebrow mb-3">
              Partnership
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {partnerships.map((partner) => (
              <div
                key={partner.name}
                className="architectural-panel flex min-h-36 items-center justify-center p-6 md:p-8"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-16 md:max-h-20 max-w-[220px] md:max-w-[260px] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CompaniesSection;
