console.log('BACKGROUND CONNECTED');

// STORAGE

// Set default extension state on install
chrome.runtime.onInstalled.addListener(() => {
  setDefaultExtensionState()
})

// Set default extension state on change tab
chrome.tabs.onActivated.addListener(() => {
  setDefaultExtensionState()
})

// Set extension state on click
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(['enable'], (data) => {
    const enabled = data.enable == 'no' ? 'yes' : 'no'
    setExtensionState({ currentState: enabled })
  });
});

const state = (enable: string) => ({
  'enabled': enable === 'yes' ? 'yes' : 'no',
  'text': enable === 'yes' ? 'ON' : 'OFF',
  'color': enable === 'yes' ? '#008000' : '#FF0000'
});

// Set default extension state
const setDefaultExtensionState = () => {
  setExtensionState({ currentState: 'no' })
  chrome.storage.local.set({ examples: [] }, () => {});
}

// Set extension state
const setExtensionState = ({ currentState }: { currentState: string }) => {
  chrome.storage.local.set({ enable: state(currentState).enabled }, () => {
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
