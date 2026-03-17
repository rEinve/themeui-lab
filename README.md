# themeui-lab

A lightweight front-end lab for evolving a reusable in-house design system.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build:styles` - compile the package stylesheet entry to `dist/themeui-lab.css`
- `npm run build:package` - prepare package assets for linking or packing
- `npm run build` - build production assets
- `npm run preview` - preview production build

## Package Linking

You can test the design system in a real app with `npm link`.

1. In this repo, run `npm link`
2. In the consuming project, run `npm link themeui-lab`
3. Import the package stylesheet:

   - `import "themeui-lab/styles.css";`

4. Import the JavaScript helpers you need:

   - `import { initTabs, initCarousels } from "themeui-lab";`

The package exposes:

- `themeui-lab` - JavaScript entry for interactive helpers
- `themeui-lab/components` - component-level helper exports
- `themeui-lab/styles.css` - compiled stylesheet entry
- `themeui-lab/styles.scss` - source Sass entry

## SCSS Architecture

Source of truth lives in `src/scss`.

- `tools/` - Sass mixins and authoring helpers
- `foundations/` - design tokens (color, spacing, typography, radius, shadows, motion)
- `base/` - global element defaults
- `primitives/` - low-level layout objects (container, grid, stack, row, section)
- `components/` - reusable core UI components (button, card, input, textarea, tag, divider)
- `patterns/` - higher-level structural patterns (app shell/navigation)
- `utilities/` - small helper classes

Each folder exposes an `_index.scss` via `@forward`.

## Entry Point

Use one stylesheet entrypoint:

- `src/scss/themeui-lab.scss`

This file imports layers in order via `@use`:

1. tools
2. foundations
3. base
4. primitives
5. components
6. patterns
7. utilities

## Conventions

- Page shell controls structure.
- Content flow controls rhythm.
- Components control their own interior.
- Do not let components own page layout or page rhythm.
- Prefer tokens from `foundations` over hardcoded values.
- Keep primitives generic and composable.
- Keep components reusable and avoid page-specific coupling.
- Put project-specific layout flows in `patterns`, not `components`.
- Avoid adding new abstractions unless needed for reuse.
- Prefer canonical classes/variables in new code; use legacy aliases only for migration compatibility.

## Canonical vs Legacy Usage

- Canonical primitives: `.container`, `.stack`, `.row`, `.cluster`, `.grid-12`, `.section`.
- Canonical components: `.button`, `.card`, `.input`, `.textarea`, `.tag`, `.divider`.
- Legacy aliases still exist in the CSS for backward compatibility and are marked inline in SCSS.

## Primitive Docs

- Docs hub: `/docs/`
- Foundations docs: `/docs/foundations/`
- Primitives docs: `/docs/primitives/`
- Components docs: `/docs/components/`
- Composition docs: `/docs/composition/`
- System rules: `/docs/rules/`

Markdown files in `docs/` are source/reference only and are not routed docs pages.

## Contributing SCSS Changes

- Confirm the change belongs in the correct layer before editing.
- Reuse existing tokens from `foundations` first; add new tokens only when reused.
- Keep `themeui-lab.scss` layer order unchanged.
- Prefer `@use`/`@forward`; do not add `@import`.
- Keep selectors readable and avoid deep nesting.
- Do a quick `npm run build` check before submitting.
