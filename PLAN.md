## Themeui-lab Stabilization Plan (No Feature Expansion)

### Summary
Ship a **v1-stable core** by hardening what already exists: token contract, primitive contract, and the 5 core components (`button`, `card`, `input`, `textarea`, `tag`). Keep visuals the same, reduce ambiguity, and make usage predictable for internal teams.

### Key Implementation Changes
1. **Lock a canonical token contract in foundations**
- Keep current token families, but classify each token as `canonical` or `legacy-alias`.
- Remove accidental/stray aliases only when confirmed unused; otherwise keep with explicit deprecation comments.
- Normalize naming consistency (`color-*`, `space-*`, `radius-*`, `shadow-*`, `motion-*`) and document expected consumption via CSS vars.
- Ensure `:root` export order stays deterministic and unchanged across builds.

2. **Stabilize primitive API without adding new primitives**
- Keep canonical primitives: `container`, `stack`, `row`, `cluster`, `grid`, `section`.
- Treat alternate legacy selectors (where present) as compatibility shims, not primary API.
- Add short inline deprecation notes for non-canonical primitive aliases so future cleanup is intentional.
- Keep primitive behavior flat and composable (no new variants or abstraction layer).

3. **Finalize component contract for the 5 core components**
- Keep one minimal class contract per component (plus compatibility alias only where already needed).
- Align shared control metrics across `button`, `input`, `textarea`, `tag` using existing tokens (radius, spacing, line-height, border, focus ring behavior).
- Keep `card` as neutral surface container (no product-specific structure).
- Remove any remaining product-coupled styling from these component files.

4. **Tighten docs + demo as source-of-truth usage**
- Update README to match current reality (remove outdated references like non-core components).
- Keep demo page as a playground only; ensure it uses canonical class names and token usage patterns.
- Add a short “canonical vs legacy usage” note so adopters choose the right selectors.

### Test Plan
- Build validation: `npm run build` must pass with zero Sass deprecation warnings.
- Visual smoke check in demo: typography, color swatches, spacing bars, primitives, and 5 components render correctly at mobile and desktop widths.
- Regression check: compare compiled CSS size/class output before/after; only expected contract-cleanup changes should appear.
- API check: verify all canonical classes are present and legacy aliases (if retained) still function.

### Assumptions and Defaults
- No new components, patterns, themes, dark-mode expansion, or variant systems in this pass.
- Existing legacy selectors may remain temporarily for compatibility, but are explicitly marked deprecated.
- CSS custom properties remain the runtime source of truth; SCSS maps remain authoring source.
- “Best plan” is interpreted as the highest-leverage **stabilization/reusability** plan before any future feature expansion.
