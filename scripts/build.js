const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const files = ['desktop.js', 'mobile.v2.js'];

files.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found: ${filePath}`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    // Minimize / URL encode to bookmarklet format: javascript:...
    // First, simple minification (strip comments, newlines, and escape characters)
    let minified = content
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // remove single line comments, preserving URLs like http://
        .replace(/\s+/g, ' ')                                  // compress whitespace
        .trim();

    // Now, URL encode for bookmarklet usage
    const bookmarklet = 'javascript:' + encodeURIComponent(minified);
    const outputFileName = file.replace('.js', '.bookmarklet.txt');
    const outPath = path.join(srcDir, outputFileName);
    fs.writeFileSync(outPath, bookmarklet, 'utf8');
    console.log(`Generated bookmarklet for ${file} -> src/${outputFileName}`);
});
