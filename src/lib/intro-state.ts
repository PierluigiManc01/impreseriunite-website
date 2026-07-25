// In-memory guard for the hero intro. It lives for a single document load, so
// the intro plays when the home URL is opened fresh (and on a page refresh),
// but never on client-side navigations within the SPA.
let played = false;

// If the very first document load did NOT land on the home route, treat the
// intro as already played: navigating home later (via a button/link) must not
// trigger it. Only opening or refreshing the home URL itself replays the intro.
if (typeof window !== "undefined" && window.location.pathname !== "/") {
  played = true;
}

export const hasIntroPlayed = () => played;

export const markIntroPlayed = () => {
  played = true;
};
