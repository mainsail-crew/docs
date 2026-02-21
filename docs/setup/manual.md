---
title: Manual Setup
description: Learn how to manually set up Mainsail, the powerful 3D printer interface, with this detailed guide. Ideal for advanced users looking for full control over their installation.
social:
  cards_layout_options:
    title: Manual Setup of Mainsail
---

# Manual Setup of Mainsail

This guide provides a detailed, step-by-step process for manually setting up Mainsail. It is intended for advanced users
who prefer complete control over their installation and configuration. If you're comfortable working with Linux
commands, manually installing dependencies, and configuring services, this guide is for you. We recommend using the
pre-built [MainsailOS](../mainsailos/index.md) image or the [KIAUH](kiauh.md) installer for beginners or those looking
for a quicker setup.

!!! warning "Important Note"
    This guide has been written using the default username `pi`. If your system uses a different username, be sure to
    replace `pi` with your actual username in all commands and scripts provided in this guide. Failing to do so may
    result in errors during installation and configuration.

## System Requirements and Preparation

Before beginning the manual setup of Mainsail, ensure that your system meets the following requirements and is
adequately prepared.

### Hardware Requirements

- **Single-Board Computer (SBC) or Linux Machine:** A Raspberry Pi (preferably 3A+ or newer) or another Linux-based
    device. The minimum hardware requirements include a multi-core processor and 512MB of RAM. While a Raspberry Pi 3A+
    or newer is recommended for optimal performance, other devices meeting these specifications, such as an Odroid or a
    small x86-based server, can also be used. Ensure your device has sufficient processing power and memory to
    simultaneously handle Mainsail, Moonraker, and Klipper.

- **MicroSD Card (for Raspberry Pi):** If you're using a Raspberry Pi, you'll need a microSD card with a minimum
    capacity of 16GB. For users planning to store more G-Code files or additional data (timelapse or similar), a 32GB or
    larger microSD card is recommended to ensure sufficient space for your files and smooth operation.

### Operating System and Software

- **Debian-based Linux Distribution:** Klipper, Moonraker, and Mainsail are designed to run on Debian-based systems.
    Ensure your SBC or Linux machine is running a compatible distribution such as Raspberry Pi OS lite (64-bit) or
    Debian itself.

To update your system and install the necessary basic packages, run the following commands:

=== "Debian 12 (Bookworm)"
    ``` bash
    sudo apt update && sudo apt upgrade -y
    sudo apt install git unzip
    ```

=== "Debian 11 (Bullseye)"
    ``` bash
    sudo apt update && sudo apt upgrade -y
    sudo apt install git unzip
    ```

=== "Debian 10 (Buster)"
    ``` bash
    sudo apt update --allow-releaseinfo-change && sudo apt upgrade -y
    sudo apt install git unzip
    ```

## Klipper - Firmware for 3D Printers

Klipper is a two-part firmware system that runs on your 3D printer’s microcontroller and a Single-Board Computer (SBC) /
host, such as a Raspberry Pi. This section will guide you through installing Klipper software on your SBC / host. This
component handles the high-level processing tasks and communicates with the microcontroller, which controls the printer
hardware.

### Installing Klipper

1. **Install Required Dependencies:**

    === "Debian 12 (Bookworm)"
        ``` bash
        sudo apt install python3-virtualenv python3-dev libffi-dev build-essential libncurses-dev avrdude gcc-avr \
        binutils-avr avr-libc stm32flash dfu-util libnewlib-arm-none-eabi gcc-arm-none-eabi binutils-arm-none-eabi \
        libusb-dev libusb-1.0-0 libusb-1.0-0-dev pkg-config
        ```

    === "Debian 11 (Bullseye)"
        ``` bash
        sudo apt install python3-virtualenv python3-dev libffi-dev build-essential libncurses-dev avrdude gcc-avr \
        binutils-avr avr-libc stm32flash dfu-util libnewlib-arm-none-eabi gcc-arm-none-eabi binutils-arm-none-eabi \
        libusb-dev libusb-1.0-0 libusb-1.0-0-dev
        ```

    === "Debian 10 (Buster)"
        ``` bash
        sudo apt install python3-virtualenv python3-dev python3-dev libffi-dev build-essential libncurses-dev \
        libusb-dev avrdude gcc-avr binutils-avr avr-libc stm32flash dfu-util libnewlib-arm-none-eabi gcc-arm-none-eabi \
        binutils-arm-none-eabi libusb-1.0
        ```

2. **Clone the Klipper repository from GitHub to your system:**

    ``` bash
    cd ~
    git clone https://github.com/Klipper3d/klipper
    ```
   
