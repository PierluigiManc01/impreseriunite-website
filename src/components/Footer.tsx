const Footer = () => (
  <footer className="py-8 bg-foreground">
    <div className="container text-center px-4 md:px-8">
      <p className="font-heading font-bold text-primary-foreground text-sm sm:text-lg mb-2 tracking-widest sm:tracking-normal">IMPRESE RIUNITE</p>
      <p className="text-primary-foreground/50 font-body text-xs sm:text-sm">
        © {new Date().getFullYear()} Imprese Riunite. Tutti i diritti riservati.
      </p>
    </div>
  </footer>
);

export default Footer;
