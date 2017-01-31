var payload = [];

function getImage(e) {
  // prevent default action
  e.preventDefault();

  var element = e.target;

  // change highlighting to show selected
  // tag with class name (for easy selection when uploading)
  if (element.style.border === "1px solid red") {
    element.style.border = "1px solid green";
    element.className += " le-closet";
  }
  else {
    element.style.border = "1px solid red";
    var ogClass = element.className.replace(" le-closet", "");
    element.className = ogClass;
  }
}

function highlightImages(bool) {
  var images = document.body.querySelectorAll('img');
  if (bool) {
    // highlight
    images.forEach(function(image, i) {
      image.style.border = "1px solid red";
      // add eventlistener
      image.addEventListener('click', getImage);
    })

  }
  else {
    // remove highlight
    images.forEach(function(image, i) {
      image.style = '';
      // remove eventlistener
      image.removeEventListener('click', getImage);
    })

  }
}

function removeTags() {
  var chosen = document.body.querySelectorAll('.le-closet');
  chosen.forEach(function(image, i) {
    var ogClass = image.className.replace(" le-closet", "");
    image.className = ogClass;
  })
}

function removeContainers() {
  var preview = document.getElementById('le-closet-image-preview');
  document.body.removeChild(preview);
  removeTags();
}

function sendPayload() {
  var url = window.location.href;
  console.log(payload);

  // send data to background script
  chrome.runtime.sendMessage({
    type : 'upload',
    url : url,
    payload : payload,
  })

  removeContainers();
}

function createContainers() {
  var imageDiv = document.createElement('div');
  imageDiv.id = 'le-closet-image-preview';
  imageDiv.style.cssText = `
    width : ${window.innerWidth - 100}px;
    height : ${window.innerHeight - 100}px;
    position : fixed;
    left : 50px;
    top : 50px;
    background-color : rgba(0, 0, 0, 0.5);
    z-index : 2147483647;
    overflow : auto;
  `
  document.body.insertBefore(imageDiv, document.body.firstChild);

  var buttonContainer = document.createElement('div');
  buttonContainer.id = 'le-closet-buttons';
  buttonContainer.style.cssText = `
    display : block;
    width : 250px;
    height : 50px;
    margin : 20px auto;
  `
  document.getElementById('le-closet-image-preview').append(buttonContainer);

  var uploadButton = document.createElement('button');
  uploadButton.id = 'le-closet-upload';
  uploadButton.style.cssText = `
    display : inline-block;
    width : 100px;
    height : 50px;
    margin-right : 50px;
    color : white;
    font-weight : 900;
    background-color : green;
    border : none;
    border-radius : 10px;
  `
  uploadButton.innerText = 'Upload';
  uploadButton.addEventListener('click', sendPayload);
  document.getElementById('le-closet-buttons').append(uploadButton);

  var cancelButton = document.createElement('button');
  cancelButton.id = 'le-closet-cancel';
  cancelButton.style.cssText = `
    display : inline-block;
    width : 100px;
    height : 50px;
    color : white;
    font-weight : 900;
    background-color : red;
    border : none;
    border-radius : 10px;
  `
  cancelButton.innerText = 'Cancel';
  cancelButton.addEventListener('click', removeContainers);
  document.getElementById('le-closet-buttons').append(cancelButton);
}

function showPayloadImages() {
  var chosen = document.body.querySelectorAll('.le-closet');

  // store image urls in array
  chosen.forEach(function(image, i) {
    payload.push(image.src);
  })

  createContainers();
  var container = document.getElementById('le-closet-image-preview');
  payload.forEach(function(url, i) {
    var img = document.createElement('img');
    img.src = url;
    img.className = 'le-closet-image';
    img.style.cssText = `
      display : block;
      margin : 0 auto;
    `
    container.append(img);
  })
}

// listen for messages sent from background script
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg === 'START') {
    highlightImages(true);
  }
  else if (msg === 'STOP') {
    highlightImages(false);
    showPayloadImages();
  }
})
