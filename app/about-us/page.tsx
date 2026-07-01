"use client";

import React from "react";
import { useLang } from "../../components/LangContext";

export default function AboutUs() {
  const { lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-16 py-64 prose dark:prose-invert">
      <title>{lang === "en" ? "About Us | WeLovePDF" : "हमारे बारे में | WeLovePDF"}</title>
      <meta name="description" content={lang === "en" ? "WeLovePDF is a browser-first document processing platform created in India to build secure client-side tools." : "WeLovePDF भारत में बनाया गया एक सुरक्षित ब्राउज़र-प्रथम दस्तावेज़ प्रसंस्करण प्लेटफ़ॉर्म है।"} />
      <h1 className="text-3xl font-extrabold mb-16">
        {lang === "en" ? "About WeLovePDF" : "WeLovePDF के बारे में"}
      </h1>
      <p className="text-[14px] text-text-secondaryLight leading-relaxed">
        WeLovePDF is a browser-first document processing platform. Created in Bettiah, Bihar, India 🇮🇳, our mission is to build the world's most secure and accessible PDF utilities that run entirely locally in the client tab.
      </p>
    </div>
  );
}
