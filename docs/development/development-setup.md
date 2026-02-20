---
title: Development Setup
description: >-
  Set up a local development environment for Mainsail. This guide covers prerequisites, the development server, and an
  optional virtual Klipper printer with Docker.
social:
  cards_layout_options:
    title: Development Setup
---

# Development Setup

This guide walks you through setting up a local development environment for Mainsail, so you can start developing and
testing changes on your PC.

## Prerequisites

### Git

Git is required to clone the repository and manage your changes. Download it from the
[official Git website](https://git-scm.com/){:target="_blank"} and install it for your operating system.

### Node.js

Node.js (version **20 or higher**) is required for developing and building Mainsail. Download the latest LTS version
from the [official website](https://nodejs.org/){:target="_blank"}. Make sure `npm` is installed along with Node.js.

### Fork and Clone the Repository

Fork the [Mainsail repository](https://github.com/mainsail-crew/mainsail){:target="_blank"} on GitHub, then clone your
fork:

```bash
git clone https://github.com/YOUR-USERNAME/mainsail.git
cd mainsail
```

## Development Server

### Install Dependencies

Use `npm ci` to install the exact dependency versions specified in `package-lock.json`:

```bash
npm ci
```

### Configure the `.env` File

Mainsail uses environment variables defined in a `.env.development.local` file. Copy the example file and adjust it to
your setup:

```bash
cp .env.development.local.example .env.development.local
```

Example configuration:

```ini
# hostname or ip of the Moonraker instance
VUE_APP_HOSTNAME=printer.local

# port of the Moonraker instance
VUE_APP_PORT=7125

# route_prefix of the Moonraker instance
VUE_APP_PATH="/"

# reconnect interval in ms
VUE_APP_RECONNECT_INTERVAL=5000

# where should Mainsail read instances from (moonraker, browser or json)
VUE_APP_INSTANCES_DB="moonraker"

# defaults for multi language tests
VUE_APP_I18N_LOCALE=en
VUE_APP_I18N_FALLBACK_LOCALE=en
```

!!! note
    Set `VUE_APP_HOSTNAME=localhost` if you want to use the
    [Virtual Klipper Printer](#virtual-klipper-printer-with-docker).

### Add CORS Domain to Moonraker

To allow the development server to access the Moonraker API, add `*://localhost:8080` to the `cors_domains` in your
`moonraker.conf`:

```ini
[authorization]
cors_domains:
    https://my.mainsail.xyz
    http://my.mainsail.xyz
    http://*.local
    http://*.lan
    *://localhost:8080
```

### Start the Development Server

Start the development server with:

```bash
npm run serve
```

Mainsail will be available at [http://localhost:8080](http://localhost:8080){:target="_blank"}. The server supports hot
module replacement. So code changes are automatically reflected in the browser without a full page reload.

## Virtual Klipper Printer with Docker

For developing without a physical printer, you can run a virtual Klipper printer in Docker. We provide a dedicated
project for this:
[mainsail-crew/virtual-klipper-printer](https://github.com/mainsail-crew/virtual-klipper-printer){:target="_blank"}.

### Install Docker

If Docker is not already installed, follow the official installation guide for your platform:

- [Linux](https://docs.docker.com/engine/install/){:target="_blank"}
- [macOS](https://docs.docker.com/desktop/install/mac-install/){:target="_blank"}
- [Windows](https://docs.docker.com/desktop/install/windows-install/){:target="_blank"}

Once Docker is installed, follow the instructions in the
[virtual-klipper-printer repository](https://github.com/mainsail-crew/virtual-klipper-printer){:target="_blank"} to set
up and run your virtual printer environment.
