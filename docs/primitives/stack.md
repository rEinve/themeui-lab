# Stack Primitive Usage

`stack` is the default vertical layout primitive for ordering content with consistent spacing.

Use it for vertical rhythm inside sections, cards, forms, and content groups. Keep visual styling in components; use stack for layout flow.

Page shell controls structure.
Content flow controls rhythm.
Components control their own interior.
Do not let components own page layout or page rhythm.

## Canonical Selectors

- `.stack` - canonical vertical flow container
- `.stack--xs` - extra-tight rhythm
- `.stack--sm` - tight rhythm
- `.stack--lg` - loose rhythm
- `.stack--xl` - extra-loose rhythm

## Legacy Aliases (Compatibility Only)

- `.stack-tight`
- `.stack-loose`

These aliases still work during migration, but new code should use `.stack`.

## Stack vs Row vs Cluster vs Grid

- Use `.stack` for vertical flow and consistent top-to-bottom spacing.
- Use `.row` for horizontal flow with wrapping.
- Use `.cluster` for compact inline groups (actions/chips/meta).
- Use `.grid-12` for column-based page/section structure.

If spacing and reading order are primarily vertical, choose `stack`.

## Page Layout Example (Canonical)

```html
<section class="section">
  <div class="container">
    <div class="stack stack--lg">
      <article class="card">
        <h3 class="card__title">Overview</h3>
        <p class="card__text">Top content block in vertical flow.</p>
      </article>

      <article class="card stack stack--xs">
        <h3 class="card__title">Details</h3>
        <p class="card__text">Second block naturally spaced below.</p>
      </article>
    </div>
  </div>
</section>
```

## Do / Do Not

- Do use `.stack` as the default vertical layout primitive.
- Do use stack modifiers (`--xs`, `--sm`, `--lg`, `--xl`) to set page rhythm intentionally.
- Do compose stack with `.section`, `.container`, and components like `.card`.
- Do keep stack concerns to spacing/flow only.
- Do not use legacy stack aliases in new code.
- Do not use stack when column spans are required; use `.grid-12` instead.
