import fs from "node:fs";
import path from "node:path";
import { createServer, type Plugin } from "vite";

const HEAD_START = "<!-- seo:start -->";
const HEAD_END = "<!-- seo:end -->";

type SeoStatic = typeof import("../src/lib/seo-static");

/**
 * After `vite build`, turns the SPA shell into one static HTML file per route
 * (title, canonical, Open Graph, JSON-LD and crawlable body text), and writes
 * sitemap.xml, llms.txt and a 404.html. Content comes from src/data, so there
 * is a single source of truth shared with the React pages.
 */
export default function seoPlugin(): Plugin {
  let root = process.cwd();
  let outDir = "dist";

  return {
    name: "seo-static-pages",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const shellPath = path.join(outDir, "index.html");
      if (!fs.existsSync(shellPath)) return;
      const shell = fs.readFileSync(shellPath, "utf8");

      const start = shell.indexOf(HEAD_START);
      const end = shell.indexOf(HEAD_END);
      if (start === -1 || end === -1 || !shell.includes('<div id="root"></div>')) {
        throw new Error("seo-static-pages: index.html is missing the seo markers or the #root element");
      }

      // Load src/ through Vite so path aliases and asset imports resolve as in the app.
      const server = await createServer({
        root,
        appType: "custom",
        logLevel: "error",
        server: { middlewareMode: true, hmr: false, watch: null },
        optimizeDeps: { noDiscovery: true },
      });

      try {
        const seo = (await server.ssrLoadModule("/src/lib/seo-static.ts")) as SeoStatic;
        const pages = seo.seoPages();

        const render = (page: ReturnType<SeoStatic["seoPages"]>[number]) =>
          (
            shell.slice(0, start) +
            `${HEAD_START}\n${seo.renderHeadTags(page.meta)}\n    ${HEAD_END}` +
            shell.slice(end + HEAD_END.length)
          ).replace('<div id="root"></div>', () => `<div id="root">${seo.renderBody(page)}</div>`);

        for (const page of pages) {
          const target = page.meta.path === "/" ? shellPath : path.join(outDir, page.meta.path, "index.html");
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.writeFileSync(target, render(page));
        }

        fs.writeFileSync(path.join(outDir, "404.html"), render(seo.notFoundPage()));
        fs.writeFileSync(path.join(outDir, "sitemap.xml"), seo.renderSitemap(pages));
        fs.writeFileSync(path.join(outDir, "llms.txt"), seo.renderLlmsTxt(pages));
      } finally {
        await server.close();
      }
    },
  };
}
