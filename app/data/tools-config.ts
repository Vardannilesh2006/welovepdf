export interface Tool {
  slug: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  isBrowserWorking: boolean;
}

export const tools: Tool[] = [
  { slug: "merge-pdf", name: "Merge PDF", category: "Organize", desc: "Combine multiple PDFs in order.", icon: "M", isBrowserWorking: true },
  { slug: "split-pdf", name: "Split PDF", category: "Organize", desc: "Create a new PDF from selected page ranges.", icon: "S", isBrowserWorking: true },
  { slug: "delete-pages", name: "Delete Pages", category: "Organize", desc: "Remove specific pages from a PDF.", icon: "D", isBrowserWorking: true },
  { slug: "extract-pages", name: "Extract Pages", category: "Organize", desc: "Save selected pages as a separate PDF.", icon: "E", isBrowserWorking: true },
  { slug: "reorder-pages", name: "Reorder Pages", category: "Organize", desc: "Export pages in a custom order.", icon: "R", isBrowserWorking: true },
  { slug: "rotate-pdf", name: "Rotate PDF", category: "Organize", desc: "Rotate all pages by 90, 180, or 270 degrees.", icon: "↻", isBrowserWorking: true },
  { slug: "duplicate-pages", name: "Duplicate Pages", category: "Organize", desc: "Duplicate selected pages inside a new PDF.", icon: "2", isBrowserWorking: true },
  { slug: "add-blank-page", name: "Add Blank Page", category: "Organize", desc: "Insert a blank page at the start or end.", icon: "+", isBrowserWorking: true },
  { slug: "crop-pdf", name: "Crop PDF", category: "Organize", desc: "Crop PDF margins relative to page bounds.", icon: "C", isBrowserWorking: true },
  { slug: "page-numbers", name: "Page Numbers", category: "Edit", desc: "Add page numbers to every page.", icon: "#", isBrowserWorking: true },
  { slug: "watermark-pdf", name: "Watermark PDF", category: "Edit", desc: "Add text watermark to each page.", icon: "W", isBrowserWorking: true },
  { slug: "header-footer", name: "Header & Footer", category: "Edit", desc: "Add reusable header and footer text.", icon: "H", isBrowserWorking: true },
  { slug: "metadata-editor", name: "Metadata Editor", category: "Edit", desc: "Edit document title, author, and subject.", icon: "I", isBrowserWorking: true },
  { slug: "flatten-pdf", name: "Flatten PDF", category: "Edit", desc: "Export a normalized copy of the PDF.", icon: "F", isBrowserWorking: true },
  { slug: "annotate-pdf", name: "Annotate PDF", category: "Edit", desc: "Add a note stamp on pages.", icon: "A", isBrowserWorking: true },
  { slug: "redact-pdf", name: "Redact PDF", category: "Edit", desc: "Cover a chosen area on all pages.", icon: "X", isBrowserWorking: true },
  { slug: "compare-pdf", name: "Compare PDFs", category: "Edit", desc: "Compare file names, sizes, and page counts.", icon: "=", isBrowserWorking: true },
  { slug: "bookmark-editor", name: "Bookmark Editor", category: "Edit", desc: "Edit PDF document outlines and chapters.", icon: "B", isBrowserWorking: true },
  { slug: "compress-pdf", name: "Compress PDF", category: "Optimize", desc: "Re-save the PDF with object cleanup.", icon: "C", isBrowserWorking: true },
  { slug: "grayscale-pdf", name: "Grayscale PDF", category: "Optimize", desc: "Create a print-friendly copy marker.", icon: "G", isBrowserWorking: true },
  { slug: "repair-pdf", name: "Repair PDF", category: "Optimize", desc: "Try loading and re-saving a damaged PDF.", icon: "R", isBrowserWorking: true },
  { slug: "remove-hidden-data", name: "Remove Hidden Data", category: "Optimize", desc: "Clear common metadata fields.", icon: "Z", isBrowserWorking: true },
  { slug: "deskew-scan", name: "Deskew Scan", category: "Scan & OCR", desc: "Align page rotations for scans.", icon: "/", isBrowserWorking: true },
  { slug: "auto-enhance-scan", name: "Auto Enhance Scan", category: "Scan & OCR", desc: "Optimize page contrast & brightness.", icon: "☼", isBrowserWorking: true },
  { slug: "remove-background", name: "Remove Background", category: "Scan & OCR", desc: "Clean scan backgrounds and threshold page colors.", icon: "N", isBrowserWorking: true },
  { slug: "ocr-pdf", name: "OCR PDF", category: "Scan & OCR", desc: "Generate searchable text overlays using OCR.", icon: "O", isBrowserWorking: true },
  { slug: "pdf-to-text", name: "PDF to Text", category: "Convert from PDF", desc: "Extract readable text from a PDF.", icon: "T", isBrowserWorking: true },
  { slug: "pdf-to-markdown", name: "PDF to Markdown", category: "Convert from PDF", desc: "Extract text into Markdown format.", icon: "MD", isBrowserWorking: true },
  { slug: "pdf-to-jpg", name: "PDF to JPG", category: "Convert from PDF", desc: "Render first PDF page as a JPG image.", icon: "J", isBrowserWorking: true },
  { slug: "pdf-to-png", name: "PDF to PNG", category: "Convert from PDF", desc: "Render first PDF page as a PNG image.", icon: "P", isBrowserWorking: true },
  { slug: "pdf-to-long-image", name: "PDF to Long Image", category: "Convert from PDF", desc: "Render pages into one tall PNG.", icon: "L", isBrowserWorking: true },
  { slug: "pdf-to-word", name: "PDF to Word", category: "Convert from PDF", desc: "Extract text into a Word-readable document.", icon: "W", isBrowserWorking: true },
  { slug: "pdf-to-excel", name: "PDF to Excel", category: "Convert from PDF", desc: "Extract text tables into CSV.", icon: "X", isBrowserWorking: true },
  { slug: "pdf-to-powerpoint", name: "PDF to PowerPoint", category: "Convert from PDF", desc: "Create an HTML slide handoff from pages.", icon: "PPT", isBrowserWorking: true },
  { slug: "pdf-to-html", name: "PDF to HTML", category: "Convert from PDF", desc: "Extract text into a clean HTML file.", icon: "H", isBrowserWorking: true },
  { slug: "pdf-to-csv", name: "PDF to CSV", category: "Convert from PDF", desc: "Extract line text into CSV rows.", icon: "CSV", isBrowserWorking: true },
  { slug: "jpg-to-pdf", name: "JPG to PDF", category: "Convert to PDF", desc: "Convert JPG images into a PDF.", icon: "J", isBrowserWorking: true },
  { slug: "png-to-pdf", name: "PNG to PDF", category: "Convert to PDF", desc: "Convert PNG images into a PDF.", icon: "P", isBrowserWorking: true },
  { slug: "image-to-pdf", name: "Image to PDF", category: "Convert to PDF", desc: "Convert multiple images into one PDF.", icon: "I", isBrowserWorking: true },
  { slug: "word-to-pdf", name: "Word to PDF", category: "Convert to PDF", desc: "Create a PDF from readable text files.", icon: "W", isBrowserWorking: true },
  { slug: "excel-to-pdf", name: "Excel to PDF", category: "Convert to PDF", desc: "Create a PDF from CSV or spreadsheet text.", icon: "X", isBrowserWorking: true },
  { slug: "powerpoint-to-pdf", name: "PowerPoint to PDF", category: "Convert to PDF", desc: "Create a PDF from slide text outline.", icon: "PPT", isBrowserWorking: true },
  { slug: "html-to-pdf", name: "HTML to PDF", category: "Convert to PDF", desc: "Convert pasted HTML text into PDF.", icon: "H", isBrowserWorking: true },
  { slug: "markdown-to-pdf", name: "Markdown to PDF", category: "Convert to PDF", desc: "Convert Markdown text into PDF.", icon: "MD", isBrowserWorking: true },
  { slug: "text-to-pdf", name: "Text to PDF", category: "Convert to PDF", desc: "Convert typed or uploaded text into PDF.", icon: "T", isBrowserWorking: true },
  { slug: "url-to-pdf", name: "URL to PDF", category: "Convert to PDF", desc: "Render URL webpage contents into PDF.", icon: "U", isBrowserWorking: true },
  { slug: "protect-pdf", name: "Protect PDF", category: "Security", desc: "Add a visible protected-copy notice.", icon: "P", isBrowserWorking: true },
  { slug: "unlock-pdf", name: "Unlock PDF", category: "Security", desc: "Load and re-save PDFs that are not strongly encrypted.", icon: "U", isBrowserWorking: true },
  { slug: "sign-pdf", name: "Sign PDF", category: "Security", desc: "Add typed signature text.", icon: "S", isBrowserWorking: true },
  { slug: "verify-signature", name: "Verify Signature", category: "Security", desc: "Scan and verify digital signatures.", icon: "V", isBrowserWorking: true },
  { slug: "bates-numbering", name: "Bates Numbering", category: "Security", desc: "Add legal-style Bates numbers.", icon: "B", isBrowserWorking: true },
  { slug: "invert-colors", name: "Invert Colors", category: "Reader", desc: "Create a dark reading preview marker.", icon: "D", isBrowserWorking: true },
  { slug: "pdf-reader", name: "PDF Reader", category: "Reader", desc: "Preview PDFs with page thumbnails.", icon: "R", isBrowserWorking: true },
  { slug: "search-in-pdf", name: "Search in PDF", category: "Reader", desc: "Find text inside the selected PDF.", icon: "S", isBrowserWorking: true },
  { slug: "ask-pdf", name: "Ask PDF", category: "AI PDF", desc: "Ask questions about document contents using AI.", icon: "AI", isBrowserWorking: true },
  { slug: "summarize-pdf", name: "Summarize PDF", category: "AI PDF", desc: "Create a short extractive text summary.", icon: "Σ", isBrowserWorking: true },
  { slug: "translate-pdf", name: "Translate PDF", category: "AI PDF", desc: "Translate document text using AI.", icon: "TR", isBrowserWorking: true },
  { slug: "quiz-from-pdf", name: "Quiz from PDF", category: "AI PDF", desc: "Generate basic questions from extracted text.", icon: "Q", isBrowserWorking: true },
  { slug: "invoice-extractor", name: "Invoice Extractor", category: "AI PDF", desc: "Extract likely invoice fields from text.", icon: "₹", isBrowserWorking: true },
  { slug: "resume-to-pdf", name: "Resume to PDF", category: "Templates", desc: "Generate a clean resume PDF from text.", icon: "CV", isBrowserWorking: true },
];

