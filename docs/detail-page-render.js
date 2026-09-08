const renderList = (items) => items.map((item) => `<li>${item}</li>`).join('');

const escapeCode = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function renderComponentDetail(component) {
  return `
  <div class="stack stack--xs">
    <h1>${component.name}</h1>
    <p>${component.summary}</p>
  </div>

  <div class="docs-note">
    <p>${component.accomplishes}</p>
  </div>

  <div class="docs-summary-grid">
    <article class="card stack stack--sm">
      <h2 class="card__title">What It Accomplishes</h2>
      <p class="card__text">${component.accomplishes}</p>
    </article>
    <article class="card stack stack--sm">
      <h2 class="card__title">Key Classes</h2>
      <ul class="docs-inline-list">
        ${renderList(component.keyClasses.map((item) => `<code class="docs-inline-code">${item}</code>`))}
      </ul>
    </article>
  </div>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">How To Use</h2>
    <ul class="docs-inline-list">${renderList(component.howToUse)}</ul>
  </article>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">Demo</h2>
    <p class="example-description">Live preview of the canonical ${component.name.toLowerCase()} markup.</p>
    <div class="example-preview">${component.preview}</div>
  </article>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">Example Code</h2>
    <pre class="example-code"><code>${escapeCode(component.code)}</code></pre>
  </article>

  <div class="docs-page-nav">
    <a class="docs-link" href="/docs/components/">Back to Components Intro</a>
    <a class="docs-link" href="/docs/components/examples.html">Back to Components Examples</a>
  </div>
`;
}

export function renderReferenceDetail(sectionId, section, item) {
  return `
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
    <pre class="example-code"><code>${escapeCode(item.code)}</code></pre>
  </article>

  <div class="docs-page-nav">
    <a class="docs-link" href="/docs/${sectionId}/">Back to ${section.sectionName} Intro</a>
    <a class="docs-link" href="/docs/${sectionId}/examples.html">Back to ${section.sectionName} Examples</a>
  </div>
`;
}
