import React from "react";
import { notFound } from "next/navigation";
import { tools, toolDescriptions, toolGuides, toolFaqs } from "../app/data/tools-config";
import { getToolManifest, ToolManifestEntry } from "../app/data/toolManifest";
import WorkspaceCard from "./WorkspaceCard";
import ProcessingModeBadge from "./ProcessingModeBadge";
import { ChevronRight } from "lucide-react";

function getCategorySpecificContent(category: string, toolSlug: string, isHindi: boolean) {
  if (isHindi) {
    switch (category) {
      case "Optimize":
        return `
          <h3>सरकारी परीक्षा एवं ऑनलाइन फॉर्म के लिए पीडीएफ अनुकूलन</h3>
          <p>
            भारत में UPSC, SSC (CGL, CHSL, MTS), IBPS, State PSC, और NTA (JEE, NEET) जैसी प्रतियोगी परीक्षाओं के ऑनलाइन आवेदन में दस्तावेज़, मार्कशीट, जाति प्रमाण पत्र और पहचान पत्र को अक्सर 50KB, 100KB या 200KB के सटीक आकार में अपलोड करना अनिवार्य होता है। 
            WeLovePDF का इन-ब्राउज़र कंप्रेसर इमेज रिज़ॉल्यूशन को संतुलित करते हुए फ़ाइल साइज़ को सटीक रूप से कम करता है ताकि आपका फॉर्म तकनीकी त्रुटि के बिना सबमिट हो सके।
          </p>
          <h3>गोपनीयता और डेटा सुरक्षा</h3>
          <p>
            आधार कार्ड, पैन कार्ड, या बैंक पासबुक जैसे संवेदनशील दस्तावेज़ों को बाहरी सर्वर पर अपलोड करना जोखिम भरा हो सकता है। हमारा टूल आपकी फ़ाइल को स्थानीय ब्राउज़र मेमोरी (RAM) में ही प्रोसेस करता है, जिससे डेटा लीक का कोई खतरा नहीं रहता।
          </p>
        `;
      case "Convert from PDF":
      case "Convert to PDF":
        return `
          <h3>सटीक फॉन्ट और लेआउट संरक्षण</h3>
          <p>
            कन्वर्ज़न के दौरान फ़ॉर्मेटिंग का बिगड़ना एक आम समस्या है। WeLovePDF आधुनिक पार्सिंग तकनीक का उपयोग करता है जिससे हेडर, पैराग्राफ, टेबल स्ट्रक्चर और हिंदी/अंग्रेजी फॉन्ट मूल दस्तावेज़ की तरह ही सुरक्षित रहते हैं। 
            चाहे कॉलेज असाइनमेंट हो, कानूनी डीड या व्यावसायिक इनवॉइस—कन्वर्ज़न के बाद भी लेआउट स्पष्ट और प्रिंट-रेडी रहता है।
          </p>
        `;
      case "Security":
      case "Edit":
        return `
          <h3>दस्तावेज़ सुरक्षा और ISO 32000 मानक</h3>
          <p>
            पीडीएफ सुरक्षा के लिए अंतरराष्ट्रीय ISO 32000 मानकों के तहत 128-बिट AES एन्क्रिप्शन का प्रयोग किया जाता है। पासवर्ड प्रोटेक्शन और रिडैक्शन (Redaction) दोनों प्रक्रियाएं सीधे आपके डिवाइस पर पूरी होती हैं। 
            जब आप किसी गोपनीय जानकारी को ब्लैक आउट करते हैं, तो वह हमेशा के लिए हटा दी जाती है और किसी भी पीडीएफ व्यूअर से रिकवर नहीं की जा सकती।
          </p>
        `;
      default:
        return `
          <h3>दैनिक दस्तावेज़ प्रबंधन का सरल समाधान</h3>
          <p>
            चाहे कई फ़ाइलों को एक साथ जोड़ना हो, अतिरिक्त पेज हटाना हो, या स्कैन की गई प्रतियों को सीधा (Deskew) करना हो—WeLovePDF आपको बिना किसी जटिल सॉफ़्टवेयर इंस्टॉलेशन के तुरंत परिणाम देता है। 
            यह टूल एंड्रॉइड, आईफोन, विंडोज़ और मैक सभी ऑपरेटिंग सिस्टम पर समान गति से कार्य करता है।
          </p>
        `;
    }
  }

  // English
  switch (category) {
    case "Optimize":
      return `
        <h3>Tailored for Exam Portals, Portals, and Corporate Compliance</h3>
        <p>
          Online application portals—ranging from government portals (UPSC, SSC, State PSCs) to university admission systems and HR databases—frequently enforce stringent PDF size ceilings (e.g., strictly under 100KB, 200KB, or 500KB). 
          WeLovePDF applies adaptive vector stream compression and smart image downsampling to preserve typography and fine lines while dramatically shrinking byte overhead, ensuring your document satisfies portal validation rules without rejection.
        </p>
        <h3>Client-Side Confidentiality for Financial & ID Files</h3>
        <p>
          Compressing sensitive credentials such as Aadhaar cards, tax returns, passport copies, or payroll statements should never involve uploading unencrypted documents to unknown third-party cloud buckets. 
          Because WeLovePDF executes locally via WebAssembly, your documents never cross the network perimeter.
        </p>
      `;
    case "Convert from PDF":
    case "Convert to PDF":
      return `
        <h3>High-Fidelity Document Structure & Font Rendering</h3>
        <p>
          Format conversion often struggles with broken tables, displaced margins, and scrambled font encodings. 
          Our conversion pipelines isolate typography definitions, preserve tabular bounding boxes, and maintain inline image color profiles. Whether turning scanned contracts into editable text or packaging spreadsheets into archivable PDFs, visual parity is maintained across all platforms.
        </p>
      `;
    case "Security":
    case "Edit":
      return `
        <h3>Cryptographic Security & ISO 32000 Compliance</h3>
        <p>
          All encryption and redaction mechanisms conform to official ISO 32000 PDF specifications. When encrypting, standard AES algorithms lock document permissions securely. 
          When redacting, content streams are purged at the byte level rather than merely obscured with transparent layers, ensuring sensitive numbers, signatures, and confidential clauses are permanent and irreversible.
        </p>
      `;
    default:
      return `
        <h3>Streamlined Workflow for Modern Productivity</h3>
        <p>
          From reordering misaligned pages to extracting vital chapters and merging multi-part reports, WeLovePDF provides frictionless document organization. 
          With responsive design optimized for touchscreens, trackpads, and mobile viewports, your documents can be organized and exported in seconds without registration paywalls.
        </p>
      `;
  }
}

