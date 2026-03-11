# Grid Primitive Usage

`grid` is the layout primitive for page/content areas that need predictable multi-column structure.

Use it when you need columns that respond by breakpoint. Keep content styling in components (`.card`) and use grid only for placement.
Primitives control layout; components control interior structure.

## Canonical Selectors

- `.grid-12` - canonical 12-column grid container
- `.col-full` - span full width
- `.md-col-6` / `.md-col-12` - medium breakpoint spans
- `.lg-col-4` / `.lg-col-8` - large breakpoint spans

## Legacy Aliases (Compatibility Only)

- `.page-grid`
- `.content-grid`

These aliases still work for migration safety, but new code should use `.grid-12`.

## Grid vs Row vs Cluster

- Use `.grid-12` for page or section layout where column spans matter.
- Use `.row` for simple horizontal grouping with wrapping and equal flow.
- Use `.cluster` for small inline groups (chips, actions, metadata).

If you are deciding between them: choose `grid` for structure, `row` for flow, `cluster` for compact UI grouping.

## Page Layout Example (Canonical)

```html
<section class="section">
  <div class="container">
    <div class="grid-12">
      <article class="card md-col-12 lg-col-8">
        <h3 class="card__title">Main Content</h3>
        <p class="card__text">Primary column in a 12-col layout.</p>
      </article>

      <aside class="card md-col-12 lg-col-4">
        <h3 class="card__title">Sidebar</h3>
        <p class="card__text">Secondary column content.</p>
      </aside>
    </div>
  </div>
</section>
```

## Do / Do Not

- Do use `.container` for horizontal page framing around `.grid-12`.
- Do keep grid classes focused on layout only.
- Do pair grid with reusable components like `.card`.
- Do not use legacy aliases for new implementation work.
- Do not use grid for small inline control groups; use `.cluster` instead.
