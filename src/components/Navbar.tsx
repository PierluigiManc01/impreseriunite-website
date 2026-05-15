import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/impreseriunite-long-logo-removebg.png";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Chi Siamo", href: "/#chi-siamo" },
  { label: "Storia", href: "/#storia" },
  { label: "Aziende", href: "/#aziende" },
  { label: "Progetti", href: "/#progetti" },
  { label: "Contatti", href: "/#contatti" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!location.hash) return;

    window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsHidden(false);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (isHome && href.startsWith("/#")) {
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setOpen(false);
    if (isHome) {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border transition-transform duration-300 ease-in-out ${isHidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="container flex items-center justify-between h-30 md:h-40">
        <Link to="/#home" className="flex items-center gap-2" onClick={handleLogoClick}>
          <img src={logo} alt="Imprese Riunite" className="h-30 w-44 md:h-35 md:w-80 object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            isHome ? (
              <a
                key={l.href}
                href={l.href.replace("/", "")}
                className="text-2xl font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className="text-2xl font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </div>
        <button
          className="md:hidden text-foreground"
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
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-4">
              {links.map((l) =>
                isHome ? (
                  <a
                    key={l.href}
                    href={l.href.replace("/", "")}
                    onClick={() => handleClick(l.href)}
                    className="text-xl font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium text-muted-foreground hover:text-primary transition-colors"
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
