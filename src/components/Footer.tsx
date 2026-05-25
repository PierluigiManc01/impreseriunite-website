import logo from "@/assets/impreseriunite-long-logo-removebg.png";

const footerLinks = [
  { label: "Chi siamo", href: "/#chi-siamo" },
  { label: "Committenti", href: "/#committenti" },
  { label: "Aziende", href: "/#aziende" },
  { label: "Progetti", href: "/#progetti" },
  { label: "Contatti", href: "/#contatti" },
];

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-16">
      <div>
        <img
          src={logo}
          alt="Imprese Riunite"
          className="mb-5 h-20 w-64 object-contain brightness-0 invert"
        />
        <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
          Gruppo operativo nel settore delle opere pubbliche, infrastrutture, costruzioni civili e impiantistica.
        </p>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
          Navigazione
        </p>
        <nav className="grid gap-2">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
          Sede
        </p>
        <address className="not-italic text-base leading-relaxed text-primary-foreground/75">
          Piazzale Benito Juarez 10/11<br />
          00144 Roma (RM), Italia<br />
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
    <div className="border-t border-primary-foreground/10 py-5">
      <div className="container flex flex-col gap-2 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Imprese Riunite. Tutti i diritti riservati.</p>
        <p>Costruzioni Angelico · Nuova C.C.S. · Imprese Riunite</p>
      </div>
    </div>
  </footer>
);

export default Footer;
