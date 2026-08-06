import React from "react";
import { notFound } from "next/navigation";
import { tools, toolDescriptions } from "../../data/tools-config";
import { Metadata } from "next";
import { ToolPageContent } from "../../../components/ToolPageContent";

// Action verb lookup for richer keyword-targeted title tags
const toolActionVerbs: Record<string, string> = {
  "merge-pdf": "PDF Merger",
  "split-pdf": "PDF Splitter",
  "compress-pdf": "PDF Compressor",
  "rotate-pdf": "PDF Rotator",
  "delete-pages": "Page Remover",
  "extract-pages": "Page Extractor",
  "reorder-pages": "Page Reorder",
  "crop-pdf": "PDF Cropper",
  "duplicate-pages": "Page Duplicator",
  "add-blank-page": "PDF Page Adder",
  "page-numbers": "PDF Numbering",
  "watermark-pdf": "PDF Watermarker",
  "header-footer": "Header Footer Editor",
  "metadata-editor": "PDF Metadata Editor",
  "flatten-pdf": "PDF Flattener",
  "annotate-pdf": "PDF Annotator",
  "redact-pdf": "PDF Redactor",
  "compare-pdf": "PDF Comparator",
  "bookmark-editor": "Bookmark Editor",
  "grayscale-pdf": "Grayscale Converter",
  "repair-pdf": "PDF Repair",
  "remove-hidden-data": "Metadata Cleaner",
  "deskew-scan": "Scan Deskewer",
  "auto-enhance-scan": "Scan Enhancer",
  "remove-background": "Background Remover",
  "ocr-pdf": "PDF OCR",
  "pdf-to-text": "PDF to Text Converter",
  "pdf-to-markdown": "PDF to Markdown Converter",
  "pdf-to-jpg": "PDF to JPG Converter",
  "pdf-to-png": "PDF to PNG Converter",
  "pdf-to-long-image": "PDF to Image Converter",
  "pdf-to-word": "PDF to Word Converter",
  "pdf-to-excel": "PDF to Excel Converter",
  "pdf-to-powerpoint": "PDF to PowerPoint Converter",
  "pdf-to-html": "PDF to HTML Converter",
  "pdf-to-csv": "PDF to CSV Converter",
  "jpg-to-pdf": "JPG to PDF Converter",
  "png-to-pdf": "PNG to PDF Converter",
  "image-to-pdf": "Image to PDF Converter",
  "word-to-pdf": "Word to PDF Converter",
  "excel-to-pdf": "Excel to PDF Converter",
  "powerpoint-to-pdf": "PowerPoint to PDF Converter",
  "html-to-pdf": "HTML to PDF Converter",
  "markdown-to-pdf": "Markdown to PDF Converter",
  "text-to-pdf": "Text to PDF Converter",
  "url-to-pdf": "URL to PDF Converter",
  "protect-pdf": "PDF Password Protector",
  "unlock-pdf": "PDF Unlocker",
  "sign-pdf": "PDF Signer",
  "verify-signature": "Signature Verifier",
  "bates-numbering": "Bates Numbering",
  "accessibility-checker": "Accessibility Checker",
  "invert-colors": "PDF Color Inverter",
  "pdf-reader": "PDF Reader",
  "search-in-pdf": "PDF Search",
  "ask-pdf": "AI PDF Chat",
  "summarize-pdf": "AI PDF Summarizer",
  "translate-pdf": "AI PDF Translator",
  "quiz-from-pdf": "AI Quiz Generator",
  "invoice-extractor": "Invoice Data Extractor",
  "resume-to-pdf": "Resume to PDF Converter",
  "hindi-invoice-generator": "Hindi GST Invoice Generator",
  "pdf-to-qr": "PDF QR Code Generator",
};

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

  const actionVerb = toolActionVerbs[params.tool] || "PDF Tool";
  const title = `${tool.name} — Free Online ${actionVerb} | WeLovePDF`;
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
