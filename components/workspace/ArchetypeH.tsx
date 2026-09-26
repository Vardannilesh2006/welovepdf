"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  Send,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Languages,
  HelpCircle,
  Receipt,
  Bot,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react";

interface ArchetypeHProps {
  toolSlug: string;
  toolName: string;
  lang: "en" | "hi";
  fileName: string;
  onProcess: (promptOrText: string) => void;
  isProcessing: boolean;
  aiOutput: string | null;
  onReset: () => void;
  onAddFile: (files: File[]) => void;
}

export default function ArchetypeH({
  toolSlug,
  toolName,
  lang,
  fileName,
  onProcess,
  isProcessing,
  aiOutput,
  onReset,
  onAddFile,
}: ArchetypeHProps) {
  const [userQuery, setUserQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: "user" | "ai"; text: string; time: string }[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Quick Action Chips
  const quickPrompts = [
    { label: "Executive Summary", icon: "📝", prompt: "Provide a comprehensive executive summary of this document with key bullet points." },
    { label: "5 Key Questions", icon: "💡", prompt: "What are the 5 most critical insights or questions answered in this document?" },
    { label: "Extract Key Data", icon: "📊", prompt: "Extract all important statistics, dates, financial numbers, and tables from this document." },
    { label: "Study Quiz", icon: "❓", prompt: "Create a 5-question multiple choice practice quiz based on the key concepts in this document." },
  ];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFile(Array.from(e.dataTransfer.files));
    }
  };

  const handleSendChat = (textToSend?: string) => {
    const q = textToSend || userQuery;
    if (!q.trim() || isProcessing) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatHistory((prev) => [...prev, { sender: "user", text: q, time }]);
    setUserQuery("");
    onProcess(q);
  };

  // Sync incoming aiOutput to chat history when available
  React.useEffect(() => {
    if (aiOutput) {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setChatHistory((prev) => {
        // Prevent duplicate append
        if (prev.length > 0 && prev[prev.length - 1].sender === "ai" && prev[prev.length - 1].text === aiOutput) {
          return prev;
        }
        return [...prev, { sender: "ai", text: aiOutput, time }];
      });
    }
  }, [aiOutput]);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

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
            accept=".pdf,.png,.jpg"
            className="hidden"
            onChange={handleFileInput}
          />

          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#E8792A]/15 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-[#E8792A]/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#E8792A] to-[#F59E0B] rounded-2xl flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#262B36] mb-2 tracking-tight">
            {isDragging ? "Drop Document to Analyze!" : `Upload Document for ${toolName}`}
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] mb-6 max-w-lg mx-auto">
            Powered by Gemini AI. Chat with any PDF, extract instant summaries, key figures, or generate test quizzes.
          </p>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all mb-6">
            <Upload className="w-5 h-5" />
            <span>Select PDF Document</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#78716C]">
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8792A]" /> Gemini AI Engine
            </span>
            <span className="px-3 py-1 bg-white border border-[#EFE1D2] rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Ephemeral Memory (Never Retained)
            </span>
          </div>
        </label>
      </div>
    );
  }

  // ACTIVE 50/50 SPLIT SCREEN APPLICATION
  return (
    <div className="w-full bg-white border border-[#EFE1D2] rounded-2xl overflow-hidden my-2 flex flex-col shadow-sm">
      
      {/* Top Application Bar */}
      <div className="bg-[#FBF1E9]/80 border-b border-[#EFE1D2] px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Bot className="w-5 h-5 text-[#E8792A] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-[#262B36] truncate max-w-[200px] sm:max-w-[320px]">
            {fileName}
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI Ready
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-[#78716C] hover:text-[#262B36] px-2 py-1 transition-colors"
        >
          Change File
        </button>
      </div>

      {/* 50/50 Split View */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-[540px]">
        
        {/* Left Column (45%): Document Context Deck */}
        <div className="w-full lg:w-[45%] bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-[#EFE1D2] p-5 sm:p-6 flex flex-col justify-between shrink-0 gap-5">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#262B36] uppercase tracking-wider block border-b pb-2 border-[#EFE1D2]">
              Document Information
            </span>

            {/* Document Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#E8792A] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#262B36] truncate">{fileName}</h4>
                  <p className="text-[11px] text-[#78716C]">Indexed in browser sandbox memory</p>
                </div>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div>
              <span className="text-xs font-semibold text-[#262B36] block mb-2">
                One-Click Intelligence Actions:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendChat(chip.prompt)}
                    disabled={isProcessing}
                    className="p-2.5 rounded-xl border border-[#EFE1D2] bg-white hover:border-[#E8792A] hover:bg-[#FBF1E9]/40 text-left transition-all text-xs group disabled:opacity-50"
                  >
                    <span className="text-sm mr-1.5">{chip.icon}</span>
                    <span className="font-semibold text-[#262B36] group-hover:text-[#E8792A] transition-colors">
                      {chip.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Non-chat Run Button */}
            {toolSlug !== "ask-pdf" && (
              <button
                onClick={() => onProcess("")}
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-[#E8792A] to-[#D66B1E] hover:from-[#D66B1E] hover:to-[#B85714] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Document...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Full {toolName} →</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero Document Training Guarantee</span>
            </div>
            <p className="text-[11px] text-[#78716C] leading-tight">
              Files are processed in an ephemeral sandbox and never used for model training or stored.
            </p>
          </div>
        </div>

        {/* Right Column (55%): AI Conversation & Output Stream */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Thread Header */}
          <div className="bg-slate-50 border-b border-[#EFE1D2] px-4 py-2.5 text-xs font-semibold text-[#262B36] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E8792A]" />
              <span>AI Intelligence Thread</span>
            </div>
            <span className="text-[11px] text-[#78716C]">Powered by Gemini</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
            {chatHistory.length === 0 ? (
              <div className="text-center text-[#78716C] my-16 max-w-sm mx-auto space-y-2">
                <MessageCircle className="w-10 h-10 mx-auto text-[#E8792A]/40 mb-2" />
                <p className="font-bold text-sm text-[#262B36]">
                  Ask anything about "{fileName}"
                </p>
                <p className="text-xs text-[#78716C]">
                  Select one of the quick action chips on the left, or type your question below.
                </p>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-[90%] sm:max-w-[80%] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#E8792A] to-[#D66B1E] text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-[#262B36] shadow-xs"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#78716C]">
                    <span>{msg.time}</span>
                    {msg.sender === "ai" && (
                      <button
                        onClick={() => copyToClipboard(msg.text, idx)}
                        className="hover:text-[#262B36] flex items-center gap-1 transition-colors"
                        title="Copy text"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {isProcessing && (
              <div className="flex items-center gap-2.5 p-3.5 bg-[#FBF1E9]/60 border border-[#EFE1D2] rounded-xl text-xs text-[#E8792A] font-medium animate-pulse max-w-md">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Gemini AI is analyzing document passages...</span>
              </div>
            )}
          </div>

          {/* Sticky Bottom Chat Input */}
          <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-[#EFE1D2] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="flex items-center gap-2 bg-white border border-[#EFE1D2] focus-within:border-[#E8792A] focus-within:ring-1 focus-within:ring-[#E8792A] rounded-xl px-3 py-1.5 shadow-2xs transition-all"
            >
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask any question about this document..."
                disabled={isProcessing}
                className="flex-1 text-xs bg-transparent py-2 px-1 focus:outline-none text-[#262B36]"
              />
              <button
                type="submit"
                disabled={!userQuery.trim() || isProcessing}
                className="p-2 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-40 text-white rounded-lg transition-colors"
                title="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
