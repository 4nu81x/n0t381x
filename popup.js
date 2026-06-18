document.getElementById('scanBtn').addEventListener('click', async () => {
    const outputArea = document.getElementById('output');
    outputArea.value = "Scraping page and executing 3-Point Filter via DeepSeek...";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText
    }, async (results) => {
        if (!results || !results[0]) {
            outputArea.value = "Error: Could not read page content.";
            return;
        }

        const rawText = results[0].result;
        
        // The updated system prompt with Cheatsheet generation and Markdown enforcement
        const systemPrompt = `You are an operational note-taking engine for offensive security tradecraft. 
Your objective is to ingest academic cybersecurity text and output strict, operational Markdown.

RULES:
1. ONLY extract information that fits the 3-Point Filter:
   - Indicators (Where): File extensions, vulnerable headers, URL patterns.
   - Execution & Syntax (How): Exact tool syntax, payload structure.
   - Bypasses (What If): Filter evasion techniques.
2. DROP ALL fluff, history, GUI descriptions, and theory.
3. STRICT FORMATTING: Use shorthand logic (->, ::, |). Never write full sentences.
4. CHEATSHEET GENERATION: If the text contains specific payloads, commands, or tool syntax, aggregate them into a raw code block at the bottom of the output.
5. ONLY return the Markdown text. Do NOT include introductory text, conversational filler, or the template instructions.
6. If a section of the 3-Point Filter is not present in the text, omit that line entirely. Do NOT print empty fields or placeholders like "[Bypasses]".

You MUST output exactly in this format, replacing the brackets with the extracted data:

# [Title Based on Text]
**Target Surface** :: [Indicators]
**Base Payload** :: [Execution/Syntax]
**Evasion** :: [Bypasses]

**## Cheatsheet**
\`\`\`text
[Aggregated payloads, tool commands, and exact syntax from the text, one per line]
\`\`\`
`;

        try {
            // llama-server OpenAI compatible endpoint
            const response = await fetch('http://127.0.0.1:8080/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf',
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: `Text to parse:\n\n${rawText}` }
                    ],
                    temperature: 0.1, // Low temp for strict adherence to formatting
                    stream: false
                })
            });

            const data = await response.json();
            
            // Extracting from OpenAI JSON structure
            if (data.choices && data.choices.length > 0) {
                outputArea.value = data.choices[0].message.content; 
            } else {
                outputArea.value = "Error: Unexpected API response format.";
            }

        } catch (err) {
            outputArea.value = `API Connection Failed: Ensure llama-server is running on port 8080.\nDetails: ${err.message}`;
        }
    });
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const outputArea = document.getElementById('output');
    outputArea.select();
    navigator.clipboard.writeText(outputArea.value);
    
    const btn = document.getElementById('copyBtn');
    btn.innerText = "Copied! Ready for Obsidian.";
    setTimeout(() => btn.innerText = "Copy to Obsidian", 2000);
});