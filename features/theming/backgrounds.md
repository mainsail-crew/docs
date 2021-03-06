---
layout: default
title: Backgrounds
parent: Theming
grand_parent: Features
nav_order: 10
permalink: /features/theming/backgrounds
redirect_from:
  - /theming/backgrounds
description: >-
  Place some background images to give Mainsail its own look with ease.
---

# {{ page.title }}
{{ page.description }}

There are two background images that can be used in Mainsail.  The first is in the sidebar and the second is in the main section.


![screenshot](img/sidebar-main.jpg){:width="50%"}

You can upload a new background image using the file manager located in `Settings > Machine`.

## Sidebar background image
Load the background image into your .theme folder and name it `sidebar-background.<extension>`.

| Filename					| sidebar-background	|
| Valid file extensions		| .jpg, .png, .gif and .svg	|
| Recommended image size	| 300x1000px			|

## Main background image
Upload a background image into your .theme folder and name it `main-background.<extension>`.

| Filename					| main-background		|
| Valid file extensions		| .jpg, .png, .gif and .svg	|

**Please note**: The background image is stretched to cover the entire area by default. For example, if you want a repeating pattern, you  will also need to use custom CSS to style it correctly.
{: .info}
