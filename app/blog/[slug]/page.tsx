import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, blogArticlesHindi, blogGuidesHindi } from "../../data/blog-posts";
import { ChevronLeft } from "lucide-react";

// Generate parameters for static site generation (SSG) for all slugs
export async function generateStaticParams() {
  const englishSlugs = Object.keys(blogArticles);
  const hindiSlugs = Object.keys(blogArticlesHindi);
  const hindiGuidesSlugs = Object.keys(blogGuidesHindi);
  
  const allSlugs = [...englishSlugs, ...hindiSlugs, ...hindiGuidesSlugs];
  return allSlugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for blog details
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const article = blogArticles[slug] || blogArticlesHindi[slug] || blogGuidesHindi[slug];

  if (!article) return {};

  return {
    title: `${article.title} | WeLovePDF Blog`,
    description: article.desc,
    alternates: {
      canonical: `https://welovepdf.best/blog/${slug}`,
    }
  };
}

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const article = blogArticles[slug] || blogArticlesHindi[slug] || blogGuidesHindi[slug];

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.desc,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": "Nilesh Verma"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-16 py-64">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back button */}
      <a 
        href="/blog" 
        className="inline-flex items-center gap-6 text-[13px] text-text-secondaryLight dark:text-text-secondaryDark hover:text-brand-blue mb-24 transition-colors font-semibold"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Articles
      </a>

      {/* Article Header */}
      <div className="mb-32 pb-24 border-b border-border-light dark:border-border-dark/60">
        <span className="px-10 py-4 bg-brand-blue/10 text-brand-blue rounded-pill text-[11px] font-bold uppercase tracking-wider">
          {article.tag}
        </span>
        <p className="text-[12px] text-text-secondaryLight/80 mt-16">{article.date}</p>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight mt-8 mb-12">
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
