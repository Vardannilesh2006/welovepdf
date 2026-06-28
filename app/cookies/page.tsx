"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function Cookies() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Cookies & Storage" : "कुकीज़ और स्टोरेज"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. WeLovePDF uses localStorage to store your language toggle setting and theme preference. We do not use third-party tracking cookies or store user document cookies.
      </p>
    </div>
  );
}
