import React from "react";
import Home from "../(english)/page";

export const metadata = {
  title: "WeLovePDF — मुफ्त ऑनलाइन पीडीएफ टूल्स",
  description: "WeLovePDF सभी 60 पीडीएफ टूल्स मुफ्त में प्रदान करता है - पीडीएफ मर्ज करें, विभाजित करें, कंप्रेस करें, कनवर्ट करें, ओसीआर करें। 100% सुरक्षित और स्थानीय।",
  alternates: {
    canonical: "https://www.welovepdf.best/hi",
    languages: {
      en: "https://www.welovepdf.best",
      hi: "https://www.welovepdf.best/hi",
      "x-default": "https://www.welovepdf.best",
    }
  }
};

export default function HindiHome() {
  return <Home />;
}
