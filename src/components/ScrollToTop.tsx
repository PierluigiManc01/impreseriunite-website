import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// On route (pathname) changes, jump to the top of the page so that navigating
// to any page via a button always lands at its top. Hash navigations are
// skipped — those scroll to a specific section (handled in Navbar).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
