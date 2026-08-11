"use client";

import React, { useState } from "react";
import { Upload, FileText, Trash2, GripVertical, CheckCircle2, Sliders, ArrowUp, ArrowDown, Plus, Shield } from "lucide-react";

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

  // 1. Result State (Swaps into hero space, 0 outer scroll)
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

  // 2. Empty State Dropzone
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

  // 3. Active Workspace (Rule 0 Above-The-Fold Bounded Viewport Container)
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
        <button
          onClick={() => onProcess({ outputName, compress, compareMode })}
          disabled={isProcessing}
          className="px-5 py-2 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {isProcessing ? (
            <span className="animate-spin text-sm">⏳</span>
          ) : (
            <Sliders className="w-4 h-4" />
          )}
          {isProcessing ? "Processing..." : toolName}
        </button>
      </div>

      {/* Main Grid: Left File List (Internal Scroll) & Right Sidebar */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left: Compact File-Level Rows Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[50vh] md:max-h-none">
          {files.map((fileItem, idx) => (
            <div
              key={fileItem.id}
              className="flex items-center justify-between bg-white border-[0.5px] border-[#EFE1D2] rounded-lg p-2.5 hover:border-[#E8792A]/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="w-6 h-6 rounded-full bg-[#FBF1E9] text-[#262B36] text-xs font-medium flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
                <input
                  type="text"
                  value={fileItem.name}
                  onChange={(e) => onRenameFile(fileItem.id, e.target.value)}
                  className="text-sm font-medium text-[#262B36] bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#E8792A] rounded px-1 min-w-0 flex-1 truncate"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[#9C9488] bg-[#FBF1E9] px-2 py-0.5 rounded border-[0.5px] border-[#EFE1D2]">
                  {fileItem.pageCount || 1} pgs
                </span>
                <span className="text-xs text-[#9C9488] hidden sm:inline">
                  {Math.round(fileItem.size / 1024)} KB
                </span>
                
                {/* Reorder & Remove Actions */}
                <div className="flex items-center gap-1 border-l [border-left-width:0.5px] border-[#EFE1D2] pl-2 ml-1">
                  <button
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-[#9C9488] hover:text-[#262B36] disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === files.length - 1}
                    className="p-1 text-[#9C9488] hover:text-[#262B36] disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFile(fileItem.id)}
                    className="p-1 text-[#9C9488] hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Dashed "Add More Files" Row */}
          <label className="cursor-pointer flex items-center justify-center gap-2 border-[0.5px] border-dashed border-[#E8792A]/50 hover:border-[#E8792A] bg-[#FBF1E9]/40 hover:bg-[#FBF1E9] rounded-lg p-3 transition-colors text-xs font-medium text-[#262B36]">
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            <Plus className="w-4 h-4 text-[#E8792A]" />
            {lang === "hi" ? "और फ़ाइलें जोड़ें" : "Add More Files"}
          </label>
        </div>

        {/* Right Slim Sidebar */}
        <div className="w-full md:w-64 bg-[#FBF1E9]/50 border-t md:border-t-0 md:border-l [border-left-width:0.5px] border-[#EFE1D2] p-4 flex flex-col gap-4 shrink-0 overflow-y-auto">
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

          {toolSlug === "merge-pdf" && (
            <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border-[0.5px] border-[#EFE1D2]">
              <span className="text-xs font-medium text-[#262B36]">
                {lang === "hi" ? "मर्ज करते समय कंप्रेस करें" : "Compress while merging"}
              </span>
              <input
                type="checkbox"
                checked={compress}
                onChange={(e) => setCompress(e.target.checked)}
                className="w-4 h-4 accent-[#E8792A] rounded cursor-pointer"
              />
            </div>
          )}

          {toolSlug === "compare-pdf" && (
            <div>
              <label className="block text-xs font-medium text-[#262B36] mb-1.5">
                {lang === "hi" ? "तुलना मोड" : "Comparison Mode"}
              </label>
              <select
                value={compareMode}
                onChange={(e) => setCompareMode(e.target.value)}
                className="w-full text-xs font-normal text-[#262B36] bg-white border-[0.5px] border-[#EFE1D2] rounded-md px-2.5 py-2 focus:outline-none focus:border-[#E8792A]"
              >
                <option value="side-by-side">Side-by-Side View</option>
                <option value="difference-highlight">Highlight Differences</option>
              </select>
            </div>
          )}

          <div className="mt-auto bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] text-center">
            <Shield className="w-4 h-4 text-[#E8792A] mx-auto mb-1" />
            <p className="text-[11px] text-[#9C9488] leading-tight">
              {lang === "hi" ? "100% स्थानीय ब्राउज़र प्रोसेसिंग" : "100% Client-Side Local Sandbox"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
