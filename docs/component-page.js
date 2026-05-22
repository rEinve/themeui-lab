import { initCarousels, initTabs } from '/src/js/components/index.js';
import { componentDocs } from '/docs/component-docs-data.js';

const componentId = document.body.dataset.componentId;
const mount = document.querySelector('[data-component-detail]');

if (!componentId || !mount) {
  throw new Error('Component detail page is missing a component id or mount point.');
}

const component = componentDocs[componentId];

if (!component) {
  throw new Error(`Unknown component docs id: ${componentId}`);
}

const renderList = (items) =>
  items
    .map((item) => `<li>${item}</li>`)
    .join('');

mount.innerHTML = `
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
    <ul class="docs-inline-list">
      ${renderList(component.howToUse)}
    </ul>
  </article>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">Demo</h2>
    <p class="example-description">Live preview of the canonical ${component.name.toLowerCase()} markup.</p>
    <div class="example-preview">
      ${component.preview}
    </div>
  </article>

  <article class="example-block stack stack--sm">
    <h2 class="example-title">Example Code</h2>
    <pre class="example-code"><code>${component.code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</code></pre>
  </article>

  <div class="docs-page-nav">
    <a class="docs-link" href="/docs/components/">Back to Components Intro</a>
    <a class="docs-link" href="/docs/components/examples.html">Back to Components Examples</a>
  </div>
`;

if (component.needsTabs) {
  initTabs(mount);
}

if (component.needsCarousel) {
  initCarousels(mount);
}
