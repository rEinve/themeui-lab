import { defineConfig } from "vite";
import { resolve, relative, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync, statSync, copyFileSync, mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = "/Users/mac/www/themeui-lab";

function walkHtml(dir, excludeDirs = []) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      results.push(...walkHtml(full, excludeDirs));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = [
  resolve(__dirname, "index.html"),
  ...walkHtml(resolve(__dirname, "docs"), ["_includes"]),
];

const input = Object.fromEntries(
  htmlFiles.map((f) => {
    const key = relative(__dirname, f)
      .replace(/\.html$/, "")
      .replace(/[/\\]/g, "_");
    return [key, f];
  })
);

// Non-module scripts and HTML fragments that Vite can't bundle — copy verbatim.
const STATIC_DOCS_FILES = [
  "docs/docs-sidebar.js",
  "docs/example-copy.js",
  "docs/app-shell-example.js",
  "docs/_includes/header.html",
  "docs/_includes/sidebar.html",
];

function copyDocsStatics() {
  return {
    name: "copy-docs-statics",
    closeBundle() {
      for (const rel of STATIC_DOCS_FILES) {
        const dest = resolve(OUT_DIR, rel);
        mkdirSync(dirname(dest), { recursive: true });
        copyFileSync(resolve(__dirname, rel), dest);
      }
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [copyDocsStatics()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
    rollupOptions: { input },
  },
});
