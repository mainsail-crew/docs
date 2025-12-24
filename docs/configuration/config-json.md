---
title: config.json
description: Configure how Mainsail discovers and connects to Moonraker. Explains remote mode, fixed printers, and fixed socket settings with JSON examples.
social:
  cards_layout_options:
    title: config.json
---

# config.json

Mainsail reads an optional `config.json` from the Mainsail web root to decide how to connect to your printers (Moonraker
instances) when a new session starts.

Use this file for deployments where Mainsail is served separately from Moonraker (e.g., Docker, NAS, or a dedicated web
host). For MainsailOS or installs where Mainsail and Moonraker run on the same device, this file is usually not needed.

## Default structure

A default file may look like this:

```json
{
  "defaultLocale": "en",
  "defaultMode": "dark",
  "defaultTheme": "mainsail",
  "hostname": null,
  "port": null,
  "path": null,
  "instancesDB": "moonraker",
  "instances": []
}
```

- `defaultLocale` (string): Initial UI language (e.g., `en`).
- `defaultMode` (string): Initial color mode (`light` or `dark`).
- `defaultTheme` (string): Initial UI theme (e.g., `mainsail`).
- `hostname` (string|null): Single Moonraker host to connect.
- `port` (number|null): Moonraker port for `hostname`.
- `path` (string|null): Moonraker path for `hostname`.
- `instancesDB` (string): Where Mainsail stores or reads printer instances. See modes below.
- `instances` (array): List of predefined Moonraker endpoints (used with fixed printers).

## Modes

The `instancesDB` setting controls where Mainsail stores the list of your printers (Moonraker instances). This affects
how Mainsail discovers printers on startup and how you can add more printers.

| Value | Storage Location | Use Case |
|-------|------------------|----------|
| `moonraker` | Moonraker database | Default for single printers or small setups |
| `browser` | Browser (localStorage) | Remote access, each user has their own printer list |
| `json` | config.json file | Farms, Docker, central Mainsail instances |

### moonraker (Default)

Mainsail connects automatically to the Moonraker instance specified by `hostname`, `port`, and `path`. If these values
are empty or `null`, Mainsail uses the current browser URL to connect. Additional printers you add through the UI are
stored in the Moonraker database.

```json
{
  "instancesDB": "moonraker",
  "hostname": "192.168.0.210",
  "port": 7125,
  "path": "/"
}
```

!!! warning "Limitations with multiple printers"
    - Each printer must be manually added to every other printer's Moonraker database
    - Works fine for 2-3 printers, but becomes impractical for printer farms
    - Problematic with Docker setups: the primary printer must always be reachable for Mainsail to load the printer list
    
    For farms or Docker deployments, consider using `json` mode instead.

### browser

Every time you open Mainsail, a printer selection dialog appears. You can add or remove printers in this dialog, and
you must click on a printer to connect. The printer list is stored in your browser's localStorage.

```json
{
  "instancesDB": "browser"
}
```

!!! tip "When to use browser mode"
    This mode is ideal when:
    
    - You don't need a fixed printer list
    - Each user (browser) should have their own individual printer list
    - You're using a shared Mainsail instance like my.mainsail.xyz

### json (Recommended for Farms)

Every time you open Mainsail, a printer selection dialog appears showing all configured printers and their availability
status. You must click on a printer to connect. The printer list is defined in `config.json` and cannot be modified
through the UI—all browsers see the same fixed list.

```json
{
  "instancesDB": "json",
  "instances": [
    { "name": "printer1", "hostname": "192.168.0.210", "port": 7125, "path": "/" },
    { "name": "printer2", "hostname": "192.168.0.211", "port": 7125, "path": "/" },
    { "name": "printer3", "hostname": "192.168.0.212", "port": 7125, "path": "/" }
  ]
}
```

You can also link directly to a specific printer: `http://mainsail.local/?printer=printer2`

!!! tip "When to use json mode"
    This mode is ideal for printer farms, Docker deployments, or any setup where you want a centrally managed printer
    list that all users share.

## File location and Docker

- Place `config.json` in the Mainsail web root (same directory as `index.html`).
- Docker: mount your file to `/usr/share/nginx/html/config.json` in the Mainsail container.

```bash
docker run \
  --name mainsail \
  -v "$(pwd)/config.json:/usr/share/nginx/html/config.json" \
  -p "8080:80" \
  ghcr.io/mainsail-crew/mainsail:latest
```
