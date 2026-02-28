---
html_title: Supported SBCs - MainsailOS
description: Overview of all single board computers supported by MainsailOS, including Raspberry Pi and Armbian-based boards.
social:
  cards_layout_options:
    title: Supported SBCs
---

# Supported SBCs

The list of supported SBCs is continually being expanded. Below is an overview of currently supported boards and those
planned for the future.

## Raspberry Pi

| Model               | Supported | Base Image           | Note                                          |
|---------------------|:---------:|----------------------|-----------------------------------------------|
| Model 1A/B, Zero 1  |     ✅     | Raspberry Pi OS Lite | Very limited RAM and CPU, **not recommended** |
| Model 2B            |     ✅     | Raspberry Pi OS Lite | Limited performance                           |
| Zero 2 W            |     ✅     | Raspberry Pi OS Lite |                                               |
| Model 3A+, 3B, 3B+  |     ✅     | Raspberry Pi OS Lite |                                               |
| Model 4B, CM4       |     ✅     | Raspberry Pi OS Lite | Best choice for 3D printing                   |
| Model 5, CM5        |     ✅     | Raspberry Pi OS Lite | Not recommended with webcams (no HW encoding) |

For hardware details such as GPIO pinout, UART, SPI, and I2C configuration, see the
[Raspberry Pi](raspberry-pi.md) reference page.

## Armbian-based Boards

| Model                                   | Supported | Base Image  | Note                 |
|-----------------------------------------|:---------:|-------------|----------------------|
| [Orange Pi Zero 2](orange-pi-zero-2.md) |     ✅     | Armbian CLI |                      |
| [Orange Pi Zero 3](orange-pi-zero-3.md) |     ✅     | Armbian CLI |                      |
| [Orange Pi 3 LTS](orange-pi-3-lts.md)   |     ✅     | Armbian CLI |                      |
| [Orange Pi 4 LTS](orange-pi-4-lts.md)   |     ✅     | Armbian CLI |                      |
| Orange Pi Zero 2w                       |     ❌     | Armbian CLI | Work in Progress 🛠️ |
| Radxa Rock 4 SE / CM3                   |     ❌     | Armbian CLI | Work in Progress 🛠️ |
| BigTreeTech CB1                         |     ❌     | Armbian CLI | Planned 📅           |
| Libre Computer Le Potato                |     ❌     | —           | Planned 📅           |
