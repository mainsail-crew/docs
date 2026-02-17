const fs = require("fs");
const path = require("path");

// Filter contributors (maintainer + bots)
const contributorFilter = ["meteyou", "dependabot[bot]", "github-actions[bot]"];

// Paths
const scriptsDir = __dirname;
const dataDir = path.join(__dirname, "../_data");
const outputPath = path.join(__dirname, "../docs/credits.md");

// Read template header
let pageContent = fs.readFileSync(path.join(scriptsDir, "credits-header.md"), "utf8");

// --- Contributors section ---
const contributorsRaw = fs.readFileSync(path.join(dataDir, "contributors.json"), "utf8");
const contributors = JSON.parse(contributorsRaw);

pageContent += "\n## Contributors\n\n";
pageContent += "| Contributor | Profile |\n";
pageContent += "|:---|:---|\n";

contributors
    .filter((c) => !contributorFilter.includes(c.login))
    .forEach((c) => {
        pageContent += `| **${c.login}** | [${c.html_url}](${c.html_url}){:target="_blank"} |\n`;
    });

// --- Licenses section ---
const licensesRaw = fs.readFileSync(path.join(dataDir, "licenses.json"), "utf8");
const licenses = JSON.parse(licensesRaw);

pageContent += "\n## Licenses\n\n";
pageContent += "| Project | License | Repository |\n";
pageContent += "|:---|:---:|:---|\n";

Object.keys(licenses).forEach((key) => {
    const dep = licenses[key];
    const repo = dep.repository || "";
    const repoLink = repo ? `[${repo}](${repo}){:target="_blank"}` : "";

    pageContent += `| **${key}** | ${dep.licenses} | ${repoLink} |\n`;
});

// Write output
fs.writeFileSync(outputPath, pageContent, { encoding: "utf8" });
console.log(
    `Generated credits.md with ${contributors.length - contributorFilter.length} contributors and ${Object.keys(licenses).length} licenses.`
);
