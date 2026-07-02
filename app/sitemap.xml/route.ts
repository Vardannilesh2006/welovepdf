import { NextResponse } from "next/server";
import { tools } from "../data/tools-config";
import { blogArticles, blogArticlesHindi, blogGuidesHindi } from "../data/blog-posts";

export async function GET() {
  const lastmod = new Date().toISOString().split("T")[0];
  
  // Dynamic tool pages
  const toolUrls = tools.map((t) => t.slug);
  const toolUrlsHindi = tools.map((t) => `hi/${t.slug}`);

  // Dynamic blog pages
  const blogUrls = [
    ...Object.keys(blogArticles).map((slug) => `blog/${slug}`),
    ...Object.keys(blogArticlesHindi).map((slug) => `blog/${slug}`),
    ...Object.keys(blogGuidesHindi).map((slug) => `blog/${slug}`),
  ];

  // Static / comparison pages
  const comparisonUrls = [
    "vs/ilovepdf",
    "vs/smallpdf",
    "vs/adobe-acrobat"
  ];

  const staticPages = [
    "",
    "hi",
    "pricing",
    "faq",
    "about-us",
    "contact",
    "cookies",
    "privacy-policy",
    "security",
    "terms-and-conditions",
    "blog"
  ];

  const staticPagesHindi = staticPages
    .filter((p) => p !== "" && p !== "hi")
    .map((p) => `hi/${p}`);

  const allPaths = [
    ...staticPages,
    ...staticPagesHindi,
    ...comparisonUrls,
    ...blogUrls,
    ...toolUrls,
    ...toolUrlsHindi
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(
      (url) => `
  <url>
    <loc>https://welovepdf.best/${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "" || url === "hi" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
