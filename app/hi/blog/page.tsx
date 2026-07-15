import React from "react";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { blogArticlesHindi, blogGuidesHindi } from "../../data/blog-posts";

export const metadata: Metadata = {
  title: "WeLovePDF दस्तावेज़ गाइड और ब्लॉग",
  description: "अपने ब्राउज़र सैंडबॉक्स में सुरक्षित रूप से दस्तावेज़ों को मर्ज, कंप्रेस और ओसीआर करना सीखें।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi/blog",
    languages: {
      en: "https://www.welovepdf.best/blog",
      hi: "https://www.welovepdf.best/hi/blog",
      "x-default": "https://www.welovepdf.best/blog",
    }
  }
};

export default function HindiBlogListPage() {
  const articlesList = [
    ...Object.entries(blogArticlesHindi).map(([slug, art]) => ({ slug, ...art })),
    ...Object.entries(blogGuidesHindi).map(([slug, art]) => ({ slug, ...art }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-16 py-64">
      <div className="max-w-3xl mb-48">
        <h1 className="text-4xl font-extrabold tracking-tight mb-16 flex items-center gap-12 font-heading">
          <BookOpen className="w-8 h-8 text-brand-blue" />
          WeLovePDF दस्तावेज़ गाइड और ब्लॉग
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed">
          अपने ब्राउज़र सैंडबॉक्स में सुरक्षित रूप से दस्तावेज़ों को मर्ज, कंप्रेस और ओसीआर करना सीखें।
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
              <h3 className="font-heading font-bold text-[16px] mt-8 mb-12 text-text-primaryLight dark:text-text-primaryDark line-clamp-2">
                {art.title}
              </h3>
            </div>
            <a 
              href={`/blog/${art.slug}`}
              className="text-[13px] font-bold text-brand-blue hover:underline mt-16 self-start"
            >
              लेख पढ़ें →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
