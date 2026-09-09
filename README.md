<div align="center">

# 🪐 4nu81x // Neural Grid Active

**Offensive Security Tradecraft Developer · CTF Architect · AI Rig Systems Integrator**

[![Version 3.0.1](https://img.shields.io/badge/Note81x-v3.0.1-00ff66?style=for-the-badge&logo=googlechrome&logoColor=black)](https://github.com/4nu81x/4nu81x/releases/tag/v3.0.1)
[![Manifest V3](https://img.shields.io/badge/Manifest-MV3-00b4d8?style=for-the-badge&logo=mozilla-firefox&logoColor=white)](https://github.com/4nu81x/4nu81x)
[![LLM Backend](https://img.shields.io/badge/AI-DeepSeek--V2-7209b7?style=for-the-badge&logo=python&logoColor=white)](https://github.com/4nu81x/4nu81x)
[![Security Status](https://img.shields.io/badge/Status-OPERATIONAL-38b000?style=for-the-badge&logo=kalilinux&logoColor=white)](https://4nu81x.com)

<br/>

<p align="center">
  <img src="assets/contributions_2026.svg?v=6" alt="4nu81x 2026 Grid Telemetry" width="100%" style="margin-bottom: 10px;" />
  <br/>
  <img src="assets/contributions_2025.svg?v=6" alt="4nu81x 2025 Grid Telemetry" width="100%" />
</p>

</div>

---

## ⚡ Main Directives & Profile Telemetry

```text
 _  _                 ___  _       
| || | _ __   _  _   ( _ )/ |__  __
|_  _|| '_ \ | || |  / _ \| |\ \/ /
  |_|  |_|_|_|\_,_|  \___/|_|/_/\_\
                                   
// UPLINK ESTABLISHED // USER: 4nu81x // SECURE: VERIFIED //

[ SYSTEM MATRIX ]
-----------------------------------------------------------------
[ DECK ]      :: Ubuntu / Custom Cyberdeck v3
[ RUNTIME ]   :: Node.js / TypeScript / Python 3.11 / Bash
[ AGENTS ]    :: 0xJackal - Universal AI Rig Architect
[ EXTENSION ] :: Note81x v3.0.1 (Operational Filter Engine)
[ PROTOCOL ]  :: HTTPS / SSH / TLS 1.3 / localtunnel
-----------------------------------------------------------------
```

---

## 🚀 Featured Tool: Note81x :: Operational Filter (Version 3.0.1)

> **Status:** `OPERATIONAL (v3.0.1)` &nbsp;|&nbsp; **Direct Download:** [![Download Release](https://img.shields.io/badge/Download-Note81x--v3.0.1.zip-00ff66?style=flat-square&logo=github)](https://github.com/4nu81x/4nu81x/releases/download/v3.0.1/Note81x-v3.0.1.zip)

**Note81x v3.0.1** is a high-speed Manifest V3 browser extension built to ingest complex cybersecurity research, lab write-ups (HTB, OSCP, THM), and technical documentation, transforming raw web pages into structured, Obsidian-ready Markdown notes via local DeepSeek LLM inference.

### 🌟 Version 3.0.1 Features & Improvements

| Feature | Description |
| :--- | :--- |
| ⚡ **V3 Engine Upgrade** | Complete architectural upgrade from legacy mobile v2 sub-systems to full Manifest V3 desktop & cross-browser production engine. |
| 💾 **Persistent Session Auto-Save** | Automatically retains and restores notes across popup reopens using `chrome.storage.local`. |
| 🗑️ **One-Click Session Purge** | Dedicated `Clear Session` action button with warning safety styling that resets local storage and cleanly terminates UI. |
| 🎯 **Smart DOM Content Extraction** | Prioritizes target content containers (`article`, `main`, `#main-content`, `.markdown-body`), eliminating navigation and footer noise. |
| 🧠 **4-Part Technical Research Prompt** | Structurally extracts: 1. The What (Taxonomy & Core Concept), 2. The Vs (Replacements & Boundaries), 3. The Engine (Input/Mechanism/Output), and 4. The "So What?" (Value, Trade-offs, Core Decision Rule). |
| 🎨 **Cyberpunk Terminal Design** | Obsidian dark canvas (`#0a0a0c`), neon green accents (`#00ff66`), glowing hover elements, and auto code-block cleaning. |
| 🦊 **Cross-Browser MV3 Support** | Native support for Google Chrome, Brave, Microsoft Edge, and Mozilla Firefox (Gecko ID `note81x@local.internal`). |

---

### 📦 Quick Extension Installation

1. **Download Package**: Download [`Note81x-v3.0.1.zip`](https://github.com/4nu81x/4nu81x/releases/download/v3.0.1/Note81x-v3.0.1.zip) from GitHub Releases.
2. **Unpack Extension**: Extract zip contents to a local folder.
3. **Load in Browser**:
   * **Chrome / Brave / Edge**: Go to `chrome://extensions` &rarr; enable **Developer mode** &rarr; click **Load unpacked**.
   * **Firefox**: Go to `about:debugging#/runtime/this-firefox` &rarr; click **Load Temporary Add-on** &rarr; select `manifest.json`.

---

### 🤖 Local LLM Backend Setup & Installation Guide

Note81x connects to a local, private LLM server running **DeepSeek-Coder-V2-Lite-Instruct** listening at `http://127.0.0.1:8080/v1/chat/completions`. Follow either method below to set up your backend:

#### Option A: Automated One-Line Setup (Recommended for Linux/macOS)

Run the included automated launch script:
```bash
./start_backend.sh
```
*The script checks for `llama-server`, automatically fetches the model file from HuggingFace if missing, and launches the server with CORS enabled.*

---

#### Option B: Manual Setup via `llama-server` (`llama.cpp`)

1. **Build or Install `llama.cpp`**:
   ```bash
   git clone https://github.com/ggerganov/llama.cpp
   cd llama.cpp && cmake -B build && cmake --build build --config Release -j$(nproc)
   ```

2. **Download Model File (`DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf`)**:
   ```bash
   wget -c https://huggingface.co/bartowski/DeepSeek-Coder-V2-Lite-Instruct-GGUF/resolve/main/DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf
   ```

3. **Start the LLM Endpoint**:
   ```bash
   ./build/bin/llama-server \
     -m DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf \
     --host 127.0.0.1 \
     --port 8080 \
     -c 40960 \
     --alias DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf \
     --cors "*"
   ```

---

#### Option C: Alternative Setup via `Ollama`

If you use **Ollama**, run the DeepSeek model and reverse-proxy or point to port `8080`:
```bash
ollama run deepseek-coder-v2:16b-lite-instruct-q4_K_M
```
*(Ensure `OLLAMA_ORIGINS="chrome-extension://*"` is set to permit browser requests).*

---

## 🛠️ Active Repositories & Toolsets

| Repository | Status | Primary Function |
| :--- | :---: | :--- |
| **[4nu81x / 4nu81x](https://github.com/4nu81x/4nu81x)** | `v3.0.1` | Profile Neural Grid & Note81x Operational Filter Extension codebase. |
| **[n0t381x](https://github.com/4nu81x/n0t381x)** | `v3.0.1` | Official documentation mirror and release distribution for Note81x. |
| **[main-website](https://github.com/4nu81x/main-website)** | `ONLINE` | Terminal-style portfolio site with Linux CLI aesthetics & interactive commands. |
| **[ubuntu-offsec-setup](https://github.com/4nu81x/ubuntu-offsec-setup)** | `ONLINE` | Automated bash provisioning utility to configure offensive security workstations. |
| **[0xJackal](https://github.com/4nu81x/0xJackal)** | `DEPLOYED` | Universal AI Rig Architect and custom agent integration systems. |
| **[git-art](https://github.com/4nu81x/git-art)** | `ONLINE` | Custom animated SVG contribution grid generator for GitHub profiles. |

---

## 💻 Tech Stack & Capabilities

```text
[ PARADIGMS ] :: Offensive Security / Automation / Custom AI Rigs / Extension Architectures
[ LANGUAGES ] :: TypeScript / JavaScript (ESNext) / Python 3 / Bash Shell / HTML5 / CSS3
[ PLATFORMS ] :: Chrome Extensions MV3 / Firefox WebExtensions / Linux (Ubuntu) / Node.js
[ AI & LLM  ] :: DeepSeek-Coder-V2 / llama-server / OpenAI API Protocol / Ollama
[ TARGETS   ] :: HackTheBox / OffSec OSCP / TryHackMe / Custom Lab Automation
```

---

## 🧪 Connection Protocols

* 🌐 **Web Terminal:** [https://4nu81x.com](https://4nu81x.com)
* ✉️ **Encrypted Contact:** `4nu81x@4sec.online`
* 🐙 **GitHub Profile:** [@4nu81x](https://github.com/4nu81x)

```text
[+] PING SUCCESSFUL. SESSION ESTABLISHED. 4NU81X NEURAL GRID READY.
```
