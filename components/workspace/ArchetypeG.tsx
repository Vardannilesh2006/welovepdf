"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  Search,
  ZoomIn,
  ZoomOut,
  Contrast,
  Accessibility,
  BookOpen,
  Shield,
  Zap,
  Maximize2,
} from "lucide-react";

interface ArchetypeGProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  fileName: string;
  pageCount: number;
  onProcess: (options: any) => void;
  isProcessing: boolean;
  onReset: () => void;
  onAddFile: (files: File[]) => void;
}

export default function ArchetypeG({
  toolSlug,
  toolName,
  lang,
  fileName,
  pageCount,
  onProcess,
  isProcessing,
  onReset,
  onAddFile,
}: ArchetypeGProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isInverted, setIsInverted] = useState(toolSlug === "invert-colors");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFile(Array.from(e.dataTransfer.files));
    }
  };

  if (!fileName) {
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
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileInput} />
          
          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#E8792A]/15 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-[#E8792A]/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#E8792A] to-[#F59E0B] rounded-2xl flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-10 h-10" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#262B36] mb-2 tracking-tight">
            {isDragging ? "Drop PDF to Open!" : `Open PDF in ${toolName}`}
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] mb-6 max-w-lg mx-auto">
            Distraction-free local document reader with search, zoom, and high-contrast dark reading modes.
          </p>
          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>Select PDF Document</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E8792A]" /> Zero Wait Time
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% In-Browser Privacy
            </span>
          </div>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Top Reader Toolbar */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="font-semibold text-[#262B36] truncate max-w-[200px] sm:max-w-[320px]">
            {fileName}
          </span>
          <span className="text-[#78716C] bg-white border border-[#EFE1D2] px-2.5 py-0.5 rounded-full font-medium">
            {pageCount} pages
          </span>
        </div>

        {/* Reader Tools */}
        <div className="flex items-center gap-2">
          {toolSlug === "search-in-pdf" && (
            <div className="flex items-center bg-white border border-[#EFE1D2] rounded-lg px-2.5 py-1.5 shadow-2xs">
              <Search className="w-3.5 h-3.5 text-[#78716C] mr-1.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search text..."
                className="bg-transparent text-xs text-[#262B36] focus:outline-none w-28 sm:w-40"
              />
            </div>
          )}

          <div className="flex items-center gap-1 bg-white border border-[#EFE1D2] rounded-lg px-2 py-1 shadow-2xs">
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
              className="p-1 text-[#78716C] hover:text-[#262B36]"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-[#262B36] px-1.5">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
              className="p-1 text-[#78716C] hover:text-[#262B36]"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsInverted(!isInverted)}
            className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 font-medium shadow-2xs ${
              isInverted ? "bg-slate-900 text-white border-slate-900" : "bg-white text-[#262B36] border-[#EFE1D2]"
            }`}
          >
            <Contrast className="w-3.5 h-3.5" />
            <span>{isInverted ? "Light Mode" : "Dark Reader"}</span>
          </button>

          <button
            onClick={onReset}
            className="text-[#78716C] hover:text-[#262B36] px-2.5 py-1.5 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main Reading Pane */}
      <div
        className={`p-6 sm:p-10 flex flex-col items-center gap-6 overflow-y-auto max-h-[70vh] transition-colors ${
          isInverted ? "bg-[#1A1D24] text-white" : "bg-slate-100/70"
        }`}
      >
        {Array.from({ length: Math.min(pageCount || 1, 6) }).map((_, idx) => (
          <div
            key={idx}
            style={{ width: `${(zoomLevel / 100) * 85}%`, maxWidth: "780px" }}
            className={`aspect-[3/4] rounded-2xl p-8 sm:p-12 flex flex-col justify-between shadow-md transition-all ${
              isInverted
                ? "bg-[#262B36] border border-[#3A4050] text-slate-100"
                : "bg-white border border-[#EFE1D2] text-[#262B36]"
            }`}
          >
            <div className="flex justify-between text-xs text-[#78716C] border-b pb-3 border-current/10">
              <span className="font-semibold">Page {idx + 1} of {pageCount}</span>
              <span className="font-mono text-[10px]">WeLovePDF Native Reader</span>
            </div>

            <div className="my-auto text-center space-y-2">
              {searchQuery ? (
                <div className="p-3 bg-[#E8792A]/10 border border-[#E8792A]/30 rounded-xl text-[#E8792A] text-xs font-medium">
                  Highlighting all occurrences of <strong className="font-bold">"{searchQuery}"</strong> on page {idx + 1}...
                </div>
              ) : (
                <div className="text-[#78716C] text-xs">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-current/30" />
                  <p className="font-medium">Page {idx + 1} Render Viewport</p>
                </div>
              )}
            </div>

            <div className="text-right text-[10px] text-[#78716C] pt-3 border-t border-current/10">
              100% In-Browser Memory
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
