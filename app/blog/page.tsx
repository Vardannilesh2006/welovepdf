"use client";

import React from "react";
import { useLang } from "../../components/LangContext";
import { blogArticles, blogArticlesHindi, blogGuidesHindi } from "../data/blog-posts";
import { BookOpen } from "lucide-react";

export default function BlogList() {
  const { lang } = useLang();

  // Pick articles based on language setting
  const articlesList = lang === "en" 
    ? Object.entries(blogArticles).map(([id, art]) => ({ slug: id, ...art }))
    : [
        ...Object.entries(blogArticlesHindi).map(([id, art]) => ({ slug: id, ...art })),
        ...Object.entries(blogGuidesHindi).map(([slug, art]) => ({ slug, ...art }))
      ];

  const title = lang === "en" ? "WeLovePDF Document Guides & Blog" : "WeLovePDF दस्तावेज़ गाइड और ब्लॉग";
  const desc = lang === "en"
    ? "Learn how to compress, merge, OCR, and digitize scans securely in-memory inside your browser sandbox."
    : "अपने ब्राउज़र सैंडबॉक्स में सुरक्षित रूप से दस्तावेज़ों को मर्ज, कंप्रेस और ओसीआर करना सीखें।";

  return (
    <div className="max-w-7xl mx-auto px-16 py-64">
      <div className="max-w-3xl mb-48">
        <h1 className="text-4xl font-extrabold tracking-tight mb-16 flex items-center gap-12">
          <BookOpen className="w-8 h-8 text-brand-blue" />
          {title}
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
        {articlesList.map((art, idx) => (
          <div key={idx} className="p-24 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark shadow-sm flex flex-col justify-between hover:border-brand-blue transition-colors duration-150">
            <div>
              <span className="text-[10px] bg-brand-blue/10 text-brand-blue font-bold px-8 py-2 rounded-pill uppercase tracking-wider">
                {art.tag}
              </span>
              <p className="text-[11px] text-text-secondaryLight/80 mt-12">{art.date}</p>
              <h3 className="font-bold text-[16px] mt-8 mb-12 text-text-primaryLight dark:text-text-primaryDark line-clamp-2">
                {art.title}
              </h3>
            </div>
            <a 
              href={`/blog/${art.slug}`}
              className="text-[13px] font-bold text-brand-blue hover:underline mt-16 self-start"
            >
              {lang === "en" ? "Read Article →" : "लेख पढ़ें →"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
