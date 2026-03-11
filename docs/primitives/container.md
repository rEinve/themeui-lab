# Container Primitive Usage

`container` is the horizontal framing primitive for page sections.

Use it to center content and apply consistent page gutters. Container controls width and horizontal padding only; pair it with other primitives for vertical or column layout.
Primitives control layout; components control interior structure.

## Canonical Selector

- `.container` - canonical page/content frame

## Legacy Aliases (Compatibility Only)

- `.frame`
- `.section-shell`
- `.page-grid` (historical compatibility)

Notes:
- `.grid-12` also receives container framing in current CSS for backward compatibility, but new code should treat `.grid-12` as a grid primitive and apply `.container` explicitly.

## Container vs Grid vs Stack vs Row

- Use `.container` for horizontal bounds and gutters.
- Use `.grid-12` for column layout inside a container.
- Use `.stack` for vertical flow.
- Use `.row` for simple horizontal flow with wrapping.

Container sets the frame; other primitives set the internal layout.

## Page Layout Example (Canonical)

```html
<section class="section">
  <div class="container">
    <div class="stack">
      <article class="card">
        <h3 class="card__title">Framed Content</h3>
        <p class="card__text">This block stays within consistent page gutters.</p>
      </article>
    </div>
  </div>
</section>
```

## Do / Do Not

- Do wrap major page sections with `.container`.
- Do combine container with `.section` and other primitives.
- Do keep container focused on horizontal framing.
- Do not use legacy aliases in new implementation work.
- Do not rely on grid classes alone for page framing in new code.
