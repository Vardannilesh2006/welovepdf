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
  "compress-pdf-to-100kb": "Compress PDF to 100KB (UPSC & Govt Forms)",
  "compress-pdf-to-200kb": "Compress PDF to 200KB (SSC CGL & Railway)",
  "compress-pdf-to-50kb": "Compress PDF to 50KB (Photo & Signature)",
  "compress-pdf-to-500kb": "Compress PDF to 500KB (College Admissions)",
  "compress-pdf-for-ssc-upsc": "Govt Exam PDF Compressor (SSC, UPSC)",
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

function getHighCtrTitle(slug: string, name: string): string {
  switch (slug) {
    case "compress-pdf":
      return "Compress PDF Online Free (Unlimited, No 2-File Limit) — WeLovePDF";
    case "compress-pdf-to-100kb":
      return "Compress PDF to 100KB Online (Exact Size for UPSC & Govt Forms) — WeLovePDF";
    case "compress-pdf-to-200kb":
      return "Compress PDF to 200KB Online (For SSC CGL & Railway Forms) — WeLovePDF";
    case "compress-pdf-to-50kb":
      return "Compress PDF to 50KB Online (For Photo & Signature Uploads) — WeLovePDF";
    case "compress-pdf-to-500kb":
      return "Compress PDF to 500KB Online (College & Job Portals) — WeLovePDF";
    case "compress-pdf-for-ssc-upsc":
      return "Govt Exam PDF Compressor (1-Click UPSC, SSC, IBPS Presets) — WeLovePDF";
    case "merge-pdf":
      return "Merge PDF Online Free (Unlimited Pages, No Signup Required) — WeLovePDF";
    case "split-pdf":
      return "Split PDF Online Free (Extract Any Page Range Instantly) — WeLovePDF";
    case "pdf-to-word":
      return "Convert PDF to Word Free (100% Layout & Font Accuracy) — WeLovePDF";
    case "word-to-pdf":
      return "Convert Word to PDF Online (Instant 1-Click DOCX to PDF) — WeLovePDF";
    case "pdf-to-jpg":
      return "Convert PDF to JPG Free (High DPI Image Extraction) — WeLovePDF";
    case "jpg-to-pdf":
      return "Convert JPG to PDF Online (Combine Photos into Single PDF) — WeLovePDF";
    case "pdf-to-excel":
      return "Convert PDF to Excel Free (Accurate Table Extraction) — WeLovePDF";
    case "protect-pdf":
      return "Protect PDF with Password (AES-128 Client-Side Encryption) — WeLovePDF";
    case "unlock-pdf":
      return "Unlock PDF Online (Remove Password & Restrictions Safely) — WeLovePDF";
    case "sign-pdf":
      return "Sign PDF Online Free (Add Digital & Drawn Signatures) — WeLovePDF";
    case "redact-pdf":
      return "Redact PDF Online (Permanently Blackout Confidential Data) — WeLovePDF";
    case "watermark-pdf":
      return "Watermark PDF Online (Add Custom Text Stamp on Pages) — WeLovePDF";
    case "page-numbers":
      return "Add Page Numbers to PDF (Custom Position & Format) — WeLovePDF";
    case "ocr-pdf":
      return "OCR PDF Online (Convert Scanned PDF to Searchable Text) — WeLovePDF";
    case "bates-numbering":
      return "Bates Numbering Online (Legal & Court Document Indexing) — WeLovePDF";
    case "hindi-invoice-generator":
      return "Hindi GST Invoice Generator Online (Free PDF Bill Maker) — WeLovePDF";
    default:
      return `${name} Online Free (100% Private, Zero Cloud Upload) — WeLovePDF`;
  }
}

function getHighCtrDescription(slug: string, name: string, defaultDesc?: string): string {
  switch (slug) {
    case "compress-pdf-to-100kb":
      return "Compress PDF strictly under 100KB online for UPSC, State PSC, and Bank PO online forms. 100% client-side WebAssembly compression with zero quality blur.";
    case "compress-pdf-to-200kb":
      return "Reduce PDF file size under 200KB for SSC CGL, CHSL, Railway, and NTA forms. Instant in-browser compression with zero server uploads.";
    case "compress-pdf-to-50kb":
      return "Compress PDF under 50KB online for signature, thumb impression, and passport photo uploads on Indian government exam portals.";
    case "compress-pdf-for-ssc-upsc":
      return "Dedicated PDF compressor for Indian competitive exam portals (UPSC, SSC, IBPS, NTA). 1-click presets guarantee portal-compliant file sizes.";
    case "merge-pdf":
      return "Merge multiple PDF files into one single document online for free. Unlimited file combinations, zero server uploads, 100% private in-browser memory sandbox.";
    case "split-pdf":
      return "Split PDF pages or extract custom ranges into a new document. Instant client-side processing without uploading confidential files to any cloud server.";
    case "pdf-to-word":
      return "Convert PDF documents into editable Word (DOCX) files with 100% formatting and font fidelity. Works locally in your browser memory sandbox.";
    default:
      return defaultDesc 
        ? `${defaultDesc} 100% free, unlimited, and private in-browser WebAssembly processing with zero server uploads.`
        : `Use ${name} online for free. 100% client-side privacy via WebAssembly sandbox with zero data uploads, no watermarks, and unlimited processing.`;
  }
}

// Generate parameters for static site generation (SSG) for all 62 tools
export async function generateStaticParams() {
  return tools.map((t) => ({
    tool: t.slug,
  }));
}

export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) return {};

  const title = getHighCtrTitle(params.tool, tool.name);
  const desc = getHighCtrDescription(params.tool, tool.name, toolDescriptions[params.tool]);

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
