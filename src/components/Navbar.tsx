import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/impreseriunite-long-logo-removebg.png";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Chi Siamo", href: "/#chi-siamo" },
  { label: "Progetti", href: "/#progetti" },
  { label: "Contatti", href: "/#contatti" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useLayoutEffect(() => {
    if (!isHome || !location.hash) return;

    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ block: "start" });
  }, [isHome, location.hash]);

  const handleClick = () => {
    setOpen(false);
  };

  const handleLogoClick = () => {
    setOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4 md:h-24">
        {isHome ? (
          <a
            href="#home"
            className="flex min-h-11 items-center gap-2"
            onClick={handleLogoClick}
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
            onClick={handleLogoClick}
            aria-label="Vai alla home di Imprese Riunite"
          >
            <img
              src={logo}
              alt="Imprese Riunite"
              className="h-16 w-44 object-contain md:h-20 md:w-64"
            />
          </Link>
        )}
        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((l) =>
            isHome ? (
              <a
                key={l.href}
                href={l.href.replace("/", "")}
                onClick={handleClick}
                className="micro-label inline-flex min-h-11 items-center border-b border-transparent px-1 font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className="micro-label inline-flex min-h-11 items-center border-b border-transparent px-1 font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {l.label}
              </Link>
            )
          )}
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            id="mobile-navigation"
            className="overflow-hidden border-b border-border bg-card lg:hidden"
          >
            <div className="container flex flex-col divide-y divide-border py-2">
              {links.map((l) =>
                isHome ? (
                  <a
                    key={l.href}
                    href={l.href.replace("/", "")}
                    onClick={handleClick}
                    className="flex min-h-11 items-center px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
