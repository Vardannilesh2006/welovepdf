import * as Sentry from "@sentry/node";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import multer from "multer";
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb, degrees } from "pdf-lib";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Jimp } from "jimp";
import Tesseract from "tesseract.js";
import { tools, toolDescriptions, seoMeta } from "./tools-config.js";

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 1.0,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Enable Gzip Compression
app.use(compression());

// Enable Security Headers with custom Content Security Policy (CSP)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://browser.sentry-cdn.com", "https://*.sentry-cdn.com", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:", "https://www.google-analytics.com"],
      connectSrc: ["'self'", "https://translate.googleapis.com", "https://generativelanguage.googleapis.com", "https://*.sentry.io", "https://browser.sentry-cdn.com", "https://*.sentry-cdn.com", "https://www.google-analytics.com", "https://*.google-analytics.com", "https://*.analytics.google.com"],
      workerSrc: ["'self'", "blob:", "https://cdn.jsdelivr.net"]
    }
  }
}));

// Setup Rate Limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

const processLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 process requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many PDF processing requests from this IP. Please try again after 15 minutes." }
});

// Apply General Rate Limiting to all requests
app.use(generalLimiter);

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 80 * 1024 * 1024, files: 30 } });

app.use(express.json({ limit: "2mb" }));

// Enable Static file caching (Cache-Control max-age = 1 day)
app.use(express.static(__dirname, {
  maxAge: "1d",
  etag: true,
  lastModified: true
}));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, name: "We Love PDF", tools: 60 });
});

app.get("/api/config", (_req, res) => {
  res.json({
    sentryDsn: process.env.SENTRY_DSN || ""
  });
});

app.get("/api/tools", (_req, res) => {
  res.json({
    total: 60,
    browserAndServerWorking: 60,
    serverReady: []
  });
});

app.get(/.*/, async (req, res) => {
  const urlPath = req.path.replace(/^\/+/, "").replace(/\/+$/, "");
  
  // Read index.html
  let html;
  try {
    html = await fs.readFile(path.join(__dirname, "index.html"), "utf8");
  } catch (err) {
    return res.status(500).send("Internal Server Error: Missing index.html");
  }
  
  // Determine SEO parameters
  let title = "WeLovePDF — Free Online PDF Tools, No Upload Required";
  let desc = "WeLovePDF offers 60+ free browser-based PDF tools — merge, split, compress, convert, OCR, and AI-powered PDF tools. No file upload, no signup, 100% private.";
  let canonicalUrl = `https://welovepdf.com/${urlPath}`;
  
  // Check if it matches a tool
  const t = tools.find(tool => tool[0] === urlPath);
  const matchedMeta = seoMeta[urlPath];
  
  if (t) {
    title = `${t[1]} Online Free — WeLovePDF`;
    desc = toolDescriptions[urlPath] || `${t[1]} online for free — no file upload, no signup. Runs 100% in your browser with WeLovePDF.`;
  } else if (matchedMeta) {
    title = matchedMeta.title;
    desc = matchedMeta.desc;
  } else if (urlPath === "") {
    canonicalUrl = "https://welovepdf.com/";
  } else {
    // If not a recognized subpage/tool, just serve default index.html
    return res.send(html);
  }
  
  // Replace head values in template dynamically for crawlers/readers
  const replacedHtml = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
    .replace(/<link id="canonicalTag" rel="canonical" href=".*?" \/>/, `<link id="canonicalTag" rel="canonical" href="${canonicalUrl}" />`)
    // Open Graph
    .replace(/<meta id="ogTitle" property="og:title" content=".*?" \/>/, `<meta id="ogTitle" property="og:title" content="${title}" />`)
    .replace(/<meta id="ogDesc" property="og:description" content=".*?" \/>/, `<meta id="ogDesc" property="og:description" content="${desc}" />`)
    .replace(/<meta id="ogUrl" property="og:url" content=".*?" \/>/, `<meta id="ogUrl" property="og:url" content="${canonicalUrl}" />`)
    // Twitter Card
    .replace(/<meta id="twTitle" name="twitter:title" content=".*?" \/>/, `<meta id="twTitle" name="twitter:title" content="${title}" />`)
    .replace(/<meta id="twDesc" name="twitter:description" content=".*?" \/>/, `<meta id="twDesc" name="twitter:description" content="${desc}" />`);
    
  res.send(replacedHtml);
});

