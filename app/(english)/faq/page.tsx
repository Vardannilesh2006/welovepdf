import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | WeLovePDF",
  description: "Get answers to common questions about WeLovePDF privacy, offline tools, file security, encryption, and zero server upload processing.",
  alternates: {
    canonical: "https://www.welovepdf.best/faq",
    languages: {
      en: "https://www.welovepdf.best/faq",
      hi: "https://www.welovepdf.best/hi/faq",
      "x-default": "https://www.welovepdf.best/faq",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/faq",
    title: "Frequently Asked Questions — WeLovePDF",
    description: "Get answers to common questions about WeLovePDF privacy, offline tools, file security, encryption, and zero server upload processing.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF FAQ" }],
  }
};

const faqs = [
  {
    q: "Are my uploaded PDF files and confidential documents safe?",
    a: "Yes. Unlike traditional cloud converters, WeLovePDF operates on a browser-first zero-upload architecture. Core tools (Merge, Split, Compress, Rotate, Protect, etc.) run in-memory inside your local web browser sandbox using WebAssembly. Your files never touch external servers or third-party cloud storage."
  },
  {
    q: "Is WeLovePDF really 100% free with no limits?",
    a: "Yes, completely free. There are no subscription tiers, no page limits, no daily file count caps, and no forced account registrations or credit cards required."
  },
  {
    q: "Does WeLovePDF work offline without an internet connection?",
    a: "Yes. Once the web application is loaded in your browser tab, all client-side WebAssembly tools function entirely offline. You can disconnect your internet or enable airplane mode and continue processing files."
  },
  {
    q: "What is the maximum file size supported?",
    a: "We support documents up to 200MB per processing session for browser-side utilities. Because files are processed directly in your device RAM, performance depends on your local device memory."
  },
  {
    q: "How does the Protect PDF encryption work?",
    a: "Protect PDF locks your document using standard AES-128 / RC4 encryption supported by PDF-lib. The password is applied locally in your browser memory and is never transmitted over the internet."
  },
  {
    q: "How does the Redact PDF tool work?",
    a: "The Redact PDF tool applies a visual black overlay over specified rectangular areas. For legal proceedings, court submissions, or classified information where underlying vector streams must be permanently stripped, use certified professional redaction software."
  },
  {
    q: "How does WeLovePDF differ from iLovePDF or Smallpdf?",
    a: "Traditional converters upload your files to remote cloud servers for processing, which introduces data exposure risks for sensitive contracts and medical records. WeLovePDF processes files client-side in your own browser, guaranteeing absolute data custody."
  },
  {
    q: "Which devices and web browsers are supported?",
    a: "WeLovePDF is fully compatible with modern browsers supporting WebAssembly: Google Chrome, Apple Safari (desktop & iOS), Mozilla Firefox, Microsoft Edge, and mobile browsers on Android and iPhone."
  },
  {
    q: "Do you train AI models or log content from my files?",
    a: "No. We never log, store, index, sell, or train AI models on user document content. Temporary memory buffers are automatically wiped when you close or refresh your browser tab."
  },
  {
    q: "Who develops and maintains WeLovePDF?",
    a: "WeLovePDF was created and is actively maintained by Nilesh Verma, an independent full-stack developer based in Bettiah, Bihar, India, dedicated to building private browser-first utilities."
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[15px] text-text-secondaryLight dark:text-text-secondaryDark max-w-2xl mx-auto">
          Everything you need to know about our browser-first architecture, privacy guarantees, and tool capabilities.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark shadow-sm">
            <h3 className="font-bold text-[16px] mb-2 text-text-primaryLight dark:text-text-primaryDark">{faq.q}</h3>
            <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

