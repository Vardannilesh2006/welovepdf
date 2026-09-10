"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";

interface ContactFormProps {
  lang?: "en" | "hi";
}

export default function ContactForm({ lang = "en" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Technical Issue",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMsg(lang === "hi" ? "कृपया सभी आवश्यक फ़ील्ड भरें।" : "Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMsg(lang === "hi" ? "कृपया एक मान्य ईमेल पता दर्ज करें।" : "Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(lang === "hi" ? "संदेश भेजने में विफल रहा। कृपया सीधे ईमेल करें।" : "Failed to submit form. Please email us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-card p-6 text-center my-6">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {lang === "hi" ? "संदेश प्राप्त हुआ!" : "Message Received!"}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-4 leading-relaxed">
          {lang === "hi"
            ? "धन्यवाद! हमारी टीम को आपका संदेश मिल गया है और हम 12 से 24 घंटों के भीतर जवाब देंगे।"
            : "Thank you for reaching out. Nilesh and the WeLovePDF engineering team have received your note and will reply within 12 to 24 hours."}
        </p>
        <button
          onClick={() => {
            setFormData({ name: "", email: "", subject: "Technical Issue", message: "", honeypot: "" });
            setStatus("idle");
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          {lang === "hi" ? "एक और संदेश भेजें" : "Send Another Message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card p-6 sm:p-8 my-8 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-[#D97706]" />
        {lang === "hi" ? "संदेश भेजें" : "Send Us a Direct Message"}
      </h2>
      <p className="text-xs text-text-secondaryLight dark:text-text-secondaryDark mb-6 leading-relaxed">
        {lang === "hi"
          ? "तकनीकी सहायता, बग रिपोर्ट या नए फीचर सुझाव के लिए नीचे दिया गया फॉर्म भरें।"
          : "Fill out the form below for technical support, tool suggestions, or general feedback."}
      </p>

      {status === "error" && (
        <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <input
        type="text"
        name="website_url"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === "hi" ? "आपका नाम *" : "Your Name *"}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#D97706]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {lang === "hi" ? "ईमेल पता *" : "Email Address *"}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#D97706]"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {lang === "hi" ? "विषय" : "Inquiry Type / Subject"}
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#D97706]"
        >
          <option value="Technical Issue">{lang === "hi" ? "तकनीकी समस्या / बग रिपोर्ट" : "Technical Issue / Bug Report"}</option>
          <option value="Feature Request">{lang === "hi" ? "नया टूल या फीचर अनुरोध" : "Feature Request / New Tool Suggestion"}</option>
          <option value="Partnership Inquiry">{lang === "hi" ? "साझेदारी या व्यावसायिक पूछताछ" : "Partnership / Collaboration Inquiry"}</option>
          <option value="Security Advisory">{lang === "hi" ? "सुरक्षा सूचना" : "Security Advisory"}</option>
          <option value="General Question">{lang === "hi" ? "सामान्य प्रश्न" : "General Question"}</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {lang === "hi" ? "आपका संदेश *" : "Your Message *"}
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={lang === "hi" ? "विस्तार से बताएं कि हम आपकी किस प्रकार सहायता कर सकते हैं..." : "Please describe your question or issue in detail..."}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#D97706] resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-6 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {status === "submitting"
            ? (lang === "hi" ? "भेजा जा रहा है..." : "Submitting...")
            : (lang === "hi" ? "संदेश सबमिट करें" : "Submit Message")}
        </button>

        <a
          href={`mailto:nileshverma99731@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
          className="text-xs text-text-secondaryLight dark:text-text-secondaryDark hover:text-[#D97706] transition-colors underline"
        >
          {lang === "hi" ? "ईमेल ऐप में खोलें →" : "Or open in your email client →"}
        </a>
      </div>
    </form>
  );
}
