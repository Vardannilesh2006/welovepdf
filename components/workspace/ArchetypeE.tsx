"use client";

import React, { useState } from "react";
import { Globe, FileCode, AlignLeft, CheckCircle2, Upload, FileText } from "lucide-react";

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
      ? "<h1>WeLovePDF Invoice</h1><p>Processed with local browser engines.</p>"
      : toolSlug === "markdown-to-pdf"
      ? "# WeLovePDF Document\n- 100% Free\n- Local Browser Sandbox"
      : "Welcome to WeLovePDF Text Converter.";

  if (resultUrl) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-6 text-center shadow-none my-2">
        <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-[#262B36] mb-1">
          {lang === "hi" ? "पीडीएफ तैयार है!" : "PDF Generated Successfully!"}
        </h3>
        <p className="text-sm text-[#9C9488] mb-6">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : "converted your input into a clean PDF."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-6 py-3 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "पीडीएफ डाउनलोड करें" : "Download PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-5 py-3 border-[0.5px] border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-lg transition-colors"
          >
            {lang === "hi" ? "नया कंटेंट डालें" : "Convert Another Text"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-5 my-2 flex flex-col gap-3 max-h-[calc(100vh-140px)]">
      
      {/* Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FBF1E9]/60 border-[0.5px] border-[#EFE1D2] rounded-lg p-2.5 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          {toolSlug === "url-to-pdf" ? <Globe className="w-4 h-4 text-[#E8792A]" /> : <FileCode className="w-4 h-4 text-[#E8792A]" />}
          <span className="font-medium text-[#262B36]">{toolName} Editor</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-[#9C9488]">Page:</span>
            <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="bg-white border-[0.5px] border-[#EFE1D2] rounded px-2 py-1">
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#9C9488]">Orientation:</span>
            <select value={orientation} onChange={(e) => setOrientation(e.target.value)} className="bg-white border-[0.5px] border-[#EFE1D2] rounded px-2 py-1">
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor / URL Input Area (Internal Scroll) */}
      {toolSlug === "url-to-pdf" ? (
        <div className="py-6 px-4 bg-[#FBF1E9]/20 border-[0.5px] border-[#EFE1D2] rounded-lg">
          <label className="block text-xs font-medium text-[#262B36] mb-1.5">Webpage URL</label>
          <input
            type="url"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="https://example.com"
            className="w-full text-sm text-[#262B36] bg-white border-[0.5px] border-[#EFE1D2] rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E8792A]"
          />
        </div>
      ) : (
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type or paste your ${toolName.replace(" to PDF", "")} content here...`}
          rows={10}
          className="w-full text-xs font-mono text-[#262B36] bg-[#FBF1E9]/10 border-[0.5px] border-[#EFE1D2] rounded-lg p-3 focus:outline-none focus:border-[#E8792A] resize-none overflow-y-auto min-h-[180px] max-h-[40vh]"
        />
      )}

      {/* Convert CTA */}
      <button
        onClick={() => onProcess({ text: inputText || sampleContent, pageSize, orientation })}
        disabled={isProcessing}
        className="w-full py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
      >
        {isProcessing ? "Generating PDF..." : `Generate PDF from ${toolName.replace(" to PDF", "")}`}
      </button>

    </div>
  );
}
