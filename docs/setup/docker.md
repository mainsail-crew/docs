---
title: Setting Up Mainsail with Docker
description: Set up and manage Mainsail using Docker for streamlined control of your 3D printer interface, with easy updates and configuration.
social:
  cards_layout_options:
    title: Set Up with Docker
---

# Setting Up Mainsail with Docker

This guide covers the process of setting up Mainsail using Docker. Mainsail is the web interface that allows you to
manage and control your 3D printer, but it's important to note that this setup only involves the Mainsail interface
itself. Klipper, the 3D printer firmware, and Moonraker, the API server that Mainsail communicates with, are **not**
installed through this method. You'll need Klipper and Moonraker installed and running on your printer for Mainsail to
function correctly.

Docker is a popular method for setting up Mainsail, especially if you have multiple 3D printers and want to manage them
through a single link. By running Mainsail in Docker containers, you can easily configure each printer to be accessible
from the same URL.

## Preparing the `config.json` File

Before starting Mainsail in Docker, you must prepare the `config.json` file. This file is crucial as it tells Mainsail
where to find each of your 3D printers. In the config.json file, you'll configure the network addresses of the printers
so that Mainsail can connect to them.

1. **Create the `config.json` file:**  
    In the directory where you plan to run Mainsail, create a `config.json` file.

2. **Configure printer addresses:**  
    Edit the `config.json` file to include the IP addresses or hostnames of each printer, along with the port numbers
    that Moonraker uses. The file should look something like this:
    ``` json
    {
        "defaultLocale": "en",
        "instancesDB": "json",
        "instances": [
            { "hostname": "192.168.0.1", "port": 7125 },
            { "hostname": "192.168.0.2", "port": 7125 },
            { "hostname": "192.168.0.3", "port": 7125 }
        ]
    }
    ```
    In this example, replace 192.168.0.1, 192.168.0.2 and 192.168.0.3 with the actual IP addresses of your printers. The
    port 7125 is the default port used by Moonraker. Add or remove instances as needed.

3. **Save and Close:**  
    After configuring the addresses, save the `config.json` file. Mainsail will use this file to connect to each printer 
    when it starts.

## Starting the Docker Container

You can start the Mainsail Docker container once your `config.json` file is prepared and saved. The following command
will run Mainsail in a Docker container, mounting your `config.json` file so that Mainsail can locate and connect to
your printers:

``` bash
docker run \
  --name mainsail \
  -v "$(pwd)/config.json:/usr/share/nginx/html/config.json" \
  -p "8080:80" \
  ghcr.io/mainsail-crew/mainsail:latest
```

Here's what each part of the command does:

- **`--name mainsail`:** This names the Docker container "mainsail" for easier management.

- **`-v "$(pwd)/config.json:/usr/share/nginx/html/config.json"`:** This mounts your local `config.json` file into the
    Docker container at the correct location where Mainsail expects it.

- **`-p "8080:80"`:** This maps port 8080 on your host machine to port 80 in the container, allowing you to access
    Mainsail via `http://<your-ip>:8080`.

- **`ghcr.io/mainsail-crew/mainsail:latest`:** This specifies the Docker image to use, which is the official Mainsail
    image from the GitHub Container Registry.

After running this command, Mainsail will be accessible from your web browser at `http://<your-ip>:8080`, where
`<your-ip>` is the IP address of the machine running Docker. Mainsail will use the configurations in `config.json` to
connect to your printers.

!!! note "Note for Windows users"

    If you're running Docker on Windows, you'll need to replace the volume mounting line in the command. Use the
    following instead:
    ``` bash
    -v "%cd%//config.json:/usr/share/nginx/html/config.json"
    ```
    This ensures that the `config.json` file is correctly mounted in the Docker container on Windows systems.

## Updating the Docker Container

You'll need to update the Docker container periodically to keep Mainsail up-to-date with the latest features and fixes.
Follow these steps to update your Mainsail container:

1. **Stop the running container:**  
    First, stop the currently running Mainsail container with the following command:
    ``` bash
    docker stop mainsail
    ```

2. **Remove the old container:**  
    After stopping the container, remove it to ensure a clean update:
    ``` bash
    docker rm mainsail
    ```

3. **Pull the latest image:**  
    Fetch the latest version of the Mainsail Docker image from the GitHub Container Registry:
    ``` bash
    docker pull ghcr.io/mainsail-crew/mainsail:latest
    ```

4. **Start the updated container:**  
    Finally, start the updated Mainsail container using the same command as before:
    ``` bash
    docker run \
      --name mainsail \
      -v "$(pwd)/config.json:/usr/share/nginx/html/config.json" \
      -p "8080:80" \
      ghcr.io/mainsail-crew/mainsail:latest
    ```
   
!!! note "Note for Windows users"

    On Windows, remember to use the modified volume mounting line.

After completing these steps, your Mainsail installation will be updated to the latest version, and you can continue
using it with all the latest improvements.

## Running Mainsail with Docker Compose

Using Docker Compose simplifies the management of Docker containers by allowing you to define and run multi-container
Docker applications. This guide will show you how to set up Mainsail using Docker Compose.

1. **Create a `docker-compose.yml` file:**  
    Start by creating a `docker-compose.yml` file in the directory where you want to run Mainsail. This file will define the
    Mainsail service and how it interacts with your system.  
    Here’s an example of what the `docker-compose.yml` file might look like:
    ``` yaml
    services:
      mainsail:
        container_name: mainsail
        image: ghcr.io/mainsail-crew/mainsail
        restart: always
        ports:
          - "8080:80"
        volumes:
          - ./config.json:/usr/share/nginx/html/config.json
    ```
    This configuration does the following:
    - **`container_name: mainsail`:** Names the Docker container "mainsail" for easier management.
    - **`image: ghcr.io/mainsail-crew/mainsail`:** Specifies the official Mainsail image from the GitHub Container
    Registry.
    - **`restart: always`:** Ensures that the container automatically restarts if it stops or if the system reboots.
    - **`ports: "8080:80"`:** Maps port 8080 on your host machine to port 80 in the container, making Mainsail
    accessible via `http://<your-ip>:8080`.
    - **`volumes: ./config.json:/usr/share/nginx/html/config.json`:** Mounts your `config.json` file into the container
    so Mainsail can connect to your printers.

2. **Prepare the `config.json` file:**  
    Ensure that your `config.json` file is in the same directory as your `docker-compose.yml` file. This file should be
    configured with the network addresses of your printers, as described in the earlier section.

3. **Start the Mainsail service with Docker Compose:**  
    With the `docker-compose.yml` and `config.json` files ready, you can start the Mainsail service by running:
    ``` bash
    docker compose up -d
    ```
    - The `-d` flag runs the container in detached mode, meaning it will run in the background.
    
    Once the container is up and running, you can access Mainsail in your web browser at `http://<your-ip>:8080`.

4. **Stopping and Managing the Container:**  
    To stop the Mainsail container, use the following command:
    ``` bash
    docker compose down
    ```
    This command stops and removes the container, but the configuration files will remain intact. If you want to restart
    the service, simply run `docker compose up -d` again.

5. **Updating the Docker Container:**  
    To update the Mainsail container when a new version is released, follow these steps:
    - **Pull the latest image:**
    ``` bash
    docker compose pull
    ```
    - **Recreate and Restart the Service:**
    ``` bash
    docker compose up -d
    ```
    
    Docker Compose will automatically pull the latest image, recreate the container, and start it using the updated version.
