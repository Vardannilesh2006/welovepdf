"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function Cookies() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <title>{lang === "en" ? "Cookies & Storage Policy | WeLovePDF" : "कुकीज़ और स्टोरेज नीति | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "Review the WeLovePDF cookie policy. We only use localStorage for your preferences with zero third-party tracking." : "WeLovePDF की कुकीज़ नीति पढ़ें। हम किसी भी तृतीय-पक्ष ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं।"} />
      <link rel="canonical" href="https://welovepdf.best/cookies" />
      <link rel="alternate" hrefLang="en" href="https://welovepdf.best/cookies" />
      <link rel="alternate" hrefLang="hi" href="https://welovepdf.best/hi/cookies" />
      <link rel="alternate" hrefLang="x-default" href="https://welovepdf.best/cookies" />
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Cookies & Storage" : "कुकीज़ और स्टोरेज"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. WeLovePDF uses localStorage to store your language toggle setting and theme preference. We do not use third-party tracking cookies or store user document cookies.
      </p>
    </div>
  );
}
