export interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export interface GeminiConfig {
  maxOutputTokens?: number;
  temperature?: number;
}

/**
 * Shared helper to call the Gemini 1.5 Flash API securely.
 */
export async function fetchGemini(
  parts: GeminiPart[],
  config: GeminiConfig = {}
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: parts
      }
    ],
    generationConfig: {
      maxOutputTokens: config.maxOutputTokens ?? 2048,
      temperature: config.temperature ?? 0.4
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
    throw new Error(`Gemini API error: ${res.status} - ${errorMsg}`);
  }

  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
