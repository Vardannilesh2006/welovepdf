"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function PrivacyPolicy() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. Your privacy is paramount. WeLovePDF does not store, share, or analyze your document contents. All browser tools process data in your client browser memory sandbox with zero data logging.
      </p>
    </div>
  );
}
