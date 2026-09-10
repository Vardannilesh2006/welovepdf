"use client";

import React from "react";
import { ShieldCheck, Sparkles, Server, AlertCircle } from "lucide-react";
import { ProcessingMode, ToolStatus } from "../app/data/toolManifest";

interface ProcessingModeBadgeProps {
  mode: ProcessingMode;
  status?: ToolStatus;
  lang?: "en" | "hi";
  className?: string;
}

export default function ProcessingModeBadge({
  mode,
  status = "stable",
  lang = "en",
  className = "",
}: ProcessingModeBadgeProps) {
  if (status === "experimental") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-full text-[12px] font-heading font-semibold text-amber-800 dark:text-amber-300 ${className}`}>
        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
        <span>
          {lang === "en" ? "EXPERIMENTAL TOOL · Review Output Carefully" : "प्रयोगात्मक टूल · आउटपुट की सावधानीपूर्वक जांच करें"}
        </span>
      </div>
    );
  }

  if (mode === "hybrid") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-full text-[12px] font-heading font-semibold text-purple-800 dark:text-purple-300 ${className}`}>
        <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
        <span>
          {lang === "en" ? "HYBRID · Local Parsing + Ephemeral AI Processing" : "हाइब्रिड · लोकल पार्सिंग + अस्थायी AI प्रोसेसिंग"}
        </span>
      </div>
    );
  }

  if (mode === "server") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-full text-[12px] font-heading font-semibold text-blue-800 dark:text-blue-300 ${className}`}>
        <Server className="w-3.5 h-3.5 text-blue-600" />
        <span>
          {lang === "en" ? "SERVER PROCESSING · Ephemeral Execution (No Storage)" : "सर्वर प्रोसेसिंग · अल्पकालिक निष्पादन (कोई संग्रहण नहीं)"}
        </span>
      </div>
    );
  }

  // Local only
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-full text-[12px] font-heading font-semibold text-emerald-800 dark:text-emerald-300 ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      <span>
        {lang === "en" ? "LOCAL ONLY · 100% In-Browser RAM · Zero Server Upload" : "लोकल केवल · 100% ब्राउज़र रैम · कोई सर्वर अपलोड नहीं"}
      </span>
    </div>
  );
}
