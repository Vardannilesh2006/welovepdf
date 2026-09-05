import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "हमारे बारे में | WeLovePDF",
  description: "WeLovePDF भारत में बनाया गया एक सुरक्षित ब्राउज़र-प्रथम दस्तावेज़ प्रसंस्करण प्लेटफ़ॉर्म है।",
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
    title: "हमारे बारे में | WeLovePDF",
    description: "WeLovePDF भारत में बनाया गया एक सुरक्षित ब्राउज़र-प्रथम दस्तावेज़ प्रसंस्करण प्लेटफ़ॉर्म है।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nilesh Verma",
  "jobTitle": "Founder & Lead Developer of WeLovePDF",
  "url": "https://www.welovepdf.best/about-us",
  "sameAs": [
    "https://github.com/Vardannilesh2006"
  ],
  "description": "Nilesh Verma is a full-stack software developer specialized in browser-first, privacy-focused client-side application architecture.",
  "knowsAbout": ["Software Development", "PDF Processing", "WebAssembly", "JavaScript", "Information Security"]
};

export default function HindiAboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <h1 className="text-3xl font-extrabold mb-16">
        WeLovePDF के बारे में
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed mb-32">
        WeLovePDF एक ब्राउज़र-प्रथम दस्तावेज़ प्रसंस्करण प्लेटफ़ॉर्म है। बेतिया, बिहार, भारत 🇮🇳 में निर्मित, हमारा लक्ष्य दुनिया के सबसे सुरक्षित और सुलभ पीडीएफ उपयोगिताओं का निर्माण करना है जो पूरी तरह से स्थानीय स्तर पर क्लाइंट टैब में चलते हैं।
      </p>

      <div className="mt-32 p-24 border border-[#E5E7EB] rounded-card bg-white dark:bg-surface-dark flex flex-col sm:flex-row gap-20 items-start not-prose">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D97706] text-white flex items-center justify-center font-heading font-black text-2xl shadow-sm">
          NV
        </div>
        <div>
          <h2 className="text-lg font-heading font-bold text-slate-900 leading-none mb-8">नीलेश वर्मा</h2>
          <p className="text-[12px] font-heading font-semibold text-[#D97706] uppercase tracking-wider mb-8">संस्थापक और मुख्य डेवलपर</p>
          <p className="text-[13px] text-slate-500 leading-relaxed mb-12">
            नीलेश वर्मा बेतिया, बिहार, भारत में स्थित एक पेशेवर सॉफ्टवेयर डेवलपर हैं। गोपनीयता-प्रथम ब्राउज़र अनुप्रयोगों के निर्माण पर ध्यान केंद्रित करते हुए, उन्होंने दूरस्थ सर्वर अपलोड पीडीएफ प्रोसेसिंग के लिए एक सुरक्षित, मुफ्त और केवल स्थानीय विकल्प प्रदान करने के लिए WeLovePDF डिजाइन किया।
          </p>
          <a href="https://github.com/Vardannilesh2006" target="_blank" rel="noopener noreferrer" className="text-[13px] font-heading font-bold text-slate-500 hover:text-[#D97706] transition-colors">
            गिटहब प्रोफाइल देखें →
          </a>
        </div>
      </div>
    </div>
  );
}
