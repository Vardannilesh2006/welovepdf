import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "गोपनीयता नीति | WeLovePDF",
  description: "WeLovePDF की विस्तृत गोपनीयता नीति। स्थानीय ब्राउज़र सैंडबॉक्सिंग, AI प्रोसेसिंग पारदर्शिता, एनालिटिक्स और विज्ञापन नीतियां।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/privacy-policy",
    languages: {
      en: "https://www.welovepdf.best/privacy-policy",
      hi: "https://www.welovepdf.best/hi/privacy-policy",
      "x-default": "https://www.welovepdf.best/privacy-policy",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/privacy-policy",
    title: "गोपनीयता नीति | WeLovePDF",
    description: "WeLovePDF की विस्तृत गोपनीयता नीति। स्थानीय ब्राउज़र सैंडबॉक्सिंग, AI प्रोसेसिंग पारदर्शिता, एनालिटिक्स और विज्ञापन नीतियां।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Privacy Hindi" }],
  },
};

export default function HindiPrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <h1 className="text-3xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">गोपनीयता नीति (Privacy Policy)</h1>
      <p className="text-[13px] text-slate-500 mb-8 font-medium">अंतिम अद्यतन: 10 सितंबर, 2026</p>

      <h2>1. डेटा नियंत्रक और ऑपरेटर</h2>
      <p>
        <strong>WeLovePDF</strong> का संचालन बेतिया, पश्चिम चंपारण, बिहार, भारत स्थित स्वतंत्र डेवलपर <strong>नीलेश वर्मा</strong> द्वारा किया जाता है। गोपनीयता संबंधी किसी भी प्रश्न के लिए संपर्क करें:{" "}
        <a href="mailto:nileshverma99731@gmail.com" className="text-amber-700 font-semibold underline">nileshverma99731@gmail.com</a>।
      </p>

      <h2>2. मुख्य गोपनीयता गारंटी: लोकल बनाम सर्वर प्रोसेसिंग</h2>
      <p>
        हमारा मूल सिद्धांत है: <em>जो डेटा कभी एकत्र ही नहीं किया जाता, वह कभी लीक या बेचा नहीं जा सकता</em>। हमारे टूल्स को दो श्रेणियों में बांटा गया है:
      </p>

      <h3>2a. मुख्य टूल्स (100% लोकल इन-ब्राउज़र सैंडबॉक्स)</h3>
      <p>
        हमारे 90% से अधिक टूल्स (जैसे <strong>Merge PDF, Split PDF, Compress PDF, PDF to JPG, Rotate PDF, Sign PDF, Protect PDF</strong>) पूरी तरह आपके डिवाइस के वेब ब्राउज़र में वेबअसेंबली के माध्यम से चलते हैं।
      </p>
      <ul>
        <li><strong>कोई फ़ाइल अपलोड नहीं:</strong> आपकी मूल दस्तावेज़ फ़ाइलें कभी भी आपके डिवाइस को नहीं छोड़ती हैं।</li>
        <li><strong>शून्य डेटा संग्रहण:</strong> हम कोई फ़ाइल सर्वर या डेटाबेस नहीं चलाते हैं। ब्राउज़र टैब बंद होते ही मेमोरी साफ़ हो जाती है।</li>
      </ul>

      <h3>2b. AI-सहायक टूल्स (हाइब्रिड और सर्वर प्रोसेसिंग)</h3>
      <p>
        कुछ AI टूल्स (जैसे <strong>Ask PDF, Summarize PDF, Translate PDF</strong>) दस्तावेज़ पाठ को समझने के लिए AI मॉडल का उपयोग करते हैं।
      </p>
      <ul>
        <li>केवल आवश्यक टेक्स्ट को एन्क्रिप्टेड TLS कनेक्शन के माध्यम से <strong>Google Gemini API</strong> को प्रोसेस करने के लिए भेजा जाता है।</li>
        <li>यह डेटा सर्वर मेमोरी (RAM) में अस्थायी रूप से संसाधित होता है और कभी भी डिस्क पर सहेजा नहीं जाता है।</li>
        <li>हमारे डेटा का उपयोग सार्वजनिक AI मॉडलों को प्रशिक्षित करने के लिए <strong>नहीं किया जाता है</strong>।</li>
      </ul>

      <h2>3. स्वचालित रूप से एकत्र की जाने वाली जानकारी</h2>
      <ul>
        <li><strong>Google Analytics 4 (GA4):</strong> विज़िटर की संख्या, उपयोग किए जाने वाले टूल्स और देश के स्तर के आँकड़े। IP पते अज्ञात किए जाते हैं।</li>
        <li><strong>स्थानीय प्राथमिकताएं (localStorage):</strong> भाषा (हिंदी/अंग्रेजी), थीम (लाइट/डार्क), और कुकी सहमति केवल आपके ब्राउज़र में सहेजी जाती है।</li>
      </ul>

      <h2>4. विज्ञापन और तृतीय-पक्ष मुद्रीकरण नीति</h2>
      <p>
        अपने सभी टूल्स को हमेशा के लिए 100% मुफ्त रखने के लिए, WeLovePDF <strong>Google AdSense</strong> जैसे तृतीय-पक्ष विज्ञापन भागीदारों द्वारा वितरित विज्ञापन प्रदर्शित कर सकता है।
      </p>
      <ul>
        <li>तृतीय-पक्ष विक्रेता (Google सहित) उपयोगकर्ता की पिछली विज़िट के आधार पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करते हैं।</li>
        <li>ये कुकीज़ आपके ब्राउज़र को पहचानती हैं, लेकिन <strong>उन्हें आपकी PDF फ़ाइलों या दस्तावेज़ सामग्री तक कोई पहुंच नहीं होती है</strong>।</li>
        <li>उपयोगकर्ता <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-semibold">Google Ads Settings</a> पर जाकर व्यक्तिगत विज्ञापनों से ऑप्ट-आउट कर सकते हैं।</li>
      </ul>

      <h2>5. उपयोगकर्ता अधिकार (GDPR / भारतीय DPDPA)</h2>
      <p>
        आपको अपने डेटा को जानने, सुधारने या हटाने का पूरा अधिकार है। किसी भी अनुरोध के लिए <a href="mailto:nileshverma99731@gmail.com" className="text-amber-700 underline">nileshverma99731@gmail.com</a> पर संपर्क करें।
      </p>
    </div>
  );
}
