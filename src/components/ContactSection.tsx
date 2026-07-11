import { Mail, Phone, MapPin, Building2, FileText } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ContactSection = () => (
  <section id="contatti" className="section-shell bg-accent/50">
    <div className="container">
      <ScrollReveal>
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16 px-4 sm:px-0">
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

      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 border-t border-border">
          <ScrollReveal scaleRange={[0.95, 1.05, 0.95]} fadeOut={false}>
            <div className="pt-10 md:pt-12 md:pr-14 h-full">
              <h3 className="panel-title flex items-center gap-3 mb-8">
                <Building2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Sede Legale e Operativa
              </h3>
              <div className="space-y-7">
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    Indirizzo
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Piazzale+Benito+Juarez+10%2F11%2C+00144+Roma+RM%2C+Italia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-body text-base md:text-lg hover:text-primary transition-colors block"
                  >
                    Piazzale Benito Juarez 10/11<br />00144, Roma (RM) – Italia
                  </a>
                </div>
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <Phone className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    Telefono
                  </p>
                  <div className="text-foreground font-body text-base md:text-lg">
                    <a href="tel:+390645435416" className="hover:text-primary transition-colors">06 45435416</a> –{" "}
                    <a href="tel:+390645435417" className="hover:text-primary transition-colors">06 45435417</a> –{" "}
                    <a href="tel:+390645435418" className="hover:text-primary transition-colors">06 45435418</a>
                  </div>
                </div>
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    Email
                  </p>
                  <p className="text-foreground font-body text-base md:text-lg">
                    <a href="mailto:appalti@impreseriunite.it" className="hover:text-primary transition-colors">appalti@impreseriunite.it</a>
                  </p>
                  <p className="text-foreground font-body text-base md:text-lg">
                    <a href="mailto:info@impreseriunite.it" className="hover:text-primary transition-colors">info@impreseriunite.it</a>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal scaleRange={[0.95, 1.05, 0.95]} fadeOut={false}>
            <div className="pt-10 md:pt-12 md:pl-14 border-t md:border-t-0 md:border-l border-border h-full">
              <h3 className="panel-title flex items-center gap-3 mb-8">
                <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Comunicazioni Istituzionali
              </h3>
              <div className="space-y-7">
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    PEC Costruzioni Angelico
                  </p>
                  <p className="text-foreground font-body text-base md:text-lg break-all">
                    <a href="mailto:costruzioniangelicostradalisrl@legalmail.it" className="hover:text-primary transition-colors">
                      costruzioniangelicostradalisrl@legalmail.it
                    </a>
                  </p>
                </div>
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    PEC Nuova C.C.S.
                  </p>
                  <p className="text-foreground font-body text-base md:text-lg">
                    <a href="mailto:nuovaccs@legalmail.it" className="hover:text-primary transition-colors">
                      nuovaccs@legalmail.it
                    </a>
                  </p>
                </div>
                <div className="border-t border-border pt-6 mt-2">
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
    </div>
  </section>
);

export default ContactSection;
