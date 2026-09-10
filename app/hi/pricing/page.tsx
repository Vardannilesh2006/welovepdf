import React from "react";
import { Metadata } from "next";
import { Check, Shield, Zap, Sparkles, FileText, Lock, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "कीमतें — 100% मुफ्त, कोई सब्सक्रिप्शन नहीं | WeLovePDF",
  description: "WeLovePDF पर हर एक पीडीएफ टूल और एआई फीचर हमेशा के लिए 100% मुफ्त है। कोई क्रेडिट कार्ड नहीं, कोई मासिक शुल्क नहीं, और कोई फ़ाइल सीमा नहीं।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/pricing",
    languages: {
      en: "https://www.welovepdf.best/pricing",
      hi: "https://www.welovepdf.best/hi/pricing",
      "x-default": "https://www.welovepdf.best/pricing",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/pricing",
    title: "कीमतें — 100% मुफ्त, कोई सब्सक्रिप्शन नहीं | WeLovePDF",
    description: "WeLovePDF पर हर एक पीडीएफ टूल और एआई फीचर हमेशा के लिए 100% मुफ्त है। कोई क्रेडिट कार्ड नहीं, कोई मासिक शुल्क नहीं, और कोई फ़ाइल सीमा नहीं।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Free Pricing Hindi" }],
  }
};

const hindiPricingFaqs = [
  {
    question: "क्या WeLovePDF सच में बिना किसी सीमा के 100% मुफ़्त है?",
    answer: "हाँ, पूरी तरह मुफ़्त है। यहाँ कोई 7-दिन का ट्रायल नहीं है, कोई दैनिक फ़ाइल कोटा नहीं है, कोई क्रेडिट कार्ड नहीं मांगा जाता, और न ही कोई पेड प्रो बटन है। सभी ब्राउज़र-आधारित मुख्य टूल्स पूरी तरह असीमित हैं, और सर्वर-साइड AI टूल्स उचित उपयोग (Fair-Use) नीति के तहत चलते हैं।"
  },
  {
    question: "WeLovePDF बिना पैसे लिए मुफ्त टूल्स कैसे दे सकता है?",
    answer: "पारंपरिक ऑनलाइन कन्वर्टर्स आपकी भारी फाइलों को दूरस्थ सर्वर पर अपलोड करते हैं, जिसके चलते उनका सर्वर बिल बहुत अधिक होता है। WeLovePDF आपके ब्राउज़र में वेबअसेंबली के जरिए लोकल प्रोसेसिंग करता है, जिससे सर्वर लागत बहुत कम होती है और हम इसे हमेशा के लिए मुफ़्त रख सकते हैं।"
  },
  {
    question: "क्या कोई फ़ाइल साइज़ या टास्क की सीमा है?",
    answer: "आप अपने ब्राउज़र में 200MB तक के बड़े दस्तावेज़ों को आसानी से प्रोसेस कर सकते हैं। अन्य वेबसाइटों की तरह यहाँ 2 फ़ाइलों के बाद रुकावट नहीं आती।"
  },
  {
    question: "क्या मैं इसे व्यावसायिक या कमर्शियल उपयोग के लिए इस्तेमाल कर सकता हूँ?",
    answer: "हाँ, छात्र, व्यापारी, वकील और फ्रीलांसर बिना किसी लाइसेंस शुल्क के इसका व्यावसायिक और व्यक्तिगत उपयोग कर सकते हैं।"
  }
];

