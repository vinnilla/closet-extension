## LE CLOSET COMPANION EXTENSION

#### Chrome Extension Basics:

* drag entire folder into the chrome://extensions page to install

* manifest.json - configuration file
** first block of data shows up on the chrome://extensions page
** browser_action object customizes the extension icon (feel free to change the icon image ^.^)

* background.js - background script (kind of acts like the 'backend' because the data persists across refreshes and page changes)
** any data that needs to be stored semi-permanently should be sent here

* content.js - content script that can interact directly with the DOM
** any DOM manipulation and data scraping occurs here
** this was thrown together really sloppily -- feel free to clean it up

* background and content 'talk' to each other via messages (think socket)
** background sends messages via
```
chrome.tabs.sendMessage(" id of tab you want to talk to ", " payload (can be primitive or non-primitive data) ")
```
** content sends messages via
```
chrome.runtime.sendMessage(" payload (can be primitive or non-primitive data) ")
```
** message listener functions are located at the bottom of each file


#### V.0.0.0 Functionality:
1. Once page's DOM has fully loaded, click on the extension's icon (currently 'Dangerous Billy')to highlight all img elements with a red border.
2. Select image(s) as you please (default action has been disabled so images that normally direct you to another page will no longer do that.)
3. Once all images have been chosen, click on the extension's icon once again to bring up the payload preview state.
4. Here, you can either choose to upload (sends data to background script for request to backend) or to cancel and remove all tags.

#### TO-DO:
* add post request to backend in background.js (line 30)
* make everything look nicer
