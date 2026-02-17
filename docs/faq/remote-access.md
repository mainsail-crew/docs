---
title: Remote Access
description: A guide to safe remote access for your 3D printer running Mainsail.
social:
  cards_layout_options:
    title: Remote Access
---

# Remote Access

Accessing your 3D printer remotely can be incredibly convenient. Whether you want to monitor a long print from the
couch, start a job while you're away, or just keep an eye on things via webcam. However, exposing your printer to the
internet without proper security measures can pose serious risks, from unauthorized access to potential damage.

This guide provides recommendations for setting up safe and secure remote access to your Mainsail installation. It
covers two main topics: **receiving status messages** (e.g., print progress notifications on your phone) and **full
remote access** to the Mainsail web interface.

!!! note
    This guide does not include every step in detail, but is a recommendation for safe remote access. Please refer
    to each project's documentation for detailed setup instructions.

Depending on your needs, you can choose one or both of the following approaches:

- **Status messages only** — Get notified about print progress, failures, or completion via Discord, Telegram, Email,
  and more. This requires no changes to your network configuration.
- **Full remote access** — Access the complete Mainsail web interface from anywhere, including webcam streaming and
  printer control. This requires a secure connection method such as a VPN or a trusted third-party service.

## Status messages

There are several options for sending status messages, some include additional functionality. (listed alphabetically)

- **Discord:** [Mooncord](https://github.com/eliteSchwein/mooncord){:target="_blank"} by eliteSchwein is a bot
  that sends you status messages over Discord.
- **Moonraker:** [Moonraker](https://moonraker.readthedocs.io/en/latest/configuration/#notifier){:target="_blank"}
  has built-in notification support for a variety of services via Apprise.
- **Obico for Klipper:**
  [Obico](https://www.obico.io/){:target="_blank"} provides free full remote access to the Mainsail web interface
  from anywhere through a secure tunnel without the need for a VPN or port forwarding.
    - You can get real-time webcam live feed and printer control using Obico's mobile app for iOS or Android or in the
      browser.
    - Obico sends status messages as well as webcam snapshots to mobile push notification, Email, Telegram, Discord,
      and more.
    - Formerly known as The Spaghetti Detective, Obico is the first and best AI print failure detection. Let AI watch
      your prints and alert you through your preferred channel or pause the print if something looks fishy.
    - Obico is 100% open-source from the client to the server, including the AI failure detection.
      [Self-host Obico server](https://www.obico.io/docs/server-guides/){:target="_blank"} vs.
      [Use Obico cloud](https://app.obico.io/accounts/signup/){:target="_blank"}
- **OctoEverywhere for Klipper:**
  [OctoEverywhere](https://octoeverywhere.com/){:target="_blank"} — Free, secure, and unlimited remote access to your
  full Mainsail web interface built by the maker community. Trusted by over 145k makers, their worldwide server network
  provides instant loading and full-frame rate webcam streaming while keeping your access secure and private.
    - Gadget, OctoEverywhere's free and unlimited AI print failure detection, uses next-generation computer vision AI
      models to continuously watch your prints and alert you or pause them if something is wrong.
    - OctoEverywhere empowers your favorite iOS or Android apps with remote access from anywhere, including full-frame
      rate webcam streaming.
    - OctoEverywhere's notification engine keeps you up-to-date with your prints, sending real-time stats and
      full-resolution webcam images where you want them: Email, SMS, Push Notifications, Discord, Telegram, Webhooks,
      and more.
- **Telegram:**
  [Moonraker-telegram-bot](https://github.com/nlef/moonraker-telegram-bot){:target="_blank"} by nlef is a bot that
  provides you status updates using the Telegram messaging service.
  [Moonraker-telegram](https://github.com/Raabi91/moonraker-telegram){:target="_blank"} by Raabi91 is a bot that also
  brings you status updates using the chat app Telegram.

These tools are installed on the local machine and send status messages to their respective platforms. No changes are
needed to externally access your local network.

For details, please refer to each project's instructions and documentation.

## Remote Access to Mainsail

!!! warning
    Please do not open ports of Mainsail/Moonraker in your router to the rest of the world. There are plenty of
    reports of OctoPrint installations being freely accessible on the Internet, with just as many reasons why this is
    not a good idea.

    [3D Printers in The Wild, What Can Go Wrong](https://isc.sans.edu/forums/diary/3D+Printers+in+The+Wild+What+Can+Go+Wrong/24044/){:target="_blank"}

- Use an external service provider such as [Tailscale](https://tailscale.com/){:target="_blank"} to gain access to
  your home network. A potential downside is not having personal control of the connection.

**Recommendation what you should do:**

- Set up your own secured VPN tunnel.
    - In your router
    - Or your Raspberry Pi

### OctoEverywhere For Klipper

OctoEverywhere empowers the worldwide maker community with free, secure, and unlimited remote access to their entire
Mainsail web UI from anywhere, including full resolution and frame rate webcam streaming.

OctoEverywhere is a community-based project with the goal of cloud-empowering 3D printers worldwide. Along with remote
access, OctoEverywhere provides free and unlimited AI print failure detection, community Moonraker app support,
real-time print notifications, live streaming, secure shared remote access, and more!

- [Learn More About OctoEverywhere](https://octoeverywhere.com/){:target="_blank"}

### Set up VPN

Several routers allow you to set up a VPN tunnel. After you have configured the VPN and logged in from another device,
you will have secure access to your entire network, including Mainsail.

If your router does not support this, you can also set up your own VPN, for example, using your Raspberry Pi.
[OpenVPN](https://openvpn.net/){:target="_blank"}, [WireGuard](https://www.wireguard.com/){:target="_blank"} or
[PiVPN](https://pivpn.io/){:target="_blank"} are all options that could work.

To be able to reach your home network even with a non-static IP address, you will need to use a Dynamic DNS service.
This will forward a domain directly to your IP address. Often these DynDNS services can also be set up directly in
your router so when your external IP address changes, your domain will be automatically updated. Free Dynamic DNS
services include [DuckDNS](https://www.duckdns.org/){:target="_blank"} or
[FreeDNS](https://freedns.afraid.org/){:target="_blank"}.

!!! note
    The devices that you use to access VPN tunnel are assigned to a different address range. This address range must
    be configured in Moonraker under `trusted_clients` and `cors_domains`. See also
    [Moonraker's documentation on network authorization](https://moonraker.readthedocs.io/en/latest/configuration/#authorization){:target="_blank"}.

    For example:

    ```
    192.168.1.x    // devices on your regular LAN
    192.168.50.x   // devices connected through your VPN tunnel
    ```
