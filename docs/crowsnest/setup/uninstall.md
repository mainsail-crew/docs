---
title: Uninstalling Crowsnest
description: Learn how to fully remove Crowsnest, including configuration and update manager entries, with step-by-step instructions.
social:
  cards_layout_options:
    title: Uninstall Crowsnest
---

# Uninstall

To uninstall Crowsnest, run the following commands and follow the instructions:

```bash
cd ~/crowsnest
make uninstall
```

After the uninstallation is complete, follow these additional steps to fully remove everything related to Crowsnest:

1. **Delete the Crowsnest folder**  
   Remove the Crowsnest directory from your home folder:
   ```bash
   rm -rf ~/crowsnest
   ```

2. **Remove the Update Manager section from your `moonraker.conf`**  
   Remove the `[update_manager crowsnest]` section from `moonraker.conf`.

3. **Reboot your system**  
   This ensures all changes take effect and any remaining services are stopped:
   ```bash
   sudo reboot
   ```
