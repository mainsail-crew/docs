---
layout: default
title: Raspberry Pi Imager
parent: MainsailOS
grand_parent: Setup Guides
nav_order: 1
has_children: false
permalink: /setup/mainsailos/pi-imager
---

This method is cross-platform and works with Windows, Linux and MacOS \
Raspberry Pi Imager appearance may vary depending on the host OS.
{: .info}

We **strongly** recommend you use a premium SD card from a reputable manufacturer such as Sandisk, Kingston or Samsung, using an "A1" (or better) grade SD card. \
\
Low end cards will often fail quickly when used in this application.
{: .warning}

**FLASHING WILL DESTROY ALL DATA ON YOUR SD CARD AND CANNOT BE REVERSED**
{: .alert}

---

# Preparation

- [Download](https://www.raspberrypi.org/software/) and install the latest Raspberry Pi Imager (v1.7.1).

# Flashing MainsailOS

- When opening Raspberry Pi Imager you will be presented with the following:

![screenshot-imager-launched](img/rpi-imager-launched.png)

- Select "CHOOSE OS", and a popup will open as illustrated below.
- Scroll down to "Other specific-purpose OS"

![screenshot-imager-choose-specific](img/rpi-os-popup.png)

- Select "3D printing"

![screenshot-imager-3d-printing](img/rpi-3d-printing.png)

- Choose your prefered 3D printing OS (Mainsail for sure)

![screenshot-imager-os-mainsail](img/rpi-mainsailos.png)
![screenshot-imager-os-mainsail-choosen](img/rpi-mainsailos-choosen.png)

- After that is done hit "STORAGE" and select your desired SD card.

![screenshot-imager-choose-storage](img/rpi-choose-storage.png)

- For example:

![screenshot-imager-choose-storage2](img/rpi-choose-storage-2.png)

- Now it is time to hit the little cogwheel in the right corner.

![screenshot-imager-cogwheel](img/rpi-cogwheel.png)

- Enable SSH.

As a bare minimum, setup SSH and a network connection  
at this point, especially if performing a 'headless' installation.
{: .info}

- Optional: Setup your prefered hostname

If you change the hostname, the URL will be changed accordingly.\
As shown in the screenshot below your URL will be **_http://mainsail.local_**
{: .alert}

![screenshot-imager-setup-ssh](img/rpi-setup-ssh.png)

- Change your password, this step is highly recommended!

**Please don't change the username!**  
At this stage MainsailOS Setup relays on the user "pi".  
We will change that in the future.
{: .alert}

![screenshot-imager-setup-username](img/rpi-setup-username.png)

- If you want to use WiFi instead a wired connection,  
  please configure your WiFi accordingly.

![screenshot-imager-setup-wifi](img/rpi-setup-wifi.png)

- The last point handles your Timezone and Keyboard Layout  
  (Keyboard Layout may affect your language in some cases)

![screenshot-imager-setup-timezone](img/rpi-timezone.png)

- With all desired options preconfigured, click on "WRITE" and accept the warning.

![screenshot-imager-write](img/rpi-write.png)

![screenshot-imager-warning](img/rpi-warning.png)

- Imager will take some time to write the image to the SD card.  
  _When it finished the transfer to your SD Card, it will verify your Image._

![screenshot-imager-writing](img/rpi-writing.png)

Select the "CONTINUE" button and unmount (safely remove) your newly flashed MainsailOS SD card.

![screenshot-imager-write-finished](img/rpi-finished.png)

You are now ready to move on to the [first boot](first-boot) of MainsailOS.

---

[< tool selection](../mainsail-os.md){: .btn } [next step >](first-boot){: .btn }
