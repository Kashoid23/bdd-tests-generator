import React  from 'react';

console.log("BACKGROUND CONNECTED");


// STORAGE

// Active tab
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, currentTabInfo => {
    console.log(currentTabInfo)

    // Disable if tab changed
    chrome.storage.sync.set({ enable: 'no' }, () => {
      // Do nothing
    })
  })
})


// CONTEXT MENU

// Handle click on context menu
const handleClickedContextMenu = (info: { frameId: number }, tab: { id: number }) => {
  chrome.tabs.sendMessage(tab.id, "ContextMenuClicked", { frameId: info.frameId }, data => {
    // Do nothing
  });
}

// Add to context menu
let contextMenuItem: {} = {
  id: "BDDTG",
  title: "BDD Generate Expect Test Example",
  contexts: ["all"],
  onclick: handleClickedContextMenu
};
chrome.contextMenus.create(contextMenuItem);
