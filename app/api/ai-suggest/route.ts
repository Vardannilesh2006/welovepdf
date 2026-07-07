import { NextRequest, NextResponse } from "next/server";
import { tools } from "../../data/tools-config";
import { isRateLimited } from "../../../lib/rate-limit";
import { fetchGemini } from "../../../lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const { query, lang } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
    }

    // List of tools for system prompt mapping
    const toolsContext = tools.map((t) => `- ${t.name}: slug is "/${t.slug}", category: "${t.category}", description: "${t.desc}"`).join("\n");

    const systemPrompt = `You are the WeLovePDF AI Tool Suggester Assistant.
Here is a list of WeLovePDF's available 63 tools:
${toolsContext}

The user will ask you how to perform a task (e.g. "mujhe invoice compress karni hai" or "help me merge files").
Identify the best matched tool from the list.
1. Answer in the same language as the user query (Hindi, Hinglish, English, etc.).
2. Keep your answer brief (1-3 sentences max).
3. ALWAYS include a markdown link to the tool in your response using the EXACT format: [Tool Name](/slug) (with the slash prefix) so they can click it directly.
Example response: "You can combine your files using our [Merge PDF](/merge-pdf) tool. Just drag and drop your PDFs to begin!"`;

    const parts = [{ text: `${systemPrompt}\n\nUser Query: "${query}"` }];
    const textResponse = await fetchGemini(parts, { maxOutputTokens: 150, temperature: 0.3 })
      || "I am here to help you find WeLovePDF tools!";

    return NextResponse.json({ response: textResponse });

  } catch (err: any) {
    console.error("AI suggest error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
