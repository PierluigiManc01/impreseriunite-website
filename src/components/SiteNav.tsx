import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface SiteNavProps {
  items: NavItem[];
  activeHref: string;
  contactHref: string;
}

const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4";

const SiteNav = ({ items, activeHref, contactHref }: SiteNavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const companiesLinkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setCompaniesOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen && !companiesOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setMobileOpen(false);
        setCompaniesOpen(false);
      }
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (companiesOpen) companiesLinkRef.current?.focus();
      else mobileButtonRef.current?.focus();
      setMobileOpen(false);
      setCompaniesOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [mobileOpen, companiesOpen]);

  const renderLink = (item: NavItem, className: string, companyTrigger = false) => {
    const active = activeHref === item.href;
    const highlighted = active || item.children?.some(({ href }) => activeHref === href);
    const props = {
      ref: companyTrigger ? companiesLinkRef : undefined,
      className: `${className} ${focusStyle} ${highlighted ? "font-semibold underline decoration-1 underline-offset-8" : "font-medium"}`,
      "aria-current": active ? (item.href.includes("#") ? "location" as const : "page" as const) : undefined,
      "aria-expanded": companyTrigger ? companiesOpen : undefined,
      "aria-controls": companyTrigger ? "company-navigation" : undefined,
    };
    return item.href.startsWith("#")
      ? <a href={item.href} {...props}>{item.label}</a>
      : <Link to={item.href} {...props}>{item.label}</Link>;
  };

  return (
    <nav
      ref={rootRef}
      aria-label="Navigazione principale"
      className="relative text-foreground"
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          setMobileOpen(false);
          setCompaniesOpen(false);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setMobileOpen(false);
          setCompaniesOpen(false);
        }
      }}
    >
      <div className="hidden items-center gap-7 lg:flex xl:gap-9">
        {items.map((item) => (
          <div
            key={item.href}
            className="relative flex items-center"
            onMouseEnter={item.children ? () => setCompaniesOpen(true) : undefined}
            onMouseLeave={item.children ? (event) => {
              if (!event.currentTarget.contains(document.activeElement)) setCompaniesOpen(false);
            } : undefined}
            onFocus={item.children ? () => setCompaniesOpen(true) : undefined}
            onBlur={item.children ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setCompaniesOpen(false);
            } : undefined}
          >
            {renderLink(item, "inline-flex min-h-11 items-center text-sm transition-colors hover:text-accent-foreground xl:text-base", Boolean(item.children))}
            {item.children && (
                <div id="company-navigation" hidden={!companiesOpen} className="absolute left-0 top-full w-64 border border-border bg-card p-2">
                  {item.children.map((child) => (
                    <div key={child.href}>{renderLink(child, "flex min-h-11 items-center rounded-sm px-3 text-sm hover:bg-secondary")}</div>
                  ))}
                </div>
            )}
          </div>
        ))}
        {renderLink({ label: "Contatti", href: contactHref }, "inline-flex min-h-11 items-center rounded-lg px-5 text-sm transition-colors hover:bg-secondary xl:text-base")}
      </div>

      <button
        ref={mobileButtonRef}
        type="button"
        aria-label={mobileOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`flex h-12 w-12 items-center justify-center rounded-lg hover:bg-secondary lg:hidden ${focusStyle}`}
      >
        {mobileOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
      </button>
      <div id="mobile-navigation" hidden={!mobileOpen} className="absolute right-0 top-[calc(100%+1rem)] max-h-[calc(100dvh-var(--site-navbar-height)-2rem)] w-[min(21rem,calc(100vw-2rem))] overflow-y-auto border border-border bg-card p-4 lg:hidden">
        {items.map((item) => (
          <div key={item.href}>
            {renderLink(item, "flex min-h-11 items-center px-2 text-base hover:bg-secondary")}
            {item.children && (
              <div className="mb-2 ml-2 border-l border-border pl-3">
                {item.children.map((child) => (
                  <div key={child.href}>{renderLink(child, "flex min-h-11 items-center px-2 text-sm hover:bg-secondary")}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div>{renderLink({ label: "Contatti", href: contactHref }, "flex min-h-11 items-center px-2 text-base hover:bg-secondary")}</div>
      </div>
    </nav>
  );
};

export default SiteNav;
