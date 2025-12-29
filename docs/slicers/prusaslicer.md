---
title: PrusaSlicer
description: Configure PrusaSlicer for use with Mainsail and Klipper.
social:
  cards_layout_options:
    title: PrusaSlicer
---

# PrusaSlicer

Configure [PrusaSlicer](https://github.com/prusa3d/PrusaSlicer){:target="_blank"} for optimal
use with Mainsail and Klipper.

## Thumbnails

To display thumbnail previews in Mainsail, you need to configure the G-code flavor and
thumbnail settings in PrusaSlicer.

### Setup

1. Open **Printer Settings** > **General**
2. Set **G-code flavor** to `Klipper`
3. Set **G-code thumbnails** to `32x32/PNG, 400x300/PNG`
4. Optionally, enable **Format of G-code thumbnails** as `PNG`

![PrusaSlicer Thumbnail Settings](../images/slicers/prusaslicer-thumbnail-settings.png)

<figure markdown="span">
  ![Print Start Thumbnail](../images/slicers/prusaslicer-print-start-thumbnail.avif)
  <figcaption>Thumbnail in Mainsail print start dialog</figcaption>
</figure>

<figure markdown="span">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/RSKJ0mNNwJc"
    title="Mainsail Quicktips | Thumbnails with PrusaSlicer" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</figure>

## Exclude Objects

PrusaSlicer 2.7.0 and newer supports native object labeling for Klipper's Exclude Objects
feature, eliminating the need for Moonraker preprocessing.

### Setup

1. Open **Printer Settings** > **General**
2. Set **G-code flavor** to `Klipper`
3. Open **Print Settings** > **Output options**
4. Set **Label objects** to `Firmware-specific`

![G-code Flavor Settings](../images/slicers/exclude-objects-gcode-flavor.png)

![Label Objects Settings](../images/slicers/exclude-objects-label-objects.png)

!!! note "Version Requirement"
    Native Exclude Objects support requires PrusaSlicer version 2.7.0 or newer. For older
    versions, use [Moonraker preprocessing](../features/exclude-objects.md#moonraker-preprocessing).

## Upload to Printer

Upload G-code files directly from PrusaSlicer to your printer using the Physical Printer
feature with Moonraker integration.

### Setup

1. Open **Printer Settings**
2. Click the **cogs icon** next to the printer name
3. Select **Add physical printer**

![Add Physical Printer](../images/slicers/prusaslicer-add-physical-printer.png)

4. Configure the physical printer settings:

| Setting | Value |
|---------|-------|
| **Host Type** | `Klipper (via Moonraker)` |
| **Hostname, IP or URL** | Your Mainsail address, e.g., `mainsail.local` |

![Physical Printer Dialog](../images/slicers/prusaslicer-add-physical-printer-dialog.png)

5. Click **Test** to verify the connection
6. Click **OK** to save

After configuration, you can upload G-code directly to your printer using the **Send to
printer** button in the slice dialog or via **File** > **Export** > **Upload to Printer
Host**.
