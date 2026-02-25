---
html_title: Serial MCU Connection (UART) - MainsailOS
description: >-
  Connect your printer's MCU to a Raspberry Pi via UART serial on MainsailOS. UART is pre-configured and ready to use
  with /dev/serial0.
social:
  cards_layout_options:
    title: Serial MCU Connection (UART)
---

# Serial MCU Connection (UART)

MainsailOS comes with the hardware UART (PL011) pre-configured and ready to use on Raspberry Pi. You can connect your
printer's MCU directly to the GPIO serial pins. No additional configuration on the Raspberry Pi is needed.

## What MainsailOS Does for You

On a standard Raspberry Pi OS, the primary UART (PL011) is assigned to Bluetooth, and the serial console occupies the
serial port. To use UART for your printer's MCU, you would need to manually:

- Disable Bluetooth or remap it to the mini UART (`dtoverlay=disable-bt` or `dtoverlay=miniuart-bt`)
- Enable the hardware UART (`enable_uart=1`)
- Remove the serial console from `cmdline.txt` (`console=serial0,115200`)
- Disable the Bluetooth-related systemd services (`hciuart.service`, `bluetooth.service`)

**MainsailOS handles all of this already.** The UART is enabled, Bluetooth is disabled, and the serial console is
removed. So `/dev/serial0` is immediately available for communication with your printer's MCU.

!!! tip "Need Bluetooth Instead?"
    If you prefer to use Bluetooth and don't need UART, follow the [Enable Bluetooth on RPi](enable-bluetooth-on-rpi.md)
    guide to reverse these settings.

## Wiring

Connect your printer's MCU to the Raspberry Pi GPIO header using three wires:

| Raspberry Pi             | MCU Board | Description        |
|--------------------------|-----------|--------------------|
| GPIO 14 (TX) — Pin 8     | RX        | Transmit → Receive |
| GPIO 15 (RX) — Pin 10    | TX        | Receive ← Transmit |
| GND — Pin 6 (or any GND) | GND       | Common ground      |

!!! warning "Voltage Levels"
    The Raspberry Pi GPIO operates at **3.3V**. Make sure your MCU board also uses 3.3V logic levels on its UART pins.
    Connecting a 5V UART directly to the Raspberry Pi can damage the GPIO pins.

!!! warning "Cross the TX/RX Lines"
    The TX pin of the Raspberry Pi connects to the RX pin on the MCU, and vice versa. This is a common source of
    confusion. Always cross the transmit and receive lines.

## Flash Klipper Firmware for UART

Your MCU must be flashed with Klipper firmware configured for serial (UART) communication instead of USB. Run the
following on your Raspberry Pi:

```bash
cd ~/klipper/
make menuconfig
```

In the menu:

1. Select the correct **Microcontroller Architecture** and **Processor model** for your board
2. Set the **Communication interface** to **Serial (on USART...)** — select the USART that corresponds to your board's
   serial pins
3. Keep the default **Baud rate** of **250000**

!!! note "Board-Specific Settings"
    The exact USART selection depends on your MCU board. Check the example configuration file for your board in the
    [Klipper config directory](https://github.com/Klipper3d/klipper/tree/master/config){:target="_blank"} for the
    correct settings.

After configuring, press `Q` to exit and `Y` to save, then build and flash the firmware:

```bash
make clean
make
```

Flash the firmware to your MCU using the appropriate method for your board (SD card, DFU, etc.). Refer to your board's
documentation for specific flashing instructions.

## Configure Klipper

Once the MCU is flashed and wired, add or update the `[mcu]` section in your `printer.cfg`:

```ini
[mcu]
serial: /dev/serial0
restart_method: command
```

Save the file and restart Klipper. Your printer should now communicate with the MCU over the UART serial connection.

## Troubleshooting

If Klipper cannot connect to the MCU, check the following:

- **Wiring**: Ensure TX/RX are crossed correctly and GND is connected
- **Voltage levels**: Confirm your MCU uses 3.3V logic on its UART pins
- **Firmware**: Verify the MCU was flashed with UART (not USB) communication enabled
- **Baud rate**: Both Klipper firmware and `printer.cfg` must use the same baud rate (default: 250000)