export default function HindiPricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hindiPricingFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-6xl mx-auto px-24 py-64 min-h-[80vh] flex flex-col justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-[800px] mx-auto mb-56 relative">
        <div className="absolute inset-0 -top-40 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 blur-[64px] rounded-full -z-10 pointer-events-none" />
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-success/10 border border-brand-success/20 rounded-pill text-brand-success font-bold text-[12px] uppercase tracking-wider mb-20">
          <Check className="w-[14px] h-[14px]" /> हमेशा के लिए 100% मुफ़्त
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-text-primaryLight dark:text-text-primaryDark mb-20">
          100% मुफ़्त। असीमित उपयोग।
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] sm:text-[18px] leading-relaxed max-w-[680px] mx-auto font-medium">
          WeLovePDF पर हर एक पीडीएफ टूल, कन्वर्शन और एआई असिस्टेंट सभी के लिए पूरी तरह मुफ़्त है। कोई क्रेडिट कार्ड, साइन-अप या मासिक शुल्क नहीं।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-56">
        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <Zap className="w-[24px] h-[24px] text-brand-blue" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">62+ पीडीएफ टूल्स पूरी तरह अनलॉक</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              मर्ज, स्प्लिट, कंप्रेस, रोटेट, वॉटरमार्क और कन्वर्ट। बिना किसी दैनिक सीमा या प्रतीक्षा समय के उपयोग करें।
            </p>
          </div>
        </div>

        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <Sparkles className="w-[24px] h-[24px] text-brand-amber" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">एआई दस्तावेज़ कार्यक्षेत्र</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              किताबों और नोट्स का त्वरित सारांश प्राप्त करें, बिना किसी महंगे मासिक एआई सॉफ्टवेयर शुल्क के।
            </p>
          </div>
        </div>

        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <Shield className="w-[24px] h-[24px] text-emerald-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">100% निजी सैंडबॉक्स</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              आपकी फाइलें कभी किसी रिमोट सर्वर पर अपलोड नहीं होतीं। पूरा कार्य आपके ब्राउज़र में सुरक्षित रूप से होता है।
            </p>
          </div>
        </div>

        <div className="p-28 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card shadow-sm flex gap-20">
          <div className="p-12 bg-surface-light dark:bg-bg-dark rounded-btn h-fit">
            <FileText className="w-[24px] h-[24px] text-indigo-500" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] text-text-primaryLight dark:text-text-primaryDark mb-8">200MB तक की फ़ाइलें समर्थित</h3>
            <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[14px] leading-relaxed">
              बड़े दस्तावेज़ और किताबें बिना किसी हिचकिचाहट के मुफ़्त में प्रोसेस करें।
            </p>
          </div>
        </div>
      </div>

      <div className="border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark p-32 mb-56 shadow-sm overflow-x-auto">
        <h2 className="text-2xl font-bold mb-20 text-text-primaryLight dark:text-text-primaryDark">
          पारंपरिक कन्वर्टर्स बनाम WeLovePDF
        </h2>
        <table className="w-full text-left text-[14px] border-collapse">
          <thead>
            <tr className="border-b border-border-light dark:border-border-dark text-text-secondaryLight">
              <th className="pb-12 font-semibold">सुविधा</th>
              <th className="pb-12 font-bold text-brand-blue">WeLovePDF</th>
              <th className="pb-12 font-medium">अन्य कन्वर्टर्स</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            <tr>
              <td className="py-12 font-medium">मासिक शुल्क</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> ₹0 (आजीवन मुफ़्त)</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> ₹500–₹1,500 / माह</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">दैनिक फ़ाइल सीमा</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> असीमित</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> केवल 2 फ़ाइलें</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">गोपनीयता</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> 100% डिवाइस मेमोरी में</td>
              <td className="py-12 text-text-secondaryLight flex items-center gap-6">क्लाउड सर्वर पर अपलोड</td>
            </tr>
            <tr>
              <td className="py-12 font-medium">अवांछित वॉटरमार्क</td>
              <td className="py-12 text-emerald-600 font-bold flex items-center gap-6"><CheckCircle2 className="w-4 h-4" /> कोई नहीं (साफ़ आउटपुट)</td>
              <td className="py-12 text-rose-500 flex items-center gap-6"><XCircle className="w-4 h-4" /> मुफ्त वर्शन पर जबरन वॉटरमार्क</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-48">
        <div className="flex items-center gap-12 mb-24">
          <HelpCircle className="w-6 h-6 text-brand-blue" />
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
            अक्सर पूछे जाने वाले सवाल (FAQs)
          </h2>
        </div>
        <div className="space-y-16">
          {hindiPricingFaqs.map((faq, index) => (
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
