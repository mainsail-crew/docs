# How to set up a Raspicam?

## Setup/Configure Raspicam

### Step 1: Get your device path

Open `crowsnest.log` and look for an entry like this:

```
[05/25/23 19:12:07] crowsnest: Detected 'libcamera' device -> /base/soc/i2c0mux/i2c@1/imx708@1a
```

!!! warning
    See the [Troubleshooting](#troubleshooting) section if such an entry does not exist.

### Step 2: Set your device path

Open your `crowsnest.conf` in Mainsail and look for the `device:` entry. Set the device to the one found in your log.

```yaml
device: /base/soc/i2c0mux/i2c@1/imx708@1a
```

### Step 3: Change mode to camera-streamer

Now configure `camera-streamer` as your stream service:

```yaml
mode: camera-streamer
```

After completing these steps, click `SAVE & RESTART`. Your camera stream should now appear.

## Troubleshooting

