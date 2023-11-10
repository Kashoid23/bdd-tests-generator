const moment = require("moment");
const OpenAI = require("openai");

import { saveAs } from 'file-saver';
import { copyToClipboard } from './src/copyToClipboard'
import { generateExpectExamples } from "./src/generateExamples";
import { elementData } from "./src/elementData";

// STORAGE

let examples: string[] = []

// Get initial state
chrome.storage.local.get(['enable', 'examples'], (data) => {
  if (data.examples) {
    examples = data.examples
  }
  onExtensionEnable(data.enable)
});

chrome.storage.onChanged.addListener(({ enable }) => {
  if (enable) {
    onExtensionEnable(enable.newValue);
  }
});

const onClickDOMElement = (event: Event) => {
  chrome.storage.local.get(['examples'],(data) => {
    // Concatenate with an existing array of examples
    examples = data.examples.concat(JSON.stringify(elementData(event.target as HTMLElement)))
    // Save the concatenated array of examples to storage
    chrome.storage.local.set({ examples: examples }, () => {});
  })
}

const onExtensionEnable = (enable: string) => {
  switch (enable) {
    case 'yes':
      // Save start location href to the storage
      chrome.storage.local.set({ href: window.location.href }, () => {});
      // Add a click event listener
      document.addEventListener('click', onClickDOMElement)
      break
    case 'no':
      // Remove a click event listener
      document.removeEventListener('click', onClickDOMElement)
      if (examples.length) {
        chrome.storage.local.get(['href', 'apiKey'],(data) => {
          chrome.runtime.sendMessage({ message: 'wait' }, () => {});

          // Prepend location href
          examples.unshift(data.href);

          const openai = new OpenAI({
            apiKey: data.apiKey,
            dangerouslyAllowBrowser: true,
          });
          const chatCompletion = openai.chat.completions.create({
            messages: [
              {
                "role": "system",
                "content": [
                  "You are a helpful AI writing assistant for generating best practice system spec BDD tests examples",
                  "Follow these instructions:",
                  "Step 1 - The user will provide you step by step DOM event target objects array",
                  "Step 2 - Analyze the provided array with JSON DOM event target objects",
                  "Step 3 - First provided array element is visit path, other elements are click events (make sure it covered with Capybara)",
                  "Step 4 - If DOM event target object do not have uniq searchable content, placeholder, value, id, name or class but has closestParent, we can try to use Capybara within block if we need to",
                  "Step 5 - Provide ready to use system spec code example with only one 'it' (rspec keyword) block for capybara and rspec-rails gems as a String without anything else",
                ].join(". ")
              },
              {
                "role": "assistant",
                "content": "Please provide step by step DOM event target objects array"
              },
              {
                "role": "user",
                "content": examples.join(". ")
              }
            ],
            model: "gpt-3.5-turbo",
          });
          chatCompletion.then((response) => {
            // Save examples to a file
            const fileName = `${moment().format('YYYY_MM_DD_HH_mm_ss')}_spec.rb`
            const fileType = { type: 'text/plain' }

            saveAs(new File([response.choices[0].message.content], fileName, fileType));

            // Reset storage
            examples = []
            chrome.storage.local.set({ examples: [], href: null }, () => {});

            chrome.runtime.sendMessage({ message: 'done' }, () => {});
          }).catch(() => {
            // Reset storage
            examples = []
            chrome.storage.local.set({ examples: [], href: null, apiKey: null }, () => {});

            chrome.runtime.sendMessage({ message: 'error' }, () => {});
          })
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
  switch (request) {
    case 'ContextMenuClicked':
      if (clickedElement) {
        copyToClipboard(generateExpectExamples(clickedElement))
      }
      sendResponse('');
      break
    case 'BadgeOnClicked':
      chrome.storage.local.get(['apiKey'], (data) => {
        if (!data.apiKey) {
          const newApiKey = window.prompt('Enter your Open AI API key:');

          if (newApiKey) {
            chrome.storage.local.set({ apiKey: newApiKey }, () => {});
            sendResponse('')
          } else {
            chrome.runtime.sendMessage({ message: 'error' }, () => {});
          }
        } else {
          sendResponse('');
        }
      })
      break
    default:
      break
  }
});
