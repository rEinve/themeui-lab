import { referenceDocs } from '/docs/reference-docs-data.js';

const sectionId = document.body.dataset.referenceSection;
const itemId = document.body.dataset.referenceId;
const mount = document.querySelector('[data-reference-detail]');

if (!sectionId || !itemId || !mount) {
  throw new Error('Reference page is missing section id, item id, or mount point.');
}

const section = referenceDocs[sectionId];
const item = section?.items?.[itemId];

if (!section || !item) {
  throw new Error(`Unknown reference docs entry: ${sectionId}/${itemId}`);
}

const renderList = (items) => items.map((itemText) => `<li>${itemText}</li>`).join('');

mount.innerHTML = `
  <div class="stack stack--xs">
    <h1>${item.name}</h1>
    <p>${item.summary}</p>
  </div>

  <div class="docs-note">
    <p>${item.accomplishes}</p>
  </div>

  <div class="docs-summary-grid">
    <article class="card stack stack--sm">
      <h2 class="card__title">What It Accomplishes</h2>
      <p class="card__text">${item.accomplishes}</p>
    </article>
    <article class="card stack stack--sm">
      <h2 class="card__title">Key Items</h2>
      <ul class="docs-inline-list">${renderList(item.keyItems)}</ul>
    </article>
  </div>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">How To Use</h2>
    <ul class="docs-inline-list">${renderList(item.howToUse)}</ul>
  </article>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">Demo</h2>
    <p class="example-description">Live preview for ${item.name.toLowerCase()}.</p>
    <div class="example-preview">${item.preview}</div>
  </article>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">Example Code</h2>
    <pre class="example-code"><code>${item.code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</code></pre>
  </article>

  <div class="docs-page-nav">
    <a class="docs-link" href="/docs/${sectionId}/">Back to ${section.sectionName} Intro</a>
    <a class="docs-link" href="/docs/${sectionId}/examples.html">Back to ${section.sectionName} Examples</a>
  </div>
`;
