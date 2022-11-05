import { copyToClipboardCapybaraExamples } from './capybaraExamples'

// STORAGE

const handleSwitch = (enable: string) => {
  const events: string[] = ['click']

  const handleEvent = (event: Event) => {
    console.clear()
    copyToClipboardCapybaraExamples(event.target as HTMLElement)
  }

  switch (enable) {
    case 'yes':
      events.forEach((event: string) => {
        document.addEventListener(event, handleEvent)
      })
      break
    case 'no':
      events.forEach((event: string) => {
        document.removeEventListener(event, handleEvent)
      })
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
  if (request == "ContextMenuClicked") {
    if (clickedElement) {
      console.clear()
      copyToClipboardCapybaraExamples(clickedElement)
      // Array.from(clickedElement.attributes).forEach((attribute) => {
      //   console.log(`${attribute.name}: '${attribute.value}'`)
      // })
    }
    sendResponse("");
  }
});
