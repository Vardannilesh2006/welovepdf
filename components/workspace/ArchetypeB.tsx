"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, RotateCw, Trash2, Scissors, Copy, Plus, Crop, Bookmark, Shield } from "lucide-react";

export interface PageThumbnail {
  id: string;
  pageNumber: number;
  dataUrl?: string;
  rotation: number;
  selected: boolean;
  isSplitPoint?: boolean;
}

interface ArchetypeBProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  fileName: string;
  pages: PageThumbnail[];
  onPageClick: (index: number) => void;
  onRotatePage?: (index: number) => void;
  onRotateAll?: (degrees: number) => void;
  onToggleSelect?: (index: number) => void;
  onToggleSplitPoint?: (index: number) => void;
  onAddBlankPageAt?: (index: number) => void;
  onProcess: (options: any) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
  onAddFile: (files: File[]) => void;
}

export default function ArchetypeB({
  toolSlug,
  toolName,
  lang,
  fileName,
  pages,
  onPageClick,
  onRotatePage,
  onRotateAll,
  onToggleSelect,
  onToggleSplitPoint,
  onAddBlankPageAt,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
  onAddFile,
}: ArchetypeBProps) {
  const [splitMode, setSplitMode] = useState<"every" | "range" | "click">("click");
  const [splitInterval, setSplitInterval] = useState(2);
  const [rangeInput, setRangeInput] = useState("1-");
  const [cropLeft, setCropLeft] = useState(10);
  const [cropRight, setCropRight] = useState(10);
  const [cropTop, setCropTop] = useState(10);
  const [cropBottom, setCropBottom] = useState(10);
  const [bookmarkTitle, setBookmarkTitle] = useState("");
  const [annotationText, setAnnotationText] = useState("");

  const selectedCount = pages.filter((p) => p.selected).length;

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
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

  if (!fileName || pages.length === 0) {
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
            {lang === "hi" ? "पीडीएफ फ़ाइल चुनें" : "Select PDF file for " + toolName}
          </h3>
          <p className="text-xs text-[#9C9488] mb-4">
            {lang === "hi" ? "100% मुफ़्त और सुरक्षित। फ़ाइलें आपके डिवाइस में ही प्रोसेस होती हैं।" : "100% free & local browser processing. No server upload."}
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
      
      {/* Sticky Top Bar (File Name & Stats) */}
      <div className="bg-[#FBF1E9] border-b [border-bottom-width:0.5px] border-[#EFE1D2] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="text-sm font-medium text-[#262B36] truncate max-w-[200px] sm:max-w-[300px]">
            {fileName}
          </span>
          <span className="text-xs text-[#9C9488] bg-white border-[0.5px] border-[#EFE1D2] px-2 py-0.5 rounded-full shrink-0">
            {pages.length} pages
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left/Main Column: Bounded Grid & Settings Panel directly below it */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Page-Thumbnail Grid (Internal Scroll) */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[45vh] md:max-h-none">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {pages.map((p, idx) => (
                <div key={p.id} className="relative group">
                  <div
                    onClick={() => {
                      if (onToggleSelect) onToggleSelect(idx);
                      onPageClick(idx);
                    }}
                    style={{ transform: `rotate(${p.rotation}deg)` }}
                    className={`aspect-[3/4] bg-[#FBF1E9]/40 border-[0.5px] rounded-lg p-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
                      p.selected
                        ? "border-[#E8792A] ring-2 ring-[#E8792A]/30 bg-white"
                        : "border-[#EFE1D2] hover:border-[#E8792A]/50 bg-white"
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[11px] font-medium text-[#262B36]">
                      <span>P. {p.pageNumber}</span>
                      {(toolSlug === "delete-pages" || toolSlug === "extract-pages") && (
                        <input
                          type="checkbox"
                          checked={p.selected}
                          onChange={() => onToggleSelect && onToggleSelect(idx)}
                          className="w-4 h-4 accent-[#E8792A] rounded"
                        />
                      )}
                    </div>

                    {/* Rendering Page Preview */}
                    {p.dataUrl ? (
                      <img src={p.dataUrl} alt={`Page ${p.pageNumber}`} className="w-full h-full object-contain my-1 rounded" />
                    ) : (
                      <div className="w-full flex-1 border border-dashed border-[#EFE1D2] rounded flex items-center justify-center text-[10px] text-[#9C9488] my-2 bg-white">
                        Page {p.pageNumber}
                      </div>
                    )}

                    {/* Per-Page Rotate button */}
                    {toolSlug === "rotate-pdf" && onRotatePage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRotatePage(idx);
                        }}
                        className="absolute bottom-2 right-2 p-1 bg-white border-[0.5px] border-[#EFE1D2] hover:border-[#E8792A] text-[#262B36] rounded transition-colors"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Insertion points & split markers */}
                  {toolSlug === "add-blank-page" && onAddBlankPageAt && (
                    <button
                      onClick={() => onAddBlankPageAt(idx + 1)}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-5 h-5 bg-[#E8792A] hover:bg-[#D66B1E] text-white rounded-full flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  )}

                  {toolSlug === "split-pdf" && p.isSplitPoint && (
                    <div className="absolute -right-2 top-0 bottom-0 w-1 bg-[#E8792A] rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left-Aligned Action Panel (Settings + primary CTA below the box) */}
          <div className="bg-[#FBF1E9]/50 border-t [border-top-width:0.5px] border-[#EFE1D2] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {toolSlug === "split-pdf" && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#262B36]">Range:</span>
                  <input
                    type="text"
                    value={rangeInput}
                    onChange={(e) => setRangeInput(e.target.value)}
                    placeholder="e.g. 1-3, 5, 7-9"
                    className="bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E8792A] w-36"
                  />
                </div>
              )}

              {toolSlug === "crop-pdf" && (
                <div className="flex items-center gap-2 text-[11px] text-[#9C9488]">
                  <span>Margins (%): L: {cropLeft} R: {cropRight} T: {cropTop} B: {cropBottom}</span>
                </div>
              )}

              {(toolSlug === "delete-pages" || toolSlug === "extract-pages") && (
                <span className="font-medium text-[#262B36]">
                  Selected: <strong className="text-[#E8792A]">{selectedCount}</strong> pages
                </span>
              )}
            </div>

            <button
              onClick={() =>
                onProcess({
                  splitMode,
                  splitInterval,
                  rangeInput,
                  cropLeft,
                  cropRight,
                  cropTop,
                  cropBottom,
                  bookmarkTitle,
                  annotationText,
                })
              }
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? "Processing..." : `${toolName}`}
            </button>
          </div>

        </div>

        {/* Right Slim Options Sidebar */}
        <div className="w-full md:w-64 bg-[#FBF1E9]/30 border-t md:border-t-0 md:border-l [border-left-width:0.5px] border-[#EFE1D2] p-4 flex flex-col gap-4 shrink-0 overflow-y-auto justify-between">
          <div className="space-y-4">
            <span className="text-xs font-medium text-[#262B36] block border-b pb-1.5 border-[#EFE1D2]">
              Global Options
            </span>

            {toolSlug === "rotate-pdf" && onRotateAll && (
              <div className="space-y-2">
                <label className="block text-[11px] text-[#9C9488]">Rotate All Pages</label>
                <div className="grid grid-cols-3 gap-1">
                  <button onClick={() => onRotateAll(90)} className="py-1 border-[0.5px] border-[#EFE1D2] bg-white text-xs rounded hover:border-[#E8792A]">90°</button>
                  <button onClick={() => onRotateAll(180)} className="py-1 border-[0.5px] border-[#EFE1D2] bg-white text-xs rounded hover:border-[#E8792A]">180°</button>
                  <button onClick={() => onRotateAll(270)} className="py-1 border-[0.5px] border-[#EFE1D2] bg-white text-xs rounded hover:border-[#E8792A]">270°</button>
                </div>
              </div>
            )}

            {toolSlug === "crop-pdf" && (
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#9C9488]">Left %</span>
                  <input type="number" value={cropLeft} onChange={(e) => setCropLeft(Number(e.target.value))} className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded p-1" />
                </div>
                <div>
                  <span className="text-[#9C9488]">Right %</span>
                  <input type="number" value={cropRight} onChange={(e) => setCropRight(Number(e.target.value))} className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded p-1" />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] text-center mt-auto">
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
