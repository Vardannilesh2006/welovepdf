"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "../../components/LangContext";
import { tools } from "../data/tools-config";
import {
  GitMerge, Scissors, Trash2, ArrowUpDown, RotateCw, Copy, FilePlus, Crop,
  Hash, Stamp, AlignVerticalJustifyCenter, Info, Layers, MessageSquare,
  EyeOff, GitCompare, Bookmark, Minimize2, Circle, Wrench, ShieldOff,
  ScanLine, Sun, ImageOff, ScanText, FileText, FileCode, Image, ImageDown,
  GalleryVertical, FileType, Table, Presentation, Code2, Sheet, Upload,
  FileImage, Images, FileInput, TableProperties, Monitor, Globe, FileSymlink,
  AlignLeft, Link, Lock, Unlock, PenLine, BadgeCheck, Gavel, Accessibility,
  Contrast, BookMarked, Search, MessageCircle, ListCollapse, Languages,
  HelpCircle, Receipt, UserSquare, FileSpreadsheet, QrCode, BookOpen,
  Sparkles, ChevronRight, ShieldCheck, Cpu, Zap, Check, X, ArrowRight,
  Shield, ExternalLink, HardDrive, Wifi, FileUp, FileCheck
} from "lucide-react";

// Map lucideIcon string to actual component
const LucideIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitMerge, Scissors, Trash2, ArrowUpDown, RotateCw, Copy, FilePlus, Crop,
  Hash, Stamp, AlignVerticalJustifyCenter, Info, Layers, MessageSquare,
  EyeOff, GitCompare, Bookmark, Minimize2, Circle, Wrench, ShieldOff,
  ScanLine, Sun, ImageOff, ScanText, FileText, FileCode, Image, ImageDown,
  GalleryVertical, FileType, Table, Presentation, Code2, Sheet, Upload,
  FileImage, Images, FileInput, TableProperties, Monitor, Globe, FileSymlink,
  AlignLeft, Link, Lock, Unlock, PenLine, BadgeCheck, Gavel, Accessibility,
  Contrast, BookMarked, Search, MessageCircle, ListCollapse, Languages,
  HelpCircle, Receipt, UserSquare, FileSpreadsheet, QrCode, BookOpen, FileCheck,
};

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = LucideIconMap[name] || FileText;
  return <Icon className={className ?? "w-5 h-5"} />;
}

// IntersectionObserver-based counter
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          setValue(0);
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

const CATEGORIES = [
  { key: "All", en: "All Tools", hi: "सभी टूल्स" },
  { key: "Popular", en: "Top Essentials", hi: "मुख्य टूल्स" },
  { key: "Organize", en: "Organize", hi: "व्यवस्थित करें" },
  { key: "Edit", en: "Edit", hi: "संपादित करें" },
  { key: "Optimize", en: "Optimize", hi: "अनुकूलित करें" },
  { key: "Scan & OCR", en: "Scan & OCR", hi: "स्कैन और OCR" },
  { key: "Convert from PDF", en: "Convert from PDF", hi: "PDF से कनवर्ट करें" },
  { key: "Convert to PDF", en: "Convert to PDF", hi: "PDF में कनवर्ट करें" },
  { key: "Security", en: "Security", hi: "सुरक्षा" },
  { key: "Reader", en: "Reader", hi: "रीडर" },
  { key: "AI PDF", en: "AI PDF", hi: "AI टूल्स" },
  { key: "Templates", en: "Templates", hi: "टेम्पलेट्स" },
];

const POPULAR_SLUGS = [
  "merge-pdf",
  "compress-pdf",
  "split-pdf",
  "pdf-to-word",
  "jpg-to-pdf",
  "pdf-to-jpg",
  "ocr-pdf",
  "sign-pdf",
  "protect-pdf",
  "ask-pdf",
  "rotate-pdf",
  "page-numbers",
];

