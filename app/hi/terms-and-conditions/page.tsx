import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "नियम और शर्तें | WeLovePDF",
  description: "WeLovePDF के नियम और शर्तें पढ़ें। व्यक्तिगत और व्यावसायिक उपयोग के लिए मुफ़्त उपकरण।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/terms-and-conditions",
    languages: {
      en: "https://www.welovepdf.best/terms-and-conditions",
      hi: "https://www.welovepdf.best/hi/terms-and-conditions",
      "x-default": "https://www.welovepdf.best/terms-and-conditions",
    }
  }
};

export default function HindiTermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-16">
        नियम और शर्तें
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-16">
        अंतिम अद्यतन: 28 जून, 2026। WeLovePDF का उपयोग करके, आप स्थानीय सैंडबॉक्स किए गए प्रोसेसिंग सीमाओं से सहमत होते हैं। कोर टूल व्यक्तिगत और व्यावसायिक उपयोग के लिए मुफ्त हैं और सर्वर-साइड अनुरोधों पर उचित उपयोग की सीमाएं लागू हैं।
      </p>
      <h3 className="text-lg font-bold mb-8">वापसी नीति (Refund Policy)</h3>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        चूंकि WeLovePDF बिना किसी पंजीकरण आवश्यकताओं, प्रीमियम सब्सक्रिप्शन या प्रोसेसिंग शुल्क के 100% मुफ्त है, इसलिए कोई भी भुगतान एकत्र नहीं किया जाता है। नतीजतन, कोई धनवापसी नीति लागू नहीं होती है।
      </p>
    </div>
  );
}
