"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HelperChatbot from "./HelperChatbot";
import { LangProvider, useLang } from "./LangContext";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useLang();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved ? (saved as "light" | "dark") : (systemDark ? "dark" as const : "light" as const);
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-200">
      <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <main className="flex-1 w-full">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <AppShellContent>{children}</AppShellContent>
    </LangProvider>
  );
}
