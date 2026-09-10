import React from "react";
import { Metadata } from "next";
import { Shield, Lock, EyeOff, Cpu, CheckCircle2, ServerOff, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "सुरक्षा और दस्तावेज़ गोपनीयता मानक | WeLovePDF",
  description: "जानें कि कैसे WeLovePDF शून्य-सर्वर क्लाइंट-साइड वेबअसेंबली प्रोसेसिंग, GDPR अनुपालन और ब्राउज़र सैंडबॉक्स के माध्यम से दस्तावेज़ गोपनीयता की गारंटी देता है।",
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
    title: "सुरक्षा और दस्तावेज़ गोपनीयता मानक | WeLovePDF",
    description: "जानें कि कैसे WeLovePDF शून्य-सर्वर क्लाइंट-साइड वेबअसेंबली प्रोसेसिंग, GDPR अनुपालन और ब्राउज़र सैंडबॉक्स के माध्यम से दस्तावेज़ गोपनीयता की गारंटी देता है।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Security Hindi" }],
  },
};

const hindiSecurityFaqs = [
  {
    question: "क्या WeLovePDF आपकी अपलोड की गई फाइलों को सेव या पढ़ता है?",
    answer: "बिल्कुल नहीं। हमारे 90% से अधिक ऑपरेशन्स (पीडीएफ मर्ज, स्प्लिट, कंप्रेस, रोटेट, वॉटरमार्क) आपके डिवाइस के ब्राउज़र रैम में वेबअसेंबली (WebAssembly) तकनीक से चलते हैं। आपकी फाइल का एक भी बाइट किसी क्लाउड सर्वर पर नहीं भेजा जाता।"
  },
  {
    question: "ब्राउज़र सैंडबॉक्स प्रोसेसिंग कैसे काम करती है?",
    answer: "जब आप WeLovePDF पर कोई फाइल चुनते हैं, तो आपका ब्राउज़र आवश्यक कोड लाइब्रेरी को केवल आपके डिवाइस पर लोड करता है। सभी संपादन आपके कंप्यूटर या मोबाइल के सीपीयू द्वारा किए जाते हैं। ब्राउज़र टैब बंद करते ही सारा डेटा मेमोरी से तुरंत नष्ट हो जाता है।"
  },
  {
    question: "क्या सरकारी या वित्तीय दस्तावेज़ प्रोसेस करना सुरक्षित है?",
    answer: "हाँ, पूरी तरह सुरक्षित है। चूंकि आधार कार्ड, पैन कार्ड, बैंक स्टेटमेंट और कानूनी अनुबंध आपके डिवाइस से बाहर नहीं जाते, इसलिए डेटा चोरी या लीक होने का कोई जोखिम नहीं रहता।"
  },
  {
    question: "क्या WeLovePDF अंतर्राष्ट्रीय डेटा नियमों (GDPR) का पालन करता है?",
    answer: "हाँ। GDPR के अनुच्छेद 25 और 32 के तहत डेटा संरक्षण सिद्धांतों का पूर्ण अनुपालन किया जाता है। हम किसी भी तीसरे पक्ष के साथ कोई डेटा या फाइल साझा नहीं करते हैं।"
  }
];

export default function HindiSecurityPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hindiSecurityFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-5xl mx-auto px-16 py-64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col items-center text-center gap-12 mb-48">
        <div className="p-16 bg-brand-blue/10 text-brand-blue rounded-full">
          <Shield className="w-12 h-12" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          सुरक्षा और दस्तावेज़ गोपनीयता मानक
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[700px]">
          WeLovePDF एक सख्त <strong>जीरो-नॉलेज आर्किटेक्चर</strong> पर आधारित है। आपके दस्तावेज़, पहचान पत्र और निजी फाइलें आपके डिवाइस से कभी बाहर नहीं जाती हैं।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-48">
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Cpu className="w-8 h-8 text-brand-blue" />
          <h3 className="font-bold text-[18px]">लोकल डिवाइस प्रोसेसिंग</h3>
          <p className="text-[14px] text-text-secondaryLight leading-relaxed">
            मर्ज, स्प्लिट, कंप्रेस और रोटेट जैसे मुख्य टूल्स आपके कंप्यूटर या फोन की मेमोरी में निष्पादित होते हैं। कोई क्लाउड अपलोड नहीं होता।
          </p>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <ServerOff className="w-8 h-8 text-brand-amber" />
          <h3 className="font-bold text-[18px]">शून्य फाइल स्टोरेज</h3>
          <p className="text-[14px] text-text-secondaryLight leading-relaxed">
            हम कोई भी स्थायी डेटाबेस या फाइल सर्वर नहीं रखते। आपकी फाइलों को कभी भी संग्रहीत, कैशे या एआई मॉडल ट्रेनिंग के लिए उपयोग नहीं किया जाता।
          </p>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Lock className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-[18px]">256-बिट एन्क्रिप्शन</h3>
          <p className="text-[14px] text-text-secondaryLight leading-relaxed">
            उन्नत टूल्स (जैसे ओसीआर और एआई सारांश) के लिए संचार TLS 1.3 एन्क्रिप्टेड चैनलों पर होता है और 60 सेकंड के भीतर रैम से हटा दिया जाता है।
          </p>
        </div>
      </div>

      <div className="border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark p-32 mb-48">
        <h2 className="text-2xl font-bold mb-16 text-text-primaryLight dark:text-text-primaryDark">
          आपके संवेदनशील दस्तावेज़ों की सुरक्षा प्रणाली
        </h2>
        <div className="space-y-16 text-[15px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
          <p>
            पारंपरिक ऑनलाइन कन्वर्टर्स के विपरीत जो आपकी निजी फाइलों को विदेशी सर्वरों पर अपलोड करते हैं, WeLovePDF आधुनिक वेबअसेंबली के माध्यम से पूरा काम आपके ब्राउज़र में ही पूरा करता है। चाहे आप बैंक फॉर्म, कॉलेज डिग्री या सरकारी प्रमाण पत्र बदल रहे हों, डेटा पर आपका पूरा नियंत्रण रहता है।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 pt-8">
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>पृथक ब्राउज़र सैंडबॉक्स:</strong> हर प्रक्रिया एक अलग वेब वर्कर में चलती है, जिससे क्रॉस-टैब डेटा लीक नहीं होता।</span>
            </div>
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>GDPR अनुपालन:</strong> अंतर्राष्ट्रीय गोपनीयता कानूनों और डेटा न्यूनीकरण नियमों का पूर्ण पालन।</span>
            </div>
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>बिना लॉगिन के उपयोग:</strong> किसी खाते को बनाने, ईमेल देने या पासवर्ड दर्ज करने की कोई आवश्यकता नहीं है।</span>
            </div>
            <div className="flex items-start gap-12">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-2" />
              <span><strong>शून्य ट्रैकिंग:</strong> हम आपकी फाइलों का कोई मेटाडेटा या व्यक्तिगत विवरण ट्रैक नहीं करते हैं।</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-48">
        <div className="flex items-center gap-12 mb-24">
          <HelpCircle className="w-6 h-6 text-brand-blue" />
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
            अक्सर पूछे जाने वाले सुरक्षा प्रश्न (FAQs)
          </h2>
        </div>
        <div className="space-y-16">
          {hindiSecurityFaqs.map((faq, index) => (
            <div key={index} className="p-20 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark">
              <h3 className="font-bold text-[16px] text-text-primaryLight dark:text-text-primaryDark mb-8">
                {faq.question}
              </h3>
              <p className="text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
