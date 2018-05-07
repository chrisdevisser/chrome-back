document.addEventListener('keyup', e => {
    const INSERT = 45;
    if (e.keyCode !== INSERT) return;
    chrome.runtime.sendMessage({
        msg: 'closeTab',
        referrer: document.referrer,
        historyLength: history.length
    });
});