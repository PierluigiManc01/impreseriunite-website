// Build-time only: renders the static HTML, sitemap and llms.txt that crawlers
// without JavaScript (most AI bots, link-preview scrapers) read. Used by
// scripts/vite-plugin-seo.ts; never imported by the client bundle.
import { companies, history, siteContact, type Company, type Project } from "@/data/companies";
import { legalPolicies } from "@/data/legal";
import {
  absoluteUrl,
  certificationsMeta,
  companyMeta,
  HERO_TAGLINE,
  homeMeta,
  legalMeta,
  notFoundMeta,
  OG_IMAGE,
  plainText,
  projectsMeta,
  SITE_NAME,
  SITE_URL,
  type SeoMeta,
} from "@/lib/seo";

export type SeoPage = { meta: SeoMeta; body: string };

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const tag = (name: string, content: string, attrs = "") => `<${name}${attrs}>${esc(plainText(content))}</${name}>`;

const link = (path: string, label: string) => `<a href="${esc(path)}">${esc(label)}</a>`;

const phones = siteContact.phones.map(({ label }) => label).join(", ");

const navigation = () =>
  `<nav aria-label="Navigazione principale"><ul>${[
    ["/", "Home"],
    ...companies.map((c): [string, string] => [`/azienda/${c.id}`, c.name]),
    ["/progetti", "Progetti"],
    ["/certificazioni", "Certificazioni"],
    ["/privacy-policy", "Privacy Policy"],
    ["/cookie-policy", "Cookie Policy"],
  ]
    .map(([path, label]) => `<li>${link(path, label)}</li>`)
    .join("")}</ul></nav>`;

const projectHtml = (project: Project) => {
  const facts = [
    project.location,
    `Committente: ${project.client}`,
    project.amount && `${project.amountLabel ?? "Importo"}: ${project.amount}`,
    project.date,
  ].filter(Boolean);
  return [
    "<article>",
    tag("h3", project.title),
    tag("p", facts.join(" · ")),
    tag("p", project.description),
    project.details?.length
      ? `<ul>${project.details.map(({ label, value }) => `<li>${esc(label)}: ${esc(plainText(value))}</li>`).join("")}</ul>`
      : "",
    "</article>",
  ].join("");
};

const contactHtml = () =>
  [
    tag("h2", "Sede e contatti"),
    "<address>",
    tag("p", `${siteContact.office.street}, ${siteContact.office.postalCode} ${siteContact.office.city} (${siteContact.office.province}), ${siteContact.office.country}`),
    tag("p", `Telefono: ${phones}`),
    `<p>Email: ${siteContact.emails.map(({ label, href }) => `<a href="${esc(href)}">${esc(label)}</a>`).join(", ")}</p>`,
    "</address>",
  ].join("");

