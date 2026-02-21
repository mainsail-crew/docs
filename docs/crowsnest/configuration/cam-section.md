---
title: "[cam] section"
description: Learn how to configure individual camera sections in crowsnest.conf, including streaming modes, device
  paths, resolution, and advanced options for each camera.
social:
  cards_layout_options:
    title: "[cam] Section"
---

# [cam] section

Create a `[cam <name>]` section for each camera. Replace `<name>` with a meaningful name. `cam` is a required keyword to
identify camera configurations.

```ini
[cam raspi]
mode: camera-streamer
...

[cam logiC270]
mode: ustreamer
...
```

## mode

The streaming backend used by Crowsnest.  
Default: `ustreamer`  
Available options:

- `ustreamer`
- `camera-streamer`
- `spyglass`

For detailed information about each backend, see the [Backends](../faq/backends.md) page.
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
## port

The network port through which the camera is accessible.  
Default: `8080`

!!! info
    If you have Mainsail installed on the same device as Crowsnest, a Nginx reverse proxy is also installed. So you can
    use these URLs to access the camera stream and snapshots:
    
    | Port | Stream URL              | Snapshot URL              |
    | ---- | ----------------------- | ------------------------- |
    | 8080 | /webcam/?action=stream  | /webcam/?action=snapshot  |
    | 8081 | /webcam2/?action=stream | /webcam2/?action=snapshot |
    | 8082 | /webcam3/?action=stream | /webcam3/?action=snapshot |
    | 8083 | /webcam4/?action=stream | /webcam4/?action=snapshot |

## device

The path of the video device (camera) to be used by the configured streaming service. All available devices are listed
in the log file every time Crowsnest is started. You can copy the path from there.  
Default: `/dev/video0`

A path in this format is also valid:

```ini
device: /dev/v4l/by-id/usb-PixArt_Imaging_Inc._USB2.0_Camera-video-index0
```

!!! info
    Always prefer `/dev/v4l/by-id/` paths as shown above. Especially in multicam setups, using `/dev/video*` will lead
    to errors or unexpected behavior. If you are using identical cameras, use `/dev/v4l/by-path/` instead, as
    `/dev/v4l/by-id/` paths will be the same for identical devices.

## resolution

The desired streaming resolution, formatted as `<width>x<height>` without spaces.  
Default: `640x480`

!!! note
    - This setting is case-sensitive! Do not use a capital 'X'.  
    - Resolution significantly impacts bandwidth, especially in MJPG mode.

<!-- TODO -->
!!! info "Supported Resolutions"
    You can determine which resolutions are supported by your device by checking the `crowsnest.log`.
    ```
    [11/16/22 20:16:26] crowsnest: Supported Formats:
    [11/16/22 20:16:26] crowsnest: 		[0]: 'MJPG' (Motion-JPEG, compressed)
    [11/16/22 20:16:26] crowsnest: 		Size: Discrete 1920x1080
    ...
    ```

## max_fps

The desired streaming FPS (frames per second).  
Default: `15`

!!! note
    It is necessary to check which FPS in combination with which resolution your camera supports. For detailed
    information, run `v4l2-ctl --list-formats-ext` in your SSH session. Higher FPS has a big impact on bandwidth,
    especially in MJPG mode.

## custom_flags

This setting allows you to pass advanced parameters to the configured streaming backend. It is possible to adjust image
parameters such as brightness, contrast, and saturation, or to flip the image. The passed parameters are appended to the
already configured parameters. However, your camera needs to support these advanced parameters as well.  
Default: not set

!!! note
    - The flags are separated by a single space, not by a comma.
    - Refer to the documentation of the respective streaming backend for available flags. See the
      [Backends](../faq/backends.md) page for links to the repositories.

## v4l2ctl

This option allows you to pass parameters for the configured device to V4L2 (the driver). Depending on the camera model,
it is possible to pass different parameters, but not all parameters are supported by every camera.  
Default: not set

!!! note
    - This is a very advanced topic and is only recommended for experienced users.
    - All parameters must be separated by commas!
      
    **Example:** A Logitech C920 has autofocus enabled by default. To set manual focus:
    ```ini
    v4l2ctl: focus_auto=0,focus_absolute=30
    ```

<!-- TODO -->
!!! info "Supported Controls"
    You can determine what your device is capable of by checking the `crowsnest.log`.
    ```shell
    [11/16/22 20:16:28] crowsnest: Supported Controls:
    [11/16/22 20:16:28] crowsnest: 		brightness 0x00980900 (int) : min=-64 max=64 step=1 default=-15 value=-15
    ...
    ```
