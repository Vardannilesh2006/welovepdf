import React from "react";

/**
 * Base Primitive Skeleton
 * Applies the warm shimmering pulse matching WeLovePDF's aesthetic (#FFF8F2, #EFE1D2, #D97706)
 */
export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton-shimmer rounded-md ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Single Tool Card Skeleton
 * Matches the exact layout of the Homepage Bento Grid tool cards
 */
export function ToolCardSkeleton() {
  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-[#161B2B] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)] min-h-[175px]">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          {/* Icon Box */}
          <Skeleton className="w-11 h-11 rounded-xl" />
          {/* Badge */}
          <Skeleton className="w-14 h-5 rounded-full" />
        </div>
        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded-md mb-2.5" />
        {/* Description (2 lines) */}
        <Skeleton className="h-3.5 w-full rounded mb-1.5" />
        <Skeleton className="h-3.5 w-4/5 rounded" />
      </div>
      {/* Bottom action indicator */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-3 w-3 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Workspace Box Skeleton
 * Matches the drag & drop area inside ToolPageContent / WorkspaceCard
 */
export function WorkspaceSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-[#161B2B] border border-[#EFE1D2] dark:border-slate-800 rounded-[12px] p-6 sm:p-10 text-center my-2 shadow-xs">
      <div className="border-2 border-dashed border-[#EFE1D2] dark:border-slate-700/80 rounded-[10px] p-8 sm:p-12 flex flex-col items-center justify-center bg-[#FAF8F5]/40 dark:bg-slate-900/30">
        {/* Upload Icon circle */}
        <Skeleton className="w-14 h-14 rounded-full mb-4" />
        {/* Prompt headline */}
        <Skeleton className="h-6 w-60 sm:w-72 rounded-lg mb-2.5" />
        {/* Privacy sub-text */}
        <Skeleton className="h-4 w-72 sm:w-96 max-w-full rounded mb-5" />
        {/* Action Button CTA */}
        <Skeleton className="h-11 w-44 rounded-xl shadow-xs mb-4" />
        {/* Privacy & Spec Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Full Tool Page Skeleton
 * Matches app/(english)/[tool]/page.tsx and app/hi/[tool]/page.tsx
 */
export function ToolPageSkeleton({ lang = "en" }: { lang?: "en" | "hi" }) {
  return (
    <div className="w-full min-h-screen bg-[#FFF8F2] dark:bg-[#0A0F1E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-12 rounded" />
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <Skeleton className="h-4 w-14 rounded" />
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <Skeleton className="h-4 w-28 rounded" />
        </div>

        {/* Heading & Badge Section */}
        <div className="mb-5">
          {/* Processing Mode Pill */}
          <div className="mb-3">
            <Skeleton className="h-6 w-44 rounded-full" />
          </div>
          {/* H1 Heading */}
          <Skeleton className="h-9 sm:h-11 w-full max-w-lg rounded-xl mb-3" />
          {/* SEO Subtitle */}
          <Skeleton className="h-4 w-full max-w-2xl rounded mb-2" />
          <Skeleton className="h-4 w-3/4 max-w-xl rounded" />
        </div>

        {/* Workspace Card Skeleton */}
        <WorkspaceSkeleton />

        {/* Content Section: Guide + Sidebar Grid */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column (8 cols): Step-by-Step Guide Skeleton */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-white dark:bg-[#161B2B] border border-border-light dark:border-border-dark rounded-modal shadow-sm">
            {/* Guide H2 */}
            <Skeleton className="h-7 w-64 rounded-lg mb-4" />
            <Skeleton className="h-4 w-full rounded mb-2" />
            <Skeleton className="h-4 w-11/12 rounded mb-6" />

            {/* Spec Table Skeleton */}
            <Skeleton className="h-6 w-48 rounded mb-3" />
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
            </div>

            {/* How-to Steps Skeleton */}
            <Skeleton className="h-6 w-44 rounded mb-3" />
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 rounded-full shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-1/3 rounded" />
                    <Skeleton className="h-3.5 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs / Tips Skeleton */}
            <Skeleton className="h-6 w-40 rounded mb-3" />
            <Skeleton className="h-4 w-full rounded mb-2" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>

          {/* Right Column (4 cols): FAQs & Related Tools Skeleton */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* FAQ Box Skeleton */}
            <div className="p-5 bg-white dark:bg-[#161B2B] border border-border-light dark:border-border-dark rounded-modal shadow-sm">
              <Skeleton className="h-5 w-44 rounded-md mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3.5 border border-border-light dark:border-border-dark rounded-card">
                    <Skeleton className="h-4 w-4/5 rounded mb-2" />
                    <Skeleton className="h-3 w-full rounded mb-1" />
                    <Skeleton className="h-3 w-2/3 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tools Box Skeleton */}
            <div className="p-5 bg-white dark:bg-[#161B2B] border border-border-light dark:border-border-dark rounded-modal shadow-sm">
              <Skeleton className="h-5 w-40 rounded-md mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="p-3.5 border border-border-light dark:border-border-dark rounded-card">
                    <Skeleton className="h-4 w-1/2 rounded mb-1.5" />
                    <Skeleton className="h-3 w-5/6 rounded" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

/**
 * Full Homepage Skeleton
 * Matches app/(english)/page.tsx and app/hi/page.tsx
 */
export function HomePageSkeleton({ lang = "en" }: { lang?: "en" | "hi" }) {
  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] dark:bg-[#0A0F1E] font-sans">
      
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-slate-850 bg-gradient-to-b from-amber-50/40 via-white to-[#FAF8F5] dark:from-[#111728] dark:to-[#0A0F1E]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & Search (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Security Pill */}
              <Skeleton className="h-7 w-72 sm:w-80 rounded-full mb-5" />
              {/* Big Headline */}
              <Skeleton className="h-10 sm:h-14 w-full max-w-md rounded-2xl mb-3" />
              <Skeleton className="h-10 sm:h-14 w-4/5 max-w-sm rounded-2xl mb-5" />
              {/* Sub-headline */}
              <Skeleton className="h-4 sm:h-5 w-full max-w-xl rounded mb-2" />
              <Skeleton className="h-4 sm:h-5 w-3/4 max-w-lg rounded mb-6" />
              {/* Search Bar */}
              <Skeleton className="h-14 w-full max-w-[560px] rounded-xl mb-5 shadow-sm" />
              {/* Quick Launch Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Skeleton className="h-6 w-24 rounded-lg" />
                <Skeleton className="h-6 w-28 rounded-lg" />
                <Skeleton className="h-6 w-20 rounded-lg" />
                <Skeleton className="h-6 w-24 rounded-lg" />
              </div>
              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <Skeleton className="h-12 w-44 rounded-xl" />
                <Skeleton className="h-12 w-48 rounded-xl" />
              </div>
            </div>

            {/* Right Column: Hero Quick Dropzone (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 bg-white dark:bg-[#161B2B] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
                <div className="border-2 border-dashed border-[#EFE1D2] dark:border-slate-700/80 rounded-xl p-8 flex flex-col items-center justify-center">
                  <Skeleton className="w-12 h-12 rounded-full mb-3" />
                  <Skeleton className="h-5 w-44 rounded mb-2" />
                  <Skeleton className="h-3.5 w-60 rounded mb-4" />
                  <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Skeleton className="h-3 w-32 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Metrics Trust Strip Skeleton */}
      <section className="border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161B2B] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {[1, 2, 3, 4].map((stat) => (
              <div key={stat} className="flex flex-col items-center text-center px-4 pt-2 lg:pt-0">
                <Skeleton className="h-9 w-20 rounded mb-2" />
                <Skeleton className="h-3 w-28 rounded mb-1" />
                <Skeleton className="h-2.5 w-20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tool Catalog Section Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <Skeleton className="h-7 w-48 rounded-lg mb-2" />
            <Skeleton className="h-4 w-72 rounded" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((pill) => (
            <Skeleton key={pill} className="h-10 w-28 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Tools Bento Grid (12 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 12 }).map((_, idx) => (
            <ToolCardSkeleton key={idx} />
          ))}
        </div>
      </main>

    </div>
  );
}

/**
 * Blog List Skeleton
 * Matches app/(english)/blog/page.tsx and app/hi/blog/page.tsx
 */
export function BlogListSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="max-w-3xl mb-12">
        <Skeleton className="h-6 w-56 rounded-full mb-4" />
        <Skeleton className="h-10 w-full max-w-lg rounded-xl mb-3" />
        <Skeleton className="h-4 w-full max-w-2xl rounded mb-2" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <article
            key={item}
            className="flex flex-col bg-white dark:bg-[#161B2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Thumbnail Banner */}
            <div className="w-full aspect-[16/9] relative">
              <Skeleton className="w-full h-full rounded-none" />
              <div className="absolute top-3 left-3">
                <Skeleton className="w-16 h-5 rounded-lg" />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <Skeleton className="h-3 w-24 rounded mb-3" />
                <Skeleton className="h-5 w-11/12 rounded mb-2" />
                <Skeleton className="h-5 w-3/4 rounded mb-4" />
                <Skeleton className="h-3.5 w-full rounded mb-1.5" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
