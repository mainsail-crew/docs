---
title: my.mainsail.xyz - Live online demo of Mainsail
description: Experience Mainsail's powerful 3D printer interface with the live demo at my.mainsail.xyz. Explore features and functionality without any installation. Ideal for testing before setting up on your own system.
social:
  cards_layout_options:
    title: Use my.mainsail.xyz
---

# Explore Mainsail with my.mainsail.xyz

Curious about Mainsail but not ready to install it on your system? The live demo at
[my.mainsail.xyz](http://my.mainsail.xyz){target=_blank} lets you experience Mainsail’s powerful 3D printer interface
directly in your browser. This online version allows you to explore the features and functionality of Mainsail without
any setup or installation. It’s a perfect way to familiarize yourself with the interface, test out various options, and
see how Mainsail can enhance your 3D printing experience—all before committing to a full installation.

## Requirements

To use the live demo at [my.mainsail.xyz](http://my.mainsail.xyz) with your 3D printer, you need to ensure that Klipper
and Moonraker are already installed and properly configured on your printer. Additionally, the following requirement
must be met in your Moonraker setup:

- **CORS Configuration:**
    In your `moonraker.conf` file, make sure that `*://my.mainsail.xyz` is included in the `cors_domains` attribute in
    the `[authorization]` section. This configuration allows the demo interface to communicate with your printer API.
    For example:

    ``` yaml title="moonraker.conf"
    [authorization]
    cors_domains:
        *://my.mainsail.xyz
        *://*.local
    trusted_clients:
        10.0.0.0/8
        127.0.0.0/8
        169.254.0.0/16
        172.16.0.0/12
        192.168.0.0/16
        FE80::/10
        ::1/128
    ```

If you're using MainsailOS or have set up your printer using KIAUH, this configuration is already in place, and no
further action is required.
