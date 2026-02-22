---
title: Exclude Objects
description: Skip printing individual objects during an active print job
  without stopping the entire job using Klipper's exclude_object feature.
social:
  cards_layout_options:
    title: Exclude Objects
---

# Exclude Objects

Exclude Objects allows you to skip printing individual objects during an active print job without
stopping the entire print. This is useful when a part detaches from the bed or fails mid-print—you
can exclude it and continue printing the remaining objects.

!!! information "Version Requirements"
    This feature requires Klipper v0.10.0-438, Moonraker v0.7.1-445, and Mainsail v2.1.0 or newer.
    Please check your installed versions and update if necessary.

!!! warning
    This feature only works with properly prepared G-code files. It will not function with older
    or unprocessed files.

## Enable exclude_object in Klipper

Add the following section to your `printer.cfg`:

```ini
[exclude_object]
```

For more information, see the
[Klipper exclude_object documentation](https://www.klipper3d.org/Exclude_Object.html){:target="_blank"}.

## Slicer Configuration

Your slicer must label objects in the G-code for this feature to work. Some slicers support this
natively, while others require Moonraker preprocessing.

| Slicer                | Native Support   | Setup                                                                       |
|-----------------------|------------------|-----------------------------------------------------------------------------|
| PrusaSlicer (v2.7.0+) | :material-check: | [Exclude Objects in PrusaSlicer](../slicers/prusaslicer.md#exclude-objects) |
| OrcaSlicer            | :material-check: | [Exclude Objects in OrcaSlicer](../slicers/orcaslicer.md#exclude-objects)   |
| Cura                  | :material-close: | [G-Code Preprocessing](../slicers/cura.md#g-code-preprocessing)             |
| IdeaMaker             | :material-close: | [Moonraker Preprocessing](#moonraker-preprocessing)                         |

See the [Slicer Configuration](../slicers/index.md) section for detailed setup instructions.

## Moonraker Preprocessing

For slicers without native Klipper support (SuperSlicer, Cura, IdeaMaker, and others), Moonraker
can automatically preprocess G-code files during upload.

Add the following to your `moonraker.conf`:

```ini
[file_manager]
enable_object_processing: True
```

After adding this configuration, restart Moonraker. Newly uploaded G-code files will be
automatically processed to add the required exclude object commands.

!!! warning "Performance on Low-Resource Devices"
    This process is file I/O intensive. It is not recommended for low-resource SBCs such as
    Raspberry Pi Zero. Consider using the
    [preprocess_cancellation](https://github.com/kageurufu/preprocess_cancellation){:target="_blank"}
    script on your computer instead.

!!! note "Support Material Limitation"
    Cura and IdeaMaker treat support material as a single non-mesh entity. When excluding an
    object, its support structures will still print.

## Using the Feature

Once configured, all newly uploaded G-code files will support object exclusion. A new button
(dashed square with an "X") appears in the status panel during printing.

![Status Panel Button](../images/features/exclude-objects-print-status.png)

Clicking the button opens a dialog where you can select individual objects to exclude from the
current print job.

![Exclude Objects Dialog](../images/features/exclude-object-dialog.avif)
