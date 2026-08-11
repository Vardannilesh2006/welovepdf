"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, QrCode, UserSquare, FileSpreadsheet, Download } from "lucide-react";

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

  if (resultUrl) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-6 text-center shadow-none my-2">
        <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-[#262B36] mb-1">
          {lang === "hi" ? "दस्तावेज़ तैयार है!" : "Document Generated Successfully!"}
        </h3>
        <p className="text-sm text-[#9C9488] mb-6">
          {toolName} generated in local browser memory.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-6 py-3 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
          <button
            onClick={onReset}
            className="px-5 py-3 border-[0.5px] border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-lg transition-colors"
          >
            Create Another Document
          </button>
        </div>
      </div>
    );
  }

  // Simple Centered Card for PDF to QR
  if (toolSlug === "pdf-to-qr") {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-6 my-2 max-w-xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto">
          <QrCode className="w-6 h-6" />
        </div>
        <h3 className="text-base font-medium text-[#262B36]">PDF / Link to QR Code Generator</h3>
        <div className="text-left">
          <label className="block text-xs font-medium text-[#262B36] mb-1">Enter URL or Target Link</label>
          <input
            type="url"
            value={qrUrl}
            onChange={(e) => setQrUrl(e.target.value)}
            className="w-full text-xs text-[#262B36] bg-white border-[0.5px] border-[#EFE1D2] rounded-lg p-2.5 focus:border-[#E8792A]"
          />
        </div>
        <button
          onClick={() => onProcess({ qrUrl })}
          disabled={isProcessing}
          className="w-full py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
        >
          {isProcessing ? "Generating QR Code..." : "Generate PDF QR Code"}
        </button>
      </div>
    );
  }

  // Split View Form Generator for Resume / Hindi Invoice Generator
  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] overflow-hidden my-2 flex flex-col md:flex-row h-[calc(100vh-140px)]">
      
      {/* Left Form Column (Internal Bounded Scroll) */}
      <div className="w-full md:w-1/2 p-5 border-b md:border-b-0 md:border-r [border-right-width:0.5px] border-[#EFE1D2] flex flex-col justify-between overflow-y-auto space-y-4">
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-[#262B36] border-b pb-2 border-[#EFE1D2]">
            {toolName} Form Inputs
          </h4>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-[#262B36] font-medium mb-1">Full Name / Business Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
              />
            </div>
            <div>
              <label className="block text-[#262B36] font-medium mb-1">Email / Contact Info</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
              />
            </div>
            <div>
              <label className="block text-[#262B36] font-medium mb-1">Title / Designation</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-2.5 py-1.5 focus:border-[#E8792A]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onProcess({ fullName, email, title })}
          disabled={isProcessing}
          className="w-full py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          {isProcessing ? "Generating PDF..." : `Generate ${toolName}`}
        </button>
      </div>

      {/* Right Live Preview Panel */}
      <div className="flex-1 bg-[#FBF1E9]/20 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-sm aspect-[3/4] bg-white border-[0.5px] border-[#EFE1D2] rounded-lg p-6 shadow-none flex flex-col justify-between text-left text-xs text-[#262B36]">
          <div>
            <h3 className="font-medium text-base text-[#262B36]">{fullName || "Your Name"}</h3>
            <p className="text-[#E8792A] text-xs font-medium">{title || "Professional Title"}</p>
            <p className="text-[11px] text-[#9C9488] border-b pb-3 border-[#EFE1D2] mb-3">{email}</p>

            <div className="space-y-2 text-[11px] text-[#9C9488]">
              <p>• Live preview updates as you type in the form.</p>
              <p>• High-resolution vector PDF export.</p>
            </div>
          </div>

          <div className="text-[10px] text-[#9C9488] border-t pt-2 border-[#EFE1D2]">
            WeLovePDF Form Generator
          </div>
        </div>
      </div>

    </div>
  );
}
