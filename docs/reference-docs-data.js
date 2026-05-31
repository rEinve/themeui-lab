export const referenceDocs = {
  foundations: {
    sectionName: 'Foundations',
    items: {
      colors: {
        name: 'Colors',
        summary: 'Defines the shared color tokens used across surfaces, text, accents, and system states.',
        accomplishes:
          'Color tokens create a stable visual language so components and patterns can share the same palettes without hard-coded values.',
        howToUse: [
          'Use exported color variables such as `--color-surface-*`, `--color-text-*`, and `--color-accent`.',
          'Choose semantic tokens based on role, not based on one screen or product case.',
          'Keep component and layout styles token-driven so color updates stay centralized.',
        ],
        keyItems: ['--color-surface-*', '--color-text-*', '--color-accent', '--color-outline-variant'],
        preview: `
          <div class="grid-12">
            <div class="md-col-6 lg-col-3"><div class="utility-frame surface">surface</div></div>
            <div class="md-col-6 lg-col-3"><div class="utility-frame" style="background: var(--color-accent); color: var(--color-surface-100);">accent</div></div>
            <div class="md-col-6 lg-col-3"><div class="utility-frame" style="background: var(--color-surface-95);">surface-95</div></div>
            <div class="md-col-6 lg-col-3"><div class="utility-frame" style="border: 1px solid var(--color-outline-variant);">outline</div></div>
          </div>
        `,
        code: `background: var(--color-surface-100);
color: var(--color-text-primary);
border-color: var(--color-outline-variant);`,
      },
      spacing: {
        name: 'Spacing',
        summary: 'Provides the shared spacing scale used by layout primitives and component rhythm.',
        accomplishes:
          'Spacing tokens keep vertical rhythm, padding, and page gutters consistent across the system.',
        howToUse: [
          'Use spacing tokens through primitives such as `.stack`, `.row`, and `.grid-12` whenever possible.',
          'Use spacing utilities only for small adjustments after the primitive is already in place.',
          'Avoid one-off spacing values in product code when an existing token fits the need.',
        ],
        keyItems: ['--space-xxs', '--space-xs', '--space-s', '--space-m', '--space-l', '--space-xl', '--space-xxl'],
        preview: `
          <div class="stack stack--xs">
            <div class="row items-middle"><span>--space-xs</span><div style="width: var(--space-xs); height: 0.5rem; background: var(--color-accent);"></div></div>
            <div class="row items-middle"><span>--space-m</span><div style="width: var(--space-m); height: 0.5rem; background: var(--color-accent);"></div></div>
            <div class="row items-middle"><span>--space-xl</span><div style="width: var(--space-xl); height: 0.5rem; background: var(--color-accent);"></div></div>
          </div>
        `,
        code: `.stack {
  gap: var(--space-m);
}`,
      },
      typography: {
        name: 'Typography',
        summary: 'Defines the shared type roles used for hierarchy, reading rhythm, and labels.',
        accomplishes:
          'Typography tokens and role classes keep headings, body copy, and labels readable and consistently ranked.',
        howToUse: [
          'Use existing type roles for display, body, and label content instead of inventing one-off sizes.',
          'Keep hierarchy consistent across pages so the docs and design system read predictably.',
          'Use expressive roles for key headings and calmer body roles for longer text.',
        ],
        keyItems: ['display roles', 'body roles', 'label roles', 'eyebrow', 'lead'],
        preview: `
          <div class="stack stack--xs">
            <p class="eyebrow">System Typography</p>
            <h2 class="display-s">Clear hierarchy starts with stable type roles.</h2>
            <p class="lead">Body copy stays readable when headline and supporting text use predictable type relationships.</p>
          </div>
        `,
        code: `<p class="eyebrow">System Typography</p>
<h2 class="display-s">Clear hierarchy starts with stable type roles.</h2>
<p class="lead">Body copy stays readable when headline and supporting text use predictable type relationships.</p>`,
      },
      radius: {
        name: 'Radius',
        summary: 'Controls the system shape language for surfaces, media, and interactive controls.',
        accomplishes:
          'Radius tokens ensure cards, controls, and media feel related while still using the right shape family for their role.',
        howToUse: [
          'Use semantic radius families for containers, controls, and media.',
          'Keep radius choices consistent within a pattern unless the contrast is intentional.',
          'Use base radius scale only when the semantic families do not already fit the need.',
        ],
        keyItems: ['--radius-container-*', '--radius-control-*', '--radius-media-*', '--radius-pill'],
        preview: `
          <div class="cluster">
            <div class="card" style="border-radius: var(--radius-container-md);">container</div>
            <button class="button" type="button" style="border-radius: var(--radius-control-md);">control</button>
            <span class="tag" style="border-radius: var(--radius-pill);">pill</span>
          </div>
        `,
        code: `.card { border-radius: var(--radius-container-md); }
.button { border-radius: var(--radius-control-md); }`,
      },
      shadows: {
        name: 'Shadows',
        summary: 'Defines elevation treatments for surfaces that need depth and separation.',
        accomplishes:
          'Shadow tokens create consistent elevation cues without one-off box-shadow values scattered across the system.',
        howToUse: [
          'Use shared shadow tokens for elevated surfaces and overlays.',
          'Apply shadows when the component truly needs depth, not by default on every surface.',
          'Keep shadow strength aligned with the system elevation scale.',
        ],
        keyItems: ['shadow elevation tokens', 'surface separation', 'overlay depth'],
        preview: `
          <div class="grid-12">
            <article class="card md-col-12 lg-col-6" style="box-shadow: var(--shadow-elevation-1);">Elevation 1</article>
            <article class="card md-col-12 lg-col-6" style="box-shadow: var(--shadow-elevation-2);">Elevation 2</article>
          </div>
        `,
        code: `box-shadow: var(--shadow-elevation-1);`,
      },
      motion: {
        name: 'Motion',
        summary: 'Defines shared timing and easing tokens for transitions and interaction feedback.',
        accomplishes:
          'Motion tokens keep transitions coherent across interactive elements without creating animation drift.',
        howToUse: [
          'Use shared motion timing and easing values for hover, focus, tab, and carousel transitions.',
          'Keep motion supportive and lightweight rather than decorative.',
          'Reuse existing timing tokens before introducing a new duration or easing curve.',
        ],
        keyItems: ['motion timing tokens', 'easing tokens', 'interactive transitions'],
        preview: `
          <button class="button" type="button" style="transition: transform var(--motion-fast) var(--motion-ease-standard);">Hover token-driven button</button>
        `,
        code: `transition: transform var(--motion-fast) var(--motion-ease-standard);`,
      },
      root: {
        name: 'Root Tokens',
        summary: 'Exports the system token contract into CSS variables at the root layer.',
        accomplishes:
          'The root layer makes shared tokens available everywhere so all later layers can consume a stable contract.',
        howToUse: [
          'Treat the root token export as the system source of truth.',
          'Reference the exported variables from later layers rather than duplicating values.',
          'Keep root tokens stable so downstream layers remain predictable.',
        ],
        keyItems: [':root token export', 'global CSS variables', 'shared contract'],
        preview: `
          <article class="card stack stack--xs">
            <h3 class="card__title">Root Contract</h3>
            <p class="card__text">All later layers consume CSS variables defined at the root token layer.</p>
          </article>
        `,
        code: `:root {
  --color-accent: ...;
  --space-m: ...;
}`,
      },
    },
  },
  icons: {
    sectionName: 'Icons',
    items: {
      regular: {
        name: 'Regular Icons',
        summary: 'The default Material Icons style for the system.',
        accomplishes: 'Regular icons provide the baseline icon treatment for most UI and documentation contexts.',
        howToUse: [
          'Default to `.material-icons` unless a different style is intentionally needed.',
          'Use meaningful ligature names and pair icons with accessible labels where needed.',
        ],
        keyItems: ['.material-icons'],
        preview: `<div class="cluster"><span class="material-icons" aria-hidden="true">home</span><span class="material-icons" aria-hidden="true">settings</span><span class="material-icons" aria-hidden="true">favorite</span></div>`,
        code: `<span class="material-icons" aria-hidden="true">home</span>`,
      },
      outlined: {
        name: 'Outlined Icons',
        summary: 'A lighter icon style used when outlined treatment is intentional.',
        accomplishes: 'Outlined icons provide a softer, less dense visual treatment than the default regular style.',
        howToUse: ['Use `.material-icons-outlined` only when the design intentionally calls for outlined icon treatment.'],
        keyItems: ['.material-icons-outlined'],
        preview: `<div class="cluster"><span class="material-icons-outlined" aria-hidden="true">home</span><span class="material-icons-outlined" aria-hidden="true">search</span></div>`,
        code: `<span class="material-icons-outlined" aria-hidden="true">search</span>`,
      },
      round: {
        name: 'Round Icons',
        summary: 'A more rounded icon style for softer visual expression.',
        accomplishes: 'Round icons offer a friendlier icon style while still using the same ligature API.',
        howToUse: ['Use `.material-icons-round` when a softer style is needed and the variance is intentional.'],
        keyItems: ['.material-icons-round'],
        preview: `<div class="cluster"><span class="material-icons-round" aria-hidden="true">home</span><span class="material-icons-round" aria-hidden="true">check_circle</span></div>`,
        code: `<span class="material-icons-round" aria-hidden="true">home</span>`,
      },
      sharp: {
        name: 'Sharp Icons',
        summary: 'A sharper icon style for more angular visual emphasis.',
        accomplishes: 'Sharp icons can create a slightly crisper feeling when that visual direction is intentional.',
        howToUse: ['Use `.material-icons-sharp` sparingly and consistently within the same UI context.'],
        keyItems: ['.material-icons-sharp'],
        preview: `<div class="cluster"><span class="material-icons-sharp" aria-hidden="true">home</span><span class="material-icons-sharp" aria-hidden="true">build</span></div>`,
        code: `<span class="material-icons-sharp" aria-hidden="true">build</span>`,
      },
      'two-tone': {
        name: 'Two-Tone Icons',
        summary: 'A two-tone icon style for cases that intentionally need more layered visual emphasis.',
        accomplishes: 'Two-tone icons provide an alternate icon voice while still using the same shared package.',
        howToUse: ['Use `.material-icons-two-tone` only when the layered visual treatment is intentional and consistent.'],
        keyItems: ['.material-icons-two-tone'],
        preview: `<div class="cluster"><span class="material-icons-two-tone" aria-hidden="true">home</span><span class="material-icons-two-tone" aria-hidden="true">warning</span></div>`,
        code: `<span class="material-icons-two-tone" aria-hidden="true">warning</span>`,
      },
    },
  },
  primitives: {
    sectionName: 'Primitives',
    items: {
      container: {
        name: 'Container',
        summary: 'Constrains content width and provides shared page gutters.',
        accomplishes: 'Container centers content and keeps page width and side padding consistent across regions.',
        howToUse: [
          'Use `.container` inside sections to establish shared horizontal boundaries.',
          'Let container define width; do not recreate the same behavior inside components.',
        ],
        keyItems: ['.container'],
        preview: `<section class="section"><div class="container"><article class="card">Container keeps content framed and centered.</article></div></section>`,
        code: `<section class="section">
  <div class="container">...</div>
</section>`,
      },
      section: {
        name: 'Section',
        summary: 'Defines a page region boundary in the shell layer.',
        accomplishes: 'Sections break pages into meaningful regions without relying on component-specific layout wrappers.',
        howToUse: [
          'Use `.section` for page regions and major content group boundaries.',
          'Place container and flow primitives inside the section rather than mixing region logic into components.',
        ],
        keyItems: ['.section'],
        preview: `<section class="section"><div class="container"><div class="card">Section establishes a page region.</div></div></section>`,
        code: `<section class="section">...</section>`,
      },
      grid: {
        name: 'Grid',
        summary: 'Provides the page-level column structure for responsive layouts.',
        accomplishes: 'Grid creates predictable multi-column layouts while span classes control responsive width allocation.',
        howToUse: [
          'Use `.grid-12` for the parent and apply span classes such as `.md-col-*` and `.lg-col-*` to children.',
          'Offset a child with `.md-col-start-N` / `.lg-col-start-N`, or center an even-span block with `.md-col-N-centered` / `.lg-col-N-centered` (N ∈ 2, 4, 6, 8, 10).',
          'Reserve grid for page and region structure rather than component internals.',
        ],
        keyItems: ['.grid-12', '.md-col-*', '.lg-col-*', '.md-col-start-*', '.md-col-N-centered'],
        preview: `<div class="grid-12"><article class="card md-col-12 lg-col-8">Main</article><aside class="card md-col-12 lg-col-4">Sidebar</aside></div>`,
        code: `<div class="grid-12">
  <article class="card md-col-12 lg-col-8">Main</article>
  <aside class="card md-col-12 lg-col-4">Sidebar</aside>
</div>`,
      },
      stack: {
        name: 'Stack',
        summary: 'Creates consistent vertical rhythm between related blocks.',
        accomplishes: 'Stack simplifies vertical spacing so groups of content remain readable and predictable.',
        howToUse: [
          'Use `.stack` for vertical grouping and select a density modifier only when needed.',
          'Let stack own vertical rhythm instead of adding ad-hoc margins between siblings.',
        ],
        keyItems: ['.stack', '.stack--xs', '.stack--sm', '.stack--lg', '.stack--xl'],
        preview: `<div class="stack"><article class="card">Overview</article><article class="card">Details</article></div>`,
        code: `<div class="stack">
  <article class="card">Overview</article>
  <article class="card">Details</article>
</div>`,
      },
      row: {
        name: 'Row',
        summary: 'Creates a wrapping horizontal flow for related sibling items.',
        accomplishes: 'Row supports horizontal grouping, action bars, and summary lines while preserving wrap behavior.',
        howToUse: [
          'Use `.row` when related items should flow horizontally and wrap safely on smaller widths.',
          'Layer alignment utilities onto the row when you need distribution or cross-axis adjustment.',
        ],
        keyItems: ['.row'],
        preview: `<div class="row"><button class="button" type="button">Save</button><button class="button" type="button">Preview</button></div>`,
        code: `<div class="row">
  <button class="button" type="button">Save</button>
  <button class="button" type="button">Preview</button>
</div>`,
      },
      cluster: {
        name: 'Cluster',
        summary: 'Creates a tighter horizontal grouping for compact related items.',
        accomplishes: 'Cluster works well for tags, metadata, icon actions, and short compact groups of related inline items.',
        howToUse: [
          'Use `.cluster` when the group is tighter and more compact than a general-purpose row.',
          'Cluster is especially useful for tags, chips, metadata, and small action groupings.',
        ],
        keyItems: ['.cluster'],
        preview: `<div class="cluster"><span class="tag">Stable</span><span class="tag">Internal</span><span class="tag">Docs</span></div>`,
        code: `<div class="cluster">
  <span class="tag">Stable</span>
  <span class="tag">Internal</span>
</div>`,
      },
    },
  },
  patterns: {
    sectionName: 'Patterns',
    items: {
      'app-shell': {
        name: 'App Shell',
        summary: 'Coordinates the responsive top bar and off-canvas navigation shell.',
        accomplishes: 'App shell manages page-level navigation structure and responsive shell behavior across an application surface.',
        howToUse: [
          'Use the app shell at the page shell level, not inside reusable leaf components.',
          'Let the pattern manage nav behavior, while reusable UI elements stay in the component layer.',
        ],
        keyItems: ['.header', '.nav-container', '.site-nav', '.nav-toggle', '.nav-drawer'],
        preview: `<header class="header"><div class="container nav-container"><a class="navbar-brand" href="/">themeui-lab</a><nav class="site-nav"><button class="nav-toggle" type="button">Menu</button></nav></div></header>`,
        code: `<header class="header">
  <div class="container nav-container">...</div>
</header>`,
      },
      hero: {
        name: 'Hero',
        summary: 'Builds a landing-page introduction with content, actions, and optional supporting media.',
        accomplishes: 'Hero composes content hierarchy and visual emphasis into a reusable page introduction pattern.',
        howToUse: [
          'Use the hero pattern for top-of-page intros, not as a generic card replacement.',
          'Compose hero from existing primitives and components rather than inventing hero-only UI parts.',
        ],
        keyItems: ['.hero', '.hero__content', '.hero__actions', '.hero__media', '.grid-12', '.lg-col-7', '.lg-col-5'],
        preview: `<section class="hero grid-12"><div class="hero__content col-full lg-col-7"><span class="tag">Pattern</span><h2>Minimal hero</h2><p>Hero composes multiple pieces into one page introduction.</p></div><div class="hero__media col-full lg-col-5"><article class="card">Supporting media region</article></div></section>`,
        code: `<section class="hero grid-12">
  <div class="hero__content col-full lg-col-7">...</div>
  <div class="hero__media col-full lg-col-5">...</div>
</section>`,
      },
      'related-posts': {
        name: 'Related Posts',
        summary: 'Builds an editorial recommendation rail with section framing and carousel controls.',
        accomplishes: 'Related posts combines a section header, controls, and reusable post cards into one coordinated editorial pattern.',
        howToUse: [
          'Use the related-posts pattern when the page needs a cohesive recommendations section.',
          'Keep the card reusable and let the pattern own the section framing and controls.',
        ],
        keyItems: ['.related-posts', '.related-posts__header', '.related-posts__carousel'],
        preview: `<section class="related-posts"><div class="related-posts__header"><h3 class="related-posts__title">Related Posts</h3></div><div class="carousel"><div class="carousel__viewport"><div class="carousel__track"><div class="carousel__slide"><article class="post-card">...</article></div></div></div></div></section>`,
        code: `<section class="related-posts">
  <div class="related-posts__header">...</div>
  <div class="carousel related-posts__carousel">...</div>
</section>`,
      },
    },
  },
  utilities: {
    sectionName: 'Utilities',
    items: {
      alignment: {
        name: 'Alignment Utilities',
        summary: 'Refines cross-axis, self, and growth behavior on existing primitives.',
        accomplishes: 'Alignment utilities let a primitive adjust child alignment without creating custom layout selectors.',
        howToUse: [
          'Apply alignment utilities to an existing row, stack, cluster, or grid.',
          'Use `.items-*` for container cross-axis alignment and `.self-*` for one child override.',
          'Use `.item-grow` when one flex item should absorb remaining space.',
        ],
        keyItems: ['.items-top', '.items-middle', '.items-bottom', '.self-top', '.self-middle', '.self-bottom', '.item-grow'],
        preview: `<div class="row items-middle"><p class="card__text item-grow">Summary grows</p><button class="button" type="button">Action</button></div>`,
        code: `<div class="row items-middle">
  <p class="item-grow">Summary grows</p>
  <button class="button" type="button">Action</button>
</div>`,
      },
      centering: {
        name: 'Centering Utilities',
        summary: 'Handles horizontal and two-axis centering with the smallest possible adjustment.',
        accomplishes: 'Centering utilities solve common block and content centering cases without forcing a custom wrapper class.',
        howToUse: [
          'Use `.margin-inline-auto` to center a constrained block itself.',
          'Use `.justify-center` on a row when the row content should gather in the middle.',
          'Use `.place-center` only when grid items should center inside their own grid areas.',
        ],
        keyItems: ['.margin-inline-auto', '.justify-center', '.place-center'],
        preview: `<div class="utility-frame"><div class="card utility-sample margin-inline-auto">Centered panel</div></div>`,
        code: `<div class="card utility-sample margin-inline-auto">Centered panel</div>`,
      },
      spacing: {
        name: 'Spacing Utilities',
        summary: 'One-off margin and padding adjustments with full direction × size control.',
        accomplishes: 'Spacing utilities cover the gap between primitive rhythm and the small, contextual corrections that arise inside real content — any direction, any token size — without reaching for a new component or a one-off selector.',
        howToUse: [
          'Always let a primitive (`.stack`, `.row`, `.cluster`, `.grid-12`) handle the main rhythm first. Use spacing utilities only for the residual adjustment.',
          'The full scale class pattern is `.padding-{direction}-{size}` and `.margin-{direction}-{size}`. Example: `.padding-t-xl` adds `padding-top: var(--space-xl)` (2 rem).',
          'Directions: `-t` top · `-b` bottom · `-l` left · `-r` right · `-x` inline (horizontal) · `-y` block (vertical).',
          'Sizes: `-xxs` 0.25 rem · `-xs` 0.5 rem · `-s` 0.75 rem · `-m` 1 rem · `-l` 1.5 rem · `-xl` 2 rem · `-xxl` 3 rem.',
          'The bare forms `.padding`, `.padding-t`, etc. use the base `--space` (1 rem). The `-king` family uses a fluid `clamp(3 rem → 5 rem)` — appropriate for hero and section gaps.',
          'Use `.gap-*` utilities to override the gap on a flex or grid container when the primitive default is too tight or too loose for a specific context.',
        ],
        keyItems: [
          '.padding  /  .padding-{t|b|l|r|x|y}  (base 1 rem)',
          '.padding-{t|b|l|r|x|y}-{xxs|xs|s|m|l|xl|xxl}  (scale)',
          '.padding-king  /  .padding-{t|b|l|r|x|y}-king  (fluid)',
          '.margin  /  .margin-{t|b|l|r|x|y}  (base 1 rem)',
          '.margin-{t|b|l|r|x|y}-{xxs|xs|s|m|l|xl|xxl}  (scale)',
          '.margin-king  /  .margin-{t|b|l|r|x|y}-king  (fluid)',
          '.margin-inline-auto  /  .gap-{xxs|xs|s|m|l|xl}',
        ],
        preview: `
          <div class="stack stack--lg">
            <div class="stack stack--xs">
              <p class="card__text" style="font-weight:var(--weight-medium)">Direction × size — padding-top scale</p>
              <div class="stack stack--xs">
                <div style="background:var(--color-surface-95);padding-top:var(--space-xs);border:1px solid var(--color-outline-variant);border-radius:var(--radius-s);padding-left:var(--space-s);font-size:var(--text-sm);">.padding-t-xs &nbsp;<em style="opacity:.6">0.5 rem</em></div>
                <div style="background:var(--color-surface-95);padding-top:var(--space-m);border:1px solid var(--color-outline-variant);border-radius:var(--radius-s);padding-left:var(--space-s);font-size:var(--text-sm);">.padding-t-m &nbsp;<em style="opacity:.6">1 rem</em></div>
                <div style="background:var(--color-surface-95);padding-top:var(--space-xl);border:1px solid var(--color-outline-variant);border-radius:var(--radius-s);padding-left:var(--space-s);font-size:var(--text-sm);">.padding-t-xl &nbsp;<em style="opacity:.6">2 rem</em></div>
                <div style="background:var(--color-surface-95);padding-top:var(--space-xxl);border:1px solid var(--color-outline-variant);border-radius:var(--radius-s);padding-left:var(--space-s);font-size:var(--text-sm);">.padding-t-xxl &nbsp;<em style="opacity:.6">3 rem</em></div>
              </div>
            </div>
            <div class="stack stack--xs">
              <p class="card__text" style="font-weight:var(--weight-medium)">King — fluid large-section gap</p>
              <div class="padding-y-king" style="background:var(--color-surface-95);border:1px solid var(--color-outline-variant);border-radius:var(--radius-s);padding-left:var(--space-s);font-size:var(--text-sm);">.padding-y-king &nbsp;<em style="opacity:.6">clamp(3 rem → 5 rem)</em></div>
            </div>
            <div class="stack stack--xs">
              <p class="card__text" style="font-weight:var(--weight-medium)">Gap scale</p>
              <div class="flex gap-xs" style="align-items:center;">
                <span class="tag">.gap-xs</span>
                <span class="tag">.gap-s</span>
                <span class="tag">.gap-m</span>
                <span class="tag">.gap-l</span>
                <span class="tag">.gap-xl</span>
              </div>
            </div>
          </div>
        `,
        code: `<!-- Direction + size: .padding-{dir}-{size} -->
<article class="card padding-y-xl">...</article>
<header class="padding-x-m padding-t-l">...</header>

<!-- Margin scale -->
<section class="margin-b-xl">...</section>
<div class="margin-t-s">...</div>

<!-- King — fluid large-section spacing -->
<section class="padding-y-king">...</section>

<!-- Centering -->
<div class="margin-inline-auto" style="max-width: 40rem;">...</div>

<!-- Gap override on a flex/grid container -->
<div class="cluster gap-xs">...</div>
<div class="row gap-l">...</div>`,
      },
      radius: {
        name: 'Radius Utilities',
        summary: 'Applies border-radius tokens to any element without creating a component variant.',
        accomplishes: 'Radius utilities give every element in the system access to the shared radius scale — from subtle card rounding to fully circular badges — without writing one-off CSS.',
        howToUse: [
          'Use `.border-rs` through `.border-rxl` for the standard surface scale (cards, panels, inputs, images).',
          'Use `.border-rfull` for avatars, icon badges, or anything that should be a perfect circle — pair it with equal width and height.',
          'Use `.border-rpill` for pill-shaped buttons, tags, and status chips where the ends should be fully rounded but the element is wider than it is tall.',
          'Do not apply radius utilities inside a component that already owns its own border-radius — override the component token instead.',
          'Semantic token groups (container-*, media-*, control-*) are used inside component internals and are not general-purpose utilities.',
        ],
        keyItems: [
          '.border-rs   — radius-s  (0.5 rem)',
          '.border-rm   — radius-m  (0.875 rem)',
          '.border-rl   — radius-l  (1.5 rem)',
          '.border-rxl  — radius-xl (2 rem)',
          '.border-rfull — radius-full (9999px)',
          '.border-rpill — radius-pill (999px)',
        ],
        preview: `
          <div class="stack stack--sm">
            <div class="row gap-m" style="flex-wrap:wrap;">
              <div style="background:var(--color-surface-95);border:1px solid var(--color-outline-variant);padding:var(--space-m) var(--space-l);border-radius:var(--radius-s);font-size:var(--text-sm);">.border-rs</div>
              <div style="background:var(--color-surface-95);border:1px solid var(--color-outline-variant);padding:var(--space-m) var(--space-l);border-radius:var(--radius-m);font-size:var(--text-sm);">.border-rm</div>
              <div style="background:var(--color-surface-95);border:1px solid var(--color-outline-variant);padding:var(--space-m) var(--space-l);border-radius:var(--radius-l);font-size:var(--text-sm);">.border-rl</div>
              <div style="background:var(--color-surface-95);border:1px solid var(--color-outline-variant);padding:var(--space-m) var(--space-l);border-radius:var(--radius-xl);font-size:var(--text-sm);">.border-rxl</div>
            </div>
            <div class="row gap-m" style="flex-wrap:wrap;align-items:center;">
              <div style="background:var(--color-accent);width:3rem;height:3rem;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;color:var(--color-surface-100);font-size:var(--text-sm);">full</div>
              <div style="background:var(--color-surface-95);border:1px solid var(--color-outline-variant);padding:var(--space-xs) var(--space-l);border-radius:var(--radius-pill);font-size:var(--text-sm);">.border-rpill</div>
            </div>
          </div>
        `,
        code: `<!-- Standard surface rounding -->
<article class="card border-rm">...</article>
<img class="border-rl" src="..." alt="..." />

<!-- Fully circular avatar -->
<div class="border-rfull" style="width: 3rem; height: 3rem;">
  <img src="avatar.jpg" alt="..." />
</div>

<!-- Pill-shaped tag or badge -->
<span class="tag border-rpill">New</span>`,
      },
      surface: {
        name: 'Surface Utilities',
        summary: 'Adds light surface and edge treatments without creating a new component.',
        accomplishes: 'Surface helpers provide quick border and background refinements for small composition adjustments.',
        howToUse: [
          'Use `.surface`, `.border-t`, and `.border-b` when a small visual distinction is needed.',
          'Keep these adjustments lightweight and avoid turning them into page-specific component variants.',
        ],
        keyItems: ['.surface', '.border-t', '.border-b'],
        preview: `<article class="card surface border-t">Surface and border helpers can refine a block without replacing the card.</article>`,
        code: `<article class="card surface border-t">...</article>`,
      },
      text: {
        name: 'Text Utilities',
        summary: 'Adjusts inline text alignment without changing the surrounding layout primitive.',
        accomplishes: 'Text utilities let content align left, center, right, or uppercase while the structural rhythm remains the same.',
        howToUse: [
          'Use text utilities when only the text alignment should change.',
          'Use `.uppercase` when a label or short phrase needs stronger emphasis without creating a special component variant.',
          'Do not use text alignment utilities as a substitute for layout alignment logic.',
        ],
        keyItems: ['.text-left', '.text-center', '.text-right', '.uppercase'],
        preview: `<div class="stack stack--xs text-center"><h3 class="uppercase">Centered label</h3><p class="card__text">The stack rhythm stays intact while text utilities adjust presentation only.</p></div>`,
        code: `<div class="stack stack--xs text-center">
  <h3 class="uppercase">Centered label</h3>
</div>`,
      },
    },
  },
  composition: {
    sectionName: 'Composition',
    items: {
      'page-shell': {
        name: 'Page Shell Layer',
        summary: 'The structural layer responsible for regions, width, and large-scale page arrangement.',
        accomplishes: 'Page shell establishes the major layout boundaries before any content flow or reusable UI is placed.',
        howToUse: [
          'Use section, container, and grid at this layer.',
          'Keep page-shell responsibility outside of components so the structure stays reusable.',
        ],
        keyItems: ['section', 'container', 'grid-12'],
        preview: `<section class="section"><div class="container"><div class="grid-12"><article class="card md-col-12 lg-col-8">Main</article><aside class="card md-col-12 lg-col-4">Side</aside></div></div></section>`,
        code: `section → container → grid`,
      },
      flow: {
        name: 'Flow Layer',
        summary: 'The rhythm layer that organizes content inside an established region.',
        accomplishes: 'Flow determines grouping, vertical rhythm, horizontal grouping, and small alignment refinements inside a region.',
        howToUse: [
          'Use stack, row, cluster, and utilities after the page shell exists.',
          'Keep flow concerns outside component internals so grouping stays reusable.',
        ],
        keyItems: ['stack', 'row', 'cluster', 'utilities'],
        preview: `<div class="stack stack--lg"><div class="stack stack--xs"><h3>Header</h3><p>Flow handles rhythm.</p></div><div class="row items-middle justify-between"><p>Actions align at the flow layer.</p><button class="button" type="button">Save</button></div></div>`,
        code: `stack → intro + row/cluster`,
      },
      'component-layer': {
        name: 'Component Layer',
        summary: 'The reusable UI layer responsible for surface, state, and interior structure.',
        accomplishes: 'Components package repeated UI without taking control of section spacing or page shell layout.',
        howToUse: [
          'Place components inside the shell and flow layers.',
          'Keep component scope focused on the inside of the reusable unit.',
        ],
        keyItems: ['buttons', 'cards', 'fields', 'tables', 'tabs'],
        preview: `<article class="card stack stack--xs"><h3 class="card__title">Component region</h3><p class="card__text">Components live inside the established flow.</p></article>`,
        code: `page shell → flow → components`,
      },
      'canonical-pattern': {
        name: 'Canonical Pattern',
        summary: 'The preferred composition order for most pages in the system.',
        accomplishes: 'The canonical pattern reduces guesswork by showing the order layers should be assembled.',
        howToUse: [
          'Start with page shell, add content flow, then place reusable UI.',
          'Use utilities only as refinements layered on top of primitives.',
        ],
        keyItems: ['section → container → stack → row/grid → components'],
        preview: `<article class="card stack stack--xs"><p class="card__text">section → container → stack → (intro + row/cluster/grid) → components</p></article>`,
        code: `section → container → stack → (intro + row/cluster/grid) → components`,
      },
    },
  },
  rules: {
    sectionName: 'Rules',
    items: {
      'primitives-control-layout': {
        name: 'Primitives Control Layout',
        summary: 'Layout responsibility belongs in primitives rather than components.',
        accomplishes: 'This rule prevents reusable UI from becoming tightly coupled to one page layout.',
        howToUse: [
          'Use section, container, grid, stack, row, and cluster for page structure.',
          'Do not hide page shell logic inside a component class.',
        ],
        keyItems: ['section', 'container', 'grid', 'stack', 'row', 'cluster'],
        preview: `<div class="grid-12"><article class="card md-col-12 lg-col-8">Main content region</article><aside class="card md-col-12 lg-col-4">Secondary region</aside></div>`,
        code: `Primitives own structure. Components do not own page layout.`,
      },
      'components-control-interior': {
        name: 'Components Control Interior',
        summary: 'Components should control their own interior structure, not the surrounding page shell.',
        accomplishes: 'This rule keeps components portable across different layouts and patterns.',
        howToUse: [
          'Use components for surface, internal spacing, and repeated UI logic.',
          'Keep outer layout concerns in primitives and patterns.',
        ],
        keyItems: ['component interior', 'surface', 'state'],
        preview: `<article class="card stack stack--xs"><h3 class="card__title">Reusable interior</h3><p class="card__text">The card styles itself while placement comes from the outer primitive.</p></article>`,
        code: `Components own the inside, not the page shell.`,
      },
      'use-tokens': {
        name: 'Use Tokens',
        summary: 'Shared token values should be used instead of hard-coded design values.',
        accomplishes: 'This rule keeps visual changes centralized and reduces repeated styling decisions.',
        howToUse: [
          'Prefer color, spacing, radius, shadow, and motion tokens from foundations.',
          'Add new tokens only when the need is truly shared and reusable.',
        ],
        keyItems: ['foundations tokens', 'CSS variables', 'shared contract'],
        preview: `<article class="card" style="background: var(--color-surface-100); border-color: var(--color-outline-variant);">Token-driven surface</article>`,
        code: `background: var(--color-surface-100);`,
      },
      'prefer-composition': {
        name: 'Prefer Composition',
        summary: 'Reuse existing building blocks before creating new abstractions.',
        accomplishes: 'Composition-first thinking keeps the system smaller and reduces drift from one-off solutions.',
        howToUse: [
          'Try assembling the need from existing primitives, components, patterns, and utilities first.',
          'Create new abstractions only when the need is stable and reusable.',
        ],
        keyItems: ['reuse existing primitives', 'reuse existing components', 'avoid one-off abstractions'],
        preview: `<div class="stack"><div class="row justify-between items-middle"><h3>Workspace</h3><button class="button" type="button">Create</button></div><article class="card">Composed from existing parts.</article></div>`,
        code: `Prefer assembly before invention.`,
      },
      'keep-system-small': {
        name: 'Keep the System Small',
        summary: 'Only stable, reusable pieces should enter the design system.',
        accomplishes: 'This rule protects maintainability as the documentation and codebase grow.',
        howToUse: [
          'Add a new system primitive or component only when it solves a repeated cross-product need.',
          'Keep product-specific layout or behavior outside the core system.',
        ],
        keyItems: ['stable', 'reusable', 'maintainable'],
        preview: `<article class="card stack stack--xs"><h3 class="card__title">Small systems scale better</h3><p class="card__text">Every addition should justify its place in the shared library.</p></article>`,
        code: `Add only reusable building blocks.`,
      },
    },
  },
};
