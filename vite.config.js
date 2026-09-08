import { defineConfig } from "vite";
import { resolve, relative, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "fs";
import { componentDocs } from "./docs/component-docs-data.js";
import { recoveredComponentDocs } from "./docs/recovered-component-docs.js";
import { referenceDocs } from "./docs/reference-docs-data.js";
import { renderComponentDetail, renderReferenceDetail } from "./docs/detail-page-render.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = "/Users/mac/www/themeui-lab";
const SITE_URL = "https://themeui.intelliweblab.com";
const allComponentDocs = { ...componentDocs, ...recoveredComponentDocs };

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

function outputRelativePath(sourceFile) {
  return relative(__dirname, sourceFile).replaceAll("\\", "/");
}

function urlPathFor(outputPath) {
  if (outputPath === "index.html") return "/";
  return `/${outputPath.replace(/index\.html$/, "")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sourceDescription(sourceHtml) {
  return sourceHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1];
}

function sourceTitle(sourceHtml) {
  return sourceHtml.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() ?? "ThemeUI Lab";
}

function pageTitle(title) {
  return title.replace(/\s+[—-]\s+themeui-lab(?:\s+Docs)?$/i, "");
}

function detailFor(sourceHtml) {
  const componentId = sourceHtml.match(/data-component-id=["']([^"']+)["']/)?.[1];
  if (componentId && allComponentDocs[componentId]) {
    return {
      item: allComponentDocs[componentId],
      html: renderComponentDetail(allComponentDocs[componentId]),
      schemaType: "TechArticle",
    };
  }

  const sectionId = sourceHtml.match(/data-reference-section=["']([^"']+)["']/)?.[1];
  const itemId = sourceHtml.match(/data-reference-id=["']([^"']+)["']/)?.[1];
  const section = sectionId ? referenceDocs[sectionId] : undefined;
  const item = section && itemId ? section.items[itemId] : undefined;

  if (section && item) {
    return {
      item,
      html: renderReferenceDetail(sectionId, section, item),
      schemaType: "TechArticle",
    };
  }

  return undefined;
}

function breadcrumbList(urlPath, title) {
  const segments = urlPath.split("/").filter(Boolean);
  const items = [{ position: 1, name: "ThemeUI Lab", item: `${SITE_URL}/` }];
  let path = "";

  for (const [index, segment] of segments.entries()) {
    path += `/${segment}`;
    const isCurrent = index === segments.length - 1;
    items.push({
      position: items.length + 1,
      name: isCurrent ? pageTitle(title) : segment.replaceAll("-", " "),
      item: `${SITE_URL}${isCurrent ? urlPath : `${path}/`}`,
    });
  }

  return { "@type": "BreadcrumbList", itemListElement: items };
}

function addSearchMetadata(html, metadata) {
  const canonical = `${SITE_URL}${metadata.urlPath}`;
  const pageSchema = {
    "@type": metadata.schemaType ?? "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: metadata.title,
    description: metadata.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const graph = [pageSchema, breadcrumbList(metadata.urlPath, metadata.title)];

  if (metadata.urlPath === "/") {
    graph.unshift({
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "ThemeUI Lab",
      description: metadata.description,
      inLanguage: "en",
    });
  }

  const metadataBlock = `
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${metadata.schemaType === "TechArticle" ? "article" : "website"}" />
    <meta property="og:site_name" content="ThemeUI Lab" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;

  return html
    .replace(/\s*<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "")
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "")
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace("</head>", `${metadataBlock}\n  </head>`);
}

function siteDiscoveryFiles() {
  return {
    name: "site-discovery-files",
    closeBundle() {
      const sitemapUrls = [];

      for (const sourceFile of htmlFiles) {
        const outputPath = outputRelativePath(sourceFile);
        const urlPath = urlPathFor(outputPath);
        const sourceHtml = readFileSync(sourceFile, "utf8");
        const detail = detailFor(sourceHtml);
        const title = sourceTitle(sourceHtml);
        const description = detail?.item.summary ?? sourceDescription(sourceHtml) ??
          `${pageTitle(title)} documentation for ThemeUI Lab, a token-driven design system for durable interfaces.`;
        const outputFile = resolve(OUT_DIR, outputPath);
        let outputHtml = readFileSync(outputFile, "utf8");

        if (detail) {
          const mountAttribute = sourceHtml.includes("data-component-detail")
            ? "data-component-detail"
            : "data-reference-detail";
          const mount = new RegExp(`(<div[^>]*${mountAttribute}[^>]*>)([\\s\\S]*?)(<\\/div>)`);
          outputHtml = outputHtml.replace(mount, `$1${detail.html}$3`);
        }

        outputHtml = addSearchMetadata(outputHtml, {
          urlPath,
          title,
          description,
          schemaType: detail?.schemaType,
        });
        writeFileSync(outputFile, outputHtml);
        sitemapUrls.push(`${SITE_URL}${urlPath}`);
      }

      writeFileSync(
        resolve(OUT_DIR, "robots.txt"),
        `# ThemeUI Lab documentation is available for search and answer retrieval.\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      );
      writeFileSync(
        resolve(OUT_DIR, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
          .map((url) => `  <url><loc>${url}</loc></url>`)
          .join("\n")}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [copyDocsStatics(), siteDiscoveryFiles()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
    rollupOptions: { input },
  },
});
