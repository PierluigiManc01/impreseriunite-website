import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { certifiedCompanies } from "@/data/companies";
import { companyLogos } from "@/data/company-assets";
import isoLogo from "@/assets/logo-iso-01.webp";
import saLogo from "@/assets/SA-logo.webp";
import soaLogo from "@/assets/logo-soa.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompanyDocuments from "@/components/CompanyDocuments";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";

const heroCertifications = [
  { src: isoLogo, alt: "Certificazione ISO 9001", label: "ISO 9001" },
  { src: saLogo, alt: "Certificazione SA 8000", label: "SA 8000" },
  { src: soaLogo, alt: "Attestazione SOA", label: "SOA" },
];

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
                  Documenti aziendali
                </p>
                <h2 className="font-heading text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
                  {company.name}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-slate-300">{company.role}</p>
              </aside>

              <CompanyDocuments company={company} />
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
