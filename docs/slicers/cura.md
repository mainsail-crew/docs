---
title: Cura Slicer Integration
description: Configure Cura for use with Mainsail and Klipper.
social:
  cards_layout_options:
    title: Cura
---

# Cura

Configure [UltiMaker Cura](https://ultimaker.com/software/ultimaker-cura){:target="_blank"}
for optimal use with Mainsail and Klipper.

## Thumbnails

To display thumbnail previews in Mainsail, you need to add a post-processing script in Cura.

!!! note "Moonraker Connection Plugin"
    If you're using the Moonraker Connection plugin (see [Direct Upload](#direct-upload)),
    thumbnail generation is already included and you can skip this section.

### Setup

1. Open **Extensions** > **Post Processing** > **Modify G-Code**
2. Click **Add a script** and select **Create Thumbnail**
3. Set the size to `32x32`
4. Add the script again with size `400x400`

!!! warning "Square Thumbnails"
    The thumbnail size must be square (equal width and height). Non-square resolutions
    will cause Cura to squeeze the thumbnail.

![Cura Thumbnail Post-Processing](../images/slicers/cura-thumbnail-postprocessing.png)

## Direct Upload

Upload G-code files directly from Cura to your printer using the
[Moonraker Connection](https://marketplace.ultimaker.com/app/cura/plugins/emtrax/MoonrakerConnection){:target="_blank"}
plugin.

### Installation

1. Open Cura and click **Marketplace** in the top-right
2. Search for **Moonraker Connection** and install it
3. Restart Cura

### Configuration

1. Navigate to **Settings** > **Printer** > **Manage Printers**
2. Select your printer profile and click **Connect Moonraker**
3. Configure the connection settings:

| Setting | Value |
|---------|-------|
| **Address (URL)** | Your Mainsail address, e.g., `http://mainsail.local/` |
| **Camera URL** (optional) | Your webcam stream, e.g., `http://mainsail.local/webcam/stream` |

![Moonraker Connection Configuration](../images/slicers/cura-moonraker-connection.jpg)

## G-Code Preprocessing

For the best experience with Klipper, additional G-code modifications are recommended.
[Pedro Lamas](https://github.com/pedrolamas){:target="_blank"} has developed an excellent
post-processing script that handles all necessary adjustments automatically.

### Features

The **Klipper Preprocessor** script adds support for:

- **Layer information** - Adds `SET_PRINT_STATS_INFO` so Klipper knows the current and
  total layer count in real-time
- **Timelapse support** - Adds `TIMELAPSE_TAKE_FRAME` for use with
  [moonraker-timelapse](https://github.com/mainsail-crew/moonraker-timelapse){:target="_blank"}
- **Object cancellation** - Enables canceling individual objects during a print
  (Exclude Objects)
- **Time estimation** - Improves print time accuracy using klipper_estimator

![Klipper Preprocessor Configuration](../images/slicers/cura-klipper-preprocessor.png)

### Installation

Follow the installation guide in the
[Klipper Preprocessor repository](https://github.com/pedrolamas/klipper-preprocessor){:target="_blank"}.
