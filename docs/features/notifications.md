---
title: Push Notifications
description: Get a notification on your phone when a print finishes, fails or
  runs out of filament, even with Mainsail closed.
social:
  cards_layout_options:
    title: Push Notifications
---

# Push Notifications

Mainsail can subscribe your device to Web Push, so the printer notifies you when a job finishes,
fails or runs out of filament — even with the app closed. Notifications are delivered by the
browser's own push service, so your phone does not need to reach the printer to receive one.

!!! information "Requirements"
    Mainsail must be served over **HTTPS**. Over plain HTTP the browser exposes no service worker
    and no Push API, so the feature cannot work. `localhost` also counts as secure during
    development.

!!! warning "iOS"
    On iOS the Push API only exists once the web app has been **added to the home screen**. Open
    Mainsail in Safari, share → *Add to Home Screen*, then open it from the home screen icon. The
    Notifications tab tells you if this step is still missing.

## Create a VAPID key pair

Web Push messages are signed with a VAPID key pair. The private key stays on the printer; the
public half goes into Mainsail.

Run this on the printer:

```sh
python3 - <<'PY'
import base64
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

key = ec.generate_private_key(ec.SECP256R1())
with open("private_key.pem", "wb") as f:
    f.write(key.private_bytes(serialization.Encoding.PEM,
                              serialization.PrivateFormat.PKCS8,
                              serialization.NoEncryption()))
pub = key.public_key().public_bytes(serialization.Encoding.X962,
                                    serialization.PublicFormat.UncompressedPoint)
print(base64.urlsafe_b64encode(pub).rstrip(b"=").decode())
PY
```

!!! warning "Keep the private key out of the config directory"
    Anything inside the config root can be downloaded through Mainsail's file manager. Store
    `private_key.pem` somewhere else, for example `~/printer_data/webpush/`.

## Subscribe your device

1. Open the **Interface Settings** by clicking the **cogs icon** in the top-right corner.
2. Switch to the **Notifications** section.
3. Paste the printed public key into **VAPID Public Key**.
4. Turn on **Enable Notifications** and accept the browser's permission prompt.

![Notifications section of the Interface Settings](../images/features/notifications.png)

Your device is written to `webpush/subscriptions.json` in the config directory, merged with any
devices already listed. Each entry is the `endpoint` and `keys` pair the browser produced, which is
all a push sender needs.

Use **Send** next to **Test Notification** to confirm your device displays notifications. That one
is produced locally by the browser, so it works before the printer side is set up.

## Send notifications from Moonraker

Moonraker's `[notifier]` sends through Apprise, which speaks Web Push with the `vapid://` scheme:

```ini
[notifier webpush]
url: vapid://you@example.com/<device>?keyfile=/home/pi/printer_data/webpush/private_key.pem&subfile=/home/pi/printer_data/config/webpush/subscriptions.json
events: complete, error, cancelled
body: {% if event_message %}{event_message}{% else %}Print {event_name}
    {event_args[1].filename}{% endif %}
```

`<device>` must match a key in `subscriptions.json`. Apprise lowercases these names.

!!! information "Why the body template has two branches"
    Job events fill `event_args`, while a message sent through the `notify` remote method arrives
    in `event_message` with `event_args` empty. A template using only `event_args` raises an error
    on the second kind.

Apprise folds the title into the body and sends plain text, so the service worker treats the first
line of a message as the notification title and the rest as its body.

## Optional: progress and runout notifications

Two further settings appear in the **Notifications** section **only if** the matching macros exist on your
printer, so nothing is shown that would have nothing to drive.

- **Print Progress** — notify every 10%, 25%, 50%, or only when the job ends.
- **Filament Runout** — one switch per filament sensor, each notifying once per runout.

These are driven from the printer rather than the browser, so they still fire when no browser is
open. Add the following to your config and include it from `printer.cfg`:

