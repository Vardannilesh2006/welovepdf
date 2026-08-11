"use client";

import React, { useState } from "react";
import { Upload, FileText, Send, Sparkles, MessageCircle, ListCollapse, Languages, HelpCircle, Receipt, Bot } from "lucide-react";

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
  const [chatHistory, setChatHistory] = useState<{ sender: "user" | "ai"; text: string }[]>([]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(Array.from(e.target.files));
    }
  };

  const handleSendChat = () => {
    if (!userQuery.trim() || isProcessing) return;
    const q = userQuery;
    setChatHistory((prev) => [...prev, { sender: "user", text: q }]);
    setUserQuery("");
    onProcess(q);
  };

  if (!fileName) {
    return (
      <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] p-8 text-center my-2">
        <label className="cursor-pointer block border-2 border-dashed border-[#EFE1D2] hover:border-[#E8792A] rounded-xl p-10 transition-colors bg-[#FBF1E9]/30">
          <input type="file" accept=".pdf,.png,.jpg" className="hidden" onChange={handleFileInput} />
          <div className="w-14 h-14 bg-[#E8792A]/10 text-[#E8792A] rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-[#262B36] mb-1">Upload Document for {toolName}</h3>
          <p className="text-xs text-[#9C9488] mb-4">Powered by Gemini AI. Instant insights, chat, and extraction.</p>
          <span className="inline-block px-5 py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] text-white text-sm font-medium rounded-lg transition-colors">
            Choose PDF File
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#EFE1D2] rounded-[12px] overflow-hidden my-2 flex flex-col md:flex-row h-[calc(100vh-140px)]">
      
      {/* Left Panel (~40%): Compact Document Preview & Details (Fixed Viewport) */}
      <div className="w-full md:w-[38%] bg-[#FBF1E9]/40 border-b md:border-b-0 md:border-r [border-right-width:0.5px] border-[#EFE1D2] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#262B36] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E8792A]" /> AI Workspace
            </span>
            <button onClick={onReset} className="text-[11px] text-[#9C9488] hover:text-[#262B36] border-[0.5px] border-[#EFE1D2] bg-white px-2 py-0.5 rounded">
              Change File
            </button>
          </div>

          <div className="bg-white p-3 rounded-lg border-[0.5px] border-[#EFE1D2] flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#E8792A] shrink-0" />
            <div className="min-w-0">
              <h4 className="text-xs font-medium text-[#262B36] truncate">{fileName}</h4>
              <p className="text-[11px] text-[#9C9488]">Loaded in AI Memory</p>
            </div>
          </div>
        </div>

        {/* Action Button for Non-Chat AI Tools */}
        {toolSlug !== "ask-pdf" && (
          <button
            onClick={() => onProcess("")}
            disabled={isProcessing}
            className="w-full py-2.5 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {isProcessing ? "AI Processing..." : `Run ${toolName}`}
          </button>
        )}
      </div>

      {/* Right Panel (~60%): AI Interaction / Chat Thread (Internal Scroll) */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#FBF1E9]/30 border-b [border-bottom-width:0.5px] border-[#EFE1D2] px-4 py-2.5 text-xs font-medium text-[#262B36] flex items-center gap-2 shrink-0">
          <Bot className="w-4 h-4 text-[#E8792A]" />
          {toolName} Output & Chat
        </div>

        {/* Conversation / Report Pane (Internal Bounded Scroll Only) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs text-[#262B36]">
          {toolSlug === "ask-pdf" ? (
            chatHistory.length === 0 ? (
              <div className="text-center text-[#9C9488] my-10">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-[#E8792A]/50" />
                <p className="font-medium">Ask anything about "{fileName}"</p>
                <p className="text-[11px]">Type your question below to start chatting with your PDF.</p>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[85%] ${
                    msg.sender === "user"
                      ? "ml-auto bg-[#E8792A] text-white"
                      : "mr-auto bg-[#FBF1E9] border-[0.5px] border-[#EFE1D2] text-[#262B36]"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )
          ) : (
            aiOutput ? (
              <div className="bg-[#FBF1E9]/30 border-[0.5px] border-[#EFE1D2] p-4 rounded-lg leading-relaxed whitespace-pre-wrap">
                {aiOutput}
              </div>
            ) : (
              <div className="text-center text-[#9C9488] my-10">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#E8792A]/50" />
                <p className="font-medium">Click "Run {toolName}" to generate AI analysis.</p>
              </div>
            )
          )}

          {isProcessing && (
            <div className="bg-[#FBF1E9] p-3 rounded-lg text-xs text-[#E8792A] animate-pulse">
              Gemini AI is analyzing document contents...
            </div>
          )}
        </div>

        {/* Chat Input Box (Fixed at Bottom for Ask PDF) */}
        {toolSlug === "ask-pdf" && (
          <div className="p-3 border-t [border-top-width:0.5px] border-[#EFE1D2] bg-[#FBF1E9]/20 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              placeholder="Ask a question about this document..."
              className="flex-1 text-xs text-[#262B36] bg-white border-[0.5px] border-[#EFE1D2] rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8792A]"
            />
            <button
              onClick={handleSendChat}
              disabled={isProcessing}
              className="p-2 bg-[#E8792A] hover:bg-[#D66B1E] disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
