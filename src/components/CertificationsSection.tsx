import { Award, ExternalLink, FileText } from "lucide-react";
import { companies } from "@/data/companies";
import ScrollReveal from "@/components/ScrollReveal";

const certifiedCompanies = companies.filter((c) => c.certifications.length > 0);

const CertificationsSection = () => (
  <section id="certificazioni" className="section-shell bg-background">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <p className="section-eyebrow mb-3 px-6 md:px-0">
            Qualità Verificata
          </p>
          <h2 className="section-title mb-4 px-8 md:px-0">
            Le Certificazioni
          </h2>
          <p className="section-copy px-4 md:px-0">
            Ogni attestato è consultabile in originale: qualità, ambiente, sicurezza, energia e responsabilità sociale, a garanzia della pubblica amministrazione e dei nostri partner.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {certifiedCompanies.map((company) => (
          <ScrollReveal key={company.id} className="h-full" fadeOut={false}>
            <div className="architectural-panel h-full p-6 sm:p-8">
              <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                <h3 className="panel-title flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary shrink-0" />
                  {company.name}
                </h3>
                <span className="micro-label text-muted-foreground">
                  {company.certifications.length} attestati
                </span>
              </div>
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
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
