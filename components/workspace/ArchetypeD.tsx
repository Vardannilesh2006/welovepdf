"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, FileType, Image, Table, Code2, Sheet, X, Shield, ArrowRight } from "lucide-react";

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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(Array.from(e.target.files));
    }
  };

  const isBatchImageTool = ["jpg-to-pdf", "png-to-pdf", "image-to-pdf"].includes(toolSlug);

  // 1. Result State (Swaps into same hero container space)
  if (resultUrl) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-6 text-center shadow-none my-2">
        <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-[#262B36] mb-1">
          {lang === "hi" ? "कन्वर्ज़न पूरा हुआ!" : "Conversion Complete!"}
        </h3>
        <p className="text-sm text-[#9C9488] mb-6">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : "converted your file successfully."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-6 py-3 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "फाइल डाउनलोड करें" : "Download Converted File"}
          </a>
          <button
            onClick={onReset}
            className="px-5 py-3 border-[0.5px] border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-lg transition-colors"
          >
            {lang === "hi" ? "दूसरा फ़ाइल कन्वर्ट करें" : "Convert Another File"}
          </button>
        </div>
      </div>
    );
  }

  // 2. Empty Dropzone State
  if (files.length === 0) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-8 text-center my-2">
        <label className="cursor-pointer block border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] rounded-xl p-10 transition-colors bg-[#FBF1E9]/30">
          <input
            type="file"
            multiple={isBatchImageTool}
            accept={isBatchImageTool ? "image/*" : ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"}
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-[#262B36] mb-1">
            {lang === "hi" ? "फ़ाइल अपलोड करें" : "Upload File for " + toolName}
          </h3>
          <p className="text-xs text-[#9C9488] mb-4">
            {lang === "hi" ? "100% मुफ़्त कन्वर्ज़न। फ़ाइलें ब्राउज़र में ही प्रोसेस होती हैं।" : "100% free format converter. Local in-browser conversion."}
          </p>
          <span className="inline-block px-5 py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors">
            {lang === "hi" ? "फ़ाइल चुनें" : "Choose Files"}
          </span>
        </label>
      </div>
    );
  }

  // 3. Active Format Converter Workspace (Compact Chips Row + Format Options + Convert CTA)
  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-5 my-2 flex flex-col gap-4 max-h-[calc(100vh-140px)] overflow-y-auto">
      
      {/* Removable File Chips Row */}
      <div className="space-y-1">
        <label className="block text-xs font-medium text-[#9C9488]">Uploaded Files</label>
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1 bg-[#FBF1E9]/40 border-[0.5px] border-[#EFE1D2] rounded-lg">
          {files.map((f) => (
            <div
              key={f.id}
              className="inline-flex items-center gap-1.5 bg-white border-[0.5px] border-[#EFE1D2] px-2.5 py-1 rounded-md text-xs text-[#262B36]"
            >
              <FileText className="w-3.5 h-3.5 text-[#E8792A]" />
              <span className="font-medium truncate max-w-[140px]">{f.name}</span>
              <span className="text-[10px] text-[#9C9488]">({Math.round(f.size / 1024)} KB)</span>
              <button
                onClick={() => onRemoveFile(f.id)}
                className="text-[#9C9488] hover:text-red-600 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Format-Specific Options */}
      <div className="bg-[#FBF1E9]/30 border-[0.5px] border-[#EFE1D2] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {toolSlug.startsWith("pdf-to-") && (
          <div>
            <label className="block font-medium text-[#262B36] mb-1">Image / Render Resolution</label>
            <select
              value={imageDpi}
              onChange={(e) => setImageDpi(e.target.value)}
              className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
            >
              <option value="150">Standard Quality (150 DPI)</option>
              <option value="300">High Quality (300 DPI)</option>
            </select>
          </div>
        )}

        {isBatchImageTool && (
          <>
            <div>
              <label className="block font-medium text-[#262B36] mb-1">Page Orientation</label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
              >
                <option value="portrait">Auto Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-[#262B36] mb-1">Page Size</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
              >
                <option value="a4">A4 Standard</option>
                <option value="letter">US Letter</option>
                <option value="fit">Fit to Image Size</option>
              </select>
            </div>
          </>
        )}

        {!toolSlug.startsWith("pdf-to-") && !isBatchImageTool && (
          <div className="sm:col-span-2 text-xs text-[#9C9488]">
            Optimal layout & font conversion parameters pre-configured for {toolName}.
          </div>
        )}
      </div>

      {/* Convert CTA */}
      <button
        onClick={() => onProcess({ imageDpi, pageSize, orientation })}
        disabled={isProcessing}
        className="w-full py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-1"
      >
        {isProcessing ? "Converting Format..." : `Convert to ${toolName.replace("to ", "→ ")}`}
      </button>

    </div>
  );
}
