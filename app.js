let pdfjsLib = null;
let PDFDocument = null;
let StandardFonts = null;
let rgb = null;
let degrees = null;
let librariesLoaded = false;

async function loadDependencies() {
  if (librariesLoaded) return;
  
  // Dynamic import of PDF.js
  pdfjsLib = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
  
  // Dynamic load of PDF-Lib script
  if (!window.PDFLib) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  PDFDocument = window.PDFLib.PDFDocument;
  StandardFonts = window.PDFLib.StandardFonts;
  rgb = window.PDFLib.rgb;
  degrees = window.PDFLib.degrees;
  
  librariesLoaded = true;
}

function lazyRenderPdfPage(docOrFile, pageNumber, canvas) {
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        observerInstance.unobserve(entry.target);
        try {
          let doc = docOrFile;
          if (docOrFile instanceof File || docOrFile instanceof Blob) {
            const bytes = await docOrFile.arrayBuffer();
            doc = await pdfjsLib.getDocument({ data: bytes }).promise;
          }
          const page = await doc.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 0.22 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        } catch (err) {
          console.error("Lazy preview page render failed:", err);
        }
      }
    });
  }, { root: $("pagePreview"), rootMargin: "150px" });
  observer.observe(canvas);
}



import { tools, toolDescriptions, toolGuides, subpages, seoMeta, toolFaqs } from "./tools-config.js";
import { blogArticles } from "./blog-posts.js";
import { setRouteMode, toolFromPath } from "./router.js";


const state = { active: tools[0][0], category: "All", files: [] };
const $ = (id) => document.getElementById(id);
const categories = ["All", ...new Set(tools.map((t) => t[2]))];

