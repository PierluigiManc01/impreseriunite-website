import { ArrowRight, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import { companyLogos } from "@/data/company-assets";
import ScrollReveal from "@/components/ScrollReveal";
import logoSignify from "@/assets/partnerships/signify-logo.webp";
import logoKnx from "@/assets/partnerships/KNX_logo.svg";

const partnerships = [
  { name: "Signify N.V.", logo: logoSignify },
  { name: "KNX", logo: logoKnx },
];

const CompaniesSection = () => (
  <section id="aziende" className="section-shell bg-accent/50">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <p className="section-eyebrow mb-3 px-6 md:px-0">
            Le Nostre Aziende
          </p>
          <h2 className="section-title mb-4 px-8 md:px-0">
            Competenze unite per grandi risultati
          </h2>
          <p className="section-copy px-4 md:px-0">
            Le società operano in sinergia sotto un'unica visione strategica, per offrire soluzioni integrate e di eccellenza nel settore.
          </p>
        </div>
      </ScrollReveal>

      {/* Three equal-standing cards — no visual hierarchy between them. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
        {companies.map((c) => {
          const Logo = companyLogos[c.id];
          return (
            <ScrollReveal
              key={c.id}
              className="h-full"
              initialScale={0.95}
              mobileInitialScale={0.97}
            >
              <Link
                to={`/azienda/${c.id}`}
                aria-label={`Scopri i dettagli di ${c.name}`}
                className="group flex h-full min-w-0 cursor-pointer flex-col items-center rounded-lg border border-border/60 bg-card text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 sm:items-start sm:text-left"
              >
                <div className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col w-full">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl mx-auto sm:mx-0 bg-primary/5 flex items-center justify-center border border-border/50 mb-4 sm:mb-6 group-hover:bg-primary/10 transition-colors shrink-0 overflow-hidden p-3 md:p-4"
                  >
                    {Logo ? (
                      <img src={Logo} alt={`${c.name} logo`} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <Building aria-hidden="true" className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    )}
                  </div>
                  <p className="micro-label mb-2 line-clamp-1 text-[0.68rem] text-primary sm:text-sm">
                    {c.role}
                  </p>
                  <h3 className="panel-title mb-4">{c.name}</h3>

                  {c.highlights && c.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4 text-left w-full flex-1">
                      {c.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base sm:text-lg xl:text-xl text-muted-foreground font-body">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 md:px-10 md:pb-10 pt-0 w-full flex justify-center sm:justify-start">
                  <span
                    className="inline-flex items-center gap-1.5 md:gap-2 text-sm sm:text-base md:text-lg xl:text-xl font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Scopri di più
                    <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Partnerships */}
      <ScrollReveal className="mt-16 md:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="section-eyebrow mb-3">
              Partnership
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {partnerships.map((partner) => (
              <div
                key={partner.name}
                className="flex min-h-28 items-center justify-center rounded-lg border border-border/60 bg-card p-4 sm:p-6 md:p-10 transition-colors hover:border-primary/30 sm:min-h-36"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-12 w-auto max-w-full object-contain sm:max-h-16 md:max-h-20"
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
