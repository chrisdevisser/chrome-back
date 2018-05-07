#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

XButton1 up::
    MouseGetPos, , , window
    WinGetTitle, title, ahk_id %window%
    WinGet process, ProcessName, ahk_id %window%

    WinActivate ahk_id %window%
    if (process = "chrome.exe") {
        Send {Insert}
    } else {
        Send {XButton1}
    }
Return