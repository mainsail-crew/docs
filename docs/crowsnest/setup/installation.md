---
html_title: Install on Raspberry Pi OS and Other Distros - Crowsnest
description: Follow these steps to install Crowsnest on your system. This guide covers cloning the repository and running the installation process, plus updating Moonraker for automatic updates.
social:
  cards_layout_options:
    title: Installation
---

# Installation

Execute the commands below to install Crowsnest and follow the instructions carefully.

```bash
sudo apt-get update && sudo apt-get install git -y
cd ~
git clone https://github.com/mainsail-crew/crowsnest.git
cd ~/crowsnest
```

!!! info "Multi Instance Setup"
    If you have multiple Klipper instances installed on a single host, run `make config` before proceeding with the
    installation. This launches a wizard that lets you configure paths for your multi-instance setup.

    ```bash
    make config
    ```

    Choose a path as your **Master** path. This will be the instance where Crowsnest's files (`crowsnest.conf`,
    `crowsnest.env`, and `crowsnest.log`) are located. In Mainsail, this instance is used to set up Crowsnest and
    control the service via Moonraker.

Now run the installer:

```bash
sudo make install
```

## Moonraker Update Manager

After a successful installation, update your `moonraker.conf` as shown below to keep Crowsnest up to date. During
installation, you will be asked if you want the script to do this for you.

```ini
[update_manager crowsnest]
type: git_repo
path: ~/crowsnest
origin: https://github.com/mainsail-crew/crowsnest.git
install_script: tools/pkglist.sh
```

<!-- Crowsnest v5 update block
```ini
[update_manager crowsnest]
type: git_repo
path: ~/crowsnest
origin: https://github.com/mryel00/crowsnest-dev.git
primary_branch: pynest
managed_services: crowsnest
system_dependencies: system-dependencies.json
virtualenv: ~/crowsnest-env
requirements: requirements.txt
```
 -->

!!! tip
    Don't forget to reboot after installation!
