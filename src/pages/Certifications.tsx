import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { certifiedCompanies } from "@/data/companies";
import { companyLogos } from "@/data/company-assets";
import isoLogo from "@/assets/logo-iso-01.webp";
import saLogo from "@/assets/SA-logo.webp";
import soaLogo from "@/assets/logo-soa.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";

const heroCertifications = [
  { src: isoLogo, alt: "Certificazione ISO 9001", label: "ISO 9001" },
  { src: saLogo, alt: "Certificazione SA 8000", label: "SA 8000" },
  { src: soaLogo, alt: "Attestazione SOA", label: "SOA" },
];

const getCertificationArea = (name: string) => {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("9001")) return "Gestione qualità";
  if (normalizedName.includes("1400")) return "Gestione ambientale";
  if (normalizedName.includes("45001")) return "Salute e sicurezza";
  if (normalizedName.includes("50001")) return "Gestione energia";
  if (normalizedName.includes("37001")) return "Prevenzione corruzione";
  if (normalizedName.includes("sa 8000")) return "Responsabilità sociale";
  if (normalizedName.includes("fgas")) return "Gas fluorurati";
  if (normalizedName.includes("esg")) return "Sostenibilità";
  if (normalizedName.includes("rating di legalità")) return "Legalità e trasparenza";
  if (normalizedName.includes("parità") || normalizedName.includes("pdr 125")) {
    return "Parità di genere";
  }
  if (normalizedName === "soa") return "Lavori pubblici";

  return "Documento certificativo";
};

