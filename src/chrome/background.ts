// @ts-ignore
console.log("BACKGROUND CONNECTED");

// STORAGE

// Active tab
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, currentTabInfo => {
    console.log(currentTabInfo)

    // Disable toggle if tab changed
    chrome.storage.sync.set({ enable: 'no' }, () => {
      // Do nothing
    })
  })
})

// CONTEXT MENU

// Add to context menu
let contextMenuItem: {} = {
  id: "BDDTG",
  title: "BDD Generate Expect Test Example",
  contexts: ["all"],
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener( (info, tab) => {
  chrome.tabs.sendMessage(<number>tab?.id, "ContextMenuClicked", { frameId: info.frameId }, data => {
    // Do nothing
  });
});
