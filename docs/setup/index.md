---
title: Installation Overview
description: Find guides, setup instructions, and resources to customize and optimize your Mainsail 3D printer interface.
social:
  cards_layout_options:
    title: Installation
---

# Install Mainsail

This guide will walk you through the essential steps to set up and start using Mainsail with your 3D printer. Whether
you’re new to 3D printing or experienced with Klipper firmware, this guide will help you get Mainsail up and running
quickly.  

Mainsail is a powerful and intuitive web interface designed to manage and control your 3D printer. However, it’s
important to understand that Mainsail is only the front-end interface; it works in conjunction with two other key
components: Moonraker and Klipper.

- **Mainsail:** This is the web interface that you interact with. It provides a user-friendly dashboard to control your
printer, monitor prints, and manage files.
- **Moonraker:** Moonraker acts as the API server that Mainsail communicates with. It bridges the gap between the web
interface (Mainsail) and the printer firmware (Klipper), handling tasks like sending commands and retrieving printer
data.
- **Klipper:** Klipper is the firmware and runs on the Host and on the 3D printer's controller. It interprets G-Code,
controls the hardware, and manages all the printer’s operations.

To use Mainsail, you need all three components working together. Klipper handles the low-level control of your printer,
Moonraker serves as the communication layer, and Mainsail provides the visual interface to interact with everything
seamlessly.

## Installation Options for Mainsail

There are several ways to install Mainsail, Moonraker, and Klipper, depending on your experience level and the setup you
prefer. Here are the most common methods:

### Mainsail OS (Recommended)

The easiest and quickest way to get started is by using the pre-built MainsailOS image. MainsailOS is a ready-to-use
operating system image that includes Mainsail, Moonraker, Klipper, and all necessary dependencies. Simply flash the
image onto an SD card, insert it into your SBC (like a Raspberry Pi), and you’re ready to go. This method is ideal for
most users and offers a straightforward setup process.

[Use MainsailOS](../mainsailos/index.md){ .md-button .md-button--primary }

### KIAUH (Klipper Install And Update Helper)

KIAUH is another popular option. KIAUH automates the installation and update of Klipper, Moonraker, and Mainsail on any
Debian-based device. It’s a versatile tool that allows you to customize your setup while still simplifying the
installation process. This method is great for users who want a bit more flexibility without delving into manual
installations.

[Use KIAUH](kiauh.md){ .md-button .md-button--primary }

### Manual Installation

For advanced users who prefer to have full control over every aspect of the installation, there is the option of
manually installing Mainsail, Moonraker, and Klipper. This method involves installing each component individually on
your system, configuring them, and ensuring that they work together. While this approach offers maximum customization,
it is not recommended for most users due to its complexity.

[Use manual installation](manual.md){ .md-button .md-button--primary }

### Hosted Version (For Testing Only)

If you want to explore Mainsail without committing to an installation, you can use the hosted version available at
[my.mainsail.xyz](http://my.mainsail.xyz). This live demo allows you to test Mainsail’s features directly in your
browser. However, please note that this option requires Moonraker and Klipper to be already installed on your printer,
and it is not recommended for productive use as it is intended for testing and exploration purposes only.

[Use my.mainsail.xyz](mymainsail.md){ .md-button .md-button--primary }
