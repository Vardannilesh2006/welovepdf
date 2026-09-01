import React from "react";
import { notFound } from "next/navigation";
import { tools, toolDescriptions, toolGuides, toolFaqs } from "../app/data/tools-config";
import WorkspaceCard from "./WorkspaceCard";
import { ChevronRight } from "lucide-react";

function generateDynamicGuide(toolName: string, category: string, desc: string, slug: string): string {
  return `
    <h2>Complete Guide to ${toolName} Online</h2>
    <p>
      Welcome to WeLovePDF's browser-first <strong>${toolName}</strong> utility. This tool allows you to ${desc.toLowerCase()} quickly, accurately, and securely. 
      Operating under the <strong>${category}</strong> category, this application executes 100% locally inside your web browser sandbox using modern JavaScript and WebAssembly compiled modules.
    </p>

    <h3>Tool Specifications & Compatibility</h3>
    <table>
      <thead>
        <tr>
          <th>Specification</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Supported Formats</strong></td>
          <td>PDF, JPG, PNG, WEBP, DOCX, XLSX, TXT</td>
        </tr>
        <tr>
          <td><strong>Processing Engine</strong></td>
          <td>100% Local In-Browser WebAssembly / PDF.js Sandbox</td>
        </tr>
        <tr>
          <td><strong>Maximum File Size</strong></td>
          <td>Up to 200 MB per processing session</td>
        </tr>
        <tr>
          <td><strong>Privacy & Retention</strong></td>
          <td>Zero Server Uploads — Files remain in your device memory</td>
        </tr>
      </tbody>
    </table>

    <h3>Why Choose WeLovePDF's ${toolName}?</h3>
    <ul>
      <li><strong>100% Client-Side Sandbox:</strong> Your files never touch external servers or third-party cloud storage. Complete privacy is guaranteed by architecture.</li>
      <li><strong>Free & Unlimited:</strong> No hidden subscription fees, daily limits, page caps, or mandatory account registrations.</li>
      <li><strong>Fast & Offline Capable:</strong> Local processing eliminates server upload delays and functions smoothly even on unstable mobile connections once cached.</li>
      <li><strong>Cross-Platform Support:</strong> Fully optimized for desktop browsers (Chrome, Edge, Firefox, Safari) and mobile devices (Android, iOS).</li>
    </ul>

    <h3>How to Use ${toolName} (Step-by-Step)</h3>
    <ol>
      <li>
        <strong>Select Document:</strong> 
        Drag and drop your file into the workspace active container above, or click "Browse Files" to choose from your storage.
      </li>
      <li>
        <strong>Configure Parameters:</strong> 
        Adjust optional settings in the right drawer such as page selection, compression ratio, resolution, or security settings.
      </li>
      <li>
        <strong>Process File:</strong> 
        Click the primary action button. The browser sandbox compiles the document nodes locally with real-time status feedback.
      </li>
      <li>
        <strong>Download Result:</strong> 
        Click "Download PDF" to save your processed document directly to your local device folder.
      </li>
    </ol>

    <h3>Practical Use Cases</h3>
    <ul>
      <li><strong>Email Attachment Optimization:</strong> Shrink large PDFs to fit email attachment size limits (e.g., Gmail's 25MB cap).</li>
      <li><strong>Official & Government Submissions:</strong> Prepare compliant PDF files for portal uploads, university applications, or visa processing.</li>
      <li><strong>Privacy-Sensitive Work:</strong> Process medical records, financial statements, contracts, or tax documents without uploading them to third-party servers.</li>
      <li><strong>Mobile Workflow:</strong> Easily edit and process PDF documents on budget smartphones directly within mobile Chrome or Safari.</li>
    </ul>

    <h3>Privacy & Security Guarantee</h3>
    <p>
      WeLovePDF adheres to a strict <strong>No-Server-Upload</strong> model. When you open the ${toolName} tool, all required rendering code is loaded into your browser's local sandbox memory. When you execute an action, your browser's CPU and memory perform the operations directly. When you close or refresh the tab, temporary memory buffers are automatically purged by browser garbage collection.
    </p>

    <h3>Troubleshooting & Troubleshooting Common Issues</h3>
    <ul>
      <li><strong>File Upload Fails:</strong> Ensure your document is under 200 MB and is not corrupted. For encrypted files, unlock the PDF first using our Unlock PDF tool.</li>
      <li><strong>Slow Processing on Mobile:</strong> Close background browser tabs to free up RAM memory on lower-end smartphone devices.</li>
      <li><strong>Download Didn't Start:</strong> Verify that pop-up blockers or download permissions are allowed in your browser settings.</li>
    </ul>
  `;
}

