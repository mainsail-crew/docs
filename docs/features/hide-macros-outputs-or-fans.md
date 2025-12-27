---
title: Hide Macros, Outputs, or Fans
description: Learn how to hide G-Code macros, output pins, and fans from the
  Mainsail interface using underscore prefixes or interface settings.
social:
  cards_layout_options:
    title: Hide Macros, Outputs, or Fans
---

# Hide Macros, Outputs, or Fans

Mainsail displays all configured G-Code macros, fans, and outputs in the interface by default.
You can hide specific items by prefixing their name with an underscore (`_`), or by adjusting
visibility in the interface settings.

## Underscore Prefix

Any configuration section with a name starting with an underscore (`_`) is automatically hidden
from the Mainsail interface. This works for G-Code macros, fans, and output pins.

### Macros

```ini
[gcode_macro MY_AWESOME_GCODE]
gcode:
    _MY_HELPER_CODE

[gcode_macro _MY_HELPER_CODE]
gcode:
    M300
```

`MY_AWESOME_GCODE` appears in the interface, while `_MY_HELPER_CODE` is hidden.

![Macro Interface Example](../images/features/hide-macros-macro-ui.png)

### Fans and Outputs

The same method works for fans and output pins:

```ini
[fan_generic _chamber_fan]
pin: PA0

[output_pin _status_led]
pin: PA1
```

Both `_chamber_fan` and `_status_led` are hidden from the interface.

## Interface Settings

You can also control the visibility of macros through the
[Macros Settings](../settings/macros.md). This allows you to show or hide macros without
renaming them in your configuration.

## rename_existing Macros

Macros that use the `rename_existing` attribute are automatically hidden in Mainsail. These
macros override default Klipper G-codes, which are already accessible through built-in
interface buttons.

For example, the `PAUSE` macro in `mainsail.cfg`:

```ini
[gcode_macro PAUSE]
description: Pause the actual running print
rename_existing: PAUSE_BASE
gcode:
    PAUSE_BASE
    _TOOLHEAD_PARK_PAUSE_CANCEL
```

Since `PAUSE` overrides the built-in Klipper command, Mainsail hides it from the macro list.
The pause functionality remains available through the interface's pause button.
