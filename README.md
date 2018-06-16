This is a small Chrome extension to improve handling of the mouse's back button. When the button is pressed and there's no page to go back to, this will close the current tab instead. Because the new tab page is special and won't run the extension, the tab is also closed if the previous page is the new tab page.

# Installation

Clone this repository to a folder somewhere.

Go to chrome://extensions, click "Load Unpacked Extension", and choose the folder with these files.

# Known Issues

Due to Chrome not providing mouse button info on up events, it's possible to trick the extension into thinking the back button was unpressed when it actually wasn't yet. This is hard to do accidentally.

This won't work if a new tab is opened to the new tab page and then back is pressed. As mentioned above, the extension can't run on that page, so only normal back button behaviour is allowed.