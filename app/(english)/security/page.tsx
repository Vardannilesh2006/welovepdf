import React from "react";
import { Metadata } from "next";
import { Shield, Lock, EyeOff, Cpu, CheckCircle2, ServerOff, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Document Privacy Standards | WeLovePDF",
  description: "Learn how WeLovePDF guarantees document privacy with zero-server client-side WebAssembly processing, GDPR compliance, and ephemeral RAM security.",
  alternates: {
    canonical: "https://www.welovepdf.best/security",
    languages: {
      en: "https://www.welovepdf.best/security",
      hi: "https://www.welovepdf.best/hi/security",
      "x-default": "https://www.welovepdf.best/security",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/security",
    title: "Security & Document Privacy Standards | WeLovePDF",
    description: "Learn how WeLovePDF guarantees document privacy with zero-server client-side WebAssembly processing, GDPR compliance, and ephemeral RAM security.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Security" }],
  },
};

const securityFaqs = [
  {
    question: "Do you store or view my uploaded PDF files?",
    answer: "No. For over 90% of our operations (merging, splitting, compressing, rotating, watermarking), files are parsed directly inside your device's browser memory using WebAssembly. No bytes are sent to any remote server or stored in any database."
  },
  {
    question: "How does client-side WebAssembly sandboxing work?",
    answer: "When you select a document on WeLovePDF, your web browser downloads compiled WebAssembly libraries (e.g., pdf-lib, pdfjs). Processing runs locally on your computer's CPU. When you close the browser tab, the memory is instantly freed."
  },
  {
    question: "What happens during server-assisted tasks like OCR or AI Summarization?",
    answer: "For advanced features requiring high-compute machine learning models, files are transmitted via 256-bit TLS/SSL encrypted streams to ephemeral compute workers. Files are processed entirely in volatile RAM and automatically deleted immediately upon task completion (TTL < 60 seconds)."
  },
  {
    question: "Is WeLovePDF compliant with GDPR and international data regulations?",
    answer: "Yes. Under GDPR Article 25 (Data Protection by Design) and Article 32 (Security of Processing), WeLovePDF ensures zero persistent data retention, zero file indexing, and zero third-party data broker sharing."
  },
  {
    question: "Can governmental, corporate, or financial documents be processed securely?",
    answer: "Yes. Because core manipulation occurs locally on your machine without cloud uploads, sensitive government IDs, tax filings, legal contracts, and financial statements remain strictly within your local machine boundary."
  }
];

export default function SecurityPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": securityFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-5xl mx-auto px-16 py-64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col items-center text-center gap-12 mb-48">
        <div className="p-16 bg-brand-blue/10 text-brand-blue rounded-full">
          <Shield className="w-12 h-12" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Security and Document Privacy Standards
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[700px]">
          WeLovePDF is engineered with a strict <strong>Zero-Knowledge Architecture</strong>. Your documents, sensitive financial records, and personal IDs never leave your device for standard document operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-48">
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Cpu className="w-8 h-8 text-brand-blue" />
          <h3 className="font-bold text-[18px]">Client-Side WebAssembly</h3>
          <p className="text-[14px] text-text-secondaryLight leading-relaxed">
            Operations like Merging, Splitting, Rotating, and Compressing run directly on your device CPU using high-performance WebAssembly. Zero file bytes are transmitted across the public internet.
          </p>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <ServerOff className="w-8 h-8 text-brand-amber" />
          <h3 className="font-bold text-[18px]">Zero-Server Retention</h3>
          <p className="text-[14px] text-text-secondaryLight leading-relaxed">
            We operate without persistent document storage databases. Your files are never cached, archived, or used for AI training models. When your session ends, all temporary artifacts vanish.
          </p>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Lock className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-[18px]">End-to-End Encryption</h3>
          <p className="text-[14px] text-text-secondaryLight leading-relaxed">
            For advanced server utilities (such as high-speed OCR or AI summarization), communication is secured with TLS 1.3 256-bit encryption. Files are processed in ephemeral RAM and purged in &lt; 60 seconds.
          </p>
        </div>
      </div>

      {/* Security Architecture Deep Dive */}
      <div className="border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark p-32 mb-48">
        <h2 className="text-2xl font-bold mb-16 text-text-primaryLight dark:text-text-primaryDark">
          How We Protect Your Confidential Documents
        </h2>
        <div className="space-y-16 text-[15px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
          <p>
            Unlike traditional cloud PDF converters that upload entire sensitive files to third-party data centers, WeLovePDF shifts processing workloads directly to your client browser environment. Whether you are resizing a confidential legal contract, merging medical transcripts, or compressing an exam application form, your data stays under your physical control.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 pt-8">
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>Isolated Browser Sandbox:</strong> Each file manipulation runs within standard Web Worker boundaries, preventing cross-tab data contamination.</span>
            </div>
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>GDPR Compliant:</strong> Fully aligns with Article 25 &amp; 32 data minimization principles for global user privacy.</span>
            </div>
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>No Account Needed:</strong> Use all utilities without creating accounts, storing passwords, or submitting email addresses.</span>
            </div>
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>No Metadata Scraping:</strong> Embedded EXIF or metadata tags are preserved or optionally cleaned without remote logging.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mb-48">
        <div className="flex items-center gap-12 mb-24">
          <HelpCircle className="w-6 h-6 text-brand-blue" />
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
            Frequently Asked Privacy &amp; Security Questions
          </h2>
        </div>
        <div className="space-y-16">
          {securityFaqs.map((faq, index) => (
            <div key={index} className="p-20 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
              <h3 className="font-bold text-[16px] text-text-primaryLight dark:text-text-primaryDark mb-8">
                {faq.question}
              </h3>
              <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
