This is a small Chrome extension to improve handling of the mouse's back button. When the button is pressed and there's no page to go back to, this will close the current tab instead. Because the new tab page is special and won't run the extension, the tab is also closed if the previous page is the new tab page.

# Installation

Clone this repository to a folder somewhere.

Make sure chrome-back.ahk is running. It's a hack due to how poorly Chrome exposes back button presses. It's possible to get around this, but makes everything more complicated.

Go to chrome://extensions, click "Load Unpacked Extension", and choose the folder with these files.

# Known Issues

If there's no referrer, the tab is closed. This includes when you type into the omnibox or in other circumstances. Since this is the best I have for detecting the new tab page, it's a worthy tradeoff.
