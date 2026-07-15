import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "अक्सर पूछे जाने वाले प्रश्न | WeLovePDF",
  description: "सुरक्षा, ऑफ़लाइन उपयोग और स्थानीय पीडीएफ प्रोसेसिंग के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर खोजें।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/faq",
    languages: {
      en: "https://www.welovepdf.best/faq",
      hi: "https://www.welovepdf.best/hi/faq",
      "x-default": "https://www.welovepdf.best/faq",
    }
  }
};

const faqs = [
  {
    q: "क्या मेरी अपलोड की गई फाइलें सुरक्षित हैं?",
    a: "हाँ, क्योंकि WeLovePDF आपके ब्राउज़र सैंडबॉक्स में क्लाइंट-साइड चलता है, आपके दस्तावेज़ों को कोर टूल्स के लिए कभी भी सर्वर पर अपलोड नहीं किया जाता है। वे 100% आपके डिवाइस पर रहते हैं।"
  },
  {
    q: "क्या WeLovePDF ऑफ़लाइन काम करता है?",
    a: "हाँ। एक बार पेज लोड होने के बाद, कोर ब्राउज़र-प्रथम टूल बिना किसी सक्रिय इंटरनेट कनेक्शन के पूरी तरह से ऑफ़लाइन काम करते हैं।"
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function HindiFAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-3xl font-extrabold mb-32">
        अक्सर पूछे जाने वाले प्रश्न
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
