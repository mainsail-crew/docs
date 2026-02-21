---
html_title: Generate a Clean Debug Log for Troubleshooting - Crowsnest
description: Step-by-step guide to generate a clean Crowsnest debug log for troubleshooting camera and streaming issues.
social:
  cards_layout_options:
    title: Generate a Clean Log
---

# How to Generate a Clean Log

When reporting an issue or asking for help, a clean debug log makes it much easier to diagnose the problem. Follow
these steps to generate one:

1.  Open your `crowsnest.conf` and modify the following settings in the `[crowsnest]` section to enable debug logging
    and clear old logs on restart:

    ```ini
    [crowsnest]
    log_level: debug
    delete_log: true
    ```

2.  Click **Save and Restart** in the Mainsail editor to apply the changes and restart Crowsnest with a fresh log.

3.  Reproduce the issue you are experiencing (e.g., start a stream, connect your camera).

4.  Locate the log file in the Mainsail web interface on the **Machine** page. You can either download it from the
    **Logs** panel in the bottom right, or switch the Config-Files panel to **Logs** to find
    `crowsnest.log`.

5.  Share the **complete** log file when asking for help! Do not truncate or cherry-pick sections, as important
    context may be elsewhere in the log.

!!! tip "Reset After Troubleshooting"
    Once you have collected the log, remember to revert the settings to avoid excessive log output during normal
    operation:

    ```ini
    [crowsnest]
    log_level: verbose
    delete_log: false
    ``` 
