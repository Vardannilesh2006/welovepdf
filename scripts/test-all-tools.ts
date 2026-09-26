import { NextRequest } from "next/server";
import { POST } from "../app/api/process/[tool]/route";
import { tools } from "../app/data/tools-config";
import { PDFDocument } from "pdf-lib";
import { Jimp } from "jimp";
import fs from "fs";
import path from "path";

interface TestResult {
  slug: string;
  name: string;
  category: string;
  passed: boolean;
  status: number;
  mimeType: string;
  outputSize: number;
  signature: string;
  error?: string;
}

async function runAllToolsTest() {
  console.log("================================================================");
  console.log("   WELOVEPDF — FULL-SITE AUTOMATED TOOL VALIDATION SWEEP       ");
  console.log("================================================================\n");

  // 1. Create Test Fixtures
  // A. Valid 3-page PDF fixture
  const pdfDoc = await PDFDocument.create();
  const p1 = pdfDoc.addPage([595, 842]);
  p1.drawText("WeLovePDF Validation Fixture - Page 1");
  const p2 = pdfDoc.addPage([595, 842]);
  p2.drawText("WeLovePDF Validation Fixture - Page 2");
  const p3 = pdfDoc.addPage([595, 842]);
  p3.drawText("WeLovePDF Validation Fixture - Page 3");
  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes as any], { type: "application/pdf" });

  // B. Valid JPEG fixture
  const jimpJpg = new Jimp({ width: 200, height: 200, color: 0xff0000ff });
  const jpgBuffer = await jimpJpg.getBuffer("image/jpeg");
  const jpgBlob = new Blob([jpgBuffer as any], { type: "image/jpeg" });

  // C. Valid PNG fixture
  const jimpPng = new Jimp({ width: 200, height: 200, color: 0x00ff00ff });
  const pngBuffer = await jimpPng.getBuffer("image/png");
  const pngBlob = new Blob([pngBuffer as any], { type: "image/png" });

  const results: TestResult[] = [];

  console.log(`Discovered ${tools.length} live tools in tools-config.ts.\nTesting each tool with real payloads...\n`);

  for (let idx = 0; idx < tools.length; idx++) {
    const tool = tools[idx];
    const slug = tool.slug;
    process.stdout.write(`[${idx + 1}/${tools.length}] Testing ${slug.padEnd(28)} `);

    try {
      const formData = new FormData();

      // Assign input payload based on tool category and requirements
      const isImageTool = ["jpg-to-pdf", "png-to-pdf", "image-to-pdf"].includes(slug);
      const isGenerator = [
        "text-to-pdf",
        "markdown-to-pdf",
        "html-to-pdf",
        "url-to-pdf",
        "hindi-invoice-generator",
        "pdf-to-qr",
        "resume-to-pdf",
        "pdf-reader",
        "search-in-pdf",
        "invert-colors",
      ].includes(slug);

      if (isImageTool) {
        formData.append("files", jpgBlob, "image1.jpg");
        formData.append("files", pngBlob, "image2.png");
      } else if (!isGenerator) {
        formData.append("files", pdfBlob, "document.pdf");
        if (slug === "merge-pdf" || slug === "compare-pdf") {
          formData.append("files", pdfBlob, "document2.pdf");
        }
      }

      // Add tool-specific options
      if (slug === "protect-pdf") formData.append("password", "TestPass123!");
      if (slug === "unlock-pdf") formData.append("password", "TestPass123!");
      if (slug === "watermark-pdf") formData.append("watermarkText", "VERIFIED");
      if (slug === "header-footer") formData.append("text", "Header Test");
      if (slug === "page-numbers") formData.append("position", "bottom-center");
      if (slug === "rotate-pdf") formData.append("quality", "90");
      if (slug === "crop-pdf") {
        formData.append("cropLeft", "10");
        formData.append("cropRight", "10");
        formData.append("cropTop", "10");
        formData.append("cropBottom", "10");
      }
      if (slug === "split-pdf" || slug === "delete-pages" || slug === "extract-pages") {
        formData.append("pages", "1-2");
      }
      if (slug === "sign-pdf") {
        formData.append("signatureText", "Nilesh Verma");
        formData.append("signerTitle", "Lead Engineer");
      }
      if (slug === "resume-to-pdf") {
        formData.append("fullName", "Nilesh Verma");
        formData.append("email", "nilesh@welovepdf.best");
        formData.append("title", "Lead Architect");
      }
      if (slug === "pdf-to-qr") {
        formData.append("qrUrl", "https://www.welovepdf.best");
      }
      if (slug === "text-to-pdf" || slug === "markdown-to-pdf" || slug === "html-to-pdf") {
        formData.append("text", "# WeLovePDF Document\n- Tested and Verified\n- Local Browser Sandbox");
      }

      const req = new NextRequest(`http://localhost:3000/api/process/${slug}`, {
        method: "POST",
        body: formData,
        headers: {
          "x-test-bypass": "welovepdf-test",
        },
      });

      const res = await POST(req, { params: { tool: slug } });
      const status = res.status;
      const mime = res.headers.get("content-type") || "";
      const buf = Buffer.from(await res.arrayBuffer());
      const size = buf.length;

      // Verification checks
      let passed = false;
      let signature = "UNKNOWN";

      if (status === 200 && size > 50) {
        if (mime.includes("application/pdf") || buf.slice(0, 4).toString("utf-8").startsWith("%PDF")) {
          passed = true;
          signature = "PDF (%PDF-)";
        } else if (mime.includes("presentation") || buf.slice(0, 4).toString("hex") === "504b0304") {
          passed = true;
          signature = "PPTX (ZIP PK)";
        } else if (mime.includes("msword") || mime.includes("rtf") || buf.slice(0, 5).toString("utf-8").startsWith("{\\rtf")) {
          passed = true;
          signature = "Word (RTF/DOC)";
        } else if (mime.includes("image/jpeg") || buf.slice(0, 3).toString("hex") === "ffd8ff") {
          passed = true;
          signature = "JPEG (0xFFD8)";
        } else if (mime.includes("image/png") || buf.slice(0, 4).toString("hex") === "89504e47") {
          passed = true;
          signature = "PNG (0x89PNG)";
        } else if (mime.includes("text/plain") || mime.includes("text/markdown") || mime.includes("text/html") || mime.includes("text/csv")) {
          passed = size > 10;
          signature = `TEXT (${mime.split(";")[0]})`;
        } else {
          passed = size > 100;
          signature = mime;
        }
      }

      results.push({
        slug,
        name: tool.name,
        category: tool.category,
        passed,
        status,
        mimeType: mime.split(";")[0],
        outputSize: size,
        signature,
        error: passed ? undefined : `Status ${status} (Size: ${size})`,
      });

      if (passed) {
        console.log(`✓ PASS (${signature}, ${size} B)`);
      } else {
        console.log(`✗ FAIL (Status: ${status}, ${size} B)`);
      }
    } catch (err: any) {
      console.log(`✗ ERROR: ${err.message}`);
      results.push({
        slug,
        name: tool.name,
        category: tool.category,
        passed: false,
        status: 500,
        mimeType: "error",
        outputSize: 0,
        signature: "CRASH",
        error: err.message,
      });
    }
  }

  // 2. Generate TOOL_STATUS.md
  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.length - passCount;
  const passPercentage = Math.round((passCount / results.length) * 100);

  let md = `# WeLovePDF.best — Complete Tool Functionality Status (TOOL_STATUS.md)\n\n`;
  md += `> **Audit Generated:** ${new Date().toISOString()}\n`;
  md += `> **Total Live Tools Checked:** ${results.length}\n`;
  md += `> **Passed:** ${passCount} | **Failed:** ${failCount}\n`;
  md += `> **System Health:** **${passPercentage}% Operational**\n\n`;
  md += `----\n\n`;
  md += `## 📊 Master Verification Table\n\n`;
  md += `| # | Tool Name | Slug | Category | Result | HTTP | MIME Type | Output Size | Payload Signature |\n`;
  md += `|---|---|---|---|:---:|:---:|---|---|---|\n`;

  results.forEach((r, idx) => {
    const icon = r.passed ? "✅ PASS" : "❌ FAIL";
    md += `| ${idx + 1} | **${r.name}** | \`${r.slug}\` | ${r.category} | ${icon} | ${r.status} | \`${r.mimeType}\` | ${r.outputSize} B | ${r.signature} |\n`;
  });

  md += `\n----\n`;
  md += `*Generated programmatically by \`npm run test:all-tools\` across all registered tool routes.*\\n`;

  const statusPath = path.resolve(process.cwd(), "TOOL_STATUS.md");
  fs.writeFileSync(statusPath, md, "utf-8");

  console.log("\n================================================================");
  console.log(`   SWEEP COMPLETE: ${passCount}/${results.length} PASSED (${passPercentage}%)`);
  console.log(`   Written status report to: TOOL_STATUS.md`);
  console.log("================================================================\n");

  if (failCount > 0) {
    process.exit(1);
  }
}

runAllToolsTest().catch((err) => {
  console.error("Fatal test sweep error:", err);
  process.exit(1);
});
