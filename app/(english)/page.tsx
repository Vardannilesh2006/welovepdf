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
  Sparkles, ChevronRight, ShieldCheck
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
  HelpCircle, Receipt, UserSquare, FileSpreadsheet, QrCode, BookOpen,
};

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = LucideIconMap[name] || FileText;
  return <Icon className={className ?? "w-5 h-5"} />;
}

// IntersectionObserver-based counter (real value in DOM from the start)
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(target); // start at real value — never 0
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

function MagneticWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Dampened pull factor (magnetic strength)
    const pull = 0.15;
    setPosition({ x: distanceX * pull, y: distanceY * pull });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

const CATEGORIES = [
  { key: "All", en: "All Tools", hi: "सभी टूल्स" },
  { key: "Organize", en: "Organize", hi: "व्यवस्थित करें" },
  { key: "Edit", en: "Edit", hi: "संपादित करें" },
  { key: "Optimize", en: "Optimize", hi: "अनुकूलित करें" },
  { key: "Scan & OCR", en: "Scan & OCR", hi: "स्कैन और OCR" },
  { key: "Convert from PDF", en: "Convert from PDF", hi: "PDF से कनवर्ट करें" },
  { key: "Convert to PDF", en: "Convert to PDF", hi: "PDF में कनवर्ट करें" },
  { key: "Security", en: "Security", hi: "सुरक्षा" },
  { key: "Reader", en: "Reader", hi: "रीडर" },
  { key: "AI PDF", en: "AI PDF", hi: "AI PDF" },
  { key: "Templates", en: "Templates", hi: "टेम्पलेट्स" },
];

