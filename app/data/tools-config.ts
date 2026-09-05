export interface Tool {
  slug: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  lucideIcon: string;
  isBrowserWorking: boolean;
  isAI?: boolean;
}

export const tools: Tool[] = [
  // Organize
  { slug: "merge-pdf", name: "Merge PDF", category: "Organize", desc: "Combine multiple PDFs into one document.", icon: "M", lucideIcon: "GitMerge", isBrowserWorking: true },
  { slug: "split-pdf", name: "Split PDF", category: "Organize", desc: "Create a new PDF from selected page ranges.", icon: "S", lucideIcon: "Scissors", isBrowserWorking: true },
  { slug: "delete-pages", name: "Delete Pages", category: "Organize", desc: "Remove specific pages from a PDF.", icon: "D", lucideIcon: "Trash2", isBrowserWorking: true },
  { slug: "extract-pages", name: "Extract Pages", category: "Organize", desc: "Save selected pages as a separate PDF.", icon: "E", lucideIcon: "BookOpen", isBrowserWorking: true },
  { slug: "reorder-pages", name: "Reorder Pages", category: "Organize", desc: "Export pages in a custom order.", icon: "R", lucideIcon: "ArrowUpDown", isBrowserWorking: true },
  { slug: "rotate-pdf", name: "Rotate PDF", category: "Organize", desc: "Rotate all pages by 90, 180, or 270 degrees.", icon: "rotate", lucideIcon: "RotateCw", isBrowserWorking: true },
  { slug: "duplicate-pages", name: "Duplicate Pages", category: "Organize", desc: "Duplicate selected pages inside a new PDF.", icon: "2", lucideIcon: "Copy", isBrowserWorking: true },
  { slug: "add-blank-page", name: "Add Blank Page", category: "Organize", desc: "Insert a blank page at the start or end.", icon: "+", lucideIcon: "FilePlus", isBrowserWorking: true },
  { slug: "crop-pdf", name: "Crop PDF", category: "Organize", desc: "Crop PDF margins relative to page bounds.", icon: "C", lucideIcon: "Crop", isBrowserWorking: true },
  // Edit
  { slug: "page-numbers", name: "Page Numbers", category: "Edit", desc: "Add page numbers to every page.", icon: "#", lucideIcon: "Hash", isBrowserWorking: true },
  { slug: "watermark-pdf", name: "Watermark PDF", category: "Edit", desc: "Add text watermark to each page.", icon: "W", lucideIcon: "Stamp", isBrowserWorking: true },
  { slug: "header-footer", name: "Header & Footer", category: "Edit", desc: "Add reusable header and footer text.", icon: "H", lucideIcon: "AlignVerticalJustifyCenter", isBrowserWorking: true },
  { slug: "metadata-editor", name: "Metadata Editor", category: "Edit", desc: "Edit document title, author, and subject.", icon: "I", lucideIcon: "Info", isBrowserWorking: true },
  { slug: "flatten-pdf", name: "Flatten PDF", category: "Edit", desc: "Export a normalized copy of the PDF.", icon: "F", lucideIcon: "Layers", isBrowserWorking: true },
  { slug: "annotate-pdf", name: "Annotate PDF", category: "Edit", desc: "Add a note stamp on pages.", icon: "A", lucideIcon: "MessageSquare", isBrowserWorking: true },
  { slug: "redact-pdf", name: "Redact PDF", category: "Edit", desc: "Cover a chosen area on all pages.", icon: "X", lucideIcon: "EyeOff", isBrowserWorking: true },
  { slug: "compare-pdf", name: "Compare PDFs", category: "Edit", desc: "Compare file names, sizes, and page counts.", icon: "=", lucideIcon: "GitCompare", isBrowserWorking: true },
  { slug: "bookmark-editor", name: "Bookmark Editor", category: "Edit", desc: "Edit PDF document outlines and chapters.", icon: "B", lucideIcon: "Bookmark", isBrowserWorking: true },
  // Optimize
  { slug: "compress-pdf", name: "Compress PDF", category: "Optimize", desc: "Re-save the PDF with object cleanup.", icon: "C", lucideIcon: "Minimize2", isBrowserWorking: true },
  { slug: "grayscale-pdf", name: "Grayscale PDF", category: "Optimize", desc: "Create a print-friendly grayscale copy.", icon: "G", lucideIcon: "Circle", isBrowserWorking: true },
  { slug: "repair-pdf", name: "Repair PDF", category: "Optimize", desc: "Try loading and re-saving a damaged PDF.", icon: "R", lucideIcon: "Wrench", isBrowserWorking: true },
  { slug: "remove-hidden-data", name: "Remove Hidden Data", category: "Optimize", desc: "Clear common metadata fields.", icon: "Z", lucideIcon: "ShieldOff", isBrowserWorking: true },
  // Scan & OCR
  { slug: "deskew-scan", name: "Deskew Scan", category: "Scan & OCR", desc: "Align page rotations for scans.", icon: "/", lucideIcon: "ScanLine", isBrowserWorking: true },
  { slug: "auto-enhance-scan", name: "Auto Enhance Scan", category: "Scan & OCR", desc: "Optimize page contrast and brightness.", icon: "enhance", lucideIcon: "Sun", isBrowserWorking: true },
  { slug: "remove-background", name: "Remove Background", category: "Scan & OCR", desc: "Clean scan backgrounds and threshold colors.", icon: "N", lucideIcon: "ImageOff", isBrowserWorking: true },
  { slug: "ocr-pdf", name: "OCR PDF", category: "Scan & OCR", desc: "Generate searchable text overlays using OCR.", icon: "O", lucideIcon: "ScanText", isBrowserWorking: true },
  // Convert from PDF
  { slug: "pdf-to-text", name: "PDF to Text", category: "Convert from PDF", desc: "Extract readable text from a PDF.", icon: "T", lucideIcon: "FileText", isBrowserWorking: true },
  { slug: "pdf-to-markdown", name: "PDF to Markdown", category: "Convert from PDF", desc: "Extract text into Markdown format.", icon: "MD", lucideIcon: "FileCode", isBrowserWorking: true },
  { slug: "pdf-to-jpg", name: "PDF to JPG", category: "Convert from PDF", desc: "Render first PDF page as a JPG image.", icon: "J", lucideIcon: "Image", isBrowserWorking: true },
  { slug: "pdf-to-png", name: "PDF to PNG", category: "Convert from PDF", desc: "Render first PDF page as a PNG image.", icon: "P", lucideIcon: "ImageDown", isBrowserWorking: true },
  { slug: "pdf-to-long-image", name: "PDF to Long Image", category: "Convert from PDF", desc: "Render all pages into one tall PNG.", icon: "L", lucideIcon: "GalleryVertical", isBrowserWorking: true },
  { slug: "pdf-to-word", name: "PDF to Word", category: "Convert from PDF", desc: "Extract text into a Word-readable document.", icon: "W", lucideIcon: "FileType", isBrowserWorking: true },
  { slug: "pdf-to-excel", name: "PDF to Excel", category: "Convert from PDF", desc: "Extract text tables into CSV.", icon: "X", lucideIcon: "Table", isBrowserWorking: true },
  { slug: "pdf-to-powerpoint", name: "PDF to PowerPoint", category: "Convert from PDF", desc: "Create an HTML slide handoff from pages.", icon: "PPT", lucideIcon: "Presentation", isBrowserWorking: true },
  { slug: "pdf-to-html", name: "PDF to HTML", category: "Convert from PDF", desc: "Extract text into a clean HTML file.", icon: "H", lucideIcon: "Code2", isBrowserWorking: true },
  { slug: "pdf-to-csv", name: "PDF to CSV", category: "Convert from PDF", desc: "Extract line text into CSV rows.", icon: "CSV", lucideIcon: "Sheet", isBrowserWorking: true },
  // Convert to PDF
  { slug: "jpg-to-pdf", name: "JPG to PDF", category: "Convert to PDF", desc: "Convert JPG images into a PDF.", icon: "J", lucideIcon: "Upload", isBrowserWorking: true },
  { slug: "png-to-pdf", name: "PNG to PDF", category: "Convert to PDF", desc: "Convert PNG images into a PDF.", icon: "P", lucideIcon: "FileImage", isBrowserWorking: true },
  { slug: "image-to-pdf", name: "Image to PDF", category: "Convert to PDF", desc: "Convert multiple images into one PDF.", icon: "I", lucideIcon: "Images", isBrowserWorking: true },
  { slug: "word-to-pdf", name: "Word to PDF", category: "Convert to PDF", desc: "Create a PDF from readable text files.", icon: "W", lucideIcon: "FileInput", isBrowserWorking: true },
  { slug: "excel-to-pdf", name: "Excel to PDF", category: "Convert to PDF", desc: "Create a PDF from CSV or spreadsheet text.", icon: "X", lucideIcon: "TableProperties", isBrowserWorking: true },
  { slug: "powerpoint-to-pdf", name: "PowerPoint to PDF", category: "Convert to PDF", desc: "Create a PDF from slide text outline.", icon: "PPT", lucideIcon: "Monitor", isBrowserWorking: true },
  { slug: "html-to-pdf", name: "HTML to PDF", category: "Convert to PDF", desc: "Convert pasted HTML text into PDF.", icon: "H", lucideIcon: "Globe", isBrowserWorking: true },
  { slug: "markdown-to-pdf", name: "Markdown to PDF", category: "Convert to PDF", desc: "Convert Markdown text into PDF.", icon: "MD", lucideIcon: "FileSymlink", isBrowserWorking: true },
  { slug: "text-to-pdf", name: "Text to PDF", category: "Convert to PDF", desc: "Convert typed or uploaded text into PDF.", icon: "T", lucideIcon: "AlignLeft", isBrowserWorking: true },
  { slug: "url-to-pdf", name: "URL to PDF", category: "Convert to PDF", desc: "Render URL webpage contents into PDF.", icon: "U", lucideIcon: "Link", isBrowserWorking: true },
  // Security
  { slug: "protect-pdf", name: "Protect PDF", category: "Security", desc: "Password-protect PDF with AES-128 encryption in your browser.", icon: "P", lucideIcon: "Lock", isBrowserWorking: true },
  { slug: "unlock-pdf", name: "Unlock PDF", category: "Security", desc: "Load and re-save PDFs that are not strongly encrypted.", icon: "U", lucideIcon: "Unlock", isBrowserWorking: true },
  { slug: "sign-pdf", name: "Sign PDF", category: "Security", desc: "Add typed signature text.", icon: "S", lucideIcon: "PenLine", isBrowserWorking: true },
  { slug: "verify-signature", name: "Verify Signature", category: "Security", desc: "Scan and verify digital signatures.", icon: "V", lucideIcon: "BadgeCheck", isBrowserWorking: true },
  { slug: "bates-numbering", name: "Bates Numbering", category: "Security", desc: "Add legal-style Bates numbers.", icon: "B", lucideIcon: "Gavel", isBrowserWorking: true },
  { slug: "accessibility-checker", name: "Accessibility Checker", category: "Security", desc: "Check PDF alt texts and heading schemas.", icon: "acc", lucideIcon: "Accessibility", isBrowserWorking: false },
  // Reader
  { slug: "invert-colors", name: "Invert Colors", category: "Reader", desc: "Create a dark reading preview.", icon: "D", lucideIcon: "Contrast", isBrowserWorking: true },
  { slug: "pdf-reader", name: "PDF Reader", category: "Reader", desc: "Preview PDFs with page thumbnails.", icon: "R", lucideIcon: "BookMarked", isBrowserWorking: true },
  { slug: "search-in-pdf", name: "Search in PDF", category: "Reader", desc: "Find text inside the selected PDF.", icon: "S", lucideIcon: "Search", isBrowserWorking: true },
  // AI PDF
  { slug: "ask-pdf", name: "Ask PDF", category: "AI PDF", desc: "Ask questions about document contents using AI.", icon: "AI", lucideIcon: "MessageCircle", isBrowserWorking: true, isAI: true },
  { slug: "summarize-pdf", name: "Summarize PDF", category: "AI PDF", desc: "Create a short extractive text summary.", icon: "S", lucideIcon: "ListCollapse", isBrowserWorking: true, isAI: true },
  { slug: "translate-pdf", name: "Translate PDF", category: "AI PDF", desc: "Translate document text using AI.", icon: "TR", lucideIcon: "Languages", isBrowserWorking: true, isAI: true },
  { slug: "quiz-from-pdf", name: "Quiz from PDF", category: "AI PDF", desc: "Generate basic questions from extracted text.", icon: "Q", lucideIcon: "HelpCircle", isBrowserWorking: true, isAI: true },
  { slug: "invoice-extractor", name: "Invoice Extractor", category: "AI PDF", desc: "Extract likely invoice fields from text.", icon: "inv", lucideIcon: "Receipt", isBrowserWorking: true, isAI: true },
  // Templates
  { slug: "resume-to-pdf", name: "Resume to PDF", category: "Templates", desc: "Generate a clean resume PDF from text.", icon: "CV", lucideIcon: "UserSquare", isBrowserWorking: true },
  { slug: "hindi-invoice-generator", name: "Hindi GST Invoice", category: "Templates", desc: "Create GST invoices in Hindi.", icon: "inv", lucideIcon: "FileSpreadsheet", isBrowserWorking: false },
  { slug: "pdf-to-qr", name: "PDF to QR", category: "Templates", desc: "Create visual link scanning QR codes.", icon: "QR", lucideIcon: "QrCode", isBrowserWorking: false },
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
  "header-footer": "Insert page numbers, titles, dates, or custom text to your PDF documents. Set margins, fonts, colors, and configure different headers for odd and even pages.",
  "page-numbers": "Add page numbers to PDF for free. Automatically number all pages in your PDF document.",
  "bookmark-editor": "Edit PDF bookmarks and table of contents for free. Add, remove, or rename PDF chapters and outlines.",
  "image-to-pdf": "Convert images to PDF online for free. Turn JPG, PNG, and other image formats into a single PDF.",

  "pdf-reader": "Read and view PDF documents online for free. Clean, fast browser-based PDF viewer with page thumbnails and night reading mode.",
  "pdf-to-qr": "Generate QR codes for your PDF files online. Create a visual scan code for users to access your PDF documents easily.",
  "grayscale-pdf": "Convert colored PDF files to black and white (grayscale) online for free. Clean vector output for ink-saving printing.",
  "add-blank-page": "Insert blank pages into PDF documents online for free. Add pages at the start, end, or custom index positions.",
  "duplicate-pages": "Duplicate specific pages inside a PDF online for free. Clone document sheets and compile them in custom positions.",
  "accessibility-checker": "Check PDF accessibility standards online for free. Scan document alt text, tag schemas, and logical structures.",
  "hindi-invoice-generator": "Create professional GST invoices in Hindi online for free. Fast browser-based invoice template generator.",};

