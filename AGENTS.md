# AGENTS.md - Mainsail Documentation

Guidance for AI agents working on this documentation site for [Mainsail](https://docs.mainsail.xyz), a
3D printer web interface for Klipper firmware.

**Site generator:** [Zensical](https://github.com/zensical/zensical)

**Live site:** https://docs.mainsail.xyz | **Repo:** https://github.com/mainsail-crew/docs

## Build Commands

```bash
# Setup
pip install -r requirements.txt

# Development server (http://127.0.0.1:8000)
zensical serve

# Build static site (output: site/)
zensical build
```

## Project Structure

```
docs/
├── docs/                     # Documentation source (Markdown)
│   ├── assets/               # Logo, favicon, social images
│   ├── images/               # Screenshots organized by section
│   ├── stylesheets/          # Custom CSS (custom.css)
│   ├── configuration/        # Config guides
│   ├── features/             # Feature docs
│   ├── setup/                # Installation guides
│   ├── crowsnest/            # Webcam daemon docs
│   ├── mainsailos/           # OS image docs
│   ├── sonar/                # Network detection docs
│   └── index.md              # Homepage
├── overrides/                # Template overrides (custom html_title logic)
├── agent_docs/               # Detailed guides for AI agents
├── _data/                    # Data files (contributors, licenses, themes)
├── _scripts/                 # Build scripts (credits, themes generation)
├── zensical.toml             # Site config and navigation
├── requirements.txt          # Python deps (zensical)
└── site/                     # Build output (gitignored)
```

## Documentation Style Guide

### File Organization
- Markdown files in `docs/` with lowercase hyphenated names: `my-feature.md`
- Images in `docs/images/<section>/` using `.png`, `.webp`, or `.avif`
- Navigation defined in `zensical.toml` under `nav`

### Frontmatter
```yaml
---
title: Short Page Title
description: Brief description for search engines and social cards.
social:
  cards_layout_options:
    title: Short Social Card Title
---
```

## Writing Guidelines

- Write in second person ("you can", "your printer")
- Clear, concise language; explain technical terms
- Start pages with brief introduction
- Numbered lists for step-by-step instructions
- Include screenshots for UI elements

## Mainsail UI Terminology

Use consistent terminology when referring to Mainsail UI elements:

| Element | Correct Term | Description |
|---------|--------------|-------------|
| Settings Dialog | **Interface Settings** | The dialog opened via the cogs icon |
| Settings Button | **cogs icon** | Two gear wheels in the top-right corner |
| Settings Sections | e.g., "General", "Macros", "Presets" | Tabs within Interface Settings |

### Examples

```markdown
<!-- Correct -->
Open the **Interface Settings** by clicking the **cogs icon** in the top-right corner.

<!-- Incorrect -->
Open the settings by clicking the gear icon in the sidebar.
```

## Common Tasks

### Adding a New Page
1. Create `.md` file in appropriate `docs/` subdirectory
2. Add frontmatter with title and description
3. Add to `zensical.toml` navigation under `nav`
4. Add images to `docs/images/<section>/`

### Updating Navigation

Navigation is defined in `zensical.toml` using TOML array-of-tables syntax:

```toml
nav = [
  { "Section" = [
    { "Page Title" = "path/to/page.md" },
    { "Subsection" = [
      { "Nested" = "path/to/nested.md" },
    ]},
  ]},
]
```

## CI/CD Notes
- Build output (`site/`) is gitignored
- Deploys via GitHub Pages

## Detailed Guides

Read these when the task requires it:

- [Page Title Convention](agent_docs/page-titles.md) — `title` vs `html_title`, sub-project rules
- [Markdown Guide](agent_docs/markdown-guide.md) — images, admonitions, code blocks, tabs
- [Zensical Features](agent_docs/zensical-features.md) — theme, extensions, template overrides
