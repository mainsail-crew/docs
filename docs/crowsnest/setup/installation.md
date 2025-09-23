---
title: Installing Crowsnest
description: Follow these steps to install Crowsnest on your system. This guide covers cloning the repository and running the installation process, plus updating Moonraker for automatic updates.
social:
  cards_layout_options:
    title: Installation
---

# Installation
!!! info
    It does not matter if you install with KIAUH or manually. Both methods perform the same actions under the hood.

## KIAUH
KIAUH (Klipper Install And Update Helper) is a powerful tool that simplifies the installation and management of various Klipper oriented tools, including Crowsnest, on a Debian-based system. You have most likely already used it to install Klipper, Moonraker and Mainsail.

If you have not downloaded KIAUH yet, execute the following commands:
```bash
sudo apt-get update && sudo apt-get install git -y
cd ~ && git clone https://github.com/dw-0/kiauh.git
```

To start KIAUH afterwards, run:
```bash
./kiauh/kiauh.sh
```

You should then see the main menu of KIAUH. To execute one of the displayed options, type the corresponding number and confirm by pressing ENTER.

To install Crowsnest, go into the `Install` menu and select `Crowsnest`. Then follow the instructions carefully.



## Manual Installation
!!! warning ""
    If you have multiple Klipper instances installed on a single host, skip ahead to the [Multi Instance Installation](#multi-instance-installation) section. Otherwise, you may not be able to configure Crowsnest in Mainsail.

    The most common setup is a single Klipper instance. If this applies to you, you can safely continue with the instructions below.

To manually install Crowsnest, `git` must be installed on your system. Once ready, execute the commands below and follow the instructions carefully.

```bash
cd ~
git clone https://github.com/mainsail-crew/crowsnest.git
cd ~/crowsnest
sudo make install
```

After a successful installation, update your `moonraker.conf` as shown below to keep Crowsnest up to date. During installation, you will be asked if you want the script to do this for you.

```ini
[update_manager crowsnest]
type: git_repo
path: ~/crowsnest
origin: https://github.com/mainsail-crew/crowsnest.git
install_script: tools/pkglist.sh
```

### Multi Instance Installation
!!! info
    If you are not using Multi Instance, skip this section and continue with Configuration.

Crowsnest was not designed with Multi Instance support in mind and likely never will. However, you can use `make config` to adapt the installation for multi-instance setups.

```bash
cd ~/crowsnest
make config
```

This launches a wizard that lets you set up your paths according to your Multi Instance setup.

Choose a path as your **Master** path. This path will be the instance where files needed by Crowsnest (such as `crowsnest.conf`, `crowsnest.env`, and `crowsnest.log`) are located.

After generating a configuration file (`tools/.config`) for the installer, run:

```bash
sudo make install
```

Follow the instructions presented by the installer.

!!! info
    Don't forget to reboot after installation!

In Mainsail, this instance is used to set up Crowsnest and control the service via Moonraker.

