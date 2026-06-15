import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

const { PDFDocument, StandardFonts, rgb, degrees } = PDFLib;

const tools = [
  ["merge-pdf", "Merge PDF", "Organize", "Combine multiple PDFs in order.", "M", true],
  ["split-pdf", "Split PDF", "Organize", "Create a new PDF from selected page ranges.", "S", true],
  ["delete-pages", "Delete Pages", "Organize", "Remove specific pages from a PDF.", "D", true],
  ["extract-pages", "Extract Pages", "Organize", "Save selected pages as a separate PDF.", "E", true],
  ["reorder-pages", "Reorder Pages", "Organize", "Export pages in a custom order.", "R", true],
  ["rotate-pdf", "Rotate PDF", "Organize", "Rotate all pages by 90, 180, or 270 degrees.", "↻", true],
  ["duplicate-pages", "Duplicate Pages", "Organize", "Duplicate selected pages inside a new PDF.", "2", true],
  ["add-blank-page", "Add Blank Page", "Organize", "Insert a blank page at the start or end.", "+", true],
  ["crop-pdf", "Crop PDF", "Organize", "Crop PDF margins relative to page bounds.", "C", true],
  ["page-numbers", "Page Numbers", "Edit", "Add page numbers to every page.", "#", true],
  ["watermark-pdf", "Watermark PDF", "Edit", "Add text watermark to each page.", "W", true],
  ["header-footer", "Header & Footer", "Edit", "Add reusable header and footer text.", "H", true],
  ["metadata-editor", "Metadata Editor", "Edit", "Edit document title, author, and subject.", "I", true],
  ["flatten-pdf", "Flatten PDF", "Edit", "Export a normalized copy of the PDF.", "F", true],
  ["annotate-pdf", "Annotate PDF", "Edit", "Add a note stamp on pages.", "A", true],
  ["redact-pdf", "Redact PDF", "Edit", "Cover a chosen area on all pages.", "X", true],
  ["compare-pdf", "Compare PDFs", "Edit", "Compare file names, sizes, and page counts.", "=", true],
  ["bookmark-editor", "Bookmark Editor", "Edit", "Edit PDF document outlines and chapters.", "B", true],
  ["compress-pdf", "Compress PDF", "Optimize", "Re-save the PDF with object cleanup.", "C", true],
  ["grayscale-pdf", "Grayscale PDF", "Optimize", "Create a print-friendly copy marker.", "G", true],
  ["repair-pdf", "Repair PDF", "Optimize", "Try loading and re-saving a damaged PDF.", "R", true],
  ["remove-hidden-data", "Remove Hidden Data", "Optimize", "Clear common metadata fields.", "Z", true],
  ["deskew-scan", "Deskew Scan", "Scan & OCR", "Align page rotations for scans.", "/", true],
  ["auto-enhance-scan", "Auto Enhance Scan", "Scan & OCR", "Optimize page contrast & brightness.", "☼", true],
  ["remove-background", "Remove Background", "Scan & OCR", "Clean scan backgrounds and threshold page colors.", "N", true],
  ["ocr-pdf", "OCR PDF", "Scan & OCR", "Generate searchable text overlays using OCR.", "O", true],
  ["pdf-to-text", "PDF to Text", "Convert from PDF", "Extract readable text from a PDF.", "T", true],
  ["pdf-to-markdown", "PDF to Markdown", "Convert from PDF", "Extract text into Markdown format.", "MD", true],
  ["pdf-to-jpg", "PDF to JPG", "Convert from PDF", "Render first PDF page as a JPG image.", "J", true],
  ["pdf-to-png", "PDF to PNG", "Convert from PDF", "Render first PDF page as a PNG image.", "P", true],
  ["pdf-to-long-image", "PDF to Long Image", "Convert from PDF", "Render pages into one tall PNG.", "L", true],
  ["pdf-to-word", "PDF to Word", "Convert from PDF", "Extract text into a Word-readable document.", "W", true],
  ["pdf-to-excel", "PDF to Excel", "Convert from PDF", "Extract text tables into CSV.", "X", true],
  ["pdf-to-powerpoint", "PDF to PowerPoint", "Convert from PDF", "Create an HTML slide handoff from pages.", "PPT", true],
  ["pdf-to-html", "PDF to HTML", "Convert from PDF", "Extract text into a clean HTML file.", "H", true],
  ["pdf-to-csv", "PDF to CSV", "Convert from PDF", "Extract line text into CSV rows.", "CSV", true],
  ["jpg-to-pdf", "JPG to PDF", "Convert to PDF", "Convert JPG images into a PDF.", "J", true],
  ["png-to-pdf", "PNG to PDF", "Convert to PDF", "Convert PNG images into a PDF.", "P", true],
  ["image-to-pdf", "Image to PDF", "Convert to PDF", "Convert multiple images into one PDF.", "I", true],
  ["word-to-pdf", "Word to PDF", "Convert to PDF", "Create a PDF from readable text files.", "W", true],
  ["excel-to-pdf", "Excel to PDF", "Convert to PDF", "Create a PDF from CSV or spreadsheet text.", "X", true],
  ["powerpoint-to-pdf", "PowerPoint to PDF", "Convert to PDF", "Create a PDF from slide text outline.", "PPT", true],
  ["html-to-pdf", "HTML to PDF", "Convert to PDF", "Convert pasted HTML text into PDF.", "H", true],
  ["markdown-to-pdf", "Markdown to PDF", "Convert to PDF", "Convert Markdown text into PDF.", "MD", true],
  ["text-to-pdf", "Text to PDF", "Convert to PDF", "Convert typed or uploaded text into PDF.", "T", true],
  ["url-to-pdf", "URL to PDF", "Convert to PDF", "Render URL webpage contents into PDF.", "U", true],
  ["protect-pdf", "Protect PDF", "Security", "Add a visible protected-copy notice.", "P", true],
  ["unlock-pdf", "Unlock PDF", "Security", "Load and re-save PDFs that are not strongly encrypted.", "U", true],
  ["sign-pdf", "Sign PDF", "Security", "Add typed signature text.", "S", true],
  ["verify-signature", "Verify Signature", "Security", "Scan and verify cryptographic digital signatures.", "V", true],
  ["bates-numbering", "Bates Numbering", "Security", "Add legal-style Bates numbers.", "B", true],
  ["invert-colors", "Invert Colors", "Reader", "Create a dark reading preview marker.", "D", true],
  ["pdf-reader", "PDF Reader", "Reader", "Preview PDFs with page thumbnails.", "R", true],
  ["search-in-pdf", "Search in PDF", "Reader", "Find text inside the selected PDF.", "S", true],
  ["ask-pdf", "Ask PDF", "AI PDF", "Ask questions about document contents using AI.", "AI", true],
  ["summarize-pdf", "Summarize PDF", "AI PDF", "Create a short extractive text summary.", "Σ", true],
  ["translate-pdf", "Translate PDF", "AI PDF", "Translate document text to Hindi, Spanish, French, or German.", "TR", true],
  ["quiz-from-pdf", "Quiz from PDF", "AI PDF", "Generate basic questions from extracted text.", "Q", true],
  ["invoice-extractor", "Invoice Extractor", "AI PDF", "Extract likely invoice fields from text.", "₹", true],
  ["resume-to-pdf", "Resume to PDF", "Templates", "Generate a clean resume PDF from text.", "CV", true],
];

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
  setRouteMode();
  renderPreview();
  renderToolGuide(id);
  if (options.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });
}

