var users = require('./routes/users');
module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    var addedUser = false;
    var username;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });

    socket.on('add user', function (data) {
      socket.username = data;
      socket.emit('login', {
        numUsers: 12
      });
      io.clients(function(error, clients){
        if (error) throw error;
        console.log(clients);
      });
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: 12
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      if (addedUser) {
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username
        });
      }
    });
  });
};
