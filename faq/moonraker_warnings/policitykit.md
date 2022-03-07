---
layout: default
title: PolicyKit Permissions
parent: Moonraker Warnings
grand_parent: FAQ
nav_order: 20
has_children: false
permalink: /faq/moonraker_warnings/policykit
has_toc: false
---

# PolicyKit Permissions
Since Jan 28 '22, Moonraker has changed the way to communicate with system services to D-Bus instead of previously `sudo` commands.

After updating Moonraker you might be presented this warning message:

![PolicityKit Warning](img/policitykit.png){:width="50%"}

To resolve this warning you have to install the PolicyKit permissions with the `set-policykit-rules.sh` script.

SSH into your system and execute the following commands:

```
cd ~/moonraker/scripts  
./set-policykit-rules.sh  
sudo service moonraker restart
```

For more information, please check out the corresponding [Moonraker documentation](https://moonraker.readthedocs.io/en/latest/installation/#policykit-permissions).
{: .info}

# Known Problems
## A few messages still remain after the steps have been executed

SSH into your system and make sure that `packagekit` is installed.

```
sudo apt update
sudo apt install packagekit
```

This should usually be installed when Moonraker was updated via the Update Manager.

By running the following command, all missing dependencies will be installed.

```
~/moonraker/scripts/install-moonraker.sh -r
```
