"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function Contact() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <title>{lang === "en" ? "Contact Support | WeLovePDF" : "सहायता और संपर्क | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "Get in touch with the WeLovePDF support developer for any technical inquiries." : "तकनीकी पूछताछ के लिए WeLovePDF सहायता टीम से संपर्क करें।"} />
      <link rel="canonical" href="https://welovepdf.best/contact" />
      <link rel="alternate" hrefLang="en" href="https://welovepdf.best/contact" />
      <link rel="alternate" hrefLang="hi" href="https://welovepdf.best/hi/contact" />
      <link rel="alternate" hrefLang="x-default" href="https://welovepdf.best/contact" />
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Contact Support" : "सहायता डेस्क"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Have questions or need technical support? Send an email to our developer at <a href="mailto:nileshverma99731@gmail.com" className="text-brand-blue hover:underline">nileshverma99731@gmail.com</a>. We generally respond within 24 hours.
      </p>
    </div>
  );
}
