import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export interface PillNavSubItem {
  label: string;
  href: string;
}

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  /** Desktop: revealed on hover. Mobile: rendered flat in place of the parent. */
  children?: PillNavSubItem[];
}

interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  /** Track background + hover-circle fill color (CSS color string). */
  baseColor?: string;
  /** Unhovered pill background color. */
  pillColor?: string;
  /** Label color while the hover circle is filled in. */
  hoveredPillTextColor?: string;
  /** Label color at rest. Defaults to baseColor. */
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
}

const isExternalLink = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("//") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("#");

const isRouterLink = (href: string) => !isExternalLink(href);

// Soft-cornered segmented nav with a GSAP hover animation: a circle rises
// from each item on hover/focus, masked by the item's rounded corners,
// while the label swaps for a differently-colored twin sliding in from below.
const PillNav = ({
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "hsl(217 91% 50%)",
  pillColor = "#fff",
  hoveredPillTextColor = "#fff",
  pillTextColor,
  onMobileMenuClick,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});

    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { visibility: "hidden", opacity: 0, y: 10 });
    }

    return () => window.removeEventListener("resize", layout);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);

    const lines = hamburgerRef.current?.querySelectorAll<HTMLElement>(".hamburger-line");
    if (lines?.length === 2) {
      if (next) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ["--base" as string]: baseColor,
    ["--pill-bg" as string]: pillColor,
    ["--hover-text" as string]: hoveredPillTextColor,
    ["--pill-text" as string]: resolvedPillTextColor,
  } as React.CSSProperties;

  const renderPillContent = (item: PillNavItem, i: number, isActive: boolean) => (
    <>
      <span
        ref={(el) => {
          circleRefs.current[i] = el;
        }}
        aria-hidden="true"
        className="hover-circle pointer-events-none absolute left-1/2 bottom-0 rounded-full will-change-transform"
        style={{ background: "var(--base)" }}
      />
      <span className="relative z-[2] inline-block leading-none">
        <span className="pill-label relative z-[2] inline-block whitespace-nowrap font-heading text-sm font-semibold leading-none will-change-transform lg:text-lg">
          {item.label}
        </span>
        <span
          aria-hidden="true"
          className="pill-label-hover absolute left-0 top-0 inline-block whitespace-nowrap font-heading text-sm font-semibold leading-none will-change-transform lg:text-lg"
          style={{ color: "var(--hover-text)" }}
        >
          {item.label}
        </span>
      </span>
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-1/2 z-[4] h-3 w-3 -translate-x-1/2 rounded-full"
          style={{ background: "var(--base)" }}
        />
      )}
    </>
  );

  return (
    <div className={className} style={cssVars}>
      <nav aria-label="Primary" className="hidden h-full items-stretch gap-[3px] rounded-2xl p-[3px] lg:flex" style={{ background: "var(--base)" }}>
        {items.map((item, i) => {
          const isActive = activeHref === item.href;
          const pillClass =
            "pill relative inline-flex h-full items-center justify-center overflow-hidden rounded-xl px-6 outline-none transition-none focus-visible:ring-2 focus-visible:ring-white/60 xl:px-8";
          const style = { background: "var(--pill-bg)", color: "var(--pill-text)" } as React.CSSProperties;

          const pill = isRouterLink(item.href) ? (
            <Link
              to={item.href}
              role="menuitem"
              aria-label={item.ariaLabel || item.label}
              className={pillClass}
              style={style}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {renderPillContent(item, i, isActive)}
            </Link>
          ) : (
            <a
              href={item.href}
              role="menuitem"
              aria-label={item.ariaLabel || item.label}
              className={pillClass}
              style={style}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {renderPillContent(item, i, isActive)}
            </a>
          );

          if (item.children?.length) {
            return (
              <div key={item.href} className="group relative flex items-stretch">
                {pill}
                {/* pt-2 keeps the hover area contiguous with the pill so the
                    dropdown doesn't vanish while the cursor crosses the gap. */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-[14rem] rounded-2xl border border-border bg-card p-1.5 shadow-xl">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          className="block whitespace-nowrap rounded-xl px-4 py-2.5 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }

          return <div key={item.href} className="flex items-stretch">{pill}</div>;
        })}
      </nav>

      <button
        ref={hamburgerRef}
        type="button"
        className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
        style={{ background: "var(--base)" }}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="pill-mobile-menu"
      >
        <span className="hamburger-line block h-0.5 w-4 rounded-full" style={{ background: "var(--pill-bg)" }} />
        <span className="hamburger-line block h-0.5 w-4 rounded-full" style={{ background: "var(--pill-bg)" }} />
      </button>

      {/* Fixed (not absolute) because this wrapper only spans the hamburger
          button's own width on mobile — an ancestor-relative popover would
          inherit that narrow width instead of the viewport's. */}
      <div
        ref={mobileMenuRef}
        id="pill-mobile-menu"
        className="invisible fixed inset-x-4 top-[6.75rem] z-40 rounded-3xl border border-border bg-card p-1 opacity-0 shadow-xl md:top-[7.75rem] lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {items.flatMap((item) => {
            // On mobile the parent (e.g. "Aziende") is replaced by its children
            // listed directly — no hover split.
            const entries = item.children?.length
              ? item.children.map((c) => ({ ...c, active: activeHref === c.href }))
              : [{ label: item.label, href: item.href, active: activeHref === item.href }];

            return entries.map((entry) => {
              const linkClass = `block rounded-2xl px-4 py-3 font-heading text-base font-semibold transition-colors ${
                entry.active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"
              }`;
              return (
                <li key={entry.href}>
                  {isRouterLink(entry.href) ? (
                    <Link to={entry.href} className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>
                      {entry.label}
                    </Link>
                  ) : (
                    <a href={entry.href} className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>
                      {entry.label}
                    </a>
                  )}
                </li>
              );
            });
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
