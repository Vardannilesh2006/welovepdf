"use client";
import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("wlp_cookie_consent");
    if (!consent) {
      // Delay showing banner by 1.5s so it doesn't interfere with LCP
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("wlp_cookie_consent", "accepted");
    setVisible(false);
    // Enable GA4 measurement after consent
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("wlp_cookie_consent", "declined");
    setVisible(false);
    // Deny GA4 measurement
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "calc(100% - 32px)",
        maxWidth: "520px",
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "16px 20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        animation: "slideUpCookie 0.35s ease",
      }}
    >
      <style>{`
        @keyframes slideUpCookie {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <span style={{ fontSize: "20px", flexShrink: 0 }}>🍪</span>
        <div>
          <p style={{ color: "#f1f5f9", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
            We use cookies and analytics to improve your experience.
            All PDF processing happens{" "}
            <strong style={{ color: "#D97706" }}>100% locally</strong> in your
            browser — your files are never uploaded.{" "}
            <a
              href="/cookies"
              style={{ color: "#60a5fa", textDecoration: "underline", fontSize: "12px" }}
            >
              Cookie Policy
            </a>
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button
          onClick={handleDecline}
          aria-label="Decline cookies"
          style={{
            padding: "7px 16px",
            borderRadius: "8px",
            border: "1px solid #475569",
            background: "transparent",
            color: "#94a3b8",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          aria-label="Accept cookies"
          style={{
            padding: "7px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#D97706",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
