---
title: Installing Mainsail with KIAUH
description: Learn how to install Mainsail, Moonraker, and Klipper using KIAUH, a versatile tool that automates the installation and update process on any Debian-based device.
social:
  cards_layout_options:
    title: Install via KIAUH
---

# Installing Mainsail with KIAUH

KIAUH (Klipper Install And Update Helper) is a powerful tool that simplifies the installation and management of Klipper,
Moonraker, and Mainsail (or other Klipper orientated tools) on a Debian-based system. This guide will walk you through
the process of using KIAUH to set up Mainsail on your device.

<figure markdown="span">
![KIAUH Logo](../images/setup-kiauh.png)
</figure>

## Prerequisites

Before you begin, make sure you have the following:

- **A Debian-based System:** This can be a Raspberry Pi running Raspberry Pi OS or any other Debian-based Linux
distribution.
- **SSH Access:** You should have SSH access to your device to install and manage software remotely.
- **Internet Connection:** Ensure your device is connected to the internet to download the necessary packages.

## Installing KIAUH

### SSH into Your Device

Open your SSH client (e.g., PuTTY on Windows, Terminal on Mac/Linux) and connect to your device using its IP address.

### Download and Run KIAUH

Once connected, run the following commands to download and start KIAUH:

``` bash
sudo apt-get update && sudo apt-get install git -y
cd ~ && git clone https://github.com/dw-0/kiauh.git
./kiauh/kiauh.sh
```

KIAUH will launch its interactive menu, allowing you to install and manage Klipper, Moonraker, and Mainsail.

## Installing Klipper, Moonraker, and Mainsail

- **Install Klipper:** In the KIAUH menu, choose the option to install Klipper. Follow the prompts to complete the
installation.
- **Install Moonraker:** Next, install Moonraker, which serves as the API that allows Mainsail to communicate with
Klipper. KIAUH will guide you through this process.
- **Install Mainsail:** Finally, select the option to install Mainsail as your web interface. KIAUH will automatically
download and configure Mainsail to work with Moonraker and Klipper.

## Accessing Mainsail

Once the installation is complete, you can access Mainsail by opening a web browser and entering your device's IP
address or hostname. The default port for Mainsail is `80`, so you can access it by typing `http://<your-device-ip>` in
the browser's address bar.
