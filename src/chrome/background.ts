import React  from 'react';

console.log("background connected");

// Open tab
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, currentTabInfo => {
    console.log(currentTabInfo)
  })
})
