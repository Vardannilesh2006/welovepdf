import React from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Bug, Lightbulb, Clock, CheckCircle2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "सहायता एवं तकनीकी पूछताछ | WeLovePDF",
  description: "तकनीकी सहायता, बग रिपोर्ट या नए टूल सुझावों के लिए WeLovePDF इंजीनियरिंग और सहायता टीम से संपर्क करें।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/contact",
    languages: {
      en: "https://www.welovepdf.best/contact",
      hi: "https://www.welovepdf.best/hi/contact",
      "x-default": "https://www.welovepdf.best/contact",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/contact",
    title: "सहायता एवं तकनीकी पूछताछ | WeLovePDF",
    description: "तकनीकी सहायता, बग रिपोर्ट या नए टूल सुझावों के लिए WeLovePDF इंजीनियरिंग और सहायता टीम से संपर्क करें।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Contact Hindi" }],
  },
};

const hindiContactFaqs = [
  {
    question: "सपोर्ट टीम का सामान्य जवाब समय क्या है?",
    answer: "हमारी टीम संदेशों की लगातार निगरानी करती है। कार्यदिवसों पर आपको आमतौर पर 12 से 24 घंटों के भीतर समाधान मिल जाता है।"
  },
  {
    question: "बग रिपोर्ट करते समय किन बातों का ध्यान रखना चाहिए?",
    answer: "समस्या का शीघ्र समाधान पाने के लिए कृपया अपने ब्राउज़र का नाम, ऑपरेटिंग सिस्टम (Windows/Mac/Android), और फ़ाइल का अनुमानित साइज़ ज़रूर लिखें।"
  },
  {
    question: "क्या मैं नए पीडीएफ फीचर्स का अनुरोध कर सकता हूँ?",
    answer: "हाँ, हम उपयोगकर्ता सुझावों का स्वागत करते हैं और समुदाय की मांग के आधार पर नए टूल्स को प्राथमिकता देते हैं।"
  }
];

export default function HindiContactPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hindiContactFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-[700px] mx-auto mb-48">
        <div className="inline-flex items-center gap-8 px-16 py-6 bg-brand-blue/10 text-brand-blue rounded-pill font-bold text-[12px] uppercase tracking-wider mb-16">
          <MessageSquare className="w-[14px] h-[14px]" /> सहायता केंद्र
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-16">
          सहायता और तकनीकी संपर्क
        </h1>
        <p className="text-[16px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
          क्या आपके पास कोई सवाल है, किसी फ़ाइल में त्रुटि आई है, या नया टूल जोड़ना चाहते हैं? सीधे हमारी तकनीकी टीम से संपर्क करें।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-48">
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Mail className="w-8 h-8 text-brand-blue" />
          <h3 className="font-bold text-[16px]">ईमेल सहायता</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            सामान्य प्रश्नों और सुझावों के लिए सीधे संपर्क करें।
          </p>
          <a
            href="mailto:nileshverma99731@gmail.com"
            className="text-brand-blue hover:underline font-semibold text-[14px] break-all mt-auto"
          >
            nileshverma99731@gmail.com
          </a>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Bug className="w-8 h-8 text-brand-amber" />
          <h3 className="font-bold text-[16px]">बग रिपोर्टिंग</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            यदि कोई दस्तावेज़ सही से नहीं खुला या कंप्रेस नहीं हुआ, तो विवरण साझा करें।
          </p>
          <span className="text-[13px] text-emerald-600 font-medium mt-auto flex items-center gap-6">
            <CheckCircle2 className="w-4 h-4" /> &lt; 24 घंटे में जांच
          </span>
        </div>

        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-12">
          <Lightbulb className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-[16px]">फीचर अनुरोध</h3>
          <p className="text-[13px] text-text-secondaryLight leading-relaxed">
            नए पीडीएफ फॉर्मेट या कस्टम कंप्रेसर साइज के लिए सुझाव दें।
          </p>
          <span className="text-[13px] text-brand-blue font-medium mt-auto flex items-center gap-6">
            <Clock className="w-4 h-4" /> साप्ताहिक अपडेट
          </span>
        </div>
      </div>

      <div className="border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark p-28 mb-48">
        <h2 className="text-xl font-bold mb-16 text-text-primaryLight dark:text-text-primaryDark">
          त्वरित समस्या निवारण मार्गदर्शिका
        </h2>
        <div className="space-y-12 text-[14px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
          <p>ईमेल करने से पहले इन त्वरित चरणों को आज़माएँ:</p>
          <ul className="list-disc pl-20 space-y-8">
            <li><strong>ब्राउज़र अपडेट:</strong> सुनिश्चित करें कि आपका ब्राउज़र (Chrome, Edge, Firefox) नवीनतम संस्करण पर अपडेटेड है ताकि वेबअसेंबली ठीक से काम कर सके।</li>
            <li><strong>पासवर्ड सुरक्षित पीडीएफ:</strong> पासवर्ड वाली फाइलों को पहले हमारे 'Unlock PDF' टूल से अनलॉक करें।</li>
            <li><strong>कैशे साफ़ करें:</strong> नए फीचर्स के ठीक से काम करने के लिए अपने ब्राउज़र का कैशे साफ़ करें।</li>
          </ul>
        </div>
      </div>

      <div className="mb-48">
        <div className="flex items-center gap-12 mb-20">
          <HelpCircle className="w-6 h-6 text-brand-blue" />
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
            सामान्य प्रश्नोत्तर (FAQs)
          </h2>
        </div>
        <div className="space-y-16">
          {hindiContactFaqs.map((faq, index) => (
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
