This repository contains the themeui-lab design system.

Architecture rules:

tokens → foundations
mixins/functions → tools
layout primitives → primitives
ui elements → components
page compositions → patterns
helpers → utilities

Do not introduce large frameworks.
Keep the system small and maintainable.
Prefer simple SCSS over abstraction.

## Composition rule

Primitives control layout.
Components control interior structure.

Do not put page spacing, container width, grid layout, or section composition logic inside components.
Use primitives for page composition and components for reusable UI pieces.