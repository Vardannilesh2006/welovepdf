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
  },
  openGraph: {
    url: "https://www.welovepdf.best/privacy-policy",
    title: "Privacy Policy | WeLovePDF",
    description: "Review the WeLovePDF privacy standards. No document logging, no remote uploads, 100% locally sandboxed processing.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Privacy Policy" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>
      <p className="text-[13px] text-text-secondaryLight mb-8">Last updated: September 5, 2026</p>

      <h2>1. Data Controller</h2>
      <p>
        WeLovePDF is operated by Nilesh Verma, an individual developer based in Bettiah, Bihar, India. For privacy inquiries,
        contact: <a href="mailto:nileshverma99731@gmail.com">nileshverma99731@gmail.com</a>.
      </p>

      <h2>2. Our Core Privacy Guarantee</h2>
      <p>
        WeLovePDF is designed with a <strong>zero-upload architecture</strong>. All core PDF processing tools (merge, split,
        compress, rotate, convert, annotate, redact, etc.) execute entirely within your web browser&apos;s local memory
        sandbox using JavaScript and WebAssembly. <strong>Your document files never leave your device</strong> for these tools.
        No file bytes are transmitted to any server. No document content is logged, stored, indexed, or analyzed by us.
      </p>

      <h2>3. Information We Collect</h2>
      <h3>3a. Information You Do NOT Submit</h3>
      <p>
        For all browser-based tools: we do not collect, receive, store, or process your documents. File content stays
        on your local device at all times.
      </p>
      <h3>3b. Information We Do Collect Automatically</h3>
      <ul>
        <li>
          <strong>Usage Analytics (Google Analytics 4):</strong> We use Google Analytics 4 (GA4) with Measurement ID
          G-J28XZEQQ83 to collect anonymized usage statistics: page views, session counts, browser type, country,
          and general navigation patterns. This data does not include document contents. IP addresses are anonymized
          by Google. You can opt out via the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>.
        </li>
        <li>
          <strong>Google Tag Manager (GTM-KCDRXS3J):</strong> Used to manage analytics and tracking scripts. GTM
          does not collect data independently but orchestrates analytics tool loading.
        </li>
        <li>
          <strong>localStorage Preferences:</strong> We store your language preference (English/Hindi) and theme
          preference (light/dark) in your browser&apos;s localStorage. This data never leaves your device.
        </li>
      </ul>
      <h3>3c. AI Tools — Server Processing</h3>
      <p>
        Certain AI-powered tools (Ask PDF, Summarize PDF, Translate PDF) may transmit document text (not raw file bytes)
        to a server endpoint for AI model processing. When this occurs, the text is processed in RAM and not persisted
        to any database or file system. These server-side tools are clearly labeled with an <strong>AI</strong> badge.
      </p>

      <h2>4. Cookies and Local Storage</h2>
      <p>
        We use <strong>localStorage</strong> only for functional preferences (language, theme). We do not use
        tracking cookies. Google Analytics uses first-party cookies (<code>_ga</code>, <code>_ga_*</code>) in
        compliance with Google&apos;s data processing terms. See our{" "}
        <a href="/cookies">Cookie Policy</a> for details.
      </p>

      <h2>5. Third-Party Services</h2>
      <ul>
        <li><strong>Google Analytics:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
        <li><strong>Vercel (hosting):</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a> — Vercel may log request metadata (IP, browser headers) for security and performance purposes.</li>
      </ul>

      <h2>6. Your Rights (GDPR / Indian DPDPA)</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to processing of your data</li>
        <li>Data portability</li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:nileshverma99731@gmail.com">nileshverma99731@gmail.com</a>. We will respond within 30 days.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We do not store user documents. Analytics data is retained by Google for 14 months (default GA4 setting).
        localStorage data is stored in your own browser and can be cleared at any time via browser settings.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        WeLovePDF is not directed to children under 13. We do not knowingly collect personal information from children.
        If you believe a child has provided personal data, contact us immediately.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy periodically. The &ldquo;Last updated&rdquo; date at the top of this page will reflect
        any changes. Continued use of the service after changes constitutes acceptance of the updated policy.
      </p>

      <h2>10. Contact</h2>
      <p>
        For privacy questions: <a href="mailto:nileshverma99731@gmail.com">nileshverma99731@gmail.com</a>
      </p>
    </div>
  );
}

