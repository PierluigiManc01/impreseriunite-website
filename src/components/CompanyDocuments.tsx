import { documentGroups, type Company } from "@/data/companies";

const CompanyDocuments = ({ company, compact = false }: { company: Company; compact?: boolean }) => (
  <div className={compact ? "space-y-7" : "space-y-12"}>
    {documentGroups.map((group) => {
      const documents = company.certifications.filter((document) => document.group === group.id);
      if (!documents.length) return null;
      const headingId = `${company.id}-${group.id}-documents`;
      return (
        <section key={group.id} aria-labelledby={headingId}>
          <h3 id={headingId} className={`border-b border-border pb-3 font-heading font-semibold text-foreground ${compact ? "text-base" : "text-2xl md:text-3xl"}`}>
            {group.label}
          </h3>
          {group.id === "soa" && (company.soaCategories?.length ?? 0) > 0 && (
            <dl className="grid grid-cols-2 gap-x-5 py-3 sm:grid-cols-3">
              {company.soaCategories?.map((category) => (
                <div key={category.code} className="py-3">
                  <dt className="font-heading text-lg font-semibold text-foreground">{category.code.replace(/\s+/g, "")} <span className="font-medium">{category.classifica}</span></dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{category.description}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul>
            {documents.map((document) => (
              <li key={document.pdf}>
                <a
                  href={document.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center justify-between gap-4 border-b border-border py-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span className="min-w-0">
                    <span className="block font-heading text-sm font-semibold leading-relaxed text-foreground md:text-base">{document.group === "soa" ? "Attestazione SOA" : document.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{document.kind}</span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-accent-foreground underline underline-offset-4">
                    Apri PDF<span className="sr-only"> (si apre in una nuova scheda)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
    })}
  </div>
);

export default CompanyDocuments;
