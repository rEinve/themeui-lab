---
name: feedback_button_codex_rules
description: Codex rules for themeui-lab SCSS — no px, use space tokens, no unlisted colors
metadata:
  type: feedback
---

No raw px values — convert to rem (e.g. 3px → 0.1875rem, 1px → 0.0625rem). Exception: border hairlines (1px) are acceptable where semantically meaningful.

No raw rem values — always use `--space-*` tokens (e.g. `1rem` → `var(--space-m)`, `0.75rem` → `var(--space-s)`, `0.25rem` → `var(--space-xxs)`).

No new colors — only use tokens already defined in `src/scss/abstracts/_colors.scss`. Never introduce `oklch(...)` literals or computed `oklch(from var(...) ...)` values in component files.

**Why:** User's codex.md and Technical Specification enforce this explicitly. The spec forbids fixed pixel values and requires all color decisions go through the token contract.

**How to apply:** Before writing any CSS value in a component file, check if a `--space-*`, `--color-*`, `--radius-*`, or `--motion-*` token covers it. If not, the closest existing token wins — don't invent a new value.
