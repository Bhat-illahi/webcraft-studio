#Requires AutoHotkey v2.0
#SingleInstance Force
#UseHook
A_MaxHotkeysPerInterval := 200

global mCount := 0
global rCount := 0
global m_StartTime := 0
global m_ActionTaken := false

ShowTip(text, time := 1000) {
    ToolTip text
    SetTimer(() => ToolTip(), -time) 
}

ShowTip("Mouse Master v97: GHOST-PROOF! 👻❌")

; --- 1. SCROLL SPEED ---
WheelUp::Send("{WheelUp 3}")
WheelDown::Send("{WheelDown 3}")

; --- 2. RIGHT CLICK (Double-Tap Paste, Hold Copy) ---
$RButton::
{
    global rCount
    if !KeyWait("RButton", "T0.4") {
        Send("^c")
        ShowTip("COPIED ✅")
        KeyWait("RButton")
        return
    }
    rCount++
    SetTimer(HandleR, -300)
}

HandleR() {
    global rCount
    if (rCount = 1) {
        if !GetKeyState("LButton", "P")
            Click "Right"
    } else if (rCount >= 2) {
        Send("^v")
        ShowTip("PASTED 📋")
    }
    rCount := 0
}

; --- 3. SCREENSHOT (Left Hold + Right Tap) ---
~LButton & RButton::
{
    Send("#+s")
}

; --- 4. BLACK BUTTON (ROLLER) ---
$MButton::
{
    global m_StartTime := A_TickCount
    global m_ActionTaken := false
    SetTimer(CheckMHold, 50)
}

$MButton Up::
{
    global m_ActionTaken, mCount
    SetTimer(CheckMHold, 0)
    
    ; FORCE RESET state to prevent ghost clicks
    if (m_ActionTaken || (A_TickCount - m_StartTime > 300)) {
        m_ActionTaken := false
        Send("{Esc}") 
        return
    }
    
    mCount++
    SetTimer(HandleM, -250)
}

CheckMHold() {
    global m_StartTime, m_ActionTaken
    if GetKeyState("MButton", "P") {
        if (A_TickCount - m_StartTime > 3000) {
            if (!m_ActionTaken) {
                Run "explorer.exe"
                ShowTip("FILE EXPLORER 📂")
                m_ActionTaken := true 
                SetTimer(CheckMHold, 0)
            }
        }
    }
}

; Use "P" (Physical) check for extra safety
#HotIf GetKeyState("MButton", "P")
LButton::
{
    global m_ActionTaken := true
    Send("#v")
    ShowTip("CLIPBOARD 🕒")
    KeyWait("LButton")
}
RButton::
{
    global m_ActionTaken := true
    Send("^z")
    ShowTip("UNDO ↩️")
    KeyWait("RButton")
}
#HotIf

HandleM() {
    global mCount
    if (mCount = 1) {
        if !GetKeyState("LButton", "P") and !GetKeyState("RButton", "P")
            Click "Middle" 
    } else if (mCount = 2) {
        Send("{Delete}")
        ShowTip("DELETED 🗑️")
    } else if (mCount >= 3) {
        Send("^+s") 
        ShowTip("SAVE AS... 💾")
    }
    mCount := 0
}

; Volume Control (Smooth and Reliable)
MButton & WheelUp::Send("{Volume_Up 2}")
MButton & WheelDown::Send("{Volume_Down 2}")

; --- 5. SMART CASE TOGGLE (Ctrl + Space) ---
^Space::
{
    oldClip := A_Clipboard
    A_Clipboard := "" 
    Send("^c")
    if !ClipWait(1) {
        A_Clipboard := oldClip
        return
    }
    selectedText := A_Clipboard
    if (selectedText == StrUpper(selectedText)) {
        A_Clipboard := StrLower(selectedText)
    } else {
        A_Clipboard := StrUpper(selectedText)
    }
    Send("^v")
    Sleep(150)
    A_Clipboard := oldClip
    ShowTip("CASE TOGGLED 🔠")
}

; --- 6. SCRIPT EXIT (Ctrl + Esc) ---
^Esc::ExitApp
