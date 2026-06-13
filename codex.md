# System rules to establish in `intellitheme`:

- Our design system and UI framework live inside `node_modules/themeui-lab/`.
- You are explicitly authorized and required to read files in this directory before writing any HTML, JSX, or layout code. 
- Do not use Tailwind, external vanilla Bootstrap, or inline styles. Use only the classes documented in this local package.
- Use Tokens
Shared token values should be used instead of hard-coded design values.
This rule keeps visual changes centralized and reduces repeated styling decisions.
Prefer color, spacing, radius, shadow, and motion tokens from foundations.
** Add new tokens only when the need is truly shared and reusable. **

- Primitives Control Layout
Layout responsibility belongs in primitives rather than components.
This rule prevents reusable UI from becoming tightly coupled to one page layout.
Use section, container, grid, stack, row, and cluster for page structure.
Do not hide page shell logic inside a component class.

- Components Control Interior
Components should control their own interior structure, not the surrounding page shell.-
Use components for surface, internal spacing, and repeated UI logic.
Keep outer layout concerns in primitives and patterns.

- Prefer Composition
Reuse existing building blocks before creating new abstractions.
Composition-first thinking keeps the system smaller and reduces drift from one-off solutions.

- Prefer Composition
Reuse existing building blocks before creating new abstractions.
Composition-first thinking keeps the system smaller and reduces drift from one-off solutions.

- Keep the System Small
Only stable, reusable pieces should enter the design system.
Add a new system primitive or component only when it solves a repeated cross-product need.
Keep product-specific layout or behavior outside the core system.

## Foundations
Foundations define the token contract for the system: color, spacing, typography, radius, shadows, motion, and shared assets.
Prefer shared CSS variables such as --color-*, --space-*, --radius-*, --shadow-*, and --motion-* instead of hard-coded values.
Token Families
The system foundations cover color, spacing, typography, radius, shadows, and motion.
Semantic Usage
Use semantic token families when possible so surfaces, controls, and layouts stay consistent across the library.
Shared Assets
Icon usage lives alongside foundations because it supports the same base visual language decisions.
Downstream Role
Foundations feed primitives, utilities, components, and patterns. They should stay stable and system-wide.

### Foundations Examples
Foundations define the token contract for color, spacing, typography, radius, shadows, and motion.
Canonical consumption should prefer exported CSS variables like --color-*, --space-*, --radius-*, --shadow-*, and --motion-*. Legacy aliases still exist for compatibility, but new work should use the canonical token names.

### Token Families
Colors
Spacing
Typography
Radius, Shadows, Motion
References
Architecture and conventions
Composition model

## Icons
Material Icons are installed from npm and exposed as the shared ligature-based icon set for themeui-lab.
Default to .material-icons for the regular style and use outlined, round, sharp, or two-tone variants only when a different style is intentional.
Package Source
Icons come from @material-design-icons/font and are available in the main stylesheet.
System Default
Use the regular Material Icons style first so the library keeps a stable visual voice.

### Icons Examples
Material Icons is installed from npm and exposes the full ligature font set for regular, outlined, round, sharp, and two-tone styles.

Package source: @material-design-icons/font. Default to .material-icons for regular style. Use .material-icons-outlined, .material-icons-round, .material-icons-sharp, and .material-icons-two-tone only when a different style is intentionally needed.


## Primitives
Primitives control layout, grouping, width, and flow. They are the structural layer of the system.
Canonical primitives are .section, .container, .grid-12, .stack, .row, and .cluster.
Page Shell
Use .section and .container for regions, spacing boundaries, and centered width.
Flow
Use .stack, .row, and .cluster for rhythm and grouping inside a region.
Columns
Use .grid-12 with span classes like .md-col-* and .lg-col-* for page-level structure.
Boundary Rule
Primitives own layout. Components should not introduce container width, section spacing, or page composition logic.

Primitives Examples
Primitives handle page shell and content flow layout: structure, rhythm, and grouping.

Canonical usage: .container, .section, .grid-12, .stack, .row, .cluster. Alignment helpers like .items-middle, .justify-between, and .text-center live in utilities and should only refine an existing layout primitive. Use the Utilities docs for the full list and centering examples. Grid spans are available as .md-col-1 through .md-col-12 and .lg-col-1 through .lg-col-12. Legacy aliases like .frame, .section-shell, .page-grid, .content-grid, .stack-tight, and .stack-loose remain for compatibility only.

## Components
Components are reusable UI pieces that own their own interior structure, state, and surface treatment.
Use components for reusable interface parts such as buttons, cards, inputs, lists, tabs, tables, and carousels. Keep page spacing, container width, and layout composition in primitives and patterns.

Need forms?
Start with the dedicated form guide for field messaging, control selection, accessibility wiring, and the full reference example.
Open Form Guide
Action Elements
Buttons, tags, breadcrumbs, pagination, and tabs provide reusable interaction and navigation elements.
Form Controls
Inputs, selects, textareas, radios, checkboxes, and switches share a predictable field language.
Content Surfaces
Cards, tables, lists, and post cards present content without taking over page layout.
Boundary Rule
Components control the inside. They should not own section composition, container widths, or page shell spacing.

