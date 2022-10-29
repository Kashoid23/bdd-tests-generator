import React  from 'react';


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

// element.parentElement
// element.closest("div")
// const countMatches = (text: string) => document?.body?.textContent?.match(new RegExp(text, 'g'))?.length ?? 0;
// countMatches(content) > 1

const capybaraExamples = (element: Element) => {
  switch (element.tagName) {
    case 'A':
      return `click_link "${capybaraExamplesData(element).content}"`
    case 'BUTTON':
      return `click_button "${capybaraExamplesData(element).content}"`
    case 'INPUT' || 'TEXTAREA':
      // type = text || checkbox || radio
      // check('A Checkbox')
      // uncheck 'A checkbox'
      // choose('A Radio Button')
      return `fill_in("${capybaraExamplesData(element).placeholder}", with: "${capybaraExamplesData(element).value}")`
    case 'SELECT':
      return `select('Option', from: "${capybaraExamplesData(element).placeholder}"))`
    // case 'DIV':
    //   return `
    //     within ".class" do
    //     end
    //   `
    default:
      return `click_on "${capybaraExamplesData(element).content}"`
      break
  }
}

interface CapybaraExamplesDataResult {
  tag: string;
  content: string | undefined;
  class: string;
  name: string | null;
  placeholder: string | null;
  value: string | null;
}

function capybaraExamplesData(element: Element): CapybaraExamplesDataResult {
  return {
    tag: element.tagName,
    content: element.textContent?.trim(),
    class: element.className.split(' ').join('.'),
    name: element.getAttribute("name"),
    placeholder: element.getAttribute("placeholder"),
    value: element.getAttribute("value")
  }
}

let clickedElement: Element | null = null;

document.addEventListener("contextmenu", (event) => {
  clickedElement = event.target as HTMLElement;
}, true);

// Watch for context menu message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request == "ContextMenuClicked") {
    if (clickedElement) {
      console.clear()
      copyToClipboard(capybaraExamples(clickedElement))
      console.log(`tagName: '${clickedElement.tagName.toLowerCase()}'`)
      console.log(`textContent: '${clickedElement.textContent?.trim()}'`)
      Array.from(clickedElement.attributes).forEach((attribute) => {
        console.log(`${attribute.name}: '${attribute.value}'`)
      })
    }
    sendResponse("");
  }
});
