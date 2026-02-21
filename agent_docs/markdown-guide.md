# Markdown Guide

## Markdown Conventions

- **Line length**: Maximum 120 characters per line (except frontmatter)
- **Headings**: `# H1` for page title, `## H2` for sections
- **Internal links**: `[Text](../path/to/file.md)` (relative paths)
- **External links**: `[Text](https://example.com){:target="_blank"}`

## Images

```markdown
![Alt text](../images/features/image-name.png)

<!-- With caption -->
<figure markdown="span">
  ![Alt text](../images/features/image-name.png)
  <figcaption>Caption text</figcaption>
</figure>
```

## Admonitions

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

## Code Blocks

Use language identifiers: `ini` for Klipper config, `bash` for commands, `yaml` for YAML, `toml` for TOML.

```ini
[virtual_sdcard]
path: ~/printer_data/gcodes
```

## Tabbed Content

```markdown
=== "Tab 1"
    Content for tab 1

=== "Tab 2"
    Content for tab 2
```
