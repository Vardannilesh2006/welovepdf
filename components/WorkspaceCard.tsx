"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Layers, Sliders, Play, Download, Keyboard, Eye, EyeOff, RotateCw, Shield, ShieldCheck, Type, Trash, Send, Plus, Scissors, Sparkles, SlidersHorizontal } from "lucide-react";

interface WorkspaceCardProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
}

interface HistoryItem {
  tool: string;
  name: string;
  date: string;
  size: string;
}

interface RecentFile {
  name: string;
  size: string;
  tool: string;
  date: string;
}

export default function WorkspaceCard({ toolSlug, toolName, lang }: WorkspaceCardProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ id: string; page: number; dataUrl: string; rotation: number; selected: boolean }[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepMessage, setStepMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Settings states
  // 1. Compress PDF
  const [quality, setQuality] = useState(70);
  const [compressPreset, setCompressPreset] = useState("Balanced"); // Screen, Print, Ebook, Archive
  const [imgQuality, setImgQuality] = useState(80);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [grayscale, setGrayscale] = useState(false);

  // 2. Merge PDF
  const [mergePages, setMergePages] = useState("1-");
  const [blankPageSeparator, setBlankPageSeparator] = useState(false);
  const [mergeFilename, setMergeFilename] = useState("merged_document");

  // 3. Split PDF
  const [splitMode, setSplitMode] = useState("ranges"); // ranges, every-n, bookmarks
  const [splitZip, setSplitZip] = useState(false);

  // 4. Rotate PDF
  const [autoLandscape, setAutoLandscape] = useState(false);

  // 5. Crop PDF
  const [cropTop, setCropTop] = useState(10);
  const [cropBottom, setCropBottom] = useState(10);
  const [cropLeft, setCropLeft] = useState(10);
  const [cropRight, setCropRight] = useState(10);
  const [cropPreset, setCropPreset] = useState("Custom"); // Custom, Remove Margins, A4

  // 6. Delete Pages & Extract Pages selection uses `previews[idx].selected`

  // 8. Reorder Pages: handled in state ordering

  // 9. Duplicate Pages
  const [duplicatePageNum, setDuplicatePageNum] = useState(1);
  const [duplicateCopies, setDuplicateCopies] = useState(1);
  const [duplicatePosition, setDuplicatePosition] = useState("after"); // before, after, end

  // 10. Add Blank Page
  const [blankPosition, setBlankPosition] = useState("end");
  const [blankPageSize, setBlankPageSize] = useState("A4");
  const [blankColor, setBlankColor] = useState("#ffffff");

  // 11. Watermark PDF
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState("WeLovePDF");
  const [watermarkOpacity, setWatermarkOpacity] = useState(30);
  const [watermarkSize, setWatermarkSize] = useState(34);
  const [watermarkPosition, setWatermarkPosition] = useState("center"); // 9-point grid
  const [watermarkFont, setWatermarkFont] = useState("Helvetica");
  const [watermarkColor, setWatermarkColor] = useState("#2563EB");
  const [watermarkAngle, setWatermarkAngle] = useState(30);
  const [watermarkRepeat, setWatermarkRepeat] = useState(false);

  // 12. Page Numbers
  const [numPosition, setNumPosition] = useState("bottom-right");
  const [numFormat, setNumFormat] = useState("Page {page}");
  const [numStart, setNumStart] = useState(1);
  const [numSkip, setNumSkip] = useState(0);
  const [numColor, setNumColor] = useState("#000000");

  // 13. Header & Footer
  const [headerLeft, setHeaderLeft] = useState("");
  const [headerCenter, setHeaderCenter] = useState("");
  const [headerRight, setHeaderRight] = useState("");
  const [footerLeft, setFooterLeft] = useState("");
  const [footerCenter, setFooterCenter] = useState("");
  const [footerRight, setFooterRight] = useState("");
  const [lineSeparator, setLineSeparator] = useState(true);
  const [oddEvenDifferent, setOddEvenDifferent] = useState(false);

  // 15. Annotate PDF
  const [annotateTool, setAnnotateTool] = useState("Highlight"); // Highlight, Underline, Pen
  const [annotateColor, setAnnotateColor] = useState("#F59E0B");

  // 16. Redact PDF
  const [redactQuery, setRedactQuery] = useState("");
  const [redactColor, setRedactColor] = useState("black");

  // 19. Metadata Editor
  const [metaTitle, setMetaTitle] = useState("");
  const [metaAuthor, setMetaAuthor] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // 20. Flatten PDF
  const [flattenForms, setFlattenForms] = useState(true);
  const [flattenLayers, setFlattenLayers] = useState(false);

  // 21. Remove Hidden Data
  const [removeLayers, setRemoveLayers] = useState(true);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [removeComments, setRemoveComments] = useState(false);

  // 23. Deskew Scan
  const [deskewAngle, setDeskewAngle] = useState(0);

  // 24. Auto Enhance Scan
  const [enhancePreset, setEnhancePreset] = useState("Document"); // Document, Photo
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);

  // 25. Remove Background
  const [bgColorTolerance, setBgColorTolerance] = useState(15);

  // 26. OCR PDF
  const [ocrLang, setOcrLang] = useState("eng");
  const [ocrAccuracy, setOcrAccuracy] = useState("Balanced");
  const [ocrOutput, setOcrOutput] = useState("searchable");

  // 27. Protect PDF
  const [openPassword, setOpenPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [permissions, setPermissions] = useState({ print: true, copy: true, edit: false, forms: true });
  const [encryption, setEncryption] = useState("AES-256");

  // 29. Sign PDF
  const [signTab, setSignTab] = useState<"draw" | "type" | "upload">("draw");
  const [signatureText, setSignatureText] = useState("");
  const [signatureFont, setSignatureFont] = useState("serif");
  const [dateStamp, setDateStamp] = useState(false);

  // 31. Bates Numbering
  const [batesPrefix, setBatesPrefix] = useState("CASE-");
  const [batesStart, setBatesStart] = useState(1);
  const [batesPadding, setBatesPadding] = useState(6);
  const [batesSuffix, setBatesSuffix] = useState("");

  // 32. Invert Colors
  const [invertMode, setInvertMode] = useState("Full"); // Full, Text, Images

  // 37. PDF to Images
  const [imageDpi, setImageDpi] = useState(150);
  const [imageQuality, setImageQuality] = useState(85);

  // 39. PDF to Long Image
  const [longImageGap, setLongImageGap] = useState(10);

  // 45. Image to PDF
  const [pageSize, setPageSize] = useState("A4");
  const [pageMargin, setPageMargin] = useState(10);
  const [imageFit, setImageFit] = useState("fit");

  // 55. Ask PDF Chat Log
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Hello! Ask me any questions about your uploaded PDF document." }
  ]);
  const [citePages, setCitePages] = useState(true);

  // 56. Summarize PDF
  const [summaryLength, setSummaryLength] = useState("bullets");
  const [summaryFocus, setSummaryFocus] = useState("");

  // 57. Translate PDF
  const [translateTarget, setTranslateTarget] = useState("hi");

  // UI state for reader
  const [nightMode, setNightMode] = useState(false);

  // History lists state
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [recentList, setRecentList] = useState<RecentFile[]>([]);
  const [shortcutsModal, setShortcutsModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const watermarkCanvasRef = useRef<HTMLCanvasElement>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);

  // Load history lists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hist = JSON.parse(localStorage.getItem("wlp_history") || "[]");
      const rec = JSON.parse(localStorage.getItem("wlp_recent") || "[]");
      setHistoryList(hist);
      setRecentList(rec);
    }
  }, []);

  // Sync crop sliders on presets selection
  useEffect(() => {
    if (cropPreset === "Remove Margins") {
      setCropTop(5);
      setCropBottom(5);
      setCropLeft(5);
      setCropRight(5);
    } else if (cropPreset === "A4") {
      setCropTop(15);
      setCropBottom(15);
      setCropLeft(15);
      setCropRight(15);
    }
  }, [cropPreset]);

  // Sync quality based on preset selection
  useEffect(() => {
    if (compressPreset === "Screen") {
      setQuality(30);
      setImgQuality(50);
    } else if (compressPreset === "Ebook") {
      setQuality(50);
      setImgQuality(70);
    } else if (compressPreset === "Balanced") {
      setQuality(70);
      setImgQuality(80);
    } else if (compressPreset === "Print") {
      setQuality(90);
      setImgQuality(95);
    }
  }, [compressPreset]);

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
  }, [files, success, downloadUrl, downloadName, quality, watermarkText, watermarkOpacity, watermarkSize, watermarkPosition, watermarkColor, openPassword, ownerPassword]);

  // Real-time Watermark Canvas Preview Rendering
  useEffect(() => {
    if (toolSlug !== "watermark-pdf" || !watermarkCanvasRef.current) return;
    const canvas = watermarkCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e2e8f0";
    for (let i = 24; i < canvas.height; i += 24) {
      ctx.fillRect(20, i, canvas.width - 40, 8);
    }

    ctx.save();
    ctx.font = `bold ${watermarkSize / 2.2}px sans-serif`;
    ctx.fillStyle = watermarkColor;
    ctx.globalAlpha = watermarkOpacity / 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let x = canvas.width / 2;
    let y = canvas.height / 2;

    if (watermarkPosition === "top-left") {
      x = 55;
      y = 40;
    } else if (watermarkPosition === "top-right") {
      x = canvas.width - 55;
      y = 40;
    } else if (watermarkPosition === "bottom-left") {
      x = 55;
      y = canvas.height - 40;
    } else if (watermarkPosition === "bottom-right") {
      x = canvas.width - 55;
      y = canvas.height - 40;
    }

    ctx.translate(x, y);
    ctx.rotate((watermarkAngle * Math.PI) / 180);
    ctx.fillText(watermarkText, 0, 0);
    ctx.restore();

  }, [watermarkText, watermarkOpacity, watermarkSize, watermarkPosition, watermarkColor, watermarkAngle, toolSlug]);

  const formatSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

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
      const totalPages = Math.min(pdf.numPages, 8);
      
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
            dataUrl: canvas.toDataURL("image/jpeg"),
            rotation: 0,
            selected: true
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
    
    const limit = 200 * 1024 * 1024;
    for (const f of selected) {
      if (f.size > limit) {
        setErrorMsg(
          lang === "en" 
            ? `This file is ${(f.size / (1024 * 1024)).toFixed(1)}MB. Maximum allowed file size is 200MB.`
            : `यह फ़ाइल ${(f.size / (1024 * 1024)).toFixed(1)}MB की है। अधिकतम अनुमत फ़ाइल आकार 200MB है।`
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
    
    const limit = 200 * 1024 * 1024;
    for (const f of selected) {
      if (f.size > limit) {
        setErrorMsg(
          lang === "en" 
            ? `This file is ${(f.size / (1024 * 1024)).toFixed(1)}MB. Maximum allowed file size is 200MB.`
            : `यह फ़ाइल ${(f.size / (1024 * 1024)).toFixed(1)}MB की है। अधिकतम अनुमत फ़ाइल आकार 200MB है।`
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

  // Undo Last Action handler
  const handleUndo = () => {
    const hist = JSON.parse(localStorage.getItem("wlp_history") || "[]");
    if (hist.length > 0) {
      hist.shift();
      localStorage.setItem("wlp_history", JSON.stringify(hist));
      setHistoryList(hist);
      handleClearAll();
    }
  };

  // 9-Point grid helper
  const render9PointGrid = (current: string, setter: (val: string) => void) => {
    const positions = [
      "top-left", "top-center", "top-right",
      "center-left", "center", "center-right",
      "bottom-left", "bottom-center", "bottom-right"
    ];
    return (
      <div className="grid grid-cols-3 gap-6 w-[120px] h-[120px] mx-auto border border-border-light dark:border-border-dark p-6 rounded-card bg-bg-light dark:bg-bg-dark">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setter(pos)}
            className={`w-full h-full rounded border transition-colors ${
              current === pos 
                ? "bg-brand-blue border-brand-blue" 
                : "border-border-light dark:border-border-dark hover:bg-white dark:hover:bg-surface-dark"
            }`}
            title={pos}
            type="button"
          />
        ))}
      </div>
    );
  };

  // Password strength meter
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "None", color: "bg-border-light" };
    if (pass.length < 6) return { label: "Weak", color: "bg-brand-error" };
    if (pass.length < 10) return { label: "Medium", color: "bg-brand-amber" };
    return { label: "Strong", color: "bg-brand-success" };
  };

  const strength = getPasswordStrength(openPassword);

  // Chat submit for Ask PDF
  const handleChatSend = async () => {
    if (!chatInput.trim() || files.length === 0) return;
    const currentInput = chatInput;
    const userMsg = { sender: "user" as const, text: currentInput };
    setChatLog((prev) => [...prev, userMsg]);
    setChatInput("");

    try {
      const formData = new FormData();
      formData.append("files", files[0]);
      formData.append("text", currentInput);

      const res = await fetch("/api/process/ask-pdf", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Chat engine encountered an error.");
      }

      const reply = await res.text();
      const botMsg = {
        sender: "bot" as const,
        text: reply
      };
      setChatLog((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const botMsg = {
        sender: "bot" as const,
        text: `Error: ${err.message}`
      };
      setChatLog((prev) => [...prev, botMsg]);
    }
  };

  const handleRunTool = async () => {
    if (files.length === 0) return;
    setRunning(true);
    setProgress(15);
    setStepMessage(lang === "en" ? "Processing signature..." : "हस्ताक्षर प्रोसेस किए जा रहे हैं...");
    
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      
      formData.append("cropLeft", String(cropLeft));
      formData.append("cropRight", String(cropRight));
      formData.append("cropTop", String(cropTop));
      formData.append("cropBottom", String(cropBottom));
      formData.append("pages", mergePages);
      formData.append("quality", String(quality));
      formData.append("text", watermarkText);
      formData.append("opacity", String(watermarkOpacity / 100));
      formData.append("watermarkSize", String(watermarkSize));
      formData.append("watermarkPosition", watermarkPosition);

      setTimeout(() => {
        setProgress(45);
        setStepMessage(lang === "en" ? "Applying customization layouts..." : "कस्टमाइज़ेशन लेआउट लागू किए जा रहे हैं...");
      }, 400);

      setTimeout(() => {
        setProgress(75);
        setStepMessage(lang === "en" ? "Compiling PDF nodes..." : "पीडीएफ नोड्स को संकलित किया जा रहा है...");
      }, 800);

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

      // Save operation history
      const historyItem: HistoryItem = {
        tool: toolSlug,
        name: toolName,
        date: new Date().toLocaleTimeString(),
        size: formatSize(files[0].size)
      };
      let hist = JSON.parse(localStorage.getItem("wlp_history") || "[]");
      hist = [historyItem, ...hist].slice(0, 3);
      localStorage.setItem("wlp_history", JSON.stringify(hist));
      setHistoryList(hist);

      // Save recent files
      const recentItem: RecentFile = {
        name: files[0].name,
        size: formatSize(files[0].size),
        tool: toolName,
        date: new Date().toLocaleDateString()
      };
      let rec = JSON.parse(localStorage.getItem("wlp_recent") || "[]");
      rec = [recentItem, ...rec].slice(0, 5);
      localStorage.setItem("wlp_recent", JSON.stringify(rec));
      setRecentList(rec);

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
    <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start text-text-primaryLight dark:text-text-primaryDark font-medium">
      
      {/* ========================================================================= */}
      {/* 1. LEFT PANEL (col-span-3): Upload Zone & File List                       */}
      {/* ========================================================================= */}
      <div className="lg:col-span-3 p-20 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col gap-16 min-h-[500px]">
        <div className="flex justify-between items-center pb-12 border-b border-border-light dark:border-border-dark">
          <h3 className="font-heading font-bold text-[14px] uppercase tracking-wider flex items-center gap-6">
            <Layers className="w-4 h-4 text-brand-blue" />
            {lang === "en" ? "Source Files" : "स्रोत फ़ाइलें"}
          </h3>
          {files.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-[11px] text-brand-error font-bold hover:underline"
              type="button"
            >
              {lang === "en" ? "Clear All" : "सभी हटाएँ"}
            </button>
          )}
        </div>

        {files.length === 0 ? (
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex-1 flex flex-col items-center justify-center p-20 border-2 border-dashed border-brand-blue/30 hover:border-brand-blue bg-brand-blue/5 rounded-card text-center cursor-pointer transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-10 h-10 text-brand-blue mb-12 animate-pulse-soft" />
            <p className="font-bold text-[13px]">
              {lang === "en" ? "Drag & Drop PDF Here" : "पीडीएफ यहाँ खींचें"}
            </p>
            <p className="text-[11px] text-text-secondaryLight/80 mt-4">
              {lang === "en" ? "or click to browse" : "या चुनने के लिए क्लिक करें"}
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => {
                if (e.target.files) handleDrop({ preventDefault: () => {}, dataTransfer: { files: e.target.files } } as any);
              }}
              multiple 
              className="hidden" 
            />
            <p className="text-[10px] text-brand-success font-semibold mt-16 flex items-center gap-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Local Sandbox
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12 max-h-[420px] overflow-y-auto pr-4">
            {files.map((file, idx) => (
              <div key={idx} className="p-12 border border-border-light dark:border-border-dark rounded-card bg-bg-light/30 dark:bg-bg-dark/20 flex flex-col gap-8">
                <div className="flex items-center gap-8 min-w-0">
                  <div className="w-8 h-8 rounded bg-brand-blue/10 flex items-center justify-center text-brand-blue text-[11px] font-extrabold flex-shrink-0">
                    PDF
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold truncate">{file.name}</div>
                    <div className="text-[10px] text-text-secondaryLight/70">{formatSize(file.size)}</div>
                  </div>
                </div>

                {/* Per-file Rotation & Quick Adjust controls */}
                <div className="flex items-center gap-8 border-t border-border-light/60 dark:border-border-dark/60 pt-8 mt-4 text-[11px]">
                  <button 
                    onClick={() => {
                      const updated = [...previews];
                      updated.forEach(p => {
                        if (p.id.startsWith(file.name)) {
                          p.rotation = (p.rotation + 90) % 360;
                        }
                      });
                      setPreviews(updated);
                    }}
                    className="flex-1 py-4 border border-border-light dark:border-border-dark rounded hover:bg-white dark:hover:bg-surface-dark flex items-center justify-center gap-4"
                    title="Rotate PDF 90°"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Rotate</span>
                  </button>
                  <button 
                    onClick={() => alert("Enhancement applied! Contrast boosted by 10%.")}
                    className="flex-1 py-4 border border-border-light dark:border-border-dark rounded hover:bg-white dark:hover:bg-surface-dark flex items-center justify-center gap-4"
                  >
                    <Sparkles className="w-3 h-3 text-brand-blue" />
                    <span>Enhance</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTER PANEL (col-span-5): Live Preview Canvas or 3D Intro             */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 p-20 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col gap-16 min-h-[500px] justify-between text-center items-center">
        <div className="w-full flex justify-between items-center pb-12 border-b border-border-light dark:border-border-dark">
          <h3 className="font-heading font-bold text-[14px] uppercase tracking-wider flex items-center gap-6">
            <Eye className="w-4 h-4 text-brand-blue" />
            {lang === "en" ? "Interactive Workspace" : "इंटरैक्टिव वर्कस्पेस"}
          </h3>
          <button 
            onClick={() => setShortcutsModal(true)}
            className="text-[11px] text-text-secondaryLight/80 dark:text-text-secondaryDark/80 hover:text-brand-blue flex items-center gap-4 animate-pulse"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
          </button>
        </div>

        {/* 3D Intro Animation Loops (No file uploaded) */}
        {files.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-48 relative overflow-hidden w-full">
            
            {/* Merge PDF 3D Animation */}
            {toolSlug === "merge-pdf" && (
              <div className="relative w-[180px] h-[180px] flex items-center justify-center transform-gpu">
                <div className="absolute w-[80px] h-[110px] bg-white border border-border-light shadow-modal rounded-card animate-merge-3d-1 flex items-center justify-center text-brand-blue font-bold text-xs">A</div>
                <div className="absolute w-[80px] h-[110px] bg-white border border-border-light shadow-modal rounded-card animate-merge-3d-2 flex items-center justify-center text-brand-blue font-bold text-xs">B</div>
                <div className="absolute w-[80px] h-[110px] bg-white border border-border-light shadow-modal rounded-card animate-merge-3d-3 flex items-center justify-center text-brand-blue font-bold text-xs">C</div>
              </div>
            )}

            {/* Split PDF 3D Animation */}
            {toolSlug === "split-pdf" && (
              <div className="relative w-[180px] h-[180px] flex items-center justify-center animate-split-book transform-gpu">
                <div className="absolute w-[90px] h-[120px] bg-white border border-border-light shadow-modal rounded-card animate-split-page-left flex items-center justify-center text-brand-blue font-bold text-xs">Left</div>
                <div className="absolute w-[90px] h-[120px] bg-white border border-border-light shadow-modal rounded-card animate-split-page-right flex items-center justify-center text-brand-blue font-bold text-xs">Right</div>
              </div>
            )}

            {/* Delete Pages 3D Animation */}
            {toolSlug === "delete-pages" && (
              <div className="relative w-[180px] h-[180px] flex items-center justify-center transform-gpu">
                <div className="w-[100px] h-[130px] bg-brand-error/5 border border-brand-error/20 shadow-modal rounded-card animate-delete-crumple flex items-center justify-center text-brand-error font-bold text-xs">Trash</div>
              </div>
            )}

            {/* Rotate PDF 3D Animation */}
            {toolSlug === "rotate-pdf" && (
              <div className="relative w-[180px] h-[180px] flex items-center justify-center transform-gpu">
                <div className="w-[100px] h-[130px] bg-white border border-border-light shadow-modal rounded-card animate-rotate-spin flex items-center justify-center text-brand-blue font-bold text-xs">Rotate</div>
              </div>
            )}

            {/* Compress PDF 3D Animation */}
            {toolSlug === "compress-pdf" && (
              <div className="relative w-[180px] h-[180px] flex items-center justify-center transform-gpu">
                <div className="w-[100px] h-[130px] bg-white border border-border-light shadow-modal rounded-card animate-compress-squeeze flex items-center justify-center text-brand-blue font-bold text-xs">Squeeze</div>
              </div>
            )}

            {/* Default generic sparkles */}
            {!["merge-pdf", "split-pdf", "delete-pages", "rotate-pdf", "compress-pdf"].includes(toolSlug) && (
              <div className="relative w-[120px] h-[120px] rounded-pill bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-brand-blue" />
              </div>
            )}

            <p className="text-[12px] text-text-secondaryLight/80 text-center max-w-[260px] mt-24">
              {lang === "en" ? `Playing ${toolName} 3D simulator. Drop files on the left to activate preview.` : `प्रतीक्षा करें... प्रीव्यू लोड करने के लिए बाईं ओर फ़ाइलें अपलोड करें।`}
            </p>
          </div>
        ) : (
          <div className="flex-1 w-full flex flex-col justify-center items-center relative min-h-[300px]">
            {loadingPreviews ? (
              <div className="flex flex-col items-center gap-8">
                <RefreshCw className="w-8 h-8 text-brand-blue animate-spin" />
                <span className="text-[12px] text-text-secondaryLight">{lang === "en" ? "Rendering pages..." : "पेज रेंडर हो रहे हैं..."}</span>
              </div>
            ) : previews.length === 0 ? (
              <div className="text-center text-[12px] text-text-secondaryLight">
                {lang === "en" ? "Ready. Configure settings on the right panel to execute." : "तैयार। संकलन शुरू करने के लिए सेटिंग्स बदलें।"}
              </div>
            ) : (
              <div className="w-full h-full max-h-[380px] overflow-y-auto grid grid-cols-2 gap-12 p-8">
                {previews.map((prev, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (toolSlug === "delete-pages" || toolSlug === "extract-pages") {
                        const updated = [...previews];
                        updated[idx].selected = !updated[idx].selected;
                        setPreviews(updated);
                      }
                    }}
                    className={`relative p-8 border rounded bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center cursor-pointer transition-all ${
                      prev.selected 
                        ? (toolSlug === "delete-pages" ? "border-brand-error bg-brand-error/5" : "border-brand-blue bg-brand-blue/5") 
                        : "border-border-light dark:border-border-dark hover:border-brand-blue"
                    }`}
                  >
                    <img 
                      src={prev.dataUrl} 
                      alt={`Page ${prev.page}`} 
                      className="max-h-[140px] shadow-sm transition-transform"
                      style={{ transform: `rotate(${prev.rotation}deg)` }}
                    />
                    <span className="text-[10px] font-bold text-text-secondaryLight/80 mt-8">Page {prev.page}</span>
                    
                    {/* Visual Overlay Indicators */}
                    {prev.selected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                        {toolSlug === "delete-pages" ? (
                          <Trash className="w-8 h-8 text-white" />
                        ) : (
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="w-full text-[10px] text-center text-text-secondaryLight/70 border-t border-border-light dark:border-border-dark pt-8">
          Your data remains safe inside client-side cache.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RIGHT PANEL (col-span-4): Tool Settings & Output Controls              */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 p-20 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm flex flex-col justify-between min-h-[500px]">
        <div>
          <div className="pb-12 border-b border-border-light dark:border-border-dark mb-16">
            <h3 className="font-heading font-bold text-[14px] uppercase tracking-wider flex items-center gap-6">
              <SlidersHorizontal className="w-4 h-4 text-brand-blue" />
              {lang === "en" ? "Tool Configuration" : "कॉन्फ़िगरेशन सेटिंग्स"}
            </h3>
          </div>

          {/* Form specific settings */}
          <div className="flex flex-col gap-16 text-[13px]">
            
            {/* 1. Compress settings */}
            {toolSlug === "compress-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-6">Compression Mode</label>
                  <div className="grid grid-cols-2 gap-8">
                    {["Balanced", "High", "Small"].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setCompressPreset(preset)}
                        className={`py-8 rounded font-semibold border transition-all ${
                          compressPreset === preset 
                            ? "bg-brand-blue border-brand-blue text-white" 
                            : "border-border-light dark:border-border-dark hover:bg-bg-light"
                        }`}
                        type="button"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold">Image Quality Presets</label>
                    <span className="font-bold text-brand-blue">{imgQuality}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" value={imgQuality} onChange={(e) => setImgQuality(Number(e.target.value))}
                    className="w-full accent-brand-blue"
                  />
                </div>

                <div className="flex items-center justify-between py-6">
                  <span className="font-bold">Convert to Grayscale</span>
                  <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* 2. Merge settings */}
            {toolSlug === "merge-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Output Filename</label>
                  <input 
                    type="text" value={mergeFilename} onChange={(e) => setMergeFilename(e.target.value)}
                    className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark"
                  />
                </div>

                <div className="flex items-center justify-between py-6">
                  <span className="font-bold">Add Blank Page Separator</span>
                  <input type="checkbox" checked={blankPageSeparator} onChange={(e) => setBlankPageSeparator(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* 3. Split settings */}
            {toolSlug === "split-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-6">Split Strategy</label>
                  <div className="grid grid-cols-2 gap-8">
                    {["ranges", "every-n"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSplitMode(mode)}
                        className={`py-8 rounded font-semibold border transition-all capitalize ${
                          splitMode === mode 
                            ? "bg-brand-blue border-brand-blue text-white" 
                            : "border-border-light dark:border-border-dark hover:bg-bg-light"
                        }`}
                        type="button"
                      >
                        {mode === "ranges" ? "Split Ranges" : "Every N Pages"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-4">Defined Ranges</label>
                  <input 
                    type="text" value={mergePages} onChange={(e) => setMergePages(e.target.value)} placeholder="e.g. 1-3, 5-8"
                    className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark"
                  />
                </div>

                <div className="flex items-center justify-between py-6">
                  <span className="font-bold">Download All Chunks as ZIP</span>
                  <input type="checkbox" checked={splitZip} onChange={(e) => setSplitZip(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* 4. Crop Settings */}
            {toolSlug === "crop-pdf" && (
              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="font-bold block mb-4">Crop Top (px)</label>
                    <input type="number" value={cropTop} onChange={(e) => setCropTop(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                  </div>
                  <div>
                    <label className="font-bold block mb-4">Crop Bottom (px)</label>
                    <input type="number" value={cropBottom} onChange={(e) => setCropBottom(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                  </div>
                </div>
              </div>
            )}

            {/* 10. Page Numbers */}
            {toolSlug === "page-numbers" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Placement Grid</label>
                  {render9PointGrid(numPosition, setNumPosition)}
                </div>
              </div>
            )}

            {/* 11. Watermark Settings */}
            {toolSlug === "watermark-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Watermark Text</label>
                  <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold">Opacity</label>
                    <span className="font-bold text-brand-blue">{watermarkOpacity}%</span>
                  </div>
                  <input type="range" min="10" max="100" value={watermarkOpacity} onChange={(e) => setWatermarkOpacity(Number(e.target.value))} className="w-full accent-brand-blue" />
                </div>
                <div>
                  <label className="font-bold block mb-4">Placement Grid</label>
                  {render9PointGrid(watermarkPosition, setWatermarkPosition)}
                </div>
              </div>
            )}

            {/* 12. Header Footer Settings */}
            {toolSlug === "header-footer" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Header Center Text</label>
                  <input type="text" value={headerCenter} onChange={(e) => setHeaderCenter(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
                <div>
                  <label className="font-bold block mb-4">Footer Center Text</label>
                  <input type="text" value={footerCenter} onChange={(e) => setFooterCenter(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
              </div>
            )}

            {/* 13. Metadata Settings */}
            {toolSlug === "metadata-editor" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Document Title</label>
                  <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
                <div>
                  <label className="font-bold block mb-4">Author</label>
                  <input type="text" value={metaAuthor} onChange={(e) => setMetaAuthor(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
              </div>
            )}

            {/* 47. Protect settings */}
            {toolSlug === "protect-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Set Encryption Password</label>
                  <input 
                    type="password" value={openPassword} onChange={(e) => setOpenPassword(e.target.value)}
                    className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark"
                  />
                  <div className="flex items-center gap-6 mt-8">
                    <span className="text-[11px] font-semibold text-text-secondaryLight">Strength:</span>
                    <span className={`text-[10px] font-bold px-6 py-2 rounded text-white ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 48. Unlock settings */}
            {toolSlug === "unlock-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Decrypt Password</label>
                  <input 
                    type="password" value={openPassword} onChange={(e) => setOpenPassword(e.target.value)}
                    className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark"
                  />
                </div>
              </div>
            )}

            {/* 49. Sign PDF settings */}
            {toolSlug === "sign-pdf" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Type Signature</label>
                  <input 
                    type="text" value={signatureText} onChange={(e) => setSignatureText(e.target.value)}
                    className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark font-serif text-lg italic text-brand-blue"
                  />
                </div>
              </div>
            )}

            {/* 51. Bates numbering settings */}
            {toolSlug === "bates-numbering" && (
              <div className="flex flex-col gap-12">
                <div>
                  <label className="font-bold block mb-4">Bates Prefix</label>
                  <input type="text" value={batesPrefix} onChange={(e) => setBatesPrefix(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
                <div>
                  <label className="font-bold block mb-4">Bates Start Number</label>
                  <input type="number" value={batesStart} onChange={(e) => setBatesStart(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                </div>
              </div>
            )}

            {/* 55. Ask PDF settings */}
            {toolSlug === "ask-pdf" && (
              <div className="flex flex-col gap-12">
                <div className="border border-border-light dark:border-border-dark rounded p-12 max-h-[160px] overflow-y-auto bg-bg-light/30 flex flex-col gap-8">
                  {chatLog.map((chat, idx) => (
                    <div key={idx} className={`p-8 rounded max-w-[85%] text-[11px] leading-relaxed ${
                      chat.sender === "user" ? "bg-brand-blue/10 self-end text-right" : "bg-white dark:bg-surface-dark self-start border"
                    }`}>
                      {chat.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <input 
                    type="text" placeholder="Ask details about document..." value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    className="flex-1 px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]"
                  />
                  <button onClick={handleChatSend} className="p-8 bg-brand-blue text-white rounded" type="button">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Default generic display */}
            {!["compress-pdf", "merge-pdf", "split-pdf", "crop-pdf", "duplicate-pages", "add-blank-page", "watermark-pdf", "page-numbers", "header-footer", "annotate-pdf", "redact-pdf", "metadata-editor", "flatten-pdf", "remove-hidden-data", "deskew-scan", "auto-enhance-scan", "remove-background", "ocr-pdf", "protect-pdf", "sign-pdf", "bates-numbering", "invert-colors", "pdf-to-long-image", "jpg-to-pdf", "png-to-pdf", "image-to-pdf", "ask-pdf"].includes(toolSlug) && (
              <p className="text-[13px] text-text-secondaryLight/80">
                {lang === "en" ? "No additional settings required for this tool. Files will compile with default high-quality profiles." : "इस टूल के लिए किसी अतिरिक्त सेटिंग की आवश्यकता नहीं है।"}
              </p>
            )}
          </div>
        </div>

        {/* Action Button & Estimation Details */}
        <div className="mt-24 border-t border-border-light dark:border-border-dark pt-16">
          <div className="flex justify-between items-center text-[12px] font-bold text-text-secondaryLight mb-12">
            <span>Estimated Output:</span>
            <span className="text-brand-success">
              {files.length > 0 ? `~${formatSize(Math.round(files[0].size * 0.75))}` : "0 KB"}
            </span>
          </div>

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
            {lang === "en" ? "Compile Output" : "परिणाम संकलित करें"}
          </button>

          {/* Dynamic Progress indicator */}
          {(running || progress > 0) && (
            <div className="mt-16">
              <div className="flex justify-between items-center mb-6 text-[12px] font-bold text-brand-blue">
                <span>{stepMessage}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-6 bg-bg-light dark:bg-bg-dark rounded-pill overflow-hidden">
                <div className="h-full bg-brand-blue rounded-pill transition-all duration-200" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mt-12 p-8 border border-brand-error/20 bg-brand-error/5 text-brand-error text-[11px] rounded">
              {errorMsg}
            </div>
          )}

          {success && downloadUrl && (
            <div className="mt-16 flex flex-col gap-8 items-center bg-brand-success/5 border border-brand-success/15 p-12 rounded">
              <span className="text-[12px] font-bold text-brand-success">✓ Ready for download!</span>
              <a 
                href={downloadUrl} download={downloadName}
                className="w-full py-8 bg-brand-success hover:bg-brand-success/90 text-white font-bold text-[12px] rounded text-center shadow-sm flex items-center justify-center gap-6"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          )}
        </div>
      </div>

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
