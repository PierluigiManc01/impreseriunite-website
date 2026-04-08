const Footer = () => (
  <footer className="py-8 bg-foreground">
    <div className="container text-center">
      <p className="font-heading font-bold text-primary-foreground text-lg mb-2">IMPRESE RIUNITE</p>
      <p className="text-primary-foreground/50 font-body text-sm">
        © {new Date().getFullYear()} Imprese Riunite. Tutti i diritti riservati.
      </p>
    </div>
  </footer>
);

export default Footer;
