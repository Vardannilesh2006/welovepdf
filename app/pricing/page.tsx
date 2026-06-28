"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { useLang } from "../../components/LangContext";

export default function Pricing() {
  const { lang } = useLang();
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");

  const title = lang === "en" ? "Simple, Transparent Pricing" : "सरल और पारदर्शी मूल्य निर्धारण";
  const desc = lang === "en" 
    ? "Core browser-side tools are free forever. Upgrade to Pro for large files, Tesseract OCR, and Gemini AI assistance."
    : "सभी मुख्य ब्राउज़र टूल्स हमेशा मुफ़्त हैं। बड़े दस्तावेज़ों, ओसीआर और एआई असिस्टेंट के लिए प्रो में अपग्रेड करें।";

  return (
    <div className="max-w-7xl mx-auto px-16 py-64">
      <div className="text-center max-w-[680px] mx-auto mb-48">
        <h1 className="text-4xl font-extrabold tracking-tight mb-16">{title}</h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed mb-32">
          {desc}
        </p>

        {/* Cycle selector */}
        <div className="inline-flex items-center gap-8 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-pill p-4 shadow-sm">
          <button
            onClick={() => setCycle("monthly")}
            className={`px-16 py-6 rounded-pill text-[13px] font-semibold transition-all ${cycle === "monthly" ? "bg-brand-blue text-white" : ""}`}
            type="button"
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle("yearly")}
            className={`px-16 py-6 rounded-pill text-[13px] font-semibold transition-all flex items-center gap-6 ${cycle === "yearly" ? "bg-brand-blue text-white" : ""}`}
            type="button"
          >
            Yearly
            <span className="text-[10px] bg-brand-amber text-text-primaryLight font-bold px-6 py-1 rounded-pill uppercase tracking-wider">Save 30%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-stretch max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-8">Free Plan</h3>
            <p className="text-[13px] text-text-secondaryLight mb-24">Core browser-side operations</p>
            <div className="text-3xl font-bold mb-24">₹0</div>
            <ul className="flex flex-col gap-12 text-[14px]">
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> All 60+ Browser tools</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 100% Private local sandbox</li>
              <li className="flex items-center gap-8 text-text-secondaryLight/50"><span className="text-brand-error">✗</span> Up to 200MB files</li>
              <li className="flex items-center gap-8 text-text-secondaryLight/50"><span className="text-brand-error">✗</span> Server OCR & AI assistance</li>
            </ul>
          </div>
          <a href="/#tools" className="mt-32 w-full py-10 border border-brand-blue text-brand-blue rounded-btn text-center font-bold text-[14px] hover:bg-brand-blue/5">
            Use Free Tools
          </a>
        </div>

        {/* Pro Plan */}
        <div className="p-32 bg-white dark:bg-surface-dark border-2 border-brand-blue rounded-modal shadow-lg flex flex-col justify-between relative transform scale-[1.02]">
          <span className="absolute top-0 right-32 transform -translate-y-1/2 bg-brand-blue text-white text-[10px] font-bold px-12 py-4 rounded-pill uppercase tracking-wider shadow-sm">
            Most Popular
          </span>
          <div>
            <h3 className="font-bold text-xl mb-8">Pro Plan</h3>
            <p className="text-[13px] text-text-secondaryLight mb-24">Advanced file operations & AI</p>
            <div className="text-3xl font-bold mb-24">
              {cycle === "yearly" ? "₹524" : "₹749"}
              <span className="text-sm font-normal text-text-secondaryLight"> / month</span>
            </div>
            <ul className="flex flex-col gap-12 text-[14px]">
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 200MB File size limit</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Advanced Tesseract OCR</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Gemini AI summarizations</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> GST Hindi Invoice creator</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Stripe checkout & receipts</li>
            </ul>
          </div>
          <div className="mt-32">
            <button className="w-full py-12 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-btn font-bold text-[14px] shadow-btn" type="button">
              Start 7-Day Free Trial
            </button>
            <p className="text-[11px] text-text-secondaryLight/80 text-center mt-12">
              No credit card required • 30-day refund guarantee
            </p>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-8">Enterprise</h3>
            <p className="text-[13px] text-text-secondaryLight mb-24">For departments & large volumes</p>
            <div className="text-3xl font-bold mb-24">Custom</div>
            <ul className="flex flex-col gap-12 text-[14px]">
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Dedicated REST API keys</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> Unlimited processing limits</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> SSO integration & dashboards</li>
              <li className="flex items-center gap-8"><Check className="w-4 h-4 text-brand-success" /> 24/7 SLA response times</li>
            </ul>
          </div>
          <a href="/contact" className="mt-32 w-full py-10 border border-border-light dark:border-border-dark text-center font-bold text-[14px] hover:bg-bg-light dark:hover:bg-surface-dark rounded-btn">
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}