function renderTabs() {
  $("categoryTabs").innerHTML = categories.map((c) => `<button class="tab ${c === state.category ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
}

function renderTools() {
  const q = $("toolSearch").value.toLowerCase();
  const items = tools.filter((t) => (state.category === "All" || t[2] === state.category) && `${t[1]} ${t[2]} ${t[3]}`.toLowerCase().includes(q));
  $("toolGrid").innerHTML = items.map((t) => `
    <button class="tool-card" data-open-tool="${t[0]}">
      <span class="tool-icon">${t[4]}</span>
      <span><h3>${t[1]}</h3><p>${t[3]}</p><span class="badge">${t[5] ? "Browser working" : "Server-ready"}</span></span>
    </button>`).join("");
}

function activeTool() { return tools.find((t) => t[0] === state.active); }

function getAcceptAttribute(id) {
  if (id === "jpg-to-pdf") return ".jpg,.jpeg,image/jpeg";
  if (id === "png-to-pdf") return ".png,image/png";
  if (id === "image-to-pdf") return ".jpg,.jpeg,.png,.webp,.gif,image/*";
  
  if (["deskew-scan", "auto-enhance-scan", "remove-background", "ocr-pdf"].includes(id)) {
    return "application/pdf,.jpg,.jpeg,.png,image/jpeg,image/png";
  }
  
  if (id === "text-to-pdf") return ".txt,text/plain";
  if (id === "markdown-to-pdf") return ".md,text/markdown";
  if (id === "html-to-pdf") return ".html,.htm,text/html";
  if (id === "word-to-pdf") return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (id === "excel-to-pdf") return ".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv";
  if (id === "powerpoint-to-pdf") return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
  
  // Default is PDF for all other tools
  return "application/pdf";
}

function selectTool(id, options = {}) {
  if (!tools.some((t) => t[0] === id)) id = "merge-pdf";
  
  // Clear files when switching tools to prevent auto-selecting files on new tools
  if (state.active !== id) {
    state.files = [];
    const fileInput = $("fileInput");
    if (fileInput) fileInput.value = "";
    const fileList = $("fileList");
    if (fileList) {
      fileList.classList.add("empty");
      fileList.innerHTML = "No files selected.";
    }
  }

  state.active = id;
  const t = activeTool();
  $("activeToolName").textContent = t[1];
  $("activeToolDesc").textContent = t[3];
  $("crumbTool").textContent = t[1];
  $("toolMode").textContent = t[5] ? "Browser working" : "Server-ready";
  $("uploadHint").textContent = uploadHint(id);

  // Set the file input accept attribute dynamically
  const fileInput = $("fileInput");
  if (fileInput) {
    fileInput.setAttribute("accept", getAcceptAttribute(id));
  }

  // Toggle body classes based on file presence or tool requirements
  const needsNoFile = ["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf", "url-to-pdf"].includes(id);
  document.body.classList.toggle("has-files", state.files.length > 0);
  document.body.classList.toggle("no-file-tool", needsNoFile);

  renderSettings();
  updateRunState();
  if (options.push !== false && location.pathname !== `/${id}`) history.pushState(null, "", `/${id}`);
  
  // === DYNAMIC SEO META UPDATE ===
  updateSEOMeta(id, t[1], t[3]);
  
  setRouteMode();
  renderPreview();
  renderToolGuide(id);
  if (options.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========================================================
//  SEO — Dynamic meta tag updates per tool page
// ========================================================
function updateSEOMeta(toolId, toolName, toolDesc) {
  const base = "https://welovepdf.com";
  const url  = `${base}/${toolId}`;



  const desc = toolDescriptions[toolId]
    || `${toolName} online for free — no file upload, no signup. Runs 100% in your browser with WeLovePDF.`;
  const title = `${toolName} Online Free — WeLovePDF`;

  // Update <title>
  document.title = title;

  // Update <meta name="description">
  let metaDesc = document.querySelector("meta[name='description']");
  if (metaDesc) metaDesc.setAttribute("content", desc);

  // Update canonical
  const canonical = document.getElementById("canonicalTag");
  if (canonical) canonical.setAttribute("href", url);

  // Update Open Graph
  const ogTitle = document.getElementById("ogTitle");
  const ogDesc  = document.getElementById("ogDesc");
  const ogUrl   = document.getElementById("ogUrl");
  if (ogTitle) ogTitle.setAttribute("content", title);
  if (ogDesc)  ogDesc.setAttribute("content", desc);
  if (ogUrl)   ogUrl.setAttribute("content", url);

  // Update Twitter Card
  const twTitle = document.getElementById("twTitle");
  const twDesc  = document.getElementById("twDesc");
  if (twTitle) twTitle.setAttribute("content", title);
  if (twDesc)  twDesc.setAttribute("content", desc);
}


function renderToolGuide(id) {
  const guideSection = $("toolGuideSection");
  if (!guideSection) return;
  
  const defaultGuide = `
    <h2>How to Use ${activeTool()[1]} Tool?</h2>
    <p>Optimize your PDF workflows securely using our browser-first tool suite. We Love PDF is designed to provide professional document tools that respect your data privacy.</p>
    
    <h3>Instructions:</h3>
    <ol>
      <li><strong>Add Files:</strong> Upload your PDF document or relevant text/images above.</li>
      <li><strong>Configure Settings:</strong> Use the options panel on the right to customize the tool output (e.g. text sizes, numbers, positions).</li>
      <li><strong>Run:</strong> Click the "Run tool" button.</li>
      <li><strong>Save:</strong> Download your processed document instantly.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>General FAQs</h2>
      <h3>Are my documents secure?</h3>
      <p>Yes, We Love PDF operates primarily inside your local web browser sandbox. Documents are processed locally and are never stored or logged on our servers, ensuring GDPR compliance.</p>
      <h3>Do I need to sign up?</h3>
      <p>No registration or payment is required to use our core tools. Simply upload your files and download the results.</p>
    </div>
  `;
  
  guideSection.innerHTML = toolGuides[id] || defaultGuide;
}

function uploadHint(id) {
  if (id.includes("jpg") || id.includes("png") || id === "image-to-pdf") return "or drop images here";
  if (["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf"].includes(id)) return "or type text below";
  return "or drop PDFs here";
}

function renderSettings() {
  const id = state.active;
  const pageRange = `<label>Pages or order<input id="pages" value="1-" placeholder="1-3,5 or 3,1,2" /></label>`;
  const text = `<label>Text<textarea id="textValue" placeholder="Type text, watermark, signature, HTML, or Markdown here..."></textarea></label>`;
  const angle = `<label>Rotation<select id="angle"><option>90</option><option>180</option><option>270</option></select></label>`;
  const position = `<label>Position<select id="position"><option>end</option><option>start</option></select></label>`;
  const quality = `<label>Output quality<select id="quality"><option value="1">High</option><option value=".72">Balanced</option><option value=".48">Small</option></select></label>`;
  const search = `<label>Search text<input id="searchText" placeholder="Enter text to find" /></label>`;
  
  // Custom tool inputs
  const cropBox = `
    <label>Left Crop Margin (%)<input type="number" id="cropLeft" value="10" min="0" max="90" /></label>
    <label>Right Crop Margin (%)<input type="number" id="cropRight" value="10" min="0" max="90" /></label>
    <label>Top Crop Margin (%)<input type="number" id="cropTop" value="10" min="0" max="90" /></label>
    <label>Bottom Crop Margin (%)<input type="number" id="cropBottom" value="10" min="0" max="90" /></label>
  `;
  const outlinesText = `
    <label>Document Outlines (Page: Title)<textarea id="textValue" placeholder="Page 1: Introduction&#10;Page 5: Chapter 1&#10;Page 12: Conclusion"></textarea></label>
  `;
  const skewAngle = `
    <label>Alignment Skew Angle<select id="angle"><option value="1.5">1.5° Clockwise</option><option value="3">3° Clockwise</option><option value="-1.5">-1.5° Counter-Clockwise</option><option value="-3">-3° Counter-Clockwise</option></select></label>
  `;
  const enhanceOption = `
    <label>Enhancement Profile<select id="enhanceOption"><option value="contrast">Auto Contrast Boost</option><option value="brighten">Brighten Scan</option><option value="normalize">Normalize Pixels</option></select></label>
  `;
  const cleanOption = `
    <label>Cleaning Threshold<select id="cleanOption"><option value="standard">Standard Clean</option><option value="aggressive">Aggressive Clean</option></select></label>
  `;
  const ocrInstructions = `
    <p class="empty">Tesseract OCR will scan images inside the document and generate a searchable text layer overlay.</p>
  `;
  const urlInput = `
    <label>Webpage URL<input type="url" id="textValue" placeholder="https://example.com" value="https://example.com" /></label>
  `;
  const sigInstructions = `
    <p class="empty">Will scan PDF file data for cryptographic digital signatures and compile a validation report.</p>
  `;
  const askInput = `
    <label>Ask a Question about this PDF<textarea id="textValue" placeholder="e.g., What is the summary of this contract? Who signed it?"></textarea></label>
  `;
  const translateOptions = `
    <label>Target Language<select id="targetLang"><option value="hindi">Hindi (हिन्दी)</option><option value="spanish">Spanish (Español)</option><option value="french">French (Français)</option><option value="german">German (Deutsch)</option></select></label>
  `;

  let html = `<p class="empty">Smart defaults are applied for this tool.</p>`;
  if (["split-pdf", "delete-pages", "extract-pages", "reorder-pages", "duplicate-pages"].includes(id)) html = pageRange;
  if (id === "rotate-pdf") html = angle;
  if (id === "add-blank-page") html = position;
  if (["watermark-pdf", "header-footer", "annotate-pdf", "protect-pdf", "sign-pdf", "bates-numbering"].includes(id)) html = text;
  if (["metadata-editor"].includes(id)) html = text + `<label>Author<input id="authorValue" placeholder="Author" /></label>`;
  if (["jpg-to-pdf", "png-to-pdf", "image-to-pdf", "pdf-to-jpg", "pdf-to-png"].includes(id)) html = quality;
  if (["html-to-pdf", "markdown-to-pdf", "text-to-pdf", "resume-to-pdf"].includes(id)) html = text;
  if (id === "search-in-pdf") html = search;
  
  // Dynamic settings for new tools
  if (id === "crop-pdf") html = cropBox;
  if (id === "bookmark-editor") html = outlinesText;
  if (id === "deskew-scan") html = skewAngle;
  if (id === "auto-enhance-scan") html = enhanceOption;
  if (id === "remove-background") html = cleanOption;
  if (id === "ocr-pdf") html = ocrInstructions;
  if (id === "url-to-pdf") html = urlInput;
  if (id === "verify-signature") html = sigInstructions;
  if (id === "ask-pdf") html = askInput;
  if (id === "translate-pdf") html = translateOptions;
  
  $("settings").innerHTML = html;
}

function updateRunState() {
  const needsNoFile = ["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf", "url-to-pdf"].includes(state.active);
  $("runTool").disabled = !activeTool()[5] || (!needsNoFile && state.files.length === 0);
  $("fileCount").textContent = `${state.files.length} file${state.files.length === 1 ? "" : "s"}`;
}

async function setFiles(files) {
  state.files = [...files];
  const needsNoFile = ["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf", "url-to-pdf"].includes(state.active);
  document.body.classList.toggle("has-files", state.files.length > 0);
  document.body.classList.toggle("no-file-tool", needsNoFile);
  $("fileList").classList.toggle("empty", state.files.length === 0);
  $("fileList").innerHTML = state.files.length ? state.files.map((f) => `<div class="file-row"><span>${f.name}</span><strong>${formatSize(f.size)}</strong></div>`).join("") : "No files selected.";
  updateRunState();
  await renderPreview();
}

async function renderPreview() {
  $("pagePreview").innerHTML = "";
  if (state.files.length === 0) {
    const needsNoFile = ["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf", "url-to-pdf"].includes(state.active);
    if (needsNoFile) {
      let icon = "📝";
      let hint = "Type or paste your content in the Settings panel on the right to compile your PDF.";
      if (state.active === "url-to-pdf") {
        icon = "🌐";
        hint = "Enter the webpage URL in the Settings panel on the right to compile your PDF.";
      } else if (state.active === "resume-to-pdf") {
        icon = "💼";
        hint = "Type or paste your resume text in the Settings panel on the right to generate a professional PDF.";
      }
      $("pagePreview").innerHTML = `
        <div class="empty-workspace-state">
          <span class="empty-icon">${icon}</span>
          <h3>Workspace Ready</h3>
          <p>${hint}</p>
        </div>
      `;
    } else {
      $("pagePreview").innerHTML = `<p class="empty">Drag and drop or select files to preview.</p>`;
    }
    return;
  }

  await loadDependencies();

  // Define dynamic delete handler on window
  window.deleteFile = (index) => {
    state.files.splice(index, 1);
    setFiles(state.files);
  };

  const isMultiFile = state.files.length > 1 || ["merge-pdf", "image-to-pdf", "compare-pdf"].includes(state.active);

  if (isMultiFile) {
    // Render each file as a card
    for (let i = 0; i < state.files.length; i++) {
      const file = state.files[i];
      const wrap = document.createElement("div");
      wrap.className = "page-thumb";
      
      // Make card draggable for reordering
      wrap.setAttribute("draggable", "true");
      wrap.dataset.index = i;
      
      wrap.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", i);
        wrap.classList.add("dragging");
      });
      wrap.addEventListener("dragend", () => {
        wrap.classList.remove("dragging");
      });
      wrap.addEventListener("dragover", (e) => {
        e.preventDefault();
        wrap.classList.add("dragover");
      });
      wrap.addEventListener("dragleave", () => {
        wrap.classList.remove("dragover");
      });
      wrap.addEventListener("drop", (e) => {
        e.preventDefault();
        wrap.classList.remove("dragover");
        const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        const toIndex = i;
        if (fromIndex !== toIndex && !isNaN(fromIndex)) {
          const temp = state.files.splice(fromIndex, 1)[0];
          state.files.splice(toIndex, 0, temp);
          setFiles(state.files);
        }
      });
      
      // Index badge
      const badge = document.createElement("span");
      badge.className = "card-index-badge";
      badge.textContent = i + 1;
      wrap.appendChild(badge);

      // Delete button with direct click event listener
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "card-delete-btn";
      deleteBtn.type = "button";
      deleteBtn.innerHTML = "×";
      deleteBtn.title = "Remove file";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        window.deleteFile(i);
      });
      wrap.appendChild(deleteBtn);

      // Card details container
      const details = document.createElement("div");
      details.className = "card-details";
      
      const nameSpan = document.createElement("span");
      nameSpan.className = "card-name";
      nameSpan.textContent = file.name;
      
      const sizeSpan = document.createElement("span");
      sizeSpan.className = "card-meta";
      sizeSpan.textContent = formatSize(file.size);
      
      details.append(nameSpan, sizeSpan);

      // Preview content
      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = () => URL.revokeObjectURL(img.src);
        wrap.append(img, details);
        $("pagePreview").append(wrap);
      } else if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        // PDF: render page 1 lazy
        const canvas = document.createElement("canvas");
        wrap.append(canvas, details);
        $("pagePreview").append(wrap);
        lazyRenderPdfPage(file, 1, canvas);
      } else {
        // Text/Markdown/Spreadsheet fallback
        const fallback = document.createElement("div");
        fallback.style.display = "grid";
        fallback.style.width = "100%";
        fallback.style.height = "140px";
        fallback.style.placeItems = "center";
        fallback.style.fontSize = "32px";
        fallback.style.background = "#f1f5f9";
        fallback.style.borderRadius = "6px";
        fallback.textContent = "📄";
        wrap.append(fallback, details);
        $("pagePreview").append(wrap);
      }
    }
  } else {
    // Single file page-by-page preview
    const file = state.files[0];
    if (file.type.startsWith("image/")) {
      // Single image file
      const wrap = document.createElement("div");
      wrap.className = "page-thumb";
      
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "card-delete-btn";
      deleteBtn.type = "button";
      deleteBtn.innerHTML = "×";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        window.deleteFile(0);
      });
      wrap.appendChild(deleteBtn);

      const details = document.createElement("div");
      details.className = "card-details";
      const nameSpan = document.createElement("span");
      nameSpan.className = "card-name";
      nameSpan.textContent = file.name;
      const sizeSpan = document.createElement("span");
      sizeSpan.className = "card-meta";
      sizeSpan.textContent = formatSize(file.size);
      details.append(nameSpan, sizeSpan);

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = () => URL.revokeObjectURL(img.src);
      wrap.append(img, details);
      $("pagePreview").append(wrap);
    } else if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: bytes }).promise;
        const max = Math.min(doc.numPages, 16); // Render up to 16 pages
        for (let i = 1; i <= max; i++) {
          const canvas = document.createElement("canvas");
          
          const wrap = document.createElement("div");
          wrap.className = "page-thumb";
          
          // Page badge
          const badge = document.createElement("span");
          badge.className = "card-index-badge";
          badge.textContent = i;
          wrap.appendChild(badge);

          const details = document.createElement("div");
          details.className = "card-details";
          const nameSpan = document.createElement("span");
          nameSpan.className = "card-name";
          nameSpan.textContent = `Page ${i}`;
          details.append(nameSpan);

          wrap.append(canvas, details);
          $("pagePreview").append(wrap);

          // Lazy render the page thumbnail canvas only when it scrolls near the viewport
          lazyRenderPdfPage(doc, i, canvas);
        }
      } catch (err) {
        $("pagePreview").innerHTML = `<p class="empty">Preview failed: ${err.message}</p>`;
      }
    } else {
      // Fallback
      $("pagePreview").innerHTML = `<div class="empty">📄 No visual preview available for ${file.name}</div>`;
    }
  }
}

function parsePages(input, total) {
  if (!input || input.trim() === "1-") return [...Array(total).keys()];
  const out = [];
  for (const part of input.split(",")) {
    const [a, b] = part.trim().split("-").map((n) => parseInt(n, 10));
    if (!Number.isFinite(a)) continue;
    const end = Number.isFinite(b) ? b : a;
    for (let n = a; n <= end; n++) if (n >= 1 && n <= total) out.push(n - 1);
  }
  return out;
}

async function loadPdf(file = state.files[0]) {
  await loadDependencies();
  return PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
}

async function makePdfFromText(title, body) {
  await loadDependencies();
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  let page = doc.addPage([595, 842]);
  let y = 790;
  page.drawText(title, { x: 48, y, size: 22, font, color: rgb(0.12, 0.16, 0.22) });
  y -= 42;
  for (const line of wrapText(body || "We Love PDF", 82)) {
    if (y < 52) { page = doc.addPage([595, 842]); y = 790; }
    page.drawText(line, { x: 48, y, size: 11, font, color: rgb(0.22, 0.25, 0.31) });
    y -= 17;
  }
  return doc.save();
}

async function handleOfficeToPdf(id) {
  let fileText = "";
  if (state.files.length > 0) {
    const file = state.files[0];
    const ext = file.name.toLowerCase().split('.').pop();
    if (["docx", "xlsx", "pptx", "zip"].includes(ext)) {
      throw new Error("Office files (.docx, .xlsx, .pptx) are compressed binary files and cannot be parsed client-side. For secure local processing, please save your document as a Text (.txt), Markdown (.md), or CSV (.csv) file first, or paste the text directly into the Settings panel on the right.");
    }
    fileText = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(new Error("Failed to read text file: " + err.message));
      reader.readAsText(file);
    });
  } else {
    fileText = $("textValue")?.value || "";
  }
  
  if (!fileText.trim()) {
    throw new Error("Please upload a text file or type/paste text in the Settings panel on the right.");
  }
  
  return download(await makePdfFromText(activeTool()[1], fileText), `${id}.pdf`);
}

async function runTool() {
  const id = state.active;
  const result = $("result");
  result.textContent = "Processing...";
  try {
    if (!shouldUseBackend(id)) {
      await loadDependencies();
    }
    if (!activeTool()[5]) throw new Error("This tool needs a production backend service. UI workflow is ready.");
    if (shouldUseBackend(id)) return runBackendTool(id);
    if (["text-to-pdf", "markdown-to-pdf", "html-to-pdf", "resume-to-pdf", "word-to-pdf", "excel-to-pdf", "powerpoint-to-pdf"].includes(id)) {
      return handleOfficeToPdf(id);
    }
    if (id.includes("to-pdf") && !id.startsWith("pdf-to") && state.files.some((f) => f.type.startsWith("image/"))) {
      return download(await imagesToPdf(state.files), `${id}.pdf`);
    }
    if (id.startsWith("pdf-to") || ["search-in-pdf", "summarize-pdf", "quiz-from-pdf", "invoice-extractor"].includes(id)) {
      return convertFromPdf(id);
    }
    const doc = await transformPdf(id);
    download(await doc.save(), `${id}.pdf`);
  } catch (err) {
    if (window.Sentry) window.Sentry.captureException(err);
    result.innerHTML = `<strong>Could not finish:</strong> ${err.message}`;
  }
}

function shouldUseBackend(id) {
  const backendOnly = [
    "crop-pdf",
    "bookmark-editor",
    "deskew-scan",
    "auto-enhance-scan",
    "remove-background",
    "ocr-pdf",
    "url-to-pdf",
    "verify-signature",
    "ask-pdf",
    "translate-pdf"
  ];
  return backendOnly.includes(id);
}

async function runBackendTool(id) {
  const form = new FormData();
  state.files.forEach((file) => form.append("files", file));
  form.append("pages", $("pages")?.value || "1-");
  form.append("angle", $("angle")?.value || "90");
  form.append("position", $("position")?.value || "end");
  form.append("text", $("textValue")?.value || activeTool()[1]);
  form.append("author", $("authorValue")?.value || "We Love PDF");
  
  if (id === "crop-pdf") {
    form.append("cropLeft", $("cropLeft")?.value || "0");
    form.append("cropRight", $("cropRight")?.value || "0");
    form.append("cropTop", $("cropTop")?.value || "0");
    form.append("cropBottom", $("cropBottom")?.value || "0");
  } else if (id === "auto-enhance-scan") {
    form.append("enhanceOption", $("enhanceOption")?.value || "contrast");
  } else if (id === "remove-background") {
    form.append("cleanOption", $("cleanOption")?.value || "standard");
  } else if (id === "translate-pdf") {
    form.append("targetLang", $("targetLang")?.value || "hindi");
  }

  if ((id === "ask-pdf" || id === "translate-pdf") && state.files.length > 0) {
    try {
      const pdfText = await extractText();
      form.append("pdfText", pdfText);
    } catch (err) {
      console.error("Client text extraction failed, falling back to backend extraction: ", err);
    }
  }

  const response = await fetch(`/api/process/${id}`, { method: "POST", body: form });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.engineRequired || detail.error || `Backend returned ${response.status}`);
  }
  const blob = await response.blob();
  download(blob, `${id}.pdf`, "application/pdf");
}

async function transformPdf(id) {
  if (id === "merge-pdf") {
    const out = await PDFDocument.create();
    for (const file of state.files) {
      const src = await loadPdf(file);
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((p) => out.addPage(p));
    }
    return out;
  }
  const src = await loadPdf();
  const out = await PDFDocument.create();
  const total = src.getPageCount();
  let indices = src.getPageIndices();
  if (["split-pdf", "extract-pages", "reorder-pages", "duplicate-pages"].includes(id)) indices = parsePages($("pages")?.value, total);
  if (id === "delete-pages") {
    const remove = new Set(parsePages($("pages")?.value, total));
    indices = indices.filter((i) => !remove.has(i));
  }
  const copied = await out.copyPages(src, indices);
  copied.forEach((p) => out.addPage(p));
  if (id === "duplicate-pages") copied.forEach((p) => out.addPage(p));
  if (id === "add-blank-page" && $("position")?.value === "start") out.insertPage(0, [595, 842]);
  if (id === "add-blank-page" && $("position")?.value !== "start") out.addPage([595, 842]);
  if (id === "rotate-pdf") out.getPages().forEach((p) => p.setRotation(degrees(parseInt($("angle").value, 10))));
  await decorate(out, id);
  return out;
}

async function decorate(doc, id) {
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const text = $("textValue")?.value || activeTool()[1];
  if (id === "metadata-editor") { doc.setTitle(text || "We Love PDF Document"); doc.setAuthor($("authorValue")?.value || "We Love PDF"); }
  if (id === "remove-hidden-data") { doc.setTitle(""); doc.setAuthor(""); doc.setSubject(""); doc.setKeywords([]); }
  doc.getPages().forEach((page, i) => {
    const { width, height } = page.getSize();
    if (id === "watermark-pdf") page.drawText(text, { x: width * .22, y: height * .48, size: 34, font, rotate: degrees(32), color: rgb(.85, .12, .16), opacity: .24 });
    if (id === "page-numbers") page.drawText(`${i + 1}`, { x: width / 2, y: 24, size: 11, font, color: rgb(.25, .28, .34) });
    if (id === "header-footer") { page.drawText(text, { x: 36, y: height - 32, size: 10, font }); page.drawText("Created with We Love PDF", { x: 36, y: 24, size: 10, font }); }
    if (id === "annotate-pdf" || id === "protect-pdf" || id === "sign-pdf") page.drawText(text, { x: 48, y: 48, size: 14, font, color: rgb(.12, .49, .39) });
    if (id === "bates-numbering") page.drawText(`${text || "WLP"}-${String(i + 1).padStart(6, "0")}`, { x: 36, y: 24, size: 10, font });
    if (id === "redact-pdf") page.drawRectangle({ x: 45, y: height - 110, width: width - 90, height: 36, color: rgb(0, 0, 0) });
    if (id === "grayscale-pdf" || id === "invert-colors") page.drawText(id === "invert-colors" ? "Dark reading copy" : "Grayscale print copy", { x: 36, y: height - 32, size: 9, font, color: rgb(.4, .4, .4) });
  });
}

async function imagesToPdf(files) {
  const doc = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const image = file.type.includes("png") ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const page = doc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  return doc.save();
}

async function extractText(file = state.files[0]) {
  const loadingTask = pdfjsLib.getDocument({ data: await file.arrayBuffer() });
  const pdf = await loadingTask.promise;
  const lines = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    lines.push(content.items.map((item) => item.str).join(" "));
  }
  return lines.join("\n\n");
}

async function convertFromPdf(id) {
  const text = await extractText();
  if (id === "pdf-to-text") return download(new TextEncoder().encode(text), "pdf-text.txt", "text/plain");
  if (id === "pdf-to-markdown") return download(new TextEncoder().encode(`# Extracted PDF Text\n\n${text}`), "pdf-markdown.md", "text/markdown");
  if (id === "pdf-to-html") return download(new TextEncoder().encode(`<main><h1>Extracted PDF Text</h1><pre>${escapeHtml(text)}</pre></main>`), "pdf.html", "text/html");
  if (id === "pdf-to-csv" || id === "pdf-to-excel") return download(new TextEncoder().encode(text.split(/\n+/).map((l) => `"${l.replaceAll('"', '""')}"`).join("\n")), "pdf.csv", "text/csv");
  if (id === "pdf-to-word") return download(new TextEncoder().encode(`<html><body><pre>${escapeHtml(text)}</pre></body></html>`), "pdf-word.doc", "application/msword");
  if (id === "pdf-to-powerpoint") return download(new TextEncoder().encode(`<h1>PDF slide outline</h1><p>${escapeHtml(text.slice(0, 5000))}</p>`), "pdf-slides.html", "text/html");
  if (["pdf-to-jpg", "pdf-to-png", "pdf-to-long-image"].includes(id)) return renderPdfImage(id);
  if (id === "search-in-pdf") {
    const query = $("searchText")?.value || "";
    if (!query.trim()) {
      return $("result").innerHTML = `<strong>Matches:</strong> 0`;
    }
    return $("result").innerHTML = `<strong>Matches:</strong> ${(text.match(new RegExp(escapeRegExp(query), "gi")) || []).length}`;
  }
  if (id === "summarize-pdf") return download(new TextEncoder().encode(text.split(".").slice(0, 5).join(".") + "."), "summary.txt", "text/plain");
  if (id === "quiz-from-pdf") return download(new TextEncoder().encode(text.split(".").filter(Boolean).slice(0, 8).map((s, i) => `${i + 1}. What is meant by: ${s.trim().slice(0, 90)}?`).join("\n")), "quiz.txt", "text/plain");
  if (id === "invoice-extractor") return download(new TextEncoder().encode(extractInvoice(text)), "invoice-fields.txt", "text/plain");
}

async function renderPdfImage(id) {
  const pdf = await pdfjsLib.getDocument({ data: await state.files[0].arrayBuffer() }).promise;
  const canvases = [];
  const count = id === "pdf-to-long-image" ? Math.min(pdf.numPages, 8) : 1;
  for (let i = 1; i <= count; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.8 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    canvases.push(canvas);
  }
  const out = document.createElement("canvas");
  out.width = Math.max(...canvases.map((c) => c.width));
  out.height = canvases.reduce((sum, c) => sum + c.height, 0);
  const ctx = out.getContext("2d");
  let y = 0;
  canvases.forEach((c) => { ctx.fillStyle = "#fff"; ctx.fillRect(0, y, out.width, c.height); ctx.drawImage(c, 0, y); y += c.height; });
  const type = id === "pdf-to-jpg" ? "image/jpeg" : "image/png";
  out.toBlob((blob) => download(blob, id === "pdf-to-jpg" ? "page.jpg" : "page.png", type), type, parseFloat($("quality")?.value || "1"));
}

function download(bytes, name, type = "application/pdf") {
  const blob = bytes instanceof Blob ? bytes : new Blob([bytes], { type });
  const url = URL.createObjectURL(blob);
  $("result").innerHTML = `<strong>Done.</strong> Your file is ready.<br><a class="download-link" download="${name}" href="${url}">Download ${name}</a>`;

}


function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
function wrapText(text, width) { return String(text).replace(/<[^>]*>/g, " ").split(/\r?\n/).flatMap((line) => line.match(new RegExp(`.{1,${width}}(\\s|$)`, "g")) || [""]); }
function escapeHtml(text) { return String(text).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])); }
function escapeRegExp(text) { return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function extractInvoice(text) {
  const total = text.match(/(?:total|amount|balance)\D{0,20}([\d,.]+)/i)?.[1] || "Not found";
  const date = text.match(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/)?.[0] || "Not found";
  return `Invoice fields\nDate: ${date}\nTotal: ${total}\n\nPreview text:\n${text.slice(0, 1200)}`;
}

// Routing and subpages have been decoupled into router.js




// Click interception for SPA links
document.addEventListener("click", (event) => {
  // 1. Intercept normal anchor link clicks
  const link = event.target.closest("a");
  if (link) {
    const href = link.getAttribute("href");
    if (href && (href.startsWith("/") || href.startsWith("#"))) {
      // Determine pathname vs hash
      let cleanPath = href.split("#")[0];
      const hash = href.split("#")[1];

      // If relative tool link without forward slash (e.g. href="merge-pdf" or "/merge-pdf")
      if (cleanPath && !cleanPath.startsWith("/") && tools.some((t) => t[0] === cleanPath)) {
        cleanPath = "/" + cleanPath;
      }

      const cleanPathFormatted = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;
      
      if (cleanPath && cleanPathFormatted !== location.pathname) {
        event.preventDefault();
        history.pushState(null, "", href);
        
        // If it is a tool path, update selection states
        const routeTool = cleanPath.replace(/^\/+/, "");
        if (tools.some((t) => t[0] === routeTool)) {
          selectTool(routeTool, { push: false, scroll: true });
        } else {
          setRouteMode();
        }
      } else if (hash) {
        event.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", href);
        }
      }
      return;
    }
  }

  // 2. Intercept data-open-tool card clicks
  const toolButton = event.target.closest("[data-open-tool]");
  if (toolButton) {
    event.preventDefault();
    selectTool(toolButton.dataset.openTool);
    return;
  }

  // 3. Intercept tab categories
  const tab = event.target.closest("[data-cat]");
  if (tab) {
    event.preventDefault();
    state.category = tab.dataset.cat; 
    renderTabs(); 
    renderTools();
    return;
  }

  // 4. Intercept FAQ questions
  const faqBtn = event.target.closest(".faq-question");
  if (faqBtn) {
    event.preventDefault();
    const item = faqBtn.closest(".faq-item");
    const isActive = item.classList.contains("active");
    
    // Toggle active state
    item.classList.toggle("active", !isActive);
    const answer = item.querySelector(".faq-answer");
    if (!isActive) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = "0";
    }
    return;
  }

  // 5. Intercept Blog card "Read Guide" clicks
  const blogCard = event.target.closest(".blog-card");
  const readMoreBtn = event.target.closest(".read-more-link");
  if (readMoreBtn && blogCard) {
    event.preventDefault();
    const postId = blogCard.dataset.postId;
    const article = blogArticles[postId];
    if (article) {
      $("blogGrid").style.display = "none";
      $("blogPostContent").innerHTML = `
        <div class="blog-detail-header">
          <div class="blog-meta"><span class="blog-tag">${article.tag}</span> • <span class="blog-date">${article.date}</span></div>
          <h2>${article.title}</h2>
        </div>
        ${article.content}
      `;
      $("blogPostDetail").style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }
});

