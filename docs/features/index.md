# Features

This directory contains feature documentation including specifications, planned features, and roadmap items.

## Purpose

Feature docs capture:
- Planned features and requirements
- Feature specifications and design
- Implementation notes and decisions
- Feature status and progress
- User stories and use cases

## When to Create a Feature Doc

Create a feature doc when:
- Planning a new feature or capability
- Starting work on a significant enhancement
- Documenting requirements for future work
- Tracking a feature from conception through completion

**Don't** create feature docs for:
- Small bug fixes (use issues/PRs instead)
- Minor tweaks or adjustments
- Internal refactoring without user impact

## Frontmatter Template

```yaml
---
status: planned | wip | shipped | cancelled | blocked
created: YYYY-MM-DD # AI use date cli
updated: YYYY-MM-DD # AI use date cli
---
```

### Status Values

- **planned** - Feature is planned but work hasn't started
- **wip** - Feature is actively being developed
- **shipped** - Feature is complete and deployed
- **cancelled** - Feature was planned but won't be implemented
- **blocked** - Feature work is blocked (explain in doc)

## Naming Convention

Files should be named descriptively using kebab-case: `feature-name.md`

Examples:
- `oauth-integration.md`
- `admin-dashboard.md`
- `bulk-import.md`
- `email-notifications.md`

Keep names concise but clear. Avoid prefixes like "feature-" in the filename since the directory already indicates it's a feature.

## Document Structure

A typical feature doc includes:

1. **Title and metadata** (frontmatter + heading)
2. **Overview** - What is this feature?
3. **User Story/Problem** - Who needs it and why?
4. **Requirements** - What must it do?
5. **Design/Approach** - How will it work?
6. **Implementation Notes** - Technical details, dependencies
7. **Testing** - How to verify it works
8. **Status Updates** (optional) - Progress notes, blockers

## Lifecycle

1. **Planned** - Create doc with requirements and approach
2. **WIP** - Update status when work begins, add implementation notes
3. **Shipped** - Mark complete when deployed
4. **Blocked** - If blocked, update status and document the blocker
5. **Cancelled** - If cancelled, update status and briefly explain why

For shipped features, keep the doc for reference or move relevant content to guides/ if ongoing documentation is needed.

## Organizing by Status

The [INDEX.md](../INDEX.md) groups features by status for easy scanning. Update it when creating or changing feature status.

## Examples

*No example feature docs yet - add links here as features are documented*

## Tips

- Keep feature docs **user-focused** (what/why) at the top, technical details (how) lower
- Update the `updated` date whenever making changes # AI use date cli
- Link to related ADRs for architectural decisions
- Add links to PRs when implementation begins
- Consider moving shipped features to guides/ if they need ongoing documentation