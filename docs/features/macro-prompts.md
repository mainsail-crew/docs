# Macro Prompts

This feature allows Klipper macros to trigger dialog prompts, letting users to interact with the firmware by choosing different options.

![Example Filament Runout Prompt](../images/features/macro-prompts-runout.png)

!!! warning
    Macro prompts require the `[respond]` module. Please check if it is enabled in your Klipper config.

    This feature was introduced in Mainsail v2.9.0. Please verify your Mainsail version to ensure compatibility.

## Supported Macro Prompt Commands

You can create custom macro prompts using the following commands:

### `// action:prompt_begin <headline>`
This command starts the definition of a prompt. The `<headline>` sets the title displayed at the top of the prompt dialog.

### `// action:prompt_text <text>`
Adds an descriptive text to the prompt.

### `// action:prompt_button <label>|<gcode?>|<color?>`
Adds a button to the prompt dialog.

- **`<label>`**: The text displayed on the button.
- **`<gcode?>`***(optional)*: G-code to execute when the button is pressed. Defaults to the label text if not specified.
- **`<color?>`***(optional)*: Sets the button color. Possible values are `primary`, `secondary`, `info`, `warning`, `error` (default is dark gray)

![Button Colors Example](../images/features/macro-prompts-example.png)

### `// action:prompt_button_group_start`
Begins a button group, allowing multiple buttons to be displayed in the same row within the prompt dialog.

### `// action:prompt_button_group_end`
Closes the current "button group".

### `// action:prompt_footer_button <label>|<gcode?>|<color?>`
Adds a button to the *footer* of the prompt dialog.

- **`<label>`**: The text displayed on the button.
- **`<gcode?>`** *(optional)*: G-code to execute when the button is pressed. Defaults to the label text if not specified.
- **`<color?>`** *(optional)*: Sets the button color. Possible values are  `primary`, `secondary`, `info`, `warning`, and `error`. (default is white).

![Footer Button Example](../images/features/macro-prompts-footer.png)

### `// action:prompt_show`
Displays the prompt dialog. This command finalizes the prompt setup and makes it visible to the user.

### `// action:prompt_end`
Closes or hides the prompt dialog.

## Examples

Here are some examples of macro prompts:

### Prompt with multiple Button Groups

```yaml
[gcode_macro SHOW_PROMT_BUTTON_GROUPS]
gcode:
    RESPOND TYPE=command MSG="action:prompt_begin MacroPrompt"
    RESPOND TYPE=command MSG="action:prompt_text These are all button colors"
    RESPOND TYPE=command MSG="action:prompt_button default|TEST"
    RESPOND TYPE=command MSG="action:prompt_button_group_start"
    RESPOND TYPE=command MSG="action:prompt_button primary|TEST|primary"
    RESPOND TYPE=command MSG="action:prompt_button secondary|TEST|secondary"
    RESPOND TYPE=command MSG="action:prompt_button_group_end"
    RESPOND TYPE=command MSG="action:prompt_button_group_start"
    RESPOND TYPE=command MSG="action:prompt_button info|TEST|info"
    RESPOND TYPE=command MSG="action:prompt_button warning|TEST|warning"
    RESPOND TYPE=command MSG="action:prompt_button error|TEST|error"
    RESPOND TYPE=command MSG="action:prompt_button_group_end"
    RESPOND TYPE=command MSG="action:prompt_show"
```

### Simple question prompt

```yaml
[gcode_macro SHOW_PROMT]
gcode:
    RESPOND TYPE=command MSG="action:prompt_begin Question"
    RESPOND TYPE=command MSG="action:prompt_text Do you want to cancel the print?"
    RESPOND TYPE=command MSG="action:prompt_footer_button continue|RESPOND TYPE=command MSG=action:prompt_end"
    RESPOND TYPE=command MSG="action:prompt_footer_button CANCEL|CANCEL_PRINT|error"
    RESPOND TYPE=command MSG="action:prompt_show"
```