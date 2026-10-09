import logo from "@/assets/impreseriunite-long-logo-removebg.png";
import award2023 from "@/assets/awards/cassa-edile-awards-2023.svg";
import award2024 from "@/assets/awards/cassa-edile-awards-2024.svg";
import award2025 from "@/assets/awards/cassa-edile-awards-2025.svg";
import award2026 from "@/assets/awards/cassa-edile-awards-2026.svg";
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
  { label: "Cassa Edile Awards 2023", image: award2023 },
  { label: "Cassa Edile Awards 2024", image: award2024 },
  { label: "Cassa Edile Awards 2025", image: award2025 },
  { label: "Cassa Edile Awards 2026", image: award2026 },
];

const sharedLegalAddress = certifiedCompanies.every((company) => company.address === certifiedCompanies[0]?.address)
  ? certifiedCompanies[0]?.address
  : undefined;

const legalLinkStyle = "inline-flex min-h-11 items-center text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground";

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] md:gap-8 md:py-10">
      <div className="col-span-2 md:col-span-1">
        <Link to="/#home" aria-label="Vai alla home di Imprese Riunite" className="inline-block">
          <img
            src={logo}
            alt="Imprese Riunite"
            className="mb-3 h-12 w-40 object-contain brightness-0 invert"
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
            className="text-base text-primary-foreground/75 transition-colors hover:text-primary-foreground"
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

      <div className="col-span-2 md:col-span-1">
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
      <div className="container flex flex-col gap-4 py-3 text-xs leading-relaxed text-primary-foreground/75 lg:flex-row lg:items-center lg:justify-between lg:gap-8 md:py-4">
        <div className="order-2 min-w-0 lg:order-1">
          <div className="flex flex-wrap items-center gap-x-6">
            <p>© 2026 Imprese Riunite. Tutti i diritti riservati.</p>
            <nav aria-label="Informative legali" className="flex flex-wrap gap-x-4">
              <Link to="/privacy-policy" className={legalLinkStyle}>Privacy Policy</Link>
              <Link to="/cookie-policy" className={legalLinkStyle}>Cookie Policy</Link>
            </nav>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {certifiedCompanies.map((company) => (
              <p key={company.id}>
                {company.fullName} · P.IVA {company.vatNumber}
                {!sharedLegalAddress && <span className="block">Sede legale: {company.address}</span>}
              </p>
            ))}
          </div>
          {sharedLegalAddress && <p className="mt-1">Sede legale delle società: {sharedLegalAddress}</p>}
        </div>
        <div className="order-1 flex shrink-0 items-start gap-3 lg:order-2" role="group" aria-label="Cassa Edile Awards">
          {awardLinks.map((award) => (
            <img
              key={award.label}
              src={award.image}
              alt={award.label}
              className="h-14 w-12 shrink-0 object-contain"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