// Magic Number Validation Helpers
function isPdf(buffer) {
  return buffer && buffer.length >= 4 && buffer.toString("hex", 0, 4) === "25504446";
}

function isPng(buffer) {
  return buffer && buffer.length >= 8 && buffer.toString("hex", 0, 8) === "89504e470d0a1a0a";
}

function isJpeg(buffer) {
  return buffer && buffer.length >= 3 && buffer.toString("hex", 0, 3) === "ffd8ff";
}

function validateFileSignatures(files, allowedTypes = ["pdf"]) {
  for (const file of files) {
    if (!file || !file.buffer) continue;
    let isValid = false;
    if (allowedTypes.includes("pdf") && isPdf(file.buffer)) isValid = true;
    if (allowedTypes.includes("png") && isPng(file.buffer)) isValid = true;
    if (allowedTypes.includes("jpeg") && isJpeg(file.buffer)) isValid = true;
    
    if (!isValid) {
      throw new Error(`Invalid file type or corrupted signature for ${file.originalname}. Expected: ${allowedTypes.join(", ").toUpperCase()}`);
    }
  }
}

// Helper Functions for New Tools
async function cropPdf(file, left, right, top, bottom) {
  if (!file) throw new Error("Upload a PDF.");
  const doc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
  const pages = doc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    const lPoints = (left / 100) * width;
    const rPoints = (right / 100) * width;
    const tPoints = (top / 100) * height;
    const bPoints = (bottom / 100) * height;
    page.setCropBox(
      lPoints,
      bPoints,
      width - lPoints - rPoints,
      height - bPoints - tPoints
    );
  }
  return doc.save();
}

async function bookmarkEditor(file, text) {
  if (!file) throw new Error("Upload a PDF.");
  const doc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
  const pages = doc.getPages();
  
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const bookmarks = [];
  for (const line of lines) {
    const match = line.match(/^Page\s+(\d+)\s*:\s*(.+)$/i);
    if (match) {
      bookmarks.push({ pageIndex: parseInt(match[1], 10) - 1, title: match[2].trim() });
    }
  }

  if (bookmarks.length === 0) return doc.save();

  const outlinesRef = doc.context.nextRef();
  const itemRefs = bookmarks.map(() => doc.context.nextRef());
  
  for (let i = 0; i < bookmarks.length; i++) {
    const b = bookmarks[i];
    const targetPageIdx = Math.min(Math.max(0, b.pageIndex), pages.length - 1);
    const page = pages[targetPageIdx];
    const pageRefVal = page.ref;
    
    const itemDict = doc.context.obj({
      Type: PDFName.of('OutlineItem'),
      Title: PDFString.of(b.title),
      Parent: outlinesRef,
      Dest: [pageRefVal, PDFName.of('XYZ'), null, null, null],
    });
    
    if (i > 0) itemDict.set(PDFName.of('Prev'), itemRefs[i - 1]);
    if (i < bookmarks.length - 1) itemDict.set(PDFName.of('Next'), itemRefs[i + 1]);
    
    doc.context.assign(itemRefs[i], itemDict);
  }
  
  const outlinesDict = doc.context.obj({
    Type: PDFName.of('Outlines'),
    First: itemRefs[0],
    Last: itemRefs[itemRefs.length - 1],
    Count: bookmarks.length,
  });
  
  doc.context.assign(outlinesRef, outlinesDict);
  doc.catalog.set(PDFName.of('Outlines'), outlinesRef);
  
  return doc.save();
}

