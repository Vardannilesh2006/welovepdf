import React from "react";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { blogArticles } from "../../data/blog-posts";

export const metadata: Metadata = {
  title: "WeLovePDF Document Guides & Blog",
  description: "Learn how to compress, merge, OCR, and digitize scans securely in-memory inside your browser sandbox.",
  alternates: {
    canonical: "https://www.welovepdf.best/blog",
    languages: {
      en: "https://www.welovepdf.best/blog",
      hi: "https://www.welovepdf.best/hi/blog",
      "x-default": "https://www.welovepdf.best/blog",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/blog",
    title: "WeLovePDF Document Guides & Blog",
    description: "Learn how to compress, merge, OCR, and digitize scans securely in-memory inside your browser sandbox.",
    siteName: "WeLovePDF",
    type: "website",
  },
};

export default function BlogListPage() {
  const articlesList = Object.entries(blogArticles)
    .map(([slug, art]) => ({ slug, ...art }))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // newest first
    });

  return (
    <div className="max-w-7xl mx-auto px-16 py-64">
      <div className="max-w-3xl mb-48">
        <h1 className="text-4xl font-extrabold tracking-tight mb-16 flex items-center gap-12 font-heading">
          <BookOpen className="w-8 h-8 text-brand-blue" />
          WeLovePDF Document Guides & Blog
        </h1>
        <p className="text-text-secondaryLight dark:text-text-secondaryDark text-[16px] leading-relaxed">
          Learn how to compress, merge, OCR, and digitize scans securely in-memory inside your browser sandbox.
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
              Read Article →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