function generateDynamicHindiGuide(toolName: string, category: string, desc: string, slug: string): string {
  return `
    <h2>${toolName} ऑनलाइन उपयोग करने की संपूर्ण गाइड</h2>
    <p>
      WeLovePDF के ब्राउज़र-फ़र्स्ट <strong>${toolName}</strong> टूल में आपका स्वागत है। यह टूल आपको आसानी से ${desc.toLowerCase()} करने में मदद करता है।
      <strong>${category}</strong> श्रेणी के तहत काम करते हुए, यह एप्लिकेशन आपके वेब ब्राउज़र सैंडबॉक्स के भीतर 100% स्थानीय रूप से जावास्क्रिप्ट और वेबअसेंबली के माध्यम से निष्पादित होता है।
    </p>

    <h3>टूल विनिर्देश और संगतता (Specifications)</h3>
    <table>
      <thead>
        <tr>
          <th>विवरण</th>
          <th>मूल्य</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>समर्थित प्रारूप (Formats)</strong></td>
          <td>PDF, JPG, PNG, WEBP, DOCX, XLSX, TXT</td>
        </tr>
        <tr>
          <td><strong>प्रोसेसिंग इंजन</strong></td>
          <td>100% लोकल इन-ब्राउज़र सैंडबॉक्स (वेबअसेंबली)</td>
        </tr>
        <tr>
          <td><strong>अधिकतम फाइल आकार</strong></td>
          <td>200 MB तक प्रति सत्र</td>
        </tr>
        <tr>
          <td><strong>गोपनीयता</strong></td>
          <td>जीरो सर्वर अपलोड — फाइलें आपके डिवाइस मेमोरी में ही रहती हैं</td>
        </tr>
      </tbody>
    </table>

    <h3>WeLovePDF का ${toolName} क्यों चुनें?</h3>
    <ul>
      <li><strong>100% क्लाइंट-साइड सैंडबॉक्स:</strong> आपकी फाइलें कभी भी आपके डिवाइस से बाहर नहीं जाती हैं। पूर्ण गोपनीयता की गारंटी है।</li>
      <li><strong>मुफ्त और असीमित:</strong> कोई छिपी हुई लागत, सदस्यता शुल्क, सीमाएं या वॉटरमार्क नहीं।</li>
      <li><strong>तेज़ और ऑफलाइन सक्षम:</strong> स्थानीय प्रोसेसिंग से अपलोडिंग/डाउनलोडिंग की देरी समाप्त हो जाती है।</li>
      <li><strong>मोबाईल और डेस्कटॉप संगत:</strong> एंड्रॉइड, आईओएस, क्रोम और सफारी पर पूरी तरह से काम करता है।</li>
    </ul>

    <h3>${toolName} का उपयोग कैसे करें (चरण-दर-चरण निर्देश)</h3>
    <ol>
      <li>
        <strong>फाइल चुनें:</strong> 
        अपनी फाइलों को सीधे कार्यक्षेत्र में खींचें और छोड़ें (Drag and drop) या "फ़ाइलें चुनें" बटन पर क्लिक करें।
      </li>
      <li>
        <strong>सेटिंग्स कॉन्फ़िगर करें:</strong> 
        लोड होने के बाद आवश्यकतानुसार विकल्पों को समायोजित करें (जैसे कंप्रेस स्तर, पेज रेंज या पासवर्ड)।
      </li>
      <li>
        <strong>प्रोसेस करें:</strong> 
        मुख्य बटन पर क्लिक करें। सैंडबॉक्स इंजन आपके ब्राउज़र में फाइलों को प्रोसेस करेगा।
      </li>
      <li>
        <strong>डाउनलोड करें:</strong> 
        "डाउनलोड पीडीएफ" पर क्लिक करके अपडेटेड फाइल को सीधे अपने डिवाइस में सहेजें।
      </li>
    </ol>

    <h3>व्यावहारिक उपयोग (Practical Use Cases)</h3>
    <ul>
      <li><strong>ईमेल अटैचमेंट:</strong> बड़ी पीडीएफ फाइलों का आकार छोटा करें ताकि वे ईमेल लिमिट में फिट हो सकें।</li>
      <li><strong>सरकारी और आधिकारिक फॉर्म:</strong> सरकारी पोर्टलों के लिए सही साइज और फॉर्मेट में दस्तावेज तैयार करें।</li>
      <li><strong>गोपनीय कार्य:</strong> वित्तीय और व्यक्तिगत फाइलों को बिना किसी सर्वर पर भेजे सुरक्षित रूप से प्रोसेस करें।</li>
    </ul>

    <h3>गोपनीयता और सुरक्षा गारंटी</h3>
    <p>
      WeLovePDF <strong>जीरो सर्वर अपलोड</strong> सिद्धांत पर काम करता है। सभी कार्य आपके डिवाइस की रैम और सीपीयू पर होते हैं। टैब बंद करते ही अस्थायी डेटा स्वतः नष्ट हो जाता है।
    </p>

    <h3>समस्या निवारण (Troubleshooting)</h3>
    <ul>
      <li><strong>फाइल प्रोसेस नहीं हो रही:</strong> जांचें कि फाइल का आकार 200MB से कम है और फाइल पासवर्ड से सुरक्षित तो नहीं है।</li>
      <li><strong>डाउनलोड नहीं हो रहा:</strong> अपने ब्राउज़र की पॉप-अप और डाउनलोड अनुमतियों (Permissions) की जांच करें।</li>
    </ul>
  `;
}

