---
title: Custom Navigation
description: Add custom navigation entries to Mainsail's sidebar using a navi.json file.
social:
  cards_layout_options:
    title: Custom Navigation
---

# Custom Navigation

Add custom navigation entries to Mainsail's sidebar. This allows you to link to external
resources, Moonraker API endpoints, or other useful pages.

## Configuration

Create a file named `navi.json` in your `.theme` folder. The file contains an array of
navigation entries.

### Basic Example

```json
[
  {
    "title": "Google",
    "href": "https://www.google.com"
  }
]
```

### Full Example

```json
[
  {
    "title": "Moonraker API",
    "href": "/server/info",
    "target": "_blank",
    "position": 85,
    "icon": "M5 5H7V11H5V5M10 5H8V11H10V5M5 19H7V13H5V19M10 13H8V19H10V17H15V15H10V13M2 21H4V3H2V21M20 3V7H13V5H11V11H13V9H20V15H18V13H16V19H18V17H20V21H22V3H20Z"
  }
]
```

## Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `title` | string | Yes | The name displayed in the sidebar |
| `href` | string | Yes | The URL or path to link to |
| `target` | string | No | Link target: `_self` (same window) or `_blank` (new tab) |
| `position` | integer | No | Sort order for the navigation entry |
| `icon` | string | No | SVG path data for a custom icon |

## Navigation Positions

Use the `position` option to place your custom entry between existing navigation items.
All default navigation entries are numbered in increments of 10:

| Position | Page |
|----------|------|
| 10 | Dashboard |
| 20 | Webcam |
| 30 | Console |
| 40 | Heightmap |
| 50 | G-Code Files |
| 60 | G-Code Viewer |
| 70 | History |
| 80 | Timelapse |
| 90 | Machine |

To place a custom entry between Console and Heightmap, use a position value between
31 and 39.

## Custom Icons

You can add custom icons from Material Design Icons.

!!! tip "Finding Icons"
    Browse icons at [Pictogrammers](https://pictogrammers.com/library/mdi/){:target="_blank"}.
    Click on an icon, select **Copy SVG**, and extract only the path data.

### Extracting the Path

When you copy an SVG from Material Design Icons, you get the complete SVG markup:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>account</title>
  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
</svg>
```

For the `icon` option, you only need the `d` attribute value (the path data):

```
M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z
```
