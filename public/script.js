const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const btn = document.getElementById("submit-btn");
const chatroomContainer = document.querySelector(".chatroom-container");
const chatroomHeader = document.querySelector(".chatroom-header");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
const messageContainer = document.querySelector(".messages");

const SENT = "SENT";
const RECEIVED = "RECEIVED";
const socket = io();

let username = "";

btn.addEventListener("click", (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (username) {
    form.style.display = "none";
    chatroomContainer.style.display = "block";
    chatroomHeader.innerText = `Welcome to let's Chat ${username}`;
  }
});

sendBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let dataObj = {
    id: socket.id,
    username: username,
    message: messageInput.value,
  };
  socket.emit("myKey", dataObj);
  renderMessage(dataObj, SENT);
});

socket.on("myKey", (data) => {
  if (data.id !== socket.id) {
    renderMessage(data, RECEIVED);
  }
});

function renderMessage(data, msgType) {
  const msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username} : ${data.message}`;
  if (msgType === SENT) {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message");
  }
  messageContainer.append(msgDiv);
  messageInput.value = "";
}
