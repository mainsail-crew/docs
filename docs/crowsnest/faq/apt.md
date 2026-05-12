---
html_title: Mainsail APT Repository for Streaming Backends - Crowsnest
description: General informations on the Mainsail APT Repository.
social:
  cards_layout_options:
    title: APT Repository
---

# Mainsail APT Repository

The Mainsail APT Repository is a repository hosting packaged versions of the [Backends](./backends.md) and can be found [here](https://apt.mainsail.xyz/). This Repository allows us to precompile all Backends to speed up the installation and provide you an easy way to update these through your APT package manager.

## Supported OS

We only provide an APT Repository for PiOS, this includes MainsailOS, as well as plain Debian. We officially do not support any other OS and maybe never will.

Crowsnest still supports other OS distributions but those will compile `ustreamer` locally on the device and won't get updates through the package manager.

## Troubleshooting

### I got a Warning during installation sending me here

If you saw a warning during your installation sending you here, your OS is either not supported or the download failed.

If your OS **is supported** please run `make update` after waiting a few hours. Most likely GitHub had an issue resulting in a failed download. We sadly have no influence on this.

If your OS **is not support** you don't need to do anything further. `ustreamer` should have been installed and you should be ready to go.


### My OS is supported but I don't have the repository installed

Please read the question above, it will tell you what to do.
