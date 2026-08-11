# WeLovePDF Workspace UI Redesign Master Manifest (WORKSPACE_TASKS.md)

## Brand System & Rule Compliance Checklist
- [x] Background: Warm cream/peach (`#FBF1E9`)
- [x] Cards: White (`#FFFFFF`), 0.5px hairline border (`#EFE1D2`), 12px radius (`rounded-[12px]`)
- [x] Primary Accent: Orange (`#E8792A`) for primary CTA and active states ONLY
- [x] Text Colors: Dark navy (`#262B36`) primary, muted warm gray (`#9C9488`) secondary
- [x] Typography: 400 (regular) and 500 (medium) weights only, sentence case everywhere (no ALL CAPS)
- [x] Flat Design: Zero gradients, zero heavy drop-shadows, zero decorative clutter
- [x] Rule 0 Above-the-Fold Principle: Outer page does NOT scroll on 1366x768 or 390x844 viewports; internal bounded scroll (`max-h-* overflow-y-auto`) used for lists/grids/chats/forms

---

## ARCHETYPE A — Multi-file Collector (2 / 2) [100% Complete]
- [x] WORKSPACE-merge-pdf — Sticky top summary bar (file count, total pages, KB), compact file-level rows with drag/move handles, dashed add row, slim sidebar with compress toggle. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-compare-pdf — Sticky top summary bar, file-level comparison rows, comparison mode select in sidebar. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE B — Single-file Page-Canvas Editor (11 / 11) [100% Complete]
- [x] WORKSPACE-split-pdf — Sticky top bar, bounded thumbnail grid with split markers, sidebar range input. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-delete-pages — Bounded thumbnail grid with checkbox overlays, sidebar delete count summary. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-extract-pages — Bounded thumbnail grid with selection checkboxes, sidebar page selection summary. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-reorder-pages — Bounded thumbnail grid with drag/move reordering, sidebar reset button. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-rotate-pdf — Bounded thumbnail grid with per-page rotate icon buttons, sidebar 90°/180°/270° rotate-all picker. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-duplicate-pages — Bounded thumbnail grid with duplicate action buttons, sidebar clone controls. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-add-blank-page — Bounded thumbnail grid with (+) insertion points between thumbnails, sidebar paper size picker. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-crop-pdf — Bounded thumbnail grid with crop overlay click, sidebar margin inputs (%). Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-annotate-pdf — Bounded thumbnail grid with note overlay click, sidebar note text input. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-redact-pdf — Bounded thumbnail grid with redaction box drawer, sidebar redact style options. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-bookmark-editor — Bounded thumbnail grid paired with outline chapter list, sidebar chapter editor. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE C — Upload + Options (16 / 16) [100% Complete]
- [x] WORKSPACE-page-numbers — Compact file strip + position & format options + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-watermark-pdf — Compact file strip + text, position, opacity options + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-header-footer — Compact file strip + header/footer text inputs + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-metadata-editor — Compact file strip + title, author, subject fields + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-flatten-pdf — Compact file strip + flatten mode toggle + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-compress-pdf — Compact file strip + target size slider with estimated output readout (~KB) + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-grayscale-pdf — Compact file strip + grayscale preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-repair-pdf — Compact file strip + repair mode selection + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-remove-hidden-data — Compact file strip + sanitization options + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-deskew-scan — Compact file strip + angle slider + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-auto-enhance-scan — Compact file strip + contrast/brightness sliders + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-remove-background — Compact file strip + background threshold slider + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-ocr-pdf — Compact file strip + language selector (English / Hindi) + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-protect-pdf — Compact file strip + password input fields + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-unlock-pdf — Compact file strip + password input + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-bates-numbering — Compact file strip + prefix, suffix, digit count options + 1st page preview + CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE D — File Format Converter (16 / 16) [100% Complete]
- [x] WORKSPACE-pdf-to-text — Dropzone / removable chip row + format options + Convert CTA + inline result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-markdown — Dropzone / chip row + markdown options + Convert CTA + inline result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-jpg — Dropzone / chip row + DPI (150/300) selector + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-png — Dropzone / chip row + DPI selector + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-long-image — Dropzone / chip row + quality options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-word — Dropzone / chip row + layout preservation options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-excel — Dropzone / chip row + table detection options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-powerpoint — Dropzone / chip row + slide layout options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-html — Dropzone / chip row + CSS inline options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-csv — Dropzone / chip row + delimiter options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-jpg-to-pdf — Multi-image dropzone / removable chip row + page orientation & size options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-png-to-pdf — Multi-image dropzone / chip row + page size options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-image-to-pdf — Multi-image dropzone / chip row + page layout options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-word-to-pdf — Dropzone / chip row + font embedding options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-excel-to-pdf — Dropzone / chip row + gridlines options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-powerpoint-to-pdf — Dropzone / chip row + slide options + Convert CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE E — Text/URL Converter (4 / 4) [100% Complete]
- [x] WORKSPACE-html-to-pdf — Bounded code editor + top options bar (A4/Letter, Portrait/Landscape) + pinned Convert CTA + inline result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-markdown-to-pdf — Bounded markdown editor + top options bar + pinned Convert CTA + inline result state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-text-to-pdf — Bounded text editor + top options bar + pinned Convert CTA + inline result state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-url-to-pdf — Centered URL input + page size/orientation options + Convert CTA + inline result state. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE F — Signature Tools (2 / 2) [100% Complete]
- [x] WORKSPACE-sign-pdf — File strip + signature text & title inputs + sign CTA + result download state. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-verify-signature — Upload dropzone + digital signature verification scan CTA + result status card. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE G — Reader / Viewer (4 / 4) [100% Complete]
- [x] WORKSPACE-pdf-reader — Sticky top control bar + fixed viewport reading pane with internal scroll (`height: calc(100vh-140px)`). Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-search-in-pdf — Sticky top search bar with match highlights + fixed viewport reading pane. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-accessibility-checker — Sticky top control bar + accessibility compliance score + reading pane. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-invert-colors — Sticky top control bar + dark/light contrast toggle + fixed viewport inverted reading pane. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE H — AI Conversational (5 / 5) [100% Complete]
- [x] WORKSPACE-ask-pdf — Split view: Left (38%) document preview, Right AI chat thread with fixed bottom input box. Internal scroll inside chat thread only. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-summarize-pdf — Split view: Left document preview, Right generated summary report card. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-translate-pdf — Split view: Left document preview, Right language selector & translated text output card. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-quiz-from-pdf — Split view: Left document preview, Right generated quiz questions & answer key card. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-invoice-extractor — Split view: Left document preview, Right extracted invoice fields report card. Tested 1366x768 & 390x844 viewports (0 outer scroll).

---

## ARCHETYPE I — Form Generator (3 / 3) [100% Complete]
- [x] WORKSPACE-resume-to-pdf — Split view: Left form fields column (internal scroll), Right live PDF preview updating as user types, bottom Generate CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-hindi-invoice-generator — Split view: Left GST invoice form fields column, Right live Hindi invoice preview, bottom Generate CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
- [x] WORKSPACE-pdf-to-qr — Centered card with URL input + instant QR code preview + Download QR CTA. Tested 1366x768 & 390x844 viewports (0 outer scroll).
