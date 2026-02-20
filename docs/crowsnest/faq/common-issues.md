---
title: Common Issues
description: Troubleshoot common Crowsnest issues like low FPS, RTSP streams, and WebRTC problems.
social:
  cards_layout_options:
    title: Crowsnest Common Issues
---

# Common Issues

Here you can find the most common issues and questions. If your issue isn't listed or resolved here, check out the
[Getting Help](../../getting-help/index.md) section for ways to get support. When asking for help, make sure to
provide a [clean log file](clean-log.md).

## Low FPS

Low FPS is common. Read this section carefully to troubleshoot potential causes. We collected most information in
[this GitHub issue](https://github.com/mainsail-crew/crowsnest/issues/){:target="_blank"}.

Follow these steps in order. Revert changes if a step doesn't fix the issue before proceeding. All changes have to
be made in your `crowsnest.conf`, unless mentioned otherwise.

### 1. WebRTC (Raspberry Pi only)

MJPG streams consume significant bandwidth, which can strain Raspberry Pi network hardware. Using WebRTC will
decrease the load on the network and might increase your FPS. Setting it up has its own
[dedicated page](webrtc.md).

### 2. YUYV instead of MJPG (USB cams only)

Uncomment the `custom_flags` and set up your streamer to use `YUYV` instead of `MJPG`. This is different
depending on the mode you chose:

- `ustreamer`: `custom_flags: --format=YUYV`
- `camera-streamer`: `custom_flags: --camera-format=YUYV`

### 3. Device generates incorrect JPEGs (ustreamer only)

Some Logitech models seem to send incorrect JPEGs resulting in low FPS.
Set `custom_flags: --allow-truncated-frames` to fix this.

On some devices you might want to try `custom_flags: --allow-truncated-frames --encoder=HW` if
`--allow-truncated-frames` alone did not work.

## How can I use RTSP or other streams?

Crowsnest does not support transcoding a RTSP stream, or any existing stream of a camera, to a format that you
can watch in Mainsail. If you use a Wyze cam, please have a look at the
[Wyze cam guide](how-to-use-wyze-cams.md).

## Why does my WebRTC stream not work?

There can be a lot of different problems regarding WebRTC. The most common issues are listed below.

### camera-streamer on non Raspberry Pi systems

camera-streamer has WebRTC support, but only on Raspberry Pi SBCs excluding the Pi 5. If you use it on a
non Raspberry Pi system, you cannot use WebRTC.

### Wrong URL or service in Mainsail

Make sure your URLs and service are set up correctly in Mainsail. More information on this can be found on the
[WebRTC setup page](webrtc.md).

### The Pi 4 problem on Bookworm

A known issue on Pi 4 with Bookworm prevents WebRTC stream creation due to dynamic GPU memory allocation
failures. Therefore, you have to force it to a specific value. Edit `/boot/firmware/config.txt` and add
the following at the bottom of the config:

```ini
[all]
gpu_mem=128
```

Then save and reboot your system.
