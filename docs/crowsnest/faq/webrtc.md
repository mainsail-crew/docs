---
html_title: Set Up Low-Latency WebRTC Streaming - Crowsnest
description: Information on how to use WebRTC with Crowsnest.
---

# WebRTC

To use WebRTC, replace `?action=stream` with `webrtc` in your webcam URL configuration.

!!! note
    This feature only works if you are using `mode: camera-streamer` or `mode: spyglass` on a Raspberry Pi.
!!! warning "Raspberry Pi 5 users"
    The Pi 5 has no hardware video encoders, which causes several limitations:

    - **`mode: camera-streamer` is not supported.** Crowsnest ships the Raspberry Pi-specific
      build of camera-streamer, which relies on hardware encoding and therefore does not run
      on the Pi 5.
    - **WebRTC is disabled by default** in Spyglass on the Pi 5, because software encoding
      consumes a significant amount of CPU resources. If you still want to enable it, set
      `mode: spyglass` and add `custom_flags: --force-webrtc`, but we do not recommend it.

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