function generateDynamicGuide(toolName: string, category: string, desc: string, slug: string): string {
  const manifest = getToolManifest(slug);
  const formats = manifest ? manifest.acceptMimeTypes.join(", ") : "PDF";
  const outputFormat = manifest ? (manifest.outputMimeType || "Visual / Direct Preview") : "PDF";
  const engine = manifest ? manifest.engine : "WebAssembly (pdf-lib)";
  const maxSize = manifest ? (manifest.maxBytes === 209715200 ? "Up to 200 MB" : "Up to 25 MB") : "Up to 200 MB";
  const steps = manifest?.howToSteps && manifest.howToSteps.length > 0 ? manifest.howToSteps : [];
  const limitations = manifest?.limitations || [];

  const privacyText = manifest?.processingMode === "local"
    ? "Zero Server Uploads — Document bytes are processed locally in your device RAM sandbox."
    : (manifest?.processingMode === "hybrid"
      ? "Hybrid Processing — Document text is extracted locally; questions and prompts are processed ephemerally using Google Gemini API with no permanent storage."
      : "Ephemeral Cloud AI — Text is sent over TLS to our secure AI endpoint, processed in-memory, and immediately discarded.");

  const stepsHtml = steps.length > 0
    ? `<ol>
        ${steps.map(s => `<li><strong>${s.name}:</strong> ${s.text}</li>`).join("")}
      </ol>`
    : `<ol>
        <li><strong>Select Document:</strong> Choose your file from local storage or drag it into the active workspace.</li>
        <li><strong>Configure Options:</strong> Select desired parameters in the configuration panel.</li>
        <li><strong>Process:</strong> Click the action button to process the file with real-time feedback.</li>
        <li><strong>Download:</strong> Save your completed file directly to your device.</li>
      </ol>`;

  const limitationsHtml = limitations.length > 0
    ? `<h3>Important Trust & Security Disclosures</h3>
       <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 16px 0; border-radius: 6px;">
         <ul style="margin: 0; padding-left: 20px;">
           ${limitations.map(l => `<li style="margin-bottom: 6px; color: #92400e; font-size: 13px;">${l}</li>`).join("")}
         </ul>
       </div>`
    : "";

  const categoryDeepDive = getCategorySpecificContent(category, slug, false);

  return `
    <h2>Complete Guide to ${toolName} Online</h2>
    <p>
      Welcome to WeLovePDF's <strong>${toolName}</strong> utility. This tool allows you to ${desc.toLowerCase()} reliably, privately, and securely. 
      Operating under the <strong>${category}</strong> category, this application executes via ${engine} directly in your browser.
    </p>

    ${limitationsHtml}

    ${categoryDeepDive}

    <h3>Tool Specifications & Supported Formats</h3>
    <table>
      <thead>
        <tr>
          <th>Specification</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Accepted Input Formats</strong></td>
          <td><code>${formats}</code></td>
        </tr>
        <tr>
          <td><strong>Output Format</strong></td>
          <td><code>${outputFormat}</code></td>
        </tr>
        <tr>
          <td><strong>Processing Engine</strong></td>
          <td>${engine}</td>
        </tr>
        <tr>
          <td><strong>File Size Limit</strong></td>
          <td>${maxSize}</td>
        </tr>
        <tr>
          <td><strong>Privacy & Data Handling</strong></td>
          <td>${privacyText}</td>
        </tr>
      </tbody>
    </table>

    <h3>Why Choose WeLovePDF's ${toolName}?</h3>
    <ul>
      <li><strong>Architecture-First Privacy:</strong> Built to minimize data transmission. Core tools run client-side in your browser memory sandbox.</li>
      <li><strong>Free & Direct:</strong> No subscription paywalls, artificial daily quotas, or mandatory account registrations.</li>
      <li><strong>Cross-Platform Compatibility:</strong> Optimized for all modern desktop browsers (Chrome, Edge, Firefox, Safari) and mobile platforms (Android, iOS).</li>
    </ul>

    <h3>How to Use ${toolName} (Step-by-Step)</h3>
    ${stepsHtml}

    <h3>Troubleshooting Common Issues</h3>
    <ul>
      <li><strong>File Upload Issues:</strong> Verify the document format matches the supported formats list and stays under ${maxSize}.</li>
      <li><strong>Browser Memory:</strong> For large batch operations on mobile, keep other browser tabs minimized.</li>
      <li><strong>Permissions:</strong> Ensure download permissions are enabled in your browser settings.</li>
    </ul>
  `;
}

