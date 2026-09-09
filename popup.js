document.addEventListener('DOMContentLoaded', async () => {
    const outputArea = document.getElementById('output');

    // Restore saved notes or status from local storage if clicked away
    const saved = await chrome.storage.local.get(['savedNotes']);
    if (saved.savedNotes) {
        outputArea.value = saved.savedNotes;
    }

    // Auto-save changes if edited manually
    outputArea.addEventListener('input', () => {
        chrome.storage.local.set({ savedNotes: outputArea.value });
    });
});

document.getElementById('scanBtn').addEventListener('click', async () => {
    const outputArea = document.getElementById('output');
    outputArea.value = "Scraping DOM and executing Operational Filter...";
    await chrome.storage.local.set({ savedNotes: outputArea.value });

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || !tab.id) {
            outputArea.value = "Error: No active tab identified.";
            return;
        }

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const article = document.querySelector('article, main, #main-content, .markdown-body');
                return article ? article.innerText : document.body.innerText;
            }
        });

        if (!results || !results[0] || !results[0].result) {
            outputArea.value = "Error: Could not read target DOM content.";
            return;
        }

        const rawText = results[0].result;

        const systemPrompt = `You are a high-density, technical research ingestion engine.
Your goal is to parse raw material and extract core conceptual mechanics, trade-offs, and actionable logic.

OUTPUT TEMPLATE EXACT STRUCTURE:

## [Core Subject / Topic Title]

#### [1. The What]
* Category: [Define the exact technical taxonomy / classification]
* High-density summary of the core concept, design pattern, or architecture.

#### [2. The Vs]
* Replaces / Precedes: [What existing tool, manual method, or prior paradigm this makes obsolete]
* Is NOT: [Explicitly clarify adjacent concepts or common misconceptions this should not be confused with]
* Negative Boundary: [Under what constraints should this NOT be selected?]

#### [3. The Engine]
* Input: [The exact raw state, parameters, or data ingested]
* Mechanism: [Step-by-step breakdown: How does Input/Data X transform into Result Y?]
* Output: [The deterministic product, state change, or side effect produced]

#### [4. The "So What?"]
* Research & Operational Value: [Why does a practitioner or researcher care?]
* Critical Trade-off: [Cost, compute, complexity, or assumption sacrificed to gain this leverage]
> **Core Decision Rule:** [Single line operational rule for when to deploy this concept]

RULES:
- Strip all conversational filler, generic definitions, and textbook fluff.
- Fill every bracketed section with direct, high-leverage technical specifics.`;

        const response = await fetch('http://127.0.0.1:8080/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf',
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Text to parse:\n\n${rawText}` }
                ],
                temperature: 0.0,
                stream: false
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            let content = data.choices[0].message.content.trim();

            content = content
                .replace(/^```markdown\n?/i, '')
                .replace(/^```text\n?/i, '')
                .replace(/^```\n?/, '')
                .replace(/\n?```$/, '');

            outputArea.value = content;
            await chrome.storage.local.set({ savedNotes: content });
        } else {
            outputArea.value = "Error: Unexpected API response structure.";
            await chrome.storage.local.set({ savedNotes: outputArea.value });
        }

    } catch (err) {
        outputArea.value = `Execution Failed: Ensure llama-server is listening on http://127.0.0.1:8080.\nDetails: ${err.message}`;
        await chrome.storage.local.set({ savedNotes: outputArea.value });
    }
});

// Copy button logic
document.getElementById('copyBtn').addEventListener('click', () => {
    const outputArea = document.getElementById('output');
    if (!outputArea.value) return;

    outputArea.select();
    navigator.clipboard.writeText(outputArea.value);

    const btn = document.getElementById('copyBtn');
    btn.innerText = "Copied to Clipboard!";
    setTimeout(() => btn.innerText = "Copy to Obsidian", 2000);
});

// Clear button logic to reset session and close interface cleanly
document.getElementById('clearBtn').addEventListener('click', async () => {
    await chrome.storage.local.remove(['savedNotes']);
    const outputArea = document.getElementById('output');
    outputArea.value = "";
    window.close(); // Cleanly terminates popup interface
});