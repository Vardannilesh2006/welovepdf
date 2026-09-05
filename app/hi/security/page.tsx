import React from "react";
import { Metadata } from "next";
import { Shield, Lock, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "सुरक्षा और गोपनीयता मानक | WeLovePDF",
  description: "जानें कि WeLovePDF स्थानीय क्लाइंट-साइड मेमोरी प्रोसेसिंग के माध्यम से दस्तावेज़ गोपनीयता कैसे बनाए रखता है।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/security",
    languages: {
      en: "https://www.welovepdf.best/security",
      hi: "https://www.welovepdf.best/hi/security",
      "x-default": "https://www.welovepdf.best/security",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/security",
    title: "सुरक्षा और गोपनीयता मानक | WeLovePDF",
    description: "जानें कि WeLovePDF स्थानीय क्लाइंट-साइड मेमोरी प्रोसेसिंग के माध्यम से दस्तावेज़ गोपनीयता कैसे बनाए रखता है।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
  },
};

export default function HindiSecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <div className="flex flex-col items-center text-center gap-12 mb-48">
        <Shield className="w-12 h-12 text-brand-blue" />
        <h1 className="text-4xl font-extrabold tracking-tight">सुरक्षा और गोपनीयता मानक</h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed max-w-[620px]">
          WeLovePDF एक ब्राउज़र-प्रथम आर्किटेक्चर पर बनाया गया है। आपके दस्तावेज़ों की गोपनीयता केवल एक वादा नहीं है; यह एक संरचनात्मक गारंटी है।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-48">
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <EyeOff className="w-8 h-8 text-brand-blue" />
          <h3 className="font-bold text-[16px]">शून्य अपलोड प्रोसेसिंग</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            मर्जिंग, स्प्लिटिंग और कंप्रेसिंग जैसे मुख्य ऑपरेशन आपके स्थानीय ब्राउज़र सैंडबॉक्स के भीतर इन-मेमोरी चलते हैं। कोई भी फ़ाइल बाइट किसी दूरस्थ सर्वर पर नहीं भेजी जाती है।
          </p>
        </div>
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Lock className="w-8 h-8 text-brand-amber" />
          <h3 className="font-bold text-[16px]">सुरक्षित SSL पाइपलाइन्स</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            उन्नत सर्वर टूल (जैसे OCR स्कैनिंग और AI सारांश) के लिए, फाइलें TLS/SSL एंडपॉइंट्स पर प्रेषित की जाती हैं, रैम में संसाधित होती हैं, और तुरंत हटा दी जाती हैं।
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none text-[14px] text-text-secondaryLight leading-relaxed flex flex-col gap-16">
        <h2 className="text-xl font-bold text-text-primaryLight dark:text-text-primaryDark">GDPR अनुपालन</h2>
        <p>
          चूंकि हम उपयोगकर्ता दस्तावेज़ों को संग्रहीत, सूचीबद्ध या अनुक्रमित नहीं करते हैं, इसलिए हमारी प्रोसेसिंग पाइपलाइन सख्त यूरोपीय संघ GDPR सुरक्षा अधिनियमों का अनुपालन करती है। आप हर समय अपनी फाइलों का कुल नियंत्रण बनाए रखते हैं।
        </p>
      </div>
    </div>
  );
}
