import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, ExternalLink, FileText, Zap } from "lucide-react";
import { companies } from "@/data/companies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import logoCcs from "@/assets/NUOVA-CCS.webp";
import logoAngelico from "@/assets/CostruzioniAngelico-logo.webp";

const logoMap: Record<string, string> = {
  "costruzioni-angelico": logoAngelico,
  "nuova-ccs": logoCcs,
};

const certifiedCompanies = companies.filter((c) => c.certifications.length > 0);

const Certifications = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Certificazioni | Imprese Riunite";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Registro delle certificazioni e qualificazioni di Costruzioni Angelico e Nuova C.C.S.: qualità, ambiente, sicurezza ed etica per gli appalti pubblici."
      );
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ block: "start" });
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <Link
            to="/"
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
              <div className="flex flex-wrap items-center gap-4 mb-10 border-l-4 border-primary pl-6">
                {logoMap[company.id] && (
                  <img
                    src={logoMap[company.id]}
                    alt={`${company.name} logo`}
                    className="h-10 w-auto object-contain"
                  />
                )}
                <div>
                  <h2 className="panel-title">{company.name}</h2>
                  <p className="section-copy">{company.role}</p>
                </div>
              </div>
            </ScrollReveal>

            {company.soaCategories && company.soaCategories.length > 0 && (
              <div className="mb-12">
                <p className="micro-label text-primary mb-1">Attestazione SOA</p>
                <p className="section-copy mb-6">
                  Qualificazione all'esecuzione di lavori pubblici (D.P.R. 207/2010)
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {company.soaCategories.map((cat, i) => {
                    const Icon = cat.code.startsWith("OG") ? Building2 : Zap;
                    return (
                      <motion.div
                        key={cat.code}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="architectural-panel p-6 flex flex-col h-full"
                      >
                        <div className="w-11 h-11 flex items-center justify-center rounded-md bg-primary/10 text-primary mb-4 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="panel-title text-base mb-2">Cat. {cat.code}</span>
                        <p className="text-sm text-muted-foreground font-body flex-grow">
                          {cat.description}
                        </p>
                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
                          <span className="micro-label text-muted-foreground">Classifica</span>
                          <span className="px-2.5 py-1 bg-accent text-accent-foreground text-xs font-bold rounded uppercase">
                            {cat.classifica}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="micro-label text-primary mb-6">Certificazioni di Sistema</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {company.certifications.map((cert, i) => (
                <motion.a
                  key={cert.name}
                  href={cert.pdf || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="architectural-panel group p-6 flex flex-col gap-4"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="panel-title text-base">{cert.name}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-body font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Visualizza documento
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default Certifications;
