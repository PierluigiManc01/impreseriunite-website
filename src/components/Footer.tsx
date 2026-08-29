import logo from "@/assets/impreseriunite-long-logo-removebg.png";
import award2023 from "@/assets/awards/cassa-edile-awards-2023.svg";
import award2024 from "@/assets/awards/cassa-edile-awards-2024.svg";
import award2025 from "@/assets/awards/cassa-edile-awards-2025.svg";
import { Link } from "react-router-dom";
import { certifiedCompanies, siteContact } from "@/data/companies";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Chi Siamo", href: "/#chi-siamo" },
  { label: "Progetti", href: "/progetti" },
  { label: "Contatti", href: "/#contatti" },
];

const genderParityLinks = certifiedCompanies.flatMap((company) =>
  company.certifications
    .filter(({ name }) => name.startsWith("UNI/PdR 125"))
    .map(({ pdf }) => ({
      label: `Parità di genere — ${company.name}`,
      href: pdf,
    }))
);

const awardLinks = [
  { year: "2023", image: award2023 },
  { year: "2024", image: award2024 },
  { year: "2025", image: award2025 },
];

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container grid gap-8 py-10 md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] md:gap-10 md:py-14">
      <div>
        <Link to="/#home" aria-label="Vai alla home di Imprese Riunite" className="inline-block">
          <img
            src={logo}
            alt="Imprese Riunite"
            className="mb-4 h-14 w-44 object-contain brightness-0 invert"
          />
        </Link>
        <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
          Gruppo operativo nel settore delle opere pubbliche, infrastrutture, costruzioni civili e impiantistica.
        </p>
      </div>

      <div>
        <p className="micro-label mb-3 text-primary-foreground">
          Navigazione
        </p>
        <nav aria-label="Navigazione nel piè di pagina" className="grid gap-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-base text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <p className="micro-label mb-3 text-primary-foreground">
          Compliance
        </p>
        <nav aria-label="Certificazioni e conformità" className="grid gap-2">
          <Link
            to="/certificazioni"
            className="text-lg text-primary-foreground/75 transition-colors hover:text-primary-foreground"
          >
            Certificazioni
          </Link>
          {genderParityLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              {link.label}
              <span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
          ))}
        </nav>
      </div>

      <div>
        <p className="micro-label mb-3 text-primary-foreground">
          Sede
        </p>
        <address className="space-y-2 not-italic text-base leading-relaxed text-primary-foreground/75">
          <a
            href={siteContact.office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 transition-colors hover:text-primary-foreground"
          >
            <MapPin className="mt-1 w-3.5 shrink-0 text-primary" />
            <span>
              {siteContact.office.street}
              <br />
              {siteContact.office.postalCode} {siteContact.office.city} (
              {siteContact.office.province}), {siteContact.office.country}
            </span>
          </a>
          <a
            href={siteContact.phones[0].href}
            className="flex items-center gap-2 transition-colors hover:text-primary-foreground"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.5} />
            <span>{siteContact.phones[0].label}</span>
          </a>
          <a
            href={siteContact.publicEmail.href}
            className="flex items-center gap-2 transition-colors hover:text-primary-foreground"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span>{siteContact.publicEmail.label}</span>
          </a>
        </address>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container grid gap-8 py-8 text-xs leading-relaxed text-primary-foreground/50 sm:text-sm md:grid-cols-[1fr_1.35fr] md:items-center md:gap-12 md:py-10">
        <div className="order-2 md:order-1">
          <p>© 2026 Imprese Riunite. Tutti i diritti riservati.</p>
          <div className="mt-3 grid gap-2">
            <p>
              Costruzioni Angelico Edili Stradali S.r.l. | P.IVA 00902311000
              <br />
              Sede legale: Piazzale Benito Juarez 10/11 - 00144, Roma (RM)
            </p>
            <p>
              Nuova C.C.S. S.r.l. | P.IVA 05289751009
              <br />
              Sede legale: Piazzale Benito Juarez 10/11 - 00144, Roma (RM)
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2 md:justify-self-end">
          <p className="micro-label mb-3 text-primary-foreground">Riconoscimenti</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-5" aria-label="Cassa Edile Awards">
            {awardLinks.map((award) => (
              <div key={award.year} className="rounded-md">
                <img src={award.image} alt={`Cassa Edile Awards ${award.year}`} className="h-auto w-24 sm:w-32 lg:w-36" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
