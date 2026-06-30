"use client";

import React, { useState, useEffect } from "react";
import { useLang } from "../components/LangContext";
import { tools } from "./data/tools-config";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");

  // Counter states
  const [toolsCount, setToolsCount] = useState(0);
  const [privacyPercent, setPrivacyPercent] = useState(0);
  const [uploadsCount, setUploadsCount] = useState(0);

  useEffect(() => {
    // Animate counters on mount
    const toolsTimer = setInterval(() => {
      setToolsCount((prev) => (prev >= 60 ? 60 : prev + 2));
    }, 30);
    const privacyTimer = setInterval(() => {
      setPrivacyPercent((prev) => (prev >= 100 ? 100 : prev + 4));
    }, 30);
    const uploadsTimer = setInterval(() => {
      setUploadsCount((prev) => (prev >= 0 ? 0 : prev));
    }, 30);

    return () => {
      clearInterval(toolsTimer);
      clearInterval(privacyTimer);
      clearInterval(uploadsTimer);
    };
  }, []);

  const t = {
    en: {
      badge: "Fast, clean PDF tools",
      title: "WeLovePDF",
      subtext: "WeLovePDF is a browser-based PDF toolkit that lets users merge, split, compress, convert, and secure PDF files without uploading documents to external servers.",
      exploreBtn: "Explore tools",
      workspaceBtn: "Open workspace",
    },
    hi: {
      badge: "तेज और साफ पीडीएफ टूल्स",
      title: "WeLovePDF",
      subtext: "WeLovePDF एक ब्राउज़र-आधारित पीडीएफ टूलकिट है जो उपयोगकर्ताओं को बाहरी सर्वर पर दस्तावेज़ अपलोड किए बिना पीडीएफ फाइलों को मर्ज, स्प्लिट, कंप्रेस, कन्वर्ट और सुरक्षित करने की सुविधा देता है।",
      exploreBtn: "टूल्स देखें",
      workspaceBtn: "वर्क्सपेस खोलें",
    }
  }[lang];

  const categories = [
    "All", 
    "Organize", 
    "Edit", 
    "Optimize", 
    "Scan & OCR", 
    "Convert from PDF", 
    "Convert to PDF", 
    "Security", 
    "Reader", 
    "AI PDF", 
    "Template"
  ];

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
    }

    return tools.filter(tool => {
      const matchQuery = tool.name.toLowerCase().includes(query) || 
                         tool.desc.toLowerCase().includes(query) || 
                         tool.category.toLowerCase().includes(query);
      if (filteredCategory === "All") return matchQuery;
      
      const mappedCategory = filteredCategory === "Template" ? "Templates" : filteredCategory;
      return tool.category === mappedCategory && matchQuery;
    });
  };

  return (
    <div className="w-full bg-[#FFF8F2] dark:bg-bg-dark text-slate-800 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      
      {/* 1. Peach Background Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-48 pb-64 px-24 bg-[#FFF8F2] dark:bg-bg-dark border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-48 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-20">
            <span className="text-[13px] font-heading font-black text-[#D97706] uppercase tracking-wider">
              {t.badge}
            </span>
            <h1 className="font-heading font-black text-[52px] sm:text-[72px] lg:text-[80px] leading-[1.05] tracking-tight text-slate-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-[17px] sm:text-[20px] text-slate-600 dark:text-slate-300 max-w-[620px] leading-relaxed font-normal mt-8">
              {t.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-16 mt-16 w-full">
              <a 
                href="#tools" 
                className="px-24 py-12 bg-[#D97706] hover:bg-[#B45309] text-white font-heading font-black rounded-btn transition-colors shadow-sm text-[15px]"
              >
                {t.exploreBtn}
              </a>
              <a 
                href="/merge-pdf" 
                className="px-24 py-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-heading font-black rounded-btn hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-[15px]"
              >
                {t.workspaceBtn}
              </a>
            </div>
          </div>

          {/* Right Hero Content: Quick tool list card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-[380px] bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 p-24 rounded-modal shadow-sm flex flex-col gap-12">
              <a href="/merge-pdf" className="w-full p-20 rounded bg-[#FFF7F0] dark:bg-slate-800/40 hover:bg-[#FFEFE2] dark:hover:bg-slate-800 transition-colors flex items-center justify-between group">
                <span className="font-heading font-black text-slate-900 dark:text-white text-[16px]">Merge PDF</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-4 transition-transform" />
              </a>
              <a href="/split-pdf" className="w-full p-20 rounded bg-[#FFF7F0] dark:bg-slate-800/40 hover:bg-[#FFEFE2] dark:hover:bg-slate-800 transition-colors flex items-center justify-between group">
                <span className="font-heading font-black text-slate-900 dark:text-white text-[16px]">Split PDF</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-4 transition-transform" />
              </a>
              <a href="/compress-pdf" className="w-full p-20 rounded bg-[#FFF7F0] dark:bg-slate-800/40 hover:bg-[#FFEFE2] dark:hover:bg-slate-800 transition-colors flex items-center justify-between group">
                <span className="font-heading font-black text-slate-900 dark:text-white text-[16px]">Compress PDF</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-4 transition-transform" />
              </a>
              <a href="/jpg-to-pdf" className="w-full p-20 rounded bg-[#FFF7F0] dark:bg-slate-800/40 hover:bg-[#FFEFE2] dark:hover:bg-slate-800 transition-colors flex items-center justify-between group">
                <span className="font-heading font-black text-slate-900 dark:text-white text-[16px]">JPG to PDF</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-4 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Scrolling Counters */}
      <section className="py-24 border-b border-slate-100 dark:border-slate-800 bg-[#FFF8F2] dark:bg-bg-dark">
        <div className="max-w-7xl mx-auto px-24 grid grid-cols-2 md:grid-cols-4 gap-24 text-center">
          <div>
            <div className="font-heading font-black text-[36px] md:text-[48px] text-[#D97706] leading-none mb-6">
              {toolsCount}+
            </div>
            <p className="text-[13px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === "en" ? "Browser Utilities" : "ब्राउज़र टूल्स"}
            </p>
          </div>
          <div>
            <div className="font-heading font-black text-[36px] md:text-[48px] text-emerald-600 dark:text-emerald-400 leading-none mb-6">
              {privacyPercent}%
            </div>
            <p className="text-[13px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === "en" ? "In-Memory Safe" : "लोकल मेमोरी सुरक्षित"}
            </p>
          </div>
          <div>
            <div className="font-heading font-black text-[36px] md:text-[48px] text-indigo-600 dark:text-indigo-400 leading-none mb-6">
              {uploadsCount}
            </div>
            <p className="text-[13px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === "en" ? "Uploads to Server" : "सर्वर अपलोड संख्या"}
            </p>
          </div>
          <div>
            <div className="font-heading font-black text-[36px] md:text-[48px] text-slate-800 dark:text-slate-200 leading-none mb-6">
              ∞
            </div>
            <p className="text-[13px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === "en" ? "Free Forever" : "हमेशा के लिए मुफ्त"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Filterable Tools Grid Section */}
      <section id="tools" className="py-64 px-24 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-40">
          <div>
            <span className="text-[12px] font-heading font-black text-[#D97706] uppercase tracking-wider block mb-4">
              {tools.length} {lang === "en" ? "Tools" : "टूल्स"}
            </span>
            <h2 className="font-heading font-black text-[32px] md:text-[42px] tracking-tight text-slate-900 dark:text-white">
              {lang === "en" ? "All PDF tools" : "सभी पीडीएफ टूल्स"}
            </h2>
          </div>
          
          {/* Search box */}
          <div className="w-full max-w-[200px]">
            <input
              type="text"
              placeholder={lang === "en" ? "compress, OCR..." : "खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-8 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-surface-dark text-[13px] outline-none focus:border-[#D97706] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Categories slider pills */}
        <div className="flex flex-wrap items-center gap-12 mb-32">
          {categories.map((cat, idx) => {
            const isActive = filteredCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => setFilteredCategory(cat)}
                className={`px-16 py-8 text-[13px] font-heading font-extrabold rounded-pill transition-all ${
                  isActive
                    ? "bg-[#D97706] text-white shadow-sm"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
                type="button"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
          {getTools().map((tool, idx) => (
            <a 
              key={idx}
              href={`/${tool.slug}`}
              className="p-24 border border-slate-200/60 dark:border-slate-800 rounded-card bg-white dark:bg-surface-dark flex gap-16 items-start transition-all hover:-translate-y-2 hover:shadow-card-hover hover:border-[#D97706] duration-200 group"
            >
              {/* Category Icon */}
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FFF5EA] dark:bg-slate-800 flex items-center justify-center font-heading font-black text-[18px] text-[#D97706] dark:text-amber-400 flex-shrink-0">
                {tool.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-[16px] text-slate-900 dark:text-white group-hover:text-[#D97706] dark:group-hover:text-amber-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
                  {tool.desc}
                </p>
                {tool.isBrowserWorking && (
                  <span className="text-[11px] font-heading font-extrabold text-[#D97706] dark:text-amber-400 uppercase tracking-wider block mt-8">
                    Browser working
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
