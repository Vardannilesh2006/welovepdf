import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies & Storage Policy | WeLovePDF",
  description: "Review the WeLovePDF cookie policy. We only use localStorage for your preferences with zero third-party tracking.",
  alternates: {
    canonical: "https://www.welovepdf.best/cookies",
    languages: {
      en: "https://www.welovepdf.best/cookies",
      hi: "https://www.welovepdf.best/hi/cookies",
      "x-default": "https://www.welovepdf.best/cookies",
    }
  }
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        Cookies & Storage
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        Last updated: June 28, 2026. WeLovePDF uses localStorage to store your language toggle setting and theme preference. We do not use third-party tracking cookies or store user document cookies.
      </p>
    </div>
  );
}
