import React from "react";
import { generateStaticParams } from "../../(english)/[tool]/page";
import { Metadata } from "next";
import { ToolPageContent } from "../../../components/ToolPageContent";
import { tools, toolDescriptions } from "../../data/tools-config";

export { generateStaticParams };

// Hindi title action verbs for better search targeting
const hindiActionVerbs: Record<string, string> = {
  "merge-pdf": "पीडीएफ मर्ज करें",
  "split-pdf": "पीडीएफ स्प्लिट करें",
  "compress-pdf": "पीडीएफ कंप्रेस करें",
  "compress-pdf-to-100kb": "पीडीएफ 100KB में कंप्रेस करें (UPSC फॉर्म)",
  "compress-pdf-to-200kb": "पीडीएफ 200KB में कंप्रेस करें (SSC फॉर्म)",
  "compress-pdf-to-50kb": "पीडीएफ 50KB में कंप्रेस करें (फोटो व साइन)",
  "compress-pdf-to-500kb": "पीडीएफ 500KB में कंप्रेस करें (कॉलेज एडमिशन)",
  "compress-pdf-for-ssc-upsc": "सरकारी परीक्षा पीडीएफ कंप्रेसर (SSC, UPSC)",
  "rotate-pdf": "पीडीएफ रोटेट करें",
  "delete-pages": "पेज डिलीट करें",
  "extract-pages": "पेज एक्सट्रैक्ट करें",
  "reorder-pages": "पेज रीऑर्डर करें",
  "crop-pdf": "पीडीएफ क्रॉप करें",
  "duplicate-pages": "पेज डुप्लीकेट करें",
  "add-blank-page": "ब्लैंक पेज जोड़ें",
  "page-numbers": "पेज नंबर जोड़ें",
  "watermark-pdf": "वॉटरमार्क जोड़ें",
  "header-footer": "हेडर फुटर जोड़ें",
  "metadata-editor": "मेटाडेटा एडिट करें",
  "flatten-pdf": "पीडीएफ फ्लैटन करें",
  "annotate-pdf": "पीडीएफ एनोटेट करें",
  "redact-pdf": "पीडीएफ रिडैक्ट करें",
  "compare-pdf": "पीडीएफ कम्पेयर करें",
  "bookmark-editor": "बुकमार्क एडिट करें",
  "grayscale-pdf": "ग्रेस्केल में बदलें",
  "repair-pdf": "पीडीएफ रिपेयर करें",
  "remove-hidden-data": "हिडन डेटा हटाएं",
  "deskew-scan": "स्कैन ठीक करें",
  "auto-enhance-scan": "स्कैन एनहांस करें",
  "remove-background": "बैकग्राउंड हटाएं",
  "ocr-pdf": "OCR से टेक्स्ट निकालें",
  "pdf-to-text": "टेक्स्ट में बदलें",
  "pdf-to-jpg": "JPG में बदलें",
  "pdf-to-png": "PNG में बदलें",
  "pdf-to-word": "Word में बदलें",
  "pdf-to-excel": "Excel में बदलें",
  "pdf-to-html": "HTML में बदलें",
  "pdf-to-csv": "CSV में बदलें",
  "jpg-to-pdf": "JPG से पीडीएफ बनाएं",
  "png-to-pdf": "PNG से पीडीएफ बनाएं",
  "image-to-pdf": "इमेज से पीडीएफ बनाएं",
  "word-to-pdf": "Word से पीडीएफ बनाएं",
  "excel-to-pdf": "Excel से पीडीएफ बनाएं",
  "html-to-pdf": "HTML से पीडीएफ बनाएं",
  "markdown-to-pdf": "Markdown से पीडीएफ बनाएं",
  "text-to-pdf": "टेक्स्ट से पीडीएफ बनाएं",
  "url-to-pdf": "URL से पीडीएफ बनाएं",
  "protect-pdf": "पीडीएफ पासवर्ड लगाएं",
  "unlock-pdf": "पीडीएफ अनलॉक करें",
  "sign-pdf": "पीडीएफ साइन करें",
  "verify-signature": "सिग्नेचर वेरीफाई करें",
  "bates-numbering": "बेट्स नंबरिंग करें",
  "accessibility-checker": "एक्सेसिबिलिटी चेक करें",
  "invert-colors": "रंग इन्वर्ट करें",
  "pdf-reader": "पीडीएफ रीड करें",
  "search-in-pdf": "पीडीएफ में सर्च करें",
  "ask-pdf": "AI से सवाल पूछें",
  "summarize-pdf": "AI से सारांश बनाएं",
  "translate-pdf": "AI से अनुवाद करें",
  "quiz-from-pdf": "AI से प्रश्नोत्तरी बनाएं",
  "resume-to-pdf": "रिज्यूमे से पीडीएफ बनाएं",
};