## Utilities
Utilities are small helpers that refine an existing primitive. They sit late in the system, as the last adjustment layer before composition guidance.
Start with .stack, .row, .cluster, or .grid-12, then add the smallest utility needed for alignment, centering, spacing, or surface treatment.
Alignment
Use .items-*, .justify-*, .self-*, and .item-grow to refine flex and grid behavior.
Centering
Use .margin-inline-auto to center a block, and combine primitive layout with utilities when content needs horizontal or two-axis centering
Spacing and Surface
Spacing, border, radius, and surface helpers are available for small adjustments that should not become new component variants.
Keep Scope Small
Utilities should not own page spacing, container width, grid composition, or component internals.

### Utilities Examples
Utilities are small, explicit helpers that refine an existing primitive. They do not replace layout primitives or components.
Start with a primitive such as .stack, .row, .cluster, or .grid-12. Then add one utility for the adjustment you need. If you are trying to center a div, first decide whether you want to center the block itself, center the children inside a flow, or center content on both axes inside a container.
Block and Text Alignment
Use these when the centering target is the element itself or just the text inside it.

.margin-inline-auto
.text-left
.text-center
.text-right
Flex and Grid Alignment
Use these on primitives that already define layout behavior.

.items-top, .items-middle, .items-bottom
.justify-start, .justify-center, .justify-end, .justify-between
.self-top, .self-middle, .self-bottom
.item-grow
.place-center
Spacing and Surface Helpers
Use these for small adjustments, not for page composition.

.margin-xxl, .margin-xl, .margin-tb-m, .margin-b-m, .margin-t-m
.padding-xxl, .padding-t-xxl, .padding-b-xxl, .padding-b-m, .padding-l, .padding-b-l, .padding-xl
.border-t, .border-b, .surface
.border-rs, .border-rm, .border-rl, .border-rxl
.aspect-standard

## Composition Model
Composition explains how foundations, icons, primitives, components, patterns, and utilities fit together in a predictable bottom-up page structure.
The canonical order is foundations first, then structure and reusable UI, then patterns, and finally utilities as the last-mile adjustment layer.
Page Shell
Use primitives such as section, container, and grid to establish structure before any reusable UI is placed.
Flow Layer
Use stack, row, cluster, and utilities to control rhythm and alignment inside a region.
Reusable UI
Place components inside the flow layer and keep their responsibility focused on interior structure and state.
Decision Rule
If a choice affects the page shell, it belongs in primitives or patterns. If it affects the inside of one reusable unit, it belongs in components.

### Composition Examples
Use a clear three-layer composition model for predictable pages and reusable UI.
Canonical composition uses page-shell primitives for structure, flow primitives for rhythm, and components only for reusable UI. Treat older convenience selectors as compatibility helpers, not the primary API for new pages. Alignment belongs to utilities layered on top of primitives, not to components or ad-hoc page-specific selectors. The dedicated Utilities docs cover centering and alignment choices in detail.

### 3 Layers
Page shell controls structure.
Content flow controls rhythm.
Components control their own interior.
Do not let components own page layout or page rhythm.

### Canonical Pattern
section → container → stack → (intro + row/cluster/grid) → components
Add alignment utilities only after the primitive is in place: for example row items-middle justify-between, row justify-center items-middle, item-grow, self-bottom, or margin-inline-auto when one constrained block needs horizontal centering.

### Three-Layer Page Structure
Start with page shell, add flow rhythm inside the region, then place components inside that flow.
Use utilities like .items-middle, .justify-center, .item-grow, or .self-bottom to refine the primitive layer.

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


### Settings Screen Composition
Use a grid-based page shell to pair a primary form region with supporting workspace panels and action regions.
Use a grid-based page shell to pair a primary form region with supporting workspace panels and action regions.

<div class="grid-12">
  <article class="card md-col-12 lg-col-8">...main form...</article>
  <aside class="card md-col-12 lg-col-4">...supporting context...</aside>
</div>

### Dashboard Snapshot Composition
Use repeated cards inside a grid for high-level summaries, then follow with larger operational regions below.

<div class="grid-12">
  <article class="card md-col-6 lg-col-4">...metric...</article>
  <article class="card md-col-6 lg-col-4">...metric...</article>
  <article class="card md-col-12 lg-col-4">...metric...</article>
</div>

<div class="grid-12">
  <article class="card md-col-12 lg-col-8">...activity...</article>
  <aside class="card md-col-12 lg-col-4">...actions...</aside>
</div>


## Strict AI Compliance Additions

### 1. Absolute Layout Prohibitions
- **NO INLINE STYLES:** Under no circumstances are you permitted to write the HTML `style="..."` attribute. If a spacing or utility adjustment is required, you must strictly choose an available helper from the `Utilities` library (e.g., `.margin-b-m`, `.padding-xl`).
- **NO CUSTOM CSS/STYLE BLOCKS:** Do not generate appended `<style>` tags or create custom CSS selector rules inside HTML/JSX files. If a design requirement cannot be fulfilled by the current token set, use the closest existing structural class.