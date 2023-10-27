const express = require("express");
const app = express(); // this app is now our express server

const PORT = 5555;

// we will be using sockets so we also need http
const http = require("http");

// destructuring the object received from socket.io
const { Server } = require("socket.io");

// now we need a server that is a combination of http and app
const server = http.createServer(app);
// we use http method of creating a server
// we are giving http an expressServer and getting a httpServer

// io is an instance of Server given by socket.io
const io = new Server(server);
// this io needs to be integrated with the actual server
// hence we need to pass our actual server which is line 13.

io.on("connection", (socket) => {
  //   console.log(socket.id);

  socket.on("myKey", (data) => {
    io.emit("myKey", data);
  });
});

app.use(express.static("public"));
// express.static is an internal method of express
// it is used to send static html,css.js files in a folder
// else it will break

server.listen(PORT, () => {
  console.log(`server is up and running on http://localhost:${PORT}/`);
});
