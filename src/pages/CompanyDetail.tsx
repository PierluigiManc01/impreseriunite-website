import { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import { companies } from "@/data/companies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import logoCcs from "@/assets/NUOVA-CCS.png";
import logoAngelico from "@/assets/CostruzioniAngelico-logo.png";
import logoimpreseRiunite from "@/assets/logo-imprese-riunite.webp";

const logoMap: Record<string, string> = {
  "costruzioni-angelico": logoAngelico,
  "nuova-ccs": logoCcs,
  "gruppo-immobiliare-properzi": logoimpreseRiunite,
};

const renderRichText = (text: string) =>
  text.split(/(<strong>.*?<\/strong>)/g).map((part, index) => {
    const strongMatch = part.match(/^<strong>(.*?)<\/strong>$/);

    if (strongMatch) {
      return (
        <strong key={`${strongMatch[1]}-${index}`} className="font-semibold text-foreground">
          {strongMatch[1]}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part.replace(/<[^>]*>/g, "")}</Fragment>;
  });

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = companies.find((c) => c.id === id);

  useEffect(() => {
    if (!company) {
      document.title = "Azienda non trovata | Imprese Riunite";
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", "La pagina azienda richiesta non e' disponibile.");
      return;
    }

    document.title = `${company.name} | Imprese Riunite`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", `${company.name}: ${company.role}. ${company.fullName}.`);
  }, [company]);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Azienda non trovata
          </h1>
          <Link to="/" className="text-primary hover:underline">
            Torna alla homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-8 bg-gradient-to-b from-primary/5 to-background">
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
              initial={{ opacity: 0, y: 20 }}
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
            {logoMap[company.id] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 w-full lg:w-1/2 shrink-0 flex items-start justify-center lg:justify-end order-1 lg:order-2"
              >
                <img 
                  src={logoMap[company.id]} 
                  alt={`${company.name} logo`} 
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain" 
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-shell bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                ? "Progetti storici realizzati dalla vecchia C.C.S. (Consulenze Costruzioni Speciali), da cui il gruppo ha avuto origine."
                : "Una selezione dei progetti più rappresentativi realizzati dall'azienda."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {company.projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="architectural-panel overflow-hidden"
              >
                {/* Image carousel */}
                {project.images.length > 0 && (
                  <div className="relative aspect-[4/3]">
                    <ProjectImageCarousel
                      images={project.images}
                      alt={project.title}
                      className="h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 pointer-events-none">
                      <span className="text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {project.location}
                      </span>
                      {project.amount && (
                        <span className="text-xs font-semibold bg-white/90 text-foreground px-2.5 py-0.5 rounded-full">
                          {project.amount}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  {project.images.length === 0 && (
                    <div className="flex flex-wrap items-start gap-2 mb-1">
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {project.location}
                      </span>
                      {project.amount && (
                        <span className="text-xs font-semibold bg-accent text-accent-foreground px-2.5 py-0.5 rounded-full">
                          {project.amount}
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="font-heading font-bold text-lg text-foreground mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="section-copy mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground font-body min-w-0">
                      <span className="font-medium text-foreground/70">Committente:</span>{" "}
                      {project.client}
                    </p>
                    {project.date && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info & Certifications */}
      <section className="section-shell bg-accent/50">
        <div className="container">
          <div className={`grid ${company.certifications.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-xl'} gap-5 md:gap-6 max-w-5xl mx-auto`}>
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="architectural-panel p-6 sm:p-8 min-w-0"
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
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
                    Amministratore
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
                    <p className="text-sm font-body text-muted-foreground break-words">{company.address}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm font-body text-muted-foreground">{company.phone}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm font-body text-muted-foreground break-all">{company.pec}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            {company.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="architectural-panel p-6 sm:p-8 min-w-0"
              >
                <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certificazioni
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {company.certifications.map((cert) => (
                    <a
                      key={cert.name}
                      href={cert.pdf || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-2 bg-accent hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors group/cert cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-body font-medium text-accent-foreground group-hover/cert:text-primary transition-colors break-words">
                        {cert.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover/cert:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
