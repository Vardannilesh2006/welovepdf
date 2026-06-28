export const tools = [
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

export const toolDescriptions = {
  "merge-pdf":           "Merge multiple PDF files into one document for free. No file upload, no signup. 100% browser-based and private.",
  "split-pdf":           "Split a PDF into separate pages or ranges for free. Runs entirely in your browser — files never leave your device.",
  "compress-pdf":        "Compress PDF file size online for free without losing quality. Instant browser-based compression, no upload needed.",
  "rotate-pdf":          "Rotate PDF pages 90, 180, or 270 degrees for free. Works directly in your browser with no file upload.",
  "delete-pages":        "Delete specific pages from a PDF for free. Select pages to remove and download the result instantly.",
  "extract-pages":       "Extract specific pages from a PDF and save as a new file. Free, browser-based, no upload required.",
  "reorder-pages":       "Reorder PDF pages by drag and drop for free. Rearrange page order and download the updated PDF instantly.",
  "watermark-pdf":       "Add a text watermark to every page of a PDF for free. Customize font, opacity, and position in your browser.",
  "pdf-to-word":         "Convert PDF to Word (DOC) online for free. Extract text from PDF into an editable Word document instantly.",
  "pdf-to-jpg":          "Convert PDF pages to JPG images for free. Render PDF pages as high-quality JPEG images in your browser.",
  "pdf-to-png":          "Convert PDF to PNG image online free. Render PDF pages as transparent PNG images without any upload.",
  "jpg-to-pdf":          "Convert JPG images to PDF for free. Combine multiple JPGs into one PDF file instantly in your browser.",
  "png-to-pdf":          "Convert PNG images to PDF online for free. Turn PNG files into a PDF document without uploading to a server.",
  "ocr-pdf":             "Extract text from scanned PDF using OCR for free. Convert image-based PDFs to searchable, copyable text.",
  "protect-pdf":         "Add password protection to PDF files for free. Secure your PDF documents directly in your browser.",
  "unlock-pdf":          "Remove PDF password and restrictions for free. Unlock encrypted PDF files online without any server upload.",
  "sign-pdf":            "Add a digital signature to PDF online for free. Sign PDF documents with a typed signature in seconds.",
  "ask-pdf":             "Ask questions about your PDF using AI for free. Chat with your document and get instant answers.",
  "summarize-pdf":       "Summarize a PDF document using AI for free. Get a concise summary of long PDF files instantly.",
  "translate-pdf":       "Translate PDF to Hindi, Spanish, French, or German for free using AI. Browser-based PDF translator.",
  "quiz-from-pdf":       "Generate quiz questions from a PDF using AI for free. Create study questions automatically from any document.",
  "invoice-extractor":   "Extract invoice data from PDF automatically using AI. Free browser-based invoice PDF data extractor.",
  "pdf-to-excel":        "Convert PDF to Excel (CSV) online for free. Extract table data from PDF into spreadsheet format.",
  "pdf-to-text":         "Extract text from PDF online for free. Convert PDF content to plain text format instantly in your browser.",
  "header-footer":       "Add header and footer text to PDF pages for free. Customize position and text of PDF headers and footers.",
  "page-numbers":        "Add page numbers to PDF for free. Automatically number all pages in your PDF document.",
  "bookmark-editor":     "Edit PDF bookmarks and table of contents for free. Add, remove, or rename PDF chapters and outlines.",
  "image-to-pdf":        "Convert images to PDF online for free. Turn JPG, PNG, and other image formats into a single PDF.",
};

export const toolGuides = {
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
      <li><strong>Upload PDF:</strong> Select your file or drag it directly into the PDF workspace drop zone.</li>
      <li><strong>Define Ranges:</strong> Type the pages you want to split or extract in the settings panel (e.g., <code>1-3, 5, 8-10</code>).</li>
      <li><strong>Execute Split:</strong> Click the "Run tool" button to split the pages in real-time.</li>
      <li><strong>Save File:</strong> Click "Download" to retrieve your newly split PDF file containing only your specified pages.</li>
    </ol>

    <div class="tool-guide-faq">
      <h2>Frequently Asked Questions about Splitting PDFs</h2>
      <h3>Can I split password-protected PDFs?</h3>
      <p>Yes, but you must first load the file and enter the password in the editor panel to allow our client-side reader to compile the preview and split parameters.</p>
      <h3>Does splitting a PDF reduce the visual layout or font quality?</h3>
      <p>No. WeLovePDF copies the exact page nodes, metadata coordinates, and font streams from the original document, ensuring zero compression loss during the split.</p>
    </div>
  `
};

export const subpages = [
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

export const seoMeta = {
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

export const toolFaqs = {
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
    { q: "Does page extraction reduce PDF resolution?", a: "No. The vector data is extracted at the level of the byte, maintaining identical text and image quality." },
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

