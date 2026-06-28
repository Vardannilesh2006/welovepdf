"use client";

import React, { useState, useEffect } from "react";
import { useLang } from "../components/LangContext";
import { tools } from "./data/tools-config";
import { ArrowRight, Check, Play, UserCheck, ShieldAlert, Cpu, Sparkles, Star, ChevronDown, BookOpen, Layers, CheckCircle2, ShieldCheck, Flame } from "lucide-react";

export default function Home() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  
  // AI Guide states
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

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

          {/* Right 3D Document Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-[340px] h-[340px] flex items-center justify-center">
              
              {/* Drifting Backlight Radial Gradient Blobs */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-amber/20 rounded-pill filter blur-[50px] opacity-40 animate-pulse-soft" />
              
              {/* 3D Animated Card */}
              <div className="relative w-[220px] h-[300px] bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-modal p-24 flex flex-col justify-between animate-float-3d shimmer-card cursor-pointer transform-gpu">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded bg-brand-blue/10 flex items-center justify-center font-extrabold text-brand-blue">
                    PDF
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-success bg-brand-success/15 px-8 py-2 rounded uppercase tracking-wide">
                    Private
                  </span>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="w-full h-8 bg-border-light dark:bg-border-dark/60 rounded" />
                  <div className="w-[85%] h-8 bg-border-light dark:bg-border-dark/60 rounded" />
                  <div className="w-[60%] h-8 bg-border-light dark:bg-border-dark/60 rounded" />
                </div>
                <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark/60 pt-16">
                  <span className="text-[11px] font-mono text-text-secondaryLight dark:text-text-secondaryDark">sandbox_doc.pdf</span>
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-success" />
                </div>
              </div>

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

      {/* Premium AI Assistant Panel */}
      <section className="py-48 px-24 border-b border-border-light dark:border-border-dark bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-amber/5">
        <div className="max-w-3xl mx-auto p-24 bg-white dark:bg-surface-dark border border-brand-blue/20 rounded-modal shadow-modal relative overflow-hidden">
          
          <div className="flex items-center gap-12 mb-16">
            <div className="w-10 h-10 rounded bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primaryLight dark:text-text-primaryDark">
                {lang === "en" ? "WeLovePDF Smart AI Guide" : "WeLovePDF स्मार्ट एआई गाइड"}
              </h3>
              <p className="text-[12px] text-text-secondaryLight dark:text-text-secondaryDark">
                {lang === "en" ? "Describe what you want to do, and our AI will suggest the perfect tool instantly." : "बताएं कि आप क्या करना चाहते हैं, और हमारा एआई तुरंत आपको सही टूल सुझाएगा।"}
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center">
            <input
              type="text"
              placeholder={lang === "en" ? "e.g., 'mujhe invoice compress karni hai' or 'help me add metadata to PDF'" : "जैसे, 'mujhe invoice compress karni hai' या 'मर्ज करने वाला टूल दिखाओ'"}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiSuggest()}
              className="flex-1 px-16 py-12 border border-border-light dark:border-border-dark rounded-btn bg-bg-light/40 dark:bg-bg-dark/10 text-[14px] outline-none focus:border-brand-blue"
            />
            <button
              onClick={handleAiSuggest}
              disabled={aiLoading}
              className="px-20 py-12 bg-brand-blue hover:bg-brand-blue/90 disabled:bg-brand-blue/60 text-white font-bold rounded-btn text-[14px] shadow-btn transition-all flex items-center gap-8"
            >
              {aiLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {lang === "en" ? "Ask AI" : "पूछें"}
            </button>
          </div>

          {aiResponse && (
            <div className="mt-20 p-16 bg-brand-blue/5 border border-brand-blue/10 rounded-card text-[13px] leading-relaxed text-text-primaryLight dark:text-text-primaryDark animate-fade-in font-medium">
              {renderAiResponseText(aiResponse)}
            </div>
          )}

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
