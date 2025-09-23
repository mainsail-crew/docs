---
title: "[cam] section"
description: Learn how to configure individual camera sections in crowsnest.conf, including streaming modes, device paths, resolution, and advanced options for each camera.
social:
  cards_layout_options:
    title: "[cam] Section"
---

# [cam] section

You have to create a `[cam]` section for each camera and name your cameras by placing the name inside the square brackets.

```ini
[cam raspi]
mode: camera-streamer
...

[cam logiC270]
mode: ustreamer
...
```

!!! danger ""
    The word `cam` must be set!  
    This is a keyword to determine that this section belongs to a camera setup.

## **mode**

The streaming backend used by Crowsnest.  
Default: `mode: ustreamer`  
Available options:

??? note "ustreamer"
    This mode uses the MJPG protocol and streams with [ustreamer](https://github.com/pikvm/ustreamer). It's essentially a series of JPEG images.  
    This mode uses a lot of bandwidth depending on the resolution and frame rate set.

??? note "camera-streamer"
    This mode uses [camera-streamer](https://github.com/ayufan/camera-streamer) as the backend.

    camera-streamer is only available on Raspberry Pi's, excluding the Pi 5.  
    The biggest advantage of camera-streamer is that it uses the inbuilt GPU of the Pi SBC to deliver hardware-encoded H.264 as the format. This allows you to stream your video feed in WebRTC, which uses less bandwidth without sacrificing quality, framerate, or resolution.  
    <!-- It also simultaneously provides RTSP streaming (if enabled through `enable_rtsp: true`), MJPG, and snapshots. -->

<!-- TODO Spyglass -->

<!--
## enable_rtsp

If `mode: camera-streamer` is used, this will enable the RTSP server of camera-streamer.

!!! info
    The stream's URL becomes `rtsp://<printer-ip-or-name>:<rtsp_port>/stream.h264`  
    Example: `rtsp://mainsailos.local:8554/stream.h264`

## rtsp_port

```properties
rtsp_port: 8554
```

This setting allows you to set a port for the RTSP server. Only available with `mode: camera-streamer`.
-->
## **port**

The network port through which the camera is accessible. This setting only affects MJPG mode (ustreamer).  
Default: `port: 8080`

**Note:** In MainsailOS, by default, four webcam ports are mapped to URLs. Notice that the first URL doesn't contain a number. You can simply add these to the Mainsail settings.

| Port | Stream URL              | Snapshot URL              |
| ---- | ----------------------- | ------------------------- |
| 8080 | /webcam/?action=stream  | /webcam/?action=snapshot  |
| 8081 | /webcam2/?action=stream | /webcam2/?action=snapshot |
| 8082 | /webcam3/?action=stream | /webcam3/?action=snapshot |
| 8083 | /webcam4/?action=stream | /webcam4/?action=snapshot |

### A small note on WebRTC

To use `WebRTC`, replace `?action=stream` with `webrtc`. This will only work if you use `mode: camera-streamer`.

!!! warning
    Don't change the `URL Snapshot`! This will be the same as before.

![image1](image1) <!-- TODO -->

## **device**

The path of the video device (camera) to be used by the configured streaming service. All available devices are listed in the log file every time Crowsnest is started. You can copy the path from there.  
Default: `device: /dev/video0`

A path in this format is also valid:

```ini
device: /dev/v4l/by-id/usb-PixArt_Imaging_Inc._USB2.0_Camera-video-index0
```

!!! info
    Always prefer full paths as shown above. Especially in multicam setups, using `/dev/video*` will lead to errors or unexpected behavior.

## **resolution**

The desired streaming resolution, formatted as `<width>x<height>` without spaces.  
Default: `resolution: 640x480`

**Note:** This is case sensitive! Do not use a capital 'X'.

!!! info
    The resolution has a big impact on bandwidth, especially in MJPG mode.

You can determine which resolutions are supported by your device by checking the `crowsnest.log`.

<!-- TODO -->
!!! note "Example log file"
    ```
    [11/16/22 20:16:26] crowsnest: Supported Formats:
    [11/16/22 20:16:26] crowsnest: 		[0]: 'MJPG' (Motion-JPEG, compressed)
    [11/16/22 20:16:26] crowsnest: 		Size: Discrete 1920x1080
    ...
    ```

## **max_fps**

The desired streaming FPS (frames per second).  
Default: `max_fps: 15`

!!! note
    It is necessary to check which FPS in combination with which resolution your camera supports. For detailed information, run `v4l2-ctl --list-formats-ext` in your SSH session. The FPS has a big impact on bandwidth, especially in MJPG mode.

## **custom_flags**

This setting allows you to pass advanced parameters to ustreamer. It is possible to adjust image parameters such as brightness, contrast, and saturation, or to flip the image. The passed parameters are appended to the already configured parameters. However, your camera needs to support these advanced parameters as well.  
Default: `custom_flags:`

**Note:** The flags are separated by a single space, not by a comma.

Refer to the documentation for the respective streamer. Links to the repositories can be found in the [mode](#mode) section.

## **v4l2ctl**

This option allows you to pass parameters for the configured device to V4L2 (the driver). Depending on the camera model, it is possible to pass different parameters, but not all parameters are supported by every camera.  
Commented out by default.

**Note:** This is a very advanced topic and is only recommended for experienced users.

!!! warning
    All parameters must be separated by commas!

**Example:** `v4l2ctl: parameter1=value1,parameter2=value2,parameter3=...`

You can determine what your device is capable of by checking the `crowsnest.log`:

<!-- TODO -->
!!! note "Example log output:"
    ```shell
    [11/16/22 20:16:28] crowsnest: Supported Controls:
    [11/16/22 20:16:28] crowsnest: 		brightness 0x00980900 (int) : min=-64 max=64 step=1 default=-15 value=-15
    ...
    ```

### **Example of an application**

A Logitech C920 camera has autofocus activated by default. To get a nice picture, manual focus should be activated. In Crowsnest you can simply specify these options in the config:

<!-- TODO -->
```ini
v4l2ctl: focus_auto=0,focus_absolute=30
```

Restart the Crowsnest service via Mainsail, and you're good to go.