// Other Event Listeners
$("toolSearch").addEventListener("input", renderTools);
$("chooseFiles").addEventListener("click", () => $("fileInput").click());
$("addMoreFiles")?.addEventListener("click", () => $("fileInput").click());
$("fileInput").addEventListener("change", (e) => {
  const newFiles = Array.from(e.target.files);
  const currentFiles = state.files || [];
  setFiles([...currentFiles, ...newFiles]);
  e.target.value = "";
});
$("clearFiles").addEventListener("click", () => setFiles([]));
$("runTool").addEventListener("click", runTool);

["dragenter", "dragover"].forEach((name) => $("dropZone").addEventListener(name, (e) => { e.preventDefault(); $("dropZone").classList.add("dragover"); }));
["dragleave", "drop"].forEach((name) => $("dropZone").addEventListener(name, (e) => { e.preventDefault(); $("dropZone").classList.remove("dragover"); }));
$("dropZone").addEventListener("drop", (e) => setFiles(e.dataTransfer.files));

window.addEventListener("popstate", () => {
  const routeTool = toolFromPath();
  if (routeTool) {
    selectTool(routeTool, { push: false, scroll: false });
  } else {
    setRouteMode();
  }
});

// Blog Back Button
$("blogBackBtn").addEventListener("click", (e) => {
  e.preventDefault();
  $("blogPostDetail").style.display = "none";
  $("blogGrid").style.display = "grid";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Pricing toggle
$("pricing-billing-toggle").addEventListener("change", (e) => {
  const isYearly = e.target.checked;
  const proPrice = $("pro-price");
  
  // Set active toggles visually
  $("billing-monthly").classList.toggle("active", !isYearly);
  $("billing-yearly").classList.toggle("active", isYearly);
  
  // Update pricing values
  if (isYearly) {
    proPrice.textContent = proPrice.dataset.yearly;
  } else {
    proPrice.textContent = proPrice.dataset.monthly;
  }
});

// Buy Pro simulation
$("buy-pro-btn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Pro Upgrade triggered! Redirecting you to Stripe checkout portal...");
});

