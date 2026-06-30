"use client";

import React from "react";

interface NavbarProps {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Navbar({ lang, setLang, theme, setTheme }: NavbarProps) {
  const navLinks = [
    { label: lang === "en" ? "Tools" : "टूल्स", href: "#tools" },
    { label: lang === "en" ? "Workspace" : "वर्क्सपेस", href: "/merge-pdf" },
    { label: lang === "en" ? "Privacy" : "गोपनीयता", href: "/privacy-policy" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-[#FFF8F2] dark:bg-[#0A0F1E] border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-200 h-[72px]">
      <div className="max-w-7xl mx-auto px-16 sm:px-32 h-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-12 group">
          <div className="w-[36px] h-[36px] rounded bg-[#D97706] flex items-center justify-center text-white font-heading font-black text-[20px] shadow-sm transition-transform group-hover:scale-105">
            W
          </div>
          <span className="font-heading font-black text-[21px] tracking-tight text-slate-800 dark:text-white leading-tight">
            We Love PDF
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-24">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href}
              className="text-slate-600 dark:text-slate-300 hover:text-[#D97706] dark:hover:text-amber-400 font-heading font-bold transition-colors text-[15px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
}
