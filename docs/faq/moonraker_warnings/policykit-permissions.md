---
title: PolicyKit Permissions
description: How to resolve Moonraker's PolicyKit permissions warning after the switch from sudo to D-Bus.
social:
  cards_layout_options:
    title: PolicyKit Permissions
---

# PolicyKit Permissions

Since Jan 28 '22, Moonraker has changed the way to communicate with system services to D-Bus instead of previously
`sudo` commands.

After updating Moonraker you might be presented this warning message:

<figure markdown="span">
![PolicyKit warning](../../images/faq/moonraker_warnings/policykit-warning.png)
</figure>

To resolve this warning you have to install the PolicyKit permissions with the `set-policykit-rules.sh` script.

SSH into your system and execute the following commands:

```bash
cd ~/moonraker/scripts
./set-policykit-rules.sh
sudo service moonraker restart
```

## Known Problems

### A few messages still remain after the steps have been executed

SSH into your system and make sure that `packagekit` is installed.

```bash
sudo apt update
sudo apt install packagekit
```

This should usually be installed when Moonraker was updated via the Update Manager.

By running the following command, all missing dependencies will be installed.

```bash
~/moonraker/scripts/install-moonraker.sh -r
```