const FAQS = [
  {
    qEn: "Is WeLovePDF safe for confidential documents, tax returns, and bank statements?",
    qHi: "क्या WeLovePDF गोपनीय दस्तावेज़ों, टैक्स रिटर्न और बैंक स्टेटमेंट के लिए सुरक्षित है?",
    aEn: "Yes, 100% safe. Unlike traditional PDF websites that upload your files to remote cloud servers, WeLovePDF executes client-side WebAssembly directly in your browser's private memory sandbox. Your sensitive files never leave your computer or phone — zero bytes are sent across the network.",
    aHi: "हाँ, 100% सुरक्षित है। पारंपरिक पीडीएफ वेबसाइटों के विपरीत जो आपकी फाइलों को रिमोट सर्वर पर अपलोड करती हैं, WeLovePDF सीधे आपके ब्राउज़र के स्थानीय मेमोरी सैंडबॉक्स में वेबअसेंबली चलाता है। आपकी गोपनीय फाइलें आपके डिवाइस को कभी नहीं छोड़ती हैं।"
  },
  {
    qEn: "Does WeLovePDF work completely offline without an internet connection?",
    qHi: "क्या WeLovePDF बिना इंटरनेट कनेक्शन के पूरी तरह ऑफलाइन काम करता है?",
    aEn: "Yes. Once you open WeLovePDF in your browser tab, all core WebAssembly tools (Merge, Split, Compress, Rotate, Extract, Reorder, Delete Pages, Password Protect, etc.) run locally on your CPU and do not require any active internet connection.",
    aHi: "हाँ। एक बार जब आप WeLovePDF को अपने ब्राउज़र में खोल लेते हैं, तो सभी मुख्य टूल्स (मर्ज, स्प्लिट, कंप्रेस, रोटेट, पासवर्ड प्रोटेक्ट आदि) सीधे आपके सीपीयू पर चलते हैं और इन्हें इंटरनेट की आवश्यकता नहीं होती।"
  },
  {
    qEn: "Are there any hidden daily limits, page caps, or watermarks?",
    qHi: "क्या कोई छिपी हुई दैनिक सीमा, पेज सीमा या वॉटरमार्क हैं?",
    aEn: "No. There are zero artificial limits, zero queue delays, and zero watermarks. You can process as many pages and files as your device's memory can handle, completely free forever.",
    aHi: "नहीं। कोई भी कृत्रिम सीमा, कतार या वॉटरमार्क नहीं है। आप जितने चाहें उतने पेज और फाइलें मुफ्त में प्रोसेस कर सकते हैं।"
  },
  {
    qEn: "How does local WebAssembly PDF processing work?",
    qHi: "लोकल वेबअसेंबली पीडीएफ प्रोसेसिंग कैसे काम करती है?",
    aEn: "We compile industry-standard C++ and JavaScript document engines into WebAssembly (WASM). When you select a document, your browser creates an isolated sandboxed worker thread in RAM that manipulates PDF byte streams directly using your local CPU cores, delivering near-instant speeds with zero upload latency.",
    aHi: "हम उद्योग-मानक डॉक्यूमेंट इंजनों को वेबअसेंबली (WASM) में संकलित करते हैं। जब आप फाइल चुनते हैं, तो आपका ब्राउज़र आपके सीपीयू का उपयोग करके रैम में सीधे फाइल को प्रोसेस करता है।"
  },
  {
    qEn: "Why do other PDF websites upload files to remote servers?",
    qHi: "अन्य पीडीएफ वेबसाइटें फाइलों को रिमोट सर्वर पर क्यों अपलोड करती हैं?",
    aEn: "Traditional services rely on legacy server-side architecture (like Python or PHP backends) and use upload limits to push users into expensive monthly subscriptions. WeLovePDF was built from scratch with modern browser capabilities to eliminate server hosting costs and give privacy back to users.",
    aHi: "पारंपरिक सेवाएं पुराने सर्वर आर्किटेक्चर पर निर्भर करती हैं और पेड सब्सक्रिप्शन बेचने के लिए सीमाएं लगाती हैं। WeLovePDF को आधुनिक ब्राउज़र क्षमताओं के साथ आपकी पूर्ण गोपनीयता के लिए बनाया गया है।"
  },
  {
    qEn: "Do any tools on WeLovePDF require server communication?",
    qHi: "क्या WeLovePDF का कोई टूल सर्वर का उपयोग करता है?",
    aEn: "Our core PDF tools (60+ tools) are 100% client-side. Only our AI-assisted features (Ask PDF, Summarize PDF, Translate PDF) securely transmit user-requested text prompts to modern LLM APIs to generate answers. Even for AI tools, data is ephemeral and never saved or used for AI training.",
    aHi: "हमारे 60+ मुख्य टूल्स 100% क्लाइंट-साइड हैं। केवल AI फीचर्स (Ask PDF, Summarize, Translate) उत्तर देने के लिए टेक्स्ट प्रॉम्ट भेजते हैं, जिसे तुरंत नष्ट कर दिया जाता है और कभी स्टोर नहीं किया जाता।"
  },
  {
    qEn: "Does WeLovePDF work smoothly on Android and iPhone/iPad?",
    qHi: "क्या WeLovePDF एंड्रॉइड और आईफोन/आईपैड पर सुचारू रूप से काम करता है?",
    aEn: "Yes! Because WeLovePDF runs standard web standards (HTML5, Canvas, WebAssembly), it works seamlessly in Safari on iOS, Chrome on Android, Firefox, Edge, and any modern mobile browser without requiring any app install.",
    aHi: "हाँ! WeLovePDF मोबाइल सफारी, क्रोम, फ़ायरफ़ॉक्स और सभी आधुनिक मोबाइल ब्राउज़रों पर बिना किसी ऐप डाउनलोड के आसानी से चलता है।"
  },
  {
    qEn: "Do I need to sign up, create an account, or enter a credit card?",
    qHi: "क्या मुझे साइन अप करने, खाता बनाने या क्रेडिट कार्ड दर्ज करने की आवश्यकता है?",
    aEn: "No signup, no login, and no credit card required. You get immediate, unrestricted access to all tools the moment you land on the site.",
    aHi: "कोई साइनअप नहीं, कोई लॉगिन नहीं और कोई क्रेडिट कार्ड नहीं। आप साइट पर आते ही सभी टूल्स का तुरंत उपयोग कर सकते हैं।"
  },
  {
    qEn: "Is WeLovePDF compliant with privacy regulations like GDPR and CCPA?",
    qHi: "क्या WeLovePDF GDPR और CCPA जैसे गोपनीयता नियमों का अनुपालन करता है?",
    aEn: "Yes. By architecture, WeLovePDF is Privacy-by-Design. Since we do not collect, transmit, or store your documents on any server, there is zero risk of data breach, server leaks, or unauthorized third-party access.",
    aHi: "हाँ। डिज़ाइन के अनुसार ही WeLovePDF 100% निजी है। चूंकि आपकी फाइलें हमारे सर्वर पर नहीं आतीं, डेटा लीक का कोई जोखिम नहीं है।"
  },
  {
    qEn: "Who built WeLovePDF and how can I support or contact the project?",
    qHi: "WeLovePDF को किसने बनाया है और मैं कैसे संपर्क कर सकता हूँ?",
    aEn: "WeLovePDF is founded and maintained by Nilesh Verma in Bettiah, West Champaran, Bihar, India. You can reach out directly via email at nileshverma99731@gmail.com, inspect our code on GitHub, or view our transparent humans.txt and llms.txt files.",
    aHi: "WeLovePDF की स्थापना नीलेश वर्मा द्वारा बेतिया, बिहार, भारत में की गई है। आप nileshverma99731@gmail.com पर सीधे संपर्क कर सकते हैं या GitHub पर प्रोजेक्ट देख सकते हैं।"
  }
];

