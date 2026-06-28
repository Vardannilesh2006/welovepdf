"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function TermsAndConditions() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "Terms & Conditions" : "नियम और शर्तें"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. By using WeLovePDF, you agree to local sandboxed processing limits. Core tools are free for personal and commercial usage with fair use limits on server-side requests.
      </p>
    </div>
  );
}