const Certifications = () => {
  const location = useLocation();
  const hashCompanyId = decodeURIComponent(location.hash.slice(1));
  const [activeCompanyId, setActiveCompanyId] = useState(
    hashCompanyId || certifiedCompanies[0]?.id
  );

  useDocumentMetadata(
    "Certificazioni | Imprese Riunite",
    "Registro delle certificazioni e qualificazioni di Costruzioni Angelico e Nuova C.C.S.: qualità, ambiente, sicurezza ed etica per gli appalti pubblici."
  );

  useEffect(() => {
    if (!location.hash) return;
    const companyId = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(companyId);
    setActiveCompanyId(companyId);
    target?.scrollIntoView({ block: "start" });
  }, [location.hash]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCompany = entries.find((entry) => entry.isIntersecting);
        if (visibleCompany) setActiveCompanyId(visibleCompany.target.id);
      },
      { rootMargin: "-32% 0px -60% 0px" }
    );

    certifiedCompanies.forEach((company) => {
      const section = document.getElementById(company.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="certifications-blueprint-page min-h-screen">
      <Navbar />

      <main id="main-content">
        <section className="certifications-blueprint-hero pt-28 md:pt-[8.75rem]">
          <div className="container relative grid gap-12 pb-14 md:pb-20 lg:min-h-[34rem] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
            <div>
              <Link
                to="/#home"
                className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#102d4d]"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna alla home
              </Link>

              <p className="mb-5 font-body text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
                Standard di eccellenza
              </p>
              <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-8xl">
                Certificazioni e qualificazioni
              </h1>
              <p className="mt-7 max-w-3xl font-body text-base leading-relaxed text-slate-300 md:text-lg md:leading-8">
                Qualità tecnica, sicurezza e responsabilità documentate. Ogni attestato è
                consultabile in originale, per garantire trasparenza alla pubblica amministrazione
                e ai nostri partner.
              </p>
            </div>

            <figure className="certifications-logo-stage" aria-label="Principali standard certificativi del Gruppo">
              <div className="certifications-logo-grid">
                {heroCertifications.map((certification) => (
                  <div key={certification.label} className="certifications-logo-card">
                    <img
                      src={certification.src}
                      alt={certification.alt}
                      className="h-20 w-full object-contain md:h-28"
                    />
                    <span>{certification.label}</span>
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </section>

        <nav
          className="certifications-company-switch sticky top-[var(--site-navbar-height)] z-20 border-b border-slate-300/90 bg-white/95 shadow-sm backdrop-blur-xl"
          aria-label="Seleziona azienda certificata"
        >
          <div className="container grid grid-cols-2 gap-3 py-4 md:gap-4 md:py-5">
            {certifiedCompanies.map((company) => {
              const isActive = activeCompanyId === company.id;

              return (
                <Link
                  key={company.id}
                  to={`/certificazioni#${company.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`inline-flex min-h-16 min-w-0 items-center justify-center border px-3 text-center font-heading text-sm font-bold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-6 sm:text-base md:min-h-[4.75rem] md:px-8 md:text-lg ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-slate-300 bg-white text-slate-900 hover:border-primary hover:text-primary"
                  }`}
                >
                  {company.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {certifiedCompanies.map((company, companyIndex) => (
          <section
            key={company.id}
            id={company.id}
            style={{ scrollMarginTop: "14rem" }}
            className={`certifications-company-section py-16 md:py-24 ${
              companyIndex % 2 === 0 ? "bg-[#eaf0f6]" : "bg-[#e2ebf4]"
            }`}
          >
            <div className="container grid items-start gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14 xl:grid-cols-[21rem_1fr] xl:gap-16">
              <aside className="bg-[#123456] p-7 text-white lg:sticky lg:top-56 md:p-8">
                {companyLogos[company.id] && (
                  <div className="mb-12 flex min-h-24 items-center justify-center bg-white p-4">
                    <img
                      src={companyLogos[company.id]}
                      alt={`${company.name} logo`}
                      className="h-16 w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Impresa certificata
                </p>
                <h2 className="font-heading text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
                  {company.name}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-slate-300">{company.role}</p>
              </aside>

              <div>
                {company.soaCategories && company.soaCategories.length > 0 && (
                  <section aria-labelledby={`${company.id}-soa`} className="mb-16 md:mb-20">
                    <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#123456] pb-4">
                      <h3
                        id={`${company.id}-soa`}
                        className="font-heading text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
                      >
                        Attestazione SOA
                      </h3>
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                        D.P.R. 207/2010
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 border-l border-t border-slate-300 sm:grid-cols-2">
                      {company.soaCategories.map((category) => (
                        <article
                          key={category.code}
                          className="flex min-h-36 flex-col justify-between border-b border-r border-slate-300 bg-white/60 p-5 md:p-6"
                        >
                          <div className="flex items-start justify-between gap-5">
                            <h4 className="font-heading text-xl font-bold text-slate-950 md:text-2xl">
                              Cat. {category.code}
                            </h4>
                            <span className="font-mono text-base font-bold text-primary md:text-lg">
                              {category.classifica}
                            </span>
                          </div>
                          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-slate-600">
                            {category.description}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                <section aria-labelledby={`${company.id}-certifications`}>
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#123456] pb-4">
                    <h3
                      id={`${company.id}-certifications`}
                      className="font-heading text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
                    >
                      Registro certificazioni
                    </h3>
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                      Documenti originali
                    </span>
                  </div>

                  <div className="mt-3">
                    {company.certifications.map((certification, certificationIndex) => (
                      <a
                        key={certification.name}
                        href={certification.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid min-h-[4.75rem] grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-slate-300 py-3 font-body transition-colors hover:bg-white/60 focus-visible:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:grid-cols-[3.5rem_1.2fr_1fr_auto] md:gap-5 md:px-2"
                      >
                        <span className="font-mono text-xs text-slate-500">
                          {String(certificationIndex + 1).padStart(2, "0")}
                        </span>
                        <strong className="font-heading text-base leading-snug text-slate-950 md:text-lg">
                          {certification.name}
                        </strong>
                        <span className="hidden text-sm text-slate-600 md:block">
                          {getCertificationArea(certification.name)}
                        </span>
                        <span className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary md:text-sm">
                          Apri PDF
                          <ExternalLink aria-hidden="true" className="h-4 w-4" />
                          <span className="sr-only"> (si apre in una nuova scheda)</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
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
