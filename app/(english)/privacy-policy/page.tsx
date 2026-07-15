import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WeLovePDF",
  description: "Review the WeLovePDF privacy standards. No document logging, no remote uploads, 100% locally sandboxed processing.",
  alternates: {
    canonical: "https://www.welovepdf.best/privacy-policy",
    languages: {
      en: "https://www.welovepdf.best/privacy-policy",
      hi: "https://www.welovepdf.best/hi/privacy-policy",
      "x-default": "https://www.welovepdf.best/privacy-policy",
    }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        Privacy Policy
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. Your privacy is paramount. WeLovePDF does not store, share, or analyze your document contents. All browser tools process data in your client browser memory sandbox with zero data logging.
      </p>
    </div>
  );
}
