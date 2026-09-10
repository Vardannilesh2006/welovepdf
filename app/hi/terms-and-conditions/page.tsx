import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "नियम एवं शर्तें | WeLovePDF — दस्तावेज़ टूलकिट",
  description: "WeLovePDF की सेवा की शर्तें पढ़ें। स्वीकार्य उपयोग, उपयोगकर्ता ज़िम्मेदारी, स्थानीय प्रोसेसिंग सीमाएं और कानूनी प्रकटीकरण।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/terms-and-conditions",
    languages: {
      en: "https://www.welovepdf.best/terms-and-conditions",
      hi: "https://www.welovepdf.best/hi/terms-and-conditions",
      "x-default": "https://www.welovepdf.best/terms-and-conditions",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/terms-and-conditions",
    title: "नियम एवं शर्तें | WeLovePDF",
    description: "WeLovePDF की सेवा की शर्तें पढ़ें। स्वीकार्य उपयोग, उपयोगकर्ता ज़िम्मेदारी, स्थानीय प्रोसेसिंग सीमाएं और कानूनी प्रकटीकरण।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Terms Hindi" }],
  },
};

export default function HindiTermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
        नियम एवं शर्तें (Terms &amp; Conditions)
      </h1>
      <p className="text-xs text-text-secondaryLight dark:text-text-secondaryDark mb-8">
        अंतिम अद्यतन: 10 सितंबर 2026 · प्रभावी तिथि: तत्काल
      </p>

      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <strong>WeLovePDF</strong> (<code>https://www.welovepdf.best</code>) पर आपका स्वागत है। हमारी वेबसाइट और पीडीएफ टूल्स का उपयोग करके, आप स्वीकार करते हैं कि आपने इन नियमों और शर्तों को पढ़ लिया है और आप इनसे बंधे रहने के लिए सहमत हैं।
      </p>

      <h2>1. स्वीकार्य उपयोग नीति (Acceptable Use Policy)</h2>
      <p>
        WeLovePDF आपको व्यक्तिगत, शैक्षणिक, व्यावसायिक और व्यावसायिक उपयोग के लिए अपनी उपयोगिताओं का निःशुल्क उपयोग करने का अधिकार प्रदान करता है।
      </p>
      <p>आप निम्नलिखित गतिविधियों के लिए WeLovePDF का उपयोग न करने के लिए सहमत हैं:</p>
      <ul>
        <li>अवैध, हानिकारक, मानहानिकारक या किसी अन्य के बौद्धिक संपदा अधिकारों का उल्लंघन करने वाली सामग्री को प्रोसेस करना।</li>
        <li>वेबसाइट के क्लाइंट-साइड कोड, सुरक्षा तंत्र या रेट-लिमिटर्स को रिवर्स-इंजीनियर करने का प्रयास करना।</li>
        <li>स्क्रैपिंग बॉट्स या ऑटोमेटेड स्क्रिप्ट्स द्वारा सर्वर पर अनुचित लोड डालना।</li>
      </ul>

      <h2>2. उपयोगकर्ता ज़िम्मेदारी और दस्तावेज़ स्वामित्व</h2>
      <p>
        आपके द्वारा प्रोसेस की जाने वाली सभी फाइलों, छवियों और दस्तावेजों का 100% पूर्ण स्वामित्व और कॉपीराइट आपके पास ही रहता है।
      </p>
      <p>
        चूँकि सभी मुख्य संचालन (मर्ज, स्प्लिट, कंप्रेस, कन्वर्ट आदि) सीधे आपके ब्राउज़र की रैम (RAM) में निष्पादित होते हैं, <strong>WeLovePDF आपकी निजी फाइलों को स्टोर, कलेक्ट या एक्सेस नहीं करता है</strong>। आप यह सुनिश्चित करने के लिए पूरी तरह जिम्मेदार हैं कि आपको संबंधित दस्तावेज़ों को प्रोसेस करने का वैध कानूनी अधिकार है।
      </p>

      <h2>3. तकनीकी सीमाएं और अस्वीकरण</h2>
      <p>
        क्लाइंट-साइड वेब प्रोसेसिंग ब्राउज़र और हार्डवेयर की सीमाओं के अधीन है:
      </p>
      <ul>
        <li><strong>ब्राउज़र मेमोरी सीमा:</strong> बहुत बड़ी फाइलों (100MB से अधिक) की प्रोसेसिंग आपके डिवाइस की उपलब्ध रैम क्षमता पर निर्भर करती है।</li>
        <li><strong>रिडैक्शन सुरक्षा:</strong> हमारा रिडैक्शन टूल संवेदनशील टेक्स्ट को स्ट्रिप करता है और विजुअल ब्लैक बॉक्स लागू करता है। अत्यधिक संवेदनशील कानूनी मामलों में उपयोगकर्ताओं को फ़ाइल को स्वतंत्र रूप से सत्यापित करना चाहिए।</li>
        <li><strong>पासवर्ड सुरक्षा:</strong> Protect PDF मानक सुरक्षा हैंडलर लागू करता है। पासवर्ड भूल जाने की स्थिति में इसे हमारी टीम द्वारा पुनर्प्राप्त नहीं किया जा सकता।</li>
      </ul>

      <h2>4. तृतीय-पक्ष सेवाएं और विज्ञापन</h2>
      <p>
        प्लेटफ़ॉर्म को 100% मुफ़्त रखने के लिए, WeLovePDF गैर-दखलअंदाज़ी वाले तृतीय-पक्ष विज्ञापन (जैसे Google AdSense) और अनाम उपयोग विश्लेषण (Google Analytics 4) का उपयोग कर सकता है। ये सेवाएं हमारी गोपनीयता नीति के अनुसार कुकीज़ का उपयोग कर सकती हैं।
      </p>

      <h2>5. दायित्व की सीमा (Limitation of Liability)</h2>
      <p>
        लागू कानून द्वारा अनुमत अधिकतम सीमा तक, WeLovePDF या इसके संस्थापक किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान, डेटा हानि या दस्तावेज़ त्रुटि के लिए उत्तरदायी नहीं होंगे।
      </p>

      <h2>6. संपर्क जानकारी</h2>
      <div className="not-prose p-5 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-lg text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        <p className="font-bold text-slate-900 dark:text-white mb-1">WeLovePDF सहायता डेस्क</p>
        <p>संस्थापक एवं डेवलपर: नीलेश वर्मा</p>
        <p>स्थान: बेतिया, पश्चिम चंपारण, बिहार, भारत</p>
        <p>ईमेल: <a href="mailto:nileshverma99731@gmail.com" className="text-[#D97706] underline font-semibold">nileshverma99731@gmail.com</a></p>
      </div>
    </div>
  );
}
