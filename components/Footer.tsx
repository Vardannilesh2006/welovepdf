import React from "react";
import { Github, Twitter, Linkedin, Instagram, Youtube, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  lang: "en" | "hi";
}

export default function Footer({ lang }: FooterProps) {
  const columns = [
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
        { label: lang === "en" ? "Security Policies" : "सुरक्षा नीतियां", href: "/security" },
        { label: lang === "en" ? "Privacy Policy" : "गोपनीयता नीति", href: "/privacy-policy" },
        { label: lang === "en" ? "Terms & Conditions" : "नियम और शर्तें", href: "/terms-and-conditions" },
        { label: lang === "en" ? "Cookies Statement" : "कुकीज़ विवरण", href: "/cookies" },
      ]
    },
    {
      title: lang === "en" ? "Company" : "कंपनी",
      links: [
        { label: lang === "en" ? "About Us" : "हमारे बारे में", href: "/about-us" },
        { label: lang === "en" ? "Support Desk" : "सहायता डेस्क", href: "/contact" },
        { label: lang === "en" ? "Guides & Blog" : "गाइड और ब्लॉग", href: "/blog" },
      ]
    },
    {
      title: lang === "en" ? "Connect" : "संपर्क करें",
      links: [
        { label: "Github", href: "https://github.com/Vardannilesh2006", external: true },
        { label: "Twitter", href: "https://x.com", external: true },
        { label: "Linkedin", href: "https://linkedin.com", external: true },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#0A0F1E] text-text-primaryDark border-t border-border-dark transition-colors duration-200">
      
      {/* Trust Strip */}
      <div className="w-full border-b border-border-dark py-16 bg-[#0E1528]">
        <div className="max-w-7xl mx-auto px-24 flex flex-col sm:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-8 text-[13px] text-brand-blue font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === "en" ? "Enterprise Grade Encryption Sandbox" : "एंटरप्राइज ग्रेड एन्क्रिप्शन सैंडबॉक्स"}</span>
          </div>
          <div className="text-[13px] text-text-secondaryDark font-medium tracking-wide">
            {lang === "en" ? "No ads. No uploads. No signup." : "कोई विज्ञापन नहीं। कोई अपलोड नहीं। कोई साइनअप नहीं।"}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-24 py-48">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-32 mb-40">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-16">
              <h3 className="font-heading font-semibold text-[13px] text-text-primaryDark uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-12">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[13px] text-text-secondaryDark hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Panel */}
        <div className="pt-24 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p className="text-[13px] text-text-secondaryDark">
              © 2026 WeLovePDF. All rights reserved.
            </p>
            <p className="text-[12px] text-text-secondaryDark/80 flex items-center justify-center md:justify-start gap-4">
              Made with <Heart className="w-3.5 h-3.5 text-brand-blue fill-brand-blue" /> in Bettiah, Bihar, India 🇮🇳
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-16">
            <a href="https://github.com/Vardannilesh2006" target="_blank" rel="noopener noreferrer" className="text-text-secondaryDark hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryDark hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryDark hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryDark hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-text-secondaryDark hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
