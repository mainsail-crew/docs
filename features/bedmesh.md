---
layout: default
title: Bed Mesh
parent: Features
nav_order: 50
has_children: false
permalink: /features/bedmesh
description: >-
    View and create bedmeshes & analyze problems with the print bed.
---

# {{ page.title }}
{{ page.description }}  
{: .fs-5 }

In order to get to the Bed Meshes, select "HEIGHTMAP" from the main menu.

![Heightmap](img/navbar-heightmap.png){:width="50%"}

Please note that this entry only appears after "Bed Mesh" has been properly configured in Klipper. For more information on this topic, please consult the [Klipper documentation](https://www.klipper3d.org/Bed_Mesh.html)
{: .info }

![Bed Mesh](img/bedmesh.png)

1. Under "Profiles" your Bed Mesh profiles are listed. You can have multiple profiles in Klipper and select and delete them in this panel. Next to the profile name, it displays the variance, the difference between the highest and the lowest measurement point.
2. You create profiles by performing the calibration. This can be done with the "CALIBRATE" button in the title bar. There you can also home your printer and clear the currently loaded mesh. Remember to save the config! A "save config" button will appear in the header.
3. By clicking on the profile name, you can rename the currently loaded mesh.
4. In the "Current Mesh" panel you get some values of the currently loaded mesh. This includes the name, size, min and max values, as well as the variance.
5. You can limit the scale by moving the sliders down or up. In addition, you can limit the scale to the min/max values of the profile with the toggle switch.
6. You can display the probed mesh, the computed mesh and a flat plane on Z0.
7. With the slider at the bottom you can scale the mesh itself, so you can see differences in height better. There is also a switch to toggle the wireframe.