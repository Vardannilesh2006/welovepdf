"use client";

import React, { useState } from "react";
import {
  Globe,
  FileCode,
  AlignLeft,
  CheckCircle2,
  Upload,
  FileText,
  Shield,
  Zap,
  Sparkles,
  Download,
  RefreshCw,
} from "lucide-react";

interface ArchetypeEProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  onProcess: (data: { text: string; pageSize: string; orientation: string }) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
}

export default function ArchetypeE({
  toolSlug,
  toolName,
  lang,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
}: ArchetypeEProps) {
  const [inputText, setInputText] = useState("");
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");

  // Default sample texts
  const sampleContent =
    toolSlug === "url-to-pdf"
      ? "https://www.welovepdf.best"
      : toolSlug === "html-to-pdf"
      ? "<h1>WeLovePDF Invoice</h1>\n<p>Rendered locally with browser vector printing.</p>\n<ul>\n  <li>100% Free</li>\n  <li>Zero Server Storage</li>\n</ul>"
      : toolSlug === "markdown-to-pdf"
      ? "# WeLovePDF Document\n\n## Features\n- **100% Free & Local** in-browser processing\n- Preserved vector formatting\n- Clean typography & print layout"
      : "Welcome to WeLovePDF Text to PDF converter.\n\nType or paste any plain text here to instantly generate a crisp, printable PDF document.";

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {lang === "hi" ? "पीडीएफ तैयार है!" : "PDF Generated Successfully!"}
        </h3>
        <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : "rendered your content into a clean PDF document."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-7 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {lang === "hi" ? "पीडीएफ डाउनलोड करें" : "Download Generated PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3.5 border border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-xl transition-colors"
          >
            {lang === "hi" ? "नया कंटेंट डालें" : "Convert More Content"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Top Studio Bar */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          {toolSlug === "url-to-pdf" ? (
            <Globe className="w-5 h-5 text-[#E8792A]" />
          ) : toolSlug === "html-to-pdf" ? (
            <FileCode className="w-5 h-5 text-[#E8792A]" />
          ) : (
            <AlignLeft className="w-5 h-5 text-[#E8792A]" />
          )}
          <span className="text-xs sm:text-sm font-semibold text-[#262B36]">
            {toolName} Studio
          </span>
          <span className="text-[10px] text-[#E8792A] bg-white border border-[#EFE1D2] px-2 py-0.5 rounded-full font-bold uppercase">
            Live Vector Render
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-white border border-[#EFE1D2] rounded-lg px-2 py-1">
            <span className="text-[#78716C]">Size:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              className="bg-transparent font-semibold text-[#262B36] focus:outline-none"
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#EFE1D2] rounded-lg px-2 py-1">
            <span className="text-[#78716C]">Layout:</span>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              className="bg-transparent font-semibold text-[#262B36] focus:outline-none"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor & Content Canvas */}
      <div className="p-5 sm:p-7 space-y-4">
        {toolSlug === "url-to-pdf" ? (
          <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <label className="block text-xs font-bold text-[#262B36] uppercase tracking-wider">
              Enter Webpage URL to Capture
            </label>
            <div className="flex items-center gap-2 bg-white border border-[#EFE1D2] focus-within:border-[#E8792A] rounded-xl px-3 py-1.5 shadow-2xs">
              <Globe className="w-5 h-5 text-[#78716C]" />
              <input
                type="url"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full text-xs sm:text-sm text-[#262B36] bg-transparent py-2.5 px-1 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-[#78716C]">
              Renders the full HTML web page, layout styles, and assets into an A4 printable vector PDF.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#262B36] uppercase tracking-wider text-[11px]">
                {toolName.replace(" to PDF", "")} Content Editor
              </label>
              <button
                type="button"
                onClick={() => setInputText(sampleContent)}
                className="text-[11px] text-[#E8792A] hover:underline font-semibold"
              >
                Insert Sample Template
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type or paste your ${toolName.replace(" to PDF", "")} text here...`}
              rows={12}
              className="w-full text-xs font-mono text-[#262B36] bg-slate-50 border border-[#EFE1D2] rounded-xl p-4 focus:outline-none focus:border-[#E8792A] focus:bg-white resize-none shadow-inner leading-relaxed"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#EFE1D2]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#78716C]">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client-Side In-Browser Vector Rendering</span>
          </div>

          <button
            onClick={() => onProcess({ text: inputText || sampleContent, pageSize, orientation })}
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Vector PDF...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate PDF from {toolName.replace(" to PDF", "")} →</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
