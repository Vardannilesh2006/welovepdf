"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function TermsAndConditions() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <title>{lang === "en" ? "Terms & Conditions | WeLovePDF" : "नियम और शर्तें | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "Read the WeLovePDF terms of service. Free client-side processing for both personal and commercial use cases." : "WeLovePDF के नियम और शर्तें पढ़ें। व्यक्तिगत और व्यावसायिक उपयोग के लिए मुफ़्त उपकरण।"} />
      <link rel="canonical" href="https://welovepdf.best/terms-and-conditions" />
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Terms & Conditions" : "नियम और शर्तें"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. By using WeLovePDF, you agree to local sandboxed processing limits. Core tools are free for personal and commercial usage with fair use limits on server-side requests.
      </p>
    </div>
  );
}
