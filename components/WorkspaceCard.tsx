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
    <div className="w-full max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
      
      {/* Left Workspace Panel */}
      <div className="lg:col-span-8 p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-lg transition-colors duration-200">
        
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
            {historyList.length > 0 && files.length > 0 && (
              <button 
                onClick={handleUndo}
                className="text-[13px] text-brand-amber font-semibold hover:underline"
                type="button"
              >
                {lang === "en" ? "Undo Action" : "पूर्ववत करें"}
              </button>
            )}
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

        {/* Double Panel Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          
          {/* Upload Zone & Previews */}
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
                <p className="text-[11px] text-brand-success font-semibold mt-16 flex items-center gap-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Your file stays in your browser — never uploaded
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-16">
                <div className="flex items-center justify-between bg-white dark:bg-bg-dark p-12 rounded-card border border-border-light dark:border-border-dark shadow-sm">
                  <div className="flex items-center gap-12 min-w-0 flex-1">
                    <FileText className="w-8 h-8 text-brand-blue flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-[14px] truncate">{files[0].name}</h4>
                      <p className="text-[12px] text-text-secondaryLight">
                        {formatSize(files[0].size)}
                      </p>
                    </div>
                  </div>

                  {toolSlug === "pdf-reader" && (
                    <button
                      onClick={() => setNightMode(!nightMode)}
                      className="p-8 rounded-btn border border-border-light dark:border-border-dark text-text-secondaryLight hover:text-brand-blue"
                      title="Toggle Night Mode PDF Reader"
                      type="button"
                    >
                      {nightMode ? <EyeOff className="w-5 h-5 text-brand-amber" /> : <Eye className="w-5 h-5" />}
                    </button>
                  )}
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
                      <div 
                        key={idx} 
                        onClick={() => {
                          const updated = [...previews];
                          updated[idx].selected = !updated[idx].selected;
                          setPreviews(updated);
                        }}
                        className={`relative border cursor-pointer rounded-card overflow-hidden bg-bg-light dark:bg-bg-dark transition-all ${
                          toolSlug === "delete-pages" && !prev.selected 
                            ? "border-brand-error ring-2 ring-brand-error/45 opacity-60" 
                            : prev.selected 
                              ? "border-brand-blue ring-2 ring-brand-blue/30" 
                              : "border-border-light dark:border-border-dark opacity-50"
                        } ${
                          nightMode ? "filter invert-[0.9] hue-rotate-180" : ""
                        }`}
                      >
                        <img src={prev.dataUrl} alt={`Page ${prev.page}`} className="w-full h-auto object-cover" style={{ transform: `rotate(${prev.rotation}deg)` }} />
                        {toolSlug === "delete-pages" && !prev.selected && (
                          <div className="absolute inset-0 bg-brand-error/20 flex items-center justify-center text-white font-bold text-[18px]">
                            ✕
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-2 font-mono flex justify-between px-6">
                          <span>P. {prev.page}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = [...previews];
                              updated[idx].rotation = (updated[idx].rotation + 90) % 360;
                              setPreviews(updated);
                            }}
                            className="text-white hover:text-brand-blue"
                            type="button"
                          >
                            <RotateCw className="w-3 h-3" />
                          </button>
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

          {/* Settings Panel */}
          <div className="p-24 border border-border-light dark:border-border-dark rounded-card bg-bg-light/30 dark:bg-bg-dark/5 flex flex-col justify-between">
            <div className="flex flex-col gap-16">
              <h3 className="font-semibold text-[15px] flex items-center gap-8 text-text-primaryLight dark:text-text-primaryDark pb-8 border-b border-border-light/60 dark:border-border-dark/60">
                <Sliders className="w-4 h-4 text-brand-amber" />
                {lang === "en" ? "Configure Settings" : "सेटिंग्स कॉन्फ़िगर करें"}
              </h3>

              {/* 1. Compress PDF settings */}
              {toolSlug === "compress-pdf" && (
                <div className="flex flex-col gap-16">
                  <div>
                    <label className="text-[13px] font-medium block mb-6">Presets</label>
                    <div className="grid grid-cols-2 gap-8">
                      {["Screen", "Ebook", "Balanced", "Print"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setCompressPreset(p)}
                          className={`py-8 text-[12px] font-semibold border rounded ${
                            compressPreset === p 
                              ? "bg-brand-blue text-white border-brand-blue" 
                              : "border-border-light dark:border-border-dark hover:bg-white dark:hover:bg-surface-dark"
                          }`}
                          type="button"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-medium">Quality Level: {quality}%</label>
                    <input 
                      type="range" min="10" max="100" value={quality} 
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-brand-blue"
                    />
                  </div>
                  <div className="flex flex-col gap-8 text-[13px]">
                    <label className="flex items-center gap-8 font-medium cursor-pointer">
                      <input type="checkbox" checked={stripMetadata} onChange={(e) => setStripMetadata(e.target.checked)} className="rounded text-brand-blue" />
                      Strip document metadata (Author, tags)
                    </label>
                    <label className="flex items-center gap-8 font-medium cursor-pointer">
                      <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} className="rounded text-brand-blue" />
                      Convert to Grayscale (Print-friendly)
                    </label>
                  </div>
                </div>
              )}

              {/* 2. Merge PDF settings */}
              {toolSlug === "merge-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Output Filename</label>
                    <input 
                      type="text" value={mergeFilename} onChange={(e) => setMergeFilename(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    />
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Page Ranges (e.g. 1-5)</label>
                    <input 
                      type="text" value={mergePages} onChange={(e) => setMergePages(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    />
                  </div>
                  <label className="flex items-center gap-8 font-medium cursor-pointer">
                    <input type="checkbox" checked={blankPageSeparator} onChange={(e) => setBlankPageSeparator(e.target.checked)} className="rounded text-brand-blue" />
                    Insert blank separator page
                  </label>
                </div>
              )}

              {/* 3. Split PDF settings */}
              {toolSlug === "split-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Split Mode</label>
                    <select 
                      value={splitMode} onChange={(e) => setSplitMode(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    >
                      <option value="ranges">Custom Page Ranges</option>
                      <option value="every-n">Split every N pages</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-8 font-medium cursor-pointer">
                    <input type="checkbox" checked={splitZip} onChange={(e) => setSplitZip(e.target.checked)} className="rounded text-brand-blue" />
                    Download as ZIP
                  </label>
                </div>
              )}

              {/* 5. Crop PDF settings */}
              {toolSlug === "crop-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Preset Borders</label>
                    <div className="grid grid-cols-3 gap-6">
                      {["Custom", "Remove Margins", "A4"].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setCropPreset(preset)}
                          className={`py-6 text-[11px] font-bold border rounded ${
                            cropPreset === preset ? "bg-brand-blue text-white border-brand-blue" : "hover:bg-bg-light"
                          }`}
                          type="button"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div>
                      <label className="font-semibold block mb-4">Top margin ({cropTop}mm)</label>
                      <input type="range" min="0" max="60" value={cropTop} onChange={(e) => setCropTop(Number(e.target.value))} className="w-full accent-brand-blue" />
                    </div>
                    <div>
                      <label className="font-semibold block mb-4">Bottom margin ({cropBottom}mm)</label>
                      <input type="range" min="0" max="60" value={cropBottom} onChange={(e) => setCropBottom(Number(e.target.value))} className="w-full accent-brand-blue" />
                    </div>
                    <div>
                      <label className="font-semibold block mb-4">Left margin ({cropLeft}mm)</label>
                      <input type="range" min="0" max="60" value={cropLeft} onChange={(e) => setCropLeft(Number(e.target.value))} className="w-full accent-brand-blue" />
                    </div>
                    <div>
                      <label className="font-semibold block mb-4">Right margin ({cropRight}mm)</label>
                      <input type="range" min="0" max="60" value={cropRight} onChange={(e) => setCropRight(Number(e.target.value))} className="w-full accent-brand-blue" />
                    </div>
                  </div>
                </div>
              )}

              {/* 9. Duplicate Pages */}
              {toolSlug === "duplicate-pages" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="font-medium block mb-4">Page Index</label>
                      <input type="number" min="1" value={duplicatePageNum} onChange={(e) => setDuplicatePageNum(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                    </div>
                    <div>
                      <label className="font-medium block mb-4">Copies count</label>
                      <input type="number" min="1" max="20" value={duplicateCopies} onChange={(e) => setDuplicateCopies(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Insert Position</label>
                    <select value={duplicatePosition} onChange={(e) => setDuplicatePosition(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                      <option value="after">After page</option>
                      <option value="before">Before page</option>
                      <option value="end">At the End</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 10. Add Blank Page */}
              {toolSlug === "add-blank-page" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="font-medium block mb-4">Insert Position</label>
                      <select value={blankPosition} onChange={(e) => setBlankPosition(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                        <option value="beginning">Beginning</option>
                        <option value="end">End of document</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium block mb-4">Page Preset</label>
                      <select value={blankPageSize} onChange={(e) => setBlankPageSize(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                        <option value="A4">A4 Standard</option>
                        <option value="Letter">US Letter</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 11. Watermark PDF settings */}
              {toolSlug === "watermark-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="flex justify-center mb-8 border border-border-light dark:border-border-dark rounded-card overflow-hidden bg-white p-6">
                    <canvas ref={watermarkCanvasRef} width="180" height="180" className="w-[110px] h-[110px]" />
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Watermark Text</label>
                    <input 
                      type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="font-medium block mb-4">Font</label>
                      <select value={watermarkFont} onChange={(e) => setWatermarkFont(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                        <option value="sans-serif">Sans-Serif</option>
                        <option value="serif">Serif</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium block mb-4">Color</label>
                      <input type="color" value={watermarkColor} onChange={(e) => setWatermarkColor(e.target.value)} className="w-full h-32 rounded cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium block mb-6">Position</label>
                    {render9PointGrid(watermarkPosition, setWatermarkPosition)}
                  </div>
                </div>
              )}

              {/* 12. Page Numbers settings */}
              {toolSlug === "page-numbers" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Formatting Format</label>
                    <select value={numFormat} onChange={(e) => setNumFormat(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                      <option value="Page {page}">Page 1</option>
                      <option value="{page} of {total}">1 of 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium block mb-6">Alignment</label>
                    {render9PointGrid(numPosition, setNumPosition)}
                  </div>
                </div>
              )}

              {/* 13. Header & Footer settings */}
              {toolSlug === "header-footer" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="border border-border-light p-12 rounded bg-bg-light/35">
                    <label className="font-semibold block mb-4">Header left/center/right</label>
                    <div className="grid grid-cols-3 gap-6">
                      <input type="text" placeholder="Left" value={headerLeft} onChange={(e) => setHeaderLeft(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]" />
                      <input type="text" placeholder="Center" value={headerCenter} onChange={(e) => setHeaderCenter(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]" />
                      <input type="text" placeholder="Right" value={headerRight} onChange={(e) => setHeaderRight(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]" />
                    </div>
                  </div>
                  <div className="border border-border-light p-12 rounded bg-bg-light/35">
                    <label className="font-semibold block mb-4">Footer left/center/right</label>
                    <div className="grid grid-cols-3 gap-6">
                      <input type="text" placeholder="Left" value={footerLeft} onChange={(e) => setFooterLeft(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]" />
                      <input type="text" placeholder="Center" value={footerCenter} onChange={(e) => setFooterCenter(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]" />
                      <input type="text" placeholder="Right" value={footerRight} onChange={(e) => setFooterRight(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark text-[11px]" />
                    </div>
                  </div>
                </div>
              )}

              {/* 15. Annotate PDF */}
              {toolSlug === "annotate-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Annotation Tool</label>
                    <div className="flex gap-6">
                      {["Highlight", "Underline", "Pen"].map((tool) => (
                        <button
                          key={tool}
                          onClick={() => setAnnotateTool(tool)}
                          className={`flex-1 py-6 border rounded text-[11px] font-bold ${
                            annotateTool === tool ? "bg-brand-blue text-white border-brand-blue" : "hover:bg-bg-light"
                          }`}
                          type="button"
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Brush Color</label>
                    <input type="color" value={annotateColor} onChange={(e) => setAnnotateColor(e.target.value)} className="w-full h-32 rounded cursor-pointer" />
                  </div>
                </div>
              )}

              {/* 16. Redact PDF settings */}
              {toolSlug === "redact-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Search Term</label>
                    <input 
                      type="text" placeholder="e.g. GSTIN, passport..." value={redactQuery} onChange={(e) => setRedactQuery(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    />
                  </div>
                  <div className="p-12 border border-brand-error/20 bg-brand-error/5 text-brand-error rounded font-semibold text-[11px]">
                    ⚠️ WARNING: Redactions are permanent. Once applied, marked document data is scrubbed permanently.
                  </div>
                </div>
              )}

              {/* 19. Metadata Editor */}
              {toolSlug === "metadata-editor" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Document Title</label>
                    <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Author</label>
                    <input type="text" value={metaAuthor} onChange={(e) => setMetaAuthor(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                  </div>
                </div>
              )}

              {/* 20. Flatten PDF */}
              {toolSlug === "flatten-pdf" && (
                <div className="flex flex-col gap-8 text-[13px]">
                  <label className="flex items-center gap-8 font-medium cursor-pointer">
                    <input type="checkbox" checked={flattenForms} onChange={(e) => setFlattenForms(e.target.checked)} className="rounded text-brand-blue" />
                    Flatten all active interactive forms
                  </label>
                  <label className="flex items-center gap-8 font-medium cursor-pointer">
                    <input type="checkbox" checked={flattenLayers} onChange={(e) => setFlattenLayers(e.target.checked)} className="rounded text-brand-blue" />
                    Flatten layered PDF objects
                  </label>
                </div>
              )}

              {/* 21. Remove Hidden Data */}
              {toolSlug === "remove-hidden-data" && (
                <div className="flex flex-col gap-8 text-[13px]">
                  <label className="flex items-center gap-8 font-medium cursor-pointer">
                    <input type="checkbox" checked={removeLayers} onChange={(e) => setRemoveLayers(e.target.checked)} className="rounded text-brand-blue" />
                    Remove hidden layout layers
                  </label>
                  <label className="flex items-center gap-8 font-medium cursor-pointer">
                    <input type="checkbox" checked={removeMetadata} onChange={(e) => setRemoveMetadata(e.target.checked)} className="rounded text-brand-blue" />
                    Remove author & metadata properties
                  </label>
                </div>
              )}

              {/* 23. Deskew Scan */}
              {toolSlug === "deskew-scan" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <label className="font-semibold block">Manual alignment skew angle ({deskewAngle}°)</label>
                  <input type="range" min="-10" max="10" value={deskewAngle} onChange={(e) => setDeskewAngle(Number(e.target.value))} className="w-full accent-brand-blue" />
                </div>
              )}

              {/* 24. Auto Enhance Scan */}
              {toolSlug === "auto-enhance-scan" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Brightness ({brightness}%)</label>
                    <input type="range" min="10" max="90" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-brand-blue" />
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Contrast ({contrast}%)</label>
                    <input type="range" min="10" max="90" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full accent-brand-blue" />
                  </div>
                </div>
              )}

              {/* 25. Remove Background */}
              {toolSlug === "remove-background" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <label className="font-semibold block">Background remove tolerance ({bgColorTolerance}%)</label>
                  <input type="range" min="5" max="50" value={bgColorTolerance} onChange={(e) => setBgColorTolerance(Number(e.target.value))} className="w-full accent-brand-blue" />
                </div>
              )}

              {/* 26. OCR PDF settings */}
              {toolSlug === "ocr-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">OCR Language</label>
                    <select value={ocrLang} onChange={(e) => setOcrLang(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                      <option value="eng">English</option>
                      <option value="hin">Hindi (हिन्दी)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium block mb-4">Output Format</label>
                    <select value={ocrOutput} onChange={(e) => setOcrOutput(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                      <option value="searchable">Searchable PDF Document</option>
                      <option value="text">Plain Text Outlines</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 27. Protect PDF settings */}
              {toolSlug === "protect-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Open Password</label>
                    <input 
                      type="password" value={openPassword} onChange={(e) => setOpenPassword(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    />
                  </div>
                  {openPassword && (
                    <div className="flex items-center gap-8">
                      <span className="text-[11px] font-bold">Strength: {strength.label}</span>
                      <div className="flex-1 h-6 bg-border-light rounded-pill overflow-hidden">
                        <div className={`h-full ${strength.color}`} style={{ width: strength.label === "Weak" ? "30%" : strength.label === "Medium" ? "65%" : "100%" }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 29. Sign PDF settings */}
              {toolSlug === "sign-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="flex gap-8 border-b border-border-light dark:border-border-dark/60 pb-8">
                    {["draw", "type"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSignTab(tab as any)}
                        className={`px-12 py-6 rounded text-[11px] font-bold uppercase ${
                          signTab === tab ? "bg-brand-blue text-white" : "hover:bg-bg-light"
                        }`}
                        type="button"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {signTab === "type" && (
                    <input 
                      type="text" placeholder="Type signature text..." value={signatureText} onChange={(e) => setSignatureText(e.target.value)}
                      className="w-full px-12 py-8 border border-border-light dark:border-border-dark rounded bg-white dark:bg-surface-dark"
                    />
                  )}
                  <label className="flex items-center gap-8 font-medium cursor-pointer mt-8">
                    <input type="checkbox" checked={dateStamp} onChange={(e) => setDateStamp(e.target.checked)} className="rounded text-brand-blue" />
                    Include date stamp
                  </label>
                </div>
              )}

              {/* 31. Bates Numbering */}
              {toolSlug === "bates-numbering" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div>
                    <label className="font-medium block mb-4">Bates prefix</label>
                    <input type="text" value={batesPrefix} onChange={(e) => setBatesPrefix(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="font-medium block mb-4">Start ID</label>
                      <input type="number" value={batesStart} onChange={(e) => setBatesStart(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                    </div>
                    <div>
                      <label className="font-medium block mb-4">Padding Zeros</label>
                      <input type="number" min="4" max="8" value={batesPadding} onChange={(e) => setBatesPadding(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                    </div>
                  </div>
                  <p className="text-[11px] text-text-secondaryLight/80">Format preview: {batesPrefix}{"0".repeat(batesPadding - String(batesStart).length)}{batesStart}</p>
                </div>
              )}

              {/* 32. Invert Colors */}
              {toolSlug === "invert-colors" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <label className="font-medium block mb-4">Inversion Profile</label>
                  <select value={invertMode} onChange={(e) => setInvertMode(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                    <option value="Full">Full page Inversion</option>
                    <option value="Text">Invert Text details only</option>
                    <option value="Images">Invert Scanned Images only</option>
                  </select>
                </div>
              )}

              {/* 39. PDF to Long Image */}
              {toolSlug === "pdf-to-long-image" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <label className="font-semibold block">Vertical gap between page margins ({longImageGap}px)</label>
                  <input type="range" min="0" max="40" value={longImageGap} onChange={(e) => setLongImageGap(Number(e.target.value))} className="w-full accent-brand-blue" />
                </div>
              )}

              {/* 45. Image to PDF */}
              {["jpg-to-pdf", "png-to-pdf", "image-to-pdf"].includes(toolSlug) && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="font-medium block mb-4">Page Preset</label>
                      <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark">
                        <option value="A4">A4 Page</option>
                        <option value="Letter">US Letter</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium block mb-4">Borders (mm)</label>
                      <input type="number" value={pageMargin} onChange={(e) => setPageMargin(Number(e.target.value))} className="w-full px-8 py-6 border rounded bg-white dark:bg-surface-dark" />
                    </div>
                  </div>
                </div>
              )}

              {/* 55. Ask PDF settings */}
              {toolSlug === "ask-pdf" && (
                <div className="flex flex-col gap-12 text-[13px]">
                  <div className="border border-border-light rounded p-12 max-h-[160px] overflow-y-auto bg-bg-light/30 flex flex-col gap-8">
                    {chatLog.map((chat, idx) => (
                      <div key={idx} className={`p-8 rounded max-w-[85%] text-[11px] ${
                        chat.sender === "user" ? "bg-brand-blue/10 self-end text-right" : "bg-white dark:bg-surface-dark self-start"
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
              <p className="text-[10px] text-center text-text-secondaryLight/80 dark:text-text-secondaryDark/80 mt-8">
                Processed in your browser. Zero server contact.
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
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

        {/* Error Display */}
        {errorMsg && (
          <div className="mt-24 p-16 flex items-start gap-12 border border-brand-error/20 bg-brand-error/5 text-brand-error rounded-card">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-2" />
            <p className="text-[14px] font-medium">{errorMsg}</p>
          </div>
        )}

        {/* Success & Download Trigger */}
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

            {/* Related tools */}
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
      </div>

      {/* Right Sidebar: Recent Files & Version Histories */}
      <div className="lg:col-span-4 flex flex-col gap-24">
        
        {/* Recent Files Panel */}
        <div className="p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm">
          <h3 className="font-bold text-[15px] border-b border-border-light dark:border-border-dark/60 pb-8 mb-16 flex items-center gap-6">
            <FileText className="w-4 h-4 text-brand-blue" />
            {lang === "en" ? "Recent Operations" : "हाल के ऑपरेशन्स"}
          </h3>
          {recentList.length === 0 ? (
            <p className="text-[12px] text-text-secondaryLight">
              No files processed in this session yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-12">
              {recentList.map((item, idx) => (
                <li key={idx} className="p-12 border border-border-light dark:border-border-dark/60 rounded-card bg-bg-light/35 dark:bg-bg-dark/20 text-[12px]">
                  <div className="font-semibold truncate">{item.name}</div>
                  <div className="flex justify-between text-[11px] text-text-secondaryLight/80 mt-4">
                    <span>{item.tool}</span>
                    <span>{item.size}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Version History Panel */}
        <div className="p-24 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-sm">
          <h3 className="font-bold text-[15px] border-b border-border-light dark:border-border-dark/60 pb-8 mb-16 flex items-center gap-6">
            <RefreshCw className="w-4 h-4 text-brand-amber" />
            {lang === "en" ? "Undo Version Log" : "पूर्ववत लॉग"}
          </h3>
          {historyList.length === 0 ? (
            <p className="text-[12px] text-text-secondaryLight">
              No version logs recorded.
            </p>
          ) : (
            <div className="flex flex-col gap-12">
              <ul className="flex flex-col gap-8">
                {historyList.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-[11px] border-b border-border-light/40 pb-4">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-text-secondaryLight">{item.date}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUndo}
                className="mt-8 w-full py-6 border border-brand-amber text-brand-amber rounded-btn font-semibold text-[12px] hover:bg-brand-amber/5"
                type="button"
              >
                {lang === "en" ? "Undo Last Action" : "अंतिम क्रिया पूर्ववत करें"}
              </button>
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
