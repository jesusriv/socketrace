const express = require('express'); 
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/public'));

const server = app.listen(8000, () => console.log("On port 8000"));
const io = require('socket.io')(server);

let clients = [];

io.on('connection', socket => {

  socket.on('update', data => {
    socket.broadcast.emit('scores', {score: data['score'], player: data['player']})
  });

});