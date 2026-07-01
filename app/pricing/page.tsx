"use client";

import React from "react";
import { Check, Shield, Zap, Sparkles, FileText, Lock } from "lucide-react";
import { useLang } from "../../components/LangContext";

export default function Pricing() {
  const { lang } = useLang();

  const title = lang === "en" ? "100% Free. No Limits." : "100% मुफ्त। कोई सीमा नहीं।";
  const subtitle = lang === "en"
    ? "Every single tool, feature, and AI assistant on WeLovePDF is completely free for everyone. No credit cards, no subscriptions, no sign-ups."
    : "WeLovePDF पर हर एक टूल, फीचर और AI असिस्टेंट सभी के लिए पूरी तरह से मुफ्त है। कोई क्रेडिट कार्ड नहीं, कोई सब्सक्रिप्शन नहीं, कोई साइन-अप नहीं।";

  const featuresList = [
    {
      icon: <Zap className="w-[24px] h-[24px] text-brand-blue" />,
      title: lang === "en" ? "62+ PDF Tools" : "62+ पीडीएफ टूल्स",
      desc: lang === "en"
        ? "Merge, split, compress, edit, convert, page delete, and watermark. Fully unlocked with no cap on pages or downloads."
        : "मर्ज, स्प्लिट, कंप्रेस, एडिट, कनवर्ट, पेज डिलीट और वॉटरमार्क। बिना किसी सीमा के पूरी तरह से अनलॉक।"
    },
    {
      icon: <Sparkles className="w-[24px] h-[24px] text-brand-amber" />,
      title: lang === "en" ? "AI Document Workspace" : "एआई दस्तावेज़ कार्यक्षेत्र",
      desc: lang === "en"
        ? "Summarize massive textbooks, translate formats, and chat directly with your files instantly, powered by advanced local processing."
        : "विशाल पाठ्यपुस्तकों का सारांश बनाएं, अनुवाद करें और सीधे अपने दस्तावेज़ों के साथ चैट करें, बिल्कुल मुफ्त।"
    },
    {
      icon: <Shield className="w-[24px] h-[24px] text-brand-success" />,
      title: lang === "en" ? "100% Private Sandbox" : "100% सुरक्षित सैंडबॉक्स",
      desc: lang === "en"
        ? "Your files never touch remote servers. All processing happens locally in your browser, maintaining full security."
        : "आपकी फाइलें कभी बाहरी सर्वर पर नहीं जातीं। सभी प्रोसेसिंग आपके ब्राउज़र में सुरक्षित रूप से होती है।"
    },
    {
      icon: <FileText className="w-[24px] h-[24px] text-indigo-500" />,
      title: lang === "en" ? "Up to 200MB Files" : "200MB तक की फाइलें",
      desc: lang === "en"
        ? "Massive file sizes supported. Merge or compress high-resolution scanned documents without paying a single rupee."
        : "बड़ी फाइलों का समर्थन। बिना एक भी रुपया भुगतान किए उच्च-रिज़ॉल्यूशन स्कैन की गई फाइलों को मर्ज या कंप्रेस करें।"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-24 py-80 min-h-[80vh] flex flex-col justify-center">
      <title>{lang === "en" ? "Pricing — 100% Free, No Limits | WeLovePDF" : "कीमतें — 100% मुफ्त, कोई सीमा नहीं | WeLovePDF"}</title>
      <meta name="description" content={subtitle} />

      
      {/* Premium Header */}
      <div className="text-center max-w-[800px] mx-auto mb-64 relative">
        <div className="absolute inset-0 -top-40 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 blur-[64px] rounded-full -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-success/10 border border-brand-success/20 rounded-pill text-brand-success font-bold text-[12px] uppercase tracking-wider mb-24">
          <Check className="w-[14px] h-[14px]" /> {lang === "en" ? "Zero Cost Forever" : "हमेशा के लिए मुफ़्त"}
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-text-primaryLight dark:text-text-primaryDark mb-24">
          {title}
        </h1>
        
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[680px] mx-auto font-medium">
          {subtitle}
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-64">
        {featuresList.map((f, idx) => (
          <div 
            key={idx} 
            className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300"
          >
            <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
              {f.icon}
            </div>
            <div>
              <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">
                {f.title}
              </h3>
              <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Guarantee Box */}
      <div className="p-40 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 border border-brand-blue/10 dark:border-indigo-500/10 rounded-modal text-center max-w-3xl mx-auto w-full shadow-sm">
        <div className="flex items-center justify-center gap-12 text-brand-blue dark:text-indigo-400 font-bold mb-12 text-[16px]">
          <Lock className="w-[20px] h-[20px]" />
          <span>{lang === "en" ? "Private, Secure, & Serverless" : "निजी, सुरक्षित, और सर्वरलेस"}</span>
        </div>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed max-w-2xl mx-auto font-medium mb-24">
          {lang === "en" 
            ? "WeLovePDF runs core processing in your browser sandbox. We do not store, view, or scan your documents on remote servers. It is the ultimate combination of premium speed and complete privacy."
            : "WeLovePDF आपके ब्राउज़र सैंडबॉक्स में मुख्य प्रोसेसिंग चलाता है। हम आपके दस्तावेज़ों को बाहरी सर्वर पर संग्रहीत, देख या स्कैन नहीं करते हैं।"}
        </p>
        <a 
          href="/#tools" 
          className="inline-flex items-center gap-8 px-28 py-14 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-btn shadow-btn transition-transform active:scale-95 text-[14px]"
        >
          {lang === "en" ? "Start Using All Tools" : "सभी टूल्स का उपयोग शुरू करें"}
        </a>
      </div>

    </div>
  );
}
