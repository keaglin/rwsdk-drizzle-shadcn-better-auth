# Documentation

This directory contains all project documentation organized by purpose and document type.

## Quick Navigation

📋 **[INDEX.md](INDEX.md)** - Living catalog of key documents and recent updates

## Directory Structure

- **[decisions/](decisions/)** - Architecture Decision Records (ADRs) and key technical decisions
- **[features/](features/)** - Feature specifications, planned features, and roadmap
- **[architecture/](architecture/)** - System design and technical architecture documentation
- **[design/](design/)** - UI/UX design system, component specs, and route UI specifications
- **[guides/](guides/)** - How-to guides and troubleshooting documentation
- **[research/](research/)** - Research notes, explorations, and investigations
- **[drafts/](drafts/)** - Work-in-progress documentation and rough thoughts

## Getting Started

Each directory contains an `index.md` file that explains:
- What types of documents belong there
- When to create a new document
- Frontmatter templates and conventions
- Document lifecycle and status tracking

## Contributing Documentation

1. Check the appropriate directory's `index.md` for guidelines
2. Use the frontmatter template provided
3. Update [INDEX.md](INDEX.md) if creating a significant document
4. Keep the `updated` date current when making changes

## Document Status Tracking

We use contextual frontmatter patterns based on document type. See individual directory `index.md` files for specific conventions.

Common patterns:
- **decisions/** - Use status field (proposed/accepted/rejected/superseded)
- **features/** - Use status field (planned/wip/shipped/cancelled/blocked)
- **architecture/** - Track with `last_reviewed` date # AI use date cli
- **design/** - Version aligned with design system releases (if applicable)
- **guides/** - Date-based; deprecate outdated guides # AI use date cli
- **research/** - Date in filename; always historical reference # AI use date cli
- **drafts/** - All docs are WIP; promote when ready