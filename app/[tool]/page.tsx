import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, toolDescriptions, toolGuides, toolFaqs } from "../data/tools-config";
import WorkspaceCard from "../../components/WorkspaceCard";
import { ChevronRight } from "lucide-react";

// Generate parameters for static site generation (SSG) for all 62 tools
export async function generateStaticParams() {
  return tools.map((t) => ({
    tool: t.slug,
  }));
}

// Generate unique dynamic metadata per tool
export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) return {};

  const title = `${tool.name} — Free Online Tool | WeLovePDF`;
  const desc = toolDescriptions[params.tool] || `${tool.name} online for free — no file upload, no signup. Runs 100% in your browser sandbox with WeLovePDF.`;

  const top10 = [
    "compress-pdf",
    "merge-pdf",
    "split-pdf",
    "pdf-to-word",
    "word-to-pdf",
    "ocr-pdf",
    "protect-pdf",
    "unlock-pdf",
    "sign-pdf",
    "watermark-pdf"
  ];
  const isTop10 = top10.includes(params.tool);
  const ogImage = isTop10 ? `/images/og/${params.tool}.png` : "/og-image.png";

  return {
    title,
    description: desc.slice(0, 160),
    alternates: {
      canonical: `https://welovepdf.best/${params.tool}`,
      languages: {
        en: `https://welovepdf.best/${params.tool}`,
        hi: `https://welovepdf.best/hi/${params.tool}`,
        "x-default": `https://welovepdf.best/${params.tool}`,
      }
    },
    openGraph: {
      title,
      description: desc.slice(0, 160),
      url: `https://welovepdf.best/${params.tool}`,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} tool screenshot preview`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc.slice(0, 160),
      images: [ogImage],
    }
  };
}

export default function ToolPage({ params, lang = "en" }: { params: { tool: string }; lang?: "en" | "hi" }) {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) {
    notFound();
  }

  // Schema structured data definitions
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${tool.name} - WeLovePDF`,
    "url": `https://welovepdf.best/${tool.slug}`,
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
        "item": "https://welovepdf.best/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://welovepdf.best/#tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://welovepdf.best/${tool.slug}`
      }
    ]
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": toolDescriptions[tool.slug] || `${tool.name} tool on WeLovePDF`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${tool.name}`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload Files",
        "text": "Drag and drop your document file directly into the local browser sandbox workspace."
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

  return (
    <div className="w-full bg-bg-light dark:bg-bg-dark dot-grid transition-colors duration-200">
      
      {/* Dynamic Schema Injection */}
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
        <div className="flex items-center gap-6 text-[13px] text-text-secondaryLight dark:text-text-secondaryDark mb-16">
          <a href="/" className="hover:text-brand-blue">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/#tools" className="hover:text-brand-blue">Tools</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-primaryLight dark:text-text-primaryDark font-medium">{tool.name}</span>
        </div>

        {/* Head Segment */}
        <div className="mb-32">
          <div className="flex items-center gap-12 mb-8 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
              {tool.name}
            </h1>
            {tool.isBrowserWorking !== false ? (
              <span className="px-8 py-2 text-[10px] font-bold text-brand-success bg-brand-success/15 border border-brand-success/20 rounded uppercase tracking-wider">
                ✓ Processed in Browser
              </span>
            ) : (
              <span className="px-8 py-2 text-[10px] font-bold text-brand-blue bg-brand-blue/15 border border-brand-blue/20 rounded uppercase tracking-wider group relative cursor-help">
                Server-Powered
                <span className="absolute bottom-full mb-6 hidden group-hover:block bg-bg-dark text-white text-[10px] rounded p-8 w-[200px] border border-border-dark leading-normal shadow-modal z-50">
                  This advanced utility requires server-side logic (e.g. template layouts) to run. Files are processed over encrypted pipelines and deleted instantly.
                </span>
              </span>
            )}
          </div>
          <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[15px] leading-relaxed max-w-[700px]">
            {toolDescriptions[tool.slug] || `Process ${tool.name} directly inside your browser memory.`}
          </p>
        </div>

        {/* Dynamic Tool Workspace Card Component */}
        <div className="mb-48">
          <WorkspaceCard toolSlug={tool.slug} toolName={tool.name} lang={lang} />
        </div>

        {/* Below-the-fold content */}
        <section className="mt-64 border-t border-border-light dark:border-border-dark pt-48 max-w-4xl">
          <div className="prose dark:prose-invert max-w-none flex flex-col gap-32">
            
            {/* Guide section */}
            <div>
              <h2 className="text-2xl font-bold mb-12 text-text-primaryLight dark:text-text-primaryDark">
                What is WeLovePDF {tool.name}?
              </h2>
              <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                WeLovePDF {tool.name} is a secure, browser-first utility designed to let users process document modifications locally. By compiling the scripts directly in your client browser, we bypass the need to upload files to remote servers, giving you 100% data safety, no-queue processing, and the ability to work fully offline.
              </p>
            </div>

            {/* Step-by-Step guides */}
            <div dangerouslySetInnerHTML={{ __html: toolGuides[tool.slug] || `
              <h2>How to use ${tool.name} step by step:</h2>
              <ol>
                <li><strong>Select files:</strong> Drag and drop your documents into the workspace above or click Browse.</li>
                <li><strong>Configure:</strong> Adjust settings in the right-hand panel (if applicable).</li>
                <li><strong>Process:</strong> Click the "Run Tool" button to compile files locally.</li>
                <li><strong>Download:</strong> Save the final document instantly.</li>
              </ol>
            `}} className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed flex flex-col gap-12" />

            {/* Why use WeLovePDF */}
            <div>
              <h2 className="text-2xl font-bold mb-12 text-text-primaryLight dark:text-text-primaryDark">
                Why use WeLovePDF for {tool.name}?
              </h2>
              <ul className="list-disc pl-20 flex flex-col gap-8 text-[14px] text-text-secondaryLight dark:text-text-secondaryDark">
                <li><strong>Zero Upload Risk:</strong> Files stay strictly inside your local machine. Ideal for sensitive contracts and NDAs.</li>
                <li><strong>Instant Execution:</strong> No waiting for network files to upload or convert in staging queues.</li>
                <li><strong>Free with No Caps:</strong> Core browser operations are 100% free with no registration steps or watermarks.</li>
              </ul>
            </div>

            {/* FAQ Accordion Section */}
            <div>
              <h2 className="text-2xl font-bold mb-16 text-text-primaryLight dark:text-text-primaryDark">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-12">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-16 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
                    <h4 className="font-bold text-[14px] mb-6 text-text-primaryLight dark:text-text-primaryDark">{faq.q}</h4>
                    <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