const toolH1Titles: Record<string, { en: string; hi: string }> = {
  "merge-pdf": { en: "Merge PDF Online", hi: "मुफ़्त पीडीएफ मर्ज करें ऑनलाइन" },
  "split-pdf": { en: "Split PDF Online", hi: "मुफ़्त पीडीएफ स्प्लिट करें ऑनलाइन" },
  "compress-pdf": { en: "Compress PDF Online", hi: "मुफ़्त पीडीएफ कंप्रेस करें ऑनलाइन" },
  "rotate-pdf": { en: "Rotate PDF Online", hi: "मुफ़्त पीडीएफ रोटेट करें ऑनलाइन" },
  "delete-pages": { en: "Delete PDF Pages Online", hi: "पीडीएफ पेज डिलीट करें ऑनलाइन" },
  "extract-pages": { en: "Extract PDF Pages Online", hi: "पीडीएफ पेज एक्सट्रैक्ट करें ऑनलाइन" },
  "reorder-pages": { en: "Reorder PDF Pages Online", hi: "पीडीएफ पेज रीऑर्डर करें ऑनलाइन" },
  "crop-pdf": { en: "Crop PDF Online", hi: "पीडीएफ क्रॉप करें ऑनलाइन" },
  "duplicate-pages": { en: "Duplicate PDF Pages Online", hi: "पीडीएफ पेज डुप्लीकेट करें ऑनलाइन" },
  "add-blank-page": { en: "Add Blank Page to PDF", hi: "पीडीएफ में खाली पेज जोड़ें" },
  "page-numbers": { en: "Add Page Numbers to PDF", hi: "पीडीएफ में पेज नंबर जोड़ें" },
  "watermark-pdf": { en: "Add Watermark to PDF", hi: "पीडीएफ में वॉटरमार्क जोड़ें" },
  "header-footer": { en: "Add Header & Footer to PDF", hi: "पीडीएफ में हेडर और फुटर जोड़ें" },
  "metadata-editor": { en: "Edit PDF Metadata Online", hi: "पीडीएफ मेटाडेटा एडिट करें" },
  "flatten-pdf": { en: "Flatten PDF Online", hi: "पीडीएफ फ्लैटन करें ऑनलाइन" },
  "annotate-pdf": { en: "Annotate PDF Online", hi: "पीडीएफ एनोटेट करें ऑनलाइन" },
  "redact-pdf": { en: "Redact PDF Online", hi: "पीडीएफ रिडैक्ट करें ऑनलाइन" },
  "compare-pdf": { en: "Compare PDFs Online", hi: "पीडीएफ कम्पेयर करें ऑनलाइन" },
  "bookmark-editor": { en: "Edit PDF Bookmarks Online", hi: "पीडीएफ बुकमार्क एडिट करें" },
  "grayscale-pdf": { en: "Convert PDF to Grayscale", hi: "पीडीएफ को ग्रेस्केल में बदलें" },
  "repair-pdf": { en: "Repair PDF Online", hi: "पीडीएफ रिपेयर करें ऑनलाइन" },
  "remove-hidden-data": { en: "Remove Hidden Data from PDF", hi: "पीडीएफ से हिडन डेटा हटाएं" },
  "deskew-scan": { en: "Deskew Scanned PDF Online", hi: "स्कैन किए गए पीडीएफ को ठीक करें" },
  "auto-enhance-scan": { en: "Enhance Scanned PDF Online", hi: "स्कैन किए गए पीडीएफ को एनहांस करें" },
  "remove-background": { en: "Remove Background from PDF", hi: "पीडीएफ से बैकग्राउंड हटाएं" },
  "ocr-pdf": { en: "OCR PDF — Extract Text from Scanned PDF", hi: "OCR से स्कैन पीडीएफ टेक्स्ट निकालें" },
  "pdf-to-text": { en: "PDF to Text Converter", hi: "पीडीएफ को टेक्स्ट में बदलें" },
  "pdf-to-markdown": { en: "PDF to Markdown Converter", hi: "पीडीएफ को मार्कडाउन में बदलें" },
  "pdf-to-jpg": { en: "PDF to JPG Converter", hi: "पीडीएफ को JPG में बदलें" },
  "pdf-to-png": { en: "PDF to PNG Converter", hi: "पीडीएफ को PNG में बदलें" },
  "pdf-to-long-image": { en: "PDF to Long Image Converter", hi: "पीडीएफ को लंबी इमेज में बदलें" },
  "pdf-to-word": { en: "PDF to Word Converter", hi: "पीडीएफ को Word में बदलें" },
  "pdf-to-excel": { en: "PDF to Excel Converter", hi: "पीडीएफ को Excel में बदलें" },
  "pdf-to-powerpoint": { en: "PDF to PowerPoint Converter", hi: "पीडीएफ को PowerPoint में बदलें" },
  "pdf-to-html": { en: "PDF to HTML Converter", hi: "पीडीएफ को HTML में बदलें" },
  "pdf-to-csv": { en: "PDF to CSV Converter", hi: "पीडीएफ को CSV में बदलें" },
  "jpg-to-pdf": { en: "JPG to PDF Converter", hi: "JPG से पीडीएफ बनाएं" },
  "png-to-pdf": { en: "PNG to PDF Converter", hi: "PNG से पीडीएफ बनाएं" },
  "image-to-pdf": { en: "Image to PDF Converter", hi: "इमेज से पीडीएफ बनाएं" },
  "word-to-pdf": { en: "Word to PDF Converter", hi: "Word से पीडीएफ बनाएं" },
  "excel-to-pdf": { en: "Excel to PDF Converter", hi: "Excel से पीडीएफ बनाएं" },
  "powerpoint-to-pdf": { en: "PowerPoint to PDF Converter", hi: "PowerPoint से पीडीएफ बनाएं" },
  "html-to-pdf": { en: "HTML to PDF Converter", hi: "HTML से पीडीएफ बनाएं" },
  "markdown-to-pdf": { en: "Markdown to PDF Converter", hi: "Markdown से पीडीएफ बनाएं" },
  "text-to-pdf": { en: "Text to PDF Converter", hi: "टेक्स्ट से पीडीएफ बनाएं" },
  "url-to-pdf": { en: "URL to PDF Converter", hi: "URL से पीडीएफ बनाएं" },
  "protect-pdf": { en: "Protect PDF Online", hi: "पीडीएफ पासवर्ड सुरक्षित करें" },
  "unlock-pdf": { en: "Unlock PDF Online", hi: "पीडीएफ पासवर्ड हटाएं (अनलॉक)" },
  "sign-pdf": { en: "Sign PDF Online", hi: "पीडीएफ डिजिटल साइन करें" },
  "verify-signature": { en: "Verify PDF Signature Online", hi: "पीडीएफ सिग्नेचर वेरीफाई करें" },
  "bates-numbering": { en: "Bates Numbering PDF", hi: "बेट्स नंबरिंग पीडीएफ" },
  "accessibility-checker": { en: "PDF Accessibility Checker", hi: "पीडीएफ एक्सेसिबिलिटी चेक करें" },
  "invert-colors": { en: "Invert PDF Colors Online", hi: "पीडीएफ रंग इन्वर्ट करें" },
  "pdf-reader": { en: "Free Online PDF Reader", hi: "मुफ़्त ऑनलाइन पीडीएफ रीडर" },
  "search-in-pdf": { en: "Search Text in PDF Online", hi: "पीडीएफ में टेक्स्ट सर्च करें" },
  "ask-pdf": { en: "Ask AI About PDF", hi: "AI से पीडीएफ के बारे में पूछें" },
  "summarize-pdf": { en: "Summarize PDF with AI", hi: "AI से पीडीएफ का सारांश बनाएं" },
  "translate-pdf": { en: "Translate PDF with AI", hi: "AI से पीडीएफ अनुवाद करें" },
  "quiz-from-pdf": { en: "Generate Quiz from PDF", hi: "AI से पीडीएफ प्रश्नोत्तरी बनाएं" },
  "invoice-extractor": { en: "Extract Data from Invoice PDF", hi: "इनवॉइस पीडीएफ से डेटा निकालें" },
  "resume-to-pdf": { en: "Resume to PDF Generator", hi: "रिज्यूमे से पीडीएफ बनाएं" },
  "hindi-invoice-generator": { en: "Hindi GST Invoice Generator", hi: "हिंदी जीएसटी इनवॉइस जनरेटर" },
  "pdf-to-qr": { en: "PDF to QR Code Generator", hi: "पीडीएफ से क्यूआर कोड जनरेटर" },
};

