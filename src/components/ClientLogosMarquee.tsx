import { motion } from "framer-motion";

const clients = [
  "ENAV",
  "Roma Capitale",
  "Ministero della Giustizia",
  "Ministero della Difesa",
  "Dipartimento Amministrazione Penitenziaria",
  "Provveditorato OO.PP.",
  "ANAS",
  "Aeronautica Militare",
];

const ClientLogosMarquee = () => {
  const duplicated = [...clients, ...clients];

  return (
    <section className="py-10 bg-background border-y border-border overflow-hidden">
      <div className="container mb-4">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold text-center">
          I nostri committenti
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicated.map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex items-center gap-3 px-6 py-3 bg-accent/60 rounded-lg border border-border/50 shrink-0"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-sm">
                  {client.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-body font-medium text-foreground">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
