---
layout: default
title: Exclude Objects
parent: Features
nav_order: 50
has_children: false
permalink: /features/exclude_objects
description: >-
    Exclude individual objects while a print is in progress.
---

# {{ page.title }}
{{ page.description }}
{: .fs-5 }

This feature was integrated in Klipper v0.10.0-438, Moonraker v0.7.1-445 and Mainsail v2.1.0.
Please check your installed versions first and update them if necessary.
{: .info }

In order to use the feature, your slicer must be configured to name the individual objects in the G-Code. The G-Code
must be preprocessed either by a post-processing script in the slicer or by Moonraker plus the functionality must be
enabled in Klipper.

## Enable the `Label objects` setting in your slicer

In PrusaSlicer or SuperSlicer you have to enable the checkbox in:
```
Print Settings > Output options > Output file > Label objects
```
![Exclude Objects - PrusaSclier](img/exclude_objects-prusaslicer.png){:width="50%"}

Cura & Ideamaker label objects by default in the G-Code, and they are automatically compatible without any further settings.
{: .info}

## Enable the G-Code preprocessor in Moonraker

This step is necessary to convert the previously activated object labels into valid Klipper G-Code. Open your
`moonraker.conf` in Mainsail and add the following setting to your config:
```
[file_manager]
enable_object_processing: True
```

Alternatively it is possible to use an external preprocessor. See [preprocess-cancellation](https://github.com/kageurufu/cancelobject-preprocessor){:target="_blank"} for more
details.
{: .info}

Only G-Code files prepared this way support excluding objects.
{: .warning }

## Enable `exclude_object` module in Klipper

Open your `printer.cfg` in Mainsail and add the following setting to it:
```
[exclude_object]
```

For more information about the exclude_object module in Klipper see:
[exclude_object](https://www.klipper3d.org/Exclude_Object.html){:target="_blank"}
{: .info}

From now on all newly uploaded G-Codes should support this function and a new button in form of a dotted square with an x in the center appears in the status
panel.

![Exclude Objects](img/exclude_objects-status_panel.png){:width="50%"}\

The button will open a dialog in which you can select each individual object and exclude it from the currently ongoing print.

![Exclude Objects](img/exclude_objects.png){:width="50%"}

Please note that only G-Code files that have been prepared accordingly support the feature,
it will not work with old, unprocessed files.
{: .warning }