// Contact Form Handlers
$("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = $("contactSubmitBtn");
  const originalText = submitBtn.textContent;
  
  // Show sending state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending Message...";
  
  const formData = new FormData($("contactForm"));
  
  fetch("https://formsubmit.co/ajax/nileshverma99731@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      topic: formData.get("topic"),
      message: formData.get("message")
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Server error");
    return res.json();
  })
  .then(data => {
    $("contactForm").style.display = "none";
    $("contactSuccess").style.display = "block";
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  })
  .catch(err => {
    console.error("Error sending support message:", err);
    alert("Oops! There was an issue sending your message. Please try again or email us directly at nileshverma99731@gmail.com");
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
});

// Reset Contact Form
$("contactResetBtn").addEventListener("click", (e) => {
  e.preventDefault();
  $("contactForm").reset();
  $("contactForm").style.display = "grid";
  $("contactSuccess").style.display = "none";
});

// Init router
renderTabs();
renderTools();

// Async initialization of configuration & Sentry
async function initConfig() {
  try {
    const res = await fetch("/api/config");
    if (res.ok) {
      const config = await res.json();
      if (config.sentryDsn && window.Sentry) {
        window.Sentry.init({
          dsn: config.sentryDsn,
          tracesSampleRate: 1.0,
        });
        console.log("Sentry initialized successfully.");
      }
    }
  } catch (err) {
    console.error("Failed to load configuration / init Sentry:", err);
  }
}
initConfig();