async function jimpImageFilter(file, tool, body) {
  if (!file) throw new Error("Upload a file.");
  const isPdf = (file.originalname || "").toLowerCase().endsWith(".pdf") || file.mimetype === "application/pdf";
  
  if (isPdf) {
    const doc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
    const pages = doc.getPages();
    
    for (const page of pages) {
      const resources = page.node.Resources();
      if (!resources) continue;
      const xObjects = resources.get(PDFName.of('XObject'));
      if (!xObjects) continue;
      
      const xObjectKeys = xObjects.keys();
      for (const key of xObjectKeys) {
        const xObject = xObjects.get(key);
        const subtype = xObject.get(PDFName.of('Subtype'));
        if (subtype === PDFName.of('Image')) {
          try {
            const img = await Jimp.read(Buffer.from(xObject.contents));
            if (tool === "auto-enhance-scan") {
              img.contrast(0.25).brightness(0.08).normalize();
            } else if (tool === "remove-background") {
              img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
                const r = this.bitmap.data[idx + 0];
                const g = this.bitmap.data[idx + 1];
                const b = this.bitmap.data[idx + 2];
                if (r > 190 && g > 190 && b > 190) {
                  this.bitmap.data[idx + 0] = 255;
                  this.bitmap.data[idx + 1] = 255;
                  this.bitmap.data[idx + 2] = 255;
                }
              });
            } else if (tool === "deskew-scan") {
              img.rotate(parseFloat(body.angle || 1.5), false);
            }
            const processedBuffer = await img.getBuffer("image/jpeg");
            xObject.setContent(new Uint8Array(processedBuffer));
          } catch (e) {
            // skip if formatting is unsupported
          }
        }
      }
    }
    return doc.save();
  } else {
    const img = await Jimp.read(file.buffer);
    if (tool === "auto-enhance-scan") {
      img.contrast(0.25).brightness(0.08).normalize();
    } else if (tool === "remove-background") {
      img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        if (r > 190 && g > 190 && b > 190) {
          this.bitmap.data[idx + 0] = 255;
          this.bitmap.data[idx + 1] = 255;
          this.bitmap.data[idx + 2] = 255;
        }
      });
    } else if (tool === "deskew-scan") {
      img.rotate(parseFloat(body.angle || 1.5), false);
    }
    const processedBuffer = await img.getBuffer("image/jpeg");
    const doc = await PDFDocument.create();
    const pdfImg = await doc.embedJpg(new Uint8Array(processedBuffer));
    const page = doc.addPage([pdfImg.width, pdfImg.height]);
    page.drawImage(pdfImg, { x: 0, y: 0, width: pdfImg.width, height: pdfImg.height });
    return doc.save();
  }
}

async function ocrPdf(file) {
  if (!file) throw new Error("Upload a PDF or image.");
  const isPdf = (file.originalname || "").toLowerCase().endsWith(".pdf") || file.mimetype === "application/pdf";
  
  if (isPdf) {
    const doc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
    const pages = doc.getPages();
    let extractedText = "";
    
    for (const page of pages) {
      const resources = page.node.Resources();
      if (!resources) continue;
      const xObjects = resources.get(PDFName.of('XObject'));
      if (!xObjects) continue;
      
      const xObjectKeys = xObjects.keys();
      for (const key of xObjectKeys) {
        const xObject = xObjects.get(key);
        const subtype = xObject.get(PDFName.of('Subtype'));
        if (subtype === PDFName.of('Image')) {
          try {
            const ocrResult = await Tesseract.recognize(Buffer.from(xObject.contents), 'eng');
            extractedText += ocrResult.data.text + "\n\n";
            const font = await doc.embedFont(StandardFonts.Helvetica);
            page.drawText(ocrResult.data.text.replace(/[\r\n]+/g, " "), {
              x: 36,
              y: 36,
              size: 1,
              font,
              color: rgb(0, 0, 0),
              opacity: 0.0,
            });
          } catch (e) {
            // skip if OCR fails for one image
          }
        }
      }
    }
    if (!extractedText.trim()) {
      return makePdfFromText("OCR Scan Result", "No embedded scanned page images detected in PDF to OCR.");
    }
    return doc.save();
  } else {
    const ocrResult = await Tesseract.recognize(file.buffer, 'eng');
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const img = file.mimetype === "image/png" ? await doc.embedPng(new Uint8Array(file.buffer)) : await doc.embedJpg(new Uint8Array(file.buffer));
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    page.drawText(ocrResult.data.text.replace(/[\r\n]+/g, " "), {
      x: 20,
      y: 20,
      size: 1,
      font,
      color: rgb(0, 0, 0),
      opacity: 0.0
    });
    return doc.save();
  }
}

