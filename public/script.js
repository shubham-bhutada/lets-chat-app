const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const btn = document.getElementById("submit-btn");
const chatroomContainer = document.querySelector(".chatroom-container");
const chatroomHeader = document.querySelector(".chatroom-header");

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
