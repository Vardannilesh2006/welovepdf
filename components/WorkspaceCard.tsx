"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Layers, Sliders, Play, Download, Keyboard, HelpCircle } from "lucide-react";

interface WorkspaceCardProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
}

export default function WorkspaceCard({ toolSlug, toolName, lang }: WorkspaceCardProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ id: string; page: number; dataUrl: string }[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepMessage, setStepMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Settings states
  const [quality, setQuality] = useState(70); // compress-pdf
  const [watermarkText, setWatermarkText] = useState("WeLovePDF"); // watermark-pdf
  const [watermarkOpacity, setWatermarkOpacity] = useState(30);
  const [watermarkSize, setWatermarkSize] = useState(34);
  const [watermarkPosition, setWatermarkPosition] = useState("center"); // center, top-left, bottom-right etc
  const [splitRange, setSplitRange] = useState("1-"); // split-pdf
  const [splitEvery, setSplitEvery] = useState(1);

  // Keyboard shortcut modal state
  const [shortcutsModal, setShortcutsModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdCtrl && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        fileInputRef.current?.click();
      } else if (cmdCtrl && e.key === 'Enter') {
        e.preventDefault();
        handleRunTool();
      } else if (cmdCtrl && e.key.toLowerCase() === 'd' && success && downloadUrl) {
        e.preventDefault();
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = downloadName;
        a.click();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClearAll();
        setShortcutsModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [files, success, downloadUrl, downloadName, quality, watermarkText, watermarkOpacity, watermarkSize, watermarkPosition, splitRange, splitEvery]);

  // Load PDF page previews
  const loadPdfPreviews = async (fileList: File[]) => {
    if (fileList.length === 0 || !fileList[0].type.includes("pdf")) return;
    setLoadingPreviews(true);
    setPreviews([]);
    
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const file = fileList[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = Math.min(pdf.numPages, 8); // max 8 previews for speed
      
      const pagesToRender = [];
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          pagesToRender.push({
            id: `${file.name}-${i}`,
            page: i,
            dataUrl: canvas.toDataURL("image/jpeg")
          });
        }
      }
      setPreviews(pagesToRender);
    } catch (err) {
      console.error("Preview render failed:", err);
    } finally {
      setLoadingPreviews(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (selected.length === 0) return;
    
    // Limits validation: Free is 20MB
    const limit = 20 * 1024 * 1024;
    for (const f of selected) {
      if (f.size > limit) {
        setErrorMsg(
          lang === "en" 
            ? `This file is ${(f.size / (1024 * 1024)).toFixed(1)}MB. Free plan limit is 20MB. Upgrade to Pro for up to 200MB.`
            : `यह फ़ाइल ${(f.size / (1024 * 1024)).toFixed(1)}MB की है। मुफ्त सीमा 20MB है। 200MB तक की फाइलों के लिए प्रो में अपग्रेड करें।`
        );
        return;
      }
    }
    
    setFiles(selected);
    loadPdfPreviews(selected);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const selected = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
    if (selected.length === 0) return;
    
    const limit = 20 * 1024 * 1024;
    for (const f of selected) {
      if (f.size > limit) {
        setErrorMsg(
          lang === "en" 
            ? `This file is ${(f.size / (1024 * 1024)).toFixed(1)}MB. Free plan limit is 20MB. Upgrade to Pro for up to 200MB.`
            : `यह फ़ाइल ${(f.size / (1024 * 1024)).toFixed(1)}MB की है। मुफ्त सीमा 20MB है। 200MB तक की फाइलों के लिए प्रो में अपग्रेड करें।`
        );
        return;
      }
    }
    
    setFiles(selected);
    loadPdfPreviews(selected);
  };

  const handleClearAll = () => {
    setFiles([]);
    setPreviews([]);
    setSuccess(false);
    setDownloadUrl(null);
    setErrorMsg(null);
  };

  const handleRunTool = async () => {
    if (files.length === 0) return;
    setRunning(true);
    setProgress(15);
    setStepMessage(lang === "en" ? "Validating signature..." : "हस्ताक्षर का सत्यापन किया जा रहा है...");
    
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      
      // Inject tool settings in body
      formData.append("cropLeft", "0");
      formData.append("cropRight", "0");
      formData.append("cropTop", "0");
      formData.append("cropBottom", "0");
      formData.append("pages", splitRange);
      formData.append("quality", String(quality));
      formData.append("text", watermarkText);
      formData.append("opacity", String(watermarkOpacity / 100));
      formData.append("watermarkSize", String(watermarkSize));
      formData.append("watermarkPosition", watermarkPosition);

      // Simulate steps
      setTimeout(() => {
        setProgress(45);
        setStepMessage(lang === "en" ? "Processing files..." : "फ़ाइलों को प्रोसेस किया जा रहा है...");
      }, 500);

      setTimeout(() => {
        setProgress(75);
        setStepMessage(lang === "en" ? "Compiling PDF nodes..." : "पीडीएफ नोड्स को संकलित किया जा रहा है...");
      }, 1000);

      const res = await fetch(`/api/process/${toolSlug}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Execution failed.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      setProgress(100);
      setStepMessage(lang === "en" ? "Completed successfully!" : "सफलतापूर्वक पूरा हुआ!");
      setDownloadUrl(url);
      setDownloadName(`${toolSlug}.pdf`);
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setRunning(false);
    }
  };

  const relatedTools = [
    { label: lang === "en" ? "Merge PDF" : "पीडीएफ मर्ज करें", slug: "merge-pdf" },
    { label: lang === "en" ? "Compress PDF" : "पीडीएफ कंप्रेस करें", slug: "compress-pdf" },
    { label: lang === "en" ? "Protect PDF" : "पीडीएफ सुरक्षित करें", slug: "protect-pdf" },
  ];

  return (
    <div className="w-full max-w-[960px] mx-auto p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-lg transition-colors duration-200">
      
      {/* Header bar */}
      <div className="flex justify-between items-center pb-16 border-b border-border-light dark:border-border-dark mb-24">
        <h2 className="text-xl font-bold flex items-center gap-8">
          <Layers className="w-5 h-5 text-brand-blue" />
          {toolName} Workspace
        </h2>
        <div className="flex items-center gap-12">
          <button 
            onClick={() => setShortcutsModal(true)}
            className="flex items-center gap-6 text-[13px] text-text-secondaryLight dark:text-text-secondaryDark hover:text-brand-blue transition-colors"
            type="button"
          >
            <Keyboard className="w-4 h-4" />
            {lang === "en" ? "Keyboard Shortcuts" : "कीबोर्ड शॉर्टकट्स"}
          </button>
          {files.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-[13px] text-brand-error hover:underline"
              type="button"
            >
              {lang === "en" ? "Clear all" : "सभी साफ़ करें"}
            </button>
          )}
        </div>
      </div>

      {/* Main Double Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        
        {/* Left Panel: Upload Zone & Previews */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-24 border-2 border-dashed rounded-card transition-all ${
            files.length > 0 
              ? "border-border-light dark:border-border-dark bg-bg-light/40 dark:bg-bg-dark/10" 
              : "border-brand-blue/30 hover:border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/5"
          }`}
        >
          {files.length === 0 ? (
            <div className="text-center flex flex-col items-center py-32">
              <Upload className="w-12 h-12 text-brand-blue mb-16 animate-pulse-soft" />
              <p className="font-semibold text-text-primaryLight dark:text-text-primaryDark mb-8">
                {lang === "en" ? "Drag & Drop your PDF here" : "अपने पीडीएफ को यहाँ खींचें और छोड़ें"}
              </p>
              <p className="text-[13px] text-text-secondaryLight dark:text-text-secondaryDark mb-16">
                {lang === "en" ? "or click to select files" : "या फाइल चुनने के लिए क्लिक करें"}
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-16 py-8 bg-brand-blue text-white rounded-btn font-medium hover:bg-brand-blue/90 shadow-sm text-[14px]"
                type="button"
              >
                {lang === "en" ? "Browse Files" : "फ़ाइलें चुनें"}
              </button>
              <p className="text-[11px] text-text-secondaryLight/80 dark:text-text-secondaryDark/80 mt-16">
                Max size: 20MB for free users
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-16">
              <div className="flex items-center gap-12 bg-white dark:bg-bg-dark p-12 rounded-card border border-border-light dark:border-border-dark shadow-sm">
                <FileText className="w-8 h-8 text-brand-blue flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[14px] truncate">{files[0].name}</h4>
                  <p className="text-[12px] text-text-secondaryLight">
                    {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* PDF Page Previews Grid */}
              {loadingPreviews ? (
                <div className="flex items-center justify-center py-24 gap-8">
                  <RefreshCw className="w-4 h-4 text-brand-blue animate-spin" />
                  <span className="text-[13px] text-text-secondaryLight">Generating previews...</span>
                </div>
              ) : previews.length > 0 ? (
                <div className="grid grid-cols-3 gap-8 mt-8 max-h-[220px] overflow-y-auto p-4 border border-border-light dark:border-border-dark rounded-card bg-white dark:bg-bg-dark">
                  {previews.map((prev, idx) => (
                    <div key={idx} className="relative border border-border-light dark:border-border-dark rounded-card overflow-hidden bg-bg-light dark:bg-bg-dark">
                      <img src={prev.dataUrl} alt={`Page ${prev.page}`} className="w-full h-auto object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-2 font-mono">
                        Page {prev.page}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".pdf,.png,.jpg,.jpeg"
            multiple={toolSlug === "merge-pdf"}
          />
        </div>

        {/* Right Panel: Settings Panel */}
        <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-bg-light/30 dark:bg-bg-dark/5 flex flex-col justify-between">
          <div className="flex flex-col gap-16">
            <h3 className="font-semibold text-[15px] flex items-center gap-8 text-text-primaryLight dark:text-text-primaryDark pb-8 border-b border-border-light/60 dark:border-border-dark/60">
              <Sliders className="w-4 h-4 text-brand-amber" />
              {lang === "en" ? "Configure Settings" : "सेटिंग्स कॉन्फ़िगर करें"}
            </h3>

            {/* Tool specific settings forms */}
            {toolSlug === "compress-pdf" && (
              <div className="flex flex-col gap-12">
                <label className="text-[13px] font-medium">Quality Level: {quality}%</label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-6 bg-border-light dark:bg-border-dark rounded-pill appearance-none cursor-pointer accent-brand-blue"
                />
                <p className="text-[11px] text-text-secondaryLight/80">
                  Estimated output: ~{(files[0] ? (files[0].size * (quality / 130) / (1024 * 1024)).toFixed(2) : "0.00")} MB
                </p>
              </div>
            )}

            {toolSlug === "watermark-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="text-[13px] font-medium block mb-4">Watermark Text</label>
                  <input 
                    type="text" 
                    value={watermarkText} 
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded-input bg-white dark:bg-surface-dark text-[14px]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium block mb-4">Opacity ({watermarkOpacity}%)</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={watermarkOpacity} 
                    onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                    className="w-full accent-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium block mb-4">Position</label>
                  <select 
                    value={watermarkPosition} 
                    onChange={(e) => setWatermarkPosition(e.target.value)}
                    className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded-input bg-white dark:bg-surface-dark text-[14px]"
                  >
                    <option value="center">Center</option>
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
              </div>
            )}

            {toolSlug === "split-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="text-[13px] font-medium block mb-4">Page Ranges (e.g. 1-3, 5)</label>
                  <input 
                    type="text" 
                    value={splitRange} 
                    onChange={(e) => setSplitRange(e.target.value)}
                    className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded-input bg-white dark:bg-surface-dark text-[14px]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium block mb-4">Split every N pages</label>
                  <input 
                    type="number" 
                    value={splitEvery} 
                    onChange={(e) => setSplitEvery(Number(e.target.value))}
                    className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded-input bg-white dark:bg-surface-dark text-[14px]"
                  />
                </div>
              </div>
            )}

            {/* Default fallback info */}
            {!["compress-pdf", "watermark-pdf", "split-pdf"].includes(toolSlug) && (
              <p className="text-[13px] text-text-secondaryLight">
                {lang === "en" ? "No additional settings required for this tool. Files will compile with default high-quality profiles." : "इस टूल के लिए किसी अतिरिक्त सेटिंग की आवश्यकता नहीं है।"}
              </p>
            )}
          </div>

          {/* Action trigger button */}
          <div className="mt-24">
            <button
              onClick={handleRunTool}
              disabled={files.length === 0 || running}
              className={`w-full py-12 flex items-center justify-center gap-8 rounded-btn font-bold text-white shadow-btn transition-all duration-150 ${
                files.length === 0 || running
                  ? "bg-brand-blue/50 cursor-not-allowed"
                  : "bg-brand-blue hover:bg-brand-blue/90"
              }`}
              type="button"
            >
              <Play className="w-4 h-4" />
              {lang === "en" ? "Run Tool" : "टूल चलाएं"}
            </button>
          </div>
        </div>
      </div>

      {/* Progress system */}
      {(running || progress > 0) && (
        <div className="mt-24 p-16 border border-border-light dark:border-border-dark rounded-card bg-bg-light/40 dark:bg-bg-dark/10">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[13px] font-semibold flex items-center gap-6">
              {progress < 100 ? (
                <RefreshCw className="w-4 h-4 text-brand-blue animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-brand-success" />
              )}
              {stepMessage}
            </span>
            <span className="text-[13px] font-bold text-brand-blue">{progress}%</span>
          </div>
          <div className="w-full h-8 bg-border-light dark:bg-border-dark rounded-pill overflow-hidden">
            <div 
              className="h-full bg-brand-blue transition-all duration-300 rounded-pill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error Displays */}
      {errorMsg && (
        <div className="mt-24 p-16 flex items-start gap-12 border border-brand-error/20 bg-brand-error/5 text-brand-error rounded-card">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-2" />
          <p className="text-[14px] font-medium">{errorMsg}</p>
        </div>
      )}

      {/* Success state & download link */}
      {success && downloadUrl && (
        <div className="mt-24 p-24 border border-brand-success/20 bg-brand-success/5 rounded-card flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-12 h-12 text-brand-success mb-12" />
          <h3 className="font-bold text-lg text-text-primaryLight dark:text-text-primaryDark mb-4">
            {lang === "en" ? "Conversion completed!" : "रूपांतरण सफलतापूर्वक पूरा हुआ!"}
          </h3>
          <p className="text-[13px] text-text-secondaryLight mb-20">
            {lang === "en" ? "Your file is ready. Click download to retrieve it." : "आपकी फ़ाइल तैयार है। इसे प्राप्त करने के लिए डाउनलोड पर क्लिक करें।"}
          </p>
          <a
            href={downloadUrl}
            download={downloadName}
            className="px-24 py-12 bg-brand-success hover:bg-brand-success/90 text-white font-bold rounded-btn flex items-center gap-8 shadow-sm transition-all"
          >
            <Download className="w-5 h-5" />
            {lang === "en" ? "Download PDF" : "पीडीएफ डाउनलोड करें"}
          </a>

          {/* Related suggestions */}
          <div className="mt-32 pt-24 border-t border-border-light dark:border-border-dark/60 w-full">
            <p className="text-[13px] font-semibold text-text-primaryLight mb-12">
              {lang === "en" ? "What would you like to do next?" : "आप आगे क्या करना चाहेंगे?"}
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              {relatedTools.map((tag, idx) => (
                <a 
                  key={idx} 
                  href={`/${tag.slug}`}
                  className="px-12 py-6 border border-border-light dark:border-border-dark rounded-pill bg-white dark:bg-surface-dark text-[13px] hover:border-brand-blue hover:text-brand-blue transition-all"
                >
                  {tag.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {shortcutsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-16 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-[400px] p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-modal">
            <h3 className="font-bold text-lg flex items-center gap-8 mb-16">
              <Keyboard className="w-5 h-5 text-brand-blue" />
              {lang === "en" ? "Keyboard Shortcuts" : "कीबोर्ड शॉर्टकट्स"}
            </h3>
            <ul className="flex flex-col gap-12 text-[14px]">
              <li className="flex justify-between py-4 border-b border-border-light/60 dark:border-border-dark/60">
                <span>{lang === "en" ? "Upload File" : "फ़ाइल अपलोड करें"}</span>
                <kbd className="px-6 py-2 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded font-mono text-[12px]">Ctrl / ⌘ + U</kbd>
              </li>
              <li className="flex justify-between py-4 border-b border-border-light/60 dark:border-border-dark/60">
                <span>{lang === "en" ? "Run Tool" : "टूल चलाएं"}</span>
                <kbd className="px-6 py-2 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded font-mono text-[12px]">Ctrl / ⌘ + Enter</kbd>
              </li>
              <li className="flex justify-between py-4 border-b border-border-light/60 dark:border-border-dark/60">
                <span>{lang === "en" ? "Download Result" : "परिणाम डाउनलोड करें"}</span>
                <kbd className="px-6 py-2 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded font-mono text-[12px]">Ctrl / ⌘ + D</kbd>
              </li>
              <li className="flex justify-between py-4">
                <span>{lang === "en" ? "Clear Workspace" : "वर्क्सपेस साफ़ करें"}</span>
                <kbd className="px-6 py-2 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded font-mono text-[12px]">Escape</kbd>
              </li>
            </ul>
            <button 
              onClick={() => setShortcutsModal(false)}
              className="mt-24 w-full py-8 bg-brand-blue text-white rounded-btn font-semibold hover:bg-brand-blue/90 text-[14px]"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
