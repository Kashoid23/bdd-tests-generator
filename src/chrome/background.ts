// @ts-ignore
console.log("BACKGROUND CONNECTED");

// STORAGE

// Active tab
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, currentTabInfo => {
    console.log(currentTabInfo)

    // Disable toggle if tab changed
    chrome.storage.sync.set({ enable: 'no' }, () => {
      chrome.action.setBadgeText({
        text: 'off'
      }, () => {});
    })
  })
})

const newState = (enable: string) => {
  switch (enable) {
    case 'yes':
      return {
        'enabled': 'no',
        'text': 'off',
        'color': '#FF0000'
      }
      break
    default:
      return {
        'enabled': 'yes',
        'text': 'on',
        'color': '#008000'
      }
      break
  }
}

// On click extension
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(['enable'], (data) => {
    chrome.storage.sync.set({ enable: newState(data.enable).enabled }, () => {
      chrome.action.setBadgeText({
        text: newState(data.enable).text
      }, () => {
        chrome.action.setBadgeBackgroundColor({
          color: newState(data.enable).color
        }, () => {});
      });
    });
  });
});


// CONTEXT MENU

// Add to context menu
let contextMenuItem: {} = {
  id: "BDDTG",
  title: "BDD Generate Expect Test Example",
  contexts: ["all"],
};
chrome.contextMenus.create(contextMenuItem);

// On click context menu
chrome.contextMenus.onClicked.addListener( (info, tab) => {
  chrome.tabs.sendMessage(<number>tab?.id, "ContextMenuClicked", { frameId: info.frameId }, data => {
    // Do nothing
  });
});
