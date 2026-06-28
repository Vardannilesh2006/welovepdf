"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles, RefreshCw } from "lucide-react";

export default function HelperChatbot({ lang = "en" }: { lang?: "en" | "hi" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: lang === "en" 
        ? "Hello! I am your WeLovePDF AI Assistant. Ask me anything like: 'How do I merge files?' or 'mujhe invoice compress karni hai'!" 
        : "नमस्ते! मैं आपका WeLovePDF AI सहायक हूँ। मुझसे कुछ भी पूछें, जैसे: 'मर्ज कैसे करें?' या 'mujhe invoice compress karni hai'!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const currentInput = input;
    setMessages((prev) => [...prev, { sender: "user", text: currentInput }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: currentInput, lang })
      });

      if (!res.ok) {
        throw new Error("Failed to get suggestion.");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev, 
        { sender: "bot", text: lang === "en" ? "Sorry, I am having trouble connecting right now." : "क्षमा करें, मुझे अभी कनेक्ट करने में समस्या हो रही है।" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Convert markdown links [Name](/slug) to HTML links for rendering
  const renderMessageText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }
      parts.push(
        <a 
          key={matchIndex} 
          href={match[2]} 
          className="text-brand-blue font-bold hover:underline"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-24 right-24 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] h-[420px] bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-modal shadow-modal flex flex-col mb-12 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="p-16 bg-brand-blue text-white flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Sparkles className="w-4 h-4 text-brand-amber fill-current" />
              <span className="font-heading font-bold text-[14px]">WeLovePDF AI Helper</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-85">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 p-16 overflow-y-auto flex flex-col gap-12 text-[13px] bg-bg-light/40 dark:bg-bg-dark/10">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`p-10 rounded-card max-w-[85%] leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-brand-blue/10 text-text-primaryLight dark:text-text-primaryDark self-end rounded-br-none" 
                    : "bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primaryLight dark:text-text-primaryDark self-start rounded-bl-none shadow-sm"
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-6 text-[12px] text-text-secondaryLight self-start bg-white dark:bg-surface-dark p-10 rounded-card border border-border-light dark:border-border-dark shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-blue" />
                <span>AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-12 border-t border-border-light dark:border-border-dark flex gap-8 bg-white dark:bg-surface-dark">
            <input 
              type="text" 
              placeholder={lang === "en" ? "Ask AI Assistant..." : "एआई से पूछें..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-12 py-8 border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark text-[13px]"
            />
            <button 
              onClick={handleSend}
              className="p-8 bg-brand-blue hover:bg-brand-blue/90 text-white rounded flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-pill flex items-center justify-center shadow-btn transition-transform hover:scale-105 active:scale-95"
        title="WeLovePDF AI Helper"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  );
}
