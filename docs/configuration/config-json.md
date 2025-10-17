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

Mainsail supports three practical modes controlled by `instancesDB`.

### Default Mode (moonraker-managed)

This is the default behavior when Mainsail and Moonraker run on the same device. So the current URL will be used to 
connect to Moonraker and if you add other printers, they will be stored in Moonraker's database. So Mainsail will
connect automatically to the default printer on load and then, you can switch to another printer (you added before in
the UI).

### Remote Mode (browser-managed)

This is ideal when Mainsail runs independently of your printers (e.g., my.mainsail.xyz, Docker on a server/NAS) and you
want to add printers from the UI dynamically.

- Set: `"instancesDB": "browser"`
- Behavior: Mainsail shows a printer selection dialog on first load. Added printers are stored in the client browser.

### Remote Mode with fixed printers (JSON-managed)

Use this when you want a shared list of printers available to every browser without re-adding them on each device.

- Set: `"instancesDB": "json"`
- Provide a list in `instances`:

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

On load, Mainsail shows the selector with these predefined printers and indicates which are reachable. You can also use
the name for a direct link for example: `http://mainsail.local/?printer=printer2`.

### Fixed socket settings (direct connect)

Less common but supported: connect immediately to a specific Moonraker regardless of the URL you used to access Mainsail.

- Set: `"instancesDB": "moonraker"`
- Set a `hostname`, `port` and optional `path`:

```json
{
  "defaultLocale": "en",
  "instancesDB": "moonraker",
  "hostname": "192.168.0.210",
  "port": 7125,
  "path": "/"
}
```

Mainsail connects directly without showing the printer selection dialog.

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
