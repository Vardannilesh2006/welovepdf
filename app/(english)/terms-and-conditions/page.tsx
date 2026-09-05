import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | WeLovePDF",
  description: "Read the WeLovePDF terms of service. Free client-side processing for both personal and commercial use cases.",
  alternates: {
    canonical: "https://www.welovepdf.best/terms-and-conditions",
    languages: {
      en: "https://www.welovepdf.best/terms-and-conditions",
      hi: "https://www.welovepdf.best/hi/terms-and-conditions",
      "x-default": "https://www.welovepdf.best/terms-and-conditions",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/terms-and-conditions",
    title: "Terms & Conditions | WeLovePDF",
    description: "Read the WeLovePDF terms of service. Free client-side processing for both personal and commercial use cases.",
    siteName: "WeLovePDF",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        Terms & Conditions
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-16">
        Last updated: June 28, 2026. By using WeLovePDF, you agree to these terms. All core browser-based PDF tools (merge, split, compress, convert, etc.) are completely unlimited and free for personal and commercial use with no daily caps or watermarks. AI-assisted tools (Ask PDF, Summarize PDF, Translate PDF) that rely on server-side processing may apply rate limits during peak usage to ensure fair access for all users.
      </p>
      <h3 className="text-lg font-bold mb-8">Refund Policy</h3>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Because WeLovePDF is 100% free with no registration requirements, premium subscriptions, or processing charges, no payment is ever collected. Consequently, no refund policy is applicable.
      </p>
    </div>
  );
}
