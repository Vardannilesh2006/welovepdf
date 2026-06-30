"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "../components/LangContext";
import { tools } from "./data/tools-config";
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

  return (
    <div className="w-full min-h-screen bg-[#FFF8F2] text-slate-800 animate-fade-in">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-24 pt-48 pb-40">
        <div className="max-w-[680px]">
          <p className="text-[12px] font-heading font-black text-[#D97706] uppercase tracking-[0.12em] mb-16">
            {lang === "en" ? "Free · Browser-based · Private" : "मुफ्त · ब्राउज़र-आधारित · निजी"}
          </p>
          <h1 className="font-heading font-black text-[44px] sm:text-[56px] leading-[1.05] tracking-tight text-slate-900 mb-16">
            {lang === "en"
              ? <>63 free PDF tools,<br />100% in your browser.</>
              : <>63 मुफ्त PDF टूल्स,<br />100% आपके ब्राउज़र में।</>}
          </h1>
          <p className="text-[16px] text-slate-500 leading-relaxed mb-28 max-w-[540px]">
            {lang === "en"
              ? "Merge, split, compress, convert, OCR, sign, and more — files never leave your device."
              : "मर्ज, स्प्लिट, कंप्रेस, कनवर्ट, OCR, साइन और बहुत कुछ — फाइलें कभी आपके डिवाइस नहीं छोड़तीं।"}
          </p>
          <div className="flex flex-wrap items-center gap-12">
            <a
              href="#workspace"
              className="px-24 py-12 bg-[#D97706] hover:bg-[#B45309] text-white font-heading font-black rounded-btn text-[14px] transition-colors shadow-sm"
            >
              {lang === "en" ? "Open Workspace" : "वर्क्सपेस खोलें"}
            </a>
            <a
              href="#workspace"
              className="text-[14px] font-heading font-bold text-slate-500 hover:text-[#D97706] transition-colors flex items-center gap-6"
            >
              {lang === "en" ? "Browse all tools" : "सभी टूल्स देखें"}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── TRUST STATS ──────────────────────────────────── */}
      <section className="border-y border-[#E5E7EB] bg-[#FFF5EB]">
        <div className="max-w-7xl mx-auto px-24 py-24 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#E5E7EB]">
          {/* Stat 1 */}
          <div ref={toolsCounter.ref} className="flex flex-col items-center py-8 px-16">
            <span className="font-heading font-black text-[36px] md:text-[40px] leading-none text-[#D97706]">
              {toolsCounter.value}+
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-6">
              {lang === "en" ? "PDF Tools" : "PDF टूल्स"}
            </span>
          </div>
          {/* Stat 2 */}
          <div ref={privacyCounter.ref} className="flex flex-col items-center py-8 px-16">
            <span className="font-heading font-black text-[36px] md:text-[40px] leading-none text-emerald-600">
              {privacyCounter.value}%
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-6">
              {lang === "en" ? "In-Memory Safe" : "मेमोरी में सुरक्षित"}
            </span>
          </div>
          {/* Stat 3 — static, never animated */}
          <div className="flex flex-col items-center py-8 px-16">
            <span className="font-heading font-black text-[36px] md:text-[40px] leading-none text-slate-800">
              0
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-6">
              {lang === "en" ? "Server Uploads" : "सर्वर अपलोड"}
            </span>
          </div>
          {/* Stat 4 — static */}
          <div className="flex flex-col items-center py-8 px-16">
            <span className="font-heading font-black text-[36px] md:text-[40px] leading-none text-slate-800">
              ∞
            </span>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider mt-6">
              {lang === "en" ? "Free Forever" : "हमेशा के लिए मुफ्त"}
            </span>
          </div>
        </div>
      </section>

      {/* ─── WORKSPACE: FILE MANAGER ──────────────────────── */}
      <section id="workspace" className="max-w-7xl mx-auto px-24 py-48 scroll-mt-20">

        {/* Section Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16 mb-32">
          <div>
            <h2 className="font-heading font-black text-[26px] text-slate-900 tracking-tight">
              {lang === "en" ? "All PDF Tools" : "सभी PDF टूल्स"}
            </h2>
            <p className="text-[13px] text-slate-400 mt-4">
              {filteredTools.length}{lang === "en" ? " tools" : " टूल्स"}
              {activeCategory !== "All" && ` · ${activeCategory}`}
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute left-12 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder={lang === "en" ? "Search tools… e.g. compress, OCR" : "टूल खोजें…"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-36 pr-12 py-10 border border-[#E5E7EB] rounded bg-white text-[13px] outline-none focus:border-[#D97706] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Two-column layout: left rail + right grid */}
        <div className="flex gap-32 items-start">

          {/* LEFT RAIL: Category list */}
          <nav className="hidden md:flex flex-col w-[200px] flex-shrink-0 gap-4 sticky top-[70px]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const label = lang === "en" ? cat.en : cat.hi;
              const count = catCount(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  type="button"
                  className={`flex items-center justify-between w-full px-12 py-8 rounded text-left text-[13px] font-heading font-semibold transition-colors ${
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
          <div className="md:hidden flex gap-10 overflow-x-auto pb-8 mb-16 w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  type="button"
                  className={`flex-shrink-0 px-14 py-6 rounded-pill text-[12px] font-heading font-bold transition-colors ${
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
              <div className="flex flex-col items-center justify-center py-64 text-slate-400 gap-12">
                <Search className="w-8 h-8" />
                <p className="text-[14px] font-heading font-semibold">
                  {lang === "en" ? "No tools found for that search." : "कोई टूल नहीं मिला।"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
                {filteredTools.map((tool) => (
                  <a
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="group flex items-start gap-14 p-20 border border-[#E5E7EB] rounded-card bg-white hover:border-[#D97706] hover:shadow-sm transition-all duration-150"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-[#FFF5EB] flex items-center justify-center text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                      <ToolIcon name={tool.lucideIcon} className="w-5 h-5" />
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-8 flex-wrap">
                        <h3 className="font-heading font-bold text-[14px] text-slate-900 group-hover:text-[#D97706] transition-colors leading-snug">
                          {tool.name}
                        </h3>
                        {tool.isAI && (
                          <span className="inline-flex items-center gap-3 px-6 py-1 rounded text-[9px] font-heading font-black uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20">
                            <Sparkles className="w-2.5 h-2.5" />AI
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-400 leading-relaxed mt-4 line-clamp-2">
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

      {/* ─── PRIVACY STRIP ────────────────────────────────── */}
      <section className="border-t border-[#E5E7EB] bg-[#FFF5EB] py-24">
        <div className="max-w-7xl mx-auto px-24 flex flex-col sm:flex-row items-center justify-between gap-16">
          <div className="flex items-center gap-10 text-[13px] text-[#D97706] font-heading font-bold">
            <ShieldCheck className="w-4 h-4" />
            {lang === "en"
              ? "Your files never leave your device — processed entirely in your browser."
              : "आपकी फाइलें कभी आपके डिवाइस नहीं छोड़तीं — पूरी तरह ब्राउज़र में प्रोसेस होती हैं।"}
          </div>
          <a
            href="/security"
            className="text-[13px] font-heading font-bold text-slate-500 hover:text-[#D97706] flex items-center gap-6 transition-colors"
          >
            {lang === "en" ? "Our security model" : "हमारा सुरक्षा मॉडल"}
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}
