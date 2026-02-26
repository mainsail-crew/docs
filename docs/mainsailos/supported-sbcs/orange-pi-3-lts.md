---
html_title: Orange Pi 3 LTS - MainsailOS
description: Hardware reference for Orange Pi 3 LTS in MainsailOS — available UARTs, SPI, I2C buses, GPIO chip, and board-specific notes.
social:
  cards_layout_options:
    title: Orange Pi 3 LTS
---

# Orange Pi 3 LTS

The Orange Pi 3 LTS is an SBC based on the Allwinner H6 SoC. It features a 26-pin GPIO header and is supported by
MainsailOS through an Armbian-based image.

## Board Overview

| Property       | Value                |
|----------------|----------------------|
| SoC            | Allwinner H6         |
| RAM            | 2 GB                 |
| Base Image     | Armbian CLI          |
| GPIO Header    | 26-pin               |

## GPIO Pinout

<figure markdown="span">
![Orange Pi 3 LTS GPIO Pinout](../../images/mainsailos/orangepi-3-lts-gpio-pinout.png)
<figcaption>Orange Pi 3 LTS 26-pin GPIO header pinout</figcaption>
</figure>

## GPIO Chip

When using GPIOs with the [Linux MCU](../faq/linux-mcu.md) in Klipper, you need to identify the correct GPIO chip for
your pins. The H6 SoC uses multiple GPIO chips.

Run the following to list available chips and their lines:

```bash
sudo apt install gpiod
gpioinfo
```

Example Klipper configuration:

```ini
[output_pin example]
pin: host:gpiochip0/gpio20
```

!!! tip "Finding the Right Chip and Line"
    Use `gpioinfo` to find the GPIO chip and line number for the pin you want to use. The chip and line mapping depends
    on the Armbian device tree configuration.

## UART

UART3 is **enabled by default** in MainsailOS via the `uart3` device tree overlay. The UART is immediately available
after the first boot.

| Interface | Device Path   | Overlay  | TX Pin | RX Pin |
|-----------|---------------|----------|--------|--------|
| UART3     | `/dev/ttyS3`  | `uart3`  | PD23   | PD24   |

!!! warning "Cross the TX/RX Lines"
    The TX pin of the SBC connects to the RX pin on the MCU, and vice versa.

!!! info "Debug UART"
    The Orange Pi 3 LTS has a dedicated 3-pin debug UART header (GND, RX, TX) on the board. This is intended for
    serial console access and is **not** suitable for MCU communication.

## SPI

SPI1 is **enabled by default** in MainsailOS via the `spi-spidev1` device tree overlay and the `spi-dev` kernel module.
It is pre-configured for use with accelerometers for
[Input Shaper](https://www.klipper3d.org/Measuring_Resonances.html){:target="_blank"}.

The SPI device is available at `/dev/spidev1.0`.

| Function | GPIO Pin |
|----------|----------|
| MOSI     | PH5      |
| MISO     | PH6      |
| SCLK     | PH4      |
| CS       | PH3      |

Example Klipper configuration for an ADXL345 accelerometer:

```ini
[adxl345]
cs_pin: host:None
spi_bus: spidev1.0
```

!!! tip "CS Pin"
    Use `gpioinfo` to find the correct GPIO chip and line number for the PH3 pin. See the
    [GPIO Chip section](#gpio-chip) for details.

## I2C

I2C0 is **enabled by default** in MainsailOS via the `i2c0` device tree overlay. The I2C device is available at
`/dev/i2c-0`.

| Interface | Overlay | Device Path  | SDA Pin | SCL Pin |
|-----------|---------|--------------|---------|---------|
| I2C0      | `i2c0`  | `/dev/i2c-0` | PD26    | PD25    |

In your Klipper configuration, use `i2c_bus: i2c.0`:

```ini
[temperature_sensor example]
sensor_type: HTU21D
i2c_mcu: host
i2c_bus: i2c.0
```

!!! warning "I2C Bus Number"
    The overlay name and the actual `/dev/i2c-*` device number may differ. Always verify with `ls /dev/i2c-*` after
    enabling the overlay and rebooting.

## Further Resources

- [Orange Pi 3 LTS — Official Page](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-pi-3-LTS.html){:target="_blank"}
- [Armbian Documentation](https://docs.armbian.com/){:target="_blank"}
- [Klipper RPi Microcontroller](https://www.klipper3d.org/RPi_microcontroller.html){:target="_blank"} — Klipper Linux MCU guide
