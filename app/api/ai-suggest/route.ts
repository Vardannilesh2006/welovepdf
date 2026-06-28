import { NextRequest, NextResponse } from "next/server";
import { tools } from "../../data/tools-config";

export async function POST(req: NextRequest) {
  try {
    const { query, lang } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || Buffer.from("QVEuQWI4Uk42TDQ2T3FVU0JfMjNGbWV5VC0taTI2WWh7cGZJT04xNDRIU1IxZEFoT3VoMVE=", "base64").toString("utf-8");

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

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Query: "${query}"` }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.3
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`Gemini status code: ${res.status} - ${errorMsg}`);
    }

    const json = await res.json();
    const textResponse = json.candidates?.[0]?.content?.parts?.[0]?.text || "I am here to help you find WeLovePDF tools!";

    return NextResponse.json({ response: textResponse });

  } catch (err: any) {
    console.error("AI suggest error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
