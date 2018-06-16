let g_backButtonDownOccurred = false;

document.addEventListener('mousedown', e => {
    g_backButtonDownOccurred = false;

    const BACK_BUTTON = 8;
    if (e.buttons !== BACK_BUTTON) return;

    g_backButtonDownOccurred = true;
});

document.addEventListener('mouseup', e => {
    if (!g_backButtonDownOccurred) return;

    if (history.length === 1) {
        console.log('Making back click close tab')
        e.preventDefault();
        chrome.runtime.sendMessage({
            msg: 'closeTab'
        });
    }
});