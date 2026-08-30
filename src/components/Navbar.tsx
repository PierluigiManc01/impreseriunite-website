import { useLayoutEffect, useMemo } from "react";
import logo from "@/assets/impreseriunite-long-logo-removebg.png";
import { Link, useLocation } from "react-router-dom";
import PillNav, { type PillNavItem } from "@/components/PillNav";

const links: PillNavItem[] = [
  { label: "Home", href: "/#home" },
  {
    label: "Aziende",
    href: "/#aziende",
    children: [
      { label: "Costruzioni Angelico", href: "/azienda/costruzioni-angelico" },
      { label: "Nuova C.C.S.", href: "/azienda/nuova-ccs" },
      {
        label: "Imprese Riunite",
        href: "/azienda/gruppo-immobiliare-properzi",
      },
    ],
  },
  { label: "Certificazioni", href: "/certificazioni" },
  { label: "Progetti", href: "/progetti" },
];

const isAnchorLink = (href: string) => href.startsWith("/#");

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useLayoutEffect(() => {
    if (!isHome || !location.hash) return;

    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ block: "start" });
  }, [isHome, location.hash]);

  // On the home page, section links are same-page anchors ("#chi-siamo") so
  // clicking them doesn't trigger a route change; elsewhere they're full
  // router links ("/#chi-siamo") that navigate home before scrolling.
  // Memoized so PillNav's layout effect (which resets the hover circles to
  // scale 0) doesn't re-run — and interrupt an in-progress hover — on every
  // unrelated Navbar re-render.
  const items: PillNavItem[] = useMemo(
    () =>
      links.map((l) => ({
        label: l.label,
        href: isHome && isAnchorLink(l.href) ? l.href.replace("/", "") : l.href,
        children: l.children,
      })),
    [isHome]
  );

  const activeHref = isHome ? location.hash || "#home" : location.pathname;

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="container flex h-[var(--site-navbar-height)] items-center justify-between gap-4">
        {isHome ? (
          <a
            href="#home"
            className="flex min-h-11 items-center gap-2"
            aria-label="Vai alla home di Imprese Riunite"
          >
            <img
              src={logo}
              alt="Imprese Riunite"
              className="h-16 w-44 object-contain md:h-20 md:w-64"
            />
          </a>
        ) : (
          <Link
            to="/#home"
            className="flex min-h-11 items-center gap-2"
            aria-label="Vai alla home di Imprese Riunite"
          >
            <img
              src={logo}
              alt="Imprese Riunite"
              className="h-16 w-44 object-contain md:h-20 md:w-64"
            />
          </Link>
        )}

        <PillNav
          className="relative h-12 w-[3.25rem] lg:w-auto"
          items={items}
          activeHref={activeHref}
        />
      </div>
    </header>
  );
};

export default Navbar;
