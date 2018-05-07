let g_newTabUrlsByTabId = {};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  switch (msg.msg) {
    case "closeTab":
      if (msg.referrer === undefined || msg.historyLength === undefined) return;

      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        let matchesNewTab = g_newTabUrlsByTabId[tabs[0].id] === tabs[0].url;
        console.log(`Matches new tab: ${matchesNewTab}`);
        if (msg.referrer !== "" && msg.historyLength !== 1 && !matchesNewTab) {
          console.log("Going back");
          chrome.tabs.executeScript(undefined, { code: "history.back();" });
        } else {
          console.log("Closing tab");
          chrome.tabs.remove(tabs[0].id);
          delete g_newTabUrlsByTabId[tabs[0].id];
        }
      });

      break;

    case "newTabOpened":
      if (msg.tabId === undefined) return;

      chrome.tabs.get(msg.tabId, tab => {
        g_newTabUrlsByTabId[msg.tabId] = tab.url;
        console.log(`New tab opened with URL ${tab.url}`);
      });
  }
});

chrome.webNavigation.onCommitted.addListener(details => {
  chrome.tabs.executeScript(details.tabId, {
    code: `
      if (history.length === 1) {
        chrome.runtime.sendMessage({
          msg: 'newTabOpened',
          tabId: ${details.tabId}
        });
      }
    `
  });
});
