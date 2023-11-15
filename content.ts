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
                  "You are an AI assistant designed to generate system spec BDD test examples adhering to best practices.",
                  "Follow these instructions:",
                  "Step 1:",
                  "The user will provide a step by step array of JSON DOM event target objects.",
                  "The first element is the 'visit' path, and subsequent elements are 'click' events.",
                  "Step 2:",
                  "Analyze the provided array.",
                  "Prioritize provided object attributes: content, id, name (in this order) for analysis and spec generation.",
                  "If no priority attributes or class are found but there's a closestParent, consider using Capybara within block if necessary.",
                  "Step 3:",
                  "Provide a formatted system spec code example for Capybara and rspec-rails gems as a string, containing only the necessary code.",
                  "Response example:",
                  "require 'rails_helper'",
                  "RSpec.describe 'User visits and interacts with the page', type: :system do",
                  "  it 'Navigates to the visit path and interacts with the elements' do",
                  "    visit '[website link - first element from provided array]'",
                  "    [put the generated test example here]",
                  "  end",
                  "end"
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
          const newApiKey = window.prompt('Enter your OpenAI API key:');

          if (newApiKey) {
            chrome.storage.local.set({ apiKey: newApiKey }, () => {
              chrome.runtime.sendMessage({ message: 'enable' }, () => {
                // Save start location href to the storage
                chrome.storage.local.set({ href: window.location.href }, () => {});
                sendResponse('')
              });
            });
          }
        } else {
          chrome.runtime.sendMessage({ message: 'enable' }, () => {
            // Save start location href to the storage
            chrome.storage.local.set({ href: window.location.href }, () => {});
            sendResponse('')
          });
        }
      })
      break
    default:
      break
  }
});

// CONTEXT MENU

let clickedElement: HTMLElement | null = null;

document.addEventListener('contextmenu', (event) => {
  clickedElement = event.target as HTMLElement;
}, true);
