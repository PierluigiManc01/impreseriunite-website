import { motion } from "framer-motion";

const clients = [
  { name: "ENAV", logo: "/loghi-committenti/enav.png" },
  { name: "Roma Capitale", logo: "/loghi-committenti/roma-capitale.png" },
  { name: "Ministero della Giustizia", logo: "/loghi-committenti/min-giustizia.png" },
  { name: "Ministero della Difesa", logo: "/loghi-committenti/min-difesa.png" },
  { name: "Dipartimento Amministrazione Penitenziaria", logo: "/loghi-committenti/dap.png" },
  { name: "Provveditorato OO.PP.", logo: "/loghi-committenti/provveditorato.png" },
  { name: "ANAS", logo: "/loghi-committenti/anas.png" },
  { name: "Aeronautica Militare", logo: "/loghi-committenti/aeronautica.png" },
];

const ClientLogosMarquee = () => {
  const duplicated = [...clients, ...clients];

  return (
    <section className="py-12 bg-background border-y border-border overflow-hidden">
      <div className="container mb-6">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold text-center">
          I nostri committenti
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="shrink-0 flex items-center justify-center h-16 w-40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
