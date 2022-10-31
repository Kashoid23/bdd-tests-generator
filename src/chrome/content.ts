import { capybaraExamples } from './capybaraExamples'

// STORAGE

const handleSwitch = (enable: string) => {
  const events: string[] = ['click']
  const handleEvent = (event: Event) => {
    console.log('handleSwitchEvent:', event)
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

const copyToClipboard = (text: string = '') => {
  // Create a textarea to insert text.
  let copyFrom = document.createElement("textarea");
  // Set the textarea content
  copyFrom.textContent = text;
  // Append the textarea to the body as a child.
  document.body.appendChild(copyFrom);
  // Select all the text
  copyFrom.select();
  // Execute command
  document.execCommand('copy');
  // De-select the text using blur()
  copyFrom.blur();
  // Remove the textarea field from the document.body
  document.body.removeChild(copyFrom);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request == "ContextMenuClicked") {
    if (clickedElement) {
      console.clear()
      copyToClipboard(capybaraExamples(clickedElement))
      // Array.from(clickedElement.attributes).forEach((attribute) => {
      //   console.log(`${attribute.name}: '${attribute.value}'`)
      // })
    }
    sendResponse("");
  }
});
