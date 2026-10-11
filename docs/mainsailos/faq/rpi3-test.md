---
html_title: Pi 3 / Zero 2 W USB Driver Test - MainsailOS
description: Help test two USB driver fixes for freezes and MCU disconnects on Raspberry Pi 3 and Zero 2 W boards running 64-bit MainsailOS.
search:
  exclude: true
social:
  cards_layout_options:
    title: Pi 3 / Zero 2 W USB Driver Test
---

# Pi 3 / Zero 2 W on 64-bit MainsailOS: USB driver test

Thanks for helping! Some Pi 3 and Zero 2 W boards on a 64-bit image freeze or lose the MCU connection. There are two possible fixes, and I need real printers running each of them:

- **Variant A** (`cmdline.txt`): keep the default USB driver (`dwc_otg`), but disable its FIQ
- **Variant B** (`config.txt`): switch to the alternative USB driver (`dwc2`)

**Please pick ONE variant and stay on it for the whole test.** Comment which one you take, so both groups end up about the same size. If you can't decide, take the one with fewer testers so far.

Both changes are one line and can be undone at any time.

## What we know so far

On my test Pi 3B (Klipper stress load, constant network traffic):

- Without any fix: hard freezes, the Pi needs a power cycle.
- With either variant: **no more hard freezes.**
- Variant A without a webcam: 24 hours with zero USB errors.
- With a 1080p/30 fps USB webcam on the Pi's own USB ports, both variants had a rare **USB reset** (roughly once a day). It disconnects the MCU, so **Klipper shuts down and a running print is cancelled**, and Ethernet can drop out until a reboot.

So please only print things you can afford to lose, and stay close to the printer for the first few prints. Keep your webcam setup as it is, because that is exactly what I need data on.

## Who can help

- Raspberry Pi 3B, 3B+, 3A+ or Zero 2 W
- MainsailOS (or another Pi OS based image) **64-bit**
- Printer MCU connected over USB

## Before you start

**Use a second SD card if you can.** Your current card stays untouched and you can swap back any time.

1. Flash the latest MainsailOS **64-bit** with Raspberry Pi Imager on the second card.
2. Back up your config: in Mainsail go to **Machine**, select all files in the config folder and download them.
3. Boot the new card, install your usual extras, upload your config.
4. Make sure your MCU is set by ID in `printer.cfg` (`serial: /dev/serial/by-id/...`), not `/dev/ttyACM0`.

## Step 1: Check the system

Connect via SSH and run:

```bash
cat /proc/device-tree/model; echo; uname -m
ls /boot/firmware/cmdline.txt /boot/firmware/config.txt
```

Continue only if you see something like this:
```
Raspberry Pi 3 Model B Rev 1.2
aarch64
```
So check the Pi model is Pi3 or Zero2 and architecture is aarch64.

## Step 2: Keep logs across freezes

By default the system log is lost when the Pi freezes. This makes it persistent:

```bash
sudo mkdir -p /var/log/journal
sudo systemctl restart systemd-journald
```

## Step 3: Make backups

```bash
sudo cp /boot/firmware/cmdline.txt /boot/firmware/cmdline.txt.orig
sudo cp /boot/firmware/config.txt /boot/firmware/config.txt.orig
```

Now do **either** Variant A **or** Variant B, not both.

---

## Variant A: edit `cmdline.txt` (FIQ disabled)

```bash
sudo sed -i '1 s/$/ dwc_otg.fiq_enable=0 dwc_otg.fiq_fsm_enable=0/' /boot/firmware/cmdline.txt
cat /boot/firmware/cmdline.txt
sudo reboot
```

`cmdline.txt` must stay **one single line**, now ending with `dwc_otg.fiq_enable=0 dwc_otg.fiq_fsm_enable=0`.

Check after the reboot:

```bash
dmesg | grep -i fiq
```

Expected: `FIQ disabled` and `FIQ split-transaction FSM disabled`.

---

## Variant B: edit `config.txt` (`dwc2` driver)

Add the overlay for Pi 3 and Zero 2 only:

```bash
printf '\n[pi3]\ndtoverlay=dwc2,dr_mode=host\n[pi02]\ndtoverlay=dwc2,dr_mode=host\n[all]\n' | sudo tee -a /boot/firmware/config.txt
tail -n 6 /boot/firmware/config.txt
sudo reboot
```

The end of `config.txt` should look like this:

```ini
[pi3]
dtoverlay=dwc2,dr_mode=host
[pi02]
dtoverlay=dwc2,dr_mode=host
[all]
```

Check after the reboot:

```bash
basename "$(readlink /sys/bus/platform/devices/3f980000.usb/driver)"
lsusb -t | head -n 3
```

Expected: `dwc2`, and the root hub line shows `Driver=dwc2`. If it still says `dwc_otg`, the overlay did not apply. **Please report that together with your exact Pi model**, it helps me get the final image right.

---

## Step 4: Print as usual

- Use the printer normally for **at least a few days or about 30 print hours**.
- Longer is better.

## Step 5: Report

Run this after a problem (freeze, `Lost communication with MCU`, network gone) or at the end of your test. It writes everything into one file:

```bash
{
echo "== system"; cat /proc/device-tree/model; echo; uname -m; uptime
echo "== usb driver"; basename "$(readlink /sys/bus/platform/devices/3f980000.usb/driver)"
echo "== cmdline"; cat /proc/cmdline
echo "== config.txt overlays"; grep -nE "^\[|dwc2" /boot/firmware/config.txt
echo "== throttled"; vcgencmd get_throttled
echo "== usb tree"; lsusb -t
echo "== kernel, current boot"; sudo dmesg -T | grep -iE "disconnect|disabled by hub|FSM|Firmware transaction|voltage|-71|dwc|rcu|NETDEV"
echo "== kernel, previous boot"; sudo journalctl -k -b -1 --no-pager | grep -iE "disconnect|disabled by hub|FSM|Firmware transaction|voltage|-71|dwc|rcu|NETDEV" | tail -n 200
echo "== klipper"; grep -E "Lost communication|Timer too close|Transition to shutdown" ~/printer_data/logs/klippy.log | tail -n 30
} > ~/printer_data/config/pi3-report.txt 2>&1
```

Send `~/printer_data/config/pi3-report.txt` (download it in the Mainsail file manager or via `scp`) together with:

- Variant (A or B) and how long it ran (days, print hours)
- Pi model and power supply
- MCU board(s) and how they are connected (USB, CAN via USB adapter, UART), and whether the 5V line of the MCU USB cable is cut or taped
- Webcam model, resolution and fps, and where it is plugged in (Pi directly or a powered hub), or "no webcam"
- What happened, and how often the problem showed up **before** the test

"Ran 5 days, no problems" is just as useful as a crash report.

## Undo everything

```bash
sudo cp /boot/firmware/cmdline.txt.orig /boot/firmware/cmdline.txt
sudo cp /boot/firmware/config.txt.orig /boot/firmware/config.txt
sudo reboot
```

Or just swap back to your original SD card.
