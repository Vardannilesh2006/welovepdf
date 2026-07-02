"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function PrivacyPolicy() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <title>{lang === "en" ? "Privacy Policy | WeLovePDF" : "गोपनीयता नीति | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "Review the WeLovePDF privacy standards. No document logging, no remote uploads, 100% locally sandboxed processing." : "WeLovePDF की गोपनीयता नीति पढ़ें। हम आपके दस्तावेज़ों को कभी भी बाहरी सर्वर पर अपलोड नहीं करते हैं।"} />
      <link rel="canonical" href="https://welovepdf.best/privacy-policy" />
      <link rel="alternate" hrefLang="en" href="https://welovepdf.best/privacy-policy" />
      <link rel="alternate" hrefLang="hi" href="https://welovepdf.best/hi/privacy-policy" />
      <link rel="alternate" hrefLang="x-default" href="https://welovepdf.best/privacy-policy" />
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. Your privacy is paramount. WeLovePDF does not store, share, or analyze your document contents. All browser tools process data in your client browser memory sandbox with zero data logging.
      </p>
    </div>
  );
}