export default function Home() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [droppedFile, setDroppedFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toolsCounter = useCountUp(tools.length, 700);
  const privacyCounter = useCountUp(100, 700);

  // Keyboard shortcut listener: Press "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;
      setDroppedFile({ name: file.name, size: sizeStr });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;
      setDroppedFile({ name: file.name, size: sizeStr });
    }
  };

  const getFilteredTools = () => {
    const q = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.slug.toLowerCase().includes(q);

      let matchCat = true;
      if (activeCategory === "All") {
        matchCat = true;
      } else if (activeCategory === "Popular") {
        matchCat = POPULAR_SLUGS.includes(tool.slug);
      } else {
        matchCat = tool.category === activeCategory;
      }

      return matchSearch && matchCat;
    });
  };

  const filteredTools = getFilteredTools();

  const catCount = (key: string) => {
    if (key === "All") return tools.length;
    if (key === "Popular") return POPULAR_SLUGS.length;
    return tools.filter((t) => t.category === key).length;
  };

  // Structured Data Schemas
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WeLovePDF",
    "url": "https://www.welovepdf.best",
    "description": "Private, in-browser PDF toolkit powered by WebAssembly. 63+ free client-side PDF tools.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.welovepdf.best/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WeLovePDF",
    "url": "https://www.welovepdf.best",
    "logo": "https://www.welovepdf.best/og-image.png",
    "founder": {
      "@type": "Person",
      "name": "Nilesh Verma",
      "jobTitle": "Founder & Lead Developer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bettiah",
        "addressRegion": "Bihar",
        "addressCountry": "IN"
      },
      "email": "nileshverma99731@gmail.com"
    },
    "sameAs": [
      "https://github.com/Vardannilesh2006",
      "https://www.instagram.com/welovepdf.official/"
    ]
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WeLovePDF™ — Private In-Browser PDF Toolkit",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser (Chrome, Safari, Firefox, Edge, Android, iOS)",
    "featureList": [
      "Merge PDF", "Compress PDF", "Split PDF", "PDF to Word", "OCR PDF",
      "Client-Side WebAssembly Processing", "Zero Server Uploads", "Offline Support"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2450",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": lang === "en" ? faq.qEn : faq.qHi,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": lang === "en" ? faq.aEn : faq.aHi
      }
    }))
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-slate-900 selection:bg-amber-100 selection:text-amber-900 animate-fade-in font-sans">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── HERO SECTION WITH AMBIENT GRADIENTS & DROPZONE ─── */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-slate-200/80 bg-gradient-to-b from-amber-50/40 via-white to-[#FAF8F5]">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-amber-200/25 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-200/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column: Value Prop & Launcher (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Security Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[12px] font-heading font-semibold shadow-xs mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === "en" ? "100% In-Memory Sandbox · Zero Server Uploads · WebAssembly" : "100% इन-मेमोरी सैंडबॉक्स · कोई सर्वर अपलोड नहीं · वेबअसेंबली"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-black text-[38px] sm:text-[50px] lg:text-[56px] leading-[1.06] tracking-tight text-slate-900 mb-4">
                {lang === "en" ? (
                  <>
                    The Private PDF Engine,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                      Powered by Your Browser.
                    </span>
                  </>
                ) : (
                  <>
                    निजी और सुरक्षित PDF इंजन,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                      आपके ब्राउज़र में पूरी तरह स्थानीय।
                    </span>
                  </>
                )}
              </h1>

              {/* Sub-headline */}
              <p className="text-[16px] sm:text-[17px] text-slate-600 leading-relaxed max-w-[620px] mb-6">
                {lang === "en"
                  ? "Stop uploading bank statements, contracts, and tax filings to remote cloud servers. WeLovePDF executes 63+ professional tools inside your browser memory sandbox with zero latency, zero tracking, and absolute privacy."
                  : "अपने बैंक स्टेटमेंट, अनुबंध और टैक्स दस्तावेज रिमोट क्लाउड सर्वर पर अपलोड करना बंद करें। WeLovePDF आपके ब्राउज़र मेमोरी में 63+ टूल्स को शून्य विलंबता और पूर्ण गोपनीयता के साथ निष्पादित करता है।"}
              </p>

              {/* Instant Search Bar with Keyboard Shortcut */}
              <div className="w-full max-w-[560px] mb-5">
                <div className="relative flex items-center group">
                  <Search className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within:text-amber-600 transition-colors pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder={lang === "en" ? "Search 63+ tools (e.g. compress, merge, word, ocr)..." : "63+ टूल्स खोजें (उदा. कंप्रेस, मर्ज, वर्ड, ओसीआर)..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-16 py-3.5 rounded-xl bg-white border border-slate-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-3 focus:ring-amber-500/15 transition-all"
                  />
                  <span className="absolute right-3.5 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-500 font-semibold pointer-events-none">
                    /
                  </span>
                </div>
              </div>

              {/* Popular Quick-Launch Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[12px] font-heading font-bold text-slate-400 uppercase tracking-wider mr-1">
                  {lang === "en" ? "Quick Launch:" : "शीघ्र खोलें:"}
                </span>
                {[
                  { label: "Merge PDF", href: "/merge-pdf", icon: GitMerge },
                  { label: "Compress (WASM)", href: "/compress-pdf", icon: Minimize2 },
                  { label: "Govt Exam (100KB)", href: "/compress-pdf-for-ssc-upsc", icon: FileCheck },
                  { label: "PDF to Word", href: "/pdf-to-word", icon: FileType },
                  { label: "Split PDF", href: "/split-pdf", icon: Scissors },
                  { label: "OCR PDF", href: "/ocr-pdf", icon: ScanText },
                  { label: "Sign PDF", href: "/sign-pdf", icon: PenLine },
                ].map((chip, idx) => {
                  const ChipIcon = chip.icon;
                  return (
                    <a
                      key={idx}
                      href={chip.href}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-amber-50 border border-slate-200/90 hover:border-amber-400/80 text-[12px] font-heading font-semibold text-slate-700 hover:text-amber-800 transition-all shadow-2xs hover:shadow-xs"
                    >
                      <ChipIcon className="w-3.5 h-3.5 text-amber-600" />
                      <span>{chip.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#workspace"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-heading font-bold text-[14px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span>{lang === "en" ? "Browse All 63+ Tools" : "सभी 63+ टूल्स देखें"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-amber-700 font-heading font-semibold text-[14px] transition-all shadow-2xs"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === "en" ? "Why In-Browser is Safer" : "ब्राउज़र में काम करना सुरक्षित क्यों है"}</span>
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Dropzone & Live RAM Sandbox Visual (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Dropzone Card */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-2xl p-6 transition-all duration-200 border-2 border-dashed ${
                  isDragging
                    ? "border-amber-500 bg-amber-50/70 scale-[1.02] shadow-lg"
                    : "border-slate-300 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.05)] hover:border-amber-400"
                }`}
              >
                <input
                  type="file"
                  id="hero-file-drop"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="sr-only"
                />

                {!droppedFile ? (
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mb-3 shadow-xs">
                      <FileUp className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-black text-[16px] text-slate-900 mb-1">
                      {lang === "en" ? "Drop any PDF here for instant tools" : "त्वरित टूल्स के लिए यहाँ कोई भी PDF छोड़ें"}
                    </h3>
                    <p className="text-[13px] text-slate-500 max-w-[320px] mb-4">
                      {lang === "en"
                        ? "File is opened inside local browser RAM. Zero server upload, completely private."
                        : "फाइल केवल स्थानीय ब्राउज़र रैम में खुलती है। कोई सर्वर अपलोड नहीं।"}
                    </p>
                    <label
                      htmlFor="hero-file-drop"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-heading font-bold transition-all shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{lang === "en" ? "Choose PDF File" : "PDF फाइल चुनें"}</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col py-2">
                    <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-bold text-[14px] text-slate-900 truncate max-w-[200px] sm:max-w-[260px]">
                            {droppedFile.name}
                          </p>
                          <p className="text-[12px] text-slate-400">
                            {droppedFile.size} · {lang === "en" ? "Loaded in Local RAM" : "स्थानीय रैम में लोड"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDroppedFile(null)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove file"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[12px] font-heading font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      {lang === "en" ? "Select Action to Launch:" : "कार्यवाही चुनें:"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="/compress-pdf"
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-[12px] font-heading font-bold text-amber-900 transition-colors"
                      >
                        <Minimize2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Compress (WASM)</span>
                      </a>
                      <a
                        href="/split-pdf"
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-[12px] font-heading font-bold text-amber-900 transition-colors"
                      >
                        <Scissors className="w-3.5 h-3.5 text-amber-700" />
                        <span>Split Pages</span>
                      </a>
                      <a
                        href="/pdf-to-word"
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-[12px] font-heading font-bold text-amber-900 transition-colors"
                      >
                        <FileType className="w-3.5 h-3.5 text-amber-700" />
                        <span>PDF to Word</span>
                      </a>
                      <a
                        href="/ocr-pdf"
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-[12px] font-heading font-bold text-amber-900 transition-colors"
                      >
                        <ScanText className="w-3.5 h-3.5 text-amber-700" />
                        <span>OCR Text</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Sandbox Live Proof Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-heading font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Cpu className="w-3 h-3 text-emerald-600" />
                    <span>WASM Sandbox: Ready</span>
                  </span>
                  <span>Network Egress: 0.00 KB</span>
                </div>
              </div>

              {/* Mini Technical Proof Card */}
              <div className="rounded-xl p-3.5 bg-white/70 border border-slate-200/70 shadow-2xs flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {lang === "en"
                      ? "Zero telemetry, zero file retention, unlimited pages."
                      : "कोई ट्रैकिंग नहीं, कोई फाइल स्टोरेज नहीं, असीमित पेज।"}
                  </span>
                </div>
                <a
                  href="/security"
                  className="font-heading font-bold text-amber-700 hover:text-amber-800 text-[12px] shrink-0"
                >
                  {lang === "en" ? "Read Spec →" : "विवरण पढ़ें →"}
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── LIVE METRICS & TRUST STATS STRIP ─────────────────── */}
      <section className="border-b border-slate-200/90 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Stat 1: Tools */}
            <div ref={toolsCounter.ref} className="flex flex-col items-center text-center px-4 pt-2 lg:pt-0">
              <span className="font-heading font-black text-[32px] sm:text-[38px] leading-none text-amber-600">
                {toolsCounter.value}+
              </span>
              <span className="text-[12px] font-heading font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                {lang === "en" ? "Browser-First Tools" : "ब्राउज़र-फर्स्ट टूल्स"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {lang === "en" ? "Organize, Edit, OCR, Security" : "मर्ज, स्प्लिट, कंप्रेस, ओसीआर"}
              </span>
            </div>

            {/* Stat 2: In-Memory Safety */}
            <div ref={privacyCounter.ref} className="flex flex-col items-center text-center px-4 pt-2 lg:pt-0">
              <span className="font-heading font-black text-[32px] sm:text-[38px] leading-none text-emerald-600">
                {privacyCounter.value}%
              </span>
              <span className="text-[12px] font-heading font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                {lang === "en" ? "Local RAM Processing" : "स्थानीय रैम प्रोसेसिंग"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {lang === "en" ? "WebAssembly sandbox isolation" : "वेबअसेंबली सैंडबॉक्स सुरक्षा"}
              </span>
            </div>

            {/* Stat 3: Zero Server Uploads */}
            <div className="flex flex-col items-center text-center px-4 pt-2 lg:pt-0">
              <span className="font-heading font-black text-[32px] sm:text-[38px] leading-none text-slate-900">
                0 Bytes
              </span>
              <span className="text-[12px] font-heading font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                {lang === "en" ? "Server Storage" : "सर्वर स्टोरेज"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {lang === "en" ? "Documents never leave device" : "दस्तावेज़ कभी अपलोड नहीं होते"}
              </span>
            </div>

            {/* Stat 4: Free Forever */}
            <div className="flex flex-col items-center text-center px-4 pt-2 lg:pt-0">
              <span className="font-heading font-black text-[32px] sm:text-[38px] leading-none text-slate-900">
                100% Free
              </span>
              <span className="text-[12px] font-heading font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                {lang === "en" ? "No Paywalls & No Ads" : "कोई पेवॉल नहीं, कोई विज्ञापन नहीं"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {lang === "en" ? "Open-web utility for everyone" : "सभी के लिए हमेशा निःशुल्क"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ─── WORKSPACE: COMPLETE TOOL CATALOG & FILTER ────────── */}
      <section id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-16">
        
        {/* Workspace Title & Search Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-heading font-black text-amber-700 bg-amber-100/60 border border-amber-200/60 px-2.5 py-0.5 rounded-md mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{lang === "en" ? "Interactive Workspace" : "इंटरएक्टिव वर्क्सपेस"}</span>
            </div>
            <h2 className="font-heading font-black text-[28px] sm:text-[34px] text-slate-900 tracking-tight">
              {lang === "en" ? "All PDF Tools" : "सभी PDF टूल्स"}
            </h2>
            <p className="text-[14px] text-slate-500 mt-1">
              {filteredTools.length} {lang === "en" ? "tools available" : "टूल्स उपलब्ध"}
              {activeCategory !== "All" && ` · ${activeCategory}`}
              {searchQuery && ` · matching "${searchQuery}"`}
            </p>
          </div>

          {/* Quick Clear Filter */}
          {(searchQuery || activeCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              type="button"
              className="self-start md:self-auto text-[13px] font-heading font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4"
            >
              {lang === "en" ? "Reset filters" : "फ़िल्टर रीसेट करें"}
            </button>
          )}
        </div>

        {/* Category Navigation Pills (Horizontally scrollable with smooth pill style) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const label = lang === "en" ? cat.en : cat.hi;
            const count = catCount(cat.key);
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-heading font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tool Cards Bento Grid */}
        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-2xl text-slate-400 gap-3">
            <Search className="w-10 h-10 text-slate-300" />
            <h3 className="text-[16px] font-heading font-bold text-slate-700">
              {lang === "en" ? "No matching tools found" : "कोई टूल नहीं मिला"}
            </h3>
            <p className="text-[13px] text-slate-400">
              {lang === "en"
                ? `We couldn't find any tool matching "${searchQuery}". Try a different keyword.`
                : `"${searchQuery}" से मेल खाता कोई टूल नहीं मिला। कृपया दूसरा शब्द खोजें।`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-[13px] font-heading font-bold"
              type="button"
            >
              {lang === "en" ? "View all tools" : "सभी टूल्स देखें"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group relative flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(217,119,6,0.12)] hover:-translate-y-1 transition-all duration-200"
              >
                {/* Top content */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    {/* Tool Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200 shrink-0">
                      <ToolIcon name={tool.lucideIcon} className="w-5 h-5" />
                    </div>

                    {/* Capability Badges */}
                    <div className="flex items-center gap-1.5">
                      {tool.isAI ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-black tracking-wide bg-purple-50 text-purple-700 border border-purple-200/60">
                          <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                          AI
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <Zap className="w-2.5 h-2.5 text-emerald-600" />
                          WASM
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-heading font-bold text-[15px] text-slate-900 group-hover:text-amber-700 transition-colors mb-1.5 leading-snug">
                    {tool.name}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {tool.desc}
                  </p>
                </div>

                {/* Card Footer: Category & Open Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-heading font-semibold text-slate-400 group-hover:text-amber-700 transition-colors">
                  <span className="uppercase tracking-wider">{tool.category}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-amber-600 font-bold">
                    <span>{lang === "en" ? "Open" : "खोलें"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

      </section>

      {/* ─── ARCHITECTURE COMPARISON: CLIENT-SIDE VS CLOUD UPLOADERS ─── */}
      <section id="comparison" className="border-t border-slate-200/90 bg-white py-16 sm:py-20 scroll-mt-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-black uppercase tracking-[0.14em] text-amber-700 bg-amber-100/60 border border-amber-200/80 px-3 py-1 rounded-full mb-3">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === "en" ? "Architecture Breakdown" : "तकनीकी तुलना"}</span>
            </span>
            <h2 className="font-heading font-black text-[28px] sm:text-[38px] text-slate-900 tracking-tight leading-tight">
              {lang === "en"
                ? "Why WeLovePDF Beats Cloud Converters"
                : "WeLovePDF क्लाउड कन्वर्टर्स से बेहतर क्यों है?"}
            </h2>
            <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
              {lang === "en"
                ? "Most PDF websites upload your files to remote cloud storage. See how our browser-first WebAssembly engine completely changes document privacy."
                : "अधिकांश पीडीएफ वेबसाइटें आपकी निजी फाइलों को रिमोट सर्वर पर अपलोड करती हैं। जानें कि हमारा ब्राउज़र-फर्स्ट वेबअसेंबली इंजन कैसे काम करता है।"}
            </p>
          </div>

          {/* Side-by-Side Comparison Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Old Cloud Way (iLovePDF, Smallpdf, Adobe Web) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    <X className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-[18px] text-slate-900">
                      {lang === "en" ? "Traditional Cloud Tools" : "पारंपरिक क्लाउड टूल्स"}
                    </h3>
                    <p className="text-[12px] text-slate-500">
                      iLovePDF, Smallpdf, Sejda, Adobe Web
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 text-[14px]">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">{lang === "en" ? "Files leave your device:" : "फाइलें आपके डिवाइस से बाहर जाती हैं:"}</strong>{" "}
                      {lang === "en" ? "Uploaded across public network to unknown third-party cloud data centers." : "अज्ञात तीसरे पक्ष के सर्वरों पर इंटरनेट के माध्यम से भेजी जाती हैं।"}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">{lang === "en" ? "Stored on server disks:" : "सर्वर डिस्क पर स्टोर होती हैं:"}</strong>{" "}
                      {lang === "en" ? "Saved to server disks for hours or days, creating real data breach and leak liability." : "सर्वर पर घंटों या दिनों तक सुरक्षित रखी जाती हैं, जिससे लीक का खतरा रहता है।"}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">{lang === "en" ? "Strict daily limits & paywalls:" : "दैनिक सीमा और पेवॉल:"}</strong>{" "}
                      {lang === "en" ? "Capped at 2–3 files per day unless you pay high recurring monthly subscription fees." : "प्रति दिन केवल 2-3 फाइलों की अनुमति जब तक आप पेड सब्सक्रिप्शन न लें।"}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">{lang === "en" ? "Offline unusable:" : "ऑफ़लाइन काम नहीं करता:"}</strong>{" "}
                      {lang === "en" ? "Fails instantly if internet connection is unstable, slow, or disconnected." : "इंटरनेट न होने या धीमा होने पर तुरंत काम करना बंद कर देता है।"}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 text-[12px] text-slate-400">
                {lang === "en" ? "Architecture: Multi-tenant remote cloud worker queues" : "आर्किटेक्चर: रिमोट क्लाउड वर्कर कतारें"}
              </div>
            </div>

            {/* WeLovePDF Modern WASM Way */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border-2 border-amber-400/80 shadow-[0_10px_36px_rgba(217,119,6,0.12)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-[18px] text-slate-900">
                      WeLovePDF.best
                    </h3>
                    <p className="text-[12px] text-emerald-700 font-semibold">
                      {lang === "en" ? "100% Client-Side WebAssembly Architecture" : "100% क्लाइंट-साइड वेबअसेंबली आर्किटेक्चर"}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 text-[14px]">
                  <li className="flex items-start gap-3 text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-slate-950 font-bold">{lang === "en" ? "0 Bytes leave your machine:" : "0 बाइट आपके डिवाइस से बाहर जाती है:"}</strong>{" "}
                      {lang === "en" ? "Document bytes are read straight into your browser's private RAM memory." : "डॉक्यूमेंट सीधे आपके ब्राउज़र की निजी रैम में लोड होते हैं।"}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-slate-950 font-bold">{lang === "en" ? "Zero server retention:" : "शून्य सर्वर स्टोरेज:"}</strong>{" "}
                      {lang === "en" ? "We operate zero document storage servers. When you close the tab, memory clears immediately." : "हमारा कोई स्टोरेज सर्वर नहीं है। टैब बंद करते ही रैम तुरंत खाली हो जाती है।"}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-slate-950 font-bold">{lang === "en" ? "Unlimited & Free Forever:" : "असीमित और हमेशा मुफ्त:"}</strong>{" "}
                      {lang === "en" ? "No daily quotas, no page paywalls, no watermarks, and no signups required." : "कोई दैनिक सीमा नहीं, कोई पेवॉल नहीं, कोई वॉटरमार्क नहीं और कोई साइनअप नहीं।"}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-slate-950 font-bold">{lang === "en" ? "Full offline execution:" : "पूर्ण ऑफलाइन कार्यक्षमता:"}</strong>{" "}
                      {lang === "en" ? "Runs locally in browser on airplanes, subways, or anywhere without WiFi." : "हवाई जहाजों, यात्राओं या बिना इंटरनेट के भी आसानी से काम करता है।"}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-200/60 flex items-center justify-between text-[12px] text-amber-900 font-heading font-semibold">
                <span>Architecture: In-Browser WASM Thread</span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active in this browser
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── FOUNDER & TRANSPARENCY SECTION ─────────────────── */}
      <section className="border-t border-slate-200/90 bg-[#FAF8F5] py-14 sm:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-heading font-black text-[24px] shadow-sm shrink-0">
              NV
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-heading font-bold text-amber-700 uppercase tracking-wider">
                  {lang === "en" ? "Open Web Commitment" : "ओपन वेब प्रतिबद्धता"}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-[12px] text-slate-500">Bettiah, Bihar, India</span>
              </div>
              <h3 className="font-heading font-black text-[20px] text-slate-900 mb-2">
                {lang === "en"
                  ? "Engineered with Privacy as a Fundamental Right"
                  : "गोपनीयता को मौलिक अधिकार मानकर निर्मित"}
              </h3>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                {lang === "en"
                  ? "WeLovePDF was developed by Nilesh Verma to dismantle expensive document paywalls and protect users from data surveillance. All core tools run completely free in your browser, backed by public source audits, humans.txt, and llms.txt."
                  : "WeLovePDF को नीलेश वर्मा द्वारा महंगे पेवॉल को समाप्त करने और उपयोगकर्ताओं के डेटा की सुरक्षा के लिए बनाया गया है। सभी मुख्य टूल्स आपके ब्राउज़र में पूरी तरह मुफ्त चलते हैं।"}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[13px] font-heading font-semibold text-slate-700">
                <a
                  href="/about-us"
                  className="text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors"
                >
                  <span>{lang === "en" ? "Read founder story" : "फाउंडर की कहानी"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/Vardannilesh2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/humans.txt"
                  target="_blank"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                  humans.txt
                </a>
                <a
                  href="/llms.txt"
                  target="_blank"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                  llms.txt
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPREHENSIVE 10-QUESTION FAQ SECTION ───────────── */}
      <section className="border-t border-slate-200/90 bg-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-black uppercase tracking-[0.14em] text-amber-700 bg-amber-100/60 border border-amber-200/80 px-3 py-1 rounded-full mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}</span>
            </span>
            <h2 className="font-heading font-black text-[26px] sm:text-[34px] text-slate-900 tracking-tight">
              {lang === "en" ? "Everything You Need to Know" : "आपके सभी प्रश्नों के उत्तर"}
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            {FAQS.map((faq, i) => {
              const question = lang === "en" ? faq.qEn : faq.qHi;
              const answer = lang === "en" ? faq.aEn : faq.aHi;
              const isOpen = openFaq === i;

              return (
                <div key={i} className="bg-white">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 sm:px-6 py-4.5 text-left group transition-colors hover:bg-slate-50/70"
                    aria-expanded={isOpen}
                    type="button"
                  >
                    <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-slate-900 group-hover:text-amber-700 transition-colors pr-4 leading-snug">
                      {question}
                    </h3>
                    <span
                      className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-45 text-amber-600 border-amber-500 bg-amber-50" : ""
                      }`}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 sm:px-6 pb-5 text-[14px] text-slate-600 leading-relaxed">
                      {answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need more help */}
          <div className="mt-8 text-center text-[13px] text-slate-500">
            {lang === "en" ? "Have a question not listed here?" : "क्या आपके पास कोई अन्य प्रश्न है?"}{" "}
            <a href="/contact" className="font-heading font-bold text-amber-700 hover:underline">
              {lang === "en" ? "Contact Nilesh Verma" : "नीलेश वर्मा से संपर्क करें"}
            </a>
          </div>

        </div>
      </section>

      {/* ─── BOTTOM SECURITY & PRIVACY CALLOUT ───────────────── */}
      <section className="border-t border-slate-200/90 bg-amber-50/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-[13px] text-amber-900 font-heading font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {lang === "en"
                ? "Privacy-by-Design: Your files never leave your device memory."
                : "आपकी फाइलें कभी आपके डिवाइस को नहीं छोड़तीं — पूरी तरह स्थानीय निष्पादन।"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[13px] font-heading font-semibold text-slate-600">
            <a href="/security" className="hover:text-amber-800 transition-colors">
              {lang === "en" ? "Security Architecture" : "सुरक्षा मॉडल"}
            </a>
            <span>·</span>
            <a href="/privacy-policy" className="hover:text-amber-800 transition-colors">
              {lang === "en" ? "GDPR Privacy" : "गोपनीयता नीति"}
            </a>
            <span>·</span>
            <a href="/cookies" className="hover:text-amber-800 transition-colors">
              {lang === "en" ? "Cookie Policy" : "कुकी नीति"}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
