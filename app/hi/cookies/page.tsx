import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "कुकीज़ और स्टोरेज नीति | WeLovePDF — 100% निजी इन-ब्राउज़र सुरक्षा",
  description: "WeLovePDF की कुकीज़ और लोकल स्टोरेज नीति पढ़ें। हम किसी भी तृतीय-पक्ष विज्ञापन ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं और सभी दस्तावेज़ केवल डिवाइस रैम में प्रोसेस होते हैं।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/cookies",
    languages: {
      en: "https://www.welovepdf.best/cookies",
      hi: "https://www.welovepdf.best/hi/cookies",
      "x-default": "https://www.welovepdf.best/cookies",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/hi/cookies",
    title: "कुकीज़ और स्टोरेज नीति | WeLovePDF",
    description: "WeLovePDF की कुकीज़ नीति पढ़ें। शून्य विज्ञापन कुकीज़, इन-मेमोरी निष्पादन और पूर्ण उपयोगकर्ता गोपनीयता।",
    siteName: "WeLovePDF",
    type: "website",
    locale: "hi_IN",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Cookies Hindi" }],
  },
};

const cookieFaqs = [
  {
    q: "क्या WeLovePDF मेरी पीडीएफ फाइलों को कुकीज़ में सेव करता है?",
    a: "बिल्कुल नहीं। WeLovePDF कभी भी आपकी पीडीएफ फाइलों या किसी भी दस्तावेज़ सामग्री को कुकीज़ या ब्राउज़र स्टोरेज में सेव नहीं करता है। सभी प्रोसेसिंग आपके डिवाइस की रैम (RAM) में अस्थायी रूप से होती है और टैब बंद करते ही डेटा मिट जाता है।"
  },
  {
    q: "WeLovePDF कौन सी कुकीज़ या स्टोरेज का उपयोग करता है?",
    a: "हम केवल आपकी भाषा प्राथमिकता (हिंदी या अंग्रेजी), डार्क/लाइट थीम चयन और कुकी बैनर सहमति को याद रखने के लिए स्थानीय localStorage का उपयोग करते हैं। इसके अलावा अनाम विज़िटर विश्लेषण के लिए Google Analytics का उपयोग किया जाता है।"
  },
  {
    q: "क्या मैं इन कुकीज़ को बंद या डिलीट कर सकता हूँ?",
    a: "हाँ, आप अपने ब्राउज़र सेटिंग्स में जाकर 'Clear Browsing Data' के माध्यम से किसी भी समय सभी कुकीज़ और स्थानीय डेटा हटा सकते हैं। इससे टूल्स की कार्यप्रणाली पर कोई प्रभाव नहीं पड़ेगा।"
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": cookieFaqs.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }))
};

export default function HindiCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
        कुकीज़ और स्टोरेज नीति (Cookies &amp; Storage Policy)
      </h1>
      <p className="text-[13px] text-slate-500 mb-8">
        अंतिम अद्यतन: 18 सितंबर, 2026
      </p>

      <h2>कुकीज़ और लोकल स्टोरेज क्या हैं?</h2>
      <p>
        कुकीज़ (Cookies) छोटी टेक्स्ट फाइलें होती हैं जो आपके वेब ब्राउज़र में संग्रहीत की जाती हैं ताकि वेबसाइटें आपकी प्राथमिकताओं को याद रख सकें। <code>localStorage</code> भी ब्राउज़र का एक सुरक्षित स्टोरेज तंत्र है जो डेटा को आपके ही कंप्यूटर या मोबाइल पर स्थानीय रूप से सुरक्षित रखता है, बिना किसी सर्वर ट्रांसमिशन के।
      </p>

      <h2>WeLovePDF कुकीज़ और स्टोरेज का उपयोग कैसे करता है?</h2>
      <p>
        WeLovePDF <strong>विज्ञापन कुकीज़, क्रॉस-साइट ट्रैकिंग कुकीज़ या तृतीय-पक्ष डेटा ब्रोकर कुकीज़ का उपयोग नहीं करता है</strong>। हमारी वेबसाइट प्राइवेसी-बाय-डिजाइन (Privacy-by-Design) सिद्धांत पर कार्य करती है। हम केवल आपकी उपयोगकर्ता वरीयताओं (जैसे भाषा और थीम) को सहेजने के लिए न्यूनतम स्टोरेज का उपयोग करते हैं।
      </p>

      <h2>उपयोग की जाने वाली कुकीज़ और स्टोरेज तालिका</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-[13px] border border-slate-200 dark:border-slate-800 rounded-lg">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="text-left p-3 font-bold">नाम</th>
              <th className="text-left p-3 font-bold">प्रकार</th>
              <th className="text-left p-3 font-bold">उद्देश्य</th>
              <th className="text-left p-3 font-bold">अवधि</th>
              <th className="text-left p-3 font-bold">पक्ष</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            <tr>
              <td className="p-3 font-mono"><code>lang_pref</code></td>
              <td className="p-3">localStorage</td>
              <td className="p-3">आपकी चुनी हुई भाषा (हिंदी या अंग्रेजी) को याद रखता है</td>
              <td className="p-3">उपयोगकर्ता द्वारा हटाने तक</td>
              <td className="p-3">प्रथम पक्ष (WeLovePDF)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono"><code>theme_pref</code></td>
              <td className="p-3">localStorage</td>
              <td className="p-3">लाइट या डार्क थीम पसंद को याद रखता है</td>
              <td className="p-3">उपयोगकर्ता द्वारा हटाने तक</td>
              <td className="p-3">प्रथम पक्ष (WeLovePDF)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono"><code>cookie_consent</code></td>
              <td className="p-3">localStorage</td>
              <td className="p-3">दर्ज करता है कि आपने सूचना को स्वीकार या देखा है</td>
              <td className="p-3">उपयोगकर्ता द्वारा हटाने तक</td>
              <td className="p-3">प्रथम पक्ष (WeLovePDF)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono"><code>_ga</code></td>
              <td className="p-3">Cookie</td>
              <td className="p-3">Google Analytics — अज्ञात उपयोगकर्ता विज़िट की गणना</td>
              <td className="p-3">2 वर्ष</td>
              <td className="p-3">तृतीय पक्ष (Google)</td>
            </tr>
            <tr>
              <td className="p-3 font-mono"><code>_ga_J28XZEQQ83</code></td>
              <td className="p-3">Cookie</td>
              <td className="p-3">Google Analytics — सत्र स्थिति का रखरखाव</td>
              <td className="p-3">2 वर्ष</td>
              <td className="p-3">तृतीय पक्ष (Google)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>एनालिटिक्स कुकीज़ (Google Analytics 4)</h2>
      <p>
        हम कुल विज़िटर गणना, ब्राउज़र प्रकार और देश सांख्यिकी समझने के लिए Google Analytics 4 का उपयोग करते हैं। इसमें आईपी अनामीकरण (IP Anonymization) सक्रिय है। आपके द्वारा प्रोसेस किए जाने वाले दस्तावेज़ों का कोई भी डेटा या टेक्स्ट कभी भी एनालिटिक्स में नहीं जाता है।
      </p>
      <p>
        <strong>ऑप्ट-आउट (Opt-out):</strong> यदि आप एनालिटिक्स ट्रैकिंग रोकना चाहते हैं, तो आप Google का आधिकारिक{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">
          Google Analytics Opt-out Browser Add-on
        </a>{" "}
        इंस्टॉल कर सकते हैं।
      </p>

      <h2>शून्य दस्तावेज़ कुकीज़ गारंटी (No Document Cookies)</h2>
      <p>
        पारंपरिक क्लाउड कनवर्टर्स के विपरीत, WeLovePDF आपके दस्तावेज़ों को किसी सर्वर पर अपलोड नहीं करता है। सभी 63+ टूल्स (पीडीएफ मर्ज, कंप्रेस, स्प्लिट, ओसीआर, पासवर्ड सुरक्षा आदि) सीधे आपके ब्राउज़र के मेमोरी सैंडबॉक्स (WebAssembly / RAM) में निष्पादित होते हैं। जैसे ही आप ब्राउज़र टैब बंद करते हैं या रीफ्रेश करते हैं, सारा डेटा स्वतः समाप्त हो जाता है।
      </p>

      <h2>ब्राउज़र में कुकीज़ कैसे प्रबंधित करें</h2>
      <p>
        आप किसी भी समय अपने वेब ब्राउज़र की सेटिंग्स से सभी कुकीज़ और localStorage डेटा को हटा सकते हैं:
      </p>
      <ul>
        <li><strong>Google Chrome:</strong> Settings → Privacy and security → Delete browsing data</li>
        <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
        <li><strong>Apple Safari:</strong> Settings → Safari → Clear History and Website Data</li>
        <li><strong>Microsoft Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
      </ul>

      <h2>सामान्य प्रश्न (FAQ)</h2>
      <div className="space-y-4 my-6">
        {cookieFaqs.map((faq, idx) => (
          <div key={idx} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
            <h4 className="font-bold text-[15px] mb-1.5 text-slate-800 dark:text-slate-200">{faq.q}</h4>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed m-0">{faq.a}</p>
          </div>
        ))}
      </div>

      <h2>संपर्क सूत्र</h2>
      <p>
        हमारी गोपनीयता या कुकीज़ नीतियों के संबंध में किसी भी प्रश्न के लिए आप सीधे संस्थापक नीलेश वर्मा से संपर्क कर सकते हैं:{" "}
        <a href="mailto:nileshverma99731@gmail.com" className="text-amber-600 underline">
          nileshverma99731@gmail.com
        </a>
      </p>
    </div>
  );
}
