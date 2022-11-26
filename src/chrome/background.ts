// @ts-ignore
console.log('BACKGROUND CONNECTED');

// STORAGE

// Set default extension state on install
chrome.runtime.onInstalled.addListener(() => {
  setExtensionState({ currentState: 'no' })
})

// Set default extension state on change tab
chrome.tabs.onActivated.addListener(() => {
  setExtensionState({ currentState: 'no' })
})

// Set extension state on click
chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get(['enable'], (data) => {
    const enabled = data.enable == 'no' ? 'yes' : 'no'
    setExtensionState({ currentState: enabled })
  });
});

const state = (enable: string) => {
  switch (enable) {
    case 'yes':
      return {
        'enabled': 'yes',
        'text': 'ON',
        'color': '#008000'
      }
      break
    default:
      return {
        'enabled': 'no',
        'text': 'OFF',
        'color': '#FF0000'
      }
      break
  }
}

// Set extension state
const setExtensionState = ({ currentState }: { currentState: string }) => {
  chrome.storage.sync.set({ enable: state(currentState).enabled }, () => {
    chrome.action.setBadgeText({
      text: state(currentState).text
    }, () => {
      chrome.action.setBadgeBackgroundColor({
        color: state(currentState).color
      }, () => {});
    });
  });
}

// CONTEXT MENU

// Add to context menu
let contextMenuItem: {} = {
  id: 'BDDTG',
  title: 'BDD Generate Test Expect Example',
  contexts: ['all'],
};
chrome.contextMenus.create(contextMenuItem);

// On click context menu
chrome.contextMenus.onClicked.addListener( (info, tab) => {
  chrome.tabs.sendMessage(<number>tab?.id, 'ContextMenuClicked', { frameId: info.frameId }, data => {
    // Do nothing
  });
});
