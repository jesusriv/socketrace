const express = require('express'); 
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/public'));

const server = app.listen(8000, () => console.log("On port 8000"));
const io = require('socket.io')(server);

io.on('connection', socket => {

  socket.emit('id');

  socket.emit('greeting');

  socket.on('update', data => {
    socket.broadcast.emit('scores', {score: data['score'], player: data['player']})
  });
});