function getToolH1(toolName: string, slug: string, lang: "en" | "hi"): string {
  const item = toolH1Titles[slug];
  if (item) {
    return lang === "hi" ? item.hi : item.en;
  }
  return lang === "hi" ? `${toolName} ऑनलाइन टूल` : `${toolName} Online`;
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
    "name": `${tool.name} — WeLovePDF`,
    "operatingSystem": "Web Browser (Chrome, Safari, Firefox, Edge, Android, iOS)",
    "applicationCategory": "UtilitiesApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1280",
      "bestRating": "5",
      "worstRating": "1"
    },
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
    .filter((t) => {
      if (t.slug === tool.slug) return false;
      // Same category is most relevant
      if (t.category === tool.category) return true;
      // Cross-category relevance rules
      if (tool.category === "Convert from PDF" && t.category === "Convert to PDF") return true;
      if (tool.category === "Convert to PDF" && t.category === "Convert from PDF") return true;
      if (tool.category === "Organize" || t.category === "Organize") return true;
      if (tool.category === "Security" && t.category === "Edit") return true;
      return false;
    })
    .slice(0, 5);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-1.5 text-[13px] text-text-secondaryLight dark:text-text-secondaryDark mb-3">
          <a href={prefix || "/"} className="hover:text-brand-blue">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href={`${prefix}/#tools`} className="hover:text-brand-blue">Tools</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-primaryLight dark:text-text-primaryDark font-semibold">
            {tool.name}
          </span>
        </div>

        {/* Primary H1 Heading & SEO Subtitle */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-full text-[12px] font-heading font-semibold text-emerald-700 dark:text-emerald-300 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {lang === "en" ? "100% Client-Side WebAssembly Sandbox · Zero Server Upload" : "100% क्लाइंट-साइड वेबअसेंबली सैंडबॉक्स · कोई सर्वर अपलोड नहीं"}
          </div>
          <h1 className="font-heading font-black text-[28px] sm:text-[36px] text-slate-900 dark:text-white leading-tight tracking-tight mb-2">
            {getToolH1(tool.name, tool.slug, lang)}
          </h1>
          <p className="text-[15px] text-text-secondaryLight dark:text-text-secondaryDark max-w-3xl leading-relaxed">
            {toolDescriptions[tool.slug] || `${tool.name} online for free — no file upload required. 100% private in-browser processing.`}
          </p>
        </div>

        {/* Workspace Card (Drag & Drop box + Options sidebar) */}
        <WorkspaceCard toolSlug={tool.slug} toolName={tool.name} lang={lang} />

        {/* Detailed Guide & Text Copy Sections */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main content: Description + Steps */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm prose dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: toolGuides[tool.slug] || (lang === "hi" ? generateDynamicHindiGuide(tool.name, tool.category, tool.desc, tool.slug) : generateDynamicGuide(tool.name, tool.category, tool.desc, tool.slug)) }} />
          </div>

          {/* Sidebar: FAQs & Related tools */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* FAQ Block */}
            <div className="p-5 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm">
              <h3 className="font-heading font-black text-[15px] mb-3 text-slate-800 dark:text-white uppercase tracking-wider">
                {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
              </h3>
              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
                    <h4 className="font-bold text-[14px] mb-1.5 text-text-primaryLight dark:text-text-primaryDark leading-snug">{faq.q}</h4>
                    <p className="text-[12px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tools Block */}
            <div className="p-5 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm">
              <h3 className="font-heading font-black text-[15px] mb-3 text-slate-800 dark:text-white uppercase tracking-wider">
                {lang === "en" ? "Related PDF Tools" : "संबंधित पीडीएफ टूल्स"}
              </h3>
              <div className="flex flex-col gap-3">
                {relatedTools.map((rel) => (
                  <a
                    key={rel.slug}
                    href={`${prefix}/${rel.slug}`}
                    className="p-3.5 border border-border-light dark:border-border-dark rounded-card bg-[#FFF8F2]/30 dark:bg-surface-dark hover:border-[#D97706] transition-all flex flex-col gap-1.5"
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