3. **Create a virtual environment and install the Python dependencies:**

    ``` bash
    virtualenv -p python3 ~/klippy-env
    ~/klippy-env/bin/pip install -r ~/klipper/scripts/klippy-requirements.txt
    ```
   
### Configuring Klipper

We will not create here a full configuration file for Klipper. Instead, we will create some file structure and add a
empty configuration file. This will allow you to customize the configuration file later with Mainsail.

``` bash
mkdir ~/printer_data/
mkdir ~/printer_data/config
mkdir ~/printer_data/logs
mkdir ~/printer_data/gcodes
mkdir ~/printer_data/systemd
mkdir ~/printer_data/comms
touch ~/printer_data/config/printer.cfg
```

### Startup Service

We will now create a systemd service file to start Klipper automatically when the system boots. To do this, run the
following command:

``` bash
sudo nano /etc/systemd/system/klipper.service
```

Add the following contents to the file:

``` ini
[Unit]
Description=Klipper 3D Printer Firmware SV1
Documentation=https://www.klipper3d.org/
After=network-online.target
Wants=udev.target

[Install]
WantedBy=multi-user.target

[Service]
Type=simple
User=pi
RemainAfterExit=yes
WorkingDirectory=/home/pi/klipper
EnvironmentFile=/home/pi/printer_data/systemd/klipper.env
ExecStart=/home/pi/klippy-env/bin/python $KLIPPER_ARGS
Restart=always
RestartSec=10
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

The `klipper.service` file uses environment variables to pass configuration information to the `klippy.py` script.
This file is located in the `~/printer_data/systemd/` directory. To create this file, run the following command:

``` bash
sudo nano ~/printer_data/systemd/klipper.env
```

and add the following contents:

``` bash
KLIPPER_ARGS="/home/pi/klipper/klippy/klippy.py /home/pi/printer_data/config/printer.cfg -l /home/pi/printer_data/logs/klippy.log -I /home/pi/printer_data/comms/klippy.serial -a /home/pi/printer_data/comms/klippy.sock"
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

Enable and start the service:

``` bash
sudo systemctl enable klipper
sudo systemctl start klipper
```

## Moonraker - API for Klipper

Moonraker is a Python-based API for Klipper. It provides an API to interact with Klipper and exposes a variety of
features, such as printing, controlling, and monitoring the printer. This section will guide you through installing
Moonraker software on your SBC / host.

### Installing Moonraker

1. **Install Required Dependencies:**

    === "Debian 12 (Bookworm)"
        ``` bash
        sudo apt install python3-virtualenv python3-dev libopenjp2-7 libsodium-dev zlib1g-dev libjpeg-dev packagekit \
        wireless-tools curl build-essential
        ```

    === "Debian 11 (Bullseye)"
        ``` bash
        sudo apt install python3-virtualenv python3-dev libopenjp2-7 python3-libgpiod curl libcurl4-openssl-dev \
        libssl-dev liblmdb-dev libsodium-dev zlib1g-dev libjpeg-dev packagekit wireless-tools
        ```

    === "Debian 10 (Buster)"
        ``` bash
        sudo apt install python3-virtualenv python3-dev libopenjp2-7 python3-libgpiod curl libcurl4-openssl-dev \
        libssl-dev liblmdb-dev libsodium-dev zlib1g-dev libjpeg-dev packagekit wireless-tools
        ```

2. **Clone the Klipper repository from GitHub to your system:**

    ``` bash
    cd ~
    git clone https://github.com/Arksine/moonraker.git
    ```

3. **Create a virtual environment and install the Python dependencies:**

    ``` bash
    virtualenv -p python3 ~/moonraker-env
    ~/moonraker-env/bin/pip install -r ~/moonraker/scripts/moonraker-requirements.txt
    ```
   
### Configuring Moonraker

For Moonraker to work, you need to create a configuration file. This file contains the necessary information for
Moonraker to connect to Klipper and add some additional features. The configuration file is located in the
`~/printer_data/config/` directory. To create this file, run the following command:

``` bash
nano ~/printer_data/config/moonraker.conf
```
Add the following contents to the file:

