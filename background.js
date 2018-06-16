chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    switch (msg.msg) {
    case 'closeTab':
        console.log(`Closing tab ${sender.tab.id}`);
        chrome.tabs.remove(sender.tab.id);
        break;
    }
});

chrome.webNavigation.onCommitted.addListener(details => {
    console.log(`Navigating to ${details.url} via type ${details.transitionType} with qualifier ${details.transitionQualifiers}`);

    let destIsNewTabPage = details.url.includes('/chrome/newtab');
    let isBackNavigation = details.transitionQualifiers == 'forward_back';
    console.log(`Going to new tab page? ${destIsNewTabPage}. Is back navigation? ${isBackNavigation}.`);

    if (destIsNewTabPage && isBackNavigation) {
        console.log('Closing tab that is navigating back to new tab page');
        chrome.tabs.remove(details.tabId);
    }
});