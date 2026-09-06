# Session 13 Log: Bluetooth Audio Troubleshooting
**Date:** April 28, 2026
**Status:** Completed

## 🎯 Objective
Resolve a persistent technical issue where the **OnePlus Bullets Wireless Z** microphone fails to capture audio specifically for **WhatsApp voice messages** on the **realme X7 5G**, despite working perfectly for phone calls.

## 🛠️ Actions Taken
1.  **Diagnostic Search**: Investigated known compatibility issues between Realme UI and OnePlus Bluetooth hardware.
2.  **Profile Verification**: Guided the user to verify that "Phone calls" and "Media audio" profiles were active in Bluetooth settings.
3.  **App Permission Audit**: Verified that WhatsApp has explicit permission to access the microphone.
4.  **Developer Options Deep-Dive**:
    - Searched for the **"Disable Bluetooth A2DP hardware offload"** toggle (found to be hidden/removed in the current Realme UI version).
    - Investigated the **"Gabeldorsche"** experimental Bluetooth stack.
    - Recommended switching the **Bluetooth Audio Codec** to **SBC** to prioritize microphone bandwidth over high-fidelity audio streams.
5.  **Routing Fix**: Identified that the system was incorrectly defaulting to the internal phone mic during VoIP (WhatsApp) recording.

## ✅ Key Decisions & Results
- **Hardware vs Software**: Confirmed the issue is a software routing bug in Android/Realme UI rather than a hardware failure of the OnePlus Bullets.
- **Priority Shift**: Decided to use the **SBC codec** as a workaround to ensure microphone stability for business communications (WhatsApp voice notes).
- **Restart Protocol**: Mandated a system restart after toggling the Gabeldorsche stack to apply low-level driver changes.

## 📌 Status
- **Result**: Troubleshooting steps provided; hardware verified functional for calls. User to monitor WhatsApp stability with the SBC/Gabeldorsche configuration.
