import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "गोपनीयता नीति | WeLovePDF",
  description: "WeLovePDF की गोपनीयता नीति पढ़ें। हम आपके दस्तावेज़ों को कभी भी बाहरी सर्वर पर अपलोड नहीं करते हैं।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/privacy-policy",
    languages: {
      en: "https://www.welovepdf.best/privacy-policy",
      hi: "https://www.welovepdf.best/hi/privacy-policy",
      "x-default": "https://www.welovepdf.best/privacy-policy",
    }
  }
};

export default function HindiPrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        गोपनीयता नीति
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        अंतिम अद्यतन: 28 जून, 2026। आपकी गोपनीयता हमारे लिए सर्वोपरि है। WeLovePDF आपके दस्तावेज़ों की सामग्री को संग्रहीत, साझा या विश्लेषण नहीं करता है। सभी ब्राउज़र उपकरण बिना किसी डेटा लॉगिंग के आपके क्लाइंट ब्राउज़र मेमोरी सैंडबॉक्स में डेटा संसाधित करते हैं।
      </p>
    </div>
  );
}