export const toolGuides: Record<string, string> = {
  "merge-pdf": `
    <h2>How to Merge PDF Files Online for Free?</h2>
    <p>Merging multiple PDF files into a single document is incredibly easy with <strong>WeLovePDF</strong>. Whether you need to combine reports, invoices, receipts, or study materials, our browser-first tool does it securely without uploading your files to a server. Combining files locally ensures that your private data never leaves your computer, which is ideal for sensitive corporate agreements, academic transcripts, or personal records.</p>
    
    <h3>Step-by-Step Guide to Combine PDFs:</h3>
    <ol>
      <li><strong>Select Files:</strong> Click the "Select files" button above or drag and drop your PDFs directly into the workspace drop zone.</li>
      <li><strong>Reorder Pages:</strong> Drag and drop the page thumbnails to rearrange them in the exact order you want them to appear in the final merged PDF.</li>
      <li><strong>Combine:</strong> Click the "Run tool" button. The combined file will compile locally in your browser instantly.</li>
      <li><strong>Download:</strong> Click the "Download" link to save your new merged PDF file.</li>
    </ol>

    <h3>Tips for Best Merging Results:</h3>
    <p>Before combining your files, ensure they are not password protected. If they are, use our Unlock PDF tool first to clear restrictions. Rearranging pages using our drag-and-drop workspace gives you full visual control, avoiding ordering mistakes. Our client-side compiler preserves original font subsets and high-resolution images, guaranteeing no quality degradation during combination.</p>
  `,
  "split-pdf": `
    <h2>How to Split PDF Pages Online?</h2>
    <p>Extract specific pages or split a large PDF document into separate files instantly. Our tool is designed for precision and absolute data safety, operating directly within your browser sandbox. Whether you need to pull out a single invoice from a monthly batch or separate chapters of an eBook, our split tool gives you absolute control without any upload limits or registrations.</p>
    
    <h3>Step-by-Step Guide to Split a PDF:</h3>
    <ol>
      <li><strong>Upload PDF:</strong> Select your file or drag it directly into the PDF workspace drop zone.</li>
      <li><strong>Define Ranges:</strong> Type the pages you want to split or extract in the settings panel (e.g., <code>1-3, 5, 8-10</code>).</li>
      <li><strong>Execute Split:</strong> Click the "Run tool" button to split the pages in real-time.</li>
      <li><strong>Save File:</strong> Click "Download" to retrieve your newly split PDF file containing only your specified pages.</li>
    </ol>

    <h3>Useful Tips for Page Extraction:</h3>
    <p>Use the custom ranges option to specify multiple non-adjacent page selections. If you need each page saved as an individual standalone document, toggle the "Individual files (ZIP)" checkbox. Since our tool processes everything client-side, the extraction takes less than a second even for 100+ page documents, and your raw data remains fully protected inside your local browser memory.</p>
  `,
  "compress-pdf": `
    <h2>How to Compress PDF Online Without Quality Loss?</h2>
    <p>Reduce the file size of your PDF documents instantly using WeLovePDF. Large PDFs are often rejected by email attachments (like Gmail's 25MB limit), government portals, and chat applications. Our compress tool solves this by scanning your document structure, cleaning up unused data, and optimizing image resolutions locally without uploading your file to a server.</p>
    
    <h3>Steps to Compress Your PDF:</h3>
    <ol>
      <li><strong>Choose File:</strong> Drag and drop your PDF into the upload container.</li>
      <li><strong>Select Preset:</strong> Select a compression level (Screen, Ebook, Balanced, or Print) that matches your quality preferences.</li>
      <li><strong>Optimize:</strong> Click "Run Tool" to shrink the document size.</li>
      <li><strong>Download:</strong> Save your compressed PDF instantly.</li>
    </ol>

    <h3>Understanding Compression Levels:</h3>
    <p>Select "Screen (72 DPI)" for maximum size reduction, which is perfect for mobile sharing and web display. Choose "Print (300 DPI)" to maintain high-quality vector paths and image streams for physical printing. Enabling the "Grayscale" toggle will convert all colored elements, reducing the bytes needed to store pixel arrays and making the final file even smaller.</p>
  `,
  "pdf-to-word": `
    <h2>How to Convert PDF to Word (DOCX) Online?</h2>
    <p>Turn your PDF files into editable Microsoft Word documents instantly. WeLovePDF uses browser-first text extraction algorithms to reconstruct paragraphs, tables, and lists from your PDF format, making it easy to edit text without starting from scratch. Best of all, your file content remains 100% private and is never uploaded to any remote server.</p>
    
    <h3>Steps to Convert PDF to DOCX:</h3>
    <ol>
      <li><strong>Upload:</strong> Drag your PDF file into the workspace panel.</li>
      <li><strong>Set Mode:</strong> Choose between "Preserve layout" or "Flowing text" settings.</li>
      <li><strong>Convert:</strong> Click "Run Tool" to extract text structures.</li>
      <li><strong>Download:</strong> Save the resulting editable Word document.</li>
    </ol>

    <h3>Tips for Precise Layout Preservation:</h3>
    <p>If your PDF was created from a scanned paper, make sure to use our OCR PDF tool first to recognize the characters. Choosing the "Preserve layout" option keeps column alignments and table cells intact, which is ideal for CVs and invoices. Flowing text is better if you want to copy large blocks of text into a document editor.</p>
  `,
  "word-to-pdf": `
    <h2>How to Convert Word to PDF Online for Free?</h2>
    <p>Convert your DOCX files to secure, universally compatible PDF format instantly. Sharing documents as Word files can lead to layout distortions on different operating systems or devices. Converting them to PDF ensures that your fonts, alignments, and formatting look exactly as intended. Our tool operates locally in your browser sandbox with zero uploads.</p>
    
    <h3>Steps to Convert DOCX to PDF:</h3>
    <ol>
      <li><strong>Upload:</strong> Select your DOCX file or drag it into the drop zone.</li>
      <li><strong>Configure:</strong> Choose layout fit parameters if needed.</li>
      <li><strong>Compile:</strong> Click "Run Tool" to generate the PDF nodes.</li>
      <li><strong>Download:</strong> Save your completed PDF file.</li>
    </ol>

    <h3>Why Convert Word Documents to PDF?</h3>
    <p>PDF is the industry standard for professional resume sharing, business proposals, and legal contracts because it cannot be easily edited without authorization. Using WeLovePDF ensures your private files are never stored or processed on third-party servers, keeping your proprietary templates, financial reports, or personal summaries completely safe.</p>
  `,
  "ocr-pdf": `
    <h2>How to Extract Text from Scanned PDFs with OCR?</h2>
    <p>Turn scanned images and uncopyable PDF files into editable, searchable documents. Scanned PDFs are essentially flat images, meaning you cannot highlight, search, or copy text within them. WeLovePDF's Optical Character Recognition (OCR) scanner resolves this by analyzing the pixel shapes and mapping them to text streams locally in your browser sandbox.</p>
    
    <h3>Steps to Perform OCR on PDF:</h3>
    <ol>
      <li><strong>Upload Scan:</strong> Drag and drop your scanned PDF document.</li>
      <li><strong>Set Language:</strong> Select the primary document language (English, Hindi, etc.) for high recognition accuracy.</li>
      <li><strong>Process:</strong> Click "Run Tool" to extract the text characters.</li>
      <li><strong>Download:</strong> Save the searchable PDF or plain text outline.</li>
    </ol>

    <h3>Tips for Maximizing OCR Accuracy:</h3>
    <p>Ensure your scan is clear and free from skew angles (if tilted, run our Deskew Scan tool first). Selecting the correct language from our 50+ list prevents recognition errors on characters. Scanned invoices and receipts compile text layers instantly, showing confidence scores so you can review low-contrast matches before saving.</p>
  `,
  "protect-pdf": `
    <h2>How to Password Protect and Secure your PDF?</h2>
    <p>Lock your confidential PDF documents with enterprise-grade encryption. WeLovePDF allows you to set open passwords and owner permissions directly in your browser. This prevents unauthorized users from viewing, copying, or printing your sensitive financial files, personal records, legal contracts, or trade secrets.</p>
    
    <h3>Steps to Protect Your PDF:</h3>
    <ol>
      <li><strong>Select PDF:</strong> Drag and drop your document into the workspace.</li>
      <li><strong>Set Password:</strong> Enter a strong open password and choose your permissions checklist.</li>
      <li><strong>Encrypt:</strong> Click "Run Tool" to lock the file using AES-256 encryption.</li>
      <li><strong>Download:</strong> Save your newly secured PDF.</li>
    </ol>

    <h3>Best Practices for PDF Security:</h3>
    <p>Use our visual strength indicator to create strong passwords containing numbers, symbols, and mixed cases. Checking the permissions options allows you to restrict editing and printing while still allowing users to fill out form fields. Since the encryption runs client-side, the password never travels across the web, guaranteeing absolute safety.</p>
  `,
  "unlock-pdf": `
    <h2>How to Remove Password and Restrictions from PDF?</h2>
    <p>Remove passwords, editing bans, and printing locks from your PDF files instantly. If you have lost the owner password to your own document or need to extract content from restricted files, WeLovePDF can decrypt and strip the lock parameters locally. Our browser-side decryption does not require uploading files to external servers.</p>
    
    <h3>Steps to Unlock Your PDF:</h3>
    <ol>
      <li><strong>Upload:</strong> Drag your locked PDF file into the drop zone.</li>
      <li><strong>Enter Password:</strong> If the file requires an open password, type it into the settings panel.</li>
      <li><strong>Strip:</strong> Click "Run Tool" to remove all user and owner restrictions.</li>
      <li><strong>Download:</strong> Save your unlocked document.</li>
    </ol>

    <h3>Important Note on Decryption:</h3>
    <p>This tool is designed to unlock files for which you have authorized access. If the document is locked with standard permission restrictions (no printing or no text copying), our browser sandbox can bypass it instantly without requiring a password. Strong AES-256 user-locked files require entering the password to authorize decryption.</p>
  `,
  "sign-pdf": `
    <h2>How to Digitally Sign PDF Documents Online?</h2>
    <p>Sign contracts, lease agreements, NDAs, and onboarding forms securely from your browser. WeLovePDF provides a premium digital signing wizard that runs entirely client-side, ensuring your signature assets and sensitive agreements never leave your computer. You can draw, type, or upload signature images in seconds.</p>
    
    <h3>Steps to Sign a PDF:</h3>
    <ol>
      <li><strong>Upload:</strong> Drag your document into the sign workspace.</li>
      <li><strong>Create Signature:</strong> Choose between drawing (canvas), typing with font presets, or uploading an image.</li>
      <li><strong>Place:</strong> Position the signature box on the document page and resize as needed.</li>
      <li><strong>Save:</strong> Click "Run Tool" to merge the signature layout and download.</li>
    </ol>

    <h3>Features of WeLovePDF Sign Wizard:</h3>
    <p>Enable the "Date stamp" toggle to automatically append the current signing date next to your initials. You can check the "Save signature" box to store your signature securely in your local browser storage, allowing you to instantly sign files during your next visit. Multi-signature support allows you to place multiple signature stamps across pages.</p>
  `,
  "watermark-pdf": `
    <h2>How to Add Watermark to PDF for Free?</h2>
    <p>Protect your intellectual property and brand your documents by adding text or image watermarks. Watermarks prevent unauthorized distribution of drafts, design proofs, invoices, and certificates. WeLovePDF allows you to configure, position, and preview watermarks in real-time inside your browser memory with zero uploads.</p>
    
    <h3>Steps to Watermark a PDF:</h3>
    <ol>
      <li><strong>Upload PDF:</strong> Select the file you wish to brand.</li>
      <li><strong>Configure:</strong> Enter your text, customize colors, opacity, and choose a position.</li>
      <li><strong>Apply:</strong> Click "Run Tool" to overlay the watermark pattern on all pages.</li>
      <li><strong>Download:</strong> Save your brand-marked PDF document.</li>
    </ol>

    <h3>Watermark Styling Tips:</h3>
    <p>Use a diagonal rotation angle (like 45°) to prevent users from cropping or hiding the watermark. Adjust the opacity slider to 20-30% to keep the background text readable while maintaining clear copyright markings. You can choose to apply the watermark pattern to all pages, only selected page indexes, or odd/even pages.</p>
  `,
  "image-to-pdf": `<h2>How to Convert Images to PDF Online for Free?</h2>
    <p>Converting your pictures into a clean PDF document is simple and private with <strong>WeLovePDF</strong>. Whether you need to compile receipt photos, scanned documents, or graphics, our tool works locally in your browser memory without uploading any files to external servers.</p>
    
    <h3>Step-by-Step Guide to Convert Images:</h3>
    <ol>
      <li><strong>Select Images:</strong> Drag and drop your JPG, PNG, or WebP files into the workspace area.</li>
      <li><strong>Layout Configuration:</strong> Adjust the page layout, margin thickness, and page fit options.</li>
      <li><strong>Compile:</strong> Click the "Compile Output" button. The images are merged into a single PDF instantly.</li>
      <li><strong>Save:</strong> Click the "Download" link to save your new PDF document.</li>
    </ol>

    <h3>Tips for Best Image-to-PDF Conversion:</h3>
    <p>For official documents, select "A4" size and "Small margins" to maintain a professional layout. Drag and drop the image thumbnails to rearrange them in the correct page order. Since the conversion runs client-side, it is extremely fast and completely secure.</p>`,
  "pdf-reader": `<h2>How to Read and View PDF Documents Online?</h2>
    <p>Read your PDF documents securely in any browser without installing heavy software. WeLovePDF PDF Reader loads files locally into your client tab, featuring sidebar navigation, Zoom controls, and a custom night theme for low-light reading comfort.</p>
    
    <h3>Steps to View PDF Documents:</h3>
    <ol>
      <li><strong>Load File:</strong> Drag and drop your PDF file into the reader desktop.</li>
      <li><strong>Navigate:</strong> Use the page thumbnail sidebar or click arrow keys to flip through pages.</li>
      <li><strong>Reading Themes:</strong> Toggle "Night Mode" in the settings panel for high-contrast viewing.</li>
      <li><strong>Inspect details:</strong> Check file metadata, page sizes, and text layouts.</li>
    </ol>

    <h3>Why Use a Browser-Local PDF Reader?</h3>
    <p>Standard PDF viewers often upload files to servers or run sluggish scripts. WeLovePDF runs fully offline, meaning your confidential files stay strictly inside your local computer memory sandbox, guaranteeing zero data leakage.</p>`,
  "pdf-to-qr": `<h2>How to Convert PDF URLs or Documents to QR Codes?</h2>
    <p>Create visual QR scan codes so users can easily access your PDF files on mobile devices. Converting PDF URLs to QR codes is perfect for flyers, menu sheets, business cards, and product packaging.</p>
    
    <h3>Steps to Generate PDF QR Code:</h3>
    <ol>
      <li><strong>Select Link:</strong> Upload your PDF document to a public link or paste your PDF URL path.</li>
      <li><strong>Customize Layout:</strong> Select QR color themes, error correction rates, and image sizing.</li>
      <li><strong>Generate Code:</strong> Click "Compile Output" to compile the QR matrix.</li>
      <li><strong>Download:</strong> Save the QR code graphic as PNG or print-friendly PDF.</li>
    </ol>

    <h3>Best Practices for QR Scanning:</h3>
    <p>Choose high contrast colors (e.g. black QR code on white background) to ensure scanner apps recognize the matrix quickly. Test the QR code with your mobile camera before printing. Static QR codes do not require internet access and will work permanently.</p>`,
  "grayscale-pdf": `<h2>How to Convert Color PDF to Black and White?</h2>
    <p>Convert your colored PDF files into high-contrast grayscale monochrome copies. Greyscale PDFs are ink-friendly for printing and often significantly smaller in file size due to channel space reductions.</p>
    
    <h3>Steps to Convert PDF to Grayscale:</h3>
    <ol>
      <li><strong>Choose Document:</strong> Select the colored PDF file from your device.</li>
      <li><strong>Select Preset:</strong> Choose to compress image assets or remove extra metadata parameters.</li>
      <li><strong>Process:</strong> Click the "Compile Output" button to strip color streams.</li>
      <li><strong>Save File:</strong> Download your print-ready black and white PDF.</li>
    </ol>

    <h3>Benefits of Grayscale Conversion:</h3>
    <p>Printing colored documents is expensive and wastes ink. Grayscale conversion ensures clean black-and-white grids. Our client-side script converts color models directly without rasterizing vector text, keeping document elements crisp.</p>`,
  "add-blank-page": `<h2>How to Insert Empty Blank Pages into a PDF?</h2>
    <p>Add blank pages to your PDF documents easily. Inserting spacing sheets is useful for double-sided print separations, creating layout margins, or leaving notebook outline pages inside report portfolios.</p>
    
    <h3>Steps to Insert Blank Pages:</h3>
    <ol>
      <li><strong>Upload PDF:</strong> Choose the document you want to extend.</li>
      <li><strong>Set Position:</strong> Choose where to insert the blank page (start, end, or after page index N).</li>
      <li><strong>Format page:</strong> Select background canvas color and page size (A4, Letter).</li>
      <li><strong>Download:</strong> Click "Compile Output" to insert the blank page and download.</li>
    </ol>

    <h3>Why insert blank pages locally?</h3>
    <p>Injecting pages requires updating PDF cross-reference structures. WeLovePDF uses local PDF-Lib execution to restructure tables inside your browser memory, ensuring your sensitive file contents are never sent to external servers.</p>`,
  "duplicate-pages": `<h2>How to Duplicate Pages inside a PDF?</h2>
    <p>Clone specific pages or sheets inside your PDF files online. Duplicating pages is perfect for multiplying registration sheets, creating blank form copies, or duplicating slides within single documents.</p>
    
    <h3>Steps to Clone PDF Pages:</h3>
    <ol>
      <li><strong>Upload:</strong> Select the PDF file you wish to modify.</li>
      <li><strong>Define Page:</strong> Specify the page index you want to copy and set duplicate copies counts.</li>
      <li><strong>Choose Location:</strong> Choose to insert duplicates before, after, or at the end of the file.</li>
      <li><strong>Download:</strong> Click "Compile Output" to compile the duplicates and save.</li>
    </ol>

    <h3>Optimal PDF Page Duplication:</h3>
    <p>Unlike copying pages manually which bloats documents, WeLovePDF references the page resources internally, creating cloned views with minimal increase in output file size. Everything runs locally in browser memory.</p>`,
  "accessibility-checker": `<h2>How to Audit and Check PDF Accessibility Standards?</h2>
    <p>Scan your PDF files online to verify compliance with ADA and WCAG accessibility standards. Auditing documents is critical to ensure screen readers can parse texts and images for visually impaired users.</p>
    
    <h3>Steps to Verify PDF Accessibility:</h3>
    <ol>
      <li><strong>Select File:</strong> Drag your PDF document into the checker desk.</li>
      <li><strong>Start Scan:</strong> Click the "Compile Output" button to inspect metadata structures.</li>
      <li><strong>Review Audit:</strong> Review the results log showing tag levels, header structures, and alt texts.</li>
      <li><strong>Save Report:</strong> Save the compliance status log for audit submissions.</li>
    </ol>

    <h3>Common Accessibility Parameters Checked:</h3>
    <p>Our tool verifies the presence of document title fields, default language declarations, image alternate descriptions (Alt tags), and logical tag reading structures, helping you make documents accessible to everyone.</p>`,
  "hindi-invoice-generator": `<h2>GST Invoice Creator - Generate Invoices in Hindi</h2>
    <p>Create professional GST invoices with full Hindi localization online for free. WeLovePDF Hindi GST Invoice builder helps small businesses, traders, and freelancers issue invoices with Hindi labels and correct tax computations.</p>
    
    <h3>Steps to Build Hindi Invoice:</h3>
    <ol>
      <li><strong>Input Details:</strong> Fill in seller details, buyer GSTIN, invoice dates, and item rows.</li>
      <li><strong>Tax & Rates:</strong> Input CGST, SGST, IGST tax percentages and item amounts.</li>
      <li><strong>Generate PDF:</strong> Click the "Compile Output" button to render the invoice grid.</li>
      <li><strong>Print/Download:</strong> Save the clean, professional invoice PDF instantly.</li>
    </ol>

    <h3>Features of WeLovePDF GST Invoice:</h3>
    <p>Our generator handles automatic calculations of tax rows, item totals, and grand totals. The inputs are cached securely in your local browser sandbox, allowing you to instantly load templates for your next client billing session.</p>`,
  "header-footer": `
    <h2>How to Add Headers and Footers to a PDF?</h2>
    <p>Placing page numbers, copyright notices, or corporate branding across multiple document pages can be tedious if you lack the source files. The WeLovePDF Header & Footer utility overlays custom text structures directly onto your PDF pages inside your local browser memory sandbox. There is no need to upload your sensitive contracts or business templates to remote servers because all stamping operations are completed client-side. This guarantees 100% data confidentiality for sensitive files.</p>
    
    <h3>Step-by-Step Guide to Add Headers/Footers:</h3>
    <ol>
      <li><strong>Upload Document:</strong> Click the "Select files" button above or drag and drop your PDF file directly into the workspace drop zone.</li>
      <li><strong>Add Text Labels:</strong> Input your custom text into the left, center, or right header and footer text input blocks.</li>
      <li><strong>Customize Layout:</strong> Adjust the sliders and dropdowns to select your font style (Helvetica, Times New Roman, Courier), font size, text color, and layout opacity.</li>
      <li><strong>Configure Margins:</strong> Set your top and bottom margin padding offsets (in points) to prevent the stamped text from overlapping with your original body content. We recommend setting a top/bottom margin padding of at least 36 points in the settings panel to prevent overlap.</li>
      <li><strong>Toggle Page Rules:</strong> Use dynamic tokens like <code>{page}</code> and <code>{total}</code> to enable auto-incrementing page numbers, and toggle "Different Odd & Even Pages" to place author names on left-hand pages and document titles on right-hand pages.</li>
      <li><strong>Compile PDF:</strong> Click "Run tool" to merge the header and footer overlays and save your finished PDF.</li>
    </ol>

    <h3>Real Tool Details & Stamping Capabilities:</h3>
    <p>Our stamping engine performs overlays directly onto the existing PDF canvas layers. This means that we do not delete, crop, or modify the underlying text and graphics. It adds text on top of what is already there. If you want to replace existing headers, we recommend setting a white background rectangle or cropping the margins first. Our engine handles pagination variables dynamically as it compiles the new PDF nodes. It supports dynamic text positioning using a nine-point layout grid layout helper. Stamped elements support customizable transparency, color palettes, and angle rotation settings to seamlessly match your brand guidelines.</p>
    <p>While batch processing of multiple files is currently not supported for headers and footers to ensure exact visual alignment per file, you can customize single files of any page length. We use browser-native canvas drawing APIs to stamp text layers, which yields zero document layout shifts and keeps the output files compact. Need to crop or expand margins before adding header branding? Use our <a href="/crop-pdf">Crop PDF</a> tool.</p>
  `,
  "pdf-to-csv": `
    <h2>How to Convert PDF Tables to CSV Online?</h2>
    <p>Financial worksheets, balance sheets, and invoice lists are frequently locked in flat PDF page layouts. The WeLovePDF PDF to CSV converter analyzes coordinate spaces locally in your browser to detect columns and output clean, structured spreadsheet data. Copying and pasting cells manually is highly prone to row-shifting errors and alignment breaks, which our layout parser prevents. The conversion takes place entirely inside your web browser sandbox, meaning your sensitive financial balance sheets never leave your device.</p>
    
    <h3>Step-by-Step Guide to Convert PDF to CSV:</h3>
    <ol>
      <li><strong>Upload PDF:</strong> Drag your table-containing PDF or browse for it from your local storage.</li>
      <li><strong>Select Pages:</strong> Define which page indices or ranges containing the tables you want to extract.</li>
      <li><strong>Run Converter:</strong> Click the "Run tool" action button to trigger the layout coordinate parser.</li>
      <li><strong>Save CSV:</strong> Download your compiled UTF-8 encoded <code>.csv</code> file directly to your device.</li>
    </ol>

    <h3>Technical Table Parsing & Layout Vector Coordinate Details:</h3>
    <p>Our parser scans text coordinate vectors to detect horizontal alignment lines and whitespace distances. This allows the tool to map columns and rows without relying on external OCR libraries for text-based files. For multi-page PDF documents, the extraction engine appends tables sequentially, mapping all pages to the header structure detected on the first page. Merged cells are handled by inserting empty adjacent values. This preserves column alignments and prevents data shifting in Microsoft Excel. If your PDF contains multiple separate tables on a single page, the converter will merge them into a single continuous CSV grid using blank row separators to delineate table boundaries.</p>
    <p>We use standard UTF-8 encoding for the exported CSV file to ensure complete compatibility with special currency symbols (like $, €, or ₹), mathematical notations, and non-Latin characters. The converter is limited to text-based PDF files; scanned images require optical character recognition. There is no column limit on the exported CSV file; our browser engine maps as many columns as detected by the page coordinate space, though tables wider than 30 columns might experience minor formatting wraps. Need to convert scanned invoices or images to editable text first? Try our browser-based <a href="/ocr-pdf">OCR PDF</a> tool.</p>
  `,
  "html-to-pdf": `
    <h2>How to Convert HTML to PDF Online?</h2>
    <p>Printing HTML page structures or invoices using browser defaults often results in chopped texts, broken background images, and layout distortions. The WeLovePDF HTML to PDF compiler parses raw HTML strings and CSS3 rules client-side to generate clean vector PDF documents. Developers and web designers can now generate high-fidelity PDF documents directly inside their browser tab. The engine operates entirely client-side, making it highly secure for compiling sensitive dashboard views or billing invoices. This protects code templates and proprietary mockups from server-side sniffing.</p>
    
    <h3>Step-by-Step Guide to Convert HTML to PDF:</h3>
    <ol>
      <li><strong>Paste Code:</strong> Copy and paste your raw HTML markup directly into our code editor.</li>
      <li><strong>Configure Layout:</strong> Set the output page dimensions (A4, Letter), margins (none, thin, normal), and orientation.</li>
      <li><strong>Apply CSS:</strong> Ensure your CSS styles, media elements, or inline blocks are included in the markup.</li>
      <li><strong>Compile Output:</strong> Click "Run tool" to render your CSS styles into vector PDF structures.</li>
    </ol>

    <h3>Asset Embedding & CSS Compliance Rules:</h3>
    <p>Our client-side renderer supports standard CSS3 style sheets, including flexbox layouts, grid alignments, page-break margins, and absolute positioning selectors. Font files are automatically fetched and embedded as base64 descriptors inside the final PDF document. This makes your text fully searchable and prevents layout fallback issues. Custom web-safe fonts are embedded natively, while external fonts are downloaded and compiled into base64 font descriptors inside the final PDF document. You can configure custom scaling options to fit content perfectly onto one page or keep standard viewport widths.</p>
    <p>External images are fetched asynchronously inside the browser tab, provided their hosting servers allow Cross-Origin Resource Sharing (CORS). Because our converter processes the static DOM state directly inside your browser memory, active client-side JavaScript charts and interactive widgets must be fully rendered before you copy the HTML structure into the compiler, as our engine parses static DOM states rather than executing active JS runtimes during compilation. You can use standard CSS page break properties in your HTML code, such as <code>page-break-after: always;</code> or <code>break-after: page;</code> on container elements to force page breaks. You can also specify custom render scales (from 50% to 150%) to adjust how large elements display on standard document paper sheets. Looking to compile clean Markdown text documents instead? Use our <a href="/markdown-to-pdf">Markdown to PDF</a> utility.</p>
  `,
  "text-to-pdf": `
    <h2>How to Convert Text to PDF Online?</h2>
    <p>Plain text files are perfect for raw writing and code logs, but they look unprofessional when shared or printed. Our Text to PDF tool formats raw notes into clean, paginated PDF documents with custom font spacing and layouts. All pagination and formatting logic is executed client-side, ensuring your personal journals and system logs are kept completely secure. The compiler handles word wrap boundaries in real-time, converting any size note file instantly. This offline execution allows developers to process multi-megabyte log dumps without data leaving their computer.</p>
    
    <h3>Step-by-Step Guide to Convert Text to PDF:</h3>
    <ol>
      <li><strong>Enter Text:</strong> Paste your plain text into the editor workspace or upload a <code>.txt</code> file.</li>
      <li><strong>Select Font Style:</strong> Customize the document appearance using Sans-Serif, Serif, or Monospace font styles. Customize the typography to suit formal letters or readable code files.</li>
      <li><strong>Adjust Layout:</strong> Set custom line spacing, font sizes, page margins, and paper sizes (A4, Letter). You can toggle between Portrait and Landscape orientation modes depending on document width.</li>
      <li><strong>Generate PDF:</strong> Click "Run tool" to divide your text blocks into paginated pages.</li>
      <li><strong>Download:</strong> Save the resulting PDF file.</li>
    </ol>

    <h3>Unicode Support & Pagination Performance Details:</h3>
    <p>Our text engine is fully compatible with the UTF-8 character encoding standard. This allows you to convert documents containing Hindi characters, Cyrillic text, and special math equations without experiencing character rendering issues. The tool splits long text files into pages automatically by calculating line-height bounds and page height limits. Since this pagination runs locally using optimized client-side arrays, converting a large 1,000-page plain text log file takes less than three seconds. The pagination logic operates inside the browser sandbox, ensuring zero server lag.</p>
    <p>The utility accepts plain <code>.txt</code> files; rich text formats (.docx or .rtf) must be saved as plain text before you paste them into the converter. You can configure custom page orientation, font sizes from 8pt to 24pt, and margins from 0.25 to 1.5 inches. Our parser handles consecutive empty lines and blank spaces properly to preserve text paragraphs and code indentations exactly. Need to combine multiple text-converted PDFs into a single document? Try our <a href="/merge-pdf">Merge PDF</a> tool.</p>
  `,};

