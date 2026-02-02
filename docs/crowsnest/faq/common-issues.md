# Common Issues

Here you can find the most common issues and questions. If your issue isn't listed or resolved here, have a look [here](help.md) on how to ask for help correctly.

## Low FPS

Low FPS is common. Read this section carefully to troubleshoot potential causes. We collected most information in [this GitHub issue](https://github.com/mainsail-crew/apt.mainsail.xyz/actions/runs/21603448416).  

Follow these steps in order. Revert changes if a step doesn't fix the issue before proceeding. All changes have to be made in your `crowsnest.conf`, unless mentioned otherwise

### 1. WebRTC (Raspberry Pi only)

MJPG streams consume significant bandwidth, which can strain Raspberry Pi network hardware. Using WebRTC will decrease the load on the network and might increase your FPS. Setting it up has it's own page [here](webrtc.md).

### 2. YUYV instead of MJPG (USB cams only)

Uncomment the `custom_flags` and set up your streamer to use `YUYV` instead of `MJPG`. This is different depending on the mode you chose:

- `ustreamer`: `custom_flags: --format=YUYV`
- `camera-streamer`: `custom_flags: --camera-format=YUYV`

### 3. Device generates incorrect JPEGs (ustreamer only)

Some Logitech models seem to send incorrect JPEGs resulting in low FPS.  
Set `custom_flags: --allow-truncated-frames` to fix this.  
On some devices you might want to try `custom_flags: --allow-truncated-frames --encoder=HW` if `--allow-truncated-frames` did not work.

## How can I use the RTSP, or any other kind of, stream of cam xyz?

Crowsnest does not support transcoding a RTSP stream, or any existing stream of a camera, to a format that you can watch in Mainsail.  
If it's a Wyze cam, please have a look [here](how-to-use-wyze-cams.md).

## Why does my WebRTC stream not work?

There can be a lot of different problems regarding WebRTC, I will list the most common issues here.

### camera-streamer on non Raspberry Pi systems

camera-streamer has WebRTC support, but only on Raspberry Pi SBCs excluding the Pi5. If you use it on a non Raspberry Pi system, you cannot use WebRTC.

### Wrong URL or service in Mainsail

Make sure your URLs and service are set up correctly in Mainsail. More information on this can be found [here](webrtc.md).

### The Pi4 problem on Bookworm

A known issue on Pi4 with Bookworm prevents WebRTC stream creation due to dynamic GPU memory allocation failures. Therefore we have to force it to a specific value.  
Edit `/boot/firmware/config.txt` and add the following at the bottom of the config:
```ini
[all]
gpu_mem=128
```
Then save and reboot your system.


