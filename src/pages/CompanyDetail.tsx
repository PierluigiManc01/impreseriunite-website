import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building2,
  Award,
  Briefcase,
  FileText,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { companies, siteContact } from "@/data/companies";
import { companyLogos } from "@/data/company-assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";
import { renderRichText } from "@/lib/render-rich-text";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = companies.find((c) => c.id === id);
  const prefersReducedMotion = useReducedMotion();
  const revealInitial = prefersReducedMotion ? false : { opacity: 0, y: 20 };
  const revealTarget = prefersReducedMotion ? undefined : { opacity: 1, y: 0 };
  const companyPhones = company
    ? siteContact.phones.filter(({ label }) => company.phone.includes(label))
    : [];

  useDocumentMetadata(
    company ? `${company.name} | Imprese Riunite` : "Azienda non trovata | Imprese Riunite",
    company
      ? `${company.name}: ${company.role}. ${company.fullName}.`
      : "La pagina azienda richiesta non e' disponibile."
  );

  if (!company) {
    return (
      <main
        id="main-content"
        className="flex min-h-screen items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Azienda non trovata
          </h1>
          <Link to="/#home" className="text-primary hover:underline">
            Torna alla homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <Link
            to="/#aziende"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            onClick={() => {
              setTimeout(() => {
                document.getElementById("aziende")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alle aziende
          </Link>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16">
            <motion.div
              initial={revealInitial}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 w-full min-w-0 lg:w-1/2 order-2 lg:order-1"
            >
              
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground leading-tight mb-6 break-words">
                {company.name}
              </h1>
              <p className="micro-label text-primary mb-8 break-words">
                {company.role}
              </p>
              <p className="section-copy md:text-lg">
                {renderRichText(company.description)}
              </p>
              {company.longDescription && (
                <p className="section-copy md:text-lg mt-8">
                  {renderRichText(company.longDescription)}
                </p>
              )}
            </motion.div>

            {/* Logo on the right without boxes/borders */}
            {companyLogos[company.id] && (
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={prefersReducedMotion ? undefined : { delay: 0.2 }}
                className="flex-1 w-full lg:w-1/2 shrink-0 flex items-start justify-center lg:justify-end order-1 lg:order-2"
              >
                {/* Capped at ~340px: the smallest source logo is 300px, so a
                    larger box would upscale and blur it. */}
                <img
                  src={companyLogos[company.id]}
                  alt={`${company.name} logo`}
                  className="w-full max-w-[300px] sm:max-w-[340px] h-auto object-contain"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      {company.projects.length > 0 && (
        <section className="section-shell bg-background">
          <div className="container">
            <motion.div
              initial={revealInitial}
              whileInView={revealTarget}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                  Lavori Principali
                </h2>
              </div>
              <p className="section-copy">
                {company.id === "gruppo-immobiliare-properzi"
                  ? "Progetti storici realizzati dalla C.C.S. e dalle società del Gruppo Immobiliare Properzi."
                  : "Una selezione dei progetti più rappresentativi realizzati dall'azienda."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {company.projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={revealInitial}
                  whileInView={revealTarget}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? undefined : { delay: i * 0.1 }}
                  className="architectural-panel overflow-hidden"
                >
                {/* Image carousel */}
                {project.images.length > 0 && (
                  <div className="relative aspect-[4/3]">
                    <ProjectImageCarousel
                      images={project.images}
                      imageLabels={project.imageLabels}
                      alt={project.title}
                      className="h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 pointer-events-none">
                      <span className="text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {project.location}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  {project.images.length === 0 && (
                    <div className="flex flex-wrap items-start gap-2 mb-1">
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {project.location}
                      </span>
                    </div>
                  )}

                  <h3 className="font-heading font-bold text-lg text-foreground mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="section-copy mb-3">
                    {project.description}
                  </p>
                  {project.amountNote && (
                    <p className="mb-3 font-body text-xs leading-relaxed text-muted-foreground">
                      * {project.amountNote}
                    </p>
                  )}
                  <dl className="mt-4 grid gap-3 border-t border-border pt-4 font-body">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                        Committente
                      </dt>
                      <dd className="mt-1.5 text-lg font-semibold leading-snug text-foreground xl:text-xl">
                        {project.client}
                      </dd>
                    </div>
                    {project.amount && (
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                          {project.amountLabel ?? "Importo"}
                        </dt>
                        <dd className="mt-1.5 text-lg font-semibold tabular-nums text-foreground xl:text-xl">
                          {project.amount}
                          {project.amountNote && " *"}
                        </dd>
                      </div>
                    )}
                    {project.details?.map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                          {label}
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-foreground">
                          {value}
                        </dd>
                      </div>
                    ))}
                    {project.date && (
                      <div>
                        <dt className="sr-only">Data</dt>
                        <dd className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" />
                          {project.date}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {project.newsUrl && (
                    <a
                      href={project.newsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 font-body text-sm font-bold tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      DICONO DI NOI
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only"> (si apre in una nuova scheda)</span>
                    </a>
                  )}
                </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Company Info & Certifications */}
      <section className="section-shell bg-accent/50">
        <div className="container">
          <div className={`grid ${company.certifications.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-xl'} gap-5 md:gap-6 max-w-5xl mx-auto`}>
            {/* Contact info */}
            <motion.div
              initial={revealInitial}
              whileInView={revealTarget}
              viewport={{ once: true }}
              className="architectural-panel order-2 min-w-0 p-6 sm:p-8 md:order-1"
            >
              <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Dati Societari
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
                    Ragione Sociale
                  </p>
                  <p className="text-sm font-body text-foreground font-medium break-words">{company.fullName}</p>
                </div>
                {company.vatNumber && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
                      Partita IVA
                    </p>
                    <p className="text-sm font-body text-foreground">{company.vatNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
                    {company.id === "gruppo-immobiliare-properzi" ? "Fondatore" : "Amministratore"}
                  </p>
                  <p className="text-sm font-body text-foreground">{company.admin}</p>
                </div>
                {company.technicalDirector && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
                      Direttore Tecnico
                    </p>
                    <p className="text-sm font-body text-foreground">{company.technicalDirector}</p>
                  </div>
                )}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <a
                      href={siteContact.office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {company.address}
                      <span className="sr-only"> (si apre in una nuova scheda)</span>
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-wrap gap-x-2 gap-y-1 font-body text-sm text-muted-foreground">
                      {companyPhones.map((phone, index) => (
                        <span key={phone.href}>
                          {index > 0 && <span aria-hidden="true">– </span>}
                          <a
                            href={phone.href}
                            className="transition-colors hover:text-primary"
                          >
                            {phone.label}
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 space-y-1 font-body text-sm text-muted-foreground">
                      <a
                        href={`mailto:${company.pec}`}
                        className="block break-all transition-colors hover:text-primary"
                      >
                        {company.pec}
                      </a>
                      <a
                        href={`mailto:${company.email}`}
                        className="block break-all transition-colors hover:text-primary"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            {company.certifications.length > 0 && (
              <motion.div
                initial={revealInitial}
                whileInView={revealTarget}
                viewport={{ once: true }}
                className="architectural-panel order-1 min-w-0 p-6 sm:p-8 md:order-2"
              >
                <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certificazioni
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {company.certifications.map((cert) => (
                    <a
                      key={cert.name}
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-2 bg-accent hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors group/cert cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-body font-medium text-accent-foreground group-hover/cert:text-primary transition-colors break-words">
                        {cert.name}
                        <span className="sr-only"> (si apre in una nuova scheda)</span>
                      </span>
                      <ExternalLink
                        aria-hidden="true"
                        className="w-3 h-3 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover/cert:opacity-100 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
