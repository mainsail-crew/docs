---
title: "[crowsnest] Section"
description: Learn how to configure the [crowsnest] section in crowsnest.conf, including logging, log rotation, and network settings for optimal operation.
social:
  cards_layout_options:
    title: "[crowsnest] Section"
---

# [crowsnest] section

## log_level

Defines how much information should be written to the log file.  
Default: `verbose`

Available options:

??? info "quiet"
    Basic information only.

    ```ini
    log_level: quiet
    ```

    Example output:

    ```
    [06/16/22 09:57:01] crowsnest: crowsnest - A webcam service for multiple cams and stream services.
    [06/16/22 09:57:01] crowsnest: Version: v2.4.0-15-ge42799b
    [06/16/22 09:57:01] crowsnest: Prepare Startup ...
    [06/16/22 09:57:01] crowsnest: INFO: Checking Dependencies
    ...
    ```

??? info "verbose"
    Recommended for setup and troubleshooting.

    ```ini
    log_level: verbose
    ```

    Displays detailed information about the configured and connected cameras, plus their capabilities.  
    Turn off when not needed.

??? info "debug"
    For debugging only.

    ```ini
    log_level: debug
    ```

    Includes all 'verbose' information, plus startup parameters (and defaults) and streamer output.  
    Use only for debugging and turn off when not needed.

!!! note
    Once configured, consider setting `log_level` to `quiet` to minimize disk usage.

## delete_log

Default: `false`

If set to `true`, the existing log file will be deleted every time Crowsnest restarts.  
This can help diagnose issues, as the log will contain only information from the latest restart.

```ini
delete_log: true
```

!!! tip
    This is useful if you ask for help in Discord Forums.
    Please be prepared to upload your logfile.

## no_proxy

Default: `false`

If set to `true`, this forces all streamers to listen on all available network interfaces.

```ini
no_proxy: true
```

This is useful if you want to use Crowsnest in 'standalone' mode. It is not recommended if you used MainsailOS
or KIAUH for setup.
