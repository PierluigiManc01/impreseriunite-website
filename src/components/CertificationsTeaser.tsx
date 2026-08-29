import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { certifiedCompanies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";
import DotField from "@/components/DotField";

// Unique certificate names across companies, as compact badges for the teaser.
const uniqueCertNames = Array.from(
  new Set(certifiedCompanies.flatMap((c) => c.certifications.map((cert) => cert.name)))
);

// Home teaser for the dedicated /certificazioni page (which also carries the
// full SOA registry). Keeps the home light while pointing to the source of truth.
const CertificationsTeaser = () => (
  <section id="certificazioni" className="section-shell relative isolate overflow-hidden bg-accent/80">
    <DotField
      className="pointer-events-none absolute inset-0 z-0"
      dotRadius={2.4}
      dotSpacing={18}
      cursorRadius={360}
      bulgeStrength={52}
      glowRadius={145}
      glowColor="rgba(239, 246, 255, 0.4)"
    />
    <div className="container relative z-10 px-4">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-eyebrow mb-3 justify-center">Qualità Verificata</p>
          <h2 className="section-title mb-4">Le Certificazioni</h2>
          <p className="section-copy mx-auto mb-8 max-w-3xl">
            Qualità, ambiente, sicurezza, energia e responsabilità sociale, oltre alle
            qualificazioni SOA per gli appalti pubblici. Ogni attestato è consultabile in originale.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <ul className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {uniqueCertNames.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3.5 py-1.5 font-body text-xs font-medium text-muted-foreground xl:px-4 xl:py-2 xl:text-sm 2xl:text-base"
            >
              <Award className="h-3.5 w-3.5 text-primary" />
              {name}
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <Link
            to="/certificazioni"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Vedi tutte le certificazioni
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CertificationsTeaser;
