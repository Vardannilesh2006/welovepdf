"use client";

import React, { useState } from "react";
import { Upload, FileText, Trash2, ArrowUp, ArrowDown, Plus, Shield, CheckCircle2, Sliders } from "lucide-react";
import PdfPreviewCard from "./PdfPreviewCard";

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number;
}

interface ArchetypeAProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  files: FileItem[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  onReorderFiles: (newFiles: FileItem[]) => void;
  onRenameFile: (id: string, newName: string) => void;
  onProcess: (options: { outputName: string; compress: boolean; compareMode?: string }) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
}

export default function ArchetypeA({
  toolSlug,
  toolName,
  lang,
  files,
  onAddFiles,
  onRemoveFile,
  onReorderFiles,
  onRenameFile,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
}: ArchetypeAProps) {
  const [outputName, setOutputName] = useState(`${toolSlug}-output.pdf`);
  const [compress, setCompress] = useState(false);
  const [compareMode, setCompareMode] = useState("side-by-side");

  const totalPages = files.reduce((acc, f) => acc + (f.pageCount || 1), 0);
  const totalSizeKB = Math.round(files.reduce((acc, f) => acc + f.size, 0) / 1024);

  const handleMove = (index: number, direction: "up" | "down") => {
    const newArr = [...files];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    onReorderFiles(newArr);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(Array.from(e.target.files));
    }
  };

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
            download={outputName}
            className="px-6 py-3 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "डाउनलोड करें" : "Download PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-5 py-3 border-[0.5px] border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-lg transition-colors"
          >
            {lang === "hi" ? "दूसरी फ़ाइलें बदलें" : "Process More Files"}
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
            multiple
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-[#262B36] mb-1">
            {lang === "hi" ? "फ़ाइलें चुनें या यहाँ ड्रॉप करें" : "Select PDF files to " + toolName.toLowerCase()}
          </h3>
          <p className="text-xs text-[#9C9488] mb-4">
            {lang === "hi" ? "100% मुफ़्त और सुरक्षित। फ़ाइलें ब्राउज़र में ही प्रोसेस होती हैं।" : "100% free & local in-browser processing. Files are never uploaded."}
          </p>
          <span className="inline-block px-5 py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors">
            {lang === "hi" ? "फ़ाइलें चुनें" : "Choose Files"}
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] overflow-hidden my-2 flex flex-col max-h-[calc(100vh-140px)]">
      
      {/* Sticky Top Summary Bar */}
      <div className="bg-[#FBF1E9] border-b [border-bottom-width:0.5px] border-[#EFE1D2] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#262B36] bg-white border-[0.5px] border-[#EFE1D2] px-2.5 py-1 rounded-full">
            {files.length} {files.length === 1 ? "file" : "files"}
          </span>
          <span className="text-xs text-[#9C9488]">
            {totalPages} pages · {totalSizeKB} KB total
          </span>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left/Main Column: Bounded PDF Grid & Settings Panel directly below it */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top: PDF Cards Grid with Real Page 1 Preview (Internal Scroll) */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[45vh] md:max-h-none">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((fileItem, idx) => (
                <div
                  key={fileItem.id}
                  className="bg-white border-[0.5px] border-[#EFE1D2] rounded-lg p-2.5 flex flex-col justify-between hover:border-[#E8792A]/50 transition-colors group relative"
                >
                  {/* Badge Number */}
                  <span className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-[#E8792A] text-white text-[10px] font-medium flex items-center justify-center">
                    {idx + 1}
                  </span>

                  {/* Real PDF Page 1 Preview Card */}
                  <div className="aspect-[3/4] w-full rounded mb-2 overflow-hidden bg-[#FBF1E9]/35">
                    <PdfPreviewCard file={fileItem.file} />
                  </div>

                  {/* Editable Filename */}
                  <input
                    type="text"
                    value={fileItem.name}
                    onChange={(e) => onRenameFile(fileItem.id, e.target.value)}
                    className="text-xs font-medium text-[#262B36] bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#E8792A] rounded px-1 w-full truncate text-center mb-1"
                  />

                  {/* Badges for pages and size */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#9C9488] mb-2">
                    <span>{fileItem.pageCount} pgs</span>
                    <span>·</span>
                    <span>{Math.round(fileItem.size / 1024)} KB</span>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between border-t [border-top-width:0.5px] border-[#EFE1D2] pt-2 mt-auto">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 text-[#9C9488] hover:text-[#262B36] disabled:opacity-30"
                        title="Move Left/Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5 rotate-270" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === files.length - 1}
                        className="p-1 text-[#9C9488] hover:text-[#262B36] disabled:opacity-30"
                        title="Move Right/Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5 rotate-270" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveFile(fileItem.id)}
                      className="p-1 text-[#9C9488] hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Files Dashed Card */}
              <label className="cursor-pointer border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A]/50 bg-[#FBF1E9]/20 hover:bg-[#FBF1E9]/40 rounded-lg p-4 flex flex-col items-center justify-center text-center aspect-[3/4]">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileInput}
                />
                <Plus className="w-6 h-6 text-[#E8792A] mb-1" />
                <span className="text-[11px] font-medium text-[#262B36]">
                  {lang === "hi" ? "फ़ाइलें जोड़ें" : "Add Files"}
                </span>
              </label>
            </div>
          </div>

          {/* Bottom: Settings Panel & Action Button (Aligned Left under the main box) */}
          <div className="bg-[#FBF1E9]/50 border-t [border-top-width:0.5px] border-[#EFE1D2] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {toolSlug === "merge-pdf" && (
                <label className="flex items-center gap-2 cursor-pointer bg-white border-[0.5px] border-[#EFE1D2] px-3.5 py-2 rounded-lg font-medium text-[#262B36]">
                  <input
                    type="checkbox"
                    checked={compress}
                    onChange={(e) => setCompress(e.target.checked)}
                    className="w-4 h-4 accent-[#E8792A] rounded cursor-pointer"
                  />
                  <span>{lang === "hi" ? "मर्ज करते समय कंप्रेस करें" : "Compress while merging"}</span>
                </label>
              )}

              {toolSlug === "compare-pdf" && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#262B36]">Comparison Mode:</span>
                  <select
                    value={compareMode}
                    onChange={(e) => setCompareMode(e.target.value)}
                    className="bg-white border-[0.5px] border-[#EFE1D2] rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#E8792A]"
                  >
                    <option value="side-by-side">Side-by-Side View</option>
                    <option value="difference-highlight">Highlight Differences</option>
                  </select>
                </div>
              )}
            </div>

            <button
              onClick={() => onProcess({ outputName, compress, compareMode })}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              {isProcessing ? "Processing..." : `Merge PDFs`}
            </button>
          </div>

        </div>

        {/* Right Slim Stats & Meta Sidebar */}
        <div className="w-full md:w-64 bg-[#FBF1E9]/30 border-t md:border-t-0 md:border-l [border-left-width:0.5px] border-[#EFE1D2] p-4 flex flex-col gap-4 shrink-0 overflow-y-auto justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#262B36] mb-1.5">
                {lang === "hi" ? "आउटपुट फ़ाइल नाम" : "Output Filename"}
              </label>
              <input
                type="text"
                value={outputName}
                onChange={(e) => setOutputName(e.target.value)}
                className="w-full text-xs font-normal text-[#262B36] bg-white border-[0.5px] border-[#EFE1D2] rounded-md px-2.5 py-2 focus:outline-none focus:border-[#E8792A]"
              />
            </div>

            <div className="bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] space-y-1.5 text-xs">
              <span className="font-medium text-[#262B36] block">Overview Stats</span>
              <div className="flex justify-between text-[#9C9488]">
                <span>Total Files:</span>
                <span className="font-medium text-[#262B36]">{files.length}</span>
              </div>
              <div className="flex justify-between text-[#9C9488]">
                <span>Total Pages:</span>
                <span className="font-medium text-[#262B36]">{totalPages}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] text-center">
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
