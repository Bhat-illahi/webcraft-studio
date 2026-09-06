# Session 25: Pivot from Rooting to Proximity Sensor Fix
**Date**: May 7, 2026
**Status**: Handshake Failed -> Proximity Sensor Troubleshooting

## 1. Rooting Attempt (Final Failed Attempt)
- **Tools Used**: mtkclient (v2.0), mtk_gui.py, UsbDk v1.0.22.
- **Commands Executed**: 
    - `python mtk.py da seccfg unlock`
    - `python mtk.py crash`
- **Result**: "Handshake failed, retrying..." loop.
- **Root Cause**: Likely a hardware-level BROM lock or a very high security patch (Android 12/13) on the Realme X7 (RMX3092). Software-only exploits are currently blocked.

## 2. Driver Status
- **UsbDk**: Successfully installed and running.
- **MediaTek VCOM**: Showing as "USB Serial Device (COM3)" but not being captured by the tools.

## 3. Pivot: Proximity Sensor Issue
- **The Problem**: Proximity sensor is hardware-broken. Screen goes black during WhatsApp/Voice calls and doesn't wake up until the call ends.
- **The Goal**: Disable/Kill the proximity sensor without Root.

## 4. Proposed Solutions (No Root)
1. **ADB Command**: `adb shell service call sensorservice 3` (Experimental).
2. **Third-Party Apps**: MacroDroid or "Proximity Sensor Reset" to force screen ON during calls.
3. **Manual Calibration**: Dialing `*#899#` -> Manual Test -> Sensor Calibration (Attempt to reset).

---
**Next Action**: Focus on ADB commands and non-root sensor workarounds.
