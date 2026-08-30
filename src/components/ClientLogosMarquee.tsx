import { motion, useReducedMotion } from "framer-motion";
import logo_roma from "../assets/committenti/logo-romacapitale.webp";
import logo_difesa from "../assets/committenti/min-difesa.webp";
import logo_enav from "../assets/committenti/enav.webp";
import logo_anas from "../assets/committenti/anas-logo.webp";
import logo_giustizia from "../assets/committenti/min-giustizia-removebg.webp";
import logo_lavoripubblici from "../assets/committenti/Logo_MIT.webp";
import logo_citta_metropolitana from "../assets/committenti/Citta-metropolitana-Roma.webp";
import { useIsMobile } from "@/hooks/use-mobile";

const clients = [
  { name: "Roma Capitale", logo: logo_roma },
  { name: "Ministero della Difesa", logo: logo_difesa },
  { name: "ENAV", logo: logo_enav },
  { name: "ANAS", logo: logo_anas },
  { name: "Ministero della Giustizia", logo: logo_giustizia },
  { name: "Ministero delle Infrastrutture", logo: logo_lavoripubblici },
  { name: "Città Metropolitana di Roma", logo: logo_citta_metropolitana },
];

const ClientLogosMarquee = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const displayedClients = prefersReducedMotion ? clients : [...clients, ...clients];

  return (
    <section id="committenti" className="overflow-hidden border-y border-border bg-background py-8 md:pt-20 md:pb-24">
      <div className="container mb-4 md:mb-12">
        <p className="section-eyebrow whitespace-nowrap text-center text-muted-foreground">
          I nostri committenti
        </p>
      </div>

      <div className="relative mb-0 mt-0">
        {!prefersReducedMotion && (
          <>
            <div className="absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-32" />
            <div className="absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-32" />
          </>
        )}

        <motion.div
          className={
            prefersReducedMotion
              ? "container grid grid-cols-2 items-center gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-12"
              : "flex w-max items-center gap-4 whitespace-nowrap pr-4 md:gap-16 md:pr-16"
          }
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: isMobile ? 12 : 20,
                    ease: "linear",
                  },
                }
          }
        >
          {displayedClients.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              aria-hidden={i >= clients.length}
              className={`flex h-24 shrink-0 items-center justify-center transition-all duration-300 md:h-45 md:w-60 ${
                prefersReducedMotion
                  ? "w-full"
                  : "w-[calc((100vw-2rem)/2)]"
              }`}
            >
              <img
                src={client.logo}
                alt={i >= clients.length ? "" : client.name}
                className="max-h-16 max-w-[82%] object-contain md:max-h-full md:max-w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
