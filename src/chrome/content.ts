import {
  copyToClipboardCapybaraExamples,
  copyToClipboardCapybaraExpectExamples
} from './copyToClipboard'

// STORAGE

const handleEvent = (event: Event) => {
  copyToClipboardCapybaraExamples(event.target as HTMLElement)
}

const handleSwitch = (enable: string) => {
  switch (enable) {
    case 'yes':
      document.addEventListener('click', handleEvent)
      break
    case 'no':
      document.removeEventListener('click', handleEvent)
      break
    default:
      break
  }
}

// Switch initial state
chrome.storage.sync.get(['enable'], (data) => {
  handleSwitch(data.enable)
});

// Watch for storage changes
chrome.storage.onChanged.addListener((changes) => {
  handleSwitch(changes.enable.newValue)
});

// CONTEXT MENU

let clickedElement: HTMLElement | null = null;

document.addEventListener("contextmenu", (event) => {
  clickedElement = event.target as HTMLElement;
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "ContextMenuClicked") {
    if (clickedElement) {
      // Array.from(clickedElement.attributes).forEach((attribute) => {
      //   console.log(`${attribute.name}: '${attribute.value}'`)
      // })
      copyToClipboardCapybaraExpectExamples(clickedElement)
    }
    sendResponse("");
  }
});
