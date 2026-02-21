# Page Title Convention

The browser tab title is composed via the template override in `overrides/main.html`:

| Frontmatter key | Browser `<title>` | Use case |
|---|---|---|
| `html_title` | Exactly as written (no suffix) | Homepage, sub-projects (Crowsnest, MainsailOS, Sonar) |
| `title` | `{title} - {site_name}` | All regular Mainsail pages |
| *(none)* | `{nav title} - {site_name}` | Fallback from nav/H1 heading |

## Rules

1. **Aim for 50–65 characters** total in the browser `<title>`. For `title`, account for the auto-appended
   ` - Mainsail - The 3D Printer Interface` (39 chars). For `html_title`, the value IS the full title.
2. **Never repeat "Mainsail"** in `title` — it's already in `site_name`.
3. **No marketing taglines** in `title` (e.g., "The Easiest Way to Get Started"). SEO copy belongs in `description`.
4. **Sub-project pages** (`docs/crowsnest/`, `docs/mainsailos/`, `docs/sonar/`) must always use `html_title` with
   their own project name as suffix: `html_title: Page Name - Crowsnest`. These are independent projects and must not
   get the Mainsail `site_name` appended.
5. **Homepage** uses `html_title` for full control without `site_name` suffix.

## Examples

```yaml
# Regular Mainsail page → "Bed Mesh - Mainsail - The 3D Printer Interface"
title: Bed Mesh

# Homepage → "Mainsail - The 3D Printer Interface for Klipper"
html_title: Mainsail - The 3D Printer Interface for Klipper

# Crowsnest page → "Installation - Crowsnest"
html_title: Installation - Crowsnest

# MainsailOS page → "Raspberry Pi - MainsailOS"
html_title: Raspberry Pi - MainsailOS

# Sonar page → "Configuration - Sonar"
html_title: Configuration - Sonar
```
