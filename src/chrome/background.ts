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
