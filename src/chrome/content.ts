import React  from 'react';

const handleSwitch = (enable: string) => {
  const events: string[] = ['click']
  const handleEvent = (event: Event) => {
    console.log('handleEvent:', event)
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

// Init
chrome.storage.sync.get(['enable'], (data) => {
  console.log('chrome.storage.sync.get', data.enable)
  handleSwitch(data.enable)
});

// Watch for changes
chrome.storage.onChanged.addListener((changes) => {
  console.log('chrome.storage.onChanged', changes.enable)
  handleSwitch(changes.enable.newValue)
});
