import { companies, operatingCompanies, siteContact, type Company } from "@/data/companies";
import { legalPolicies } from "@/data/legal";

export const SITE_URL = "https://www.impreseriunite.it";
export const SITE_NAME = "Imprese Riunite";
export const GROUP_ID = "gruppo-immobiliare-properzi";

export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Logo Imprese Riunite",
} as const;

export const HERO_TAGLINE =
  "Costruzioni, infrastrutture e impiantistica: oltre 50 anni di grandi opere civili al servizio del territorio.";

export type JsonLdNode = Record<string, unknown>;

export type SeoMeta = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  jsonLd?: JsonLdNode[];
};

export const plainText = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export const truncate = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

const group = companies.find(({ id }) => id === GROUP_ID)!;
const orgId = (company: Company) =>
  company.id === GROUP_ID
    ? `${SITE_URL}/#organization`
    : `${absoluteUrl(`/azienda/${company.id}`)}#organization`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteContact.office.street,
  postalCode: siteContact.office.postalCode,
  addressLocality: siteContact.office.city,
  addressRegion: siteContact.office.province,
  addressCountry: "IT",
};

export const companyNode = (company: Company): JsonLdNode => {
  const isGroup = company.id === GROUP_ID;

  return {
    "@type": company.id === "costruzioni-angelico" ? "GeneralContractor" : "Organization",
    "@id": orgId(company),
    name: isGroup ? company.name : company.fullName,
    alternateName: isGroup ? company.fullName : company.name,
    url: isGroup ? `${SITE_URL}/` : absoluteUrl(`/azienda/${company.id}`),
    description: plainText(company.description),
    ...(company.foundedYear && { foundingDate: company.foundedYear }),
    ...(company.vatNumber && { vatID: `IT${company.vatNumber}` }),
    address: postalAddress,
    // Pin of the verified Google Business Profile.
    geo: { "@type": "GeoCoordinates", latitude: 41.8293628, longitude: 12.4789775 },
    telephone: siteContact.phones[0].href.replace("tel:", ""),
    email: company.email,
    areaServed: { "@type": "Country", name: "Italia" },
    ...(isGroup
      ? {
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
          founder: { "@type": "Person", name: "Pierluigi Properzi" },
          sameAs: [
            "https://www.linkedin.com/company/imprese-riunite/",
            "https://maps.app.goo.gl/pNzjVwMy6RCCpkCQ6",
          ],
          subOrganization: operatingCompanies.map((c) => ({ "@id": orgId(c) })),
        }
      : { parentOrganization: { "@id": orgId(group) } }),
  };
};

const breadcrumb = (...items: [name: string, path: string][]): JsonLdNode => ({
  "@type": "BreadcrumbList",
  itemListElement: [[SITE_NAME, "/"] as [string, string], ...items].map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: absoluteUrl(path),
  })),
});

const webPage = (type: "WebPage" | "CollectionPage" | "AboutPage", meta: Pick<SeoMeta, "path" | "title" | "description">): JsonLdNode => ({
  "@type": type,
  "@id": `${absoluteUrl(meta.path)}#webpage`,
  url: absoluteUrl(meta.path),
  name: meta.title,
  description: meta.description,
  inLanguage: "it-IT",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": orgId(group) },
});

export const homeMeta: SeoMeta = (() => {
  const base = {
    path: "/",
    title: `${SITE_NAME} – Costruzioni e impianti per opere pubbliche`,
    description:
      "Imprese Riunite, Roma: gruppo di costruzioni e impiantistica dal 1976. Costruzioni Angelico e Nuova C.C.S. realizzano opere pubbliche in tutta Italia.",
  };

  return {
    ...base,
    jsonLd: [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: "it-IT",
        publisher: { "@id": orgId(group) },
      },
      webPage("WebPage", base),
      companyNode(group),
      ...operatingCompanies.map(companyNode),
    ],
  };
})();

export const companyMeta = (company: Company): SeoMeta => {
  const path = `/azienda/${company.id}`;
  const isGroup = company.id === GROUP_ID;
  const base = {
    path,
    title: isGroup
      ? `Il gruppo: storia e governance | ${SITE_NAME}`
      : `${company.name} – ${company.role} | ${SITE_NAME}`,
    description: company.seoDescription ?? truncate(plainText(company.description)),
  };

  return {
    ...base,
    jsonLd: [
      webPage(isGroup ? "AboutPage" : "WebPage", base),
      companyNode(company),
      breadcrumb([isGroup ? "Il gruppo" : company.name, path]),
    ],
  };
};

export const projectsMeta: SeoMeta = (() => {
  const base = {
    path: "/progetti",
    title: `Progetti e cantieri di opere pubbliche | ${SITE_NAME}`,
    description:
      "Cantieri di opere pubbliche, edilizia penitenziaria e impiantistica: luogo, committente e importi dei lavori di Costruzioni Angelico e Nuova C.C.S.",
  };
  return {
    ...base,
    jsonLd: [webPage("CollectionPage", base), breadcrumb(["Progetti", base.path])],
  };
})();

export const certificationsMeta: SeoMeta = (() => {
  const base = {
    path: "/certificazioni",
    title: `Certificazioni ISO, SOA e SA 8000 | ${SITE_NAME}`,
    description:
      "Certificazioni e qualificazioni di Costruzioni Angelico e Nuova C.C.S.: qualità, ambiente, sicurezza ed etica per gli appalti pubblici.",
  };
  return {
    ...base,
    jsonLd: [webPage("CollectionPage", base), breadcrumb(["Certificazioni", base.path])],
  };
})();

export const legalMeta = (policy: keyof typeof legalPolicies): SeoMeta => {
  const content = legalPolicies[policy];
  const path = policy === "privacy" ? "/privacy-policy" : "/cookie-policy";
  const base = { path, title: `${content.title} | ${SITE_NAME}`, description: content.description };
  // Kept out of the index so Google does not offer them as sitelinks under the brand result.
  return { ...base, noindex: true, jsonLd: [webPage("WebPage", base), breadcrumb([content.title, path])] };
};

export const notFoundMeta: SeoMeta = {
  path: "/404",
  title: `Pagina non trovata | ${SITE_NAME}`,
  description: "La pagina richiesta non esiste o è stata spostata.",
  noindex: true,
};
