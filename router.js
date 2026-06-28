import { tools, subpages, seoMeta, toolFaqs } from "./tools-config.js";

const $ = (id) => document.getElementById(id);

function updateMetaDescription(text) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", text);
}

function updateFaqSchema(slug) {
  // Remove existing FAQ schema tag
  const existing = document.getElementById("faq-schema-jsonld");
  if (existing) existing.remove();

  // Find relevant FAQs
  let faqs = toolFaqs[slug];
  
  // Fallback FAQs for non-tool pages
  if (!faqs) {
    if (slug === "ai-pdf-summarizer") {
      faqs = [
        { q: "Is my data shared when using the AI Summarizer?", a: "No. WeLovePDF processes your files temporarily in memory to generate the summary and permanently deletes them in 1 hour." },
        { q: "What is the maximum file size for summarizing?", a: "Free users can summarize documents up to 20MB, while Pro users can process up to 200MB." }
      ];
    } else if (slug === "welovepdf-vs-ilovepdf") {
      faqs = [
        { q: "Is WeLovePDF faster than iLovePDF?", a: "Yes, for local tasks like merging, splitting, and rotating, WeLovePDF is faster because it processes files instantly in your browser without uploading." }
      ];
    }
  }

  if (!faqs || faqs.length === 0) return;

  // Build JSON-LD object
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  // Inject tag
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "faq-schema-jsonld";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function updateSEO(slug) {
  // Always update FAQ schema first
  updateFaqSchema(slug);

  // If slug is a tool, handle tool SEO
  if (tools.some((t) => t[0] === slug)) {
    const t = tools.find((tool) => tool[0] === slug);
    document.title = `${t[1]} - WeLovePDF`;
    updateMetaDescription(`Use our free, sandboxed ${t[1]} tool to ${t[3].toLowerCase()} Process files instantly in your browser.`);
    return;
  }
  
  // Otherwise match subpage or home
  const meta = seoMeta[slug] || seoMeta[""];
  document.title = meta.title;
  updateMetaDescription(meta.desc);
}

export function setRouteMode() {
  const slug = location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const isTool = tools.some((t) => t[0] === slug);
  const isSubpage = subpages.includes(slug);
  
  // Reset all route classes from body
  document.body.classList.remove("tool-view", "subpage-view", "home-view");
  for (const page of subpages) {
    document.body.classList.remove("route-" + page.replace(/\//g, "-"));
  }
  
  // Update visibility state
  if (isTool) {
    document.body.classList.add("tool-view");
  } else if (isSubpage) {
    document.body.classList.add("subpage-view", "route-" + slug.replace(/\//g, "-"));
    // Special setup for subpages
    if (slug === "blog") {
      // Show blog index, hide detail view
      const blogGrid = $("blogGrid");
      const blogPostDetail = $("blogPostDetail");
      if (blogGrid) blogGrid.style.display = "grid";
      if (blogPostDetail) blogPostDetail.style.display = "none";
    }
  } else {
    // Default Home View
    document.body.classList.add("home-view");
  }

  // Set SEO tags
  updateSEO(slug);

  // Route scrolling triggers
  if (location.hash) {
    const target = document.getElementById(location.hash.substring(1));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
  }
  window.scrollTo({ top: 0 });
}

export function toolFromPath() {
  const slug = location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (tools.some((t) => t[0] === slug)) return slug;
  return "";
}
