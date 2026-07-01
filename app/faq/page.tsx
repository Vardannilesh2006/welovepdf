"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function FAQ() {
  const { lang } = useLang();

  const faqs = [
    {
      q: "Are my uploaded files safe?",
      a: "Yes, because WeLovePDF runs client-side in your browser sandbox, your documents are never uploaded to a server for core tools. They stay 100% on your device."
    },
    {
      q: "Does WeLovePDF work offline?",
      a: "Yes. Once the page is loaded, core browser-first tools operate fully offline without any active internet connection."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <title>{lang === "en" ? "Frequently Asked Questions | WeLovePDF" : "अक्सर पूछे जाने वाले प्रश्न | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "Find answers to popular questions about WeLovePDF offline capability, browser processing, and document safety." : "सुरक्षा, ऑफ़लाइन उपयोग और स्थानीय पीडीएफ प्रोसेसिंग के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर खोजें।"} />
      <h1 className="text-3xl font-extrabold mb-32">
        {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
      </h1>
      <div className="flex flex-col gap-16">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
            <h3 className="font-bold text-[16px] mb-8">{faq.q}</h3>
            <p className="text-[14px] text-text-secondaryLight leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