export const toolDescriptions: Record<string, string> = {
  "merge-pdf": "Merge multiple PDF files into one document for free. No file upload, no signup. 100% browser-based and private.",
  "split-pdf": "Split a PDF into separate pages or ranges for free. Runs entirely in your browser — files never leave your device.",
  "compress-pdf": "Compress PDF file size online for free without losing quality. Instant browser-based compression, no upload needed.",
  "rotate-pdf": "Rotate PDF pages 90, 180, or 270 degrees for free. Works directly in your browser with no file upload.",
  "delete-pages": "Delete specific pages from a PDF for free. Select pages to remove and download the result instantly.",
  "extract-pages": "Extract specific pages from a PDF and save as a new file. Free, browser-based, no upload required.",
  "reorder-pages": "Reorder PDF pages by drag and drop for free. Rearrange page order and download the updated PDF instantly.",
  "watermark-pdf": "Add a text watermark to every page of a PDF for free. Customize font, opacity, and position in your browser.",
  "pdf-to-word": "Convert PDF to Word (DOC) online for free. Extract text from PDF into an editable Word document instantly.",
  "pdf-to-jpg": "Convert PDF pages to JPG images for free. Render PDF pages as high-quality JPEG images in your browser.",
  "pdf-to-png": "Convert PDF to PNG image online free. Render PDF pages as transparent PNG images without any upload.",
  "jpg-to-pdf": "Convert JPG images to PDF for free. Combine multiple JPGs into one PDF file instantly in your browser.",
  "png-to-pdf": "Convert PNG images to PDF online for free. Turn PNG files into a PDF document without uploading to a server.",
  "ocr-pdf": "Extract text from scanned PDF using OCR for free. Convert image-based PDFs to searchable, copyable text.",
  "protect-pdf": "Add password protection to PDF files for free. Secure your PDF documents directly in your browser.",
  "unlock-pdf": "Remove PDF password and restrictions for free. Unlock encrypted PDF files online without any server upload.",
  "sign-pdf": "Add a digital signature to PDF online for free. Sign PDF documents with a typed signature in seconds.",
  "ask-pdf": "Chat with your PDF files. Ask questions, extract tables, and find insights instantly using our secure AI assistant.",
  "summarize-pdf": "Summarize a PDF document using AI for free. Get a concise summary of long PDF files instantly.",
  "translate-pdf": "Translate PDF to Hindi, Spanish, French, or German for free using AI. Browser-based PDF translator.",
  "quiz-from-pdf": "Generate quiz questions from a PDF using AI for free. Create study questions automatically from any document.",
  "invoice-extractor": "Extract invoice data from PDF automatically using AI. Free browser-based invoice PDF data extractor.",
  "pdf-to-excel": "Convert PDF to Excel (CSV) online for free. Extract table data from PDF into spreadsheet format.",
  "pdf-to-text": "Extract text from PDF online for free. Convert PDF content to plain text format instantly in your browser.",
  "header-footer": "Add header and footer text to PDF pages for free. Customize position and text of PDF headers and footers.",
  "page-numbers": "Add page numbers to PDF for free. Automatically number all pages in your PDF document.",
  "bookmark-editor": "Edit PDF bookmarks and table of contents for free. Add, remove, or rename PDF chapters and outlines.",
  "image-to-pdf": "Convert images to PDF online for free. Turn JPG, PNG, and other image formats into a single PDF.",
};

export const toolGuides: Record<string, string> = {
  "merge-pdf": `
    <h2>How to Merge PDF Files Online for Free?</h2>
    <p>Merging multiple PDF files into a single document is incredibly easy with <strong>WeLovePDF</strong>. Whether you need to combine reports, invoices, receipts, or study materials, our browser-first tool does it securely without uploading your files to a server.</p>
    
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
      <p>Absolutely. Unlike other online converters that upload your confidential contracts and documents to external servers, WeLovePDF uses browser-side processing. Your files never leave your device, ensuring 100% data privacy and security.</p>
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

export const toolFaqs: Record<string, { q: string; a: string }[]> = {
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
  ]
};

export const subpages: string[] = [
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
  "welovepdf-vs-adobe"
];

export const seoMeta: Record<string, { title: string; desc: string }> = {
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
    desc: "Access brand assets, founding dates, fast statistics, and press contact details for WeLovePDF."
  },
  "sitemap": {
    title: "Sitemap - WeLovePDF Directory",
    desc: "Full HTML directory of WeLovePDF. Easily find and navigate all 12 informational sections and all 60 individual PDF tools."
  }
};
