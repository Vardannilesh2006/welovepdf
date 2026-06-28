"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "../components/LangContext";
import { tools } from "./data/tools-config";
import { ArrowRight, Check, Play, UserCheck, ShieldAlert, Cpu, Sparkles, Star, ChevronDown, BookOpen, Layers, CheckCircle2, ShieldCheck, Flame, Upload, RefreshCw, FileText, Eye } from "lucide-react";

export default function Home() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Guide states
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Universal Dropzone states
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<{ label: string; desc: string; slug: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleAiSuggest = async () => {
    if (!aiQuery.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResponse("");

    try {
      const res = await fetch("/api/ai-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: aiQuery, lang })
      });

      if (!res.ok) throw new Error("AI Suggester is offline.");
      const data = await res.json();
      setAiResponse(data.response);
    } catch (err: any) {
      setAiResponse(lang === "en" 
        ? "Sorry, our AI assistant is updating its database. Please try again in a moment." 
        : "क्षमा करें, हमारा एआई सहायक डेटाबेस अपडेट कर रहा है। कृपया कुछ देर बाद पुनः प्रयास करें।");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiSuggestWithQuery = async (queryVal: string) => {
    if (!queryVal.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResponse("");

    try {
      const res = await fetch("/api/ai-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: queryVal, lang })
      });

      if (!res.ok) throw new Error("AI Suggester is offline.");
      const data = await res.json();
      setAiResponse(data.response);
    } catch (err: any) {
      setAiResponse(lang === "en" 
        ? "Sorry, our AI assistant is updating its database. Please try again in a moment." 
        : "क्षमा करें, हमारा एआई सहायक डेटाबेस अपडेट कर रहा है। कृपया कुछ देर बाद पुनः प्रयास करें।");
    } finally {
      setAiLoading(false);
    }
  };

  const renderAiResponseText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }
      parts.push(
        <a 
          key={matchIndex} 
          href={match[2]} 
          className="text-brand-blue font-extrabold hover:underline"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUniversalFile(e.dataTransfer.files[0]);
    }
  };

  const processUniversalFile = (file: File) => {
    setDroppedFile(file);
    setAnalyzing(true);
    setSuggestions([]);

    setTimeout(() => {
      setAnalyzing(false);
      const nameLower = file.name.toLowerCase();
      let list = [];

      if (nameLower.includes("invoice") || nameLower.includes("bill") || nameLower.includes("receipt")) {
        list = [
          { label: lang === "en" ? "Extract Invoice Details" : "इनवॉइस डेटा निकालें", desc: lang === "en" ? "Extract GST, total billing, and items instantly." : "जीएसटी और बिलिंग विवरण निकालें।", slug: "invoice-extractor" },
          { label: lang === "en" ? "Convert PDF to Excel" : "एक्सेल में बदलें", desc: lang === "en" ? "Export invoice tables to clean XLSX." : "सारणी को एक्सेल शीट में बदलें।", slug: "pdf-to-excel" },
          { label: lang === "en" ? "Compress Invoice PDF" : "साइज कम करें", desc: lang === "en" ? "Shrink file size for fast emailing." : "ईमेल करने के लिए साइज छोटा करें।", slug: "compress-pdf" }
        ];
      } else if (file.type.includes("image") || nameLower.endsWith(".png") || nameLower.endsWith(".jpg") || nameLower.endsWith(".jpeg")) {
        list = [
          { label: lang === "en" ? "Convert Image to PDF" : "पीडीएफ में बदलें", desc: lang === "en" ? "Wrap photos inside high-quality PDF page." : "छवियों को पीडीएफ फाइल में बदलें।", slug: "jpg-to-pdf" },
          { label: lang === "en" ? "Smart OCR Scan" : "टेक्स्ट निकालें (OCR)", desc: lang === "en" ? "Extract searchable text from image." : "इमेज से टेक्स्ट कॉपी करें।", slug: "ocr-pdf" },
          { label: lang === "en" ? "Auto Enhance Scan" : "स्कैन साफ़ करें", desc: lang === "en" ? "Remove shadows and whiten paper background." : "कागज़ के बैकग्राउंड को साफ़ और चमकीला बनाएं।", slug: "auto-enhance-scan" }
        ];
      } else {
        list = [
          { label: lang === "en" ? "Smart PDF Summary" : "पीडीएफ सारांश", desc: lang === "en" ? "Summarize key points in 1-page report." : "दस्तावेज़ का संक्षिप्त सारांश बनाएं।", slug: "summarize-pdf" },
          { label: lang === "en" ? "Compress PDF" : "पीडीएफ कंप्रेस करें", desc: lang === "en" ? "Optimize size without losing quality." : "बिना क्वालिटी खोए फ़ाइल का साइज कम करें।", slug: "compress-pdf" },
          { label: lang === "en" ? "Sign PDF" : "हस्ताक्षर करें", desc: lang === "en" ? "Draw or type electronic signature." : "पीडीएफ पर अपने डिजिटल हस्ताक्षर लगाएं।", slug: "sign-pdf" }
        ];
      }
      setSuggestions(list);
    }, 2000);
  };

  // Counter states
  const [toolsCount, setToolsCount] = useState(0);
  const [privacyPercent, setPrivacyPercent] = useState(0);
  const [uploadsCount, setUploadsCount] = useState(10);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  // Animate counters on mount
  useEffect(() => {
    const toolsTimer = setInterval(() => {
      setToolsCount((prev) => (prev >= 60 ? 60 : prev + 2));
    }, 40);
    const privacyTimer = setInterval(() => {
      setPrivacyPercent((prev) => (prev >= 100 ? 100 : prev + 4));
    }, 45);
    const uploadsTimer = setInterval(() => {
      setUploadsCount((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 150);

    return () => {
      clearInterval(toolsTimer);
      clearInterval(privacyTimer);
      clearInterval(uploadsTimer);
    };
  }, []);

  const t = {
    en: {
      badge: "⚡ World-Class Browser-First PDF Sandbox",
      title: "PDF Tasks. Processed in your Browser. 100% Private.",
      subtext: "60+ browser-based tools. Your files never leave your device. Absolute security for sensitive files.",
      exploreBtn: "Start for Free",
      workspaceBtn: "View All Tools",
      trustPill1: "✓ No Uploads",
      trustPill2: "✓ No Signup",
      trustPill3: "✓ No Watermark",
      socialProofTitle: "Join 50,000+ users across India",
      aiTitle: "Work Smarter with AI PDF Tools",
      pricingTitle: "Simple, Transparent Pricing",
      blogTitle: "Learn PDF Tips & Tricks",
    },
    hi: {
      badge: "⚡ भारत का पहला लोकल ब्राउज़र पीडीएफ सैंडबॉक्स",
      title: "पीडीएफ कार्य। आपके ब्राउज़र में संसाधित। 100% सुरक्षित।",
      subtext: "60+ ब्राउज़र-आधारित टूल्स। आपकी फाइलें आपके डिवाइस से कभी बाहर नहीं जातीं।",
      exploreBtn: "मुफ्त में शुरू करें",
      workspaceBtn: "सभी टूल्स देखें",
      trustPill1: "✓ कोई अपलोड नहीं",
      trustPill2: "✓ कोई साइनअप नहीं",
      trustPill3: "✓ कोई वॉटरमार्क नहीं",
      socialProofTitle: "भारत भर में 50,000+ उपयोगकर्ताओं से जुड़ें",
      aiTitle: "एआई पीडीएफ टूल्स के साथ स्मार्ट काम करें",
      pricingTitle: "सरल और स्पष्ट मूल्य निर्धारण",
      blogTitle: "पीडीएफ टिप्स और ट्रिक्स सीखें",
    }
  }[lang];

  const categories = ["All", "Organize", "Edit", "Optimize", "Convert from/to PDF", "Security", "AI PDF"];

  const getTools = () => {
    let query = searchQuery.toLowerCase().trim();

    // Smart search synonyms mapping
    if (query === "make pdf smaller" || query === "reduce size" || query === "shrink pdf") {
      query = "compress";
    } else if (query === "combine pages" || query === "join pdf" || query === "combine pdf") {
      query = "merge";
    } else if (query === "lock pdf" || query === "password" || query === "protect") {
      query = "protect";
    } else if (query === "unlock") {
      query = "unlock";
    } else if (query === "write alt text" || query === "alt text") {
      query = "accessibility";
    } else if (query === "invoice" || query === "bill") {
      query = "invoice";
    }

    return tools.filter(tool => {
      const matchQuery = tool.name.toLowerCase().includes(query) || 
                         tool.desc.toLowerCase().includes(query) || 
                         tool.category.toLowerCase().includes(query);
      if (filteredCategory === "All") return matchQuery;
      if (filteredCategory === "Convert from/to PDF") {
        return (tool.category.includes("Convert") && matchQuery);
      }
      return tool.category === filteredCategory && matchQuery;
    });
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Organize": return "bg-blue-500/10 text-brand-blue";
      case "Edit": return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "Optimize": return "bg-green-500/10 text-brand-success";
      case "Security": return "bg-red-500/10 text-brand-error";
      case "AI PDF": return "bg-amber-500/10 text-brand-amber";
      default: return "bg-orange-500/10 text-orange-500";
    }
  };

  return (
    <div className="w-full bg-white dark:bg-bg-dark text-text-primaryLight dark:text-text-primaryDark overflow-hidden transition-colors duration-200">
      
      {/* 1. Full-Viewport Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-48 px-24 border-b border-border-light dark:border-border-dark bg-[#FAFAFA] dark:bg-bg-dark dot-grid">
        
        {/* Soft Glowing Drifting Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-pill bg-brand-blue/5 dark:bg-brand-blue/10 blur-[100px] animate-orb-drift-1" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-pill bg-brand-amber/5 dark:bg-brand-amber/5 blur-[120px] animate-orb-drift-2" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-48 items-center relative z-10">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start gap-24">
            <span className="px-12 py-6 rounded-pill bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-semibold text-[12px] tracking-wider uppercase">
              {t.badge}
            </span>
            <h1 className="font-heading font-extrabold text-[42px] md:text-[68px] lg:text-[72px] leading-[1.05] tracking-tight text-text-primaryLight dark:text-text-primaryDark">
              {t.title}
            </h1>
            <p className="text-[16px] md:text-[19px] text-text-secondaryLight dark:text-text-secondaryDark max-w-[620px] leading-relaxed font-normal">
              {t.subtext}
            </p>

            {/* AI Assistant Search Bar in Hero */}
            <div className="w-full max-w-[580px] p-16 bg-white dark:bg-surface-dark border border-brand-blue/30 rounded-modal shadow-modal relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-amber/5 opacity-50 pointer-events-none" />
              <div className="flex items-center gap-6 mb-8 text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-amber fill-current" />
                <span>WeLovePDF AI Guide</span>
              </div>
              <div className="flex gap-8 relative z-10">
                <input
                  type="text"
                  placeholder={lang === "en" ? "e.g. 'how to extract invoice details?' or 'compress scanned doc'" : "जैसे, 'pdf compress kaise kare' या 'invoice extract tools'"}
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiSuggest()}
                  className="flex-1 px-12 py-8 border border-border-light dark:border-border-dark rounded bg-bg-light/40 dark:bg-bg-dark/10 text-[13px] outline-none focus:border-brand-blue"
                />
                <button
                  onClick={handleAiSuggest}
                  disabled={aiLoading}
                  className="px-14 py-8 bg-brand-blue hover:bg-brand-blue/90 disabled:bg-brand-blue/60 text-white font-bold rounded text-[13px] shadow-sm flex items-center gap-6 transition-all"
                >
                  {aiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {lang === "en" ? "Ask" : "पूछें"}
                </button>
              </div>
              
              {/* Prompt Pills */}
              <div className="flex flex-wrap items-center gap-8 mt-12 relative z-10 text-[11px]">
                <span className="text-text-secondaryLight/80">Try:</span>
                <button onClick={() => { setAiQuery("summarize contract"); handleAiSuggestWithQuery("summarize contract"); }} className="px-8 py-2 bg-bg-light hover:bg-brand-blue/10 dark:bg-bg-dark rounded border border-border-light dark:border-border-dark text-text-secondaryLight hover:text-brand-blue transition-colors">Summarize PDF</button>
                <button onClick={() => { setAiQuery("extract invoice info"); handleAiSuggestWithQuery("extract invoice info"); }} className="px-8 py-2 bg-bg-light hover:bg-brand-blue/10 dark:bg-bg-dark rounded border border-border-light dark:border-border-dark text-text-secondaryLight hover:text-brand-blue transition-colors">Extract Invoice</button>
                <button onClick={() => { setAiQuery("chat with pdf"); handleAiSuggestWithQuery("chat with pdf"); }} className="px-8 py-2 bg-bg-light hover:bg-brand-blue/10 dark:bg-bg-dark rounded border border-border-light dark:border-border-dark text-text-secondaryLight hover:text-brand-blue transition-colors">Ask PDF</button>
              </div>

              {aiResponse && (
                <div className="mt-12 p-12 bg-brand-blue/5 border border-brand-blue/10 rounded text-[12px] leading-relaxed text-text-primaryLight dark:text-text-primaryDark animate-fade-in relative z-10 font-semibold">
                  {renderAiResponseText(aiResponse)}
                </div>
              )}
            </div>

            {/* Two Premium CTAs */}
            <div className="flex flex-wrap items-center gap-16 mt-8 w-full">
              <a 
                href="#tools" 
                className="px-28 py-16 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold rounded-btn shadow-btn flex items-center gap-8 transition-transform hover:scale-[0.98] active:scale-[0.95]"
              >
                {t.exploreBtn}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#tools" 
                className="px-28 py-16 border border-border-light dark:border-border-dark text-text-primaryLight dark:text-text-primaryDark font-semibold rounded-btn hover:bg-white dark:hover:bg-surface-dark transition-all flex items-center gap-8"
              >
                {t.workspaceBtn}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-16 mt-16 text-[12px] font-semibold text-text-secondaryLight dark:text-text-secondaryDark/80">
              <span className="flex items-center gap-6 px-12 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill shadow-sm">
                {t.trustPill1}
              </span>
              <span className="flex items-center gap-6 px-12 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill shadow-sm">
                {t.trustPill2}
              </span>
              <span className="flex items-center gap-6 px-12 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill shadow-sm">
                {t.trustPill3}
              </span>
            </div>
          </div>

          {/* Right Column: Universal AI Workspace Dropzone & 3D Finished AI Logo */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div 
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleFileDrop}
              className={`relative w-full max-w-[380px] p-24 bg-white dark:bg-surface-dark border-2 rounded-modal shadow-modal flex flex-col items-center justify-between min-h-[380px] transition-all transform-gpu duration-200 ${
                dragActive 
                  ? "border-brand-blue bg-brand-blue/5 scale-[1.02]" 
                  : "border-border-light dark:border-border-dark/60 hover:border-brand-blue/30"
              }`}
            >
              
              {/* Backlight Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/15 to-brand-amber/15 rounded-modal filter blur-[30px] opacity-40 pointer-events-none" />

              {analyzing && (
                <div className="absolute inset-x-0 h-4 bg-brand-blue/80 animate-laser-scan shadow-[0_0_12px_#2563EB] z-30 pointer-events-none" />
              )}

              {/* State A: Upload & 3D AI core (no file uploaded) */}
              {!droppedFile && (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center gap-20 w-full cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  
                  {/* 3D Finished AI Logo/Reactor Core */}
                  <div className="relative w-[110px] h-[110px] flex items-center justify-center transform-gpu preserve-3d mt-10">
                    {/* Ring 1 (X-rotation) */}
                    <div className="absolute w-[100px] h-[100px] border-[3px] border-dashed border-brand-blue/50 rounded-pill animate-rotate-3d-x" />
                    {/* Ring 2 (Y-rotation) */}
                    <div className="absolute w-[90px] h-[90px] border-[3px] border-dotted border-brand-amber/40 rounded-pill animate-rotate-3d-y" />
                    {/* Ring 3 (Z-rotation) */}
                    <div className="absolute w-[80px] h-[80px] border-[2px] border-brand-purple/35 rounded-pill animate-rotate-3d-z" />
                    {/* Glowing Core */}
                    <div className="absolute w-[36px] h-[36px] bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-amber rounded-pill animate-pulse shadow-[0_0_24px_#2563EB]" />
                  </div>

                  <div>
                    <h4 className="font-heading font-extrabold text-[15px] text-text-primaryLight dark:text-text-primaryDark">
                      {lang === "en" ? "Universal AI Dropzone" : "यूनिवर्सल एआई ड्रॉपज़ोन"}
                    </h4>
                    <p className="text-[12px] text-text-secondaryLight/80 dark:text-text-secondaryDark/85 mt-6 px-12 leading-relaxed">
                      {lang === "en" ? "Drag & drop document or image here. AI will analyze structural data and suggest actions." : "दस्तावेज़ को यहाँ खींचें। एआई फ़ाइल का विश्लेषण कर सही टूल सुझाएगा।"}
                    </p>
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) processUniversalFile(e.target.files[0]);
                    }}
                    className="hidden" 
                  />

                  <button className="px-16 py-8 border border-border-light dark:border-border-dark text-[12px] font-bold rounded hover:bg-bg-light/40 dark:hover:bg-bg-dark/15 flex items-center gap-6 transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5 text-brand-blue" />
                    {lang === "en" ? "Browse Local File" : "फ़ाइल चुनें"}
                  </button>
                </div>
              )}

              {/* State B: Scanning/Analyzing phase */}
              {droppedFile && analyzing && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-40 gap-16 w-full">
                  <RefreshCw className="w-10 h-10 text-brand-blue animate-spin" />
                  <div>
                    <h4 className="font-bold text-[14px]">{lang === "en" ? "AI Analysis in Progress..." : "एआई विश्लेषण जारी है..."}</h4>
                    <p className="text-[11px] text-text-secondaryLight/70 mt-4 truncate max-w-[240px] font-mono">{droppedFile.name}</p>
                  </div>
                </div>
              )}

              {/* State C: Suggestions List (completed analysis) */}
              {droppedFile && !analyzing && (
                <div className="flex-1 flex flex-col justify-between w-full h-full gap-20 py-8">
                  <div className="flex justify-between items-center border-b border-border-light dark:border-border-dark/60 pb-12">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-extrabold text-[13px] truncate">{droppedFile.name}</h4>
                      <p className="text-[10px] text-brand-success font-semibold mt-2">
                        {lang === "en" ? "✓ Structural Scan Completed" : "✓ स्कैन सफलतापूर्वक पूर्ण"}
                      </p>
                    </div>
                    <button 
                      onClick={() => setDroppedFile(null)}
                      className="text-[11px] text-brand-error font-bold hover:underline ml-12"
                    >
                      {lang === "en" ? "Reset" : "हटाएँ"}
                    </button>
                  </div>

                  <div className="flex flex-col gap-12">
                    <span className="text-[11px] font-bold text-text-secondaryLight/80 uppercase tracking-wider block">
                      {lang === "en" ? "Recommended Actions:" : "अनुशंसित क्रियाएं:"}
                    </span>

                    {suggestions.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={`/${item.slug}`}
                        className="p-12 border border-border-light dark:border-border-dark rounded bg-bg-light/20 dark:bg-bg-dark/10 hover:border-brand-blue/60 hover:bg-brand-blue/5 transition-all flex items-start gap-12 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded bg-brand-blue/10 flex items-center justify-center text-brand-blue text-[11px] font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                          AI
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] font-bold text-text-primaryLight dark:text-text-primaryDark group-hover:text-brand-blue transition-colors">{item.label}</div>
                          <div className="text-[10px] text-text-secondaryLight/70 dark:text-text-secondaryDark/85 mt-2 leading-relaxed">{item.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <a 
                    href={`/${suggestions[0]?.slug || "compress-pdf"}`}
                    className="w-full py-10 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-[12px] rounded text-center shadow-btn flex items-center justify-center gap-6"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {lang === "en" ? "Execute Primary AI Suggestion" : "मुख्य सुझाव लागू करें"}
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Scrolling Counters */}
      <section className="py-24 border-b border-border-light dark:border-border-dark bg-white dark:bg-bg-dark">
        <div className="max-w-7xl mx-auto px-24 grid grid-cols-2 md:grid-cols-4 gap-24 text-center">
          <div>
            <div className="font-heading font-extrabold text-[36px] md:text-[48px] text-brand-blue leading-none mb-6">
              {toolsCount}+
            </div>
            <p className="text-[13px] font-bold text-text-secondaryLight dark:text-text-secondaryDark uppercase tracking-wider">
              {lang === "en" ? "Browser Utilities" : "ब्राउज़र टूल्स"}
            </p>
          </div>
          <div>
            <div className="font-heading font-extrabold text-[36px] md:text-[48px] text-brand-success leading-none mb-6">
              {privacyPercent}%
            </div>
            <p className="text-[13px] font-bold text-text-secondaryLight dark:text-text-secondaryDark uppercase tracking-wider">
              {lang === "en" ? "100% In-Memory Safe" : "लोकल मेमोरी सुरक्षित"}
            </p>
          </div>
          <div>
            <div className="font-heading font-extrabold text-[36px] md:text-[48px] text-brand-amber leading-none mb-6">
              {uploadsCount}
            </div>
            <p className="text-[13px] font-bold text-text-secondaryLight dark:text-text-secondaryDark uppercase tracking-wider">
              {lang === "en" ? "Uploads to Server" : "सर्वर अपलोड संख्या"}
            </p>
          </div>
          <div>
            <div className="font-heading font-extrabold text-[36px] md:text-[48px] text-text-primaryLight dark:text-text-primaryDark leading-none mb-6 font-mono">
              ∞
            </div>
            <p className="text-[13px] font-bold text-text-secondaryLight dark:text-text-secondaryDark uppercase tracking-wider">
              {lang === "en" ? "Free Forever" : "हमेशा के लिए मुफ्त"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Filterable Tools Grid Section */}
      <section id="tools" className="py-64 px-24 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-40">
          <div>
            <h2 className="font-heading font-bold text-[32px] md:text-[42px] tracking-tight">
              {lang === "en" ? "Discover PDF Tools" : "टूल्स खोजें"}
            </h2>
            <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark mt-4 max-w-[500px]">
              No queues. Adjust quality parameters and preview outputs locally inside your sandbox client.
            </p>
          </div>
          
          {/* Search box */}
          <div className="w-full max-w-[320px]">
            <input
              type="text"
              placeholder={lang === "en" ? "Search any tool..." : "टूल खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-16 py-10 border border-border-light dark:border-border-dark rounded-btn bg-white dark:bg-surface-dark text-[14px] outline-none focus:border-brand-blue transition-all"
            />
          </div>
        </div>

        {/* Animated underlines categories slider */}
        <div className="flex items-center gap-12 mb-32 overflow-x-auto pb-4 scrollbar-none border-b border-border-light dark:border-border-dark/60">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilteredCategory(cat)}
              className={`pb-12 text-[14px] font-semibold transition-all relative whitespace-nowrap ${
                filteredCategory === cat
                  ? "text-brand-blue"
                  : "text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-primaryLight dark:hover:text-white"
              }`}
              type="button"
            >
              {cat}
              {filteredCategory === cat && (
                <div className="absolute bottom-0 inset-x-0 h-2 bg-brand-blue rounded-pill animate-fade-in" />
              )}
            </button>
          ))}
        </div>

        {/* Hover-Lift Premium Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
          {getTools().map((tool, idx) => (
            <a 
              key={idx}
              href={`/${tool.slug}`}
              className="relative p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex gap-16 items-start transition-all hover:-translate-y-4 hover:shadow-card-hover hover:border-brand-blue duration-200 group shimmer-card"
            >
              {/* Animated Category Icon */}
              <div className={`w-11 h-11 rounded-btn flex items-center justify-center font-bold text-[18px] flex-shrink-0 transition-transform group-hover:scale-110 ${getCategoryColor(tool.category)}`}>
                {tool.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-[16px] mb-4 text-text-primaryLight dark:text-text-primaryDark">
                  {tool.name}
                </h3>
                <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              {/* Popular Badge */}
              {tool.category === "AI PDF" && (
                <span className="absolute top-12 right-12 text-[9px] font-bold px-6 py-2 rounded bg-brand-amber/15 border border-brand-amber/30 text-brand-amber uppercase tracking-wide">
                  Popular
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* 4. Simple Transparent Pricing */}
      <section id="pricing" className="py-64 px-24 border-t border-border-light dark:border-border-dark bg-[#FAFAFA] dark:bg-bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-48">
            <h2 className="font-heading font-bold text-[32px] md:text-[42px] mb-8">{t.pricingTitle}</h2>
            <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark">
              Unlock larger document volumes (up to 200MB) and multi-signature batch operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl mb-8">Basic</h3>
                <div className="text-[32px] font-heading font-bold mb-16">₹0 <span className="text-[14px] font-normal text-text-secondaryLight">/ forever</span></div>
                <ul className="flex flex-col gap-12 mb-32 text-[14px]">
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Max 20MB file sizes</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 100% private sandbox</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Watermark text overlays</li>
                </ul>
              </div>
              <a href="#tools" className="w-full py-10 border border-border-light dark:border-border-dark rounded-btn font-semibold text-center hover:bg-bg-light dark:hover:bg-surface-dark transition-all block">Get Started</a>
            </div>

            {/* Pro Plan */}
            <div className="p-32 bg-white dark:bg-surface-dark border-2 border-brand-blue rounded-modal shadow-modal flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-12 right-12 bg-brand-blue text-white font-extrabold text-[9px] px-8 py-2 rounded uppercase tracking-wider">Most Popular</div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-8">Professional</h3>
                <div className="text-[32px] font-heading font-bold mb-16">₹499 <span className="text-[14px] font-normal text-text-secondaryLight">/ month</span></div>
                <ul className="flex flex-col gap-12 mb-32 text-[14px]">
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Max 200MB file sizes</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> OCR Accuracy (High Presets)</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Unlimited AI Ask PDF query credits</li>
                </ul>
              </div>
              <button className="w-full py-10 bg-brand-blue text-white rounded-btn font-semibold text-center hover:bg-brand-blue/90 shadow-btn transition-all">Buy Pro Plan</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
