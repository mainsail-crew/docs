---
layout: default
title: Configuration
nav_order: 5
has_children: false
permalink: /configuration
redirect_from:
  - /necessary-configuration
---

# Required configuration

**Mainsail requires a minimum configuration to function properly and will display a warning at startup if the required parts are not found in your configuration file(s).**
{: .warning}

The following configuration elements are required and must be configured for Mainsail to function properly.
In **MainsailOS** they are stored by default in [mainsail.cfg](https://github.com/mainsail-crew/MainsailOS/blob/master/src/modules/mainsail/filesystem/home/pi/klipper_config/mainsail.cfg) and only need to be included in `printer.cfg`. 

*  [Virtual SD Card](#virtual-sd-card) 
*  [Display Status](#display-status)
*  [Pause / Resume](#pause-resume-cancel)
*  [G-Code Macros](#add-pause--resume--cancel-functionality)

The following configuration elements are optional, including making tweaks and alterations to Klipper's default commands:
*  [Custom Commands](#customisation)

## Virtual SD Card
The `Virtual SD Card` allows G-Code file uploads.
```yaml
[virtual_sdcard]
path: ~/gcode_files
```

## Display Status
`Display Status` is required for messages in your status panel, if you don't have `[display]` in your configuration.
```yaml
[display_status]
```

## Pause, Resume, Cancel
These macros enable pause and resume in Klipper.

```yaml
[pause_resume]
```

# Macros
## Add pause / resume / cancel functionality
You can modify the below macros to fit your needs.
{% raw %}
```yaml
[gcode_macro PAUSE]
description: Pause the actual running print
rename_existing: PAUSE_BASE
gcode:
  PAUSE_BASE
  _TOOLHEAD_PARK_PAUSE_CANCEL
```

```yaml
[gcode_macro RESUME]
description: Resume the actual running print
rename_existing: RESUME_BASE
gcode:
  ##### read extrude from  _TOOLHEAD_PARK_PAUSE_CANCEL  macro #####
  {% set extrude = printer['gcode_macro _TOOLHEAD_PARK_PAUSE_CANCEL'].extrude %}
  #### get VELOCITY parameter if specified ####
  {% if 'VELOCITY' in params|upper %}
    {% set get_params = ('VELOCITY=' + params.VELOCITY)  %}
  {%else %}
    {% set get_params = "" %}
  {% endif %}
  ##### end of definitions #####
  {% if printer.extruder.can_extrude|lower == 'true' %}
    M83
    G1 E{extrude} F2100
    {% if printer.gcode_move.absolute_extrude |lower == 'true' %} M82 {% endif %}
  {% else %}
    {action_respond_info("Extruder not hot enough")}
  {% endif %}  
  RESUME_BASE {get_params}
```


```yaml
[gcode_macro CANCEL_PRINT]
description: Cancel the actual running print
rename_existing: CANCEL_PRINT_BASE
variable_park: True
gcode:
  ## Move head and retract only if not already in the pause state and park set to true
  {% if printer.pause_resume.is_paused|lower == 'false' and park|lower == 'true'%}
    _TOOLHEAD_PARK_PAUSE_CANCEL
  {% endif %}
  TURN_OFF_HEATERS
  CANCEL_PRINT_BASE
```

```yaml
[gcode_macro _TOOLHEAD_PARK_PAUSE_CANCEL]
description: Helper: park toolhead used in PAUSE and CANCEL_PRINT
variable_extrude: 1.0
gcode:
  ##### set park positon for x and y #####
  # default is your max posion from your printer.cfg
  {% set x_park = printer.toolhead.axis_maximum.x|float - 5.0 %}
  {% set y_park = printer.toolhead.axis_maximum.y|float - 5.0 %}
  {% set z_park_delta = 2.0 %}
  ##### calculate save lift position #####
  {% set max_z = printer.toolhead.axis_maximum.z|float %}
  {% set act_z = printer.toolhead.position.z|float %}
  {% if act_z < (max_z - z_park_delta) %}
    {% set z_safe = z_park_delta %}
  {% else %}
    {% set z_safe = max_z - act_z %}
  {% endif %}
  ##### end of definitions #####
  {% if printer.extruder.can_extrude|lower == 'true' %}
    M83
    G1 E-{extrude} F2100
    {% if printer.gcode_move.absolute_extrude |lower == 'true' %} M82 {% endif %}
  {% else %}
    {action_respond_info("Extruder not hot enough")}
  {% endif %}
  {% if "xyz" in printer.toolhead.homed_axes %}
    G91
    G1 Z{z_safe} F900
    G90
    G1 X{x_park} Y{y_park} F6000
    {% if printer.gcode_move.absolute_coordinates|lower == 'false' %} G91 {% endif %}
  {% else %}
    {action_respond_info("Printer not homed")}
  {% endif %}
```
{% endraw %}

# Optional

## Customisation
Klipper has a number of preset commands that are also just macros.

The default configuration of these may not suit your needs or preferences, though they are usually a good place to start. It's possible to adjust these by including them in your config, along with any additional code you would like to run. 

## Example
Adjusting the `BED_MESH_CALIBRATE` command, which is found in the menu at Sidebar > Heightmap > Calibrate.
{% raw %}
```yaml
[gcode_macro BED_MESH_CALIBRATE]
rename_existing: BASE_BED_MESH_CALIBRATE
gcode:
    #before the original gcode
    BED_MESH_CLEAR
    QUAD_GANTRY_LEVEL
    G1 X125 Y125 Z5 F6000
    #the original gcode
    BASE_BED_MESH_CALIBRATE
    #after the original gcode
```
{% endraw %}
