---
title: Custom CSS Styling
description: Customize Mainsail's appearance with your own CSS styles.
social:
  cards_layout_options:
    title: Custom CSS
---

# Custom CSS

The `custom.css` file allows you to customize Mainsail's appearance without rebuilding the
application. Place a file named `custom.css` in your `.theme` folder to apply custom styles.

![Custom CSS Overview](../../images/features/custom-theme-custom-css.png)

## Finding Elements to Customize

Use your browser's developer tools to inspect elements and find their CSS selectors.

!!! tip "Learning CSS"
    New to CSS? Learn the basics at
    [W3Schools CSS Tutorial](https://www.w3schools.com/css/){:target="_blank"}.

### Step 1: Open Developer Tools

Open the developer tools by pressing `F12` or right-clicking on the page and selecting
**Inspect**.

![Open Developer Tools](../../images/features/custom-theme-custom-css-inspect-1.png)

### Step 2: Select an Element

Click the element selector icon (or press `Ctrl+Shift+C`) and click on the element you
want to customize.

![Select Element](../../images/features/custom-theme-custom-css-inspect-2.png)

### Step 3: Find the Selector

In the Elements panel, find the CSS selector for the element. Look for class names or
IDs that identify the element.

![Find Selector](../../images/features/custom-theme-custom-css-inspect-3.png)

### Step 4: Experiment with Styles

Use the Styles panel to experiment with different CSS properties. Changes are applied
live, so you can see the result immediately.

![Experiment with Styles](../../images/features/custom-theme-custom-css-inspect-4.png)

## Applying Your Styles

Once you have found the styles you want, copy the CSS rules to your `custom.css` file.

### Example

The following example changes the title color and font in the navigation header:

```css
#nav-header .v-toolbar__title {
    color: gold;
    font-family: fantasy;
}
```

After saving and reloading, the changes are applied:

![Custom CSS Result](../../images/features/custom-theme-custom-css-example.png)

!!! note "Browser Cache"
    After saving your changes, you may need to clear your browser cache. Press
    `Ctrl+Shift+F5` on Windows/Linux or `Cmd+Shift+R` on macOS.
