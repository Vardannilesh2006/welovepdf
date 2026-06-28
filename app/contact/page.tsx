"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function Contact() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Contact Support" : "सहायता डेस्क"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Have questions or need technical support? Send an email to our developer at <a href="mailto:nileshverma99731@gmail.com" className="text-brand-blue hover:underline">nileshverma99731@gmail.com</a>. We generally respond within 24 hours.
      </p>
    </div>
  );
}
