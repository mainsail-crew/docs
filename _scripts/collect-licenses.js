// Collects license information for all direct production dependencies of Mainsail.
// Usage: node _scripts/collect-licenses.js <path-to-mainsail-repo>
// Requires `npm ci --omit=dev` to have been run in the Mainsail repo first.

const fs = require("fs");
const path = require("path");

const mainsailDir = path.resolve(process.argv[2] || "./mainsail");
const outputPath = path.join(__dirname, "../_data/licenses.json");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

// Normalize the different license notations used in package.json files
function normalizeLicense(pkg) {
    if (typeof pkg.license === "string") return pkg.license;
    if (pkg.license?.type) return pkg.license.type;
    if (Array.isArray(pkg.licenses)) {
        const types = pkg.licenses.map((l) => (typeof l === "string" ? l : l.type)).filter(Boolean);
        if (types.length) return types.length > 1 ? `(${types.join(" OR ")})` : types[0];
    }
    return "UNKNOWN";
}

// Convert repository notations (git+https, git://, git@, shorthand) into a browsable https URL
function normalizeRepository(pkg) {
    let url = typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
    if (!url) return pkg.homepage || "";

    url = url.trim();
    // Shorthand: "user/repo", "github:user/repo", "gitlab:user/repo", "bitbucket:user/repo"
    const shorthand = url.match(/^(?:(github|gitlab|bitbucket):)?([\w.-]+\/[\w.-]+)$/);
    if (shorthand) {
        const hosts = { github: "github.com", gitlab: "gitlab.com", bitbucket: "bitbucket.org" };
        url = `https://${hosts[shorthand[1] || "github"]}/${shorthand[2]}`;
    }

    return url
        .replace(/^git\+/, "")
        .replace(/^git@([^:]+):/, "https://$1/")
        .replace(/^(git|ssh):\/\/(git@)?/, "https://")
        .replace(/\.git$/, "")
        .replace(/\/$/, "");
}

const mainsailPkg = readJson(path.join(mainsailDir, "package.json"));
const dependencies = Object.keys(mainsailPkg.dependencies || {}).sort();

const licenses = {};
dependencies.forEach((name) => {
    const pkgPath = path.join(mainsailDir, "node_modules", name, "package.json");
    if (!fs.existsSync(pkgPath)) {
        console.warn(`Warning: ${name} is not installed, skipping.`);
        return;
    }

    const pkg = readJson(pkgPath);
    licenses[name] = {
        licenses: normalizeLicense(pkg),
        repository: normalizeRepository(pkg),
    };
});

fs.writeFileSync(outputPath, JSON.stringify(licenses, null, 4) + "\n", { encoding: "utf8" });
console.log(`Collected licenses for ${Object.keys(licenses).length} dependencies.`);