const initialRoute = location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
const isInitialTool = tools.some((t) => t[0] === initialRoute);

if (isInitialTool) {
  selectTool(initialRoute, { push: false, scroll: false });
} else {
  // Load default tool workspace parameters, but hide it if in subpage route
  selectTool("merge-pdf", { push: false, scroll: false });
  setRouteMode();
}

// ==========================================================================
// WELOVEPDF v2.0 HOMEPAGE INTERACTIVE MECHANICS
// ==========================================================================

// 1. Universal Search Logic
const uSearch = $("universalSearch");
const uResults = $("universalSearchResults");

if (uSearch) {
  uSearch.addEventListener("input", () => {
    const val = uSearch.value.toLowerCase().trim();
    if (!val) {
      uResults.style.display = "none";
      uResults.innerHTML = "";
      return;
    }
    const matches = tools.filter(t => 
      t[1].toLowerCase().includes(val) || 
      t[3].toLowerCase().includes(val)
    ).slice(0, 5); // Display top 5 matching tools
    
    if (matches.length === 0) {
      uResults.innerHTML = `<p style="margin:8px;font-size:13px;color:var(--muted);text-align:center">No tools found matching "${escapeHtml(uSearch.value)}"</p>`;
    } else {
      uResults.innerHTML = matches.map(t => `
        <button class="search-result-row" data-open-tool="${t[0]}" type="button">
          <span class="res-icon">${t[4]}</span>
          <div>
            <h4>${t[1]}</h4>
            <p>${t[3]}</p>
          </div>
        </button>
      `).join("");
    }
    uResults.style.display = "block";
  });
  
  // Close search results dropdown on clicking outside
  document.addEventListener("click", (e) => {
    if (!uSearch.contains(e.target) && !uResults.contains(e.target)) {
      uResults.style.display = "none";
    }
  });
}

