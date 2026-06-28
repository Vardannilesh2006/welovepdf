import { NextResponse } from "next/server";
import { tools } from "../data/tools-config";

export async function GET() {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls = [
    "",
    "hi",
    "pricing",
    "blog",
    ...tools.map((t) => t.slug),
    ...tools.map((t) => `hi/${t.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
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
