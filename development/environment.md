---
layout: default
title: Environment
parent: Development
has_children: false
permalink: /development/environment
description: >-
  Set up a development environment for Mainsail
---

# {{ page.title }}
{{ page.description }}

## Set up the environment:
At this point you should have already forked Mainsail into your repositories. \
If that is not the case, go ahead and fork Mainsail now.

Copy the `.env.development.local.example` file and omit the `.example` at the end. \
The file is located in the root directory of the Mainsail project.

Now edit the `.env.development.local` file to reflect your printers network configuration.

_Example:_ If the IP of your printer is `192.168.1.10`, modify it like this:
```
# hostname or ip from the moonraker instance
VUE_APP_HOSTNAME=192.168.1.10
```
You need to set `VUE_APP_HOSTNAME=localhost` in case you want to use a [Virtual-Klipper-Printer](environment#virtual-klipper-printer-with-docker).
{: .info}

### Configure Moonraker
For Moonraker, you need to add your local IP to the `cors_domains` section inside the `moonraker.conf`:

```yaml
cors_domains:
    <your local ip>:<local port>
```
_Example:_ If the IP of your PC you develop Mainsail on is `192.168.1.20`:
```yaml
cors_domains:
    192.168.1.20:8080
```

Port 8080 is the default port `npm` will serve the development server on.
{: .info}


### Install NodeJS
You can download NodeJS from [here](https://nodejs.org/en/download). \
Pick your preferred installation package.

Make sure you run node >=15.9.0
{: .info}

Open your preferred terminal application and navigate into the Mainsail root directory. \
Run the following command to install all required modules and dependencies:
```shell
npm install
```
Afterwards run the following command to start a local development server:
```shell
npm run serve
```
Once the server is up and running, you can access Mainsail on `http://localhost:8080`.

---

## Virtual-Klipper-Printer with Docker
It is possible to develop Mainsail with a virtual printer running inside a Docker container. \
We created a special project for that, which you can find [here](https://github.com/mainsail-crew/virtual-klipper-printer).

To use our Virtual-Klipper-Printer project, it is required to have Docker installed. \
Below are some general resources on how to get Docker.

**Linux:** [https://docs.docker.com/engine/install](https://docs.docker.com/engine/install)

**Mac:** [https://docs.docker.com/docker-for-mac/install](https://docs.docker.com/docker-for-mac/install)

**Windows:** [https://docs.docker.com/docker-for-windows/install](https://docs.docker.com/docker-for-windows/install)

After Docker is installed, follow the instructions [here](https://github.com/mainsail-crew/virtual-klipper-printer#instructions) to get everything up and running.