// 2. Keyboard shortcut triggers (/ to focus search)
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== uSearch) {
    const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
    if (!isInput) {
      e.preventDefault();
      uSearch?.focus();
      uSearch?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

// 3. Popular search tags quick fill
document.querySelectorAll(".search-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const term = tag.dataset.searchTerm;
    if (uSearch) {
      uSearch.value = term;
      uSearch.dispatchEvent(new Event("input"));
      uSearch.focus();
      uSearch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

// 4. Header scroll dynamic class binding
window.addEventListener("scroll", () => {
  const header = $("mainHeader");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
});

// 5. Navbar Search shortcut trigger
const navSearch = $("navSearchTrigger");
if (navSearch && uSearch) {
  navSearch.addEventListener("click", () => {
    uSearch.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => uSearch.focus(), 300);
  });
}

// 6. Theme Toggle & Local Storage Sync
const themeToggle = $("themeToggleBtn");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}
// Set initial theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.setAttribute("data-theme", "dark");
}

// 7. FAQ Accordion expansions
document.querySelectorAll(".faq-trigger").forEach(trigger => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".faq-item");
    const panel = item.querySelector(".faq-panel");
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";
    
    // Collapse all active siblings
    document.querySelectorAll(".faq-item").forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.remove("active");
        sibling.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        sibling.querySelector(".faq-panel").style.maxHeight = null;
      }
    });
    
    // Toggle active state
    item.classList.toggle("active", !isExpanded);
    trigger.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    panel.style.maxHeight = !isExpanded ? panel.scrollHeight + "px" : null;
  });
});


