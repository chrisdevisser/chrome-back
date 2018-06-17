let g_newTabUrlsByTabId = {};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    switch (msg.msg) {
    case 'closeTab':
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            let noBackRoom = tabs[0].url === g_newTabUrlsByTabId[tabs[0].id].url;
            if (noBackRoom) {
                console.log(`Closing tab ${sender.tab.id}`);
                chrome.tabs.remove(sender.tab.id);
            }
        });

        break;
    }
});

chrome.webNavigation.onCommitted.addListener(details => {
    console.log(`Navigating to ${details.url} via type ${details.transitionType} with qualifier ${details.transitionQualifiers}`);

    g_newTabUrlsByTabId[details.tabId].doneUpdating = true;

    let destIsNewTabPage = details.url.includes('/chrome/newtab');
    let isBackNavigation = details.transitionQualifiers == 'forward_back';
    console.log(`Going to new tab page? ${destIsNewTabPage}. Is back navigation? ${isBackNavigation}.`);

    if (destIsNewTabPage && isBackNavigation) {
        console.log('Closing tab that is navigating back to new tab page');
        chrome.tabs.remove(details.tabId);
    }
});

chrome.tabs.onUpdated.addListener((id, info, tab) => {
    if (id in g_newTabUrlsByTabId) return;
    if (g_newTabUrlsByTabId[id].doneUpdating) return;

    console.log(`Keeping track of tab ${id} with starting URL ${info.url}`);
    g_newTabUrlsByTabId[id] = {url: info.url, doneUpdating: false};
});

chrome.tabs.onRemoved.addListener((id, info) => {
    console.log(`No longer keeping track of tab ${id}`);
    delete g_newTabUrlsByTabId[id];
});