export default function Home() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toolsCounter = useCountUp(tools.length, 700);
  const privacyCounter = useCountUp(100, 700);

  const getTools = () => {
    const q = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      const matchCat =
        activeCategory === "All" || tool.category === activeCategory;
      return matchSearch && matchCat;
    });
  };

  const filteredTools = getTools();

  // Category tool counts
  const catCount = (key: string) =>
    key === "All" ? tools.length : tools.filter((t) => t.category === key).length;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WeLovePDF",
    "url": "https://www.welovepdf.best",
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
      "email": "nileshverma99731@gmail.com"
    },
    "sameAs": [
      "https://github.com/Vardannilesh2006"
    ]
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WeLovePDF™ — Private In-Browser PDF Toolkit",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser (Chrome, Safari, Firefox, Edge, Android, iOS)",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": lang === "en" ? "Is WeLovePDF safe for sensitive documents?" : "क्या WeLovePDF संवेदनशील दस्तावेज़ों के लिए सुरक्षित है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "en"
            ? "Yes, WeLovePDF is 100% safe. Because WeLovePDF runs entirely client-side inside your local browser memory sandbox (using JavaScript and WebAssembly), your confidential documents are never uploaded to any remote servers. This ensures complete privacy and zero data leakage risks."
            : "हाँ, WeLovePDF 100% सुरक्षित है। क्योंकि WeLovePDF पूरी तरह से आपके ब्राउज़र मेमोरी सैंडबॉक्स में चलता है, आपके दस्तावेज़ कभी भी किसी रिमोट सर्वर पर अपलोड नहीं होते हैं।"
        }
      },
      {
        "@type": "Question",
        "name": lang === "en" ? "Do I need to pay or create an account to use WeLovePDF?" : "क्या WeLovePDF का उपयोग करने के लिए भुगतान या खाता बनाने की आवश्यकता है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "en"
            ? "No, you do not need to pay or register. All core browser-first tools on WeLovePDF are free with no page caps, file limits, or watermarks. We aim to keep document utilities accessible, private, and zero-cost for everyone worldwide."
            : "नहीं, आपको भुगतान या पंजीकरण करने की आवश्यकता नहीं है। WeLovePDF पर सभी मुख्य उपकरण बिल्कुल मुफ्त हैं।"
        }
      },
      {
        "@type": "Question",
        "name": lang === "en" ? "Does WeLovePDF work offline?" : "क्या WeLovePDF ऑफ़लाइन काम करता है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "en"
            ? "Yes, WeLovePDF works offline. Once the website is loaded in your browser tab, all browser-based tasks (like merge, split, rotate, delete pages) can execute fully without an active internet connection."
            : "हाँ, WeLovePDF ऑफ़लाइन काम करता है। एक बार लोड होने के बाद आप बिना इंटरनेट के भी काम कर सकते हैं।"
        }
      }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8F2] text-slate-800 animate-fade-in">
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

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Headline + CTAs */}
          <div className="max-w-[580px]">
            {/* Live Security Monitor Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-full text-[12px] font-heading font-semibold text-emerald-700 dark:text-emerald-300 mb-3.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === "en" ? "WebAssembly Sandbox Active · Zero Cloud Upload" : "वेबअसेंबली सैंडबॉक्स सक्रिय · कोई क्लाउड अपलोड नहीं"}</span>
            </div>

            <h1 className="font-heading font-black text-[36px] sm:text-[46px] leading-[1.08] tracking-tight text-slate-900 mb-3.5">
              {lang === "en"
                ? <>100% Private PDF Engine,<br /><span className="text-[#D97706]">Powered by Your Browser.</span></>
                : <>100% निजी PDF इंजन,<br /><span className="text-[#D97706]">आपके ब्राउज़र द्वारा संचालित।</span></>}
            </h1>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-6 max-w-[500px]">
              {lang === "en"
                ? "Never upload confidential documents to third-party servers again. WeLovePDF executes 63+ tools locally inside your browser memory sandbox with zero latency, zero tracking, and absolute privacy."
                : "अपने गोपनीय दस्तावेजों को कभी भी तीसरे पक्ष के सर्वरों पर अपलोड न करें। WeLovePDF आपके ब्राउज़र मेमोरी सैंडबॉक्स में 63+ टूल्स को शून्य विलंबता, शून्य ट्रैकिंग और पूर्ण गोपनीयता के साथ स्थानीय रूप से निष्पादित करता है।"}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#workspace"
                className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-heading font-black rounded-btn text-[14px] transition-all shadow-sm hover:shadow-md"
              >
                {lang === "en" ? "Open Private Workspace" : "निजी वर्क्सपेस खोलें"}
              </a>
              <a
                href="#comparison"
                className="text-[14px] font-heading font-bold text-slate-600 hover:text-[#D97706] transition-colors flex items-center gap-1.5"
              >
                {lang === "en" ? "Why Local is Safer" : "लोकल प्रोसेसिंग क्यों सुरक्षित है"}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Floating 3D Tool Cards */}
          <div className="hidden lg:flex relative h-[340px] items-center justify-center" aria-hidden="true">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#FFF5EB] to-[#FFF8F2]" />

            {/* Row 1 — top row, 2 cards */}
            <div className="absolute top-[20px] left-[10px] float-1">
              <a href="/merge-pdf" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[12px] shadow-md hover:border-[#D97706] hover:shadow-lg transition-all" style={{boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706]">
                  <GitMerge className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-slate-800">Merge PDF</span>
              </a>
            </div>

            <div className="absolute top-[20px] right-[10px] float-2">
              <a href="/compress-pdf" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[12px] shadow-md hover:border-[#D97706] hover:shadow-lg transition-all" style={{boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706]">
                  <Minimize2 className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-slate-800">Compress PDF</span>
              </a>
            </div>

            {/* Row 2 — middle, 3 cards */}
            <div className="absolute top-[115px] left-[-10px] float-3">
              <a href="/pdf-to-jpg" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[12px] shadow-md hover:border-[#D97706] hover:shadow-lg transition-all" style={{boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706]">
                  <ImageDown className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-slate-800">PDF to JPG</span>
              </a>
            </div>

            <div className="absolute top-[108px] left-1/2 -translate-x-1/2 float-1">
              <a href="/split-pdf" className="flex items-center gap-2.5 px-4 py-2.5 bg-[#D97706] rounded-[12px] shadow-lg hover:bg-[#B45309] transition-all" style={{boxShadow:'0 8px 28px rgba(217,119,6,0.3)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-white/20 flex items-center justify-center text-white">
                  <Scissors className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-white">Split PDF</span>
              </a>
            </div>

            <div className="absolute top-[115px] right-[-10px] float-4">
              <a href="/jpg-to-pdf" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[12px] shadow-md hover:border-[#D97706] hover:shadow-lg transition-all" style={{boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706]">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-slate-800">JPG to PDF</span>
              </a>
            </div>

            {/* Row 3 — bottom, 2 cards */}
            <div className="absolute bottom-[20px] left-[10px] float-5">
              <a href="/ocr-pdf" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[12px] shadow-md hover:border-[#D97706] hover:shadow-lg transition-all" style={{boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706]">
                  <ScanText className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-slate-800">OCR PDF</span>
              </a>
            </div>

            <div className="absolute bottom-[20px] right-[10px] float-6">
              <a href="/protect-pdf" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[12px] shadow-md hover:border-[#D97706] hover:shadow-lg transition-all" style={{boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706]">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[13px] text-slate-800">Protect PDF</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─── MOBILE HERO TOOL CARDS (hidden on lg+) ─────────── */}
      <section className="lg:hidden px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/merge-pdf", icon: <GitMerge className="w-4 h-4" />, label: "Merge PDF" },
            { href: "/compress-pdf", icon: <Minimize2 className="w-4 h-4" />, label: "Compress PDF" },
            { href: "/pdf-to-jpg", icon: <ImageDown className="w-4 h-4" />, label: "PDF to JPG" },
            { href: "/split-pdf", icon: <Scissors className="w-4 h-4" />, label: "Split PDF" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-[10px] hover:border-[#D97706] hover:shadow-sm transition-all"
            >
              <div className="w-7 h-7 rounded-[6px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706] shrink-0">
                {item.icon}
              </div>
              <span className="font-heading font-semibold text-[13px] text-slate-800">{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ─── TRUST STATS ──────────────────────────────────── */}
      <section className="border-y border-[#E5E7EB] bg-[#FFF5EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#E5E7EB]">
          {/* Stat 1 */}
          <div ref={toolsCounter.ref} className="flex flex-col items-center py-3 px-4">
            <span className="font-heading font-black text-[32px] md:text-[36px] leading-none text-[#D97706]">
              {toolsCounter.value}+
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-1.5">
              {lang === "en" ? "PDF Tools" : "PDF टूल्स"}
            </span>
          </div>
          {/* Stat 2 */}
          <div ref={privacyCounter.ref} className="flex flex-col items-center py-3 px-4">
            <span className="font-heading font-black text-[32px] md:text-[36px] leading-none text-emerald-600">
              {privacyCounter.value}%
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-1.5">
              {lang === "en" ? "In-Memory Safe" : "मेमोरी में सुरक्षित"}
            </span>
          </div>
          {/* Stat 3 — static, never animated */}
          <div className="flex flex-col items-center py-3 px-4">
            <span className="font-heading font-black text-[32px] md:text-[36px] leading-none text-slate-800">
              0
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-1.5">
              {lang === "en" ? "Server Uploads" : "सर्वर अपलोड"}
            </span>
          </div>
          {/* Stat 4 — static */}
          <div className="flex flex-col items-center py-3 px-4">
            <span className="font-heading font-black text-[32px] md:text-[36px] leading-none text-slate-800">
              ∞
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-1.5">
              {lang === "en" ? "Free Forever" : "हमेशा के लिए मुफ्त"}
            </span>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF TRUST STRIP ─────────────────────── */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-center gap-5 sm:gap-10">
          {[
            { icon: "⚡", text: lang === "en" ? "WebAssembly Powered" : "WebAssembly संचालित" },
            { icon: "🔒", text: lang === "en" ? "Zero Server Upload" : "कोई सर्वर अपलोड नहीं" },
            { icon: "🇮🇳", text: lang === "en" ? "Made in India" : "भारत में निर्मित" },
            { icon: "♾️", text: lang === "en" ? "Always Free" : "हमेशा मुफ्त" },
            { icon: "🛡️", text: lang === "en" ? "No Signup Required" : "साइनअप की जरूरत नहीं" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[12px] font-heading font-semibold text-slate-500">
              <span className="text-[14px] leading-none">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WORKSPACE: FILE MANAGER ──────────────────────── */}
      <section id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 scroll-mt-20">

        {/* Section Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-black text-[24px] text-slate-900 tracking-tight">
              {lang === "en" ? "All PDF Tools" : "सभी PDF टूल्स"}
            </h2>
            <p className="text-[13px] text-slate-400 mt-1">
              {filteredTools.length}{lang === "en" ? " tools" : " टूल्स"}
              {activeCategory !== "All" && ` · ${activeCategory}`}
            </p>
          </div>
          {/* Search */}
          <MagneticWrapper className="w-full sm:w-auto">
            <div className="relative w-full sm:w-[220px] focus-within:sm:w-[260px] transition-all duration-300 ease-out group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#D97706] transition-colors pointer-events-none" />
              <input
                type="search"
                placeholder={lang === "en" ? "Search… compress, OCR" : "खोजें…"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#E5E7EB] rounded bg-white text-[13px] outline-none focus:border-[#D97706] focus:shadow-[0_0_12px_rgba(217,119,6,0.12)] transition-all duration-300 ease-out"
              />
            </div>
          </MagneticWrapper>
        </div>

        {/* Two-column layout: left rail + right grid */}
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* LEFT RAIL: Category list */}
          <nav className="hidden md:flex flex-col w-[190px] flex-shrink-0 gap-1 sticky top-[70px]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const label = lang === "en" ? cat.en : cat.hi;
              const count = catCount(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  type="button"
                  className={`flex items-center justify-between w-full px-3 py-2 rounded text-left text-[13px] font-heading font-semibold transition-colors ${
                    isActive
                      ? "bg-[#D97706] text-white"
                      : "text-slate-600 hover:bg-[#FFF5EB] hover:text-slate-900"
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-[11px] font-bold ${isActive ? "text-white/80" : "text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Mobile: horizontal category pills */}
          <div className="md:hidden flex gap-2.5 overflow-x-auto pb-2 mb-4 w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  type="button"
                  className={`flex-shrink-0 px-3 py-1.5 rounded-pill text-[12px] font-heading font-bold transition-colors ${
                    isActive
                      ? "bg-[#D97706] text-white"
                      : "bg-white border border-[#E5E7EB] text-slate-600 hover:border-[#D97706]"
                  }`}
                >
                  {lang === "en" ? cat.en : cat.hi}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Tool grid */}
          <div className="flex-1 min-w-0">
            {filteredTools.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                <Search className="w-8 h-8" />
                <p className="text-[14px] font-heading font-semibold">
                  {lang === "en" ? "No tools found for that search." : "कोई टूल नहीं मिला।"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <a
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="group flex items-start gap-3.5 p-4 sm:p-4.5 border border-[#E5E7EB] rounded-card bg-white hover:border-[#D97706] hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                      <ToolIcon name={tool.lucideIcon} className="w-4 h-4" />
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-heading font-bold text-[14px] text-slate-900 group-hover:text-[#D97706] transition-colors leading-snug">
                          {tool.name}
                        </h3>
                        {tool.isAI ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-heading font-black uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20">
                            <Sparkles className="w-2.5 h-2.5" />AI
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-heading font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200/60">
                            WASM
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-400 leading-relaxed mt-1 line-clamp-2">
                        {tool.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ─── WHY WELOVEPDF VS CLOUD TOOLS COMPARISON ──────── */}
      <section id="comparison" className="border-t border-[#E5E7EB] bg-[#FFF5EB]/60 py-14 sm:py-18 scroll-mt-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-[11px] font-heading font-black uppercase tracking-[0.14em] text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full mb-3">
              {lang === "en" ? "Architecture Advantage" : "तकनीकी बढ़त"}
            </span>
            <h2 className="font-heading font-black text-[26px] sm:text-[34px] text-slate-900 tracking-tight leading-tight">
              {lang === "en"
                ? "Why WeLovePDF.best Beats Cloud Uploaders"
                : "WeLovePDF.best क्लाउड टूल्स से बेहतर क्यों है?"}
            </h2>
            <p className="text-[14px] text-slate-600 mt-2.5 leading-relaxed">
              {lang === "en"
                ? "Most PDF websites upload your sensitive files to remote servers. We execute everything directly on your CPU and RAM."
                : "अधिकांश पीडीएफ वेबसाइटें आपकी निजी फाइलें रिमोट सर्वर पर अपलोड करती हैं। हम सब कुछ सीधे आपके डिवाइस पर प्रोसेस करते हैं।"}
            </p>
          </div>

          {/* Comparison Table Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
              
              {/* Feature column */}
              <div className="p-6 bg-slate-50/50">
                <h3 className="font-heading font-bold text-[13px] text-slate-400 uppercase tracking-wider mb-4">
                  {lang === "en" ? "Core Benchmark" : "मानक तुलना"}
                </h3>
                <ul className="space-y-6 text-[14px] font-heading font-semibold text-slate-700">
                  <li className="flex items-center gap-2">🛡️ {lang === "en" ? "File Privacy & Storage" : "फाइल गोपनीयता व स्टोरेज"}</li>
                  <li className="flex items-center gap-2">⚡ {lang === "en" ? "Processing Speed" : "प्रोसेसिंग स्पीड"}</li>
                  <li className="flex items-center gap-2">♾️ {lang === "en" ? "Daily Usage Caps" : "दैनिक सीमा"}</li>
                  <li className="flex items-center gap-2">📶 {lang === "en" ? "Offline Functionality" : "ऑफलाइन कार्यक्षमता"}</li>
                  <li className="flex items-center gap-2">💳 {lang === "en" ? "Paywalls & Signups" : "पेवॉल व साइनअप"}</li>
                </ul>
              </div>

              {/* Competitor / Clones column */}
              <div className="p-6 bg-slate-50/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <h3 className="font-heading font-bold text-[13px] text-slate-500 uppercase tracking-wider">
                    {lang === "en" ? "iLovePDF & Cloud Clones" : "क्लाउड टूल्स व क्लोन साइट्स"}
                  </h3>
                </div>
                <ul className="space-y-6 text-[13px] text-slate-500">
                  <li className="flex items-center gap-2 text-rose-600/90 font-medium">⚠️ Uploaded to 3rd-party servers</li>
                  <li className="flex items-center gap-2">⏳ Slow (Upload & queue wait time)</li>
                  <li className="flex items-center gap-2">🔒 2–3 files/hr limit or paywall</li>
                  <li className="flex items-center gap-2">❌ Fails immediately offline</li>
                  <li className="flex items-center gap-2">🛑 Frequent signup popups</li>
                </ul>
              </div>

              {/* WeLovePDF.best column */}
              <div className="p-6 bg-[#FFF8F2]/70 border-t-2 md:border-t-0 md:border-l-2 border-[#D97706]/40">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-heading font-black text-[13px] text-[#D97706] uppercase tracking-wider">
                    WeLovePDF.best (Local Sandbox)
                  </h3>
                </div>
                <ul className="space-y-6 text-[13px] text-slate-800 font-semibold">
                  <li className="flex items-center gap-2 text-emerald-700">✅ 100% In-Memory RAM (0 Upload)</li>
                  <li className="flex items-center gap-2 text-emerald-700">⚡ Instant WebAssembly (0ms lag)</li>
                  <li className="flex items-center gap-2 text-emerald-700">♾️ Unlimited Free Operations</li>
                  <li className="flex items-center gap-2 text-emerald-700">✅ Runs 100% Offline in Browser</li>
                  <li className="flex items-center gap-2 text-emerald-700">🎉 Zero Signups, Zero Paywalls</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ / AEO SECTION ────────────────────────────── */}
      <section className="border-t border-[#E5E7EB] bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading font-black text-[24px] text-slate-900 tracking-tight mb-6 text-center">
            {lang === "en" ? "Frequently Asked Questions (FAQ)" : "अक्सर पूछे जाने वाले प्रश्न"}
          </h2>

          <div className="flex flex-col divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-[12px] overflow-hidden">
            {[
              {
                q: lang === "en" ? "Is WeLovePDF safe for sensitive documents?" : "क्या WeLovePDF संवेदनशील दस्तावेज़ों के लिए सुरक्षित है?",
                a: lang === "en"
                  ? "Yes, WeLovePDF is 100% safe. Because WeLovePDF runs entirely client-side inside your local browser memory sandbox (using JavaScript and WebAssembly), your confidential documents are never uploaded to any remote servers."
                  : "हाँ, WeLovePDF 100% सुरक्षित है। आपके दस्तावेज़ कभी भी किसी रिमोट सर्वर पर अपलोड नहीं होते हैं।"
              },
              {
                q: lang === "en" ? "Do I need to pay or create an account?" : "क्या भुगतान या खाता बनाने की जरूरत है?",
                a: lang === "en"
                  ? "No, you do not need to pay or register. All core browser-first tools on WeLovePDF are free with no page caps, file limits, or watermarks."
                  : "नहीं, आपको भुगतान या पंजीकरण करने की आवश्यकता नहीं है। WeLovePDF पर सभी मुख्य उपकरण बिल्कुल मुफ्त हैं।"
              },
              {
                q: lang === "en" ? "Does WeLovePDF work offline?" : "क्या WeLovePDF ऑफ़लाइन काम करता है?",
                a: lang === "en"
                  ? "Yes, WeLovePDF works offline. Once the website is loaded in your browser tab, all browser-based tasks (merge, split, rotate, delete pages) can execute fully without an active internet connection."
                  : "हाँ, WeLovePDF ऑफ़लाइन काम करता है। एक बार लोड होने के बाद आप बिना इंटरनेट के भी काम कर सकते हैं।"
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="font-heading font-bold text-[15px] text-slate-800 group-hover:text-[#D97706] transition-colors pr-4">
                    {faq.q}
                  </h3>
                  <span className={`shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-[#E5E7EB] text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-45 text-[#D97706] border-[#D97706]" : ""}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-4 text-[13px] text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRIVACY STRIP ────────────────────────────────── */}
      <section className="border-t border-[#E5E7EB] bg-[#FFF5EB] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-[13px] text-[#D97706] font-heading font-bold">
            <ShieldCheck className="w-4 h-4" />
            {lang === "en"
              ? "Your files never leave your device — processed entirely in your browser."
              : "आपकी फाइलें कभी आपके डिवाइस नहीं छोड़तीं — पूरी तरह ब्राउज़र में प्रोसेस होती हैं।"}
          </div>
          <a
            href="/security"
            className="text-[13px] font-heading font-bold text-slate-500 hover:text-[#D97706] flex items-center gap-1.5 transition-colors"
          >
            {lang === "en" ? "Our security model" : "हमारा सुरक्षा मॉडल"}
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}
