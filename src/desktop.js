(function(){
    // Desktop bookmarklet logic (local loopback)
    // Note: Browsers block HTTP requests from HTTPS sites (Mixed Content).
    // To use this on HTTPS sites, you must allow insecure content in site settings
    // or use the mobile/localtunnel version (mobile.v2.js) which uses HTTPS.
    const API_URL = 'http://127.0.0.1:8080/v1/chat/completions';
    const rawText = document.body.innerText;
    
    if(!rawText) {
        console.log("n0t381x Error: No text found on page.");
        return;
    }

    console.log("n0t381x: Sending page content to local LLM...");

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf',
            messages: [
                {
                    role: "system", 
                    content: "You are an operational note-taking engine for offensive security tradecraft. Output strict Markdown. RULES: 1. Use 3-Point Filter. 2. Use shorthand (->, ::, |). 3. Aggregated payloads in ## Cheatsheet."
                },
                {
                    role: "user", 
                    content: `Text to parse:\n\n${rawText}`
                }
            ],
            temperature: 0.1,
            stream: false
        })
    })
    .then(r => {
        if (!r.ok) {
            throw new Error(`HTTP status ${r.status}`);
        }
        return r.json();
    })
    .then(data => {
        if(data.choices?.[0]?.message?.content) {
            const markdown = data.choices[0].message.content;
            const textArea = document.createElement("textarea");
            textArea.value = markdown;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            console.log("n0t381x: Captured to clipboard.");
        } else {
            console.log("n0t381x Error: Unexpected response format.");
        }
    })
    .catch(err => {
        console.log("n0t381x API Error: " + err.message);
        console.log("Tip: If running on HTTPS, bypass Mixed Content blocks by allowing insecure content in site settings or using the localtunnel/HTTPS version.");
    });
})();
