import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector('.chat .inner-form')
if (formSendData) {
  formSendData.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  })
}
// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector('.chat .inner-body');
  const myId = document.querySelector('[my-id]').getAttribute("my-id");;
  const div = document.createElement("div");
  let htmlFullName = '';
  if(myId == data.userId) {
    div.classList.add('inner-outgoing');
  }
  else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`
  }
  div.classList.add("inner-incoming");
  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
});
// End SERVER_RETURN_MESSAGE

// Scroll chat to bottom
const bodyChat = document.querySelector('.chat .inner-body');
if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll chat to bottom

// Show Icon Chat
// Show Popup
const buttonIcon = document.querySelector('.button-icon')
if (buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  }
}
// End Show Popup

// Insert Icon to Input
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  const inputChat = document.querySelector('.chat .inner-form input[name="content"]');
  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End insert Icon to Input
// End Show Icon Chat