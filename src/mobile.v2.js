(function(){
    // Update this URL whenever your localtunnel session restarts
    const API_URL = 'https://honest-forks-refuse.loca.lt/v1/chat/completions';
    const rawText = document.body.innerText;
    
    if(!rawText) {
        console.log("n0t381x Error: No text found.");
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder': 'true' // Bypasses localtunnel interstitial
        },
        body: JSON.stringify({
            model: 'DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf',
            messages: [
                {role: "system", content: "You are an operational note-taking engine for offensive security tradecraft. Output strict Markdown. RULES: 1. Use 3-Point Filter. 2. Use shorthand (->, ::, |). 3. Aggregated payloads in ## Cheatsheet."},
                {role: "user", content: `Text to parse:\n\n${rawText}`}
            ],
            temperature: 0.1,
            stream: false
        })
    })
    .then(r => r.json())
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
        }
    })
    .catch(err => console.log("API Error: " + err.message));
})();