const companyBody = (company: Company) => {
  const facts = [
    ["Amministratore", company.admin],
    ["Direttore tecnico", company.technicalDirector],
    ["Responsabile tecnico", company.technicalresponsible],
    ["Partita IVA", company.vatNumber],
    ["Sede", company.address],
    ["Telefono", company.phone],
    ["PEC", company.pec],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return [
    tag("h1", company.fullName),
    tag("p", company.role),
    tag("p", company.description),
    tag("p", company.longDescription),
    tag("h2", "Dati societari"),
    `<ul>${facts.map(([label, value]) => `<li>${esc(label)}: ${esc(value)}</li>`).join("")}</ul>`,
    company.highlights?.length
      ? `${tag("h2", "Aree di attività")}<ul>${company.highlights.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
      : "",
    company.soaCategories?.length
      ? `${tag("h2", "Qualificazioni SOA")}<ul>${company.soaCategories
          .map(({ code, classifica, description }) => `<li>${esc(code)} classifica ${esc(classifica)}: ${esc(description)}</li>`)
          .join("")}</ul>`
      : "",
    company.certifications.length
      ? `${tag("h2", "Certificazioni")}<ul>${company.certifications
          .map(({ name, pdf }) => `<li><a href="${esc(pdf)}">${esc(name)}</a></li>`)
          .join("")}</ul>`
      : "",
    company.projects.length ? `${tag("h2", "Progetti")}${company.projects.map(projectHtml).join("")}` : "",
    contactHtml(),
  ].join("");
};

const homeBody = () =>
  [
    tag("h1", `${SITE_NAME}: costruzioni, infrastrutture e impiantistica per le opere pubbliche`),
    tag("p", HERO_TAGLINE),
    tag("h2", "Le società del gruppo"),
    ...companies
      .filter(({ id }) => id !== "gruppo-immobiliare-properzi")
      .map(
        (c) =>
          `<section><h3>${link(`/azienda/${c.id}`, c.fullName)}</h3>${tag("p", c.role)}${tag("p", c.description)}${tag("p", c.longDescription)}</section>`
      ),
    tag("h2", "La nostra storia"),
    tag("p", history.intro),
    ...history.timeline.map((step) => `<section>${tag("h3", `${step.year}: ${step.title}`)}${tag("p", step.desc)}</section>`),
    tag("h2", "Progetti in evidenza"),
    ...companies.flatMap((c) => c.projects.filter((p) => p.featuredOnHomepage).map(projectHtml)),
    `<p>${link("/progetti", "Tutti i progetti")}</p>`,
    tag("h2", "Certificazioni"),
    `<ul>${companies
      .filter((c) => c.certifications.length)
      .map((c) => `<li>${esc(c.name)}: ${esc(c.certifications.map(({ name }) => name).join(", "))}</li>`)
      .join("")}</ul>`,
    `<p>${link("/certificazioni", "Registro completo delle certificazioni")}</p>`,
    contactHtml(),
  ].join("");

const projectsBody = () =>
  [
    tag("h1", "Progetti e cantieri di opere pubbliche"),
    tag("p", projectsMeta.description),
    ...companies
      .filter((c) => c.projects.length)
      .flatMap((c) => [tag("h2", c.fullName), ...c.projects.map(projectHtml)]),
  ].join("");

const certificationsBody = () =>
  [
    tag("h1", "Certificazioni e qualificazioni"),
    tag("p", certificationsMeta.description),
    ...companies
      .filter((c) => c.certifications.length)
      .map(
        (c) =>
          `<section>${tag("h2", c.fullName)}<ul>${c.certifications
            .map(({ name, kind, pdf }) => `<li><a href="${esc(pdf)}">${esc(name)}</a> (${esc(kind)})</li>`)
            .join("")}</ul></section>`
      ),
  ].join("");

const legalBody = (policy: keyof typeof legalPolicies) => {
  const content = legalPolicies[policy];
  return [
    tag("h1", content.title),
    tag("p", content.description),
    ...content.sections.map(
      (section) => `<section>${tag("h2", section.title)}${section.paragraphs.map((p) => tag("p", p)).join("")}</section>`
    ),
  ].join("");
};

export const seoPages = (): SeoPage[] => [
  { meta: homeMeta, body: homeBody() },
  ...companies.map((c) => ({ meta: companyMeta(c), body: companyBody(c) })),
  { meta: projectsMeta, body: projectsBody() },
  { meta: certificationsMeta, body: certificationsBody() },
  { meta: legalMeta("privacy"), body: legalBody("privacy") },
  { meta: legalMeta("cookies"), body: legalBody("cookies") },
];

export const notFoundPage = (): SeoPage => ({
  meta: notFoundMeta,
  body: `${tag("h1", "Pagina non trovata")}${tag("p", notFoundMeta.description)}<p>${link("/", "Torna alla home")}</p>`,
});

/** Visually hidden, replaced by React on mount: same content a rendered page exposes. */
export const renderBody = ({ body }: SeoPage) =>
  `<div id="seo-static" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%)">${navigation()}<main>${body}</main></div>`;

export const renderHeadTags = (meta: SeoMeta) => {
  const url = absoluteUrl(meta.path);
  const robots = meta.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    ...(meta.noindex ? [] : [`<link rel="canonical" href="${esc(url)}" />`]),
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="it_IT" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${OG_IMAGE.url}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE.url}" />`,
  ];

  if (meta.jsonLd?.length) {
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": meta.jsonLd }).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" data-seo="jsonld">${json}</script>`);
  }

  return lines.map((line) => `    ${line}`).join("\n");
};

const projectImages = (pages: SeoPage[]) => {
  const byPath = new Map<string, string[]>();
  const pageCompanies = (path: string) =>
    path === "/progetti"
      ? companies
      : companies.filter((c) => path === `/azienda/${c.id}`);

  for (const { meta } of pages) {
    const images = pageCompanies(meta.path)
      .flatMap((c) => c.projects.flatMap((p) => p.images))
      // Only public/ files have a stable URL; bundled imports are hashed at build.
      .filter((src) => src.startsWith("/assets/"));
    if (images.length) byPath.set(meta.path, [...new Set(images)]);
  }
  return byPath;
};

export const renderSitemap = (pages: SeoPage[]) => {
  const images = projectImages(pages);
  const urls = pages
    .filter(({ meta }) => !meta.noindex)
    .map(({ meta }) => {
      const imageTags = (images.get(meta.path) ?? [])
        .map((src) => `    <image:image><image:loc>${esc(absoluteUrl(src))}</image:loc></image:image>`)
        .join("\n");
      return `  <url>\n    <loc>${esc(absoluteUrl(meta.path))}</loc>${imageTags ? `\n${imageTags}` : ""}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
};

export const renderLlmsTxt = (pages: SeoPage[]) => {
  const operating = companies.filter(({ id }) => id !== "gruppo-immobiliare-properzi");
  const line = ({ meta }: SeoPage) => `- [${meta.title}](${absoluteUrl(meta.path)}): ${meta.description}`;

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${plainText(companies.find(({ id }) => id === "gruppo-immobiliare-properzi")!.description)} ${HERO_TAGLINE}`,
    "",
    "## Società operative",
    ...operating.map(
      (c) => `- [${c.fullName}](${absoluteUrl(`/azienda/${c.id}`)}): ${c.role}. P.IVA ${c.vatNumber}. ${plainText(c.description)}`
    ),
    "",
    "## Pagine",
    ...pages.filter(({ meta }) => !meta.noindex).map(line),
    "",
    "## Contatti",
    `- Sede: ${siteContact.office.street}, ${siteContact.office.postalCode} ${siteContact.office.city} (${siteContact.office.province})`,
    `- Telefono: ${phones}`,
    `- Email: ${siteContact.emails.map(({ label }) => label).join(", ")}`,
    `- Sito: ${SITE_URL}/`,
    "",
  ].join("\n");
};
