---
html_title: MainsailOS - Prebuilt Klipper Image for Raspberry Pi & More
description: MainsailOS is a prebuilt image for single board computers that already includes Mainsail, Moonraker,
  Klipper and more.
social:
  cards_layout_options:
    title: MainsailOS Overview
---

# MainsailOS

MainsailOS is a prebuilt image for single board computers that already includes
[Mainsail](https://github.com/mainsail-crew/mainsail){:target="_blank"},
[Moonraker](https://github.com/Arksine/moonraker){:target="_blank"} and
[Klipper](https://github.com/Klipper3d/klipper){:target="_blank"}.

## What is MainsailOS?

MainsailOS is a prebuilt image for several Single Board Computer (SBC) models. It contains pre-configured software
needed to run Klipper firmware with Mainsail as your web interface to control your 3D printer. MainsailOS is not a full
distribution like Debian or Ubuntu. It only adds the required software on top of the existing base image for your SBC.

The following software is included in MainsailOS images:

- [Mainsail](../index.md){:target="_blank"} — Web interface for Klipper
- [Klipper](https://github.com/Klipper3d/klipper){:target="_blank"} — 3D printer firmware
- [Moonraker](https://github.com/Arksine/moonraker){:target="_blank"} — API web server for Klipper
- [Crowsnest](../crowsnest/index.md) — Webcam daemon
- [Sonar](../sonar/index.md) — WiFi keepalive daemon
- [Timelapse](https://github.com/mainsail-crew/moonraker-timelapse){:target="_blank"} — Timelapse plugin for Moonraker
- Preinstalled dependencies for [Measuring Resonances](https://www.klipper3d.org/Measuring_Resonances.html){:target="_blank"}

!!! note
    MainsailOS is **not** an "all in one" solution for every use case. It is a simple and easy starting point to enjoy
    Mainsail and its features.

## Supported Hardware

MainsailOS supports Raspberry Pi boards as well as several Armbian-based single board computers. For a full list of
supported and planned boards, see the [Supported SBCs](supported-sbcs/index.md) overview.

## Getting Started

To get started with MainsailOS, head over to the getting started guide for your SBC:

- [Raspberry Pi](getting-started/raspberry-pi.md)
- [Armbian](getting-started/armbian.md)
