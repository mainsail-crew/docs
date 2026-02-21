---
html_title: Set Up Low-Latency WebRTC Streaming - Crowsnest
description: Information on how to use WebRTC with Crowsnest.
---

# WebRTC

To use WebRTC, replace `?action=stream` with `webrtc` in your webcam URL configuration.

!!! note
    This feature only works if you are using `mode: camera-streamer` or `mode: spyglass` on a Raspberry Pi.
    The Raspberry Pi 5 is currently not supported.

!!! warning
    Do not change the **URL Snapshot** setting! It should remain the same as before.

![WebRTC settings in Mainsail Interface Settings](../images/faq/upgrade-v3-v4-webrtc-settings.png)

## Which service should I choose?

Mainsail offers multiple WebRTC services. The correct choice depends on the mode you have set for the camera
in your `crowsnest.conf`:

| Mode in `crowsnest.conf` | WebRTC Service in Mainsail |
|--------------------------|----------------------------|
| `camera-streamer`        | `WebRTC (camera-streamer)` |
| `spyglass`               | `WebRTC (MediaMTX)`        |
