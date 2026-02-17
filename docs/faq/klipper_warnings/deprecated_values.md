---
title: Deprecated Values
description: A list of known Klipper deprecated configuration values with descriptions of how to fix them.
social:
  cards_layout_options:
    title: Deprecated Values
---

# Deprecated Values

Klipper occasionally deprecates specific configuration values as the firmware evolves. When this happens, Klipper will
display a warning message during startup, indicating that your `printer.cfg` contains outdated values that need to be
updated.

Below you can find a list of commonly encountered deprecated values along with instructions on how to fix them. For a
complete list of all configuration changes, refer to the official
[Klipper Configuration Changes](https://www.klipper3d.org/Config_Changes.html){:target="_blank"} documentation.

### Removal of NTC 100K beta 3950 sensor type. { #ntc-100k-beta-3950 }

The `NTC 100K beta 3950` temperature sensor is _deprecated_ and will be removed in the near future.

In order to solve the problem, search in your config for `sensor_type: NTC 100K beta 3950` and replace it with
`sensor_type: Generic 3950`.

Most users will find the `Generic 3950` temperature sensor more accurate. Anyway you can continue to use the older
(typically less accurate) definition. To do so, define a custom thermistor with `temperature1: 25`,
`resistance1: 100000`, and `beta: 3950`.

### Removal of `rpi_temperature` sensor alias. { #rpi_temperature }

Replace `sensor_type: rpi_temperature` by `sensor_type: temperature_host` everywhere in your config.
