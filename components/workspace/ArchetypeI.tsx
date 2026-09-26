"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  QrCode,
  UserSquare,
  FileSpreadsheet,
  Download,
  Shield,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface ArchetypeIProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  onProcess: (formData: any) => void;
  isProcessing: boolean;
  resultUrl: string | null;
  onReset: () => void;
}

export default function ArchetypeI({
  toolSlug,
  toolName,
  lang,
  onProcess,
  isProcessing,
  resultUrl,
  onReset,
}: ArchetypeIProps) {
  // Form States
  const [fullName, setFullName] = useState("Nilesh Verma");
  const [email, setEmail] = useState("nilesh@welovepdf.best");
  const [title, setTitle] = useState("Full Stack & Security Engineer");
  const [qrUrl, setQrUrl] = useState("https://www.welovepdf.best");

  // SUCCESS / DOWNLOAD SCREEN
  if (resultUrl) {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-12 text-center shadow-sm my-2 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#262B36] tracking-tight mb-2">
          {lang === "hi" ? "दस्तावेज़ तैयार है!" : "Document Generated Successfully!"}
        </h3>
        <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
          {toolName} generated in local browser memory with crisp vector typography.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-7 py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {lang === "hi" ? "डाउनलोड करें" : "Download PDF Document"}
          </a>
          <button
            onClick={onReset}
            className="px-6 py-3.5 border border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-xl transition-colors"
          >
            Create Another Document
          </button>
        </div>
      </div>
    );
  }

  // QR CODE GENERATOR
  if (toolSlug === "pdf-to-qr") {
    return (
      <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl p-8 sm:p-10 my-2 max-w-xl mx-auto text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#E8792A]/20 to-[#E8792A]/10 text-[#E8792A] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <QrCode className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#262B36]">PDF / Link to QR Code Generator</h3>
          <p className="text-xs text-[#78716C] mt-1">
            Generate high-resolution vector QR codes linking directly to your documents.
          </p>
        </div>

        <div className="text-left space-y-1.5">
          <label className="block text-xs font-semibold text-[#262B36]">Target Document URL or Link</label>
          <input
            type="url"
            value={qrUrl}
            onChange={(e) => setQrUrl(e.target.value)}
            className="w-full text-xs text-[#262B36] bg-slate-50 border border-[#EFE1D2] rounded-xl p-3 focus:outline-none focus:border-[#E8792A] focus:bg-white transition-all"
          />
        </div>

        <button
          onClick={() => onProcess({ qrUrl })}
          disabled={isProcessing}
          className="w-full py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating QR Code...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate PDF QR Code →</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C]">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Client-Side Vector QR Generation</span>
        </div>
      </div>
    );
  }

  // SPLIT VIEW FORM GENERATOR FOR RESUME & HINDI INVOICE
  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col lg:flex-row shadow-sm">
      
      {/* Left Form Column */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#EFE1D2] flex flex-col justify-between overflow-y-auto space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3 border-[#EFE1D2]">
            <UserSquare className="w-5 h-5 text-[#E8792A]" />
            <h4 className="text-xs font-bold text-[#262B36] uppercase tracking-wider">
              {toolName} Information
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-[#262B36] mb-1">
                Full Name / Business Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2.5 focus:outline-none focus:border-[#E8792A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#262B36] mb-1">
                Email / Contact Details
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2.5 focus:outline-none focus:border-[#E8792A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#262B36] mb-1">
                Title / Designation / Organization
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-[#EFE1D2] rounded-lg p-2.5 focus:outline-none focus:border-[#E8792A]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#EFE1D2]">
          <button
            onClick={() => onProcess({ fullName, email, title })}
            disabled={isProcessing}
            className="w-full py-3.5 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Vector PDF...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate {toolName} →</span>
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] text-center">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% In-Browser Privacy</span>
          </div>
        </div>
      </div>

      {/* Right Live Preview Panel */}
      <div className="flex-1 bg-slate-50/70 p-6 sm:p-10 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-sm aspect-[3/4] bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between text-left text-xs text-[#262B36]">
          <div>
            <div className="border-b pb-4 mb-4 border-slate-100">
              <h3 className="font-bold text-lg text-[#262B36]">{fullName || "Your Full Name"}</h3>
              <p className="text-[#E8792A] text-xs font-semibold mt-0.5">{title || "Professional Designation"}</p>
              <p className="text-[11px] text-[#78716C] mt-1">{email}</p>
            </div>

            <div className="space-y-2.5 text-[11px] text-[#78716C]">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E8792A]" /> Live Vector Synchronized Preview
              </div>
              <p>• Clean typographical hierarchy designed for hiring ATS and official invoicing.</p>
              <p>• High-resolution ISO 32000 PDF export with embedded vector fonts.</p>
            </div>
          </div>

          <div className="text-[10px] text-[#78716C] border-t pt-3 border-slate-100 flex items-center justify-between">
            <span>WeLovePDF Engine</span>
            <span>A4 Document</span>
          </div>
        </div>
      </div>

    </div>
  );
}
