import logo from "@/assets/impreseriunite-long-logo-removebg.png";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Chi Siamo", href: "/#chi-siamo" },
  { label: "Progetti", href: "/progetti" },
  { label: "Contatti", href: "/#contatti" },
];

// Certificazioni per la parità di genere (UNI/PdR 125:2022) — file PDF
// serviti staticamente da public/assets/certifications/.
const genderParityLinks = [
  {
    label: "Parità di genere — Costruzioni Angelico",
    href: "/assets/certifications/costruzioni-angelico/angelico-uni-pdr-125.pdf",
  },
  {
    label: "Parità di genere — Nuova C.C.S.",
    href: "/assets/certifications/nuova-ccs/nuova-ccs-pdr125.pdf",
  },
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
        <nav className="grid gap-2">
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
        <nav className="grid gap-2">
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
            </a>
          ))}
        </nav>
      </div>

      <div>
        <p className="micro-label mb-3 text-primary-foreground">
          Sede
        </p>
        <address className="not-italic text-base leading-relaxed text-primary-foreground/75">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Piazzale+Benito+Juarez+10%2F11%2C+00144+Roma+RM%2C+Italia"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary-foreground"
          >
            Piazzale Benito Juarez 10/11<br />
            00144 Roma (RM), Italia
          </a>
          <br />
          <a href="tel:+390645435416" className="transition-colors hover:text-primary-foreground">
            06 45435416
          </a>
          <br />
          <a href="mailto:appalti@impreseriunite.it" className="transition-colors hover:text-primary-foreground">
            appalti@impreseriunite.it
          </a>
        </address>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 py-4">
      <div className="container flex flex-col gap-2 text-sm text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <Link to="/#home" className="transition-colors hover:text-primary-foreground">
            © {new Date().getFullYear()} Imprese Riunite. Tutti i diritti riservati.
          </Link>
        </p>
        <p>
          <Link to="/azienda/costruzioni-angelico" className="transition-colors hover:text-primary-foreground">
            Costruzioni Angelico
          </Link>
          {" · "}
          <Link to="/azienda/nuova-ccs" className="transition-colors hover:text-primary-foreground">
            Nuova C.C.S.
          </Link>
          {" · "}
          <Link to="/azienda/gruppo-immobiliare-properzi" className="transition-colors hover:text-primary-foreground">
            Imprese Riunite
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
