const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "../_data/.redirects-manifest.json");

if (!fs.existsSync(manifestPath)) {
  console.log("No redirect manifest found, nothing to clean up");
  process.exit(0);
}

const files = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let removed = 0;

for (const filePath of files) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    removed++;
  }

  // Remove empty parent directories up to docs/
  const docsDir = path.join(__dirname, "../docs");
  let dir = path.dirname(filePath);
  while (dir !== docsDir && dir.startsWith(docsDir)) {
    try {
      fs.rmdirSync(dir);
      dir = path.dirname(dir);
    } catch {
      break; // directory not empty
    }
  }
}

fs.unlinkSync(manifestPath);
console.log(`Cleaned up ${removed} redirect files`);
