---
title: Useful printer.cfg Snippets
description: Handy Klipper printer.cfg snippets for additional sensors, overriding built-in commands, and disabling unused LCD menus.
social:
  cards_layout_options:
    title: printer.cfg Snippets
---

# Useful printer.cfg Snippets

A collection of handy `printer.cfg` snippets that work well with Mainsail. Each section can be copied directly into
your configuration.

## Additional sensors

You can integrate additional sensors
[supported by Klipper](https://www.klipper3d.org/Config_Reference.html#temperature-sensors){:target="_blank"} into the
temperature graph in Mainsail.

### Raspberry Pi temperature sensor

Append the following section to your `printer.cfg`:

```ini
[temperature_sensor raspberry_pi]
sensor_type: temperature_host
min_temp: 10
max_temp: 100
```

### MCU temperature sensor (ATSAM, ATAMD, and STM32)

Append the following section to your `printer.cfg`:

```ini
[temperature_sensor mcu_temp]
sensor_type: temperature_mcu
min_temp: 0
max_temp: 100
```

## Override built‑in commands

Klipper exposes many built‑in commands (e.g., `BED_MESH_CALIBRATE`) that you can override via `gcode_macro`. Mainsail
calls those commands from the UI, so if you customize them, Mainsail will use your logic.

Best‑practice pattern:

1. Rename the original command to a safe backup name with `rename_existing`.
2. Implement your macro under the original command name.
3. Call the renamed original inside your macro at the appropriate point (forwarding parameters as needed).

```ini
[gcode_macro BED_MESH_CALIBRATE]
rename_existing: BASE_BED_MESH_CALIBRATE
gcode:
    # Pre-steps
    BED_MESH_CLEAR
    QUAD_GANTRY_LEVEL
    G1 X125 Y125 Z5 F6000

    # Original routine, forward any params
    BASE_BED_MESH_CALIBRATE {rawparams}

    # Post-steps
    # e.g., move head to safe position
```

!!! note
    The macro name must exactly match the built‑in command you want to override. Only a subset of commands are
    macro‑overridable.

## Disable OctoPrint LCD menu

Klipper ships with an OctoPrint entry in the LCD menu which does not work with Mainsail. Add the following entry to
your `printer.cfg` to disable it:

```ini
[menu __main __octoprint]
type: disabled
```
