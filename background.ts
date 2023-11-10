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
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['enable'], (data) => {
    switch (data.enable) {
      case 'yes':
        setExtensionState({ currentState: 'no' })
        break
      case 'no':
        chrome.tabs.sendMessage(<number>tab?.id, 'BadgeOnClicked', data => {
          setExtensionState({ currentState: 'yes' })
        })
        break
      default:
        break
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  switch (request.message) {
    case 'wait':
      setExtensionState({ currentState: 'wait' })
      break
    case 'error':
      setExtensionState({ currentState: 'error' })
      break
    case 'done':
      setExtensionState({ currentState: 'no' })
      break
    default:
      break
  }
});

const state = (enable: string) => {
  switch (enable) {
    case 'yes':
      return {
        'enabled': 'yes',
        'text': 'ON',
        'color': '#008000',
        'title': 'Click to turn off BDDTG'
      }
      break;
    case 'no':
      return {
        'enabled': 'no',
        'text': 'OFF',
        'color': '#D3D3D3',
        'title': 'Click to turn on BDDTG'
      }
      break;
    case 'wait':
      return {
        'enabled': '',
        'text': 'WAIT',
        'color': '#0000FF',
        'title': "Waiting for OpenAI's response..."
      }
      break;
    case 'error':
      return {
        'enabled': '',
        'text': 'ERROR',
        'color': '#FF0000',
        'title': 'Something went wrong. Please try again after browser restart.'
      }
      break;
    default:
      break
  }
};

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
      }, () => {
        chrome.action.setTitle({
          title: state(currentState).title
        })
      });
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
