"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, Sliders, Shield, Eye, Lock, Stamp, Hash, Info, Sun, ImageOff, ScanText } from "lucide-react";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [batesPrefix, setBatesPrefix] = useState("DOC-");
  const [batesDigits, setBatesDigits] = useState(6);
  const [ocrLang, setOcrLang] = useState("eng");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaAuthor, setMetaAuthor] = useState("");

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  // Estimated output size for compress-pdf
  const estimatedSizeKB = Math.round(((fileSize / 1024) * compressLevel) / 100);

  // 1. Result State
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

  // 2. Empty State Dropzone
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

  // 3. Active Workspace Layout (Compact File Strip + Settings Panel + 1 Page Preview + CTA)
  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-5 my-2 flex flex-col gap-4 max-h-[calc(100vh-140px)] overflow-y-auto">
      
      {/* Compact Horizontal File Strip */}
      <div className="flex items-center justify-between bg-[#FBF1E9]/60 border-[0.5px] border-[#EFE1D2] rounded-lg p-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <div className="min-w-0">
            <h4 className="text-sm font-medium text-[#262B36] truncate">{fileName}</h4>
            <p className="text-xs text-[#9C9488]">
              {pageCount || 1} pages · {Math.round(fileSize / 1024)} KB
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#9C9488] hover:text-[#262B36] border-[0.5px] border-[#EFE1D2] bg-white px-2.5 py-1 rounded transition-colors"
        >
          Change File
        </button>
      </div>

      {/* Main Body: Settings Panel (2-4 Fields) & First Page Reassurance Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        
        {/* Settings Panel (2 Columns) */}
        <div className="md:col-span-2 bg-[#FBF1E9]/30 border-[0.5px] border-[#EFE1D2] rounded-lg p-4 space-y-4">
          <h4 className="text-xs font-medium text-[#262B36] border-b [border-bottom-width:0.5px] border-[#EFE1D2] pb-2">
            {toolName} Settings
          </h4>

          {/* Compress PDF Options */}
          {toolSlug === "compress-pdf" && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#262B36]">Compression Quality Level</span>
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
              <div className="flex justify-between text-xs text-[#9C9488] pt-1">
                <span>Original: {Math.round(fileSize / 1024)} KB</span>
                <span className="font-medium text-[#262B36]">Estimated: ~{estimatedSizeKB} KB</span>
              </div>
            </div>
          )}

          {/* Watermark PDF Options */}
          {toolSlug === "watermark-pdf" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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

          {/* Protect / Unlock PDF Options */}
          {(toolSlug === "protect-pdf" || toolSlug === "unlock-pdf") && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#262B36] font-medium mb-1">
                  {toolSlug === "protect-pdf" ? "Set Password" : "Enter File Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-2 focus:border-[#E8792A]"
                />
              </div>
            </div>
          )}

          {/* OCR PDF Options */}
          {toolSlug === "ocr-pdf" && (
            <div className="text-xs">
              <label className="block text-[#262B36] font-medium mb-1">OCR Recognition Language</label>
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

          {/* General Fallback Options Info */}
          {!["compress-pdf", "watermark-pdf", "protect-pdf", "unlock-pdf", "ocr-pdf"].includes(toolSlug) && (
            <p className="text-xs text-[#9C9488]">
              Standard 100% in-browser processing parameters configured for {toolName}.
            </p>
          )}
        </div>

        {/* First Page Visual Reassurance Preview (1 Page Thumbnail) */}
        <div className="bg-[#FBF1E9]/20 border-[0.5px] border-[#EFE1D2] rounded-lg p-3 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] text-[#9C9488] mb-2 font-medium">1st Page Preview</span>
          <div className="w-28 aspect-[3/4] bg-white border-[0.5px] border-[#EFE1D2] rounded p-2 flex flex-col items-center justify-center shadow-none">
            {previewUrl ? (
              <img src={previewUrl} alt="Page 1" className="w-full h-full object-contain" />
            ) : (
              <FileText className="w-8 h-8 text-[#E8792A]/60" />
            )}
          </div>
        </div>

      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => onProcess({ compressLevel, watermarkText, watermarkPos, password, ocrLang })}
        disabled={isProcessing}
        className="w-full py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 mt-2"
      >
        {isProcessing ? "Processing File..." : `Apply ${toolName}`}
      </button>

    </div>
  );
}
