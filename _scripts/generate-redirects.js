const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "../_data/redirects.csv");
const docsDir = path.join(__dirname, "../docs");

// Parse CSV: skip comments and empty lines
const entries = fs
  .readFileSync(csvPath, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => {
    const [oldPath, newPath] = line.split(",").map((s) => s.trim());
    return { oldPath, newPath };
  });

// Track generated files for cleanup (deduplicated)
const generated = new Set();

for (const { oldPath, newPath } of entries) {
  if (!oldPath || !newPath) continue;

  // Remove leading slash and .md extension for file path
  const cleanPath = oldPath.replace(/^\//, "").replace(/\.md$/, "");
  const filePath = path.join(docsDir, cleanPath + ".md");

  // Skip duplicates
  if (generated.has(filePath)) continue;

  // Create directory
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write redirect stub
  const content = [
    "---",
    "template: redirect.html",
    `location: ${newPath}`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(filePath, content);
  generated.add(filePath);
}

console.log(`Generated ${generated.size} redirect files`);

// Write manifest for cleanup
const manifestPath = path.join(__dirname, "../_data/.redirects-manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify([...generated], null, 2));
