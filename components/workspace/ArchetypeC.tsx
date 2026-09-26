"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  Sliders,
  Shield,
  Lock,
  Unlock,
  Stamp,
  Hash,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  RefreshCw,
  Gauge,
  Check,
  FileCheck,
} from "lucide-react";

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
  // Compression presets & strategy
  const getInitialTargetKB = () => {
    if (toolSlug === "compress-pdf-to-100kb" || toolSlug === "compress-pdf-for-ssc-upsc") return 100;
    if (toolSlug === "compress-pdf-to-200kb") return 200;
    if (toolSlug === "compress-pdf-to-50kb") return 50;
    if (toolSlug === "compress-pdf-to-500kb") return 500;
    return null;
  };

  const [activePreset, setActivePreset] = useState<number | null>(getInitialTargetKB());
  const [compressLevel, setCompressLevel] = useState<number>(65); // 65% quality ~ 60% compression
  const [compressionTier, setCompressionTier] = useState<"extreme" | "recommended" | "high">("recommended");

  // Watermark state
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkPos, setWatermarkPos] = useState("center");
  const [watermarkOpacity, setWatermarkOpacity] = useState(40);
  const [watermarkColor, setWatermarkColor] = useState("#DC2626"); // Red default
  const [watermarkAngle, setWatermarkAngle] = useState(45);

  // Security & Passwords
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Bates & Header/Footer
  const [batesPrefix, setBatesPrefix] = useState("DOC-");
  const [startNumber, setStartNumber] = useState(1);

  // OCR
  const [ocrLang, setOcrLang] = useState("eng");

  const [isDragging, setIsDragging] = useState(false);

  // Sync compression tiers
  const selectTier = (tier: "extreme" | "recommended" | "high") => {
    setCompressionTier(tier);
    setActivePreset(null);
    if (tier === "extreme") setCompressLevel(30); // ~80% reduction
    if (tier === "recommended") setCompressLevel(65); // ~60% reduction
    if (tier === "high") setCompressLevel(85); // ~30% reduction
  };

  const applyTargetKB = (targetKB: number) => {
    setActivePreset(targetKB);
    const originalKB = Math.round(fileSize / 1024);
    if (originalKB > 0) {
      const calculatedPct = Math.min(95, Math.max(15, Math.round((targetKB / originalKB) * 100)));
      setCompressLevel(calculatedPct);
    }
  };

  useEffect(() => {
    if (activePreset && fileSize > 0) {
      const originalKB = Math.round(fileSize / 1024);
      const calculatedPct = Math.min(95, Math.max(15, Math.round((activePreset / originalKB) * 100)));
      setCompressLevel(calculatedPct);
    }
  }, [fileSize, activePreset]);

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

  // Telemetry Calculations
  const originalSizeKB = Math.round(fileSize / 1024);
  const estimatedSizeKB = Math.max(10, Math.round((originalSizeKB * compressLevel) / 100));
  const estimatedSavingsPct = Math.max(5, Math.round(100 - (estimatedSizeKB / Math.max(1, originalSizeKB)) * 100));

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: "Empty", score: 0, color: "bg-slate-200" };
    if (pwd.length < 6) return { label: "Weak", score: 33, color: "bg-red-500" };
    if (pwd.length < 10) return { label: "Medium", score: 66, color: "bg-amber-500" };
    return { label: "Strong (AES-128)", score: 100, color: "bg-emerald-500" };
  };
  const pwdStrength = getPasswordStrength(password);

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {lang === "hi" ? "आपकी फ़ाइल तैयार है!" : "Your Optimized PDF is Ready!"}
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
              {toolSlug.startsWith("compress-pdf") ? (
                <Gauge className="w-10 h-10" />
              ) : toolSlug === "protect-pdf" ? (
                <Lock className="w-10 h-10" />
              ) : toolSlug === "unlock-pdf" ? (
                <Unlock className="w-10 h-10" />
              ) : toolSlug === "watermark-pdf" ? (
                <Stamp className="w-10 h-10" />
              ) : toolSlug === "page-numbers" || toolSlug === "bates-numbering" ? (
                <Hash className="w-10 h-10" />
              ) : (
                <Sliders className="w-10 h-10" />
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
              ? "100% मुफ़्त और सुरक्षित। फ़ाइलें ब्राउज़र में ही प्रोसेस होती हैं।"
              : "High-precision in-browser optimization, stamping, and security suite."}
          </p>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>{lang === "hi" ? "फ़ाइल चुनें" : "Select PDF Document"}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E8792A]" /> Instant WebAssembly
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Client-Side Privacy
            </span>
          </div>
        </label>
      </div>
    );
  }

  // 9-GRID POSITION HELPER
  const gridPositions = [
    { id: "top-left", label: "TL" },
    { id: "top-center", label: "TC" },
    { id: "top-right", label: "TR" },
    { id: "middle-left", label: "ML" },
    { id: "center", label: "Center" },
    { id: "middle-right", label: "MR" },
    { id: "bottom-left", label: "BL" },
    { id: "bottom-center", label: "BC" },
    { id: "bottom-right", label: "BR" },
  ];

  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Horizontal File Telemetry Strip */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-[#262B36] truncate max-w-[200px] sm:max-w-[320px]">
            {fileName}
          </span>
          <span className="text-xs text-[#78716C] bg-white border border-[#EFE1D2] px-2.5 py-0.5 rounded-full font-medium shrink-0">
            {pageCount} pages · {originalSizeKB} KB
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-[#78716C] hover:text-[#262B36] px-2 py-1 transition-colors"
        >
          Change File
        </button>
      </div>

      {/* Main Studio Body: Controls + Live Document Sheet Preview */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Column: Dedicated Tool Control Deck */}
        <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 overflow-y-auto space-y-6">
          
          <div className="space-y-6 flex-1">
            
            {/* 1. COMPRESSION CONTROL DECK */}
            {toolSlug.startsWith("compress-pdf") && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block mb-2">
                    1. Select Compression Strategy
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Extreme */}
                    <div
                      onClick={() => selectTier("extreme")}
                      className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                        compressionTier === "extreme"
                          ? "border-[#E8792A] bg-[#FBF1E9]/50 shadow-sm ring-1 ring-[#E8792A]"
                          : "border-[#EFE1D2] bg-white hover:border-[#E8792A]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[#262B36]">Extreme</span>
                        <span className="text-[10px] font-bold text-[#E8792A] bg-white px-2 py-0.5 rounded border border-[#EFE1D2]">
                          ~80% Cut
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C] leading-snug">
                        Highest size reduction. Best for government exam portals (&lt;50KB / &lt;100KB).
                      </p>
                    </div>

                    {/* Recommended */}
                    <div
                      onClick={() => selectTier("recommended")}
                      className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                        compressionTier === "recommended"
                          ? "border-[#E8792A] bg-[#FBF1E9]/50 shadow-sm ring-1 ring-[#E8792A]"
                          : "border-[#EFE1D2] bg-white hover:border-[#E8792A]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[#262B36]">Recommended</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ~60% Cut
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C] leading-snug">
                        Perfect balance. Maintains crisp text and good image clarity.
                      </p>
                    </div>

                    {/* High Quality */}
                    <div
                      onClick={() => selectTier("high")}
                      className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                        compressionTier === "high"
                          ? "border-[#E8792A] bg-[#FBF1E9]/50 shadow-sm ring-1 ring-[#E8792A]"
                          : "border-[#EFE1D2] bg-white hover:border-[#E8792A]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[#262B36]">High Quality</span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          ~30% Cut
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C] leading-snug">
                        Lowest compression. Preserves original high-DPI quality for printing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Indian Exam & Target Size Presets */}
                <div>
                  <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block mb-2">
                    2. Target Portal Presets (1-Click)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Photo / Sign (50 KB)", kb: 50 },
                      { label: "UPSC / EPFO (100 KB)", kb: 100 },
                      { label: "SSC CGL / CHSL (200 KB)", kb: 200 },
                      { label: "College Portal (500 KB)", kb: 500 },
                      { label: "Court / Legal (2 MB)", kb: 2048 },
                    ].map((p) => {
                      const isSelected = activePreset === p.kb;
                      return (
                        <button
                          key={p.kb}
                          type="button"
                          onClick={() => applyTargetKB(p.kb)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isSelected
                              ? "bg-[#E8792A] text-white border-[#E8792A] shadow-xs"
                              : "bg-slate-50 text-[#262B36] border-[#EFE1D2] hover:border-[#E8792A]"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Granular Slider & Live Savings Dial */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#262B36]">Granular Quality Dial</span>
                    <span className="text-[#E8792A] font-bold text-sm">{compressLevel}% Quality</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="95"
                    value={compressLevel}
                    onChange={(e) => {
                      setActivePreset(null);
                      setCompressLevel(Number(e.target.value));
                    }}
                    className="w-full accent-[#E8792A] cursor-pointer"
                  />

                  {/* Savings Telemetry Gauge */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#78716C] block uppercase font-medium">Original</span>
                      <span className="font-bold text-[#262B36]">{originalSizeKB} KB</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#78716C] block uppercase font-medium">Estimated Result</span>
                      <span className="font-bold text-emerald-600">~{estimatedSizeKB} KB</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#78716C] block uppercase font-medium">Projected Savings</span>
                      <span className="font-bold text-[#E8792A]">~{estimatedSavingsPct}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. WATERMARK STUDIO */}
            {toolSlug === "watermark-pdf" && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#262B36] mb-1">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="CONFIDENTIAL, DRAFT, DO NOT COPY"
                    className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E8792A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 9-Grid Positioner */}
                  <div>
                    <label className="block font-semibold text-[#262B36] mb-1.5">
                      Position on Page (9-Grid)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 max-w-[200px]">
                      {gridPositions.map((pos) => (
                        <button
                          key={pos.id}
                          type="button"
                          onClick={() => setWatermarkPos(pos.id)}
                          className={`py-2 text-[10px] font-bold rounded border transition-colors ${
                            watermarkPos === pos.id
                              ? "bg-[#E8792A] text-white border-[#E8792A]"
                              : "bg-slate-50 hover:bg-slate-100 border-[#EFE1D2] text-[#262B36]"
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Opacity & Rotation */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[#78716C] mb-1">
                        <span className="font-medium text-[#262B36]">Opacity</span>
                        <span>{watermarkOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={watermarkOpacity}
                        onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                        className="w-full accent-[#E8792A]"
                      />
                    </div>

                    <div>
                      <span className="block font-medium text-[#262B36] mb-1.5">Color</span>
                      <div className="flex items-center gap-2">
                        {["#DC2626", "#262B36", "#4B5563", "#2563EB"].map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setWatermarkColor(col)}
                            style={{ backgroundColor: col }}
                            className={`w-6 h-6 rounded-full border-2 transition-transform ${
                              watermarkColor === col ? "border-[#E8792A] scale-110" : "border-white"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PAGE NUMBERS & BATES NUMBERING */}
            {(toolSlug === "page-numbers" || toolSlug === "bates-numbering" || toolSlug === "header-footer") && (
              <div className="space-y-4 text-xs">
                {toolSlug === "bates-numbering" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#262B36] mb-1">Prefix</label>
                      <input
                        type="text"
                        value={batesPrefix}
                        onChange={(e) => setBatesPrefix(e.target.value)}
                        className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#262B36] mb-1">Starting Number</label>
                      <input
                        type="number"
                        min="1"
                        value={startNumber}
                        onChange={(e) => setStartNumber(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-[#262B36] mb-1.5">
                    Position on Page
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 max-w-[200px]">
                    {gridPositions.map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setWatermarkPos(pos.id)}
                        className={`py-2 text-[10px] font-bold rounded border transition-colors ${
                          watermarkPos === pos.id
                            ? "bg-[#E8792A] text-white border-[#E8792A]"
                            : "bg-slate-50 hover:bg-slate-100 border-[#EFE1D2] text-[#262B36]"
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. PROTECT & UNLOCK PDF */}
            {(toolSlug === "protect-pdf" || toolSlug === "unlock-pdf") && (
              <div className="space-y-4 text-xs max-w-md">
                <div>
                  <label className="block font-semibold text-[#262B36] mb-1.5">
                    {toolSlug === "protect-pdf" ? "Set Document Password" : "Enter Password to Unlock"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={toolSlug === "protect-pdf" ? "Enter a strong password" : "Document password"}
                      className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg pl-3 pr-10 py-2.5 text-xs focus:outline-none focus:border-[#E8792A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#262B36]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {toolSlug === "protect-pdf" && password && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#78716C]">Strength:</span>
                      <span className="font-semibold text-[#262B36]">{pwdStrength.label}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                        style={{ width: `${pwdStrength.score}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 leading-relaxed">
                  🔒 Encrypted locally using ISO 32000 standard AES-128 bit security. Your password is never sent to any server.
                </div>
              </div>
            )}

            {/* 5. OCR PDF */}
            {toolSlug === "ocr-pdf" && (
              <div className="space-y-3 text-xs max-w-sm">
                <div>
                  <label className="block font-semibold text-[#262B36] mb-1.5">
                    Document Language for OCR
                  </label>
                  <select
                    value={ocrLang}
                    onChange={(e) => setOcrLang(e.target.value)}
                    className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#E8792A]"
                  >
                    <option value="eng">English (Latin Script)</option>
                    <option value="hin">Hindi (हिन्दी - Devanagari)</option>
                    <option value="spa">Spanish (Español)</option>
                    <option value="fra">French (Français)</option>
                    <option value="deu">German (Deutsch)</option>
                  </select>
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Transforms scanned image pages into fully searchable, selectable PDF text layers.
                </p>
              </div>
            )}

          </div>

          {/* Bottom Action CTA */}
          <div className="pt-4 border-t border-[#EFE1D2] shrink-0">
            <button
              onClick={() =>
                onProcess({
                  compressLevel,
                  watermarkText,
                  watermarkPos,
                  watermarkOpacity,
                  password,
                  ocrLang,
                  batesPrefix,
                  startNumber,
                })
              }
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {toolSlug.startsWith("compress-pdf")
                      ? `Compress PDF (~${estimatedSizeKB} KB) →`
                      : toolSlug === "watermark-pdf"
                      ? "Apply Watermark →"
                      : toolSlug === "protect-pdf"
                      ? "Encrypt & Protect PDF →"
                      : `Execute ${toolName} →`}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Sidebar: Live Document Sheet Visualizer */}
        <div className="w-full lg:w-[320px] lg:min-w-[320px] bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-[#EFE1D2] p-5 flex flex-col justify-between shrink-0 gap-5">
          <div>
            <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block mb-3">
              Document Visualizer
            </span>

            {/* A4 Sheet Simulation Card */}
            <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between p-3.5">
              {/* Top Watermark Slot */}
              <div className="flex justify-between text-[8px] text-[#78716C]">
                <span>{watermarkPos.includes("top") ? watermarkText : ""}</span>
                <span>{toolSlug === "page-numbers" && watermarkPos.includes("top") ? "1" : ""}</span>
              </div>

              {/* Center Sheet Watermark Simulation */}
              <div className="flex-1 flex items-center justify-center relative">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full border border-dashed border-slate-200 rounded flex flex-col items-center justify-center text-slate-300">
                    <FileText className="w-10 h-10 mb-1" />
                    <span className="text-[9px]">Page 1</span>
                  </div>
                )}

                {/* Simulated Watermark Text Overlay */}
                {toolSlug === "watermark-pdf" && watermarkText && (
                  <div
                    style={{
                      opacity: watermarkOpacity / 100,
                      color: watermarkColor,
                      transform: watermarkPos === "center" ? `rotate(-${watermarkAngle}deg)` : "none",
                    }}
                    className={`absolute font-black tracking-widest text-center select-none pointer-events-none ${
                      watermarkPos === "center"
                        ? "text-base uppercase"
                        : "text-xs uppercase"
                    }`}
                  >
                    {watermarkText}
                  </div>
                )}
              </div>

              {/* Bottom Watermark / Page Number Slot */}
              <div className="flex justify-between text-[8px] text-[#78716C] pt-2 border-t border-slate-100">
                <span>{watermarkPos.includes("bottom") ? watermarkText : ""}</span>
                <span>{toolSlug === "page-numbers" && watermarkPos.includes("bottom") ? "Page 1 of " + pageCount : ""}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#EFE1D2] text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy</span>
            </div>
            <p className="text-[11px] text-[#78716C] leading-tight">
              All encryption and compression executes entirely inside your browser's WebAssembly sandbox.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
