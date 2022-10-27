import React  from 'react';

chrome.storage.local.get('enable', (data) => {
  if (data.enable == 'yes') {
    document.body.style.background = "black";
  } else {
    document.body.style.background = "red";
  }
})
