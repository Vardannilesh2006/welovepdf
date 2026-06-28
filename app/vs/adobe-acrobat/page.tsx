import React from "react";
import { Metadata } from "next";
import { Check, X, Shield, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "WeLovePDF vs Adobe Acrobat — The Best Free Alternative | WeLovePDF",
  description: "An honest comparison of WeLovePDF and Adobe Acrobat. Learn how to edit, sign, and compress your PDFs without downloading heavy desktop software.",
  alternates: {
    canonical: "https://welovepdf.best/vs/adobe-acrobat",
  }
};

export default function AdobeComparison() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "WeLovePDF",
    "description": "Browser-first local PDF utilities platform designed as a lightweight alternative to Adobe Acrobat desktop software.",
    "brand": {
      "@type": "Brand",
      "name": "WeLovePDF"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.9",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Nilesh Verma"
      }
    }
  };

  const tableData = [
    { feature: "Licensing Cost", welove: "100% Free Core Tools", adobe: "Expensive Acrobat Pro Subscriptions" },
    { feature: "System Footprint", welove: "Zero Install (Web-based)", adobe: "Heavy desktop app downloads" },
    { feature: "Private client workspace", welove: "Yes (Local Sandbox)", adobe: "Requires Adobe Cloud uploads" },
    { feature: "Multi-device Access", welove: "Runs anywhere (Mobile/Web)", adobe: "License caps on active logins" },
    { feature: "Interface Simplicity", welove: "Minimalist, instant controls", adobe: "Complex, cluttered menus" }
  ];

  return (
    <div className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-200">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />

      <div className="max-w-4xl mx-auto px-24 py-48">
        <h1 className="font-heading font-extrabold text-[36px] md:text-[48px] leading-tight mb-16">
          WeLovePDF vs Adobe Acrobat: A Lightweight Alternative
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed mb-32">
          Adobe Acrobat is the industry pioneer, but its pricing model and heavy desktop installer can be a burden. If you want to merge pages, sign documents, or compress PDF sizes without system lag or subscription plans, WeLovePDF is your best free web alternative.
        </p>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-48">
          <div className="p-24 border border-brand-blue/20 bg-brand-blue/5 rounded-modal">
            <h3 className="font-heading font-bold text-lg mb-12 text-brand-blue flex items-center gap-8">
              <Zap className="w-5 h-5" /> WeLovePDF (Lightweight Web)
            </h3>
            <ul className="flex flex-col gap-8 text-[14px]">
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Zero download required — runs in browser</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Free signature, page crop, and watermarks</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Private client-side encryption sandbox</li>
            </ul>
          </div>

          <div className="p-24 border border-border-light dark:border-border-dark bg-bg-light rounded-modal opacity-80">
            <h3 className="font-heading font-bold text-lg mb-12 text-text-primaryLight flex items-center gap-8">
              Adobe Acrobat (Heavy Desktop)
            </h3>
            <ul className="flex flex-col gap-8 text-[14px]">
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Large desktop disk space requirements</li>
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Blocked under Adobe CC monthly paywalls</li>
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Prompts automatic Cloud backup uploads</li>
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <h2 className="font-heading font-bold text-2xl mb-16">Feature Comparison Table</h2>
        <div className="overflow-x-auto mb-48 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-border-light bg-bg-light dark:bg-bg-dark font-semibold">
                <th className="p-16">Feature</th>
                <th className="p-16 text-brand-blue">WeLovePDF</th>
                <th className="p-16">Adobe Acrobat</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-border-light/60 dark:border-border-dark/60">
                  <td className="p-16 font-medium">{row.feature}</td>
                  <td className="p-16 text-brand-blue font-semibold">{row.welove}</td>
                  <td className="p-16">{row.adobe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Analysis */}
        <h2 className="font-heading font-bold text-2xl mb-16">Why WeLovePDF is a Lightweight Alternative</h2>
        <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-24">
          For daily tasks like rotating a PDF scan, splitting a chapter, or drawing a quick signature on an agreement, you don't need to load complex desktop packages or purchase enterprise Acrobat licenses. WeLovePDF replaces these bloated systems with streamlined web utilities that launch instantly in under 1.5 seconds.
        </p>

        <h3 className="font-heading font-bold text-xl mb-12">Universal Device Access</h3>
        <p className="text-[14px] text-text-secondaryLight leading-relaxed">
          Whether you are working from a Linux machine, Chromebook, Windows tablet, or Android phone, you can access all 60+ tools instantly via our WebAssembly client workspace with zero installation lag.
        </p>
      </div>
    </div>
  );
}
