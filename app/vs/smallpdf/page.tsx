import React from "react";
import { Metadata } from "next";
import { Check, X, Shield, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "WeLovePDF vs Smallpdf — The Best Free Alternative | WeLovePDF",
  description: "Compare WeLovePDF and Smallpdf. Discover how you can bypass Smallpdf's daily caps, page restrictions, and paywalls with our free local tools.",
  alternates: {
    canonical: "https://welovepdf.best/vs/smallpdf",
  }
};

export default function SmallpdfComparison() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "WeLovePDF",
    "description": "Browser-first local PDF utilities platform designed as a free alternative to Smallpdf's paywalled converters.",
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
    { feature: "Daily Operation Limit", welove: "Unlimited Free Tasks", small: "2 tasks per day on Free tier" },
    { feature: "Registration / Sign-up", welove: "No Account Needed", small: "Aggressive signup screens" },
    { feature: "Workspace Sandbox Safety", welove: "100% Private (Local)", small: "Server uploads required" },
    { feature: "OCR scanned text search", welove: "Included Free", small: "Pro plan paywall" },
    { feature: "Processing Speed", welove: "Instant Client Processing", small: "Queue-based delay on Free" },
    { feature: "Pro Plan Pricing", welove: "Budget Friendly (₹499/mo)", small: "Expensive Premium Plans" }
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
          WeLovePDF vs Smallpdf: Bypassing the Free-Tier Paywall
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed mb-32">
          Smallpdf is known for its clean interface, but its heavy limitations on free users make it frustrating. If you've been blocked by the "You've reached your daily limit of free tasks" popups on Smallpdf, WeLovePDF is your best alternative.
        </p>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-48">
          <div className="p-24 border border-brand-blue/20 bg-brand-blue/5 rounded-modal">
            <h3 className="font-heading font-bold text-lg mb-12 text-brand-blue flex items-center gap-8">
              <Zap className="w-5 h-5" /> WeLovePDF (Unlimited Free)
            </h3>
            <ul className="flex flex-col gap-8 text-[14px]">
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> No daily task caps or count checks</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> No account creations required</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Edit and crop layouts dynamically</li>
            </ul>
          </div>

          <div className="p-24 border border-border-light dark:border-border-dark bg-bg-light rounded-modal opacity-80">
            <h3 className="font-heading font-bold text-lg mb-12 text-text-primaryLight flex items-center gap-8">
              Smallpdf (Limited Free)
            </h3>
            <ul className="flex flex-col gap-8 text-[14px]">
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Blocked after 2 daily operations</li>
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Constant upsell banners</li>
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Documents sent to remote servers</li>
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
                <th className="p-16">Smallpdf</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-border-light/60 dark:border-border-dark/60">
                  <td className="p-16 font-medium">{row.feature}</td>
                  <td className="p-16 text-brand-blue font-semibold">{row.welove}</td>
                  <td className="p-16">{row.small}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Analysis */}
        <h2 className="font-heading font-bold text-2xl mb-16">Bypass Smallpdf Limitations Securely</h2>
        <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-24">
          Why pay massive monthly subscriptions just to split or compress a couple of document files? Smallpdf holds features like high-fidelity compression, scanned text search, and digital signatures behind its premium paywall. WeLovePDF unlocks these core tools for free by moving the code from the server directly to your browser sandbox.
        </p>

        <h3 className="font-heading font-bold text-xl mb-12">GDPR & India Data Sovereignty</h3>
        <p className="text-[14px] text-text-secondaryLight leading-relaxed">
          Because WeLovePDF runs fully inside client-side JS, no server acts as a storage point for your documents. This complies perfectly with strict corporate data protection guidelines and local Indian data privacy mandates.
        </p>
      </div>
    </div>
  );
}