``` ini
[server]
host: 0.0.0.0
port: 7125
# The maximum size allowed for a file upload (in MiB).  Default 1024 MiB
max_upload_size: 1024
# Path to klippy Unix Domain Socket
klippy_uds_address: ~/printer_data/comms/klippy.sock

[file_manager]
# post processing for object cancel. Not recommended for low resource SBCs such as a Pi Zero. Default False
enable_object_processing: False

[authorization]
cors_domains:
    *://my.mainsail.xyz
    *://*.local
    *://*.lan
trusted_clients:
    10.0.0.0/8
    127.0.0.0/8
    169.254.0.0/16
    172.16.0.0/12
    192.168.0.0/16
    FE80::/10
    ::1/128

# enables partial support of Octoprint API
[octoprint_compat]

# enables moonraker to track and store print history.
[history]

# this enables moonraker announcements for mainsail
[announcements]
subscriptions:
    mainsail

# this enables moonraker's update manager
[update_manager]
refresh_interval: 168
enable_auto_refresh: True

[update_manager mainsail]
type: web
channel: stable
repo: mainsail-crew/mainsail
path: ~/mainsail
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

!!! info "This is a very basic config"
    For more options and detailed explanations you should follow [Moonraker’s instructions](https://moonraker.readthedocs.io/en/latest/configuration/){target="_blank"}.

!!! warning "Trusted Clients - read carefully"
    A list of newline separated IP addresses and/or IP ranges that are trusted. Trusted clients are given full 
    access to the API. Both IPv4 and IPv6 addresses and ranges are supported. Ranges must be expressed in CIDR
    notation (see [CIDR](http://ip.sb/cidr){target="_blank"}).  
    For example, an entry of 192.168.1.0/24 will authorize IP addresses in the range of 192.168.1.1 - 192.168.1.254.
    Note that when specifying IPv4 ranges the last segment of the IP address must be 0. The default is no clients or
    ranges are trusted.

### Startup Service

Finally, you need to create a systemd service file to start Moonraker automatically when the system boots. To do this,
run the following command:

``` bash
sudo nano /etc/systemd/system/moonraker.service
```

Add the following contents to the file:

``` ini
#Systemd moonraker Service

[Unit]
Description=API Server for Klipper SV1
Requires=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
Type=simple
User=pi
SupplementaryGroups=moonraker-admin
RemainAfterExit=yes
WorkingDirectory=/home/pi/moonraker
EnvironmentFile=/home/pi/printer_data/systemd/moonraker.env
ExecStart=/home/pi/moonraker-env/bin/python $MOONRAKER_ARGS
Restart=always
RestartSec=10
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

### Moonraker Environment Variables

The `moonraker.service` file uses environment variables to pass configuration information to the `moonraker.py` script.
This file is located in the `~/printer_data/systemd/` directory. To create this file, run the following command:

``` bash
nano ~/printer_data/systemd/moonraker.env
```

and add the following contents:

``` bash
MOONRAKER_ARGS="/home/pi/moonraker/moonraker/moonraker.py -d /home/pi/printer_data"
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

### Install polkit rules

Moonraker requires additional permissions to run. To grant these permissions, run the following command:

``` bash
~/moonraker/scripts/set-policykit-rules.sh
```

### Enable and start the service

``` bash
sudo systemctl enable moonraker
sudo systemctl start moonraker
```

### Verifying Moonraker

To verify that Moonraker is running, run the following command:

``` bash
curl -X GET http://localhost:7125/printer/info
```

If the command returns a JSON object, Moonraker is running. The following is an example of a successful response:

``` json
{"result": {"klippy_connected": false, "klippy_state": "disconnected", "components": ["klippy_connection", "application", "websockets", "internal_transport", "dbus_manager", "database", "file_manager", "klippy_apis", "secrets", "template", "shell_command", "machine", "data_store", "proc_stats", "job_state", "job_queue", "http_client", "announcements", "webcam", "extensions", "authorization", "octoprint_compat", "history", "update_manager"], "failed_components": [], "registered_directories": ["config", "logs", "gcodes"], "warnings": [], "websocket_count": 0, "moonraker_version": "v0.7.1-747-g779997c", "missing_klippy_requirements": [], "api_version": [1, 0, 5], "api_version_string": "1.0.5"}}
```

## Mainsail - Web Interface for Klipper

Mainsail is a web interface for Klipper. It provides a user-friendly interface for managing and controlling your 3D
printer. This section will guide you through installing Mainsail software on your SBC / host.

### Installing web server & reverse proxy (NGINX)

NGINX is a web server that can be used to serve static files and proxy requests to other services. It is a popular choice
for hosting web applications, and it is also used to serve the Mainsail web interface. To install NGINX, run the
following command:

``` bash
sudo apt install nginx
```

### Configuring NGINX

Now that NGINX is installed, we need to configure it to serve the Mainsail web interface. We need multiple NGINX
configuration files to do this. The first file is to proxy requests to the Moonraker API and to the Webcam streams.

To do this, run the following command:

``` bash
sudo nano /etc/nginx/conf.d/upstreams.conf
```

Add the following contents to the file:

``` nginx
# /etc/nginx/conf.d/upstreams.conf

