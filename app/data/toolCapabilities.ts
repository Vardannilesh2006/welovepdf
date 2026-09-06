/**
 * P0-06: Tool Capability Manifest
 * Single source of truth for per-tool capabilities.
 */

export interface ToolCapability {
  inputFormats: string[];
  outputFormats: string[];
  howToSteps: { name: string; text: string }[];
  limitations?: string[];
  isServerSide?: boolean;
}

export const toolCapabilities: Record<string, ToolCapability> = {
  'merge-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Select PDF files', text: 'Click Browse or drag and drop two or more PDF files into the workspace.' },
      { name: 'Reorder files', text: 'Drag file cards or thumbnails to arrange them in desired combination order.' },
      { name: 'Merge', text: 'Click Run Tool to combine your documents in-browser using WebAssembly.' },
      { name: 'Download', text: 'Save the merged PDF file directly to your device.' }
    ]
  },
  'split-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select or drag and drop the PDF document into the workspace.' },
      { name: 'Set page ranges', text: 'Specify page ranges or custom individual pages to split (e.g., 1-3, 5).' },
      { name: 'Split', text: 'Click Run Tool to execute the split operation in your browser sandbox.' },
      { name: 'Download', text: 'Download the split PDF files.' }
    ]
  },
  'delete-pages': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF document from your device.' },
      { name: 'Select pages to delete', text: 'Click on unwanted page thumbnails or enter page numbers to remove.' },
      { name: 'Process', text: 'Click Run Tool to remove the selected pages.' },
      { name: 'Download', text: 'Download your updated PDF document.' }
    ]
  },
  'extract-pages': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the source PDF document.' },
      { name: 'Choose pages', text: 'Select the specific pages you want to extract into a separate file.' },
      { name: 'Extract', text: 'Click Run Tool to extract the chosen pages.' },
      { name: 'Download', text: 'Download the extracted PDF.' }
    ]
  },
  'reorder-pages': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Drop your PDF into the visual organizer.' },
      { name: 'Drag to reorder', text: 'Drag and drop page tiles to reorder pages as desired.' },
      { name: 'Save order', text: 'Click Run Tool to compile the new page sequence.' },
      { name: 'Download', text: 'Download the rearranged PDF.' }
    ]
  },
  'rotate-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF document.' },
      { name: 'Choose rotation', text: 'Rotate all or selected pages 90°, 180°, or 270° clockwise.' },
      { name: 'Apply rotation', text: 'Click Run Tool to apply rotation locally.' },
      { name: 'Download', text: 'Download the rotated PDF.' }
    ]
  },
  'duplicate-pages': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file.' },
      { name: 'Select pages', text: 'Choose which pages to clone and set the duplication count.' },
      { name: 'Duplicate', text: 'Click Run Tool to insert duplicate pages into the document.' },
      { name: 'Download', text: 'Download the updated PDF.' }
    ]
  },
  'add-blank-page': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file.' },
      { name: 'Choose position', text: 'Select where to insert the blank page (start, end, or after page N).' },
      { name: 'Insert page', text: 'Click Run Tool to generate and insert the blank page.' },
      { name: 'Download', text: 'Download the modified PDF.' }
    ]
  },
  'crop-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF file.' },
      { name: 'Set crop margins', text: 'Enter top, bottom, left, and right margin values.' },
      { name: 'Crop', text: 'Click Run Tool to adjust the PDF media box boundaries.' },
      { name: 'Download', text: 'Download the cropped PDF.' }
    ],
    limitations: ['Cropping adjusts the visual viewport (media box). It does not delete content outside the box. Use Redact PDF for privacy.']
  },
  'page-numbers': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your document.' },
      { name: 'Configure numbering', text: 'Choose position, font, start index, and format.' },
      { name: 'Apply', text: 'Click Run Tool to stamp page numbers onto the PDF.' },
      { name: 'Download', text: 'Download the numbered PDF.' }
    ]
  },
  'watermark-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file.' },
      { name: 'Set watermark', text: 'Enter watermark text, set opacity, color, and rotation angle.' },
      { name: 'Apply', text: 'Click Run Tool to overlay the watermark across all pages.' },
      { name: 'Download', text: 'Download the watermarked PDF.' }
    ]
  },
  'header-footer': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF.' },
      { name: 'Set text & margins', text: 'Type header and footer text and adjust margin alignment.' },
      { name: 'Apply', text: 'Click Run Tool to stamp header/footer text.' },
      { name: 'Download', text: 'Download the updated PDF.' }
    ]
  },
  'metadata-editor': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF.' },
      { name: 'Edit fields', text: 'Modify Title, Author, Subject, and Keywords.' },
      { name: 'Save metadata', text: 'Click Run Tool to update document metadata.' },
      { name: 'Download', text: 'Download the PDF with new metadata.' }
    ]
  },
  'flatten-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select a PDF with form fields or annotations.' },
      { name: 'Flatten', text: 'Click Run Tool to merge form fields and annotations into static graphics.' },
      { name: 'Download', text: 'Download the flattened non-editable PDF.' }
    ],
    limitations: ['Flattening is irreversible. Interactive form fields and layers become permanent static page content.']
  },
  'annotate-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF.' },
      { name: 'Add note', text: 'Enter note or comment text and select placement coordinates.' },
      { name: 'Stamp', text: 'Click Run Tool to embed the note stamp.' },
      { name: 'Download', text: 'Download the annotated PDF.' }
    ]
  },
  'redact-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF containing content you wish to obscure.' },
      { name: 'Define area', text: 'Enter page number and rectangle coordinates for the blackout area.' },
      { name: 'Apply overlay', text: 'Click Run Tool to draw an opaque black box over the specified coordinates.' },
      { name: 'Download', text: 'Download the PDF with the visual redaction overlay.' }
    ],
    limitations: [
      'IMPORTANT: This tool applies a VISUAL BLACK OVERLAY only. Underlying text or vector data is not removed from the PDF structure and may remain accessible via inspection tools.',
      'This tool does NOT perform cryptographic or permanent sanitize redaction. For court filings, HIPAA, or classified data, use certified professional redaction software.'
    ]
  },
  'compare-pdf': {
    inputFormats: ['PDF'],
    outputFormats: [],
    howToSteps: [
      { name: 'Upload two PDFs', text: 'Select the original and the revised PDF files.' },
      { name: 'Analyze', text: 'Click Run Tool to compare metadata, page counts, file sizes, and extracted text.' },
      { name: 'Review report', text: 'Inspect the generated difference report.' }
    ],
    limitations: [
      'This tool compares document metadata, structural page counts, and extracted text character counts. It does NOT render visual pixel-by-pixel diff overlays.'
    ]
  },
  'bookmark-editor': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF.' },
      { name: 'Configure outlines', text: 'Add, edit, or delete outline titles and target page numbers.' },
      { name: 'Save bookmarks', text: 'Click Run Tool to write bookmarks to the document tree.' },
      { name: 'Download', text: 'Download the updated PDF.' }
    ]
  },
  'compress-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select or drag your PDF into the upload container.' },
      { name: 'Select preset', text: 'Choose Screen, Balanced, or Print compression quality.' },
      { name: 'Compress', text: 'Click Run Tool to optimize structural objects and downsample images.' },
      { name: 'Download', text: 'Download your compressed PDF.' }
    ],
    limitations: ['Compression effectiveness depends on embedded raster image volume. Text-only vector PDFs show smaller reduction percentages.']
  },
  'compress-pdf-to-100kb': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF document for UPSC or Govt application.' },
      { name: '1-Click Target', text: 'Target size is automatically pre-configured to under 100KB.' },
      { name: 'Compress', text: 'Click Run Tool to execute in-browser WebAssembly downsampling.' },
      { name: 'Download', text: 'Save your optimized under-100KB PDF for instant portal upload.' }
    ],
    limitations: ['Extremely large multi-page scanned documents may require balancing text readability against strict 100KB limits.']
  },
  'compress-pdf-to-200kb': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF file for SSC CGL, CHSL, or Railway application.' },
      { name: '200KB Preset', text: 'Pre-calibrated to compress images and fonts under 200KB.' },
      { name: 'Compress', text: 'Execute client-side optimization in your local browser sandbox.' },
      { name: 'Download', text: 'Download your under-200KB PDF ready for submission.' }
    ],
    limitations: ['Zero server upload: processing runs 100% in local device memory.']
  },
  'compress-pdf-to-50kb': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload Document', text: 'Select signature, photo, or small certificate PDF.' },
      { name: '50KB Preset', text: 'High-compression ratio targeted strictly for under 50KB limits.' },
      { name: 'Process', text: 'Compress file locally in RAM with zero network upload.' },
      { name: 'Download', text: 'Download the lightweight PDF.' }
    ],
    limitations: ['Ideal for 1-page documents, photos, or certificates. Multi-page books cannot fit under 50KB without heavy quality reduction.']
  },
  'compress-pdf-to-500kb': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload Marksheets', text: 'Select college certificates or admission PDFs.' },
      { name: '500KB Balanced', text: 'Balanced compression preserving crystal-clear text readability under 500KB.' },
      { name: 'Compress', text: 'Run WebAssembly optimization in your browser.' },
      { name: 'Download', text: 'Download your admission-ready PDF.' }
    ]
  },
  'compress-pdf-for-ssc-upsc': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload Exam PDF', text: 'Upload any marksheet, caste certificate, or application document.' },
      { name: 'Select Govt Exam', text: 'Choose your portal preset: SSC (200KB), UPSC (100KB), or IBPS (50KB).' },
      { name: 'Compress', text: 'Execute instant zero-queue client-side processing.' },
      { name: 'Download', text: 'Download your verified portal-compliant PDF.' }
    ],
    limitations: ['Guaranteed zero server retention: your confidential certificates are never uploaded to any remote server.']
  },
  'grayscale-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the colored PDF file.' },
      { name: 'Convert to Grayscale', text: 'Click Run Tool to convert color streams to monochrome grayscale.' },
      { name: 'Download', text: 'Download the ink-saving black & white PDF.' }
    ]
  },
  'repair-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload damaged PDF', text: 'Select the corrupted or unreadable PDF.' },
      { name: 'Analyze & Rebuild', text: 'Click Run Tool. The parser attempts to reconstruct cross-reference tables.' },
      { name: 'Download', text: 'Download the recovered PDF.' }
    ],
    limitations: ['Can recover PDFs with corrupted xref tables or unclosed dictionaries. Cannot reconstruct missing byte streams or zeroed files.']
  },
  'remove-hidden-data': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document.' },
      { name: 'Strip metadata', text: 'Click Run Tool to remove author, creator, producer, and application tags.' },
      { name: 'Download', text: 'Download the sanitized PDF.' }
    ]
  },
  'deskew-scan': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload scanned PDF', text: 'Select the scanned document with skewed or tilted pages.' },
      { name: 'Deskew', text: 'Click Run Tool to detect orientation and align page angles.' },
      { name: 'Download', text: 'Download the straightened PDF.' }
    ]
  },
  'auto-enhance-scan': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload scan', text: 'Select the faded or dark scan.' },
      { name: 'Enhance', text: 'Click Run Tool to apply automatic contrast and brightness normalization.' },
      { name: 'Download', text: 'Download the enhanced PDF.' }
    ]
  },
  'remove-background': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload scan', text: 'Select the scanned document with gray or yellowed background.' },
      { name: 'Clean background', text: 'Click Run Tool to threshold paper tint into pure white.' },
      { name: 'Download', text: 'Download the cleaned PDF.' }
    ]
  },
  'ocr-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF', 'TXT'],
    howToSteps: [
      { name: 'Upload scanned PDF', text: 'Select your scanned or image-based PDF document.' },
      { name: 'Select language', text: 'Choose recognition language (English, Hindi, etc.).' },
      { name: 'Perform OCR', text: 'Click Run Tool to detect text characters and embed a searchable text layer.' },
      { name: 'Download', text: 'Download the searchable PDF or extracted text.' }
    ]
  },
  'pdf-to-text': {
    inputFormats: ['PDF'],
    outputFormats: ['TXT'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select a PDF with selectable text.' },
      { name: 'Extract text', text: 'Click Run Tool to pull all raw text strings.' },
      { name: 'Download', text: 'Download the plain text (.txt) file.' }
    ],
    limitations: ['Extracts existing text streams. For scanned or image-only PDFs, use OCR PDF instead.']
  },
  'pdf-to-markdown': {
    inputFormats: ['PDF'],
    outputFormats: ['MD'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document.' },
      { name: 'Convert to Markdown', text: 'Click Run Tool to format extracted headings and paragraphs as Markdown.' },
      { name: 'Download', text: 'Download the .md document.' }
    ]
  },
  'pdf-to-jpg': {
    inputFormats: ['PDF'],
    outputFormats: ['JPG'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file.' },
      { name: 'Render image', text: 'Click Run Tool to render PDF pages as high-resolution JPEG images.' },
      { name: 'Download', text: 'Download the JPG image file.' }
    ]
  },
  'pdf-to-png': {
    inputFormats: ['PDF'],
    outputFormats: ['PNG'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF document.' },
      { name: 'Render PNG', text: 'Click Run Tool to render page canvases as transparent PNG images.' },
      { name: 'Download', text: 'Download the PNG image.' }
    ]
  },
  'pdf-to-long-image': {
    inputFormats: ['PDF'],
    outputFormats: ['PNG'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your multi-page PDF.' },
      { name: 'Stitch pages', text: 'Click Run Tool to render all pages vertically into a single tall PNG.' },
      { name: 'Download', text: 'Download the continuous long image.' }
    ]
  },
  'pdf-to-word': {
    inputFormats: ['PDF'],
    outputFormats: ['DOC'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select a text-based PDF document.' },
      { name: 'Convert to Word', text: 'Click Run Tool to extract text structure into Word document format.' },
      { name: 'Download', text: 'Download the editable Word file.' }
    ],
    limitations: ['Produces an editable document with preserved text flow. Highly intricate graphics or nested tables may need adjustment in Word.']
  },
  'pdf-to-excel': {
    inputFormats: ['PDF'],
    outputFormats: ['CSV'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select a PDF containing tables or rows.' },
      { name: 'Extract tables', text: 'Click Run Tool to parse text positions into comma-separated values.' },
      { name: 'Download', text: 'Download the CSV file to open in Excel or Sheets.' }
    ],
    limitations: ['Outputs CSV format. Works best on clean tabular layouts.']
  },
  'pdf-to-powerpoint': {
    inputFormats: ['PDF'],
    outputFormats: ['HTML'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF slides.' },
      { name: 'Convert to presentation', text: 'Click Run Tool to convert pages into HTML slide presentations.' },
      { name: 'Download', text: 'Download the slide bundle.' }
    ]
  },
  'pdf-to-html': {
    inputFormats: ['PDF'],
    outputFormats: ['HTML'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document.' },
      { name: 'Convert to HTML', text: 'Click Run Tool to transform pages into semantic HTML tags.' },
      { name: 'Download', text: 'Download the clean HTML file.' }
    ]
  },
  'pdf-to-csv': {
    inputFormats: ['PDF'],
    outputFormats: ['CSV'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select a PDF with structured text or numbers.' },
      { name: 'Extract CSV', text: 'Click Run Tool to format lines into spreadsheet rows.' },
      { name: 'Download', text: 'Download the CSV file.' }
    ]
  },
  'jpg-to-pdf': {
    inputFormats: ['JPG', 'JPEG'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Select JPG images', text: 'Drag and drop your JPG photos or documents into the workspace.' },
      { name: 'Reorder pages', text: 'Drag image previews into the desired page sequence.' },
      { name: 'Create PDF', text: 'Click Run Tool to compile images into a single PDF.' },
      { name: 'Download', text: 'Download your new PDF document.' }
    ]
  },
  'png-to-pdf': {
    inputFormats: ['PNG'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Select PNG files', text: 'Drag and drop PNG images into the workspace.' },
      { name: 'Arrange order', text: 'Organize image order as needed.' },
      { name: 'Generate PDF', text: 'Click Run Tool to embed PNGs into a PDF.' },
      { name: 'Download', text: 'Download the PDF file.' }
    ]
  },
  'image-to-pdf': {
    inputFormats: ['JPG', 'JPEG', 'PNG', 'WEBP', 'GIF', 'BMP'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Select images', text: 'Select pictures of any supported format.' },
      { name: 'Configure layout', text: 'Adjust orientation, margins, and page sizing.' },
      { name: 'Compile', text: 'Click Run Tool to create the PDF document.' },
      { name: 'Download', text: 'Download your assembled PDF.' }
    ]
  },
  'word-to-pdf': {
    inputFormats: ['TXT', 'DOC (text)'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Provide text', text: 'Paste text or upload a plain text file.' },
      { name: 'Configure typography', text: 'Adjust font size, line spacing, and margins.' },
      { name: 'Convert to PDF', text: 'Click Run Tool to render clean PDF pages.' },
      { name: 'Download', text: 'Download the generated PDF.' }
    ],
    limitations: ['Accepts plain text and formatted text input. For proprietary .docx binaries, copy and paste text into the workspace.']
  },
  'excel-to-pdf': {
    inputFormats: ['CSV', 'TXT'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload CSV', text: 'Upload your CSV data file.' },
      { name: 'Configure table', text: 'Set grid formatting, column borders, and header row.' },
      { name: 'Generate PDF', text: 'Click Run Tool to render a printable table PDF.' },
      { name: 'Download', text: 'Download the table PDF.' }
    ],
    limitations: ['Accepts CSV format. Export Excel workbooks as CSV before uploading.']
  },
  'powerpoint-to-pdf': {
    inputFormats: ['TXT'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Paste outline', text: 'Paste your slide outline or markdown text.' },
      { name: 'Style slides', text: 'Choose slide layout theme and font styling.' },
      { name: 'Render PDF', text: 'Click Run Tool to generate multi-page PDF presentation.' },
      { name: 'Download', text: 'Download the presentation PDF.' }
    ]
  },
  'html-to-pdf': {
    inputFormats: ['HTML'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Paste HTML', text: 'Paste your HTML code snippet into the editor.' },
      { name: 'Render preview', text: 'Check the live layout preview.' },
      { name: 'Export to PDF', text: 'Click Run Tool to compile the HTML layout into a PDF.' },
      { name: 'Download', text: 'Download the PDF document.' }
    ]
  },
  'markdown-to-pdf': {
    inputFormats: ['MD'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Paste Markdown', text: 'Paste your markdown text.' },
      { name: 'Choose styling', text: 'Select typography theme and margins.' },
      { name: 'Compile PDF', text: 'Click Run Tool to compile markdown to a styled PDF.' },
      { name: 'Download', text: 'Download the PDF.' }
    ]
  },
  'text-to-pdf': {
    inputFormats: ['TXT'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Enter text', text: 'Type or paste plain text into the workspace.' },
      { name: 'Set page size', text: 'Choose A4 or US Letter page format and margins.' },
      { name: 'Create PDF', text: 'Click Run Tool to format text into PDF pages.' },
      { name: 'Download', text: 'Download the text PDF.' }
    ]
  },
  'url-to-pdf': {
    inputFormats: ['URL'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Enter URL', text: 'Paste the webpage address (https://...).' },
      { name: 'Capture', text: 'Click Run Tool to render the webpage content into a PDF.' },
      { name: 'Download', text: 'Download the webpage PDF.' }
    ],
    limitations: ['Webpages requiring authentication, complex dynamic client scripts, or CAPTCHA cannot be captured.']
  },
  'protect-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF document to encrypt.' },
      { name: 'Set password', text: 'Enter a strong open password.' },
      { name: 'Encrypt', text: 'Click Run Tool. The browser applies password encryption locally using PDF-lib.' },
      { name: 'Download', text: 'Download your password-protected PDF.' }
    ],
    limitations: [
      'Encryption is executed client-side using standard AES-128 / RC4 encryption supported by PDF-lib. The password never travels across the network.',
      'Compatible with Adobe Acrobat, Chrome, Safari, and standard PDF readers.'
    ]
  },
  'unlock-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload locked PDF', text: 'Select the protected PDF file.' },
      { name: 'Enter password (if required)', text: 'Type the document open password if prompted.' },
      { name: 'Remove restrictions', text: 'Click Run Tool to strip permissions locks and save an unlocked copy.' },
      { name: 'Download', text: 'Download the unlocked PDF.' }
    ],
    limitations: ['Removes owner restriction locks. Files protected with high-grade user open passwords require entering the authorized password.']
  },
  'sign-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the agreement or document to sign.' },
      { name: 'Create signature', text: 'Draw your signature on the canvas or type your initials.' },
      { name: 'Place on page', text: 'Position and resize the signature box on the document.' },
      { name: 'Apply & Save', text: 'Click Run Tool to stamp the signature onto the PDF.' },
      { name: 'Download', text: 'Download your signed PDF.' }
    ],
    limitations: [
      'This tool creates a visual signature stamp. It does NOT generate a cryptographic PKI certificate signature (ISO 32000-1). For qualified electronic signatures with legal certificate timestamps, use dedicated e-signature platforms.'
    ]
  },
  'verify-signature': {
    inputFormats: ['PDF'],
    outputFormats: [],
    howToSteps: [
      { name: 'Upload signed PDF', text: 'Select the signed PDF file to inspect.' },
      { name: 'Scan document', text: 'Click Run Tool to scan document objects for AcroForm signature fields.' },
      { name: 'Review report', text: 'View the detected signature fields and structural metadata.' }
    ],
    limitations: [
      'Scans for the structural presence of digital signature fields and signing annotations. Does NOT validate cryptographic CA certificate trust chains or revocation lists (CRL/OCSP). Use Adobe Acrobat Reader for cryptographic trust verification.'
    ]
  },
  'bates-numbering': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select legal or corporate files.' },
      { name: 'Set Bates options', text: 'Define prefix, number of digits, start index, and placement.' },
      { name: 'Apply numbering', text: 'Click Run Tool to stamp sequential Bates numbers.' },
      { name: 'Download', text: 'Download the indexed PDF.' }
    ]
  },
  'accessibility-checker': {
    inputFormats: ['PDF'],
    outputFormats: [],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF document.' },
      { name: 'Run check', text: 'Click Run Tool to inspect tags, image alt text, and heading structure.' },
      { name: 'View report', text: 'Review the accessibility compliance diagnostic report.' }
    ]
  },
  'invert-colors': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your PDF.' },
      { name: 'Invert colors', text: 'Click Run Tool to invert canvas color values for high-contrast dark reading.' },
      { name: 'Download', text: 'Download the inverted PDF.' }
    ]
  },
  'pdf-reader': {
    inputFormats: ['PDF'],
    outputFormats: [],
    howToSteps: [
      { name: 'Upload PDF', text: 'Drop your PDF into the reader.' },
      { name: 'Navigate & Zoom', text: 'Flip through pages with thumbnail sidebar or keyboard arrows.' },
      { name: 'Read comfortably', text: 'Toggle night mode or zoom settings as desired.' }
    ]
  },
  'search-in-pdf': {
    inputFormats: ['PDF'],
    outputFormats: [],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF document.' },
      { name: 'Type search keyword', text: 'Enter words or phrases into the search bar.' },
      { name: 'View results', text: 'Click through highlighted occurrences across pages.' }
    ],
    limitations: ['Requires text-based PDF. Run OCR PDF first if document consists of scanned images.']
  },
  'ask-pdf': {
    inputFormats: ['PDF'],
    outputFormats: [],
    isServerSide: true,
    howToSteps: [
      { name: 'Upload document', text: 'Drop your PDF file into the AI chat workspace.' },
      { name: 'Wait for parsing', text: 'The browser extracts text streams from your document.' },
      { name: 'Ask questions', text: 'Type questions in plain language about document content, data, or concepts.' },
      { name: 'Receive answers', text: 'The AI assistant generates answers based on document contents.' }
    ],
    limitations: [
      'Document text is parsed and processed in volatile memory. Large documents may be summarized or truncated.',
      'AI models may occasionally hallucinate or misinterpret complex figures. Always cross-reference critical facts with original document text.'
    ]
  },
  'summarize-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['TXT'],
    isServerSide: true,
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document you want summarized.' },
      { name: 'Run summary', text: 'Click Run Tool to analyze text and extract key takeaways.' },
      { name: 'Review & Copy', text: 'Read the generated summary or copy key bullet points.' },
      { name: 'Download', text: 'Download summary as text.' }
    ],
    limitations: ['AI-generated summary highlights key points but may omit nuanced legal, financial, or mathematical details.']
  },
  'translate-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['PDF', 'TXT'],
    isServerSide: true,
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document to translate.' },
      { name: 'Choose target language', text: 'Select Hindi, Spanish, French, German, or other supported languages.' },
      { name: 'Translate', text: 'Click Run Tool to translate extracted text with AI.' },
      { name: 'Download', text: 'Download the translated text or reconstructed document.' }
    ],
    limitations: ['Machine translation quality depends on source clarity. Idiomatic or technical jargon should be reviewed by human translators.']
  },
  'quiz-from-pdf': {
    inputFormats: ['PDF'],
    outputFormats: ['TXT'],
    isServerSide: true,
    howToSteps: [
      { name: 'Upload study material', text: 'Select the PDF chapter, notes, or research paper.' },
      { name: 'Configure questions', text: 'Select question count and difficulty level.' },
      { name: 'Generate quiz', text: 'Click Run Tool to generate practice questions with answer keys.' },
      { name: 'Download', text: 'Download the quiz document.' }
    ]
  },
  'invoice-extractor': {
    inputFormats: ['PDF'],
    outputFormats: ['JSON', 'CSV'],
    isServerSide: true,
    howToSteps: [
      { name: 'Upload invoice', text: 'Select the invoice or bill PDF.' },
      { name: 'Extract fields', text: 'Click Run Tool to detect vendor, date, line items, tax, and total amount.' },
      { name: 'Review data', text: 'Check extracted key-value pairs.' },
      { name: 'Download', text: 'Download data as CSV or JSON.' }
    ],
    limitations: ['Extraction accuracy depends on invoice clarity and standard layout formatting. Always verify extracted amounts.']
  },
  'resume-to-pdf': {
    inputFormats: ['TXT', 'MD'],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Input resume details', text: 'Paste resume text or fill in experience, skills, and education sections.' },
      { name: 'Choose template', text: 'Select a clean professional visual theme.' },
      { name: 'Compile', text: 'Click Run Tool to render the resume into a print-ready PDF.' },
      { name: 'Download', text: 'Download your ATS-friendly resume PDF.' }
    ]
  },
  'hindi-invoice-generator': {
    inputFormats: [],
    outputFormats: ['PDF'],
    howToSteps: [
      { name: 'Enter business details', text: 'Fill in GSTIN, seller info, and customer billing details in Hindi.' },
      { name: 'Add line items', text: 'Enter products, quantities, rates, and CGST/SGST percentages.' },
      { name: 'Generate invoice', text: 'Click Run Tool to compile the compliant GST invoice.' },
      { name: 'Download', text: 'Download the invoice PDF.' }
    ]
  },
  'pdf-to-qr': {
    inputFormats: ['URL', 'PDF'],
    outputFormats: ['PNG'],
    howToSteps: [
      { name: 'Provide link or file', text: 'Paste public PDF link or select file.' },
      { name: 'Customize QR', text: 'Select size and color theme.' },
      { name: 'Generate code', text: 'Click Run Tool to generate the high-resolution QR matrix.' },
      { name: 'Download', text: 'Download the QR code image.' }
    ]
  }
};

export function getToolInputFormats(slug: string): string[] {
  return toolCapabilities[slug]?.inputFormats || ['PDF'];
}

export function getToolOutputFormats(slug: string): string[] {
  return toolCapabilities[slug]?.outputFormats || ['PDF'];
}

export function getToolHowToSteps(slug: string): { name: string; text: string }[] {
  return toolCapabilities[slug]?.howToSteps || [];
}

export function getToolLimitations(slug: string): string[] {
  return toolCapabilities[slug]?.limitations || [];
}
