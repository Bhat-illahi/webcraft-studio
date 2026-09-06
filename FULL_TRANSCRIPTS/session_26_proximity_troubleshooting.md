# Session 26: Proximity Sensor Troubleshooting & Non-Root Workarounds

**Date**: May 7, 2026
**Participants**: Tawfeeq Ahmad Bhat (User), Antigravity (AI Assistant)

---

## 1. Objective
The primary goal was to mitigate a hardware-related proximity sensor defect on the Realme X7 5G (RMX3092) that causes the screen to go dark during voice calls. Having suspended rooting attempts, the focus shifted to non-root software and ADB-level workarounds.

## 2. Technical Findings & Challenges
- **Device Environment**: Realme X7 5G (RMX3092) running Android 12 (Realme UI 3.0).
- **Sensor Status**: Proximity sensor (tcs3701) is hardware-damaged (likely due to screen lifting), sending a constant "Near" signal.
- **Software Limitations**: 
    - Standard apps like MacroDroid and KinScreen (incompatible) failed to override the system's proximity sensor logic.
    - Realme UI 3.0 ignores standard ADB settings like `proximity_sensor=0`.
    - "Sensors Off" Developer Tile is hidden or removed in this specific firmware.
    - Engineer Mode (`*#*#3646633#*#*`) access is restricted for non-exported activities.

## 3. Actions Taken
- **ADB Settings Overrides**: 
    - Force-set `proximity_sensor`, `proximity_sensor_enabled`, and `pocket_mode_state` to `0` and `1` (Testing both Far/Near logic).
    - Granted `WRITE_SECURE_SETTINGS` to various automation apps.
    - Attempted to force-enable the `sensors_off` tile via `sysui_qs_tiles` update (failed to appear).
- **System Broadcasts**:
    - Triggered `com.android.phone.PROXIMITY_SENSOR_OFF` broadcast (no effect).
- **Third-Party App Integration**:
    - Tested "Proximity Sensor Screen On/Off" app. Set task to "Screen On" to counteract the hardware signal.
    - Attempted to install "KinScreen" and "Wake Lock" (Play Store compatibility issues).

## 4. Current Status
- **Result**: Software-based disabling of the proximity sensor on Realme UI 3.0 without root is extremely difficult due to kernel-level priority.
- **Next Steps**:
    - Consider physical repair (pressing/re-seating the screen).
    - Use "Power Button to End Call" as a basic recovery method.
    - Research specialized Realme/Oppo internal calibration tools that might be accessible via ADB.

---
**Note**: This session confirms that the proximity issue is a hardware defect that software automation has limited power to fix on non-rooted Realme UI.
