# Row Primitive Usage

`row` is the horizontal flow primitive for placing items side by side with wrapping.

Use it when elements should flow left-to-right and wrap naturally on smaller widths. Keep visual styling in components; use row for arrangement.
Primitives control layout; components control interior structure.

## Canonical Selector

- `.row` - canonical horizontal flow container with wrap and gap

## Legacy Aliases

- None currently.

## Row vs Stack vs Cluster vs Grid

- Use `.row` for horizontal groups that can wrap naturally.
- Use `.stack` for vertical flow and reading rhythm.
- Use `.cluster` for compact inline groups (chips/actions/meta).
- Use `.grid-12` when explicit column spans are needed.

If you need simple horizontal layout without column math, choose `row`.

## Page Layout Example (Canonical)

```html
<section class="section">
  <div class="container">
    <div class="row">
      <article class="card">Summary</article>
      <article class="card">Metrics</article>
      <article class="card">Actions</article>
    </div>
  </div>
</section>
```

## Do / Do Not

- Do use `.row` for simple horizontal composition with wrapping.
- Do combine row with reusable components like `.card`.
- Do keep row focused on layout flow only.
- Do not use row when vertical flow is primary; use `.stack`.
- Do not use row for strict multi-column page structure; use `.grid-12`.
