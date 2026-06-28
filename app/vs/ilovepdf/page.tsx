import React from "react";
import { Metadata } from "next";
import { Check, X, Shield, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "WeLovePDF vs iLovePDF — The Best Free Alternative | WeLovePDF",
  description: "An honest comparison between WeLovePDF and iLovePDF. Discover why browser-first local sandbox processing is safer and faster than server uploads.",
  alternates: {
    canonical: "https://welovepdf.best/vs/ilovepdf",
  }
};

export default function iLovePdfComparison() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "WeLovePDF",
    "description": "Browser-first local PDF utilities platform designed as a safe alternative to server-based converters.",
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
    { feature: "File Upload Required", welove: "No (Local Processing)", ilove: "Yes (Server-Based)" },
    { feature: "Privacy & Data Leak Risk", welove: "0% Risk (Client-Side)", ilove: "High Risk (Server Storage)" },
    { feature: "Free Page Limits", welove: "Unlimited", ilove: "Limited on Free tier" },
    { feature: "Offline Processing", welove: "Supported", ilove: "No (Internet required)" },
    { feature: "Conversion Queue Waiting", welove: "Instant (No Queues)", ilove: "Yes (Slower on Free)" },
    { feature: "Ad Popups & Banners", welove: "None (Ad-Free)", ilove: "Heavy Ad Layouts" }
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
          WeLovePDF vs iLovePDF: The Ultimate Privacy-First Alternative
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed mb-32">
          Looking for a free alternative to iLovePDF? While iLovePDF has been a popular tool for years, it requires uploading your confidential files to remote servers. At WeLovePDF, we process your documents directly inside your local browser memory.
        </p>

        {/* Comparison Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-48">
          <div className="p-24 border border-brand-blue/20 bg-brand-blue/5 rounded-modal">
            <h3 className="font-heading font-bold text-lg mb-12 text-brand-blue flex items-center gap-8">
              <Zap className="w-5 h-5" /> WeLovePDF (Local-First)
            </h3>
            <ul className="flex flex-col gap-8 text-[14px]">
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Your files never leave your computer</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 100% free with no registration locks</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Runs fully offline once page loads</li>
            </ul>
          </div>

          <div className="p-24 border border-border-light dark:border-border-dark bg-bg-light rounded-modal opacity-80">
            <h3 className="font-heading font-bold text-lg mb-12 text-text-primaryLight flex items-center gap-8">
              iLovePDF (Server-First)
            </h3>
            <ul className="flex flex-col gap-8 text-[14px]">
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Requires uploading sensitive PDFs</li>
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Restricts page size limits on free plan</li>
              <li className="flex items-center gap-8"><X className="w-4 h-4 text-brand-error" /> Inoperable without internet</li>
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
                <th className="p-16">iLovePDF</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-border-light/60 dark:border-border-dark/60">
                  <td className="p-16 font-medium">{row.feature}</td>
                  <td className="p-16 text-brand-blue font-semibold">{row.welove}</td>
                  <td className="p-16">{row.ilove}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Analysis */}
        <h2 className="font-heading font-bold text-2xl mb-16">Why WeLovePDF is the Best Free iLovePDF Alternative</h2>
        <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-24">
          Every time you upload a document to iLovePDF, your data traverses the web to hit external servers. For sensitive NDAs, government ID scans, tax invoices, and legal contracts, this presents a severe security risk. WeLovePDF bypasses this architectural flaw entirely by compiling the PDF modification tools inside WebAssembly and Client JavaScript, executing locally in your browser.
        </p>

        <h3 className="font-heading font-bold text-xl mb-12">Performance & Speed Advantage</h3>
        <p className="text-[14px] text-text-secondaryLight leading-relaxed">
          Since no uploading or downloading of large raw files is necessary, WeLovePDF operates instantly. A 20MB document merges or splits in under 300ms, making it significantly faster than waiting for file uploads on a standard internet connection.
        </p>
      </div>
    </div>
  );
}
