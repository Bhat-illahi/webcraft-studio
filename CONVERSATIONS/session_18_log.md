# Session 18: Realme X7 Rooting Attempt & Driver Setup

## 🎯 Objectives
1.  Perform a full Google Cloud backup of the Realme X7 5G.
2.  Prepare the system for bootloader unlocking using MTK Client.
3.  Troubleshoot USB connection issues in BROM mode.

## ✅ Key Achievements
- **Google Cloud Backup**: Triggered a full `bmgr` backup for the Realme X7 5G via ADB. Successfully backed up Contacts, SMS, Call Logs, and App Settings.
- **Python Optimization**: Installed **Python 3.11** alongside Python 3.14 to ensure compatibility with `pyusb` and `mtkclient`.
- **MTK Client Setup**: Cloned the latest `mtkclient` repository and installed essential dependencies (`pyusb`, `pycryptodomex`, `pyserial`, etc.) without the heavy GUI requirements.
- **Driver Installation**: Installed **UsbDk (daynix)** via winget to enable low-level USB access for BROM mode exploits.
- **Backend Fix**: Created a custom **`run_mtk.py`** wrapper to explicitly point to `libusb-1.0.dll`, resolving the "No backend available" error on Windows.

## 🛠️ Technical Details
- **Device**: Realme X7 5G (MediaTek Dimensity 800U).
- **Driver**: UsbDk (v1.0.22).
- **Python**: 3.11 (Active for MTK Client).
- **Error Encountered**: `usb.core.USBError: [Errno None] Other error`. This was diagnosed as a driver initialization issue that typically requires a system restart.

## ⏭️ Next Steps
- **PC Restart**: User to restart the PC to fully activate UsbDk drivers.
- **Bootloader Unlock**: Run `python run_mtk.py da seccfg unlock` immediately after restart.
- **Rooting**: Dump `boot.img`, patch with Magisk, and flash via MTK Client.
