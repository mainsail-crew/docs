---
title: Change WiFi Credentials
description: Learn how to change WiFi credentials on MainsailOS when your printer has moved or your WiFi password has changed.
social:
  cards_layout_options:
    title: Change WiFi Credentials
---

# Change WiFi Credentials

Set up WiFi after your printer has moved or your WiFi credentials have changed.

## Requirements

Make sure you have a proper text editor installed:

- [Notepad++](https://notepad-plus-plus.org/){:target="_blank"} (Windows)
- [Visual Studio Code](https://code.visualstudio.com/){:target="_blank"} (Windows, macOS, Linux)
- [SublimeText](https://www.sublimetext.com/){:target="_blank"} (Windows, macOS, Linux)

!!! warning "Incompatible Editors"
    Do **not** use Windows Notepad or WordPad! They can corrupt the file with incorrect line endings or encoding.

    If you use **TextEdit** on macOS, make sure to enable **plain text format** and **disable smart quotes** in
    `TextEdit > Preferences`, otherwise it will insert incompatible characters.

## MainsailOS >= v2.0.0 (NetworkManager) { #mainsailos-v2 }

MainsailOS v2.0.0 and newer uses NetworkManager for network configuration. WiFi credentials are set via a simple
configuration file on the boot partition of the SD card.

To change your WiFi credentials, follow these steps:

1. Remove the SD card from your SBC and insert it into your computer's SD card reader.
2. Open the boot partition. This is the partition readable on Windows and macOS, formatted as FAT32.
3. Copy the file `headless_nm.txt.template` and rename the copy to `headless_nm.txt`.
4. Open `headless_nm.txt` with your text editor and fill in your WiFi credentials:

    ```ini
    # Enter the SSID (network name) of the WiFi network.
    SSID="<mySSID>"

    # Enter the password for the WiFi network.
    PASSWORD="<mySecretPassword>"

    # Set to "true" if the network is hidden, otherwise "false".
    HIDDEN="false"

    # Country code (ISO 3166-1 alpha-2) for WiFi regulatory domain.
    REGDOMAIN="GB"
    ```

5. Replace `<mySSID>` with your WiFi network name and `<mySecretPassword>` with your WiFi password.
6. Set `REGDOMAIN` to your country code (e.g., `DE` for Germany, `US` for United States, `FR` for France).
   For a complete list, visit
   [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2){:target="_blank"}.
7. If your WiFi network is hidden, change `HIDDEN` to `"true"`.
8. Save the file and safely eject the SD card.
9. Insert the SD card back into your SBC and power it on.

!!! tip "Finding Your Device"
    After booting, you can find your device by navigating to `http://mainsailos.local` in your browser, or check your
    router's admin page for the assigned IP address.

!!! note
    The `headless_nm.txt` file is automatically deleted after the configuration has been applied.

## MainsailOS < v2.0.0 (wpa_supplicant) { #mainsailos-v1 }

Older versions of MainsailOS use `wpa_supplicant` for WiFi configuration.

!!! note
    This method only applies to MainsailOS versions before v2.0.0. If you are using v2.0.0 or newer, use the
    [NetworkManager method](#mainsailos-v2) above.

To change your WiFi credentials, follow these steps:

1. Remove the SD card from your SBC and insert it into your computer's SD card reader.
2. Open the boot partition — this is the partition readable on Windows and macOS, formatted as FAT32.
3. Open your text editor and create a new file called `wpa_supplicant.conf`.
4. Copy the following content into the file:

    ```ini
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    country=<Insert 2 letter ISO 3166-1 country code here>
    update_config=1

    network={
        ssid="<Name of your wireless LAN>"
        psk="<Password for your wireless LAN>"
    }
    ```

5. Replace the placeholder values with your country code, WiFi SSID, and password.
6. Save the file with **LF line endings** (not CRLF).
7. Copy the `wpa_supplicant.conf` file to the boot partition of the SD card.
8. Safely eject the SD card, insert it back into your SBC, and power it on.

!!! tip "Multiple Networks"
    To configure more than one network, add additional `network={}` blocks to the file. You may also want to add
    `ap_scan=1` before the first network block and `scan_ssid=1` inside each block for hidden networks.

!!! tip "Country Codes"
    Common country codes: `DE` (Germany), `US` (United States), `GB` (United Kingdom), `FR` (France), `SE` (Sweden).
    For a complete list, visit
    [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2){:target="_blank"}.

## MainsailOS Armbian-Based < v2.0.0 { #mainsailos-armbian }

Armbian-based MainsailOS versions before v2.0.0 use a different configuration file (`network_config.txt`) to set up
WiFi. This method is based on the Armbian first-run configuration.

To change your WiFi credentials, follow these steps:

1. Remove the SD card from your SBC and insert it into your computer's SD card reader.
2. Open the boot partition. This is the partition readable on Windows and macOS, formatted as FAT32.
3. Copy the file `network_config.txt.template` and rename the copy to `network_config.txt`.
4. Open `network_config.txt` with your text editor and adjust the following settings:

    ```ini
    # Set to 1 to apply any network related settings below
    NC_net_change_defaults=1

    # Enable WiFi and disable Ethernet
    NC_net_ethernet_enabled=0
    NC_net_wifi_enabled=1

    # Enter your WiFi credentials
    NC_net_wifi_ssid='MySSID'
    NC_net_wifi_key='MyWiFiKEY'

    # Country code for WiFi regulatory domain
    NC_net_wifi_countrycode='GB'
    ```

5. Set `NC_net_change_defaults` to `1` to enable network configuration.
6. Set `NC_net_wifi_enabled` to `1` and `NC_net_ethernet_enabled` to `0` to use WiFi.
7. Replace `MySSID` with your WiFi network name and `MyWiFiKEY` with your WiFi password.
8. Set `NC_net_wifi_countrycode` to your country code (e.g., `DE`, `US`, `FR`). For a complete list, visit
   [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2){:target="_blank"}.
9. Save the file, safely eject the SD card, insert it back into your SBC, and power it on.
