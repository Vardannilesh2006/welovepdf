"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  RotateCw,
  RotateCcw,
  Trash2,
  Scissors,
  Copy,
  Plus,
  Crop,
  Bookmark,
  Shield,
  Layers,
  ZoomIn,
  ZoomOut,
  CheckSquare,
  Square,
  Sparkles,
  Zap,
  RefreshCw,
} from "lucide-react";

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
  const [splitMode, setSplitMode] = useState<"every" | "range" | "click">("range");
  const [splitInterval, setSplitInterval] = useState(2);
  const [rangeInput, setRangeInput] = useState("1-");
  const [cropLeft, setCropLeft] = useState(10);
  const [cropRight, setCropRight] = useState(10);
  const [cropTop, setCropTop] = useState(10);
  const [cropBottom, setCropBottom] = useState(10);
  const [bookmarkTitle, setBookmarkTitle] = useState("");
  const [annotationText, setAnnotationText] = useState("");
  const [zoomLevel, setZoomLevel] = useState<"sm" | "md" | "lg">("md");
  const [isDragging, setIsDragging] = useState(false);

  const selectedCount = pages.filter((p) => p.selected).length;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );
    if (droppedFiles.length > 0) onAddFile(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  // Batch Selection Helpers
  const handleSelectAll = () => {
    pages.forEach((_, idx) => {
      if (!pages[idx].selected && onToggleSelect) onToggleSelect(idx);
    });
  };

  const handleSelectNone = () => {
    pages.forEach((_, idx) => {
      if (pages[idx].selected && onToggleSelect) onToggleSelect(idx);
    });
  };

  const handleSelectEven = () => {
    pages.forEach((p, idx) => {
      const isEven = p.pageNumber % 2 === 0;
      if (p.selected !== isEven && onToggleSelect) onToggleSelect(idx);
    });
  };

  const handleSelectOdd = () => {
    pages.forEach((p, idx) => {
      const isOdd = p.pageNumber % 2 !== 0;
      if (p.selected !== isOdd && onToggleSelect) onToggleSelect(idx);
    });
  };

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {lang === "hi" ? "आपकी फ़ाइल तैयार है!" : "Your Edited PDF is Ready!"}
        </h3>
        <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
          {toolName} {lang === "hi" ? "सफलतापूर्वक पूरा हुआ।" : "processed your document successfully."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-7 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            {lang === "hi" ? "डाउनलोड करें" : "Download PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3.5 border border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-xl transition-colors"
          >
            {lang === "hi" ? "दूसरी फ़ाइल बदलें" : "Process Another File"}
          </button>
        </div>
      </div>
    );
  }

  // EMPTY STATE / HERO DROPZONE
  if (!fileName || pages.length === 0) {
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
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />

          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#E8792A]/15 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-[#E8792A]/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#E8792A] to-[#F59E0B] rounded-2xl flex items-center justify-center text-white shadow-md">
              {toolSlug === "split-pdf" ? (
                <Scissors className="w-10 h-10" />
              ) : toolSlug === "rotate-pdf" ? (
                <RotateCw className="w-10 h-10" />
              ) : toolSlug === "delete-pages" ? (
                <Trash2 className="w-10 h-10" />
              ) : toolSlug === "crop-pdf" ? (
                <Crop className="w-10 h-10" />
              ) : (
                <Layers className="w-10 h-10" />
              )}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#262B36] mb-2 tracking-tight">
            {isDragging
              ? lang === "hi"
                ? "यहाँ छोड़ें!"
                : "Drop PDF here!"
              : lang === "hi"
              ? "पीडीएफ फ़ाइल चुनें या यहाँ ड्रैग करें"
              : `Select PDF to ${toolName.toLowerCase()}`}
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] mb-6 max-w-lg mx-auto">
            {lang === "hi"
              ? "100% मुफ़्त और सुरक्षित। आपके डिवाइस पर ही रेंडर और एडिट होता है।"
              : "Visual page studio: organize, rotate, delete, or split with instant local page previews."}
          </p>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>{lang === "hi" ? "फ़ाइल चुनें" : "Select PDF Document"}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E8792A]" /> Instant Visual Grid
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% In-Browser Privacy
            </span>
          </div>
        </label>
      </div>
    );
  }

  // ACTIVE PAGE CANVAS STUDIO
  const gridClasses = {
    sm: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5",
    md: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5",
    lg: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
  }[zoomLevel];

  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Studio Top Control Bar */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-[#262B36] truncate max-w-[200px] sm:max-w-[320px]">
            {fileName}
          </span>
          <span className="text-xs text-[#78716C] bg-white border border-[#EFE1D2] px-2.5 py-0.5 rounded-full font-medium shrink-0">
            {pages.length} pages
          </span>
        </div>

        {/* Studio Utilities Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom Level Switcher */}
          <div className="flex items-center bg-white border border-[#EFE1D2] rounded-lg p-0.5 text-xs text-[#78716C]">
            <button
              onClick={() => setZoomLevel("sm")}
              className={`px-2 py-1 rounded ${zoomLevel === "sm" ? "bg-[#FBF1E9] font-bold text-[#E8792A]" : "hover:text-[#262B36]"}`}
              title="Compact View"
            >
              Small
            </button>
            <button
              onClick={() => setZoomLevel("md")}
              className={`px-2 py-1 rounded ${zoomLevel === "md" ? "bg-[#FBF1E9] font-bold text-[#E8792A]" : "hover:text-[#262B36]"}`}
              title="Default View"
            >
              Medium
            </button>
            <button
              onClick={() => setZoomLevel("lg")}
              className={`px-2 py-1 rounded ${zoomLevel === "lg" ? "bg-[#FBF1E9] font-bold text-[#E8792A]" : "hover:text-[#262B36]"}`}
              title="Large View"
            >
              Large
            </button>
          </div>

          {/* Batch Rotate Buttons */}
          {toolSlug === "rotate-pdf" && onRotateAll && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onRotateAll(270)}
                className="flex items-center gap-1 text-xs font-medium text-[#262B36] bg-white hover:bg-slate-50 border border-[#EFE1D2] px-2.5 py-1.5 rounded-lg shadow-2xs"
                title="Rotate all 90° counter-clockwise"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E8792A]" />
                <span className="hidden sm:inline">Left 90°</span>
              </button>
              <button
                onClick={() => onRotateAll(90)}
                className="flex items-center gap-1 text-xs font-medium text-[#262B36] bg-white hover:bg-slate-50 border border-[#EFE1D2] px-2.5 py-1.5 rounded-lg shadow-2xs"
                title="Rotate all 90° clockwise"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#E8792A]" />
                <span className="hidden sm:inline">Right 90°</span>
              </button>
            </div>
          )}

          {/* Batch Selection for Delete & Extract */}
          {(toolSlug === "delete-pages" || toolSlug === "extract-pages") && (
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={handleSelectAll}
                className="px-2 py-1 bg-white hover:bg-slate-50 border border-[#EFE1D2] rounded text-[#262B36] font-medium"
              >
                All
              </button>
              <button
                onClick={handleSelectEven}
                className="px-2 py-1 bg-white hover:bg-slate-50 border border-[#EFE1D2] rounded text-[#262B36] font-medium"
              >
                Even
              </button>
              <button
                onClick={handleSelectOdd}
                className="px-2 py-1 bg-white hover:bg-slate-50 border border-[#EFE1D2] rounded text-[#262B36] font-medium"
              >
                Odd
              </button>
              <button
                onClick={handleSelectNone}
                className="px-2 py-1 bg-white hover:bg-slate-50 border border-[#EFE1D2] rounded text-[#78716C] hover:text-[#262B36]"
              >
                Clear
              </button>
            </div>
          )}

          <button
            onClick={onReset}
            className="text-xs font-medium text-[#78716C] hover:text-[#262B36] px-2 py-1 transition-colors"
          >
            Change File
          </button>
        </div>
      </div>

      {/* Main Studio Body: Grid Canvas + Right Sidebar */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Column: Generous Page Thumbnails Grid Canvas */}
        <div className="flex-1 flex flex-col min-h-[480px] p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
          <div className={`grid ${gridClasses}`}>
            {pages.map((p, idx) => {
              const isDeleteCandidate = toolSlug === "delete-pages" && p.selected;
              return (
                <div key={p.id} className="relative group">
                  <div
                    onClick={() => {
                      if (onToggleSelect) onToggleSelect(idx);
                      onPageClick(idx);
                    }}
                    style={{ transform: `rotate(${p.rotation}deg)` }}
                    className={`aspect-[3/4] rounded-xl p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all relative overflow-hidden ${
                      isDeleteCandidate
                        ? "border-2 border-red-500 bg-red-50/90 shadow-md ring-2 ring-red-400/20"
                        : p.selected
                        ? "border-2 border-[#E8792A] ring-2 ring-[#E8792A]/30 bg-white shadow-md"
                        : "border border-[#EFE1D2] hover:border-[#E8792A]/60 bg-white hover:shadow-md"
                    }`}
                  >
                    {/* Header: Page Number & Selection Checkbox */}
                    <div className="w-full flex items-center justify-between text-xs font-bold text-[#262B36] z-10">
                      <span className="px-1.5 py-0.5 rounded bg-white/90 shadow-2xs">
                        P. {p.pageNumber}
                      </span>
                      {(toolSlug === "delete-pages" || toolSlug === "extract-pages") && (
                        <input
                          type="checkbox"
                          checked={p.selected}
                          onChange={(e) => {
                            e.stopPropagation();
                            onToggleSelect && onToggleSelect(idx);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className={`w-4 h-4 rounded cursor-pointer ${
                            toolSlug === "delete-pages" ? "accent-red-600" : "accent-[#E8792A]"
                          }`}
                        />
                      )}
                    </div>

                    {/* Page Thumbnail Preview or Vector Sheet */}
                    {p.dataUrl ? (
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.pageNumber}`}
                        className="w-full h-full object-contain my-1 rounded"
                      />
                    ) : (
                      <div className="w-full flex-1 border border-dashed border-[#EFE1D2] rounded-lg flex flex-col items-center justify-center text-[#78716C] my-2 bg-slate-50/60 p-2 text-center">
                        <FileText className="w-6 h-6 text-[#E8792A]/40 mb-1" />
                        <span className="text-[10px] font-medium">Page {p.pageNumber}</span>
                      </div>
                    )}

                    {/* Delete Candidate Red Overlay Overlay */}
                    {isDeleteCandidate && (
                      <div className="absolute inset-0 bg-red-600/15 backdrop-blur-[0.5px] flex flex-col items-center justify-center text-red-600 z-10 pointer-events-none">
                        <Trash2 className="w-7 h-7 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded">
                          Will Delete
                        </span>
                      </div>
                    )}

                    {/* Hover Rotate Trigger */}
                    {toolSlug === "rotate-pdf" && onRotatePage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRotatePage(idx);
                        }}
                        className="absolute bottom-2.5 right-2.5 p-1.5 bg-white border border-[#EFE1D2] hover:border-[#E8792A] hover:bg-[#FBF1E9] text-[#262B36] rounded-lg transition-all shadow-xs z-20"
                        title="Rotate Page 90° Clockwise"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-[#E8792A]" />
                      </button>
                    )}
                  </div>

                  {/* Split Scissor Cut Indicator between pages */}
                  {toolSlug === "split-pdf" && onToggleSplitPoint && (
                    <button
                      onClick={() => onToggleSplitPoint(idx)}
                      className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        p.isSplitPoint
                          ? "bg-[#E8792A] text-white shadow-md scale-110"
                          : "bg-white border border-[#EFE1D2] text-[#78716C] hover:text-[#E8792A] hover:scale-105 opacity-0 group-hover:opacity-100"
                      }`}
                      title={p.isSplitPoint ? "Remove split point" : "Split after this page"}
                    >
                      <Scissors className="w-3 h-3" />
                    </button>
                  )}

                  {/* Add Blank Page Trigger */}
                  {toolSlug === "add-blank-page" && onAddBlankPageAt && (
                    <button
                      onClick={() => onAddBlankPageAt(idx + 1)}
                      className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 bg-[#E8792A] hover:bg-[#D66B1E] text-white rounded-full flex items-center justify-center text-xs shadow-md transition-transform hover:scale-110"
                      title="Insert blank page here"
                    >
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Settings & Action Sidebar */}
        <div className="w-full lg:w-[320px] lg:min-w-[320px] bg-white border-t lg:border-t-0 lg:border-l border-[#EFE1D2] p-5 flex flex-col justify-between shrink-0 gap-5">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block border-b pb-2 border-[#EFE1D2]">
              {toolName} Options
            </span>

            {/* Split PDF Controls */}
            {toolSlug === "split-pdf" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#262B36] mb-1.5">
                    Split Mode
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSplitMode("range")}
                      className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors ${
                        splitMode === "range"
                          ? "bg-[#E8792A] text-white border-[#E8792A]"
                          : "bg-slate-50 border-[#EFE1D2] text-[#262B36]"
                      }`}
                    >
                      Custom Ranges
                    </button>
                    <button
                      type="button"
                      onClick={() => setSplitMode("every")}
                      className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors ${
                        splitMode === "every"
                          ? "bg-[#E8792A] text-white border-[#E8792A]"
                          : "bg-slate-50 border-[#EFE1D2] text-[#262B36]"
                      }`}
                    >
                      Every N Pages
                    </button>
                  </div>
                </div>

                {splitMode === "range" ? (
                  <div>
                    <label className="block font-semibold text-[#262B36] mb-1">
                      Page Ranges (e.g. 1-3, 5, 7-9)
                    </label>
                    <input
                      type="text"
                      value={rangeInput}
                      onChange={(e) => setRangeInput(e.target.value)}
                      placeholder="e.g. 1-4, 5-8"
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#E8792A] focus:bg-white"
                    />
                    <p className="text-[11px] text-[#78716C] mt-1">
                      Creates separate documents for each range specified.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-[#262B36] mb-1">
                      Split Every N Pages:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={pages.length}
                      value={splitInterval}
                      onChange={(e) => setSplitInterval(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E8792A]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Delete Pages Info */}
            {toolSlug === "delete-pages" && (
              <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3.5 space-y-1 text-xs text-red-800">
                <span className="font-bold flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" /> Pages marked for deletion:
                </span>
                <p className="text-sm font-bold">
                  {selectedCount} of {pages.length} pages
                </p>
                <p className="text-[11px] text-red-600">
                  {selectedCount === 0
                    ? "Click on any page thumbnail to mark it for deletion."
                    : `${pages.length - selectedCount} pages will remain in the new document.`}
                </p>
              </div>
            )}

            {/* Extract Pages Info */}
            {toolSlug === "extract-pages" && (
              <div className="bg-[#FBF1E9]/60 border border-[#EFE1D2] rounded-xl p-3.5 space-y-1 text-xs text-[#262B36]">
                <span className="font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E8792A]" /> Pages to extract:
                </span>
                <p className="text-sm font-bold text-[#E8792A]">
                  {selectedCount} of {pages.length} pages
                </p>
                <p className="text-[11px] text-[#78716C]">
                  Only the checked pages will be exported into the new PDF.
                </p>
              </div>
            )}

            {/* Crop PDF Controls */}
            {toolSlug === "crop-pdf" && (
              <div className="space-y-2 text-xs">
                <label className="block font-semibold text-[#262B36]">
                  Crop Margins (% from edge)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-[#78716C] block">Top %</span>
                    <input
                      type="number"
                      value={cropTop}
                      onChange={(e) => setCropTop(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded p-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#78716C] block">Bottom %</span>
                    <input
                      type="number"
                      value={cropBottom}
                      onChange={(e) => setCropBottom(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded p-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#78716C] block">Left %</span>
                    <input
                      type="number"
                      value={cropLeft}
                      onChange={(e) => setCropLeft(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded p-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#78716C] block">Right %</span>
                    <input
                      type="number"
                      value={cropRight}
                      onChange={(e) => setCropRight(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded p-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bookmark Editor Title */}
            {toolSlug === "bookmark-editor" && (
              <div className="text-xs">
                <label className="block font-semibold text-[#262B36] mb-1">Bookmark Title</label>
                <input
                  type="text"
                  value={bookmarkTitle}
                  onChange={(e) => setBookmarkTitle(e.target.value)}
                  placeholder="e.g. Chapter 1: Introduction"
                  className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2 text-xs"
                />
              </div>
            )}
          </div>

          {/* Action CTA & Privacy Assurance */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() =>
                onProcess({
                  splitMode,
                  splitInterval,
                  rangeInput: toolSlug === "split-pdf" ? rangeInput : "",
                  cropLeft,
                  cropRight,
                  cropTop,
                  cropBottom,
                  bookmarkTitle,
                  annotationText,
                })
              }
              disabled={isProcessing || (toolSlug === "delete-pages" && selectedCount === 0)}
              className="w-full py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Pages...</span>
                </>
              ) : (
                <>
                  <span>
                    {toolSlug === "delete-pages"
                      ? `Delete ${selectedCount} Selected Pages →`
                      : toolSlug === "extract-pages"
                      ? `Extract ${selectedCount} Pages →`
                      : toolSlug === "split-pdf"
                      ? "Split PDF Document →"
                      : `Apply ${toolName} →`}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] text-center">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Local In-Browser Canvas</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
