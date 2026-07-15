import React from "react";
import { notFound } from "next/navigation";
import { tools, toolDescriptions, toolGuides, toolFaqs } from "../app/data/tools-config";
import WorkspaceCard from "./WorkspaceCard";
import { ChevronRight } from "lucide-react";

function generateDynamicGuide(toolName: string, category: string, desc: string, slug: string): string {
  return `
    <h2>Complete Guide to ${toolName} online</h2>
    <p>
      Welcome to WeLovePDF's premium <strong>${toolName}</strong> utility. This tool is built to help you ${desc.toLowerCase()} easily, quickly, and securely. 
      Operating under the <strong>${category}</strong> category, this application executes 100% locally inside your web browser sandbox. 
      Unlike other online utilities, your sensitive document files are processed directly on your device using Javascript and WebAssembly — they are never uploaded to any remote servers, ensuring absolute data security and privacy.
    </p>

    <h3>Why choose WeLovePDF's ${toolName} tool?</h3>
    <ul>
      <li><strong>100% Client-Side Sandbox:</strong> Your files never leave your device. Complete privacy is guaranteed.</li>
      <li><strong>Fully Free & Unlimited:</strong> No hidden costs, subscription fees, hourly caps, or watermark branding.</li>
      <li><strong>Fast & Responsive:</strong> Instant local processing means no uploading or downloading delays from remote servers.</li>
      <li><strong>No Signup Required:</strong> Start using the tool immediately without providing email addresses or creating accounts.</li>
    </ul>

    <h3>How to use ${toolName} (Step-by-Step Instructions):</h3>
    <ol>
      <li>
        <strong>Select or upload files:</strong> 
        Drag and drop your files directly into the workspace active container above. 
        Alternatively, click the "Browse Files" button to launch the system file picker and select your documents.
      </li>
      <li>
        <strong>Configure tool settings:</strong> 
        Once loaded, adjust the custom options in the options drawer. 
        You can configure parameters such as page ranges, file compression levels, password entries, or formatting styles.
      </li>
      <li>
        <strong>Process the document:</strong> 
        Click the main compile/process action button. 
        The sandbox engine will process your files locally in your browser, keeping track of the progress in the status bar.
      </li>
      <li>
        <strong>Download your output:</strong> 
        Once processing completes, click the "Download" button to save the updated document directly to your device's downloads folder.
      </li>
    </ol>

    <h3>Frequently Asked Questions about ${toolName}</h3>
    <p>
      If you have questions about how our local ${toolName} operates, we have compiled answers to common questions below. 
      Because our code runs on WebAssembly and client-side scripts, this page is fully compatible with offline work once initially cached. 
      For any custom integration, you can use our advanced options to set exact target properties.
    </p>
  `;
}

function generateDynamicHindiGuide(toolName: string, category: string, desc: string, slug: string): string {
  return `
    <h2>${toolName} ऑनलाइन उपयोग करने की संपूर्ण गाइड</h2>
    <p>
      WeLovePDF के प्रीमियम <strong>${toolName}</strong> टूल में आपका स्वागत है। यह टूल आपको आसानी से ${desc.toLowerCase()} करने में मदद करने के लिए बनाया गया है।
      <strong>${category}</strong> श्रेणी के तहत काम करते हुए, यह एप्लिकेशन आपके वेब ब्राउज़र सैंडबॉक्स के भीतर 100% स्थानीय रूप से निष्पादित होता है।
      अन्य ऑनलाइन उपयोगिताओं के विपरीत, आपके दस्तावेज़ सीधे आपके डिवाइस पर जावास्क्रिप्ट और वेबअसेंबली का उपयोग करके संसाधित किए जाते हैं — वे कभी भी किसी रिमोट सर्वर पर अपलोड नहीं किए जाते हैं, जिससे पूर्ण डेटा सुरक्षा और गोपनीयता सुनिश्चित होती है।
    </p>

    <h3>WeLovePDF के ${toolName} टूल को क्यों चुनें?</h3>
    <ul>
      <li><strong>100% क्लाइंट-साइड सैंडबॉक्स:</strong> आपकी फाइलें कभी भी आपके डिवाइस से बाहर नहीं जाती हैं। पूर्ण गोपनीयता की गारंटी है।</li>
      <li><strong>पूरी तरह से मुफ्त और असीमित:</strong> कोई छिपी हुई लागत, सदस्यता शुल्क, या वॉटरमार्क ब्रांडिंग नहीं।</li>
      <li><strong>तेज़ और प्रतिक्रियाशील:</strong> स्थानीय प्रोसेसिंग का मतलब है कि रिमोट सर्वर से कोई अपलोडिंग या डाउनलोडिंग देरी नहीं होगी।</li>
      <li><strong>नो साइनअप आवश्यक:</strong> ईमेल पते प्रदान किए बिना या खाता बनाए बिना तुरंत टूल का उपयोग करना शुरू करें।</li>
    </ul>

    <h3>${toolName} का उपयोग कैसे करें (चरण-दर-चरण निर्देश):</h3>
    <ol>
      <li>
        <strong>फाइलें चुनें या अपलोड करें:</strong> 
        अपनी फाइलों को सीधे ऊपर दिए गए सक्रिय कार्यक्षेत्र कंटेनर में खींचें और छोड़ें (Drag and drop)।
        वैकल्पिक रूप से, सिस्टम फाइल पिकर लॉन्च करने और अपने दस्तावेज़ों का चयन करने के लिए "फ़ाइलें चुनें" बटन पर क्लिक करें।
      </li>
      <li>
        <strong>सेटिंग्स कॉन्फ़िगर करें:</strong> 
        लोड होने के बाद, सेटिंग्स ड्रॉअर में कस्टम विकल्पों को समायोजित करें।
        आप पेज रेंज, फाइल कंप्रेस स्तर, पासवर्ड प्रविष्टियों, या स्वरूपण शैलियों जैसे मापदंडों को कॉन्फ़िगर कर सकते हैं।
      </li>
      <li>
        <strong>दस्तावेज़ को प्रोसेस करें:</strong> 
        मुख्य प्रक्रिया बटन पर क्लिक करें।
        सैंडबॉक्स इंजन आपके ब्राउज़र में स्थानीय रूप से आपकी फाइलों को संसाधित करेगा और प्रगति को ट्रैक करेगा।
      </li>
      <li>
        <strong>आउटपुट डाउनलोड करें:</strong> 
        एक बार प्रोसेसिंग पूरी हो जाने पर, अपडेटेड दस्तावेज़ को सीधे अपने डिवाइस के डाउनलोड फ़ोल्डर में सहेजने के लिए "डाउनलोड" बटन पर क्लिक करें।
      </li>
    </ol>
  `;
}

export function ToolPageContent({ params, lang }: { params: { tool: string }; lang: "en" | "hi" }) {
  const prefix = lang === "hi" ? "/hi" : "";
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
          <a href={prefix || "/"} className="hover:text-brand-blue">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href={`${prefix}/#tools`} className="hover:text-brand-blue">Tools</a>
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
            <div dangerouslySetInnerHTML={{ __html: toolGuides[tool.slug] || (lang === "hi" ? generateDynamicHindiGuide(tool.name, tool.category, tool.desc, tool.slug) : generateDynamicGuide(tool.name, tool.category, tool.desc, tool.slug)) }} />
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
                    href={`${prefix}/${rel.slug}`}
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
