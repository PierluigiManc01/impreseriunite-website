import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { legalCompanies, legalContact, legalPolicies } from "@/data/legal";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";

const LegalPolicy = ({ policy }: { policy: keyof typeof legalPolicies }) => {
  const content = legalPolicies[policy];
  useDocumentMetadata(`${content.title} | Imprese Riunite`, content.description);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="container pb-16 pt-[calc(var(--site-navbar-height)+3rem)] md:pb-24">
        <article className="mx-auto max-w-3xl">
          <Link to="/#home" className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">Torna alla home</Link>
          <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">{content.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{content.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">Ultimo aggiornamento: 6 ottobre 2026</p>
          <div className="mt-10 space-y-9">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 font-heading text-xl font-semibold text-foreground md:text-2xl">{section.title}</h2>
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
            <section>
              <h2 className="mb-3 font-heading text-xl font-semibold text-foreground md:text-2xl">Recapiti delle società</h2>
              <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                {legalCompanies.map((company) => (
                  <li key={company.id}>
                    <strong className="block text-foreground">{company.fullName}</strong>
                    <span className="block">P.IVA {company.vatNumber} — {company.address}</span>
                    <a href={`mailto:${company.pec}`} className="underline underline-offset-4 hover:text-foreground">{company.pec}</a>
                  </li>
                ))}
              </ul>
              <a href={legalContact.href} className="mt-4 inline-flex min-h-11 items-center break-all text-sm font-medium text-accent-foreground underline underline-offset-4">{legalContact.label}</a>
            </section>
            <nav aria-label="Informative e fonti privacy" className="flex flex-col items-start gap-3 border-t border-border pt-6 text-sm text-accent-foreground [&_a]:underline [&_a]:underline-offset-4">
              <Link to={policy === "privacy" ? "/cookie-policy" : "/privacy-policy"}>{policy === "privacy" ? "Cookie Policy" : "Privacy Policy"}</Link>
              <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali<span className="sr-only"> (si apre in una nuova scheda)</span></a>
              <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Informativa privacy Vercel<span className="sr-only"> (si apre in una nuova scheda)</span></a>
              <a href="https://fonts.google.com/faq" target="_blank" rel="noopener noreferrer">Google Fonts: privacy e dati tecnici<span className="sr-only"> (si apre in una nuova scheda)</span></a>
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPolicy;