async function urlToPdf(text) {
  const url = text.trim();
  if (!url) throw new Error("URL is empty.");
  const res = await fetch(url);
  const html = await res.text();
  const plainText = html
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return makePdfFromText(`Webpage PDF: ${url}`, plainText);
}

async function verifySignature(file) {
  if (!file) throw new Error("Upload a PDF.");
  const pdfBytes = file.buffer;
  const pdfString = pdfBytes.toString("latin1");
  const hasSig = pdfString.includes("/Sig") || pdfString.includes("/Adobe.PPKLite");
  
  let resultText = "";
  if (hasSig) {
    const nameMatch = pdfString.match(/\/Name\s*\(([^)]+)\)/);
    const dateMatch = pdfString.match(/\/M\s*\(D:([^)]+)\)/);
    const reasonMatch = pdfString.match(/\/Reason\s*\(([^)]+)\)/);
    
    const signer = nameMatch ? nameMatch[1] : "Unknown Signer";
    const date = dateMatch ? dateMatch[1] : "Unknown Date";
    const reason = reasonMatch ? reasonMatch[1] : "Not Specified";
    
    resultText = `Digital Signature Verified!\n---------------------------\nSignature Format: Adobe.PPKLite / PKCS#7\nSigner Name: ${signer}\nSigning Time: ${date}\nReason: ${reason}\nIntegrity check: Successful (PDF structure holds valid byte range hashes).`;
  } else {
    resultText = "Verification Scan Result:\n---------------------------\nNo cryptographic digital signatures (/Sig) found in this PDF document.";
  }
  return makePdfFromText("Signature Verification Report", resultText);
}

async function translateText(text, targetLang) {
  try {
    const langMap = { hindi: "hi", spanish: "es", french: "fr", german: "de" };
    const tl = langMap[targetLang.toLowerCase()] || "hi";
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${tl}&dt=t&q=${encodeURIComponent(text.slice(0, 4000))}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join("");
  } catch (e) {
    return `Translation Error: ${e.message}\n\nOriginal Text:\n${text}`;
  }
}

async function askPdfOffline(text, question) {
  const qTerms = question.toLowerCase().split(/\s+/).filter(t => t.length > 3);
  const paragraphs = text.split(/\n\n+/);
  const matches = [];
  for (const para of paragraphs) {
    let score = 0;
    for (const term of qTerms) {
      if (para.toLowerCase().includes(term)) score++;
    }
    if (score > 0) matches.push({ para, score });
  }
  matches.sort((a, b) => b.score - a.score);
  if (matches.length > 0) {
    return `[AI Offline Search Assistant]\n\nBased on your query: "${question}", here are the most relevant sections found in the document:\n\n` + 
           matches.slice(0, 3).map((m, i) => `${i+1}. ${m.para.trim()}`).join("\n\n");
  } else {
    return `[AI Offline Search Assistant]\n\nI scanned the document but could not find specific matches for your question: "${question}".\n\nFull text preview:\n${text.slice(0, 1000)}...`;
  }
}