function getHighCtrHindiTitle(slug: string, name: string, hindiAction: string): string {
  switch (slug) {
    case "compress-pdf-to-100kb":
      return "पीडीएफ 100KB में कंप्रेस करें (UPSC व सरकारी फॉर्म हेतु) — WeLovePDF";
    case "compress-pdf-to-200kb":
      return "पीडीएफ 200KB में कंप्रेस करें (SSC CGL व रेलवे परीक्षा) — WeLovePDF";
    case "compress-pdf-to-50kb":
      return "पीडीएफ 50KB में कंप्रेस करें (फोटो व साइन अपलोड) — WeLovePDF";
    case "compress-pdf-for-ssc-upsc":
      return "सरकारी परीक्षा पीडीएफ कंप्रेसर (UPSC, SSC, IBPS) — WeLovePDF";
    case "compress-pdf":
      return "मुफ़्त पीडीएफ कंप्रेस करें (अनलिमिटेड, बिना क्वालिटी खोए) — WeLovePDF";
    case "merge-pdf":
      return "पीडीएफ मर्ज करें ऑनलाइन (असीमित पेज, कोई अपलोड नहीं) — WeLovePDF";
    case "split-pdf":
      return "पीडीएफ स्प्लिट करें (मनचाहे पेज अलग करें तुरंत) — WeLovePDF";
    case "pdf-to-word":
      return "पीडीएफ से वर्ड में बदलें (100% सही फॉन्ट व लेआउट) — WeLovePDF";
    case "word-to-pdf":
      return "वर्ड से पीडीएफ बनाएं (1-क्लिक DOCX से PDF) — WeLovePDF";
    case "protect-pdf":
      return "पीडीएफ में पासवर्ड लगाएं (128-बिट सुरक्षित एन्क्रिप्शन) — WeLovePDF";
    case "unlock-pdf":
      return "पीडीएफ अनलॉक करें (पासवर्ड व पाबंदियां तुरंत हटाएं) — WeLovePDF";
    case "hindi-invoice-generator":
      return "मुफ़्त हिंदी जीएसटी बिल जनरेटर (तुरंत पीडीएफ बनाएं) — WeLovePDF";
    default:
      return `${hindiAction} ऑनलाइन (100% प्राइवेट, कोई लिमिट नहीं) — WeLovePDF`;
  }
}

function getHighCtrHindiDescription(slug: string, name: string, hindiAction: string): string {
  switch (slug) {
    case "compress-pdf-to-100kb":
      return "UPSC, State PSC, और Bank PO ऑनलाइन फॉर्म के लिए पीडीएफ को 100KB से कम साइज में कंप्रेस करें। 100% प्राइवेट इन-ब्राउज़र प्रोसेसिंग, कोई सर्वर अपलोड नहीं।";
    case "compress-pdf-to-200kb":
      return "SSC CGL, CHSL, Railway और NTA फॉर्म्स के लिए पीडीएफ को 200KB के अंदर कंप्रेस करें। फॉन्ट और क्वालिटी सुरक्षित रहती है।";
    case "compress-pdf-to-50kb":
      return "सरकारी नौकरी फॉर्म के लिए फोटो, हस्ताक्षर और अंगूठे के निशान वाली पीडीएफ को 50KB में कंप्रेस करें।";
    case "compress-pdf-for-ssc-upsc":
      return "भारतीय प्रतियोगी परीक्षाओं (UPSC, SSC, IBPS, NTA) के लिए विशेष पीडीएफ कंप्रेसर। 1-क्लिक में पोर्टल के अनुसार सही साइज पाएं।";
    case "merge-pdf":
      return "कई पीडीएफ फाइलों को एक साथ जोड़ें। कोई फाइल लिमिट नहीं, कोई वाटरमार्क नहीं, सीधे आपके फोन/पीसी के ब्राउज़र में प्रोसेस होता है।";
    default:
      return `${hindiAction} ऑनलाइन — 100% सुरक्षित और स्थानीय इन-ब्राउज़र प्रोसेसिंग। कोई सर्वर अपलोड नहीं, जीरो डेटा ट्रैकिंग, और असीमित मुफ्त उपयोग।`;
  }
}

export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) return {};

  const hindiAction = hindiActionVerbs[params.tool] || tool.name;
  const canonicalUrl = `https://www.welovepdf.best/hi/${params.tool}`;
  const enUrl = `https://www.welovepdf.best/${params.tool}`;

  const title = getHighCtrHindiTitle(params.tool, tool.name, hindiAction);
  const hindiDesc = getHighCtrHindiDescription(params.tool, tool.name, hindiAction);

  return {
    title,
    description: hindiDesc.slice(0, 160),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        hi: canonicalUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description: hindiDesc.slice(0, 160),
      url: canonicalUrl,
      locale: "hi_IN",
      type: "website",
    },
  };
}

export default function HindiToolPage({ params }: { params: { tool: string } }) {
  return <ToolPageContent params={params} lang="hi" />;
}
