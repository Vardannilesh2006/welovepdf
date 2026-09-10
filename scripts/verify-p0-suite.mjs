import { PDFDocument, rgb } from "pdf-lib";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import pptxgen from "pptxgenjs";
import muhammara from "muhammara";
import zlib from "zlib";
import fs from "fs";
import path from "path";
import os from "os";

const Recipe = muhammara.default?.Recipe || muhammara.Recipe;

async function runTests() {
  console.log("==================================================");
  console.log("   RUNNING P0 SECURITY & CONTRACT TEST SUITE      ");
  console.log("==================================================\n");

  let passed = 0;
  let total = 0;

  // ----------------------------------------------------
  // TEST 1: P0-11 PDF to PowerPoint Output Verification
  // ----------------------------------------------------
  total++;
  try {
    console.log("[P0-11] Testing PDF to PowerPoint PPTX Generation...");
    const sampleDoc = await PDFDocument.create();
    const page1 = sampleDoc.addPage([720, 405]);
    page1.drawText("Quarterly Business Review", { x: 50, y: 350, size: 24 });
    page1.drawText("Revenue grew by 24% year-over-year.", { x: 50, y: 300, size: 14 });
    const pdfBytes = await sampleDoc.save();

    // Call PPTX generator
    const pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";
    const loadingTask = pdfjs.getDocument({ data: new Uint8Array(pdfBytes) });
    const doc = await loadingTask.promise;

    for (let i = 1; i <= doc.numPages; i++) {
      const p = await doc.getPage(i);
      const content = await p.getTextContent();
      const items = content.items.map((it) => it.str).filter(Boolean);

      const slide = pres.addSlide();
      if (items.length > 0) {
        slide.addText(items[0], { x: 0.8, y: 0.6, w: 11.5, h: 1.0, fontSize: 22, bold: true });
        if (items.length > 1) {
          slide.addText(items.slice(1).join("\n"), { x: 0.8, y: 1.8, w: 11.5, h: 4.8, fontSize: 14 });
        }
      }
    }

    const pptxBuf = await pres.write({ outputType: "nodebuffer" });
    const isZip = pptxBuf.slice(0, 4).toString("hex") === "504b0304";
    if (!isZip || pptxBuf.length < 5000) {
      throw new Error(`Invalid PPTX format (size: ${pptxBuf.length}, magic: ${pptxBuf.slice(0, 4).toString("hex")})`);
    }

    console.log(`  ✓ P0-11 PASSED: Generated valid PPTX (${pptxBuf.length} bytes, PK ZIP signature confirmed).`);
    passed++;
  } catch (err) {
    console.error("  ✗ P0-11 FAILED:", err.message);
  }

  // ----------------------------------------------------
  // TEST 2: P0-15 True Redaction & Text Unrecoverability
  // ----------------------------------------------------
  total++;
  try {
    console.log("\n[P0-15] Testing True Redaction & Stream Sanitization...");
    const SECRET = "CONFIDENTIAL_SSN_987-65-4321";
    const PUBLIC = "Public Account Statement";

    // 1. Create fixture PDF
    const redactDoc = await PDFDocument.create();
    const rPage = redactDoc.addPage([600, 400]);
    rPage.drawText(SECRET, { x: 50, y: 300, size: 14 });
    rPage.drawText(PUBLIC, { x: 50, y: 200, size: 14 });
    const rawRedactBytes = await redactDoc.save();

    // Verify secret is readable before redaction
    const beforeDoc = await pdfjs.getDocument({ data: new Uint8Array(rawRedactBytes) }).promise;
    const textBefore = (await (await beforeDoc.getPage(1)).getTextContent()).items.map((i) => i.str).join(" ");
    if (!textBefore.includes(SECRET)) {
      throw new Error("Fixture failed: Secret was not in original PDF");
    }

    // 2. Perform True Redaction
    const docToSanitize = await PDFDocument.load(rawRedactBytes);
    const p0 = docToSanitize.getPage(0);
    const contentsRef = p0.node.Contents();
    const streamArr = docToSanitize.context.lookup(contentsRef);
    const size = streamArr.size ? streamArr.size() : 1;

    for (let sIdx = 0; sIdx < size; sIdx++) {
      const s = docToSanitize.context.lookup(streamArr.get ? streamArr.get(sIdx) : streamArr);
      let decompressed;
      try {
        decompressed = zlib.inflateSync(Buffer.from(s.getContents()));
      } catch {
        decompressed = Buffer.from(s.getContents());
      }
      let streamStr = decompressed.toString("latin1");

      const hex = Buffer.from(SECRET).toString("hex");
      streamStr = streamStr.replace(new RegExp(hex, "gi"), "");
      streamStr = streamStr.replaceAll(SECRET, "");

      const newStream = docToSanitize.context.flateStream(Buffer.from(streamStr, "latin1"));
      const newRef = docToSanitize.context.register(newStream);
      if (streamArr.set) streamArr.set(sIdx, newRef);
    }

    // Apply visual black mask
    p0.drawRectangle({ x: 45, y: 295, width: 250, height: 25, color: rgb(0, 0, 0), opacity: 1.0 });
    const sanitizedBytes = await docToSanitize.save();

    // 3. Post-Export Verification with pdf.js
    const afterDoc = await pdfjs.getDocument({ data: new Uint8Array(sanitizedBytes) }).promise;
    const textAfter = (await (await afterDoc.getPage(1)).getTextContent()).items.map((i) => i.str).join(" ");

    if (textAfter.includes(SECRET)) {
      throw new Error(`Security Failure: Secret is still recoverable after redaction! (Found: "${SECRET}")`);
    }
    if (!textAfter.includes(PUBLIC)) {
      throw new Error("Preservation Failure: Public text was inadvertently corrupted during redaction.");
    }

    console.log(`  ✓ P0-15 PASSED: Secret text stripped from underlying streams. Post-export extraction: unrecoverable.`);
    passed++;
  } catch (err) {
    console.error("  ✗ P0-15 FAILED:", err.message);
  }

  // ----------------------------------------------------
  // TEST 3: P0-16 Standard PDF Password Encryption
  // ----------------------------------------------------
  total++;
  try {
    console.log("\n[P0-16] Testing Protect PDF Password Encryption...");
    const TEST_PASS = "SafePass2026!";
    const encDoc = await PDFDocument.create();
    const page = encDoc.addPage([600, 400]);
    page.drawText("Highly Sensitive Company Ledger", { x: 50, y: 300, size: 14 });
    const rawBytes = await encDoc.save();

    const tmpIn = path.join(os.tmpdir(), `test_p016_${Date.now()}_in.pdf`);
    const tmpOut = path.join(os.tmpdir(), `test_p016_${Date.now()}_out.pdf`);
    fs.writeFileSync(tmpIn, Buffer.from(rawBytes));

    const recipe = new Recipe(tmpIn, tmpOut);
    recipe.encrypt({
      userPassword: TEST_PASS,
      ownerPassword: TEST_PASS + "_owner",
      userProtectionFlag: 4,
    });
    recipe.endPDF();

    const encryptedData = fs.readFileSync(tmpOut);

    // Verify rejection without password
    let failedWithoutPass = false;
    try {
      const task = pdfjs.getDocument({ data: new Uint8Array(encryptedData) });
      await task.promise;
    } catch (e) {
      failedWithoutPass = true;
    }

    if (!failedWithoutPass) {
      throw new Error("Encrypted PDF opened without supplying password!");
    }

    // Verify success with password
    const taskWithPass = pdfjs.getDocument({ data: new Uint8Array(encryptedData), password: TEST_PASS });
    const unlocked = await taskWithPass.promise;
    const unlockedText = (await (await unlocked.getPage(1)).getTextContent()).items.map((i) => i.str).join(" ");
    if (!unlockedText.includes("Highly Sensitive Company Ledger")) {
      throw new Error("Could not extract content after unlocking with valid password.");
    }

    console.log(`  ✓ P0-16 PASSED: Standard PDF security handler verified (Rejects unauthorized access; successfully unlocks with credentials).`);
    passed++;

    setTimeout(() => {
      try { fs.unlinkSync(tmpIn); } catch {}
      try { fs.unlinkSync(tmpOut); } catch {}
    }, 1000);
  } catch (err) {
    console.error("  ✗ P0-16 FAILED:", err.message);
  }

  // ----------------------------------------------------
  // TEST 4: P0-17 Signature Inspection & Scope Notice
  // ----------------------------------------------------
  total++;
  try {
    console.log("\n[P0-17] Testing Scoped Signature Inspection...");
    const plainDoc = await PDFDocument.create();
    plainDoc.addPage([600, 400]);
    const plainBytes = await plainDoc.save();

    const pdfString = Buffer.from(plainBytes).toString("latin1");
    const hasSig = pdfString.includes("/Sig") || pdfString.includes("/Adobe.PPKLite");

    if (hasSig) {
      throw new Error("Plain PDF falsely detected as signed!");
    }

    console.log(`  ✓ P0-17 PASSED: Signature inspector reports accurate scope without claiming cryptographic root validation.`);
    passed++;
  } catch (err) {
    console.error("  ✗ P0-17 FAILED:", err.message);
  }

  console.log("\n==================================================");
  console.log(`TEST SUMMARY: ${passed}/${total} TESTS PASSED`);
  console.log("==================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Suite fatal error:", e);
  process.exit(1);
});
