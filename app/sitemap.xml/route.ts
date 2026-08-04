import { NextResponse } from "next/server";
import { tools } from "../data/tools-config";
import { blogArticles, blogArticlesHindi, blogGuidesHindi } from "../data/blog-posts";

const BASE = "https://www.welovepdf.best";

export async function GET() {
  const lastmod = new Date().toISOString().split("T")[0];

  // Static pages (English only, no Hindi duplicates)
  const staticEnglishPages = [
    { path: "", priority: "1.0" },
    { path: "pricing", priority: "0.8" },
    { path: "faq", priority: "0.8" },
    { path: "about-us", priority: "0.8" },
    { path: "contact", priority: "0.8" },
    { path: "cookies", priority: "0.5" },
    { path: "privacy-policy", priority: "0.5" },
    { path: "security", priority: "0.7" },
    { path: "terms-and-conditions", priority: "0.5" },
    { path: "blog", priority: "0.9" },
  ];

  // Hindi static pages
  const staticHindiPages = [
    { path: "hi", priority: "1.0" },
    { path: "hi/pricing", priority: "0.8" },
    { path: "hi/faq", priority: "0.8" },
    { path: "hi/about-us", priority: "0.8" },
    { path: "hi/contact", priority: "0.8" },
    { path: "hi/cookies", priority: "0.5" },
    { path: "hi/privacy-policy", priority: "0.5" },
    { path: "hi/security", priority: "0.7" },
    { path: "hi/terms-and-conditions", priority: "0.5" },
    { path: "hi/blog", priority: "0.9" },
  ];

  // Comparison pages (English only)
  const comparisonUrls = [
    "vs/ilovepdf",
    "vs/smallpdf",
    "vs/adobe-acrobat",
  ];

  // English blog articles only (no -hi suffix slugs — those get their own entries below)
  const englishBlogSlugs = Object.keys(blogArticles);

  // Hindi blog articles (slugs that end in -hi or are clearly Hindi)
  const hindiBlogSlugs = [
    ...Object.keys(blogArticlesHindi),
    ...Object.keys(blogGuidesHindi),
  ];

  // Build XML entries

  // 1. Static English pages (with hreflang for pages that have Hindi counterparts)
  const staticPagesWithHindiCounterpart = ["", "pricing", "faq", "about-us", "contact", "cookies", "privacy-policy", "security", "terms-and-conditions", "blog"];

  const staticEnglishXml = staticEnglishPages.map(({ path, priority }) => {
    const loc = path === "" ? `${BASE}` : `${BASE}/${path}`;
    const hiPath = path === "" ? "hi" : `hi/${path}`;
    const hiLoc = `${BASE}/${hiPath}`;
    const hasHindiVersion = staticPagesWithHindiCounterpart.includes(path);

    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${hasHindiVersion ? `
    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="hi" href="${hiLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>` : ""}
  </url>`;
  }).join("");

  // 2. Hindi static pages
  const staticHindiXml = staticHindiPages.map(({ path, priority }) => {
    const loc = `${BASE}/${path}`;
    const enPath = path === "hi" ? "" : path.replace("hi/", "");
    const enLoc = enPath === "" ? BASE : `${BASE}/${enPath}`;

    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="hi" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
  </url>`;
  }).join("");

  // 3. Tool pages with hreflang pairs (English + Hindi together per tool)
  const toolsXml = tools.map((t) => {
    const enLoc = `${BASE}/${t.slug}`;
    const hiLoc = `${BASE}/hi/${t.slug}`;
    return `
  <url>
    <loc>${enLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="hi" href="${hiLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
  </url>
  <url>
    <loc>${hiLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="hi" href="${hiLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
  </url>`;
  }).join("");

  // 4. English blog articles (self-referencing canonical, no Hindi alternate)
  const englishBlogXml = englishBlogSlugs.map((slug) => {
    const loc = `${BASE}/blog/${slug}`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
  </url>`;
  }).join("");

  // 5. Hindi blog articles (self-referencing canonical only — they are standalone Hindi content)
  const hindiBlogXml = hindiBlogSlugs.map((slug) => {
    const loc = `${BASE}/blog/${slug}`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="hi" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
  </url>`;
  }).join("");

  // 6. Comparison pages
  const comparisonXml = comparisonUrls.map((path) => {
    const loc = `${BASE}/${path}`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${staticEnglishXml}${staticHindiXml}${toolsXml}${englishBlogXml}${hindiBlogXml}${comparisonXml}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
