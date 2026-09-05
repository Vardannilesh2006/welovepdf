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
  },
  openGraph: {
    url: "https://www.welovepdf.best/cookies",
    title: "Cookies & Storage Policy | WeLovePDF",
    description: "Review the WeLovePDF cookie policy. We only use localStorage for your preferences with zero third-party tracking.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Cookies Policy" }],
  },
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-4">Cookies &amp; Storage Policy</h1>
      <p className="text-[13px] text-text-secondaryLight mb-8">Last updated: September 5, 2026</p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files stored in your browser that help websites remember your preferences and usage patterns.
        localStorage is a similar browser-based storage mechanism that persists data locally without an expiry date.
      </p>

      <h2>How WeLovePDF Uses Cookies and Storage</h2>
      <p>
        WeLovePDF does <strong>not</strong> use advertising cookies, cross-site tracking cookies, or third-party marketing
        cookies. We use a minimal set of functional storage and analytics tracking as described below.
      </p>

      <h2>Cookie Categories</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Purpose</th>
              <th className="text-left p-2">Retention</th>
              <th className="text-left p-2">Party</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2"><code>lang_pref</code></td>
              <td className="p-2">localStorage</td>
              <td className="p-2">Remembers your language choice (English or Hindi)</td>
              <td className="p-2">Until cleared by user</td>
              <td className="p-2">First</td>
            </tr>
            <tr>
              <td className="p-2"><code>theme_pref</code></td>
              <td className="p-2">localStorage</td>
              <td className="p-2">Remembers your light/dark theme preference</td>
              <td className="p-2">Until cleared by user</td>
              <td className="p-2">First</td>
            </tr>
            <tr>
              <td className="p-2"><code>cookie_consent</code></td>
              <td className="p-2">localStorage</td>
              <td className="p-2">Records whether you accepted or dismissed the cookie banner</td>
              <td className="p-2">Until cleared by user</td>
              <td className="p-2">First</td>
            </tr>
            <tr>
              <td className="p-2"><code>_ga</code></td>
              <td className="p-2">Cookie</td>
              <td className="p-2">Google Analytics — distinguishes unique users (anonymized)</td>
              <td className="p-2">2 years</td>
              <td className="p-2">Third (Google)</td>
            </tr>
            <tr>
              <td className="p-2"><code>_ga_J28XZEQQ83</code></td>
              <td className="p-2">Cookie</td>
              <td className="p-2">Google Analytics — persists session state for G-J28XZEQQ83</td>
              <td className="p-2">2 years</td>
              <td className="p-2">Third (Google)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Analytics Cookies (Google Analytics 4)</h2>
      <p>
        We use Google Analytics 4 to understand aggregate usage patterns (page views, country, browser type). Analytics data
        is anonymized and does not include the content of documents you process. Google Analytics IP anonymization is enabled.
      </p>
      <p>
        <strong>Opt-out:</strong> You can prevent Google Analytics from collecting your data by installing the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-out Browser Add-on
        </a>.
      </p>

      <h2>No Document Cookies</h2>
      <p>
        WeLovePDF does <strong>not</strong> store any PDF file data, document contents, or processed output in cookies or
        localStorage. All file processing occurs in your browser&apos;s RAM memory and is discarded when you close or refresh the tab.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can clear all localStorage and cookies for this website at any time via your browser settings:
      </p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and Security → Clear browsing data</li>
        <li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For questions about our cookie practices:{" "}
        <a href="mailto:nileshverma99731@gmail.com">nileshverma99731@gmail.com</a>
      </p>
    </div>
  );
}
