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
  { slug: "accessibility-checker", name: "Accessibility Checker", category: "Security", desc: "Check PDF alt texts and heading schemas.", icon: "♿", isBrowserWorking: false },
  { slug: "hindi-invoice-generator", name: "Hindi GST Invoice Generator", category: "Templates", desc: "Create GST invoices in Hindi.", icon: "₹", isBrowserWorking: false },
  { slug: "pdf-to-qr", name: "PDF to QR Scanner", category: "Templates", desc: "Create visual link scanning QR codes.", icon: "QR", isBrowserWorking: false },
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
  `
};

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
  }
};
