import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | WeLovePDF",
  description: "Find answers to popular questions about WeLovePDF offline capability, browser processing, and document safety.",
  alternates: {
    canonical: "https://www.welovepdf.best/faq",
    languages: {
      en: "https://www.welovepdf.best/faq",
      hi: "https://www.welovepdf.best/hi/faq",
      "x-default": "https://www.welovepdf.best/faq",
    }
  }
};

const faqs = [
  {
    q: "Are my uploaded files safe?",
    a: "Yes, because WeLovePDF runs client-side in your browser sandbox, your documents are never uploaded to a server for core tools. They stay 100% on your device."
  },
  {
    q: "Does WeLovePDF work offline?",
    a: "Yes. Once the page is loaded, core browser-first tools operate fully offline without any active internet connection."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-3xl font-extrabold mb-32">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col gap-16">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
            <h3 className="font-bold text-[16px] mb-8">{faq.q}</h3>
            <p className="text-[14px] text-text-secondaryLight leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
