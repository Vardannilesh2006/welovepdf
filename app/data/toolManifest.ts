/**
 * P0-06: Tool Manifest (Foundational Registry)
 * Single source of truth for tool metadata, execution modes, supported formats, and limitations.
 * Used across tool pages, archetypes, UI controls, and AdSense compliance checks.
 */

export type ProcessingMode = "local" | "server" | "hybrid";
export type ToolStatus = "stable" | "experimental";

export interface HowToStep {
  name: string;
  text: string;
}

export interface ToolManifestEntry {
  toolId: string;
  name: string;
  category: string;
  processingMode: ProcessingMode;
  acceptMimeTypes: string[];
  outputMimeType: string;
  maxBytes: number;
  engine: string;
  optionsSchema: Record<string, any>;
  status: ToolStatus;
  howToSteps: HowToStep[];
  limitations?: string[];
}

export const toolManifest: Record<string, ToolManifestEntry> = {
  'merge-pdf': {
      "toolId": "merge-pdf",
      "name": "Merge PDF",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Merge PDF File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'split-pdf': {
      "toolId": "split-pdf",
      "name": "Split PDF",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Split PDF File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'delete-pages': {
      "toolId": "delete-pages",
      "name": "Delete Pages",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Delete Pages File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'extract-pages': {
      "toolId": "extract-pages",
      "name": "Extract Pages",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Extract Pages File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'reorder-pages': {
      "toolId": "reorder-pages",
      "name": "Reorder Pages",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Reorder Pages File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'rotate-pdf': {
      "toolId": "rotate-pdf",
      "name": "Rotate PDF",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Rotate PDF File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'duplicate-pages': {
      "toolId": "duplicate-pages",
      "name": "Duplicate Pages",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Duplicate Pages File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'add-blank-page': {
      "toolId": "add-blank-page",
      "name": "Add Blank Page",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Add Blank Page File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'crop-pdf': {
      "toolId": "crop-pdf",
      "name": "Crop PDF",
      "category": "Organize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Crop PDF File",
              "text": "Click Browse or drag and drop your organize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'page-numbers': {
      "toolId": "page-numbers",
      "name": "Page Numbers",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Page Numbers File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'watermark-pdf': {
      "toolId": "watermark-pdf",
      "name": "Watermark PDF",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Watermark PDF File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'header-footer': {
      "toolId": "header-footer",
      "name": "Header & Footer",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Header & Footer File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'metadata-editor': {
      "toolId": "metadata-editor",
      "name": "Metadata Editor",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Metadata Editor File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'flatten-pdf': {
      "toolId": "flatten-pdf",
      "name": "Flatten PDF",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Flatten PDF File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'annotate-pdf': {
      "toolId": "annotate-pdf",
      "name": "Annotate PDF",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Annotate PDF File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'redact-pdf': {
      "toolId": "redact-pdf",
      "name": "Redact PDF",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Upload PDF",
              "text": "Select the PDF file containing sensitive data to redact."
          },
          {
              "name": "Select Redaction Region",
              "text": "Draw a rectangular box over the text, numbers, or images you wish to redact."
          },
          {
              "name": "Apply Redaction",
              "text": "Click Run Tool to apply the redaction overlay mask to the selected page coordinates."
          },
          {
              "name": "Download Redacted PDF",
              "text": "Save your sanitized PDF file to your local computer."
          }
      ],
      "limitations": [
          "Visual redaction adds an opaque black overlay box. For top-secret documents, verify text streams do not contain underlying searchable strings."
      ]
  },
  'compare-pdf': {
      "toolId": "compare-pdf",
      "name": "Compare PDFs",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "",
      "maxBytes": 209715200,
      "engine": "pdf.js + HTML5 Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Compare PDFs File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your processed file directly to your device."
          }
      ],
      "limitations": []
  },
  'bookmark-editor': {
      "toolId": "bookmark-editor",
      "name": "Bookmark Editor",
      "category": "Edit",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Bookmark Editor File",
              "text": "Click Browse or drag and drop your edit file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'compress-pdf': {
      "toolId": "compress-pdf",
      "name": "Compress PDF",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Compress PDF File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'compress-pdf-to-100kb': {
      "toolId": "compress-pdf-to-100kb",
      "name": "Compress PDF to 100KB",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Compress PDF to 100KB File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'compress-pdf-to-200kb': {
      "toolId": "compress-pdf-to-200kb",
      "name": "Compress PDF to 200KB",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Compress PDF to 200KB File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'compress-pdf-to-50kb': {
      "toolId": "compress-pdf-to-50kb",
      "name": "Compress PDF to 50KB",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Compress PDF to 50KB File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'compress-pdf-to-500kb': {
      "toolId": "compress-pdf-to-500kb",
      "name": "Compress PDF to 500KB",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Compress PDF to 500KB File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'compress-pdf-for-ssc-upsc': {
      "toolId": "compress-pdf-for-ssc-upsc",
      "name": "Govt Exam PDF Compressor",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Govt Exam PDF Compressor File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'grayscale-pdf': {
      "toolId": "grayscale-pdf",
      "name": "Grayscale PDF",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Grayscale PDF File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'repair-pdf': {
      "toolId": "repair-pdf",
      "name": "Repair PDF",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Repair PDF File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'remove-hidden-data': {
      "toolId": "remove-hidden-data",
      "name": "Remove Hidden Data",
      "category": "Optimize",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Remove Hidden Data File",
              "text": "Click Browse or drag and drop your optimize file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'deskew-scan': {
      "toolId": "deskew-scan",
      "name": "Deskew Scan",
      "category": "Scan & OCR",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "HTML5 Canvas Image Filter Engine",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Deskew Scan File",
              "text": "Click Browse or drag and drop your scan & ocr file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'auto-enhance-scan': {
      "toolId": "auto-enhance-scan",
      "name": "Auto Enhance Scan",
      "category": "Scan & OCR",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "HTML5 Canvas Image Filter Engine",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Auto Enhance Scan File",
              "text": "Click Browse or drag and drop your scan & ocr file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'remove-background': {
      "toolId": "remove-background",
      "name": "Remove Background",
      "category": "Scan & OCR",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "HTML5 Canvas Image Filter Engine",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Remove Background File",
              "text": "Click Browse or drag and drop your scan & ocr file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'ocr-pdf': {
      "toolId": "ocr-pdf",
      "name": "OCR PDF",
      "category": "Scan & OCR",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "Tesseract.js WASM + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select OCR PDF File",
              "text": "Click Browse or drag and drop your scan & ocr file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-text': {
      "toolId": "pdf-to-text",
      "name": "PDF to Text",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "text/plain",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to Text File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PLAIN file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-markdown': {
      "toolId": "pdf-to-markdown",
      "name": "PDF to Markdown",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "text/markdown",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to Markdown File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your MARKDOWN file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-jpg': {
      "toolId": "pdf-to-jpg",
      "name": "PDF to JPG",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "image/jpeg",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM) + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to JPG File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your JPEG file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-png': {
      "toolId": "pdf-to-png",
      "name": "PDF to PNG",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "image/png",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM) + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to PNG File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PNG file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-long-image': {
      "toolId": "pdf-to-long-image",
      "name": "PDF to Long Image",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "image/png",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM) + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to Long Image File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PNG file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-word': {
      "toolId": "pdf-to-word",
      "name": "PDF to Word",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to Word File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-excel': {
      "toolId": "pdf-to-excel",
      "name": "PDF to Excel",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "text/csv",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to Excel File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your CSV file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-powerpoint': {
      "toolId": "pdf-to-powerpoint",
      "name": "PDF to PowerPoint",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Upload PDF",
              "text": "Drag and drop the presentation or document PDF into the workspace."
          },
          {
              "name": "Configure Slide Layout",
              "text": "Choose presentation orientation and slide breakdown mode."
          },
          {
              "name": "Convert",
              "text": "Click Run Tool to transform PDF pages into PowerPoint presentation slides."
          },
          {
              "name": "Download PPTX",
              "text": "Save the converted presentation file directly to your device."
          }
      ],
      "limitations": [
          "Converts PDF pages into presentation slides. Vector objects are normalized for PowerPoint compatibility."
      ]
  },
  'pdf-to-html': {
      "toolId": "pdf-to-html",
      "name": "PDF to HTML",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "text/html",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to HTML File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your HTML file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-csv': {
      "toolId": "pdf-to-csv",
      "name": "PDF to CSV",
      "category": "Convert from PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "text/csv",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF to CSV File",
              "text": "Click Browse or drag and drop your convert from pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your CSV file directly to your device."
          }
      ],
      "limitations": []
  },
  'jpg-to-pdf': {
      "toolId": "jpg-to-pdf",
      "name": "JPG to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "image/jpeg"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM) + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select JPG to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'png-to-pdf': {
      "toolId": "png-to-pdf",
      "name": "PNG to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "image/png"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM) + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PNG to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'image-to-pdf': {
      "toolId": "image-to-pdf",
      "name": "Image to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/bmp"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM) + Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Image to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'word-to-pdf': {
      "toolId": "word-to-pdf",
      "name": "Word to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Word to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'excel-to-pdf': {
      "toolId": "excel-to-pdf",
      "name": "Excel to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "text/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Excel to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'powerpoint-to-pdf': {
      "toolId": "powerpoint-to-pdf",
      "name": "PowerPoint to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PowerPoint to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'html-to-pdf': {
      "toolId": "html-to-pdf",
      "name": "HTML to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "text/html"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select HTML to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'markdown-to-pdf': {
      "toolId": "markdown-to-pdf",
      "name": "Markdown to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "text/markdown",
          "text/plain"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Markdown to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'text-to-pdf': {
      "toolId": "text-to-pdf",
      "name": "Text to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "text/plain"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Text to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'url-to-pdf': {
      "toolId": "url-to-pdf",
      "name": "URL to PDF",
      "category": "Convert to PDF",
      "processingMode": "local",
      "acceptMimeTypes": [
          "text/uri-list",
          "text/plain"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select URL to PDF File",
              "text": "Click Browse or drag and drop your convert to pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'protect-pdf': {
      "toolId": "protect-pdf",
      "name": "Protect PDF",
      "category": "Security",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF",
              "text": "Drag and drop your document into the workspace drop zone."
          },
          {
              "name": "Set Password",
              "text": "Enter your strong open password and choose permission flags."
          },
          {
              "name": "Encrypt In-Browser",
              "text": "Click Run Tool to encrypt the document using standard AES-128 client-side encryption."
          },
          {
              "name": "Download Secure PDF",
              "text": "Save the locked PDF file to your device."
          }
      ],
      "limitations": [
          "Uses ISO 32000 standard AES-128 PDF encryption. Compatible with all standard PDF viewers (Acrobat, Chrome, Edge, Preview, iOS)."
      ]
  },
  'unlock-pdf': {
      "toolId": "unlock-pdf",
      "name": "Unlock PDF",
      "category": "Security",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Unlock PDF File",
              "text": "Click Browse or drag and drop your security file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'sign-pdf': {
      "toolId": "sign-pdf",
      "name": "Sign PDF",
      "category": "Security",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Sign PDF File",
              "text": "Click Browse or drag and drop your security file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'verify-signature': {
      "toolId": "verify-signature",
      "name": "Verify Signature",
      "category": "Security",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "experimental",
      "howToSteps": [
          {
              "name": "Upload Signed PDF",
              "text": "Select the signed PDF file to inspect its digital signature parameters."
          },
          {
              "name": "Scan Structure",
              "text": "Inspect the document AcroForm dictionary for digital signature signature field dictionaries."
          },
          {
              "name": "Review Details",
              "text": "View signer certificate details, signing timestamp, and field integrity metadata."
          }
      ],
      "limitations": [
          "Scans AcroForm signature dictionary presence and signer strings. Full cryptographic CA trust-chain verification requires Adobe Acrobat."
      ]
  },
  'bates-numbering': {
      "toolId": "bates-numbering",
      "name": "Bates Numbering",
      "category": "Security",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Bates Numbering File",
              "text": "Click Browse or drag and drop your security file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'accessibility-checker': {
      "toolId": "accessibility-checker",
      "name": "Accessibility Checker",
      "category": "Security",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "experimental",
      "howToSteps": [
          {
              "name": "Select Accessibility Checker File",
              "text": "Click Browse or drag and drop your security file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your processed file directly to your device."
          }
      ],
      "limitations": []
  },
  'invert-colors': {
      "toolId": "invert-colors",
      "name": "Invert Colors",
      "category": "Reader",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf.js + HTML5 Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Invert Colors File",
              "text": "Click Browse or drag and drop your reader file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-reader': {
      "toolId": "pdf-reader",
      "name": "PDF Reader",
      "category": "Reader",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "",
      "maxBytes": 209715200,
      "engine": "pdf.js + HTML5 Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select PDF Reader File",
              "text": "Click Browse or drag and drop your reader file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your processed file directly to your device."
          }
      ],
      "limitations": []
  },
  'search-in-pdf': {
      "toolId": "search-in-pdf",
      "name": "Search in PDF",
      "category": "Reader",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "",
      "maxBytes": 209715200,
      "engine": "pdf.js + HTML5 Canvas",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Search in PDF File",
              "text": "Click Browse or drag and drop your reader file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your processed file directly to your device."
          }
      ],
      "limitations": []
  },
  'ask-pdf': {
      "toolId": "ask-pdf",
      "name": "Ask PDF",
      "category": "AI PDF",
      "processingMode": "hybrid",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 26214400,
      "engine": "Google Gemini 1.5 Flash API + pdf.js",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Upload Document",
              "text": "Select your PDF document or drop it into the Ask PDF chat interface."
          },
          {
              "name": "Local Parsing",
              "text": "The document text is extracted client-side inside your browser RAM."
          },
          {
              "name": "Ask Questions",
              "text": "Type any question, prompt, or request in natural language about the document."
          },
          {
              "name": "Instant AI Response",
              "text": "Receive cited, accurate answers generated using context-bounded Gemini AI."
          }
      ],
      "limitations": [
          "AI answers are synthesized from document text. Always verify critical facts against the original text.",
          "Text queries travel securely to the AI API endpoint with ephemeral in-memory processing. No data is used for model training."
      ]
  },
  'summarize-pdf': {
      "toolId": "summarize-pdf",
      "name": "Summarize PDF",
      "category": "AI PDF",
      "processingMode": "server",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 26214400,
      "engine": "Google Gemini 1.5 Flash API + pdf.js",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Summarize PDF File",
              "text": "Click Browse or drag and drop your ai pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'translate-pdf': {
      "toolId": "translate-pdf",
      "name": "Translate PDF",
      "category": "AI PDF",
      "processingMode": "server",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 26214400,
      "engine": "Google Gemini 1.5 Flash API + pdf.js",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Translate PDF File",
              "text": "Click Browse or drag and drop your ai pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'quiz-from-pdf': {
      "toolId": "quiz-from-pdf",
      "name": "Quiz from PDF",
      "category": "AI PDF",
      "processingMode": "server",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 26214400,
      "engine": "Google Gemini 1.5 Flash API + pdf.js",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Quiz from PDF File",
              "text": "Click Browse or drag and drop your ai pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'invoice-extractor': {
      "toolId": "invoice-extractor",
      "name": "Invoice Extractor",
      "category": "AI PDF",
      "processingMode": "server",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 26214400,
      "engine": "Google Gemini 1.5 Flash API + pdf.js",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Invoice Extractor File",
              "text": "Click Browse or drag and drop your ai pdf file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'resume-to-pdf': {
      "toolId": "resume-to-pdf",
      "name": "Resume to PDF",
      "category": "Templates",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "stable",
      "howToSteps": [
          {
              "name": "Select Resume to PDF File",
              "text": "Click Browse or drag and drop your templates file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'hindi-invoice-generator': {
      "toolId": "hindi-invoice-generator",
      "name": "Hindi GST Invoice",
      "category": "Templates",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "experimental",
      "howToSteps": [
          {
              "name": "Select Hindi GST Invoice File",
              "text": "Click Browse or drag and drop your templates file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
  'pdf-to-qr': {
      "toolId": "pdf-to-qr",
      "name": "PDF to QR",
      "category": "Templates",
      "processingMode": "local",
      "acceptMimeTypes": [
          "application/pdf"
      ],
      "outputMimeType": "application/pdf",
      "maxBytes": 209715200,
      "engine": "pdf-lib (WASM sandbox)",
      "optionsSchema": {
          "type": "object",
          "properties": {}
      },
      "status": "experimental",
      "howToSteps": [
          {
              "name": "Select PDF to QR File",
              "text": "Click Browse or drag and drop your templates file into the workspace."
          },
          {
              "name": "Configure Options",
              "text": "Adjust optional settings such as page selection, margins, or quality."
          },
          {
              "name": "Run Tool",
              "text": "Click the action button to process the file instantly inside your browser sandbox."
          },
          {
              "name": "Download Result",
              "text": "Save your PDF file directly to your device."
          }
      ],
      "limitations": []
  },
};

export function getToolManifest(slug: string): ToolManifestEntry | undefined {
  return toolManifest[slug];
}

export function getAllToolManifests(): ToolManifestEntry[] {
  return Object.values(toolManifest);
}

export function getToolInputMimeTypes(slug: string): string[] {
  return toolManifest[slug]?.acceptMimeTypes || ['application/pdf'];
}

export function getToolProcessingMode(slug: string): ProcessingMode {
  return toolManifest[slug]?.processingMode || 'local';
}

export function getToolStatus(slug: string): ToolStatus {
  return toolManifest[slug]?.status || 'stable';
}
