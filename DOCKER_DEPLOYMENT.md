# 🐳 WeLovePDF — Docker Production Deployment Guide

This guide details how to build, deploy, manage, and scale the **WeLovePDF** web application using Docker and Docker Compose on a Linux VPS / Cloud server (Ubuntu, Debian, RHEL, AWS EC2, DigitalOcean, Hetzner).

---

## 📋 System Requirements

| Resource | Minimum Requirement | Recommended for High Traffic |
|---|---|---|
| **OS** | Linux (Ubuntu 22.04 LTS / Debian 12) | Linux (Ubuntu 24.04 LTS) |
| **CPU** | 1 Core | 2 - 4 Cores |
| **RAM** | 1 GB | 2 - 4 GB |
| **Disk** | 10 GB SSD | 25 GB SSD |
| **Docker** | Docker Engine 24.0+ | Docker Engine 26.0+ |
| **Docker Compose** | Compose v2.20+ | Compose v2.26+ |
| **Open Ports** | Port 80 (HTTP), Port 443 (HTTPS) | Port 80, Port 443 |

---

## 🚀 Step-by-Step Production Deployment

### Step 1: Clone Repository
```bash
git clone https://github.com/Vardannilesh2006/we-love-pdf.git /var/www/welovepdf
cd /var/www/welovepdf
```

### Step 2: Configure Environment Secrets
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
nano .env
```
Provide your production secret keys:
```env
GEMINI_API_KEY=your_actual_production_gemini_api_key
PORT=3000
NODE_ENV=production
```

> [!CAUTION]
> Never commit `.env` or production secrets to Git. `.env` is listed in `.dockerignore` and `.gitignore`.

### Step 3: Build & Start Containers
```bash
docker compose build --no-cache
docker compose up -d
```

### Step 4: Verify Container Health & Logs
```bash
# Check running container status
docker compose ps

# View application health status
curl -i http://localhost/api/health

# Tail live application logs
docker compose logs -f
```

---

## 🛠️ Useful Management Commands

| Action | Command |
|---|---|
| **Build images** | `docker compose build` |
| **Start in background** | `docker compose up -d` |
| **Stop containers** | `docker compose down` |
| **Restart services** | `docker compose restart` |
| **Check container status** | `docker compose ps` |
| **View live logs** | `docker compose logs -f` |
| **Inspect app container logs** | `docker compose logs -f app` |
| **Inspect proxy logs** | `docker compose logs -f proxy` |
| **Execute command in container** | `docker compose exec app node -v` |
| **Prune unused Docker data** | `docker system prune -f` |

---

## 🌐 Local Development Workflow

To run local development with hot-reloading:

```bash
docker compose -f docker-compose.dev.yml up --build
```
Access the dev server at `http://localhost:3000`.

---

## 🔒 Security & Data Safety Features

1. **Non-Root Execution:** The Next.js container runs under an unprivileged `nextjs` user (UID 1001, GID 1001).
2. **`no-new-privileges` Security Opt:** Container privileges cannot be escalated.
3. **Stateless Processing:** Files are processed in-memory buffers (`Buffer.from()`) and garbage collected post-response. Zero PDF files are saved to container disks.
4. **Internal Bridge Network:** The Next.js app container port `3000` is **not exposed publicly** to the internet; it is strictly accessible via Nginx over the internal `welovepdf-net` bridge network.
5. **50MB Upload Guard:** Nginx (`client_max_body_size 50M;`) and Next.js route handlers validate file size limits to prevent Denial of Service (DoS) attacks.
