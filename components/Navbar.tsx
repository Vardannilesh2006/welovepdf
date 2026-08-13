"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const prefix = lang === "hi" ? "/hi" : "";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: lang === "en" ? "Tools" : "टूल्स", href: `${prefix}/#workspace` },
    { label: lang === "en" ? "Blog" : "ब्लॉग", href: `${prefix}/blog` },
    { label: lang === "en" ? "FAQ" : "सहायता", href: `${prefix}/faq` },
    { label: lang === "en" ? "Pricing" : "मूल्य", href: `${prefix}/pricing` },
  ];

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path && pathname === path;
  };

  return (
    <header
      className={`sticky top-0 w-full z-50 h-[56px] transition-all duration-200 ${
        scrolled
          ? "bg-[#FFF8F2]/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-b border-[#EFE1D2]"
          : "bg-[#FFF8F2] border-b border-[#E5E7EB]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href={prefix || "/"} className="flex items-center gap-2.5 group" aria-label="WeLovePDF home">
          <div className="w-[28px] h-[28px] rounded bg-[#D97706] flex items-center justify-center text-white font-heading font-black text-[15px] shadow-sm group-hover:bg-[#B45309] transition-colors">
            W
          </div>
          <span className="font-heading font-black text-[17px] tracking-tight text-slate-800 leading-tight">
            WeLovePDF
          </span>
        </a>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const active = isActive(link.href);
            return (
              <a
                key={idx}
                href={link.href}
                className={`relative hidden sm:inline-flex items-center px-3 py-1.5 rounded text-[13px] font-heading font-semibold transition-colors ${
                  active
                    ? "text-[#D97706]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-[#FFF5EB]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D97706] rounded-full" />
                )}
              </a>
            );
          })}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            type="button"
            className="ml-2 px-3 py-1.5 border border-[#E5E7EB] rounded text-[12px] font-heading font-bold text-slate-500 hover:border-[#D97706] hover:text-[#D97706] transition-colors bg-white"
            aria-label="Switch language"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
        </nav>
      </div>
    </header>
  );
}