export const toolFaqs: Record<string, { q: string; a: string }[]> = {
  "merge-pdf": [
    { q: "Is WeLovePDF's Merge PDF tool free?", a: "Yes, WeLovePDF's Merge PDF tool is 100% free with no hidden charges, page limits, or watermarks." },
    { q: "Are files uploaded to a remote server?", a: "No. All merging operations are processed entirely inside your local browser sandbox via Javascript/WebAssembly. Your documents never leave your computer." },
    { q: "Is there a file size limit for merging PDFs?", a: "We support files up to 200MB for local browser-side processing, completely free of charge." },
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
  "image-to-pdf": [
      { q: "Can I convert multiple image formats at once?", a: "Yes, you can upload a mix of JPG, PNG, and WebP files and combine them all into a single PDF." },
      { q: "Does this tool upload my photos to a server?", a: "No. The images are converted locally inside your browser memory using JavaScript, keeping your personal photos 100% private." },
      { q: "Is there a limit on how many images I can convert?", a: "No, WeLovePDF allows you to convert unlimited images in a single session completely free." }
  ],
  "pdf-reader": [
      { q: "Do I need to upload files to read them?", a: "No, files are loaded locally from your disk directly into the browser DOM sandbox, ensuring secure offline reading." },
      { q: "Does the PDF reader support password-protected files?", a: "Yes. If the PDF is encrypted, the reader will prompt you to enter the password locally to decrypt and open it." },
      { q: "Can I read PDFs in dark mode?", a: "Yes, our reader features a toggle for Night Mode to invert canvas colors for comfortable low-light reading." }
  ],
  "pdf-to-qr": [
      { q: "How do users access the PDF from the QR code?", a: "The QR code embeds a URL link to where your PDF is hosted. When scanned, it opens that link automatically." },
      { q: "Can I customize the color of the QR code?", a: "Yes, you can select custom foreground and background colors in the settings panel." },
      { q: "Is the generated QR code permanent?", a: "Yes, the QR code is static and will never expire." }
  ],
  "grayscale-pdf": [
      { q: "Does converting to grayscale reduce file size?", a: "Yes, converting color pixel arrays to single-channel monochrome values decreases the document data size significantly." },
      { q: "Will vector text or images get blurred?", a: "No, the tool converts color spaces at the system layer without rasterizing vector text, keeping documents perfectly sharp." },
      { q: "Is this tool free to use?", a: "Yes, like all core tools on WeLovePDF, Grayscale PDF is completely free with no usage limits." }
  ],
  "add-blank-page": [
      { q: "Can I choose the color or size of the blank page?", a: "Yes, you can customize page size (A4, Letter) and set background colors in the options panel." },
      { q: "Is my document uploaded to a server?", a: "No, the blank page injection happens 100% locally inside your web browser." },
      { q: "Can I add multiple blank pages?", a: "Yes, you can repeat the process or select custom index locations to insert multiple pages." }
  ],
  "duplicate-pages": [
      { q: "Can I duplicate multiple pages at once?", a: "Yes, you can specify individual pages or ranges to copy in the options panel." },
      { q: "Does cloning pages increase file size significantly?", a: "Only slightly, as PDF-Lib references the original objects, keeping document sizes optimized." },
      { q: "Is there a limit on duplication copies?", a: "No, you can select any number of copies without page caps." }
  ],
  "accessibility-checker": [
      { q: "Does this tool automatically fix accessibility issues?", a: "It identifies issues like missing image descriptions or hierarchy bugs, which you can resolve using our PDF editor tools." },
      { q: "Why is PDF accessibility important?", a: "It ensures that visually impaired individuals using screen readers can navigate and read your documents properly." },
      { q: "Is this checker secure?", a: "Yes, the audit runs locally in your browser to maintain confidentiality of your data." }
  ],
  "hindi-invoice-generator": [
      { q: "Does the invoice support GST taxes?", a: "Yes, tax columns and SGST/CGST settings are fully customizable." },
      { q: "Can I save my business info for next time?", a: "Yes, WeLovePDF stores your inputs locally in your browser storage for fast autofill during your next session." },
      { q: "Is there any charge for creating invoices?", a: "No, this billing tool is completely free with no usage limits." }
  ],
  "header-footer": [
    { q: "Does this tool replace existing headers or write over them?", a: "It overlays the new text directly. If you want to cover existing text, you should first use our PDF crop tool or add a white blank page background layer." },
    { q: "Can I apply headers to odd and even pages differently?", a: "Yes. Toggle the 'Different Odd & Even Pages' setting in the sidebar. This allows you to place the author's name on left pages and the document title on right pages." },
    { q: "Is there a font limitations list?", a: "Standard web fonts like Helvetica, Times New Roman, and Courier are fully embedded to keep the output file compact and readable on all PDF readers." }
  ],
  "pdf-to-csv": [
    { q: "Can tables be extracted from a scanned (image-based) PDF, or only from text-based PDFs?", a: "Image-based scans do not contain text data. You must run our OCR PDF tool first to digitize the tables before converting them to CSV." },
    { q: "How does the converter handle merged cells or nested rows?", a: "Merged columns are split with blank separators, keeping column mapping aligned. Complex nested tables might require manual adjustments in Excel after export." },
    { q: "Is there a column limit on the exported CSV file?", a: "No, our browser engine maps as many columns as detected by the page coordinate space, but tables spanning wider than 30 columns might experience minor alignment wraps." }
  ],
  "html-to-pdf": [
    { q: "If the HTML links an external stylesheet, will that styling apply too?", a: "Yes, provided the CSS URL is absolute and accessible from your browser (CORS allowed). For the best results, we recommend using inline styles or embedding CSS within <style> tags." },
    { q: "How do I force page breaks at specific sections?", a: "You can use standard CSS page break properties in your HTML code, such as page-break-after: always; or break-after: page; on container elements." },
    { q: "Are custom web fonts embedded in the output PDF file?", a: "Yes, standard web-safe fonts are embedded natively. If you use external fonts, they are downloaded and compiled into base64 font descriptors inside the final PDF document." }
  ],
  "text-to-pdf": [
    { q: "Does this tool support Hindi and other non-Latin scripts?", a: "Yes, our engine is fully Unicode-compatible and compiles Hindi scripts and Cyrillic text without generating broken character boxes." },
    { q: "How long does converting a 1000+ page text file take?", a: "Because the script pagination runs locally using optimized client-side arrays, converting a 1000+ page file takes under 3 seconds." },
    { q: "Can I upload Word (.docx) files to convert them here?", a: "This tool only accepts plain text format (.txt). To convert Word files, copy the text and paste it into the editor workspace, or save your Word document as text first." }
  ],};

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
    title: "Free Forever - WeLovePDF",
    desc: "WeLovePDF is 100% free forever. No registrations, no limits, all tools are completely unlocked."
  },
  "faq": {
    title: "FAQ - WeLovePDF",
    desc: "Got questions? Find answers about WeLovePDF's file safety, browser local sandbox, file limits, and AI document helpers."
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
  },
  "image-to-pdf": {
    title: "Image to PDF — Convert JPG, PNG to PDF Online Free | WeLovePDF",
    desc: "Convert images (JPG, PNG, WebP) to PDF online for free. Combine multiple photos into a single PDF document instantly and securely in your browser."
  },
  "pdf-reader": {
    title: "PDF Reader — View and Read PDF Online Free | WeLovePDF",
    desc: "Read and view PDF documents online for free. Fast browser-based viewer with page thumbnails, night reading mode, and secure local rendering."
  },
  "pdf-to-qr": {
    title: "PDF to QR — Convert PDF Links to QR Codes Online | WeLovePDF",
    desc: "Generate QR codes for your PDF documents online for free. Create high-quality visual scan codes for easy mobile PDF access."
  },
  "grayscale-pdf": {
    title: "Grayscale PDF — Convert PDF to Black and White Online | WeLovePDF",
    desc: "Convert colored PDF files to black and white (grayscale) online for free. Save printer ink and shrink document sizes using browser-local processing."
  },
  "add-blank-page": {
    title: "Add Blank Page — Insert Empty Pages to PDF Online | WeLovePDF",
    desc: "Insert empty blank pages into your PDF documents online for free. Add sheets at the start, end, or custom positions instantly in your browser."
  },
  "duplicate-pages": {
    title: "Duplicate PDF Pages — Clone PDF Pages Online Free | WeLovePDF",
    desc: "Duplicate specific pages inside a PDF document online for free. Clone sheets and place them in custom positions locally in your browser sandbox."
  },
  "accessibility-checker": {
    title: "Accessibility Checker — Check PDF Compliance Online | WeLovePDF",
    desc: "Scan and check PDF documents for WCAG/ADA accessibility compliance for free. Inspect tag schema hierarchies and image alt tags locally."
  },
  "hindi-invoice-generator": {
    title: "Hindi GST Invoice Generator — Create Invoices Online | WeLovePDF",
    desc: "Create GST invoices in Hindi online for free. Fast browser-based invoice template generator with automatic tax computations."
  },};
