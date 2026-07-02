"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function AboutUs() {
  const { lang } = useLang();

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nilesh Verma",
    "jobTitle": "Founder & Lead Developer of WeLovePDF",
    "url": "https://welovepdf.best/about-us",
    "sameAs": [
      "https://github.com/Vardannilesh2006"
    ],
    "description": "Nilesh Verma is a full-stack software developer specialized in browser-first, privacy-focused client-side application architecture.",
    "knowsAbout": ["Software Development", "PDF Processing", "WebAssembly", "JavaScript", "Information Security"]
  };

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <title>{lang === "en" ? "About Us | WeLovePDF" : "हमारे बारे में | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "WeLovePDF is a browser-first document processing platform created in India to build secure client-side tools." : "WeLovePDF भारत में बनाया गया एक सुरक्षित ब्राउज़र-प्रथम दस्तावेज़ प्रसंस्करण प्लेटफ़ॉर्म है।"} />
      <link rel="canonical" href="https://welovepdf.best/about-us" />
      <link rel="alternate" hrefLang="en" href="https://welovepdf.best/about-us" />
      <link rel="alternate" hrefLang="hi" href="https://welovepdf.best/hi/about-us" />
      <link rel="alternate" hrefLang="x-default" href="https://welovepdf.best/about-us" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "About WeLovePDF" : "WeLovePDF के बारे में"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-32">
        WeLovePDF is a browser-first document processing platform. Created in Bettiah, Bihar, India 🇮🇳, our mission is to build the world's most secure and accessible PDF utilities that run entirely locally in the client tab.
      </p>

      {/* Founder Biography E-E-A-T Section */}
      <div className="mt-32 p-24 border border-[#E5E7EB] rounded-card bg-white dark:bg-surface-dark flex flex-col sm:flex-row gap-20 items-start not-prose">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D97706] text-white flex items-center justify-center font-heading font-black text-2xl shadow-sm">
          NV
        </div>
        <div>
          <h2 className="text-lg font-heading font-bold text-slate-900 leading-none mb-8">Nilesh Verma</h2>
          <p className="text-[12px] font-heading font-semibold text-[#D97706] uppercase tracking-wider mb-8">Founder & Lead Developer</p>
          <p className="text-[13px] text-slate-500 leading-relaxed mb-12">
            Nilesh Verma is a professional software developer based in Bettiah, Bihar, India. Focused on creating privacy-first browser applications, he designed WeLovePDF to offer a safe, free, and local-only alternative to remote server upload PDF processing.
          </p>
          <a href="https://github.com/Vardannilesh2006" target="_blank" rel="noopener noreferrer" className="text-[13px] font-heading font-bold text-slate-500 hover:text-[#D97706] transition-colors">
            View GitHub Profile →
          </a>
        </div>
      </div>
    </div>
  );
}