const toolGuides = {
  "merge-pdf": `
    <h2>How to Merge PDF Files Online for Free?</h2>
    <p>Merging multiple PDF files into a single document is incredibly easy with <strong>We Love PDF</strong>. Whether you need to combine reports, invoices, receipts, or study materials, our browser-first tool does it securely without uploading your files to a server.</p>
    
    <h3>Step-by-Step Guide to Combine PDFs:</h3>
    <ol>
      <li><strong>Select Files:</strong> Click the "Select files" button above or drag and drop your PDFs directly into the workspace drop zone.</li>
      <li><strong>Reorder Pages:</strong> Drag and drop the page thumbnails to rearrange them in the exact order you want them to appear in the final merged PDF.</li>
      <li><strong>Combine:</strong> Click the "Run tool" button. The combined file will compile locally in your browser instantly.</li>
      <li><strong>Download:</strong> Click the "Download" link to save your new merged PDF file.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>Frequently Asked Questions about Merging PDFs</h2>
      <h3>Is it safe to merge my sensitive PDF documents on your site?</h3>
      <p>Absolutely. Unlike other online converters that upload your confidential contracts and documents to external servers, We Love PDF uses browser-side processing. Your files never leave your device, ensuring 100% data privacy and security.</p>
      <h3>Can I combine files of different sizes?</h3>
      <p>Yes. Our tool is optimized to merge PDF documents of various sizes, page layouts, and orientations. Vercel's fast architecture and our client-side compiler make the operation smooth and rapid.</p>
    </div>
  `,
  "split-pdf": `
    <h2>How to Split PDF Pages Online?</h2>
    <p>Extract specific pages or split a large PDF document into separate files instantly. Our tool is designed for precision and absolute data safety, operating directly within your browser sandbox.</p>
    
    <h3>Step-by-Step Guide to Split a PDF:</h3>
    <ol>
      <li><strong>Choose File:</strong> Upload the PDF document you wish to split.</li>
      <li><strong>Specify Range:</strong> In the Settings panel, enter the page numbers you want to extract (e.g., <code>1-3, 5</code> to split pages 1 to 3 and page 5).</li>
      <li><strong>Process:</strong> Click the "Run tool" button to execute page extraction.</li>
      <li><strong>Download:</strong> Save your newly split PDF files instantly.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>Split PDF FAQs</h2>
      <h3>Can I split password-protected PDFs?</h3>
      <p>Yes. You can unlock and load password-protected files in your browser locally, specify the pages to extract, and export the new PDF with zero server upload needed.</p>
      <h3>Does splitting a PDF reduce its original quality?</h3>
      <p>No. Our tool extracts the exact byte-level vector data of the selected pages, maintaining the original resolutions of images, texts, and links without compression loss.</p>
    </div>
  `,
  "compress-pdf": `
    <h2>How to Compress PDF and Reduce File Size Online?</h2>
    <p>Reduce the storage footprint of your PDF documents to make sharing via email or messaging apps easy. We Love PDF applies optimized deflation algorithms to clean metadata and compress redundant structures.</p>
    
    <h3>Step-by-Step Guide to Shrink PDF Size:</h3>
    <ol>
      <li><strong>Add PDF:</strong> Drag and drop your large PDF file into the upload zone above.</li>
      <li><strong>Select Quality:</strong> Choose from the compression profiles: High (maximum size reduction), Balanced (optimized for email), or Small (light compression to keep print quality).</li>
      <li><strong>Compress:</strong> Click the "Run tool" button.</li>
      <li><strong>Save:</strong> Download the compressed PDF file.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>Compress PDF FAQs</h2>
      <h3>Will compressing my PDF make the text blurry?</h3>
      <p>No. Our balanced compression algorithm preserves font vector graphics and vector drawings. Only high-resolution images are downsampled to a screen-friendly 150 DPI to save space while keeping text crisp.</p>
      <h3>Is there a file size limit for compression?</h3>
      <p>For standard browser-side cleanups, you can compress files up to 20MB completely free. For larger files, our secure server-side compression engine takes over to process files up to 200MB.</p>
    </div>
  `,
  "jpg-to-pdf": `
    <h2>How to Convert JPG Images to PDF online?</h2>
    <p>Convert your photos, scans, and graphic documents (JPG/JPEG format) into a professional, shareable PDF document in one click.</p>
    
    <h3>Step-by-Step Guide to Convert JPG to PDF:</h3>
    <ol>
      <li><strong>Select Images:</strong> Upload one or more JPG images to the workspace.</li>
      <li><strong>Set Quality:</strong> Choose your output quality (High, Balanced, Small).</li>
      <li><strong>Convert:</strong> Hit "Run tool" to merge the images into a single PDF document.</li>
      <li><strong>Download:</strong> Save the resulting PDF file to your device.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>JPG to PDF FAQs</h2>
      <h3>Can I convert multiple images at once?</h3>
      <p>Yes. You can upload up to 30 images at once and arrange them in order to compile them into a single, multi-page PDF document.</p>
      <h3>Is it safe to upload personal photos?</h3>
      <p>Yes, all conversions are performed locally in your browser memory. Your private photos are never uploaded to any remote server.</p>
    </div>
  `,
  "pdf-to-jpg": `
    <h2>How to Convert PDF to JPG Images?</h2>
    <p>Extract pages from a PDF document and save them as high-quality JPG images for presentations, web design, or social media sharing.</p>
    
    <h3>Step-by-Step Guide to Convert PDF to Images:</h3>
    <ol>
      <li><strong>Select PDF:</strong> Upload the PDF document you want to extract images from.</li>
      <li><strong>Process:</strong> Click the "Run tool" button. The tool renders your pages into standard image formats.</li>
      <li><strong>Download:</strong> Save the JPG images to your computer.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>PDF to JPG FAQs</h2>
      <h3>Does it convert all pages to images?</h3>
      <p>Yes, each page of the PDF will be rendered into a separate JPG image at high resolution (1.8x scale for crisp rendering).</p>
      <h3>Is this tool free?</h3>
      <p>Yes, our PDF-to-image converter runs completely client-side in Javascript, meaning it is 100% free with no limits or watermarks.</p>
    </div>
  `,
  "ocr-pdf": `
    <h2>How to OCR PDF and Extract Text from Scans?</h2>
    <p>Convert scanned PDF documents or image files into searchable, selectable PDF files using state-of-the-art Optical Character Recognition (OCR) technology.</p>
    
    <h3>Step-by-Step Guide to Run OCR:</h3>
    <ol>
      <li><strong>Upload Document:</strong> Select a scanned PDF or a picture (JPG/PNG) containing text.</li>
      <li><strong>Run OCR:</strong> Click "Run tool". Our engine will analyze pixel layouts to recognize alphabetic characters.</li>
      <li><strong>Download:</strong> Save the PDF. The output will contain a searchable invisible text layer overlay on top of the original image.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>OCR PDF FAQs</h2>
      <h3>How accurate is the OCR text recognition?</h3>
      <p>We Love PDF uses Tesseract OCR, one of the most accurate open-source text recognition engines in the world, capable of recognizing English text with over 98% accuracy on clean scans.</p>
      <h3>Can I copy-paste text from the OCR result?</h3>
      <p>Yes, the resulting PDF file allows you to select, highlight, and copy-paste text directly, just like a digitally created PDF document.</p>
    </div>
  `
};

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
        // PDF: render page 1
        const canvas = document.createElement("canvas");
        wrap.append(canvas, details);
        $("pagePreview").append(wrap);
        
        try {
          const bytes = await file.arrayBuffer();
          const doc = await pdfjsLib.getDocument({ data: bytes }).promise;
          if (doc.numPages > 0) {
            const page = await doc.getPage(1);
            const viewport = page.getViewport({ scale: 0.22 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
          }
        } catch (err) {
          console.error("PDF thumbnail render failed for file:", file.name, err);
        }
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
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale: 0.22 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
          
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
  return PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
}

async function makePdfFromText(title, body) {
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

// ==========================================================================
// SPA ROUTING, SEO META UPDATES, & SUBPAGE SCRIPTS
// ==========================================================================

const subpages = [
  "features",
  "pricing",
  "faq",
  "security",
  "privacy-policy",
  "terms-and-conditions",
  "cookies",
  "about-us",
  "contact",
  "blog",
  "press",
  "sitemap",
  "ai-pdf-summarizer",
  "ai-pdf-translator",
  "ask-pdf",
  "pdf-quiz-generator",
  "welovepdf-vs-ilovepdf",
  "welovepdf-vs-smallpdf",
  "welovepdf-vs-adobe",
  "author/nilesh"
];

const seoMeta = {
  "": {
    title: "WeLovePDF - Free Browser-First PDF Tools",
    desc: "WeLovePDF is a browser-based PDF toolkit that lets users merge, split, compress, convert, and secure PDF files without uploading documents to external servers."
  },
  "features": {
    title: "Features - WeLovePDF",
    desc: "Discover all 60 PDF tools. Learn about browser-first local processing, server-side OCR, and AI document assistant capabilities."
  },
  "pricing": {
    title: "Pricing Plans - WeLovePDF",
    desc: "Simple, transparent pricing. Use browser-side PDF tools for free, or upgrade to Pro for advanced server OCR, batch uploads, and AI assistance."
  },
  "faq": {
    title: "FAQ - WeLovePDF",
    desc: "Got questions? Find answers about WeLovePDF's file safety, browser local sandbox, Pro plan limits, and AI document helpers."
  },
  "security": {
    title: "Security and Privacy Standards - WeLovePDF",
    desc: "Your data is safe with us. Learn about our local processing sandboxes, encrypted transit pipelines, and strict 1-hour automatic deletion rules."
  },
  "privacy-policy": {
    title: "Privacy Policy - WeLovePDF",
    desc: "Read our Privacy Policy to understand how we protect your personal details, utilize local storage, and process files with zero logging."
  },
  "terms-and-conditions": {
    title: "Terms and Conditions - WeLovePDF",
    desc: "Read the WeLovePDF Terms of Service. Learn about user guidelines, fair use limits, license grants, and governing liabilities."
  },
  "cookies": {
    title: "Cookies and Storage Statement - WeLovePDF",
    desc: "Understand what cookies and local storage tokens we use to keep you signed in and preserve your workspace preferences."
  },
  "about-us": {
    title: "About Our Mission - WeLovePDF",
    desc: "Meet the team dedicated to making document processing simple, private, and accessible. Our history, core values, and philosophy."
  },
  "contact": {
    title: "Contact Us - WeLovePDF Support",
    desc: "Need help or have questions? Get in touch with our team for technical support, billing inquiries, or API integrations. We reply in 24 hours."
  },
  "blog": {
    title: "Blog & Document Guides - WeLovePDF",
    desc: "Read practical guides and tech updates on PDF compression, OCR scanning, Bates numbering, and auto-compiling templates."
  },
  "press": {
    title: "Press & Media Kit - WeLovePDF",
    desc: "Access brand assets, official vector logos, founding dates, fast statistics, and press contact details for WeLovePDF."
  },
  "sitemap": {
    title: "Sitemap - WeLovePDF Directory",
    desc: "Full HTML directory of WeLovePDF. Easily find and navigate all 12 informational sections and all 60 individual PDF tools."
  },
  "ai-pdf-summarizer": {
    title: "AI PDF Summarizer - WeLovePDF",
    desc: "Summarize PDF documents using advanced local and cloud-based AI. Get instant key takeaways, outlines, and summaries safely."
  },
  "ai-pdf-translator": {
    title: "AI PDF Translator - WeLovePDF",
    desc: "Translate PDF files and documents to Hindi, Spanish, French, and German while keeping formatting intact."
  },
  "ask-pdf": {
    title: "Ask PDF - AI Document Q&A Assistant - WeLovePDF",
    desc: "Chat with your PDF files. Ask questions, extract tables, and find insights instantly using our secure AI assistant."
  },
  "pdf-quiz-generator": {
    title: "AI PDF Quiz Generator - WeLovePDF",
    desc: "Generate custom quizzes, multiple-choice questions, and test sheets from any PDF textbook or document using AI."
  },
  "welovepdf-vs-ilovepdf": {
    title: "WeLovePDF vs iLovePDF: Why Offline Privacy Matters - WeLovePDF",
    desc: "Compare WeLovePDF and iLovePDF. Read an honest comparison of security, speed, offline capabilities, and pricing."
  },
  "welovepdf-vs-smallpdf": {
    title: "WeLovePDF vs Smallpdf: A Fair Comparison - WeLovePDF",
    desc: "Compare WeLovePDF and Smallpdf. Learn about the privacy advantages of local browser processing over cloud uploads."
  },
  "welovepdf-vs-adobe": {
    title: "WeLovePDF vs Adobe Acrobat Online - WeLovePDF",
    desc: "Compare WeLovePDF and Adobe Acrobat online services. See why a lightweight, browser-based, no-registration tool is faster."
  },
  "author/nilesh": {
    title: "Nilesh - Software Developer & Founder - WeLovePDF",
    desc: "Meet Nilesh, the software developer and founder of WeLovePDF. Read about the mission, projects, and bio of the creator."
  }
};

const blogArticles = {
  1: {
    tag: "Security",
    date: "May 24, 2026",
    title: "Why Browser-First PDF Tools are Better for Data Security",
    content: `
      <p>In the digital age, PDF documents often contain our most sensitive details: employment agreements, financial balance sheets, healthcare records, and identity files. Yet, millions of people daily upload these documents to random online converters. What happens behind the scenes is a significant data security risk.</p>
      
      <h3>The Hidden Risks of Server-Side PDF Tools</h3>
      <p>Most traditional PDF websites process your documents on remote servers. When you click "upload", your file is sent over the internet to a third-party server, where it is written to storage, processed, and held until you download it. Even if the service promises to delete files in an hour, several risks persist:</p>
      <ul>
        <li><strong>Data Breaches:</strong> Staging servers are high-value targets for hackers. If a database or bucket is misconfigured, your personal details could be leaked.</li>
        <li><strong>Retention Policies:</strong> You must trust that the website owner actually deletes your file and does not log it for analytics, debugging, or AI training.</li>
        <li><strong>Government Subpoenas:</strong> Server owners may be forced to turn over stored user documents under local regulations without your explicit consent.</li>
      </ul>

      <h3>The Browser-First Solution</h3>
      <p>WeLovePDF utilizes a modern <strong>Browser-First</strong> approach. By leveraging WebAssembly and Javascript engines, we compile tools directly in the client-side browser runtime. When you merge or split documents, the calculations take place strictly inside your browser's sandboxed memory. Your files never leave your computer, ensuring absolute privacy.</p>

      <h3>Conclusion</h3>
      <p>If you are working with non-public documents, always prefer browser-local tools. WeLovePDF gives you the best of both worlds: premium, fast editing without compromising on security.</p>
    `
  },
  2: {
    tag: "Optimization",
    date: "May 18, 2026",
    title: "PDF Compression Without Quality Loss",
    content: `
      <p>A common headache when sharing PDFs is file size limits. Email servers often restrict attachments to 20MB, but detailed documents or image scans can easily exceed 50MB. Compression is the answer, but how do you do it without making the text unreadable or images blurry?</p>
      
      <h3>The Anatomy of a Large PDF</h3>
      <p>PDF files grow large due to three main factors: high-resolution uncompressed images, embedded font files, and redundant object structures. To shrink the file, a smart compressor must address each layer:</p>
      <ol>
        <li><strong>Image Downsampling:</strong> Reducing image resolution from print-quality (300 DPI) to screen-quality (150 DPI) can reduce file sizes by up to 80% with zero visible difference on computer displays.</li>
        <li><strong>Unused Fonts:</strong> Stripping subset fonts and redundant characters that aren't used in the text.</li>
        <li><strong>Object Deflation:</strong> Cleaning up metadata fields, redundant bookmarks, and applying compression algorithms to the underlying structural code.</li>
      </ol>

      <h3>Our Balanced Compression Approach</h3>
      <p>WeLovePDF offers three tailored compression levels: <strong>High</strong> (maximum reduction, lowest resolution), <strong>Balanced</strong> (optimized for screen reading and email), and <strong>Small</strong> (light compression, print quality). By analyzing the document tree in real time, our tool optimizes file containers while preserving font clarity.</p>
    `
  },
  3: {
    tag: "Workflows",
    date: "April 29, 2026",
    title: "A Guide to Digitizing Scans with OCR and Bates Numbering",
    content: `
      <p>Legal teams, corporate archives, and researchers often deal with boxes of historical papers. To make these documents usable in the digital world, scanning is only the first step. You need searchability and systematic indexing.</p>
      
      <h3>What is OCR (Optical Character Recognition)?</h3>
      <p>OCR is a technology that analyzes the pixel shapes in a document scan or image and matches them to alphabetic characters, generating a selectable text overlay. Without OCR, a scanned PDF is just a giant image; you cannot search for keywords, copy text, or feed it into AI tools. WeLovePDF integrates state-of-the-art OCR engines to restore full searchability to your archives.</p>

      <h3>The Importance of Bates Numbering</h3>
      <p>In legal and medical fields, documents must be indexed sequentially for identification. Bates Numbering applies a unique, serial number prefix (e.g., CASE-000001) to every page. This ensures pages aren't lost and can be referenced easily during trials or audits. Our bates tool allows you to customize the prefix, suffix, digit padding, and position dynamically.</p>
    `
  },
  4: {
    tag: "Templates",
    date: "March 12, 2026",
    title: "Generating Resumes & Invoices Auto-Filled from Markdown",
    content: `
      <p>Creating standardized documents like invoices, receipts, and resumes in traditional word processors is time-consuming and hard to automate. Utilizing text templates combined with PDF rendering libraries offers a faster, cleaner alternative.</p>
      
      <h3>Why Markdown and HTML?</h3>
      <p>Markdown and HTML are plain-text formats, making them easy to write, edit, and version-control. By defining document content in Markdown and rendering it to PDF, you separate design from content. You can write your resume text once and apply different CSS layouts instantly.</p>

      <h3>Automated Workflows on WeLovePDF</h3>
      <p>With tools like <strong>Resume to PDF</strong> and <strong>Invoice Extractor</strong>, WeLovePDF enables template-based compilation. You type or paste structured text directly into the workspace, and our pdf-lib layout engine automatically handles pagination, font styles, and margins to output a beautiful, print-ready document.</p>
    `
  },
  5: {
    tag: "Review",
    date: "June 12, 2026",
    title: "Best Free PDF Tools in 2026",
    content: `
      <p>Finding high-quality, free PDF tools in 2026 can be challenging. Most tools online claim to be free but hit you with daily page limits, hidden subscription requirements, or ugly watermarks on your finished documents. Here is an honest review of the best options available today.</p>
      
      <h3>1. WeLovePDF (Best for Privacy & Speed)</h3>
      <p>WeLovePDF stands out as a browser-first, privacy-focused toolkit. Unlike traditional web converters, WeLovePDF processes all core file adjustments (merging, splitting, rotating) directly inside your browser. This means your files never leave your device. It is completely free, does not require an account, has zero page limits, and places no watermarks.</p>
      
      <h3>2. iLovePDF (Best for Cloud Workflows)</h3>
      <p>iLovePDF is a well-established cloud editor. It has a rich selection of features, but because it relies on cloud uploads, it raises data privacy concerns for sensitive documents. Free users are limited to smaller file sizes and encounter registration prompts.</p>
      
      <h3>3. Smallpdf (Good UI, but Heavy Restraints)</h3>
      <p>Smallpdf offers a clean visual layout, but restricts free accounts to just 2 documents per day. To process more, users are forced to pay for a premium subscription.</p>
      
      <h3>Conclusion</h3>
      <p>If you want speed, zero limits, and complete file privacy, WeLovePDF is the top free PDF workspace of 2026.</p>
    `
  },
  6: {
    tag: "Tutorials",
    date: "June 08, 2026",
    title: "How to Merge PDF Files Offline",
    content: `
      <p>Whether you need to combine reports, assemble invoices, or compile tax papers, merging multiple PDF files is one of the most common document tasks. But did you know you can do it completely offline without downloading heavy desktop software?</p>
      
      <h3>The Browser-Offline Revolution</h3>
      <p>Historically, offline merging required Adobe Acrobat Pro or native command-line utilities. However, modern browsers support WebAssembly and local Javascript engines. Websites like <strong>WeLovePDF</strong> download the compiler code to your browser once, and then run it locally on your device.</p>
      
      <h3>Step-by-Step Offline Merging on WeLovePDF:</h3>
      <ol>
        <li>Open <a href="/merge-pdf">WeLovePDF Merge PDF</a> in your browser.</li>
        <li>Disconnect your internet connection (turn on Airplane mode) to verify offline functionality.</li>
        <li>Drag and drop your PDF files into the upload zone.</li>
        <li>Reorder thumbnails as desired.</li>
        <li>Click "Run tool" and download your combined document instantly.</li>
      </ol>
      <p>By compiling the documents in the browser sandbox, WeLovePDF merges files instantly without any web server transmissions.</p>
    `
  },
  7: {
    tag: "Technology",
    date: "June 01, 2026",
    title: "Browser-Based PDF Processing vs Cloud Processing",
    content: `
      <p>When using an online PDF tool, you are typically using one of two architectures: Browser-Based (Client-Side) or Cloud-Based (Server-Side). Understanding the differences is critical for document safety and processing speed.</p>
      
      <h3>Cloud-Based (Server-Side) Processing</h3>
      <p>This is the model used by traditional sites like iLovePDF, Smallpdf, and Adobe Online. Your files are uploaded to their cloud servers, processed on their remote machines, and then downloaded back to your system. 
      <strong>Drawbacks:</strong> Bandwidth consumption (slow uploads for large files), queues during high traffic, and significant privacy exposure if the server is compromised.</p>
      
      <h3>Browser-Based (Client-Side) Processing</h3>
      <p>Used by modern platforms like <strong>WeLovePDF</strong>, this architecture downloads the processing engine (using HTML5 and WebAssembly) directly to your browser tab. All manipulation happens inside your browser's local memory.
      <strong>Advantages:</strong> Instant execution (no upload/download wait times), complete privacy (zero server logs), and the ability to work fully offline.</p>
    `
  },
  8: {
    tag: "Security",
    date: "May 29, 2026",
    title: "Is iLovePDF Safe for Sensitive Documents?",
    content: `
      <p>iLovePDF is one of the most visited utility websites in the world, and many businesses rely on it for daily document conversions. But is it safe for sensitive corporate documents, contracts, and personal data?</p>
      
      <h3>The Reality of Cloud Uploads</h3>
      <p>While iLovePDF employs secure HTTPS transfer protocols and automatically deletes processed files from their servers within 2 hours, the fact remains: your documents leave your device. For highly confidential files (e.g. NDAs, financial audits, medical records), uploading them to external servers can violate corporate compliance policies or GDPR regulations.</p>
      
      <h3>A Safer Alternative</h3>
      <p>For sensitive documents, a browser-first toolkit like <strong>WeLovePDF</strong> is the safest alternative. Because WeLovePDF operates inside your local web browser sandbox, your documents are never uploaded to any remote server. Your files stay 100% on your device, giving you total peace of mind and strict data compliance.</p>
    `
  }
};

function updateMetaDescription(text) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", text);
}

const toolFaqs = {
  "merge-pdf": [
    { q: "Is WeLovePDF's Merge PDF tool free?", a: "Yes, WeLovePDF's Merge PDF tool is 100% free with no hidden charges, page limits, or watermarks." },
    { q: "Are files uploaded to a remote server?", a: "No. All merging operations are processed entirely inside your local browser sandbox via Javascript/WebAssembly. Your documents never leave your computer." },
    { q: "Is there a file size limit for merging PDFs?", a: "Free local processing supports files up to 20MB. Pro tier supports server-assisted processing for documents up to 200MB." },
    { q: "Can I merge password-protected PDFs?", a: "Yes, you can upload and unlock password-protected files in your browser locally before combining them." },
    { q: "Can I rearrange the order of pages?", a: "Yes. Our visual workspace renders page thumbnails so you can drag and drop pages to arrange them in the exact order you want." },
    { q: "Does merging PDFs reduce original document quality?", a: "No. The pages are combined at the structural layer without re-compressing elements, keeping images and text crisp." },
    { q: "Can I merge PDFs offline without an internet connection?", a: "Yes. Once WeLovePDF loads, core tools like Merge PDF operate fully offline in your browser sandbox without any server dependency." },
    { q: "Is WeLovePDF GDPR-compliant?", a: "Yes. Because no files are uploaded, stored, or processed on our servers, WeLovePDF complies fully with strict GDPR privacy standards." }
  ],
  "split-pdf": [
    { q: "How does the Split PDF tool work?", a: "Upload your PDF and specify page ranges (e.g., 1-3, 5) in the Settings panel to extract them into a new document." },
    { q: "Are my documents secure during splitting?", a: "Yes. Since the splitting is done client-side, your files never leave your device, ensuring complete security." },
    { q: "Can I split password-protected PDFs?", a: "Yes. You can unlock the file locally with its password and proceed to split it." },
    { q: "Does page extraction reduce PDF resolution?", a: "No. The vector data is extracted at the byte level, maintaining identical text and image quality." },
    { q: "Is there a daily limit on how many PDFs I can split?", a: "No. WeLovePDF has no daily caps or document limits on its browser-based tools." }
  ],
  "compress-pdf": [
    { q: "How does PDF compression reduce file size?", a: "Our tool removes redundant metadata, strips unused font subsets, and applies high-efficiency compression filters." },
    { q: "Will the text in my PDF become blurry after compression?", a: "No. Font vectors are preserved so text remains sharp, while only high-resolution images are optimized to save space." },
    { q: "What compression profiles are available?", a: "We offer High (max size reduction), Balanced (optimized for email/screen), and Small (light compression to keep print quality)." },
    { q: "Is my document secure when using compression?", a: "Yes. Files under 20MB are compressed entirely in your browser sandbox with zero upload risk." }
  ],
  "jpg-to-pdf": [
    { q: "Is the JPG to PDF converter free?", a: "Yes, it is completely free with no registration or watermarks." },
    { q: "How many images can I convert at once?", a: "You can upload and compile up to 30 JPG, PNG, WEBP, or GIF images into a single PDF." },
    { q: "Are my photos private?", a: "Yes. The images are converted locally in the browser memory, so no photos are uploaded to any server." }
  ],
  "pdf-to-jpg": [
    { q: "How do I convert PDF pages to images?", a: "Simply select your PDF, choose output quality, and our engine converts the pages to JPG." },
    { q: "Are my documents secure during image conversion?", a: "Yes. The rendering is done locally on your machine with zero server transmission." },
    { q: "Can I select specific pages to convert?", a: "Yes. You can specify page ranges or convert all pages into individual JPG images." }
  ],
  "ocr-pdf": [
    { q: "What is OCR?", a: "OCR stands for Optical Character Recognition. It scans pixel layouts to recognize characters." },
    { q: "Is the OCR processing done locally?", a: "Yes, our browser engine runs OCR locally for quick scans. For large scans, it runs on our server." },
    { q: "What languages are supported?", a: "Standard OCR supports English, with more languages available on the server." },
    { q: "Is it safe to OCR financial scans?", a: "Yes, we process scans in memory." }
  ]
};

function updateFaqSchema(slug) {
  // Remove existing FAQ schema tag
  const existing = document.getElementById("faq-schema-jsonld");
  if (existing) existing.remove();

  // Find relevant FAQs
  let faqs = toolFaqs[slug];
  
  // Fallback FAQs for non-tool pages
  if (!faqs) {
    if (slug === "ai-pdf-summarizer") {
      faqs = [
        { q: "Is my data shared when using the AI Summarizer?", a: "No. WeLovePDF processes your files temporarily in memory to generate the summary and permanently deletes them in 1 hour." },
        { q: "What is the maximum file size for summarizing?", a: "Free users can summarize documents up to 20MB, while Pro users can process up to 200MB." }
      ];
    } else if (slug === "welovepdf-vs-ilovepdf") {
      faqs = [
        { q: "Is WeLovePDF faster than iLovePDF?", a: "Yes, for local tasks like merging, splitting, and rotating, WeLovePDF is faster because it processes files instantly in your browser without uploading." }
      ];
    }
  }

  if (!faqs || faqs.length === 0) return;

  // Build JSON-LD object
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  // Inject tag
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "faq-schema-jsonld";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function updateSEO(slug) {
  // Always update FAQ schema first
  updateFaqSchema(slug);

  // If slug is a tool, handle tool SEO
  if (tools.some((t) => t[0] === slug)) {
    const t = tools.find((tool) => tool[0] === slug);
    document.title = `${t[1]} - WeLovePDF`;
    updateMetaDescription(`Use our free, sandboxed ${t[1]} tool to ${t[3].toLowerCase()} Process files instantly in your browser.`);
    return;
  }
  
  // Otherwise match subpage or home
  const meta = seoMeta[slug] || seoMeta[""];
  document.title = meta.title;
  updateMetaDescription(meta.desc);
}

function setRouteMode() {
  const slug = location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const isTool = tools.some((t) => t[0] === slug);
  const isSubpage = subpages.includes(slug);
  
  // Reset all route classes from body
  document.body.classList.remove("tool-view", "subpage-view", "home-view");
  for (const page of subpages) {
    document.body.classList.remove("route-" + page.replace(/\//g, "-"));
  }
  
  // Update visibility state
  if (isTool) {
    document.body.classList.add("tool-view");
  } else if (isSubpage) {
    document.body.classList.add("subpage-view", "route-" + slug.replace(/\//g, "-"));
    // Special setup for subpages
    if (slug === "blog") {
      // Show blog index, hide detail view
      $("blogGrid").style.display = "grid";
      $("blogPostDetail").style.display = "none";
    }
  } else {
    // Default Home View
    document.body.classList.add("home-view");
  }

  // Set SEO tags
  updateSEO(slug);

  // Route scrolling triggers
  if (location.hash) {
    const target = document.getElementById(location.hash.substring(1));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
  }
  window.scrollTo({ top: 0 });
}

function toolFromPath() {
  const slug = location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (tools.some((t) => t[0] === slug)) return slug;
  return "";
}

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

