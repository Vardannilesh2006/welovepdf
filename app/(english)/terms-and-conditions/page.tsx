import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | WeLovePDF — Document Toolkit",
  description: "Read the WeLovePDF terms of service. Details on acceptable use, user responsibilities, client-side processing limits, third-party services, and liability disclaimers.",
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
    description: "Read the WeLovePDF terms of service. Details on acceptable use, user responsibilities, client-side processing limits, third-party services, and liability disclaimers.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Terms & Conditions" }],
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
        Terms &amp; Conditions
      </h1>
      <p className="text-xs text-text-secondaryLight dark:text-text-secondaryDark mb-8">
        Last Updated: September 10, 2026 · Effective Date: Immediate
      </p>

      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Welcome to <strong>WeLovePDF</strong> (accessible via <code>https://www.welovepdf.best</code>). By accessing, browsing, or using our browser-based document utilities, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you must discontinue use of the website immediately.
      </p>

      <h2>1. Acceptable Use Policy</h2>
      <p>
        WeLovePDF grants you a free, revocable, non-exclusive, non-transferable license to use our web utilities for personal, educational, professional, and commercial document workflows.
      </p>
      <p>You agree NOT to use WeLovePDF to:</p>
      <ul>
        <li>Process, distribute, or generate content that is unlawful, defamatory, harassing, fraudulent, or infringing upon any third party&apos;s intellectual property rights.</li>
        <li>Attempt to circumvent, reverse engineer, decompile, or tamper with the client-side sandboxes, rate limiters, or web workers of the website.</li>
        <li>Automate abusive traffic through high-frequency scraping bots, denial-of-service attempts, or scripts that impair infrastructure stability.</li>
        <li>Process malicious executables disguised as document files.</li>
      </ul>

      <h2>2. User Responsibility &amp; Document Ownership</h2>
      <p>
        You retain 100% full ownership, intellectual property rights, and copyright to all files, documents, text snippets, and images you process through WeLovePDF.
      </p>
      <p>
        Because all core operations (merging, splitting, compression, format conversion, editing, watermarking) occur entirely within your local web browser using client-side WebAssembly and JavaScript, <strong>WeLovePDF does not take possession of, store, or inspect your private files</strong>. You are solely responsible for ensuring you have legitimate legal authority to access, edit, password-protect, or convert the documents you load into your browser.
      </p>

      <h2>3. PDF Processing Capabilities &amp; Technical Limitations</h2>
      <p>
        While we engineer our utilities for maximum precision and speed, client-side web processing operates under distinct technical constraints:
      </p>
      <ul>
        <li><strong>Browser Memory Constraints:</strong> Processing large documents (e.g., files over 100MB or multi-thousand-page PDFs) is constrained by your device&apos;s available system RAM and browser tab allocation.</li>
        <li><strong>Conversion Fidelity:</strong> Complex PDF layouts with custom vector font subsets, non-standard CID mappings, or intricate graphic layers may convert with slight typographic differences compared to proprietary desktop software.</li>
        <li><strong>Redaction Integrity:</strong> Our Redact PDF tool applies permanent text-operator stream sanitization alongside opaque visual cover blocks. However, for classified government records or HIPAA-governed medical disclosures, users must independently inspect exported files before public release.</li>
        <li><strong>Encryption Standards:</strong> Protect PDF applies standard password protection with ISO 32000 compliant security handlers. Always keep backup copies of your unencrypted master files, as lost passwords cannot be recovered by our team.</li>
        <li><strong>Signature Inspection:</strong> The Verify Signature tool inspects structural PDF signature fields and metadata dictionaries. It does not replace full cryptographic trust-chain verification performed by certified PDF readers like Adobe Acrobat.</li>
      </ul>

      <h2>4. Intellectual Property &amp; Brand Usage</h2>
      <p>
        All website interface designs, software source code, illustrations, logos, documentation guides, and educational tutorials published on WeLovePDF are the intellectual property of WeLovePDF and its creator, Nilesh Verma, protected by applicable international copyright and trademark laws. You may not republish, mirror, or repackage our web applications without prior written authorization.
      </p>

      <h2>5. Third-Party Services &amp; Monetization</h2>
      <p>
        To maintain free, open access without paywalls or subscriptions, WeLovePDF may display non-intrusive third-party advertisements (such as Google AdSense) and utilize anonymous usage analytics (Google Analytics 4). These external services may utilize privacy-respecting cookies or device identifiers in accordance with our <a href="/privacy-policy" className="text-[#D97706] underline">Privacy Policy</a> and <a href="/cookies" className="text-[#D97706] underline">Cookie Policy</a>. We do not control and are not responsible for the privacy practices or content of third-party websites linked through advertisements.
      </p>

      <h2>6. Service Availability &amp; &quot;As-Is&quot; Disclaimer</h2>
      <p>
        WeLovePDF is provided strictly on an <strong>&quot;AS-IS&quot;</strong> and <strong>&quot;AS-AVAILABLE&quot;</strong> basis, without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or error-free operation. We do not warrant that the website will operate uninterrupted or that converted files will satisfy all specialized compliance audits.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, in no event shall WeLovePDF, its creator, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including, without limitation, loss of data, document corruption, business interruption, or financial loss) arising out of or related to your use of, or inability to use, our utilities.
      </p>

      <h2>8. Fair-Use Policy &amp; Pricing Clarity</h2>
      <p>
        All 63+ core browser-based utilities are 100% free and unlimited, with no subscription tiers, credit-card requirements, or hidden watermarks. For server-assisted artificial intelligence tools (such as Ask PDF or Summarize PDF), requests are governed by fair-use throttling to prevent infrastructure exhaustion and maintain dependable service for all global users.
      </p>

      <h2>9. Modifications to Terms &amp; Service</h2>
      <p>
        We reserve the right to revise, update, or modify these Terms &amp; Conditions at any time. Any changes become effective immediately upon posting to this URL. Your continued use of the platform following the posting of revised terms constitutes your explicit acceptance of the changes.
      </p>

      <h2>10. Governing Law &amp; Dispute Resolution</h2>
      <p>
        These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law principles. Any legal disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in West Champaran, Bihar, India.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        If you have any questions, legal notices, or feedback regarding these Terms &amp; Conditions, please reach out to:
      </p>
      <div className="not-prose p-5 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-lg text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        <p className="font-bold text-slate-900 dark:text-white mb-1">WeLovePDF Engineering &amp; Legal Desk</p>
        <p>Founder &amp; Developer: Nilesh Verma</p>
        <p>Location: Bettiah, West Champaran, Bihar, India</p>
        <p>Direct Inquiries: <a href="mailto:nileshverma99731@gmail.com" className="text-[#D97706] underline font-semibold">nileshverma99731@gmail.com</a></p>
        <p>Website: <a href="https://www.welovepdf.best" className="text-[#D97706] underline">https://www.welovepdf.best</a></p>
      </div>
    </div>
  );
}
