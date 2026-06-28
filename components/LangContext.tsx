"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "hi";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/hi")) {
        setLangState("hi");
        document.documentElement.setAttribute("lang", "hi");
      } else {
        const saved = localStorage.getItem("lang");
        if (saved === "hi" || saved === "en") {
          setLangState(saved);
          document.documentElement.setAttribute("lang", saved);
        }
      }
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.setAttribute("lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
}
