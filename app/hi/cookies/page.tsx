import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "कुकीज़ और स्टोरेज नीति | WeLovePDF",
  description: "WeLovePDF की कुकीज़ नीति पढ़ें। हम किसी भी तृतीय-पक्ष ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/cookies",
    languages: {
      en: "https://www.welovepdf.best/cookies",
      hi: "https://www.welovepdf.best/hi/cookies",
      "x-default": "https://www.welovepdf.best/cookies",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/cookies",
    title: "कुकीज़ और स्टोरेज नीति | WeLovePDF",
    description: "WeLovePDF की कुकीज़ नीति पढ़ें। हम किसी भी तृतीय-पक्ष ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Cookies Hindi" }],
  },
};

export default function HindiCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        कुकीज़ और स्टोरेज
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        अंतिम अद्यतन: 28 जून, 2026। WeLovePDF आपके भाषा चयन सेटिंग और थीम पसंद को संग्रहीत करने के लिए localStorage का उपयोग करता है। हम किसी भी तृतीय-पक्ष ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं और न ही उपयोगकर्ता दस्तावेज़ों की कुकीज़ संग्रहीत करते हैं।
      </p>
    </div>
  );
}
