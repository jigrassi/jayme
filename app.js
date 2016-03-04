var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = require('./game.js');
// middleware
app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}`);
    next();
});

app.use(express.static('./app'));

io.on('connection', function(socket){
    game.join(socket, io.sockets.connected);
    socket.on('move', function(move) {
        game.move(socket, io.sockets.connected, move);
    });

    socket.on('disconnect', function() {
        game.exit(socket);
    })
});

http.listen(3000, function() {
    console.log('app running in port 3000');
})

module.exports = app;