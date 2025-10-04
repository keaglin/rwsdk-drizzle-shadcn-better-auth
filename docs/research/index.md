# Research

This directory contains research notes, explorations, and investigations.

## Purpose

Research docs capture:
- Technology evaluations and comparisons
- Spike findings and experiments
- Investigation notes
- Library/tool research
- Performance testing results
- Proof-of-concept learnings
- Market or competitive research

## When to Create Research Docs

Create research docs when:
- Evaluating technologies or approaches
- Conducting a spike or experiment
- Investigating a problem or question
- Comparing alternatives
- Testing hypotheses
- Documenting learning from exploration

**Don't** create research docs for:
- Final decisions (use decisions/ directory - link to research)
- Implementation details (use architecture/ or code)
- How-to information (use guides/ directory)

## Frontmatter Template

```yaml
---
date: YYYY-MM-DD # AI use date cli
tags: [tag1, tag2, tag3]
---
```

### Tags

Use tags to categorize research:
- Technology names (e.g., `react`, `postgresql`, `cloudflare`)
- Topics (e.g., `authentication`, `performance`, `security`)
- Research type (e.g., `comparison`, `experiment`, `investigation`)

## Naming Convention

Files should use date prefixes and descriptive names: `YYYY-MM-DD-topic-name.md` # AI use date cli

Examples:
- `2025-01-15-oauth-provider-comparison.md`
- `2025-02-03-database-performance-testing.md`
- `2025-03-10-state-management-spike.md`
- `2025-04-22-authentication-library-evaluation.md`

The date prefix helps:
- Understand when the research was conducted
- Sort chronologically
- Recognize research age at a glance

## Document Structure

A typical research doc includes:

1. **Title and metadata** (frontmatter + heading)
2. **Goal/Question** - What are you researching and why?
3. **Methodology** (optional) - How did you research this?
4. **Findings** - What did you learn?
5. **Options/Alternatives** (if applicable) - What choices were considered?
6. **Pros/Cons** - Trade-offs of each option
7. **Recommendation** (optional) - Suggested direction
8. **References** - Links to sources, docs, examples
9. **Follow-up** (optional) - Questions or next steps

## Lifecycle

Research docs are **historical records**:
- They capture thinking at a point in time
- They don't need to be updated or maintained
- They remain valuable as reference even when outdated

Research often leads to ADRs - link between research and resulting decisions.

## Examples

*No example research docs yet - add links here as research is documented*

## Tips

- Research is about exploration - be thorough but don't overthink structure
- Include links to external resources, repos, articles
- Document both what worked AND what didn't
- Note assumptions and context (they matter later)
- Link research docs from ADRs when decisions are made
- Research can be rough - it's okay to be less polished than other docs
- Use code snippets, screenshots, or data to support findings
- Don't delete old research - it provides historical context