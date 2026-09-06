# Session 24: Bootloader Unlock Troubleshooting & Filter Removal

## Date: 2026-05-06
## Objective
Execute the final bootloader unlock for Realme X7 5G using SamFw Tool.

## Progress & Challenges
1. **Handshake Failure**: Initial attempts failed with the phone booting into Recovery Mode instead of staying in BROM/Preloader mode.
2. **Conflict Identified**: Identified that the `libusb-win32` filter (installed in previous sessions) was hijacking the COM port, preventing SamFw Tool from establishing a handshake.
3. **Filter Removal**: Successfully guided the user through a deep cleanup of the `libusb-win32` device and the generic `USB Serial Device (COM3)` driver.
4. **Ghost Port Discovery**: Realized that `USB Serial Device (COM3)` and `COM4` are internal/ghost ports and not the phone, as they remain visible even when disconnected.
5. **New Connection Strategy**: Directed the user to look for a *new* entry (likely "Unknown Device") that appears only when the phone is connected in BROM mode.
6. **Current State**: PC is clean of libusb filters. Waiting for the phone to trigger a new Device Manager entry for manual driver forcing.

## Next Steps
1. Manually install the "MediaTek USB Port" driver for the detected unknown device.
2. Execute the "Unlock Bootloader" command in SamFw Tool once the stable port is established.

---
**Note**: The Zero-Loss environment remains intact. The "libusb" removal was a critical success.
