import { Mail, Phone, MapPin, Building2, FileText } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ContactSection = () => (
  <section id="contatti" className="section-shell bg-accent/50">
    <div className="container">
      <ScrollReveal>
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10 px-4 sm:px-0">
          <p className="section-eyebrow mb-3">
            Informazioni Istituzionali
          </p>
          <h2 className="section-title mb-4">
            Sede e contatti del Gruppo
          </h2>
          <p className="section-copy px-4 md:px-0">
            Imprese Riunite opera prevalentemente nel settore delle opere pubbliche. Per informazioni istituzionali e comunicazioni ufficiali, di seguito i nostri recapiti.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-5xl mx-auto px-4 md:px-0">
        <ScrollReveal scaleRange={[0.95, 1.05, 0.95]} fadeOut={false}>
          <div className="architectural-panel p-8 h-full">
            <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Sede Legale e Operativa
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-base font-medium text-foreground">Indirizzo</p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Piazzale+Benito+Juarez+10%2F11%2C+00144+Roma+RM%2C+Italia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground font-body text-base hover:text-primary transition-colors block"
                  >
                    Piazzale Benito Juarez 10/11<br />00144, Roma (RM) – Italia
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-base font-medium text-foreground">Telefono</p>
                  <div className="text-muted-foreground font-body text-base">
                    <a href="tel:+390645435416" className="hover:text-primary transition-colors">06 45435416</a> –{" "}
                    <a href="tel:+390645435417" className="hover:text-primary transition-colors">06 45435417</a> –{" "}
                    <a href="tel:+390645435418" className="hover:text-primary transition-colors">06 45435418</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-base font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground font-body text-base">
                    <a href="mailto:appalti@impreseriunite.it" className="hover:text-primary transition-colors">appalti@impreseriunite.it</a>
                  </p>
                  <p className="text-muted-foreground font-body text-base">
                    <a href="mailto:info@impreseriunite.it" className="hover:text-primary transition-colors">info@impreseriunite.it</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal scaleRange={[0.95, 1.05, 0.95]} fadeOut={false}>
          <div className="architectural-panel p-8 h-full">
            <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Comunicazioni Istituzionali
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-base font-medium text-foreground">PEC Costruzioni Angelico</p>
                  <p className="text-muted-foreground font-body text-base break-all">
                    <a href="mailto:costruzioniangelicostradalisrl@legalmail.it" className="hover:text-primary transition-colors">
                      costruzioniangelicostradalisrl@legalmail.it
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-base font-medium text-foreground">PEC Nuova C.C.S.</p>
                  <p className="text-muted-foreground font-body text-base">
                    <a href="mailto:nuovaccs@legalmail.it" className="hover:text-primary transition-colors">
                      nuovaccs@legalmail.it
                    </a>
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-5 mt-5">
                <p className="section-copy">
                  Le attività del Gruppo sono svolte per circa il 90% nel settore delle opere pubbliche.
                  Per informazioni su gare d'appalto e procedure di evidenza pubblica, contattare l'ufficio appalti tramite i recapiti indicati.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default ContactSection;
