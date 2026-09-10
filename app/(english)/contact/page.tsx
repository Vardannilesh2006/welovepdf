import React from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Bug, Lightbulb, Clock, CheckCircle2, HelpCircle } from "lucide-react";
import ContactForm from "../../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Support & Technical Inquiries | WeLovePDF",
  description: "Get in touch with the WeLovePDF engineering and support team for technical assistance, bug reports, or feature suggestions.",
  alternates: {
    canonical: "https://www.welovepdf.best/contact",
    languages: {
      en: "https://www.welovepdf.best/contact",
      hi: "https://www.welovepdf.best/hi/contact",
      "x-default": "https://www.welovepdf.best/contact",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/contact",
    title: "Contact Support & Technical Inquiries | WeLovePDF",
    description: "Get in touch with the WeLovePDF engineering and support team for technical assistance, bug reports, or feature suggestions.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Contact Support" }],
  },
};

const contactFaqs = [
  {
    question: "What is your typical response time for support tickets?",
    answer: "Our core engineering team monitors inquiries continuously. You will typically receive an actionable response within 12 to 24 hours during business days."
  },
  {
    question: "What details should I include when reporting a PDF conversion error?",
    answer: "To help us diagnose and fix issues quickly, please provide your operating system, web browser version (e.g., Chrome, Firefox, Safari), approximate file size, and the exact error notification displayed."
  },
  {
    question: "Can I request new document conversion tools or batch features?",
    answer: "Yes, we actively welcome user feedback! We frequently prioritize new WebAssembly utilities and format converters based on user submissions."
  },
  {
    question: "How do I report a security vulnerability or bug?",
    answer: "Please email our technical team directly at nileshverma99731@gmail.com with 'Security Advisory' in the subject line. We will investigate and patch confirmed issues promptly."
  }
];

export default function ContactPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contactFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-[700px] mx-auto mb-48">
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-blue/10 text-brand-blue rounded-pill font-bold text-[12px] uppercase tracking-wider mb-16">
          <MessageSquare className="w-[14px] h-[14px]" /> We're Here to Help
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-16">
          Contact Support &amp; Feedback
        </h1>
        <p className="text-[16px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
          Have questions, identified an issue with a specific PDF format, or want to suggest a new tool? Connect with our dedicated engineering team.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-48">
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Mail className="w-8 h-8 text-brand-blue" />
          <h3 className="font-bold text-[16px]">Direct Email</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            Reach out directly for general support, partnership inquiries, or bulk usage queries.
          </p>
          <a
            href="mailto:nileshverma99731@gmail.com"
            className="text-brand-blue hover:underline font-semibold text-[14px] break-all mt-auto"
          >
            nileshverma99731@gmail.com
          </a>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Bug className="w-8 h-8 text-brand-amber" />
          <h3 className="font-bold text-[16px]">Bug Reporting</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            If a document failed to render, compress, or split, share the file specs and browser details.
          </p>
          <span className="text-[13px] text-emerald-600 font-medium mt-auto flex items-center gap-6">
            <CheckCircle2 className="w-4 h-4" /> Investigated in &lt; 24h
          </span>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Lightbulb className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-[16px]">Feature Requests</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            Suggest new PDF manipulation features, custom export formats, or compression presets.
          </p>
          <span className="text-[13px] text-brand-blue font-medium mt-auto flex items-center gap-6">
            <Clock className="w-4 h-4" /> Weekly Releases
          </span>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <ContactForm lang="en" />

      {/* Troubleshooting Checklist */}
      <div className="border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark p-28 mb-48">
        <h2 className="text-xl font-bold mb-16 text-text-primaryLight dark:text-text-primaryDark">
          Quick Self-Help Troubleshooting
        </h2>
        <div className="space-y-12 text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
          <p>Before emailing support, check if your issue can be resolved with these standard quick fixes:</p>
          <ul className="list-disc pl-20 space-y-8">
            <li><strong>Browser WebAssembly Support:</strong> Ensure your web browser (Chrome, Edge, Firefox, Safari) is updated to a recent version with WebAssembly enabled.</li>
            <li><strong>Password-Protected PDFs:</strong> If your document requires a password to open, unlock it using our Unlock PDF tool before merging or compressing.</li>
            <li><strong>Corrupt File Streams:</strong> If a document fails to parse, try running it through our Repair PDF utility to reconstruct the broken cross-reference table.</li>
            <li><strong>Clear Browser Cache:</strong> When new tools are released, clearing cached assets ensures you are running the latest compiled WebAssembly workers.</li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-48">
        <div className="flex items-center gap-12 mb-20">
          <HelpCircle className="w-6 h-6 text-brand-blue" />
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
            Frequently Asked Support Questions
          </h2>
        </div>
        <div className="space-y-16">
          {contactFaqs.map((faq, index) => (
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
