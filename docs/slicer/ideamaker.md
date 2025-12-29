---
title: IdeaMaker
description: Configure IdeaMaker for use with Mainsail and Klipper.
social:
  cards_layout_options:
    title: IdeaMaker
---

# IdeaMaker

Configure [IdeaMaker](https://www.raise3d.com/ideamaker/){:target="_blank"} for optimal
use with Mainsail and Klipper.

## Thumbnails

IdeaMaker supports thumbnail generation since version 4.2.1. To display thumbnail
previews in Mainsail, enable the built-in thumbnail option in your printer settings.

### Setup

1. Open **Printer Settings**
2. Navigate to the **Advanced** tab
3. Enable **GCode Thumbnails for Octoprint and Mainsail**
4. Set the **Resolution** to a square format, e.g., `400` x `400`

!!! warning "Square Thumbnails"
    The thumbnail width and height must be equal. Non-square resolutions are not
    supported.

![IdeaMaker Thumbnail Settings](../images/slicer/ideamaker-thumbnails.png)

<figure markdown="span">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/EbtLn3bDs5I"
    title="Mainsail Quicktips | Thumbnails with ideaMaker" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</figure>

## G-Code Metadata

To enable full metadata support in Mainsail (such as filament type and nozzle diameter),
add the following lines to your **Start G-code** in the printer settings:

```ini
;Nozzle diameter = {machine_nozzle_diameter1}
;Filament type = {filament_name_abbreviation1}
;Filament name = {filament_name1}
```

These variables are automatically replaced by IdeaMaker with the actual values when
slicing, allowing Mainsail to display this information in the file browser and during
prints.