function generateDynamicHindiGuide(toolName: string, category: string, desc: string, slug: string): string {
  const manifest = getToolManifest(slug);
  const formats = manifest ? manifest.acceptMimeTypes.join(", ") : "PDF";
  const outputFormat = manifest ? (manifest.outputMimeType || "Visual Preview") : "PDF";
  const engine = manifest ? manifest.engine : "WebAssembly";
  const maxSize = manifest ? (manifest.maxBytes === 209715200 ? "200 MB तक" : "25 MB तक") : "200 MB तक";
  const steps = manifest?.howToSteps && manifest.howToSteps.length > 0 ? manifest.howToSteps : [];

  const stepsHtml = steps.length > 0
    ? `<ol>
        ${steps.map(s => `<li><strong>${s.name}:</strong> ${s.text}</li>`).join("")}
      </ol>`
    : `<ol>
        <li><strong>फ़ाइल चुनें:</strong> अपने डिवाइस से फ़ाइल चुनें या ड्रैग-एंड-ड्रॉप करें।</li>
        <li><strong>सेटिंग्स सेट करें:</strong> आवश्यकतानुसार विकल्प चुनें।</li>
        <li><strong>प्रोसेस करें:</strong> एक्शन बटन पर क्लिक करें।</li>
        <li><strong>डाउनलोड करें:</strong> तैयार फ़ाइल को सहेजें।</li>
      </ol>`;

  const categoryDeepDive = getCategorySpecificContent(category, slug, true);

  return `
    <h2>${toolName} ऑनलाइन उपयोग करने की संपूर्ण गाइड</h2>
    <p>
      WeLovePDF के <strong>${toolName}</strong> टूल में आपका स्वागत है। यह टूल आपको ${desc.toLowerCase()} करने की मुफ़्त और सुरक्षित सुविधा देता है।
      <strong>${category}</strong> श्रेणी के अंतर्गत, यह ${engine} के माध्यम से सीधे आपके ब्राउज़र में सुरक्षित रूप से कार्य करता है।
    </p>

    ${categoryDeepDive}

    <h3>टूल विनिर्देश और समर्थित प्रारूप (Specifications)</h3>
    <table>
      <thead>
        <tr>
          <th>विवरण</th>
          <th>मूल्य</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>समर्थित इनपुट प्रारूप</strong></td>
          <td><code>${formats}</code></td>
        </tr>
        <tr>
          <td><strong>आउटपुट प्रारूप</strong></td>
          <td><code>${outputFormat}</code></td>
        </tr>
        <tr>
          <td><strong>प्रोसेसिंग इंजन</strong></td>
          <td>${engine}</td>
        </tr>
        <tr>
          <td><strong>अधिकतम फ़ाइल आकार</strong></td>
          <td>${maxSize}</td>
        </tr>
        <tr>
          <td><strong>डेटा सुरक्षा</strong></td>
          <td>100% प्राइवेट इन-ब्राउज़र मेमोरी सैंडबॉक्स (जीरो सर्वर अपलोड)</td>
        </tr>
      </tbody>
    </table>

    <h3>WeLovePDF क्यों चुनें?</h3>
    <ul>
      <li><strong>पूर्ण गोपनीयता:</strong> कोई फ़ाइल सर्वर पर अपलोड नहीं होती। पूरा काम आपके कंप्यूटर या मोबाइल के रैम में होता है।</li>
      <li><strong>असीमित और मुफ़्त:</strong> कोई दैनिक सीमा नहीं, कोई लॉगिन या क्रेडिट कार्ड की आवश्यकता नहीं।</li>
      <li><strong>सभी डिवाइस पर समर्थित:</strong> एंड्रॉइड, आईफोन, विंडोज़ पीसी और मैक सभी पर बिना किसी ऐप डाउनलोड के आसानी से चलता है।</li>
    </ul>

    <h3>${toolName} का उपयोग कैसे करें (चरण-दर-चरण)</h3>
    ${stepsHtml}

    <h3>समस्या निवारण (Troubleshooting)</h3>
    <ul>
      <li><strong>फ़ाइल चयन त्रुटि:</strong> सुनिश्चित करें कि आपकी फ़ाइल का प्रारूप समर्थित सूची (${formats}) से मेल खाता है और साइज़ ${maxSize} के अंदर है।</li>
      <li><strong>धीमी गति:</strong> बड़े दस्तावेज़ों की प्रोसेसिंग के समय अन्य भारी ऐप्स या बैकग्राउंड टैब बंद रखें।</li>
      <li><strong>डाउनलोड अनुमति:</strong> ब्राउज़र में 'Allow Downloads' परमिशन चालू रखें।</li>
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
  const manifest = getToolManifest(tool.slug);

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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const toolSteps = manifest?.howToSteps && manifest.howToSteps.length > 0 ? manifest.howToSteps : [];
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${tool.name}`,
    "step": toolSteps.length > 0
      ? toolSteps.map((s) => ({
          "@type": "HowToStep",
          "name": s.name,
          "text": s.text,
        }))
      : [
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
          <div className="mb-2.5">
            <ProcessingModeBadge
              mode={manifest?.processingMode || (tool.isAI ? "server" : "local")}
              status={manifest?.status || "stable"}
              lang={lang}
            />
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
