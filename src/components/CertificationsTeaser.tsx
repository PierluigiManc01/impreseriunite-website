import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { certifiedCompanies, managementSystemSubjects } from "@/data/companies";
import DotField from "@/components/DotField";

const managementStandards = [...new Set(certifiedCompanies.flatMap((company) =>
  company.certifications.filter(({ group }) => group === "management").map(({ name }) => name)
))];

const pillStyle = "inline-flex min-h-11 max-w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-2.5 transition-[transform,background-color,border-color] duration-200 ease-out hover:border-primary/50 hover:bg-card motion-safe:hover:scale-[1.08] motion-safe:focus-visible:scale-[1.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-accent sm:gap-2 sm:px-5 sm:py-3";

const CertificationsTeaser = () => (
  <section id="certificazioni" className="section-shell relative isolate overflow-hidden bg-accent/80" aria-labelledby="certifications-home-title">
    <DotField
      className="pointer-events-none absolute inset-0 z-0"
      dotRadius={2.4}
      dotSpacing={18}
      cursorRadius={360}
      bulgeStrength={52}
      glowRadius={145}
      glowColor="rgba(239, 246, 255, 0.4)"
    />
    <div className="container relative text-center">
      <h2 id="certifications-home-title" className="section-title mb-8 md:mb-10">Le Certificazioni</h2>

      <ul className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4 md:mb-10 md:gap-5" aria-label="Sistemi di gestione ISO e qualificazioni SOA">
        {managementStandards.map((standard) => (
          <li key={standard} className="max-w-full">
            <Link to="/certificazioni" className={pillStyle} aria-label={`${managementSystemSubjects[standard]} ${standard}`}>
              <span className="font-heading text-sm font-semibold text-foreground sm:text-base">{managementSystemSubjects[standard]}</span>
              <span aria-hidden="true" className="text-muted-foreground">·</span>
              <span className="whitespace-nowrap text-xs font-medium text-muted-foreground sm:text-sm">{standard}</span>
            </Link>
          </li>
        ))}
        <li className="max-w-full">
          <Link to="/certificazioni" className={pillStyle} aria-label="Appalti pubblici SOA">
            <span className="font-heading text-sm font-semibold text-foreground sm:text-base">Appalti pubblici</span>
            <span aria-hidden="true" className="text-muted-foreground">·</span>
            <span className="text-xs font-medium text-muted-foreground sm:text-sm">SOA</span>
          </Link>
        </li>
      </ul>

      <Link
        to="/certificazioni"
        className="group inline-flex min-h-11 items-center gap-3 rounded-xl bg-primary px-6 py-3 font-heading text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-accent"
      >
        Scopri certificazioni e SOA
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
      </Link>
    </div>
  </section>
);

export default CertificationsTeaser;
