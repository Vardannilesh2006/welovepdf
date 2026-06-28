import React from "react";
import "./globals.css";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "WeLovePDF — Free Online PDF Tools, No Upload Required",
  description: "WeLovePDF offers 60+ free browser-based PDF tools — merge, split, compress, convert, OCR, and AI-powered PDF tools. No file upload, no signup, 100% private.",
  metadataBase: new URL("https://welovepdf.best"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
