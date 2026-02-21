# Zensical Theme & Features

## Theme Configuration

From `zensical.toml`:

- Variant: `modern` (Material-based)
- Palette: `slate` scheme, `black` primary, `red` accent
- Custom accent color override: Mainsail red `#d41216` (in `docs/stylesheets/custom.css`)

## Template Overrides

Custom templates live in `overrides/` (configured via `custom_dir = "overrides"` in `zensical.toml`).

- `overrides/main.html` — Overrides `htmltitle` block to support `html_title` frontmatter key
  (see [Page Title Convention](page-titles.md))

## Site Features

- `content.action.edit` - Edit on GitHub
- `content.code.copy` - Code copy buttons
- `navigation.path` - Breadcrumb navigation
- `navigation.sections` - Section-based sidebar navigation
- `navigation.tabs` - Tabbed navigation in the topbar

## Markdown Extensions

Bundled with Zensical:

- `admonition` - Callout boxes
- `attr_list` - Element attributes
- `pymdownx.superfences` - Enhanced code blocks
- `pymdownx.tabbed` - Tabbed content
- `pymdownx.highlight` - Syntax highlighting
