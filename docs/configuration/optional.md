---
title: Customization and Command Overrides
description: Customize Mainsail behavior via _CLIENT_VARIABLE in mainsail.cfg and optionally override Klipper commands safely with gcode_macro.
social:
  cards_layout_options:
    title: Optional customization
---

# Customization and Command Overrides

There are some optional customizations you can make in your Klipper `printer.cfg` to change how Mainsail and Klipper
behave. This is useful if you want to adjust some build-in behaviors or default behaviors in default commands / macros.

## Customize mainsail.cfg

MainsailOS ships `mainsail.cfg` (client configuration) as a read‑only include. Do not edit `mainsail.cfg` directly. To
customize its behavior, override the provided variables in your own `printer.cfg` by adding the special macro
`_CLIENT_VARIABLE`.

Setting up `_CLIENT_VARIABLE`:
1. Copy the `_CLIENT_VARIABLE` macro from `mainsail.cfg` into your `printer.cfg`.
2. Remove the `#` comment markers from the first line, the last line (`gcode:`), and the variables you want to
   customize.
3. Adjust the values to fit your printer and preferences, then press `SAVE & RESTART` in the editor.

### Minimal example: override the park position
Copy the block below into your `printer.cfg` and adjust values:

```ini
[gcode_macro _CLIENT_VARIABLE]
variable_use_custom_pos   : True
variable_custom_park_x    : 10.0
variable_custom_park_y    : 10.0
variable_custom_park_dz   : 5.0
gcode:
```

!!! note
    The last line `gcode:` is required to define a gcode macro, even if it is empty. This is necessary for Klipper to
    parse the configuration correctly.

## Reuse the mainsail.cfg PAUSE macro with custom parameters
A common use case is changing the minimum Z height and parking position for filament changes while still using the PAUSE
logic from `mainsail.cfg`.

Example for `M600` filament change:

```ini
[gcode_macro M600]
description: Filament change
gcode: PAUSE X=10 Y=10 Z_MIN=50
```

This calls the `PAUSE` macro defined in `mainsail.cfg` but overrides the park position to X=10, Y=10 and sets the
minimum Z height to 50mm.

## Override built‑in commands (advanced)

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
