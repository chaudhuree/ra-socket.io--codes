// server setup for socket.io express server

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on('connection',socket=>{
  console.log('a user connected with id: ', socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    if(data.room!=''){
    socket.to(data.room).emit("receive_message", data);

    }else{
      socket.broadcast.emit("receive_message", data);
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
