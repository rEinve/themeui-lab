# themeui-lab

A lightweight front-end lab for evolving a reusable in-house design system.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build production assets
- `npm run preview` - preview production build

## SCSS Architecture

Source of truth lives in `src/scss`.

- `tools/` - Sass mixins and authoring helpers
- `foundations/` - design tokens (color, spacing, typography, radius, shadows, motion)
- `base/` - global element defaults
- `primitives/` - low-level layout objects (container, grid, stack, row, section)
- `components/` - reusable UI components (button, card, tabs)
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

- Prefer tokens from `foundations` over hardcoded values.
- Keep primitives generic and composable.
- Keep components reusable and avoid page-specific coupling.
- Put project-specific layout flows in `patterns`, not `components`.
- Avoid adding new abstractions unless needed for reuse.

## Contributing SCSS Changes

- Confirm the change belongs in the correct layer before editing.
- Reuse existing tokens from `foundations` first; add new tokens only when reused.
- Keep `themeui-lab.scss` layer order unchanged.
- Prefer `@use`/`@forward`; do not add `@import`.
- Keep selectors readable and avoid deep nesting.
- Do a quick `npm run build` check before submitting.
