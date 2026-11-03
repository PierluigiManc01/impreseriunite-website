import { describe, expect, it } from "vitest";
import { companies } from "@/data/companies";
import { renderHeadTags, renderLlmsTxt, renderSitemap, seoPages } from "@/lib/seo-static";

const pages = seoPages();

describe("seo pages", () => {
  it("covers home, every company and the static routes", () => {
    const paths = pages.map(({ meta }) => meta.path);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/progetti",
        "/certificazioni",
        "/privacy-policy",
        "/cookie-policy",
        ...companies.map(({ id }) => `/azienda/${id}`),
      ])
    );
  });

  it("gives every page a unique title and a snippet-sized description", () => {
    const titles = pages.map(({ meta }) => meta.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const { meta } of pages) {
      expect(meta.title.length).toBeLessThanOrEqual(70);
      expect(meta.description.length).toBeGreaterThan(60);
      expect(meta.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("renders one h1 and crawlable text in each static body", () => {
    for (const { body } of pages) {
      expect(body.match(/<h1>/g)).toHaveLength(1);
      expect(body.length).toBeGreaterThan(300);
    }
  });

  it("lists only indexable pages in the sitemap", () => {
    const sitemap = renderSitemap(pages);
    for (const { meta } of pages) {
      const loc = `<loc>https://www.impreseriunite.it${meta.path}</loc>`;
      if (meta.noindex) expect(sitemap).not.toContain(loc);
      else expect(sitemap).toContain(loc);
    }
  });

  it("escapes JSON-LD so it cannot close the script tag", () => {
    const head = renderHeadTags({ ...pages[0].meta, jsonLd: [{ name: "</script><b>" }] });
    expect(head).not.toContain("</script><b>");
  });

  it("mentions the operating companies in llms.txt", () => {
    const llms = renderLlmsTxt(pages);
    expect(llms).toContain("Costruzioni Angelico");
    expect(llms).toContain("Nuova C.C.S.");
  });
});
