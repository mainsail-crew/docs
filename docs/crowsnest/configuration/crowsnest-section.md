---
title: "[crowsnest] Section"
description: Learn how to configure the [crowsnest] section in crowsnest.conf, including logging, log rotation, and network settings for optimal operation.
social:
  cards_layout_options:
    title: "[crowsnest] Section"
---

# [crowsnest] section

## **log_path**

The path where Crowsnest stores its log file.  
Default: `log_path: ~/printer_data/logs/crowsnest.log`

!!! warning
    This path is set during installation. If you change it afterwards, the log file at the old location will not be removed!!!

## **log_level**

Defines how much information should be written to the log file.  
Default: `log_level: verbose`

Available options:

??? note "quiet"
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

??? note "verbose"
    Recommended for setup and troubleshooting.

    ```ini
    log_level: verbose
    ```

    Displays detailed information about the configured and connected cameras, plus their capabilities.  
    Turn off when not needed.

    See this [example](https://github.com/mainsail-crew/crowsnest/blob/master/log-example.md).

??? note "debug"
    For debugging only.

    ```ini
    log_level: debug
    ```

    Shows all information from 'verbose', plus startup parameters (and defaults), and the output of the selected streamer.  
    Use only for debugging and turn off when not needed.

!!! info
    After configuring to your needs, consider setting to `quiet` to minimize logging.

## **delete_log**

Default: `delete_log: false`

If set to `true`, the existing log file will be deleted every time Crowsnest restarts.  
This can help diagnose issues, as the log will contain only information since the latest restart.

!!! info
    This is useful if you ask for help in Discord Forums.
    Please be prepared to upload your logfile.

## **no_proxy**

If set to `true`, forces all streamer to listen on all available network interfaces.

Useful if you want to use Crowsnest in 'standalone' mode. Not recommended if you used MainsailOS or KIAUH to set up.
