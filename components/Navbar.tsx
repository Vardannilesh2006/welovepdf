"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Globe, ArrowRight } from "lucide-react";

interface NavbarProps {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Navbar({ lang, setLang, theme, setTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const navLinks = [
    { label: lang === "en" ? "Tools" : "टूल्स", href: "#tools" },
    { label: lang === "en" ? "AI PDF" : "एआई पीडीएफ", href: "#ai-assistant" },
    { label: lang === "en" ? "Blog" : "ब्लॉग", href: "#blog" },
  ];

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b bg-[#FFF8F2] dark:bg-[#0A0F1E] ${
        isScrolled
          ? "shadow-md h-[72px] border-slate-200 dark:border-slate-800"
          : "shadow-sm h-[88px] border-slate-200/50 dark:border-slate-800/50"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-16 sm:px-32 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? "h-[72px]" : "h-[88px]"
      }`}>
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-12 group">
          <div className="w-[42px] h-[42px] rounded-btn bg-brand-blue flex items-center justify-center text-white font-heading font-black text-[22px] shadow-btn transition-transform group-hover:scale-105">
            W
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-heading font-black text-[22px] tracking-tight text-slate-900 dark:text-white leading-tight">
              WeLovePDF
            </span>
            <span className="hidden sm:inline-block text-[10px] font-heading font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-6 py-[2px] rounded uppercase tracking-wider mt-[2px] w-fit">
              100% Free & Private
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-32">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={`/${link.href}`}
              className="text-slate-900 dark:text-slate-100 hover:text-brand-blue dark:hover:text-white font-heading font-extrabold transition-colors text-[16px] relative py-8 group/link"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-brand-blue transition-all duration-200 group-hover/link:w-full rounded" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-16">
          {/* Language Selector */}
          <button 
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-6 px-14 py-10 rounded-btn border border-slate-200 dark:border-slate-800 text-[14px] font-heading font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle Language"
            type="button"
          >
            <Globe className="w-[16px] h-[16px] text-slate-500 dark:text-slate-400" />
            {lang === "en" ? "हिन्दी" : "English"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-10 rounded-btn border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle Theme"
            type="button"
          >
            {theme === "dark" ? <Sun className="w-[16px] h-[16px]" /> : <Moon className="w-[16px] h-[16px]" />}
          </button>

          {/* Workspace Trigger Button */}
          <a
            href="/merge-pdf"
            className="px-20 py-12 rounded-btn bg-brand-blue hover:bg-brand-blue/90 text-white font-heading font-black text-[15px] transition-all shadow-btn flex items-center gap-8 hover:scale-[1.02] active:scale-95"
          >
            {lang === "en" ? "Open Workspace" : "वर्क्सपेस खोलें"}
            <ArrowRight className="w-[16px] h-[16px]" />
          </a>

          {/* Free Badge/Action */}
          <span className="hidden xl:flex items-center gap-4 px-12 py-[8px] rounded-pill bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-heading font-extrabold text-[12px] uppercase tracking-wider">
            {lang === "en" ? "Totally Free" : "बिल्कुल मुफ्त"}
          </span>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-12">
          <button
            onClick={toggleTheme}
            className="p-[8px] rounded-btn text-slate-800 dark:text-slate-200"
            aria-label="Toggle Theme"
            type="button"
          >
            {theme === "dark" ? <Sun className="w-[20px] h-[20px]" /> : <Moon className="w-[20px] h-[20px]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-[8px] rounded-btn text-slate-800 dark:text-slate-200"
            aria-label="Toggle Mobile Menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FFF8F2] dark:bg-bg-dark border-b border-slate-200 dark:border-slate-800 px-24 py-24 flex flex-col gap-20 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={`/${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-heading font-extrabold text-slate-900 dark:text-slate-100 py-12 px-8 rounded-btn hover:bg-surface-light dark:hover:bg-surface-dark transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-12 pt-12 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => {
                setLang(lang === "en" ? "hi" : "en");
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-8 w-full py-[12px] rounded-btn border border-slate-200 dark:border-slate-800 text-[14px] font-heading font-extrabold text-slate-800 dark:text-slate-200 hover:bg-surface-light dark:hover:bg-surface-dark transition-all"
              type="button"
            >
              <Globe className="w-[16px] h-[16px]" />
              {lang === "en" ? "हिन्दी (Hindi)" : "English (अंग्रेजी)"}
            </button>
            <a
              href="/merge-pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-[12px] rounded-btn bg-brand-blue text-white text-center font-heading font-black text-[14px] shadow-btn flex items-center justify-center gap-8"
            >
              {lang === "en" ? "Open Workspace" : "वर्क्सपेस खोलें"}
              <ArrowRight className="w-[14px] h-[14px]" />
            </a>
            <span className="w-full py-[10px] rounded-btn bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center font-heading font-extrabold text-[12px] uppercase tracking-wide">
              {lang === "en" ? "100% Free & Private" : "100% मुफ्त और सुरक्षित"}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
