import moment from 'moment';
import { saveAs } from 'file-saver';
import { copyToClipboard } from './copyToClipboard'
import StorageChange = chrome.storage.StorageChange;
import { generateExamples, generateExpectExamples, generateVisitExample } from "./generateExamples";

// STORAGE

let examples: string[] = []
const spacer = "\n".repeat(3)

// Get initial state
chrome.storage.sync.get(['enable', 'examples'], (data) => {
  if (data.examples) {
    examples = data.examples
  }
  onExtensionEnable(data.enable)
});

// Watch for storage changes
chrome.storage.onChanged.addListener((changes: { [p: string]: StorageChange }) => {
  if (changes.enable) {
    onExtensionEnable(changes.enable.newValue)
  }
})

const onClickDOMElement = (event: Event) => {
  chrome.storage.sync.get(['examples'],(data) => {
    // Concatenate with an existing array of examples
    examples = data.examples.concat(generateExamples(event.target as HTMLElement), spacer)
    // Save the concatenated array of examples to storage
    chrome.storage.sync.set({ examples: examples }, () => {});
  })
}

const onExtensionEnable = (enable: string) => {
  switch (enable) {
    case 'yes':
      // Save start location href to the storage
      chrome.storage.sync.set({ href: window.location.href }, () => {});
      // Add a click event listener
      document.addEventListener('click', onClickDOMElement)
      break
    case 'no':
      // Remove a click event listener
      document.removeEventListener('click', onClickDOMElement)
      if (examples.length) {
        chrome.storage.sync.get(['href'],(data) => {
          // Prepend location href
          examples = [generateVisitExample(data.href), spacer, ...examples]

          // Save examples to a file
          const fileName = `${moment().format('YYYY_MM_DD_HH_mm_ss')}.rb`
          const fileType = { type: 'text/plain' }
          saveAs(new File(examples, fileName, fileType));

          // Reset storage
          examples = []
          chrome.storage.sync.set({
            examples: [], href: null
          }, () => {});
        })
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
      copyToClipboard(generateExpectExamples(clickedElement))
    }
    sendResponse('');
  }
});
