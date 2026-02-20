---
title: Enable Bluetooth on RPi
description: Learn how to enable Bluetooth on Raspberry Pi when using MainsailOS, which disables it by default to avoid UART conflicts.
social:
  cards_layout_options:
    title: Enable Bluetooth on RPi
---

# Enable Bluetooth on RPi

Bluetooth is disabled by default on MainsailOS Raspberry Pi images because it interferes with the serial interface
(UART). If you don't need UART but need Bluetooth, you can enable it with this guide.

## Modify config.txt

First, deactivate UART and re-enable Bluetooth overlays in the `config.txt` file. Open an SSH connection to your
Raspberry Pi and open the file with the following command:

```bash
sudo nano /boot/config.txt
```

Find the following lines:

```ini
## Enable Hardware UART for Serial Communication
## This also disables Bluetooth!
enable_uart=1
dtoverlay=disable-bt
```

Comment them out by adding a `#` before each setting:

```ini
## Enable Hardware UART for Serial Communication
## This also disables Bluetooth!
#enable_uart=1
#dtoverlay=disable-bt
```

To save the file and exit, press `CTRL+S` and `CTRL+X`.

## Enable Bluetooth Services

The next step is to re-enable the Bluetooth services:

```bash
sudo systemctl enable hciuart.service
sudo systemctl enable bluetooth.service
```

After a reboot, Bluetooth should be enabled and ready to use:

```bash
sudo reboot
```

!!! warning "UART No Longer Available"
    After applying these changes, the hardware UART will no longer be available for serial communication with your
    printer's MCU. Only follow this guide if you are connecting your printer via USB or network instead of the GPIO
    serial port.
