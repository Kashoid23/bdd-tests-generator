import React  from 'react';

console.log("background connected");

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

// Add context menu item
let contextMenuItem: {} = {
  id: "BDDTG",
  title: "BDD Tests Generator",
  contexts: ["all"]
};
chrome.contextMenus.create(contextMenuItem);

// Watch for context menu clicks
chrome.contextMenus.onClicked.addListener((clickData) => {
  console.log("chrome.contextMenus.onClicked", clickData);
})
