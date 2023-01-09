'use strict';

import './popup.css';

(async function () {

  const start = document.getElementById('start');
  const text = document.getElementById('text');
  const [tab] = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });


  if (tab.url.includes('https://platform.sizmek.com/')) {
    start.style.display = 'block';
    text.innerHTML = 'Please open your folder which has the uploaded assets.';
  } else {
    start.style.display = 'none';
    text.innerHTML = 'Please go to <a target="_blank" href="https://platform.sizmek.com/#/spa/creativeMainNew/assetsLibrary/1/tile/">Sizmek Assets Library</a> and open your folder which has the uploaded assets.';
  }

  start.addEventListener('click', async () => {
    try {

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ['execute.js'],
        },
        () => {}
      );
    } catch (error) {
      alert(error.message);
    }
  });
})();