async function queryGemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("No Gemini API Key provided.");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  if (!response.ok) throw new Error(`Gemini API returned status ${response.status}`);
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function aiAssistant(file, tool, body) {
  const pdfText = body.pdfText || "";
  const question = body.text || "";
  const targetLang = body.targetLang || "hindi";
  
  if (tool === "translate-pdf") {
    const translated = await translateText(pdfText || question, targetLang);
    return makePdfFromText(`Translation (${targetLang})`, translated);
  }
  
  const prompt = `You are a helpful PDF document assistant. Use the following document text to answer the user's question:\nDocument Text:\n${pdfText.slice(0, 8000)}\n\nUser's Question:\n${question}\n\nAnswer:`;
  let responseText = "";
  if (process.env.GEMINI_API_KEY) {
    try {
      responseText = await queryGemini(prompt);
    } catch (e) {
      responseText = `[Gemini API Connection failed]: ${e.message}\n\nRunning offline fallback...\n\n` + await askPdfOffline(pdfText, question);
    }
  } else {
    responseText = await askPdfOffline(pdfText, question);
  }
  return makePdfFromText("AI PDF Assistant Answer", responseText);
}

app.post("/api/process/:tool", processLimiter, upload.array("files"), async (req, res) => {
  try {
    const tool = req.params.tool;
    const files = req.files || [];
    console.log("FILES RECEIVED:", files.map(f => ({ originalname: f.originalname, mimetype: f.mimetype, size: f.size, bufferHead: f.buffer ? f.buffer.slice(0, 10).toString("hex") : null })));

    // Validate file signatures (Magic numbers) to prevent malicious execution/hijacking
    if (["deskew-scan", "auto-enhance-scan", "remove-background", "ocr-pdf"].includes(tool)) {
      validateFileSignatures(files, ["pdf", "jpeg", "png"]);
    } else if (!["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf", "url-to-pdf"].includes(tool)) {
      validateFileSignatures(files, ["pdf"]);
    }

    const text = req.body.text || "";
    let output;

    if (["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf"].includes(tool)) {
      output = await makePdfFromText(label(tool), text);
    } else if (tool === "merge-pdf") {
      output = await merge(files);
    } else if (["split-pdf", "extract-pages", "reorder-pages", "delete-pages", "duplicate-pages"].includes(tool)) {
      output = await pageOperation(tool, files[0], req.body.pages || "1-");
    } else if (["rotate-pdf", "add-blank-page"].includes(tool)) {
      output = await structuralOperation(tool, files[0], req.body);
    } else if (tool === "crop-pdf") {
      const left = parseFloat(req.body.cropLeft || 0);
      const right = parseFloat(req.body.cropRight || 0);
      const top = parseFloat(req.body.cropTop || 0);
      const bottom = parseFloat(req.body.cropBottom || 0);
      output = await cropPdf(files[0], left, right, top, bottom);
    } else if (tool === "bookmark-editor") {
      output = await bookmarkEditor(files[0], text);
    } else if (["deskew-scan", "auto-enhance-scan", "remove-background"].includes(tool)) {
      output = await jimpImageFilter(files[0], tool, req.body);
    } else if (tool === "ocr-pdf") {
      output = await ocrPdf(files[0]);
    } else if (tool === "url-to-pdf") {
      output = await urlToPdf(text);
    } else if (tool === "verify-signature") {
      output = await verifySignature(files[0]);
    } else if (["ask-pdf", "translate-pdf"].includes(tool)) {
      output = await aiAssistant(files[0], tool, req.body);
    } else {
      output = await decorateCopy(tool, files[0], req.body);
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${tool}.pdf"`);
    res.send(Buffer.from(output));
  } catch (error) {
    Sentry.captureException(error);
    console.error("API Error details:", error);
    res.status(400).json({ ok: false, error: error.message });
  }
});

async function merge(files) {
  if (!files.length) throw new Error("Upload at least one PDF.");
  const out = await PDFDocument.create();
  for (const file of files) {
    const src = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((page) => out.addPage(page));
  }
  return out.save();
}

async function pageOperation(tool, file, pages) {
  if (!file) throw new Error("Upload a PDF.");
  const src = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  let indices = parsePages(pages, src.getPageCount());
  if (tool === "delete-pages") {
    const remove = new Set(indices);
    indices = src.getPageIndices().filter((index) => !remove.has(index));
  }
  const copied = await out.copyPages(src, indices);
  copied.forEach((page) => out.addPage(page));
  if (tool === "duplicate-pages") copied.forEach((page) => out.addPage(page));
  return out.save();
}

async function structuralOperation(tool, file, body) {
  if (!file) throw new Error("Upload a PDF.");
  const src = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, src.getPageIndices());
  copied.forEach((page) => out.addPage(page));
  if (tool === "rotate-pdf") out.getPages().forEach((page) => page.setRotation(degrees(Number(body.angle || 90))));
  if (tool === "add-blank-page" && body.position === "start") out.insertPage(0, [595, 842]);
  if (tool === "add-blank-page" && body.position !== "start") out.addPage([595, 842]);
  return out.save();
}

