"use client";

import React, { useState, useEffect } from "react";
import { useLang } from "../components/LangContext";
import { tools } from "./data/tools-config";
import { ArrowRight, Check, Play, UserCheck, ShieldAlert, Cpu, Sparkles, Star, ChevronDown, BookOpen } from "lucide-react";

export default function Home() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [userCount, setUserCount] = useState(50000);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  // Simulated live user processing counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    en: {
      badge: "🇮🇳 India's Privacy-First PDF Platform",
      title: "Every PDF Tool You Need. Free. Private. Instant.",
      subtext: "60+ tools that run inside your browser. Your files never leave your device. No signup, no limits, no compromise.",
      exploreBtn: "Explore 60+ Tools ↓",
      workspaceBtn: "Open Workspace →",
      trustPill1: "✓ No Upload",
      trustPill2: "✓ No Signup",
      trustPill3: "✓ No Watermark",
      trustedCounter: "documents processed securely this week",
      companies: "Professionals at these companies use WeLovePDF:",
      mostUsed: "Most Used Tools",
      viewAll: "View All 60+ Tools →",
      socialProofTitle: "Join 50,000+ users across India",
      aiTitle: "Work Smarter with AI PDF Tools",
      pricingTitle: "Simple, Transparent Pricing",
      blogTitle: "Learn PDF Tips & Tricks",
      readMore: "Read →",
      minRead: "min read",
    },
    hi: {
      badge: "🇮🇳 भारत का पहला प्राइवेसी-फर्स्ट पीडीएफ प्लेटफॉर्म",
      title: "सभी पीडीएफ टूल्स। मुफ्त। सुरक्षित। तुरंत।",
      subtext: "60+ टूल्स जो आपके ब्राउज़र के अंदर चलते हैं। आपकी फाइलें आपके डिवाइस से बाहर नहीं जातीं। कोई साइनअप नहीं, कोई सीमा नहीं।",
      exploreBtn: "सभी 60+ टूल्स देखें ↓",
      workspaceBtn: "वर्क्सपेस खोलें →",
      trustPill1: "✓ कोई अपलोड नहीं",
      trustPill2: "✓ कोई साइनअप नहीं",
      trustPill3: "✓ कोई वॉटरमार्क नहीं",
      trustedCounter: "दस्तावेज़ इस सप्ताह सुरक्षित रूप से प्रोसेस किए गए",
      companies: "इन कंपनियों के पेशेवर WeLovePDF का उपयोग करते हैं:",
      mostUsed: "सबसे लोकप्रिय टूल्स",
      viewAll: "सभी 60+ टूल्स देखें →",
      socialProofTitle: "भारत भर में 50,000+ उपयोगकर्ताओं से जुड़ें",
      aiTitle: "एआई पीडीएफ टूल्स के साथ स्मार्ट काम करें",
      pricingTitle: "सरल और स्पष्ट मूल्य निर्धारण",
      blogTitle: "पीडीएफ टिप्स और ट्रिक्स सीखें",
      readMore: "पढ़ें →",
      minRead: "मिनट पठन",
    }
  }[lang];

  // Category listing map
  const categories = ["All", "Organize", "Edit", "Optimize", "Convert from/to PDF", "Security", "AI PDF"];

  // Filter tools
  const getTools = () => {
    const query = searchQuery.toLowerCase().trim();
    return tools.filter(tool => {
      const matchQuery = tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query);
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

  const testimonials = [
    {
      name: "Riya Sharma",
      city: "Jaipur",
      stars: 5,
      text: lang === "en" 
        ? "Finally a PDF tool that doesn't force me to create an account. Compress PDF works in one second!"
        : "आखिरकार एक ऐसा पीडीएफ टूल जिसे अकाउंट बनाने की जरूरत नहीं है। कंप्रेस पीडीएफ एक सेकंड में काम करता है!"
    },
    {
      name: "Aman Verma",
      city: "Bengaluru",
      stars: 5,
      text: lang === "en" 
        ? "The digital signature verified instantly in my browser. Completely local and safe for my legal templates."
        : "डिजिटल हस्ताक्षर मेरे ब्राउज़र में तुरंत सत्यापित हो गए। मेरे कानूनी टेम्पलेट्स के लिए पूरी तरह से सुरक्षित!"
    },
    {
      name: "Sonia Gupta",
      city: "Delhi",
      stars: 5,
      text: lang === "en"
        ? "I use the AI Summarizer for my textbooks. Extracts exactly what I need without uploading pages."
        : "मैं अपनी पाठ्यपुस्तकों के लिए एआई समराइज़र का उपयोग करती हूँ। पृष्ठों को अपलोड किए बिना मुझे वही मिलता है जो मुझे चाहिए।"
    }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-48 pb-64 px-16 border-b border-border-light dark:border-border-dark grid-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-48 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-24">
            {/* Pill Badge */}
            <span className="px-12 py-6 rounded-pill bg-brand-amber/10 border border-brand-amber/30 text-brand-amber font-semibold text-[13px] tracking-wide animate-pulse-soft">
              {t.badge}
            </span>
            <h1 className="text-[36px] md:text-[54px] font-extrabold tracking-tight leading-[1.1] text-text-primaryLight dark:text-text-primaryDark">
              {t.title}
            </h1>
            <p className="text-[16px] md:text-[18px] text-text-secondaryLight dark:text-text-secondaryDark max-w-[600px] leading-relaxed">
              {t.subtext}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-16 mt-8 w-full">
              <a 
                href="#tools" 
                className="px-24 py-14 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-btn shadow-btn flex items-center gap-8 transition-transform hover:scale-[1.02]"
              >
                {t.exploreBtn}
              </a>
              <a 
                href="/merge-pdf" 
                className="px-24 py-14 border border-border-light dark:border-border-dark text-text-primaryLight dark:text-text-primaryDark font-semibold rounded-btn hover:bg-bg-light dark:hover:bg-surface-dark transition-all flex items-center gap-8"
              >
                {t.workspaceBtn}
              </a>
            </div>

            {/* Trust Pills */}
            <div className="flex flex-wrap items-center gap-16 mt-8 text-[13px] font-medium text-text-secondaryLight dark:text-text-secondaryDark">
              <span className="flex items-center gap-6 px-12 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill">
                {t.trustPill1}
              </span>
              <span className="flex items-center gap-6 px-12 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill">
                {t.trustPill2}
              </span>
              <span className="flex items-center gap-6 px-12 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill">
                {t.trustPill3}
              </span>
            </div>

            {/* Live Counter */}
            <div className="mt-16 text-[14px] text-text-secondaryLight dark:text-text-secondaryDark">
              <span className="font-mono font-bold text-brand-blue text-lg mr-6">
                {userCount.toLocaleString()}
              </span>
              {t.trustedCounter}
            </div>
          </div>

          {/* SVG Sandbox Processing Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <svg width="340" height="340" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[320px]">
              <rect x="20" y="20" width="160" height="160" rx="16" className="fill-white dark:fill-surface-dark stroke-border-light dark:stroke-border-dark" strokeWidth="2" />
              <rect x="40" y="40" width="120" height="8" rx="4" className="fill-brand-blue/20" />
              <rect x="40" y="56" width="90" height="6" rx="3" className="fill-text-secondaryLight/20 dark:fill-text-secondaryDark/20" />
              {/* PDF Document Icons */}
              <g className="animate-pulse-soft">
                <rect x="60" y="80" width="80" height="90" rx="8" className="fill-white dark:fill-bg-dark stroke-brand-blue" strokeWidth="2" />
                <path d="M75 100 H125 M75 116 H125 M75 132 H105" className="stroke-border-light dark:stroke-border-dark" strokeWidth="2" strokeLinecap="round" />
                <circle cx="100" cy="120" r="16" className="fill-brand-amber/10 stroke-brand-amber" strokeWidth="1.5" />
                <path d="M96 120 L104 120 M100 116 L100 124" className="stroke-brand-amber" strokeWidth="2" strokeLinecap="round" />
              </g>
              {/* Shield lock status */}
              <circle cx="160" cy="160" r="22" className="fill-brand-success/15 stroke-brand-success" strokeWidth="2" />
              <path d="M155 160 L158 163 L166 155" className="stroke-brand-success" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Companies Trust Bar */}
      <section className="py-24 border-b border-border-light dark:border-border-dark bg-white dark:bg-bg-dark transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-16 text-center">
          <p className="text-[12px] uppercase tracking-wider font-semibold text-text-secondaryLight dark:text-text-secondaryDark/80 mb-16">
            {t.companies}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-32 md:gap-64 opacity-50 dark:opacity-40 filter grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-bold text-lg">Google</span>
            <span className="font-bold text-lg">Microsoft</span>
            <span className="font-bold text-lg">Infosys</span>
            <span className="font-bold text-lg">TCS</span>
            <span className="font-bold text-lg">HDFC</span>
            <span className="font-bold text-lg">Zomato</span>
          </div>
        </div>
      </section>

      {/* 3. Quick Access Tool Grid */}
      <section id="tools" className="py-48 px-16 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-32">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t.mostUsed}</h2>
            <p className="text-[14px] text-text-secondaryLight mt-4">
              Select any of our 60+ tools. Files are processed locally.
            </p>
          </div>
          {/* Search bar */}
          <div className="w-full max-w-[320px]">
            <input
              type="text"
              placeholder={lang === "en" ? "Search any tool..." : "टूल खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-16 py-8 border border-border-light dark:border-border-dark rounded-input bg-white dark:bg-surface-dark text-[14px] outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-8 mb-24 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilteredCategory(cat)}
              className={`px-14 py-8 rounded-pill text-[13px] font-semibold transition-all whitespace-nowrap ${
                filteredCategory === cat
                  ? "bg-brand-blue text-white"
                  : "border border-border-light dark:border-border-dark text-text-secondaryLight hover:border-brand-blue"
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {getTools().map((tool, idx) => (
            <a 
              key={idx}
              href={`/${tool.slug}`}
              className="relative p-20 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex gap-16 items-start transition-all hover:scale-[1.02] hover:border-brand-blue hover:shadow-card-hover"
            >
              {/* Category-coded Icon */}
              <div className={`w-10 h-10 rounded-btn flex items-center justify-center font-bold text-[16px] flex-shrink-0 ${getCategoryColor(tool.category)}`}>
                {tool.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-[15px] mb-4 text-text-primaryLight dark:text-text-primaryDark">
                  {tool.name}
                </h3>
                <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              {/* Badge */}
              <span className="absolute top-12 right-12 text-[9px] font-bold px-6 py-2 rounded-pill bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark uppercase tracking-wide">
                {tool.category === "AI PDF" ? "AI" : "Free"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Social Proof Section */}
      <section className="py-64 px-16 border-t border-border-light dark:border-border-dark bg-bg-light/40 dark:bg-bg-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-48">
            <h2 className="text-2xl font-bold mb-8">{t.socialProofTitle}</h2>
            <p className="text-[14px] text-text-secondaryLight">
              See what professionals from Delhi, Bengaluru, and Mumbai say about WeLovePDF.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {testimonials.map((test, idx) => (
              <div key={idx} className="p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex flex-col justify-between">
                <p className="text-[14px] italic text-text-primaryLight dark:text-text-primaryDark leading-relaxed mb-20">
                  "{test.text}"
                </p>
                <div className="flex items-center justify-between pt-12 border-t border-border-light/40 dark:border-border-dark/40">
                  <div>
                    <h4 className="font-bold text-[14px]">{test.name}</h4>
                    <p className="text-[11px] text-text-secondaryLight">{test.city}</p>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI Features Section */}
      <section id="ai-assistant" className="py-64 px-16 max-w-7xl mx-auto border-t border-border-light dark:border-border-dark">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-48 items-center">
          <div className="lg:col-span-6 flex flex-col items-start gap-16">
            <span className="px-10 py-4 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue rounded-pill text-[12px] font-bold flex items-center gap-6">
              <Cpu className="w-4 h-4" />
              🤖 AI-Powered
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">{t.aiTitle}</h2>
            <p className="text-[14px] text-text-secondaryLight leading-relaxed">
              Unlock advanced operations. Converse directly with long contracts, translate page nodes, extract invoice lists, or build flashcards automatically.
            </p>
            
            {/* AI Feature cards list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mt-16 w-full">
              {tools.filter(t => t.category === "AI PDF").slice(0, 4).map((tool, idx) => (
                <div key={idx} className="p-16 border border-border-light dark:border-border-dark rounded-card bg-bg-light/20 dark:bg-bg-dark/10 flex flex-col gap-6">
                  <h4 className="font-bold text-[14px] flex items-center gap-6">
                    <Sparkles className="w-4 h-4 text-brand-amber" />
                    {tool.name}
                  </h4>
                  <p className="text-[12px] text-text-secondaryLight">{tool.desc}</p>
                  <a href={`/${tool.slug}`} className="text-[11px] font-bold text-brand-blue hover:underline mt-4">
                    Try Free →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time chat visual mock */}
          <div className="lg:col-span-6 border border-border-light dark:border-border-dark rounded-modal shadow-lg overflow-hidden bg-white dark:bg-surface-dark">
            <div className="p-16 border-b border-border-light dark:border-border-dark bg-bg-light/30 dark:bg-bg-dark/5 flex items-center gap-8">
              <div className="w-6 h-6 rounded-pill bg-brand-blue flex items-center justify-center text-white text-[11px] font-bold">W</div>
              <span className="text-[13px] font-semibold">WeLovePDF AI Assistant</span>
            </div>
            <div className="p-24 flex flex-col gap-12 max-h-[260px] overflow-y-auto font-mono text-[12px]">
              <div className="self-end px-12 py-8 bg-brand-blue/10 border border-brand-blue/20 rounded-card max-w-[80%]">
                Summarize section 4 of the invoice.
              </div>
              <div className="self-start px-12 py-8 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-card max-w-[85%]">
                Section 4 summary:<br />
                - GST Rate: 18%<br />
                - CGST: ₹67.50<br />
                - SGST: ₹67.50<br />
                Total invoice balance: ₹885.00
              </div>
            </div>
            <div className="p-16 border-t border-border-light dark:border-border-dark flex justify-between items-center bg-bg-light/30 dark:bg-bg-dark/5">
              <span className="text-[12px] text-text-secondaryLight">Ask anything about your document...</span>
              <button className="px-12 py-6 bg-brand-blue text-white rounded-btn text-[11px] font-bold" type="button">Send</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="pricing" className="py-64 px-16 border-t border-border-light dark:border-border-dark bg-bg-light/40 dark:bg-bg-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-48">
            <h2 className="text-3xl font-extrabold tracking-tight mb-8">{t.pricingTitle}</h2>
            <p className="text-[14px] text-text-secondaryLight mb-24">
              All core browser tools are free forever. Upgrade to Pro for large files & server OCR.
            </p>

            {/* Toggle Monthly/Yearly */}
            <div className="inline-flex items-center gap-8 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill p-4 shadow-sm">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-16 py-6 rounded-pill text-[13px] font-semibold transition-all ${billingCycle === "monthly" ? "bg-brand-blue text-white" : ""}`}
                type="button"
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-16 py-6 rounded-pill text-[13px] font-semibold transition-all flex items-center gap-6 ${billingCycle === "yearly" ? "bg-brand-blue text-white" : ""}`}
                type="button"
              >
                Yearly
                <span className="text-[10px] bg-brand-amber text-text-primaryLight font-bold px-6 py-1 rounded-pill uppercase tracking-wider">Save 30%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-stretch">
            {/* Free plan */}
            <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl mb-8">Free</h3>
                <p className="text-[13px] text-text-secondaryLight mb-24">Core browser-based processing</p>
                <div className="text-3xl font-bold mb-24">₹0</div>
                <ul className="flex flex-col gap-12 text-[14px]">
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> All 60+ Browser tools</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 100% Private local sandbox</li>
                  <li className="flex items-center gap-8 text-text-secondaryLight/50"><span className="text-brand-error">✗</span> Up to 200MB files</li>
                  <li className="flex items-center gap-8 text-text-secondaryLight/50"><span className="text-brand-error">✗</span> Server OCR & AI assistance</li>
                </ul>
              </div>
              <a href="#tools" className="mt-32 w-full py-10 border border-brand-blue text-brand-blue rounded-btn text-center font-bold text-[14px] hover:bg-brand-blue/5">
                Get Started
              </a>
            </div>

            {/* Pro Plan */}
            <div className="p-32 bg-white dark:bg-surface-dark border-2 border-brand-blue rounded-modal shadow-lg flex flex-col justify-between relative transform scale-[1.02]">
              <span className="absolute top-0 right-32 transform -translate-y-1/2 bg-brand-blue text-white text-[10px] font-bold px-12 py-4 rounded-pill uppercase tracking-wider shadow-sm">
                Most Popular
              </span>
              <div>
                <h3 className="font-bold text-xl mb-8">Pro Plan</h3>
                <p className="text-[13px] text-text-secondaryLight mb-24">For advanced document workflows</p>
                <div className="text-3xl font-bold mb-24">
                  {billingCycle === "yearly" ? "₹524" : "₹749"}
                  <span className="text-sm font-normal text-text-secondaryLight"> / month</span>
                </div>
                <ul className="flex flex-col gap-12 text-[14px]">
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 200MB File size limit</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Advanced Tesseract OCR</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Gemini AI summarizations</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> GST Hindi Invoice creator</li>
                </ul>
              </div>
              <div className="mt-32">
                <button className="w-full py-12 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-btn font-bold text-[14px] shadow-btn" type="button">
                  Start 7-Day Free Trial
                </button>
                <p className="text-[11px] text-text-secondaryLight/80 text-center mt-12">
                  No credit card required • 30-day refund guarantee
                </p>
              </div>
            </div>

            {/* Enterprise plan */}
            <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl mb-8">Enterprise</h3>
                <p className="text-[13px] text-text-secondaryLight mb-24">For departments & large volumes</p>
                <div className="text-3xl font-bold mb-24">Custom</div>
                <ul className="flex flex-col gap-12 text-[14px]">
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Dedicated REST API keys</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Unlimited processing limits</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> SSO integration & dashboards</li>
                  <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 24/7 SLA response times</li>
                </ul>
              </div>
              <a href="/contact" className="mt-32 w-full py-10 border border-border-light dark:border-border-dark text-center font-bold text-[14px] hover:bg-bg-light dark:hover:bg-surface-dark rounded-btn">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Blog Preview Section */}
      <section id="blog" className="py-64 px-16 max-w-7xl mx-auto border-t border-border-light dark:border-border-dark">
        <div className="text-center max-w-[620px] mx-auto mb-48">
          <h2 className="text-3xl font-extrabold tracking-tight mb-8">{t.blogTitle}</h2>
          <p className="text-[14px] text-text-secondaryLight">
            Practical tutorials and reviews on document workflows and local privacy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          <div className="p-24 border border-border-light dark:border-border-dark rounded-card hover:border-brand-blue transition-colors flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-brand-blue/10 text-brand-blue font-bold px-8 py-2 rounded-pill uppercase tracking-wider">Security</span>
              <h3 className="font-bold text-[16px] mt-12 mb-8">Why Browser-First PDF Tools are Better for Data Security</h3>
              <p className="text-[13px] text-text-secondaryLight leading-relaxed mb-16">Explore how client-side WebAssembly structures process sensitive contracts safely.</p>
            </div>
            <a href="/blog" className="text-[13px] font-bold text-brand-blue flex items-center gap-6 hover:underline">
              {t.readMore}
            </a>
          </div>
          <div className="p-24 border border-border-light dark:border-border-dark rounded-card hover:border-brand-blue transition-colors flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-brand-success/10 text-brand-success font-bold px-8 py-2 rounded-pill uppercase tracking-wider">Optimization</span>
              <h3 className="font-bold text-[16px] mt-12 mb-8">PDF Compression Without Quality Loss</h3>
              <p className="text-[13px] text-text-secondaryLight leading-relaxed mb-16">How resolution downsampling and subsets compress files without text blur.</p>
            </div>
            <a href="/blog" className="text-[13px] font-bold text-brand-blue flex items-center gap-6 hover:underline">
              {t.readMore}
            </a>
          </div>
          <div className="p-24 border border-border-light dark:border-border-dark rounded-card hover:border-brand-blue transition-colors flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-brand-amber/10 text-brand-amber font-bold px-8 py-2 rounded-pill uppercase tracking-wider">Workflows</span>
              <h3 className="font-bold text-[16px] mt-12 mb-8">A Guide to Digitizing Scans with OCR and Bates Numbering</h3>
              <p className="text-[13px] text-text-secondaryLight leading-relaxed mb-16">Perform keyword searches inside historical archives by generating character overlays.</p>
            </div>
            <a href="/blog" className="text-[13px] font-bold text-brand-blue flex items-center gap-6 hover:underline">
              {t.readMore}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
