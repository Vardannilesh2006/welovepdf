import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Cpu, WifiOff, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "हमारे बारे में — WeLovePDF | सुरक्षित ब्राउज़र-प्रथम पीडीएफ प्लेटफॉर्म",
  description: "जानें कि कैसे WeLovePDF को नीलेश वर्मा द्वारा बेतिया, बिहार, भारत में एक सुरक्षित और 100% निजी पीडीएफ टूलकिट के रूप में बनाया गया था।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/about-us",
    languages: {
      en: "https://www.welovepdf.best/about-us",
      hi: "https://www.welovepdf.best/hi/about-us",
      "x-default": "https://www.welovepdf.best/about-us",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/about-us",
    title: "हमारे बारे में — WeLovePDF | ब्राउज़र-प्रथम पीडीएफ टूलकिट",
    description: "जानें कि कैसे WeLovePDF को नीलेश वर्मा द्वारा बेतिया, बिहार, भारत में एक सुरक्षित और 100% निजी पीडीएफ टूलकिट के रूप में बनाया गया था।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF About Us Hindi" }],
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nilesh Verma",
  "jobTitle": "Founder & Lead Developer of WeLovePDF",
  "url": "https://www.welovepdf.best/about-us",
  "sameAs": [
    "https://github.com/Vardannilesh2006",
    "https://www.instagram.com/welovepdf.official/"
  ],
  "homeLocation": {
    "@type": "Place",
    "name": "Bettiah, West Champaran, Bihar, India"
  },
  "description": "नीलेश वर्मा एक पेशेवर पूर्ण-स्टैक सॉफ़्टवेयर डेवलपर हैं जो गोपनीयता-प्रथम, स्थानीय ब्राउज़र अनुप्रयोगों में विशेषज्ञता रखते हैं।",
  "knowsAbout": ["Software Development", "PDF Processing", "WebAssembly", "JavaScript", "Information Security", "Next.js"]
};

export default function HindiAboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      <div className="not-prose text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[#D97706] font-semibold text-[12px] rounded-full uppercase tracking-wider mb-3">
          हमारा मिशन और कहानी
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          दुनिया का सबसे सुरक्षित पीडीएफ टूलकिट
        </h1>
        <p className="text-[16px] text-text-secondaryLight dark:text-text-secondaryDark max-w-2xl mx-auto leading-relaxed">
          बेतिया, बिहार, भारत 🇮🇳 में निर्मित — यह साबित करने के लिए कि शक्तिशाली दस्तावेज़ उपकरणों के लिए आपकी निजी फ़ाइलों को क्लाउड पर अपलोड करने की आवश्यकता नहीं है।
        </p>
      </div>

      <h2>हमने WeLovePDF क्यों बनाया</h2>
      <p>
        हर दिन, लाखों लोग संवेदनशील कर दस्तावेज़, अनुबंध, मेडिकल रिपोर्ट और पहचान पत्र ऑनलाइन कन्वर्टर्स पर अपलोड करते हैं। इनमें से कई सेवाएं आपकी फ़ाइलों को दूरस्थ सर्वर पर भेजती हैं जहां डेटा लीक होने का जोखिम बना रहता है।
      </p>
      <p>
        हमारा मानना था कि एक बेहतर तरीका संभव है: आधुनिक वेबअसेंबली और जावास्क्रिप्ट इंजन के साथ, आपके अपने कंप्यूटर या फ़ोन के ब्राउज़र में ही दस्तावेज़ों को बिना किसी सर्वर अपलोड के मिलीसेकंड में प्रोसेस करने की पूरी शक्ति है।
      </p>

      <h2>हमारे 4 मुख्य वास्तुशिल्प सिद्धांत</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-8">
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">100% क्लाइंट-साइड सैंडबॉक्स</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            सभी कार्य आपके ब्राउज़र टैब की अस्थायी रैम में होते हैं। आपकी फ़ाइलें कभी भी इंटरनेट पर हमारे सर्वर पर नहीं भेजी जाती हैं।
          </p>
        </div>
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <Cpu className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">वेबअसेंबली शक्ति</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            तेज़ गति। बड़ी फ़ाइलों को मर्ज करना या कंप्रेस करना बिना अपलोडिंग देरी के तुरंत होता है।
          </p>
        </div>
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <WifiOff className="w-6 h-6 text-amber-600" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">ऑफ़लाइन सक्षम</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            एक बार लोड होने के बाद, टूल बिना इंटरनेट कनेक्शन या हवाई जहाज मोड में भी सुचारू रूप से काम करते हैं।
          </p>
        </div>
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">हमेशा के लिए मुफ़्त</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            चूंकि हम उपयोगकर्ता फ़ाइलों के लिए महंगे सर्वर नहीं चलाते हैं, इसलिए हमारे सभी 63+ टूल पूरी तरह से मुफ़्त हैं।
          </p>
        </div>
      </div>

      <h2>संस्थापक और इंजीनियरिंग</h2>
      <div className="p-6 border border-[#E5E7EB] rounded-card bg-white dark:bg-surface-dark flex flex-col sm:flex-row gap-6 items-start not-prose my-6 shadow-sm">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D97706] text-white flex items-center justify-center font-heading font-black text-2xl shadow-sm">
          NV
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white leading-none mb-2">नीलेश वर्मा</h3>
          <p className="text-[12px] font-heading font-semibold text-[#D97706] uppercase tracking-wider mb-3">संस्थापक और मुख्य डेवलपर · बेतिया, बिहार, भारत</p>
          <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            नीलेश वर्मा बेतिया, पश्चिम चंपारण, बिहार में स्थित एक स्वतंत्र सॉफ़्टवेयर इंजीनियर हैं। गोपनीयता-सम्मानित और विकेंद्रीकृत वेब प्रौद्योगिकियों के समर्थक, उन्होंने छात्रों, अधिवक्ताओं और पेशेवरों को एक सुरक्षित, शून्य-अपलोड दस्तावेज़ संपादक प्रदान करने के लिए WeLovePDF का निर्माण किया।
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Vardannilesh2006" target="_blank" rel="noopener noreferrer" className="text-[13px] font-heading font-bold text-[#D97706] hover:underline">
              गिटहब प्रोफाइल →
            </a>
            <a href="mailto:nileshverma99731@gmail.com" className="text-[13px] font-heading font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white">
              संपर्क करें
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

