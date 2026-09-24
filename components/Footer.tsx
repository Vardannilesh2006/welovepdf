import React from "react";
import { Github, Instagram, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  lang: "en" | "hi";
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  noPrefix?: boolean;
}

export default function Footer({ lang }: FooterProps) {
  const prefix = lang === "hi" ? "/hi" : "";
  const toolClusters: { category: string; links: FooterLink[] }[] = [
    {
      category: lang === "en" ? "Organize PDF" : "पीडीएफ व्यवस्थित करें",
      links: [
        { label: lang === "en" ? "Merge PDF" : "पीडीएफ मर्ज करें", href: "/merge-pdf" },
        { label: lang === "en" ? "Split PDF" : "पीडीएफ स्प्लिट करें", href: "/split-pdf" },
        { label: lang === "en" ? "Delete Pages" : "पेज डिलीट करें", href: "/delete-pages" },
        { label: lang === "en" ? "Extract Pages" : "पेज निकालें", href: "/extract-pages" },
        { label: lang === "en" ? "Reorder Pages" : "पेज क्रम बदलें", href: "/reorder-pages" },
        { label: lang === "en" ? "Rotate PDF" : "पीडीएफ रोटेट करें", href: "/rotate-pdf" },
        { label: lang === "en" ? "Crop PDF" : "पीडीएफ क्रॉप करें", href: "/crop-pdf" },
      ]
    },
    {
      category: lang === "en" ? "Convert from PDF" : "पीडीएफ से बदलें",
      links: [
        { label: lang === "en" ? "PDF to Word" : "पीडीएफ से वर्ड", href: "/pdf-to-word" },
        { label: lang === "en" ? "PDF to JPG" : "पीडीएफ से JPG", href: "/pdf-to-jpg" },
        { label: lang === "en" ? "PDF to PNG" : "पीडीएफ से PNG", href: "/pdf-to-png" },
        { label: lang === "en" ? "PDF to Excel" : "पीडीएफ से एक्सेल", href: "/pdf-to-excel" },
        { label: lang === "en" ? "PDF to PowerPoint" : "पीडीएफ से PPT", href: "/pdf-to-powerpoint" },
        { label: lang === "en" ? "PDF to Text" : "पीडीएफ से टेक्स्ट", href: "/pdf-to-text" },
        { label: lang === "en" ? "PDF to Markdown" : "पीडीएफ से मार्कडाउन", href: "/pdf-to-markdown" },
      ]
    },
    {
      category: lang === "en" ? "Convert to PDF" : "पीडीएफ बनाएं",
      links: [
        { label: lang === "en" ? "Word to PDF" : "वर्ड से पीडीएफ", href: "/word-to-pdf" },
        { label: lang === "en" ? "JPG to PDF" : "JPG से पीडीएफ", href: "/jpg-to-pdf" },
        { label: lang === "en" ? "PNG to PDF" : "PNG से पीडीएफ", href: "/png-to-pdf" },
        { label: lang === "en" ? "Image to PDF" : "फोटो से पीडीएफ", href: "/image-to-pdf" },
        { label: lang === "en" ? "Excel to PDF" : "एक्सेल से पीडीएफ", href: "/excel-to-pdf" },
        { label: lang === "en" ? "PowerPoint to PDF" : "PPT से पीडीएफ", href: "/powerpoint-to-pdf" },
        { label: lang === "en" ? "HTML to PDF" : "HTML से पीडीएफ", href: "/html-to-pdf" },
      ]
    },
    {
      category: lang === "en" ? "Optimize & Reduce" : "कंप्रेस व साइज कम करें",
      links: [
        { label: lang === "en" ? "Compress PDF" : "पीडीएफ कंप्रेस करें", href: "/compress-pdf" },
        { label: lang === "en" ? "Compress to 100KB (UPSC)" : "100KB कंप्रेस (UPSC)", href: "/compress-pdf-to-100kb" },
        { label: lang === "en" ? "Compress to 200KB (SSC)" : "200KB कंप्रेस (SSC)", href: "/compress-pdf-to-200kb" },
        { label: lang === "en" ? "Compress to 50KB" : "50KB कंप्रेस (साइन/फोटो)", href: "/compress-pdf-to-50kb" },
        { label: lang === "en" ? "Govt Exam PDF Compressor" : "सरकारी परीक्षा पीडीएफ", href: "/compress-pdf-for-ssc-upsc" },
        { label: lang === "en" ? "Grayscale PDF" : "ग्रेस्केल पीडीएफ", href: "/grayscale-pdf" },
        { label: lang === "en" ? "Repair Damaged PDF" : "पीडीएफ रिपेयर करें", href: "/repair-pdf" },
      ]
    },
    {
      category: lang === "en" ? "Security & Edit" : "सुरक्षा व संपादन",
      links: [
        { label: lang === "en" ? "Protect PDF (Password)" : "पासवर्ड लगाएं", href: "/protect-pdf" },
        { label: lang === "en" ? "Unlock PDF" : "पासवर्ड हटाएं", href: "/unlock-pdf" },
        { label: lang === "en" ? "Sign PDF Online" : "पीडीएफ साइन करें", href: "/sign-pdf" },
        { label: lang === "en" ? "Watermark PDF" : "वॉटरमार्क जोड़ें", href: "/watermark-pdf" },
        { label: lang === "en" ? "Redact PDF (Blackout)" : "टेक्स्ट छुपाएं (Redact)", href: "/redact-pdf" },
        { label: lang === "en" ? "Page Numbers" : "पेज नंबर डालें", href: "/page-numbers" },
        { label: lang === "en" ? "Header & Footer" : "हेडर और फुटर", href: "/header-footer" },
      ]
    },
    {
      category: lang === "en" ? "AI & Utilities" : "AI व अन्य टूल्स",
      links: [
        { label: lang === "en" ? "PDF Reader Online" : "पीडीएफ रीडर", href: "/pdf-reader" },
        { label: lang === "en" ? "OCR PDF (Extract Text)" : "OCR टेक्स्ट निकालें", href: "/ocr-pdf" },
        { label: lang === "en" ? "Ask PDF with AI" : "AI से पूछें (Ask PDF)", href: "/ask-pdf" },
        { label: lang === "en" ? "Summarize PDF" : "AI सारांश (Summary)", href: "/summarize-pdf" },
        { label: lang === "en" ? "Translate PDF" : "पीडीएफ अनुवाद", href: "/translate-pdf" },
        { label: lang === "en" ? "Search in PDF" : "पीडीएफ में खोजें", href: "/search-in-pdf" },
        { label: lang === "en" ? "Bates Numbering" : "बेट्स नंबरिंग (कोर्ट)", href: "/bates-numbering" },
      ]
    }
  ];

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: lang === "en" ? "Company" : "कंपनी",
      links: [
        { label: lang === "en" ? "About Us" : "हमारे बारे में", href: "/about-us" },
        { label: lang === "en" ? "Contact Us" : "संपर्क करें", href: "/contact" },
        { label: lang === "en" ? "Blog & Guides" : "ब्लॉग व गाइड्स", href: "/blog" },
        { label: lang === "en" ? "2026 Security Report" : "2026 सुरक्षा रिपोर्ट", href: "/research/pdf-security-statistics-2026", noPrefix: true },
      ]
    },
    {
      title: lang === "en" ? "Compare" : "तुलना",
      links: [
        { label: "vs Adobe Acrobat", href: "/vs/adobe-acrobat", noPrefix: true },
        { label: "vs iLovePDF", href: "/vs/ilovepdf", noPrefix: true },
        { label: "vs Smallpdf", href: "/vs/smallpdf", noPrefix: true },
      ]
    },
    {
      title: lang === "en" ? "Legal & Trust" : "कानूनी व सुरक्षा",
      links: [
        { label: lang === "en" ? "Security Architecture" : "सुरक्षा वास्तुकला", href: "/security" },
        { label: lang === "en" ? "Privacy Policy" : "गोपनीयता नीति", href: "/privacy-policy" },
        { label: lang === "en" ? "Terms & Conditions" : "नियम व शर्तें", href: "/terms-and-conditions" },
        { label: lang === "en" ? "Cookie Policy" : "कुकी नीति", href: "/cookies" },
      ]
    },
    {
      title: lang === "en" ? "Connect" : "जुड़ें",
      links: [
        { label: "GitHub (@Vardannilesh2006)", href: "https://github.com/Vardannilesh2006", external: true },
        { label: "Instagram (@welovepdf.best)", href: "https://www.instagram.com/welovepdf.best/", external: true },
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
            <span>{lang === "en" ? "Client-Side In-Browser Memory Sandbox" : "क्लाइंट-साइड इन-ब्राउज़र मेमोरी सैंडबॉक्स"}</span>
          </div>
          <div className="text-[12px] text-text-secondaryLight font-medium">
            {lang === "en" ? "No uploads. No signup required." : "कोई अपलोड नहीं। कोई साइनअप नहीं।"}
          </div>
        </div>
      </div>

      {/* Comprehensive PDF Tools Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-2">
          <h2 className="font-heading font-black text-[13px] text-slate-800 uppercase tracking-wider">
            {lang === "en" ? "PDF Tools Directory" : "पीडीएफ टूल्स निर्देशिका"}
          </h2>
          <span className="text-[11px] text-text-secondaryLight font-medium">
            {lang === "en" ? "68 In-Browser Tools • Zero Uploads" : "68 इन-ब्राउज़र टूल्स • कोई अपलोड नहीं"}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {toolClusters.map((cluster, cIdx) => (
            <div key={cIdx} className="flex flex-col gap-2">
              <h3 className="font-heading font-bold text-[11px] text-[#D97706] uppercase tracking-wider">
                {cluster.category}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {cluster.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={`${prefix}${link.href}`}
                      className="text-[11.5px] text-text-secondaryLight hover:text-[#D97706] transition-colors line-clamp-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-[#E5E7EB]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-2.5">
              <h3 className="font-heading font-bold text-[11px] text-slate-700 uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.external || link.noPrefix ? link.href : `${prefix}${link.href}`}
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
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Vardannilesh2006"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-text-secondaryLight hover:text-slate-900 transition-colors rounded-lg hover:bg-[#FFF5EB]"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/welovepdf.best/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium text-slate-700 hover:text-[#E1306C] bg-white border border-[#E5E7EB] hover:border-[#E1306C]/40 rounded-full shadow-2xs hover:shadow-xs transition-all duration-150 group"
              aria-label="Follow WeLovePDF on Instagram @welovepdf.best"
            >
              <Instagram className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
              <span className="font-heading font-semibold text-[11.5px]">@welovepdf.best</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
