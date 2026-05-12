---
html_title: Mainsail APT Repository for Streaming Backends - Crowsnest
description: General information on the Mainsail APT Repository.
social:
  cards_layout_options:
    title: APT Repository
---

# Mainsail APT Repository

The Mainsail APT Repository hosts packaged versions of the [Backends](./backends.md) and is available at the [Mainsail APT Repository](https://apt.mainsail.xyz/). It allows you to install precompiled backends faster and update them through your APT package manager.

## Supported OS

You can use this APT repository on PiOS (including MainsailOS) and Debian. Other operating systems are not officially supported.

Crowsnest still works on other distributions, but `ustreamer` is compiled locally on your device and is not updated through APT.

## Troubleshooting

### I got a Warning during installation sending me here

If you saw a warning during your installation sending you here, your OS is either not supported or the download failed.

If your OS **is supported** please run `make update` after waiting a few hours. Most likely GitHub had an issue resulting in a failed download. We sadly have no influence on this.

If your OS **is not supported**, you do not need to do anything else. `ustreamer` should already be installed and ready to use.


### My OS is supported but I don't have the repository installed

Please read the question above, it will tell you what to do.
