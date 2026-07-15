import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support | WeLovePDF",
  description: "Get in touch with the WeLovePDF support developer for any technical inquiries.",
  alternates: {
    canonical: "https://www.welovepdf.best/contact",
    languages: {
      en: "https://www.welovepdf.best/contact",
      hi: "https://www.welovepdf.best/hi/contact",
      "x-default": "https://www.welovepdf.best/contact",
    }
  }
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        Contact Support
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Have questions or need technical support? Send an email to our developer at <a href="mailto:nileshverma99731@gmail.com" className="text-brand-blue hover:underline">nileshverma99731@gmail.com</a>. We generally respond within 24 hours.
      </p>
    </div>
  );
}
