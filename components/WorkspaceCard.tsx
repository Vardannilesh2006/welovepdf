"use client";

import React, { useState, useEffect, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { trackEvent } from "../lib/analytics";

// Import the 9 UI Archetype Components
import ArchetypeA from "./workspace/ArchetypeA";
import ArchetypeB from "./workspace/ArchetypeB";
import ArchetypeC from "./workspace/ArchetypeC";
import ArchetypeD from "./workspace/ArchetypeD";
import ArchetypeE from "./workspace/ArchetypeE";
import ArchetypeF from "./workspace/ArchetypeF";
import ArchetypeG from "./workspace/ArchetypeG";
import ArchetypeH from "./workspace/ArchetypeH";
import ArchetypeI from "./workspace/ArchetypeI";

interface WorkspaceCardProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
}

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number;
}

export default function WorkspaceCard({ toolSlug, toolName, lang }: WorkspaceCardProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pages, setPages] = useState<{ id: string; pageNumber: number; rotation: number; selected: boolean; isSplitPoint?: boolean }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Determine which archetype this tool belongs to
  const archetypeType = getArchetypeForTool(toolSlug);

  const handleAddFiles = async (newFiles: File[]) => {
    setErrorMsg(null);
    const addedItems: UploadedFile[] = [];

    for (const file of newFiles) {
      let pageCount = 1;
      if (file.name.toLowerCase().endsWith(".pdf")) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
          pageCount = pdfDoc.getPageCount();
        } catch (e) {
          console.warn("PDF load warning:", e);
        }
      }

      addedItems.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
        pageCount,
      });
    }

    setFiles((prev) => [...prev, ...addedItems]);

    // If single file tool (Archetype B), build page list
    if (addedItems.length > 0 && files.length === 0) {
      const firstFile = addedItems[0];
      const pageList = Array.from({ length: firstFile.pageCount }, (_, i) => ({
        id: `page-${i + 1}`,
        pageNumber: i + 1,
        rotation: 0,
        selected: false,
        isSplitPoint: false,
      }));
      setPages(pageList);
    }

    trackEvent("file_uploaded", {
      tool: toolSlug,
      file_count: addedItems.length,
      file_size_kb: Math.round(addedItems.reduce((acc, f) => acc + f.size, 0) / 1024),
    });
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleReorderFiles = (newFiles: UploadedFile[]) => {
    setFiles(newFiles);
  };

  const handleRenameFile = (id: string, newName: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: newName } : f)));
  };

  const handleReset = () => {
    setFiles([]);
    setPages([]);
    setResultUrl(null);
    setAiOutput(null);
    setErrorMsg(null);
    setIsProcessing(false);
  };

  // Processing Handler
  const handleProcess = async (options: any = {}) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setErrorMsg(null);

    trackEvent("processing_started", { tool: toolSlug });

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f.file));
      if (options.text) formData.append("text", options.text);
      if (options.quality) formData.append("quality", String(options.quality));
      if (options.password) formData.append("password", options.password);
      if (options.ocrLang) formData.append("ocrLang", options.ocrLang);
      if (options.splitInterval) formData.append("pages", String(options.splitInterval));

      const res = await fetch(`/api/process/${toolSlug}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: "Processing failed." }));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("text/plain")) {
        const textResult = await res.text();
        setAiOutput(textResult);
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
      }

      trackEvent("processing_completed", { tool: toolSlug });
    } catch (err: any) {
      console.error("Processing error:", err);
      setErrorMsg(err.message || "An unexpected error occurred during processing.");
      trackEvent("tool_error", { tool: toolSlug, error: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {errorMsg && (
        <div className="mb-3 p-3 bg-red-50 border-[0.5px] border-red-200 text-red-700 text-xs rounded-lg flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="font-bold ml-2">×</button>
        </div>
      )}

      {/* Render Specific Archetype Component based on Tool Taxonomy */}
      {archetypeType === "A" && (
        <ArchetypeA
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          files={files}
          onAddFiles={handleAddFiles}
          onRemoveFile={handleRemoveFile}
          onReorderFiles={handleReorderFiles}
          onRenameFile={handleRenameFile}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
        />
      )}

      {archetypeType === "B" && (
        <ArchetypeB
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          fileName={files[0]?.name || ""}
          pages={pages}
          onPageClick={(idx) => {}}
          onRotatePage={(idx) => {
            setPages((prev) =>
              prev.map((p, i) => (i === idx ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
            );
          }}
          onRotateAll={(deg) => {
            setPages((prev) => prev.map((p) => ({ ...p, rotation: (p.rotation + deg) % 360 })));
          }}
          onToggleSelect={(idx) => {
            setPages((prev) => prev.map((p, i) => (i === idx ? { ...p, selected: !p.selected } : p)));
          }}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
          onAddFile={handleAddFiles}
        />
      )}

      {archetypeType === "C" && (
        <ArchetypeC
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          fileName={files[0]?.name || ""}
          fileSize={files[0]?.size || 0}
          pageCount={files[0]?.pageCount || 1}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
          onAddFile={handleAddFiles}
        />
      )}

      {archetypeType === "D" && (
        <ArchetypeD
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          files={files}
          onAddFiles={handleAddFiles}
          onRemoveFile={handleRemoveFile}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
        />
      )}

      {archetypeType === "E" && (
        <ArchetypeE
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
        />
      )}

      {archetypeType === "F" && (
        <ArchetypeF
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          fileName={files[0]?.name || ""}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
          onAddFile={handleAddFiles}
        />
      )}

      {archetypeType === "G" && (
        <ArchetypeG
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          fileName={files[0]?.name || ""}
          pageCount={files[0]?.pageCount || 1}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          onReset={handleReset}
          onAddFile={handleAddFiles}
        />
      )}

      {archetypeType === "H" && (
        <ArchetypeH
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          fileName={files[0]?.name || ""}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          aiOutput={aiOutput}
          onReset={handleReset}
          onAddFile={handleAddFiles}
        />
      )}

      {archetypeType === "I" && (
        <ArchetypeI
          toolSlug={toolSlug}
          toolName={toolName}
          lang={lang}
          onProcess={handleProcess}
          isProcessing={isProcessing}
          resultUrl={resultUrl}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

// 63-Tool Archetype Mapping Function according to RULE 1 Taxonomy
function getArchetypeForTool(slug: string): "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" {
  // Archetype A: Multi-file collector (2 tools)
  if (["merge-pdf", "compare-pdf"].includes(slug)) return "A";

  // Archetype B: Single-file page-canvas editor (11 tools)
  if (
    [
      "split-pdf",
      "delete-pages",
      "extract-pages",
      "reorder-pages",
      "rotate-pdf",
      "duplicate-pages",
      "add-blank-page",
      "crop-pdf",
      "annotate-pdf",
      "redact-pdf",
      "bookmark-editor",
    ].includes(slug)
  )
    return "B";

  // Archetype C: Upload + options (16 tools)
  if (
    [
      "page-numbers",
      "watermark-pdf",
      "header-footer",
      "metadata-editor",
      "flatten-pdf",
      "compress-pdf",
      "grayscale-pdf",
      "repair-pdf",
      "remove-hidden-data",
      "deskew-scan",
      "auto-enhance-scan",
      "remove-background",
      "ocr-pdf",
      "protect-pdf",
      "unlock-pdf",
      "bates-numbering",
    ].includes(slug)
  )
    return "C";

  // Archetype D: File format converter (16 tools)
  if (
    [
      "pdf-to-text",
      "pdf-to-markdown",
      "pdf-to-jpg",
      "pdf-to-png",
      "pdf-to-long-image",
      "pdf-to-word",
      "pdf-to-excel",
      "pdf-to-powerpoint",
      "pdf-to-html",
      "pdf-to-csv",
      "jpg-to-pdf",
      "png-to-pdf",
      "image-to-pdf",
      "word-to-pdf",
      "excel-to-pdf",
      "powerpoint-to-pdf",
    ].includes(slug)
  )
    return "D";

  // Archetype E: Text/URL converter (4 tools)
  if (["html-to-pdf", "markdown-to-pdf", "text-to-pdf", "url-to-pdf"].includes(slug)) return "E";

  // Archetype F: Signature tools (2 tools)
  if (["sign-pdf", "verify-signature"].includes(slug)) return "F";

  // Archetype G: Reader / viewer (4 tools)
  if (["pdf-reader", "search-in-pdf", "accessibility-checker", "invert-colors"].includes(slug)) return "G";

  // Archetype H: AI conversational (5 tools)
  if (["ask-pdf", "summarize-pdf", "translate-pdf", "quiz-from-pdf", "invoice-extractor"].includes(slug)) return "H";

  // Archetype I: Form generator (3 tools)
  if (["resume-to-pdf", "hindi-invoice-generator", "pdf-to-qr"].includes(slug)) return "I";

  // Default Fallback to C
  return "C";
}
