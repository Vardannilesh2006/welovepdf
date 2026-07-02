"use client";

import React from "react";
import { useLang } from "../../components/LangContext";
import { Shield, Lock, EyeOff, FileCheck } from "lucide-react";

export default function Security() {
  const { lang } = useLang();

  const title = lang === "en" ? "Security and Privacy Standards" : "सुरक्षा और गोपनीयता मानक";
  
  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <title>{lang === "en" ? "Security and Privacy Standards | WeLovePDF" : "सुरक्षा और गोपनीयता मानक | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "Learn how WeLovePDF maintains document privacy via local client-side memory processing and sandboxing." : "जानें कि WeLovePDF स्थानीय क्लाइंट-साइड मेमोरी प्रोसेसिंग के माध्यम से दस्तावेज़ गोपनीयता कैसे बनाए रखता है।"} />
      <link rel="canonical" href="https://welovepdf.best/security" />
      <link rel="alternate" hrefLang="en" href="https://welovepdf.best/security" />
      <link rel="alternate" hrefLang="hi" href="https://welovepdf.best/hi/security" />
      <link rel="alternate" hrefLang="x-default" href="https://welovepdf.best/security" />
      <div className="flex flex-col items-center text-center gap-12 mb-48">
        <Shield className="w-12 h-12 text-brand-blue" />
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed max-w-[620px]">
          WeLovePDF is built on a browser-first architecture. Your document privacy is not just a promise; it's a structural guarantee.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-48">
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <EyeOff className="w-8 h-8 text-brand-blue" />
          <h3 className="font-bold text-[16px]">Zero Upload Processing</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            Core operations like Merging, Splitting, and Compressing run in-memory inside your local browser sandbox. No file bytes are sent to any remote servers.
          </p>
        </div>
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Lock className="w-8 h-8 text-brand-amber" />
          <h3 className="font-bold text-[16px]">Secure SSL Pipelines</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            For advanced server tools (like OCR scanning and AI summaries), files are transmitted over TLS/SSL endpoints, processed in RAM, and immediately deleted.
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none text-[14px] text-text-secondaryLight leading-relaxed flex flex-col gap-16">
        <h2 className="text-xl font-bold text-text-primaryLight dark:text-text-primaryDark">GDPR Compliance</h2>
        <p>
          Because we do not store, catalog, or index user documents, our processing pipeline complies with strict European Union GDPR protection acts. You retain total custody of your files at all times.
        </p>
      </div>
    </div>
  );
}
