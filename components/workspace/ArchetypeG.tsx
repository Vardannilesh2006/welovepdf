"use client";

import React, { useState } from "react";
import { Upload, FileText, Search, ZoomIn, ZoomOut, Contrast, Accessibility, BookOpen } from "lucide-react";

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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  if (!fileName) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-8 text-center my-2">
        <label className="cursor-pointer block border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] rounded-xl p-10 transition-colors bg-[#FBF1E9]/30">
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileInput} />
          <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-[#262B36] mb-1">Open PDF in {toolName}</h3>
          <p className="text-xs text-[#9C9488] mb-4">Read and inspect documents locally in browser memory.</p>
          <span className="inline-block px-5 py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors">
            Choose PDF File
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] overflow-hidden my-2 flex flex-col h-[calc(100vh-140px)]">
      
      {/* Sticky Top Control Bar */}
      <div className="bg-[#FBF1E9] border-b [border-bottom-width:0.5px] border-[#EFE1D2] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-[#E8792A]" />
          <span className="font-medium text-[#262B36] truncate max-w-[200px]">{fileName}</span>
          <span className="text-[#9C9488]">({pageCount} pages)</span>
        </div>

        {/* Reader Tools Controls */}
        <div className="flex items-center gap-2">
          {toolSlug === "search-in-pdf" && (
            <div className="flex items-center bg-white border-[0.5px] border-[#EFE1D2] rounded px-2 py-1">
              <Search className="w-3.5 h-3.5 text-[#9C9488] mr-1.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search text..."
                className="bg-transparent text-xs text-[#262B36] focus:outline-none w-28"
              />
            </div>
          )}

          <div className="flex items-center gap-1 bg-white border-[0.5px] border-[#EFE1D2] rounded px-1.5 py-1">
            <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))} className="p-0.5 text-[#9C9488] hover:text-[#262B36]">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-medium text-[#262B36] px-1">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))} className="p-0.5 text-[#9C9488] hover:text-[#262B36]">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {toolSlug === "invert-colors" && (
            <button
              onClick={() => setIsInverted(!isInverted)}
              className={`px-2.5 py-1 rounded border-[0.5px] transition-colors flex items-center gap-1 ${
                isInverted ? "bg-[#262B36] text-white border-[#262B36]" : "bg-white text-[#262B36] border-[#EFE1D2]"
              }`}
            >
              <Contrast className="w-3.5 h-3.5" />
              {isInverted ? "Dark Reader" : "Light Mode"}
            </button>
          )}

          <button onClick={onReset} className="text-[#9C9488] hover:text-[#262B36] px-2 py-1">
            Close
          </button>
        </div>
      </div>

      {/* Main Reading Pane (Internal Scroll Bounded Viewport) */}
      <div className={`flex-1 overflow-y-auto p-6 flex flex-col items-center gap-4 ${isInverted ? "bg-[#1A1D24] text-white" : "bg-[#FBF1E9]/20"}`}>
        {Array.from({ length: Math.min(pageCount || 1, 5) }).map((_, idx) => (
          <div
            key={idx}
            style={{ width: `${(zoomLevel / 100) * 80}%`, maxWidth: "700px" }}
            className={`aspect-[3/4] border-[0.5px] rounded-lg p-6 flex flex-col justify-between shadow-none transition-all ${
              isInverted ? "bg-[#262B36] border-[#3A4050] text-white" : "bg-white border-[#EFE1D2] text-[#262B36]"
            }`}
          >
            <div className="flex justify-between text-[11px] text-[#9C9488] border-b pb-2 border-current/10">
              <span>Page {idx + 1} of {pageCount}</span>
              <span>WeLovePDF Reader</span>
            </div>
            <div className="my-auto text-center text-xs text-[#9C9488]">
              {searchQuery ? (
                <p className="text-[#E8792A]">Highlighting matches for "{searchQuery}"...</p>
              ) : (
                <p>Page {idx + 1} Viewport Render</p>
              )}
            </div>
            <div className="text-right text-[10px] text-[#9C9488]">Document View</div>
          </div>
        ))}
      </div>

    </div>
  );
}
