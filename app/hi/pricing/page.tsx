import React from "react";
import { Metadata } from "next";
import { Check, Shield, Zap, Sparkles, FileText, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "कीमतें — 100% मुफ्त, कोई सीमा नहीं | WeLovePDF",
  description: "WeLovePDF पर हर एक टूल, फीचर और AI असिस्टेंट सभी के लिए पूरी तरह से मुफ्त है। कोई क्रेडिट कार्ड नहीं, कोई सब्सक्रिप्शन नहीं, कोई साइन-अप नहीं।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/pricing",
    languages: {
      en: "https://www.welovepdf.best/pricing",
      hi: "https://www.welovepdf.best/hi/pricing",
      "x-default": "https://www.welovepdf.best/pricing",
    }
  }
};

export default function HindiPricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-24 py-80 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center max-w-[800px] mx-auto mb-64 relative">
        <div className="absolute inset-0 -top-40 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 blur-[64px] rounded-full -z-10 pointer-events-none" />
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-success/10 border border-brand-success/20 rounded-pill text-brand-success font-bold text-[12px] uppercase tracking-wider mb-24">
          <Check className="w-[14px] h-[14px]" /> हमेशा के लिए मुफ़्त
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-text-primaryLight dark:text-text-primaryDark mb-24">
          100% मुफ्त। कोई सीमा नहीं।
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[680px] mx-auto font-medium">
          WeLovePDF पर हर एक टूल, फीचर और AI असिस्टेंट सभी के लिए पूरी तरह से मुफ्त है। कोई क्रेडिट कार्ड नहीं, कोई सब्सक्रिप्शन नहीं, कोई साइन-अप नहीं।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-64">
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <Zap className="w-[24px] h-[24px] text-brand-blue" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">62+ पीडीएफ टूल्स</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              मर्ज, स्प्लिट, कंप्रेस, एडिट, कनवर्ट, पेज डिलीट और वॉटरमार्क। बिना किसी सीमा के पूरी तरह से अनलॉक।
            </p>
          </div>
        </div>
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <Sparkles className="w-[24px] h-[24px] text-brand-amber" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">एआई दस्तावेज़ कार्यक्षेत्र</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              विशाल पाठ्यपुस्तकों का सारांश बनाएं, अनुवाद करें और सीधे अपने दस्तावेज़ों के साथ चैट करें, बिल्कुल मुफ्त।
            </p>
          </div>
        </div>
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <Shield className="w-[24px] h-[24px] text-brand-success" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">100% सुरक्षित सैंडबॉक्स</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              आपकी फाइलें कभी बाहरी सर्वर पर नहीं जातीं। सभी प्रोसेसिंग आपके ब्राउज़र में सुरक्षित रूप से होती है।
            </p>
          </div>
        </div>
        <div className="p-32 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex gap-20 transition-all hover:shadow-card-hover group hover:-translate-y-2 duration-300">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn group-hover:scale-110 transition-transform h-fit">
            <FileText className="w-[24px] h-[24px] text-indigo-500" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">200MB तक की फाइलें</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed font-medium">
              बड़ी फाइलों का समर्थन। बिना एक भी रुपया भुगतान किए उच्च-रिज़ॉल्यूशन स्कैन की गई फाइलों को मर्ज या कंप्रेस करें।
            </p>
          </div>
        </div>
      </div>

      <div className="p-40 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 border border-brand-blue/10 dark:border-indigo-500/10 rounded-modal text-center max-w-3xl mx-auto w-full shadow-sm">
        <div className="flex items-center justify-center gap-12 text-brand-blue dark:text-indigo-400 font-bold mb-12 text-[16px]">
          <Lock className="w-[20px] h-[20px]" />
          <span>निजी, सुरक्षित, और सर्वरलेस</span>
        </div>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[13px] leading-relaxed max-w-[620px] mx-auto font-medium">
          चूंकि WeLovePDF आपके स्थानीय ब्राउज़र सैंडबॉक्स में पूरी तरह से इन-मेमोरी क्लाइंट-साइड चलता है, इसलिए हमें डेटा सर्वर बुनियादी ढांचे की आवश्यकता नहीं है। इसीलिए हमारे उपकरण स्थायी रूप से मुफ़्त हैं।
        </p>
      </div>
    </div>
  );
}
