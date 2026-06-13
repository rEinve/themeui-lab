# Design

## Overview

The `intellitheme` project consumes the `themeui-lab` design system installed locally at `node_modules/themeui-lab/` — that package defines the canonical class names, primitives, and composition rules. Project-specific token values (color, typography) are then set in `src/scss/` and override the package defaults at the `:root` level. All HTML, JSX, and layout code must be authored against the documented classes and tokens; no Tailwind, no vanilla Bootstrap, no inline styles, and no ad-hoc `<style>` blocks.

## Goals

- Centralize all visual decisions through shared tokens (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--motion-*`, typography).
- Keep page structure in primitives; keep reusable UI decoupled from layout.
- Favor composition of existing building blocks over new abstractions.
- Keep the system small — only stable, cross-product pieces enter the core.

## Non-Goals

- Introducing Tailwind, vanilla Bootstrap, or any external utility CSS framework.
- Writing `style="..."` attributes, appended `<style>` tags, or custom CSS selector rules in HTML/JSX. If a need cannot be met by existing tokens, fall back to the closest existing structural class.
- Adding new tokens, primitives, or components for one-off, product-specific needs.
- Letting components own section composition, container widths, or page shell spacing.
- Authoring layout code without first consulting the relevant files in `node_modules/themeui-lab/`.

## Architecture

Bottom-up layering, consumed in this canonical order:

1. **Foundations** — token contract for color, spacing, typography, radius, shadows, motion. Includes shared icon set.
2. **Primitives** — layout, grouping, width, flow.
3. **Components** — reusable UI with self-contained interior structure and state.
4. **Patterns** — composed page-level arrangements (e.g. settings screen, dashboard snapshot — see Composition Patterns).
5. **Utilities** — last-mile alignment, centering, spacing, and surface adjustments.

Decision rule: if a choice affects the page shell, it belongs in primitives or patterns. If it affects the inside of one reusable unit, it belongs in components.

## System Layers

### Foundations
- Prefer canonical CSS variables: `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--motion-*`.
- Token families: Colors, Spacing, Typography, Radius, Shadows, Motion.
- Use semantic tokens so surfaces, controls, and layouts stay consistent.
- Legacy aliases exist for compatibility but new work uses canonical names.

**Icons.** Material Icons via `@material-design-icons/font`. Default to `.material-icons` (regular). Use `.material-icons-outlined`, `.material-icons-round`, `.material-icons-sharp`, or `.material-icons-two-tone` only when a different style is intentional.

### Primitives
- Canonical set: `.section`, `.container`, `.grid-12`, `.stack`, `.row`, `.cluster`.
- Page shell: `.section` + `.container` for regions, spacing boundaries, and centered width.
- Flow: `.stack`, `.row`, `.cluster` for rhythm and grouping inside a region.
- Columns: `.grid-12` with `.md-col-1`…`.md-col-12` and `.lg-col-1`…`.lg-col-12`.
- Legacy aliases (`.frame`, `.section-shell`, `.page-grid`, `.content-grid`, `.stack-tight`, `.stack-loose`) remain for compatibility only.

### Components
- Reusable UI: buttons, tags, breadcrumbs, pagination, tabs, inputs, selects, textareas, radios, checkboxes, switches, cards, tables, lists, post cards, carousels.
- Forms follow the dedicated form guide for field messaging, control selection, and accessibility wiring.
- Components own the inside — never section composition, container widths, or page shell spacing.

### Utilities
- Block / text alignment: `.margin-inline-auto`, `.text-left`, `.text-center`, `.text-right`.
- Flex / grid alignment: `.items-top|middle|bottom`, `.justify-start|center|end|between`, `.self-top|middle|bottom`, `.item-grow`, `.place-center`.
- Spacing helpers: `.margin-xxl`, `.margin-xl`, `.margin-tb-m`, `.margin-b-m`, `.margin-t-m`, `.padding-xxl`, `.padding-t-xxl`, `.padding-b-xxl`, `.padding-b-m`, `.padding-l`, `.padding-b-l`, `.padding-xl`.
- Surface / shape: `.border-t`, `.border-b`, `.surface`, `.border-rs`, `.border-rm`, `.border-rl`, `.border-rxl`, `.aspect-standard`.
- Utilities refine an existing primitive — they do not own page spacing, container width, grid composition, or component internals.

## Tokens

Token families exposed by the system:

| Family       | Variable prefix(es)                                | Status              |
|--------------|----------------------------------------------------|---------------------|
| Color        | `--color-*`                                        | Documented below    |
| Typography   | `--font-*`, `--step-*`, `--lh-*`, `--weight-*`     | Documented below    |
| Spacing      | `--space-*`                                        | Not yet documented  |
| Radius       | `--radius-*`                                       | Not yet documented  |
| Shadow       | `--shadow-*`                                       | Partial (see Color → Shadow / elevation) |
| Motion       | `--motion-*`                                       | Not yet documented  |

### Color tokens

Defined in [src/scss/_color.scss](src/scss/_color.scss). All values use `oklch()` for perceptual consistency.

#### Brand foundations (SCSS)

| SCSS variable     | Value                          |
|-------------------|--------------------------------|
| `$color-surface`  | `oklch(95% 0.005 204.47)`      |
| `$color-text`     | `oklch(16.71% 0.026 235.1)`    |
| `$color-accent`   | `oklch(54.45% 0.22 28.52)`     |

#### Surface scale

| Token                            | Value                          |
|----------------------------------|--------------------------------|
| `--color-surface`                | `$color-surface`               |
| `--color-surface-0`              | `$color-text`                  |
| `--color-surface-90`             | `oklch(90% 0.003 204.47)`      |
| `--color-surface-95`             | `oklch(95% 0.003 204.47)`      |
| `--color-surface-100`            | `$color-surface`               |
| `--color-surface-container`      | `oklch(90% 0.007 204.47)`      |
| `--color-surface-container-low`  | `var(--color-surface-95)`      |

#### Text scale

| Token                    | Value                       |
|--------------------------|-----------------------------|
| `--color-text`           | `$color-text`               |
| `--color-text-primary`   | `$color-text`               |
| `--color-text-secondary` | `oklch(36% 0.02 231)`       |
| `--color-text-tertiary`  | `oklch(49% 0.015 228)`      |
| `--color-text-inverse`   | `var(--color-surface-95)`   |

#### Accent scale

| Token                       | Value                          |
|-----------------------------|--------------------------------|
| `--color-accent`            | `$color-accent`                |
| `--color-accent-40`         | `oklch(41% 0.16 28.52)`        |
| `--color-accent-90`         | `oklch(87% 0.06 28.52)`        |
| `--color-accent-95`         | `oklch(93.5% 0.03 28.52)`      |
| `--color-accent-99`         | `oklch(99% 0.03 28.52)`        |
| `--color-accent-strong`     | `oklch(47% 0.24 28.52)`        |
| `--color-accent-contrast`   | `oklch(99% 0.003 85)`          |

#### Borders and lines

| Token                       | Value                       |
|-----------------------------|-----------------------------|
| `--color-outline`           | `oklch(76% 0.012 220)`      |
| `--color-outline-variant`   | `oklch(87% 0.01 215)`       |

#### Feedback

| Token                  | Value                          |
|------------------------|--------------------------------|
| `--color-danger`       | `oklch(58% 0.21 25)`           |
| `--color-danger-soft`  | `oklch(90% 0.05 25 / 0.7)`     |
| `--color-danger-text`  | `oklch(45% 0.17 25)`           |

#### Shadow / elevation

| Token                   | Value                                             |
|-------------------------|---------------------------------------------------|
| `--shadow-color`        | `oklch(24% 0.02 235.1 / 0.12)`                    |
| `--shadow-elevation-1`  | Layered shadow, low elevation                     |
| `--shadow-elevation-2`  | Layered shadow, mid elevation                     |
| `--shadow-elevation-3`  | Layered shadow, high elevation                    |
| `--elevation-1`         | Alias of `--shadow-elevation-1`                   |
| `--elevation-2`         | Alias of `--shadow-elevation-2`                   |
| `--elevation-3`         | Alias of `--shadow-elevation-3`                   |

#### Short-form aliases

Newer component files use a shorter naming style; these alias the canonical `--color-*` tokens.

| Alias                       | Resolves to                          |
|-----------------------------|--------------------------------------|
| `--surface-0`               | `var(--color-surface-0)`             |
| `--surface-95`              | `var(--color-surface-95)`            |
| `--surface-100`             | `var(--color-surface-100)`           |
| `--surface-container`       | `var(--color-surface-container)`     |
| `--surface-container-low`   | `var(--color-surface-container-low)` |
| `--text-primary`            | `var(--color-text-primary)`          |
| `--text-secondary`          | `var(--color-text-secondary)`        |
| `--text-tertiary`           | `var(--color-text-tertiary)`         |
| `--text-inverse`            | `var(--color-text-inverse)`          |
| `--accent`                  | `var(--color-accent)`                |
| `--accent-40`               | `var(--color-accent-40)`             |
| `--accent-90`               | `var(--color-accent-90)`             |
| `--accent-95`               | `var(--color-accent-95)`             |
| `--accent-strong`           | `var(--color-accent-strong)`         |
| `--accent-contrast`         | `var(--color-accent-contrast)`       |
| `--outline`                 | `var(--color-outline)`               |
| `--outline-variant`         | `var(--color-outline-variant)`       |

### Typography

Defined in [src/scss/_typesetting.scss](src/scss/_typesetting.scss). Single source of truth for body-level type — `font-size`, `color`, `line-height`, and `font-weight` for `body`, `p`, `li`, `blockquote`, and `h1`–`h6` must not be re-declared in component files unless there is an explicit component-level reason to override.

#### Fonts

Loaded via `@font-face` from `/src/fonts/`.

| Family       | Source file                                          | Weights | Display |
|--------------|------------------------------------------------------|---------|---------|
| `Inter`      | `Inter-VariableFont_opsz,wght.ttf` (variable)        | 100–900 | `swap`  |
| `Montserrat` | `Montserrat-Regular.woff`                            | 400     | `swap`  |

#### Font-family tokens

| Token             | Stack                                       | Role                       |
|-------------------|---------------------------------------------|----------------------------|
| `--font-body`     | `"Montserrat", system-ui, sans-serif`       | Body copy (default)        |
| `--font-display`  | `"Inter", system-ui, sans-serif`            | Headings, leading text     |

> Components must consume `var(--font-body)` / `var(--font-display)` — do not re-declare `font-family` in component files.

#### Referenced tokens (consumed but defined elsewhere)

| Token            | Used by                                       |
|------------------|-----------------------------------------------|
| `--step-0`       | Body size for `body`, `p`, `li`, `blockquote` |
| `--lh-body`      | Body line-height                              |
| `--lh-display`   | Heading / leading line-height                 |
| `--weight-bold`  | Heading + `.leading` weight                   |

#### Base elements

| Selector                | Family         | Size       | Color                      | Line-height  |
|-------------------------|----------------|------------|----------------------------|--------------|
| `body`                  | `--font-body`  | `--step-0` | `--color-text-secondary`   | `--lh-body`  |
| `p`, `li`, `blockquote` | `--font-body`  | `--step-0` | (inherits body)            | `--lh-body`  |

#### Headings

All headings: `font-family: var(--font-display)`, `font-weight: var(--weight-bold)`, `line-height: var(--lh-display)`, `max-inline-size: 18ch`, `margin: 0`.

| Selector                       | Fluid size                                | Color                      |
|--------------------------------|-------------------------------------------|----------------------------|
| `h1`, `.h1`, `.display-l`      | `clamp(4rem, 10vw, 9.125rem)` — 64→146px  | `--color-text-primary`     |
| `h2`, `.h2`                    | `clamp(2.8rem, 8vw, 5.625rem)` — 45→90px  | `--color-text-primary`     |
| `h3`, `.h3`                    | `clamp(2.25rem, 6vw, 4.5rem)` — 36→72px   | `--color-text-primary`     |
| `h4`, `.h4`                    | inherited                                 | `--color-text-tertiary`    |
| `h5`, `.h5`                    | inherited                                 | `--color-text-tertiary`    |
| `h6`, `.h6`                    | inherited                                 | `--color-text-tertiary`    |

#### Component-level type classes

| Selector              | Size                                | Notes                                                                 |
|-----------------------|-------------------------------------|-----------------------------------------------------------------------|
| `.whatsnew__label`    | `clamp(1.25rem, 3vw, 2rem)`         | `text-transform: uppercase`                                           |
| `.leading`            | `clamp(1.25rem, 3vw, 2rem)`         | `--font-display`, `--weight-bold`, `--color-text-secondary`, `--lh-display`, `max-inline-size: 100%`, `margin: 0` |

#### Links

| Selector                 | Color                        | Decoration         |
|--------------------------|------------------------------|--------------------|
| `a`                      | `--color-text-tertiary`      | none               |
| `a:hover`                | `--color-text-primary`       | underline          |
| `h1 a`, `h2 a`, `h3 a`   | `--color-text-tertiary`      | none (always)      |

## Composition Patterns

Canonical composition pattern:

```
section → container → stack → (intro + row/cluster/grid) → components
```

### Three-layer page example

```html
<section class="section">
  <div class="container">
    <div class="stack stack--lg">
      <div class="stack stack--xs">
        <h3>Settings</h3>
        <p>Header content lives in the content flow layer.</p>
      </div>
      <div class="row items-middle justify-between">
        <p>Section actions can align at the primitive layer.</p>
        <button class="button" type="button">Save</button>
      </div>
      <div class="row items-middle">
        <p class="item-grow">The summary can grow while the secondary action stays compact.</p>
        <a href="/docs/primitives/">Review primitives</a>
      </div>
      <div class="grid-12">
        <article class="card md-col-12 lg-col-8">...</article>
        <aside class="card md-col-12 lg-col-4">...</aside>
      </div>
    </div>
  </div>
</section>
```

### Settings screen composition

```html
<div class="grid-12">
  <article class="card md-col-12 lg-col-8">...main form...</article>
  <aside class="card md-col-12 lg-col-4">...supporting context...</aside>
</div>
```

### Dashboard snapshot composition

```html
<div class="grid-12">
  <article class="card md-col-6 lg-col-4">...metric...</article>
  <article class="card md-col-6 lg-col-4">...metric...</article>
  <article class="card md-col-12 lg-col-4">...metric...</article>
</div>

<div class="grid-12">
  <article class="card md-col-12 lg-col-8">...activity...</article>
  <aside class="card md-col-12 lg-col-4">...actions...</aside>
</div>
```

## Open Questions

- How does `src/scss/` relate to the `themeui-lab` package — pure override of `:root` tokens, or are we also re-declaring component styles? Worth a one-paragraph answer in the Overview.
- Where do the typography scale tokens (`--step-0`, `--lh-body`, `--lh-display`, `--weight-bold`) actually live? They are consumed in `_typesetting.scss` but not defined there.
- Spacing, radius, and motion tokens are referenced throughout the system but not yet documented here — needs a follow-up pass.
