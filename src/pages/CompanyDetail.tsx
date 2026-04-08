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
  ChevronRight,
} from "lucide-react";
import { companies } from "@/data/companies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = companies.find((c) => c.id === id);

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
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <Link
            to="/#aziende"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alle aziende
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
              {company.role}
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
              {company.name}
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
              {company.description}
            </p>
            {company.longDescription && (
              <p className="text-muted-foreground font-body leading-relaxed max-w-3xl mt-4">
                {company.longDescription}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Lavori Principali
              </h2>
            </div>
            <p className="text-muted-foreground font-body">
              Una selezione dei progetti più rappresentativi realizzati dall'azienda.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {company.projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="font-body">{project.location}</span>
                      </div>
                      {project.amount && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="font-body font-semibold text-foreground">
                            {project.amount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:text-right shrink-0">
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                      Stazione Appaltante
                    </p>
                    <p className="text-sm font-body text-foreground max-w-xs">
                      {project.client}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info & Certifications */}
      <section className="py-20 bg-accent/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 border border-border shadow-[var(--card-shadow)]"
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
                  <p className="text-sm font-body text-foreground font-medium">{company.fullName}</p>
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
                    <p className="text-sm font-body text-muted-foreground">{company.address}</p>
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 border border-border shadow-[var(--card-shadow)]"
            >
              <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certificazioni
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {company.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 bg-accent rounded-lg px-4 py-3"
                  >
                    <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-body font-medium text-accent-foreground">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
