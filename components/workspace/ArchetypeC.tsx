"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, Sliders, Shield } from "lucide-react";

interface ArchetypeCProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  fileName: string;
  fileSize: number;
  pageCount: number;
  previewUrl?: string;
  onProcess: (options: any) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
  onAddFile: (files: File[]) => void;
}

export default function ArchetypeC({
  toolSlug,
  toolName,
  lang,
  fileName,
  fileSize,
  pageCount,
  previewUrl,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
  onAddFile,
}: ArchetypeCProps) {
  // Tool-specific local states
  const [compressLevel, setCompressLevel] = useState<number>(70);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkPos, setWatermarkPos] = useState("center");
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);
  const [password, setPassword] = useState("");
  const [ocrLang, setOcrLang] = useState("eng");

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  // Estimated output size for compress-pdf
  const estimatedSizeKB = Math.round(((fileSize / 1024) * compressLevel) / 100);

  if (resultUrl) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-6 text-center shadow-none my-2">
        <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-[#262B36] mb-1">
          {lang === "hi" ? "आपकी फ़ाइल तैयार है!" : "Your PDF is Ready!"}
        </h3>
        <p className="text-sm text-[#9C9488] mb-6">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : "completed successfully."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-6 py-3 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "डाउनलोड करें" : "Download PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-5 py-3 border-[0.5px] border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-lg transition-colors"
          >
            {lang === "hi" ? "दूसरी फ़ाइल बदलें" : "Process Another File"}
          </button>
        </div>
      </div>
    );
  }

  if (!fileName) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-8 text-center my-2">
        <label className="cursor-pointer block border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] rounded-xl p-10 transition-colors bg-[#FBF1E9]/30">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-[#262B36] mb-1">
            {lang === "hi" ? "पीडीएफ फ़ाइल चुनें" : "Select PDF for " + toolName}
          </h3>
          <p className="text-xs text-[#9C9488] mb-4">
            {lang === "hi" ? "100% मुफ़्त और सुरक्षित। फ़ाइलें ब्राउज़र में ही प्रोसेस होती हैं।" : "100% free & local browser processing. No upload."}
          </p>
          <span className="inline-block px-5 py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors">
            {lang === "hi" ? "फ़ाइल चुनें" : "Choose File"}
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] overflow-hidden my-2 flex flex-col max-h-[calc(100vh-140px)]">
      
      {/* Horizontal File Strip */}
      <div className="bg-[#FBF1E9] border-b [border-bottom-width:0.5px] border-[#EFE1D2] px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="text-sm font-medium text-[#262B36] truncate">{fileName}</span>
          <span className="text-xs text-[#9C9488] bg-white border-[0.5px] border-[#EFE1D2] px-2 py-0.5 rounded-full shrink-0">
            {pageCount} pages · {Math.round(fileSize / 1024)} KB
          </span>
        </div>
        <button onClick={onReset} className="text-xs text-[#9C9488] hover:text-[#262B36]">
          Change File
        </button>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left/Main Column: Settings Form & Action Pinned Below */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-4">
          
          <div className="space-y-4 flex-1">
            <span className="text-xs font-medium text-[#262B36] block border-b pb-1.5 border-[#EFE1D2]">
              {toolName} Configuration
            </span>

            {/* Compress PDF */}
            {toolSlug === "compress-pdf" && (
              <div className="space-y-3 max-w-md text-xs">
                <div className="flex justify-between">
                  <span className="font-medium text-[#262B36]">Compression Level</span>
                  <span className="text-[#E8792A] font-medium">{compressLevel}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={compressLevel}
                  onChange={(e) => setCompressLevel(Number(e.target.value))}
                  className="w-full accent-[#E8792A]"
                />
                <div className="flex justify-between text-[#9C9488]">
                  <span>Original: {Math.round(fileSize / 1024)} KB</span>
                  <span className="font-medium text-[#262B36]">Est. Output: ~{estimatedSizeKB} KB</span>
                </div>
              </div>
            )}

            {/* Watermark PDF */}
            {toolSlug === "watermark-pdf" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-w-lg">
                <div>
                  <label className="block text-[#262B36] font-medium mb-1">Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
                  />
                </div>
                <div>
                  <label className="block text-[#262B36] font-medium mb-1">Position</label>
                  <select
                    value={watermarkPos}
                    onChange={(e) => setWatermarkPos(e.target.value)}
                    className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
                  >
                    <option value="center">Center Diagonal</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
              </div>
            )}

            {/* Protect / Unlock PDF */}
            {(toolSlug === "protect-pdf" || toolSlug === "unlock-pdf") && (
              <div className="space-y-2 text-xs max-w-sm">
                <label className="block text-[#262B36] font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-2 focus:border-[#E8792A]"
                />
              </div>
            )}

            {/* OCR PDF */}
            {toolSlug === "ocr-pdf" && (
              <div className="text-xs max-w-xs">
                <label className="block text-[#262B36] font-medium mb-1">Language</label>
                <select
                  value={ocrLang}
                  onChange={(e) => setOcrLang(e.target.value)}
                  className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-2 focus:border-[#E8792A]"
                >
                  <option value="eng">English</option>
                  <option value="hin">Hindi (हिन्दी)</option>
                </select>
              </div>
            )}
          </div>

          {/* Bottom Action Button (Pinned to Left below settings) */}
          <div className="pt-4 border-t [border-top-width:0.5px] border-[#EFE1D2] shrink-0">
            <button
              onClick={() => onProcess({ compressLevel, watermarkText, watermarkPos, password, ocrLang })}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? "Processing..." : `Apply ${toolName}`}
            </button>
          </div>

        </div>

        {/* Right Sidebar for Preassurance Visual & Local Sandbox notice */}
        <div className="w-full md:w-[280px] md:min-w-[280px] bg-[#FBF1E9]/30 border-t md:border-t-0 md:border-l [border-left-width:0.5px] border-[#EFE1D2] p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-3 border border-dashed border-[#EFE1D2] rounded-lg bg-white">
            <span className="text-[11px] font-medium text-[#9C9488] mb-2">1st Page Preview</span>
            <div className="w-24 aspect-[3/4] bg-[#FBF1E9]/40 border-[0.5px] border-[#EFE1D2] rounded p-2 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <FileText className="w-8 h-8 text-[#E8792A]/50" />
              )}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] text-center mt-4">
            <Shield className="w-4 h-4 text-[#E8792A] mx-auto mb-1" />
            <p className="text-[11px] text-[#9C9488] leading-tight font-medium">
              100% Client-Side Local Sandbox
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
