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
  }
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        Terms & Conditions
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-16">
        Last updated: June 28, 2026. By using WeLovePDF, you agree to local sandboxed processing limits. Core tools are free for personal and commercial usage with fair use limits on server-side requests.
      </p>
      <h3 className="text-lg font-bold mb-8">Refund Policy</h3>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Because WeLovePDF is 100% free with no registration requirements, premium subscriptions, or processing charges, no payment is ever collected. Consequently, no refund policy is applicable.
      </p>
    </div>
  );
}
