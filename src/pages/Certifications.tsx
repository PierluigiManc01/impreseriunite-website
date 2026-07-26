import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Building2, ExternalLink, FileText, Zap } from "lucide-react";
import { certifiedCompanies } from "@/data/companies";
import { companyLogos } from "@/data/company-assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";

const Certifications = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const revealInitial = prefersReducedMotion ? false : { opacity: 0, y: 20 };
  const revealTarget = prefersReducedMotion ? undefined : { opacity: 1, y: 0 };

  useDocumentMetadata(
    "Certificazioni | Imprese Riunite",
    "Registro delle certificazioni e qualificazioni di Costruzioni Angelico e Nuova C.C.S.: qualità, ambiente, sicurezza ed etica per gli appalti pubblici."
  );

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ block: "start" });
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-14 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <Link
            to="/#home"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>

          <div className="max-w-3xl">
            <p className="section-eyebrow mb-4">Standard di Eccellenza</p>
            <h1 className="section-title mb-6">Certificazioni e Qualificazioni</h1>
            <p className="section-copy md:text-lg">
              L'impegno del Gruppo verso la massima qualità tecnica e normativa è attestato dai
              principali standard nazionali e internazionali. Ogni attestato è consultabile in
              originale, a garanzia della pubblica amministrazione e dei nostri partner negli
              appalti pubblici.
            </p>
          </div>
        </div>
      </section>

      {/* Per-company registers */}
      {certifiedCompanies.map((company, index) => (
        <section
          key={company.id}
          id={company.id}
          className={`section-shell ${index % 2 === 1 ? "bg-accent/50" : "bg-background"}`}
        >
          <div className="container">
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-5 mb-12 border-l-4 border-primary pl-6">
                {companyLogos[company.id] && (
                  <img
                    src={companyLogos[company.id]}
                    alt={`${company.name} logo`}
                    className="h-14 md:h-16 w-auto object-contain"
                  />
                )}
                <div>
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
                    {company.name}
                  </h2>
                  <p className="section-copy md:text-lg">{company.role}</p>
                </div>
              </div>
            </ScrollReveal>

            {company.soaCategories && company.soaCategories.length > 0 && (
              <div className="mb-16">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                    Attestazione SOA
                  </h3>
                  <span className="micro-label text-primary">
                    {company.soaCategories.length} categorie
                  </span>
                </div>
                <p className="section-copy mb-8">
                  Qualificazione all'esecuzione di lavori pubblici (D.P.R. 207/2010)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {company.soaCategories.map((cat, i) => {
                    const Icon = cat.code.startsWith("OG") ? Building2 : Zap;
                    return (
                      <motion.div
                        key={cat.code}
                        initial={revealInitial}
                        whileInView={revealTarget}
                        viewport={{ once: true }}
                        transition={prefersReducedMotion ? undefined : { delay: i * 0.04 }}
                        className="architectural-panel p-5 flex flex-col h-full"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-heading font-bold text-xl md:text-2xl text-foreground">
                            Cat. {cat.code}
                          </span>
                        </div>
                        <p className="text-sm md:text-base leading-snug text-muted-foreground font-body flex-grow">
                          {cat.description}
                        </p>
                        <div className="flex justify-between items-center gap-2 pt-3.5 mt-3.5 border-t border-border">
                          <span className="font-body text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            Classifica
                          </span>
                          <span className="px-2.5 py-1 bg-primary text-primary-foreground text-sm font-bold rounded uppercase">
                            {cat.classifica}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-8">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                Certificazioni di Sistema
              </h3>
              <span className="micro-label text-primary">
                {company.certifications.length} attestati
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {company.certifications.map((cert, i) => (
                <motion.a
                  key={cert.name}
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={revealInitial}
                  whileInView={revealTarget}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? undefined : { delay: i * 0.04 }}
                  className="architectural-panel group p-5 flex items-center gap-4"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-heading font-bold text-base md:text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
                    {cert.name}
                    <span className="sr-only"> (si apre in una nuova scheda)</span>
                  </span>
                  <ExternalLink
                    aria-hidden="true"
                    className="ml-auto w-5 h-5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      ))}
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
