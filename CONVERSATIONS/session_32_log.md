# Session 32: Network Scanning (Nmap/Wireshark) & Realme X7 Deep Debloat

**Timestamp**: 2026-05-16 - 2026-05-17

## Objective 1: Network Analysis on Windows
- **Goal**: Run Nmap and Wireshark natively on Windows without Kali Linux.
- **Process**: 
  - Guided user through installing Nmap (with Npcap/Zenmap) and Wireshark (with AndroidDump).
  - Executed basic ping scans (`nmap -sn`) to map the local `/24` subnet.
  - Identified 2 active hosts: `.198` (Gateway/Hotspot via dnsmasq) and `.227` (Windows 11 PC).
  - Used Zenmap for visual topology mapping and NSE scripts (`dns-service-discovery`, `smb-enum-shares`) to extract deep device info without root.

## Objective 2: Realme X7 Deep Battery Optimization
- **Goal**: Address residual battery drain identified via user screenshots (Facebook, Photos, Play Store).
- **Process**:
  - Ran live ADB scans (`dumpsys activity services` & `top`) to identify hidden telemetry apps.
  - **Facebook Lockdown**: Main app (`katana`) was successfully dormant. Disabled hidden meta services (`appmanager`, `system`, `services`) completely via `pm disable-user`.
  - **Emergency SOS Risk**: User requested disabling emergency call trigger. Verified package `com.oplus.sos`. **Core Stability Protocol Invoked**: Refused ADB disable due to extreme bootloop risk; guided user to disable via UI Settings instead.
  - **HeyTap Bloatware**: Disabled `com.heytap.pictorial` (Lock Screen Magazine) and `com.heytap.accessory`.
  - **Extreme Restrictions**: Restricted Snapchat and Android Auto to "Rare" standby bucket and ignored wake locks and background running via `appops`.
  - **Safety Check**: Refused to disable `mcs`, `themestore`, and `usercenter` after web search confirmed they cause Settings crashes on ColorOS/Realme UI.

**Status**: Session successfully concluded. Nmap toolkit established. Phone battery drains plugged while strictly adhering to the Core Stability Protocol.
