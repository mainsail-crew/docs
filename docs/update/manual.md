---
title: Manual Update Guide for Mainsail Systems
description: Learn how to manually update Mainsail to ensure you have the latest features and improvements. This step-by-step guide covers everything from backing up your configuration to verifying the update.
social:
  cards_layout_options:
    title: Manual Update Guide
---

# Manual Update Guide for Mainsail-Printers

This guide provides detailed instructions on how to manually update Mainsail. While this process gives you full control
and a deeper understanding of how updates work, it's important to note that for regular, everyday use, we recommend
using the built-in Update Manager in Mainsail or KIAUH for managing updates. These tools simplify the process and ensure
that your system stays up-to-date with the latest features and fixes. This manual guide is intended primarily for
informational purposes or in situations where the automated tools are not available.

## UpdatingKlipper

Updating the Klipper software on your SBC (Single-Board Computer) or host is a straightforward process. This guide will
walk you through the steps to ensure your Klipper installation is up-to-date. Please note that this update process only
affects the Klipper software running on the SBC; updating the firmware on your printer's microcontroller (board) must be
done separately.

1. **Stop the Klipper service:**
    Before updating Klipper, make sure that the Klipper service is stopped:
    ```bash
    sudo systemctl stop klipper
    ```
   
2. **Update Klipper Repository:**
    Update the Klipper repository by running the following command:
    ```bash
    cd ~/klipper
    git pull
    ```

3. **Update Klipper Dependencies:**
    Update the dependencies for Klipper by running the following command:
    ```bash
    cd ~/klipper
    ./klippy-env/bin/pip install -r ./klipper/scripts/klippy-requirements.txt
    ```
   
4. **Restart Klipper Service:**
    Once the update is complete, restart the Klipper service:
    ```bash
    sudo systemctl start klipper
    ```

!!! warning "Configuration Changes After Update"
    After updating Klipper, certain configuration options or parameter names may have changed. It's important to review
    these changes to ensure your setup continues to function correctly. Please check the
    [Klipper Configuration Changes](https://www.klipper3d.org/Config_Changes.html){target=_blank} page for the latest
    updates and adjust your `printer.cfg` file accordingly.

## Updating Moonraker

Moonraker is the API server that connects Mainsail to Klipper. Keeping Moonraker up-to-date ensures that all features
your 3D printer interface runs smoothly and benefits from the latest features and fixes. Follow these steps to update
Moonraker on your SBC/Host.

1. **Stop the Moonraker Service:**
    Before updating Moonraker, make sure that the Moonraker service is stopped:
    ```bash
    sudo systemctl stop moonraker
    ```

2. **Update Moonraker Repository:**
    Update the Moonraker repository by running the following command:
    ```bash
    cd ~/moonraker
    git pull
    ```

3. **Update Moonraker Dependencies:**
    Update the dependencies for Moonraker by running the following command:
    ```bash
    ~/moonraker/scripts/install-moonraker.sh -r
    ```
   
4. **Restart Moonraker Service:**
    Once the update is complete, restart the Moonraker service:
    ```bash
    sudo systemctl start moonraker
    ```

!!! warning "Configuration Changes After Update"
    After updating Moonraker, certain configuration options or parameter names may have changed. It's important to review
    these changes to ensure your setup continues to function correctly. Please check the
    [Moonraker Configuration Changes](https://moonraker.readthedocs.io/en/latest/user_changes/){target=_blank} page for
    the latest updates and adjust your `moonraker.conf` file accordingly.

## Updating Mainsail

Mainsail is the web interface that allows you to control your 3D printer. Keeping Mainsail up-to-date ensures that all
features your 3D printer interface runs smoothly and benefits from the latest features and fixes. Follow these steps to
update Mainsail on your SBC/Host.

Updating Mainsail is a straightforward process, because it's a web application and only requires updating the files on
your SBC/Host. Follow these steps to update Mainsail:

```bash
cd ~/mainsail
rm -R ./*
wget -q -O mainsail.zip https://github.com/mainsail-crew/mainsail/releases/latest/download/mainsail.zip && unzip mainsail.zip && rm mainsail.zip
```

Now, you can access the Mainsail interface by visiting `http://<your-ip-address>` in your web browser. Maybe you have to
force-refresh the page to see the changes.
