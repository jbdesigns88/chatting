const express = require('express');
let port = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection",(socket)=> {
   socket.broadcast.emit("user joined","a user has joined this room.")
  
    socket.on("chat message",(msg)=>{
        io.emit("chat message", msg);    
    })
socket.on('disconnect',()=>{
        socket.broadcast.emit("user left","a use have left the room.")
        console.log("client left the room");
    });

    
});



server.listen(port, () => {
    console.log(`listening on *:  ${port}`);
});