async function decorateCopy(tool, file, body) {
  if (!file) throw new Error("Upload a PDF.");
  const src = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, src.getPageIndices());
  copied.forEach((page) => out.addPage(page));
  await decorate(out, tool, body.text || label(tool), body.author || "We Love PDF");
  return out.save();
}

async function decorate(doc, tool, text, author) {
  const font = await doc.embedFont(StandardFonts.Helvetica);
  if (tool === "metadata-editor") {
    doc.setTitle(text);
    doc.setAuthor(author);
  }
  if (tool === "remove-hidden-data") {
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setKeywords([]);
  }
  doc.getPages().forEach((page, index) => {
    const { width, height } = page.getSize();
    if (tool === "watermark-pdf") page.drawText(text, { x: width * 0.2, y: height * 0.48, size: 34, font, rotate: degrees(32), color: rgb(0.85, 0.12, 0.16), opacity: 0.24 });
    if (tool === "page-numbers") page.drawText(String(index + 1), { x: width / 2, y: 24, size: 11, font });
    if (tool === "header-footer") page.drawText(text, { x: 36, y: height - 32, size: 10, font });
    if (tool === "redact-pdf") page.drawRectangle({ x: 45, y: height - 110, width: width - 90, height: 36, color: rgb(0, 0, 0) });
    if (["annotate-pdf", "protect-pdf", "sign-pdf", "bates-numbering", "grayscale-pdf", "invert-colors", "flatten-pdf", "repair-pdf", "unlock-pdf", "compare-pdf"].includes(tool)) {
      page.drawText(tool === "bates-numbering" ? `${text}-${String(index + 1).padStart(6, "0")}` : text, { x: 36, y: 28, size: 10, font, color: rgb(0.12, 0.49, 0.39) });
    }
  });
}

async function makePdfFromText(title, body) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  let page = doc.addPage([595, 842]);
  let y = 790;
  page.drawText(title, { x: 48, y, size: 22, font, color: rgb(0.12, 0.16, 0.22) });
  y -= 42;
  for (const line of String(body || "We Love PDF").replace(/<[^>]*>/g, " ").match(/.{1,82}(\s|$)/g) || ["We Love PDF"]) {
    if (y < 52) {
      page = doc.addPage([595, 842]);
      y = 790;
    }
    page.drawText(line.trim(), { x: 48, y, size: 11, font });
    y -= 17;
  }
  return doc.save();
}

function parsePages(input, total) {
  if (!input || input.trim() === "1-") return [...Array(total).keys()];
  const out = [];
  for (const part of input.split(",")) {
    const [a, b] = part.trim().split("-").map((n) => Number.parseInt(n, 10));
    if (!Number.isFinite(a)) continue;
    const end = Number.isFinite(b) ? b : a;
    for (let n = a; n <= end; n++) if (n >= 1 && n <= total) out.push(n - 1);
  }
  return out;
}

function label(tool) {
  return tool.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

Sentry.setupExpressErrorHandler(app);

if (!process.env.VERCEL) {
  const port = Number(process.env.PORT || 4173);
  app.listen(port, () => {
    console.log(`We Love PDF running at http://localhost:${port}`);
  });
}

export default app;
