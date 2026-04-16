import { Mail, Phone, MapPin, Building2, FileText } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ContactSection = () => (
  <section id="contatti" className="py-24 bg-accent/50">
    <div className="container">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
            Informazioni Istituzionali
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Sede e contatti del Gruppo
          </h2>
          <p className="text-muted-foreground font-body">
            Imprese Riunite opera prevalentemente nel settore delle opere pubbliche. Per informazioni istituzionali e comunicazioni ufficiali, di seguito i nostri recapiti.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto px-4 md:px-0">
        <ScrollReveal scaleRange={[0.95, 1.05, 0.95]} fadeOut={false}>
          <div className="bg-card rounded-xl p-8 border border-border shadow-[var(--card-shadow)] h-full">
            <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Sede Legale e Operativa
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">Indirizzo</p>
                  <p className="text-muted-foreground font-body text-sm">
                    Piazzale Benito Juarez 10/11<br />00144, Roma (RM) – Italia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">Telefono</p>
                  <p className="text-muted-foreground font-body text-sm">
                    06 45435416 – 06 45435417 – 06 45435418
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground font-body text-sm">appalti@impreseriunite.it</p>
                  <p className="text-muted-foreground font-body text-sm">info@impreseriunite.it</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal scaleRange={[0.95, 1.05, 0.95]} fadeOut={false}>
          <div className="bg-card rounded-xl p-8 border border-border shadow-[var(--card-shadow)] h-full">
            <h3 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Comunicazioni Istituzionali
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">PEC Costruzioni Angelico</p>
                  <p className="text-muted-foreground font-body text-sm break-all">
                    costruzioniangelicostradalisrl@legalmail.it
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">PEC Nuova C.C.S.</p>
                  <p className="text-muted-foreground font-body text-sm">nuovaccs@legalmail.it</p>
                </div>
              </div>
              <div className="border-t border-border pt-5 mt-5">
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
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
