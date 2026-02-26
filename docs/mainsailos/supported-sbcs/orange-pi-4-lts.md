---
html_title: Orange Pi 4 LTS - MainsailOS
description: Hardware reference for Orange Pi 4 LTS in MainsailOS — available UARTs, SPI, I2C buses, GPIO chip, and board-specific notes.
social:
  cards_layout_options:
    title: Orange Pi 4 LTS
---

# Orange Pi 4 LTS

The Orange Pi 4 LTS is an SBC based on the Rockchip RK3399 SoC. It features a 26-pin GPIO header and is supported by
MainsailOS through an Armbian-based image.

## Board Overview

| Property       | Value                |
|----------------|----------------------|
| SoC            | Rockchip RK3399      |
| RAM            | 3 GB / 4 GB          |
| Base Image     | Armbian CLI          |
| GPIO Header    | 26-pin               |

## GPIO Pinout

<figure markdown="span">
![Orange Pi 4 LTS GPIO Pinout](../../images/mainsailos/orangepi-4-lts-gpio-pinout.png)
<figcaption>Orange Pi 4 LTS 26-pin GPIO header pinout</figcaption>
</figure>

## GPIO Chip and Number Calculation

When using GPIOs with the [Linux MCU](../faq/linux-mcu.md) in Klipper, you need to identify the correct GPIO chip and
line number for your pins. The RK3399 SoC has **5 GPIO banks** (`GPIO0` through `GPIO4`), each with 32 pins organized
in groups A–D (8 pins each).

### GPIO Naming Convention

The RK3399 uses the naming format `GPIOx_Yn`, where:

- `x` = bank number (0–4)
- `Y` = group letter (A=0, B=1, C=2, D=3)
- `n` = pin number within the group (0–7)

```
GPIO0_A0 ~ A7, B0 ~ B7, C0 ~ C7, D0 ~ D7
GPIO1_A0 ~ A7, B0 ~ B7, C0 ~ C7, D0 ~ D7
...
GPIO4_A0 ~ A7, B0 ~ B7, C0 ~ C7, D0 ~ D7
```

### Calculating the GPIO Line Number

To calculate the GPIO line number for Klipper, use the following formula:

**GPIO line = bank × 32 + group × 8 + pin**

Where group values are: A=0, B=1, C=2, D=3.

!!! example "Example: GPIO4_D5"
    `GPIO4_D5` = 4 × 32 + 3 × 8 + 5 = **157**

    In Klipper configuration:

    ```ini
    [output_pin example]
    pin: host:gpiochip4/gpio157
    ```

### Finding Available GPIOs

You can also list all available GPIO chips and lines directly:

```bash
sudo apt install gpiod
gpioinfo
```

## UART

UART is **not enabled by default** in MainsailOS for the Orange Pi 4 LTS because UART4 shares its pins (GPIO1_A7 and
GPIO1_B0) with SPI1, which is pre-configured for accelerometer use. To use UART4 for serial MCU communication, you
need to disable SPI1 first.

Edit `/boot/armbianEnv.txt`:

```bash
sudo nano /boot/armbianEnv.txt
```

Replace the SPI overlay with the UART4 overlay:

```ini
# Change this:
overlays=spi-spidev
param_spidev_spi_bus=1

# To this:
overlays=uart4
```

Then reboot. The UART device will be available at `/dev/ttyS4`.

| Interface | Device Path   | Overlay  | TX Pin      | RX Pin      |
|-----------|---------------|----------|-------------|-------------|
| UART4     | `/dev/ttyS4`  | `uart4`  | GPIO1_A7    | GPIO1_B0    |

!!! info "Debug UART"
    The Orange Pi 4 LTS has a dedicated 3-pin debug UART header (GND, RX, TX) next to the 26-pin GPIO header. This is
    intended for serial console access and is **not** suitable for MCU communication.

## SPI

SPI1 is **enabled by default** in MainsailOS. The `spi-spidev` overlay and `spi-dev` kernel module are pre-configured
for use with accelerometers for [Input Shaper](https://www.klipper3d.org/Measuring_Resonances.html){:target="_blank"}.

The SPI1 bus is exposed on the 26-pin GPIO header:

| Function | GPIO Pin   |
|----------|------------|
| MOSI     | GPIO1_B0   |
| MISO     | GPIO1_A7   |
| SCLK     | GPIO1_B1   |
| CS       | GPIO1_B2   |

## I2C

Two I2C buses are available via device tree overlays:

| Interface | Overlay | SDA Pin  | SCL Pin  |
|-----------|---------|----------|----------|
| I2C7      | `i2c7`  | GPIO2_A7 | GPIO2_A6 |
| I2C8      | `i2c8`  | GPIO1_C4 | GPIO1_C5 |

To enable an I2C bus, edit `/boot/armbianEnv.txt` and add the overlay:

```ini
overlays=i2c8
```

Then reboot. Verify the I2C device is available:

```bash
ls /dev/i2c-*
```

In your Klipper configuration, use the corresponding I2C bus:

```ini
[temperature_sensor example]
sensor_type: HTU21D
i2c_mcu: host
i2c_bus: i2c.8
```

## Further Resources

- [Orange Pi 4 LTS — Official Page](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/orange-pi-4-LTS.html){:target="_blank"}
- [Armbian Documentation](https://docs.armbian.com/){:target="_blank"}
- [Klipper RPi Microcontroller](https://www.klipper3d.org/RPi_microcontroller.html){:target="_blank"} — Klipper Linux MCU guide
