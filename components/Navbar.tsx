"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { tools } from "../app/data/tools-config";

interface NavbarProps {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Navbar({ lang, setLang, theme, setTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const query = val.toLowerCase();
    const matches = tools.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.category.toLowerCase().includes(query)
    ).slice(0, 5);
    setSearchResults(matches);
  };

  const navLinks = [
    { label: lang === "en" ? "Tools" : "टूल्स", href: "#tools" },
    { label: lang === "en" ? "AI PDF" : "एआई पीडीएफ", href: "#ai-assistant" },
    { label: lang === "en" ? "Pricing" : "मूल्य निर्धारण", href: "#pricing" },
    { label: lang === "en" ? "Blog" : "ब्लॉग", href: "#blog" },
    { label: lang === "en" ? "API" : "एपीआई", href: "#tools" },
  ];

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-200 ${
      isScrolled 
        ? "bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark shadow-sm" 
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-16 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-8 group">
          <div className="w-8 h-8 rounded-btn bg-brand-blue flex items-center justify-center text-white font-bold text-lg shadow-btn transition-transform group-hover:scale-105">
            W
          </div>
          <span className="font-semibold text-xl tracking-tight text-text-primaryLight dark:text-text-primaryDark">
            WeLovePDF
          </span>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-24">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={`/${link.href}`}
              className="text-text-secondaryLight dark:text-text-secondaryDark hover:text-brand-blue dark:hover:text-white font-medium transition-colors text-[15px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-16">
          {/* Language Selector */}
          <button 
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-6 px-12 py-6 rounded-btn border border-border-light dark:border-border-dark text-[14px] font-medium text-text-secondaryLight dark:text-text-secondaryDark hover:bg-bg-light dark:hover:bg-surface-dark transition-all"
            aria-label="Toggle Language"
            type="button"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "हिन्दी" : "English"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-8 rounded-btn border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:bg-bg-light dark:hover:bg-surface-dark transition-all"
            aria-label="Toggle Theme"
            type="button"
          >
            {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {/* Pro Plan CTA */}
          <a 
            href="#pricing" 
            className="px-16 py-8 rounded-btn bg-brand-amber hover:bg-brand-amber/90 text-text-primaryLight font-bold text-[14px] transition-all duration-150 shadow-sm"
          >
            {lang === "en" ? "Pro Plan" : "प्रो प्लान"}
          </a>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex md:hidden items-center gap-12">
          <button
            onClick={toggleTheme}
            className="p-8 rounded-btn text-text-secondaryLight dark:text-text-secondaryDark"
            aria-label="Toggle Theme"
            type="button"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-8 rounded-btn text-text-secondaryLight dark:text-text-secondaryDark"
            aria-label="Toggle Mobile Menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-bg-dark border-b border-border-light dark:border-border-dark px-16 py-24 flex flex-col gap-16 transition-all duration-200">
          <nav className="flex flex-col gap-12">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={`/${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-medium text-text-primaryLight dark:text-text-primaryDark py-8"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-12 mt-16">
            <button 
              onClick={() => {
                setLang(lang === "en" ? "hi" : "en");
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-8 w-full py-10 rounded-btn border border-border-light dark:border-border-dark text-[15px] font-medium"
              type="button"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "हिन्दी (Hindi)" : "English (अंग्रेजी)"}
            </button>
            <a 
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-10 rounded-btn bg-brand-amber text-center font-bold text-text-primaryLight text-[15px]"
            >
              {lang === "en" ? "Pro Plan" : "प्रो प्लान"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
