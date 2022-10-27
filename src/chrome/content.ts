import React  from 'react';

window.onload = () => {
  chrome.storage.local.get('enable', (data) => {
    if (data.enable == 'yes') {
      document.body.style.background = "black";
    } else {
      document.body.style.background = "red";
    }
  })
}
