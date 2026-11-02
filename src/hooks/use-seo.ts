import { useEffect } from "react";
import { absoluteUrl, OG_IMAGE, SITE_NAME, type SeoMeta } from "@/lib/seo";

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const applySeo = (meta: SeoMeta) => {
  const url = absoluteUrl(meta.path === "/" ? "/" : meta.path);

  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  upsertMeta("name", "robots", meta.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", OG_IMAGE.url);
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);

  // Reuse the script emitted at build time so the head never carries two graphs.
  let script = document.head.querySelector<HTMLScriptElement>('script[data-seo="jsonld"]');
  if (!meta.jsonLd?.length) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "jsonld";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": meta.jsonLd });
};

export const useSeo = (meta: SeoMeta) => {
  const serialized = JSON.stringify(meta);

  useEffect(() => {
    applySeo(JSON.parse(serialized) as SeoMeta);
  }, [serialized]);
};
