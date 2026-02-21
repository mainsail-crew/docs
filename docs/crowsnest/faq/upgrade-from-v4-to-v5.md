---
html_title: Upgrade from v4 to v5 with Built-in Migration - Crowsnest
description: How to upgrade Crowsnest from version 4 to version 5 using the built-in migration tool.
social:
  cards_layout_options:
    title: Crowsnest Upgrade v4 to v5
---

# Upgrade from v4 to v5

Crowsnest includes a built-in migration tool to simplify the upgrade process from v4 to v5.

## Migration Steps

1. Connect to your Crowsnest host (e.g., Raspberry Pi) via SSH.
2. Run the following commands to start the upgrade:

    ```bash
    cd ~/crowsnest
    make upgrade
    ```

## Post-Upgrade Verification

After the upgrade, verify that your `crowsnest.conf` and `moonraker.conf` files are correct.

!!! tip "Backups"
    The migration tool creates backups of both configuration files automatically. If you encounter any issues after the
    upgrade, you can restore them from these backups.
