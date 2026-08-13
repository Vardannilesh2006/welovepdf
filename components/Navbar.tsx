"use client";

import React from "react";

interface NavbarProps {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const prefix = lang === "hi" ? "/hi" : "";
  const navLinks = [
    { label: lang === "en" ? "Tools" : "टूल्स", href: `${prefix}/#workspace` },
    { label: lang === "en" ? "Blog" : "ब्लॉग", href: `${prefix}/blog` },
    { label: lang === "en" ? "Privacy" : "गोपनीयता", href: `${prefix}/privacy-policy` },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-[#FFF8F2] border-b border-[#E5E7EB] transition-all duration-200 h-[56px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <a href={prefix || "/"} className="flex items-center gap-2.5 group" aria-label="WeLovePDF home">
          <div className="w-[28px] h-[28px] rounded bg-[#D97706] flex items-center justify-center text-white font-heading font-black text-[15px] shadow-sm">
            W
          </div>
          <span className="font-heading font-black text-[17px] tracking-tight text-slate-800 leading-tight">
            WeLovePDF
          </span>
        </a>
        <nav className="flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="text-slate-500 hover:text-[#D97706] font-heading font-semibold transition-colors text-[13px] hidden sm:block">
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            type="button"
            className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[12px] font-heading font-bold text-slate-500 hover:border-[#D97706] hover:text-[#D97706] transition-colors bg-white"
            aria-label="Switch language"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
        </nav>
      </div>
    </header>
  );
}
