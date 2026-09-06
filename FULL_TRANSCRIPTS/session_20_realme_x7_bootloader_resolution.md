# Session 20: Realme X7 Bootloader Unlock Resolution

## Date: 2026-05-04
## Objective
Bypass the BROM handshake failure of `mtkclient` using GUI-based MediaTek tools to achieve a bootloader unlock for the Realme X7 5G.

## Key Actions Taken
1. **Driver Context**: `libusb-win32` was successfully installed via Zadig in previous sessions. The `UsbDk` conflict was resolved. 
2. **`mtkclient` Abandonment**: Continued to experience "Handshake failed, retrying" and Windows disconnect sounds ("Tring-Tring"). The CLI approach was abandoned due to instability.
3. **`SP Flash Tool` Attempt**: Extracted `SP Flash Tool v6`, but could not proceed without a `scatter.txt` file or the `Download-XML` file, which is heavily embedded within a 5GB stock firmware. To save time, this tool was abandoned.
4. **Android Utility Download**: Explored automated download options for `Android Utility`, but scripts were blocked by bot-protection (Mediafire/AdF.ly). The user successfully performed a manual download through the Brave Browser to bypass ISP throttling and bot checks.
5. **Antivirus Disabling**: The user manually disabled Windows Defender's "Real-time protection" to prevent `AndroidUtility.exe` from being flagged as a false positive and deleted upon extraction.
6. **Execution**: The user extracted `AndroidUtility.v200.7z` using the password `mfdl` and successfully launched it as Administrator.

## Final State
- **Android Utility v200** is open and waiting for input. 
- The user is instructed to click **"Bootloader Unlock"** under the **"MediaTek"** tab, and then connect the device while holding **Volume Up + Volume Down** in an powered-off state.
