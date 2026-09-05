import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "अक्सर पूछे जाने वाले प्रश्न | WeLovePDF",
  description: "सुरक्षा, ऑफ़लाइन उपयोग, जीरो सर्वर अपलोड और स्थानीय पीडीएफ प्रोसेसिंग के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर प्राप्त करें।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/faq",
    languages: {
      en: "https://www.welovepdf.best/faq",
      hi: "https://www.welovepdf.best/hi/faq",
      "x-default": "https://www.welovepdf.best/faq",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/faq",
    title: "अक्सर पूछे जाने वाले प्रश्न — WeLovePDF",
    description: "सुरक्षा, ऑफ़लाइन उपयोग, जीरो सर्वर अपलोड और स्थानीय पीडीएफ प्रोसेसिंग के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर प्राप्त करें।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF FAQ Hindi" }],
  }
};

const faqs = [
  {
    q: "क्या मेरी अपलोड की गई फाइलें सुरक्षित हैं?",
    a: "हाँ। पारंपरिक क्लाउड कन्वर्टर्स के विपरीत, WeLovePDF ब्राउज़र-फ़र्स्ट आर्किटेक्चर पर काम करता है। मुख्य उपकरण (मर्ज, स्प्लिट, कंप्रेस, रोटेट, प्रोटेक्ट आदि) आपके स्थानीय वेब ब्राउज़र मेमोरी में चलते हैं। आपकी फाइलें कभी भी बाहरी सर्वर पर अपलोड नहीं होती हैं।"
  },
  {
    q: "क्या WeLovePDF वास्तव में बिना किसी सीमा के 100% मुफ़्त है?",
    a: "हाँ, पूरी तरह से मुफ़्त। कोई सदस्यता योजना नहीं है, कोई दैनिक सीमा नहीं है, कोई वॉटरमार्क नहीं है, और किसी खाते या क्रेडिट कार्ड की आवश्यकता नहीं है।"
  },
  {
    q: "क्या WeLovePDF ऑफ़लाइन काम करता है?",
    a: "हाँ। एक बार पेज लोड होने के बाद, कोर ब्राउज़र-प्रथम टूल बिना किसी सक्रिय इंटरनेट कनेक्शन के पूरी तरह से ऑफ़लाइन काम करते हैं।"
  },
  {
    q: "अधिकतम फ़ाइल आकार क्या समर्थित है?",
    a: "हम इन-ब्राउज़र प्रोसेसिंग के लिए 200MB तक की फ़ाइलों का समर्थन करते हैं। प्रोसेसिंग सीधे आपके डिवाइस की मेमोरी में होती है।"
  },
  {
    q: "प्रोटेक्ट पीडीएफ एन्क्रिप्शन कैसे काम करता है?",
    a: "प्रोटेक्ट पीडीएफ मानक AES-128 एन्क्रिप्शन का उपयोग करता है। पासवर्ड आपके ब्राउज़र मेमोरी में स्थानीय रूप से लगाया जाता है और कभी इंटरनेट पर नहीं भेजा जाता।"
  },
  {
    q: "रिडैक्ट पीडीएफ टूल कैसे काम करता है?",
    a: "रिडैक्ट पीडीएफ टूल चुने गए क्षेत्र पर एक काला विज़ुअल ओवरले बनाता है। कानूनी या संवेदनशील अदालती दस्तावेज़ों के लिए प्रमाणित पेशेवर रिडैक्शन सॉफ़्टवेयर का उपयोग करें।"
  },
  {
    q: "WeLovePDF अन्य क्लाउड कन्वर्टर्स से कैसे अलग है?",
    a: "अन्य साइटें आपके दस्तावेज़ों को क्लाउड सर्वर पर अपलोड करती हैं। WeLovePDF शून्य-अपलोड सिद्धांत पर चलता है, जिससे आपकी फाइलें केवल आपके डिवाइस पर ही रहती हैं।"
  },
  {
    q: "कौन से डिवाइस और ब्राउज़र समर्थित हैं?",
    a: "यह गूगल क्रोम, मोज़िला फ़ायरफ़ॉक्स, ऐप्पल सफारी, माइक्रोसॉफ्ट एज, तथा एंड्रॉइड और आईफोन मोबाइल ब्राउज़र पर सुचारू रूप से काम करता है।"
  },
  {
    q: "क्या आप उपयोगकर्ता दस्तावेज़ों को सहेजते हैं?",
    a: "नहीं। हम दस्तावेज़ों को कभी भी स्टोर, लॉग, ट्रैक या AI मॉडल को प्रशिक्षित करने के लिए उपयोग नहीं करते हैं। टैब बंद करते ही डेटा मिट जाता है।"
  },
  {
    q: "WeLovePDF को किसने विकसित किया है?",
    a: "WeLovePDF को बेतिया, बिहार, भारत के स्वतंत्र सॉफ़्टवेयर डेवलपर नीलेश वर्मा द्वारा विकसित और प्रबंधित किया गया है।"
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          अक्सर पूछे जाने वाले प्रश्न
        </h1>
        <p className="text-[15px] text-text-secondaryLight dark:text-text-secondaryDark max-w-2xl mx-auto">
          हमारे ब्राउज़र-फ़र्स्ट आर्किटेक्चर, गोपनीयता गारंटी और टूल्स के बारे में सभी जानकारी।
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark shadow-sm">
            <h3 className="font-bold text-[16px] mb-2 text-text-primaryLight dark:text-text-primaryDark">{faq.q}</h3>
            <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

