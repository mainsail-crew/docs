---
title: Sonar - WiFi Keepalive Daemon
description: Sonar is a lightweight keepalive daemon that monitors your WiFi connection and automatically restores it if
  it drops.
social:
  cards_layout_options:
    title: Sonar Overview
---

# Sonar

Sonar is a lightweight WiFi keepalive daemon developed by the Mainsail crew. It monitors your network connection by
periodically pinging a target (by default, your router) and automatically attempts to restore the WiFi connection if an
outage is detected.

## Why Sonar?

WiFi connections on single-board computers like the Raspberry Pi can occasionally drop, especially in environments with
many competing wireless signals. A lost connection during a print job means you lose control of your printer through
Mainsail until the connection is manually restored.

Sonar solves this by running in the background as a systemd service, continuously checking connectivity and taking
action when the connection is lost.

## How It Works

1. Sonar pings a target at a configurable interval (default: every 60 seconds).
2. If all pings in a check fail, Sonar considers the connection lost.
3. After a short delay (`restart_threshold`), it attempts to restore WiFi using the appropriate method for your system:
    - **wpa_cli + dhcpcd** — used on systems running `dhcpcd` (e.g., older Raspberry Pi OS)
    - **NetworkManager** — used on systems running `NetworkManager` (e.g., newer Raspberry Pi OS, Armbian)
4. Sonar retries up to 3 times, then pauses before trying again.
5. Once the connection is restored, normal monitoring resumes.

## Key Features

- **Automatic target detection:** By default, Sonar pings your default gateway (router), so no manual configuration
  is needed.
- **WiFi-only:** Sonar only acts when the active default route uses a wireless interface (`wlan0`, `wlp*`, etc.).
  Wired connections are ignored.
- **Minimal footprint:** Written in Python with no external dependencies beyond `iputils-ping`.
- **Flexible logging:** Log to the systemd journal, or optionally to a persistent log file with logrotate support.
- **Easy configuration:** A single TOML-style config file with sensible defaults.

## Pre-installed on MainsailOS

Sonar comes **pre-installed on [MainsailOS](../mainsailos/index.md)**. If you are using MainsailOS, you only need to
enable Sonar in its [configuration file](configuration.md). So no installation required.

If you are running a manual Klipper setup on Raspberry Pi OS or another Debian-based distribution, see the
[Installation](installation.md) guide.

## Links

- **GitHub Repository:** [mainsail-crew/sonar](https://github.com/mainsail-crew/sonar){:target="_blank"}
