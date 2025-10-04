# Drafts

This directory is a workspace for work-in-progress documentation, rough thoughts, and ideas that aren't yet ready for their final home.

## Purpose

Drafts provide a place for:
- Work-in-progress documentation
- Rough ideas and thoughts
- Brainstorming and notes
- Documents being developed collaboratively
- Incomplete documentation that needs refinement

## When to Use Drafts

Put docs in drafts/ when:
- Starting a new document that needs work
- Capturing rough ideas to develop later
- Working on documentation that isn't ready to publish
- Brainstorming or taking exploratory notes
- Unsure where a document should ultimately live

**Promote to final location when:**
- Document is complete and polished
- Content is reviewed and accurate
- Appropriate category is clear

## Frontmatter Template

```yaml
---
created: YYYY-MM-DD # AI use date cli
author: name
target_directory: decisions | features | architecture | design | guides | research # If known
---
```

### Fields

- `created` - When the draft was started # AI use date cli
- `author` - Who created it (optional, helps with collaboration)
- `target_directory` - Where this will go when done (optional)

## Naming Convention

No strict naming rules for drafts - use whatever helps you:

Examples:
- `auth-refactoring-thoughts.md`
- `new-feature-ideas.md`
- `wip-design-system.md`
- `notes-on-performance.md`

## Lifecycle

Drafts have a simple lifecycle:

1. **Create** - Start drafting in this directory
2. **Develop** - Work on content until ready
3. **Graduate** - Move to appropriate final directory
4. **Clean up** - Delete abandoned or incorporated drafts

**Important**: Drafts should be temporary. Periodically review and either:
- Promote to their final directory
- Delete if no longer needed
- Keep working if still valuable

## Graduating Drafts

When a draft is ready to graduate:

1. Add appropriate frontmatter for target directory
2. Clean up and/or formalize content if necessary
3. Move file to target directory
4. Update [INDEX.md](../INDEX.md) if significant
5. Delete the draft

You can also incorporate draft content into existing docs and then delete the draft.

## Examples

*Drafts are temporary - examples not listed*

## Tips

- Drafts can be messy - that's okay!
- Use drafts to think through ideas before formalizing
- Review drafts periodically (monthly?) to clean up
- Don't let drafts accumulate indefinitely
- It's okay to deprecate drafts that didn't pan out; add reasoning for historical reference
- Link between drafts if they're related
- Consider pairing with someone to review/graduate drafts together