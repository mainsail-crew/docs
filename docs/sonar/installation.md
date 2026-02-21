---
html_title: Install Sonar on Raspberry Pi OS & Debian Systems
description: Step-by-step guide to install Sonar, the WiFi keepalive daemon, on Raspberry Pi OS and other Debian-based
  systems.
social:
  cards_layout_options:
    title: Sonar Installation
---

# Installation

!!! tip "MainsailOS Users"
    Sonar is **already pre-installed** on [MainsailOS](../mainsailos/index.md). You do not need to follow this guide. Simply enable Sonar
    in its [configuration file](configuration.md) and you are good to go.

This guide walks you through installing Sonar on a Raspberry Pi OS or any other Debian-based Linux distribution running
on a single-board computer (SBC).

## Prerequisites

- A Debian-based Linux system (Raspberry Pi OS, Armbian, etc.)
- An active WiFi connection
- Git installed (`sudo apt install git` if not already present)

## Step 1: Clone the Repository

Connect to your system via SSH and clone the Sonar repository into your home directory:

```bash
cd ~
git clone https://github.com/mainsail-crew/sonar.git
```

## Step 2: Run the Configuration Script

Before installing, you need to generate a configuration for the installer. This tells Sonar where your `printer_data`
directory is and whether to add a Moonraker update manager entry automatically.

```bash
cd ~/sonar
make config
```

The interactive configurator will guide you through the following prompts:

### Prompt 1: Continue?

```
 #### Sonar Install Configurator ####

This will guide you through install configuration
After successful configuration use

    sudo make install

to install Sonar ...
Continue? [Y/n]:
```

Press **enter** (or type `Y` and then press **enter) to continue.

### Prompt 2: Printer Data Path

```
Please specify path for printer_data directory

    NOTE: Skip trailing backslash!
    Default: /home/<your-user>/printer_data

Hit ENTER to use default.
Please enter path:
```

Press **enter** to accept the default path (`~/printer_data`). If your `printer_data` directory is in a different
location, type the full path (without a trailing `/`).

### Prompt 3: Moonraker Update Manager Entry

```
Should the update_manager entry added to your moonraker.conf?

    NOTE:
    This will only work if your moonraker.conf
    shares the same path as your Sonar.conf!!!

If you want/have to do that manually,
please see 'resources/moonraker_update.txt'
Copy the content in your moonraker.conf

Add update_manager entry? [Y/n]:
```

Press **enter** (or type `Y` and then press **enter) to have the installer automatically add the Sonar update manager
section to your `moonraker.conf`. This allows Moonraker to update Sonar through its built-in update manager.

!!! note
    This only works if your `moonraker.conf` is located in the same directory as `sonar.conf`
    (typically `~/printer_data/config/`). If your setup differs, type `N` and add the entry manually (see
    [Moonraker Update Manager](#moonraker-update-manager) below).

## Step 3: Install Sonar

Run the installer with root privileges:

```bash
sudo make install
```

The installer will:

1. Install the required system dependency (`iputils-ping`)
2. Copy the default `sonar.conf` to `~/printer_data/config/` (if none exists)
3. Install the systemd service file and environment file
4. Enable and start the `sonar` service
5. Set up logrotate for persistent log files
6. Optionally add the Moonraker update manager entry (if selected in Step 2)

After installation, you will be asked whether to reboot:

```
Installation successful.

    To take changes effect, you need to reboot your machine!

Reboot NOW? [y/N]:
```

!!! warning
    A reboot is recommended to ensure all services start correctly.

## Step 4: Enable Sonar

By default, Sonar is **disabled** after a fresh installation. You need to enable it in the configuration file. See the
[Configuration](configuration.md) guide for details.

## Moonraker Update Manager

If you chose **not** to add the update manager entry during installation, or if you need to add it manually, append the
following to your `moonraker.conf`:

```ini
[update_manager sonar]
type: git_repo
path: ~/sonar
origin: https://github.com/mainsail-crew/sonar.git
primary_branch: main
managed_services: sonar
system_dependencies: resources/system-dependencies.json
```

This allows Moonraker to check for Sonar updates and apply them through the Mainsail update manager interface.

## Verify the Installation

After rebooting, you can check whether Sonar is running:

```bash
sudo systemctl status sonar
```

To view the logs:

```bash
sudo journalctl -u sonar -f
```
