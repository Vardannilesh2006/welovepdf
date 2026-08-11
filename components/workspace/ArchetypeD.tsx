"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, X, Plus, Shield } from "lucide-react";
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(Array.from(e.target.files));
    }
  };

  const isBatchImageTool = ["jpg-to-pdf", "png-to-pdf", "image-to-pdf"].includes(toolSlug);

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

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] overflow-hidden my-2 flex flex-col max-h-[calc(100vh-140px)]">
      
      {/* Top Header info */}
      <div className="bg-[#FBF1E9] border-b [border-bottom-width:0.5px] border-[#EFE1D2] px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <span className="text-xs font-medium text-[#262B36]">
          {files.length} {files.length === 1 ? "file" : "files"} uploaded
        </span>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left Column: Grid of File Cards & Action panel directly below it */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* File Cards Grid with Real Thumbnail Previews (Internal Scroll) */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[45vh] md:max-h-none">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((f, idx) => (
                <div
                  key={f.id}
                  className="bg-white border-[0.5px] border-[#EFE1D2] rounded-lg p-2.5 flex flex-col justify-between hover:border-[#E8792A]/50 transition-colors relative"
                >
                  {/* Badge Number */}
                  <span className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-[#E8792A] text-white text-[10px] font-medium flex items-center justify-center">
                    {idx + 1}
                  </span>

                  {/* Render Page 1 Preview Card */}
                  <div className="aspect-[3/4] w-full rounded mb-2 overflow-hidden bg-[#FBF1E9]/35">
                    <PdfPreviewCard file={f.file} />
                  </div>

                  <span className="text-xs font-medium text-[#262B36] truncate text-center block mb-1">
                    {f.name}
                  </span>

                  <div className="flex items-center justify-between border-t [border-top-width:0.5px] border-[#EFE1D2] pt-2 text-[10px] text-[#9C9488]">
                    <span>{Math.round(f.size / 1024)} KB</span>
                    <button
                      onClick={() => onRemoveFile(f.id)}
                      className="text-[#9C9488] hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Files Card */}
              {isBatchImageTool && (
                <label className="cursor-pointer border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A]/50 bg-[#FBF1E9]/20 hover:bg-[#FBF1E9]/40 rounded-lg p-4 flex flex-col items-center justify-center text-center aspect-[3/4]">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <Plus className="w-6 h-6 text-[#E8792A] mb-1" />
                  <span className="text-[11px] font-medium text-[#262B36]">
                    Add Images
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Bottom Left-Aligned Action panel directly below the grid */}
          <div className="bg-[#FBF1E9]/50 border-t [border-top-width:0.5px] border-[#EFE1D2] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {toolSlug.startsWith("pdf-to-") && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#262B36]">Resolution:</span>
                  <select
                    value={imageDpi}
                    onChange={(e) => setImageDpi(e.target.value)}
                    className="bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="150">Standard (150 DPI)</option>
                    <option value="300">High (300 DPI)</option>
                  </select>
                </div>
              )}

              {isBatchImageTool && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#9C9488]">Orient:</span>
                    <select value={orientation} onChange={(e) => setOrientation(e.target.value)} className="bg-white border-[0.5px] border-[#EFE1D2] rounded px-2 py-1">
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#9C9488]">Size:</span>
                    <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="bg-white border-[0.5px] border-[#EFE1D2] rounded px-2 py-1">
                      <option value="a4">A4</option>
                      <option value="letter">Letter</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onProcess({ imageDpi, pageSize, orientation })}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? "Processing..." : `Convert Now`}
            </button>
          </div>

        </div>

        {/* Right Stats Sidebar */}
        <div className="w-full md:w-[280px] md:min-w-[280px] bg-[#FBF1E9]/30 border-t md:border-t-0 md:border-l [border-left-width:0.5px] border-[#EFE1D2] p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] space-y-1.5 text-xs">
            <span className="font-medium text-[#262B36] block">Overview Stats</span>
            <div className="flex justify-between text-[#9C9488]">
              <span>Total Files:</span>
              <span className="font-medium text-[#262B36]">{files.length}</span>
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
