import React  from 'react';

const onSwitch = (enable: string) => {
  switch (enable) {
    case 'yes':
      document.body.style.background = "black";
      break;
    case 'no':
      document.body.style.background = "yellow";
      break;
    default:
      break;
  }
};

// Apply changes
chrome.storage.sync.get(['enable'], (data) => {
  onSwitch(data.enable)
});

// Watch for changes & apply them
chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == 'enable') {
      onSwitch(newValue)
    }
  }
});
