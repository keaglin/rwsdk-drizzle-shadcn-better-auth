# Design

This directory contains UI/UX design documentation including design system specs, component specifications, and route/screen UI specifications.

## Purpose

Design docs capture:
- UI design system (colors, typography, spacing, etc.)
- UX patterns and interaction design
- Component UI specifications
- Route/screen UI specifications
- Accessibility guidelines
- Visual design decisions

## When to Create Design Docs

Create design docs when:
- Establishing or updating the design system
- Designing a new component's UI/UX
- Specifying the UI for a new route or screen
- Documenting visual design patterns
- Creating accessibility guidelines
- Planning significant UI/UX changes

**Don't** create design docs for:
- Technical implementation (use architecture/ or code comments)
- Feature requirements (use features/ directory)
- Minor styling tweaks

## Frontmatter Template

```yaml
---
created: YYYY-MM-DD # AI use date cli
updated: YYYY-MM-DD # AI use date cli
version: 1.0  # optional: align with design system or product version
---
```

### Version Tracking

- Use `version` field if your design system has formal versions
- Increment version when making breaking changes to design specs
- Keep `updated` date current for all changes # AI use date cli

## Naming Convention

Files should be descriptive and use kebab-case: `topic-name.md`

Examples:
- `design-system.md` or `design-tokens.md`
- `button-component-spec.md`
- `login-screen-ui.md`
- `navigation-patterns.md`
- `color-palette.md`
- `typography-scale.md`

## Document Structure

Design docs vary by type, but typically include:

### Design System Docs
1. **Title and metadata**
2. **Overview** - Purpose and scope
3. **Tokens/Values** - Colors, spacing, typography, etc.
4. **Usage Guidelines** - How and when to use
5. **Examples** - Visual references or code examples

### Component UI Specs
1. **Title and metadata**
2. **Overview** - What is this component?
3. **Visual Design** - Appearance, states, variants
4. **Behavior** - Interactions and animations
5. **Accessibility** - ARIA, keyboard nav, screen readers
6. **Specifications** - Dimensions, spacing, colors
7. **Examples/Mockups** - Visual references

### Route/Screen UI Specs
1. **Title and metadata**
2. **Overview** - Purpose of the screen
3. **Layout** - Structure and grid
4. **Components** - UI elements used
5. **User Flow** - Navigation and interactions
6. **Responsive Behavior** - Breakpoints and adaptations
7. **Mockups/Wireframes** - Visual references

## Lifecycle

1. **Create** - Design new system/component/screen
2. **Update** - Evolve design as needs change
3. **Version** - Increment version for breaking changes
4. **Deprecate** - Move outdated designs to `_deprecated/` folder

## Deprecated Designs

The `_deprecated/` subfolder contains outdated design documentation. When deprecating:
1. Move file to `_deprecated/`
2. Add a note at the top linking to current design
3. Update [INDEX.md](../INDEX.md) with deprecation notice

## Examples

*No example design docs yet - add links here as designs are documented*

## Tips

- Include visual examples (screenshots, mockups, or diagrams)
- Link to design tools (Figma, Sketch, etc.) if applicable
- Cross-reference related component specs
- Document both what to do and what NOT to do
- Keep accessibility top of mind
- Update `updated` date whenever design changes # AI use date cli
- Consider linking to implementation code