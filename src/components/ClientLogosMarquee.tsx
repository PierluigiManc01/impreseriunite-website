import { motion } from "framer-motion";
import logo_roma from "../assets/committenti/logo-romacapitale.png";
import logo_difesa from "../assets/committenti/min-difesa.png";
import logo_enav from "../assets/committenti/enav.png";
import logo_anas from "../assets/committenti/anas-logo.png";
import logo_giustizia from "../assets/committenti/min-giustizia-removebg.png";
import logo_lavoripubblici from "../assets/committenti/Logo_MIT.png";
import logo_citta_metropolitana from "../assets/committenti/Citta-metropolitana-Roma.png";

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
  const duplicated = [...clients, ...clients];

  return (
    <section id="committenti" className="pt-6 pb-14 md:pt-8 md:pb-18 border-y border-border bg-background overflow-hidden">
      <div className="container mb-1">
        <p className="section-eyebrow text-center text-muted-foreground">
          I nostri committenti
        </p>
      </div>

      <div className="relative mb-4 mt-0">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-16 pr-16 items-center whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              aria-hidden={i >= clients.length}
              className="shrink-0 flex items-center justify-center h-45 w-60 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={i >= clients.length ? "" : client.name}
                className="max-h-full max-w-full object-contain"
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
