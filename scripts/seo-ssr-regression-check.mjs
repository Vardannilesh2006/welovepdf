import http from "node:http";
import https from "node:https";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const KEY_URLS = [
  "/",
  "/merge-pdf",
  "/compress-pdf",
  "/split-pdf",
  "/pdf-to-jpg",
  "/jpg-to-pdf",
  "/pdf-to-word",
  "/protect-pdf",
  "/unlock-pdf",
  "/hi",
  "/hi/merge-pdf",
];

async function fetchRawHtml(urlPath) {
  const targetUrl = new URL(urlPath, BASE_URL).toString();
  const res = await fetch(targetUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    redirect: "manual",
  });

  const statusCode = res.status;
  const headers = Object.fromEntries(res.headers.entries());

  if (statusCode !== 200) {
    throw new Error(`Expected HTTP 200 for ${urlPath}, got HTTP ${statusCode}`);
  }

  const html = await res.text();
  return { html, headers, statusCode };
}

function runChecksOnHtml(urlPath, html, headers) {
  const errors = [];

  // Check 1: X-Robots-Tag or meta noindex
  if (headers["x-robots-tag"]?.includes("noindex")) {
    errors.push(`Header X-Robots-Tag contains 'noindex'`);
  }
  if (/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["']/i.test(html)) {
    errors.push(`Raw HTML contains meta noindex tag`);
  }

  // Check 2: Formfit.app bug check
  if (html.includes("formfit.app")) {
    errors.push(`Raw HTML contains forbidden domain 'formfit.app'`);
  }

  // Check 3: Title tag
  const titleMatches = html.match(/<title[^>]*>(.*?)<\/title>/gi) || [];
  if (titleMatches.length === 0) {
    errors.push(`Missing <title> tag in raw HTML`);
  } else if (titleMatches.length > 1) {
    errors.push(`Duplicate <title> tags in raw HTML (found ${titleMatches.length})`);
  } else {
    const titleText = titleMatches[0].replace(/<[^>]+>/g, "").trim();
    if (!titleText) {
      errors.push(`Empty <title> tag in raw HTML`);
    }
  }

  // Check 4: Meta description
  const descMatches = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/gi) || [];
  if (descMatches.length === 0) {
    errors.push(`Missing <meta name="description"> tag in raw HTML`);
  } else if (descMatches.length > 1) {
    errors.push(`Duplicate <meta name="description"> tags in raw HTML (found ${descMatches.length})`);
  } else {
    const match = /content=["']([^"']*)["']/i.exec(descMatches[0]);
    if (!match || !match[1].trim()) {
      errors.push(`Empty <meta name="description"> content`);
    }
  }

  // Check 5: Canonical link tag
  const canonicalMatches = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/gi) || [];
  if (canonicalMatches.length === 0) {
    errors.push(`Missing <link rel="canonical"> tag in raw HTML`);
  } else if (canonicalMatches.length > 1) {
    errors.push(`Duplicate <link rel="canonical"> tags in raw HTML (found ${canonicalMatches.length})`);
  } else {
    const match = /href=["']([^"']*)["']/i.exec(canonicalMatches[0]);
    const canonicalHref = match ? match[1] : "";
    if (!canonicalHref.startsWith("https://www.welovepdf.best")) {
      errors.push(`Canonical URL '${canonicalHref}' does not use canonical host 'https://www.welovepdf.best'`);
    }
  }

  // Check 6: H1 tag count and content
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    errors.push(`Missing <h1> tag in raw HTML`);
  } else if (h1Matches.length > 1) {
    errors.push(`Multiple <h1> tags in raw HTML (found ${h1Matches.length})`);
  } else {
    const h1Text = h1Matches[0].replace(/<[^>]+>/g, "").trim();
    if (!h1Text) {
      errors.push(`Empty <h1> tag in raw HTML`);
    }
  }

  // Check 7: Body text length (SSR pre-rendering check)
  const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(html);
  if (bodyMatch) {
    const bodyText = bodyMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (bodyText.length < 150) {
      errors.push(`Raw HTML body text too short (${bodyText.length} chars) - possible SPA/CSR empty shell rendering bug`);
    }
  } else {
    errors.push(`Missing <body> tag in raw HTML`);
  }

  return errors;
}

async function runAllChecks() {
  console.log(`====================================================`);
  console.log(` Starting WeLovePDF SSR & SEO Regression Audit`);
  console.log(` Target Base URL: ${BASE_URL}`);
  console.log(`====================================================\n`);

  let totalFailed = 0;

  for (const urlPath of KEY_URLS) {
    process.stdout.write(`Testing ${urlPath.padEnd(20)} ... `);
    try {
      const { html, headers } = await fetchRawHtml(urlPath);
      const errors = runChecksOnHtml(urlPath, html, headers);

      if (errors.length === 0) {
        console.log(`✅ PASS`);
      } else {
        console.log(`❌ FAIL (${errors.length} issues)`);
        errors.forEach((err) => console.log(`   - ${err}`));
        totalFailed++;
      }
    } catch (err) {
      console.log(`❌ ERROR: ${err.message}`);
      totalFailed++;
    }
  }

  console.log(`\n====================================================`);
  if (totalFailed === 0) {
    console.log(`🎉 ALL ${KEY_URLS.length} KEY URLS PASSED SEO REGRESSION AUDIT!`);
    console.log(`====================================================\n`);
    process.exit(0);
  } else {
    console.error(`💥 SEO REGRESSION AUDIT FAILED (${totalFailed}/${KEY_URLS.length} URLs failed)`);
    console.log(`====================================================\n`);
    process.exit(1);
  }
}

runAllChecks();
