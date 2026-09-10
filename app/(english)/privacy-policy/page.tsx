import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WeLovePDF",
  description: "Comprehensive privacy disclosures for WeLovePDF. Local browser sandboxing, AI processing transparency, analytics, and advertising policies.",
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
    description: "Comprehensive privacy disclosures for WeLovePDF. Local browser sandboxing, AI processing transparency, analytics, and advertising policies.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Privacy Policy" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-[13px] text-slate-500 mb-8 font-medium">Last updated: September 10, 2026</p>

      <h2>1. Data Controller & Operator Overview</h2>
      <p>
        <strong>WeLovePDF</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is operated as an independent software utility by <strong>Nilesh Verma</strong>, based in Bettiah, West Champaran, Bihar, India.
        For questions regarding this policy, data rights, or security disclosures, contact our privacy desk directly at{" "}
        <a href="mailto:nileshverma99731@gmail.com" className="text-amber-700 font-semibold underline">nileshverma99731@gmail.com</a>.
      </p>

      <h2>2. Architecture-First Privacy: Local vs. Server Processing</h2>
      <p>
        Our architectural philosophy is simple: <em>data that is never collected cannot be breached, sold, or surveilled</em>. We divide our utilities into two distinct processing categories according to our official Tool Manifest:
      </p>

      <h3>2a. Core Tools (Local-Only In-Browser Sandbox)</h3>
      <p>
        Over 90% of our toolkit (including <strong>Merge PDF, Split PDF, Compress PDF, PDF to JPG, Rotate PDF, Sign PDF, Protect PDF, Bates Numbering</strong>, and related file organizers) executes <strong>100% locally</strong> inside your web browser using WebAssembly and client-side JavaScript.
      </p>
      <ul>
        <li><strong>No File Uploads:</strong> Your raw document files never leave your device. They are loaded strictly into your local browser RAM memory.</li>
        <li><strong>Zero Retention:</strong> We do not operate file storage buckets or document databases. When you close or refresh the browser tab, the memory buffer is instantly purged.</li>
        <li><strong>No Content Inspection:</strong> We cannot read, scan, index, or store the contents of your local documents.</li>
      </ul>

      <h3>2b. AI-Assisted Tools (Hybrid & Server-Side Processing)</h3>
      <p>
        Selected AI utilities (<strong>Ask PDF, Summarize PDF, Translate PDF, Quiz from PDF, and Invoice Extractor</strong>) require large-language-model inference to answer natural language questions or synthesize document sections.
      </p>
      <ul>
        <li><strong>Local Text Parsing:</strong> The PDF text stream is first extracted locally in your browser. Only the extracted text relevant to your query is transmitted over an encrypted TLS connection to our secure server endpoint.</li>
        <li><strong>Ephemeral RAM Processing:</strong> Text is passed directly to the <strong>Google Gemini API</strong> for real-time inference. Document text is processed purely in volatile server memory and is <strong>never saved to disk or persistent storage</strong>.</li>
        <li><strong>No Model Training:</strong> Under our enterprise API configuration, user queries and document text are <strong>not used to train or fine-tune public AI models</strong>.</li>
        <li><strong>Visible Labeling:</strong> Every tool requiring server or hybrid assistance displays a prominent processing badge (<code>HYBRID</code> or <code>SERVER PROCESSING</code>) on its page.</li>
      </ul>

      <h2>3. Information We Collect Automatically</h2>
      <p>
        When you visit and navigate WeLovePDF, certain standard anonymous web metrics are logged:
      </p>
      <ul>
        <li>
          <strong>Usage Analytics (Google Analytics 4):</strong> We use GA4 (Measurement ID: <code>G-J28XZEQQ83</code>) to measure aggregated, anonymized trends such as page visits, tool popularity, country-level geography, device category, and bounce rates. Google Analytics anonymizes IP addresses before storage. You can opt out via Google&apos;s official{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">
            GA Opt-out Add-on
          </a>.
        </li>
        <li>
          <strong>Google Tag Manager:</strong> We use GTM (Container ID: <code>GTM-KCDRXS3J</code>) to manage script loading. GTM does not store personal data.
        </li>
        <li>
          <strong>Local Storage Keys:</strong> We save your preferred language (<code>wlp_lang</code>), theme preference (<code>wlp_theme</code>), and cookie consent status (<code>wlp_cookie_consent</code>) in your device&apos;s browser <code>localStorage</code>. These settings never leave your device.
        </li>
        <li>
          <strong>Edge Hosting Diagnostics:</strong> Our edge hosting provider, <strong>Vercel</strong>, collects standard server logs (IP address, user-agent, request path) to safeguard against DDoS attacks and maintain system uptime.
        </li>
      </ul>

      <h2>4. Advertising & Third-Party Monetization Policy</h2>
      <p>
        To keep our 63+ document utilities 100% free forever without charging recurring subscription fees or restricting student/commercial usage, WeLovePDF may display online advertisements delivered by third-party advertising partners, including <strong>Google AdSense</strong>.
      </p>
      <h3>4a. Use of Cookies in Advertising</h3>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to WeLovePDF or other websites across the internet:
      </p>
      <ul>
        <li>Google&apos;s use of advertising cookies enables it and its network partners to serve relevant ads based on visits to our site and other destinations on the web.</li>
        <li>These cookies identify your browser and device attributes, but <strong>they never have access to your PDF files, document text, or local processing buffers</strong>.</li>
      </ul>
      <h3>4b. Your Ad Choices & Opt-Out Mechanisms</h3>
      <p>
        You have complete control over personalized advertising:
      </p>
      <ul>
        <li>You may opt out of personalized advertising by visiting Google&apos;s{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-semibold">
            Google Ads Settings
          </a>.
        </li>
        <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-semibold">
            www.aboutads.info/choices
          </a> or the Network Advertising Initiative at{" "}
          <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-semibold">
            networkadvertising.org/choices
          </a>.
        </li>
        <li>European Economic Area (EEA) and UK visitors can manage their consent preferences directly through our consent management banner.</li>
      </ul>

      <h2>5. Cookies Policy Cross-Reference</h2>
      <p>
        We distinguish clearly between necessary functional preferences (stored in <code>localStorage</code>), analytics cookies (GA4), and future third-party advertising cookies. For full technical details and complete cookie tables, please review our comprehensive{" "}
        <a href="/cookies" className="text-amber-700 underline font-semibold">Cookie Policy</a>.
      </p>

      <h2>6. Third-Party Service Providers</h2>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Privacy Policy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google LLC</strong></td>
            <td>Analytics (GA4), Script Orchestration (GTM), AI Inference (Gemini), Advertising (AdSense)</td>
            <td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></td>
          </tr>
          <tr>
            <td><strong>Vercel Inc.</strong></td>
            <td>Edge CDN, SSL Termination & Serverless Infrastructure</td>
            <td><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></td>
          </tr>
        </tbody>
      </table>

      <h2>7. Children&apos;s Privacy (COPPA & DPDPA)</h2>
      <p>
        WeLovePDF is a general utility platform not directed at children under the age of 13 (or under 18 under India&apos;s Digital Personal Data Protection Act). We do not knowingly collect personal information from minors. Because our core utilities operate locally without user registration, children using the site to complete school homework do so without any accounts or data collection.
      </p>

      <h2>8. User Rights (GDPR / CCPA / Indian DPDPA)</h2>
      <p>
        Depending on your jurisdiction, you hold enforceable rights regarding personal data:
      </p>
      <ul>
        <li><strong>Right to Know & Access:</strong> Learn what data is collected and request copies.</li>
        <li><strong>Right to Deletion:</strong> Request erasure of analytics records or support email threads.</li>
        <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices or ad-blocking tools.</li>
        <li><strong>Right to Withdraw Consent:</strong> Update cookie preferences at any time.</li>
      </ul>
      <p>
        To exercise any rights, email <a href="mailto:nileshverma99731@gmail.com" className="text-amber-700 underline font-semibold">nileshverma99731@gmail.com</a>. We respond to all verified requests within 30 days.
      </p>

      <h2>9. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy to reflect technical enhancements, architectural updates, or regulatory compliance requirements. Any revisions will be reflected with an updated &ldquo;Last updated&rdquo; timestamp at the top of this document.
      </p>
    </div>
  );
}
