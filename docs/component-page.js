import { initActionMenus, initCarousels, initTabs } from '/src/js/components/index.js';
import { componentDocs } from '/docs/component-docs-data.js';
import { recoveredComponentDocs } from '/docs/recovered-component-docs.js';
import { renderComponentDetail } from '/docs/detail-page-render.js';

const componentId = document.body.dataset.componentId;
const mount = document.querySelector('[data-component-detail]');

if (!componentId || !mount) {
  throw new Error('Component detail page is missing a component id or mount point.');
}

const component = componentDocs[componentId] ?? recoveredComponentDocs[componentId];

if (!component) {
  throw new Error(`Unknown component docs id: ${componentId}`);
}

mount.innerHTML = renderComponentDetail(component);

if (component.needsTabs) {
  initTabs(mount);
}

if (component.needsCarousel) {
  initCarousels(mount);
}

if (component.needsActionMenus) {
  initActionMenus(mount);
}
