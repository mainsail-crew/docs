---
html_title: Configure Ping Target, Interval & Logging - Sonar
description: Configure Sonar's WiFi keepalive behavior, including ping target, interval, logging, and restart
  threshold.
social:
  cards_layout_options:
    title: Sonar Configuration
---

# Configuration

Sonar is configured through a single file located at:

```
~/printer_data/config/sonar.conf
```

You can edit this file directly in Mainsail's file manager under the **Config Files** section.

!!! note
    The configuration file syntax is based on [TOML](https://toml.io/en/){:target="_blank"}. Colons (`:`) and equals
    signs (`=`) are both valid as key-value separators. A leading section descriptor `[sonar]` is required.

!!! information "Service Restart Required"
    Any changes to the configuration file require a restart of the Sonar service to take effect. Use the following
    command via SSH or the top-right menu in Mainsail to restart Sonar:

    ```bash
    sudo systemctl restart sonar
    ```

## Default Configuration

Below is the complete default configuration with all available options:

```ini
[sonar]
enable: false
debug_log: false
persistent_log: false
target: auto
count: 3
interval: 60
restart_threshold: 10
```

## Options


- **enable**: Enables or disables Sonar. When set to `false`, Sonar will exit immediately on startup. Set to `true` to
  activate WiFi monitoring. (Default: `false`)
- **debug_log**: When `true`, Sonar logs every ping attempt with trip time and timestamp. Useful for troubleshooting but
  increases log size. (Default: `false`)
- **persistent_log**: When `true`, Sonar writes logs to `/var/log/sonar.log` in addition to the systemd journal. A
  logrotate rule is installed to manage log file size. (Default: `false`)
- **target**: The ping target for connectivity checks. Can be an IP address, hostname, or `auto` to ping the default
  gateway (router). (Default: `auto`)
- **count**: The number of pings sent per check. A check is considered failed only if all pings fail. (Default: `3`)
- **interval**: The time in seconds between connection checks. After each check, Sonar waits this many seconds before
  the next one. (Default: `60`)
- **restart_threshold**: The delay in seconds before Sonar attempts to restart the WiFi connection after detecting a
  connection loss. This short pause helps avoid unnecessary restarts during very brief outages. (Default: `10`)

## Example Configuration

A typical configuration for an active setup with default monitoring behavior:

```ini
[sonar]
enable: true
debug_log: false
persistent_log: false
target: auto
count: 3
interval: 60
restart_threshold: 10
```
