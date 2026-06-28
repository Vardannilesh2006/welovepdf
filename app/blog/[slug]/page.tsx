"use client";

import React from "react";
import { notFound } from "next/navigation";
import { useLang } from "../../../components/LangContext";
import { blogArticles, blogArticlesHindi, blogGuidesHindi } from "../../data/blog-posts";
import { ChevronLeft } from "lucide-react";

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const { lang } = useLang();
  const slug = params.slug;

  // Resolve article
  let article = null;
  
  if (lang === "en") {
    const id = parseInt(slug, 10);
    if (!isNaN(id)) {
      article = blogArticles[id];
    }
  } else {
    const id = parseInt(slug, 10);
    if (!isNaN(id)) {
      article = blogArticlesHindi[id];
    } else {
      article = blogGuidesHindi[slug];
    }
  }

  // Fallback check: if not found in active lang, try cross-checking
  if (!article) {
    const id = parseInt(slug, 10);
    if (!isNaN(id)) {
      article = blogArticles[id] || blogArticlesHindi[id];
    } else {
      article = blogGuidesHindi[slug];
    }
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      {/* Back button */}
      <a 
        href="/blog" 
        className="inline-flex items-center gap-6 text-[13px] text-text-secondaryLight dark:text-text-secondaryDark hover:text-brand-blue mb-24 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {lang === "en" ? "Back to Articles" : "लेखों पर वापस जाएं"}
      </a>

      {/* Article Header */}
      <div className="mb-32 pb-24 border-b border-border-light dark:border-border-dark/60">
        <span className="px-10 py-4 bg-brand-blue/10 text-brand-blue rounded-pill text-[11px] font-bold uppercase tracking-wider">
          {article.tag}
        </span>
        <p className="text-[12px] text-text-secondaryLight/80 mt-16">{article.date}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-8 mb-12">
          {article.title}
        </h1>
      </div>

      {/* Article Body */}
      <article 
        dangerouslySetInnerHTML={{ __html: article.content }}
        className="prose dark:prose-invert max-w-none text-[15px] leading-relaxed text-text-primaryLight dark:text-text-primaryDark flex flex-col gap-16"
      />
    </div>
  );
}