upstream apiserver {
    ip_hash;
    server 127.0.0.1:7125;
}

upstream mjpgstreamer1 {
    ip_hash;
    server 127.0.0.1:8080;
}

upstream mjpgstreamer2 {
    ip_hash;
    server 127.0.0.1:8081;
}

upstream mjpgstreamer3 {
    ip_hash;
    server 127.0.0.1:8082;
}

upstream mjpgstreamer4 {
    ip_hash;
    server 127.0.0.1:8083;
}
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

Next, we need to add a configuration file to store some variables. To do this, run the following command:

``` bash
sudo nano /etc/nginx/conf.d/common_vars.conf
```

Add the following contents to the file:

``` nginx
# /etc/nginx/conf.d/common_vars.conf

map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

The last configuration file we need is the configuration file for Mainsail itself. To do this, run the following
command:

``` bash
sudo nano /etc/nginx/sites-available/mainsail
```

Add the following contents to the file:

``` nginx
# /etc/nginx/sites-available/mainsail

server {
    listen 80 default_server;
    # uncomment the next line to activate IPv6
    # listen [::]:80 default_server;

    access_log /var/log/nginx/mainsail-access.log;
    error_log /var/log/nginx/mainsail-error.log;

    # disable this section on smaller hardware like a pi zero
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_proxied expired no-cache no-store private auth;
    gzip_comp_level 4;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/json application/xml;

    # web_path from mainsail static files
    root /home/pi/mainsail;

    index index.html;
    server_name _;

    # disable max upload size checks
    client_max_body_size 0;

    # disable proxy request buffering
    proxy_request_buffering off;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /index.html {
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    location /websocket {
        proxy_pass http://apiserver/websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    location ~ ^/(printer|api|access|machine|server)/ {
        proxy_pass http://apiserver$request_uri;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Scheme $scheme;
    }

    location /webcam/ {
        postpone_output 0;
        proxy_buffering off;
        proxy_ignore_headers X-Accel-Buffering;
        access_log off;
        error_log off;
        proxy_pass http://mjpgstreamer1/;
    }

    location /webcam2/ {
        postpone_output 0;
        proxy_buffering off;
        proxy_ignore_headers X-Accel-Buffering;
        access_log off;
        error_log off;
        proxy_pass http://mjpgstreamer2/;
    }

    location /webcam3/ {
        postpone_output 0;
        proxy_buffering off;
        proxy_ignore_headers X-Accel-Buffering;
        access_log off;
        error_log off;
        proxy_pass http://mjpgstreamer3/;
    }

    location /webcam4/ {
        postpone_output 0;
        proxy_buffering off;
        proxy_ignore_headers X-Accel-Buffering;
        access_log off;
        error_log off;
        proxy_pass http://mjpgstreamer4/;
    }
}
```

Save the file with `CTRL+S` and close the editor with `CTRL+X`.

At last, we have to create the storage directories from the Mainsail web interface and enable the nginx configuration
file. To do this, run the following command:

``` bash
mkdir ~/mainsail
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/mainsail /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### Verifying reverse proxy

To verify that the reverse proxy is working, run the following command:

``` bash
curl -X GET http://localhost/server/info
```

If the command returns a JSON object, the reverse proxy is working. The following is an example of a successful
response:

``` json
{"result": {"klippy_connected": false, "klippy_state": "disconnected", "components": ["klippy_connection", "application", "websockets", "internal_transport", "dbus_manager", "database", "file_manager", "klippy_apis", "secrets", "template", "shell_command", "machine", "data_store", "proc_stats", "job_state", "job_queue", "http_client", "announcements", "webcam", "extensions", "authorization", "octoprint_compat", "history", "update_manager"], "failed_components": [], "registered_directories": ["config", "logs", "gcodes"], "warnings": [], "websocket_count": 0, "moonraker_version": "v0.7.1-747-g779997c", "missing_klippy_requirements": [], "api_version": [1, 0, 5], "api_version_string": "1.0.5"}}
```

### Downloading Mainsail static files

Mainsail is a pre-built web application, so we need to download the static files and store them in the correct location.
To do this, run the following command:

``` bash
cd ~/mainsail
wget -q -O mainsail.zip https://github.com/mainsail-crew/mainsail/releases/latest/download/mainsail.zip && unzip mainsail.zip && rm mainsail.zip
```

Now you can access the Mainsail web interface by opening a web browser and navigating to `http://<ip>`.

## Important Notes

This guide just covers the basics of installing Klipper, Moonraker, and Mainsail on your system. This guide does not
cover the flashing of your microcontroller or the installation of your 3D printer.

A good place to continue to set up your printer is [this guide](../mainsailos/getting-started/first-boot.md).
