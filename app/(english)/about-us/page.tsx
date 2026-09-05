import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Cpu, WifiOff, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — WeLovePDF | Browser-First Document Platform",
  description: "Learn how WeLovePDF was created by Nilesh Verma in Bettiah, Bihar, India to build a completely private, client-side PDF toolkit with zero server uploads.",
  alternates: {
    canonical: "https://www.welovepdf.best/about-us",
    languages: {
      en: "https://www.welovepdf.best/about-us",
      hi: "https://www.welovepdf.best/hi/about-us",
      "x-default": "https://www.welovepdf.best/about-us",
    }
  },
  openGraph: {
    url: "https://www.welovepdf.best/about-us",
    title: "About Us — WeLovePDF | Browser-First PDF Toolkit",
    description: "Learn how WeLovePDF was created by Nilesh Verma in Bettiah, Bihar, India to build a completely private, client-side PDF toolkit with zero server uploads.",
    siteName: "WeLovePDF",
    type: "website",
    images: [{ url: "https://www.welovepdf.best/icon.svg", width: 512, height: 512, alt: "WeLovePDF About Us" }],
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nilesh Verma",
  "jobTitle": "Founder & Lead Developer of WeLovePDF",
  "url": "https://www.welovepdf.best/about-us",
  "sameAs": [
    "https://github.com/Vardannilesh2006",
    "https://www.instagram.com/welovepdf.official/"
  ],
  "homeLocation": {
    "@type": "Place",
    "name": "Bettiah, West Champaran, Bihar, India"
  },
  "description": "Nilesh Verma is a full-stack software developer specialized in browser-first, privacy-focused client-side application architecture.",
  "knowsAbout": ["Software Development", "PDF Processing", "WebAssembly", "JavaScript", "Information Security", "Next.js"]
};

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 prose dark:prose-invert">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      
      <div className="not-prose text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[#D97706] font-semibold text-[12px] rounded-full uppercase tracking-wider mb-3">
          Our Story & Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Building the World&apos;s Most Private PDF Toolkit
        </h1>
        <p className="text-[16px] text-text-secondaryLight dark:text-text-secondaryDark max-w-2xl mx-auto leading-relaxed">
          Created in Bettiah, Bihar, India 🇮🇳 — designed to prove that powerful document tools do not require surrendering your personal files to the cloud.
        </p>
      </div>

      <h2>Why We Built WeLovePDF</h2>
      <p>
        Every single day, hundreds of millions of people upload sensitive tax documents, employment agreements, medical reports, and identity cards to random web converters. Many of these cloud services upload your files to remote storage buckets where they linger in server caches, vulnerable to misconfigured permissions, internal data access, and data breaches.
      </p>
      <p>
        We believed there was a much better way: <strong>the browser is now a full computing environment</strong>. Thanks to modern WebAssembly and high-performance JavaScript engines, your device has more than enough processing power to merge, split, compress, and convert documents locally in milliseconds.
      </p>

      <h2>Our 4 Core Architectural Principles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-8">
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">100% Client-Side Sandbox</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Core operations execute entirely in your browser tab&apos;s volatile RAM. Your document bytes never travel over the internet to our servers.
          </p>
        </div>
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <Cpu className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">WebAssembly Powered</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Near-native binary execution speeds. Merging 50-page documents happens in under 200 milliseconds without network upload lag.
          </p>
        </div>
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <WifiOff className="w-6 h-6 text-amber-600" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">Offline Native</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Once loaded, the tools work smoothly even on intermittent connections, in airplanes, or completely disconnected from the web.
          </p>
        </div>
        <div className="p-5 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-surface-dark flex flex-col gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">Permanently Free</h3>
          <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Because we don&apos;t maintain expensive storage farms for user files, our operating costs are radically lower — allowing us to keep all 63+ tools free forever.
          </p>
        </div>
      </div>

      <h2>Founder &amp; Engineering</h2>
      <div className="p-6 border border-[#E5E7EB] rounded-card bg-white dark:bg-surface-dark flex flex-col sm:flex-row gap-6 items-start not-prose my-6 shadow-sm">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D97706] text-white flex items-center justify-center font-heading font-black text-2xl shadow-sm">
          NV
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white leading-none mb-2">Nilesh Verma</h3>
          <p className="text-[12px] font-heading font-semibold text-[#D97706] uppercase tracking-wider mb-3">Founder &amp; Lead Developer · Bettiah, Bihar, India</p>
          <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Nilesh Verma is an independent full-stack software engineer based in Bettiah, West Champaran, Bihar. Passionate about decentralized web technologies, client-side cryptography, and privacy-respecting software, he built WeLovePDF to offer students, legal practitioners, healthcare professionals, and businesses a completely private, zero-upload document editing suite.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Vardannilesh2006" target="_blank" rel="noopener noreferrer" className="text-[13px] font-heading font-bold text-[#D97706] hover:underline">
              GitHub Profile →
            </a>
            <a href="mailto:nileshverma99731@gmail.com" className="text-[13px] font-heading font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white">
              Contact Nilesh
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

