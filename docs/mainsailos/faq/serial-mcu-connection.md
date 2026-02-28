---
html_title: Serial MCU Connection (UART) - MainsailOS
description: >-
  Connect your printer's MCU to your SBC via UART serial on MainsailOS. UART is pre-configured and ready to use on
  supported boards.
social:
  cards_layout_options:
    title: Serial MCU Connection (UART)
---

# Serial MCU Connection (UART)

MainsailOS comes with the hardware UART pre-configured and ready to use on all supported boards. You can connect your
printer's MCU directly to the GPIO serial pins. No additional configuration is needed.

## Serial Device Path per Board

Each board uses a different serial device path. Use the correct path for your board in your `printer.cfg`:

| Board                                                     | Serial Device  | TX Pin          | RX Pin           |
|-----------------------------------------------------------|----------------|-----------------|------------------|
| [Raspberry Pi](../supported-sbcs/raspberry-pi.md)         | `/dev/serial0` | GPIO 14 (Pin 8) | GPIO 15 (Pin 10) |
| [Orange Pi Zero 2](../supported-sbcs/orange-pi-zero-2.md) | `/dev/ttyS1`   | PH2 (Pin 8)     | PH3 (Pin 10)     |
| [Orange Pi Zero 3](../supported-sbcs/orange-pi-zero-3.md) | `/dev/ttyS1`   | PH2 (Pin 8)     | PH3 (Pin 10)     |
| [Orange Pi 3 LTS](../supported-sbcs/orange-pi-3-lts.md)   | `/dev/ttyS3`   | PD23            | PD24             |
| [Orange Pi 4 LTS](../supported-sbcs/orange-pi-4-lts.md)   | `/dev/ttyS4`   | GPIO1_A7        | GPIO1_B0         |

!!! warning "Orange Pi 4 LTS: UART not enabled by default"
    The Orange Pi 4 LTS does not have UART enabled by default because UART4 shares its pins with SPI1, which is
    pre-configured for accelerometer use. You need to manually enable the UART4 overlay first. See the
    [Orange Pi 4 LTS UART section](../supported-sbcs/orange-pi-4-lts.md#uart) for instructions.


## What MainsailOS Does for You

MainsailOS pre-configures the UART interface so it is immediately available for communication with your printer's MCU.
The exact steps depend on the board type.

For more details on how UART is set up on each board, refer to the respective "Supported SBCs" page in the left sidebar.

## Wiring

Connect your printer's MCU to your board's GPIO header using three wires. Refer to the
[serial device table](#serial-device-path-per-board) above for the correct TX/RX pins on your board.

| SBC Pin | MCU Board | Description        |
|---------|-----------|--------------------|
| TX      | RX        | Transmit → Receive |
| RX      | TX        | Receive ← Transmit |
| GND     | GND       | Common ground      |

!!! warning "Voltage Levels"
    Most SBC GPIO pins operate at **3.3V**. Make sure your MCU board also uses 3.3V logic levels on its UART pins.
    Connecting a 5V UART directly to 3.3V GPIO pins can damage your board.

!!! warning "Cross the TX/RX Lines"
    The TX pin of the SBC connects to the RX pin on the MCU, and vice versa. This is a common source of confusion.
    Always cross the transmit and receive lines.

## Flash Klipper Firmware for UART

Your MCU must be flashed with Klipper firmware configured for serial (UART) communication instead of USB. Run the
following on your SBC:

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

Once the MCU is flashed and wired, add or update the `[mcu]` section in your `printer.cfg` with the correct serial
device path for your board (see [table above](#serial-device-path-per-board)):

```ini
[mcu]
serial: /dev/serial0
restart_method: command
```

!!! tip
    Replace `/dev/serial0` with the correct device path for your board. For example, on an Orange Pi Zero 3, use
    `/dev/ttyS1`.

Save the file and restart Klipper. Your printer should now communicate with the MCU over the UART serial connection.

## Troubleshooting

If Klipper cannot connect to the MCU, check the following:

- **Wiring**: Ensure TX/RX are crossed correctly and GND is connected
- **Voltage levels**: Confirm your MCU uses 3.3V logic on its UART pins
- **Serial device**: Verify you are using the correct device path for your board
- **Firmware**: Verify the MCU was flashed with UART (not USB) communication enabled
- **Baud rate**: Both Klipper firmware and `printer.cfg` must use the same baud rate (default: 250000)
