"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, ShieldCheck, PenLine, BadgeCheck, X } from "lucide-react";

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
  const [signatureText, setSignatureText] = useState("Nilesh Verma");
  const [signerTitle, setSignerTitle] = useState("Verified Signer");

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
          {toolSlug === "verify-signature" ? "Verification Report Ready!" : "PDF Signed Successfully!"}
        </h3>
        <p className="text-sm text-[#9C9488] mb-6">
          {toolName} completed in local browser sandbox.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resultUrl}
            download={`${toolSlug}-output.pdf`}
            className="px-6 py-3 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4 rotate-180" />
            Download Result
          </a>
          <button
            onClick={onReset}
            className="px-5 py-3 border-[0.5px] border-[#EFE1D2] text-[#262B36] hover:bg-[#FBF1E9] text-sm font-medium rounded-lg transition-colors"
          >
            Process Another File
          </button>
        </div>
      </div>
    );
  }

  if (!fileName) {
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
            {toolSlug === "sign-pdf" ? <PenLine className="w-6 h-6" /> : <BadgeCheck className="w-6 h-6" />}
          </div>
          <h3 className="text-lg font-medium text-[#262B36] mb-1">
            Upload PDF for {toolName}
          </h3>
          <p className="text-xs text-[#9C9488] mb-4">
            100% private in-browser digital signatures. Zero file uploads.
          </p>
          <span className="inline-block px-5 py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors">
            Choose PDF File
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-5 my-2 flex flex-col gap-4 max-h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between bg-[#FBF1E9]/60 border-[0.5px] border-[#EFE1D2] rounded-lg p-3">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#E8792A]" />
          <span className="text-sm font-medium text-[#262B36] truncate">{fileName}</span>
        </div>
        <button onClick={onReset} className="text-xs text-[#9C9488] hover:text-[#262B36] border-[0.5px] border-[#EFE1D2] bg-white px-2 py-1 rounded">
          Change File
        </button>
      </div>

      {toolSlug === "sign-pdf" ? (
        <div className="bg-[#FBF1E9]/30 border-[0.5px] border-[#EFE1D2] rounded-lg p-4 space-y-3 text-xs">
          <div>
            <label className="block text-[#262B36] font-medium mb-1">Signature Name / Text</label>
            <input
              type="text"
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-3 py-2 text-sm font-serif italic text-[#262B36]"
            />
          </div>
          <div>
            <label className="block text-[#262B36] font-medium mb-1">Title / Designation</label>
            <input
              type="text"
              value={signerTitle}
              onChange={(e) => setSignerTitle(e.target.value)}
              className="w-full bg-white border-[0.5px] border-[#EFE1D2] rounded px-3 py-1.5 text-xs text-[#262B36]"
            />
          </div>
        </div>
      ) : (
        <div className="bg-[#FBF1E9]/30 border-[0.5px] border-[#EFE1D2] rounded-lg p-4 text-xs text-[#262B36] space-y-2">
          <p className="font-medium">Ready to Scan Digital Signatures</p>
          <p className="text-[#9C9488]">Scans PKCS#7 / Adobe.PPKLite digital signatures and byte integrity hashes.</p>
        </div>
      )}

      <button
        onClick={() => onProcess({ signatureText, signerTitle })}
        disabled={isProcessing}
        className="w-full py-3 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? "Processing..." : `Execute ${toolName}`}
      </button>
    </div>
  );
}
