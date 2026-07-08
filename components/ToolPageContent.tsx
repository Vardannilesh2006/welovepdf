import React from "react";
import { notFound } from "next/navigation";
import { tools, toolDescriptions, toolGuides, toolFaqs } from "../app/data/tools-config";
import WorkspaceCard from "./WorkspaceCard";
import { ChevronRight } from "lucide-react";

export function ToolPageContent({ params, lang }: { params: { tool: string }; lang: "en" | "hi" }) {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) {
    notFound();
  }

  // Schema structured data definitions
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${tool.name} - WeLovePDF`,
    "url": `https://www.welovepdf.best/${tool.slug}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires HTML5, WebAssembly",
    "description": toolDescriptions[tool.slug] || `${tool.name} utility.`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.welovepdf.best"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://www.welovepdf.best/#tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://www.welovepdf.best/${tool.slug}`
      }
    ]
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${tool.name}`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload Document",
        "text": "Select files from your local storage or drag them directly into the browser sandbox container."
      },
      {
        "@type": "HowToStep",
        "name": "Configure settings",
        "text": "Adjust processing mode levels, file parameters, passwords, or margins in the settings panel."
      },
      {
        "@type": "HowToStep",
        "name": "Run and Download",
        "text": "Click the run action button and download your compiled output document instantly."
      }
    ]
  };

  const faqs = toolFaqs[tool.slug] || [
    {
      q: `Is WeLovePDF's ${tool.name} tool free to use?`,
      a: `Yes, WeLovePDF's ${tool.name} tool is 100% free. You can process your documents online with no file count limits, daily caps, page locks, or watermarks.`
    },
    {
      q: `Does the ${tool.name} utility upload my document files?`,
      a: `No. Unlike other utilities, WeLovePDF executes ${tool.name} locally inside your web browser sandbox using JavaScript and WebAssembly. Your files never reach any server.`
    },
    {
      q: `Can I use WeLovePDF ${tool.name} offline without internet?`,
      a: `Yes. Once the page is loaded, the ${tool.name} utility runs fully offline since all processing logic runs client-side in your browser.`
    },
    {
      q: `Is there a file size limit for using the ${tool.name} tool?`,
      a: `We support files up to 200MB for local browser-side processing, completely free of charge.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const relatedTools = tools
    .filter((t) => t.slug !== tool.slug && (t.category === tool.category || t.category === "Organize"))
    .slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[#FFF8F2]">
      {/* Schema structured data declarations */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-16 py-32">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-6 text-[13px] text-text-secondaryLight dark:text-text-secondaryDark mb-24">
          <a href="/" className="hover:text-brand-blue">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/#tools" className="hover:text-brand-blue">Tools</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-primaryLight dark:text-text-primaryDark font-semibold">
            {tool.name}
          </span>
        </div>

        {/* Workspace Card (Drag & Drop box + Options sidebar) */}
        <WorkspaceCard toolSlug={tool.slug} toolName={tool.name} lang={lang} />

        {/* Detailed Guide & Text Copy Sections */}
        <section className="mt-48 grid grid-cols-1 lg:grid-cols-12 gap-32">
          {/* Main content: Description + Steps */}
          <div className="lg:col-span-8 p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm prose dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: toolGuides[tool.slug] || `
              <h2>How to use ${tool.name} step by step:</h2>
              <ol>
                <li><strong>Select files:</strong> Drag and drop your documents into the workspace above or click Browse.</li>
                <li><strong>Configure parameters:</strong> Change properties, layouts, or passwords in the options drawer.</li>
                <li><strong>Execute:</strong> Click the run button to perform the local browser processing task.</li>
                <li><strong>Download:</strong> Click Download to save the modified file locally to your device.</li>
              </ol>
            ` }} />
          </div>

          {/* Sidebar: FAQs & Related tools */}
          <div className="lg:col-span-4 flex flex-col gap-24">
            {/* FAQ Block */}
            <div className="p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm">
              <h3 className="font-heading font-black text-[15px] mb-16 text-slate-800 dark:text-white uppercase tracking-wider">
                {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
              </h3>
              <div className="flex flex-col gap-12">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-16 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
                    <h4 className="font-bold text-[14px] mb-6 text-text-primaryLight dark:text-text-primaryDark leading-snug">{faq.q}</h4>
                    <p className="text-[12px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tools Block */}
            <div className="p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm">
              <h3 className="font-heading font-black text-[15px] mb-16 text-slate-800 dark:text-white uppercase tracking-wider">
                {lang === "en" ? "Related PDF Tools" : "संबंधित पीडीएफ टूल्स"}
              </h3>
              <div className="flex flex-col gap-12">
                {relatedTools.map((rel) => (
                  <a
                    key={rel.slug}
                    href={`/${rel.slug}`}
                    className="p-16 border border-border-light dark:border-border-dark rounded-card bg-[#FFF8F2]/30 dark:bg-surface-dark hover:border-[#D97706] transition-all flex flex-col gap-6"
                  >
                    <h4 className="font-bold text-[13px] text-slate-800 dark:text-white hover:text-[#D97706] transition-colors">{rel.name}</h4>
                    <p className="text-[11px] text-text-secondaryLight dark:text-text-secondaryDark line-clamp-2 leading-relaxed">{rel.desc}</p>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
