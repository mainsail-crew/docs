---
layout: default
title: Remote Access
parent: Quicktips
nav_order: 20
permalink: /quicktips/remote-access
description: >-
  A guide to safe remote access.
---

# {{ page.title }}
{{ page.description }}  

__Notice__  
This guide does not include every step in detail, but is a recommendation for safe remote access.
{: .info}

You will need to decide if you want to receive status messages on your smartphone, have full remote access to Mainsail, or both.

## Status messages

There are several options for sending status messages, some include additional functionality.
- __Moonraker:__
	- Moonraker has built-in [notification support](https://moonraker.readthedocs.io/en/latest/configuration/#notifier) for a variety of services via [Apprise](https://github.com/caronc/apprise).
- __[OctoEverywhere for Klipper](https://octoeverywhere.com/?source=mainsail_docs):__
	- OctoEverywhere's free notification system sends real-time print status and webcam snapshots via push notifications, Telegram, Discord, Email, SMS, and more.
	- OctoEverywhere also provides free, private, and unlimited access to your full Mainsail web portal from anywhere, including full framerate webcam streaming.
	- [Gadget](https://octoeverywhere.com/gadget?source=mainsail_docs), OctoEverywhere's free and unlimited AI print failure detection, continuously watches your prints and alerts you or pauses the print if something is wrong.
- __[Obico for Klipper](https://obico.io/docs/user-guides/klipper-setup/):__
	- Obico sends status messages as well as webcam snapshots to mobile push notification, Email, Telegram, Discord, and more.
    - You can get the real-time webcam feed and printer control using Obico's mobile app or in the browser.
    - Obico also uses AI to detect print failures.
- __Telegram:__ 
	- [Moonraker-telegram-bot](https://github.com/nlef/moonraker-telegram-bot) by nlef is a bot that provides you status updates using the Telegram messaging service.
	- [Moonraker-telegram](https://github.com/Raabi91/moonraker-telegram) by Raabi91 is a bot that also brings you status updates using the chat app Telegram. 
- __Discord:__ 
	- [Mooncord](https://github.com/eliteSchwein/mooncord) by eliteSchwein is a bot that sends you status messages over Discord.

These tools are installed on the local machine and send status messages to their respective platforms. No changes are needed to externally access your local network.

For details, please refer to each project's instructions and documentation.

## Remote Access to Mainsail

<div class="alert">
What <b>not to do</b>: 
	<ul>
		<li>Please do not open ports of Mainsail/Moonraker in your router to the rest of the world. There are plenty of reports of OctoPrint installations being freely accessible on the Internet, with just as many reasons why this is not a good idea.</li>
	</ul>
	<a href="https://isc.sans.edu/forums/diary/3D+Printers+in+The+Wild+What+Can+Go+Wrong/24044/" target="_blank">3D Printers in The Wild, What Can Go Wrong</a>
</div>

<div class="warning">
What you <b>could do</b>:  
	<ul>
		<li>Use an external service provider such as Tailscale to gain access to your home network.
			<ul>
				<li>A potential downside is not having personal control of the connection.</li>
			</ul>
		</li>
		<li>Reverse Proxy</li>
	</ul>
</div>

<div class="success">
<b>Recommendation</b> what you <b>should do</b>:  
	<ul>
		<li>Set up your own secured VPN tunnel.
			<ul>
				<li>In your router</li>
				<li>Or your Raspberry Pi</li>
			</ul>
		</li>
		<li>Use A Service Like OctoEverywhere.</li>
	</ul>
</div>

## [OctoEverywhere For Klipper](https://octoeverywhere.com/?source=mainsail_docs_remote)

OctoEverywhere empowers the worldwide maker community with free, secure, and unlimited remote access to their entire Mainsail web UI from anywhere, including full resolution and frame rate webcam streaming.

OctoEverywhere is a community-based project with the goal of cloud-empowering 3D printers worldwide. Along with remote access, OctoEverywhere provides free and unlimited [AI print failure detection,](https://octoeverywhere.com/gadget?source=mainsail_docs_remote) 3rd party Moonraker app support, real-time print notifications, live streaming, secure shared remote access, and more!

[Learn More About OctoEverywhere](https://octoeverywhere.com/?source=mainsail_docs_remote)

## Set up VPN

Several routers allow you to set up a VPN tunnel. After you have configured the VPN and logged in from another device, you will have secure access to your entire network, including Mainsail.

If your router does not support this, you can also set up your own VPN, for example, using your Raspberry Pi.  
[OpenVPN](https://openvpn.net/), [WireGuard](https://www.wireguard.com/) or [PiVPN](https://www.pivpn.io/) are all options that could work.

To be able to reach your home network even with a non-static IP address, you will need to use a Dynamic DNS service. This will forward a domain directly to your IP address. Often these DynDNS services can also be set up directly in your router so when your external IP address changes, your domain will be automatically updated.  Free Dynamic DNS services include [DuckDNS](https://www.duckdns.org) or [FreeDNS ](https://freedns.afraid.org/)

__Notice__  
The devices that you use to access VPN tunnel are assigned to a different address range. This address range must be configured in Moonraker under `trusted_clients` and `cors_domains`. See also [Moonraker's documentation on network authorization.](https://moonraker.readthedocs.io/en/latest/configuration/#authorization)  <br/><br/>
For example:  
__192.168.1__.x&emsp;_// devices on your regular LAN_  
__192.168.50__.x&emsp;_// devices connected through your VPN tunnel_
{: .info}
