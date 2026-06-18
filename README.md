# Note81x - Operational Filter (n0t381x)

**Note81x** is a lightweight, high-speed browser extension designed specifically for offensive security professionals, penetration testers, and CTF/exam takers (e.g., OSCP, HTB). It automatically digests dense academic texts or lab instructions from active tabs, filters out the non-operational filler, and outputs structured, Obsidian-ready Markdown documentation using a local Large Language Model (LLM).

---

## Key Features

- **3-Point Operational Filter**: Strict extraction focusing only on what matters during exams or operations:
  - **Indicators (Where)**: File extensions, vulnerable headers, URL paths, ports, etc.
  - **Execution & Syntax (How)**: Exact commands, payloads, and tool invocation syntaxes.
  - **Bypasses (What If)**: Evasion techniques and alternative payloads.
- **Fluff & Theory Removal**: Automatically discards background history, GUI setup steps, and theoretical explanations, saving precious reading time.
- **Auto-Generated Cheatsheet**: Collects all payloads, commands, and script syntaxes into a clean, raw code block at the bottom for quick copy-pasting.
- **One-Click Obsidian Export**: Easily copy the generated Markdown formatted notes straight to your clipboard with a single click.

---

## Browser Compatibility

Note81x is built on **Manifest V3** with cross-browser compatibility. It runs on:

| Browser | Engine | Installation Method |
| :--- | :--- | :--- |
| **Google Chrome** | Chromium | Load Unpacked Extension |
| **Brave** | Chromium | Load Unpacked Extension |
| **Microsoft Edge** | Chromium | Load Unpacked Extension |
| **Opera** | Chromium | Load Unpacked Extension |
| **Vivaldi** | Chromium | Load Unpacked Extension |
| **Mozilla Firefox** | Gecko | Load Temporary Add-on (via `about:debugging`) |

---

## Prerequisites (Local LLM Integration)

Note81x operates completely locally to keep your exam data and targets private. By default, it expects a local API server running on port `8080` loaded with a code/instruct model.

### 1. Download the Model
We recommend using **DeepSeek-Coder-V2-Lite-Instruct (Q4_K_M)** or similar models.
- Download the GGUF file from Hugging Face (e.g., [DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf](https://huggingface.co/mradermacher/DeepSeek-Coder-V2-Lite-Instruct-GGUF)).

### 2. Start the LLM Server (via `llama.cpp`)
Run the model using `llama-server` to expose an OpenAI-compatible API endpoint:

```bash
llama-server \
  -m /path/to/DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf \
  -c 4096 \
  --port 8080 \
  --host 127.0.0.1
```

*Note: Ensure the server is listening on `127.0.0.1:8080` so that `popup.js` can connect to the `/v1/chat/completions` endpoint.*

---

## Installation Guide

### For Chromium-Based Browsers (Chrome, Brave, Edge, Opera, Vivaldi)

1. Clone or download this repository to your local system:
   ```bash
   git clone https://github.com/4nu81x/n0t381x.git
   ```
2. Open your browser and navigate to the Extensions page:
   - Chrome / Chromium: `chrome://extensions/`
   - Brave: `brave://extensions/`
   - Microsoft Edge: `edge://extensions/`
3. Toggle the **Developer mode** switch (usually located in the top-right corner) to **ON**.
4. Click **Load unpacked** (top-left).
5. Select the `n0t381x` directory (the folder containing `manifest.json`).

---

### For Mozilla Firefox

1. Open Firefox and type `about:debugging` in the address bar.
2. Click on **This Firefox** in the left sidebar.
3. Click the **Load Temporary Add-on...** button.
4. Select the `manifest.json` file inside the `n0t381x` folder.
5. The extension will remain active until you restart Firefox.

---

## Usage

1. Start your local LLM server (`llama-server`) with the recommended settings.
2. Navigate to your target educational page, CTF lab write-up, or documentation page (e.g., HackTheBox Academy, OffSec lab text).
3. Click the **Note81x** extension icon in your browser toolbar.
4. Click the **Scan & Format Notes** button.
5. Once the processing is complete, the structured Markdown results will appear in the output text area.
6. Click **Copy to Obsidian** to copy the formatted Markdown straight to your clipboard, ready to be pasted into your Obsidian notes repo.

---

## Project Structure

```text
n0t381x/
├── manifest.json   # Extension configuration (Manifest V3)
├── popup.html      # UI structure of the extension popup
├── popup.js        # Extension scripting, text scraping, and API interaction logic
└── README.md       # Project documentation
```
