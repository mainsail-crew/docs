# Upgrade from v4 to v5

We have added an easy migration tool to simplify the upgrade process from v4 to v5.

## Migration Steps

To execute the migration tool, you need to access your crowsnest host (e.g. Raspberry Pi) via SSH and run the upgrade command within the `crowsnest` directory.

Execute the following commands:

```bash
cd ~/crowsnest
make upgrade
```

## Post-Upgrade Verification

After the upgrade, please check your `crowsnest.conf` and `moonraker.conf` files to ensure they look correct.

If you encounter any issues, backups of both configuration files are available.
