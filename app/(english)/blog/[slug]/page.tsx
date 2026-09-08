import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, User, ShieldCheck, ArrowRight } from "lucide-react";
import { getCombinedArticles, getArticleBySlug } from "@/lib/blogger";
import { blogArticlesHindi, blogGuidesHindi } from "../../../data/blog-posts";
import "../blog-article.css";

export const dynamicParams = true; // Allow new Blogger posts to be served on demand
export const revalidate = 300; // 5 minutes ISR cache

export async function generateStaticParams() {
  const articles = await getCombinedArticles();
  const hindiSlugs = Object.keys(blogArticlesHindi);
  const hindiGuidesSlugs = Object.keys(blogGuidesHindi);

  const allSlugs = [
    ...articles.map((a) => a.slug),
    ...hindiSlugs,
    ...hindiGuidesSlugs,
  ];

  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const rawArticle =
    (await getArticleBySlug(slug)) ||
    blogArticlesHindi[slug] ||
    blogGuidesHindi[slug];

  if (!rawArticle) return {};

  const article = rawArticle as {
    title: string;
    desc: string;
    thumbnail?: string;
  };

  const canonicalUrl = `https://www.welovepdf.best/blog/${slug}`;
  const isHindi = !("source" in rawArticle) && !!(blogArticlesHindi[slug] || blogGuidesHindi[slug]);
  const ogImageUrl = article.thumbnail || "https://www.welovepdf.best/icon.svg";

  return {
    title: `${article.title} | WeLovePDF Guides`,
    description: article.desc,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: isHindi
        ? { hi: canonicalUrl, "x-default": canonicalUrl }
        : { en: canonicalUrl, "x-default": canonicalUrl },
    },
    openGraph: {
      title: `${article.title} | WeLovePDF Guides`,
      description: article.desc,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImageUrl }],
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const rawArticle =
    (await getArticleBySlug(slug)) ||
    blogArticlesHindi[slug] ||
    blogGuidesHindi[slug];

  if (!rawArticle) {
    notFound();
  }

  const article = rawArticle as {
    title: string;
    desc: string;
    content: string;
    date: string;
    tag: string;
    thumbnail?: string;
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.desc,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "WeLovePDF Editorial Team",
      url: "https://www.welovepdf.best",
    },
    publisher: {
      "@type": "Organization",
      name: "WeLovePDF",
      logo: {
        "@type": "ImageObject",
        url: "https://www.welovepdf.best/icon.svg",
      },
    },
  };

  const thumbnail = article.thumbnail;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back Button */}
      <a
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Knowledge Hub
      </a>

      {/* Article Header */}
      <header className="mb-8 pb-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
            {article.tag}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Client-Side Guide
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {article.date}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            WeLovePDF Team
          </span>
        </div>
      </header>

      {/* Hero Featured Thumbnail */}
      {thumbnail && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[1200/630] bg-slate-50">
          <img
            src={thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Body (In-Site Reader) */}
      <article
        dangerouslySetInnerHTML={{ __html: String(article.content) }}
        className="blog-article-content blogger-premium-article max-w-none text-[16px] sm:text-[17px] leading-relaxed"
      />

      {/* In-Site Tool CTA Card */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
            Need to Process Your PDF Securely?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg">
            Use WeLovePDF’s 63+ in-browser tools. Everything runs locally in your device sandbox with zero server uploads and zero paywalls.
          </p>
        </div>
        <a
          href="/#workspace"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm whitespace-nowrap"
        >
          Open Free Tools
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
