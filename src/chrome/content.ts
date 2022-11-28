import moment from 'moment';
import { saveAs } from 'file-saver';
import { capybaraExamples } from './capybaraExamples';
import { capybaraExpectExamples } from './capybaraExpectExamples';
import { copyToClipboard } from './copyToClipboard'
import { sanitizeExamples } from './sanitizeExamples'
import StorageChange = chrome.storage.StorageChange;

// STORAGE

let examples: string[] = []

// Get initial state
chrome.storage.sync.get(['enable'], (data) => {
  onExtensionEnable(data.enable)
});

// Watch for storage changes
chrome.storage.onChanged.addListener((changes: { [p: string]: StorageChange }) => {
  if (changes.enable) {
    if (changes.examples) {
      examples = changes.examples.newValue
    }
    onExtensionEnable(changes.enable.newValue)
  }
})

const onClickDOMElement = (event: Event) => {
  chrome.storage.sync.get(['examples'],(data) => {
    // Concatenate with an existing array of examples
    examples = data.examples.concat(sanitizeExamples(capybaraExamples(event.target as HTMLElement)), "\n".repeat(3))
    // Save the concatenated array of examples to storage
    chrome.storage.sync.set({ examples: examples }, () => {});
  })
}

const onExtensionEnable = (enable: string) => {
  switch (enable) {
    case 'yes':
      document.addEventListener('click', onClickDOMElement)
      break
    case 'no':
      document.removeEventListener('click', onClickDOMElement)
      if (examples.length) {
        // Save the examples to a file
        const fileName = `${moment().format('YYYY_MM_DD_HH_mm_ss')}.rb`
        const fileType = { type: 'text/plain' }
        saveAs(new File(examples, fileName, fileType));

        // Reset storage state
        examples = []
        chrome.storage.sync.set({ examples: [] }, () => {});
      }
      break
    default:
      break
  }
}

// CONTEXT MENU

let clickedElement: HTMLElement | null = null;

document.addEventListener('contextmenu', (event) => {
  clickedElement = event.target as HTMLElement;
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'ContextMenuClicked') {
    if (clickedElement) {
      copyToClipboard(sanitizeExamples(capybaraExpectExamples(clickedElement)))
    }
    sendResponse('');
  }
});
