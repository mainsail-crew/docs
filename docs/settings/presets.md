---
title: Presets Settings
description: Configure preheat presets in Mainsail to quickly set temperatures
  and execute G-Code commands.
social:
  cards_layout_options:
    title: Presets Settings
---

# Presets Settings

Open the **Interface Settings** by clicking the **cogs icon** in the top-right corner, then
navigate to **Presets**.

## Creating a Preset

Click **Add Preset** to create a new preset.

### Name

Enter a name for your preset—usually the filament type (PLA, PETG, ABS), color, or any other
descriptive text.

### Temperatures

Set the desired temperatures for each heater:

- **Extruder**: Target temperature for the hotend
- **Heater Bed**: Target temperature for the heated bed
- **Heater Generic**: Any additional heaters (chamber heater, etc.)
- **Temperature Fan**: Temperature-controlled fans

You can disable individual heaters by unchecking them.

![Preheat Preset Configuration](../images/settings/preset-preheat.png)

### Custom G-Code

Optionally, add custom G-Code that will be executed after the temperatures are set. This is
useful for:

- Setting Z-offset for different print surfaces
- Enabling/disabling fans
- Running preparation macros

## Examples

### Filament Preheat Preset

A typical PLA preheat preset:

| Setting | Value |
|---------|-------|
| Name | PLA |
| Extruder | 200°C |
| Heater Bed | 60°C |
| G-Code | *(empty)* |

### Cooldown Preset

To create a cooldown preset, set all temperatures to `0`:

| Setting | Value |
|---------|-------|
| Name | Cooldown |
| Extruder | 0°C |
| Heater Bed | 0°C |
| G-Code | `M107` *(turn off part cooling fan)* |

### Z-Offset Preset

Use custom G-Code to switch between different Z-offsets for various print surfaces:

| Setting | Value |
|---------|-------|
| Name | Textured PEI |
| Extruder | *(disabled)* |
| Heater Bed | *(disabled)* |
| G-Code | see below |

```ini
SET_GCODE_OFFSET Z=0.2
```

Replace `0.2` with the Z-offset value you require for your print surface.

![Z-Offset Preset Example](../images/settings/preset-zoffset.png)
