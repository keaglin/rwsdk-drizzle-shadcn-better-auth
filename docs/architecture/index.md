# Architecture

This directory contains system design and technical architecture documentation.

## Purpose

Architecture docs capture:
- System design and high-level architecture
- Component interactions and data flow
- Technical infrastructure and deployment
- Integration points and APIs
- Performance and scalability considerations
- Security architecture

## When to Create Architecture Docs

Create architecture docs when:
- Designing a new system or major subsystem
- Documenting existing architecture for reference
- Planning significant architectural changes
- Explaining how components interact
- Documenting infrastructure and deployment

**Don't** create architecture docs for:
- Implementation details (those go in code or ADRs)
- Specific feature designs (use features/ directory)
- How-to information (use guides/ directory)

## Frontmatter Template

```yaml
---
created: YYYY-MM-DD # AI use date cli
last_reviewed: YYYY-MM-DD # AI use date cli
reviewed_by: name
---
```

### Review Cadence

Architecture docs should be reviewed periodically to ensure they remain accurate:
- **Critical systems** - Review every 3-6 months
- **Stable systems** - Review annually or when changes occur
- Update `last_reviewed` date and `reviewed_by` name when reviewing

## Naming Convention

Files should be descriptive and use kebab-case: `topic-name.md`

Examples:
- `system-overview.md`
- `data-flow.md`
- `authentication-architecture.md`
- `deployment-infrastructure.md`
- `api-integration.md`

## Document Structure

A typical architecture doc includes:

1. **Title and metadata** (frontmatter + heading)
2. **Overview** - What does this document cover?
3. **Architecture Diagram** (optional) - Visual representation
4. **Components** - Key parts of the system
5. **Interactions** - How components work together
6. **Data Flow** - How information moves through the system
7. **Technical Details** - Important implementation notes
8. **Trade-offs** - Design compromises and rationale

## Lifecycle

1. **Create** - Document current or planned architecture
2. **Review** - Periodically verify accuracy and update
3. **Update** - Keep current as architecture evolves
4. **Deprecate** - Move outdated docs to `_deprecated/` folder

When architecture changes significantly, consider creating a new doc and moving the old one to `_deprecated/` rather than heavily editing the original.

## Deprecated Architecture

The `_deprecated/` subfolder contains outdated architecture documentation. When deprecating:
1. Move file to `_deprecated/`
2. Add a note at the top linking to current documentation
3. Update [INDEX.md](../INDEX.md) with deprecation notice

## Examples

*No example architecture docs yet - add links here as architecture is documented*

## Tips

- Use diagrams where helpful (ASCII art, mermaid, or image files)
- Link to related ADRs that explain architectural decisions
- Keep docs at the right level - avoid too much or too little detail
- Update `last_reviewed` date even if no changes needed (shows doc was checked) # AI use date cli
- Consider cross-linking related architecture docs