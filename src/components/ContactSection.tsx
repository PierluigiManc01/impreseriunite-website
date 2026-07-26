import { Mail, Phone, MapPin, Building2, FileText } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { siteContact } from "@/data/companies";

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

      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 border-t border-border">
          <ScrollReveal initialScale={0.95}>
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
                    href={siteContact.office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-body text-lg md:text-xl xl:text-2xl hover:text-primary transition-colors block"
                  >
                    {siteContact.office.street}
                    <br />
                    {siteContact.office.postalCode}, {siteContact.office.city} (
                    {siteContact.office.province}) – {siteContact.office.country}
                  </a>
                </div>
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <Phone className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    Telefono
                  </p>
                  <div className="text-foreground font-body text-lg md:text-xl xl:text-2xl">
                    {siteContact.phones.map((phone, index) => (
                      <span key={phone.href}>
                        {index > 0 && " – "}
                        <a href={phone.href} className="hover:text-primary transition-colors">
                          {phone.label}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                    <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    Email
                  </p>
                  {siteContact.emails.map((email) => (
                    <p key={email.href} className="text-foreground font-body text-lg md:text-xl xl:text-2xl">
                      <a href={email.href} className="hover:text-primary transition-colors">
                        {email.label}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal initialScale={0.95}>
            <div className="pt-10 md:pt-12 md:pl-14 border-t md:border-t-0 md:border-l border-border h-full">
              <h3 className="panel-title flex items-center gap-3 mb-8">
                <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Comunicazioni Istituzionali
              </h3>
              <div className="space-y-7">
                {siteContact.institutionalEmails.map((email) => (
                  <div key={email.href}>
                    <p className="micro-label text-muted-foreground flex items-center gap-2 mb-2">
                      <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                      {email.label}
                    </p>
                    <p className="text-foreground font-body text-lg md:text-xl xl:text-2xl break-all">
                      <a href={email.href} className="hover:text-primary transition-colors">
                        {email.value}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
