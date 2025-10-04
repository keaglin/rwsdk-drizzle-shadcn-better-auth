# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records - documents that capture important architectural and technical decisions made in the project.

## Purpose

ADRs document:
- Significant technical decisions
- Architectural choices and their rationale
- Technology selections
- Design patterns and approaches
- Trade-offs and alternatives considered

## When to Create an ADR

Create an ADR when:
- Making a decision that affects the architecture or structure
- Choosing between competing technologies or approaches
- Establishing patterns or conventions for the codebase
- Making a decision that will be expensive to change later
- Someone asks "why did we do it this way?"

**Don't** create ADRs for:
- Minor implementation details
- Decisions easily reversed
- Routine coding decisions

## Frontmatter Template

```yaml
---
status: proposed | accepted | rejected | superseded
date: YYYY-MM-DD # AI use date cli
superseded_by: adr-XXX-new-title.md  # only if superseded
---
```

### Status Values

- **proposed** - Decision is being considered, not yet finalized
- **accepted** - Decision has been made and is active
- **rejected** - Decision was considered but not chosen
- **superseded** - Decision was replaced by a newer one (link to replacement)

## Naming Convention

Files should be named: `adr-NNN-title-in-kebab-case.md`

- `NNN` is a sequential number (001, 002, etc.)
- Use descriptive, concise titles
- Use kebab-case for readability

Examples:
- `adr-001-validation-with-zod.md`
- `adr-002-data-access-patterns.md`
- `adr-003-authentication-strategy.md`

## Document Structure

A typical ADR includes:

1. **Title and metadata** (frontmatter + heading)
2. **Context** - What situation led to this decision?
3. **Decision** - What did we decide to do?
4. **Rationale** - Why did we make this choice?
5. **Consequences** - What are the positive and negative outcomes?
6. **Alternatives Considered** (optional) - What other options were evaluated?

## Lifecycle

1. **Create** - Draft ADR with `status: proposed`
2. **Discuss** - Share with team, gather feedback
3. **Decide** - Update to `status: accepted` or `status: rejected`
4. **Implement** - If accepted, implement the decision
5. **Supersede** (if needed) - Create new ADR, update old one with `status: superseded` and `superseded_by` link

## Examples

See existing ADRs in this directory for reference:
- [ADR 001: Validation with Zod](adr-001-validation-with-zod.md)
- [ADR 002: Data Access Patterns](adr-002-data-access-patterns.md)

## Template

Use [adr-000-template.md](adr-000-template.md) as a starting point for new ADRs.