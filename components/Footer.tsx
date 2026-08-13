import React from "react";
import { Github, Twitter, Linkedin, Instagram, Youtube, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  lang: "en" | "hi";
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export default function Footer({ lang }: FooterProps) {
  const prefix = lang === "hi" ? "/hi" : "";
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: lang === "en" ? "Product" : "उत्पाद",
      links: [
        { label: lang === "en" ? "Merge PDF" : "पीडीएफ मर्ज करें", href: "/merge-pdf" },
        { label: lang === "en" ? "Compress PDF" : "पीडीएफ कंप्रेस करें", href: "/compress-pdf" },
        { label: lang === "en" ? "Split PDF" : "पीडीएफ विभाजित करें", href: "/split-pdf" },
        { label: lang === "en" ? "PDF to Word" : "पीडीएफ से वर्ड", href: "/pdf-to-word" },
      ]
    },
    {
      title: lang === "en" ? "Legal" : "कानूनी",
      links: [
        { label: lang === "en" ? "Security" : "सुरक्षा", href: "/security" },
        { label: lang === "en" ? "Privacy Policy" : "गोपनीयता नीति", href: "/privacy-policy" },
        { label: lang === "en" ? "Terms & Conditions" : "नियम और शर्तें", href: "/terms-and-conditions" },
        { label: lang === "en" ? "Cookies" : "कुकीज़", href: "/cookies" },
      ]
    },
    {
      title: lang === "en" ? "Company" : "कंपनी",
      links: [
        { label: lang === "en" ? "About Us" : "हमारे बारे में", href: "/about-us" },
        { label: lang === "en" ? "Contact" : "संपर्क करें", href: "/contact" },
        { label: lang === "en" ? "Blog" : "ब्लॉग", href: "/blog" },
      ]
    },
    {
      title: lang === "en" ? "Connect" : "जुड़ें",
      links: [
        { label: "GitHub", href: "https://github.com/Vardannilesh2006", external: true },
        { label: "Twitter / X", href: "https://x.com", external: true },
        { label: "LinkedIn", href: "https://linkedin.com", external: true },
      ]
    },
    {
      title: lang === "en" ? "Compare" : "तुलना",
      links: [
        { label: "vs Adobe Acrobat", href: "/vs/adobe-acrobat" },
        { label: "vs iLovePDF", href: "/vs/ilovepdf" },
        { label: "vs Smallpdf", href: "/vs/smallpdf" },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#FFF8F2] text-text-primaryLight border-t border-[#E5E7EB] transition-colors duration-200">

      {/* Trust Strip */}
      <div className="w-full border-b border-[#E5E7EB] py-3 bg-[#FFF5EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-[12px] text-[#D97706] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Enterprise Grade Encryption Sandbox" : "एंटरप्राइज ग्रेड एन्क्रिप्शन सैंडबॉक्स"}</span>
          </div>
          <div className="text-[12px] text-text-secondaryLight font-medium">
            {lang === "en" ? "No ads. No uploads. No signup." : "कोई विज्ञापन नहीं। कोई अपलोड नहीं। कोई साइनअप नहीं।"}
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-2.5">
              <h3 className="font-heading font-bold text-[11px] text-[#D97706] uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.external ? link.href : `${prefix}${link.href}`}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[12px] text-text-secondaryLight hover:text-[#D97706] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-[12px] text-text-secondaryLight">
              © 2026 WeLovePDF. All rights reserved.
            </p>
            <p className="text-[11px] text-text-secondaryLight/70 flex items-center justify-center md:justify-start gap-1.5">
              Made with <Heart className="w-3 h-3 text-[#D97706] fill-[#D97706]" /> in Bettiah, Bihar, India 🇮🇳
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/Vardannilesh2006" target="_blank" rel="noopener noreferrer" className="text-text-secondaryLight hover:text-[#D97706] transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryLight hover:text-[#D97706] transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryLight hover:text-[#D97706] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/welovepdf.official/" target="_blank" rel="noopener noreferrer" className="text-text-secondaryLight hover:text-[#D97706] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryLight hover:text-[#D97706] transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
