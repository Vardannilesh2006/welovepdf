import React from "react";
import { generateStaticParams } from "../../(english)/[tool]/page";
import { Metadata } from "next";
import { ToolPageContent } from "../../../components/ToolPageContent";
import { tools } from "../../data/tools-config";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.tool);
  if (!tool) return {};

  const title = `हिन्दी - ${tool.name} — Free Online Tool | WeLovePDF`;
  const desc = `हिन्दी गाइड - ${tool.name} online for free.`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://www.welovepdf.best/hi/${params.tool}`,
      languages: {
        en: `https://www.welovepdf.best/${params.tool}`,
        hi: `https://www.welovepdf.best/hi/${params.tool}`,
        "x-default": `https://www.welovepdf.best/${params.tool}`,
      }
    }
  };
}

export default function HindiToolPage({ params }: { params: { tool: string } }) {
  return <ToolPageContent params={params} lang="hi" />;
}
