"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  ShieldCheck,
  PenLine,
  BadgeCheck,
  Type,
  Eraser,
  Download,
  Calendar,
  Shield,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface ArchetypeFProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  fileName: string;
  onProcess: (options: any) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
  onAddFile: (files: File[]) => void;
}

export default function ArchetypeF({
  toolSlug,
  toolName,
  lang,
  fileName,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
  onAddFile,
}: ArchetypeFProps) {
  // Signature modes: "draw" | "type" | "upload"
  const [signatureMode, setSignatureMode] = useState<"draw" | "type" | "upload">("draw");
  const [signatureText, setSignatureText] = useState("John Doe");
  const [signerTitle, setSignerTitle] = useState("Verified Signer");
  const [selectedFont, setSelectedFont] = useState<"cursive1" | "cursive2" | "cursive3" | "cursive4">("cursive1");
  const [penColor, setPenColor] = useState("#1e3a8a"); // Navy default
  const [penWidth, setPenWidth] = useState(2.5);
  const [includeDate, setIncludeDate] = useState(true);
  const [uploadedSigUrl, setUploadedSigUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // HTML5 Canvas for drawing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    if (signatureMode === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
      }
    }
  }, [signatureMode, penColor, penWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedSigUrl(url);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );
    if (droppedFiles.length > 0) onAddFile(droppedFiles);
  };

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {toolSlug === "verify-signature" ? "Verification Report Ready!" : "Document Signed Successfully!"}
        </h3>
        <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
          {toolName} completed in local browser memory with verified certificate stamping.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-7 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {lang === "hi" ? "डाउनलोड करें" : "Download Signed PDF"}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3.5 border border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-xl transition-colors"
          >
            Sign Another Document
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
              {toolSlug === "sign-pdf" ? <PenLine className="w-10 h-10" /> : <BadgeCheck className="w-10 h-10" />}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#262B36] mb-2 tracking-tight">
            {isDragging
              ? "Drop PDF to Sign!"
              : `Select PDF for ${toolName}`}
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] mb-6 max-w-lg mx-auto">
            100% private in-browser digital signature studio. Draw, type, or upload legal signatures with zero server upload.
          </p>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>Select PDF Document</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <PenLine className="w-3.5 h-3.5 text-[#E8792A]" /> Draw, Type & Upload
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Local RAM Processing
            </span>
          </div>
        </label>
      </div>
    );
  }

  // ACTIVE DIGITAL SIGNATURE STUDIO
  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Studio Header Strip */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-[#262B36] truncate max-w-[200px] sm:max-w-[320px]">
            {fileName}
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium shrink-0 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Ready to Sign
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-[#78716C] hover:text-[#262B36] px-2 py-1 transition-colors"
        >
          Change File
        </button>
      </div>

      {/* Main Studio Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Column: 3-Tab Signature Creator Pad */}
        <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 overflow-y-auto space-y-6">
          
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 border-[#EFE1D2]">
              <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider">
                Create Your Digital Signature
              </span>

              {/* 3 Tabs: Draw / Type / Upload */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSignatureMode("draw")}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    signatureMode === "draw" ? "bg-white text-[#E8792A] shadow-xs" : "text-[#78716C] hover:text-[#262B36]"
                  }`}
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Draw</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode("type")}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    signatureMode === "type" ? "bg-white text-[#E8792A] shadow-xs" : "text-[#78716C] hover:text-[#262B36]"
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Type</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode("upload")}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    signatureMode === "upload" ? "bg-white text-[#E8792A] shadow-xs" : "text-[#78716C] hover:text-[#262B36]"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DRAW SIGNATURE CANVAS */}
            {signatureMode === "draw" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#78716C]">
                  <span>Draw with mouse or fingertip on the canvas:</span>
                  <div className="flex items-center gap-2">
                    {/* Pen Colors */}
                    <div className="flex items-center gap-1.5">
                      {["#1e3a8a", "#0f172a", "#2563eb", "#dc2626"].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setPenColor(color)}
                          style={{ backgroundColor: color }}
                          className={`w-5 h-5 rounded-full border-2 transition-transform ${
                            penColor === color ? "border-[#E8792A] scale-110" : "border-white"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Clear Button */}
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs border border-[#EFE1D2] hover:bg-slate-50 text-slate-700 rounded-md"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-[#EFE1D2] rounded-xl bg-slate-50/50 p-2 flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full max-w-[500px] h-[160px] bg-white rounded-lg shadow-inner cursor-crosshair touch-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: TYPE SIGNATURE */}
            {signatureMode === "type" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#262B36] mb-1">
                    Enter Your Full Name:
                  </label>
                  <input
                    type="text"
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E8792A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "cursive1", name: "Executive Script", style: "font-serif italic font-bold" },
                    { id: "cursive2", name: "Calligraphic Elegant", style: "font-serif italic" },
                    { id: "cursive3", name: "Casual Flow", style: "font-mono italic tracking-wide" },
                    { id: "cursive4", name: "Formal Legal", style: "font-sans uppercase tracking-widest font-semibold" },
                  ].map((font) => (
                    <div
                      key={font.id}
                      onClick={() => setSelectedFont(font.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                        selectedFont === font.id
                          ? "border-[#E8792A] bg-[#FBF1E9]/50 shadow-xs ring-1 ring-[#E8792A]"
                          : "border-[#EFE1D2] bg-white hover:border-[#E8792A]/50"
                      }`}
                    >
                      <span className="text-[10px] text-[#78716C] block mb-1">{font.name}</span>
                      <p className={`text-lg text-[#1e3a8a] truncate ${font.style}`}>
                        {signatureText || "Signature"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: UPLOAD IMAGE */}
            {signatureMode === "upload" && (
              <div className="space-y-3">
                <label className="cursor-pointer border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleSignatureUpload}
                  />
                  <Upload className="w-8 h-8 text-[#E8792A] mb-2" />
                  <span className="text-xs font-semibold text-[#262B36]">
                    Upload Signature Image (PNG, JPG)
                  </span>
                  <span className="text-[11px] text-[#78716C] mt-0.5">
                    Transparent PNG recommended for best results
                  </span>
                </label>

                {uploadedSigUrl && (
                  <div className="p-3 bg-white border border-[#EFE1D2] rounded-xl flex items-center justify-between">
                    <img src={uploadedSigUrl} alt="Uploaded signature" className="h-12 object-contain" />
                    <button
                      onClick={() => setUploadedSigUrl(null)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SIGNER METADATA: Title & Date Stamp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <label className="block font-semibold text-[#262B36] mb-1">
                  Designation / Professional Title
                </label>
                <input
                  type="text"
                  value={signerTitle}
                  onChange={(e) => setSignerTitle(e.target.value)}
                  placeholder="e.g. Director, Verified Signer"
                  className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2 text-xs focus:outline-none focus:border-[#E8792A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="includeDate"
                  checked={includeDate}
                  onChange={(e) => setIncludeDate(e.target.checked)}
                  className="w-4 h-4 accent-[#E8792A] rounded cursor-pointer"
                />
                <label htmlFor="includeDate" className="font-semibold text-[#262B36] cursor-pointer">
                  Stamp Today's Date ({new Date().toISOString().split("T")[0]})
                </label>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-[#EFE1D2] shrink-0">
            <button
              onClick={() => onProcess({ signatureText, signerTitle, includeDate })}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Stamping Digital Signature...</span>
                </>
              ) : (
                <>
                  <span>Sign PDF Document Now →</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Sidebar: Live Document Signature Sheet Placement */}
        <div className="w-full lg:w-[320px] lg:min-w-[320px] bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-[#EFE1D2] p-5 flex flex-col justify-between shrink-0 gap-5">
          <div>
            <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block mb-3">
              Signature Placement Preview
            </span>

            {/* A4 Document Simulation Sheet */}
            <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between p-4">
              <div className="space-y-1.5 opacity-30">
                <div className="w-12 h-1.5 bg-slate-400 rounded" />
                <div className="w-full h-1 bg-slate-300 rounded" />
                <div className="w-3/4 h-1 bg-slate-300 rounded" />
                <div className="w-5/6 h-1 bg-slate-300 rounded" />
              </div>

              {/* Bottom Signature Badge on Document */}
              <div className="pt-3 border-t border-dashed border-slate-300">
                <div className="p-2 bg-blue-50/70 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-1 text-[8px] font-bold text-blue-800 uppercase tracking-wider mb-0.5">
                    <ShieldCheck className="w-3 h-3 text-blue-600" /> Digitally Signed
                  </div>
                  <p className="text-xs font-serif italic text-blue-900 font-bold truncate">
                    {signatureText || "John Doe"}
                  </p>
                  <p className="text-[8px] text-slate-600 truncate">{signerTitle}</p>
                  {includeDate && (
                    <p className="text-[7px] text-slate-500 font-mono mt-0.5">
                      {new Date().toLocaleDateString()} · 100% In-Browser Verified
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#EFE1D2] text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero-Storage Guarantee</span>
            </div>
            <p className="text-[11px] text-[#78716C] leading-tight">
              Signatures and documents are rendered directly inside client RAM and never touch any database.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
