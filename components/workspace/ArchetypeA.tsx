"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  Shield,
  CheckCircle2,
  RefreshCw,
  ArrowUpDown,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
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
  onReplaceFile: (id: string, newFile: File) => void;
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
  onReplaceFile,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
}: ArchetypeAProps) {
  const [outputName, setOutputName] = useState(`${toolSlug}-output.pdf`);
  const [compress, setCompress] = useState(false);
  const [compareMode, setCompareMode] = useState("side-by-side");
  const [isDragging, setIsDragging] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalPages = files.reduce((acc, f) => acc + (f.pageCount || 1), 0);
  const totalSizeKB = Math.round(files.reduce((acc, f) => acc + f.size, 0) / 1024);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );
    if (droppedFiles.length > 0) onAddFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(Array.from(e.target.files));
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const newArr = [...files];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    onReorderFiles(newArr);
  };

  const handleSortAZ = () => {
    const sorted = [...files].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
        : b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: "base" })
    );
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    onReorderFiles(sorted);
  };

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {lang === "hi" ? "आपकी फ़ाइल तैयार है!" : "Your Combined PDF is Ready!"}
        </h3>
        <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : `successfully combined ${files.length} documents into one clean PDF.`}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={outputName}
            className="px-7 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "डाउनलोड करें" : "Download Merged PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3.5 border border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-xl transition-colors"
          >
            {lang === "hi" ? "दूसरी फ़ाइलें बदलें" : "Merge More Files"}
          </button>
        </div>
      </div>
    );
  }

  // EMPTY STATE / HERO DROPZONE (Dominates above fold)
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
            multiple
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />

          {/* 3D Visual Stack Icon */}
          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#E8792A]/15 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-[#E8792A]/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#E8792A] to-[#F59E0B] rounded-2xl flex items-center justify-center text-white shadow-md">
              <Layers className="w-10 h-10" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#262B36] mb-2 tracking-tight">
            {isDragging
              ? lang === "hi"
                ? "यहाँ फ़ाइलें छोड़ें!"
                : "Drop PDF files here!"
              : lang === "hi"
              ? "पीडीएफ फ़ाइलें चुनें या यहाँ ड्रैग करें"
              : `Select PDF files to ${toolName.toLowerCase()}`}
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] mb-6 max-w-lg mx-auto">
            {lang === "hi"
              ? "100% मुफ़्त और सुरक्षित। आपकी फ़ाइलें कभी सर्वर पर नहीं जातीं — पूरा काम आपके ब्राउज़र में होता है।"
              : "Combine multiple PDFs in any order with instant local processing. Zero server uploads."}
          </p>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>{lang === "hi" ? "कंप्यूटर से फ़ाइलें चुनें" : "Select PDF Files"}</span>
          </div>

          {/* Format and Security Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E8792A]" /> Instant WebAssembly
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#E8792A]" /> Multi-File & Reorder
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Client-Side Privacy
            </span>
          </div>
        </label>
      </div>
    );
  }

  // ACTIVE STUDIO WORKSPACE (Files uploaded)
  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Studio Top Control Bar */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#262B36] bg-white border border-[#EFE1D2] px-3 py-1 rounded-full shadow-2xs">
            {files.length} {files.length === 1 ? "document ready" : "documents ready"}
          </span>
          <span className="text-xs text-[#78716C] font-medium hidden sm:inline">
            {totalPages} pages total · {totalSizeKB} KB
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* A-Z Sort Button */}
          <button
            onClick={handleSortAZ}
            className="flex items-center gap-1.5 text-xs font-medium text-[#262B36] bg-white hover:bg-slate-50 border border-[#EFE1D2] px-2.5 py-1.5 rounded-lg transition-colors shadow-2xs"
            title="Sort files by name"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#E8792A]" />
            <span>Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
          </button>

          {/* Quick Add More Button */}
          <label className="cursor-pointer flex items-center gap-1.5 text-xs font-medium text-white bg-[#E8792A] hover:bg-[#D66B1E] px-3 py-1.5 rounded-lg transition-colors shadow-2xs">
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            <Plus className="w-3.5 h-3.5" />
            <span>Add More</span>
          </label>

          {/* Clear All */}
          <button
            onClick={onReset}
            className="text-xs font-medium text-[#78716C] hover:text-red-600 px-2 py-1.5 transition-colors"
            title="Clear all uploaded files"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main Studio Body: Grid Canvas + Right Settings Drawer */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Column: Generous Reorderable PDF Grid */}
        <div className="flex-1 flex flex-col min-h-[460px] p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((fileItem, idx) => {
              const fileInputRef = React.createRef<HTMLInputElement>();
              return (
                <div
                  key={fileItem.id}
                  className="bg-white border border-[#EFE1D2] rounded-xl p-3 flex flex-col justify-between hover:border-[#E8792A] hover:shadow-md transition-all group relative"
                >
                  {/* Sequence Order Badge */}
                  <span className="absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full bg-[#E8792A] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </span>

                  {/* Real PDF Page 1 Preview Canvas */}
                  <div className="aspect-[3/4] w-full rounded-lg mb-2 overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center">
                    <PdfPreviewCard file={fileItem.file} />
                  </div>

                  {/* Editable Filename */}
                  <input
                    type="text"
                    value={fileItem.name}
                    onChange={(e) => onRenameFile(fileItem.id, e.target.value)}
                    className="text-xs font-semibold text-[#262B36] bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#E8792A] rounded px-1 w-full truncate text-center mb-1"
                    title="Click to rename output title"
                  />

                  {/* Telemetry info: Pages and KB */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] mb-2.5 font-medium">
                    <span>{fileItem.pageCount} pgs</span>
                    <span>·</span>
                    <span>{Math.round(fileItem.size / 1024)} KB</span>
                  </div>

                  {/* Reorder and Action Toolbar */}
                  <div className="flex items-center justify-between border-t border-[#EFE1D2] pt-2 mt-auto">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 text-[#78716C] hover:text-[#262B36] hover:bg-slate-100 rounded disabled:opacity-20 transition-colors"
                        title="Move Left / Earlier"
                      >
                        <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === files.length - 1}
                        className="p-1 text-[#78716C] hover:text-[#262B36] hover:bg-slate-100 rounded disabled:opacity-20 transition-colors"
                        title="Move Right / Later"
                      >
                        <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    </div>

                    {/* Replace File Trigger */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1 text-[#78716C] hover:text-[#E8792A] hover:bg-slate-100 rounded transition-colors"
                      title="Replace this document"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="file"
                      accept=".pdf"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          onReplaceFile(fileItem.id, e.target.files[0]);
                        }
                      }}
                    />

                    {/* Remove File Button */}
                    <button
                      onClick={() => onRemoveFile(fileItem.id)}
                      className="p-1 text-[#78716C] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Quick Add Dashed Slot Card */}
            <label className="cursor-pointer border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] bg-white hover:bg-[#FBF1E9]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center aspect-[3/4] transition-all group">
              <input
                type="file"
                multiple
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="w-10 h-10 rounded-full bg-[#E8792A]/10 text-[#E8792A] group-hover:scale-110 flex items-center justify-center mb-2 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#262B36]">
                {lang === "hi" ? "और फ़ाइलें जोड़ें" : "Add More"}
              </span>
              <span className="text-[10px] text-[#78716C] mt-0.5">
                PDF Documents
              </span>
            </label>
          </div>
        </div>

        {/* Right Settings & Telemetry Sidebar */}
        <div className="w-full lg:w-[320px] lg:min-w-[320px] bg-white border-t lg:border-t-0 lg:border-l border-[#EFE1D2] p-5 flex flex-col justify-between shrink-0 gap-5">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block border-b pb-2 border-[#EFE1D2]">
              Output Settings
            </span>

            {/* Output File Name */}
            <div>
              <label className="block text-xs font-semibold text-[#262B36] mb-1.5">
                {lang === "hi" ? "आउटपुट फ़ाइल नाम" : "Output Filename"}
              </label>
              <input
                type="text"
                value={outputName}
                onChange={(e) => setOutputName(e.target.value)}
                className="w-full text-xs font-medium text-[#262B36] bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E8792A] focus:bg-white transition-all"
              />
            </div>

            {/* Merge PDF Feature: Optional Compression */}
            {toolSlug === "merge-pdf" && (
              <label className="flex items-start gap-2.5 cursor-pointer bg-[#FBF1E9]/50 border border-[#EFE1D2] p-3 rounded-xl hover:bg-[#FBF1E9] transition-colors">
                <input
                  type="checkbox"
                  checked={compress}
                  onChange={(e) => setCompress(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#E8792A] rounded cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#262B36] block">
                    {lang === "hi" ? "मर्ज करते समय कंप्रेस करें" : "Compress while merging"}
                  </span>
                  <span className="text-[11px] text-[#78716C]">
                    Optimizes images and streams for smaller final file size.
                  </span>
                </div>
              </label>
            )}

            {/* Compare PDF Mode Switcher */}
            {toolSlug === "compare-pdf" && (
              <div>
                <label className="block text-xs font-semibold text-[#262B36] mb-1.5">
                  Comparison Mode:
                </label>
                <select
                  value={compareMode}
                  onChange={(e) => setCompareMode(e.target.value)}
                  className="w-full text-xs font-medium text-[#262B36] bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8792A]"
                >
                  <option value="side-by-side">Side-by-Side Visual View</option>
                  <option value="difference-highlight">Highlight Text Differences</option>
                </select>
              </div>
            )}

            {/* Overview Summary Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <span className="font-semibold text-[#262B36] block border-b pb-1.5 border-slate-200">
                Document Overview
              </span>
              <div className="flex justify-between text-[#78716C]">
                <span>Files Selected:</span>
                <span className="font-semibold text-[#262B36]">{files.length}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Combined Pages:</span>
                <span className="font-semibold text-[#262B36]">{totalPages}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Estimated Input Size:</span>
                <span className="font-semibold text-[#262B36]">{totalSizeKB} KB</span>
              </div>
            </div>
          </div>

          {/* Action CTA & Privacy Assurance */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onProcess({ outputName, compress, compareMode })}
              disabled={isProcessing || files.length < (toolSlug === "compare-pdf" ? 2 : 1)}
              className="w-full py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Documents...</span>
                </>
              ) : (
                <>
                  <span>
                    {toolSlug === "compare-pdf"
                      ? "Compare 2 Documents →"
                      : `Merge ${files.length} Documents Now →`}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] text-center">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Local In-Browser Sandbox</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
