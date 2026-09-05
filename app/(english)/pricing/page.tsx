import React from "react";
import { Metadata } from "next";
import { Check, Shield, Zap, Sparkles, FileText, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — 100% Free, No Limits | WeLovePDF",
  description: "Every single tool, feature, and AI assistant on WeLovePDF is completely free for everyone. No credit cards, no subscriptions, no sign-ups.",
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
    title: "Pricing — 100% Free, No Limits | WeLovePDF",
    description: "Every single tool, feature, and AI assistant on WeLovePDF is completely free for everyone. No credit cards, no subscriptions, no sign-ups.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Free Pricing" }],
  }
};

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-24 py-80 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center max-w-[800px] mx-auto mb-64 relative">
        <div className="absolute inset-0 -top-40 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 blur-[64px] rounded-full -z-10 pointer-events-none" />
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-success/10 border border-brand-success/20 rounded-pill text-brand-success font-bold text-[12px] uppercase tracking-wider mb-24">
          <Check className="w-[14px] h-[14px]" /> Zero Cost Forever
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-text-primaryLight dark:text-text-primaryDark mb-24">
          100% Free. No Limits.
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[680px] mx-auto font-medium">
          Every single tool, feature, and AI assistant on WeLovePDF is completely free for everyone. No credit cards, no subscriptions, no sign-ups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-64">
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <Zap className="w-[24px] h-[24px] text-brand-blue" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">62+ PDF Tools</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              Merge, split, compress, edit, convert, page delete, and watermark. Fully unlocked with no cap on pages or downloads.
            </p>
          </div>
        </div>
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <Sparkles className="w-[24px] h-[24px] text-brand-amber" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">AI Document Workspace</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              Summarize massive textbooks, translate formats, and chat directly with your files instantly, powered by advanced local processing.
            </p>
          </div>
        </div>
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <Shield className="w-[24px] h-[24px] text-brand-success" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">100% Private Sandbox</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              Your files never touch remote servers. All processing happens locally in your browser, maintaining full security.
            </p>
          </div>
        </div>
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <FileText className="w-[24px] h-[24px] text-indigo-500" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">Up to 200MB Files</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              Massive file sizes supported. Merge or compress high-resolution scanned documents without paying a single rupee.
            </p>
          </div>
        </div>
      </div>

      <div className="p-40 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 border border-brand-blue/10 dark:border-indigo-500/10 rounded-modal text-center max-w-3xl mx-auto w-full shadow-sm">
        <div className="flex items-center justify-center gap-12 text-brand-blue dark:text-indigo-400 font-bold mb-12 text-[16px]">
          <Lock className="w-[20px] h-[20px]" />
          <span>Private, Secure, & Serverless</span>
        </div>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[13px] leading-relaxed max-w-[620px] mx-auto font-medium">
          Since WeLovePDF runs entirely in-memory client-side inside your local browser sandbox, we do not require data server infrastructure. That's why our tools are permanently free.
        </p>
      </div>
    </div>
  );
}
