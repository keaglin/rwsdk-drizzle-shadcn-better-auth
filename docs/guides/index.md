# Guides

This directory contains how-to guides, tutorials, and troubleshooting documentation.

## Purpose

Guides provide:
- Step-by-step how-to instructions
- Troubleshooting procedures
- Setup and configuration guides
- Best practices and patterns
- Common workflows
- Problem-solving resources

## When to Create a Guide

Create a guide when:
- Documenting how to accomplish a specific task
- Solving a problem that others might encounter
- Explaining a workflow or process
- Providing setup or configuration instructions
- Documenting troubleshooting steps

**Don't** create guides for:
- Architectural decisions (use decisions/ directory)
- Feature specifications (use features/ directory)
- System design (use architecture/ directory)

## Frontmatter Template

```yaml
---
created: YYYY-MM-DD # AI use date cli
updated: YYYY-MM-DD # AI use date cli
---
```

### Maintenance

- Keep `updated` date current when revising guides # AI use date cli
- Delete or move to `_deprecated/` if guide becomes outdated
- Guides should be actively maintained or removed

## Naming Convention

Files should be descriptive and action-oriented using kebab-case:

Examples:
- `auth-cookie-forwarding.md`
- `validation-guide.md`
- `setting-up-local-database.md`
- `troubleshooting-deployment.md`
- `migrating-from-x-to-y.md`

Use clear, specific names that indicate what the guide helps you do.

## Document Structure

A typical guide includes:

1. **Title and metadata** (frontmatter + heading)
2. **Overview** - What does this guide cover?
3. **Prerequisites** (if applicable) - What you need before starting
4. **Steps** - Clear, numbered instructions
5. **Expected Outcome** - How to verify success
6. **Troubleshooting** (optional) - Common issues and solutions
7. **Related Resources** (optional) - Links to related docs

### For Troubleshooting Guides

1. **Title and metadata**
2. **Problem Description** - What's the issue?
3. **Symptoms** - How does it manifest?
4. **Causes** - Why does this happen?
5. **Solutions** - How to fix it (step-by-step)
6. **Prevention** (optional) - How to avoid it in the future

## Lifecycle

1. **Create** - Write guide when needed
2. **Maintain** - Update as tools/processes change
3. **Remove** - Delete or deprecate when no longer relevant

Guides should stay current or be removed. Don't let outdated guides accumulate. Deprecation is an intermediate step before removal. Significant testing must be done to ensure a guide is no longer useful, even as historical reference before removal is considered.

## Examples

See existing guides:
- [Auth Cookie Forwarding](auth-cookie-forwarding.md)
- [Validation Guide](validation-guide.md)

## Tips

- Write for your audience (beginners vs. advanced users)
- Use clear, concise language
- Include code examples and commands
- Add screenshots or diagrams if helpful
- Test your guide to ensure it works
- Keep guides focused on one topic
- Link to related ADRs or architecture docs for context
- Update guides when underlying tools or processes change