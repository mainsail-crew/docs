const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

// Paths
const scriptsDir = __dirname;
const dataDir = path.join(__dirname, "../_data");
const outputPath = path.join(__dirname, "../docs/features/custom-themes/community-themes.md");

// Read templates
const templateHeader = fs.readFileSync(path.join(scriptsDir, "themes-header.md"), "utf8");
const templateEntry = fs.readFileSync(path.join(scriptsDir, "theme-entry.md"), "utf8");

// Read and parse CSV
const csvContent = fs.readFileSync(path.join(dataDir, "themes.csv"), "utf8");
const records = parse(csvContent, { columns: true, skip_empty_lines: true });

// Build page content
let pageContent = templateHeader;

records.forEach((row, index) => {
    let entry = templateEntry;
    entry = entry.replace(/{{ index }}/g, index + 1);
    entry = entry.replace(/{{ name }}/g, row.name);
    entry = entry.replace(/{{ author }}/g, row.author);
    entry = entry.replace(/{{ repo }}/g, row.repo);
    entry = entry.replace(/{{ branch }}/g, row.branch);
    entry = entry.replace(/{{ preview }}/g, row.preview);

    // Handle optional note as subtitle
    const note = row.short_note?.trim() ? `*${row.short_note.trim()}*` : "";
    entry = entry.replace(/{{ note }}\n/g, note ? `${note}\n\n` : "");

    pageContent += entry;
});

// Write output
fs.writeFileSync(outputPath, pageContent, { encoding: "utf8" });
console.log(`Generated community-themes.md with ${records.length} themes.`);
