import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "सहायता और संपर्क | WeLovePDF",
  description: "तकनीकी पूछताछ के लिए WeLovePDF सहायता टीम से संपर्क करें।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/contact",
    languages: {
      en: "https://www.welovepdf.best/contact",
      hi: "https://www.welovepdf.best/hi/contact",
      "x-default": "https://www.welovepdf.best/contact",
    }
  }
};

export default function HindiContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        सहायता डेस्क
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        कोई प्रश्न हैं या तकनीकी सहायता की आवश्यकता है? हमारे डेवलपर को <a href="mailto:nileshverma99731@gmail.com" className="text-brand-blue hover:underline">nileshverma99731@gmail.com</a> पर एक ईमेल भेजें। हम आम तौर पर 24 घंटे के भीतर जवाब देते हैं।
      </p>
    </div>
  );
}
