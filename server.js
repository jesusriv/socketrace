const express = require('express'); 
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/public'));

const server = app.listen(8000, () => console.log("On port 8000"));
const io = require('socket.io')(server);

let clients = [];

io.on('connection', socket => {

  clients.push(socket.id);

  if (clients.length >= 2) {
    socket.emit("begin");
    socket.broadcast.emit("begin")
  }

  socket.on('update', data => {
    socket.broadcast.emit('scores', {score: data['score'], player: data['player']})
  });

  socket.on('power', x => {
    socket.broadcast.emit('power', x);
  });

  socket.on('remove', id => {
    socket.broadcast.emit('remove', id);
  });

  socket.on('detonate', data => {
    socket.broadcast.emit('detonate', {x: data.x, id: data.id});
  });
  
  socket.on("disconnect", () => {
    let i = clients.indexOf(socket.id);
    clients.splice(i, 1);
  });

});