# 🏗️ WeLovePDF — Docker Architecture & System Report

---

## 1. Architecture Overview

### Existing Architecture (Pre-Docker)
Previously, the application ran directly on bare metal / host Node.js runtime or Vercel serverless platform. Heavy dependencies (font rendering, native memory buffers, Node version variations) depended on host OS configuration.

### New Containerized Architecture (Docker)

```
                       [ Internet Users ]
                               |
                               v
                       [ Port 80 (HTTP) ]
                               |
                               v
                    +---------------------+
                    |   welovepdf-proxy   |
                    | (Nginx 1.25 Alpine) |
                    +---------------------+
                               |
               (Internal Bridge Network: welovepdf-net)
                               |
                               v
                    +---------------------+
                    |    welovepdf-app    |
                    | (Node 20 Standalone)|
                    +---------------------+
                               |
             +-----------------+-----------------+
             |                                   |
             v                                   v
  [ In-Browser WASM Processing ]    [ External Google Gemini API ]
  (PDF.js / pdf-lib in Client)      (HTTPS Egress for AI Tools)
```

---

## 2. Containerized Services Breakdown

| Service Name | Container Name | Image Base | Purpose | Port Exposure |
|---|---|---|---|---|
| **`app`** | `welovepdf-app` | `node:20-alpine` (Multi-stage) | Next.js 14 SSG frontend + API processing routes (`/api/process/[tool]`) | Internal `3000` (Not exposed to host) |
| **`proxy`** | `welovepdf-proxy` | `nginx:1.25-alpine` | Reverse proxy, TLS, 50MB upload limits, static caching, security headers | Host `80:80` |

---

## 3. PDF Dependencies & System Packages Audit

| Package / Library | Category | Feature / Tool Using It | Why Required |
|---|---|---|---|
| **`pdf-lib`** | Pure JS / Wasm | Merge, Split, Crop, Rotate, Protect, Unlock, Bookmarks | Fast, in-memory PDF page manipulation without binary dependencies. |
| **`jimp`** | Pure JS | Image Filters, Deskew, Contrast, Background Removal | In-memory image processing for scanned PDF page optimizations. |
| **`tesseract.js`** | JS / Wasm | OCR PDF, Text Extraction | Extracting selectable text from scanned PDF page images. |
| **`ca-certificates`** | System APK | Gemini AI API Egress | Ensures trusted SSL/TLS communication with Google Generative AI API endpoints. |
| **`fontconfig` & `ttf-dejavu`**| System APK | PDF Font Rendering | Standard font metric calculation across Linux Alpine container environments. |

---

## 4. PDF Processing & Data Flow

### Upload & Memory Processing Flow:
1. **User Request**: User selects PDF files in web browser UI.
2. **Client-Side WASM Execution (Default)**: PDF.js & pdf-lib execute directly inside the user's browser memory. Zero files are uploaded.
3. **API Processing Flow (Server Fallback / AI Tools)**:
   - Request reaches Nginx (`welovepdf-proxy`).
   - Nginx validates `client_max_body_size 50M;` and proxies request to `app:3000`.
   - Next.js route handler converts upload stream to in-memory `Buffer` (`Buffer.from(await f.arrayBuffer())`).
   - Operation completes in RAM; output Uint8Array stream returned to user as `Content-Disposition: attachment`.
   - In-memory Buffer is garbage collected by V8 engine immediately post-response.

### Storage Strategy:
- **Zero Disk Storage**: No user uploads or processed PDF files are saved to container disks or database volumes.
- **Stateless Operation**: Container filesystems remain 100% immutable during runtime.

---

## 5. Security Measures Implemented

1. **Non-Root System User**: App runs as `nextjs` (UID 1001), preventing host compromise if application code is exploited.
2. **`no-new-privileges`**: Prevents child processes from gaining elevated privileges.
3. **Internal Bridge Network**: Port 3000 is unreachable directly from the host or external internet; all traffic must pass through Nginx validation.
4. **File Size Guards**: 50MB strict limit enforced at both Nginx proxy and Next.js route handler level.
5. **Magic Number File Signature Validation**: File buffers are validated using header hex signatures (`%PDF-` for PDFs, `\x89PNG` for PNGs, `\xFF\xD8\xFF` for JPEGs) to prevent malicious payload executions.

---

## 6. Resource Limits & Health Checks

- **CPU Limit**: `2.0` cores max for `app`, `1.0` core max for `proxy`.
- **RAM Limit**: `1024M` memory limit for `app`, `256M` memory limit for `proxy`.
- **App Health Check**: `wget --spider http://127.0.0.1:3000/api/health` every 30 seconds.
- **Proxy Health Check**: `nginx -t` configuration check every 30 seconds.

---

## 7. Explicit Architectural Assessment

### Question: "Does this project actually benefit from Docker, and what would break or become harder if Docker were removed?"

**Answer Based on Actual Codebase Inspection**:

1. **Why Docker Benefits WeLovePDF**:
   - **Reproducible Node 20 Runtime & Font Rendering**: Ensures identical font metrics, V8 memory garbage collection, and PDF.js WebAssembly performance regardless of whether deployed on Ubuntu, Debian, AWS, or local developer Windows/macOS.
   - **Nginx Protection Layer**: Nginx provides essential client body size limiting (50MB) and rate-limiting to protect Node.js event loops from heavy PDF buffer attacks.
   - **One-Command Deployment**: Simplifies deployment down to `docker compose up -d` without needing manual Node.js, Nginx, or Systemd service configuration.

2. **What Would Break or Become Harder Without Docker**:
   - **Environment Drift**: Inconsistent Node.js versions or missing `fontconfig` packages on raw VPS setups would cause silent PDF text rendering distortions.
   - **Manual System Security Setup**: Without container non-root isolation (`nextjs` UID 1001) and Docker security options (`no-new-privileges`), securing a Node.js process against malicious file buffer exploits requires complex manual Linux OS hardening.
