import React from "react";
import { Metadata } from "next";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { getCombinedArticles } from "@/lib/blogger";

export const revalidate = 300; // Revalidate at most every 5 minutes

export const metadata: Metadata = {
  title: "WeLovePDF Document Guides & In-Browser Knowledge Hub",
  description: "Learn how to compress, merge, OCR, and convert documents securely in-memory inside your browser sandbox with zero server uploads.",
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
    title: "WeLovePDF Document Guides & In-Browser Knowledge Hub",
    description: "Learn how to compress, merge, OCR, and convert documents securely in-memory inside your browser sandbox with zero server uploads.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF Blog & Guides" }],
  },
};

export default async function BlogListPage() {
  const articlesList = await getCombinedArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Official In-Browser Knowledge Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading mb-4">
          WeLovePDF Document Guides & Tutorials
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Step-by-step guides on how to compress, merge, protect, and digitize scans securely in-memory inside your browser sandbox — with 100% privacy and zero cloud uploads.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesList.map((art, idx) => (
          <article
            key={art.slug || idx}
            className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all duration-200"
          >
            {/* Thumbnail Banner */}
            <a href={`/blog/${art.slug}`} className="block relative w-full aspect-[16/9] overflow-hidden bg-slate-100">
              {art.thumbnail ? (
                <img
                  src={art.thumbnail}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-amber-600/30" />
                </div>
              )}
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-[11px] rounded-lg shadow-sm">
                {art.tag}
              </span>
            </a>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-2">{art.date}</p>
                <h2 className="font-heading font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-3">
                  <a href={`/blog/${art.slug}`}>{art.title}</a>
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                  {art.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Read Complete Guide
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
