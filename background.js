var active = {};

function enableBrowserAction(tab) {
  chrome.tabs.sendMessage(tab.id, 'START');
}

function disableBrowserAction(tab) {
  chrome.tabs.sendMessage(tab.id, 'STOP');
}

function updateState(tab) {
  if (active[tab.index] === false) {
    active[tab.index] = true;
    enableBrowserAction(tab);
  }
  else {
    active[tab.index] = false;
    disableBrowserAction(tab);
  }
}
// when chrome extension icon is clicked
chrome.browserAction.onClicked.addListener(updateState);



function listen(msg, sender, sendResponse) {
  if (msg.type === 'upload') {
    console.info(msg.url, msg.payload)

    // POST REQUEST TO BACKEND
  }
}
// listen for messages sent from content script
chrome.runtime.onMessage.addListener(listen);



// when active tab changes
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    // reset active status on reload
    active[tab.index] = false;
  }
})
