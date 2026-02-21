---
html_title: Set Up a Raspberry Pi Camera Module - Crowsnest
description: Step-by-step guide to configure a Raspberry Pi camera module with Crowsnest and camera-streamer.
social:
  cards_layout_options:
    title: Set Up a Raspicam
---

# How to set up a Raspicam?

This guide walks you through configuring a Raspberry Pi camera module (Raspicam) with Crowsnest
using `camera-streamer` as the streaming backend.

## Step 1: Get your device path

Open your `crowsnest.log` and look for an entry like this:

```
[05/25/23 19:12:07] crowsnest: Detected 'libcamera' device -> /base/soc/i2c0mux/i2c@1/imx708@1a
```

## Step 2: Set your device path

Open your `crowsnest.conf` in Mainsail and update the `device:` entry to match the path found in your log:

```ini
device: /base/soc/i2c0mux/i2c@1/imx708@1a
```

## Step 3: Change mode to camera-streamer

Configure `camera-streamer` as your stream service:

```ini
mode: camera-streamer
```

After completing these steps, click **SAVE & RESTART**. Your camera stream should now appear.

## Troubleshooting

If no `libcamera` device is detected in your `crowsnest.log`, check the following:

- Make sure your Raspicam is properly connected to the CSI port.
- Verify that the camera interface is enabled by running `sudo raspi-config` and checking under
  **Interface Options > Camera**.
- Ensure your system is up to date by running `sudo apt update && sudo apt upgrade`.
- Try running `libcamera-hello` via SSH to verify the camera is recognized by the system.