```ini
[gcode_macro NOTIFY]
description: Send a custom push notification to every subscribed device
gcode:
    {% if 'MESSAGE' not in params %}
        {action_raise_error("Must provide MESSAGE parameter")}
    {% endif %}
    {% set body = (params.TITLE ~ "\n" ~ params.MESSAGE) if 'TITLE' in params else params.MESSAGE %}
    {action_call_remote_method("notify", name="webpush", message=body)}

[gcode_macro _NOTIFY_PROGRESS_VARS]
variable_last_step: -1
gcode:
    # holds latch state only, never called directly

[delayed_gcode NOTIFY_PROGRESS_CHECK]
initial_duration: 30
gcode:
    {% set interval = printer.save_variables.variables.notify_progress_interval|default(25)|int %}
    {% set state = printer.print_stats.state %}
    {% set last_step = printer["gcode_macro _NOTIFY_PROGRESS_VARS"].last_step|int %}

    {% if state == "printing" and interval > 0 and interval < 100 %}
        {% set pct = (printer.virtual_sdcard.progress * 100)|int %}
        {% set step = ((pct / interval)|int) * interval %}
        {% if step > last_step and step > 0 and step < 100 %}
            SET_GCODE_VARIABLE MACRO=_NOTIFY_PROGRESS_VARS VARIABLE=last_step VALUE={step}
            NOTIFY TITLE="Print {step}%" MESSAGE="{printer.print_stats.filename}"
        {% endif %}
    {% elif state != "printing" and last_step != -1 %}
        SET_GCODE_VARIABLE MACRO=_NOTIFY_PROGRESS_VARS VARIABLE=last_step VALUE=-1
    {% endif %}

    UPDATE_DELAYED_GCODE ID=NOTIFY_PROGRESS_CHECK DURATION=30

[gcode_macro _NOTIFY_RUNOUT_VARS]
variable_latched: {}
gcode:
    # holds per-sensor latch state only, never called directly

[delayed_gcode NOTIFY_RUNOUT_CHECK]
initial_duration: 35
gcode:
    {% set raw = printer.save_variables.variables.notify_runout_sensors|default("extruder")|string %}
    {% set names = raw.split(",") %}
    {% set active = printer.print_stats.state in ("printing", "paused") %}
    {% set latched = printer["gcode_macro _NOTIFY_RUNOUT_VARS"].latched %}
    {% set ns = namespace(next={}) %}

    {% for raw_name in names %}
        {% set name = raw_name|trim %}
        {% set switch_key = "filament_switch_sensor " ~ name %}
        {% set motion_key = "filament_motion_sensor " ~ name %}
        {% set key = switch_key if switch_key in printer else (motion_key if motion_key in printer else "") %}

        {% if name != "" and key != "" and active and not printer[key].filament_detected %}
            {% if latched.get(name, 0)|int == 0 %}
                NOTIFY TITLE="Filament runout" MESSAGE="{name} reports no filament"
            {% endif %}
            {% set _ = ns.next.update({name: 1}) %}
        {% endif %}
    {% endfor %}

    {% if ns.next != latched %}
        SET_GCODE_VARIABLE MACRO=_NOTIFY_RUNOUT_VARS VARIABLE=latched VALUE="{ns.next}"
    {% endif %}

    UPDATE_DELAYED_GCODE ID=NOTIFY_RUNOUT_CHECK DURATION=15
```

These require `[save_variables]` to be configured, which Mainsail uses to store the chosen interval
and sensor list.

!!! warning "Multi-material printers"
    An MMU reports every **unused** gate as empty. Only the toolhead sensor is enabled by default
    for that reason — switching on gates that hold no filament would notify you once per idle gate.

## Send your own notifications

With the `NOTIFY` macro installed, any G-code can raise a notification, including from your slicer's
start or end G-code:

```
NOTIFY TITLE="Bed levelled" MESSAGE="Starting the first layer"
```

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| The **Notifications** section is missing | It is listed on mobile layouts only. |
| "Push notifications require a secure connection" | Mainsail is being served over HTTP. |
| "Add Mainsail to your home screen…" | iOS only exposes push to an installed web app. |
| The test notification works but the printer never notifies | Your device is not in `subscriptions.json`, or the `<device>` name in the notifier URL does not match its key. |
| Progress or runout settings are missing | The matching macros are not present on the printer. |
