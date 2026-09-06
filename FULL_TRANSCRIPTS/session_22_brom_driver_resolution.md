# Session 22: BROM Driver Resolution & Handshake Stability

## Date: 2026-05-06
## Objective
Resolve the "Code 10" driver error and establish a stable BROM handshake for the Realme X7 5G using SamFw Tool.

## Key Actions Taken
1. **Driver Conflict Cleanup**: Confirmed the removal of the `libusb-win32` (Zadig) driver which was hijacking the SamFw connection.
2. **Manual Driver Installation**: Guided the user through the "Add Legacy Hardware" wizard to install the original MediaTek VCOM driver.
3. **Error Diagnosis**: 
    - Encountered "This device cannot start (Code 10)" after manual installation.
    - Diagnosed the cause as **Windows 11 Driver Signature Enforcement** blocking unsigned MediaTek drivers.
    - Identified that `MTK_USB_All_v0.8.0` might be too old for Windows 11 compatibility.
4. **Strategic Pivot**:
    - Advised the user to download **MediaTek USB Driver v1.0.8** or the **Auto Installer (v1.1236)**.
    - Provided a roadmap for disabling Driver Signature Enforcement via **Advanced Startup (Recovery -> Troubleshoot -> Startup Settings -> Option 7)**.
5. **Connection Milestone**: 
    - The user successfully "locked" the phone in BROM mode using the **"Bypass Auth"** button in SamFw Tool (the phone connected without immediate disconnection).
    - Confirmed the correct physical button combo: **Volume UP + Volume DOWN** held simultaneously while connecting.
6. **Future Roadmap**: Confirmed that rooting (Magisk/DenyList) can be performed a day after the bootloader unlock to ensure system stability.

## Final State
- The user is currently upgrading to the latest MTK drivers.
- Awaiting a PC restart with Signature Enforcement disabled to 1-click bootloader unlock.
- **Goal**: Reach the "PASS" state in SamFw Tool.
