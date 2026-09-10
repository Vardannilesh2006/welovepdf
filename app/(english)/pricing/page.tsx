import React from "react";
import { Metadata } from "next";
import { Check, Shield, Zap, Sparkles, FileText, Lock, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — 100% Free, No Subscription Required | WeLovePDF",
  description: "Every single PDF tool, feature, and AI utility on WeLovePDF is 100% free forever. No credit cards, no monthly subscriptions, and no hidden file size limits.",
  alternates: {
    canonical: "https://www.welovepdf.best/pricing",
    languages: {
      en: "https://www.welovepdf.best/pricing",
      hi: "https://www.welovepdf.best/hi/pricing",
      "x-default": "https://www.welovepdf.best/pricing",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/pricing",
    title: "Pricing — 100% Free, No Subscription Required | WeLovePDF",
    description: "Every single PDF tool, feature, and AI utility on WeLovePDF is 100% free forever. No credit cards, no monthly subscriptions, and no hidden file size limits.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Free Pricing" }],
  }
};

const pricingFaqs = [
  {
    question: "Is WeLovePDF really 100% free without any trial limits?",
    answer: "Yes, completely free. There are no 7-day trials, no daily quota limits, no credit card requests, and no locked 'Pro only' buttons. You have unlimited access to every single tool."
  },
  {
    question: "How can WeLovePDF offer free tools without charging subscriptions?",
    answer: "Traditional PDF websites spend thousands of dollars on cloud servers because they upload your heavy files to remote machines. WeLovePDF uses browser-native WebAssembly technology that processes files locally on your device CPU. With minimal server compute overhead, we can keep the entire suite permanently free for everyone."
  },
  {
    question: "Are there any file size restrictions or hidden caps?",
    answer: "You can process large documents up to 200MB directly in your browser. Unlike other platforms that cut you off after 2 files per hour, WeLovePDF allows unlimited document conversions and merges."
  },
  {
    question: "Can I use WeLovePDF for commercial or business work?",
    answer: "Yes. Freelancers, businesses, students, and legal professionals are fully permitted to use WeLovePDF for commercial and institutional tasks with no licensing fees."
  },
  {
    question: "Do you add watermarks or branding to my converted documents?",
    answer: "Never. WeLovePDF will never inject promotional stamps, watermarks, or altered footers into your documents unless you explicitly use our Watermark Tool to add your own custom stamp."
  }
];

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pricingFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-6xl mx-auto px-24 py-64 min-h-[80vh] flex flex-col justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-[800px] mx-auto mb-56 relative">
        <div className="absolute inset-0 -top-40 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 blur-[64px] rounded-full -z-10 pointer-events-none" />
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-success/10 border border-brand-success/20 rounded-pill text-brand-success font-bold text-[12px] uppercase tracking-wider mb-20">
          <Check className="w-[14px] h-[14px]" /> Zero Cost Forever
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-text-primaryLight dark:text-text-primaryDark mb-20">
          100% Free. Unlimited Usage.
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[680px] mx-auto font-medium">
          Every single tool, feature, and AI utility on WeLovePDF is completely free for everyone. No credit cards, no subscriptions, and no account registrations required.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-56">
        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <Zap className="w-[24px] h-[24px] text-brand-blue" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">62+ PDF Tools Unlocked</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              Merge, split, compress, edit, convert, page delete, and watermark. Fully unlocked with no daily caps or hourly wait timers.
            </p>
          </div>
        </div>

        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <Sparkles className="w-[24px] h-[24px] text-brand-amber" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">AI Document Workspace</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              Summarize textbooks, extract tables, and interact directly with complex files without recurring monthly AI software fees.
            </p>
          </div>
        </div>

        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <Shield className="w-[24px] h-[24px] text-emerald-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">100% Private Sandbox</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              Your files never touch remote cloud servers. All processing executes locally in your browser memory for maximum privacy.
            </p>
          </div>
        </div>

        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <FileText className="w-[24px] h-[24px] text-indigo-500" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">Up to 200MB File Support</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              Generous file size limits. Merge or compress high-resolution scanned documents and books without paying a single rupee.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark p-32 mb-56 shadow-sm overflow-x-auto">
        <h2 className="text-2xl font-bold mb-20 text-text-primaryLight dark:text-text-primaryDark">
          Why WeLovePDF vs Commercial PDF Services
        </h2>
        <table className="w-full text-left text-[14px] border-collapse">
          <thead>
            <tr className="border-b border-border-light dark:border-border-dark text-text-secondaryLight">
              <th className="pb-12 font-semibold">Feature / Capability</th>
              <th className="pb-12 font-bold text-brand-blue">WeLovePDF</th>
              <th className="pb-12 font-medium">Standard Cloud Converters</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            <tr>
              <td className="py-12 font-medium">Subscription Cost</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> ₹0 / Lifetime Free</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> ₹500–₹1,500 / month</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">Daily Task Limit</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> Unlimited</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> 2 to 3 files / day</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">Document Privacy</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> 100% Client-Side Local RAM</td>
              <td className="py-12 text-text-secondaryLight flex items-center gap-6">Uploaded to third-party cloud</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">Forced Watermarks</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> None (Clean Output)</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> Often forced on free tier</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">Account Registration</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> Not required</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> Email / password mandatory</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mb-48">
        <div className="flex items-center gap-12 mb-24">
          <HelpCircle className="w-6 h-6 text-brand-blue" />
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
            Frequently Asked Pricing Questions
          </h2>
        </div>
        <div className="space-y-16">
          {pricingFaqs.map((faq, index) => (
            <div key={index} className="p-20 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
              <h3 className="font-bold text-[16px] text-text-primaryLight dark:text-text-primaryDark mb-8">
                {faq.question}
              </h3>
              <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-36 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 border border-brand-blue/10 dark:border-indigo-500/10 rounded-card text-center max-w-3xl mx-auto w-full shadow-sm">
        <div className="flex items-center justify-center gap-12 text-brand-blue font-bold mb-12 text-[16px]">
          <Lock className="w-[20px] h-[20px]" />
          <span>Private, Secure, &amp; Serverless Architecture</span>
        </div>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed max-w-[620px] mx-auto font-medium">
          Since WeLovePDF runs client-side inside your web browser sandbox using modern WebAssembly modules, we don't carry massive remote server infrastructure bills. That is why our tools are, and will always remain, completely free.
        </p>
      </div>
    </div>
  );
}
