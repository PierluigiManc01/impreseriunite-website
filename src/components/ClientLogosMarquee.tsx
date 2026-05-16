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
  { name: "Ministero dei Lavori Pubblici", logo: logo_lavoripubblici },
  { name: "Città Metropolitana di Roma", logo: logo_citta_metropolitana },
];

const ClientLogosMarquee = () => {
  const duplicated = [...clients, ...clients];

  return (
    <section className="py-18 bg-background border-y border-border overflow-hidden">
      <div className="container mb-2 mt-5">
        <p className="text-xs md:text-sm tracking-widest md:tracking-[0.2em] uppercase text-muted-foreground font-semibold text-center px-4 md:px-0">
          I nostri committenti
        </p>
      </div>
      <div className="relative mb-5 mt-0">
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
              className="shrink-0 flex items-center justify-center h-45 w-60 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="hidden items-center justify-center h-full w-full rounded-md bg-muted/50 border border-border/30 px-4"
              >
                <span className="text-xs font-body text-muted-foreground text-center whitespace-normal leading-tight">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
