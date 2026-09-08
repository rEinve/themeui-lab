import { referenceDocs } from '/docs/reference-docs-data.js';
import { renderReferenceDetail } from '/docs/detail-page-render.js';

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

mount.innerHTML = renderReferenceDetail(sectionId, section, item);
