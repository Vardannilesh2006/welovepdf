import React from "react";
import { notFound } from "next/navigation";
import { tools, toolDescriptions } from "../../data/tools-config";
import { Metadata } from "next";
import { ToolPageContent } from "../../../components/ToolPageContent";

// Generate parameters for static site generation (SSG) for all 62 tools
export async function generateStaticParams() {
  return tools.map((t) => ({
    tool: t.slug,
  }));
}

// Generate unique dynamic metadata per tool
export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) return {};

  const title = `${tool.name} — Free Online Tool | WeLovePDF`;
  const desc = toolDescriptions[params.tool] || `${tool.name} online for free — no file upload, no signup. Runs 100% in your browser sandbox with WeLovePDF.`;

  const top10 = [
    "compress-pdf",
    "merge-pdf",
    "split-pdf",
    "pdf-to-word",
    "word-to-pdf",
    "ocr-pdf",
    "protect-pdf",
    "unlock-pdf",
    "sign-pdf",
    "watermark-pdf"
  ];
  const isTop10 = top10.includes(params.tool);
  const ogImage = isTop10 ? `/images/og/${params.tool}.png` : "/og-image.png";

  return {
    title,
    description: desc.slice(0, 160),
    alternates: {
      canonical: `https://www.welovepdf.best/${params.tool}`,
      languages: {
        en: `https://www.welovepdf.best/${params.tool}`,
        hi: `https://www.welovepdf.best/hi/${params.tool}`,
        "x-default": `https://www.welovepdf.best/${params.tool}`,
      }
    },
    openGraph: {
      title,
      description: desc.slice(0, 160),
      url: `https://www.welovepdf.best/${params.tool}`,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} tool screenshot preview`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc.slice(0, 160),
      images: [ogImage],
    }
  };
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  return <ToolPageContent params={params} lang="en" />;
}
