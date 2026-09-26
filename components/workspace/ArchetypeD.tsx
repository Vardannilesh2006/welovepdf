"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  X,
  Plus,
  Shield,
  ArrowRight,
  FileSpreadsheet,
  FileCode,
  Image as ImageIcon,
  Zap,
  RefreshCw,
  Sparkles,
  Layers,
} from "lucide-react";
import PdfPreviewCard from "./PdfPreviewCard";

interface ArchetypeDProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  files: { id: string; name: string; size: number; file: File }[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  onProcess: (options: any) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
}

export default function ArchetypeD({
  toolSlug,
  toolName,
  lang,
  files,
  onAddFiles,
  onRemoveFile,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
}: ArchetypeDProps) {
  const [imageDpi, setImageDpi] = useState("150");
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const [ocrEnabled, setOcrEnabled] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const isBatchImageTool = ["jpg-to-pdf", "png-to-pdf", "image-to-pdf"].includes(toolSlug);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Target Format Metadata & Brand Styling
  const getFormatDetails = () => {
    if (toolSlug.includes("word")) {
      return { name: "Word Document", ext: ".doc", color: "bg-[#2B579A] text-white", border: "border-[#2B579A]", badge: "DOCX / DOC" };
    }
    if (toolSlug.includes("excel") || toolSlug.includes("csv")) {
      return { name: "Excel Spreadsheet", ext: ".csv", color: "bg-[#217346] text-white", border: "border-[#217346]", badge: "XLSX / CSV" };
    }
    if (toolSlug.includes("powerpoint")) {
      return { name: "PowerPoint Slides", ext: ".pptx", color: "bg-[#D24726] text-white", border: "border-[#D24726]", badge: "PPTX" };
    }
    if (toolSlug.includes("jpg") || toolSlug.includes("png") || toolSlug.includes("long-image")) {
      return { name: "Image Format", ext: toolSlug.includes("png") ? ".png" : ".jpg", color: "bg-purple-600 text-white", border: "border-purple-600", badge: "JPG / PNG" };
    }
    if (toolSlug.includes("markdown") || toolSlug.includes("text")) {
      return { name: "Plain Text / MD", ext: toolSlug.includes("markdown") ? ".md" : ".txt", color: "bg-slate-800 text-white", border: "border-slate-800", badge: "TXT / MD" };
    }
    if (toolSlug.includes("html")) {
      return { name: "HTML Webpage", ext: ".html", color: "bg-amber-600 text-white", border: "border-amber-600", badge: "HTML5" };
    }
    return { name: "PDF Document", ext: ".pdf", color: "bg-[#E8792A] text-white", border: "border-[#E8792A]", badge: "PDF (ISO 32000)" };
  };

  const formatMeta = getFormatDetails();

  const getDownloadFilename = (slug: string) => {
    switch (slug) {
      case "pdf-to-powerpoint":
        return "converted-presentation.pptx";
      case "pdf-to-word":
        return "converted-document.doc";
      case "pdf-to-excel":
        return "converted-sheet.csv";
      case "pdf-to-csv":
        return "converted-data.csv";
      case "pdf-to-text":
        return "extracted-text.txt";
      case "pdf-to-markdown":
        return "extracted-document.md";
      case "pdf-to-html":
        return "extracted-page.html";
      case "pdf-to-jpg":
        return "converted-page.jpg";
      case "pdf-to-png":
        return "converted-page.png";
      case "pdf-to-long-image":
        return "combined-pages.png";
      default:
        return `${slug}-output.pdf`;
    }
  };

  const getAcceptedFormats = (slug: string) => {
    if (isBatchImageTool) return "image/*,.jpg,.jpeg,.png,.webp";
    if (slug === "word-to-pdf") return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (slug === "excel-to-pdf") return ".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (slug === "powerpoint-to-pdf") return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
    return ".pdf,application/pdf";
  };

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {lang === "hi" ? "कन्वर्ज़न पूरा हुआ!" : "Conversion Complete!"}
        </h3>
        <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : "converted your document with high structural fidelity."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={getDownloadFilename(toolSlug)}
            className="px-7 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "फ़ाइल डाउनलोड करें" : `Download ${formatMeta.name}`}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3.5 border border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-xl transition-colors"
          >
            {lang === "hi" ? "दूसरा फ़ाइल कन्वर्ट करें" : "Convert Another File"}
          </button>
        </div>
      </div>
    );
  }

  // EMPTY STATE / HERO DROPZONE
  if (files.length === 0) {
    return (
      <div
        className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-6 sm:p-10 text-center my-2 shadow-sm transition-all"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <label
          className={`cursor-pointer block border-2 border-dashed rounded-2xl p-8 sm:p-14 transition-all ${
            isDragging
              ? "border-[#E8792A] bg-[#FBF1E9] scale-[1.01] shadow-md"
              : "border-[#EFE1D2] hover:border-[#E8792A]/70 bg-gradient-to-b from-[#FBF1E9]/40 to-transparent hover:bg-[#FBF1E9]/20"
          }`}
        >
          <input
            type="file"
            multiple={isBatchImageTool}
            accept={getAcceptedFormats(toolSlug)}
            className="hidden"
            onChange={handleFileInput}
          />

          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#E8792A]/15 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-[#E8792A]/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#E8792A] to-[#F59E0B] rounded-2xl flex items-center justify-center text-white shadow-md">
              {isBatchImageTool ? <ImageIcon className="w-10 h-10" /> : <FileText className="w-10 h-10" />}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#262B36] mb-2 tracking-tight">
            {isDragging
              ? lang === "hi"
                ? "यहाँ फ़ाइल छोड़ें!"
                : "Drop file here!"
              : lang === "hi"
              ? "फ़ाइल चुनें या यहाँ ड्रैग करें"
              : `Select file for ${toolName}`}
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] mb-6 max-w-lg mx-auto">
            {lang === "hi"
              ? "100% मुफ़्त और सुरक्षित। स्थानीय इन-ब्राउज़र कन्वर्ज़न इंजन।"
              : "Convert documents instantly with preserved layout, formatting, and vector fidelity."}
          </p>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>{lang === "hi" ? "फ़ाइल चुनें" : "Select Document"}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E8792A]" /> High-Accuracy Engine
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Client-Side Privacy
            </span>
          </div>
        </label>
      </div>
    );
  }

  // ACTIVE CONVERSION STUDIO
  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Visual Transformation Banner: [ Input Format ] ──► [ Output Format ] */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10">
            <FileText className="w-4 h-4 text-[#E8792A]" />
            <span>{isBatchImageTool ? "Images" : "PDF Document"}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs ${formatMeta.color}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{formatMeta.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span>{files.length} {files.length === 1 ? "file loaded" : "files loaded"}</span>
          <button
            onClick={onReset}
            className="text-slate-400 hover:text-white px-2 py-1 transition-colors text-xs underline"
          >
            Change File
          </button>
        </div>
      </div>

      {/* Main Conversion Stage */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Column: File Cards Grid */}
        <div className="flex-1 flex flex-col min-h-[420px] p-5 sm:p-6 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((f, idx) => (
              <div
                key={f.id}
                className="bg-white border border-[#EFE1D2] rounded-xl p-3 flex flex-col justify-between hover:border-[#E8792A] hover:shadow-md transition-all relative group"
              >
                <span className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-[#E8792A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {idx + 1}
                </span>

                <div className="aspect-[3/4] w-full rounded-lg mb-2 overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center">
                  <PdfPreviewCard file={f.file} />
                </div>

                <span className="text-xs font-semibold text-[#262B36] truncate text-center block mb-1">
                  {f.name}
                </span>

                <div className="flex items-center justify-between border-t border-[#EFE1D2] pt-2 text-[11px] text-[#78716C]">
                  <span>{Math.round(f.size / 1024)} KB</span>
                  <button
                    onClick={() => onRemoveFile(f.id)}
                    className="text-[#78716C] hover:text-red-600 transition-colors p-1"
                    title="Remove File"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {isBatchImageTool && (
              <label className="cursor-pointer border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] bg-white hover:bg-[#FBF1E9]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center aspect-[3/4] transition-all group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
                <div className="w-10 h-10 rounded-full bg-[#E8792A]/10 text-[#E8792A] group-hover:scale-110 flex items-center justify-center mb-2 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#262B36]">Add Images</span>
              </label>
            )}
          </div>
        </div>

        {/* Right Settings & Conversion Options */}
        <div className="w-full lg:w-[320px] lg:min-w-[320px] bg-white border-t lg:border-t-0 lg:border-l border-[#EFE1D2] p-5 flex flex-col justify-between shrink-0 gap-5">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block border-b pb-2 border-[#EFE1D2]">
              Conversion Options
            </span>

            {/* OCR Mode Option */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#262B36]">OCR Text Extraction</span>
                <input
                  type="checkbox"
                  checked={ocrEnabled}
                  onChange={(e) => setOcrEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#E8792A] rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-[#78716C] leading-snug">
                Extracts text from scanned pages using local optical character recognition.
              </p>
            </div>

            {/* Resolution Selector for Image Outputs */}
            {toolSlug.startsWith("pdf-to-") && (
              <div>
                <label className="block text-xs font-semibold text-[#262B36] mb-1.5">
                  Output Resolution
                </label>
                <select
                  value={imageDpi}
                  onChange={(e) => setImageDpi(e.target.value)}
                  className="w-full text-xs font-medium text-[#262B36] bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E8792A]"
                >
                  <option value="150">Standard Web (150 DPI) — Smaller Size</option>
                  <option value="300">High Resolution Print (300 DPI) — Ultra Crisp</option>
                </select>
              </div>
            )}

            {/* Orientation & Page Size for Image to PDF */}
            {isBatchImageTool && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#262B36] mb-1">
                    Page Orientation
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOrientation("portrait")}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                        orientation === "portrait"
                          ? "bg-[#E8792A] text-white border-[#E8792A]"
                          : "bg-slate-50 border-[#EFE1D2] text-[#262B36]"
                      }`}
                    >
                      Portrait
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrientation("landscape")}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                        orientation === "landscape"
                          ? "bg-[#E8792A] text-white border-[#E8792A]"
                          : "bg-slate-50 border-[#EFE1D2] text-[#262B36]"
                      }`}
                    >
                      Landscape
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#262B36] mb-1">
                    Page Size
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                    className="w-full text-xs font-medium text-[#262B36] bg-slate-50 border border-[#EFE1D2] rounded-lg p-2.5"
                  >
                    <option value="a4">A4 (Standard 210 x 297 mm)</option>
                    <option value="letter">US Letter (8.5 x 11 in)</option>
                    <option value="fit">Fit to Image Proportions</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA & Privacy Assurance */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onProcess({ imageDpi, pageSize, orientation, ocrEnabled })}
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Converting Document...</span>
                </>
              ) : (
                <>
                  <span>Convert to {formatMeta.name} →</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] text-center">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% In-Browser Privacy</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
