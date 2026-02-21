# AGENTS.md - Mainsail Documentation

Guidance for AI agents working on this Zensical documentation site for [Mainsail](https://docs.mainsail.xyz), a
3D printer web interface for Klipper firmware.

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
title: Page Title for SEO
description: Brief description for search engines and social cards.
social:
  cards_layout_options:
    title: Short Social Card Title
---
```

### Markdown Conventions
- **Line length**: Maximum 120 characters per line (except frontmatter)
- **Headings**: `# H1` for page title, `## H2` for sections
- **Internal links**: `[Text](../path/to/file.md)` (relative paths)
- **External links**: `[Text](https://example.com){:target="_blank"}`

### Images
```markdown
![Alt text](../images/features/image-name.png)

<!-- With caption -->
<figure markdown="span">
  ![Alt text](../images/features/image-name.png)
  <figcaption>Caption text</figcaption>
</figure>
```

### Admonitions
```markdown
!!! note "Optional Title"
    Note content here.

!!! tip
    Helpful tip.

!!! warning
    Warning content.

!!! information "Klipper Config"
    Klipper-specific info.
```

### Code Blocks
Use language identifiers: `ini` for Klipper config, `bash` for commands, `yaml` for YAML, `toml` for TOML.

```ini
[virtual_sdcard]
path: ~/printer_data/gcodes
```

### Tabbed Content
```markdown
=== "Tab 1"
    Content for tab 1

=== "Tab 2"
    Content for tab 2
```

## Zensical Theme & Features

**Theme configuration** (from `zensical.toml`):
- Variant: `modern` (Material-based)
- Palette: `slate` scheme, `black` primary, `red` accent
- Custom accent color override: Mainsail red `#d41216` (in `docs/stylesheets/custom.css`)

**Site features**:
- `content.action.edit` - Edit on GitHub
- `content.code.copy` - Code copy buttons
- `navigation.path` - Breadcrumb navigation
- `navigation.sections` - Section-based sidebar navigation
- `navigation.tabs` - Tabbed navigation in the topbar

**Markdown extensions** (bundled with Zensical):
- `admonition` - Callout boxes
- `attr_list` - Element attributes
- `pymdownx.superfences` - Enhanced code blocks
- `pymdownx.tabbed` - Tabbed content
- `pymdownx.highlight` - Syntax highlighting

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
