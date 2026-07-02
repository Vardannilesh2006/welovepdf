import React from "react";
import ToolPage, { generateMetadata as baseGenerateMetadata, generateStaticParams } from "../../[tool]/page";
import { Metadata } from "next";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const meta = await baseGenerateMetadata({ params });
  return {
    ...meta,
    title: `हिन्दी - ${meta.title}`,
    description: `हिन्दी गाइड - ${meta.description}`,
    alternates: {
      canonical: `https://welovepdf.best/hi/${params.tool}`,
      languages: {
        en: `https://welovepdf.best/${params.tool}`,
        hi: `https://welovepdf.best/hi/${params.tool}`,
        "x-default": `https://welovepdf.best/${params.tool}`,
      }
    }
  };
}

export default function HindiToolPage({ params }: { params: { tool: string } }) {
  return <ToolPage params={params} lang="hi" />;
}
